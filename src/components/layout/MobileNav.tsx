import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { useUiStore } from '../../stores/useUiStore'
import { navGroups } from './navItems'

export const MobileNav = () => {
  const { t } = useTranslation()
  const open = useUiStore((state) => state.mobileNavOpen)
  const setOpen = useUiStore((state) => state.setMobileNavOpen)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur lg:hidden">
      <div className="h-full w-80 max-w-[88vw] border-r border-white/10 bg-slate-950 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-white">{t('app.name')}</p>
            <p className="text-xs text-slate-500">{t('app.version')}</p>
          </div>
          <button type="button" onClick={() => setOpen(false)} className="rounded-md p-2 text-slate-300 hover:bg-white/10">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <nav className="mt-6 space-y-5">
          {navGroups.map((group) => (
            <div key={group.key} className="space-y-1">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wide text-slate-600">{t(group.key)}</p>
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-sm font-medium ${
                      isActive ? 'bg-emerald-400/15 text-emerald-100' : 'text-slate-300 hover:bg-white/5'
                    }`
                  }
                >
                  {t(item.key)}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
