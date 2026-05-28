import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'
import { ArrowRightFromLine } from 'lucide-react'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getEscapeMaps } from '../utils/knowledgeModules'
import { getLocalizedText } from '../utils/localization'

const categories = ['back_control', 'mount', 'side_control', 'passing', 'submission', 'front_headlock', 'leg_lock', 'escape']

export default function EscapeMapsPage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const skillsQuery = useSkillsQuery()
  const skills = useMemo(() => skillsQuery.data ?? [], [skillsQuery.data])
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
    <PageShell
      header={
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-slate-900/30 p-6 hero-blob-fix">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/5 blur-[80px]" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/20">
                <ArrowRightFromLine className="h-6 w-6 text-slate-950" aria-hidden="true" />
              </div>
              <div>
                <Badge tone="cyan" className="text-[10px] uppercase tracking-widest">{t('nav.fix')}</Badge>
                <h1 className="mt-1 display-heading text-2xl font-extrabold text-white lg:text-3xl">{t('escapeMaps.heading')}</h1>
                <p className="mt-1 text-sm text-slate-400">{t('escapeMaps.whatFor')}</p>
              </div>
            </div>

          <div className="grid gap-3 lg:grid-cols-[1fr_260px]">
        <input value={query} onChange={(event) => setParam('q', event.target.value)} placeholder={t('escapeMaps.search')} className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none search-focus-ring" />
        <select value={category} onChange={(event) => setParam('category', event.target.value)} className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none search-focus-ring">
          <option value="">{t('common.all')}</option>
          {categories.map((item) => <option key={item} value={item}>{t(`escapeMaps.categories.${item}`)}</option>)}
        </select>
      </div>
      </div>
    </div>
  }
>
      {!maps.length ? <EmptyState title={t('escapeMaps.empty')} description={t('escapeMaps.emptyBody')} /> : null}

      <div className="grid gap-4 xl:grid-cols-2">
        {maps.slice(0, 60).map((map) => (
          <SectionCard
            key={map.id}
            to={`/escape-maps/${map.skillId}`}
            title={getLocalizedText(map.title, lang)}
            description={getLocalizedText(map.overview, lang)}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge tone="cyan">{t(`escapeMaps.categories.${map.category}`)}</Badge>
              <Badge tone="emerald">{map.routes.length} {t('escapeMaps.routes')}</Badge>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <p className="text-sm text-slate-400">{map.priorityPreventions.slice(0, 2).join(' / ')}</p>
            </div>
          </SectionCard>
        ))}
      </div>
    </PageShell>
  )
}
