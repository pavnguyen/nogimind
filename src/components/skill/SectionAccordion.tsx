import { useState, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

type Props = {
  id: string
  title: string
  badge?: string
  defaultOpen?: boolean
  children: ReactNode
  accentColor?: 'gold' | 'jade' | 'sea' | 'steel' | 'moss' | 'copper' | 'warm'
  titleRight?: ReactNode
}

const accentMap = {
  gold: 'border-gold-400/18 hover:border-gold-300/32',
  jade: 'border-jade-400/18 hover:border-jade-300/32',
  sea: 'border-sea-400/18 hover:border-sea-300/32',
  steel: 'border-steel-400/18 hover:border-steel-300/32',
  moss: 'border-moss-400/18 hover:border-moss-300/32',
  copper: 'border-copper-400/18 hover:border-copper-300/32',
  warm: 'border-warm-50/[0.08] hover:border-warm-50/16',
}

const dotMap = {
  gold: 'bg-gold-400',
  jade: 'bg-jade-400',
  sea: 'bg-sea-400',
  steel: 'bg-steel-400',
  moss: 'bg-moss-400',
  copper: 'bg-copper-400',
  warm: 'bg-warm-400',
}

export const SectionAccordion = ({
  id,
  title,
  badge,
  defaultOpen = false,
  children,
  accentColor = 'warm',
  titleRight,
}: Props) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section
      id={id}
      className={cn(
        // scroll-mt keeps the sticky skill tabs bar from covering the section
        // when a search deep link scrolls to this anchor.
        'scroll-mt-32 overflow-hidden rounded-2xl border bg-warm-950/35 shadow-[0_18px_45px_rgba(13,12,10,0.18)] transition-colors duration-200',
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
        <span className="flex-1 text-[15px] font-semibold tracking-tight text-warm-100">{title}</span>
        {badge && (
          <span className="rounded-md bg-warm-50/[0.04] px-2 py-0.5 text-[11px] font-medium text-warm-400">{badge}</span>
        )}
        {titleRight}
        <svg
          className={`ml-auto h-4 w-4 shrink-0 text-warm-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div id={`accordion-content-${id}`} className="border-t border-warm-50/[0.06] px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
          {children}
        </div>
      )}
    </section>
  )
}
