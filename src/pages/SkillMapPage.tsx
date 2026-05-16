import { lazy, Suspense, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { EmptyState } from '../components/common/EmptyState'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'

import { SkillCard } from '../components/skills/SkillCard'
import { SkillSearchFilters } from '../components/skills/SkillSearchFilters'
import { skillDomains, skillLevels } from '../data/domains'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import type { LibraryTier, MetaStatus, ModernSystemGroup, RiskLevel, SkillDomain, SkillLevel, TechniqueFamily } from '../types/skill'
import { searchSkills } from '../utils/search'

const SkillGraph = lazy(() => import('../components/graphs/SkillGraph').then((module) => ({ default: module.SkillGraph })))

const libraryTiers: LibraryTier[] = ['core', 'modern_expansion', 'advanced_niche', 'safety_critical']
const techniqueFamilies: TechniqueFamily[] = ['guard', 'passing', 'submission', 'back_take', 'ride', 'wrestling', 'leg_lock', 'front_headlock', 'escape', 'pin', 'scramble', 'safety', 'compression', 'ruleset']
const modernSystemGroups: ModernSystemGroup[] = ['octopus', 'clamp_guard', 'shoulder_crunch', 's_mount', 'k_guard', 'matrix', 'false_reap', 'leg_lock', 'crab_ride', 'wrist_ride', 'front_headlock', 'wrestle_up', 'modern_passing', 'turtle_ride', 'smother', 'back_triangle', 'counter_wrestling', 'safety']
const metaStatuses: MetaStatus[] = ['fundamental', 'modern_common', 'emerging', 'specialized', 'experimental']
const riskLevels: RiskLevel[] = ['low', 'medium', 'high', 'safety_critical']

export default function SkillMapPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const language = useSettingsStore((state) => state.language)
  const defaultView = useSettingsStore((state) => state.skillMapView)
  const skillsQuery = useSkillsQuery()
  const skills = useMemo(() => skillsQuery.data ?? [], [skillsQuery.data])

  const domain = skillDomains.includes(searchParams.get('domain') as SkillDomain) ? (searchParams.get('domain') as SkillDomain) : ''
  const level = skillLevels.includes(searchParams.get('level') as SkillLevel) ? (searchParams.get('level') as SkillLevel) : ''
  const libraryTier = libraryTiers.includes(searchParams.get('library') as LibraryTier) ? (searchParams.get('library') as LibraryTier) : ''
  const techniqueFamily = techniqueFamilies.includes(searchParams.get('family') as TechniqueFamily) ? (searchParams.get('family') as TechniqueFamily) : ''
  const modernSystemGroup = modernSystemGroups.includes(searchParams.get('system') as ModernSystemGroup) ? (searchParams.get('system') as ModernSystemGroup) : ''
  const metaStatus = metaStatuses.includes(searchParams.get('meta') as MetaStatus) ? (searchParams.get('meta') as MetaStatus) : ''
  const riskLevel = riskLevels.includes(searchParams.get('risk') as RiskLevel) ? (searchParams.get('risk') as RiskLevel) : ''
  const tag = searchParams.get('tag') ?? ''
  const view = searchParams.get('view') === 'graph' || searchParams.get('view') === 'cards' ? searchParams.get('view') : defaultView

  const query = searchParams.get('q') ?? ''
  const filtered = useMemo(
    () => searchSkills(skills, query, language, { domain, level, tag, libraryTier, techniqueFamily, modernSystemGroup, metaStatus, riskLevel }),
    [domain, language, level, libraryTier, metaStatus, modernSystemGroup, query, riskLevel, skills, tag, techniqueFamily],
  )

  const grouped = useMemo(
    () =>
      skillDomains
        .map((item) => ({ domain: item, skills: filtered.filter((skill) => skill.domain === item) }))
        .filter((group) => group.skills.length),
    [filtered],
  )

  return (
    <PageShell
      header={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">{t('skills.heading')}</h1>
            <p className="mt-1 text-sm text-slate-400">{t('skills.subtitle')}</p>
          </div>
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 transition-colors hover:bg-cyan-400/20"
          >
            {t('skills.nextStep')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      }
    >
      <SkillSearchFilters skills={skills} />
      {view === 'graph' ? (
        <Suspense fallback={<p className="text-sm text-slate-400">{t('common.loading')}</p>}>
          <SkillGraph skills={filtered} filters={{ domain, level, tag }} lang={language} />
        </Suspense>
      ) : (
        <div className="space-y-6">
          {!filtered.length ? <EmptyState title={t('common.empty')} /> : null}
          {grouped.map((group) => (
            <SectionCard key={group.domain} title={t(`domains.${group.domain}`)}>
              <div className="grid gap-4 xl:grid-cols-2">
                {group.skills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </PageShell>
  )
}
