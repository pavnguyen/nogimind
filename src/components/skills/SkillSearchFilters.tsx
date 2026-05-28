import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { skillDomains, skillLevels } from '../../data/domains'
import type { SkillNode } from '../../types/skill'

const isString = (value: unknown): value is string => typeof value === 'string' && value.length > 0

export const SkillSearchFilters = ({ skills }: { skills: SkillNode[] }) => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const tags = [...new Set(skills.flatMap((skill) => skill.tags))].sort()
  const libraries = [...new Set(skills.map((skill) => skill.libraryTier).filter(isString))].sort()
  const families = [...new Set(skills.map((skill) => skill.techniqueFamily).filter(isString))].sort()
  const systems = [...new Set(skills.map((skill) => skill.modernSystemGroup).filter(isString))].sort()
  const risks = [...new Set(skills.map((skill) => skill.riskLevel).filter(isString))].sort()
  const fieldClass = 'h-10 rounded-lg border border-white/[0.07] bg-slate-950/70 px-3 text-[13px] text-slate-200 outline-none transition-colors placeholder:text-slate-600 hover:border-white/15 focus:border-cyan-300/40 focus:bg-slate-950'

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-slate-950/35 p-3 shadow-[0_18px_45px_rgba(2,6,23,0.18)] sm:p-4">
      <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-5">
        <div className="relative md:col-span-2">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" aria-hidden="true" />
          <input
            value={searchParams.get('q') ?? ''}
            onChange={(event) => setParam('q', event.target.value)}
            placeholder={t('skills.q')}
            className={`${fieldClass} w-full pl-9`}
          />
        </div>
      <select
        value={searchParams.get('domain') ?? ''}
        onChange={(event) => setParam('domain', event.target.value)}
        className={fieldClass}
      >
        <option value="">{t('common.domain')}: {t('common.all')}</option>
        {skillDomains.map((domain) => (
          <option key={domain} value={domain}>{t(`domains.${domain}`)}</option>
        ))}
      </select>
      <select
        value={searchParams.get('level') ?? ''}
        onChange={(event) => setParam('level', event.target.value)}
        className={fieldClass}
      >
        <option value="">{t('common.level')}: {t('common.all')}</option>
        {skillLevels.map((level) => (
          <option key={level} value={level}>{t(`levels.${level}`)}</option>
        ))}
      </select>
      <select
        value={searchParams.get('tag') ?? ''}
        onChange={(event) => setParam('tag', event.target.value)}
        className={fieldClass}
      >
        <option value="">{t('skills.tagFilter')}: {t('common.all')}</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </select>
      <select
        value={searchParams.get('library') ?? ''}
        onChange={(event) => setParam('library', event.target.value)}
        className={fieldClass}
      >
        <option value="">{t('skills.modernFilters.library')}: {t('common.all')}</option>
        {libraries.map((value) => (
          <option key={value} value={value}>{t(`modern.library.${value}`)}</option>
        ))}
      </select>
      <select
        value={searchParams.get('family') ?? ''}
        onChange={(event) => setParam('family', event.target.value)}
        className={fieldClass}
      >
        <option value="">{t('skills.modernFilters.family')}: {t('common.all')}</option>
        {families.map((value) => (
          <option key={value} value={value}>{t(`modern.family.${value}`)}</option>
        ))}
      </select>
      <select
        value={searchParams.get('system') ?? ''}
        onChange={(event) => setParam('system', event.target.value)}
        className={fieldClass}
      >
        <option value="">{t('skills.modernFilters.system')}: {t('common.all')}</option>
        {systems.map((value) => (
          <option key={value} value={value}>{t(`modern.system.${value}`)}</option>
        ))}
      </select>
      <select
        value={searchParams.get('risk') ?? ''}
        onChange={(event) => setParam('risk', event.target.value)}
        className={fieldClass}
      >
        <option value="">{t('skills.modernFilters.risk')}: {t('common.all')}</option>
        {risks.map((value) => (
          <option key={value} value={value}>{t(`modern.risk.${value}`)}</option>
        ))}
      </select>
      </div>
    </div>
  )
}
