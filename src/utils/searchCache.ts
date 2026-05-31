/**
 * IndexedDB cache for search data bundle.
 *
 * The search pipeline separates two kinds of data:
 *
 * 1. **Manifests** (skills list) — always fetched fresh on every page load
 *    because they reflect content changes (new skills added via build:content).
 *    They are small (~15KB per locale) and fast to fetch.
 *
 * 2. **Static data** (concepts, positions, glossary, etc.) — cached in IndexedDB
 *    because they rarely change (they are part of the source code) and are
 *    expensive to import dynamically.
 *
 * This separation ensures new skills added via `npm run build:content`
 * are immediately available in search without manual cache invalidation.
 *
 * Cache invalidation:
 * - bump STATIC_CACHE_VERSION when the type shape of static data changes
 *   (e.g. new entity types, new fields on existing types, …)
 */

import type { SearchDataBundle } from './searchEngine'
import type { ConceptNode } from '../types/concept'
import type { PositionNode } from '../types/position'
import type { GlossaryTerm } from '../types/glossary'
import type { DefensiveLayer } from '../types/defense'
import type { GrapplingArchetype } from '../types/archetype'
import type { TechniqueStateMachine } from '../types/stateMachine'

// ── Cache keys & versioning ──────────────────────────────────────────

const DB_NAME = 'nogimind-search-cache'
const DB_VERSION = 2  // bumped to add static-data store

/** Bump when static data shape changes (new fields, new entity types) */
const STATIC_CACHE_VERSION = 1

const STORE_STATIC = 'static-data'
const STORE_META = 'meta'
const logPerf = (...args: Parameters<typeof console.log>) => {
  if (import.meta.env.DEV) console.log(...args)
}

// ── Types ────────────────────────────────────────────────────────────

export type StaticSearchData = {
  concepts: ConceptNode[]
  positions: PositionNode[]
  glossaryTerms: GlossaryTerm[]
  defensiveLayers: DefensiveLayer[]
  archetypes: GrapplingArchetype[]
  techniqueStateMachineBySkillId: Map<string, TechniqueStateMachine>
  techniqueStateMachines: TechniqueStateMachine[]
}

type StaticCacheMeta = {
  key: string
  staticVersion: number
  createdAt: number
  sizeBytes: number
}

// ── Helpers ──────────────────────────────────────────────────────────

const openDB = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)

    req.onupgradeneeded = () => {
      const db = req.result
      // Clean up old store from previous cache format (full-bundle caching)
      if (db.objectStoreNames.contains('data-bundle')) {
        db.deleteObjectStore('data-bundle')
      }
      if (!db.objectStoreNames.contains(STORE_STATIC)) {
        db.createObjectStore(STORE_STATIC, { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains(STORE_META)) {
        db.createObjectStore(STORE_META, { keyPath: 'key' })
      }
    }

    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })

// ── Meta helpers ─────────────────────────────────────────────────────

const getStaticMeta = async (): Promise<StaticCacheMeta | null> => {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_META, 'readonly')
      const store = tx.objectStore(STORE_META)
      const req = store.get('static-cache-meta')
      req.onsuccess = () => {
        resolve((req.result as StaticCacheMeta) ?? null)
      }
      req.onerror = () => reject(req.error)
    })
  } catch {
    return null
  }
}

const setStaticMeta = async (meta: StaticCacheMeta): Promise<void> => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_META, 'readwrite')
    const store = tx.objectStore(STORE_META)
    store.put(meta)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

// ── Public API ───────────────────────────────────────────────────────

/**
 * Check if a valid (non-stale) static data cache exists.
 */
export const hasValidStaticCache = async (): Promise<boolean> => {
  try {
    const meta = await getStaticMeta()
    if (!meta) return false
    return meta.staticVersion === STATIC_CACHE_VERSION
  } catch {
    return false
  }
}

/**
 * Read the cached static data from IndexedDB.
 * Returns null if no valid cache exists.
 */
export const getCachedStaticData = async (): Promise<StaticSearchData | null> => {
  try {
    const meta = await getStaticMeta()
    if (!meta || meta.staticVersion !== STATIC_CACHE_VERSION) return null

    const db = await openDB()
    return new Promise<StaticSearchData | null>((resolve, reject) => {
      const tx = db.transaction(STORE_STATIC, 'readonly')
      const store = tx.objectStore(STORE_STATIC)
      const req = store.get('static-data')

      req.onsuccess = () => {
        const result = req.result as { id: string; data: StaticSearchData } | undefined
        resolve(result?.data ?? null)
      }
      req.onerror = () => reject(req.error)
    })
  } catch {
    return null
  }
}

/**
 * Save the static data to IndexedDB for future visits.
 */
export const setCachedStaticData = async (data: StaticSearchData): Promise<void> => {
  try {
    const db = await openDB()

    // Estimate size for metadata
    const estimateSize = () => {
      try {
        return new Blob([JSON.stringify(data)]).size
      } catch {
        return 0
      }
    }
    const sizeBytes = estimateSize()

    // Store data
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_STATIC, 'readwrite')
      const store = tx.objectStore(STORE_STATIC)
      store.put({ id: 'static-data', data })
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })

    // Store metadata
    await setStaticMeta({
      key: 'static-cache-meta',
      staticVersion: STATIC_CACHE_VERSION,
      createdAt: Date.now(),
      sizeBytes,
    })

    logPerf(`[perf] searchCache:static saved ${sizeBytes > 1024 ? `${(sizeBytes / 1024).toFixed(1)} KB` : `${sizeBytes} B`}`)
  } catch (err) {
    console.warn('[perf] searchCache:failed to save static data', err)
  }
}

/**
 * Clear the entire search cache (both static data and old format).
 */
export const clearSearchCache = async (): Promise<void> => {
  try {
    const db = await openDB()

    await Promise.all([
      new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_STATIC, 'readwrite')
        tx.objectStore(STORE_STATIC).clear()
        tx.oncomplete = () => resolve()
        tx.onerror = () => reject(tx.error)
      }),
      new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_META, 'readwrite')
        tx.objectStore(STORE_META).clear()
        tx.oncomplete = () => resolve()
        tx.onerror = () => reject(tx.error)
      }),
    ])

    logPerf('[perf] searchCache:cleared')
  } catch (err) {
    console.warn('[perf] searchCache:failed to clear', err)
  }
}

// ── Deprecated: remove after migration ───────────────────────────────

/** @deprecated Replaced by getCachedStaticData() — search now always fetches fresh manifests */
export const getCachedSearchData = async (): Promise<SearchDataBundle | null> => {
  return null
}

/** @deprecated Replaced by setCachedStaticData() */
export const setCachedSearchData = async (): Promise<void> => {
  // No-op — manifests are always fetched fresh
}

/** @deprecated Replaced by hasValidStaticCache() */
export const hasValidSearchCache = async (): Promise<boolean> => {
  return hasValidStaticCache()
}