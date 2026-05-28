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
  Shield,
  Lightbulb,
  Target,
  Zap,
  Sun,
  BugPlay,
  MapIcon,
  Brain,
} from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { PageShell } from '../components/common/PageShell'
import { useConceptsQuery } from '../queries/conceptQueries'
import { usePositionsQuery } from '../queries/positionQueries'
import { useManifestQuery } from '../queries/contentQueries'
import type { ManifestEntry } from '../content-runtime/manifests'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getLocalizedText } from '../utils/localization'
import { getBuildDate } from '../utils/version'
import { trainingMethods } from '../data/trainingMethods'
import { defensiveLayers } from '../data/defensiveLayers'
import { sharedKnowledgeItems } from '../data/sharedKnowledge'
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
const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

/** 7-day rotation configuration — what gets featured each day */
const rotationConfig = [
  { key: 'concept', label: 'dashboard.rotation.concept', tone: 'emerald' as const, icon: Lightbulb },
  { key: 'position', label: 'dashboard.rotation.position', tone: 'cyan' as const, icon: Compass },
  { key: 'skill', label: 'dashboard.rotation.skill', tone: 'sky' as const, icon: BookOpen },
  { key: 'safety', label: 'dashboard.rotation.safety', tone: 'rose' as const, icon: Shield },
  { key: 'training-tip', label: 'dashboard.rotation.trainingTip', tone: 'violet' as const, icon: Target },
  { key: 'principle', label: 'dashboard.rotation.principle', tone: 'slate' as const, icon: Brain },
]
const todayConfig = rotationConfig[dayOfWeek % rotationConfig.length]
  const tomorrowConfig = rotationConfig[(dayOfWeek + 1) % rotationConfig.length]
  const nextConfig = rotationConfig[(dayOfWeek + 2) % rotationConfig.length]

/** Per-rotation-type gradient and background styles for the large card */
const cardGradients: Record<string, string> = {
  concept: 'from-emerald-500/10 via-teal-500/5 to-slate-900 border-emerald-400/20',
  position: 'from-amber-500/10 via-orange-500/5 to-slate-900 border-amber-400/20',
  safety: 'from-rose-500/10 via-pink-500/5 to-slate-900 border-rose-400/20',
  'training-tip': 'from-violet-500/10 via-purple-500/5 to-slate-900 border-violet-400/20',
  skill: 'from-sky-500/10 via-blue-500/5 to-slate-900 border-sky-400/20',
  principle: 'from-slate-500/10 via-slate-600/5 to-slate-900 border-slate-400/20',
}

const hubLinks = [
  { to: '/learn', icon: Compass, label: 'nav.learn', tone: 'cyan' as const },
  { to: '/study', icon: Zap, label: 'nav.study', tone: 'emerald' as const, highlight: true },
  { to: '/troubleshooters', icon: Wrench, label: 'nav.fix', tone: 'amber' as const },
  { to: '/build', icon: Layers3, label: 'nav.build', tone: 'violet' as const },
  { to: '/reference', icon: BookOpen, label: 'nav.reference', tone: 'slate' as const },
]

