import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, BadgeInfo, Layers3, ShieldCheck, Sparkles, Target, Compass } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'

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

  const tracks: LearnTrack[] = [
    track(
      'beginner',
      t('learn.tracks.beginner.title'),
      t('learn.tracks.beginner.description'),
      [
        { title: t('learn.tracks.beginner.steps.0.title'), body: t('learn.tracks.beginner.steps.0.body'), to: '/positions' },
        { title: t('learn.tracks.beginner.steps.1.title'), body: t('learn.tracks.beginner.steps.1.body'), to: '/skills?domain=survival_defense' },
        { title: t('learn.tracks.beginner.steps.2.title'), body: t('learn.tracks.beginner.steps.2.body'), to: '/skills?domain=guard_retention' },
        { title: t('learn.tracks.beginner.steps.3.title'), body: t('learn.tracks.beginner.steps.3.body'), to: '/skills?domain=passing' },
        { title: t('learn.tracks.beginner.steps.4.title'), body: t('learn.tracks.beginner.steps.4.body'), to: '/skills?tag=back_control' },
        { title: t('learn.tracks.beginner.steps.5.title'), body: t('learn.tracks.beginner.steps.5.body'), to: '/defense?category=leg_lock' },
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
        { title: t('learn.tracks.deep.steps.2.title'), body: t('learn.tracks.deep.steps.2.body'), to: '/skills' },
        { title: t('learn.tracks.deep.steps.3.title'), body: t('learn.tracks.deep.steps.3.body'), to: '/chains' },
        { title: t('learn.tracks.deep.steps.4.title'), body: t('learn.tracks.deep.steps.4.body'), to: '/escape-maps' },
        { title: t('learn.tracks.deep.steps.5.title'), body: t('learn.tracks.deep.steps.5.body'), to: '/troubleshooters' },
      ],
      'cyan',
      Sparkles,
    ),
    track(
      'fix',
      t('learn.tracks.fix.title'),
      t('learn.tracks.fix.description'),
      [
        { title: t('learn.tracks.fix.steps.0.title'), body: t('learn.tracks.fix.steps.0.body'), to: '/search' },
        { title: t('learn.tracks.fix.steps.1.title'), body: t('learn.tracks.fix.steps.1.body'), to: '/troubleshooters' },
        { title: t('learn.tracks.fix.steps.2.title'), body: t('learn.tracks.fix.steps.2.body'), to: '/skills' },
        { title: t('learn.tracks.fix.steps.3.title'), body: t('learn.tracks.fix.steps.3.body'), to: '/escape-maps' },
        { title: t('learn.tracks.fix.steps.4.title'), body: t('learn.tracks.fix.steps.4.body'), to: '/chains' },
        { title: t('learn.tracks.fix.steps.5.title'), body: t('learn.tracks.fix.steps.5.body'), to: '/skills' },
      ],
      'amber',
      ShieldCheck,
    ),
    track(
      'build',
      t('learn.tracks.build.title'),
      t('learn.tracks.build.description'),
      [
        { title: t('learn.tracks.build.steps.0.title'), body: t('learn.tracks.build.steps.0.body'), to: '/mastery' },
        { title: t('learn.tracks.build.steps.1.title'), body: t('learn.tracks.build.steps.1.body'), to: '/archetypes' },
        { title: t('learn.tracks.build.steps.2.title'), body: t('learn.tracks.build.steps.2.body'), to: '/skills' },
        { title: t('learn.tracks.build.steps.3.title'), body: t('learn.tracks.build.steps.3.body'), to: '/chains' },
        { title: t('learn.tracks.build.steps.4.title'), body: t('learn.tracks.build.steps.4.body'), to: '/concepts' },
      ],
      'emerald',
      Layers3,
    ),
  ]

  return (
    <PageShell
      header={
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-lg">
              <Compass className="h-5 w-5 text-slate-950" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">{t('learn.heading')}</h1>
              <p className="text-sm text-slate-400">{t('learn.subtitle')}</p>
            </div>
          </div>
          <Link
            to="/skills"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2.5 text-sm font-medium text-emerald-100 transition-all hover:bg-emerald-400/20"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            {t('learn.primaryAction')}
          </Link>
        </div>
      }
    >
      <div className="grid gap-4 xl:grid-cols-2">
        {tracks.map((item) => (
          <SectionCard key={item.id} className="h-full" title={item.title} description={item.description}>
            <div className="space-y-4">
              <Badge tone={item.badgeTone}>{item.id === 'beginner' ? t('learn.badges.startHere') : item.id === 'fix' ? t('learn.badges.mostPractical') : item.id === 'build' ? t('learn.badges.advanced') : t('learn.badges.deepTechnique')}</Badge>
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
    </PageShell>
  )
}
