import { SearchX } from 'lucide-react'

type EmptyStateProps = {
  title: string
  description?: string
}

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className="flex min-h-44 flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-950/40 p-8 text-center">
    <SearchX className="h-8 w-8 text-slate-500" aria-hidden="true" />
    <p className="mt-3 font-medium text-slate-200">{title}</p>
    {description ? <p className="mt-1 max-w-md text-sm text-slate-400">{description}</p> : null}
  </div>
)
