import type { LocalizedStringArray, LocalizedText } from './skill'

export type GlossaryTerm = {
  id: string
  term: string
  definition: LocalizedText
  examples: LocalizedStringArray
  relatedSkillIds?: string[]
}
