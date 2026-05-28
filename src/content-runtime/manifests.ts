/** Lightweight skill entry from the generated manifest. */
export interface ManifestEntry {
  id: string
  domain: string
  level: string
  name: string
  tags: string[]
  summary: string
  hasVideos: boolean
  hasMicroDetails: boolean
  hasChecklist: boolean
  updatedAt?: string
  sortOrder?: number
}

const manifestUrl = (locale: string): string =>
  `/generated/manifest/skills.${locale}.json`

const manifestPromiseCache = new Map<string, Promise<ManifestEntry[]>>()
const manifestResultCache = new Map<string, ManifestEntry[]>()

/**
 * Load the skill manifest for a given locale.
 * The manifest is lightweight and should be loaded once on app init.
 */
export async function getManifest(locale: string): Promise<ManifestEntry[]> {
  // Check result cache
  const cached = manifestResultCache.get(locale)
  if (cached) return cached

  // Check promise cache (dedup concurrent requests)
  if (manifestPromiseCache.has(locale)) {
    return manifestPromiseCache.get(locale)!
  }

  const promise = loadManifest(locale)
  manifestPromiseCache.set(locale, promise)
  return promise
}

async function loadManifest(locale: string): Promise<ManifestEntry[]> {
  try {
    const response = await fetch(manifestUrl(locale))
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const entries: ManifestEntry[] = await response.json()

    manifestResultCache.set(locale, entries)

    // Only keep promise cache temporarily
    manifestPromiseCache.delete(locale)

    return entries
  } catch {
    manifestPromiseCache.delete(locale)

    // Fallback: re-throw so the caller can handle
    console.error(`[content-runtime] Failed to load manifest for "${locale}"`)
    throw new Error(`Manifest not available for locale: ${locale}`)
  }
}

/**
 * Get a single manifest entry by skill ID.
 */
export async function getManifestEntry(
  locale: string,
  id: string
): Promise<ManifestEntry | undefined> {
  const manifest = await getManifest(locale)
  return manifest.find(e => e.id === id)
}

/**
 * Prefetch the manifest for a locale.
 */
export function prefetchManifest(locale: string): void {
  if (!manifestPromiseCache.has(locale) && !manifestResultCache.has(locale)) {
    getManifest(locale).catch(() => { /* silent */ })
  }
}

/**
 * Clear all manifest caches (useful for HMR in dev).
 */
export function clearManifestCache(): void {
  manifestPromiseCache.clear()
  manifestResultCache.clear()
}
