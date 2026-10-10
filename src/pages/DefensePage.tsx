import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'
import { Shield } from 'lucide-react'
import { safetyCategories } from '../data/defensiveLayers'
import { useDefensiveLayersQuery } from '../queries/defenseQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import type { SafetyCategory } from '../types/defense'
import { getLocalizedArray, getLocalizedText } from '../utils/localization'
import { haystackIncludesQuery, normalizeSearchQuery } from '../utils/searchText'

export default function DefensePage() {
  const { t } = useTranslation()
  const language = useSettingsStore((state) => state.language)
  const [searchParams, setSearchParams] = useSearchParams()
  const layersQuery = useDefensiveLayersQuery()
  const layers = useMemo(() => layersQuery.data ?? [], [layersQuery.data])
  const query = searchParams.get('q') ?? ''
  const category = safetyCategories.includes(searchParams.get('category') as SafetyCategory) ? (searchParams.get('category') as SafetyCategory) : ''

  const filtered = useMemo(() => {
    const normalized = normalizeSearchQuery(query)
    return layers.filter((layer) => {
      if (category && layer.category !== category) return false
      const haystack = [
        getLocalizedText(layer.title, language),
        layer.title.en,
        getLocalizedText(layer.threat, language),
        ...getLocalizedArray(layer.earlyDangerSignals, language),
        ...getLocalizedArray(layer.immediatePriorities, language),
        ...getLocalizedArray(layer.safeResponses, language),
      ].join(' ')
      return haystackIncludesQuery(haystack, normalized)
    })
  }, [category, language, layers, query])

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  return (
    <PageShell
      header={
        <div className="relative overflow-hidden rounded-3xl border border-warm-50/[0.06] bg-warm-900/30 p-5 hero-blob-fix sm:p-6">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-400/5 blur-[80px]" />
          <div className="relative z-10 space-y-4">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-gold-500 to-copper-500 shadow-lg shadow-gold-500/20">
                <Shield className="h-6 w-6 text-on-accent" aria-hidden="true" />
              </div>
              <div className="w-full min-w-0 sm:w-auto">
                <Badge tone="gold" className="text-[10px] uppercase tracking-widest">{t('nav.defense')}</Badge>
                <h1 className="mt-1 display-heading text-2xl font-extrabold text-warm-50 lg:text-3xl">{t('defense.heading')}</h1>
                <p className="mt-1 text-sm text-warm-400">{t('defense.subtitle')}</p>
              </div>
            </div>

          <div className="grid gap-3 lg:grid-cols-[1fr_260px]">
        <input
          value={query}
          onChange={(event) => setParam('q', event.target.value)}
          placeholder={t('defense.search')}
          className="w-full rounded-md border border-warm-50/10 bg-warm-900 px-3 py-2 text-sm text-warm-50 outline-none search-focus-ring"
        />
        <select
          value={category}
          onChange={(event) => setParam('category', event.target.value)}
          className="rounded-md border border-warm-50/10 bg-warm-900 px-3 py-2 text-sm text-warm-50 outline-none focus:border-gold-300"
        >
          <option value="">{t('common.all')}</option>
          {safetyCategories.map((item) => <option key={item} value={item}>{t(`safetyCategories.${item}`)}</option>)}
        </select>
        </div>
      </div>
    </div>
  }
>
      <SectionCard>
        {!filtered.length ? <EmptyState title={t('defense.empty')} /> : null}
        <div className="grid gap-4 xl:grid-cols-2">
          {filtered.map((layer) => (
            <Link
              key={layer.id}
              to={`/defense/${layer.id}`}
              className="group block rounded-xl border border-warm-50/[0.06] bg-warm-900/40 p-5 transition-all hover:border-gold-400/20 hover:bg-warm-900/70"
            >
              <Badge tone="gold">{t(`safetyCategories.${layer.category}`)}</Badge>
              <h2 className="mt-3 text-lg font-semibold text-warm-50">{getLocalizedText(layer.title, language)}</h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-warm-400">{getLocalizedText(layer.threat, language)}</p>
              <div className="mt-4 flex justify-end border-t border-warm-50/[0.06] pt-4">
                <span className="inline-flex items-center gap-1 text-sm font-medium text-jade opacity-0 transition-opacity group-hover:opacity-100">
                  {t('common.open')}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  )
}
