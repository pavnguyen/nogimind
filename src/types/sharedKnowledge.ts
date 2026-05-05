import type { LocalizedText } from './skill'

export type SharedKnowledgeCategory =
  | 'principle'
  | 'cue'
  | 'common_error'
  | 'correction'
  | 'safety'
  | 'body_mechanic'
  | 'finishing_principle'
  | 'defensive_principle'
  | 'training_principle'

export type SharedKnowledgeItem = {
  id: string
  category: SharedKnowledgeCategory
  title: LocalizedText
  shortText: LocalizedText
  deepText?: LocalizedText
  tags: string[]
  relatedConceptIds?: string[]
  relatedSkillIds?: string[]
}
