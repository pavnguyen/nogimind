import { useQuery } from '@tanstack/react-query'
import { getPositionById, getPositions } from '../repositories/positionsRepository'

export const usePositionsQuery = () =>
  useQuery({
    queryKey: ['positions'],
    queryFn: getPositions,
  })

export const usePositionQuery = (positionId: string | undefined) =>
  useQuery({
    queryKey: ['positions', positionId ?? 'unknown'],
    queryFn: () => (positionId ? getPositionById(positionId) : Promise.resolve(undefined)),
  })
