import type { LocalizedText } from './skill'

export type KnowledgeItemType =
  | 'skill'
  | 'concept'
  | 'position'
  | 'glossary'
  | 'defense'
  | 'micro_detail'
  | 'troubleshooter'
  | 'escape_map'
  | 'archetype'
  | 'mastery'

export type KnowledgeSearchResult = {
  id: string
  type: KnowledgeItemType
  title: LocalizedText
  description: LocalizedText
  tags: string[]
  url: string
  score: number
  matchedFields: string[]
}
