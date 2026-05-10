import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { SectionCard } from '../components/common/SectionCard'

const problems = [
  { key: 'finish', to: '/troubleshooters?category=submission', tools: ['/troubleshooters', '/micro-details?filter=finish', '/skills?family=submission'] },
  { key: 'passed', to: '/skills?domain=guard_retention', tools: ['/micro-details?filter=guard', '/skills?domain=guard_retention', '/escape-maps'] },
  { key: 'pin', to: '/skills?domain=escapes', tools: ['/skills?domain=escapes', '/micro-details?filter=escape', '/escape-maps'] },
  { key: 'back', to: '/skills/back-escape', tools: ['/skills/back-escape?layer=body', '/skills/back-control?layer=system', '/micro-details?q=back'] },
  { key: 'legLock', to: '/skills?family=leg_lock', tools: ['/skills?risk=safety_critical', '/micro-details?q=knee line', '/skills/heel-hook-safety?layer=body'] },
  { key: 'frontHeadlock', to: '/skills/front-headlock-defense', tools: ['/skills/front-headlock-defense?layer=body', '/troubleshooters?category=front_headlock', '/micro-details?q=head'] },
]

export default function FixPage() {
  const { t } = useTranslation()
  const [activeProblem, setActiveProblem] = useState(problems[0])

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <main className="space-y-5">
        <div>
          <Badge tone="rose">{t('nav.fix')}</Badge>
          <h1 className="mt-3 text-3xl font-semibold text-white">{t('modeUx.fix.heading')}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{t('modeUx.fix.subtitle')}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {problems.map((problem) => (
            <button key={problem.key} type="button" onClick={() => setActiveProblem(problem)} className={`rounded-lg border p-5 text-left transition ${activeProblem.key === problem.key ? 'border-rose-300/40 bg-rose-300/10' : 'border-white/10 bg-slate-950/60 hover:border-rose-300/30 hover:bg-white/[0.06]'}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">{t(`modeUx.fix.problems.${problem.key}.title`)}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{t(`modeUx.fix.problems.${problem.key}.body`)}</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-rose-200" aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>

        <SectionCard title={t(`modeUx.fix.problems.${activeProblem.key}.title`)} description={t('modeUx.fix.checklistIntro')}>
          <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
            <div className="space-y-2">
              {([0, 1, 2, 3] as const).map((index) => (
                <label key={index} className="flex gap-3 rounded-md border border-white/10 bg-slate-900/60 p-3 text-sm leading-6 text-slate-300">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 accent-emerald-300" />
                  <span>{t(`modeUx.fix.problems.${activeProblem.key}.checks.${index}`)}</span>
                </label>
              ))}
            </div>
            <div className="rounded-md border border-cyan-300/15 bg-cyan-300/10 p-4">
              <p className="text-sm font-semibold text-cyan-100">{t('modeUx.fix.recommendedNext')}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{t(`modeUx.fix.problems.${activeProblem.key}.next`)}</p>
              <Link to={activeProblem.to} className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-emerald-300 px-3 py-2 text-sm font-semibold text-slate-950">
                {t('common.open')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </SectionCard>
      </main>
      <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
        <SectionCard title={t('modeUx.fix.tools')}>
          <div className="grid gap-2">
            {activeProblem.tools.map((to) => (
              <Link key={to} className="rounded-md border border-white/10 px-3 py-2 text-sm text-cyan-200 hover:bg-white/10" to={to}>
                {to.includes('troubleshooters') ? t('nav.troubleshooters') : to.includes('escape') ? t('nav.escapeMaps') : to.includes('micro') ? t('nav.microDetails') : t('nav.skills')}
              </Link>
            ))}
          </div>
        </SectionCard>
      </aside>
    </div>
  )
}
