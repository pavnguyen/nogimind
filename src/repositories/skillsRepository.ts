import type { LibraryTier, SkillDomain, SkillNode } from '../types/skill'
import { getManifest } from '../content-runtime/manifests'
import type { ManifestEntry } from '../content-runtime/manifests'

// ── Empty defaults for required SkillNode fields not present in ManifestEntry ──
/** Create a fresh empty LocalizedText (prevents shared mutable reference issues). */
const emptyText = (): { en: string; vi: string; fr: string } => ({ en: '', vi: '', fr: '' })

/** Create a fresh empty LocalizedStringArray. */
const emptyStrArr = (): { en: string[]; vi: string[]; fr: string[] } => ({ en: [], vi: [], fr: [] })

/** Extract a tag value by prefix, e.g. tags:['tier:core'] → 'core' */
const extractTag = (tags: string[], prefix: string): string | undefined => {
  for (const tag of tags) {
    if (tag.startsWith(prefix)) return tag.slice(prefix.length)
  }
  return undefined
}

/** Build a minimal SkillNode from a ManifestEntry. */
const manifestEntryToSkillNode = (entry: ManifestEntry): SkillNode => ({
  id: entry.id,
  title: { en: entry.name, vi: entry.name, fr: entry.name },
  domain: entry.domain as SkillDomain,
  level: entry.level as SkillNode['level'],
  tags: entry.tags ?? [],
  shortDescription: { en: entry.summary ?? '', vi: entry.summary ?? '', fr: entry.summary ?? '' },

  // Required fields — populated with fresh empty defaults per entry
  whyItMatters: emptyText(),
  situation: emptyText(),
  primaryGoal: emptyText(),
  keyConcepts: emptyStrArr(),
  bodyChecklist: {} as SkillNode['bodyChecklist'],
  decisionTree: [],
  dangerSignals: emptyStrArr(),
  commonMistakes: emptyStrArr(),
  failureResponses: [],
  drills: [],
  skillTests: [],
  prerequisites: [],
  relatedSkills: [],
  bodyMechanicsSystem: {
    overview: emptyText(),
    phases: [],
    globalPrinciples: emptyStrArr(),
    nonNegotiables: emptyStrArr(),
    commonMechanicalErrors: emptyStrArr(),
    correctionCues: emptyStrArr(),
    safetyNotes: emptyStrArr(),
  },

  // Optional fields — derived from tag prefixes where available
  libraryTier: extractTag(entry.tags, 'tier:') as LibraryTier | undefined,
  riskLevel: extractTag(entry.tags, 'risk:') as SkillNode['riskLevel'] | undefined,
  techniqueFamily: extractTag(entry.tags, 'family:') as SkillNode['techniqueFamily'] | undefined,
  modernSystemGroup: extractTag(entry.tags, 'system:') as SkillNode['modernSystemGroup'] | undefined,
  metaStatus: extractTag(entry.tags, 'status:') as SkillNode['metaStatus'] | undefined,
})

// ── Cache ──
let skillsCache: SkillNode[] | undefined

export const getSkills = async (): Promise<SkillNode[]> => {
  if (!skillsCache) {
    const manifest = await getManifest('en')
    skillsCache = manifest.map(manifestEntryToSkillNode)
  }
  return skillsCache
}

export const getSkillById = async (id: string): Promise<SkillNode | undefined> => {
  const skills = await getSkills()
  return skills.find((skill) => skill.id === id)
}

export const getSkillsByDomain = async (domain: SkillDomain | ''): Promise<SkillNode[]> => {
  const skills = await getSkills()
  return domain ? skills.filter((skill) => skill.domain === domain) : skills
}

export const getSkillsByTier = async (tier: LibraryTier | ''): Promise<SkillNode[]> => {
  const skills = await getSkills()
  return tier ? skills.filter((skill) => skill.libraryTier === tier) : skills
}
