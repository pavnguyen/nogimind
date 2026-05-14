import type { LanguageCode, LocalizedStringArray, LocalizedText } from './skill'

export type VideoProvider = 'youtube'

export type VideoRelatedSection =
  | 'system_logic'
  | 'body_position'
  | 'money_details'
  | 'outcomes_branches'
  | 'fix_it_fast'
  | 'safety'

export type VideoTimestamp = {
  id: string
  label: LocalizedText
  timeSeconds: number
  note?: LocalizedText
  relatedSection?: VideoRelatedSection
}

export type VideoRelevance =
  | 'primary_reference'
  | 'supplemental'
  | 'competition_example'
  | 'conceptual'
  | 'safety_reference'

export type VideoLevel =
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'blackbelt'

export type VideoReference = {
  id: string
  provider: VideoProvider
  title: LocalizedText
  channelName: string
  url: string
  embedUrl: string
  youtubeId: string
  language?: LanguageCode | 'unknown'
  relatedSkillIds: string[]
  relatedPositionIds?: string[]
  relatedConceptIds?: string[]
  relatedGlossaryIds?: string[]
  techniqueTags: string[]
  relevance: VideoRelevance
  level: VideoLevel
  timestamps?: VideoTimestamp[]
  whyUseful: LocalizedText
  whatToWatchFor: LocalizedStringArray
  caution?: LocalizedText
  sourceNote?: string
}

