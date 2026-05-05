import { CheckCircle2, CircleAlert, ShieldCheck } from 'lucide-react'
import { cn } from '../../utils/cn'

type MechanicsChecklistProps = {
  items: string[]
  tone?: 'check' | 'danger' | 'safety'
}

const toneStyles = {
  check: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100',
  danger: 'border-rose-400/20 bg-rose-400/10 text-rose-100',
  safety: 'border-amber-400/20 bg-amber-400/10 text-amber-100',
}

const icons = {
  check: CheckCircle2,
  danger: CircleAlert,
  safety: ShieldCheck,
}

export const MechanicsChecklist = ({ items, tone = 'check' }: MechanicsChecklistProps) => {
  const Icon = icons[tone]
  return (
    <ul className="grid gap-2 md:grid-cols-2">
      {items.map((item) => (
        <li key={item} className={cn('flex gap-2 rounded-md border p-3 text-sm leading-6', toneStyles[tone])}>
          <Icon className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
