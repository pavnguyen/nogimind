import { useState, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

type Props = {
  id: string
  title: string
  badge?: string
  defaultOpen?: boolean
  children: ReactNode
  accentColor?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'violet' | 'slate'
  titleRight?: ReactNode
}

const accentMap = {
  cyan: 'border-cyan-400/18 hover:border-cyan-300/32',
  emerald: 'border-emerald-400/18 hover:border-emerald-300/32',
  amber: 'border-amber-400/18 hover:border-amber-300/32',
  rose: 'border-rose-400/18 hover:border-rose-300/32',
  violet: 'border-violet-400/18 hover:border-violet-300/32',
  slate: 'border-white/[0.08] hover:border-white/16',
}

const dotMap = {
  cyan: 'bg-cyan-400',
  emerald: 'bg-emerald-400',
  amber: 'bg-amber-400',
  rose: 'bg-rose-400',
  violet: 'bg-violet-400',
  slate: 'bg-slate-400',
}

export const SectionAccordion = ({
  id,
  title,
  badge,
  defaultOpen = false,
  children,
  accentColor = 'slate',
  titleRight,
}: Props) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section
      id={id}
      className={cn(
        'overflow-hidden rounded-2xl border bg-slate-950/35 shadow-[0_18px_45px_rgba(2,6,23,0.18)] transition-colors duration-200',
        accentMap[accentColor],
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left sm:px-5"
        aria-expanded={open}
        aria-controls={`accordion-content-${id}`}
      >
        <span className={`h-2 w-2 shrink-0 rounded-full ${dotMap[accentColor]} shadow-[0_0_16px_currentColor]`} />
        <span className="flex-1 text-[15px] font-semibold tracking-tight text-slate-100">{title}</span>
        {badge && (
          <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-slate-400">{badge}</span>
        )}
        {titleRight}
        <svg
          className={`ml-auto h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div id={`accordion-content-${id}`} className="border-t border-white/[0.06] px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
          {children}
        </div>
      )}
    </section>
  )
}