export default function DashboardPage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)

  // ── Generated content pipeline (Phase 2) ──────────────────────────────
  const manifestQuery = useManifestQuery(lang)
  const manifest: ManifestEntry[] = useMemo(() => manifestQuery.data ?? [], [manifestQuery.data])

  // Stats from manifest
  const pipelineSkillCount = manifest.length
  const pipelineSafetyCount = manifest.filter((s) =>
    s.tags?.some((tag) => tag.includes('safety') || tag.includes('neck') || tag.includes('spine')),
  ).length
  // ── Legacy data (for daily rotation items that need full skill data) ───
  const conceptsQuery = useConceptsQuery()
  const concepts = useMemo(() => conceptsQuery.data ?? [], [conceptsQuery.data])
  const positionsQuery = usePositionsQuery()
  const positions = useMemo(() => positionsQuery.data ?? [], [positionsQuery.data])
  // Daily picks for the 6-item rotation
  const concept = useMemo(() => pickDailyItem(concepts, 'concept'), [concepts])
  const position = useMemo(() => pickDailyItem(positions, 'position'), [positions])
  const trainingTip = useMemo(() => pickDailyItem(trainingMethods, 'training-tip'), [])
  const safetyLayer = useMemo(() => pickDailyItem(defensiveLayers, 'safety'), [])
  const skillOfDay = useMemo(() => manifest.length > 0 ? pickDailyItem(manifest, 'skill') : undefined, [manifest])
  const knowledgePrinciple = useMemo(() => pickDailyItem(sharedKnowledgeItems, 'principle'), [])

  // Map rotation type to the data we want to render
  const renderTodayItem = () => {
    switch (todayConfig.key) {
      case 'concept': {
        return concept
          ? { title: getLocalizedText(concept.title, lang), description: getLocalizedText(concept.shortDefinition, lang), linkTo: `/concepts/${concept.id}` }
          : undefined
      }
      case 'position':
        return position
          ? { title: getLocalizedText(position.title, lang), description: getLocalizedText(position.description, lang), linkTo: `/positions/${position.id}` }
          : undefined
      case 'skill':
        return skillOfDay
          ? { title: skillOfDay.name, description: skillOfDay.summary, linkTo: `/skills/${skillOfDay.id}` }
          : undefined
      case 'training-tip':
        return trainingTip
          ? { title: getLocalizedText(trainingTip.title, lang), description: getLocalizedText(trainingTip.shortDescription, lang), linkTo: '/learn' }
          : undefined
      case 'safety':
        return safetyLayer
          ? { title: getLocalizedText(safetyLayer.title, lang), description: getLocalizedText(safetyLayer.threat, lang), linkTo: '/defense' }
          : undefined
      case 'principle':
        return knowledgePrinciple
          ? { title: getLocalizedText(knowledgePrinciple.title, lang), description: getLocalizedText(knowledgePrinciple.shortText, lang), linkTo: '/learn' }
          : undefined
      default:
        return undefined
    }
  }

  const renderSecondaryItem = (config: typeof tomorrowConfig): { title: string; description?: string; linkTo: string } | undefined => {
    switch (config.key) {
      case 'concept': {
        const item = pickDailyItem(concepts, 'concept-secondary')
        return item ? { title: getLocalizedText(item.title, lang), linkTo: `/concepts/${item.id}` } : undefined
      }
      case 'position': {
        const item = pickDailyItem(positions, 'position-secondary')
        return item ? { title: getLocalizedText(item.title, lang), linkTo: `/positions/${item.id}` } : undefined
      }
      case 'skill': {
        const item = pickDailyItem(manifest, 'skill-secondary')
        return item ? { title: item.name, linkTo: `/skills/${item.id}` } : undefined
      }
      case 'training-tip': {
        const item = pickDailyItem(trainingMethods, 'training-tip-secondary')
        return item ? { title: getLocalizedText(item.title, lang), linkTo: '/learn' } : undefined
      }
      case 'safety': {
        const item = pickDailyItem(defensiveLayers, 'safety-secondary')
        return item ? { title: getLocalizedText(item.title, lang), linkTo: '/defense' } : undefined
      }
      case 'principle': {
        const item = pickDailyItem(sharedKnowledgeItems, 'principle-secondary')
        return item ? { title: getLocalizedText(item.title, lang), linkTo: '/learn' } : undefined
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
          {/* ── Simplified hero ── */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/80 via-cyan-400/80 to-teal-400/80 shadow-lg">
              <Sparkles className="h-5 w-5 text-slate-950" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
                {t('app.name')}
              </h1>
              <p className="mt-px text-xs text-slate-500 truncate">{t('app.thesis')}</p>
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
                todayConfig.key === 'concept' && 'bg-emerald-400',
                todayConfig.key === 'position' && 'bg-amber-400',
                todayConfig.key === 'skill' && 'bg-sky-400',
                todayConfig.key === 'training-tip' && 'bg-violet-400',
                todayConfig.key === 'safety' && 'bg-rose-400',
                todayConfig.key === 'principle' && 'bg-slate-400',
              )} />

              <div className="relative z-10">
                {/* Day badge */}
                <div className="mb-6 flex items-center gap-3">
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110',
                    todayConfig.tone === 'cyan' && 'bg-cyan-400/10 text-cyan-400',
                    todayConfig.tone === 'emerald' && 'bg-emerald-400/10 text-emerald-400',
                    todayConfig.tone === 'cyan' && 'bg-cyan-400/10 text-cyan-400',
                    todayConfig.tone === 'sky' && 'bg-sky-400/10 text-sky-400',
                    todayConfig.tone === 'violet' && 'bg-violet-400/10 text-violet-400',
                    todayConfig.tone === 'rose' && 'bg-rose-400/10 text-rose-400',
                    todayConfig.tone === 'slate' && 'bg-slate-400/10 text-slate-400',
                  )}>
                    <TodayIcon className="h-5 w-5 icon-hover-spin" />
                  </div>
                  <div>
                    <Badge tone={todayConfig.tone === 'sky' ? 'cyan' : todayConfig.tone} className="px-2 py-0.5 text-[10px] uppercase tracking-widest">
                      {t('days.' + dayKeys[dayOfWeek])} · {t(todayConfig.label)}
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
                <Zap className="mx-auto h-8 w-8 text-slate-600" />
                <p className="mt-3 text-sm text-slate-500">{t('common.empty')}</p>
              </div>
            </div>
          )}
        </section>

        {/* ─── Also Today — 2 richer cards + Principle mini-card, 5 cols ─── */}
        <section className="flex flex-col gap-3 lg:col-span-5">
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
                    cfg.tone === 'cyan' && 'bg-cyan-400/5 text-cyan-400/50',
                    cfg.tone === 'sky' && 'bg-sky-400/5 text-sky-400/50',
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
                  'group relative flex flex-col rounded-2xl border px-5 py-4 transition-all duration-200 hover:scale-[1.01]',
                  cfg.tone === 'cyan' && 'border-cyan-400/15 bg-cyan-400/[0.03] hover:border-cyan-400/30 hover:bg-cyan-400/[0.06]',
                  cfg.tone === 'emerald' && 'border-emerald-400/15 bg-emerald-400/[0.03] hover:border-emerald-400/30 hover:bg-emerald-400/[0.06]',
                  cfg.tone === 'cyan' && 'border-cyan-400/15 bg-cyan-400/[0.03] hover:border-cyan-400/30 hover:bg-cyan-400/[0.06]',
                  cfg.tone === 'sky' && 'border-sky-400/15 bg-sky-400/[0.03] hover:border-sky-400/30 hover:bg-sky-400/[0.06]',
                  cfg.tone === 'violet' && 'border-violet-400/15 bg-violet-400/[0.03] hover:border-violet-400/30 hover:bg-violet-400/[0.06]',
                  cfg.tone === 'rose' && 'border-rose-400/15 bg-rose-400/[0.03] hover:border-rose-400/30 hover:bg-rose-400/[0.06]',
                  cfg.tone === 'slate' && 'border-slate-400/15 bg-slate-400/[0.03] hover:border-slate-400/30 hover:bg-slate-400/[0.06]',
                )}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-xl transition-colors shrink-0',
                    cfg.tone === 'cyan' && 'bg-cyan-400/10 text-cyan-300 group-hover:bg-cyan-400/20',
                    cfg.tone === 'emerald' && 'bg-emerald-400/10 text-emerald-300 group-hover:bg-emerald-400/20',
                    cfg.tone === 'cyan' && 'bg-cyan-400/10 text-cyan-300 group-hover:bg-cyan-400/20',
                    cfg.tone === 'sky' && 'bg-sky-400/10 text-sky-300 group-hover:bg-sky-400/20',
                    cfg.tone === 'violet' && 'bg-violet-400/10 text-violet-300 group-hover:bg-violet-400/20',
                    cfg.tone === 'rose' && 'bg-rose-400/10 text-rose-300 group-hover:bg-rose-400/20',
                    cfg.tone === 'slate' && 'bg-slate-400/10 text-slate-300 group-hover:bg-slate-400/20',
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t(cfg.label)}</p>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-600 opacity-0 transition-all group-hover:opacity-100" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-white transition-colors group-hover:text-white">
                    {item.title}
                  </p>
                  {'description' in item && item.description && (
                    <p className="mt-1 text-xs leading-relaxed text-slate-400 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}

          {/* ── Principle of the Day mini-card ── */}
          {knowledgePrinciple && (
            <div className="mt-1 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <div className="flex items-start gap-3">
                <Brain className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {t('dashboard.rotation.principle')}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-slate-300 line-clamp-2">
                    {getLocalizedText(knowledgePrinciple.shortText, lang)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ─── Compact Stats Strip — single horizontal bar ─── */}
        <section className="lg:col-span-12">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 rounded-xl border border-white/[0.06] bg-slate-900/40 px-5 py-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">{t('dashboard.totalSkills')}</p>
              <p className="mt-0.5 text-base font-bold text-emerald-400">{pipelineSkillCount}</p>
            </div>
            <div className="h-6 w-px bg-white/[0.06]" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">{t('dashboard.safetyCritical')}</p>
              <p className="mt-0.5 text-base font-bold text-rose-400">{pipelineSafetyCount}</p>
            </div>
            <div className="h-6 w-px bg-white/[0.06]" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">{t('dashboard.lastUpdate')}</p>
              <p className="mt-0.5 text-base font-semibold text-slate-300">{getBuildDate()}</p>
            </div>
          </div>
        </section>

        {/* ─── What's New — compact update strip ─── */}
        <section className="lg:col-span-12">
          <div className="rounded-xl border border-sky-400/15 bg-gradient-to-r from-sky-400/[0.03] to-slate-900/20 px-5 py-4">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-sky-400">{t('dashboard.newUpdates.heading')}</h2>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              <li className="flex items-center gap-1.5 text-xs text-slate-300">
                <span className="h-1 w-1 rounded-full bg-sky-400/60 shrink-0" />
                {t('dashboard.newUpdates.item1')}
              </li>
              <li className="flex items-center gap-1.5 text-xs text-slate-300">
                <span className="h-1 w-1 rounded-full bg-sky-400/60 shrink-0" />
                {t('dashboard.newUpdates.item2')}
              </li>
              <li className="flex items-center gap-1.5 text-xs text-slate-300">
                <span className="h-1 w-1 rounded-full bg-sky-400/60 shrink-0" />
                {t('dashboard.newUpdates.item3')}
              </li>
            </ul>
          </div>
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
                        <HubIcon className="h-5 w-5 icon-hover-spin" />
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

        {/* ─── Fix a problem — full width ─── */}
        <section className="lg:col-span-12">
          <div className="rounded-[2.5rem] border border-amber-400/10 bg-gradient-to-br from-amber-400/[0.03] to-slate-900/20 p-6 lg:p-8">
            <div className="mb-6 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-amber-400/70" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400/70">{t('modeUx.fix.heading')}</h2>
            </div>
            <p className="mb-6 max-w-2xl text-sm leading-relaxed text-slate-500">{t('modeUx.fix.subtitle')}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { key: 'troubleshooters', to: '/troubleshooters', icon: BugPlay },
                { key: 'escapeMaps', to: '/escape-maps', icon: MapIcon },
                { key: 'defense', to: '/defense', icon: Shield },
              ].map((item) => {
                const ItemIcon = item.icon
                return (
                  <Link
                    key={item.key}
                    to={item.to}
                    className="group relative overflow-hidden rounded-xl border border-amber-400/10 bg-slate-950/40 p-5 transition-all duration-200 hover:border-amber-400/30 hover:bg-amber-400/[0.05] hover:shadow-[0_0_25px_rgba(251,191,36,0.06)]"
                  >
                    <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-amber-400/5 blur-2xl transition-all duration-300 group-hover:bg-amber-400/10" />
                    <div className="relative z-10 flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300 transition-colors group-hover:bg-amber-400/20">
                          <ItemIcon className="h-4 w-4" aria-hidden="true" />
                        </div>
                        <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-amber-100">
                          {t(`modeUx.reference.items.${item.key}.title`)}
                        </h3>
                        <p className="mt-1.5 text-xs leading-5 text-slate-400 line-clamp-2">
                          {t(`modeUx.reference.items.${item.key}.body`)}
                        </p>
                      </div>
                      <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-amber-400/40 transition-all group-hover:translate-x-0.5 group-hover:text-amber-300" aria-hidden="true" />
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
