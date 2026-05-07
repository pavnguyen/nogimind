import { useMemo, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useVirtualizer } from '@tanstack/react-virtual'
import { SectionCard } from '../components/common/SectionCard'
import { PagePurposeBanner } from '../components/learning/PagePurposeBanner'
import { useGlossaryQuery } from '../queries/glossaryQueries'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getLocalizedArray, getLocalizedTechnicalText, getLocalizedText } from '../utils/localization'

export default function GlossaryPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const language = useSettingsStore((state) => state.language)
  const terms = useGlossaryQuery().data ?? []
  const skills = useSkillsQuery().data ?? []
  const byId = new Map(skills.map((skill) => [skill.id, skill]))
  const query = searchParams.get('q') ?? ''
  const parentRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return terms
    return terms.filter((term) => {
      const haystack = [
        term.term,
        getLocalizedTechnicalText(term.definition, language),
        ...getLocalizedArray(term.examples, language),
      ].join(' ').toLowerCase()
      return haystack.includes(normalized)
    })
  }, [language, query, terms])

  const virtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 190,
    overscan: 6,
  })

  const setQuery = (value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set('q', value)
    else next.delete('q')
    setSearchParams(next)
  }

  return (
    <div className="space-y-6">
      <PagePurposeBanner
        title={t('glossary.heading')}
        purpose={t('glossary.subtitle')}
        whenToUse={t('search.nextStep')}
        bestNextStepLabel={t('search.nextStep')}
        bestNextStepTo="/search"
      />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t('glossary.q')}
        className="w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
      />
      <SectionCard>
        <div ref={parentRef} className="h-[720px] overflow-auto pr-2">
          <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
            {virtualizer.getVirtualItems().map((virtualItem) => {
              const term = filtered[virtualItem.index]
              return (
                <article
                  key={term.id}
                  className="absolute left-0 right-0 rounded-lg border border-white/10 bg-slate-900/70 p-4"
                  style={{ transform: `translateY(${virtualItem.start}px)` }}
                >
                  <h2 className="text-lg font-semibold text-white">{term.term}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{getLocalizedTechnicalText(term.definition, language)}</p>
                  <ul className="mt-3 space-y-1 text-sm text-slate-400">
                    {getLocalizedArray(term.examples, language).map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                  {term.relatedSkillIds?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {term.relatedSkillIds.map((id) => byId.get(id)).filter(Boolean).map((skill) => (
                        <Link key={skill?.id} to={`/skills/${skill?.id}`} className="rounded-md border border-cyan-300/20 px-2 py-1 text-xs text-cyan-100">
                          {getLocalizedText(skill?.title, language)}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </article>
              )
            })}
          </div>
        </div>
      </SectionCard>
    </div>
  )
}
