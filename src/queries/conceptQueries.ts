import { useQuery } from '@tanstack/react-query'
import { getConceptById, getConcepts } from '../repositories/conceptsRepository'

export const useConceptsQuery = () =>
  useQuery({
    queryKey: ['concepts'],
    queryFn: getConcepts,
  })

export const useConceptQuery = (conceptId: string | undefined) =>
  useQuery({
    queryKey: ['concepts', conceptId ?? 'unknown'],
    queryFn: () => (conceptId ? getConceptById(conceptId) : Promise.resolve(undefined)),
  })
