import type { KnowledgeItemType, KnowledgeSearchResult } from '../types/knowledgeSearch'
import type { LanguageCode, SkillDomain, SkillLevel, SkillNode } from '../types/skill'
import type { SearchDataBundle } from '../utils/searchEngine'
import { getEscapeMaps, getMicroDetails, getTroubleshooters } from './knowledgeModules'
import { getCachedSearchData, setCachedSearchData, hasValidSearchCache } from './searchCache'
import { getManifest, type ManifestEntry } from '../content-runtime/manifests'

let worker: Worker | null = null
let ready = false
let requestIdCounter = 0
const pendingRequests = new Map<string, { resolve: (value: KnowledgeSearchResult[]) => void; reject: (reason: unknown) => void }>()
const searchTimers = new Map<string, number>()
let initPromise: Promise<void> | null = null
let warmupPromise: Promise<void> | null = null
const logPerf = (...args: Parameters<typeof console.log>) => {
  if (import.meta.env.DEV) console.log(...args)
}

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
    } catch {
      // Worker termination is best-effort during crash cleanup.
    }
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
        break
      }
      case 'search-results': {
        const tStart = searchTimers.get(id)
        if (tStart !== undefined) {
          logPerf(`[perf] worker:search:total ${(performance.now() - tStart).toFixed(2)} ms`)
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

// ── Build SkillNode from manifest entry ─────────────────────────────

/**
 * Create a minimal SkillNode from pipeline manifest entries.
 * Most fields are empty — the key searchable data is name, summary, and tags.
 */
const buildPipelineSkillNode = (
  id: string,
  enEntry: ManifestEntry,
  viEntry: ManifestEntry | undefined,
  frEntry: ManifestEntry | undefined,
): SkillNode => ({
  id,
  title: {
    en: enEntry.name,
    vi: viEntry?.name ?? enEntry.name,
    fr: frEntry?.name ?? enEntry.name,
  },
  shortDescription: {
    en: enEntry.summary || '',
    vi: viEntry?.summary || enEntry.summary || '',
    fr: frEntry?.summary || enEntry.summary || '',
  },
  domain: enEntry.domain as SkillDomain,
  level: enEntry.level as SkillLevel,
  tags: [...new Set([...(enEntry.tags ?? []), ...(viEntry?.tags ?? []), ...(frEntry?.tags ?? [])])],
  // ── Defaults for remaining required SkillNode fields ──
  whyItMatters: { en: '', vi: '', fr: '' },
  situation: { en: '', vi: '', fr: '' },
  primaryGoal: { en: '', vi: '', fr: '' },
  keyConcepts: { en: [], vi: [], fr: [] },
  bodyChecklist: {},
  decisionTree: [],
  dangerSignals: { en: [], vi: [], fr: [] },
  commonMistakes: { en: [], vi: [], fr: [] },
  failureResponses: [],
  drills: [],
  skillTests: [],
  prerequisites: [],
  relatedSkills: [],
  bodyMechanicsSystem: {
    overview: { en: '', vi: '', fr: '' },
    phases: [],
    globalPrinciples: { en: [], vi: [], fr: [] },
    nonNegotiables: { en: [], vi: [], fr: [] },
    commonMechanicalErrors: { en: [], vi: [], fr: [] },
    correctionCues: { en: [], vi: [], fr: [] },
    safetyNotes: { en: [], vi: [], fr: [] },
  },
})

// ── Data bundle builder (lazy, uses cache or manifest fetches) ──────

/**
 * Build the data bundle either from IndexedDB cache or by fetching
 * the content pipeline manifests for all 3 locales.
 */
const buildSearchPayload = async (): Promise<SearchDataBundle> => {
  // 1. Try IndexedDB cache first (fastest path)
  const cached = await getCachedSearchData()
  if (cached) {
    logPerf(`[perf] init:using IndexedDB cache`)
    return cached
  }

  // 2. Cache miss — fetch manifests + legacy modules
  const tFetch = performance.now()

  // Safe wrapper: if a manifest fails to load, treat it as empty (graceful degradation)
  const safeGetManifest = async (locale: string): Promise<ManifestEntry[]> => {
    try { return await getManifest(locale) }
    catch { return [] }
  }

  const [enManifest, viManifest, frManifest, { concepts }, { positions }, { glossaryTerms }, { defensiveLayers }, { archetypes }, { masteryStages }, { techniqueStateMachineBySkillId, techniqueStateMachines }] =
    await Promise.all([
      safeGetManifest('en'),
      safeGetManifest('vi'),
      safeGetManifest('fr'),
      import('../data/concepts'),
      import('../data/positions'),
      import('../data/glossaryTerms'),
      import('../data/defensiveLayers'),
      import('../data/archetypes'),
      import('../data/masteryStages'),
      import('../data/techniqueStateMachines'),
    ] as const)

  const tBuild = performance.now()
  logPerf(`[perf] init:fetch-manifests ${(tBuild - tFetch).toFixed(2)} ms`)

  // ── Build SkillNodes from manifest (all skills, both pipeline and legacy) ─
  const enById = new Map(enManifest.map((e) => [e.id, e]))
  const viById = new Map(viManifest.map((e) => [e.id, e]))
  const frById = new Map(frManifest.map((e) => [e.id, e]))

  const skillNodes: SkillNode[] = []
  for (const [id, enEntry] of enById) {
    skillNodes.push(
      buildPipelineSkillNode(id, enEntry, viById.get(id), frById.get(id)),
    )
  }

  logPerf(`[perf] init:built ${skillNodes.length} skill nodes from manifest`)

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
  logPerf(`[perf] init:build-payload ${(tDone - tBuild).toFixed(2)} ms`)

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
            logPerf(`[perf] worker:init:transfer ${(performance.now() - tTransfer).toFixed(2)} ms`)
            w.removeEventListener('message', onMessage)
            resolve()
          }
        }

        w.addEventListener('message', onMessage)

        // Build payload from cache or manifest fetches
        const tPayload = performance.now()
        const payload = await buildSearchPayload()
        logPerf(`[perf] init:get-payload ${(performance.now() - tPayload).toFixed(2)} ms`)

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
            logPerf(`[perf] worker:warmup:total ${(performance.now() - tWarmup).toFixed(2)} ms`)
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



/**
 * Clear the warmup/init promise caches so the next call to
 * warmSearchIndexes / initSearchIndexes actually re-initializes.
 */
export const clearIndexCache = (): void => {
  initPromise = null
  warmupPromise = null
}

/** Pre-warm the cache ahead of time (no worker init needed yet) */
export const preWarmSearchCache = async (): Promise<void> => {
  if (await hasValidSearchCache()) {
    logPerf('[perf] prewarm:cache already valid, skipping')
    return
  }
  logPerf('[perf] prewarm:building cache from manifest fetches...')
  await buildSearchPayload()
  logPerf('[perf] prewarm:done')
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
          logPerf(`[perf] worker:search:total ${(performance.now() - tSearch).toFixed(2)} ms (timed out) for "${trimmed.substring(0, 40)}"`)
          searchTimers.delete(id)
          pendingRequests.delete(id)
          reject(new Error('Search timed out'))
        }
      }, 30000)
    })
  })
}
