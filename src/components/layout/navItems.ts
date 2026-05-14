import {
  BookOpen,
  BrainCircuit,
  Compass,
  HelpCircle,
  Home,
  Layers3,
  Search,
  Settings,
  Waypoints,
  Shield,
  Library,
  Sword,
  Map,
} from 'lucide-react'

/** Primary navigation items (shown in sidebar and bottom nav) */
export const primaryNavItems = [
  { to: '/', key: 'nav.dashboard', icon: Home },
  { to: '/search', key: 'nav.search', icon: Search },
  { to: '/skills', key: 'nav.skills', icon: Layers3 },
  { to: '/fix', key: 'nav.fix', icon: HelpCircle },
  { to: '/study', key: 'nav.study', icon: Compass },
]

/** Secondary navigation groups for sidebar expansion */
export const secondaryNavGroups = [
  {
    key: 'navGroups.map',
    icon: Map,
    items: [
      { to: '/map', key: 'nav.mapMode', icon: Waypoints },
      { to: '/game-tree', key: 'nav.gameTree', icon: Sword },
      { to: '/mastery', key: 'nav.mastery', icon: Shield },
    ],
  },
  {
    key: 'navGroups.reference',
    icon: BookOpen,
    items: [
      { to: '/concepts', key: 'nav.concepts', icon: Library },
      { to: '/positions', key: 'nav.positions', icon: Map },
      { to: '/micro-details', key: 'nav.microDetails', icon: Layers3 },
      { to: '/chains', key: 'nav.chains', icon: BookOpen },
      { to: '/troubleshooters', key: 'nav.troubleshooters', icon: HelpCircle },
      { to: '/escape-maps', key: 'nav.escapeMaps', icon: Map },
      { to: '/archetypes', key: 'nav.archetypes', icon: Sword },
      { to: '/defense', key: 'nav.defense', icon: Shield },
      { to: '/glossary', key: 'nav.glossary', icon: BookOpen },
    ],
  },
  {
    key: 'navGroups.learn',
    icon: Compass,
    items: [
      { to: '/learn', key: 'nav.learn', icon: Compass },
      { to: '/about', key: 'nav.philosophy', icon: BookOpen },
    ],
  },
]

export const settingsNavItem = { to: '/settings', key: 'nav.settings', icon: Settings }

export const brandIcon = BrainCircuit
export const collapsedIcon = Layers3
