import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Zap, Sparkles, Target } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { PageShell } from '../components/common/PageShell'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import type { SkillDomain } from '../types/skill'
import { getLocalizedText } from '../utils/localization'
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
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-50 shadow-[0_0_15px_rgba(52,211,153,0.05)]" 
                    : "border-white/[0.06] bg-slate-900/40 text-slate-400 hover:border-white/10 hover:bg-white/[0.04] hover:text-slate-200"
                )}
              >
                <span className="whitespace-nowrap">{t(`modeUx.study.domains.${domain.key}`)}</span>
                <div className={cn(
                  "flex h-5 min-w-[20px] items-center justify-center rounded-md px-1 text-[10px] font-bold",
                  isActive ? "bg-emerald-400/20 text-emerald-300" : "bg-white/5 text-slate-500"
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
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="min-w-0 space-y-6">
        <header className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-slate-900/20 p-6 lg:p-8">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-400/5 blur-3xl" />
          <div className="relative z-10">
            <Badge tone="emerald" className="px-2 py-0.5 text-[10px] uppercase tracking-widest">
              {t('nav.study')}
            </Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white lg:text-4xl">
              {t(`modeUx.study.domains.${studyDomains.find((item) => item.id === active)?.key ?? 'guard'}`)}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 lg:text-base">
              {t('modeUx.study.body')}
            </p>
          </div>
        </header>

        {!visibleSkills.length ? (
          <EmptyState title={t('common.empty')} />
        ) : (
          <div className="grid gap-4">
            {visibleSkills.map((skill, idx) => (
              <Link 
                key={skill.id} 
                to={`/skills/${skill.id}`} 
                className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-slate-900/40 p-5 transition-all duration-300 hover:border-emerald-400/20 hover:bg-slate-900/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:flex-row md:items-center"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
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
                  </div>
                  <h2 className="text-lg font-bold text-white transition-colors group-hover:text-emerald-100">
                    {getLocalizedText(skill.title, lang)}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">
                    {getLocalizedText(skill.primaryGoal, lang)}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-white/[0.04] pt-4 md:border-0 md:pt-0">
                  <div className="flex -space-x-2 overflow-hidden">
                    {/* Visual hint for complexity/depth */}
                    <div className="h-1.5 w-8 rounded-full bg-slate-800">
                      <div 
                        className="h-full rounded-full bg-emerald-400/40" 
                        style={{ width: skill.complexity === 'advanced' ? '100%' : skill.complexity === 'intermediate' ? '65%' : '35%' }} 
                      />
                    </div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] text-slate-500 transition-all group-hover:bg-emerald-400/10 group-hover:text-emerald-300">
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            ))}
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
              { to: "/micro-details", key: 'nav.microDetails', icon: Zap },
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
      </aside>
    </PageShell>
  )
}
