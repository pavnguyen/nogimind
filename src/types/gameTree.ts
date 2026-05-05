export type GameTree = {
  standing: string[]
  guard: string[]
  passing: string[]
  pinning: string[]
  submissions: string[]
  escapes: string[]
  legLocks: string[]
}

export type GameTreeLaneId = keyof GameTree
