import type { LocalizedStringArray, LocalizedText } from './skill'

export type GrapplingArchetype = {
  id: string
  title: LocalizedText
  shortDescription: LocalizedText
  philosophy: LocalizedText
  bestFor: LocalizedStringArray
  notIdealFor: LocalizedStringArray
  coreConceptIds: string[]
  coreSkillIds: string[]
  supportSkillIds: string[]
  requiredDefensiveSkillIds: string[]
  commonWeaknesses: LocalizedStringArray
  trainingPriorities: LocalizedStringArray
  ifThenStrategy: {
    if: LocalizedText
    then: LocalizedText
    why: LocalizedText
    skillIds: string[]
  }[]
}
