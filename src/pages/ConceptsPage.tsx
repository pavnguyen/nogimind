import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'
import { BookOpen } from 'lucide-react'
import { conceptCategories } from '../data/concepts'
import { useConceptsQuery } from '../queries/conceptQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import type { ConceptCategory } from '../types/concept'
import { getLocalizedArray, getLocalizedText } from '../utils/localization'

export default function ConceptsPage() {
  const { t } = useTranslation()
  const language = useSettingsStore((state) => state.language)
  const [searchParams, setSearchParams] = useSearchParams()
  const concepts = useConceptsQuery().data ?? []
  const query = searchParams.get('q') ?? ''
  const category = conceptCategories.includes(searchParams.get('category') as ConceptCategory) ? (searchParams.get('category') as ConceptCategory) : ''

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return concepts.filter((concept) => {
      if (category && concept.category !== category) return false
      if (!normalized) return true
      const haystack = [
        getLocalizedText(concept.title, language),
        concept.title.en,
        getLocalizedText(concept.shortDefinition, language),
        getLocalizedText(concept.whyItMatters, language),
        getLocalizedText(concept.deepExplanation, language),
        ...getLocalizedArray(concept.trainingCues, language),
        ...concept.tags,
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(normalized)
    })
  }, [category, concepts, language, query])

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  return (
    <PageShell
      header={
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg">
              <BookOpen className="h-5 w-5 text-slate-950" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">{t('concepts.heading')}</h1>
              <p className="text-sm text-slate-400">{t('concepts.whatFor')}</p>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1fr_260px]">
        <input
          value={query}
          onChange={(event) => setParam('q', event.target.value)}
          placeholder={t('concepts.search')}
          className="w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
        />
        <select
          value={category}
          onChange={(event) => setParam('category', event.target.value)}
          className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
        >
          <option value="">{t('common.all')}</option>
          {conceptCategories.map((item) => (
            <option key={item} value={item}>{t(`conceptCategories.${item}`)}</option>
          ))}
        </select>
      </div>
    </div>
  }
>
      <SectionCard>
        {!filtered.length ? <EmptyState title={t('concepts.empty')} description={t('concepts.nextStep')} /> : null}
        <div className="grid gap-4 xl:grid-cols-2">
          {filtered.map((concept) => (
            <article key={concept.id} className="group rounded-xl border border-white/[0.06] bg-slate-900/40 p-5 transition-all hover:border-cyan-400/20 hover:bg-slate-900/70">
              <div className="flex flex-wrap gap-2">
                <Badge tone="cyan">{t(`conceptCategories.${concept.category}`)}</Badge>
                <Badge tone="emerald">{t(`conceptLevels.${concept.level}`)}</Badge>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-white">{getLocalizedText(concept.title, language)}</h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{getLocalizedText(concept.shortDefinition, language)}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
                <div className="flex flex-wrap gap-2">
                  {concept.tags.slice(0, 3).map((tag) => <Badge key={tag}>{tag}</Badge>)}
                </div>
                <Link to={`/concepts/${concept.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-emerald-200 opacity-0 transition-opacity group-hover:opacity-100">
                  {t('common.open')}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  )
}
