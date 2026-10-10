import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { skillDomains, skillLevels } from '../../data/domains'
import type { SkillNode } from '../../types/skill'
import { formatTagLabel, modernFilterLabel } from '../../utils/tagLabel'

const isPresent = <T,>(value: T | undefined): value is T => value !== undefined

/**
 * Corpus markers rather than technique filters: they tag large parts of the
 * catalog, so they only add noise to the tag list.
 */
const HIDDEN_TAGS = new Set(['modern-no-gi'])

export const SkillSearchFilters = ({ skills }: { skills: SkillNode[] }) => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const fieldClass =
    'h-10 w-full min-w-0 rounded-lg border border-warm-50/[0.07] bg-warm-950/70 px-3 text-[13px] text-warm-200 outline-none transition-colors placeholder:text-warm-600 hover:border-warm-50/15 focus:border-gold-300/40 focus:bg-warm-950'

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  const clearAll = () => setSearchParams(new URLSearchParams())
  const hasActiveFilters = [...searchParams.keys()].length > 0

  const libraries = useMemo(
    () => [...new Set(skills.map((skill) => skill.libraryTier).filter(isPresent))].sort(),
    [skills],
  )
  const families = useMemo(
    () => [...new Set(skills.map((skill) => skill.techniqueFamily).filter(isPresent))].sort(),
    [skills],
  )
  const systems = useMemo(
    () => [...new Set(skills.map((skill) => skill.modernSystemGroup).filter(isPresent))].sort(),
    [skills],
  )
  const risks = useMemo(
    () => [...new Set(skills.map((skill) => skill.riskLevel).filter(isPresent))].sort(),
    [skills],
  )

  // Tag options: plain technique tags only. Structured values (family, tier,
  // risk, system, meta) have their own selects above, so they are excluded
  // here instead of being listed twice.
  const tagOptions = useMemo(
    () =>
      [...new Set(skills.flatMap((skill) => skill.tags))]
        .filter((tag) => !tag.includes(':') && !HIDDEN_TAGS.has(tag))
        .sort((a, b) => a.localeCompare(b)),
    [skills],
  )

  const select = (
    key: string,
    label: string,
    options: { value: string; label: string }[],
  ) => (
    <select
      aria-label={label}
      value={searchParams.get(key) ?? ''}
      onChange={(event) => setParam(key, event.target.value)}
      className={fieldClass}
    >
      <option value="">{label}: {t('common.all')}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )

  const domainLabel = t('common.domain')
  const levelLabel = t('common.level')
  const tagLabel = t('skills.tagFilter')
  const libraryLabel = t('skills.modernFilters.library')
  const familyLabel = t('skills.modernFilters.family')
  const systemLabel = t('skills.modernFilters.system')
  const riskLabel = t('skills.modernFilters.risk')

  return (
    <div className="rounded-2xl border border-warm-50/[0.06] bg-warm-950/35 p-3 shadow-[0_18px_45px_rgba(13,12,10,0.18)] sm:p-4">
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative sm:col-span-2 lg:col-span-4">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-600"
            aria-hidden="true"
          />
          <input
            value={searchParams.get('q') ?? ''}
            onChange={(event) => setParam('q', event.target.value)}
            placeholder={t('skills.q')}
            aria-label={t('skills.q')}
            className={`${fieldClass} pl-9`}
          />
        </div>

        {select(
          'domain',
          domainLabel,
          skillDomains.map((domain) => ({ value: domain, label: t(`domains.${domain}`) })),
        )}
        {select(
          'level',
          levelLabel,
          skillLevels.map((level) => ({ value: level, label: t(`levels.${level}`) })),
        )}

        <select
          aria-label={tagLabel}
          value={searchParams.get('tag') ?? ''}
          onChange={(event) => setParam('tag', event.target.value)}
          className={fieldClass}
        >
          <option value="">{tagLabel}: {t('common.all')}</option>
          {tagOptions.map((tag) => (
            <option key={tag} value={tag}>
              {formatTagLabel(tag)}
            </option>
          ))}
        </select>

        {select(
          'library',
          libraryLabel,
          libraries.map((value) => ({ value, label: modernFilterLabel(t, 'library', value) })),
        )}
        {select(
          'family',
          familyLabel,
          families.map((value) => ({ value, label: modernFilterLabel(t, 'family', value) })),
        )}
        {select(
          'system',
          systemLabel,
          systems.map((value) => ({ value, label: modernFilterLabel(t, 'system', value) })),
        )}
        {select(
          'risk',
          riskLabel,
          risks.map((value) => ({ value, label: modernFilterLabel(t, 'risk', value) })),
        )}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-warm-50/10 bg-warm-950/40 px-3 text-[13px] font-medium text-warm-400 transition-colors hover:border-warm-50/20 hover:text-warm-200"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            {t('skills.clearFilters')}
          </button>
        )}
      </div>
    </div>
  )
}
