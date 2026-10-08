import { useTranslation } from 'react-i18next'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export const DashboardWhatsNew = () => {
  const { t } = useTranslation()

  return (
    <section className="lg:col-span-12 animate-fadeIn md:[animation-delay:100ms]">
      <div className="rounded-xl border border-sky-400/15 bg-linear-to-r from-sky-400/[0.03] to-slate-900/20 px-5 py-4">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-sky-400" />
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-sky-400">{t('dashboard.newUpdates.heading')}</h2>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          <li className="flex items-center gap-1.5 text-xs text-slate-300">
            <span className="h-1 w-1 rounded-full bg-sky-400/60 shrink-0" />
            {t('dashboard.newUpdates.item1')}
          </li>
          <li className="flex items-center gap-1.5 text-xs text-slate-300">
            <span className="h-1 w-1 rounded-full bg-sky-400/60 shrink-0" />
            <span className="min-w-0 flex-1">{t('dashboard.newUpdates.item2')}</span>
            <Link
              to="/skills/thunder-lock"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-cyan-300/35 bg-cyan-300/10 px-2.5 py-1.5 text-[11px] font-bold text-cyan-100 shadow-sm shadow-cyan-950/30 transition-colors hover:border-cyan-200/70 hover:bg-cyan-300/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
            >
              {t('dashboard.newUpdates.viewSkill')}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </li>
          <li className="flex items-center gap-1.5 text-xs text-slate-300">
            <span className="h-1 w-1 rounded-full bg-sky-400/60 shrink-0" />
            <span className="min-w-0 flex-1">{t('dashboard.newUpdates.item3')}</span>
            <Link
              to="/skills/mussolini-lock"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-cyan-300/35 bg-cyan-300/10 px-2.5 py-1.5 text-[11px] font-bold text-cyan-100 shadow-sm shadow-cyan-950/30 transition-colors hover:border-cyan-200/70 hover:bg-cyan-300/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
            >
              {t('dashboard.newUpdates.viewSkill')}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
