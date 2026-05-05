import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { cn } from '../../utils/cn'
import { brandIcon as BrandIcon, navGroups } from './navItems'

export const Sidebar = () => {
  const { t } = useTranslation()
  const collapsed = useSettingsStore((state) => state.sidebarCollapsed)
  const setCollapsed = useSettingsStore((state) => state.setSidebarCollapsed)

  return (
    <aside
      className={cn(
        'sticky top-0 hidden h-screen shrink-0 border-r border-white/10 bg-slate-950/70 p-4 backdrop-blur lg:block',
        collapsed ? 'w-20' : 'w-72',
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400 text-slate-950">
          <BrandIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        {!collapsed ? (
          <div>
            <p className="text-base font-semibold text-white">{t('app.name')}</p>
            <p className="text-xs text-slate-500">{t('app.version')}</p>
          </div>
        ) : null}
      </div>

      <nav className="mt-8 space-y-5">
        {navGroups.map((group) => (
          <div key={group.key} className="space-y-1">
            {!collapsed ? <p className="px-3 text-[11px] font-semibold uppercase tracking-wide text-slate-600">{t(group.key)}</p> : null}
            {group.items.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition',
                      isActive ? 'bg-emerald-400/15 text-emerald-100' : 'text-slate-400 hover:bg-white/5 hover:text-white',
                      collapsed && 'justify-center px-2',
                    )
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {!collapsed ? <span>{t(item.key)}</span> : null}
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        title={t('nav.settings')}
        className="absolute bottom-4 left-4 right-4 flex justify-center rounded-md border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/5"
      >
        {collapsed ? <PanelLeftOpen className="h-4 w-4" aria-hidden="true" /> : <PanelLeftClose className="h-4 w-4" aria-hidden="true" />}
      </button>
    </aside>
  )
}
