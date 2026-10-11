import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { useSkillsQuery } from '../../queries/skillQueries'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { getLocalizedText } from '../../utils/localization'
import { cn } from '../../utils/cn'

type SkillChainProps = {
  currentId: string
  prerequisites?: string[]
  nextSkillIds?: string[]
  relatedSkillIds?: string[]
  /**
   * Compact list-row variant: mini chips, no group labels, so a study row
   * stays one glanceable block instead of growing a second header.
   */
  compact?: boolean
}

/** `rear-naked-choke` -> `Rear Naked Choke`, used only when a title lookup misses. */
const prettifyId = (id: string) =>
  id
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

/**
 * The learning chain: what feeds this skill, where it leads, and what sits
 * beside it. Every chip is a real link, so the graph stays readable and
 * tappable on a phone - no canvas, no gestures, no tiny nodes.
 *
 * Chips carry router state (`from`), so opening a linked skill and pressing
 * its back control returns here instead of dropping the reader on the map.
 */
export const SkillChain = ({
  currentId,
  prerequisites,
  nextSkillIds,
  relatedSkillIds,
  compact = false,
}: SkillChainProps) => {
  const { t } = useTranslation()
  const location = useLocation()
  const language = useSettingsStore((state) => state.language)
  const skillsQuery = useSkillsQuery()

  const titleById = useMemo(() => {
    const map = new Map<string, string>()
    for (const skill of skillsQuery.data ?? []) {
      map.set(skill.id, getLocalizedText(skill.title, language))
    }
    return map
  }, [language, skillsQuery.data])

  const label = (id: string) => titleById.get(id) ?? prettifyId(id)
  const fromState = { from: `${location.pathname}${location.search}` }

  const prereqs = (prerequisites ?? []).filter((id) => id !== currentId)
  const nexts = (nextSkillIds ?? []).filter((id) => id !== currentId)
  const seen = new Set([...prereqs, ...nexts, currentId])
  const related = (relatedSkillIds ?? []).filter((id) => !seen.has(id))

  if (!prereqs.length && !nexts.length && !related.length) return null

  const chip = (id: string, tone: 'prereq' | 'next' | 'related') => (
    <Link
      key={`${tone}-${id}`}
      to={`/skills/${id}`}
      state={fromState}
      onClick={(event) => event.stopPropagation()}
      className={cn(
        'inline-flex shrink-0 items-center rounded-lg border font-medium transition-colors',
        compact
          ? 'px-2 py-1 text-[11px]'
          : 'px-2.5 py-1.5 text-xs',
        tone === 'prereq' &&
          'border-jade-400/25 bg-jade-400/8 text-jade hover:bg-jade-400/15',
        tone === 'next' &&
          'border-gold-400/25 bg-gold-400/8 text-gold hover:bg-gold-400/15',
        tone === 'related' &&
          'border-warm-50/10 bg-warm-50/[0.03] text-warm-400 hover:border-warm-50/20 hover:text-warm-200',
      )}
      title={label(id)}
    >
      {tone === 'next' && (
        <ArrowRight className="mr-1 h-3 w-3 shrink-0 opacity-70" aria-hidden="true" />
      )}
      {label(id)}
    </Link>
  )

  if (compact) {
    // One quiet line inside a list row: the closest prerequisite and the two
    // next steps, each tappable.
    return (
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {prereqs.slice(0, 1).map((id) => chip(id, 'prereq'))}
        {nexts.slice(0, 2).map((id) => chip(id, 'next'))}
      </div>
    )
  }

  return (
    <nav
      aria-label={t('common.skillChain')}
      className="rounded-2xl border border-warm-50/[0.06] bg-warm-900/25 p-3 sm:p-4"
    >
      {/* Groups stack vertically on phones so every link stays visible
          without a horizontal hunt; they share one row from sm up. */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
        {prereqs.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-warm-500">
              {t('common.prerequisites')}
            </span>
            {prereqs.map((id) => chip(id, 'prereq'))}
          </div>
        )}

        {prereqs.length > 0 && nexts.length > 0 && (
          <span className="shrink-0 self-start text-warm-600 sm:self-auto" aria-hidden="true">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        )}

        {nexts.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-warm-500">
              {t('common.next')}
            </span>
            {nexts.map((id) => chip(id, 'next'))}
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5 border-t border-warm-50/[0.06] pt-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-warm-500">
            {t('common.relatedSkills')}
          </span>
          {related.map((id) => chip(id, 'related'))}
        </div>
      )}
    </nav>
  )
}
