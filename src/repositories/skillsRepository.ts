import type { LibraryTier, SkillDomain, SkillNode } from '../types/skill'

let skillsCache: SkillNode[] | undefined

export const getSkills = async () => {
  if (!skillsCache) {
    const module = await import('../data/skillNodes')
    skillsCache = module.skillNodes
  }
  return skillsCache
}

export const getSkillById = async (id: string) => {
  const skills = await getSkills()
  return skills.find((skill) => skill.id === id)
}

export const getSkillsByDomain = async (domain: SkillDomain | '') => {
  const skills = await getSkills()
  return domain ? skills.filter((skill) => skill.domain === domain) : skills
}

export const getSkillsByTier = async (tier: LibraryTier | '') => {
  const skills = await getSkills()
  return tier ? skills.filter((skill) => skill.libraryTier === tier) : skills
}
