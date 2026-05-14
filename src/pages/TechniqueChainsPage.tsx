import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'
import { Link2 } from 'lucide-react'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getTechniqueChains } from '../utils/knowledgeModules'
import { getLocalizedText } from '../utils/localization'

export default function TechniqueChainsPage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const skills = useSkillsQuery().data ?? []
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

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
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-400 shadow-lg">
              <Link2 className="h-5 w-5 text-slate-950" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">{t('chains.heading')}</h1>
              <p className="text-sm text-slate-400">{t('chains.whatFor')}</p>
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
      {!chains.length ? <EmptyState title={t('chains.empty')} description={t('chains.emptyBody')} /> : null}

      <div className="grid gap-4 xl:grid-cols-2">
        {chains.slice(0, 40).map((chain) => (
          <SectionCard
            key={chain.id}
            title={getLocalizedText(chain.title, lang)}
            description={getLocalizedText(chain.endGoal, lang)}
            action={<Link to={`/skills/${chain.skillId}`} className="inline-flex items-center gap-1.5 rounded-md border border-cyan-300/20 px-3 py-2 text-sm font-medium text-cyan-100 hover:bg-white/10">{t('common.open')}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
          >
            <div className="space-y-3">
              <p className="text-sm leading-6 text-slate-400"><span className="font-semibold text-slate-200">{t('chains.start')}: </span>{getLocalizedText(chain.startNode, lang)}</p>
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
                    {chain.failureBranches.slice(0, 3).map((branch) => <li key={getLocalizedText(branch.failure, 'en')}>{getLocalizedText(branch.response, lang)}</li>)}
                  </ul>
                </div>
              ) : null}
            </div>
          </SectionCard>
        ))}
      </div>
    </PageShell>
  )
}
