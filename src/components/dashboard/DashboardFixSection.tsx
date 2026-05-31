import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowRight, BugPlay, Shield, Wrench } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '../common/StaggerContainer'

const fixItems = [
  { key: 'troubleshooters', to: '/troubleshooters', icon: BugPlay },
  { key: 'defense', to: '/defense', icon: Shield },
]

export const DashboardFixSection = () => {
  const { t } = useTranslation()

  return (
    <section className="lg:col-span-12 animate-fadeIn md:[animation-delay:300ms]">
      <div className="rounded-[2.5rem] border border-amber-400/10 bg-gradient-to-br from-amber-400/[0.03] to-slate-900/20 p-6 lg:p-8">
        <div className="mb-6 flex items-center gap-2">
          <Wrench className="h-4 w-4 text-amber-400/70" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400/70">{t('modeUx.fix.heading')}</h2>
        </div>
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-slate-500">{t('modeUx.fix.subtitle')}</p>
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fixItems.map((item) => {
            const ItemIcon = item.icon
            return (
              <StaggerItem key={item.key}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Link
                    to={item.to}
                    className="group relative block overflow-hidden rounded-xl border border-amber-400/10 bg-slate-950/40 p-5"
                  >
                    <motion.div
                      className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-amber-400/5 blur-2xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative z-10 flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <motion.div
                          className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300"
                          whileHover={{ rotate: 12, backgroundColor: 'rgba(251,191,36,0.2)' }}
                          transition={{ duration: 0.2 }}
                        >
                          <ItemIcon className="h-4 w-4" aria-hidden="true" />
                        </motion.div>
                        <h3 className="text-sm font-semibold text-white">
                          {t(`modeUx.reference.items.${item.key}.title`)}
                        </h3>
                        <p className="mt-1.5 text-xs leading-5 text-slate-400 line-clamp-2">
                          {t(`modeUx.reference.items.${item.key}.body`)}
                        </p>
                      </div>
                      <motion.div
                        className="mt-2 shrink-0 text-amber-400/40"
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </motion.div>
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
