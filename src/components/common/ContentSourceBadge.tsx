import { cn } from '../../utils/cn'

type ContentSource = 'generated' | 'legacy' | 'none'

interface ContentSourceBadgeProps {
  source: ContentSource
  className?: string
}

const labels: Record<ContentSource, string> = {
  generated: '📦 Generated',
  legacy: '📁 Legacy',
  none: '',
}

const styles: Record<ContentSource, string> = {
  generated: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
  legacy: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
  none: 'hidden',
}

/**
 * A tiny badge that shows whether content was loaded from the
 * generated pipeline or the legacy data system. Useful during
 * migration to verify the new pipeline is serving data.
 */
export function ContentSourceBadge({ source, className }: ContentSourceBadgeProps) {
  if (source === 'none') return null

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider',
        styles[source],
        className,
      )}
      title={source === 'generated' ? 'Loaded from generated content pipeline' : 'Falling back to legacy data'}
    >
      {labels[source]}
    </span>
  )
}
