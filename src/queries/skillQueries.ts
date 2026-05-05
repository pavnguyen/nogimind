import { useQuery } from '@tanstack/react-query'
import { getSkillById, getSkills } from '../repositories/skillsRepository'

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
