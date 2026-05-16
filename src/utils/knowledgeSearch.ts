import type { KnowledgeItemType, KnowledgeSearchResult } from '../types/knowledgeSearch'
import type { LanguageCode } from '../types/skill'
import type { SearchDataBundle } from '../utils/searchEngine'
import { getEscapeMaps, getMicroDetails, getTroubleshooters } from './knowledgeModules'
import { getCachedSearchData, setCachedSearchData, hasValidSearchCache } from './searchCache'

let worker: Worker | null = null
let ready = false
let requestIdCounter = 0
const pendingRequests = new Map<string, { resolve: (value: KnowledgeSearchResult[]) => void; reject: (reason: unknown) => void }>()
const searchTimers = new Map<string, number>()
let initPromise: Promise<void> | null = null
let warmupPromise: Promise<void> | null = null
const readyCallbacks: Array<() => void> = []

/** Subscribe to be notified when the search worker is fully initialized */
export const subscribeOnReady = (cb: () => void): (() => void) => {
  if (ready) {
    cb()
    return () => {}
  }
  readyCallbacks.push(cb)
  return () => {
    const idx = readyCallbacks.indexOf(cb)
    if (idx !== -1) readyCallbacks.splice(idx, 1)
  }
}

/** Check if the search worker indexes are ready */
export const isIndexReady = (): boolean => ready

const handleWorkerCrash = () => {
  console.warn('Search worker crashed — recreating on next request')

  // Reject all pending requests
  for (const [id, pending] of pendingRequests) {
    pending.reject(new Error('Search worker crashed'))
    pendingRequests.delete(id)
  }
  searchTimers.clear()

  // Terminate the dead worker
  if (worker) {
    try {
      worker.terminate()
    } catch {}
    worker = null
  }

  // Reset state so next call creates a fresh worker
  ready = false
  initPromise = null
  warmupPromise = null
}

const getOrCreateWorker = (): Worker => {
  if (worker) return worker

  const w = new Worker(
    new URL('../workers/searchWorker.ts', import.meta.url),
    { type: 'module' },
  )

  w.onmessage = (event: MessageEvent) => {
    const { type, id, payload } = event.data

    switch (type) {
      case 'ready': {
        ready = true
        // Notify all subscribers
        const cbs = readyCallbacks.slice()
        readyCallbacks.length = 0
        cbs.forEach((cb) => cb())
        break
      }
      case 'search-results': {
        const tStart = searchTimers.get(id)
        if (tStart !== undefined) {
          console.log(`[perf] worker:search:total ${(performance.now() - tStart).toFixed(2)} ms`)
          searchTimers.delete(id)
        }
        const pending = pendingRequests.get(id)
        if (pending) {
          pending.resolve(payload)
          pendingRequests.delete(id)
        }
        break
      }
    }
  }

  w.onerror = () => {
    handleWorkerCrash()
  }

  w.onmessageerror = () => {
    handleWorkerCrash()
  }

  worker = w
  return w
}

// ── Data bundle builder (lazy, uses cache or dynamic imports) ────────

/**
 * Build the data bundle either from IndexedDB cache or dynamic imports.
 * When the cache is warm, this avoids loading any data modules at all.
 */
const buildSearchPayload = async (): Promise<SearchDataBundle> => {
  // 1. Try IndexedDB cache first (fastest path)
  const cached = await getCachedSearchData()
  if (cached) {
    console.log(`[perf] init:using IndexedDB cache`)
    return cached
  }

  // 2. Cache miss — dynamically import all data modules
  const tImport = performance.now()

  const [
    { skillNodes },
    { concepts },
    { positions },
    { glossaryTerms },
    { defensiveLayers },
    { archetypes },
    { masteryStages },
    { techniqueStateMachineBySkillId, techniqueStateMachines },
  ] = await Promise.all([
    import('../data/skillNodes'),
    import('../data/concepts'),
    import('../data/positions'),
    import('../data/glossaryTerms'),
    import('../data/defensiveLayers'),
    import('../data/archetypes'),
    import('../data/masteryStages'),
    import('../data/techniqueStateMachines'),
  ] as const)

  const tBuild = performance.now()
  console.log(`[perf] init:dynamic-import ${(tBuild - tImport).toFixed(2)} ms`)

  const payload: SearchDataBundle = {
    skillNodes,
    concepts,
    positions,
    glossaryTerms,
    defensiveLayers,
    archetypes,
    masteryStages,
    techniqueStateMachines,
    techniqueStateMachineBySkillId,
    microDetails: getMicroDetails(skillNodes),
    troubleshooters: getTroubleshooters(skillNodes),
    escapeMaps: getEscapeMaps(skillNodes),
  }

  const tDone = performance.now()
  console.log(`[perf] init:build-payload ${(tDone - tBuild).toFixed(2)} ms`)

  // 3. Cache the payload for next visit (fire-and-forget)
  setCachedSearchData(payload).catch(() => {})

  return payload
}

// ── Initialization ───────────────────────────────────────────────────

