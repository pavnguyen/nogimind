/**
 * Content Pipeline — Concept Runtime Loader
 *
 * Loads concept data from generated JSON artifacts.
 * Falls back to legacy TypeScript data when the generated file is not found.
 */

export interface ConceptDetail {
  id: string
  locale: string
  title: string
  category: string
  level: string
  tags: string[]
  shortDefinition: string
  whyItMatters: string
  deepExplanation: string
  beginnerView: string
  advancedView: string
  ifThenExamples: Array<{
    if: string
    then: string
    why: string
    relatedSkillIds: string[]
  }>
  commonMisunderstandings: Array<{
    misunderstanding: string
    correction: string
  }>
  trainingCues: string[]
  relatedSkillIds: string[]
  relatedConceptIds: string[]
}

export interface ConceptManifestItem {
  id: string
  title: string
  category: string
  level: string
  tags: string[]
  shortDefinition: string
}

const generatedUrl = (locale: string, id: string): string =>
  `/generated/concepts/${locale}/${id}.json`

const manifestUrl = (): string =>
  `/generated/manifest/concepts.json`

const detailCache = new Map<string, ConceptDetail>()
const manifestCache = new Map<string, ConceptManifestItem[]>()

/**
 * Load the full detail for a concept from the generated JSON artifact.
 */
export async function getConceptDetail(
  locale: string,
  id: string,
  options?: { useLegacy?: () => ConceptDetail | null }
): Promise<ConceptDetail | null> {
  const cacheKey = `${locale}:${id}`
  const cached = detailCache.get(cacheKey)
  if (cached) return cached

  try {
    const response = await fetch(generatedUrl(locale, id))
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const detail: ConceptDetail = await response.json()

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
 * Load the concept manifest (lightweight listing).
 */
export async function getConceptManifest(): Promise<ConceptManifestItem[]> {
  const cached = manifestCache.get('all')
  if (cached) return cached

  try {
    const response = await fetch(manifestUrl())
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const entries: ConceptManifestItem[] = await response.json()
    manifestCache.set('all', entries)
    return entries
  } catch {
    return []
  }
}

/**
 * Clear all concept caches.
 */
export function clearConceptCache(): void {
  detailCache.clear()
  manifestCache.clear()
}
