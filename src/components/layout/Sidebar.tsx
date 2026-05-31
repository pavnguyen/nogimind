import { useMemo, useRef, useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ChevronDown, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { cn } from '../../utils/cn'
import { getBuildDate } from '../../utils/version'
import { hubNavItems, settingsNavItem, brandIcon as BrandIcon, pathInHub } from './navItems'

export const Sidebar = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const collapsed = useSettingsStore((state) => state.sidebarCollapsed)
  const setCollapsed = useSettingsStore((state) => state.setSidebarCollapsed)

  const activeHubId = useMemo(
    () => hubNavItems.find((hub) => pathInHub(location.pathname, hub))?.hub,
    [location.pathname],
  )
  const [userExpandedHubs, setUserExpandedHubs] = useState<string[]>([])
  const expandedHubs = useMemo(
    () => activeHubId ? Array.from(new Set([...userExpandedHubs, activeHubId])) : userExpandedHubs,
    [activeHubId, userExpandedHubs],
  )

  const toggleHub = (hubId: string) => {
    setUserExpandedHubs((prev) =>
      prev.includes(hubId) ? prev.filter((h) => h !== hubId) : [...prev, hubId],
    )
  }

  const isHubActive = (hub: (typeof hubNavItems)[number]) => pathInHub(location.pathname, hub)

  // ── Sliding pill indicator ──────────────────────────────────────────────
  const navRef = useRef<HTMLDivElement>(null)
  const [pillStyle, setPillStyle] = useState({ top: 0, height: 0, opacity: 0 })

  useEffect(() => {
    const navEl = navRef.current
    if (!navEl) return

    const updatePill = () => {
      if (!activeHubId) {
        setPillStyle((prev) => ({ ...prev, opacity: 0 }))
        return
      }
      const activeEl = navEl.querySelector<HTMLElement>(`[data-hub-id="${activeHubId}"]`)
      if (!activeEl) return

      const navRect = navEl.getBoundingClientRect()
      const activeRect = activeEl.getBoundingClientRect()

      setPillStyle({
        top: activeRect.top - navRect.top + navEl.scrollTop,
        height: activeRect.height,
        opacity: 1,
      })
    }

    updatePill()

    const observer = new ResizeObserver(updatePill)
    observer.observe(navEl)

    return () => observer.disconnect()
  }, [activeHubId, collapsed])

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
            <p className="truncate text-[10px] text-slate-500">{t('app.version')} · {getBuildDate()}</p>
          </div>
        )}
      </Link>

      {/* Hub Navigation */}
      <nav ref={navRef} className="relative flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
        {/* Sliding pill indicator — framer-motion spring */}
        <motion.div
          className={cn(
            'pointer-events-none absolute z-0',
            collapsed ? 'left-1.5 right-1.5' : 'left-2 right-2',
            activeHubId && 'hallmark-sidebar-pill',
          )}
          animate={{ top: pillStyle.top, height: pillStyle.height, opacity: pillStyle.opacity }}
          transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.5 }}
          style={{ borderRadius: collapsed ? '0.5rem' : '0.75rem' }}
        />

        <div className="relative mb-1.5 space-y-0.5 z-[1]">
          {hubNavItems.map((hub) => {
            const Icon = hub.icon
            const active = isHubActive(hub)
            const expanded = expandedHubs.includes(hub.hub)

            if (collapsed) {
              return (
                <NavLink
                  key={hub.hub}
                  to={hub.to}
                  end
                  data-hub-id={hub.hub}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-center rounded-lg px-2 py-2 text-sm font-medium transition-all duration-150',
                      isActive || active
                        ? 'hallmark-sidebar-collapsed-active'
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
                    data-hub-id={hub.hub}
                    className={cn(
                      'flex flex-1 items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200',
                      active
                        ? 'hallmark-sidebar-active'
                        : 'text-slate-300 hover:bg-white/[0.04] hover:text-slate-100',
                    )}
                  >
                    <span
                      className={cn(
                        'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors',
                        active
                          ? 'hallmark-sidebar-icon'
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
                      active ? 'hallmark-sidebar-chevron' : 'text-slate-500',
                    )}
                    aria-label={expanded ? t('accessibility.collapseSection') : t('accessibility.expandSection')}
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
                    <div className="pointer-events-none absolute bottom-2 left-0 top-2 w-px hallmark-sidebar-rail" />
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
                              ? 'hallmark-sidebar-sub'
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
          aria-label={collapsed ? t('accessibility.expandSidebar') : t('accessibility.collapseSidebar')}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" aria-hidden="true" />
          ) : (
            <>
              <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
              <span>{t('sidebar.collapse')}</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
