import { useTranslation } from 'react-i18next'
import { BrainCircuit, Compass, Heart, ShieldCheck } from 'lucide-react'
import { FacebookIcon, InstagramIcon } from '../components/common/BrandIcons'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'
import { StaggerContainer, StaggerItem } from '../components/common/StaggerContainer'
import { cn } from '../utils/cn'

type PillarTone = 'gold' | 'jade' | 'copper'

const pillarTones: Record<PillarTone, { card: string; icon: string; glow: string; label: string }> = {
  gold: {
    card: 'border-gold-400/15 hover:border-gold-400/30',
    icon: 'bg-gold-400/10 text-gold',
    glow: 'bg-gold-400/[0.07]',
    label: 'text-gold/80',
  },
  jade: {
    card: 'border-jade-400/15 hover:border-jade-400/30',
    icon: 'bg-jade-400/10 text-jade',
    glow: 'bg-jade-400/[0.07]',
    label: 'text-jade/80',
  },
  copper: {
    card: 'border-copper-400/15 hover:border-copper-400/30',
    icon: 'bg-copper-400/10 text-copper',
    glow: 'bg-copper-400/[0.07]',
    label: 'text-copper/80',
  },
}

export default function AboutPage() {
  const { t } = useTranslation()

  const pillars: Array<{ key: string; titleKey: string; bodyKey: string; icon: typeof Compass; tone: PillarTone }> = [
    { key: 'philosophy', titleKey: 'about.philosophyTitle', bodyKey: 'about.philosophy', icon: Compass, tone: 'gold' },
    { key: 'system', titleKey: 'about.systemTitle', bodyKey: 'about.system', icon: BrainCircuit, tone: 'jade' },
    { key: 'safety', titleKey: 'about.safetyTitle', bodyKey: 'about.safety', icon: ShieldCheck, tone: 'copper' },
  ]

  return (
    <PageShell
      header={
        <div className="relative overflow-hidden rounded-3xl border border-warm-50/[0.06] bg-warm-900/30 p-6 lg:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-jade-400/5 blur-[80px]" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-jade-400 to-gold-400 text-on-accent shadow-lg shadow-jade-500/20">
              <BrainCircuit className="h-7 w-7" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h1 className="display-heading text-3xl font-extrabold tracking-tight text-warm-50 lg:text-4xl">
                {t('about.heading')}
              </h1>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-warm-400 lg:text-base">{t('app.thesis')}</p>
            </div>
          </div>
        </div>
      }
    >
      {/* ── With gratitude ── */}
      <SectionCard className="p-0">
        <div className="relative overflow-hidden rounded-2xl border border-gold-400/20 bg-linear-to-br from-gold-400/[0.10] via-copper-400/[0.05] to-warm-950/10 p-6">
          <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-gold-400/10 blur-3xl" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-gold-400 to-copper-400 text-on-accent shadow-lg shadow-gold-500/20">
                <Heart className="h-5 w-5 fill-current" aria-hidden="true" />
              </span>
              <h2 className="text-lg font-bold text-warm-50">{t('about.thanks.heading')}</h2>
            </div>
            <p className="text-base leading-8 text-gold/80">{t('about.thanks.body')}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100087911966054"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gold-300/25 bg-gold-300/10 px-4 py-2 text-sm font-semibold text-gold transition-colors hover:border-gold-200/50 hover:bg-gold-300/20 hover:text-warm-50"
              >
                <FacebookIcon className="h-4 w-4 shrink-0" />
                Guardian HCMC · Facebook
              </a>
              <a
                href="https://www.instagram.com/guardianhcmc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-copper-300/25 bg-copper-300/10 px-4 py-2 text-sm font-semibold text-copper transition-colors hover:border-copper-200/50 hover:bg-copper-300/20 hover:text-warm-50"
              >
                <InstagramIcon className="h-4 w-4 shrink-0" />
                Guardian HCMC · Instagram
              </a>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ── Core principles ── */}
      <StaggerContainer className="grid gap-4 lg:grid-cols-3">
        {pillars.map((pillar) => {
          const Icon = pillar.icon
          const tone = pillarTones[pillar.tone]
          return (
            <StaggerItem key={pillar.key}>
              <div
                className={cn(
                  'group relative h-full overflow-hidden rounded-2xl border bg-warm-900/40 p-5 transition-all duration-300',
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
                  <p className="text-sm leading-7 text-warm-300">{t(pillar.bodyKey)}</p>
                </div>
              </div>
            </StaggerItem>
          )
        })}
      </StaggerContainer>
    </PageShell>
  )
}
