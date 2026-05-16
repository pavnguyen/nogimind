import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, Compass, Layers3, ArrowRight, TrendingUp, BookOpen, Shield, Clock, Sparkles, Zap, Target } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { PageShell } from '../components/common/PageShell'
import { useConceptsQuery } from '../queries/conceptQueries'
import { usePositionsQuery } from '../queries/positionQueries'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getMicroDetails } from '../utils/knowledgeModules'
import { getLocalizedText } from '../utils/localization'
import { cn } from '../utils/cn'

const dailySeed = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

const hashString = (value: string) => {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0
  }
  return hash
}

const pickDailyItem = <T,>(items: T[], key: string): T | undefined => {
  if (!items.length) return undefined
  return items[hashString(`${dailySeed()}:${key}`) % items.length]
}

const quickActions = [
  { to: '/search', icon: Search, label: 'dashboard.heroAction', color: 'from-cyan-500/20 to-blue-500/10 border-cyan-400/20 hover:border-cyan-400/40' },
  { to: '/skills', icon: Layers3, label: 'dashboard.entries.skills', color: 'from-emerald-500/20 to-teal-500/10 border-emerald-400/20 hover:border-emerald-400/40' },
  { to: '/study', icon: Compass, label: 'dashboard.cockpit.skill', color: 'from-violet-500/20 to-purple-500/10 border-violet-400/20 hover:border-violet-400/40' },
  { to: '/reference', icon: BookOpen, label: 'nav.reference', color: 'from-amber-500/20 to-orange-500/10 border-amber-400/20 hover:border-amber-400/40' },
]

