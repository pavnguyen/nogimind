import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, BookOpen } from 'lucide-react'

import { PageShell } from '../components/common/PageShell'

const referenceLinks = [
  { key: 'concepts', to: '/concepts' },
  { key: 'positions', to: '/positions' },
  { key: 'microDetails', to: '/micro-details' },
  { key: 'chains', to: '/chains' },
  { key: 'troubleshooters', to: '/troubleshooters' },
  { key: 'escapeMaps', to: '/escape-maps' },
  { key: 'archetypes', to: '/archetypes' },
  { key: 'defense', to: '/defense' },
  { key: 'mastery', to: '/mastery' },
  { key: 'glossary', to: '/glossary' },
  { key: 'map', to: '/map' },
  { key: 'gameTree', to: '/game-tree' },
  { key: 'search', to: '/search' },
  { key: 'philosophy', to: '/philosophy' },
]

export default function ReferencePage() {
  const { t } = useTranslation()

  return (
    <PageShell
      header={
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg">
              <BookOpen className="h-5 w-5 text-slate-950" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">{t('modeUx.reference.heading')}</h1>
              <p className="text-sm text-slate-400">{t('modeUx.reference.subtitle')}</p>
            </div>
          </div>
        </div>
      }
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {referenceLinks.map((item) => (
          <Link key={item.key} to={item.to} className="rounded-lg border border-white/10 bg-slate-950/60 p-5 hover:border-emerald-300/30 hover:bg-white/[0.06]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">{t(`modeUx.reference.items.${item.key}.title`)}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{t(`modeUx.reference.items.${item.key}.body`)}</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-emerald-200" aria-hidden="true" />
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  )
}
