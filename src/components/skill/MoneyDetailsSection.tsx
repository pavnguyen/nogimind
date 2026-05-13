import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionAccordion } from './SectionAccordion'
import type { MoneyDetailsView } from '../../data/skills/skillViewModel'

type Props = { view: MoneyDetailsView }

type SubTab = 'details' | 'mechanics' | 'checks' | 'leaks'

const severityColor = {
  critical: 'border-rose-400/30 bg-rose-400/10 text-rose-300',
  major: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
  minor: 'border-slate-400/20 bg-slate-400/8 text-slate-400',
}

export const MoneyDetailsSection = ({ view }: Props) => {
  const { t } = useTranslation()
  const [tab, setTab] = useState<SubTab>('details')

  if (!view.available) return null

  const tabs: { id: SubTab; label: string }[] = [
    { id: 'details', label: t('cardOS.topDetails') },
    { id: 'mechanics', label: t('cardOS.mechanics') },
    { id: 'checks', label: t('cardOS.qualityChecks') },
    { id: 'leaks', label: t('cardOS.commonLeaks') },
  ]

  return (
    <SectionAccordion
      id="money-details"
      title={t('cardOS.moneyDetails')}
      badge={`${view.topDetails.length} ${t('cardOS.details')}`}
      accentColor="emerald"
    >
      <div className="space-y-4">
        {view.oneSentenceGold && (
          <div className="rounded-lg border border-emerald-400/25 bg-emerald-400/8 px-4 py-3">
            <p className="text-sm font-semibold leading-6 text-emerald-100">
              ★ {view.oneSentenceGold}
            </p>
          </div>
        )}

        {tab === 'mechanics' && (
          <div className="space-y-3">
            {view.mechanicGroups.map((group) => (
              <div key={group.label} className="rounded-xl border border-white/8 bg-slate-950/50 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-300">
                  {group.label}
                </p>
                <div className="grid gap-2 md:grid-cols-2">
                  {group.items.map((item) => (
                    <div key={`${group.label}-${item.title}`} className="rounded-lg border border-white/8 bg-white/4 p-3">
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-300">{item.detail}</p>
                      <p className="mt-2 text-xs font-semibold text-emerald-300">{item.cue}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sub-tab switcher */}
        <div className="flex gap-1 rounded-lg border border-white/8 bg-slate-950/50 p-1">
          {tabs.map((tb) => (
            <button
              key={tb.id}
              type="button"
              onClick={() => setTab(tb.id)}
              className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                tab === tb.id
                  ? 'bg-emerald-500/20 text-emerald-200'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>

        {/* Top details */}
        {tab === 'details' && (
          <div className="grid gap-3 xl:grid-cols-2">
            {view.topDetails.map((d, i) => (
              <div
                key={d.id}
                className="rounded-xl border border-white/8 bg-slate-950/50 p-4"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-300">
                    {i + 1}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {d.category}
                  </span>
                  {d.direction && (
                    <span className="ml-auto rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-xs text-slate-500">
                      {d.direction.replace(/_/g, ' ')}
                    </span>
                  )}
                </div>
                <p className="mb-1 text-sm font-semibold text-white">{d.title}</p>
                <p className="mb-2 text-sm leading-6 text-slate-300">{d.instruction}</p>
                <p className="text-xs leading-5 text-slate-400">
                  <span className="font-semibold text-slate-300">{t('bodyToBody.whyItWorks')}: </span>
                  {d.whyItWorks}
                </p>
                <p className="mt-1 text-xs leading-5 text-amber-200">
                  <span className="font-semibold text-amber-100">{t('bodyToBody.correctionCue')}: </span>
                  {d.correctionCue}
                </p>
                <p className="mt-2 rounded bg-white/4 px-2 py-1.5 text-xs font-bold uppercase tracking-wide text-emerald-300">
                  ↗ {d.liveCue}
                </p>
                {d.safetyNote && (
                  <p className="mt-2 rounded border border-amber-300/20 bg-amber-300/8 p-2 text-xs text-amber-100">
                    ⚠ {d.safetyNote}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Quality checks */}
        {tab === 'checks' && (
          <div className="space-y-2">
            {view.qualityChecks.length === 0 && (
              <p className="text-sm italic text-slate-500">{t('cardOS.noChecks')}</p>
            )}
            {view.qualityChecks.map((c) => (
              <div
                key={c.id}
                className="flex gap-3 rounded-lg border border-white/8 bg-slate-950/50 p-4"
              >
                <span
                  className={`mt-0.5 shrink-0 rounded-md border px-1.5 py-0.5 text-xs font-bold uppercase ${severityColor[c.severity]}`}
                >
                  {c.severity.slice(0, 3)}
                </span>
                <div className="min-w-0">
                  <p className="mb-1 text-sm font-semibold text-white">{c.title}</p>
                  <p className="text-xs leading-5 text-slate-400">{c.question}</p>
                  <div className="mt-2 grid gap-2 text-xs md:grid-cols-2">
                    <p className="rounded border border-emerald-400/15 bg-emerald-400/5 p-2 leading-5 text-emerald-200">
                      ✓ {c.successSignal}
                    </p>
                    <p className="rounded border border-rose-400/15 bg-rose-400/5 p-2 leading-5 text-rose-200">
                      ✗ {c.failureSignal}
                    </p>
                  </div>
                  <p className="mt-2 text-xs text-emerald-300">
                    → {c.quickFix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Live cues */}
        {tab === 'leaks' && (
          <div className="space-y-3">
            {view.commonLeaks.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
                  {t('cardOS.commonLeaks')}
                </p>
                <div className="grid gap-2">
                  {view.commonLeaks.map((leak) => (
                    <div key={leak.leak} className="rounded-lg border border-amber-400/15 bg-amber-400/5 p-3 text-xs leading-5">
                      <p className="font-semibold text-amber-100">{leak.leak}</p>
                      <p className="mt-1 text-slate-400"><span className="font-semibold text-slate-300">{t('bodyToBody.whyItWorks')}: </span>{leak.why}</p>
                      <p className="mt-1 text-emerald-300">{leak.correction}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {view.liveCues.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {t('cardOS.liveCues')}
                </p>
                <ul className="space-y-1.5">
                  {view.liveCues.map((cue) => (
                    <li
                      key={cue}
                      className="flex items-center gap-2 rounded-lg border border-white/8 bg-slate-950/50 px-3 py-2 text-sm font-semibold text-emerald-200"
                    >
                      <span className="text-emerald-400">↗</span> {cue}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {view.doNotDo.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-rose-400">
                  {t('cardOS.doNotDo')}
                </p>
                <ul className="space-y-1.5">
                  {view.doNotDo.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 rounded-lg border border-rose-400/10 bg-rose-400/5 px-3 py-2 text-sm text-rose-200"
                    >
                      <span className="mt-0.5 text-rose-400">✗</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </SectionAccordion>
  )
}
