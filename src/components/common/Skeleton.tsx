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

type SkeletonCardVariant = 'default' | 'row'

type SkeletonCardProps = {
  /** Card layout variant */
  variant?: SkeletonCardVariant
  /** Number of body text lines (default: 2, ignored for 'row') */
  lines?: number
  /** Width of the last body line in percent */
  lastLineWidth?: number
  /** Show an icon skeleton (for 'row' variant) */
  withIcon?: boolean
  /** Show a right-arrow/action skeleton (for 'row' variant) */
  withAction?: boolean
  className?: string
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
export const SkeletonCard = ({
  variant = 'default',
  lines = 3,
  lastLineWidth = 40,
  withIcon = false,
  withAction = false,
  className,
}: SkeletonCardProps) => {
  switch (variant) {
    case 'row':
      return (
        <div className={cn('rounded-2xl border border-white/[0.04] bg-white/[0.02] px-5 py-4', className)}>
          <div className="mb-3 flex items-center gap-3">
            {withIcon && <Skeleton variant="card" className="!h-9 !w-9 !rounded-xl shrink-0" />}
            <Skeleton variant="card" className="!h-3 max-w-[120px] flex-1" />
            {withAction && <Skeleton variant="card" className="!h-4 !w-4 !rounded ml-auto shrink-0" />}
          </div>
          <div className="flex-1">
            <Skeleton variant="card" className="!h-4 !w-3/4" />
          </div>
        </div>
      )
    default:
      return (
        <div className={cn('rounded-lg border border-white/10 bg-slate-950/55 p-5 shadow-glow', className)}>
          <Skeleton lines={1} className="mb-4 w-2/3" />
          <Skeleton lines={lines} lastLineWidth={lastLineWidth} />
        </div>
      )
  }
}


