import { useState, type ReactNode } from 'react'

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
  cyan: 'border-cyan-500/30 hover:border-cyan-400/50',
  emerald: 'border-emerald-500/30 hover:border-emerald-400/50',
  amber: 'border-amber-500/30 hover:border-amber-400/50',
  rose: 'border-rose-500/30 hover:border-rose-400/50',
  violet: 'border-violet-500/30 hover:border-violet-400/50',
  slate: 'border-white/10 hover:border-white/20',
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
      className={`rounded-xl border transition-colors duration-200 ${accentMap[accentColor]} bg-slate-900/50`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className={`h-2 w-2 shrink-0 rounded-full ${dotMap[accentColor]}`} />
        <span className="flex-1 text-sm font-semibold tracking-wide text-white">{title}</span>
        {badge && (
          <span className="rounded-md bg-white/8 px-2 py-0.5 text-xs text-slate-400">{badge}</span>
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
        <div className="border-t border-white/8 px-5 pb-5 pt-4">
          {children}
        </div>
      )}
    </section>
  )
}
