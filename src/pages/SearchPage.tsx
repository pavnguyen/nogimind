import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Search as SearchIcon } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { SectionCard } from '../components/common/SectionCard'
import { PageShell } from '../components/common/PageShell'
import { useSettingsStore } from '../stores/useSettingsStore'
import { useSearchStore } from '../stores/useSearchStore'
import type { KnowledgeItemType } from '../types/knowledgeSearch'
import { searchKnowledge } from '../utils/knowledgeSearch'
import { getLocalizedText } from '../utils/localization'

const coreResultTypes: KnowledgeItemType[] = ['skill', 'concept', 'position']
const advancedResultTypes: KnowledgeItemType[] = ['micro_detail', 'technique_chain', 'troubleshooter', 'escape_map', 'glossary', 'defense', 'archetype', 'mastery']
const filterTypes = [...coreResultTypes, ...advancedResultTypes]

export default function SearchPage() {
  const { t } = useTranslation()
  const language = useSettingsStore((state) => state.language)
  const [searchParams, setSearchParams] = useSearchParams()
  const query = useSearchStore((state) => state.query)
  const type = useSearchStore((state) => state.type)
  const setQuery = useSearchStore((state) => state.setQuery)
  const setType = useSearchStore((state) => state.setType)
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  useEffect(() => {
    const legacyQuery = searchParams.get('q')
    const legacyType = searchParams.get('type')
    if (legacyQuery && legacyQuery !== query) setQuery(legacyQuery)
    if (legacyType && filterTypes.includes(legacyType as KnowledgeItemType) && legacyType !== type) {
      setType(legacyType as KnowledgeItemType)
    }
    if (legacyQuery || legacyType) {
      setSearchParams({}, { replace: true })
    }
  }, [query, setQuery, setSearchParams, setType, searchParams, type])

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedQuery(query), 160)
    return () => window.clearTimeout(timeout)
  }, [query])

  const results = useMemo(() => searchKnowledge(debouncedQuery, language, { type }), [debouncedQuery, language, type])
  const grouped = useMemo(
    () => (type ? filterTypes : coreResultTypes).map((itemType) => ({ type: itemType, results: results.filter((result) => result.type === itemType) })).filter((group) => group.results.length),
    [results, type],
  )

  return (
    <PageShell
      header={
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">{t('search.heading')}</h1>
            <p className="mt-1 text-sm text-slate-400">{t('search.whatFor')}</p>
          </div>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('search.placeholder')}
                className="w-full rounded-xl border border-white/[0.08] bg-slate-900/80 py-2.5 pl-10 pr-3 text-sm text-white outline-none transition-all focus:border-emerald-400/30 focus:shadow-[0_0_0_1px_rgba(52,211,153,0.15)]"
              />
            </div>
            <select
              value={type}
              onChange={(event) => setType(event.target.value as KnowledgeItemType | '')}
              className="rounded-xl border border-white/[0.08] bg-slate-900/80 px-3 py-2.5 text-sm text-white outline-none transition-all focus:border-emerald-400/30"
            >
              <option value="">{t('common.all')}</option>
              {coreResultTypes.map((itemType) => <option key={itemType} value={itemType}>{t(`knowledgeTypes.${itemType}`)}</option>)}
              <optgroup label={t('search.advancedFilters')}>
                {advancedResultTypes.map((itemType) => <option key={itemType} value={itemType}>{t(`knowledgeTypes.${itemType}`)}</option>)}
              </optgroup>
            </select>
          </div>
        </div>
      }
    >
      {!query.trim() ? (
        <EmptyState title={t('search.emptyQuery')} description={t('search.emptyQueryBody')} />
      ) : null}
      {query.trim() && !results.length ? (
        <EmptyState title={t('search.noResults')} description={t('search.nextStep')} />
      ) : null}

      {grouped.map((group) => (
        <SectionCard key={group.type} title={t(`knowledgeTypes.${group.type}`)} description={t('search.resultCount', { count: group.results.length })}>
          <div className="grid gap-3 xl:grid-cols-2">
            {group.results.map((result) => (
              <article key={`${result.type}-${result.id}`} className="group rounded-xl border border-white/[0.06] bg-slate-900/40 p-5 transition-all hover:border-emerald-400/20 hover:bg-slate-900/70">
                <div className="flex flex-wrap gap-2">
                  <Badge tone="cyan">{t(`knowledgeTypes.${result.type}`)}</Badge>
                </div>
                <Link to={result.url} className="mt-3 block">
                  <h2 className="text-base font-semibold text-white group-hover:text-emerald-100">
                    {getLocalizedText(result.title, language)}
                  </h2>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-slate-400">
                    {getLocalizedText(result.description, language)}
                  </p>
                </Link>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchedFields.slice(0, 3).map((field) => (
                      <Badge key={field} tone="slate">{field}</Badge>
                    ))}
                  </div>
                  <Link to={result.url} className="inline-flex items-center gap-1 text-sm font-medium text-emerald-200 opacity-0 transition-opacity group-hover:opacity-100">
                    {t('common.open')}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      ))}
    </PageShell>
  )
}
