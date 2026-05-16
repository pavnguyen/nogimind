import {
  BookOpen,
  BrainCircuit,
  Compass,
  Home,
  Layers3,
  Map as MapIcon,
  Search,
  Settings,
  Wrench,
  Zap,
} from 'lucide-react'

/** Primary navigation items (shown in sidebar and bottom nav) */
export const primaryNavItems = [
  { to: '/', key: 'nav.dashboard', icon: Home },
  { to: '/study', key: 'nav.study', icon: Zap, highlight: true },
  { to: '/troubleshooters', key: 'nav.troubleshooters', icon: Wrench },
  { to: '/skills', key: 'nav.skills', icon: MapIcon },
  { to: '/reference', key: 'nav.reference', icon: BookOpen },
  { to: '/search', key: 'nav.search', icon: Search },
]

/** Secondary navigation groups for sidebar expansion */
export const secondaryNavGroups: never[] = []

export const settingsNavItem = { to: '/settings', key: 'nav.settings', icon: Settings }

export const brandIcon = BrainCircuit
export const collapsedIcon = Layers3
