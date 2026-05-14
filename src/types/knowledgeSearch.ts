import type { LocalizedText } from './skill'

export type KnowledgeItemType =
  | 'skill'
  | 'shared_knowledge'
  | 'concept'
  | 'position'
  | 'glossary'
  | 'defense'
  | 'micro_detail'
  | 'technique_chain'
  | 'troubleshooter'
  | 'escape_map'
  | 'archetype'
  | 'mastery'
  | 'video_reference'

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
