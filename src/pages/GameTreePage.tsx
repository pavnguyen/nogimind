import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { AGameBuilder } from '../components/gameTree/AGameBuilder'
import { GameTreeBoard } from '../components/gameTree/GameTreeBoard'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'
import { PagePurposeBanner } from '../components/learning/PagePurposeBanner'
import { useArchetypesQuery } from '../queries/archetypeQueries'
import { useGameTreeQuery, useUpdateGameTreeMutation } from '../queries/gameTreeQueries'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import type { GameTree } from '../types/gameTree'
import { getLocalizedText } from '../utils/localization'

const GameTreeGraph = lazy(() => import('../components/graphs/GameTreeGraph').then((module) => ({ default: module.GameTreeGraph })))

export default function GameTreePage() {
  const { t } = useTranslation()
  const language = useSettingsStore((state) => state.language)
  const skills = useSkillsQuery().data ?? []
  const archetypes = useArchetypesQuery().data ?? []
  const gameTree = useGameTreeQuery().data
  const updateGameTree = useUpdateGameTreeMutation()

  if (!gameTree) return <p className="text-slate-400">{t('common.loading')}</p>

  const applyArchetype = (partial: Partial<GameTree>) => updateGameTree.mutate({ ...gameTree, ...partial })

  return (
    <PageShell title={t('gameTree.heading')} subtitle={t('gameTree.subtitle')}>
      <PagePurposeBanner
        title={t('gameTree.heading')}
        purpose={t('gameTree.whatFor')}
        whenToUse={t('gameTree.whenToUse')}
        bestNextStepLabel={t('gameTree.nextStep')}
        bestNextStepTo="/archetypes"
      />
      <SectionCard title={t('gameTree.builder')} description={t('gameTree.applyArchetype')}>
        <AGameBuilder onApply={applyArchetype} />
      </SectionCard>
      <SectionCard
        title={t('nav.archetypes')}
        description={t('archetypes.gameTreePrompt')}
        action={<Link to="/archetypes" className="rounded-md border border-cyan-300/20 px-3 py-2 text-sm font-medium text-cyan-100 hover:bg-white/10">{t('archetypes.libraryLink')}</Link>}
      >
        <div className="grid gap-3 lg:grid-cols-3">
          {archetypes.slice(0, 3).map((archetype) => (
            <Link key={archetype.id} to={`/archetypes/${archetype.id}`} className="rounded-lg border border-white/10 bg-slate-900/60 p-4 hover:border-cyan-300/30 hover:bg-white/[0.06]">
              <p className="text-sm font-semibold text-white">{getLocalizedText(archetype.title, language)}</p>
              <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-400">{getLocalizedText(archetype.shortDescription, language)}</p>
            </Link>
          ))}
        </div>
      </SectionCard>
      <SectionCard title={t('gameTree.available')}>
        <GameTreeBoard skills={skills} gameTree={gameTree} lang={language} onChange={(tree) => updateGameTree.mutate(tree)} />
      </SectionCard>
      <SectionCard title={t('gameTree.graph')}>
        <Suspense fallback={<p className="text-sm text-slate-400">{t('common.loading')}</p>}>
          <GameTreeGraph gameTree={gameTree} skills={skills} lang={language} />
        </Suspense>
      </SectionCard>
    </PageShell>
  )
}
