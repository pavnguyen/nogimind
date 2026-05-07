import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { GlossaryTerm } from '../../types/glossary'
import type { LanguageCode } from '../../types/skill'
import { getLocalizedTechnicalText } from '../../utils/localization'

type Props = {
  term: GlossaryTerm
  lang: LanguageCode
  children?: string
  relatedSkills?: string[]
}

export const InlineGlossaryLink = ({ term, lang, children, relatedSkills = [] }: Props) => {
  const { t } = useTranslation()
  const definition = getLocalizedTechnicalText(term.definition, lang)

  return (
    <Link
      to={`/glossary?q=${encodeURIComponent(term.term)}`}
      className="group relative inline-flex items-center gap-1 text-cyan-200 underline decoration-cyan-300/40 underline-offset-4 hover:text-cyan-100"
    >
      <span>{children ?? term.term}</span>
      <span className="pointer-events-none absolute left-0 top-full z-10 mt-2 hidden w-80 rounded-md border border-white/10 bg-slate-950 p-3 text-left text-xs leading-5 text-slate-300 shadow-glow group-hover:block">
        <span className="block font-semibold text-white">{term.term}</span>
        <span className="mt-1 block">{definition}</span>
        {relatedSkills.length ? (
          <>
            <span className="mt-2 block text-[10px] font-semibold uppercase tracking-wide text-slate-500">{t('glossary.relatedSkills')}</span>
            <span className="mt-1 block text-slate-400">{relatedSkills.join(' / ')}</span>
          </>
        ) : null}
      </span>
    </Link>
  )
}
