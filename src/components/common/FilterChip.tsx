import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

type FilterChipProps = {
  active?: boolean
  onClick: () => void
  children: ReactNode
  className?: string
}

/**
 * Category chip for catalogue filter rows (Standing, Bottom Guard, ...).
 *
 * Active and inactive chips keep the exact same height, radius and padding, so
 * switching filters never shifts the row. Hover only changes colours: no
 * shadow and no `transition-all`, which is what used to make the active chip's
 * glow bleed over its neighbours.
 */
export const FilterChip = ({ active = false, onClick, children, className }: FilterChipProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      'inline-flex min-h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-3.5 text-xs font-medium transition-colors duration-150',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300',
      active
        ? 'border-transparent bg-gold-500 text-on-accent'
        : 'border-warm-50/[0.08] bg-warm-900/40 text-warm-300 hover:border-warm-50/20 hover:bg-warm-50/[0.07] hover:text-warm-50',
      className,
    )}
  >
    {children}
  </button>
)

type FilterChipRowProps = {
  /** Accessible name for the group of chips, e.g. "Filters". */
  label: string
  children: ReactNode
  className?: string
}

/**
 * Holds a set of `FilterChip`s.
 *
 * Phones: one swipeable line. The row is inset by the same 4px it pads
 * (`-mx-1` + `px-1`) so the first and last chip stay fully visible, and the
 * scrollbar is hidden instead of drawing a band under the chips.
 *
 * `sm` and up: the chips wrap, so on a desktop or tablet no category is hidden
 * off the right edge of the row.
 */
export const FilterChipRow = ({ label, children, className }: FilterChipRowProps) => (
  <div
    role="group"
    aria-label={label}
    className={cn(
      '-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0',
      className,
    )}
  >
    {children}
  </div>
)
