import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../common/Badge'

type NextStepCardProps = {
  title: string
  body: string
  to: string
  badge?: string
}

export const NextStepCard = ({ title, body, to, badge }: NextStepCardProps) => (
  <Link to={to} className="block rounded-lg border border-white/10 bg-slate-950/65 p-4 transition hover:border-cyan-300/35 hover:bg-white/[0.06]">
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        {badge ? <Badge tone="cyan">{badge}</Badge> : null}
        <p className="mt-2 text-sm font-semibold text-white">{title}</p>
        <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
      </div>
      <ArrowRight className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
    </div>
  </Link>
)
