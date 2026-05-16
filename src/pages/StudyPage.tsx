import { useMemo, useState, useCallback } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
import { useSettingsStore } from '../stores/useSettingsStore'
import { useRecentlyViewedStore } from '../stores/useRecentlyViewedStore'
import type { SkillDomain } from '../types/skill'
import { getLocalizedText, getLocalizedArray } from '../utils/localization'
import { cn } from '../utils/cn'

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
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const skillsQuery = useSkillsQuery()
  const skills = useMemo(() => skillsQuery.data ?? [], [skillsQuery.data])
  const { recentlyViewed, recordView } = useRecentlyViewedStore()
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set())
  const [quickStudyMode, setQuickStudyMode] = useState(false)
  const [recentOnly, setRecentOnly] = useState(false)
  const [now] = useState(() => Date.now())

  const active = (searchParams.get('domain') || studyDomains[0].id) as SkillDomain

  const skillsByDomain = useMemo(
    () =>
      studyDomains.reduce<Record<string, typeof skills>>((groups, domain) => {
        groups[domain.id] = skills.filter((skill) => skill.domain === domain.id)
        return groups
      }, {}),
    [skills],
  )

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

  // Get top-level color based on active domain
  const getDomainColor = () => {
    const domain = studyDomains.find((d) => d.id === active)
    const colors = {
      cyan: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-50 shadow-[0_0_15px_rgba(34,211,238,0.05)]',
      emerald: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-50 shadow-[0_0_15px_rgba(52,211,153,0.05)]',
      amber: 'border-amber-400/30 bg-amber-400/10 text-amber-50 shadow-[0_0_15px_rgba(251,191,36,0.05)]',
      rose: 'border-rose-400/30 bg-rose-400/10 text-rose-50 shadow-[0_0_15px_rgba(244,63,94,0.05)]',
      slate: 'border-slate-400/30 bg-slate-400/10 text-slate-50 shadow-[0_0_15px_rgba(148,163,184,0.05)]',
    }
    return colors[domain?.tone ?? 'emerald']
  }

  const domainColor = getDomainColor()
  const domainTone = studyDomains.find((d) => d.id === active)?.tone ?? 'emerald'

  return (
    <PageShell className="flex flex-col gap-6 xl:grid xl:grid-cols-[280px_1fr_300px]" fullWidth>
      {/* Mobile Sticky Domain Selector / Desktop Sidebar */}
      <aside className="sticky top-0 z-20 -mx-4 bg-slate-950/80 px-4 py-3 backdrop-blur-xl lg:static lg:mx-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none xl:sticky xl:top-6 xl:self-start">
        <div className="flex items-center justify-between lg:hidden mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">{t('modeUx.study.heading')}</h2>
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
                className={cn(
                  "flex shrink-0 items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition-all duration-200 lg:w-full",
                  isActive
                    ? domainColor
                    : "border-white/[0.06] bg-slate-900/40 text-slate-400 hover:border-white/10 hover:bg-white/[0.04] hover:text-slate-200"
                )}
              >
                <span className="whitespace-nowrap">{t(`modeUx.study.domains.${domain.key}`)}</span>                          <div className={cn(
                            "flex h-5 min-w-[20px] items-center justify-center rounded-md px-1 text-[10px] font-bold",
                            isActive ? "bg-emerald-400/20 text-emerald-300" : "bg-white/5 text-slate-500",
                            isActive && domain.tone === 'cyan' && "bg-cyan-400/20 text-cyan-300",
                            isActive && domain.tone === 'emerald' && "bg-emerald-400/20 text-emerald-300",
                            isActive && domain.tone === 'amber' && "bg-amber-400/20 text-amber-300",
                            isActive && domain.tone === 'rose' && "bg-rose-400/20 text-rose-300",
                            isActive && domain.tone === 'slate' && "bg-slate-400/20 text-slate-300",
                          )}>
                  {skillsByDomain[domain.id]?.length ?? 0}
                </div>
              </button>
            )
          })}
        </div>

        {/* Info card only on Desktop Sidebar */}
        <div className="hidden mt-6 lg:block space-y-4">
          <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">{t('modeUx.study.heading')}</h3>
            <p className="mt-3 text-xs leading-5 text-slate-400">{t('modeUx.study.subtitle')}</p>
          </div>

          {/* Recently Viewed Toggle (desktop) */}
          {recentlyViewedIds.size > 0 && (
            <button
              type="button"
              onClick={() => setRecentOnly((prev) => !prev)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200",
                recentOnly
                  ? `${domainColor}`
                  : "border-white/[0.06] bg-slate-900/40 text-slate-400 hover:border-white/10 hover:bg-white/[0.04] hover:text-slate-200"
              )}
            >
              {recentOnly ? (
                <EyeOff className="h-4 w-4 shrink-0" />
              ) : (
                <Eye className="h-4 w-4 shrink-0" />
              )}
              <span className="flex-1">{t('studyPage.recentlyViewed')}</span>
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-md bg-white/5 px-1 text-[10px] font-bold text-slate-500">
                {visibleSkills.length}
              </span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="min-w-0 space-y-6">
        {/* Header */}
        <header className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-slate-900/20 p-6 lg:p-8">
          <div className={cn(
            "absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl",
            domainTone === 'cyan' && 'bg-cyan-400/5',
            domainTone === 'emerald' && 'bg-emerald-400/5',
            domainTone === 'amber' && 'bg-amber-400/5',
            domainTone === 'rose' && 'bg-rose-400/5',
            domainTone === 'slate' && 'bg-slate-400/5',
          )} />
          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Badge tone={domainTone} className="px-2 py-0.5 text-[10px] uppercase tracking-widest">
                {t('nav.study')}
              </Badge>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white lg:text-4xl">
                {t(`modeUx.study.domains.${studyDomains.find((item) => item.id === active)?.key ?? 'guard'}`)}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 lg:text-base">
                {t('modeUx.study.body')}
              </p>
            </div>

            {/* Toolbar */}
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              {/* Quick Study Toggle */}
              <button
                type="button"
                onClick={() => setQuickStudyMode((prev) => !prev)}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200",
                  quickStudyMode
                    ? `${domainColor}`
                    : "border-white/[0.06] bg-slate-900/60 text-slate-400 hover:border-white/10 hover:text-slate-200"
                )}
                title={quickStudyMode ? t('studyPage.exitQuickMode') : t('studyPage.quickMode')}
              >
                <Zap className={cn("h-3.5 w-3.5", quickStudyMode && "animate-pulse")} />
                {t('studyPage.quickStudy')}
              </button>

              {/* Random Skill Button */}
              <button
                type="button"
                onClick={handleRandomSkill}
                className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-slate-900/60 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 transition-all duration-200 hover:border-white/10 hover:text-slate-200"
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
                    "flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 sm:hidden",
                    recentOnly
                      ? `${domainColor}`
                      : "border-white/[0.06] bg-slate-900/60 text-slate-400 hover:border-white/10 hover:text-slate-200"
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
          <div className="grid gap-3">
            {visibleSkills.map((skill, idx) => {
              const isExpanded = expandedSkills.has(skill.id)
              const isRecent = recentlyViewedTimestamps[skill.id]
              const hasMicroDetails = (skill.microDetailSystem?.topFiveDetails?.length ?? 0) > 0
              const hasQualityCheck = !!skill.qualityChecklist
              const hasBodyDetails = !!skill.bodyToBodyDetails
              const hasBlackbelt = !!skill.blackbeltDetails
              const richnessCount = [hasMicroDetails, hasQualityCheck, hasBodyDetails, hasBlackbelt].filter(Boolean).length

              // Quick study mode content
              const quickCues = getLocalizedArray(skill.quickCard?.threeCues, lang)
              const primaryGoal = getLocalizedText(skill.primaryGoal, lang)
              const keyConcepts = getLocalizedArray(skill.keyConcepts, lang)

              return (
                <div
                  key={skill.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-slate-900/40 transition-all duration-300 hover:border-white/10 hover:bg-slate-900/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {/* Quick Study Mode */}
                  {quickStudyMode ? (
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <h2 className="text-base font-bold text-white truncate">
                            {getLocalizedText(skill.title, lang)}
                          </h2>
                          {/* Richness indicator dots */}
                          <div className="flex items-center gap-1 shrink-0">
                            {richnessCount < 4 && (
                              <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
                                {richnessCount}/4
                              </span>
                            )}
                            {hasMicroDetails && <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" title={t('studyPage.hasMicroDetails')} />}
                            {hasQualityCheck && <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" title={t('studyPage.hasQualityCheck')} />}
                            {hasBodyDetails && <div className="h-1.5 w-1.5 rounded-full bg-amber-400" title={t('studyPage.hasBodyDetails')} />}
                            {hasBlackbelt && <div className="h-1.5 w-1.5 rounded-full bg-violet-400" title={t('studyPage.hasBlackbelt')} />}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {isRecent && (
                            <span className="flex items-center gap-1 text-[10px] text-slate-500">
                              <Clock className="h-3 w-3" />
                              {formatTimeAgo(isRecent)}
                            </span>
                          )}
                          <Link
                            to={`/skills/${skill.id}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] text-slate-500 transition-all hover:bg-emerald-400/10 hover:text-emerald-300"
                            onClick={() => recordView(skill.id)}
                          >
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>

                      {/* Quick cues */}
                      {quickCues.length > 0 && (
                        <div className="space-y-1">
                          {quickCues.slice(0, 3).map((cue, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-slate-400">
                              <CircleDot className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400/60" />
                              <span>{cue}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {quickCues.length === 0 && (
                        <p className="text-sm leading-relaxed text-slate-500 line-clamp-2">
                          {primaryGoal}
                        </p>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* Default / Collapsed */}
                      <div
                        className="flex cursor-pointer flex-col gap-4 p-5 transition-colors md:flex-row md:items-center"
                        onClick={() => {
                          recordView(skill.id)
                          navigate(`/skills/${skill.id}`)
                        }}
                      >
                        <div className="flex-1 min-w-0">
                          {/* Badges + Richness */}
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            {skill.riskLevel && (
                              <Badge tone={skill.riskLevel === 'safety_critical' ? 'amber' : 'slate'} className="text-[10px]">
                                {t(`modern.risk.${skill.riskLevel}`)}
                              </Badge>
                            )}
                            {skill.techniqueFamily && (
                              <Badge tone="cyan" className="text-[10px]">
                                {t(`modern.family.${skill.techniqueFamily}`)}
                              </Badge>
                            )}
                            {skill.libraryTier && (
                              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-tighter">
                                Tier {skill.libraryTier.slice(-1)}
                              </span>
                            )}
                            {/* Richness indicator dots */}
                            <div className="flex items-center gap-1 ml-auto sm:ml-2">
                              {richnessCount < 4 && (
                                <span className="text-[10px] text-slate-600 font-medium mr-0.5">
                                  {richnessCount}/4
                                </span>
                              )}
                              {hasMicroDetails && <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" title={t('studyPage.hasMicroDetails')} />}
                              {hasQualityCheck && <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" title={t('studyPage.hasQualityCheck')} />}
                              {hasBodyDetails && <div className="h-1.5 w-1.5 rounded-full bg-amber-400" title={t('studyPage.hasBodyDetails')} />}
                              {hasBlackbelt && <div className="h-1.5 w-1.5 rounded-full bg-violet-400" title={t('studyPage.hasBlackbelt')} />}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <h2 className="text-lg font-bold text-white transition-colors group-hover:text-emerald-100">
                              {getLocalizedText(skill.title, lang)}
                            </h2>
                            {isRecent && (
                              <span className="shrink-0 text-[10px] text-slate-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatTimeAgo(isRecent)}
                              </span>
                            )}
                          </div>

                          {/* Expanded content */}
                          {isExpanded && (
                            <div className="mt-4 animate-slideUp space-y-3 border-t border-white/[0.04] pt-4">
                              <p className="text-sm leading-relaxed text-slate-400">
                                {primaryGoal}
                              </p>
                              {keyConcepts.length > 0 && (
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                {t('studyPage.keyConcepts')}
                              </span>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {keyConcepts.slice(0, 4).map((concept, i) => (
                                  <span key={i} className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium text-slate-300">
                                    {concept}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                            </div>
                          )}
                        </div>

                        {/* Chevron + Link */}
                        <div className="flex items-center gap-2 md:gap-3">
                          {/* Progress bar hint */}
                          <div className="hidden sm:block h-1.5 w-12 rounded-full bg-slate-800">
                            <div
                              className="h-full rounded-full bg-emerald-400/40"
                              style={{ width: skill.level === 'advanced' ? '100%' : skill.level === 'intermediate' ? '65%' : '35%' }}
                            />
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              className="rounded-md p-1 text-slate-500 transition-colors hover:text-slate-300"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleExpanded(skill.id)
                              }}
                              aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                            >
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform duration-200",
                                  isExpanded && "rotate-180"
                                )}
                              />
                            </button>
                            <Link
                              to={`/skills/${skill.id}`}
                              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] text-slate-500 transition-all hover:bg-emerald-400/10 hover:text-emerald-300"
                              onClick={(e) => {
                                e.stopPropagation()
                                recordView(skill.id)
                              }}
                            >
                              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Right Sidebar: Contextual Hints */}
      <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
        <div className="rounded-3xl border border-white/[0.06] bg-slate-900/20 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">{t('modeUx.rail.next')}</h3>
          </div>
          <p className="text-xs leading-5 text-slate-400">{t('modeUx.study.rail')}</p>
        </div>

        <div className="rounded-3xl border border-white/[0.06] bg-slate-900/20 p-6">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">{t('modeUx.rail.related')}</h3>
          <div className="grid grid-cols-1 gap-2">
            {[
              { to: "/skills", key: 'nav.skills', icon: Zap },
              { to: "/concepts", key: 'nav.concepts', icon: Sparkles },
              { to: "/positions", key: 'nav.positions', icon: Target },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3 text-sm font-medium text-slate-300 transition-all hover:border-emerald-400/20 hover:bg-emerald-400/5 hover:text-emerald-100"
              >
                <link.icon className="h-4 w-4 text-emerald-400/60" />
                {t(link.key)}
              </Link>
            ))}
          </div>
        </div>

        {/* Legend: Richness indicators */}
        <div className="rounded-3xl border border-white/[0.06] bg-slate-900/20 p-6">
          <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('studyPage.contentDepth')}</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="h-2 w-2 rounded-full bg-cyan-400" />
              <span>{t('studyPage.hasMicroDetails')}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>{t('studyPage.hasQualityCheck')}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="h-2 w-2 rounded-full bg-amber-400" />
              <span>{t('studyPage.hasBodyDetails')}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="h-2 w-2 rounded-full bg-violet-400" />
              <span>{t('studyPage.hasBlackbelt')}</span>
            </div>
          </div>
        </div>
      </aside>
    </PageShell>
  )
}
