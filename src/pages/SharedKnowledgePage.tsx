import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Badge } from '../components/common/Badge'
import { NotFound } from '../components/common/NotFound'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'
import { sharedKnowledgeById } from '../data/sharedKnowledge'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getLocalizedText } from '../utils/localization'

export default function SharedKnowledgePage() {
  const { knowledgeId } = useParams()
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const skills = useSkillsQuery().data ?? []
  const item = knowledgeId ? sharedKnowledgeById.get(knowledgeId) : undefined

  if (!item) {
    return <NotFound title={t('sharedKnowledge.notFoundTitle')} body={t('sharedKnowledge.notFoundBody')} to="/search" label={t('common.search')} />
  }

  const relatedSkills = skills.filter((skill) => [
    ...(skill.sharedPrincipleIds ?? []),
    ...(skill.sharedCueIds ?? []),
    ...(skill.sharedErrorIds ?? []),
    ...(skill.sharedSafetyIds ?? []),
    ...(skill.sharedMechanicIds ?? []),
  ].includes(item.id))

  return (
    <PageShell
      backTo="/search"
      backLabel={t('sharedKnowledge.back')}
      title={getLocalizedText(item.title, lang)}
      subtitle={getLocalizedText(item.shortText, lang)}
    >
      <div className="flex flex-wrap gap-2">
        <Badge tone="emerald">{item.category}</Badge>
        {item.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
      </div>
      {item.deepText ? (
        <div className="mt-4 max-w-4xl text-sm leading-7 text-slate-400">
          {getLocalizedText(item.deepText, lang)}
        </div>
      ) : null}
      {relatedSkills.length ? (
        <SectionCard title={t('sharedKnowledge.relatedSkills')}>
          <div className="flex flex-wrap gap-2">
            {relatedSkills.map((skill) => (
              <Link key={skill.id} to={`/skills/${skill.id}`} className="rounded-md border border-white/10 px-3 py-2 text-sm text-cyan-100 hover:bg-white/10">
                {getLocalizedText(skill.title, lang)}
              </Link>
            ))}
          </div>
        </SectionCard>
      ) : null}
    </PageShell>
  )
}
