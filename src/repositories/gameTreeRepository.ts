import type { GameTree } from '../types/gameTree'
import { readJson, storageKeys, writeJson } from '../utils/storage'

export const defaultGameTree: GameTree = {
  standing: ['hand-fighting', 'single-leg-bjj'],
  guard: ['seated-guard-retention', 'shin-to-shin-entry'],
  passing: ['bodylock-passing', 'headquarters-passing'],
  pinning: ['side-control-pin', 'mount-control'],
  submissions: ['rear-naked-choke-system', 'guillotine-system'],
  escapes: ['side-control-escape', 'mount-escape'],
  legLocks: ['leg-lock-safety-basics', 'straight-ankle-lock-safety'],
}

export const getGameTree = async (): Promise<GameTree> => readJson<GameTree>(storageKeys.gameTree, defaultGameTree)

export const updateGameTree = async (gameTree: GameTree): Promise<GameTree> => writeJson(storageKeys.gameTree, gameTree)
