import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '../components/common/EmptyState'
import { SectionCard } from '../components/common/SectionCard'
import { SkillGraph } from '../components/graphs/SkillGraph'
import { SkillCard } from '../components/skills/SkillCard'
import { SkillSearchFilters } from '../components/skills/SkillSearchFilters'
import { skillDomains, skillLevels } from '../data/domains'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import type { SkillDomain, SkillLevel } from '../types/skill'
import { searchSkills } from '../utils/search'

export default function SkillMapPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const language = useSettingsStore((state) => state.language)
  const defaultView = useSettingsStore((state) => state.skillMapView)
  const skillsQuery = useSkillsQuery()
  const skills = skillsQuery.data ?? []

  const domain = skillDomains.includes(searchParams.get('domain') as SkillDomain) ? (searchParams.get('domain') as SkillDomain) : ''
  const level = skillLevels.includes(searchParams.get('level') as SkillLevel) ? (searchParams.get('level') as SkillLevel) : ''
  const tag = searchParams.get('tag') ?? ''
  const view = searchParams.get('view') === 'graph' || searchParams.get('view') === 'cards' ? searchParams.get('view') : defaultView

  const filtered = useMemo(
    () => searchSkills(skills, searchParams.get('q') ?? '', language, { domain, level, tag }),
    [domain, language, level, searchParams, skills, tag],
  )

  const grouped = skillDomains
    .map((item) => ({ domain: item, skills: filtered.filter((skill) => skill.domain === item) }))
    .filter((group) => group.skills.length)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white">{t('skills.heading')}</h1>
        <p className="mt-2 max-w-3xl text-slate-400">{t('skills.subtitle')}</p>
      </div>
      <SkillSearchFilters skills={skills} />
      {view === 'graph' ? (
        <SkillGraph skills={filtered} filters={{ domain, level, tag }} lang={language} />
      ) : (
        <div className="space-y-6">
          {!filtered.length ? <EmptyState title={t('common.empty')} /> : null}
          {grouped.map((group) => (
            <SectionCard key={group.domain} title={t(`domains.${group.domain}`)}>
              <div className="grid gap-4 xl:grid-cols-2">
                {group.skills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  )
}
