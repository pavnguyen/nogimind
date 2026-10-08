import { useMemo, useState, useCallback } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { StaggerContainer, StaggerItem } from '../components/common/StaggerContainer'
import {
  ArrowRight,
  ChevronDown,
  Dice5,
  Eye,
  EyeOff,
  Zap,
  Sparkles,
  Target,
  CircleDot,
  Clock,
} from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { PageShell } from '../components/common/PageShell'
import { useSkillsQuery } from '../queries/skillQueries'
import { useManifestQuery } from '../queries/contentQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { useRecentlyViewedStore } from '../stores/useRecentlyViewedStore'
import type { SkillDomain } from '../types/skill'
import { getLocalizedText } from '../utils/localization'
import { cn } from '../utils/cn'

type DomainTone = 'gold' | 'jade' | 'sea' | 'steel' | 'moss' | 'copper' | 'warm'

/** Domains in learning order: where you are → where you attack → where you finish → how you recover. */
const studyDomains: Array<{ id: SkillDomain; key: string; tone: DomainTone }> = [
  { id: 'guard_retention', key: 'guardRetention', tone: 'gold' },
  { id: 'guard_offense', key: 'guardOffense', tone: 'sea' },
  { id: 'passing', key: 'passing', tone: 'steel' },
  { id: 'pins_rides', key: 'pins', tone: 'moss' },
  { id: 'back_control', key: 'back', tone: 'copper' },
  { id: 'submission_systems', key: 'submissions', tone: 'copper' },
  { id: 'wrestle_up_wrestling', key: 'wrestling', tone: 'steel' },
  { id: 'escapes', key: 'escapes', tone: 'jade' },
]

const toneActive: Record<DomainTone, string> = {
  gold: 'border-gold-400/30 bg-gold-400/10 text-gold shadow-[0_0_15px_rgba(232,176,92,0.05)]',
  jade: 'border-jade-400/30 bg-jade-400/10 text-jade shadow-[0_0_15px_rgba(62,201,182,0.05)]',
  sea: 'border-sea-400/30 bg-sea-400/10 text-sea shadow-[0_0_15px_rgba(88,174,196,0.05)]',
  steel: 'border-steel-400/30 bg-steel-400/10 text-steel shadow-[0_0_15px_rgba(127,169,224,0.05)]',
  moss: 'border-moss-400/30 bg-moss-400/10 text-moss shadow-[0_0_15px_rgba(169,180,95,0.05)]',
  copper: 'border-copper-400/30 bg-copper-400/10 text-copper shadow-[0_0_15px_rgba(224,122,78,0.05)]',
  warm: 'border-warm-400/30 bg-warm-400/10 text-warm-50 shadow-[0_0_15px_rgba(207,201,189,0.05)]',
}

const toneCount: Record<DomainTone, string> = {
  gold: 'bg-gold-400/20 text-gold',
  jade: 'bg-jade-400/20 text-jade',
  sea: 'bg-sea-400/20 text-sea',
  steel: 'bg-steel-400/20 text-steel',
  moss: 'bg-moss-400/20 text-moss',
  copper: 'bg-copper-400/20 text-copper',
  warm: 'bg-warm-400/20 text-warm-300',
}

const toneDot: Record<DomainTone, string> = {
  gold: 'bg-gold-400',
  jade: 'bg-jade-400',
  sea: 'bg-sea-400',
  steel: 'bg-steel-400',
  moss: 'bg-moss-400',
  copper: 'bg-copper-400',
  warm: 'bg-warm-400',
}

type ContentFlags = { hasChecklist: boolean; hasMicroDetails: boolean; hasVideos: boolean }

