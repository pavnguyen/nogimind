import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Layers3, Palette } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '../components/common/StaggerContainer'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { HubTabBar } from '../components/layout/HubTabBar'
import { PageShell } from '../components/common/PageShell'
import { useArchetypesQuery } from '../queries/archetypeQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getLocalizedArray, getLocalizedText } from '../utils/localization'

export default function BuildHubPage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'archetypes'

  // Archetypes data — computed at top level (hooks must be unconditional)
  const archetypesQuery = useArchetypesQuery()
  const archetypes = useMemo(() => archetypesQuery.data ?? [], [archetypesQuery.data])

  const archetypeQuery = searchParams.get('q') ?? ''
  const filteredArchetypes = useMemo(() => {
    if (!archetypeQuery.trim()) return archetypes
    const normalized = archetypeQuery.trim().toLowerCase()
    return archetypes.filter((a) => {
      const haystack = [
        getLocalizedText(a.title, lang),
        a.title.en,
        getLocalizedText(a.shortDescription, lang),
        ...getLocalizedArray(a.bestFor, lang),
        ...a.coreSkillIds,
      ].join(' ').toLowerCase()
      return haystack.includes(normalized)
    })
  }, [archetypes, archetypeQuery, lang])

  const setQuery = (value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set('q', value)
    else next.delete('q')
    setSearchParams(next)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'archetypes':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{t('archetypes.whenToUse')}</p>
              <Link
                to="/archetypes"
                className="text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
              >
                {t('common.open')} →
              </Link>
            </div>

            <input
              value={archetypeQuery}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('archetypes.search')}
              className="w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-violet-300"
            />

            {!filteredArchetypes.length ? (
              <EmptyState title={t('archetypes.empty')} />
            ) : (
              <StaggerContainer className="grid gap-3 sm:grid-cols-2">
                {filteredArchetypes.slice(0, 10).map((archetype) => (
                  <StaggerItem key={archetype.id}>
                  <Link
                    key={archetype.id}
                    to={`/archetypes/${archetype.id}`}
                    className="group rounded-xl border border-white/[0.06] bg-slate-900/40 p-4 transition-all hover:border-violet-400/20 hover:bg-slate-900/70"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap gap-1.5">
                          <Badge tone="violet">{archetype.coreSkillIds.length} {t('archetypes.coreSkillsCount', { count: archetype.coreSkillIds.length }).replace(/^\d+\s/, '')}</Badge>
                        </div>
                        <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-violet-200 transition-colors">
                          {getLocalizedText(archetype.title, lang)}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
                          {getLocalizedText(archetype.shortDescription, lang)}
                        </p>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-violet-300/50 transition-all group-hover:translate-x-0.5 group-hover:text-violet-300" />
                    </div>
                  </Link>
                </StaggerItem>
                ))}
              </StaggerContainer>
            )}

            {archetypes.length > 10 && (
              <div className="text-center">
                <Link
                  to="/archetypes"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
                >
                  {t('common.open')} → <span className="text-slate-500">({archetypes.length} {t('archetypes.coreSkillsCount', { count: archetypes.length }).replace(/^\d+\s/, '')})</span>
                </Link>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <PageShell
      header={
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-slate-900/30 p-8 hallmark-hero">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full hallmark-blur-blob blur-[80px]" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl hallmark-icon-box">
                <Layers3 className="h-7 w-7 text-slate-950" aria-hidden="true" />
              </div>
              <div>
                <Badge className="hallmark-badge text-[10px] uppercase tracking-widest">{t('buildHub.badge')}</Badge>
                <h1 className="mt-1 display-heading text-3xl font-extrabold text-white lg:text-4xl">{t('nav.build')}</h1>
                <p className="mt-1 max-w-2xl text-base leading-relaxed text-slate-400">
                  {t('modeUx.map.subtitle')}
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <HubTabBar
        tabs={[
          { id: 'archetypes', labelKey: 'nav.archetypes', icon: Palette },
        ]}
        accent="violet"
        className="mb-6"
      />

      <div className="animate-slideUp" key={activeTab}>
        {renderTabContent()}
      </div>
    </PageShell>
  )
}
