import { useCallback, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '../../utils/cn'
import type { LucideIcon } from 'lucide-react'

export type HubTab = {
  id: string
  labelKey: string
  /**
   * Shorter label for phones, where the full one would push the bar past the
   * viewport. The bar uses it below `sm` and the full label from `sm` up.
   */
  shortLabelKey?: string
  icon?: LucideIcon
  /** If set, clicking this tab navigates to this route instead of using search params */
  route?: string
}

type Props = {
  tabs: HubTab[]
  /**
   * @deprecated No longer needed, accent is now sourced from the active Hallmark theme
   * via `data-hub` CSS variables. Kept for backward compatibility.
   */
  accent?: string
  className?: string
}

export const HubTabBar = ({ tabs, className }: Props) => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const urlTab = searchParams.get('tab') || tabs[0]?.id || ''
  // Router navigations are wrapped in a transition, so the URL (and with it the
  // rendered tab) follows a tap a beat later. The highlight lives in urgent
  // state so it moves with the click, and it is re-synced from the URL during
  // render whenever the URL changes, so back/forward and deep links still win.
  const [activeTab, setActiveTab] = useState(urlTab)
  const [syncedUrlTab, setSyncedUrlTab] = useState(urlTab)
  if (urlTab !== syncedUrlTab) {
    setSyncedUrlTab(urlTab)
    setActiveTab(urlTab)
  }

  const setTab = useCallback(
    (tabId: string) => {
      setActiveTab(tabId)
      // Build the next params from the latest URL, not from a render-time copy:
      // two quick clicks must compose instead of overwriting each other.
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current)
          if (tabId === tabs[0]?.id) {
            next.delete('tab')
          } else {
            next.set('tab', tabId)
          }
          return next
        },
        { replace: true },
      )
    },
    [setSearchParams, tabs],
  )

  // Tailwind's `hidden`/`sm:inline` are CSS only, so the short and the full
  // label both sit in the markup and the browser shows one of them.
  const label = (tab: HubTab) =>
    tab.shortLabelKey ? (
      <>
        <span className="sm:hidden">{t(tab.shortLabelKey)}</span>
        <span className="hidden sm:inline">{t(tab.labelKey)}</span>
      </>
    ) : (
      t(tab.labelKey)
    )

  return (
    <div
      className={cn(
        'flex gap-1 overflow-x-auto rounded-2xl border border-warm-50/[0.06] bg-warm-900/40 p-1.5 scrollbar-none',
        className,
      )}
    >
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
              'flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-medium transition-all duration-200 whitespace-nowrap sm:gap-2 sm:px-4 sm:text-sm',
              isActive
                ? 'hallmark-tab-active'
                : 'text-warm-400 hallmark-btn-ghost',
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />}
            {label(tab)}
          </button>
        )

        // Tabs with a route navigate externally
        if (tab.route) {
          return (
            <Link
              key={tab.id}
              to={tab.route}
              className="flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-medium text-warm-400 hallmark-btn-ghost transition-all duration-200 whitespace-nowrap sm:gap-2 sm:px-4 sm:text-sm"
            >
              {Icon && <Icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />}
              {label(tab)}
            </Link>
          )
        }

        return button
      })}
    </div>
  )
}
