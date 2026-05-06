import { useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { SectionCard } from '../components/common/SectionCard'
import { PagePurposeBanner } from '../components/learning/PagePurposeBanner'
import { useSettingsStore } from '../stores/useSettingsStore'
import { useSearchStore } from '../stores/useSearchStore'
import type { KnowledgeItemType } from '../types/knowledgeSearch'
import { getNextBestLinksForSkill } from '../utils/knowledgeGraph'
import { searchKnowledge } from '../utils/knowledgeSearch'
import { getLocalizedText } from '../utils/localization'

const resultTypes: KnowledgeItemType[] = ['skill', 'shared_knowledge', 'micro_detail', 'technique_chain', 'troubleshooter', 'escape_map', 'concept', 'position', 'glossary', 'defense', 'archetype', 'mastery']

export default function SearchPage() {
  const { t } = useTranslation()
  const language = useSettingsStore((state) => state.language)
  const [searchParams, setSearchParams] = useSearchParams()
  const query = useSearchStore((state) => state.query)
  const type = useSearchStore((state) => state.type)
  const setQuery = useSearchStore((state) => state.setQuery)
  const setType = useSearchStore((state) => state.setType)

  useEffect(() => {
    const legacyQuery = searchParams.get('q')
    const legacyType = searchParams.get('type')
    if (legacyQuery && legacyQuery !== query) setQuery(legacyQuery)
    if (legacyType && resultTypes.includes(legacyType as KnowledgeItemType) && legacyType !== type) {
      setType(legacyType as KnowledgeItemType)
    }
    if (legacyQuery || legacyType) {
      setSearchParams({}, { replace: true })
    }
  }, [query, setQuery, setSearchParams, setType, searchParams, type])

  const results = useMemo(() => searchKnowledge(query, language, { type }), [language, query, type])
  const grouped = useMemo(
    () => resultTypes.map((itemType) => ({ type: itemType, results: results.filter((result) => result.type === itemType) })).filter((group) => group.results.length),
    [results],
  )

  return (
    <div className="space-y-6">
      <PagePurposeBanner
        title={t('search.heading')}
        purpose={t('search.whatFor')}
        whenToUse={t('search.whenToUse')}
        bestNextStepLabel={t('search.nextStep')}
        bestNextStepTo="/skills"
      />

      <div className="grid gap-3 lg:grid-cols-[1fr_260px]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('search.placeholder')}
          className="w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
        />
        <select
          value={type}
          onChange={(event) => setType(event.target.value as KnowledgeItemType | '')}
          className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
        >
          <option value="">{t('common.all')}</option>
          {resultTypes.map((itemType) => <option key={itemType} value={itemType}>{t(`knowledgeTypes.${itemType}`)}</option>)}
        </select>
      </div>

      {!query.trim() ? <EmptyState title={t('search.emptyQuery')} description={t('search.emptyQueryBody')} /> : null}
      {query.trim() && !results.length ? <EmptyState title={t('search.noResults')} description={t('search.nextStep')} /> : null}

      {grouped.map((group) => (
        <SectionCard key={group.type} title={t(`knowledgeTypes.${group.type}`)} description={t('search.resultCount', { count: group.results.length })}>
          <div className="grid gap-3 xl:grid-cols-2">
            {group.results.map((result) => (
            <article key={`${result.type}-${result.id}`} className="rounded-lg border border-white/10 bg-slate-950/65 p-4 transition hover:border-cyan-300/35 hover:bg-white/[0.06]">
              <div className="flex flex-wrap gap-2">
                <Badge tone="cyan">{t(`knowledgeTypes.${result.type}`)}</Badge>
                <Badge tone="emerald">{t('search.score', { score: result.score })}</Badge>
              </div>
              <Link to={result.url} className="mt-3 block">
                <h2 className="text-lg font-semibold text-white">{getLocalizedText(result.title, language)}</h2>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{getLocalizedText(result.description, language)}</p>
              </Link>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                <div className="flex flex-wrap gap-2">
                  {result.matchedFields.slice(0, 4).map((field) => <Badge key={field}>{field}</Badge>)}
                </div>
                <Link to={result.url} className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-200">
                  {t('common.open')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              {result.type === 'skill' ? (
                <div className="mt-3 flex flex-wrap gap-2 border-t border-white/10 pt-3">
                  {getNextBestLinksForSkill(result.id)
                    .filter((link) => ['quick_card', 'micro_detail', 'troubleshooter', 'escape_map'].includes(link.type))
                    .slice(0, 4)
                    .map((link) => (
                      <Link
                        key={`${result.id}-${link.type}-${link.id}`}
                        to={link.url}
                        className="rounded-md border border-cyan-300/20 px-2 py-1 text-xs font-medium text-cyan-100 hover:bg-white/10"
                      >
                        {getLocalizedText(link.title, language)}
                      </Link>
                    ))}
                </div>
              ) : null}
            </article>
            ))}
          </div>
        </SectionCard>
      ))}
    </div>
  )
}
