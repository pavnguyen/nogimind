import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronDown, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { cn } from '../../utils/cn'
import { hubNavItems, settingsNavItem, brandIcon as BrandIcon, pathInHub } from './navItems'

export const Sidebar = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const collapsed = useSettingsStore((state) => state.sidebarCollapsed)
  const setCollapsed = useSettingsStore((state) => state.setSidebarCollapsed)

  // Track which hubs are expanded
  const [expandedHubs, setExpandedHubs] = useState<string[]>([])

  // Auto-expand the hub containing the current page
  useEffect(() => {
    const activeHub = hubNavItems.find((hub) => pathInHub(location.pathname, hub))
    if (activeHub && !expandedHubs.includes(activeHub.hub)) {
      setExpandedHubs((prev) => [...prev, activeHub.hub])
    }
  }, [location.pathname])

  const toggleHub = (hubId: string) => {
    setExpandedHubs((prev) =>
      prev.includes(hubId) ? prev.filter((h) => h !== hubId) : [...prev, hubId],
    )
  }

  const isHubActive = (hub: (typeof hubNavItems)[number]) => pathInHub(location.pathname, hub)
  const hubAccent: Record<string, { active: string; icon: string; rail: string; sub: string; chevron: string }> = {
    learn: {
      active: 'bg-gradient-to-r from-cyan-400/18 via-cyan-400/10 to-transparent text-cyan-100 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.18)]',
      icon: 'border-cyan-300/25 bg-cyan-300/12 text-cyan-100',
      rail: 'via-cyan-300/45',
      sub: 'bg-gradient-to-r from-cyan-400/16 to-cyan-400/6 text-cyan-100 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.18)]',
      chevron: 'text-cyan-300',
    },
    study: {
      active: 'bg-gradient-to-r from-emerald-400/18 via-emerald-400/10 to-transparent text-emerald-100 shadow-[inset_0_0_0_1px_rgba(74,222,128,0.18)]',
      icon: 'border-emerald-300/25 bg-emerald-300/12 text-emerald-100',
      rail: 'via-emerald-300/45',
      sub: 'bg-gradient-to-r from-emerald-400/16 to-emerald-400/6 text-emerald-100 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.18)]',
      chevron: 'text-emerald-300',
    },
    fix: {
      active: 'bg-gradient-to-r from-amber-400/18 via-amber-400/10 to-transparent text-amber-100 shadow-[inset_0_0_0_1px_rgba(251,191,36,0.18)]',
      icon: 'border-amber-300/25 bg-amber-300/12 text-amber-100',
      rail: 'via-amber-300/45',
      sub: 'bg-gradient-to-r from-amber-400/16 to-amber-400/6 text-amber-100 shadow-[inset_0_0_0_1px_rgba(251,191,36,0.18)]',
      chevron: 'text-amber-300',
    },
    build: {
      active: 'bg-gradient-to-r from-violet-400/18 via-violet-400/10 to-transparent text-violet-100 shadow-[inset_0_0_0_1px_rgba(167,139,250,0.18)]',
      icon: 'border-violet-300/25 bg-violet-300/12 text-violet-100',
      rail: 'via-violet-300/45',
      sub: 'bg-gradient-to-r from-violet-400/16 to-violet-400/6 text-violet-100 shadow-[inset_0_0_0_1px_rgba(167,139,250,0.18)]',
      chevron: 'text-violet-300',
    },
    reference: {
      active: 'bg-gradient-to-r from-sky-400/18 via-sky-400/10 to-transparent text-sky-100 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.18)]',
      icon: 'border-sky-300/25 bg-sky-300/12 text-sky-100',
      rail: 'via-sky-300/45',
      sub: 'bg-gradient-to-r from-sky-400/16 to-sky-400/6 text-sky-100 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.18)]',
      chevron: 'text-sky-300',
    },
  }

  return (
    <aside
      className={cn(
        'sticky top-0 hidden h-screen shrink-0 border-r border-white/[0.06] bg-slate-950/50 backdrop-blur-xl lg:flex lg:flex-col',
        collapsed ? 'w-20' : 'w-64',
      )}
    >
      {/* Brand */}
      <Link to="/" className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4 transition-colors hover:bg-white/[0.02]">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-sm">
          <BrandIcon className="h-5 w-5 text-slate-950" aria-hidden="true" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{t('app.name')}</p>
            <p className="truncate text-[10px] text-slate-500">{t('app.version')}</p>
          </div>
        )}
      </Link>

      {/* Hub Navigation */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
        <div className="mb-1.5 space-y-0.5">
          {hubNavItems.map((hub) => {
            const Icon = hub.icon
            const active = isHubActive(hub)
            const expanded = expandedHubs.includes(hub.hub)
            const accent = hubAccent[hub.hub] ?? hubAccent.study

            if (collapsed) {
              return (
                <NavLink
                  key={hub.hub}
                  to={hub.to}
                  end
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-center rounded-lg px-2 py-2 text-sm font-medium transition-all duration-150',
                      isActive || active
                        ? 'bg-emerald-400/12 text-emerald-100'
                        : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200',
                    )
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                </NavLink>
              )
            }

            return (
              <div key={hub.hub}>
                {/* Hub header — click to navigate, chevron to toggle */}
                <div className="group flex items-center">
                  <NavLink
                    to={hub.to}
                    end
                    className={cn(
                      'flex flex-1 items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200',
                      active
                        ? accent.active
                        : 'text-slate-300 hover:bg-white/[0.04] hover:text-slate-100',
                    )}
                  >
                    <span
                      className={cn(
                        'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors',
                        active
                          ? accent.icon
                          : 'border-white/[0.08] bg-white/[0.02] text-slate-400 group-hover:text-slate-200',
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </span>
                    <span className="flex-1 text-left">{t(hub.labelKey)}</span>
                  </NavLink>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleHub(hub.hub)
                    }}
                    className={cn(
                      'ml-1 flex items-center justify-center rounded-lg p-2 transition-all duration-200 hover:bg-white/[0.06]',
                      active ? accent.chevron : 'text-slate-500',
                    )}
                    aria-label={expanded ? 'Collapse section' : 'Expand section'}
                  >
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 transition-transform duration-200',
                        expanded && 'rotate-180',
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {/* Sub-items */}
                {expanded && (
                  <div className="relative ml-1 mt-0.5 space-y-0.5 rounded-xl bg-white/[0.015] px-2 py-1.5">
                    <div className={cn('pointer-events-none absolute bottom-2 left-0 top-2 w-px bg-gradient-to-b from-transparent to-transparent', accent.rail)} />
                    {hub.items.map((item) => {
                      const isItemActive =
                        location.pathname === item.to ||
                        location.pathname.startsWith(item.to + '/')
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          end={item.to === '/learn'}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-1.5 text-[13px] font-medium tracking-[0.01em] transition-all duration-200',
                            isItemActive
                              ? accent.sub
                              : 'text-slate-300 hover:bg-white/[0.04] hover:text-slate-100',
                          )}
                        >
                          <span className={cn('h-1.5 w-1.5 rounded-full', isItemActive ? 'bg-current opacity-90' : 'bg-slate-600')} />
                          <span>{t(item.key)}</span>
                        </NavLink>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Settings */}
        <div className="mt-3">
          <NavLink
            to={settingsNavItem.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-slate-400/10 text-slate-200'
                  : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200',
                collapsed && 'justify-center px-2',
              )
            }
          >
            <settingsNavItem.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {!collapsed && <span>{t(settingsNavItem.key)}</span>}
          </NavLink>
        </div>
      </nav>

      {/* Collapse button */}
      <div className="border-t border-white/[0.06] p-2.5">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400 transition-all hover:bg-white/[0.04] hover:text-slate-200"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" aria-hidden="true" />
          ) : (
            <>
              <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
