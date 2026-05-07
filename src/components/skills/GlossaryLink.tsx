import type { GlossaryTerm } from '../../types/glossary'
import { InlineGlossaryLink } from '../glossary/InlineGlossaryLink'
import type { LanguageCode } from '../../types/skill'

const conceptKey = (text: string) => text.split(':')[0].trim().toLowerCase()

export const GlossaryLink = ({ text, terms, lang }: { text: string; terms: GlossaryTerm[]; lang: LanguageCode }) => {
  const key = conceptKey(text)
  const term = terms.find((item) => item.term.toLowerCase() === key || item.id === key.replaceAll(' ', '-'))
  if (!term) return <span>{text}</span>
  return <InlineGlossaryLink term={term} lang={lang}>{text}</InlineGlossaryLink>
}
