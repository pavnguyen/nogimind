import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { PageShell } from '../components/common/PageShell'
import { HelpCircle } from 'lucide-react'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getTroubleshooters } from '../utils/knowledgeModules'
import { getLocalizedText } from '../utils/localization'

const categories = ['choke', 'joint_lock', 'leg_lock', 'back', 'front_headlock', 'submission']

export default function SubmissionTroubleshootersPage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const skills = useSkillsQuery().data ?? []
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? ''

  const troubleshooters = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return getTroubleshooters(skills, lang).filter((item) => {
      const haystack = [
        getLocalizedText(item.title, lang),
        getLocalizedText(item.overview, lang),
        item.category,
        ...item.checklist,
        ...item.diagnoses.flatMap((diagnosis) => [
          getLocalizedText(diagnosis.title, lang),
          getLocalizedText(diagnosis.likelyCause, lang),
          getLocalizedText(diagnosis.microFix, lang),
        ]),
      ].join(' ').toLowerCase()
      return (!category || item.category === category) && (!normalized || haystack.includes(normalized))
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
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg">
              <HelpCircle className="h-5 w-5 text-slate-950" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">{t('troubleshooters.heading')}</h1>
              <p className="text-sm text-slate-400">{t('troubleshooters.whatFor')}</p>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1fr_260px]">
        <input
          value={query}
          onChange={(event) => setParam('q', event.target.value)}
          placeholder={t('troubleshooters.search')}
          className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
        />
        <select value={category} onChange={(event) => setParam('category', event.target.value)} className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300">
          <option value="">{t('common.all')}</option>
          {categories.map((item) => <option key={item} value={item}>{t(`troubleshooters.categories.${item}`)}</option>)}
        </select>
      </div>
    </div>
  }
>
      {!troubleshooters.length ? <EmptyState title={t('troubleshooters.empty')} description={t('troubleshooters.emptyBody')} /> : null}

      <div className="grid gap-4 xl:grid-cols-2">
        {troubleshooters.map((item) => (
          <SectionCard
            key={item.id}
            to={`/troubleshooters/${item.skillId}`}
            title={getLocalizedText(item.title, lang)}
            description={getLocalizedText(item.overview, lang)}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge tone={item.category === 'leg_lock' ? 'amber' : 'cyan'}>{t(`troubleshooters.categories.${item.category}`)}</Badge>
              <Badge tone="emerald">{item.diagnoses.length} {t('troubleshooters.diagnoses')}</Badge>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <p className="text-sm text-slate-400">{item.checklist.slice(0, 2).join(' / ')}</p>
            </div>
          </SectionCard>
        ))}
      </div>
    </PageShell>
  )
}
