import { useEffect, useState } from 'react'
import { cn } from '../../utils/cn'
import { SECTION_ACCENTS, type SectionAccent } from './sectionAccents'

export type SkillNavItem = {
  id: string
  title: string
  badge?: string
  accent: SectionAccent
}

type Props = {
  items: SkillNavItem[]
  /** Called with the section id the reader wants to see. */
  onSelect: (id: string) => void
  /**
   * `strip` is the horizontally scrollable row used on phones, `rail` the
   * vertical list pinned beside the sections on desktop.
   */
  variant: 'strip' | 'rail'
  ariaLabel: string
  className?: string
}

/**
 * Quick navigation for a long skill tab. The active entry follows the section
 * currently on screen (scroll-spy), so the reader always knows how much is left
 * without opening every accordion.
 */
export const SkillSectionNav = ({ items, onSelect, variant, ariaLabel, className }: Props) => {
  const [activeId, setActiveId] = useState<string | undefined>(items[0]?.id)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || items.length === 0) return
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null)
    if (elements.length === 0) return

    // Track what is on screen and highlight the highest one: the sticky skill
    // tabs bar covers the top of the viewport, so `rootMargin` pushes the
    // measured band below it.
    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top)
          else visible.delete(entry.target.id)
        }
        if (visible.size === 0) return
        const next = [...visible.entries()].sort((a, b) => a[1] - b[1])[0][0]
        setActiveId(next)
      },
      { rootMargin: '-150px 0px -55% 0px', threshold: 0 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [items])

  // A single section needs no navigation.
  if (items.length < 2) return null

  const select = (id: string) => {
    setActiveId(id)
    onSelect(id)
  }

  if (variant === 'strip') {
    return (
      <nav aria-label={ariaLabel} className={cn('flex gap-1.5 overflow-x-auto pb-1 scrollbar-none', className)}>
        {items.map((item) => {
          const accent = SECTION_ACCENTS[item.accent]
          const isActive = item.id === activeId
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => select(item.id)}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-colors',
                isActive
                  ? accent.chipActive
                  : 'border-warm-50/[0.07] bg-warm-50/[0.02] text-warm-400 hover:bg-warm-50/[0.05] hover:text-warm-200',
              )}
            >
              <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', accent.dot)} />
              <span className="whitespace-nowrap">{item.title}</span>
              {item.badge && <span className="tabular-nums text-warm-500">{item.badge}</span>}
            </button>
          )
        })}
      </nav>
    )
  }

  return (
    <nav aria-label={ariaLabel} className={cn('space-y-1', className)}>
      <p className="label-eyebrow px-2.5 pb-1 text-warm-500">{ariaLabel}</p>
      {items.map((item) => {
        const accent = SECTION_ACCENTS[item.accent]
        const isActive = item.id === activeId
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => select(item.id)}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'flex w-full items-center gap-2 border-l-2 border-transparent px-2.5 py-2 text-left text-[12.5px] font-medium transition-colors',
              isActive
                ? cn(accent.railActive, accent.textActive)
                : 'text-warm-400 hover:bg-warm-50/[0.04] hover:text-warm-200',
            )}
          >
            <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', accent.dot)} />
            <span className="min-w-0 flex-1 truncate">{item.title}</span>
            {item.badge && <span className="shrink-0 text-[11px] tabular-nums text-warm-500">{item.badge}</span>}
          </button>
        )
      })}
    </nav>
  )
}
