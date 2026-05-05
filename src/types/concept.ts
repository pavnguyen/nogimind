import type { LocalizedStringArray, LocalizedText } from './skill'

export type ConceptCategory =
  | 'positional'
  | 'mechanical'
  | 'strategic'
  | 'defensive'
  | 'offensive'
  | 'training'
  | 'safety'
  | 'mindset'

export type ConceptLevel = 'fundamental' | 'intermediate' | 'advanced'

export type ConceptNode = {
  id: string
  title: LocalizedText
  category: ConceptCategory
  level: ConceptLevel
  shortDefinition: LocalizedText
  whyItMatters: LocalizedText
  deepExplanation: LocalizedText
  beginnerView: LocalizedText
  advancedView: LocalizedText
  ifThenExamples: {
    if: LocalizedText
    then: LocalizedText
    why: LocalizedText
    relatedSkillIds: string[]
  }[]
  commonMisunderstandings: {
    misunderstanding: LocalizedText
    correction: LocalizedText
  }[]
  trainingCues: LocalizedStringArray
  relatedSkillIds: string[]
  relatedConceptIds: string[]
  tags: string[]
}
