import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../common/Badge'

type PagePurposeBannerProps = {
  title: string
  purpose: string
  whenToUse: string
  bestNextStepLabel: string
  bestNextStepTo: string
  badge?: string
}

export const PagePurposeBanner = ({ title, purpose, whenToUse, bestNextStepLabel, bestNextStepTo, badge }: PagePurposeBannerProps) => {
  const { t } = useTranslation()

  return (
    <section className="rounded-lg border border-white/10 bg-slate-950/60 p-5 shadow-glow">
      <div className="flex flex-wrap items-center gap-2">
        {badge ? <Badge tone="emerald">{badge}</Badge> : null}
        <Badge tone="cyan">{t('common.pagePurpose')}</Badge>
      </div>
      <h1 className="mt-4 text-3xl font-semibold text-white">{title}</h1>
      <p className="mt-3 max-w-4xl text-lg leading-8 text-slate-300">{purpose}</p>
      <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">{whenToUse}</p>
      <div className="mt-5">
        <Link to={bestNextStepTo} className="inline-flex items-center gap-2 rounded-md border border-cyan-300/20 px-3 py-2 text-sm font-medium text-cyan-100 hover:bg-white/10">
          {bestNextStepLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
