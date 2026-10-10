import { useTranslation } from 'react-i18next'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export const DashboardWhatsNew = () => {
  const { t } = useTranslation()

  return (
    <section className="lg:col-span-12 animate-fadeIn md:[animation-delay:100ms]">
      <div className="rounded-xl border border-sea-400/15 bg-linear-to-r from-sea-400/[0.03] to-warm-900/20 px-5 py-4">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-sea" />
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-sea">{t('dashboard.newUpdates.heading')}</h2>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          <li className="flex items-center gap-1.5 text-xs text-warm-300">
            <span className="h-1 w-1 rounded-full bg-sea-400/60 shrink-0" />
            {t('dashboard.newUpdates.item1')}
          </li>
          <li className="flex items-center gap-1.5 text-xs text-warm-300">
            <span className="h-1 w-1 rounded-full bg-sea-400/60 shrink-0" />
            <span className="min-w-0 flex-1">{t('dashboard.newUpdates.item2')}</span>
            <Link
              to="/skills/thunder-lock"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-gold-300/35 bg-gold-300/10 px-2.5 py-2 text-xs font-bold text-gold shadow-sm shadow-gold-950/30 transition-colors hover:border-gold-200/70 hover:bg-gold-300/20 hover:text-warm-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-200"
            >
              {t('dashboard.newUpdates.viewSkill')}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </li>
          <li className="flex items-center gap-1.5 text-xs text-warm-300">
            <span className="h-1 w-1 rounded-full bg-sea-400/60 shrink-0" />
            <span className="min-w-0 flex-1">{t('dashboard.newUpdates.item3')}</span>
            <Link
              to="/skills/mussolini-lock"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-gold-300/35 bg-gold-300/10 px-2.5 py-2 text-xs font-bold text-gold shadow-sm shadow-gold-950/30 transition-colors hover:border-gold-200/70 hover:bg-gold-300/20 hover:text-warm-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-200"
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
