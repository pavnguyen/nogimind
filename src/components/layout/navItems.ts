import { Settings } from 'lucide-react'
import type { HubId } from '../../contexts/HubThemeContext'
import { BjjBrandMark, BjjChain, BjjEscape, BjjGrip, BjjGuard, BjjMount } from '../icons/bjj'

export type HubNavItem = {
  hub: HubId
  labelKey: string
  icon: typeof BjjGuard
  to: string
  items: { key: string; to: string }[]
}

/**
 * Hub-and-spoke navigation structure.
 * Each hub has a landing page and sub-items shown in sidebar/mobile nav.
 */
export const hubNavItems: HubNavItem[] = [
  {
    hub: 'learn',
    labelKey: 'nav.learn',
    icon: BjjGuard,
    to: '/learn',
    items: [
      { key: 'nav.learningPath', to: '/learn' },
      { key: 'nav.positions', to: '/positions' },
      { key: 'nav.concepts', to: '/concepts' },
    ],
  },
  {
    hub: 'study',
    labelKey: 'nav.study',
    icon: BjjChain,
    to: '/study',
    items: [
      { key: 'nav.study', to: '/study' },
      { key: 'nav.skills', to: '/skills' },
    ],
  },
  {
    hub: 'defense',
    labelKey: 'nav.defense',
    icon: BjjEscape,
    to: '/defense',
    items: [{ key: 'nav.defense', to: '/defense' }],
  },
  {
    hub: 'build',
    labelKey: 'nav.build',
    icon: BjjMount,
    to: '/build',
    items: [
      { key: 'nav.archetypes', to: '/archetypes' },
    ],
  },
  {
    hub: 'reference',
    labelKey: 'nav.reference',
    icon: BjjGrip,
    to: '/reference',
    items: [
      { key: 'nav.glossary', to: '/glossary' },
      { key: 'nav.search', to: '/search' },
      { key: 'nav.about', to: '/about' },
    ],
  },
]

/**
 * Legacy flat nav items, preserved for backward compatibility.
 * Prefer hubNavItems for new code.
 */
export const primaryNavItems = hubNavItems.flatMap((hub) => [
  { to: hub.to, key: hub.labelKey, icon: hub.icon },
  ...hub.items.map((item) => ({ to: item.to, key: item.key, icon: hub.icon })),
])

export const settingsNavItem = { to: '/settings', key: 'nav.settings', icon: Settings }

export const brandIcon = BjjBrandMark

/**
 * Check if a pathname belongs to a given hub.
 */
export function pathInHub(pathname: string, hub: HubNavItem): boolean {
  if (pathname === hub.to) return true
  return hub.items.some((item) => pathname === item.to || pathname.startsWith(item.to + '/'))
}
