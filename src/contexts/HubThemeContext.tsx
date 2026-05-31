import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { hubNavItems, pathInHub } from '../components/layout/navItems'

// ── Types ─────────────────────────────────────────────────────────────────

export type HubId = 'learn' | 'study' | 'fix' | 'build' | 'reference'

export interface HubTheme {
  /** The active hub ID, or null for Dashboard/unmatched routes */
  hubId: HubId | null
  /** CSS `data-hub` attribute value to set on the wrapper */
  dataAttr: string
}

// ── Context ───────────────────────────────────────────────────────────────

const HubThemeContext = createContext<HubTheme>({ hubId: null, dataAttr: '' })

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

// ── Hook ──────────────────────────────────────────────────────────────────

export const useHubThemeContext = () => useContext(HubThemeContext)
