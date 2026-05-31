import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowRight, BookOpen, RefreshCw, Zap } from 'lucide-react'
import { Badge } from '../common/Badge'
import { Skeleton } from '../common/Skeleton'
import { cn } from '../../utils/cn'

// ── Constants ─────────────────────────────────────────────────────────────

const dayOfWeek = new Date().getDay()
const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

const cardGradient = 'from-sky-500/10 via-blue-500/5 to-slate-900 border-sky-400/20'
const todayConfig = { key: 'skill', label: 'dashboard.rotation.skill', tone: 'sky' as const, icon: BookOpen }

// ── Types ──────────────────────────────────────────────────────────────────

export type TodayItem = {
  title: string
  description: string
  linkTo: string
}

type DailyFocusCardProps = {
  isLoading: boolean
  todayItem?: TodayItem
  onRefresh: (e: React.MouseEvent) => void
  spinKey: number
}

// ── Component ─────────────────────────────────────────────────────────────

export const DailyFocusCard = ({ isLoading, todayItem, onRefresh, spinKey }: DailyFocusCardProps) => {
  const { t } = useTranslation()
  const TodayIcon = todayConfig.icon

  return (
    <section className="lg:col-span-12">
      {isLoading ? (
        /* ═══ Loading state ═══ */
        <div className="relative block overflow-hidden rounded-[2.5rem] border bg-gradient-to-br p-8 border-sky-400/20 bg-slate-900/50">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sky-400/5 blur-[100px]" />

          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-3">
              <Skeleton variant="card" className="!h-10 !w-10 !rounded-xl" />
              <Skeleton variant="card" className="!h-5 max-w-[180px] flex-1" />
              <button
                type="button"
                onClick={onRefresh}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-sky-400/60 transition-all active:scale-90"
                aria-label={t('dashboard.rotation.refresh')}
              >
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              </button>
            </div>

            <Skeleton variant="card" className="!h-8 !w-3/4 mb-3" />
            <Skeleton variant="card" className="!h-8 !w-1/2 mb-6" />

            <div className="space-y-2.5 mb-6">
              <Skeleton variant="card" className="!h-4" />
              <Skeleton variant="card" className="!h-4" />
              <Skeleton variant="card" className="!h-4 !w-2/3" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton variant="card" className="!h-3 !w-14" />
              <Skeleton variant="card" className="!h-3.5 !w-3.5" />
            </div>
          </div>
        </div>
      ) : todayItem ? (
        /* ═══ Loaded state ═══ */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          whileHover={{ scale: 1.01 }}
          className={cn(
            'group relative block overflow-hidden rounded-[2.5rem] border bg-gradient-to-br p-8 transition-shadow duration-300 hover:shadow-2xl',
            cardGradient,
          )}
        >
          <Link
            to={todayItem.linkTo}
            className="block"
          >
            <div className={cn(
              'absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-20 blur-[100px] transition-opacity group-hover:opacity-30',
              'bg-sky-400',
            )} />

            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-3">
                <motion.div
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400/10 text-sky-400"
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <TodayIcon className="h-5 w-5" />
                </motion.div>
                <div className="flex-1">
                  <Badge tone="sky" className="px-2 py-0.5 text-[10px] uppercase tracking-widest">
                    {t('days.' + dayKeys[dayOfWeek])} · {t(todayConfig.label)}
                  </Badge>
                </div>
                <button
                  type="button"
                  onClick={onRefresh}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-500 transition-all hover:border-sky-400/30 hover:bg-sky-400/10 hover:text-sky-400 active:scale-90"
                  aria-label={t('dashboard.rotation.refresh')}
                >
                  <RefreshCw key={spinKey} className={cn('h-3.5 w-3.5', spinKey > 0 && 'animate-spin-once')} />
                </button>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold tracking-tight text-white lg:text-3xl"
              >
                {todayItem.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-4 text-sm leading-relaxed text-slate-400 line-clamp-3"
              >
                {todayItem.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors group-hover:text-white"
              >
                <span>{t('common.open')}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </motion.div>
            </div>
          </Link>
        </motion.div>
      ) : (
        /* ═══ Empty state ═══ */
        <div className="flex h-full min-h-[280px] items-center justify-center rounded-[2.5rem] border border-white/[0.06] bg-slate-900/30">
          <div className="text-center">
            <Zap className="mx-auto h-8 w-8 text-slate-600" />
            <p className="mt-3 text-sm text-slate-500">{t('common.empty')}</p>
          </div>
        </div>
      )}
    </section>
  )
}
