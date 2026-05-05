import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { NotFound } from '../components/common/NotFound'
import { SectionCard } from '../components/common/SectionCard'
import { RelatedKnowledgePanel } from '../components/knowledge/RelatedKnowledgePanel'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getSkillKnowledgeLinks } from '../utils/knowledgeGraph'
import { getEscapeMaps } from '../utils/knowledgeModules'
import { getLocalizedText } from '../utils/localization'

export default function EscapeMapDetailPage() {
  const { skillId } = useParams()
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const skills = useSkillsQuery().data ?? []
  const byId = new Map(skills.map((skill) => [skill.id, skill]))
  const map = getEscapeMaps(skills, lang).find((item) => item.skillId === skillId)
  const skill = skillId ? byId.get(skillId) : undefined

  if (!map || !skill) {
    return <NotFound title={t('escapeMaps.notFoundTitle')} body={t('escapeMaps.notFoundBody')} to="/escape-maps" label={t('escapeMaps.backToEscapeMaps')} />
  }

  return (
    <div className="space-y-6">
      <Link to="/escape-maps" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-cyan-100">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t('escapeMaps.backToEscapeMaps')}
      </Link>

      <section className="rounded-lg border border-white/10 bg-slate-950/60 p-5 shadow-glow">
        <Badge tone="cyan">{t(`escapeMaps.categories.${map.category}`)}</Badge>
        <h1 className="mt-4 text-3xl font-semibold text-white">{getLocalizedText(map.title, lang)}</h1>
        <p className="mt-3 max-w-4xl text-slate-400">{getLocalizedText(map.overview, lang)}</p>
        <Link to={`/skills/${skill.id}`} className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950">
          {t('common.open')} {t('common.skill')}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>

      <SectionCard title={t('escapeMaps.priorityPreventions')}>
        <div className="grid gap-2 md:grid-cols-2">
          {map.priorityPreventions.map((item) => (
            <p key={item} className="rounded-md border border-white/10 bg-slate-900/60 p-3 text-sm leading-6 text-slate-300">{item}</p>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={t('escapeMaps.routes')}>
        <div className="space-y-4">
          {map.routes.map((route) => (
            <div key={route.id} className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
              <h2 className="text-base font-semibold text-white">{getLocalizedText(route.title, lang)}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400"><span className="font-semibold text-slate-200">{t('escapeMaps.earlySignal')}: </span>{getLocalizedText(route.earlySignal, lang)}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400"><span className="font-semibold text-slate-200">{t('escapeMaps.prevention')}: </span>{getLocalizedText(route.prevention, lang)}</p>
              <p className="mt-2 rounded-md border border-amber-300/15 bg-amber-300/10 px-3 py-2 text-sm leading-6 text-amber-100">{getLocalizedText(route.ifPreventionFails, lang)}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {route.followUpSkillIds.map((id) => byId.get(id)).filter(Boolean).map((item) => (
                  <Link key={item?.id} to={`/skills/${item?.id}`} className="rounded-md border border-white/10 px-2 py-1 text-xs text-cyan-200 hover:bg-white/10">
                    {getLocalizedText(item?.title, lang)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <RelatedKnowledgePanel lang={lang} groups={getSkillKnowledgeLinks(skill.id)} />
    </div>
  )
}
