import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { PagePurposeBanner } from '../components/learning/PagePurposeBanner'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getMicroDetails } from '../utils/knowledgeModules'
import { getLocalizedText } from '../utils/localization'
import type { LocalizedText } from '../types/skill'

const filters = ['submission', 'passing', 'escape', 'guard', 'control', 'safety', 'head', 'hands', 'elbows', 'hips', 'knees', 'feet', 'pressure', 'angle']
const quickChips: LocalizedText[] = [
  { vi: 'Tay trái / phải', en: 'Left / right hands', fr: 'Main gauche / droite' },
  { vi: 'Cùi chỏ', en: 'Elbow', fr: 'Coude' },
  { vi: 'Hông', en: 'Hips', fr: 'Hanches' },
  { vi: 'Gối', en: 'Knee', fr: 'Genou' },
  { vi: 'Móc chân', en: 'Hooks', fr: 'Hooks' },
  { vi: 'Áp lực', en: 'Pressure', fr: 'Pression' },
  { vi: 'Finish', en: 'Finish', fr: 'Finish' },
  { vi: 'Safety', en: 'Safety', fr: 'Sécurité' },
]

export default function MicroDetailsPage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const skills = useSkillsQuery().data ?? []
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const filter = searchParams.get('filter') ?? ''
  const skillFilter = searchParams.get('skill') ?? ''

  const details = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return getMicroDetails(skills).filter((detail) => {
      const haystack = [
        getLocalizedText(detail.skillTitle, lang),
        getLocalizedText(detail.title, lang),
        getLocalizedText(detail.instruction, lang),
        getLocalizedText(detail.whyItWorks, lang),
        getLocalizedText(detail.correctionCue, lang),
        getLocalizedText(detail.liveCue ?? detail.correctionCue, lang),
        detail.category,
        detail.skillDomain,
        ...detail.tags,
      ].join(' ').toLowerCase()
      return (!filter || haystack.includes(filter)) && (!normalized || haystack.includes(normalized)) && (!skillFilter || detail.skillId === skillFilter)
    })
  }, [filter, lang, query, skillFilter, skills])

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  return (
    <div className="space-y-6">
      <PagePurposeBanner
        title={t('microDetails.heading')}
        purpose={t('microDetails.whatFor')}
        whenToUse={t('microDetails.whenToUse')}
        bestNextStepLabel={t('microDetails.nextStep')}
        bestNextStepTo="/skills"
      />

      <div className="grid gap-3 lg:grid-cols-[1fr_260px]">
        <input
          value={query}
          onChange={(event) => setParam('q', event.target.value)}
          placeholder={t('microDetails.search')}
          className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
        />
        <select
          value={filter}
          onChange={(event) => setParam('filter', event.target.value)}
          className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
          >
            <option value="">{t('common.all')}</option>
            {filters.map((item) => <option key={item} value={item}>{t(`microDetails.filters.${item}`)}</option>)}
          </select>
      </div>

      <div className="flex flex-wrap gap-2">
        {quickChips.map((chip) => (
          <button
            key={chip.en}
            type="button"
            onClick={() => setParam('q', getLocalizedText(chip, lang))}
            className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10"
          >
            {getLocalizedText(chip, lang)}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        <select
          value={skillFilter}
          onChange={(event) => setParam('skill', event.target.value)}
          className="max-w-sm rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
        >
          <option value="">{t('common.all')}</option>
          {skills.map((skill) => <option key={skill.id} value={skill.id}>{getLocalizedText(skill.title, lang)}</option>)}
        </select>
      </div>

      {!details.length ? <EmptyState title={t('microDetails.empty')} description={t('microDetails.emptyBody')} /> : null}

      <div className="grid gap-4 xl:grid-cols-2">
        {details.slice(0, 80).map((detail) => (
          <Link key={detail.id} to={`/skills/${detail.skillId}`} className="rounded-lg border border-white/10 bg-slate-950/65 p-4 transition hover:border-cyan-300/35 hover:bg-white/[0.06]">
            <div className="flex flex-wrap gap-2">
              <Badge tone="cyan">{getLocalizedText(detail.skillTitle, lang)}</Badge>
              <Badge tone={detail.category === 'safety' ? 'amber' : 'emerald'}>{detail.category}</Badge>
            </div>
            <h2 className="mt-3 text-lg font-semibold text-white">{getLocalizedText(detail.title, lang)}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{getLocalizedText(detail.instruction, lang)}</p>
            <p className="mt-3 text-sm leading-6 text-slate-400"><span className="font-semibold text-slate-200">{t('ifThen.why')}: </span>{getLocalizedText(detail.whyItWorks, lang)}</p>
            <p className="mt-2 rounded-md border border-emerald-300/15 bg-emerald-300/10 px-3 py-2 text-sm text-emerald-100">{getLocalizedText(detail.correctionCue, lang)}</p>
            {detail.liveCue ? <p className="mt-2 text-xs text-slate-500">{getLocalizedText(detail.liveCue, lang)}</p> : null}
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex flex-wrap gap-2">
                {detail.bodyParts.slice(0, 4).map((part) => <Badge key={part}>{part}</Badge>)}
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-200">{t('common.open')}<ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
