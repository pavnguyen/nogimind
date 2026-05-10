import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { SectionCard } from '../components/common/SectionCard'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import type { SkillDomain } from '../types/skill'
import { getLocalizedText } from '../utils/localization'

const studyDomains: Array<{ id: SkillDomain; key: string; tone: 'emerald' | 'cyan' | 'amber' | 'rose' | 'slate' }> = [
  { id: 'guard_retention', key: 'guard', tone: 'cyan' },
  { id: 'guard_offense', key: 'guardOffense', tone: 'cyan' },
  { id: 'passing', key: 'passing', tone: 'emerald' },
  { id: 'pins_rides', key: 'pins', tone: 'slate' },
  { id: 'back_control', key: 'back', tone: 'amber' },
  { id: 'submission_systems', key: 'submissions', tone: 'rose' },
  { id: 'wrestle_up_wrestling', key: 'wrestling', tone: 'emerald' },
  { id: 'escapes', key: 'escapes', tone: 'cyan' },
]

export default function StudyPage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const [searchParams, setSearchParams] = useSearchParams()
  const skills = useSkillsQuery().data ?? []
  const active = (searchParams.get('domain') || studyDomains[0].id) as SkillDomain
  const skillsByDomain = useMemo(
    () =>
      studyDomains.reduce<Record<string, typeof skills>>((groups, domain) => {
        groups[domain.id] = skills.filter((skill) => skill.domain === domain.id)
        return groups
      }, {}),
    [skills],
  )
  const visibleSkills = skillsByDomain[active] ?? []

  const setDomain = (domain: SkillDomain) => {
    const next = new URLSearchParams(searchParams)
    next.set('domain', domain)
    setSearchParams(next)
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[280px_1fr_300px]">
      <aside className="space-y-3">
        <SectionCard title={t('modeUx.study.heading')} description={t('modeUx.study.subtitle')}>
          <div className="space-y-2">
            {studyDomains.map((domain) => (
              <button
                key={domain.id}
                type="button"
                onClick={() => setDomain(domain.id)}
                className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition ${
                  active === domain.id ? 'border-emerald-300/35 bg-emerald-300/10 text-emerald-100' : 'border-white/10 bg-slate-900/50 text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{t(`modeUx.study.domains.${domain.key}`)}</span>
                <Badge tone={domain.tone}>{skillsByDomain[domain.id]?.length ?? 0}</Badge>
              </button>
            ))}
          </div>
        </SectionCard>
      </aside>

      <main className="space-y-4">
        <div>
          <Badge tone="emerald">{t('nav.study')}</Badge>
          <h1 className="mt-3 text-3xl font-semibold text-white">{t(`modeUx.study.domains.${studyDomains.find((item) => item.id === active)?.key ?? 'guard'}`)}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{t('modeUx.study.body')}</p>
        </div>
        {!visibleSkills.length ? <EmptyState title={t('common.empty')} /> : null}
        <div className="grid gap-3">
          {visibleSkills.map((skill) => (
            <Link key={skill.id} to={`/skills/${skill.id}`} className="rounded-lg border border-white/10 bg-slate-950/60 p-4 hover:border-cyan-300/35 hover:bg-white/[0.06]">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2">
                    {skill.riskLevel ? <Badge tone={skill.riskLevel === 'safety_critical' ? 'amber' : 'slate'}>{t(`modern.risk.${skill.riskLevel}`)}</Badge> : null}
                    {skill.techniqueFamily ? <Badge tone="cyan">{t(`modern.family.${skill.techniqueFamily}`)}</Badge> : null}
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-white">{getLocalizedText(skill.title, lang)}</h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{getLocalizedText(skill.primaryGoal, lang)}</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
        <SectionCard title={t('modeUx.rail.next')} description={t('modeUx.study.rail')} />
        <SectionCard title={t('modeUx.rail.related')}>
          <div className="flex flex-wrap gap-2">
            <Link className="rounded-md border border-white/10 px-3 py-2 text-sm text-cyan-200 hover:bg-white/10" to="/micro-details">{t('nav.microDetails')}</Link>
            <Link className="rounded-md border border-white/10 px-3 py-2 text-sm text-cyan-200 hover:bg-white/10" to="/concepts">{t('nav.concepts')}</Link>
            <Link className="rounded-md border border-white/10 px-3 py-2 text-sm text-cyan-200 hover:bg-white/10" to="/positions">{t('nav.positions')}</Link>
          </div>
        </SectionCard>
      </aside>
    </div>
  )
}
