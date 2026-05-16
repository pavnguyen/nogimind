import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Link2, SplitSquareVertical } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'
import { ChainFlowGraph } from '../components/graphs/ChainFlowGraph'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getTechniqueChains } from '../utils/knowledgeModules'
import { getLocalizedText } from '../utils/localization'
import { cn } from '../utils/cn'

export default function TechniqueChainsPage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const skills = useSkillsQuery().data ?? []
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const [viewMode, setViewMode] = useState<'cards' | 'graph'>('cards')

  const chains = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return getTechniqueChains(skills).filter((chain) => {
      const haystack = [
        getLocalizedText(chain.title, lang),
        getLocalizedText(chain.startNode, lang),
        getLocalizedText(chain.endGoal, lang),
        ...chain.conceptTags,
        ...chain.steps.flatMap((step) => [getLocalizedText(step.title, lang), getLocalizedText(step.goal, lang), getLocalizedText(step.keyDetail, lang)]),
      ].join(' ').toLowerCase()
      return !normalized || haystack.includes(normalized)
    })
  }, [lang, query, skills])

  return (
    <PageShell
      header={
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-400 shadow-lg">
                <Link2 className="h-5 w-5 text-slate-950" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-white">{t('chains.heading')}</h1>
                <p className="text-sm text-slate-400">{t('chains.subtitle')}</p>
              </div>
            </div>

            {/* View mode toggle */}
            <div className="flex items-center rounded-lg border border-white/10 bg-slate-900/60 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={cn(
                  'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                  viewMode === 'cards'
                    ? 'bg-emerald-400/20 text-emerald-200 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200',
                )}
              >
                {t('common.cards')}
              </button>
              <button
                type="button"
                onClick={() => setViewMode('graph')}
                className={cn(
                  'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                  viewMode === 'graph'
                    ? 'bg-emerald-400/20 text-emerald-200 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200',
                )}
              >
                <SplitSquareVertical className="mr-1.5 inline-block h-3.5 w-3.5" aria-hidden="true" />
                {t('chains.graphView')}
              </button>
            </div>
          </div>

          <input
            value={query}
            onChange={(event) => setSearchParams(event.target.value ? { q: event.target.value } : {})}
            placeholder={t('chains.search')}
            className="w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
          />
        </div>
      }
    >
      {!chains.length ? (
        <EmptyState title={t('chains.empty')} description={t('chains.emptyBody')} />
      ) : viewMode === 'graph' ? (
        /* Graph view — flow diagrams */
        <div className="space-y-6">
          {chains.slice(0, 20).map((chain) => (
            <div key={chain.id} className="rounded-lg border border-white/10 bg-slate-950/50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {getLocalizedText(chain.title, lang)}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {getLocalizedText(chain.startNode, lang)} → {getLocalizedText(chain.endGoal, lang)}
                  </p>
                </div>
                <Badge tone="emerald" className="px-2 py-0.5 text-[10px] uppercase tracking-wider">
                  {chain.steps.length} steps · {chain.failureBranches.length} branches
                </Badge>
              </div>
              <ChainFlowGraph chain={chain} lang={lang} />
            </div>
          ))}
        </div>
      ) : (
        /* Card view — original layout */
        <div className="grid gap-4 xl:grid-cols-2">
          {chains.slice(0, 40).map((chain) => (
            <SectionCard
              key={chain.id}
              to={`/skills/${chain.skillId}`}
              title={getLocalizedText(chain.title, lang)}
              description={getLocalizedText(chain.endGoal, lang)}
              action={
                <div className="inline-flex items-center gap-1.5 rounded-md border border-cyan-300/20 px-3 py-2 text-sm font-medium text-cyan-100 opacity-0 transition-all transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
                  {t('common.open')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </div>
              }
            >
              <div className="space-y-3">
                <p className="text-sm leading-6 text-slate-400">
                  <span className="font-semibold text-slate-200">{t('chains.start')}: </span>
                  {getLocalizedText(chain.startNode, lang)}
                </p>
                <div className="grid gap-2">
                  {chain.steps.slice(0, 5).map((step, index) => (
                    <div key={step.id} className="rounded-md border border-white/10 bg-slate-900/60 p-3">
                      <div className="flex items-center gap-2">
                        <Badge tone="emerald">{index + 1}</Badge>
                        <p className="text-sm font-semibold text-white">{getLocalizedText(step.title, lang)}</p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{getLocalizedText(step.keyDetail, lang)}</p>
                    </div>
                  ))}
                </div>
                {chain.failureBranches.length ? (
                  <div className="rounded-md border border-amber-300/15 bg-amber-300/10 p-3">
                    <p className="text-sm font-semibold text-amber-100">{t('chains.failureBranches')}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-300">
                      {chain.failureBranches.slice(0, 3).map((branch) => (
                        <li key={getLocalizedText(branch.failure, 'en')}>
                          {getLocalizedText(branch.response, lang)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </PageShell>
  )
}
