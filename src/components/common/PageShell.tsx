import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Badge } from './Badge'

type BadgeTone = 'emerald' | 'cyan' | 'amber' | 'rose' | 'slate'

type PageShellProps = {
  children: ReactNode
  className?: string
  /** Optional top-level header / hero */
  header?: ReactNode
  /** Show with animation */
  animate?: boolean
  /** Back navigation */
  backTo?: string
  backLabel?: string
  /** Title & subtitle for auto-header */
  title?: string
  subtitle?: string
  /** Optional badge in the header */
  badge?: string
  badgeTone?: BadgeTone
  /**
   * Skip the inner content wrapper div so children can use CSS grid/flex layout directly.
   * Use this for pages that need a custom multi-column layout.
   */
  fullWidth?: boolean
}

export const PageShell = ({
  children,
  className,
  header,
  animate = true,
  backTo,
  backLabel,
  title,
  subtitle,
  badge,
  badgeTone,
  fullWidth,
}: PageShellProps) => {
  const showHeader = header || title

  return (
    <div className={cn('space-y-6', animate && 'animate-fade-in', className)}>
      {showHeader ? (
        <div className="animate-slide-down space-y-3">
          {header ? (
            header
          ) : (
            <div>
              {backTo ? (
                <Link
                  to={backTo}
                  className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-slate-200"
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  {backLabel ?? 'Back'}
                </Link>
              ) : null}
              <div className="flex items-center gap-3">
                {badge ? (
                  <Badge tone={badgeTone ?? 'slate'}>{badge}</Badge>
                ) : null}
                <div>
                  {title ? (
                    <h1 className="text-2xl font-semibold tracking-tight text-white">
                      {title}
                    </h1>
                  ) : null}
                  {subtitle ? (
                    <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
      {fullWidth ? (
        children
      ) : (
        <div className="space-y-5">{children}</div>
      )}
    </div>
  )
}
