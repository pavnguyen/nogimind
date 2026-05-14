import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PanelLeftClose, PanelLeftOpen, ChevronDown } from 'lucide-react'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { cn } from '../../utils/cn'
import { brandIcon as BrandIcon, primaryNavItems, secondaryNavGroups, settingsNavItem } from './navItems'

export const Sidebar = () => {
  const { t } = useTranslation()
  const collapsed = useSettingsStore((state) => state.sidebarCollapsed)
  const setCollapsed = useSettingsStore((state) => state.setSidebarCollapsed)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <aside
      className={cn(
        'sticky top-0 hidden h-screen shrink-0 border-r border-white/[0.06] bg-slate-950/50 backdrop-blur-xl lg:flex lg:flex-col',
        collapsed ? 'w-20' : 'w-64',
      )}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-sm">
          <BrandIcon className="h-5 w-5 text-slate-950" aria-hidden="true" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{t('app.name')}</p>
            <p className="truncate text-[10px] text-slate-500">{t('app.version')}</p>
          </div>
        )}
      </div>

      {/* Primary Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-4">
        <div className="mb-2 space-y-0.5">
          {primaryNavItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-emerald-400/12 text-emerald-100 shadow-sm'
                      : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200',
                    collapsed && 'justify-center px-2',
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {!collapsed && <span>{t(item.key)}</span>}
              </NavLink>
            )
          })}
        </div>

        {/* Secondary Groups */}
        {!collapsed && (
          <div className="mt-6 space-y-1">
            {secondaryNavGroups.map((group) => {
              const GroupIcon = group.icon
              const isOpen = expandedGroups[group.key] ?? true
              return (
                <div key={group.key}>
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.key)}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300"
                  >
                    <GroupIcon className="h-3 w-3" aria-hidden="true" />
                    <span className="flex-1 text-left">{t(group.key)}</span>
                    <ChevronDown
                      className={cn('h-3 w-3 transition-transform duration-150', isOpen && 'rotate-180')}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="ml-1 mt-0.5 space-y-0.5 border-l border-white/[0.06] pl-2">
                      {group.items.map((item) => {
                        const ItemIcon = item.icon
                        return (
                          <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                              cn(
                                'flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150',
                                isActive
                                  ? 'bg-cyan-400/10 text-cyan-100'
                                  : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200',
                              )
                            }
                          >
                            <ItemIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
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
        )}

        {/* Settings */}
        <div className={cn('mt-4', collapsed && 'flex justify-center')}>
          <NavLink
            to={settingsNavItem.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-slate-400/10 text-slate-200'
                  : 'text-slate-500 hover:bg-white/[0.04] hover:text-slate-300',
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
      <div className="border-t border-white/[0.06] p-3">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition-all hover:bg-white/[0.04] hover:text-slate-300"
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
