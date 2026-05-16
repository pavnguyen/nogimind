import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'
import { Map } from 'lucide-react'
import { positionCategories } from '../data/positions'
import { usePositionsQuery } from '../queries/positionQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import type { PositionCategory } from '../types/position'
import { getLocalizedArray, getLocalizedText } from '../utils/localization'

export default function PositionsPage() {
  const { t } = useTranslation()
  const language = useSettingsStore((state) => state.language)
  const [searchParams, setSearchParams] = useSearchParams()
  const positionsQuery = usePositionsQuery()
  const positions = useMemo(() => positionsQuery.data ?? [], [positionsQuery.data])
  const query = searchParams.get('q') ?? ''
  const category = positionCategories.includes(searchParams.get('category') as PositionCategory) ? (searchParams.get('category') as PositionCategory) : ''

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return positions.filter((position) => {
      if (category && position.category !== category) return false
      if (!normalized) return true
      const haystack = [
        getLocalizedText(position.title, language),
        position.title.en,
        getLocalizedText(position.description, language),
        ...getLocalizedArray(position.controlPoints, language),
        ...getLocalizedArray(position.dangerSignals, language),
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(normalized)
    })
  }, [category, language, positions, query])

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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg">
              <Map className="h-5 w-5 text-slate-950" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">{t('positions.heading')}</h1>
              <p className="text-sm text-slate-400">{t('positions.whatFor')}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <input
              value={query}
              onChange={(event) => setParam('q', event.target.value)}
              placeholder={t('positions.search')}
              className="w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
            />
            
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() => setParam('category', '')}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  !category 
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' 
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {t('common.all')}
              </button>
              {positionCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setParam('category', item)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    category === item 
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' 
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {t(`positionCategories.${item}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
  }
>
      <SectionCard>
        {!filtered.length ? <EmptyState title={t('positions.empty')} description={t('positions.nextStep')} /> : null}
        <div className="grid gap-4 xl:grid-cols-2">
          {filtered.map((position) => (
            <Link
              key={position.id}
              to={`/positions/${position.id}`}
              className="group block rounded-xl border border-white/[0.06] bg-slate-900/40 p-5 transition-all hover:border-cyan-400/20 hover:bg-slate-900/70"
            >
              <div className="flex flex-wrap gap-2">
                <Badge tone="cyan">{t(`positionCategories.${position.category}`)}</Badge>
                <Badge tone={position.status === 'critical' || position.status === 'dangerous' ? 'rose' : 'emerald'}>
                  {t(`positionStatuses.${position.status}`)}
                </Badge>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                {getLocalizedText(position.title, language)}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{getLocalizedText(position.description, language)}</p>
              <div className="mt-4 flex justify-end border-t border-white/[0.06] pt-4">
                <div className="inline-flex items-center gap-1 text-sm font-medium text-emerald-200 opacity-0 transition-all transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
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
