import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { hubNavItems, pathInHub } from '../components/layout/navItems'
import type { HubId } from '../contexts/HubThemeContext'

// ── Theme metadata ────────────────────────────────────────────────────────

export interface HallmarkThemeInfo {
  hubId: HubId | null
  /** Human-readable label for the theme */
  themeName: string
  /** CSS `accent` color value (oklch) */
  accent: string
  /** Tailwind-compatible accent name for constructing classes */
  accentName: string
  /** Display font family name */
  displayFont: string
  /** Whether this theme uses italic display by default */
  displayItalic: boolean
}

const themeRegistry: Record<HubId, Omit<HallmarkThemeInfo, 'hubId'>> = {
  learn: {
    themeName: 'Gold',
    accent: '#e8b05c',
    accentName: 'gold',
    displayFont: 'Archivo',
    displayItalic: false,
  },
  study: {
    themeName: 'Jade',
    accent: '#3ec9b6',
    accentName: 'jade',
    displayFont: 'Archivo',
    displayItalic: false,
  },
  defense: {
    themeName: 'Copper',
    accent: '#e07a4e',
    accentName: 'copper',
    displayFont: 'Archivo',
    displayItalic: false,
  },
  build: {
    themeName: 'Steel',
    accent: '#7fa9e0',
    accentName: 'steel',
    displayFont: 'Archivo',
    displayItalic: false,
  },
  reference: {
    themeName: 'Sand',
    accent: '#b0a99b',
    accentName: 'sand',
    displayFont: 'Archivo',
    displayItalic: false,
  },
}

/**
 * Returns the current Hallmark theme info based on the active route.
 * Useful for components that need to know their theme programmatically
 * (e.g. to construct dynamic Tailwind classes or pick accent-aware icons).
 */
export const useHubTheme = (): HallmarkThemeInfo => {
  const location = useLocation()

  return useMemo(() => {
    const matchedHub = hubNavItems.find((hub) => pathInHub(location.pathname, hub))
    const hubId = matchedHub?.hub as HubId | undefined

    if (!hubId || !themeRegistry[hubId]) {
      // Fallback: dashboard / unmatched route
      return {
        hubId: null,
        themeName: 'Base',
        accent: '#b0a99b',
        accentName: 'sand',
        displayFont: 'Archivo',
        displayItalic: false,
      }
    }

    return { hubId, ...themeRegistry[hubId] }
  }, [location.pathname])
}

/**
 * Returns the CSS variable string for a given token name.
 * Use this to construct inline styles that reference the current hub's theme token.
 *
 * @example
 * const accentColor = getThemeVar('--hallmark-accent')
 * // → 'var(--hallmark-accent)'
 */
export const getThemeVar = (token: `--hallmark-${string}`): string => `var(${token})`

/**
 * Returns a Tailwind class-safe accent prefix for constructing dynamic classes.
 *
 * @example
 * const prefix = getAccentPrefix() // 'gold' when on Learn hub
 * // → `border-${prefix}-400/20 bg-${prefix}-400/10`
 */
export const useAccentPrefix = (): string => {
  const theme = useHubTheme()
  return theme.accentName
}
