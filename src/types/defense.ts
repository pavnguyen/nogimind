import type { LocalizedStringArray, LocalizedText } from './skill'

export type SafetyCategory =
  | 'leg_lock'
  | 'neck'
  | 'spine'
  | 'shoulder'
  | 'knee'
  | 'scramble'
  | 'training_etiquette'
  | 'tapping'

export type DefensiveLayer = {
  id: string
  title: LocalizedText
  category: SafetyCategory
  threat: LocalizedText
  earlyDangerSignals: LocalizedStringArray
  lateDangerSignals: LocalizedStringArray
  immediatePriorities: LocalizedStringArray
  safeResponses: LocalizedStringArray
  unsafeResponses: LocalizedStringArray
  relatedSkillIds: string[]
  relatedConceptIds: string[]
  trainingAdvice: LocalizedText
}
