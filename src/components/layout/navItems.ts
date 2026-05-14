import {
  BookOpen,
  BrainCircuit,
  Compass,
  Home,
  Layers3,
  Search,
  Settings,
} from 'lucide-react'

/** Primary navigation items (shown in sidebar and bottom nav) */
export const primaryNavItems = [
  { to: '/', key: 'nav.dashboard', icon: Home },
  { to: '/search', key: 'nav.search', icon: Search },
  { to: '/skills', key: 'nav.skills', icon: Layers3 },
  { to: '/study', key: 'nav.study', icon: Compass },
  { to: '/reference', key: 'nav.reference', icon: BookOpen },
]

/** Secondary navigation groups for sidebar expansion */
export const secondaryNavGroups: never[] = []

export const settingsNavItem = { to: '/settings', key: 'nav.settings', icon: Settings }

export const brandIcon = BrainCircuit
export const collapsedIcon = Layers3
