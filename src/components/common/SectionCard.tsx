import type { PropsWithChildren, ReactNode } from 'react'
import { cn } from '../../utils/cn'

type SectionCardProps = PropsWithChildren<{
  title?: ReactNode
  description?: ReactNode
  action?: ReactNode
  className?: string
}>

export const SectionCard = ({ title, description, action, className, children }: SectionCardProps) => (
  <section className={cn('rounded-lg border border-white/10 bg-slate-950/55 p-5 shadow-glow', className)}>
    {(title || description || action) && (
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {title ? <h2 className="text-lg font-semibold text-white">{title}</h2> : null}
          {description ? <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    )}
    {children}
  </section>
)
