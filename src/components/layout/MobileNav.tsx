import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, X, Home, Layers3, Compass, BookOpen, Wrench } from 'lucide-react'
import { useUiStore } from '../../stores/useUiStore'
import { cn } from '../../utils/cn'
import { primaryNavItems } from './navItems'

const tabItems = [
  { to: '/', key: 'nav.dashboard', icon: Home },
  { to: '/skills', key: 'nav.skills', icon: Layers3 },
  { to: '/search', key: 'nav.search', icon: Search },
  { to: '/troubleshooters', key: 'nav.troubleshooters', icon: Wrench },
  { to: '/study', key: 'nav.study', icon: Compass },
  { to: '/reference', key: 'nav.reference', icon: BookOpen },
]

export const MobileNav = () => {
  const { t } = useTranslation()
  const open = useUiStore((state) => state.mobileNavOpen)
  const setOpen = useUiStore((state) => state.setMobileNavOpen)

  if (open) {
    return (
      <div className="fixed inset-0 z-40 animate-fade-in bg-slate-950/90 backdrop-blur-2xl lg:hidden">
        <div className="flex h-full flex-col p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-white">{t('app.name')}</p>
              <p className="text-xs text-slate-500">{t('app.version')}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] text-slate-300 transition-all hover:bg-white/[0.06]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav className="mt-10 flex-1 space-y-1">
            {primaryNavItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-4 rounded-xl px-4 py-3 text-base font-medium transition-all',
                      isActive
                        ? 'bg-emerald-400/12 text-emerald-100'
                        : 'text-slate-300 hover:bg-white/[0.04] hover:text-white',
                    )
                  }
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span>{t(item.key)}</span>
                </NavLink>
              )
            })}
          </nav>
          <div className="space-y-2 border-t border-white/[0.06] pt-6 text-sm text-slate-500">
            <NavLink to="/settings" onClick={() => setOpen(false)} className="block rounded-lg px-4 py-2 hover:text-slate-300">
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
        {tabItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-all',
                  isActive
                    ? 'text-emerald-300'
                    : 'text-slate-500 hover:text-slate-300',
                )
              }
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{t(item.key).split(' ')[0]}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
