import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Layers3 } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'
import { useArchetypesQuery } from '../queries/archetypeQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getLocalizedArray, getLocalizedText } from '../utils/localization'
import { haystackIncludesQuery, normalizeSearchQuery } from '../utils/searchText'

export default function ArchetypesPage() {
  const { t } = useTranslation()
  const language = useSettingsStore((state) => state.language)
  const [searchParams, setSearchParams] = useSearchParams()
  const archetypesQuery = useArchetypesQuery()
  const archetypes = useMemo(() => archetypesQuery.data ?? [], [archetypesQuery.data])
  const query = searchParams.get('q') ?? ''

  const filtered = useMemo(() => {
    const normalized = normalizeSearchQuery(query)
    if (!normalized) return archetypes
    return archetypes.filter((archetype) => {
      const haystack = [
        getLocalizedText(archetype.title, language),
        archetype.title.en,
        getLocalizedText(archetype.shortDescription, language),
        getLocalizedText(archetype.philosophy, language),
        ...getLocalizedArray(archetype.bestFor, language),
        ...getLocalizedArray(archetype.trainingPriorities, language),
        ...archetype.coreSkillIds,
        ...archetype.coreConceptIds,
      ].join(' ')
      return haystackIncludesQuery(haystack, normalized)
    })
  }, [archetypes, language, query])

  const setQuery = (value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set('q', value)
    else next.delete('q')
    setSearchParams(next)
  }

  return (
    <PageShell
      header={
        <div className="relative overflow-hidden rounded-3xl border border-warm-50/[0.06] bg-warm-900/30 p-5 sm:p-7 lg:p-8 hallmark-hero">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full hallmark-blur-blob blur-[80px]" />
          <div className="relative z-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl hallmark-icon-box sm:h-14 sm:w-14">
              <Layers3 className="h-7 w-7 text-on-accent" aria-hidden="true" />
            </div>
            <div className="w-full min-w-0 sm:w-auto">
              <Badge className="hallmark-badge text-[10px] uppercase tracking-widest">{t('buildHub.badge')}</Badge>
              <h1 className="mt-1 display-heading text-2xl font-extrabold text-warm-50 sm:text-3xl lg:text-4xl">{t('archetypes.heading')}</h1>
              <p className="mt-1 max-w-2xl text-base leading-relaxed text-warm-400">
                {t('archetypes.subtitle')}
              </p>
            </div>
          </div>
        </div>
      }
    >
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t('archetypes.search')}
        className="w-full rounded-md border border-warm-50/10 bg-warm-900 px-3 py-2 text-sm text-warm-50 outline-none focus:border-gold-300"
      />

      <SectionCard>
        {!filtered.length ? <EmptyState title={t('archetypes.empty')} /> : null}
        <div className="grid gap-4 xl:grid-cols-2">
          {filtered.map((archetype) => (
            <Link
              key={archetype.id}
              to={`/archetypes/${archetype.id}`}
              className="group block rounded-lg border border-warm-50/10 bg-warm-950/65 p-4 transition-all hover:border-gold-300/35 hover:bg-warm-50/[0.06]"
            >
              <div className="flex flex-wrap gap-2">
                <Badge tone="jade">{t('archetypes.coreSkillsCount', { count: archetype.coreSkillIds.length })}</Badge>
                <Badge tone="gold">{t('archetypes.conceptsCount', { count: archetype.coreConceptIds.length })}</Badge>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-warm-50 group-hover:text-gold transition-colors">
                {getLocalizedText(archetype.title, language)}
              </h2>
              <p className="mt-2 text-sm leading-6 text-warm-400 line-clamp-2">{getLocalizedText(archetype.shortDescription, language)}</p>
              <p className="mt-3 text-sm leading-6 text-warm-300 line-clamp-2">{getLocalizedText(archetype.philosophy, language)}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-warm-50/10 pt-4">
                <div className="flex flex-wrap gap-2">
                  {archetype.coreSkillIds.slice(0, 3).map((id) => <Badge key={id}>{id}</Badge>)}
                </div>
                <div className="inline-flex items-center gap-1.5 text-sm font-medium text-gold opacity-0 transition-all transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
                  {t('common.open')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  )
}
