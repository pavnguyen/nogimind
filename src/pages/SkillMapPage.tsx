import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { EmptyState } from '../components/common/EmptyState'
import { PageShell } from '../components/common/PageShell'

import { SkillCard } from '../components/skills/SkillCard'
import { SkillSearchFilters } from '../components/skills/SkillSearchFilters'
import { skillDomains, skillLevels } from '../data/domains'
import { useSkillsQuery } from '../queries/skillQueries'
import { useManifestQuery } from '../queries/contentQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import type { ManifestEntry } from '../content-runtime/manifests'
import type { LibraryTier, MetaStatus, ModernSystemGroup, RiskLevel, SkillDomain, SkillLevel, TechniqueFamily } from '../types/skill'
import { searchSkills } from '../utils/search'

const libraryTiers: LibraryTier[] = ['core', 'modern_expansion', 'advanced_niche', 'safety_critical']
const techniqueFamilies: TechniqueFamily[] = ['guard', 'passing', 'submission', 'back_take', 'ride', 'wrestling', 'leg_lock', 'front_headlock', 'escape', 'pin', 'scramble', 'safety', 'compression', 'ruleset']
const modernSystemGroups: ModernSystemGroup[] = ['octopus', 'clamp_guard', 'shoulder_crunch', 's_mount', 'k_guard', 'matrix', 'false_reap', 'leg_lock', 'crab_ride', 'wrist_ride', 'front_headlock', 'wrestle_up', 'modern_passing', 'turtle_ride', 'smother', 'back_triangle', 'counter_wrestling', 'safety']
const metaStatuses: MetaStatus[] = ['fundamental', 'modern_common', 'emerging', 'specialized', 'experimental']
const riskLevels: RiskLevel[] = ['low', 'medium', 'high', 'safety_critical']

export default function SkillMapPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const language = useSettingsStore((state) => state.language)
  const skillsQuery = useSkillsQuery()
  const skills = useMemo(() => skillsQuery.data ?? [], [skillsQuery.data])

  // ── Content pipeline (Phase 2) ──────────────────────────────────────────
  const manifestQuery = useManifestQuery(language)
  const manifest = useMemo(() => manifestQuery.data ?? [], [manifestQuery.data])
  const manifestByDomain = useMemo(() => {
    const map: Record<string, ManifestEntry[]> = {}
    for (const entry of manifest) {
      (map[entry.domain] ??= []).push(entry)
    }
    return map
  }, [manifest])

  const domain = skillDomains.includes(searchParams.get('domain') as SkillDomain) ? (searchParams.get('domain') as SkillDomain) : ''
  const level = skillLevels.includes(searchParams.get('level') as SkillLevel) ? (searchParams.get('level') as SkillLevel) : ''
  const libraryTier = libraryTiers.includes(searchParams.get('library') as LibraryTier) ? (searchParams.get('library') as LibraryTier) : ''
  const techniqueFamily = techniqueFamilies.includes(searchParams.get('family') as TechniqueFamily) ? (searchParams.get('family') as TechniqueFamily) : ''
  const modernSystemGroup = modernSystemGroups.includes(searchParams.get('system') as ModernSystemGroup) ? (searchParams.get('system') as ModernSystemGroup) : ''
  const metaStatus = metaStatuses.includes(searchParams.get('meta') as MetaStatus) ? (searchParams.get('meta') as MetaStatus) : ''
  const riskLevel = riskLevels.includes(searchParams.get('risk') as RiskLevel) ? (searchParams.get('risk') as RiskLevel) : ''
  const tag = searchParams.get('tag') ?? ''
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
  const visibleCount = filtered.length
  const totalCount = skills.length

  return (
    <PageShell
      header={
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] hallmark-hero px-5 py-5 sm:px-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hallmark-accent/30 to-transparent" />
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg hallmark-icon-box">
                  <BookOpen className="h-4 w-4 text-slate-950" aria-hidden="true" />
                </span>
                <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[11px] font-medium hallmark-text-secondary">
                  {visibleCount}/{totalCount}
                </span>
              </div>
              <h1 className="text-balance text-2xl font-semibold tracking-tight hallmark-text-primary sm:text-3xl">
                {t('skills.heading')}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 hallmark-text-secondary sm:text-[15px]">
                {t('skills.subtitle')}
              </p>
            </div>
            <Link
              to="/learn"
              className="inline-flex w-fit items-center gap-2 rounded-xl hallmark-btn-ghost border border-hallmark-accent-dim px-4 py-2.5 text-sm font-semibold"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {t('skills.nextStep')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      }
    >
      <SkillSearchFilters skills={skills} />
      <div className="space-y-5">
        {!filtered.length ? <EmptyState title={t('common.empty')} /> : null}
        {grouped.map((group) => (
          <section
            key={group.domain}
            className="rounded-2xl border border-white/[0.06] bg-slate-950/35 p-4 shadow-[0_18px_45px_rgba(2,6,23,0.22)] sm:p-5"
          >
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] hallmark-text-tertiary">
                  {group.skills.length} {t('nav.skills').toLowerCase()}
                </p>
                <h2 className="mt-1 text-lg font-semibold tracking-tight hallmark-text-primary">
                  {t(`domains.${group.domain}`)}
                </h2>
              </div>
{(() => {
                const mEntries = manifestByDomain[group.domain]
                if (!mEntries || mEntries.length === 0) return undefined
                const covered = mEntries.filter(e => e.hasChecklist).length
                return (
                  <span className="shrink-0 rounded-lg hallmark-badge px-2.5 py-1 text-[11px] font-semibold">
                    {covered}/{mEntries.length} {t('skillMap.checklist')}
                  </span>
                )
              })()}
            </div>
            <div className="grid gap-3 xl:grid-cols-2">
              {group.skills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  )
}
