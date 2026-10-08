import { useTranslation } from 'react-i18next'
import { BrainCircuit, Compass, Heart, ShieldCheck } from 'lucide-react'
import { FacebookIcon, InstagramIcon } from '../components/common/BrandIcons'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'
import { StaggerContainer, StaggerItem } from '../components/common/StaggerContainer'
import { cn } from '../utils/cn'

type PillarTone = 'cyan' | 'emerald' | 'amber'

const pillarTones: Record<PillarTone, { card: string; icon: string; glow: string; label: string }> = {
  cyan: {
    card: 'border-cyan-400/15 hover:border-cyan-400/30',
    icon: 'bg-cyan-400/10 text-cyan-300',
    glow: 'bg-cyan-400/[0.07]',
    label: 'text-cyan-300/80',
  },
  emerald: {
    card: 'border-emerald-400/15 hover:border-emerald-400/30',
    icon: 'bg-emerald-400/10 text-emerald-300',
    glow: 'bg-emerald-400/[0.07]',
    label: 'text-emerald-300/80',
  },
  amber: {
    card: 'border-amber-400/15 hover:border-amber-400/30',
    icon: 'bg-amber-400/10 text-amber-300',
    glow: 'bg-amber-400/[0.07]',
    label: 'text-amber-300/80',
  },
}

export default function AboutPage() {
  const { t } = useTranslation()

  const pillars: Array<{ key: string; titleKey: string; bodyKey: string; icon: typeof Compass; tone: PillarTone }> = [
    { key: 'philosophy', titleKey: 'about.philosophyTitle', bodyKey: 'about.philosophy', icon: Compass, tone: 'cyan' },
    { key: 'system', titleKey: 'about.systemTitle', bodyKey: 'about.system', icon: BrainCircuit, tone: 'emerald' },
    { key: 'safety', titleKey: 'about.safetyTitle', bodyKey: 'about.safety', icon: ShieldCheck, tone: 'amber' },
  ]

  return (
    <PageShell
      header={
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-slate-900/30 p-6 lg:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-400/5 blur-[80px]" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-400 to-cyan-400 text-slate-950 shadow-lg shadow-emerald-500/20">
              <BrainCircuit className="h-7 w-7" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h1 className="display-heading text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
                {t('about.heading')}
              </h1>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-400 lg:text-base">{t('app.thesis')}</p>
            </div>
          </div>
        </div>
      }
    >
      {/* ── Core principles ── */}
      <StaggerContainer className="grid gap-4 lg:grid-cols-3">
        {pillars.map((pillar) => {
          const Icon = pillar.icon
          const tone = pillarTones[pillar.tone]
          return (
            <StaggerItem key={pillar.key}>
              <div
                className={cn(
                  'group relative h-full overflow-hidden rounded-2xl border bg-slate-900/40 p-5 transition-all duration-300',
                  tone.card,
                )}
              >
                <div className={cn('pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full blur-2xl', tone.glow)} />
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', tone.icon)}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <h2 className={cn('text-[11px] font-bold uppercase tracking-widest', tone.label)}>
                      {t(pillar.titleKey)}
                    </h2>
                  </div>
                  <p className="text-sm leading-7 text-slate-300">{t(pillar.bodyKey)}</p>
                </div>
              </div>
            </StaggerItem>
          )
        })}
      </StaggerContainer>

      {/* ── With gratitude ── */}
      <SectionCard className="p-0">
        <div className="relative overflow-hidden rounded-2xl border border-amber-400/20 bg-linear-to-br from-amber-400/[0.10] via-rose-400/[0.05] to-slate-950/10 p-6">
          <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-amber-400 to-rose-400 text-slate-950 shadow-lg shadow-amber-500/20">
                <Heart className="h-5 w-5 fill-current" aria-hidden="true" />
              </span>
              <h2 className="text-lg font-bold text-white">{t('about.thanks.heading')}</h2>
            </div>
            <p className="text-base leading-8 text-amber-50/80">{t('about.thanks.body')}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100087911966054"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100 transition-colors hover:border-amber-200/50 hover:bg-amber-300/20 hover:text-white"
              >
                <FacebookIcon className="h-4 w-4 shrink-0" />
                Guardian HCMC · Facebook
              </a>
              <a
                href="https://www.instagram.com/guardianhcmc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-rose-300/25 bg-rose-300/10 px-4 py-2 text-sm font-semibold text-rose-100 transition-colors hover:border-rose-200/50 hover:bg-rose-300/20 hover:text-white"
              >
                <InstagramIcon className="h-4 w-4 shrink-0" />
                Guardian HCMC · Instagram
              </a>
            </div>
          </div>
        </div>
      </SectionCard>
    </PageShell>
  )
}
