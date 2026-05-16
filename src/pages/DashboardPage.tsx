import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  BookOpen,
  Compass,
  Wrench,
  Layers3,
  Sparkles,
  ArrowRight,
  Clock,
  Shield,
  Lightbulb,
  Target,
  Zap,
  Sun,

} from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { PageShell } from '../components/common/PageShell'
import { useConceptsQuery } from '../queries/conceptQueries'
import { usePositionsQuery } from '../queries/positionQueries'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getMicroDetails } from '../utils/knowledgeModules'
import { getLocalizedText } from '../utils/localization'
import { trainingMethods } from '../data/trainingMethods'
import { defensiveLayers } from '../data/defensiveLayers'
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

const dayOfWeek = new Date().getDay()
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/** 7-day rotation configuration — what gets featured each day */
const rotationConfig = [
  { key: 'micro-detail', label: 'dashboard.rotation.microDetail', tone: 'cyan' as const, icon: Zap },
  { key: 'concept', label: 'dashboard.rotation.concept', tone: 'emerald' as const, icon: Lightbulb },
  { key: 'position', label: 'dashboard.rotation.position', tone: 'amber' as const, icon: Compass },
  { key: 'training-tip', label: 'dashboard.rotation.trainingTip', tone: 'violet' as const, icon: Target },
  { key: 'safety', label: 'dashboard.rotation.safety', tone: 'rose' as const, icon: Shield },
  { key: 'concept-alt', label: 'dashboard.rotation.conceptAlt', tone: 'emerald' as const, icon: Lightbulb },
  { key: 'skill-insight', label: 'dashboard.rotation.skillInsight', tone: 'slate' as const, icon: Zap },
]

const todayConfig = rotationConfig[dayOfWeek]
const tomorrowConfig = rotationConfig[(dayOfWeek + 1) % 7]
const nextConfig = rotationConfig[(dayOfWeek + 2) % 7]

/** Per-rotation-type gradient and background styles for the large card */
const cardGradients: Record<string, string> = {
  'micro-detail': 'from-cyan-500/10 via-blue-500/5 to-slate-900 border-cyan-400/20',
  concept: 'from-emerald-500/10 via-teal-500/5 to-slate-900 border-emerald-400/20',
  position: 'from-amber-500/10 via-orange-500/5 to-slate-900 border-amber-400/20',
  'training-tip': 'from-violet-500/10 via-purple-500/5 to-slate-900 border-violet-400/20',
  safety: 'from-rose-500/10 via-pink-500/5 to-slate-900 border-rose-400/20',
  'concept-alt': 'from-emerald-500/10 via-teal-500/5 to-slate-900 border-emerald-400/20',
  'skill-insight': 'from-slate-500/10 via-slate-600/5 to-slate-900 border-slate-400/20',
}

const hubLinks = [
  { to: '/learn', icon: Compass, label: 'nav.learn', tone: 'cyan' as const },
  { to: '/study', icon: Zap, label: 'nav.study', tone: 'emerald' as const, highlight: true },
  { to: '/fix', icon: Wrench, label: 'nav.fix', tone: 'amber' as const },
  { to: '/build', icon: Layers3, label: 'nav.build', tone: 'violet' as const },
  { to: '/reference', icon: BookOpen, label: 'nav.reference', tone: 'slate' as const },
]

