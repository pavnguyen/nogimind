import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { SectionCard } from '../components/common/SectionCard'
import { safetyCategories } from '../data/defensiveLayers'
import { useDefensiveLayersQuery } from '../queries/defenseQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import type { SafetyCategory } from '../types/defense'
import { getLocalizedArray, getLocalizedText } from '../utils/localization'

export default function DefensePage() {
  const { t } = useTranslation()
  const language = useSettingsStore((state) => state.language)
  const [searchParams, setSearchParams] = useSearchParams()
  const layers = useDefensiveLayersQuery().data ?? []
  const query = searchParams.get('q') ?? ''
  const category = safetyCategories.includes(searchParams.get('category') as SafetyCategory) ? (searchParams.get('category') as SafetyCategory) : ''

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return layers.filter((layer) => {
      if (category && layer.category !== category) return false
      if (!normalized) return true
      const haystack = [
        getLocalizedText(layer.title, language),
        layer.title.en,
        getLocalizedText(layer.threat, language),
        ...getLocalizedArray(layer.earlyDangerSignals, language),
        ...getLocalizedArray(layer.immediatePriorities, language),
        ...getLocalizedArray(layer.safeResponses, language),
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(normalized)
    })
  }, [category, language, layers, query])

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white">{t('defense.heading')}</h1>
        <p className="mt-2 max-w-3xl text-slate-400">{t('defense.subtitle')}</p>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_260px]">
        <input
          value={query}
          onChange={(event) => setParam('q', event.target.value)}
          placeholder={t('defense.search')}
          className="w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
        />
        <select
          value={category}
          onChange={(event) => setParam('category', event.target.value)}
          className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
        >
          <option value="">{t('common.all')}</option>
          {safetyCategories.map((item) => <option key={item} value={item}>{t(`safetyCategories.${item}`)}</option>)}
        </select>
      </div>

      <SectionCard>
        {!filtered.length ? <EmptyState title={t('defense.empty')} /> : null}
        <div className="grid gap-4 xl:grid-cols-2">
          {filtered.map((layer) => (
            <article key={layer.id} className="rounded-lg border border-white/10 bg-slate-950/65 p-4 transition hover:border-amber-300/35 hover:bg-white/[0.06]">
              <Badge tone="amber">{t(`safetyCategories.${layer.category}`)}</Badge>
              <h2 className="mt-3 text-lg font-semibold text-white">{getLocalizedText(layer.title, language)}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{getLocalizedText(layer.threat, language)}</p>
              <div className="mt-4 flex justify-end border-t border-white/10 pt-4">
                <Link to={`/defense/${layer.id}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-200 hover:text-cyan-100">
                  {t('common.open')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
