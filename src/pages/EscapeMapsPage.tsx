import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getEscapeMaps } from '../utils/knowledgeModules'
import { getLocalizedText } from '../utils/localization'

const categories = ['back_control', 'mount', 'side_control', 'passing', 'submission', 'front_headlock', 'leg_lock', 'escape']

export default function EscapeMapsPage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const skills = useSkillsQuery().data ?? []
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? ''

  const maps = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return getEscapeMaps(skills, lang).filter((map) => {
      const haystack = [
        getLocalizedText(map.title, lang),
        getLocalizedText(map.overview, lang),
        map.category,
        ...map.priorityPreventions,
        ...map.routes.flatMap((route) => [
          getLocalizedText(route.title, lang),
          getLocalizedText(route.earlySignal, lang),
          getLocalizedText(route.prevention, lang),
          getLocalizedText(route.correctionCue, lang),
        ]),
      ].join(' ').toLowerCase()
      return (!category || map.category === category) && (!normalized || haystack.includes(normalized))
    })
  }, [category, lang, query, skills])

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white">{t('escapeMaps.heading')}</h1>
        <p className="mt-2 max-w-3xl text-slate-400">{t('escapeMaps.subtitle')}</p>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_260px]">
        <input value={query} onChange={(event) => setParam('q', event.target.value)} placeholder={t('escapeMaps.search')} className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300" />
        <select value={category} onChange={(event) => setParam('category', event.target.value)} className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300">
          <option value="">{t('common.all')}</option>
          {categories.map((item) => <option key={item} value={item}>{t(`escapeMaps.categories.${item}`)}</option>)}
        </select>
      </div>

      {!maps.length ? <EmptyState title={t('escapeMaps.empty')} description={t('escapeMaps.emptyBody')} /> : null}

      <div className="grid gap-4 xl:grid-cols-2">
        {maps.slice(0, 60).map((map) => (
          <Link key={map.id} to={`/escape-maps/${map.skillId}`} className="rounded-lg border border-white/10 bg-slate-950/65 p-4 transition hover:border-cyan-300/35 hover:bg-white/[0.06]">
            <div className="flex flex-wrap gap-2">
              <Badge tone="cyan">{t(`escapeMaps.categories.${map.category}`)}</Badge>
              <Badge tone="emerald">{map.routes.length} {t('escapeMaps.routes')}</Badge>
            </div>
            <h2 className="mt-3 text-lg font-semibold text-white">{getLocalizedText(map.title, lang)}</h2>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{getLocalizedText(map.overview, lang)}</p>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <p className="text-sm text-slate-400">{map.priorityPreventions.slice(0, 2).join(' / ')}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-200">{t('common.open')}<ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
