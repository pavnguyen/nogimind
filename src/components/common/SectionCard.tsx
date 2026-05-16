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
        'rounded-lg border border-white/10 bg-slate-950/55 p-5 shadow-glow',
        to && 'group block transition-all hover:border-cyan-400/20 hover:bg-white/[0.06]',
        className
      )}
    >
      {(title || description || action) && (
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title ? <h2 className={cn("text-lg font-semibold text-white", to && "group-hover:text-cyan-300 transition-colors")}>{title}</h2> : null}
            {description ? <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p> : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      )}
      {children}
    </Component>
  )
}
