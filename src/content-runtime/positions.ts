/**
 * Content Pipeline — Position Runtime Loader
 *
 * Loads position data from generated JSON artifacts.
 * Falls back to legacy TypeScript data when the generated file is not found.
 */

export interface PositionDetail {
  id: string
  locale: string
  title: string
  category: string
  status: string
  description: string
  topPlayerGoals: string[]
  bottomPlayerGoals: string[]
  controlPoints: string[]
  escapePriorities: string[]
  advancementOptions: Array<{
    action: string
    nextPositionId?: string
    relatedSkillIds: string[]
    why: string
  }>
  dangerSignals: string[]
  nextPositionId?: string
  relatedSkillIds: string[]
  relatedConceptIds: string[]
}

export interface PositionManifestItem {
  id: string
  title: string
  category: string
  status: string
  description: string
}

const generatedUrl = (locale: string, id: string): string =>
  `/generated/positions/${locale}/${id}.json`

const manifestUrl = (): string =>
  `/generated/manifest/positions.json`

const detailCache = new Map<string, PositionDetail>()
const manifestCache = new Map<string, PositionManifestItem[]>()

/**
 * Load the full detail for a position from the generated JSON artifact.
 */
export async function getPositionDetail(
  locale: string,
  id: string,
  options?: { useLegacy?: () => PositionDetail | null }
): Promise<PositionDetail | null> {
  const cacheKey = `${locale}:${id}`
  const cached = detailCache.get(cacheKey)
  if (cached) return cached

  try {
    const response = await fetch(generatedUrl(locale, id))
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const detail: PositionDetail = await response.json()

    if (import.meta.env.PROD) {
      detailCache.set(cacheKey, detail)
    }
    return detail
  } catch {
    if (options?.useLegacy) {
      const legacy = options.useLegacy()
      if (legacy) {
        detailCache.set(cacheKey, legacy)
        return legacy
      }
    }
    return null
  }
}

/**
 * Load the position manifest (lightweight listing).
 */
export async function getPositionManifest(): Promise<PositionManifestItem[]> {
  const cached = manifestCache.get('all')
  if (cached) return cached

  try {
    const response = await fetch(manifestUrl())
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const entries: PositionManifestItem[] = await response.json()
    manifestCache.set('all', entries)
    return entries
  } catch {
    return []
  }
}

/**
 * Clear all position caches.
 */
export function clearPositionCache(): void {
  detailCache.clear()
  manifestCache.clear()
}
