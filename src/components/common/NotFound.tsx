import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'

type NotFoundProps = {
  title?: string
  body?: string
  to?: string
  label?: string
}

export const NotFound = ({ title, body, to = '/', label }: NotFoundProps) => {
  const { t } = useTranslation()
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-white">{title ?? t('common.notFoundTitle')}</h1>
      <p className="mt-3 text-slate-400">{body ?? t('common.notFoundBody')}</p>
      <Link
        to={to}
        className="mt-6 inline-flex items-center gap-2 rounded-md border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 hover:bg-cyan-400/15"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {label ?? t('nav.dashboard')}
      </Link>
    </div>
  )
}
