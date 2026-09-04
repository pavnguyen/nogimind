import { useMemo, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { hubNavItems, pathInHub } from '../components/layout/navItems'
import { HubThemeContext, type HubId, type HubTheme } from './HubThemeContext'

// ── Provider ──────────────────────────────────────────────────────────────

interface HubThemeProviderProps {
  children: ReactNode
}

export const HubThemeProvider = ({ children }: HubThemeProviderProps) => {
  const location = useLocation()

  const value = useMemo<HubTheme>(() => {
    const matchedHub = hubNavItems.find((hub) => pathInHub(location.pathname, hub))
    return {
      hubId: (matchedHub?.hub as HubId) ?? null,
      dataAttr: matchedHub?.hub ?? '',
    }
  }, [location.pathname])

  return (
    <HubThemeContext.Provider value={value}>
      <div data-hub={value.dataAttr} className="hallmark-selection hallmark-scrollbar">
        {children}
      </div>
    </HubThemeContext.Provider>
  )
}