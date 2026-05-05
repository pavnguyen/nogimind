import type { GameTree } from './gameTree'

export type UserDataExport = {
  version: 1
  exportedAt: string
  gameTree: GameTree
  settings: unknown
}
