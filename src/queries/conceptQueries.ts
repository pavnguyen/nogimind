import { useQuery } from '@tanstack/react-query'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getConceptById, getConcepts } from '../repositories/conceptsRepository'

export const useConceptsQuery = () => {
  const language = useSettingsStore((state) => state.language)
  return useQuery({
    queryKey: ['concepts', language],
    queryFn: getConcepts,
  })
}

export const useConceptQuery = (conceptId: string | undefined) => {
  const language = useSettingsStore((state) => state.language)
  return useQuery({
    queryKey: ['concepts', conceptId ?? 'unknown', language],
    queryFn: () => (conceptId ? getConceptById(conceptId) : Promise.resolve(undefined)),
  })
}
