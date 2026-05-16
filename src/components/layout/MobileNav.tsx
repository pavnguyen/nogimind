import { NavLink, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { X, BookOpen, Compass, Layers3, Wrench, Zap } from 'lucide-react'
import { useUiStore } from '../../stores/useUiStore'
import { cn } from '../../utils/cn'
import { hubNavItems, pathInHub } from './navItems'

const bottomTabItems = [
  { hub: 'learn', icon: Compass },
  { hub: 'study', icon: Zap },
  { hub: 'fix', icon: Wrench },
  { hub: 'build', icon: Layers3 },
  { hub: 'reference', icon: BookOpen },
]

export const MobileNav = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const open = useUiStore((state) => state.mobileNavOpen)
  const setOpen = useUiStore((state) => state.setMobileNavOpen)

  if (open) {
    return (
      <div className="fixed inset-0 z-40 animate-fade-in bg-slate-950/90 backdrop-blur-2xl lg:hidden">
        <div className="flex h-full flex-col p-6">
          <div className="flex items-center justify-between">
            <Link to="/" onClick={() => setOpen(false)}>
              <p className="text-lg font-semibold text-white">{t('app.name')}</p>
              <p className="text-xs text-slate-500">{t('app.version')}</p>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] text-slate-300 transition-all hover:bg-white/[0.06]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav className="mt-8 flex-1 space-y-6 overflow-y-auto">
            {hubNavItems.map((hub) => {
              const Icon = hub.icon
              const active = pathInHub(location.pathname, hub)

              return (
                <div key={hub.hub}>
                  <NavLink
                    to={hub.to}
                    end
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200',
                      active
                        ? 'bg-gradient-to-r from-emerald-400/16 via-emerald-400/10 to-transparent text-emerald-100 shadow-[inset_0_0_0_1px_rgba(74,222,128,0.15)]'
                        : 'text-slate-300 hover:bg-white/[0.04] hover:text-white',
                    )}
                  >
                    <span
                      className={cn(
                        'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors',
                        active
                          ? 'border-emerald-300/20 bg-emerald-300/10 text-emerald-100'
                          : 'border-white/[0.08] bg-white/[0.02] text-slate-400',
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    </span>
                    <span>{t(hub.labelKey)}</span>
                  </NavLink>

                  <div className="relative ml-9 mt-1 space-y-1 rounded-lg bg-white/[0.015] px-2 py-2">
                    <div className="pointer-events-none absolute bottom-2 left-0 top-2 w-px bg-gradient-to-b from-transparent via-emerald-300/35 to-transparent" />
                    {hub.items.map((item) => {
                      const isItemActive =
                        location.pathname === item.to ||
                        location.pathname.startsWith(item.to + '/')
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          end={item.to === '/learn'}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            cn(
                              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                              isItemActive
                                ? 'bg-gradient-to-r from-emerald-400/14 to-emerald-400/6 text-emerald-100 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.16)]'
                                : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200',
                            )
                          }
                        >
                          <span
                            className={cn(
                              'h-1.5 w-1.5 rounded-full',
                              isItemActive ? 'bg-emerald-400' : 'bg-slate-600',
                            )}
                          />
                          <span>{t(item.key)}</span>
                        </NavLink>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </nav>

          <div className="space-y-2 border-t border-white/[0.06] pt-6 text-sm text-slate-500">
            <NavLink
              to="/settings"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-2 hover:text-slate-300"
            >
              {t('nav.settings')}
            </NavLink>
          </div>
        </div>
      </div>
    )
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/[0.06] bg-slate-950/90 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-1">
        {bottomTabItems.map((tab) => {
          const hub = hubNavItems.find((h) => h.hub === tab.hub)!
          const Icon = tab.icon
          const active = pathInHub(location.pathname, hub)

          return (
            <NavLink
              key={tab.hub}
              to={hub.to}
              end
              className={({ isActive }) =>
                cn(
                  'flex min-w-[62px] flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-all duration-200',
                  isActive || active
                    ? 'bg-emerald-400/10 text-emerald-200 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.2)]'
                    : 'text-slate-500 hover:bg-white/[0.03] hover:text-slate-300',
                )
              }
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{t(hub.labelKey).split(' ')[0]}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
