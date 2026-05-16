import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Wrench, BugPlay, Shield, Map as MapIcon } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { PageShell } from '../components/common/PageShell'

const fixLinks = [
  { key: 'troubleshooters', to: '/troubleshooters', icon: BugPlay },
  { key: 'escapeMaps', to: '/escape-maps', icon: MapIcon },
  { key: 'defense', to: '/defense', icon: Shield },
]

export default function FixHubPage() {
  const { t } = useTranslation()

  return (
    <PageShell
      header={
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/20">
              <Wrench className="h-6 w-6 text-slate-950" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge tone="amber">Diagnose & Repair</Badge>
              </div>
              <h1 className="mt-2 display-heading text-3xl font-extrabold text-white lg:text-4xl">{t('modeUx.fix.heading')}</h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-400">{t('modeUx.fix.subtitle')}</p>
            </div>
          </div>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {fixLinks.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.key}
              to={item.to}
              className="card-hover group relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/60 p-6 transition-all duration-200 hover:border-amber-400/30 hover:bg-amber-400/[0.04]"
            >
              {/* Subtle corner gradient */}
              <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-amber-400/5 blur-2xl transition-all duration-300 group-hover:bg-amber-400/10" />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h2 className="text-lg font-semibold text-white group-hover:text-amber-100 transition-colors">{t(`modeUx.reference.items.${item.key}.title`)}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{t(`modeUx.reference.items.${item.key}.body`)}</p>
                </div>
                <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-amber-300/50 transition-all group-hover:translate-x-0.5 group-hover:text-amber-300" aria-hidden="true" />
              </div>
            </Link>
          )
        })}
      </div>
    </PageShell>
  )
}
