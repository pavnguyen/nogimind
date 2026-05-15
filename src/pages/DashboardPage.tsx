import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, Compass, Layers3, ArrowRight, TrendingUp, BookOpen, Shield, Clock, Sparkles, Zap, Target } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { SectionCard } from '../components/common/SectionCard'
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
        <section className="space-y-3">
          {/* Greeting */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-lg">
              <Sparkles className="h-5 w-5 text-slate-950" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                {t('app.name')}
              </h1>
              <p className="text-sm text-slate-400">{t('app.thesis')}</p>
            </div>
          </div>

          {/* Quick Action Bar */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.to}
                  to={action.to}
                  className={cn(
                    'group flex items-center gap-3 rounded-xl border bg-gradient-to-br p-4 transition-all duration-200',
                    action.color,
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:scale-110" aria-hidden="true" />
                  <span className="text-sm font-medium text-slate-200 group-hover:text-white">{t(action.label)}</span>
                </Link>
              )
            })}
          </div>
        </section>
      }
    >
      {/* Stats Strip */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'dashboard.totalSkills', value: totalSkills, icon: Layers3, color: 'text-emerald-300' },
          { label: 'Safety Critical', value: safetyCritical, icon: Shield, color: 'text-amber-300' },
        ].map((stat) => {
          const StatIcon = stat.icon
          return (
            <div key={stat.label} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-slate-900/50 p-4">
              <StatIcon className={cn('h-5 w-5 shrink-0', stat.color)} aria-hidden="true" />
              <div>
                <p className="text-lg font-semibold text-white">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label === 'dashboard.totalSkills' ? t(stat.label) : stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Workflow Steps */}
      <SectionCard
        title={t('dashboard.workflow.title')}
        description={t('dashboard.workflow.subtitle')}
      >
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
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
                className="group flex items-start gap-3 rounded-xl border border-white/[0.06] bg-slate-900/40 p-4 transition-all hover:border-emerald-400/20 hover:bg-slate-900/80"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-400/15 text-xs font-bold text-emerald-300">
                  {index + 1}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white group-hover:text-emerald-100">{t(item.title)}</p>
                  <p className="mt-0.5 text-xs leading-5 text-slate-500">{t(item.body)}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </SectionCard>

      {/* Daily Inspiration */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Today's Focus */}
        <div className="space-y-3 rounded-xl border border-white/[0.06] bg-slate-900/40 p-5">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-cyan-400" aria-hidden="true" />
            <h2 className="text-sm font-semibold text-white">{t('dashboard.todayFocus')}</h2>
          </div>
          {microDetail && (
            <Link to={`/skills/${microDetail.skillId}`} className="block rounded-lg bg-white/[0.03] p-3 transition-all hover:bg-white/[0.06]">
              <Badge tone="cyan">{t('dashboard.microDetailOfDay')}</Badge>
              <p className="mt-2 text-sm font-medium text-white">{getLocalizedText(microDetail.title, lang)}</p>
              <p className="mt-1 text-xs text-slate-400 line-clamp-2">{getLocalizedText(microDetail.correctionCue, lang)}</p>
            </Link>
          )}
          {concept && (
            <Link to={`/concepts/${concept.id}`} className="block rounded-lg bg-white/[0.03] p-3 transition-all hover:bg-white/[0.06]">
              <Badge tone="emerald">{t('dashboard.conceptOfDay')}</Badge>
              <p className="mt-2 text-sm font-medium text-white">{getLocalizedText(concept.title, lang)}</p>
              <p className="mt-1 text-xs text-slate-400 line-clamp-2">{getLocalizedText(concept.shortDefinition, lang)}</p>
            </Link>
          )}
        </div>

        {/* Quick Links */}
        <div className="space-y-3 rounded-xl border border-white/[0.06] bg-slate-900/40 p-5">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-400" aria-hidden="true" />
            <h2 className="text-sm font-semibold text-white">{t('dashboard.debugShortcuts')}</h2>
          </div>
          <div className="space-y-1">
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
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 transition-all hover:bg-white/[0.04] hover:text-slate-200"
                >
                  <ShortcutIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{shortcut.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Getting Started */}
        <div className="space-y-3 rounded-xl border border-white/[0.06] bg-slate-900/40 p-5 sm:col-span-2 xl:col-span-1">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-emerald-400" aria-hidden="true" />
            <h2 className="text-sm font-semibold text-white">{t('common.quickLinks')}</h2>
          </div>
          <div className="space-y-1">
            {[
              { to: '/learn', label: t('nav.learn') },
              { to: '/mastery', label: t('nav.mastery') },
              { to: '/game-tree', label: t('nav.gameTree') },
              { to: '/about', label: t('nav.philosophy') },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 transition-all hover:bg-white/[0.04] hover:text-slate-200"
              >
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-600" aria-hidden="true" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Position of the Day */}
      {position && (
        <Link
          to={`/positions/${position.id}`}
          className="group block rounded-xl border border-white/[0.06] bg-gradient-to-r from-slate-900/50 to-slate-900/20 p-5 transition-all hover:border-cyan-400/20"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-cyan-400" aria-hidden="true" />
            <Badge tone="cyan">{t('dashboard.positionOfDay')}</Badge>
          </div>
          <p className="mt-3 text-lg font-semibold text-white group-hover:text-cyan-100">{getLocalizedText(position.title, lang)}</p>
          <p className="mt-1 text-sm text-slate-400">{getLocalizedText(position.description, lang)}</p>
        </Link>
      )}
    </PageShell>
  )
}
