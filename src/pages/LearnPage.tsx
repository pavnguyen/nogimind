import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Layers3, ShieldCheck, Sparkles, Target, Compass } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '../components/common/StaggerContainer'
import { Badge, type BadgeTone } from '../components/common/Badge'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'

type LearnStep = {
  title: string
  body: string
  to: string
}

type LearnTrack = {
  id: string
  badgeTone: BadgeTone
  title: string
  description: string
  icon: typeof Target
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

/** Tabs that moved out of /learn to their own pages. */
const RETIRED_TABS: Record<string, string> = {
  positions: '/positions',
  concepts: '/concepts',
}

export default function LearnPage() {
  const { t } = useTranslation()

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
      'jade',
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
      'gold',
      Sparkles,
    ),
    track(
      'defense',
      t('learn.tracks.defense.title'),
      t('learn.tracks.defense.description'),
      [
        { title: t('learn.tracks.defense.steps.1.title'), body: t('learn.tracks.defense.steps.1.body'), to: '/defense' },
        { title: t('learn.tracks.defense.steps.2.title'), body: t('learn.tracks.defense.steps.2.body'), to: '/study' },
      ],
      'copper',
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
      'steel',
      Layers3,
    ),
  ]

  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get('tab')
  if (activeTab && RETIRED_TABS[activeTab]) {
    return <Navigate to={RETIRED_TABS[activeTab]} replace />
  }

  return (
    <PageShell
      header={
        <div className="relative overflow-hidden rounded-3xl border border-warm-50/[0.06] bg-warm-900/30 p-5 sm:p-6 hallmark-hero">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full hallmark-blur-blob blur-[80px]" />
          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl hallmark-icon-box sm:h-12 sm:w-12">
                <Compass className="h-6 w-6 text-on-accent sm:h-7 sm:w-7" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <Badge className="hallmark-badge text-[10px] uppercase tracking-widest">{t('nav.learn')}</Badge>
                <h1 className="mt-1 display-heading text-2xl font-extrabold text-warm-50 sm:text-3xl">{t('learn.heading')}</h1>
                <p className="mt-1 text-sm text-warm-400">{t('learn.subtitle')}</p>
              </div>
            </div>
            <Link
              to="/skills"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl hallmark-btn-ghost border border-hallmark-accent-dim bg-hallmark-accent-dim px-4 py-2.5 text-sm font-medium text-hallmark-text-accent sm:self-center"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
              {t('learn.primaryAction')}
            </Link>
          </div>
        </div>
      }
    >
      <StaggerContainer className="grid gap-4 lg:grid-cols-2">
        {tracks.map((item) => (
          <StaggerItem key={item.id}>
            <SectionCard
              key={item.id}
              className="h-full"
              title={
                <span className="flex items-center gap-2">
                  <item.icon className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  {item.title}
                </span>
              }
              description={item.description}
              action={
                <Badge tone={item.badgeTone}>
                  {item.id === 'beginner' ? t('learn.badges.startHere') : item.id === 'fix' ? t('learn.badges.mostPractical') : item.id === 'build' ? t('learn.badges.advanced') : t('learn.badges.deepTechnique')}
                </Badge>
              }
            >
              <ol className="grid gap-2">
                {item.steps.map((step, index) => (
                  <li key={step.to + step.title}>
                    <Link
                      to={step.to}
                      id={index === 0 ? item.id : undefined}
                      className="flex items-start gap-3 rounded-lg border border-warm-50/10 bg-warm-900/65 px-3.5 py-3 transition hover:border-gold-300/35 hover:bg-warm-50/[0.06]"
                    >
                      <Badge tone="gold" className="mt-0.5 shrink-0">{index + 1}</Badge>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-warm-50">{step.title}</span>
                        <span className="mt-1 block text-[13px] leading-5 text-warm-400 line-clamp-2">{step.body}</span>
                      </span>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ol>
            </SectionCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </PageShell>
  )
}
