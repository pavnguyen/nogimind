import type { LocalizedStringArray, LocalizedText } from './skill'

export type PositionCategory =
  | 'standing'
  | 'top_control'
  | 'bottom_guard'
  | 'pin'
  | 'back'
  | 'turtle'
  | 'front_headlock'
  | 'leg_entanglement'
  | 'scramble'
  | 'submission_threat'

export type PositionalStatus =
  | 'dominant'
  | 'advantage'
  | 'neutral'
  | 'defensive'
  | 'dangerous'
  | 'critical'

export type PositionNode = {
  id: string
  title: LocalizedText
  category: PositionCategory
  status: PositionalStatus
  description: LocalizedText
  topPlayerGoals: LocalizedStringArray
  bottomPlayerGoals: LocalizedStringArray
  controlPoints: LocalizedStringArray
  escapePriorities: LocalizedStringArray
  advancementOptions: {
    action: LocalizedText
    nextPositionId?: string
    relatedSkillIds: string[]
    why: LocalizedText
  }[]
  dangerSignals: LocalizedStringArray
  relatedSkillIds: string[]
  relatedConceptIds: string[]
}
