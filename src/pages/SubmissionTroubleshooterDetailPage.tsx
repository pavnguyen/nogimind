import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { NotFound } from '../components/common/NotFound'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'
import { NextStepStrip } from '../components/learning/NextStepStrip'
import { useConceptsQuery } from '../queries/conceptQueries'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getTroubleshooters } from '../utils/knowledgeModules'
import { getLocalizedText } from '../utils/localization'

export default function SubmissionTroubleshooterDetailPage() {
  const { skillId } = useParams()
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const skills = useSkillsQuery().data ?? []
  const concepts = useConceptsQuery().data ?? []
  const skill = skills.find((item) => item.id === skillId)
  const troubleshooter = getTroubleshooters(skills, lang).find((item) => item.skillId === skillId)
  const relatedConcepts = skill ? concepts.filter((concept) => concept.relatedSkillIds.includes(skill.id)) : []

  if (!troubleshooter || !skill) {
    return <NotFound title={t('troubleshooters.notFoundTitle')} body={t('troubleshooters.notFoundBody')} to="/troubleshooters" label={t('troubleshooters.backToTroubleshooters')} />
  }

  return (
    <PageShell
      backTo="/troubleshooters"
      backLabel={t('troubleshooters.backToTroubleshooters')}
      title={getLocalizedText(troubleshooter.title, lang)}
      subtitle={getLocalizedText(troubleshooter.overview, lang)}
      badge={t(`troubleshooters.categories.${troubleshooter.category}`)}
      badgeTone={troubleshooter.category === 'leg_lock' ? 'amber' : 'cyan'}
    >
      <div className="mb-6">
        <Link to={`/skills/${skill.id}`} className="inline-flex items-center gap-1.5 rounded-md bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-200 transition-colors">
          {t('common.open')} {t('common.skill')}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <SectionCard title={t('troubleshooters.finishChecklist')}>
        <div className="grid gap-2 md:grid-cols-2">
          {troubleshooter.checklist.map((item) => (
            <p key={item} className="rounded-md border border-white/10 bg-slate-900/60 p-3 text-sm leading-6 text-slate-300">{item}</p>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={t('troubleshooters.guidedDiagnosis')} description={t('troubleshooters.guidedDiagnosisBody')}>
        <div className="grid gap-4 xl:grid-cols-2">
          {troubleshooter.diagnoses.map((diagnosis) => (
            <div key={diagnosis.id} className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
              <h2 className="text-base font-semibold text-white">{getLocalizedText(diagnosis.title, lang)}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400"><span className="font-semibold text-slate-200">{t('troubleshooters.likelyCause')}: </span>{getLocalizedText(diagnosis.likelyCause, lang)}</p>
              <p className="mt-3 rounded-md border border-emerald-300/15 bg-emerald-300/10 px-3 py-2 text-sm leading-6 text-emerald-100">{getLocalizedText(diagnosis.microFix, lang)}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {troubleshooter.safetyNotes.length ? (
        <SectionCard title={t('mechanics.safetyNotes')}>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-amber-100">
            {troubleshooter.safetyNotes.map((note) => <li key={note}>{note}</li>)}
          </ul>
        </SectionCard>
      ) : null}

      {relatedConcepts.length ? (
        <SectionCard title={t('concepts.relatedConcepts')}>
          <div className="flex flex-wrap gap-2">
            {relatedConcepts.slice(0, 6).map((concept) => (
              <Link key={concept.id} to={`/concepts/${concept.id}`} className="rounded-md border border-white/10 px-3 py-2 text-sm text-cyan-200 hover:bg-white/10">
                {getLocalizedText(concept.title, lang)}
              </Link>
            ))}
          </div>
        </SectionCard>
      ) : null}

      <NextStepStrip
        title={t('troubleshooters.nextStep')}
        items={[
          { title: t('common.skill'), body: t('troubleshooters.skillDetailPrompt'), to: `/skills/${skill.id}` },
          { title: t('microDetails.heading'), body: t('troubleshooters.guidedDiagnosisBody'), to: `/micro-details?skill=${skill.id}` },
          { title: t('escapeMaps.heading'), body: t('troubleshooters.guidedDiagnosisBody'), to: `/escape-maps/${skill.id}` },
        ]}
      />
    </PageShell>
  )
}
