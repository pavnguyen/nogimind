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
import { haystackIncludesQuery, normalizeSearchQuery } from '../utils/searchText'

export default function PositionsPage() {
  const { t } = useTranslation()
  const language = useSettingsStore((state) => state.language)
  const [searchParams, setSearchParams] = useSearchParams()
  const positionsQuery = usePositionsQuery()
  const positions = useMemo(() => positionsQuery.data ?? [], [positionsQuery.data])
  const query = searchParams.get('q') ?? ''
  const category = positionCategories.includes(searchParams.get('category') as PositionCategory) ? (searchParams.get('category') as PositionCategory) : ''

  const filtered = useMemo(() => {
    const normalized = normalizeSearchQuery(query)
    return positions.filter((position) => {
      if (category && position.category !== category) return false
      const haystack = [
        getLocalizedText(position.title, language),
        position.title.en,
        getLocalizedText(position.description, language),
        ...getLocalizedArray(position.controlPoints, language),
        ...getLocalizedArray(position.dangerSignals, language),
      ].join(' ')
      return haystackIncludesQuery(haystack, normalized)
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-jade-400 to-sea-500 shadow-lg">
              <Map className="h-5 w-5 text-on-accent" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-warm-50">{t('positions.heading')}</h1>
              <p className="text-sm text-warm-400">{t('positions.whatFor')}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <input
              value={query}
              onChange={(event) => setParam('q', event.target.value)}
              placeholder={t('positions.search')}
              className="w-full rounded-md border border-warm-50/10 bg-warm-900 px-3 py-2 text-sm text-warm-50 outline-none focus:border-gold-300"
            />
            
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() => setParam('category', '')}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  !category 
                    ? 'bg-gold-500 text-on-accent shadow-lg shadow-gold-500/20' 
                    : 'bg-warm-50/5 text-warm-400 hover:bg-warm-50/10 hover:text-warm-50'
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
                      ? 'bg-gold-500 text-on-accent shadow-lg shadow-gold-500/20' 
                      : 'bg-warm-50/5 text-warm-400 hover:bg-warm-50/10 hover:text-warm-50'
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
              className="group block rounded-xl border border-warm-50/[0.06] bg-warm-900/40 p-5 transition-all hover:border-gold-400/20 hover:bg-warm-900/70"
            >
              <div className="flex flex-wrap gap-2">
                <Badge tone="gold">{t(`positionCategories.${position.category}`)}</Badge>
                <Badge tone={position.status === 'critical' || position.status === 'dangerous' ? 'copper' : 'jade'}>
                  {t(`positionStatuses.${position.status}`)}
                </Badge>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-warm-50 group-hover:text-gold transition-colors">
                {getLocalizedText(position.title, language)}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-warm-400">{getLocalizedText(position.description, language)}</p>
              <div className="mt-4 flex justify-end border-t border-warm-50/[0.06] pt-4">
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
