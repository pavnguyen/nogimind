import type { KnowledgeItemType, KnowledgeSearchResult } from '../types/knowledgeSearch'
import type { LanguageCode } from '../types/skill'
import { archetypes } from '../data/archetypes'
import { concepts } from '../data/concepts'
import { defensiveLayers } from '../data/defensiveLayers'
import { glossaryTerms } from '../data/glossaryTerms'
import { masteryStages } from '../data/masteryStages'
import { techniqueStateMachineBySkillId, techniqueStateMachines } from '../data/techniqueStateMachines'
import { positions } from '../data/positions'
import { skillNodes } from '../data/skillNodes'
import { getEscapeMaps, getMicroDetails, getTechniqueChains, getTroubleshooters } from './knowledgeModules'

let worker: Worker | null = null
let ready = false
let requestIdCounter = 0
const pendingRequests = new Map<string, { resolve: (value: KnowledgeSearchResult[]) => void; reject: (reason: unknown) => void }>()
const searchTimers = new Map<string, number>()
let initPromise: Promise<void> | null = null
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

/** Initialize search indexes in the web worker (pre-builds all indexes) */
export const initSearchIndexes = (): Promise<void> => {
  if (initPromise) return initPromise

  initPromise = new Promise<void>((resolve) => {
    const w = getOrCreateWorker()

    const onMessage = (event: MessageEvent) => {
      if (event.data.type === 'ready') {
        console.log(`[perf] worker:init:transfer ${(performance.now() - tTransfer).toFixed(2)} ms`)
        w.removeEventListener('message', onMessage)
        resolve()
      }
    }

    // If worker already signaled ready, resolve immediately
    if (ready) {
      resolve()
      return
    }

    w.addEventListener('message', onMessage)

    // Send data bundle to worker so it doesn't duplicate data imports
    const tPrepare = performance.now()
    const payload = {
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
      techniqueChains: getTechniqueChains(skillNodes),
      troubleshooters: getTroubleshooters(skillNodes),
      escapeMaps: getEscapeMaps(skillNodes),
    }
    console.log(`[perf] worker:init:prepare ${(performance.now() - tPrepare).toFixed(2)} ms`)

    const tTransfer = performance.now()
    w.postMessage({ type: 'init', payload })
    // Transfer time is measured when 'ready' arrives: transferTime = readyTimestamp - tTransfer
  })

  return initPromise
}

/**
 * Search knowledge asynchronously using a web worker.
 * Returns a promise that resolves with search results.
 */
export const searchKnowledge = (
  query: string,
  lang: LanguageCode,
  filters: { type?: KnowledgeItemType | '' } = {},
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
  const bundle = {
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
    techniqueChains: getTechniqueChains(skillNodes),
    troubleshooters: getTroubleshooters(skillNodes),
    escapeMaps: getEscapeMaps(skillNodes),
  }
  // Use dynamic import to avoid bundling searchEngine with main chunk
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

/** Terminate the search worker (cleanup) */
export const terminateWorker = () => {
  if (worker) {
    worker.terminate()
    worker = null
    ready = false
    initPromise = null
  }
}
