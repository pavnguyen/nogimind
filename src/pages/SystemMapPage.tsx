import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { SectionCard } from '../components/common/SectionCard'
import { PageShell } from '../components/common/PageShell'
import { Waypoints } from 'lucide-react'

const mapLinks = [
  { key: 'positions', to: '/positions' },
  { key: 'skills', to: '/skills' },
  { key: 'chains', to: '/chains' },
  { key: 'escapeMaps', to: '/escape-maps' },
  { key: 'archetypes', to: '/archetypes' },
  { key: 'mastery', to: '/mastery' },
]

export default function SystemMapPage() {
  const { t } = useTranslation()

  return (
    <PageShell
      header={
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-lg">
              <Waypoints className="h-5 w-5 text-slate-950" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">{t('modeUx.map.heading')}</h1>
              <p className="text-sm text-slate-400">{t('modeUx.map.subtitle')}</p>
            </div>
          </div>
        </div>
      }
    >
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
    </PageShell>
  )
}
