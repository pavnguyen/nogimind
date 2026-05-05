import type { LocalizedStringArray, LocalizedText } from './skill'

export type TrainingMethodCategory =
  | 'drilling'
  | 'resistance'
  | 'positional'
  | 'live'
  | 'competition'
  | 'reflection'
  | 'safety'

export type TrainingMethod = {
  id: string
  title: LocalizedText
  category: TrainingMethodCategory
  shortDescription: LocalizedText
  purpose: LocalizedText
  howToRun: LocalizedStringArray
  bestForSkillIds: string[]
  bestForConceptIds: string[]
  roundStructureExamples: LocalizedStringArray
  commonMistakes: LocalizedStringArray
  coachingCues: LocalizedStringArray
  safetyNotes: LocalizedStringArray
}
