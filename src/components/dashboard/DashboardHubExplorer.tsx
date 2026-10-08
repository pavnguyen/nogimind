import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { BookOpen, Compass, Layers3, Shield, Sparkles, Zap } from 'lucide-react'
import { cn } from '../../utils/cn'
import { StaggerContainer, StaggerItem } from '../common/StaggerContainer'

// ── Tone style map ────────────────────────────────────────────────────────

const hubToneStyles: Record<string, { card: string; glow: string; icon: string }> = {
  gold: {
    card: 'border-gold-400/15 bg-gold-400/[0.03] hover:border-gold-400/30 hover:bg-gold-400/[0.06] hover:shadow-[0_0_25px_rgba(232,176,92,0.08)]',
    glow: 'bg-gold-400',
    icon: 'bg-gold-400/10 text-gold group-hover:bg-gold-400/20',
  },
  jade: {
    card: 'border-jade-400/15 bg-jade-400/[0.03] hover:border-jade-400/30 hover:bg-jade-400/[0.06] hover:shadow-[0_0_25px_rgba(62,201,182,0.08)]',
    glow: 'bg-jade-400',
    icon: 'bg-jade-400/10 text-jade group-hover:bg-jade-400/20',
  },
  copper: {
    card: 'border-copper-400/15 bg-copper-400/[0.03] hover:border-copper-400/30 hover:bg-copper-400/[0.06] hover:shadow-[0_0_25px_rgba(224,122,78,0.08)]',
    glow: 'bg-copper-400',
    icon: 'bg-copper-400/10 text-copper group-hover:bg-copper-400/20',
  },
  steel: {
    card: 'border-steel-400/15 bg-steel-400/[0.03] hover:border-steel-400/30 hover:bg-steel-400/[0.06] hover:shadow-[0_0_25px_rgba(127,169,224,0.08)]',
    glow: 'bg-steel-400',
    icon: 'bg-steel-400/10 text-steel group-hover:bg-steel-400/20',
  },
  sand: {
    card: 'border-sand-400/15 bg-sand-400/[0.03] hover:border-sand-400/30 hover:bg-sand-400/[0.06] hover:shadow-[0_0_25px_rgba(176,169,155,0.08)]',
    glow: 'bg-sand-400',
    icon: 'bg-sand-400/10 text-sand group-hover:bg-sand-400/20',
  },
}

// ── Hub link data ─────────────────────────────────────────────────────────

const hubLinks = [
  { to: '/learn', icon: Compass, label: 'nav.learn', tone: 'gold' },
  { to: '/study', icon: Zap, label: 'nav.study', tone: 'jade', highlight: true },
  { to: '/defense', icon: Shield, label: 'nav.defense', tone: 'copper' },
  { to: '/build', icon: Layers3, label: 'nav.build', tone: 'steel' },
  { to: '/reference', icon: BookOpen, label: 'nav.reference', tone: 'sand' },
]

// ── Component ─────────────────────────────────────────────────────────────

export const DashboardHubExplorer = () => {
  const { t } = useTranslation()

  return (
    <section className="lg:col-span-12 animate-fadeIn md:[animation-delay:200ms]">
      <div className="rounded-2xl border border-warm-50/[0.06] bg-warm-900/20 p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-warm-500" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-warm-500">{t('dashboard.hubExplorer')}</h2>
        </div>
        <StaggerContainer className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {hubLinks.map((hub) => {
            const HubIcon = hub.icon
            return (
              <StaggerItem key={hub.to}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Link
                    to={hub.to}
                    className={cn(
                      'group relative block overflow-hidden rounded-xl border p-4',
                      hubToneStyles[hub.tone].card,
                      hub.highlight && 'ring-1 ring-jade-400/20',
                    )}
                  >
                    <motion.div
                      className={cn(
                        'absolute -right-6 -top-6 h-16 w-16 rounded-full blur-2xl',
                        hubToneStyles[hub.tone].glow,
                      )}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.4 }}
                      transition={{ duration: 0.2 }}
                    />

                    <div className="relative z-10">
                      <motion.div
                        className={cn(
                          'mb-2.5 inline-flex rounded-lg p-2 transition-colors',
                          hubToneStyles[hub.tone].icon,
                        )}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <HubIcon className="h-4 w-4" />
                      </motion.div>
                      <p className="text-xs font-bold text-warm-50 sm:text-sm">
                        {t(hub.label)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
