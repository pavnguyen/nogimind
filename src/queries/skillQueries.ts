import { useQuery } from '@tanstack/react-query'
import { getSkillById, getSkills, getSkillsByDomain, getSkillsByTier } from '../repositories/skillsRepository'
import type { LibraryTier, SkillDomain } from '../types/skill'

export const useSkillsQuery = () =>
  useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
  })

export const useSkillQuery = (skillId: string | undefined) =>
  useQuery({
    queryKey: ['skills', skillId ?? 'unknown'],
    queryFn: () => (skillId ? getSkillById(skillId) : Promise.resolve(undefined)),
  })

export const useSkillsByDomainQuery = (domain: SkillDomain | '') =>
  useQuery({
    queryKey: ['skills', 'domain', domain || 'all'],
    queryFn: () => getSkillsByDomain(domain),
  })

export const useSkillsByTierQuery = (tier: LibraryTier | '') =>
  useQuery({
    queryKey: ['skills', 'tier', tier || 'all'],
    queryFn: () => getSkillsByTier(tier),
  })
