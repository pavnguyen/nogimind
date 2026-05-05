import { useQuery } from '@tanstack/react-query'
import { getDefensiveLayerById, getDefensiveLayers } from '../repositories/defensiveLayersRepository'

export const useDefensiveLayersQuery = () =>
  useQuery({
    queryKey: ['defensiveLayers'],
    queryFn: getDefensiveLayers,
  })

export const useDefensiveLayerQuery = (layerId: string | undefined) =>
  useQuery({
    queryKey: ['defensiveLayers', layerId ?? 'unknown'],
    queryFn: () => (layerId ? getDefensiveLayerById(layerId) : Promise.resolve(undefined)),
  })
