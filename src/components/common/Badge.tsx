import type { PropsWithChildren } from 'react'
import { cn } from '../../utils/cn'

type BadgeProps = PropsWithChildren<{
  tone?: 'emerald' | 'cyan' | 'slate' | 'amber' | 'rose' | 'violet'
  className?: string
}>

const tones = {
  emerald: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200',
  cyan: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-200',
  slate: 'border-slate-400/20 bg-slate-400/10 text-slate-200',
  amber: 'border-amber-400/25 bg-amber-400/10 text-amber-200',
  rose: 'border-rose-400/25 bg-rose-400/10 text-rose-200',
  violet: 'border-violet-400/25 bg-violet-400/10 text-violet-200',
}

export const Badge = ({ children, tone = 'slate', className }: BadgeProps) => (
  <span className={cn('inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium', tones[tone], className)}>
    {children}
  </span>
)
