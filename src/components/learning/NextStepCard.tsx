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
  <Link to={to} className="block rounded-lg border border-warm-50/10 bg-warm-950/65 p-4 transition hover:border-gold-300/35 hover:bg-warm-50/[0.06]">
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        {badge ? <Badge tone="gold">{badge}</Badge> : null}
        <p className="mt-2 text-sm font-semibold text-warm-50">{title}</p>
        <p className="mt-2 text-sm leading-6 text-warm-400">{body}</p>
      </div>
      <ArrowRight className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
    </div>
  </Link>
)
