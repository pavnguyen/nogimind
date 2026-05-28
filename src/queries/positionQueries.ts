import { useQuery } from '@tanstack/react-query'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getPositionById, getPositions } from '../repositories/positionsRepository'

export const usePositionsQuery = () => {
  const language = useSettingsStore((state) => state.language)
  return useQuery({
    queryKey: ['positions', language],
    queryFn: getPositions,
  })
}

export const usePositionQuery = (positionId: string | undefined) => {
  const language = useSettingsStore((state) => state.language)
  return useQuery({
    queryKey: ['positions', positionId ?? 'unknown', language],
    queryFn: () => (positionId ? getPositionById(positionId) : Promise.resolve(undefined)),
  })
}
