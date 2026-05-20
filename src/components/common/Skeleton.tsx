import { cn } from '../../utils/cn'

type SkeletonProps = {
  className?: string
  /** Number of skeleton lines to render */
  lines?: number
  /** Last line width as percentage (for text blocks) */
  lastLineWidth?: number
  /** Variant of skeleton */
  variant?: 'text' | 'card' | 'circle' | 'badge' | 'avatar'
}

const variantStyles = {
  text: 'h-4 w-full rounded',
  card: 'h-32 w-full rounded-xl',
  circle: 'h-10 w-10 rounded-full',
  badge: 'h-6 w-16 rounded-md',
  avatar: 'h-9 w-9 rounded-lg',
}

const SkeletonBlock = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div className={cn('skeleton-shimmer', className)} style={style} />
)

export const Skeleton = ({ className, lines = 1, lastLineWidth = 60, variant = 'text' }: SkeletonProps) => {
  if (variant !== 'text') {
    return <SkeletonBlock className={cn(variantStyles[variant], className)} />
  }

  return (
    <div className={cn('space-y-2.5', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBlock
          key={i}
          className={variantStyles.text}
          style={i === lines - 1 && lines > 1 ? { width: `${lastLineWidth}%` } : undefined}
        />
      ))}
    </div>
  )
}

/** Skeleton for a section card with header and body */
export const SkeletonCard = ({ className }: { className?: string }) => (
  <div className={cn('rounded-lg border border-white/10 bg-slate-950/55 p-5 shadow-glow', className)}>
    <Skeleton lines={1} className="mb-4 w-2/3" />
    <Skeleton lines={3} lastLineWidth={40} />
  </div>
)


