import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../components/common/Badge'

const referenceLinks = [
  { key: 'glossary', to: '/glossary' },
  { key: 'microDetails', to: '/micro-details' },
  { key: 'concepts', to: '/concepts' },
  { key: 'defense', to: '/defense' },
  { key: 'search', to: '/search' },
  { key: 'philosophy', to: '/philosophy' },
]

export default function ReferencePage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-5">
      <div>
        <Badge tone="emerald">{t('nav.referenceMode')}</Badge>
        <h1 className="mt-3 text-3xl font-semibold text-white">{t('modeUx.reference.heading')}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{t('modeUx.reference.subtitle')}</p>
      </div>
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
    </div>
  )
}
