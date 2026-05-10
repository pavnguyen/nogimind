import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { SectionCard } from '../components/common/SectionCard'
import { PageHeader } from '../components/common/PageHeader'
import { useConceptsQuery } from '../queries/conceptQueries'
import { usePositionsQuery } from '../queries/positionQueries'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getMicroDetails, getTroubleshooters } from '../utils/knowledgeModules'
import { getLocalizedText } from '../utils/localization'

const cockpitCards = [
  { to: '/study', title: 'nav.study', body: 'modeUx.study.subtitle' },
  { to: '/fix', title: 'nav.fix', body: 'modeUx.fix.subtitle' },
  { to: '/map', title: 'nav.mapMode', body: 'modeUx.map.subtitle' },
  { to: '/reference', title: 'nav.referenceMode', body: 'modeUx.reference.subtitle' },
  { to: '/search', title: 'dashboard.cockpit.search', body: 'dashboard.cockpit.searchBody' },
  { to: '/skills?library=modern_expansion', title: 'dashboard.cockpit.modern', body: 'dashboard.cockpit.modernBody' },
]

const workflowSteps = [
  { to: '/positions', title: 'dashboard.workflow.0.title', body: 'dashboard.workflow.0.body' },
  { to: '/skills', title: 'dashboard.workflow.1.title', body: 'dashboard.workflow.1.body' },
  { to: '/micro-details', title: 'dashboard.workflow.2.title', body: 'dashboard.workflow.2.body' },
  { to: '/chains', title: 'dashboard.workflow.3.title', body: 'dashboard.workflow.3.body' },
]

export default function DashboardPage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const skills = useSkillsQuery().data ?? []
  const concepts = useConceptsQuery().data ?? []
  const positions = usePositionsQuery().data ?? []
  const microDetail = getMicroDetails(skills)[0]
  const concept = concepts[0]
  const position = positions[0]
  const troubleshooter = getTroubleshooters(skills, lang)[0]

  return (
    <div className="space-y-6">
      <PageHeader
        badge={t('app.version')}
        title={t('app.name')}
        subtitle={t('dashboard.knowledgeThesis')}
        whatFor={t('dashboard.heroWhatFor')}
        nextStepLabel={t('dashboard.heroAction')}
        nextStepTo="/search"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cockpitCards.map((card) => (
          <Link key={card.to} to={card.to} className="rounded-lg border border-white/10 bg-slate-950/65 p-5 transition hover:border-cyan-300/35 hover:bg-white/[0.06]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">{t(card.title)}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{t(card.body)}</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
            </div>
          </Link>
        ))}
      </div>

      <SectionCard title={t('dashboard.workflow.title')} description={t('dashboard.workflow.subtitle')}>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {workflowSteps.map((item, index) => (
            <Link key={item.to} to={item.to} className="rounded-lg border border-white/10 bg-slate-900/60 p-4 transition hover:border-cyan-300/35 hover:bg-white/[0.06]">
              <div className="flex items-start gap-3">
                <Badge tone="emerald">{index + 1}</Badge>
                <div>
                  <p className="text-sm font-semibold text-white">{t(item.title)}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{t(item.body)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title={t('dashboard.fastReferences')}>
          <div className="grid gap-3">
            {microDetail ? (
              <FeatureLink to={`/skills/${microDetail.skillId}`} label={t('dashboard.microDetailOfDay')} title={getLocalizedText(microDetail.title, lang)} body={getLocalizedText(microDetail.correctionCue, lang)} />
            ) : null}
            {concept ? (
              <FeatureLink to={`/concepts/${concept.id}`} label={t('dashboard.conceptOfDay')} title={getLocalizedText(concept.title, lang)} body={getLocalizedText(concept.shortDefinition, lang)} />
            ) : null}
            {position ? (
              <FeatureLink to={`/positions/${position.id}`} label={t('dashboard.positionOfDay')} title={getLocalizedText(position.title, lang)} body={getLocalizedText(position.description, lang)} />
            ) : null}
            {troubleshooter ? (
              <FeatureLink to={`/troubleshooters/${troubleshooter.skillId}`} label={t('nav.troubleshooters')} title={getLocalizedText(troubleshooter.title, lang)} body={getLocalizedText(troubleshooter.overview, lang)} />
            ) : null}
            <FeatureLink to="/mastery" label={t('nav.mastery')} title={t('mastery.heading')} body={t('mastery.subtitle')} />
          </div>
        </SectionCard>

        <SectionCard title={t('dashboard.debugShortcuts')}>
          <div className="space-y-3">
            {[
              { to: '/skills?risk=safety_critical', title: t('dashboard.shortcuts.safety'), body: t('dashboard.shortcuts.safetyBody') },
              { to: '/skills?family=submission', title: t('dashboard.shortcuts.submissions'), body: t('dashboard.shortcuts.submissionsBody') },
              { to: '/skills?family=passing', title: t('dashboard.shortcuts.passing'), body: t('dashboard.shortcuts.passingBody') },
              { to: '/escape-maps', title: t('dashboard.shortcuts.escapes'), body: t('dashboard.shortcuts.escapesBody') },
              { to: '/game-tree', title: t('dashboard.shortcuts.game'), body: t('dashboard.shortcuts.gameBody') },
            ].map((item) => (
              <Link key={item.title} to={item.to} className="block rounded-lg border border-white/10 bg-slate-900/60 p-4 hover:bg-white/10">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.body}</p>
              </Link>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

const FeatureLink = ({ to, label, title, body }: { to: string; label: string; title: string; body: string }) => (
  <Link to={to} className="block rounded-lg border border-white/10 bg-slate-900/60 p-4 hover:bg-white/10">
    <Badge tone="cyan">{label}</Badge>
    <p className="mt-3 text-sm font-semibold text-white">{title}</p>
    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{body}</p>
  </Link>
)
