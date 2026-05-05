import { useQuery } from '@tanstack/react-query'
import { getGlossaryTerms } from '../repositories/glossaryRepository'

export const useGlossaryQuery = () =>
  useQuery({
    queryKey: ['glossary'],
    queryFn: getGlossaryTerms,
  })
