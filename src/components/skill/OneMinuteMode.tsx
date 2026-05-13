import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { OneMinuteView } from '../../data/skills/skillViewModel'

type Props = {
  view: OneMinuteView
  skillTitle: string
  onClose: () => void
}

export const OneMinuteMode = ({ view, skillTitle, onClose }: Props) => {
  const { t } = useTranslation()

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={t('cardOS.oneMinuteMode')}
    >
      <div className="relative w-full max-w-lg rounded-t-2xl border border-white/10 bg-slate-900 shadow-2xl sm:rounded-2xl">
        {/* Handle bar (mobile) */}
        <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-white/20 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
              {t('cardOS.oneMinuteMode')}
            </p>
            <p className="text-sm font-bold text-white">{skillTitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={t('common.close', 'Close')}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-5">
          <div className="space-y-4">
            {/* Goal */}
            <div className="rounded-xl border border-cyan-400/25 bg-cyan-400/8 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">
                {t('cardOS.goal')}
              </p>
              <p className="text-sm font-semibold leading-6 text-white">{view.goal}</p>
            </div>

            {/* 3 cues */}
            {view.threeCues.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {t('cardOS.threeCues')}
                </p>
                <ol className="space-y-1.5">
                  {view.threeCues.map((cue, i) => (
                    <li key={cue} className="flex items-center gap-3 rounded-lg border border-white/8 bg-slate-950/50 px-3 py-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-300">
                        {i + 1}
                      </span>
                      <span className="text-sm font-semibold text-slate-200">{cue}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Top contacts */}
            {view.topContacts.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {t('cardOS.keyContacts')}
                </p>
                <div className="space-y-2">
                  {view.topContacts.map((c) => (
                    <div key={c.id} className="rounded-xl border border-white/8 bg-slate-950/50 p-3">
                      <div className="mb-2 flex items-center gap-2 rounded-lg border border-cyan-400/15 bg-cyan-400/5 px-2.5 py-2 text-xs font-semibold">
                        <span className="text-cyan-100">{c.myBodyPart}</span>
                        <svg className="h-3 w-3 shrink-0 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                        <span className="text-cyan-100">{c.opponentBodyPart}</span>
                      </div>
                      <p className="text-xs leading-5 text-slate-300">{c.instruction}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trigger + Abort */}
            <div className="grid gap-2 sm:grid-cols-2">
              {view.finishTrigger && (
                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-3">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-emerald-400">
                    {t('cardOS.finishTrigger')}
                  </p>
                  <p className="text-xs leading-5 text-emerald-100">{view.finishTrigger}</p>
                </div>
              )}
              {view.abortSignal && (
                <div className="rounded-xl border border-rose-400/20 bg-rose-400/5 p-3">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-rose-400">
                    {t('cardOS.abortSignal')}
                  </p>
                  <p className="text-xs leading-5 text-rose-100">{view.abortSignal}</p>
                </div>
              )}
            </div>

            {/* Safety */}
            {view.safetyReminder && (
              <div className="rounded-xl border border-amber-400/25 bg-amber-400/8 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-amber-400">
                  ⚠ {t('cardOS.safetyReminder')}
                </p>
                <p className="text-xs leading-5 text-amber-100">{view.safetyReminder}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
