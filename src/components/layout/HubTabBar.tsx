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
  /**
   * @deprecated No longer needed — accent is now sourced from the active Hallmark theme
   * via `data-hub` CSS variables. Kept for backward compatibility.
   */
  accent?: string
  className?: string
}

export const HubTabBar = ({ tabs, className }: Props) => {
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
                ? 'hallmark-tab-active'
                : 'text-slate-400 hallmark-btn-ghost',
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
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-400 hallmark-btn-ghost transition-all duration-200 whitespace-nowrap"
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
