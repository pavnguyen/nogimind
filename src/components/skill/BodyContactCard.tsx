import { useTranslation } from 'react-i18next'

type Props = {
  id: string
  title: string
  myBodyPart: string
  opponentBodyPart: string
  contactType: string
  forceDirection?: string
  pressureLevel?: string
  instruction: string
  whyItWorks: string
  correctionCue: string
  liveCue: string
  prevents?: string
  safetyNote?: string
  isKeyContact?: boolean
}

const contactTypeColors: Record<string, string> = {
  grip: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/20',
  wrap: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/20',
  hook: 'bg-violet-500/20 text-violet-300 border-violet-400/20',
  clamp: 'bg-pink-500/20 text-pink-300 border-pink-400/20',
  wedge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/20',
  post: 'bg-slate-500/20 text-slate-300 border-slate-400/20',
  frame: 'bg-slate-500/20 text-slate-300 border-slate-400/20',
  block: 'bg-amber-500/20 text-amber-300 border-amber-400/20',
  pull: 'bg-sky-500/20 text-sky-300 border-sky-400/20',
  push: 'bg-sky-500/20 text-sky-300 border-sky-400/20',
  pin: 'bg-rose-500/20 text-rose-300 border-rose-400/20',
  finish_pressure: 'bg-rose-500/20 text-rose-300 border-rose-400/20',
  chest_connection: 'bg-purple-500/20 text-purple-300 border-purple-400/20',
  knee_wedge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/20',
  overhook: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/20',
  underhook: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/20',
  crossface: 'bg-orange-500/20 text-orange-300 border-orange-400/20',
  head_position: 'bg-sky-500/20 text-sky-300 border-sky-400/20',
  hip_connection: 'bg-violet-500/20 text-violet-300 border-violet-400/20',
  foot_post: 'bg-slate-500/20 text-slate-300 border-slate-400/20',
}

const getContactColor = (ct: string) =>
  contactTypeColors[ct] ?? 'bg-slate-500/20 text-slate-300 border-slate-400/20'

export const BodyContactCard = ({
  title,
  myBodyPart,
  opponentBodyPart,
  contactType,
  forceDirection,
  pressureLevel,
  instruction,
  whyItWorks,
  correctionCue,
  liveCue,
  prevents,
  safetyNote,
  isKeyContact,
}: Props) => {
  const { t } = useTranslation()

  return (
    <article
      className={`rounded-xl border p-4 transition-colors ${
        isKeyContact
          ? 'border-cyan-400/30 bg-cyan-950/30'
          : 'border-white/8 bg-slate-950/50'
      }`}
    >
      {/* Header row */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-md border px-2 py-0.5 text-xs font-semibold ${getContactColor(contactType)}`}
        >
          {contactType.replace(/_/g, ' ')}
        </span>
        {forceDirection && (
          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-slate-400">
            {forceDirection.replace(/_/g, ' ')}
          </span>
        )}
        {pressureLevel && (
          <span
            className={`rounded-md border px-2 py-0.5 text-xs ${
              pressureLevel === 'progressive'
                ? 'border-amber-400/20 bg-amber-500/10 text-amber-300'
                : pressureLevel === 'heavy'
                  ? 'border-rose-400/20 bg-rose-500/10 text-rose-300'
                  : 'border-slate-400/20 bg-slate-500/10 text-slate-400'
            }`}
          >
            {pressureLevel}
          </span>
        )}
        {isKeyContact && (
          <span className="ml-auto rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-xs font-semibold text-cyan-300">
            {t('cardOS.keyContact')}
          </span>
        )}
      </div>

      {/* Contact arrow */}
      <p className="mb-2 text-sm font-semibold text-white">{title}</p>
      <div className="mb-3 flex items-center gap-2 rounded-lg border border-cyan-400/15 bg-cyan-400/5 px-3 py-2.5">
        <span className="text-xs font-semibold text-cyan-100">{myBodyPart}</span>
        <svg className="h-3.5 w-3.5 shrink-0 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
        <span className="text-xs font-semibold text-cyan-100">{opponentBodyPart}</span>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm">
        <p className="leading-6 text-slate-200">
          <span className="font-semibold text-white">{t('bodyToBody.instruction')}: </span>
          {instruction}
        </p>
        <p className="leading-6 text-slate-300">
          <span className="font-semibold text-slate-100">{t('bodyToBody.whyItWorks')}: </span>
          {whyItWorks}
        </p>
        <p className="leading-6 text-amber-200">
          <span className="font-semibold text-amber-100">{t('bodyToBody.correctionCue')}: </span>
          {correctionCue}
        </p>
        {prevents && (
          <p className="leading-6 text-emerald-200">
            <span className="font-semibold text-emerald-100">{t('bodyToBody.prevents')}: </span>
            {prevents}
          </p>
        )}
      </div>

      {/* Live cue */}
      <p className="mt-3 rounded-md bg-white/4 px-3 py-2 text-xs font-bold uppercase tracking-wide text-cyan-300">
        ↗ {liveCue}
      </p>

      {/* Safety note */}
      {safetyNote && (
        <p className="mt-2 rounded-md border border-amber-300/20 bg-amber-300/8 p-3 text-xs leading-5 text-amber-100">
          ⚠ {safetyNote}
        </p>
      )}
    </article>
  )
}
