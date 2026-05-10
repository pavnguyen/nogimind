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
} from 'lucide-react'

export const navGroups = [
  {
    key: 'navGroups.main',
    items: [
      { to: '/', key: 'nav.overview', icon: Home },
      { to: '/study', key: 'nav.study', icon: Compass },
      { to: '/fix', key: 'nav.fix', icon: HelpCircle },
      { to: '/map', key: 'nav.mapMode', icon: Waypoints },
      { to: '/search', key: 'nav.search', icon: Search },
      { to: '/reference', key: 'nav.referenceMode', icon: BookOpen },
      { to: '/settings', key: 'nav.settings', icon: Settings },
    ],
  },
]

export const brandIcon = BrainCircuit
export const collapsedIcon = Layers3
