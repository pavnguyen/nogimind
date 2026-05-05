import type { GlossaryTerm } from '../../types/glossary'
import type { LanguageCode } from '../../types/skill'
import { getLocalizedText } from '../../utils/localization'

export const GlossaryTooltip = ({ term, lang }: { term: GlossaryTerm; lang: LanguageCode }) => (
  <span className="group relative inline-flex">
    <span className="cursor-help text-cyan-200 underline decoration-cyan-300/40 underline-offset-4">{term.term}</span>
    <span className="pointer-events-none absolute bottom-full left-0 z-10 mb-2 hidden w-72 rounded-md border border-white/10 bg-slate-950 p-3 text-xs leading-5 text-slate-300 shadow-glow group-hover:block">
      {getLocalizedText(term.definition, lang)}
    </span>
  </span>
)
