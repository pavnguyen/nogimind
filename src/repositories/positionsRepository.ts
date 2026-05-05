import { positions } from '../data/positions'

export const getPositions = async () => positions

export const getPositionById = async (id: string) => positions.find((position) => position.id === id)
