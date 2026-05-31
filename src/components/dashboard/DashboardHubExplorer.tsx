import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { BookOpen, Compass, Layers3, Sparkles, Wrench, Zap } from 'lucide-react'
import { cn } from '../../utils/cn'
import { StaggerContainer, StaggerItem } from '../common/StaggerContainer'

// ── Tone style map ────────────────────────────────────────────────────────

const hubToneStyles: Record<string, { card: string; glow: string; icon: string }> = {
  cyan: {
    card: 'border-cyan-400/15 bg-cyan-400/[0.03] hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] hover:shadow-[0_0_25px_rgba(34,211,238,0.08)]',
    glow: 'bg-cyan-400',
    icon: 'bg-cyan-400/10 text-cyan-300 group-hover:bg-cyan-400/20',
  },
  emerald: {
    card: 'border-emerald-400/15 bg-emerald-400/[0.03] hover:border-emerald-400/30 hover:bg-emerald-400/[0.06] hover:shadow-[0_0_25px_rgba(52,211,153,0.08)]',
    glow: 'bg-emerald-400',
    icon: 'bg-emerald-400/10 text-emerald-300 group-hover:bg-emerald-400/20',
  },
  amber: {
    card: 'border-amber-400/15 bg-amber-400/[0.03] hover:border-amber-400/30 hover:bg-amber-400/[0.06] hover:shadow-[0_0_25px_rgba(251,191,36,0.08)]',
    glow: 'bg-amber-400',
    icon: 'bg-amber-400/10 text-amber-300 group-hover:bg-amber-400/20',
  },
  violet: {
    card: 'border-violet-400/15 bg-violet-400/[0.03] hover:border-violet-400/30 hover:bg-violet-400/[0.06] hover:shadow-[0_0_25px_rgba(167,139,250,0.08)]',
    glow: 'bg-violet-400',
    icon: 'bg-violet-400/10 text-violet-300 group-hover:bg-violet-400/20',
  },
  slate: {
    card: 'border-slate-400/15 bg-slate-400/[0.03] hover:border-slate-400/30 hover:bg-slate-400/[0.06]',
    glow: 'bg-slate-400',
    icon: 'bg-slate-400/10 text-slate-300 group-hover:bg-slate-400/20',
  },
}

// ── Hub link data ─────────────────────────────────────────────────────────

const hubLinks = [
  { to: '/learn', icon: Compass, label: 'nav.learn', tone: 'cyan' },
  { to: '/study', icon: Zap, label: 'nav.study', tone: 'emerald', highlight: true },
  { to: '/troubleshooters', icon: Wrench, label: 'nav.fix', tone: 'amber' },
  { to: '/build', icon: Layers3, label: 'nav.build', tone: 'violet' },
  { to: '/reference', icon: BookOpen, label: 'nav.reference', tone: 'slate' },
]

// ── Component ─────────────────────────────────────────────────────────────

export const DashboardHubExplorer = () => {
  const { t } = useTranslation()

  return (
    <section className="lg:col-span-12 animate-fadeIn md:[animation-delay:200ms]">
      <div className="rounded-[2.5rem] border border-white/[0.06] bg-slate-900/20 p-6 lg:p-8">
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-slate-500" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">{t('dashboard.hubExplorer')}</h2>
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
                      'group relative block overflow-hidden rounded-2xl border p-5',
                      hubToneStyles[hub.tone].card,
                      hub.highlight && 'ring-1 ring-emerald-400/20',
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
                          'mb-3 inline-flex rounded-xl p-2.5 transition-colors',
                          hubToneStyles[hub.tone].icon,
                        )}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <HubIcon className="h-5 w-5" />
                      </motion.div>
                      <p className="text-sm font-bold text-white">
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
