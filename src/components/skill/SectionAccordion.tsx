import { useState, type ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { SECTION_ACCENTS, type SectionAccent } from './sectionAccents'

type Props = {
  id: string
  title: string
  badge?: string
  defaultOpen?: boolean
  /** Controlled open state; when set the parent owns the value. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /**
   * One-line hint shown while the section is collapsed, so a closed section
   * still tells the reader what is inside.
   */
  preview?: string
  children: ReactNode
  accentColor?: SectionAccent
  titleRight?: ReactNode
}

export const SectionAccordion = ({
  id,
  title,
  badge,
  defaultOpen = false,
  open,
  onOpenChange,
  preview,
  children,
  accentColor = 'warm',
  titleRight,
}: Props) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const accent = SECTION_ACCENTS[accentColor]

  const toggle = () => {
    if (!isControlled) setInternalOpen(!isOpen)
    onOpenChange?.(!isOpen)
  }

  return (
    <section
      id={id}
      className={cn(
        // scroll-mt keeps the sticky skill tabs bar from covering the section
        // when a search deep link or the section rail scrolls to this anchor.
        'scroll-mt-32 overflow-hidden rounded-2xl border bg-warm-950/35 shadow-[0_18px_45px_rgba(13,12,10,0.18)] transition-colors duration-200',
        accent.border,
      )}
    >
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center gap-3 px-3.5 py-3 text-left transition-colors hover:bg-warm-50/[0.02] sm:px-5 sm:py-3.5"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
      >
        <span className={cn('h-2 w-2 shrink-0 rounded-full shadow-[0_0_16px_currentColor]', accent.dot)} />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="truncate text-[15px] font-semibold tracking-tight text-warm-100">{title}</span>
            {badge && (
              <span className="shrink-0 rounded-md bg-warm-50/[0.05] px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-warm-400">
                {badge}
              </span>
            )}
          </span>
          {!isOpen && preview && (
            <span className="mt-0.5 block truncate text-[12px] leading-5 text-warm-500">{preview}</span>
          )}
        </span>
        {titleRight}
        <svg
          className={cn('ml-1 h-4 w-4 shrink-0 text-warm-500 transition-transform duration-200', isOpen && 'rotate-180')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          id={`accordion-content-${id}`}
          className="animate-fadeIn border-t border-warm-50/[0.06] px-3.5 pb-3.5 pt-3.5 sm:px-5 sm:pb-5 sm:pt-4"
        >
          {children}
        </div>
      )}
    </section>
  )
}