export default function StudyPage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const skillsQuery = useSkillsQuery()
  const skills = useMemo(() => skillsQuery.data ?? [], [skillsQuery.data])
  const manifestQuery = useManifestQuery(lang)
  const { recentlyViewed, recordView } = useRecentlyViewedStore()
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set())
  const [quickStudyMode, setQuickStudyMode] = useState(false)
  const [recentOnly, setRecentOnly] = useState(false)
  const [now] = useState(() => Date.now())

  const domainParam = searchParams.get('domain')
  const activeDomain = studyDomains.find((domain) => domain.id === domainParam) ?? studyDomains[0]
  const active = activeDomain.id
  const domainTone = activeDomain.tone
  const domainColor = toneActive[domainTone]

  const skillsByDomain = useMemo(
    () =>
      studyDomains.reduce<Record<string, typeof skills>>((groups, domain) => {
        groups[domain.id] = skills.filter((skill) => skill.domain === domain.id)
        return groups
      }, {}),
    [skills],
  )

  // Real content flags come from the generated manifest - SkillNode only carries
  // lightweight summary data, so use hasChecklist/hasMicroDetails/hasVideos.
  const contentFlags = useMemo(() => {
    const map = new Map<string, ContentFlags>()
    for (const entry of manifestQuery.data ?? []) {
      map.set(entry.id, {
        hasChecklist: entry.hasChecklist,
        hasMicroDetails: entry.hasMicroDetails,
        hasVideos: entry.hasVideos,
      })
    }
    return map
  }, [manifestQuery.data])

  const recentlyViewedIds = useMemo(
    () => new Set(recentlyViewed.map((e) => e.skillId)),
    [recentlyViewed],
  )

  const recentlyViewedTimestamps = useMemo(
    () =>
      recentlyViewed.reduce<Record<string, number>>((map, e) => {
        map[e.skillId] = e.timestamp
        return map
      }, {}),
    [recentlyViewed],
  )

  let visibleSkills = skillsByDomain[active] ?? []

  // Apply recently viewed filter
  if (recentOnly) {
    visibleSkills = visibleSkills.filter((skill) => recentlyViewedIds.has(skill.id))
  }

  const setDomain = (domain: SkillDomain) => {
    const next = new URLSearchParams(searchParams)
    next.set('domain', domain)
    setSearchParams(next, { replace: true })
  }

  const toggleExpanded = (skillId: string) => {
    setExpandedSkills((prev) => {
      const next = new Set(prev)
      if (next.has(skillId)) {
        next.delete(skillId)
      } else {
        next.add(skillId)
      }
      return next
    })
  }

  const handleRandomSkill = useCallback(() => {
    const domainSkills = skillsByDomain[active] ?? []
    if (domainSkills.length === 0) return
    const randomSkill = domainSkills[Math.floor(Math.random() * domainSkills.length)]
    recordView(randomSkill.id)
    navigate(`/skills/${randomSkill.id}`)
  }, [active, skillsByDomain, navigate, recordView])

  const formatTimeAgo = (timestamp: number): string => {
    const minutes = Math.floor((now - timestamp) / 60000)
    if (minutes < 1) return t('studyPage.justNow')
    if (minutes < 60) return t('studyPage.minutesAgo', { count: minutes })
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return t('studyPage.hoursAgo', { count: hours })
    const days = Math.floor(hours / 24)
    return t('studyPage.daysAgo', { count: days })
  }

  return (
    <PageShell className="flex flex-col gap-6 xl:grid xl:grid-cols-[280px_1fr_300px]" fullWidth>
      {/* Mobile Sticky Domain Selector / Desktop Sidebar */}
      <aside className="sticky top-0 z-20 -mx-4 bg-warm-950/80 px-4 py-3 backdrop-blur-xl lg:static lg:mx-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none xl:sticky xl:top-6 xl:self-start">
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <h2 className="text-sm font-bold uppercase tracking-wider text-warm-500">{t('modeUx.study.heading')}</h2>
        </div>

        {/* Horizontal scroll on mobile, vertical list on desktop */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide lg:flex-col lg:overflow-visible lg:pb-0">
          {studyDomains.map((domain) => {
            const isActive = active === domain.id
            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => setDomain(domain.id)}
                aria-pressed={isActive}
                className={cn(
                  'flex shrink-0 items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition-all duration-200 lg:w-full',
                  isActive
                    ? toneActive[domain.tone]
                    : 'border-warm-50/[0.06] bg-warm-900/40 text-warm-400 hover:border-warm-50/10 hover:bg-warm-50/[0.04] hover:text-warm-200',
                )}
              >
                <span
                  className={cn(
                    'h-2 w-2 shrink-0 rounded-full transition-colors',
                    isActive ? toneDot[domain.tone] : 'bg-warm-600',
                  )}
                  aria-hidden="true"
                />
                <span className="flex-1 whitespace-nowrap">{t(`modeUx.study.domains.${domain.key}`)}</span>
                <span
                  className={cn(
                    'flex h-5 min-w-[20px] items-center justify-center rounded-md px-1.5 text-[10px] font-bold',
                    isActive ? toneCount[domain.tone] : 'bg-warm-50/5 text-warm-500',
                  )}
                >
                  {skillsByDomain[domain.id]?.length ?? 0}
                </span>
              </button>
            )
          })}
        </div>

        {/* Info card only on Desktop Sidebar */}
        <div className="mt-6 hidden space-y-4 lg:block">
          <div className="rounded-2xl border border-warm-50/[0.06] bg-warm-900/20 p-5 hallmark-hero">
            <h3 className="text-xs font-bold uppercase tracking-widest text-warm-500">{t('modeUx.study.heading')}</h3>
            <p className="mt-3 text-xs leading-5 text-warm-400">{t('modeUx.study.subtitle')}</p>
          </div>

          {/* Recently Viewed Toggle (desktop) */}
          {recentlyViewedIds.size > 0 && (
            <button
              type="button"
              onClick={() => setRecentOnly((prev) => !prev)}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200',
                recentOnly
                  ? domainColor
                  : 'border-warm-50/[0.06] bg-warm-900/40 text-warm-400 hover:border-warm-50/10 hover:bg-warm-50/[0.04] hover:text-warm-200',
              )}
            >
              {recentOnly ? (
                <EyeOff className="h-4 w-4 shrink-0" />
              ) : (
                <Eye className="h-4 w-4 shrink-0" />
              )}
              <span className="flex-1">{t('studyPage.recentlyViewed')}</span>
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-md bg-warm-50/5 px-1 text-[10px] font-bold text-warm-500">
                {visibleSkills.length}
              </span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="min-w-0 space-y-6">
        {/* Header */}
        <header className="relative overflow-hidden rounded-3xl border border-warm-50/[0.06] bg-warm-900/20 p-6 lg:p-8">
          <div
            className={cn(
              'absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl',
              domainTone === 'gold' && 'bg-gold-400/5',
              domainTone === 'jade' && 'bg-jade-400/5',
              domainTone === 'sea' && 'bg-sea-400/5',
              domainTone === 'steel' && 'bg-steel-400/5',
              domainTone === 'moss' && 'bg-moss-400/5',
              domainTone === 'copper' && 'bg-copper-400/5',
            )}
          />
          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={domainTone} className="shrink-0 whitespace-nowrap px-2 py-0.5 text-[10px] uppercase tracking-widest">
                  {t('nav.study')}
                </Badge>
                <span className="text-[11px] font-medium text-warm-500">
                  {t('studyPage.skillCount', { n: skillsByDomain[active]?.length ?? 0 })}
                </span>
              </div>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-warm-50 sm:text-3xl lg:text-4xl">
                {t(`modeUx.study.domains.${activeDomain.key}`)}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-warm-400 lg:text-base">
                {t(`modeUx.study.domainBlurbs.${activeDomain.key}`)}
              </p>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 lg:shrink-0 lg:justify-end">
              {/* Quick Study Toggle */}
              <button
                type="button"
                onClick={() => setQuickStudyMode((prev) => !prev)}
                className={cn(
                  'flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200',
                  quickStudyMode
                    ? domainColor
                    : 'border-warm-50/[0.06] bg-warm-900/60 text-warm-400 hover:border-warm-50/10 hover:text-warm-200',
                )}
                title={quickStudyMode ? t('studyPage.exitQuickMode') : t('studyPage.quickMode')}
              >
                <Zap className={cn('h-3.5 w-3.5', quickStudyMode && 'animate-pulse')} />
                {t('studyPage.quickStudy')}
              </button>

              {/* Random Skill Button */}
              <button
                type="button"
                onClick={handleRandomSkill}
                className="flex items-center gap-2 rounded-xl border border-warm-50/[0.06] bg-warm-900/60 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-warm-400 transition-all duration-200 hover:border-warm-50/10 hover:text-warm-200"
                title={t('studyPage.randomSkill')}
              >
                <Dice5 className="h-3.5 w-3.5" />
                {t('studyPage.random')}
              </button>

              {/* Recently Viewed Toggle (mobile) */}
              {recentlyViewedIds.size > 0 && (
                <button
                  type="button"
                  onClick={() => setRecentOnly((prev) => !prev)}
                  className={cn(
                    'flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 sm:hidden',
                    recentOnly
                      ? domainColor
                      : 'border-warm-50/[0.06] bg-warm-900/60 text-warm-400 hover:border-warm-50/10 hover:text-warm-200',
                  )}
                >
                  {recentOnly ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}
                  {t('studyPage.recent')}
                </button>
              )}
            </div>
          </div>
        </header>

        {!visibleSkills.length ? (
          <EmptyState
            title={recentOnly ? t('studyPage.noRecentInDomain') : t('common.empty')}
          />
        ) : (
          <StaggerContainer className="grid gap-3">
            {visibleSkills.map((skill, idx) => {
              const isExpanded = expandedSkills.has(skill.id)
              const isRecent = recentlyViewedTimestamps[skill.id]
              const flags = contentFlags.get(skill.id)
              const hasChecklist = flags?.hasChecklist ?? false
              const hasMicroDetails = flags?.hasMicroDetails ?? false
              const hasVideos = flags?.hasVideos ?? false
              const richnessCount = [hasChecklist, hasMicroDetails, hasVideos].filter(Boolean).length
              const summary = getLocalizedText(skill.shortDescription, lang)

              return (
                <StaggerItem key={skill.id}>
                  <div
                    className="group relative overflow-hidden rounded-2xl border border-warm-50/[0.06] bg-warm-900/40 transition-all duration-300 hover:border-warm-50/10 hover:bg-warm-900/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {/* Quick Study Mode */}
                    {quickStudyMode ? (
                      <div className="p-5">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <div className="flex min-w-0 flex-1 items-center gap-2">
                            <h2 className="truncate text-base font-bold text-warm-50">
                              {getLocalizedText(skill.title, lang)}
                            </h2>
                            {/* Content depth indicator */}
                            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-warm-50/[0.06] bg-warm-50/[0.02] px-2 py-0.5 text-[10px] font-medium text-warm-500">
                              <span className="tabular-nums">{richnessCount}/3</span>
                              {hasChecklist && <span className="h-1.5 w-1.5 rounded-full bg-jade-400" title={t('studyPage.hasQualityCheck')} />}
                              {hasMicroDetails && <span className="h-1.5 w-1.5 rounded-full bg-gold-400" title={t('studyPage.hasMicroDetails')} />}
                              {hasVideos && <span className="h-1.5 w-1.5 rounded-full bg-steel-400" title={t('studyPage.hasVideos')} />}
                            </span>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            {isRecent && (
                              <span className="flex items-center gap-1 text-[10px] text-warm-500">
                                <Clock className="h-3 w-3" />
                                {formatTimeAgo(isRecent)}
                              </span>
                            )}
                            <Link
                              to={`/skills/${skill.id}`}
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-warm-50/[0.03] text-warm-500 transition-all hover:bg-jade-400/10 hover:text-jade"
                              onClick={() => recordView(skill.id)}
                              aria-label={getLocalizedText(skill.title, lang)}
                            >
                              <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                          </div>
                        </div>

                        {summary && (
                          <div className="flex items-start gap-2 text-sm text-warm-400">
                            <CircleDot className="mt-0.5 h-3.5 w-3.5 shrink-0 text-jade/60" />
                            <span className="line-clamp-3">{summary}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        className="flex cursor-pointer flex-col gap-4 p-5 transition-colors md:flex-row md:items-center"
                        onClick={() => {
                          recordView(skill.id)
                          navigate(`/skills/${skill.id}`)
                        }}
                      >
                        <div className="min-w-0 flex-1">
                          {/* Badges + Richness */}
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            {skill.riskLevel && (
                              <Badge tone={skill.riskLevel === 'safety_critical' ? 'copper' : 'warm'} className="text-[10px]">
                                {t(`modern.risk.${skill.riskLevel}`)}
                              </Badge>
                            )}
                            {skill.techniqueFamily && (
                              <Badge tone="gold" className="text-[10px]">
                                {t(`modern.family.${skill.techniqueFamily}`)}
                              </Badge>
                            )}
                            {skill.libraryTier && (
                              <span className="text-[10px] font-semibold uppercase tracking-tighter text-warm-500">
                                Tier {skill.libraryTier.slice(-1)}
                              </span>
                            )}
                            {/* Content depth indicator */}
                            <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-warm-50/[0.06] bg-warm-50/[0.02] px-2 py-0.5 text-[10px] font-medium text-warm-500 sm:ml-2">
                              <span className="tabular-nums">{richnessCount}/3</span>
                              {hasChecklist && <span className="h-1.5 w-1.5 rounded-full bg-jade-400" title={t('studyPage.hasQualityCheck')} />}
                              {hasMicroDetails && <span className="h-1.5 w-1.5 rounded-full bg-gold-400" title={t('studyPage.hasMicroDetails')} />}
                              {hasVideos && <span className="h-1.5 w-1.5 rounded-full bg-steel-400" title={t('studyPage.hasVideos')} />}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <h2 className="text-lg font-bold text-warm-50 transition-colors group-hover:text-jade">
                              {getLocalizedText(skill.title, lang)}
                            </h2>
                            {isRecent && (
                              <span className="flex shrink-0 items-center gap-1 text-[10px] text-warm-500">
                                <Clock className="h-3 w-3" />
                                {formatTimeAgo(isRecent)}
                              </span>
                            )}
                          </div>

                          {summary && (
                            <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-warm-400">{summary}</p>
                          )}

                          {/* Expanded content */}
                          {isExpanded && (
                            <div className="mt-4 animate-slideUp space-y-3 border-t border-warm-50/[0.04] pt-4">
                              {summary && (
                                <p className="text-sm leading-relaxed text-warm-400">{summary}</p>
                              )}
                              <div className="flex flex-wrap gap-1.5">
                                <span className="rounded-lg border border-warm-50/[0.04] bg-warm-50/[0.02] px-2.5 py-1 text-[11px] font-medium text-warm-300">
                                  {t(`domains.${skill.domain}`)}
                                </span>
                                <span className="rounded-lg border border-warm-50/[0.04] bg-warm-50/[0.02] px-2.5 py-1 text-[11px] font-medium text-warm-300">
                                  {t(`levels.${skill.level}`)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Chevron + Link */}
                        <div className="flex items-center gap-2 md:gap-3">
                          {/* Progress bar hint */}
                          <div className="hidden h-1.5 w-12 rounded-full bg-warm-800 sm:block">
                            <div
                              className="h-full rounded-full bg-jade-400/40"
                              style={{ width: skill.level === 'advanced' ? '100%' : skill.level === 'intermediate' ? '65%' : '35%' }}
                            />
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              className="rounded-md p-1 text-warm-500 transition-colors hover:text-warm-300"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleExpanded(skill.id)
                              }}
                              aria-label={isExpanded ? t('studyPage.collapseDetails') : t('studyPage.expandDetails')}
                            >
                              <ChevronDown
                                className={cn(
                                  'h-4 w-4 transition-transform duration-200',
                                  isExpanded && 'rotate-180',
                                )}
                              />
                            </button>
                            <Link
                              to={`/skills/${skill.id}`}
                              className="flex h-10 w-10 items-center justify-center rounded-xl bg-warm-50/[0.03] text-warm-500 transition-all hover:bg-jade-400/10 hover:text-jade"
                              onClick={(e) => {
                                e.stopPropagation()
                                recordView(skill.id)
                              }}
                              aria-label={getLocalizedText(skill.title, lang)}
                            >
                              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        )}
      </main>

      {/* Right Sidebar: Contextual Hints */}
      <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
        <div className="rounded-3xl border border-warm-50/[0.06] bg-warm-900/20 p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-hallmark-accent" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-warm-50">{t('modeUx.rail.next')}</h3>
          </div>
          <p className="text-xs leading-5 text-warm-400">{t('modeUx.study.rail')}</p>
        </div>

        <div className="rounded-3xl border border-warm-50/[0.06] bg-warm-900/20 p-6 hallmark-hero">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-warm-50">{t('modeUx.rail.related')}</h3>
          <div className="grid grid-cols-1 gap-2">
            {[
              { to: '/skills', key: 'nav.skills', icon: Zap },
              { to: '/concepts', key: 'nav.concepts', icon: Sparkles },
              { to: '/positions', key: 'nav.positions', icon: Target },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-3 rounded-xl border border-warm-50/[0.04] bg-warm-50/[0.02] px-4 py-3 text-sm font-medium text-warm-300 hallmark-card-hover"
              >
                <link.icon className="h-4 w-4 text-hallmark-text-accent opacity-60" />
                {t(link.key)}
              </Link>
            ))}
          </div>
        </div>

        {/* Legend: content depth indicators */}
        <div className="rounded-3xl border border-warm-50/[0.06] bg-warm-900/20 p-6">
          <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-warm-500">{t('studyPage.contentDepth')}</h3>
          <div className="space-y-2">
            {[
              { tone: 'bg-jade-400', key: 'studyPage.hasQualityCheck' },
              { tone: 'bg-gold-400', key: 'studyPage.hasMicroDetails' },
              { tone: 'bg-steel-400', key: 'studyPage.hasVideos' },
            ].map((item) => (
              <div key={item.key} className="flex items-center gap-2 text-xs text-warm-400">
                <div className={cn('h-2 w-2 rounded-full', item.tone)} />
                <span>{t(item.key)}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </PageShell>
  )
}
