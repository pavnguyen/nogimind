import { cn } from '../../utils/cn'

type ProgressBarProps = {
  value: number
  max?: number
  className?: string
}

export const ProgressBar = ({ value, max = 5, className }: ProgressBarProps) => {
  const percent = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className={cn('h-2 overflow-hidden rounded-full bg-slate-800', className)}>
      <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300" style={{ width: `${percent}%` }} />
    </div>
  )
}
