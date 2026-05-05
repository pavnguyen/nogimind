import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { skillDomains, skillLevels } from '../../data/domains'
import type { SkillNode } from '../../types/skill'

export const SkillSearchFilters = ({ skills }: { skills: SkillNode[] }) => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const tags = [...new Set(skills.flatMap((skill) => skill.tags))].sort()

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
      <div className="flex rounded-md border border-white/10 bg-slate-900 p-1 md:col-span-2 xl:col-span-1">
        {(['cards', 'graph'] as const).map((view) => (
          <button
            key={view}
            type="button"
            onClick={() => setParam('view', view)}
            className={`flex-1 rounded px-3 py-1.5 text-xs font-semibold ${
              (searchParams.get('view') ?? 'cards') === view ? 'bg-cyan-300 text-slate-950' : 'text-slate-300'
            }`}
          >
            {t(`common.${view}`)}
          </button>
        ))}
      </div>
    </div>
  )
}
