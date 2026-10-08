import type { PropsWithChildren } from 'react'
import { cn } from '../../utils/cn'

export type BadgeTone = 'hallmark' | 'gold' | 'jade' | 'sea' | 'steel' | 'sand' | 'moss' | 'copper' | 'warm'

type BadgeProps = PropsWithChildren<{
  tone?: BadgeTone
  className?: string
}>

const tones: Record<BadgeTone, string> = {
  hallmark: 'hallmark-badge',
  gold: 'border-gold-400/25 bg-gold-400/10 text-gold',
  jade: 'border-jade-400/25 bg-jade-400/10 text-jade',
  sea: 'border-sea-400/25 bg-sea-400/10 text-sea',
  steel: 'border-steel-400/25 bg-steel-400/10 text-steel',
  sand: 'border-sand-400/25 bg-sand-400/10 text-sand',
  moss: 'border-moss-400/25 bg-moss-400/10 text-moss',
  copper: 'border-copper-400/25 bg-copper-400/10 text-copper',
  warm: 'border-warm-400/20 bg-warm-400/10 text-warm-300',
}

export const Badge = ({ children, tone = 'hallmark', className }: BadgeProps) => (
  <span className={cn('inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium', tones[tone], className)}>
    {children}
  </span>
)
