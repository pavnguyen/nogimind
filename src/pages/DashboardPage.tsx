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

const intentCards = [
  { to: '/learn#beginner', title: 'dashboard.intent.beginner', body: 'dashboard.intent.beginnerBody' },
  { to: '/skills', title: 'dashboard.intent.skill', body: 'dashboard.intent.skillBody' },
  { to: '/troubleshooters', title: 'dashboard.intent.fix', body: 'dashboard.intent.fixBody' },
  { to: '/positions', title: 'dashboard.intent.position', body: 'dashboard.intent.positionBody' },
  { to: '/micro-details', title: 'dashboard.intent.detail', body: 'dashboard.intent.detailBody' },
  { to: '/game-tree', title: 'dashboard.intent.game', body: 'dashboard.intent.gameBody' },
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
        nextStepTo="/learn"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {intentCards.map((card) => (
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

      <SectionCard title={t('dashboard.howToUse.title')} description={t('dashboard.howToUse.subtitle')}>
        <div className="grid gap-3 xl:grid-cols-2">
          {[
            { to: '/positions', title: t('dashboard.howToUse.steps.0.title'), body: t('dashboard.howToUse.steps.0.body') },
            { to: '/concepts', title: t('dashboard.howToUse.steps.1.title'), body: t('dashboard.howToUse.steps.1.body') },
            { to: '/skills', title: t('dashboard.howToUse.steps.2.title'), body: t('dashboard.howToUse.steps.2.body') },
            { to: '/micro-details', title: t('dashboard.howToUse.steps.3.title'), body: t('dashboard.howToUse.steps.3.body') },
            { to: '/chains', title: t('dashboard.howToUse.steps.4.title'), body: t('dashboard.howToUse.steps.4.body') },
            { to: '/game-tree', title: t('dashboard.howToUse.steps.5.title'), body: t('dashboard.howToUse.steps.5.body') },
          ].map((item, index) => (
            <Link key={item.title} to={item.to} className="rounded-lg border border-white/10 bg-slate-900/60 p-4 transition hover:border-cyan-300/35 hover:bg-white/[0.06]">
              <div className="flex items-start gap-3">
                <Badge tone="emerald">{index + 1}</Badge>
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.body}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title={t('dashboard.featuredModules')}>
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

        <SectionCard title={t('dashboard.steps.title')}>
          <div className="space-y-3">
            {[
              { to: '/positions', title: t('dashboard.steps.0.title'), body: t('dashboard.steps.0.body') },
              { to: '/concepts', title: t('dashboard.steps.1.title'), body: t('dashboard.steps.1.body') },
              { to: '/skills', title: t('dashboard.steps.2.title'), body: t('dashboard.steps.2.body') },
              { to: '/micro-details', title: t('dashboard.steps.3.title'), body: t('dashboard.steps.3.body') },
              { to: '/game-tree', title: t('dashboard.steps.4.title'), body: t('dashboard.steps.4.body') },
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
