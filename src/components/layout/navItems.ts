import {
  BookOpen,
  BrainCircuit,
  Compass,
  Fingerprint,
  GitBranch,
  HelpCircle,
  Home,
  Info,
  Layers3,
  Lightbulb,
  Map,
  MapPinned,
  Route,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react'

export const navGroups = [
  {
    key: 'navGroups.learn',
    items: [
      { to: '/', key: 'nav.dashboard', icon: Home },
      { to: '/learn', key: 'nav.learn', icon: Compass },
      { to: '/skills', key: 'nav.skills', icon: Map },
      { to: '/concepts', key: 'nav.concepts', icon: Lightbulb },
      { to: '/positions', key: 'nav.positions', icon: MapPinned },
      { to: '/glossary', key: 'nav.glossary', icon: BookOpen },
    ],
  },
  {
    key: 'navGroups.technique',
    items: [
      { to: '/micro-details', key: 'nav.microDetails', icon: Sparkles },
      { to: '/chains', key: 'nav.chains', icon: Route },
      { to: '/troubleshooters', key: 'nav.troubleshooters', icon: HelpCircle },
      { to: '/escape-maps', key: 'nav.escapeMaps', icon: ShieldCheck },
    ],
  },
  {
    key: 'navGroups.buildGame',
    items: [
      { to: '/game-tree', key: 'nav.gameTree', icon: GitBranch },
      { to: '/archetypes', key: 'nav.archetypes', icon: Fingerprint },
      { to: '/mastery', key: 'nav.mastery', icon: Target },
    ],
  },
  {
    key: 'navGroups.system',
    items: [
      { to: '/search', key: 'nav.search', icon: Search },
      { to: '/settings', key: 'nav.settings', icon: Settings },
      { to: '/philosophy', key: 'nav.philosophy', icon: Info },
    ],
  },
]

export const brandIcon = BrainCircuit
export const collapsedIcon = Layers3
