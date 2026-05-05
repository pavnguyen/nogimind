import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

type StatCardProps = {
  label: string
  value: ReactNode
  helper?: ReactNode
  className?: string
}

export const StatCard = ({ label, value, helper, className }: StatCardProps) => (
  <div className={cn('rounded-lg border border-white/10 bg-white/[0.04] p-4 shadow-glow', className)}>
    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
    <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
    {helper ? <div className="mt-2 text-sm text-slate-400">{helper}</div> : null}
  </div>
)
