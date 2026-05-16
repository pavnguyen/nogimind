import {
  BookOpen,
  BrainCircuit,
  Compass,
  Layers3,
  Settings,
  Wrench,
  Zap,
} from 'lucide-react'

export type HubNavItem = {
  hub: string
  labelKey: string
  icon: typeof Compass
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
    icon: Compass,
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
    icon: Zap,
    to: '/study',
    items: [
      { key: 'nav.study', to: '/study' },
      { key: 'nav.skills', to: '/skills' },
      { key: 'nav.chains', to: '/chains' },
    ],
  },
  {
    hub: 'fix',
    labelKey: 'nav.fix',
    icon: Wrench,
    to: '/fix',
    items: [
      { key: 'nav.troubleshooters', to: '/troubleshooters' },
      { key: 'nav.escapeMaps', to: '/escape-maps' },
      { key: 'nav.defense', to: '/defense' },
    ],
  },
  {
    hub: 'build',
    labelKey: 'nav.build',
    icon: Layers3,
    to: '/build',
    items: [
      { key: 'nav.archetypes', to: '/archetypes' },
      { key: 'nav.mastery', to: '/mastery' },
    ],
  },
  {
    hub: 'reference',
    labelKey: 'nav.reference',
    icon: BookOpen,
    to: '/reference',
    items: [
      { key: 'nav.glossary', to: '/glossary' },
      { key: 'nav.search', to: '/search' },
      { key: 'nav.about', to: '/about' },
    ],
  },
]

/**
 * Legacy flat nav items — preserved for backward compatibility.
 * Prefer hubNavItems for new code.
 */
export const primaryNavItems = hubNavItems.flatMap((hub) => [
  { to: hub.to, key: hub.labelKey, icon: hub.icon },
  ...hub.items.map((item) => ({ to: item.to, key: item.key, icon: hub.icon })),
])

export const settingsNavItem = { to: '/settings', key: 'nav.settings', icon: Settings }

export const brandIcon = BrainCircuit

/**
 * Check if a pathname belongs to a given hub.
 */
export function pathInHub(pathname: string, hub: HubNavItem): boolean {
  if (pathname === hub.to) return true
  return hub.items.some((item) => pathname === item.to || pathname.startsWith(item.to + '/'))
}
