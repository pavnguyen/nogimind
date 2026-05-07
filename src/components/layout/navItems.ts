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
  Zap,
} from 'lucide-react'

export const navGroups = [
  {
    key: 'navGroups.train',
    items: [
      { to: '/', key: 'nav.dashboard', icon: Home },
      { to: '/search', key: 'nav.search', icon: Search },
      { to: '/skills', key: 'nav.skills', icon: Map },
      { to: '/micro-details', key: 'nav.microDetails', icon: Sparkles },
      { to: '/troubleshooters', key: 'nav.troubleshooters', icon: HelpCircle },
    ],
  },
  {
    key: 'navGroups.map',
    items: [
      { to: '/positions', key: 'nav.positions', icon: MapPinned },
      { to: '/chains', key: 'nav.chains', icon: Route },
      { to: '/escape-maps', key: 'nav.escapeMaps', icon: ShieldCheck },
      { to: '/game-tree', key: 'nav.gameTree', icon: GitBranch },
    ],
  },
  {
    key: 'navGroups.systems',
    items: [
      { to: '/skills?library=modern_expansion', key: 'nav.modernSystems', icon: Zap },
      { to: '/archetypes', key: 'nav.archetypes', icon: Fingerprint },
      { to: '/mastery', key: 'nav.mastery', icon: Target },
      { to: '/learn', key: 'nav.learn', icon: Compass },
    ],
  },
  {
    key: 'navGroups.reference',
    items: [
      { to: '/concepts', key: 'nav.concepts', icon: Lightbulb },
      { to: '/glossary', key: 'nav.glossary', icon: BookOpen },
      { to: '/settings', key: 'nav.settings', icon: Settings },
      { to: '/philosophy', key: 'nav.philosophy', icon: Info },
    ],
  },
]

export const brandIcon = BrainCircuit
export const collapsedIcon = Layers3
