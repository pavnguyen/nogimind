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
 * Clear the video cache.
 */
export function clearVideoCache(): void {
  videoCache.clear()
}
