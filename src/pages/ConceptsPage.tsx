import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { FilterChip, FilterChipRow } from '../components/common/FilterChip'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'
import { BookOpen } from 'lucide-react'
import { conceptCategories } from '../data/concepts'
import { useConceptsQuery } from '../queries/conceptQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import type { ConceptCategory } from '../types/concept'
import { getLocalizedArray, getLocalizedText } from '../utils/localization'
import { haystackIncludesQuery, normalizeSearchQuery } from '../utils/searchText'
import { formatTagLabel } from '../utils/tagLabel'

export default function ConceptsPage() {
  const { t } = useTranslation()
  const language = useSettingsStore((state) => state.language)
  const [searchParams, setSearchParams] = useSearchParams()
  const conceptsQuery = useConceptsQuery()
  const concepts = useMemo(() => conceptsQuery.data ?? [], [conceptsQuery.data])
  const query = searchParams.get('q') ?? ''
  const category = conceptCategories.includes(searchParams.get('category') as ConceptCategory) ? (searchParams.get('category') as ConceptCategory) : ''

  const filtered = useMemo(() => {
    const normalizedQuery = normalizeSearchQuery(query)
    return concepts.filter((concept) => {
      if (category && concept.category !== category) return false
      const haystack = [
        getLocalizedText(concept.title, language),
        concept.title.en,
        getLocalizedText(concept.shortDefinition, language),
        getLocalizedText(concept.whyItMatters, language),
        getLocalizedText(concept.deepExplanation, language),
        ...getLocalizedArray(concept.trainingCues, language),
        ...concept.tags,
      ].join(' ')
      return haystackIncludesQuery(haystack, normalizedQuery)
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-gold-400 to-steel-500 shadow-lg">
              <BookOpen className="h-5 w-5 text-on-accent" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-warm-50">{t('concepts.heading')}</h1>
              <p className="text-sm text-warm-400">{t('concepts.whatFor')}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <input
              value={query}
              onChange={(event) => setParam('q', event.target.value)}
              placeholder={t('concepts.search')}
              className="w-full rounded-md border border-warm-50/10 bg-warm-900 px-3 py-2 text-sm text-warm-50 outline-none focus:border-gold-300"
            />
            
            <FilterChipRow label={t('common.filters')}>
              <FilterChip active={!category} onClick={() => setParam('category', '')}>
                {t('common.all')}
              </FilterChip>
              {conceptCategories.map((item) => (
                <FilterChip key={item} active={category === item} onClick={() => setParam('category', item)}>
                  {t(`conceptCategories.${item}`)}
                </FilterChip>
              ))}
            </FilterChipRow>
          </div>
        </div>
      }
    >
      <SectionCard>
        {!filtered.length ? <EmptyState title={t('concepts.empty')} description={t('concepts.nextStep')} /> : null}
        <div className="grid gap-4 xl:grid-cols-2">
          {filtered.map((concept) => (
            <Link
              key={concept.id}
              to={`/concepts/${concept.id}`}
              className="group block rounded-xl border border-warm-50/[0.06] bg-warm-900/40 p-5 transition-all hover:border-gold-400/20 hover:bg-warm-900/70"
            >
              {/* One tag per card plus a quiet level dot: two identically
                  shaped pills sitting side by side read as nested badges. */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <Badge tone="gold">{t(`conceptCategories.${concept.category}`)}</Badge>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-warm-400">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-jade-400" aria-hidden="true" />
                  {t(`conceptLevels.${concept.level}`)}
                </span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-warm-50 group-hover:text-gold transition-colors">
                {getLocalizedText(concept.title, language)}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-warm-400">{getLocalizedText(concept.shortDefinition, language)}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-warm-50/[0.06] pt-4">
                <div className="flex flex-wrap gap-2">
                  {concept.tags.slice(0, 3).map((tag) => <Badge key={tag}>{formatTagLabel(tag)}</Badge>)}
                </div>
                <div className="inline-flex items-center gap-1 text-sm font-medium text-jade opacity-0 transition-all transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
                  {t('common.open')}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  )
}
