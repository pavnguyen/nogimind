import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'
import { Sword } from 'lucide-react'
import { useArchetypesQuery } from '../queries/archetypeQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getLocalizedArray, getLocalizedText } from '../utils/localization'

export default function ArchetypesPage() {
  const { t } = useTranslation()
  const language = useSettingsStore((state) => state.language)
  const [searchParams, setSearchParams] = useSearchParams()
  const archetypes = useArchetypesQuery().data ?? []
  const query = searchParams.get('q') ?? ''

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
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
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(normalized)
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
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg">
            <Sword className="h-5 w-5 text-slate-950" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">{t('archetypes.heading')}</h1>
            <p className="text-sm text-slate-400">{t('archetypes.whatFor')}</p>
          </div>
        </div>
      }
    >
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t('archetypes.search')}
        className="w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
      />

      <SectionCard>
        {!filtered.length ? <EmptyState title={t('archetypes.empty')} /> : null}
        <div className="grid gap-4 xl:grid-cols-2">
          {filtered.map((archetype) => (
            <Link
              key={archetype.id}
              to={`/archetypes/${archetype.id}`}
              className="group block rounded-lg border border-white/10 bg-slate-950/65 p-4 transition-all hover:border-cyan-300/35 hover:bg-white/[0.06]"
            >
              <div className="flex flex-wrap gap-2">
                <Badge tone="emerald">{t('archetypes.coreSkillsCount', { count: archetype.coreSkillIds.length })}</Badge>
                <Badge tone="cyan">{t('archetypes.conceptsCount', { count: archetype.coreConceptIds.length })}</Badge>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                {getLocalizedText(archetype.title, language)}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400 line-clamp-2">{getLocalizedText(archetype.shortDescription, language)}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300 line-clamp-2">{getLocalizedText(archetype.philosophy, language)}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                <div className="flex flex-wrap gap-2">
                  {archetype.coreSkillIds.slice(0, 3).map((id) => <Badge key={id}>{id}</Badge>)}
                </div>
                <div className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-200 opacity-0 transition-all transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
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
