import type { PropsWithChildren } from 'react'
import { cn } from '../../utils/cn'

export type BadgeTone = 'hallmark' | 'emerald' | 'cyan' | 'slate' | 'amber' | 'rose' | 'violet' | 'sky' | 'teal' | 'indigo' | 'blue' | 'green' | 'orange' | 'red' | 'pink' | 'purple'

type BadgeProps = PropsWithChildren<{
  tone?: BadgeTone
  className?: string
}>

const tones: Record<BadgeTone, string> = {
  hallmark: 'hallmark-badge',
  emerald: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200',
  cyan: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-200',
  slate: 'border-slate-400/20 bg-slate-400/10 text-slate-200',
  amber: 'border-amber-400/25 bg-amber-400/10 text-amber-200',
  rose: 'border-rose-400/25 bg-rose-400/10 text-rose-200',
  violet: 'border-violet-400/25 bg-violet-400/10 text-violet-200',
  sky: 'border-sky-400/25 bg-sky-400/10 text-sky-200',
  teal: 'border-teal-400/25 bg-teal-400/10 text-teal-200',
  indigo: 'border-indigo-400/25 bg-indigo-400/10 text-indigo-200',
  blue: 'border-blue-400/25 bg-blue-400/10 text-blue-200',
  green: 'border-green-400/25 bg-green-400/10 text-green-200',
  orange: 'border-orange-400/25 bg-orange-400/10 text-orange-200',
  red: 'border-red-400/25 bg-red-400/10 text-red-200',
  pink: 'border-pink-400/25 bg-pink-400/10 text-pink-200',
  purple: 'border-purple-400/25 bg-purple-400/10 text-purple-200',
}

export const Badge = ({ children, tone = 'hallmark', className }: BadgeProps) => (
  <span className={cn('inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium', tones[tone], className)}>
    {children}
  </span>
)
