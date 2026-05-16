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

/** Skeleton for a stat card (number + label) */
export const SkeletonStat = ({ className }: { className?: string }) => (
  <div className={cn('rounded-lg border border-white/10 bg-white/[0.04] p-4 shadow-glow', className)}>
    <Skeleton lines={1} className="mb-3 w-1/2" />
    <SkeletonBlock className="mb-2 h-8 w-16 rounded" />
    <Skeleton lines={1} className="w-1/3" />
  </div>
)

/** Skeleton for a hub card (used in hub landing pages) */
export const SkeletonHubCard = ({ className }: { className?: string }) => (
  <div className={cn('rounded-lg border border-white/10 bg-slate-950/60 p-5', className)}>
    <Skeleton lines={1} className="mb-3 w-1/3" />
    <Skeleton lines={3} lastLineWidth={50} />
  </div>
)

/** Full-page loading skeleton */
export const PageSkeleton = ({ className }: { className?: string }) => (
  <div className={cn('animate-fade-in space-y-6 p-6', className)}>
    {/* Header skeleton */}
    <div className="flex items-center gap-3">
      <SkeletonBlock className="h-10 w-10 rounded-xl" />
      <div className="flex-1">
        <Skeleton lines={1} className="w-1/3" />
        <Skeleton lines={1} className="mt-1 w-2/3" />
      </div>
    </div>
    {/* Grid of cards */}
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      <SkeletonHubCard />
      <SkeletonHubCard />
      <SkeletonHubCard />
    </div>
  </div>
)
