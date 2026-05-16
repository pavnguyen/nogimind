import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Grid3X3, Share2 } from 'lucide-react'
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

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  return (
    <div className="grid gap-3 rounded-lg border border-white/10 bg-slate-950/60 p-4 md:grid-cols-2 xl:grid-cols-5">
      <input
        value={searchParams.get('q') ?? ''}
        onChange={(event) => setParam('q', event.target.value)}
        placeholder={t('skills.q')}
        className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300 md:col-span-2"
      />
      <select
        value={searchParams.get('domain') ?? ''}
        onChange={(event) => setParam('domain', event.target.value)}
        className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white"
      >
        <option value="">{t('common.domain')}: {t('common.all')}</option>
        {skillDomains.map((domain) => (
          <option key={domain} value={domain}>{t(`domains.${domain}`)}</option>
        ))}
      </select>
      <select
        value={searchParams.get('level') ?? ''}
        onChange={(event) => setParam('level', event.target.value)}
        className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white"
      >
        <option value="">{t('common.level')}: {t('common.all')}</option>
        {skillLevels.map((level) => (
          <option key={level} value={level}>{t(`levels.${level}`)}</option>
        ))}
      </select>
      <select
        value={searchParams.get('tag') ?? ''}
        onChange={(event) => setParam('tag', event.target.value)}
        className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white"
      >
        <option value="">{t('skills.tagFilter')}: {t('common.all')}</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </select>
      <select
        value={searchParams.get('library') ?? ''}
        onChange={(event) => setParam('library', event.target.value)}
        className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white"
      >
        <option value="">{t('skills.modernFilters.library')}: {t('common.all')}</option>
        {libraries.map((value) => (
          <option key={value} value={value}>{t(`modern.library.${value}`)}</option>
        ))}
      </select>
      <select
        value={searchParams.get('family') ?? ''}
        onChange={(event) => setParam('family', event.target.value)}
        className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white"
      >
        <option value="">{t('skills.modernFilters.family')}: {t('common.all')}</option>
        {families.map((value) => (
          <option key={value} value={value}>{t(`modern.family.${value}`)}</option>
        ))}
      </select>
      <select
        value={searchParams.get('system') ?? ''}
        onChange={(event) => setParam('system', event.target.value)}
        className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white"
      >
        <option value="">{t('skills.modernFilters.system')}: {t('common.all')}</option>
        {systems.map((value) => (
          <option key={value} value={value}>{t(`modern.system.${value}`)}</option>
        ))}
      </select>
      <select
        value={searchParams.get('risk') ?? ''}
        onChange={(event) => setParam('risk', event.target.value)}
        className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white"
      >
        <option value="">{t('skills.modernFilters.risk')}: {t('common.all')}</option>
        {risks.map((value) => (
          <option key={value} value={value}>{t(`modern.risk.${value}`)}</option>
        ))}
      </select>
      <div className="flex items-center rounded-md border border-white/10 bg-slate-900 p-1 md:col-span-2 xl:col-span-1">
        {([
          { view: 'cards', icon: Grid3X3, hint: 'Cards = quick scanning' },
          { view: 'graph', icon: Share2, hint: 'Graph = connections' },
        ] as const).map(({ view, icon: Icon, hint }) => (
          <button
            key={view}
            type="button"
            onClick={() => setParam('view', view)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-semibold transition-colors ${
              (searchParams.get('view') ?? 'cards') === view ? 'bg-cyan-300 text-slate-950' : 'text-slate-300 hover:text-slate-100 hover:bg-white/5'
            }`}
            aria-label={`${t(`common.${view}`)} view`}
            title={hint}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {t(`common.${view}`)}
          </button>
        ))}
      </div>
    </div>
  )
}
