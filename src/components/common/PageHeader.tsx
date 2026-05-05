import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Badge } from './Badge'

type PageHeaderProps = {
  title: string
  subtitle: string
  badge?: string
  whatFor?: string
  nextStepLabel?: string
  nextStepTo?: string
}

export const PageHeader = ({ title, subtitle, badge, whatFor, nextStepLabel, nextStepTo }: PageHeaderProps) => (
  <section className="rounded-lg border border-white/10 bg-slate-950/60 p-6 shadow-glow">
    {badge ? <Badge tone="emerald">{badge}</Badge> : null}
    <h1 className="mt-4 text-3xl font-semibold text-white">{title}</h1>
    <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-300">{subtitle}</p>
    {whatFor ? <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-400">{whatFor}</p> : null}
    {nextStepLabel && nextStepTo ? (
      <div className="mt-5">
        <Link to={nextStepTo} className="inline-flex items-center gap-2 rounded-md border border-cyan-300/20 px-3 py-2 text-sm font-medium text-cyan-100 hover:bg-white/10">
          {nextStepLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    ) : null}
  </section>
)
