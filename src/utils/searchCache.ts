/**
 * IndexedDB cache for search data bundle.
 *
 * On first visit, the search data bundle (all skills, concepts, positions, etc.)
 * is imported from TypeScript modules and sent to the Web Worker.
 * This module caches that bundle in IndexedDB so subsequent page loads
 * can skip the module-import step entirely — the data is read directly
 * from IndexedDB, which is significantly faster.
 *
 * Cache invalidation:
 * - bump CACHE_VERSION when the shape of SearchDataBundle changes
 *   (e.g. new fields added, new entity types, …)
 * - bump INDEX_VERSION when MiniSearch options / document-building logic changes
 */

import type { SearchDataBundle } from './searchEngine'

// ── Cache keys & versioning ──────────────────────────────────────────

const DB_NAME = 'nogimind-search-cache'
const DB_VERSION = 1

/** Bump when SearchDataBundle shape changes */
const CACHE_VERSION = 1

/** Bump when MiniSearch options or document building changes */
const INDEX_VERSION = 1

const STORE_DATA = 'data-bundle'
const STORE_META = 'meta'

// ── Helpers ──────────────────────────────────────────────────────────

const openDB = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)

    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE_DATA)) {
        db.createObjectStore(STORE_DATA, { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains(STORE_META)) {
        db.createObjectStore(STORE_META, { keyPath: 'key' })
      }
    }

    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })

// ── Meta helpers ─────────────────────────────────────────────────────

type CacheMeta = {
  key: string
  cacheVersion: number
  indexVersion: number
  createdAt: number
  sizeBytes: number
}

const getMeta = async (): Promise<CacheMeta | null> => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_META, 'readonly')
    const store = tx.objectStore(STORE_META)
    const req = store.get('search-cache-meta')
    req.onsuccess = () => {
      resolve((req.result as CacheMeta) ?? null)
    }
    req.onerror = () => reject(req.error)
  })
}

const setMeta = async (meta: CacheMeta): Promise<void> => {
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
 * Check if a valid (non-stale) cache exists.
 */
export const hasValidSearchCache = async (): Promise<boolean> => {
  try {
    const meta = await getMeta()
    if (!meta) return false
    return meta.cacheVersion === CACHE_VERSION && meta.indexVersion === INDEX_VERSION
  } catch {
    return false
  }
}

/**
 * Read the cached search data bundle from IndexedDB.
 * Returns null if no valid cache exists.
 */
export const getCachedSearchData = async (): Promise<SearchDataBundle | null> => {
  try {
    const meta = await getMeta()
    if (!meta || meta.cacheVersion !== CACHE_VERSION || meta.indexVersion !== INDEX_VERSION) {
      return null
    }

    const db = await openDB()
    const bundle = await new Promise<SearchDataBundle | null>((resolve, reject) => {
      const tx = db.transaction(STORE_DATA, 'readonly')
      const store = tx.objectStore(STORE_DATA)
      const req = store.get('main')

      req.onsuccess = () => {
        const result = req.result as { id: string; bundle: SearchDataBundle } | undefined
        resolve(result?.bundle ?? null)
      }
      req.onerror = () => reject(req.error)
    })

    return bundle
  } catch {
    return null
  }
}

/**
 * Save the search data bundle to IndexedDB for future visits.
 */
export const setCachedSearchData = async (bundle: SearchDataBundle): Promise<void> => {
  try {
    const db = await openDB()

    // Estimate size for metadata
    // Estimate size for metadata (compute once)
    const estimateSize = () => {
      try {
        return new Blob([JSON.stringify(bundle)]).size
      } catch {
        return 0
      }
    }
    const sizeBytes = estimateSize()

    // Store bundle
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_DATA, 'readwrite')
      const store = tx.objectStore(STORE_DATA)
      store.put({ id: 'main', bundle })
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })

    // Store metadata
    await setMeta({
      key: 'search-cache-meta',
      cacheVersion: CACHE_VERSION,
      indexVersion: INDEX_VERSION,
      createdAt: Date.now(),
      sizeBytes,
    })

    console.log(`[perf] searchCache:saved ${sizeBytes > 1024 ? `${(sizeBytes / 1024).toFixed(1)} KB` : `${sizeBytes} B`}`)
  } catch (err) {
    console.warn('[perf] searchCache:failed to save', err)
  }
}

/**
 * Clear the entire search cache (useful for forced re-initialization).
 */
export const clearSearchCache = async (): Promise<void> => {
  try {
    const db = await openDB()

    await Promise.all([
      new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_DATA, 'readwrite')
        tx.objectStore(STORE_DATA).clear()
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

    console.log('[perf] searchCache:cleared')
  } catch (err) {
    console.warn('[perf] searchCache:failed to clear', err)
  }
}
