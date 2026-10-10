import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { StaggerContainer, StaggerItem } from '../components/common/StaggerContainer'
import {
  ArrowRight,
  Zap,
  Sparkles,
  Target,
  Clock,
} from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { PageShell } from '../components/common/PageShell'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { useRecentlyViewedStore } from '../stores/useRecentlyViewedStore'
import type { SkillDomain } from '../types/skill'
import { getLocalizedText } from '../utils/localization'
import { modernFilterLabel } from '../utils/tagLabel'
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

export default function StudyPage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const skillsQuery = useSkillsQuery()
  const skills = useMemo(() => skillsQuery.data ?? [], [skillsQuery.data])
  const { recentlyViewed, recordView } = useRecentlyViewedStore()
  const [now] = useState(() => Date.now())

  const domainParam = searchParams.get('domain')
  const activeDomain = studyDomains.find((domain) => domain.id === domainParam) ?? studyDomains[0]
  const active = activeDomain.id
  const domainTone = activeDomain.tone

  const skillsByDomain = useMemo(
    () =>
      studyDomains.reduce<Record<string, typeof skills>>((groups, domain) => {
        groups[domain.id] = skills.filter((skill) => skill.domain === domain.id)
        return groups
      }, {}),
    [skills],
  )

  const recentlyViewedTimestamps = useMemo(
    () =>
      recentlyViewed.reduce<Record<string, number>>((map, e) => {
        map[e.skillId] = e.timestamp
        return map
      }, {}),
    [recentlyViewed],
  )

  const visibleSkills = skillsByDomain[active] ?? []

  const setDomain = (domain: SkillDomain) => {
    const next = new URLSearchParams(searchParams)
    next.set('domain', domain)
    setSearchParams(next, { replace: true })
  }

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
    <PageShell
      className="flex flex-col gap-6 xl:grid xl:grid-cols-[240px_1fr] xl:items-start 2xl:grid-cols-[280px_1fr_300px]"
      fullWidth
    >
      {/* Domain selector: sticky bar below xl (mobile, tablet, small laptops),
          sticky left sidebar from xl where there is room for a second column. */}
      <aside className="sticky top-20 z-20 -mx-4 bg-warm-950/80 px-4 py-3 backdrop-blur-xl xl:mx-0 xl:self-start xl:bg-transparent xl:p-0 xl:backdrop-blur-none">
        {/* Horizontal scroll below xl, vertical list in the xl sidebar */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide xl:flex-col xl:overflow-visible xl:pb-0">
          {studyDomains.map((domain) => {
            const isActive = active === domain.id
            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => setDomain(domain.id)}
                aria-pressed={isActive}
                className={cn(
                  'flex shrink-0 items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition-all duration-200 xl:w-full',
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
          <div className="relative z-10">
            <div className="min-w-0">
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
          </div>
        </header>

        {!visibleSkills.length ? (
          <EmptyState title={t('common.empty')} />
        ) : (
          <StaggerContainer className="grid gap-3">
            {visibleSkills.map((skill, idx) => {
              const isRecent = recentlyViewedTimestamps[skill.id]
              const summary = getLocalizedText(skill.shortDescription, lang)

              return (
                <StaggerItem key={skill.id}>
                  <div
                    className="group relative overflow-hidden rounded-2xl border border-warm-50/[0.06] bg-warm-900/40 transition-all duration-300 hover:border-warm-50/10 hover:bg-warm-900/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div
                      className="flex cursor-pointer flex-col gap-4 p-5 transition-colors md:flex-row md:items-center"
                      onClick={() => {
                        recordView(skill.id)
                        navigate(`/skills/${skill.id}`)
                      }}
                    >
                      <div className="min-w-0 flex-1">
                        {/* Badges */}
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          {skill.riskLevel && (
                            <Badge tone={skill.riskLevel === 'safety_critical' ? 'copper' : 'warm'} className="text-[10px]">
                              {modernFilterLabel(t, 'risk', skill.riskLevel)}
                            </Badge>
                          )}
                          {skill.techniqueFamily && (
                            <Badge tone="gold" className="text-[10px]">
                              {modernFilterLabel(t, 'family', skill.techniqueFamily)}
                            </Badge>
                          )}
                          {skill.libraryTier && skill.libraryTier !== 'core' && (
                            <span className="text-[10px] font-semibold uppercase tracking-tighter text-warm-500">
                              {modernFilterLabel(t, 'library', skill.libraryTier)}
                            </span>
                          )}
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
                      </div>

                      {/* Open the skill */}
                      <Link
                        to={`/skills/${skill.id}`}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warm-50/[0.03] text-warm-500 transition-all hover:bg-jade-400/10 hover:text-jade"
                        onClick={(e) => {
                          e.stopPropagation()
                          recordView(skill.id)
                        }}
                        aria-label={getLocalizedText(skill.title, lang)}
                        title={getLocalizedText(skill.title, lang)}
                      >
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        )}
      </main>

      {/* Right Sidebar: Contextual Hints */}
      <aside className="xl:col-span-2 2xl:col-span-1 2xl:sticky 2xl:top-20 2xl:self-start">
        <div className="rounded-3xl border border-warm-50/[0.06] bg-warm-900/20 p-6 hallmark-hero">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-warm-50">{t('modeUx.rail.related')}</h3>
          <div className="grid grid-cols-1 gap-2 xl:grid-cols-3 2xl:grid-cols-1">
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
      </aside>
    </PageShell>
  )
}