export default function DashboardPage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const skills = useSkillsQuery().data ?? []
  const concepts = useConceptsQuery().data ?? []
  const positions = usePositionsQuery().data ?? []
  const microDetails = useMemo(() => getMicroDetails(skills), [skills])

  const microDetail = useMemo(() => pickDailyItem(microDetails, 'micro-detail'), [microDetails])
  const concept = useMemo(() => pickDailyItem(concepts, 'concept'), [concepts])
  const position = useMemo(() => pickDailyItem(positions, 'position'), [positions])

  const totalSkills = skills.length
  const safetyCritical = skills.filter((s) => s.riskLevel === 'safety_critical' || s.libraryTier === 'safety_critical').length

  return (
    <PageShell
      header={
        <section className="space-y-6">
          {/* Greeting & Quick Stats */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                <Sparkles className="h-6 w-6 text-slate-950" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                  {t('app.name')}
                </h1>
                <p className="mt-1 text-sm text-slate-500">{t('app.thesis')}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="rounded-2xl border border-white/[0.06] bg-slate-900/40 px-4 py-2 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('dashboard.totalSkills')}</p>
                <p className="text-xl font-bold text-emerald-400">{totalSkills}</p>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-slate-900/40 px-4 py-2 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Safety</p>
                <p className="text-xl font-bold text-amber-400">{safetyCritical}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions - Slimmer & Sleeker */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.to}
                  to={action.to}
                  className={cn(
                    'group relative overflow-hidden rounded-2xl border bg-slate-900/40 p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-900/60',
                    action.color,
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/5 p-2 transition-colors group-hover:bg-white/10">
                      <Icon className="h-5 w-5 text-slate-300 transition-transform group-hover:scale-110" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-white">{t(action.label)}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      }
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
        {/* HERO: Today's Focus - Takes 8 cols on desktop */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-emerald-400/20 bg-slate-900/40 p-8 lg:col-span-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-400/5 blur-[80px]" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <Clock className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold tracking-tight text-white">{t('dashboard.todayFocus')}</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {microDetail && (
                <Link 
                  to={`/skills/${microDetail.skillId}`} 
                  className="group block space-y-4 rounded-3xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all hover:bg-white/[0.06] hover:shadow-xl"
                >
                  <Badge tone="cyan" className="px-2 py-0.5 text-[10px] uppercase tracking-widest">{t('dashboard.microDetailOfDay')}</Badge>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{getLocalizedText(microDetail.title, lang)}</h3>
                  <p className="text-sm leading-relaxed text-slate-400 line-clamp-3">{getLocalizedText(microDetail.correctionCue, lang)}</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">
                    <span>View Detail</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              )}

              {concept && (
                <Link 
                  to={`/concepts/${concept.id}`} 
                  className="group block space-y-4 rounded-3xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all hover:bg-white/[0.06] hover:shadow-xl"
                >
                  <Badge tone="emerald" className="px-2 py-0.5 text-[10px] uppercase tracking-widest">{t('dashboard.conceptOfDay')}</Badge>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">{getLocalizedText(concept.title, lang)}</h3>
                  <p className="text-sm leading-relaxed text-slate-400 line-clamp-3">{getLocalizedText(concept.shortDefinition, lang)}</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100">
                    <span>Explore Concept</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* SIDE: Position of the Day - Takes 4 cols on desktop */}
        {position && (
          <section className="lg:col-span-4">
            <Link
              to={`/positions/${position.id}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-cyan-400/20 bg-gradient-to-br from-slate-900/60 to-slate-950 p-8 transition-all hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 translate-y-[-20%] rotate-12 opacity-10">
                <TrendingUp className="h-full w-full text-cyan-400" />
              </div>

              <div className="flex items-center gap-2 mb-6">
                <div className="rounded-lg bg-cyan-400/10 p-2">
                  <TrendingUp className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">{t('dashboard.positionOfDay')}</span>
              </div>

              <h2 className="text-3xl font-bold text-white group-hover:text-cyan-200 transition-colors">{getLocalizedText(position.title, lang)}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400 line-clamp-4">{getLocalizedText(position.description, lang)}</p>
              
              <div className="mt-auto pt-8">
                <div className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-bold text-slate-950 transition-transform group-hover:translate-y-[-2px]">
                  <span>Study Position</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Workflow Steps - Full width on desktop rows */}
        <section className="lg:col-span-12">
          <div className="rounded-[2.5rem] border border-white/[0.06] bg-slate-900/20 p-8">
            <div className="flex flex-col gap-1 mb-8">
              <h2 className="text-xl font-bold text-white">{t('dashboard.workflow.title')}</h2>
              <p className="text-sm text-slate-500">{t('dashboard.workflow.subtitle')}</p>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[0, 1, 2, 3].map((index) => {
                const item = {
                  to: ['/positions', '/skills', '/micro-details', '/chains'][index],
                  title: `dashboard.workflow.${index}.title`,
                  body: `dashboard.workflow.${index}.body`,
                }
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group relative flex flex-col items-start gap-4 rounded-3xl border border-white/[0.06] bg-slate-900/40 p-6 transition-all hover:border-emerald-400/30 hover:bg-slate-900/80 hover:shadow-lg"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-sm font-black text-emerald-400 transition-transform group-hover:scale-110">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-emerald-300">{t(item.title)}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-500 line-clamp-2">{t(item.body)}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Footer shortcuts - 2 cols on desktop bottom row */}
        <section className="grid gap-6 md:grid-cols-2 lg:col-span-12">
          {/* Quick Shortcuts */}
          <div className="rounded-[2rem] border border-white/[0.06] bg-slate-900/40 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="h-4 w-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">{t('dashboard.debugShortcuts')}</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { to: '/skills?risk=safety_critical', label: t('dashboard.shortcuts.safety'), icon: Shield },
                { to: '/troubleshooters', label: t('dashboard.shortcuts.submissions'), icon: Target },
                { to: '/escape-maps', label: t('dashboard.shortcuts.escapes'), icon: ArrowRight },
                { to: '/defense', label: t('nav.defense'), icon: Shield },
              ].map((shortcut) => {
                const ShortcutIcon = shortcut.icon
                return (
                  <Link
                    key={shortcut.to}
                    to={shortcut.to}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3 text-sm text-slate-400 transition-all hover:border-white/10 hover:bg-white/5 hover:text-white"
                  >
                    <ShortcutIcon className="h-3.5 w-3.5 shrink-0 text-slate-600" />
                    <span className="truncate">{shortcut.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="rounded-[2rem] border border-white/[0.06] bg-slate-900/40 p-6">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-4 w-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">{t('common.quickLinks')}</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { to: '/learn', label: t('nav.learn') },
                { to: '/mastery', label: t('nav.mastery') },
                { to: '/game-tree', label: t('nav.gameTree') },
                { to: '/about', label: t('nav.philosophy') },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3 text-sm text-slate-400 transition-all hover:border-white/10 hover:bg-white/5 hover:text-white"
                >
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-700" />
                  <span className="truncate">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
