import type { PropsWithChildren, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

type SectionCardProps = PropsWithChildren<{
  title?: ReactNode
  description?: ReactNode
  action?: ReactNode
  className?: string
  to?: string
}>

export const SectionCard = ({ title, description, action, className, to, children }: SectionCardProps) => {
  const Component = to ? Link : 'section'
  
  return (
    <Component 
      to={to as string}
      className={cn(
        'rounded-lg border border-warm-50/10 bg-warm-950/55 p-5 shadow-glow',
        to && 'group block transition-all hover:border-gold-400/20 hover:bg-warm-50/[0.06]',
        className
      )}
    >
      {(title || description || action) && (
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title ? <h2 className={cn("text-lg font-semibold text-warm-50", to && "group-hover:text-gold transition-colors")}>{title}</h2> : null}
            {description ? <p className="mt-1 text-sm leading-6 text-warm-400">{description}</p> : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      )}
      {children}
    </Component>
  )
}
