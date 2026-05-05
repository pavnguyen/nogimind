import { useQuery } from '@tanstack/react-query'
import { getArchetypeById, getArchetypes } from '../repositories/archetypesRepository'

export const useArchetypesQuery = () =>
  useQuery({
    queryKey: ['archetypes'],
    queryFn: getArchetypes,
  })

export const useArchetypeQuery = (archetypeId: string | undefined) =>
  useQuery({
    queryKey: ['archetypes', archetypeId ?? 'unknown'],
    queryFn: () => (archetypeId ? getArchetypeById(archetypeId) : Promise.resolve(undefined)),
  })
