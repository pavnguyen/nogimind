import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, BadgeInfo, BookOpen, Layers3, Map, ShieldCheck, Sparkles, Target, Compass } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { HubTabBar } from '../components/layout/HubTabBar'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'
import { usePositionsQuery } from '../queries/positionQueries'
import { useConceptsQuery } from '../queries/conceptQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getLocalizedText } from '../utils/localization'

type LearnStep = {
  title: string
  body: string
  to: string
}

type LearnTrack = {
  id: string
  badgeTone: 'emerald' | 'cyan' | 'amber'
  title: string
  description: string
  icon: typeof BadgeInfo
  steps: LearnStep[]
}

const track = (id: string, title: string, description: string, steps: LearnStep[], badgeTone: LearnTrack['badgeTone'], icon: LearnTrack['icon']): LearnTrack => ({
  id,
  title,
  description,
  steps,
  badgeTone,
  icon,
})

export default function LearnPage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)

  // Data queries for inline tabs
  const positionsQuery = usePositionsQuery()
  const positions = useMemo(() => positionsQuery.data ?? [], [positionsQuery.data])
  const conceptsQuery = useConceptsQuery()
  const concepts = useMemo(() => conceptsQuery.data ?? [], [conceptsQuery.data])

  const tracks: LearnTrack[] = [
    track(
      'beginner',
      t('learn.tracks.beginner.title'),
      t('learn.tracks.beginner.description'),
      [
        { title: t('learn.tracks.beginner.steps.0.title'), body: t('learn.tracks.beginner.steps.0.body'), to: '/positions' },
        { title: t('learn.tracks.beginner.steps.1.title'), body: t('learn.tracks.beginner.steps.1.body'), to: '/skills?domain=survival_defense' },
        { title: t('learn.tracks.beginner.steps.2.title'), body: t('learn.tracks.beginner.steps.2.body'), to: '/skills?domain=guard_retention' },
        { title: t('learn.tracks.beginner.steps.5.title'), body: t('learn.tracks.beginner.steps.5.body'), to: '/defense' },
      ],
      'emerald',
      Target,
    ),
    track(
      'deep',
      t('learn.tracks.deep.title'),
      t('learn.tracks.deep.description'),
      [
        { title: t('learn.tracks.deep.steps.0.title'), body: t('learn.tracks.deep.steps.0.body'), to: '/skills' },
        { title: t('learn.tracks.deep.steps.1.title'), body: t('learn.tracks.deep.steps.1.body'), to: '/concepts' },
        { title: t('learn.tracks.deep.steps.3.title'), body: t('learn.tracks.deep.steps.3.body'), to: '/skills' },
      ],
      'cyan',
      Sparkles,
    ),
    track(
      'fix',
      t('learn.tracks.fix.title'),
      t('learn.tracks.fix.description'),
      [
        { title: t('learn.tracks.fix.steps.1.title'), body: t('learn.tracks.fix.steps.1.body'), to: '/troubleshooters' },
        { title: t('learn.tracks.fix.steps.2.title'), body: t('learn.tracks.fix.steps.2.body'), to: '/study' },
      ],
      'amber',
      ShieldCheck,
    ),
    track(
      'build',
      t('learn.tracks.build.title'),
      t('learn.tracks.build.description'),
      [
        { title: t('learn.tracks.build.steps.1.title'), body: t('learn.tracks.build.steps.1.body'), to: '/archetypes' },
        { title: t('learn.tracks.build.steps.2.title'), body: t('learn.tracks.build.steps.2.body'), to: '/skills' },
        { title: t('learn.tracks.build.steps.5.title'), body: t('learn.tracks.build.steps.5.body'), to: '/concepts' },
      ],
      'emerald',
      Layers3,
    ),
  ]

  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'path'

  const renderTabContent = () => {
    switch (activeTab) {
      case 'path':
        return (
          <div className="grid gap-4 xl:grid-cols-2">
            {tracks.map((item) => (
              <SectionCard key={item.id} className="h-full" title={item.title} description={item.description}>
                <div className="space-y-4">
                  <Badge tone={item.badgeTone}>
                    {item.id === 'beginner' ? t('learn.badges.startHere') : item.id === 'fix' ? t('learn.badges.mostPractical') : item.id === 'build' ? t('learn.badges.advanced') : t('learn.badges.deepTechnique')}
                  </Badge>
                  <item.icon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                  <div className="grid gap-3">
                    {item.steps.map((step, index) => (
                      <Link key={step.to + step.title} to={step.to} id={index === 0 ? item.id : undefined} className="rounded-lg border border-white/10 bg-slate-900/65 p-4 transition hover:border-cyan-300/35 hover:bg-white/[0.06]">
                        <div className="flex items-start gap-3">
                          <Badge tone="cyan">{index + 1}</Badge>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white">{step.title}</p>
                            <p className="mt-2 text-sm leading-6 text-slate-400">{step.body}</p>
                          </div>
                          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </SectionCard>
            ))}
          </div>
        )

      case 'positions':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{t('positions.whatFor')}</p>
              <Link
                to="/positions"
                className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {t('common.open')} →
              </Link>
            </div>
            {positions.length === 0 ? (
              <EmptyState title={t('positions.empty')} />
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {positions.slice(0, 12).map((position) => (
                  <Link
                    key={position.id}
                    to={`/positions/${position.id}`}
                    className="group rounded-xl border border-white/[0.06] bg-slate-900/40 p-4 transition-all hover:border-cyan-400/20 hover:bg-slate-900/70"
                  >
                    <Badge tone="cyan" className="text-[10px]">{t(`positionCategories.${position.category}`)}</Badge>
                    <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {getLocalizedText(position.title, lang)}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
                      {getLocalizedText(position.description, lang)}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )

      case 'concepts':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{t('concepts.whatFor')}</p>
              <Link
                to="/concepts"
                className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {t('common.open')} →
              </Link>
            </div>
            {concepts.length === 0 ? (
              <EmptyState title={t('concepts.empty')} />
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {concepts.slice(0, 12).map((concept) => (
                  <Link
                    key={concept.id}
                    to={`/concepts/${concept.id}`}
                    className="group rounded-xl border border-white/[0.06] bg-slate-900/40 p-4 transition-all hover:border-cyan-400/20 hover:bg-slate-900/70"
                  >
                    <div className="flex flex-wrap gap-1.5">
                      <Badge tone="cyan" className="text-[10px]">{t(`conceptCategories.${concept.category}`)}</Badge>
                      <Badge tone="emerald" className="text-[10px]">{t(`conceptLevels.${concept.level}`)}</Badge>
                    </div>
                    <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {getLocalizedText(concept.title, lang)}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
                      {getLocalizedText(concept.shortDefinition, lang)}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <PageShell
      header={
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-slate-900/30 p-8 hero-blob-learn">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/5 blur-[80px]" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-400 shadow-lg shadow-cyan-500/20">
                <Compass className="h-7 w-7 text-slate-950" aria-hidden="true" />
              </div>
              <div>
                <Badge tone="cyan" className="text-[10px] uppercase tracking-widest">{t('nav.learn')}</Badge>
                <h1 className="mt-1 display-heading text-3xl font-extrabold text-white lg:text-4xl">{t('learn.heading')}</h1>
                <p className="mt-1 text-sm text-slate-400">{t('learn.subtitle')}</p>
              </div>
            </div>
            <Link
              to="/skills"
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2.5 text-sm font-medium text-cyan-200 transition-all hover:border-cyan-400/30 hover:bg-cyan-400/20"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
              {t('learn.primaryAction')}
            </Link>
          </div>
        </div>
      }
    >
      <HubTabBar
        tabs={[
          { id: 'path', labelKey: 'nav.learningPath', icon: Compass },
          { id: 'positions', labelKey: 'nav.positions', icon: Map },
          { id: 'concepts', labelKey: 'nav.concepts', icon: BookOpen },
        ]}
        accent="cyan"
        className="mb-6"
      />

      <div className="animate-slideUp" key={activeTab}>
        {renderTabContent()}
      </div>
    </PageShell>
  )
}