/** Initialize search indexes in the web worker (pre-builds all indexes) */
export const initSearchIndexes = (): Promise<void> => {
  if (initPromise) return initPromise

  initPromise = new Promise<void>((resolve, reject) => {
    // Async IIFE so we can use await
    ;(async () => {
      try {
        const w = getOrCreateWorker()

        // If worker already signaled ready, resolve immediately
        if (ready) {
          resolve()
          return
        }

        const onMessage = (event: MessageEvent) => {
          if (event.data.type === 'ready') {
            console.log(`[perf] worker:init:transfer ${(performance.now() - tTransfer).toFixed(2)} ms`)
            w.removeEventListener('message', onMessage)
            resolve()
          }
        }

        w.addEventListener('message', onMessage)

        // Build payload from cache or dynamic imports
        const tPayload = performance.now()
        const payload = await buildSearchPayload()
        console.log(`[perf] init:get-payload ${(performance.now() - tPayload).toFixed(2)} ms`)

        // Send data bundle to worker
        const tTransfer = performance.now()
        w.postMessage({ type: 'init', payload })
      } catch (err) {
        // Reset so next call retries
        initPromise = null
        reject(err)
      }
    })()
  })

  return initPromise
}

export const warmSearchIndexes = (): Promise<void> => {
  if (warmupPromise) return warmupPromise

  warmupPromise = initSearchIndexes()
    .then(() => {
      const w = getOrCreateWorker()
      return new Promise<void>((resolve) => {
        const tWarmup = performance.now()
        const onMessage = (event: MessageEvent) => {
          if (event.data.type === 'warmup-complete') {
            console.log(`[perf] worker:warmup:total ${(performance.now() - tWarmup).toFixed(2)} ms`)
            w.removeEventListener('message', onMessage)
            resolve()
          }
        }

        w.addEventListener('message', onMessage)
        w.postMessage({
          type: 'warmup',
          payload: {
            langs: ['vi', 'en', 'fr'] satisfies LanguageCode[],
            types: [''],
          },
        })
      })
    })
    .catch((error) => {
      warmupPromise = null
      throw error
    })

  return warmupPromise
}

/** Pre-warm the cache ahead of time (no worker init needed yet) */
export const preWarmSearchCache = async (): Promise<void> => {
  if (await hasValidSearchCache()) {
    console.log('[perf] prewarm:cache already valid, skipping')
    return
  }
  console.log('[perf] prewarm:building cache from dynamic imports...')
  await buildSearchPayload()
  console.log('[perf] prewarm:done')
}

/**
 * Search knowledge asynchronously using a web worker.
 * Returns a promise that resolves with search results.
 */
export const searchKnowledge = (
  query: string,
  lang: LanguageCode,
  filters: { type?: KnowledgeItemType | ''; mode?: import('../utils/searchEngine').SearchMode } = {},
): Promise<KnowledgeSearchResult[]> => {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return Promise.resolve([])

  // Ensure indexes are initialized before first search
  // (handles case where requestIdleCallback init hasn't run yet)
  initSearchIndexes()

  return initPromise!.then(() => {
    const w = getOrCreateWorker()
    const id = String(++requestIdCounter)

    // Store search start time so it's accessible in getOrCreateWorker's onmessage handler
    const tSearch = performance.now()
    searchTimers.set(id, tSearch)

    return new Promise<KnowledgeSearchResult[]>((resolve, reject) => {
      pendingRequests.set(id, { resolve, reject })

      w.postMessage({
        type: 'search',
        id,
        payload: { query: trimmed, lang, filters },
      })

      // Timeout after 30s
      setTimeout(() => {
        if (pendingRequests.has(id)) {
          const tSearch = searchTimers.get(id) ?? performance.now()
          console.log(`[perf] worker:search:total ${(performance.now() - tSearch).toFixed(2)} ms (timed out) for "${trimmed.substring(0, 40)}"`)
          searchTimers.delete(id)
          pendingRequests.delete(id)
          reject(new Error('Search timed out'))
        }
      }, 30000)
    })
  })
}

/** Benchmark: run sync search 10 times and log average time (call from browser console) */
export const benchmarkSyncSearch = () => {
  const queries = [
    'RNC elbow under chin',
    'armbar thumb direction',
    'triangle one shoulder out',
    'omoplata shoulder clamp',
    'false reap knee line',
    'heel hook saddle',
    'guillotine deep wrist',
    'bodylock passing',
    'kimura elbow ribs',
    'crab ride back take',
  ]
  const lang = 'en'

  // Must call setSearchData before syncSearchKnowledge
  // Use dynamic imports to avoid bundling data with main chunk
  const loadBundle = async () => {
    const bundle = await buildSearchPayload()

    import('../utils/searchEngine').then(({ setSearchData, syncSearchKnowledge }) => {
      setSearchData(bundle)
      const runs = 10
      const timings: number[] = []
      for (let i = 0; i < runs; i++) {
        const start = performance.now()
        for (const q of queries) {
          syncSearchKnowledge(q, lang)
        }
        timings.push(performance.now() - start)
      }
      console.group('📊 Sync search benchmark (10 queries × 10 runs)')
      console.log(`Average: ${(timings.reduce((a, b) => a + b, 0) / timings.length).toFixed(2)} ms`)
      console.log(`Min: ${Math.min(...timings).toFixed(2)} ms`)
      console.log(`Max: ${Math.max(...timings).toFixed(2)} ms`)
      console.log(`Individual runs: ${timings.map((t) => t.toFixed(1)).join(', ')} ms`)
      console.groupEnd()
    })
  }
  loadBundle()
}

/** Terminate the search worker (cleanup) */
export const terminateWorker = () => {
  if (worker) {
    worker.terminate()
    worker = null
    ready = false
    initPromise = null
    warmupPromise = null
  }
}
