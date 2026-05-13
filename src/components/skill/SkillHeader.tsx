import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { SkillNode } from '../../types/skill'

type Props = {
  skill: SkillNode
  lang: 'en' | 'vi' | 'fr'
  onOneMinute: () => void
}

const domainColor: Record<string, string> = {
  positional_awareness: 'bg-slate-700/60 text-slate-300',
  survival_defense: 'bg-rose-900/50 text-rose-300',
  escapes: 'bg-amber-900/50 text-amber-300',
  guard_retention: 'bg-cyan-900/50 text-cyan-300',
  guard_offense: 'bg-sky-900/50 text-sky-300',
  wrestle_up_wrestling: 'bg-indigo-900/50 text-indigo-300',
  passing: 'bg-violet-900/50 text-violet-300',
  pins_rides: 'bg-purple-900/50 text-purple-300',
  back_control: 'bg-pink-900/50 text-pink-300',
  submission_systems: 'bg-red-900/50 text-red-300',
}

const levelBadge: Record<string, string> = {
  beginner: 'border-emerald-400/30 bg-emerald-400/8 text-emerald-300',
  intermediate: 'border-amber-400/30 bg-amber-400/8 text-amber-300',
  advanced: 'border-rose-400/30 bg-rose-400/8 text-rose-300',
}

const riskBadge: Record<string, { label: string; cls: string }> = {
  safety_critical: { label: '⚠ Safety Critical', cls: 'border-red-500/40 bg-red-500/10 text-red-300' },
  high: { label: '⚠ High Risk', cls: 'border-rose-400/30 bg-rose-400/8 text-rose-300' },
}

export const SkillHeader = ({ skill, lang, onOneMinute }: Props) => {
  const { t } = useTranslation()
  const title = skill.title[lang]
  const risk = riskBadge[skill.riskLevel ?? '']

  return (
    <header className="space-y-3">
      {/* Back link */}
      <Link
        to="/skills"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-300"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {t('common.backToSkills')}
      </Link>

      {/* Title row */}
      <div className="flex flex-wrap items-start gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-black leading-tight tracking-tight text-white lg:text-3xl">
            {title}
          </h1>

          {/* Badge row */}
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            {/* Domain */}
            <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${domainColor[skill.domain] ?? 'bg-slate-700/60 text-slate-300'}`}>
              {t(`domains.${skill.domain}`)}
            </span>

            {/* Level */}
            <span className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${levelBadge[skill.level] ?? ''}`}>
              {t(`levels.${skill.level}`)}
            </span>

            {/* Risk */}
            {risk && (
              <span className={`rounded-md border px-2.5 py-1 text-xs font-bold ${risk.cls}`}>
                {risk.label}
              </span>
            )}

            {/* Library tier (modern) */}
            {skill.libraryTier && skill.libraryTier !== 'core' && (
              <span className="rounded-md border border-violet-400/25 bg-violet-400/8 px-2.5 py-1 text-xs font-semibold text-violet-300">
                {t(`modern.library.${skill.libraryTier}`)}
              </span>
            )}

            {/* Ruleset chips */}
            {skill.rulesetRelevance?.adcc && (
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-slate-400">ADCC</span>
            )}
            {skill.rulesetRelevance?.subOnly && (
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-slate-400">Sub Only</span>
            )}
          </div>

          {/* Tags */}
          {skill.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {skill.tags.slice(0, 8).map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-white/4 px-2 py-0.5 text-xs text-slate-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* One-Minute Mode button */}
        <button
          type="button"
          onClick={onOneMinute}
          className="flex shrink-0 items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/8 px-4 py-2.5 text-sm font-semibold text-cyan-200 transition-all hover:border-cyan-400/50 hover:bg-cyan-400/15 hover:text-white active:scale-95"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {t('cardOS.oneMinuteMode')}
        </button>
      </div>

      {/* Short description */}
      <p className="max-w-prose text-sm leading-6 text-slate-400">
        {skill.shortDescription[lang]}
      </p>

      {/* Horizontal rule */}
      <div className="h-px bg-white/8" />
    </header>
  )
}
