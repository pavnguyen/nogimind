import { useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '../../utils/cn'
import type { LucideIcon } from 'lucide-react'

export type HubTab = {
  id: string
  labelKey: string
  icon?: LucideIcon
  /** If set, clicking this tab navigates to this route instead of using search params */
  route?: string
}

type Props = {
  tabs: HubTab[]
  /** Accent color for the active tab styling */
  accent?: 'cyan' | 'emerald' | 'amber' | 'violet' | 'sky' | 'slate'
  className?: string
}

const accentColors: Record<string, { active: string; border: string; hover: string }> = {
  cyan: {
    active: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-50 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.15)]',
    border: 'border-cyan-400/20',
    hover: 'hover:border-cyan-400/20 hover:text-cyan-100',
  },
  emerald: {
    active: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-50 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.15)]',
    border: 'border-emerald-400/20',
    hover: 'hover:border-emerald-400/20 hover:text-emerald-100',
  },
  amber: {
    active: 'border-amber-400/40 bg-amber-400/10 text-amber-50 shadow-[inset_0_0_0_1px_rgba(251,191,36,0.15)]',
    border: 'border-amber-400/20',
    hover: 'hover:border-amber-400/20 hover:text-amber-100',
  },
  violet: {
    active: 'border-violet-400/40 bg-violet-400/10 text-violet-50 shadow-[inset_0_0_0_1px_rgba(167,139,250,0.15)]',
    border: 'border-violet-400/20',
    hover: 'hover:border-violet-400/20 hover:text-violet-100',
  },
  sky: {
    active: 'border-sky-400/40 bg-sky-400/10 text-sky-50 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.15)]',
    border: 'border-sky-400/20',
    hover: 'hover:border-sky-400/20 hover:text-sky-100',
  },
  slate: {
    active: 'border-slate-400/40 bg-slate-400/10 text-slate-50 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.15)]',
    border: 'border-slate-400/20',
    hover: 'hover:border-slate-400/20 hover:text-slate-100',
  },
}

export const HubTabBar = ({ tabs, accent = 'cyan', className }: Props) => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || tabs[0]?.id || ''

  const setTab = useCallback(
    (tabId: string) => {
      const next = new URLSearchParams(searchParams)
      if (tabId === tabs[0]?.id) {
        next.delete('tab')
      } else {
        next.set('tab', tabId)
      }
      setSearchParams(next, { replace: true })
    },
    [searchParams, setSearchParams, tabs],
  )

  const colors = accentColors[accent] ?? accentColors.cyan

  return (
    <div className={cn('flex gap-1 overflow-x-auto rounded-2xl border border-white/[0.06] bg-slate-900/40 p-1.5 scrollbar-none', className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        const Icon = tab.icon

        const button = (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              if (tab.route) return // route tabs use Link
              setTab(tab.id)
            }}
            className={cn(
              'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap',
              isActive
                ? colors.active
                : `text-slate-400 ${colors.hover}`,
            )}
          >
            {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
            {t(tab.labelKey)}
          </button>
        )

        // Tabs with a route navigate externally
        if (tab.route) {
          return (
            <Link
              key={tab.id}
              to={tab.route}
              className={cn(
                'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap',
                `text-slate-400 ${colors.hover}`,
              )}
            >
              {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
              {t(tab.labelKey)}
            </Link>
          )
        }

        return button
      })}
    </div>
  )
}
