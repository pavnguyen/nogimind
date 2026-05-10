import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { SectionCard } from '../components/common/SectionCard'
import { PagePurposeBanner } from '../components/learning/PagePurposeBanner'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { skillDomains } from '../data/domains'
import { getMicroDetails } from '../utils/knowledgeModules'
import { getLocalizedText, getTechnicalTokenLabel } from '../utils/localization'
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
  const domainFilter = searchParams.get('domain') ?? ''

  const details = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return getMicroDetails(skills).filter((detail) => {
      const haystack = [
        getLocalizedText(detail.skillTitle, lang),
        getLocalizedText(detail.title, lang),
        getLocalizedText(detail.instruction, lang),
        getLocalizedText(detail.whyItWorks, lang),
        getLocalizedText(detail.commonMistake, lang),
        getLocalizedText(detail.correctionCue, lang),
        getLocalizedText(detail.liveCue ?? detail.correctionCue, lang),
        detail.category,
        detail.skillDomain,
        ...detail.tags,
      ].join(' ').toLowerCase()
      return (!filter || haystack.includes(filter)) && (!normalized || haystack.includes(normalized)) && (!skillFilter || detail.skillId === skillFilter) && (!domainFilter || detail.skillDomain === domainFilter)
    })
  }, [domainFilter, filter, lang, query, skillFilter, skills])

  const topCategories = filters.slice(0, 6)
  const bodyPartFilters = filters.slice(6)
  const commonRepairs = details.slice(0, 8)

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  return (
    <div className="space-y-6">
      <PagePurposeBanner
        title={t('microDetails.repairBoard')}
        purpose={t('microDetails.repairBoardBody')}
        whenToUse={t('microDetails.whenToUse')}
        bestNextStepLabel={t('microDetails.nextStep')}
        bestNextStepTo="/skills"
      />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_300px]">
        <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
          <SectionCard title={t('microDetails.repairFilters')}>
            <input
              value={query}
              onChange={(event) => setParam('q', event.target.value)}
              placeholder={t('microDetails.search')}
              className="w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
            />
            <div className="mt-4 grid gap-2">
              {topCategories.map((item) => (
                <FilterButton key={item} active={filter === item} onClick={() => setParam('filter', filter === item ? '' : item)}>
                  {t(`microDetails.filters.${item}`)}
                </FilterButton>
              ))}
            </div>
          </SectionCard>

          <SectionCard title={t('microDetails.bodyParts')}>
            <div className="flex flex-wrap gap-2">
              {bodyPartFilters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setParam('filter', filter === item ? '' : item)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium ${filter === item ? 'border-emerald-300 bg-emerald-300 text-slate-950' : 'border-white/10 bg-slate-950/60 text-slate-200 hover:bg-white/10'}`}
                >
                  {t(`microDetails.filters.${item}`)}
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard title={t('common.domain')}>
            <div className="grid gap-2">
              {skillDomains.map((domain) => (
                <FilterButton key={domain} active={domainFilter === domain} onClick={() => setParam('domain', domainFilter === domain ? '' : domain)}>
                  {t(`domains.${domain}`)}
                </FilterButton>
              ))}
            </div>
          </SectionCard>
        </aside>

        <main className="space-y-4">
          <div className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
            <div className="grid gap-3 lg:grid-cols-[1fr_260px]">
              <div className="flex flex-wrap gap-2">
                {quickChips.map((chip) => (
                  <button
                    key={chip.en}
                    type="button"
                    onClick={() => setParam('q', getLocalizedText(chip, lang))}
                    className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10"
                  >
                    {getLocalizedText(chip, lang)}
                  </button>
                ))}
              </div>
              <select
                value={skillFilter}
                onChange={(event) => setParam('skill', event.target.value)}
                className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
              >
                <option value="">{t('common.all')}</option>
                {skills.map((skill) => <option key={skill.id} value={skill.id}>{getLocalizedText(skill.title, lang)}</option>)}
              </select>
            </div>
          </div>

          {!details.length ? <EmptyState title={t('microDetails.empty')} description={t('microDetails.emptyBody')} /> : null}

          <div className="grid gap-3">
            {details.slice(0, 80).map((detail) => (
              <Link key={detail.id} to={`/skills/${detail.skillId}?layer=body`} className="rounded-lg border border-white/10 bg-slate-950/65 p-4 transition hover:border-cyan-300/35 hover:bg-white/[0.06]">
                <div className="flex flex-wrap gap-2">
                  <Badge tone="cyan">{getLocalizedText(detail.skillTitle, lang)}</Badge>
                  <Badge tone={detail.category === 'safety' ? 'amber' : 'emerald'}>{getTechnicalTokenLabel(detail.category, lang)}</Badge>
                </div>
                <h2 className="mt-3 text-base font-semibold text-white">{getLocalizedText(detail.title, lang)}</h2>
                <div className="mt-3 grid gap-3 lg:grid-cols-3">
                  <div className="rounded-md border border-rose-300/15 bg-rose-300/10 px-3 py-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-rose-200">{t('microDetails.cardWrong')}</p>
                    <p className="mt-1 text-sm leading-6 text-rose-50">{getLocalizedText(detail.commonMistake ?? detail.whyItWorks, lang)}</p>
                  </div>
                  <div className="rounded-md border border-cyan-300/15 bg-cyan-300/10 px-3 py-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">{t('microDetails.cardFixWith')}</p>
                    <p className="mt-1 text-sm leading-6 text-cyan-50">{detail.bodyParts.slice(0, 3).map((part) => getTechnicalTokenLabel(part, lang)).join(' / ')}</p>
                  </div>
                  <div className="rounded-md border border-emerald-300/15 bg-emerald-300/10 px-3 py-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">{t('microDetails.cardCue')}</p>
                    <p className="mt-1 text-sm leading-6 text-emerald-50">{getLocalizedText(detail.correctionCue, lang)}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{getLocalizedText(detail.instruction, lang)}</p>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex flex-wrap gap-2">
                    {detail.bodyParts.slice(0, 4).map((part) => <Badge key={part}>{getTechnicalTokenLabel(part, lang)}</Badge>)}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-200">{t('microDetails.openSkill')}<ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
        </main>

        <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
          <SectionCard title={t('microDetails.visibleDetails')} description={`${details.length}`} />
          <SectionCard title={t('microDetails.commonRepairs')}>
            <div className="grid gap-2">
              {commonRepairs.map((detail) => (
                <button
                  key={`repair-${detail.id}`}
                  type="button"
                  onClick={() => setParam('q', getLocalizedText(detail.correctionCue, lang))}
                  className="rounded-md border border-white/10 bg-slate-900/60 p-3 text-left text-sm leading-6 text-slate-300 hover:bg-white/10"
                >
                  {getLocalizedText(detail.correctionCue, lang)}
                </button>
              ))}
            </div>
          </SectionCard>
        </aside>
      </div>
    </div>
  )
}

const FilterButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-md border px-3 py-2 text-left text-sm font-medium ${active ? 'border-emerald-300 bg-emerald-300 text-slate-950' : 'border-white/10 bg-slate-900/60 text-slate-300 hover:bg-white/10 hover:text-white'}`}
  >
    {children}
  </button>
)