export default function DashboardPage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const skills = useSkillsQuery().data ?? []
  const concepts = useConceptsQuery().data ?? []
  const positions = usePositionsQuery().data ?? []
  const microDetails = useMemo(() => getMicroDetails(skills), [skills])

  // Daily picks for the 7-item rotation
  const microDetail = useMemo(() => pickDailyItem(microDetails, 'micro-detail'), [microDetails])
  const concept = useMemo(() => pickDailyItem(concepts, 'concept'), [concepts])
  const position = useMemo(() => pickDailyItem(positions, 'position'), [positions])
  const conceptAlt = useMemo(() => pickDailyItem(concepts, 'concept-alt'), [concepts])
  const trainingTip = useMemo(() => pickDailyItem(trainingMethods, 'training-tip'), [trainingMethods])
  const safetyLayer = useMemo(() => pickDailyItem(defensiveLayers, 'safety'), [defensiveLayers])
  const skillInsight = useMemo(() => pickDailyItem(skills, 'skill-insight'), [skills])

  // Stats
  const totalSkills = skills.length
  const safetyCritical = skills.filter((s) => s.riskLevel === 'safety_critical' || s.libraryTier === 'safety_critical').length
  const skillsWithDetails = skills.filter((s) => (s.microDetailSystem?.topFiveDetails?.length ?? 0) > 0).length
  const coveragePct = totalSkills > 0 ? Math.round((skillsWithDetails / totalSkills) * 100) : 0

  // Map rotation type to the data we want to render
  const renderTodayItem = () => {
    switch (todayConfig.key) {
      case 'micro-detail':
        return microDetail
          ? { title: getLocalizedText(microDetail.title, lang), description: getLocalizedText(microDetail.correctionCue, lang), linkTo: `/skills/${microDetail.skillId}` }
          : undefined
      case 'concept':
      case 'concept-alt': {
        const item = todayConfig.key === 'concept' ? concept : conceptAlt
        return item
          ? { title: getLocalizedText(item.title, lang), description: getLocalizedText(item.shortDefinition, lang), linkTo: `/concepts/${item.id}` }
          : undefined
      }
      case 'position':
        return position
          ? { title: getLocalizedText(position.title, lang), description: getLocalizedText(position.description, lang), linkTo: `/positions/${position.id}` }
          : undefined
      case 'training-tip':
        return trainingTip
          ? { title: getLocalizedText(trainingTip.title, lang), description: getLocalizedText(trainingTip.shortDescription, lang), linkTo: '/learn' }
          : undefined
      case 'safety':
        return safetyLayer
          ? { title: getLocalizedText(safetyLayer.title, lang), description: getLocalizedText(safetyLayer.threat, lang), linkTo: '/defense' }
          : undefined
      case 'skill-insight':
        return skillInsight
          ? { title: getLocalizedText(skillInsight.title, lang), description: getLocalizedText(skillInsight.primaryGoal, lang), linkTo: `/skills/${skillInsight.id}` }
          : undefined
      default:
        return undefined
    }
  }

  const renderSecondaryItem = (config: typeof tomorrowConfig) => {
    switch (config.key) {
      case 'micro-detail': {
        const item = pickDailyItem(microDetails, 'micro-detail-secondary')
        return item ? { title: getLocalizedText(item.title, lang), linkTo: `/skills/${item.skillId}` } : undefined
      }
      case 'concept':
      case 'concept-alt': {
        const item = pickDailyItem(concepts, config.key === 'concept' ? 'concept-secondary' : 'concept-alt-secondary')
        return item ? { title: getLocalizedText(item.title, lang), linkTo: `/concepts/${item.id}` } : undefined
      }
      case 'position': {
        const item = pickDailyItem(positions, 'position-secondary')
        return item ? { title: getLocalizedText(item.title, lang), linkTo: `/positions/${item.id}` } : undefined
      }
      case 'training-tip': {
        const item = pickDailyItem(trainingMethods, 'training-tip-secondary')
        return item ? { title: getLocalizedText(item.title, lang), linkTo: '/learn' } : undefined
      }
      case 'safety': {
        const item = pickDailyItem(defensiveLayers, 'safety-secondary')
        return item ? { title: getLocalizedText(item.title, lang), linkTo: '/defense' } : undefined
      }
      case 'skill-insight': {
        const item = pickDailyItem(skills, 'skill-insight-secondary')
        return item ? { title: getLocalizedText(item.title, lang), linkTo: `/skills/${item.id}` } : undefined
      }
      default:
        return undefined
    }
  }

  const todayItem = renderTodayItem()
  const secondaryItem1 = renderSecondaryItem(tomorrowConfig)
  const secondaryItem2 = renderSecondaryItem(nextConfig)

  const TodayIcon = todayConfig.icon
  const DayIcon = dayOfWeek === 0 || dayOfWeek === 6 ? Sun : Zap

  return (
    <PageShell
      header={
        <section className="space-y-6">
          {/* Hero */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-teal-400 shadow-[0_0_30px_rgba(52,211,153,0.25)]">
                <Sparkles className="relative z-10 h-7 w-7 text-slate-950" aria-hidden="true" />
                {/* Subtle pulse ring */}
                <div className="absolute inset-0 animate-ping rounded-2xl bg-emerald-400/20" style={{ animationDuration: '3s' }} />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                    {t('app.name')}
                  </h1>
                </div>
                <p className="mt-1.5 text-sm text-slate-500">{t('app.thesis')}</p>
              </div>
            </div>

            {/* Stats strip */}
            <div className="flex flex-wrap gap-2">
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('dashboard.totalSkills')}</p>
                <p className="text-xl font-bold text-emerald-400">{totalSkills}</p>
              </div>
              <div className="rounded-2xl border border-rose-400/20 bg-rose-400/5 px-4 py-2 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('dashboard.safetyCritical')}</p>
                <p className="text-xl font-bold text-rose-400">{safetyCritical}</p>
              </div>
              <div className="rounded-2xl border border-violet-400/20 bg-violet-400/5 px-4 py-2 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('dashboard.contentCoverage')}</p>
                <p className="text-xl font-bold text-violet-400">{coveragePct}%</p>
              </div>
            </div>
          </div>
        </section>
      }
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* ─── Daily Focus — main card, 7 cols ─── */}
        <section className="lg:col-span-7">
          {todayItem ? (
            <Link
              to={todayItem.linkTo}
              className={cn(
                'group relative block overflow-hidden rounded-[2.5rem] border bg-gradient-to-br p-8 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl',
                cardGradients[todayConfig.key],
              )}
            >
              {/* Decorative glow blob */}
              <div className={cn(
                'absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-20 blur-[100px] transition-opacity group-hover:opacity-30',
                todayConfig.key === 'micro-detail' && 'bg-cyan-400',
                todayConfig.key === 'concept' && 'bg-emerald-400',
                todayConfig.key === 'position' && 'bg-amber-400',
                todayConfig.key === 'training-tip' && 'bg-violet-400',
                todayConfig.key === 'safety' && 'bg-rose-400',
                todayConfig.key === 'concept-alt' && 'bg-emerald-400',
                todayConfig.key === 'skill-insight' && 'bg-slate-400',
              )} />

              <div className="relative z-10">
                {/* Day badge */}
                <div className="mb-6 flex items-center gap-3">
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110',
                    todayConfig.tone === 'cyan' && 'bg-cyan-400/10 text-cyan-400',
                    todayConfig.tone === 'emerald' && 'bg-emerald-400/10 text-emerald-400',
                    todayConfig.tone === 'amber' && 'bg-amber-400/10 text-amber-400',
                    todayConfig.tone === 'violet' && 'bg-violet-400/10 text-violet-400',
                    todayConfig.tone === 'rose' && 'bg-rose-400/10 text-rose-400',
                    todayConfig.tone === 'slate' && 'bg-slate-400/10 text-slate-400',
                  )}>
                    <TodayIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <Badge tone={todayConfig.tone} className="px-2 py-0.5 text-[10px] uppercase tracking-widest">
                      {dayNames[dayOfWeek]} · {t(todayConfig.label)}
                    </Badge>
                  </div>
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-white lg:text-3xl">
                  {todayItem.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-400 line-clamp-3">
                  {todayItem.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors group-hover:text-white">
                  <span>{t('common.open')}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex h-full min-h-[280px] items-center justify-center rounded-[2.5rem] border border-white/[0.06] bg-slate-900/30">
              <div className="text-center">
                <Clock className="mx-auto h-8 w-8 text-slate-600" />
                <p className="mt-3 text-sm text-slate-500">{t('common.empty')}</p>
              </div>
            </div>
          )}
        </section>

        {/* ─── Also Today — 2 smaller cards, 5 cols ─── */}
        <section className="flex flex-col gap-4 lg:col-span-5">
          <div className="flex items-center gap-2">
            <DayIcon className="h-4 w-4 text-slate-500" />
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('dashboard.alsoToday')}</h3>
          </div>

          {[secondaryItem1, secondaryItem2].map((item, index) => {
            const cfg = index === 0 ? tomorrowConfig : nextConfig
            const Icon = cfg.icon
            if (!item) {
              return (
                <div
                  key={cfg.key}
                  className="flex items-center rounded-2xl border border-white/[0.04] bg-white/[0.02] px-5 py-4"
                >
                  <div className={cn(
                    'mr-4 flex h-9 w-9 items-center justify-center rounded-xl',
                    cfg.tone === 'cyan' && 'bg-cyan-400/5 text-cyan-400/50',
                    cfg.tone === 'emerald' && 'bg-emerald-400/5 text-emerald-400/50',
                    cfg.tone === 'amber' && 'bg-amber-400/5 text-amber-400/50',
                    cfg.tone === 'violet' && 'bg-violet-400/5 text-violet-400/50',
                    cfg.tone === 'rose' && 'bg-rose-400/5 text-rose-400/50',
                    cfg.tone === 'slate' && 'bg-slate-400/5 text-slate-400/50',
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500">{t(cfg.label)}</p>
                    <p className="text-sm text-slate-600">{t('common.empty')}</p>
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={item.linkTo + item.title}
                to={item.linkTo}
                className={cn(
                  'group flex items-center rounded-2xl border px-5 py-4 transition-all duration-200 hover:scale-[1.01]',
                  cfg.tone === 'cyan' && 'border-cyan-400/15 bg-cyan-400/[0.03] hover:border-cyan-400/30 hover:bg-cyan-400/[0.06]',
                  cfg.tone === 'emerald' && 'border-emerald-400/15 bg-emerald-400/[0.03] hover:border-emerald-400/30 hover:bg-emerald-400/[0.06]',
                  cfg.tone === 'amber' && 'border-amber-400/15 bg-amber-400/[0.03] hover:border-amber-400/30 hover:bg-amber-400/[0.06]',
                  cfg.tone === 'violet' && 'border-violet-400/15 bg-violet-400/[0.03] hover:border-violet-400/30 hover:bg-violet-400/[0.06]',
                  cfg.tone === 'rose' && 'border-rose-400/15 bg-rose-400/[0.03] hover:border-rose-400/30 hover:bg-rose-400/[0.06]',
                  cfg.tone === 'slate' && 'border-slate-400/15 bg-slate-400/[0.03] hover:border-slate-400/30 hover:bg-slate-400/[0.06]',
                )}
              >
                <div className={cn(
                  'mr-4 flex h-9 w-9 items-center justify-center rounded-xl transition-colors',
                  cfg.tone === 'cyan' && 'bg-cyan-400/10 text-cyan-300 group-hover:bg-cyan-400/20',
                  cfg.tone === 'emerald' && 'bg-emerald-400/10 text-emerald-300 group-hover:bg-emerald-400/20',
                  cfg.tone === 'amber' && 'bg-amber-400/10 text-amber-300 group-hover:bg-amber-400/20',
                  cfg.tone === 'violet' && 'bg-violet-400/10 text-violet-300 group-hover:bg-violet-400/20',
                  cfg.tone === 'rose' && 'bg-rose-400/10 text-rose-300 group-hover:bg-rose-400/20',
                  cfg.tone === 'slate' && 'bg-slate-400/10 text-slate-300 group-hover:bg-slate-400/20',
                )}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t(cfg.label)}</p>
                  <p className="mt-0.5 truncate text-sm font-medium text-white transition-colors group-hover:text-white">
                    {item.title}
                  </p>
                </div>
                <ArrowRight className="ml-3 h-4 w-4 shrink-0 text-slate-600 opacity-0 transition-all group-hover:opacity-100" />
              </Link>
            )
          })}
        </section>

        {/* ─── Hub Explorer — full width ─── */}
        <section className="lg:col-span-12">
          <div className="rounded-[2.5rem] border border-white/[0.06] bg-slate-900/20 p-6 lg:p-8">
            <div className="mb-6 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-slate-500" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">{t('dashboard.hubExplorer')}</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {hubLinks.map((hub) => {
                const HubIcon = hub.icon
                return (
                  <Link
                    key={hub.to}
                    to={hub.to}
                    className={cn(
                      'group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02]',
                      hub.tone === 'cyan' && 'border-cyan-400/15 bg-cyan-400/[0.03] hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] hover:shadow-[0_0_25px_rgba(34,211,238,0.08)]',
                      hub.tone === 'emerald' && 'border-emerald-400/15 bg-emerald-400/[0.03] hover:border-emerald-400/30 hover:bg-emerald-400/[0.06] hover:shadow-[0_0_25px_rgba(52,211,153,0.08)]',
                      hub.tone === 'amber' && 'border-amber-400/15 bg-amber-400/[0.03] hover:border-amber-400/30 hover:bg-amber-400/[0.06] hover:shadow-[0_0_25px_rgba(251,191,36,0.08)]',
                      hub.tone === 'violet' && 'border-violet-400/15 bg-violet-400/[0.03] hover:border-violet-400/30 hover:bg-violet-400/[0.06] hover:shadow-[0_0_25px_rgba(167,139,250,0.08)]',
                      hub.tone === 'slate' && 'border-slate-400/15 bg-slate-400/[0.03] hover:border-slate-400/30 hover:bg-slate-400/[0.06]',
                      hub.highlight && 'ring-1 ring-emerald-400/20',
                    )}
                  >
                    {/* Corner glow */}
                    <div className={cn(
                      'absolute -right-6 -top-6 h-16 w-16 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-40',
                      hub.tone === 'cyan' && 'bg-cyan-400',
                      hub.tone === 'emerald' && 'bg-emerald-400',
                      hub.tone === 'amber' && 'bg-amber-400',
                      hub.tone === 'violet' && 'bg-violet-400',
                      hub.tone === 'slate' && 'bg-slate-400',
                    )} />

                    <div className="relative z-10">
                      <div className={cn(
                        'mb-3 inline-flex rounded-xl p-2.5 transition-colors',
                        hub.tone === 'cyan' && 'bg-cyan-400/10 text-cyan-300 group-hover:bg-cyan-400/20',
                        hub.tone === 'emerald' && 'bg-emerald-400/10 text-emerald-300 group-hover:bg-emerald-400/20',
                        hub.tone === 'amber' && 'bg-amber-400/10 text-amber-300 group-hover:bg-amber-400/20',
                        hub.tone === 'violet' && 'bg-violet-400/10 text-violet-300 group-hover:bg-violet-400/20',
                        hub.tone === 'slate' && 'bg-slate-400/10 text-slate-300 group-hover:bg-slate-400/20',
                      )}>
                        <HubIcon className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-bold text-white transition-colors group-hover:text-white">
                        {t(hub.label)}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
