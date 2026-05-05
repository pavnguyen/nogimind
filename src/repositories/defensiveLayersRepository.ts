import { defensiveLayers } from '../data/defensiveLayers'

export const getDefensiveLayers = async () => defensiveLayers

export const getDefensiveLayerById = async (id: string) => defensiveLayers.find((layer) => layer.id === id)
