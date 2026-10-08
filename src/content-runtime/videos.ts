export interface SkillVideoReference {
  youtubeId: string
  title: string
  channel: string
  whyUseful: string
  timestampStart?: number
  relevance: string
  level: string
}

export interface SkillVideoMapping {
  skillId: string
  videos: SkillVideoReference[]
}

const videoUrl = (skillId: string): string =>
  `/generated/videos/by-skill/${skillId}.json`

const videoCache = new Map<string, SkillVideoMapping>()

/**
 * Load video references for a specific skill.
 */
export async function getSkillVideos(
  skillId: string
): Promise<SkillVideoMapping | null> {
  // Check cache
  const cached = videoCache.get(skillId)
  if (cached) return cached

  try {
    const response = await fetch(videoUrl(skillId))
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const mapping: SkillVideoMapping = await response.json()
    videoCache.set(skillId, mapping)
    return mapping
  } catch {
    return null
  }
}

/**
 * Relevance order used when the same video is referenced by several skills.
 * Mirrors `SkillVideoRefSchema`'s enum, from strongest to weakest.
 */
const RELEVANCE_PRIORITY = ['primary', 'supplemental', 'advanced', 'alternate', 'related']

const relevanceRank = (relevance: string): number => {
  const index = RELEVANCE_PRIORITY.indexOf(relevance)
  return index === -1 ? RELEVANCE_PRIORITY.length : index
}

/**
 * Panels merge the videos of every related skill and curated videos are often
 * referenced by more than one of them (a setup and the finish it leads to, for
 * example). Keep one card per youtubeId, the most relevant reference wins, so
 * the same video never renders twice in the same list.
 */
export function dedupeVideosByYoutubeId<T extends { video: SkillVideoReference }>(
  entries: T[]
): T[] {
  const bestByYoutubeId = new Map<string, T>()

  for (const entry of entries) {
    const current = bestByYoutubeId.get(entry.video.youtubeId)
    if (!current || relevanceRank(entry.video.relevance) < relevanceRank(current.video.relevance)) {
      bestByYoutubeId.set(entry.video.youtubeId, entry)
    }
  }

  return [...bestByYoutubeId.values()]
}

/**
 * Clear the video cache.
 */
export function clearVideoCache(): void {
  videoCache.clear()
}
