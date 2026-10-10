import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Printer } from 'lucide-react'
import type { SkillNode } from '../../types/skill'
import { formatTagLabel, modernFilterLabel } from '../../utils/tagLabel'

type Props = {
  skill: SkillNode
  lang: 'en' | 'vi' | 'fr'
  onPrintCard: () => void
}

const domainColor: Record<string, string> = {
  positional_awareness: 'bg-warm-700/60 text-warm-300',
  survival_defense: 'bg-copper-900/50 text-copper',
  escapes: 'bg-gold-900/50 text-gold',
  guard_retention: 'bg-jade-900/50 text-jade',
  guard_offense: 'bg-sea-900/50 text-sea',
  wrestle_up_wrestling: 'bg-steel-900/50 text-steel',
  passing: 'bg-steel-800/60 text-steel-200',
  pins_rides: 'bg-moss-900/50 text-moss',
  back_control: 'bg-sand-900/60 text-sand-200',
  submission_systems: 'bg-copper-800/60 text-copper-200',
}

const levelBadge: Record<string, string> = {
  beginner: 'border-jade-400/30 bg-jade-400/8 text-jade',
  intermediate: 'border-gold-400/30 bg-gold-400/8 text-gold',
  advanced: 'border-copper-400/30 bg-copper-400/8 text-copper',
}

const riskBadge: Record<string, { key: string; cls: string }> = {
  safety_critical: { key: 'modern.risk.safety_critical', cls: 'border-copper-500/40 bg-copper-500/10 text-copper' },
  high: { key: 'modern.risk.high', cls: 'border-copper-400/30 bg-copper-400/8 text-copper' },
}

export const SkillHeader = ({ skill, lang, onPrintCard }: Props) => {
  const { t } = useTranslation()
  const title = skill.title[lang]
  const risk = riskBadge[skill.riskLevel ?? '']

  return (
    <header className="space-y-3">
      {/* Back link */}
      <Link
        to="/skills"
        className="inline-flex min-h-8 items-center gap-1.5 text-xs text-warm-500 transition-colors hover:text-warm-300"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {t('common.backToSkills')}
      </Link>

      {/* Title row */}
      <div className="flex flex-wrap items-start gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-black leading-tight tracking-tight text-warm-50 lg:text-3xl">
            {title}
          </h1>

          {/* Badge row */}
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            {/* Domain */}
            <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${domainColor[skill.domain] ?? 'bg-warm-700/60 text-warm-300'}`}>
              {t(`domains.${skill.domain}`)}
            </span>

            {/* Level */}
            <span className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${levelBadge[skill.level] ?? ''}`}>
              {t(`levels.${skill.level}`)}
            </span>

            {/* Risk */}
            {risk && (
              <span className={`rounded-md border px-2.5 py-1 text-xs font-bold ${risk.cls}`}>
                ⚠ {t(risk.key)}
              </span>
            )}

            {/* Library tier (modern) */}
            {skill.libraryTier && skill.libraryTier !== 'core' && (
              <span className="rounded-md border border-steel-400/25 bg-steel-400/8 px-2.5 py-1 text-xs font-semibold text-steel">
                {modernFilterLabel(t, 'library', skill.libraryTier)}
              </span>
            )}

            {/* Ruleset chips */}
            {skill.rulesetRelevance?.adcc && (
              <span className="rounded-md border border-warm-50/10 bg-warm-50/5 px-2 py-0.5 text-xs text-warm-400">{t('skill.ruleset.adcc')}</span>
            )}
            {skill.rulesetRelevance?.subOnly && (
              <span className="rounded-md border border-warm-50/10 bg-warm-50/5 px-2 py-0.5 text-xs text-warm-400">{t('skill.ruleset.subOnly')}</span>
            )}
          </div>

          {/* Tags */}
          {skill.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {skill.tags.slice(0, 8).map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-warm-50/4 px-2 py-0.5 text-xs text-warm-500"
                >
                  #{formatTagLabel(tag)}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Print card button */}
        <button
          type="button"
          onClick={onPrintCard}
          className="flex shrink-0 items-center gap-2 rounded-xl border border-gold-400/30 bg-gold-400/8 px-4 py-2.5 text-sm font-semibold text-gold transition-all hover:border-gold-400/50 hover:bg-gold-400/15 hover:text-warm-50 active:scale-95"
          title={t('cardOS.printCard', 'Print Card')}
        >
          <Printer className="h-4 w-4" />
          {t('cardOS.printCard', 'Print Card')}
        </button>
      </div>

      {/* Short description, the lead paragraph of the page. It takes the full
          column width and steps up a size on desktop: capping it at a prose
          measure left an empty right column on wide screens. */}
      <p className="text-[15px] leading-7 text-warm-300 lg:text-base lg:leading-8">
        {skill.shortDescription[lang]}
      </p>

      {/* Horizontal rule */}
      <div className="h-px bg-warm-50/8" />
    </header>
  )
}
