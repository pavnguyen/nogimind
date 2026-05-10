import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { SectionCard } from '../components/common/SectionCard'

const mapLinks = [
  { key: 'positions', to: '/positions' },
  { key: 'skills', to: '/skills' },
  { key: 'chains', to: '/chains' },
  { key: 'escapeMaps', to: '/escape-maps' },
  { key: 'gameTree', to: '/game-tree' },
  { key: 'archetypes', to: '/archetypes' },
  { key: 'mastery', to: '/mastery' },
]

export default function SystemMapPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-5">
      <div>
        <Badge tone="cyan">{t('nav.mapMode')}</Badge>
        <h1 className="mt-3 text-3xl font-semibold text-white">{t('modeUx.map.heading')}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{t('modeUx.map.subtitle')}</p>
      </div>
      <SectionCard title={t('modeUx.map.flow')}>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {mapLinks.map((item) => (
            <Link key={item.key} to={item.to} className="rounded-lg border border-white/10 bg-slate-900/60 p-4 hover:border-cyan-300/35 hover:bg-white/[0.06]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{t(`modeUx.map.items.${item.key}.title`)}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{t(`modeUx.map.items.${item.key}.body`)}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
