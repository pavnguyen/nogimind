import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { HelpCircle, Shield, Wrench } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '../components/common/StaggerContainer'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { FormattedText } from '../components/common/FormattedText'
import { HubTabBar } from '../components/layout/HubTabBar'
import { PageShell } from '../components/common/PageShell'
import { useSkillsQuery } from '../queries/skillQueries'
import { useDefensiveLayersQuery } from '../queries/defenseQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { safetyCategories } from '../data/defensiveLayers'
import { getTroubleshooters } from '../utils/knowledgeModules'
import { getLocalizedText } from '../utils/localization'
import type { SafetyCategory } from '../types/defense'

const troubleshooterCategories = ['choke', 'joint_lock', 'leg_lock', 'back', 'front_headlock', 'submission']
export default function FixHubPage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'troubleshooters'

  // Skills data — computed at top level (hooks must be unconditional)
  const skillsQuery = useSkillsQuery()
  const skills = useMemo(() => skillsQuery.data ?? [], [skillsQuery.data])
  const layersQuery = useDefensiveLayersQuery()
  const layers = useMemo(() => layersQuery.data ?? [], [layersQuery.data])

  // Troubleshooters filter — top level
  const tsQuery = searchParams.get('q') ?? ''
  const tsCategory = searchParams.get('category') ?? ''
  const troubleshooters = useMemo(() => {
    const normalized = tsQuery.trim().toLowerCase()
    return getTroubleshooters(skills, lang).filter((item) => {
      const haystack = [
        getLocalizedText(item.title, lang),
        getLocalizedText(item.overview, lang),
        item.category,
        ...item.checklist,
        ...item.diagnoses.flatMap((d) => [
          getLocalizedText(d.title, lang),
          getLocalizedText(d.likelyCause, lang),
          getLocalizedText(d.microFix, lang),
        ]),
      ].join(' ').toLowerCase()
      return (!tsCategory || item.category === tsCategory) && (!normalized || haystack.includes(normalized))
    })
  }, [tsCategory, lang, tsQuery, skills])

  // Defense filter — top level
  const dfQuery = searchParams.get('q') ?? ''
  const dfCategory = safetyCategories.includes(searchParams.get('category') as SafetyCategory)
    ? (searchParams.get('category') as SafetyCategory)
    : ''
  const filteredLayers = useMemo(() => {
    const normalized = dfQuery.trim().toLowerCase()
    return layers.filter((layer) => {
      if (dfCategory && layer.category !== dfCategory) return false
      if (!normalized) return true
      const haystack = [
        getLocalizedText(layer.title, lang),
        layer.title.en,
        getLocalizedText(layer.threat, lang),
      ].join(' ').toLowerCase()
      return haystack.includes(normalized)
    })
  }, [dfCategory, lang, layers, dfQuery])

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'troubleshooters':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{t('troubleshooters.whatFor')}</p>
              <Link
                to="/troubleshooters"
                className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
              >
                {t('common.open')} →
              </Link>
            </div>

            <div className="flex gap-3">
              <input
                value={tsQuery}
                onChange={(event) => setParam('q', event.target.value)}
                placeholder={t('troubleshooters.search')}
                className="flex-1 rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none search-focus-ring"
              />
              <select
                value={tsCategory}
                onChange={(event) => setParam('category', event.target.value)}
                className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none search-focus-ring"
              >
                <option value="">{t('common.all')}</option>
                {troubleshooterCategories.map((item) => (
                  <option key={item} value={item}>{t(`troubleshooters.categories.${item}`)}</option>
                ))}
              </select>
            </div>

            {!troubleshooters.length ? (
              <EmptyState title={t('troubleshooters.empty')} description={t('troubleshooters.emptyBody')} />
            ) : (
              <StaggerContainer className="grid gap-3 sm:grid-cols-2">
                {troubleshooters.slice(0, 10).map((item) => (
                  <StaggerItem key={item.id}>
                  <Link
                    key={item.id}
                    to={`/troubleshooters/${item.skillId}`}
                    className="group rounded-xl border border-white/[0.06] bg-slate-900/40 p-4 transition-all hover:border-amber-400/20 hover:bg-slate-900/70"
                  >
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <Badge tone={item.category === 'leg_lock' ? 'amber' : 'cyan'}>
                        {t(`troubleshooters.categories.${item.category}`)}
                      </Badge>
                      <Badge tone="emerald">{item.diagnoses.length} {t('troubleshooters.diagnoses')}</Badge>
                    </div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-amber-200 transition-colors">
                      {getLocalizedText(item.title, lang)}
                    </h3>
                    <div className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
                      <FormattedText text={getLocalizedText(item.overview, lang)} className="text-xs leading-5 text-slate-400" />
                    </div>
                  </Link>
                </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>
        )

      case 'defense':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{t('defense.subtitle')}</p>
              <Link
                to="/defense"
                className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
              >
                {t('common.open')} →
              </Link>
            </div>

            <div className="flex gap-3">
              <input
                value={dfQuery}
                onChange={(event) => setParam('q', event.target.value)}
                placeholder={t('defense.search')}
                className="flex-1 rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none search-focus-ring"
              />
              <select
                value={dfCategory}
                onChange={(event) => setParam('category', event.target.value)}
                className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none search-focus-ring"
              >
                <option value="">{t('common.all')}</option>
                {safetyCategories.map((item) => (
                  <option key={item} value={item}>{t(`safetyCategories.${item}`)}</option>
                ))}
              </select>
            </div>

            {!filteredLayers.length ? (
              <EmptyState title={t('defense.empty')} />
            ) : (
              <StaggerContainer className="grid gap-3 sm:grid-cols-2">
                {filteredLayers.slice(0, 10).map((layer) => (
                  <StaggerItem key={layer.id}>
                  <Link
                    key={layer.id}
                    to={`/defense/${layer.id}`}
                    className="group rounded-xl border border-white/[0.06] bg-slate-900/40 p-4 transition-all hover:border-amber-400/20 hover:bg-slate-900/70"
                  >
                    <Badge tone="amber">{t(`safetyCategories.${layer.category}`)}</Badge>
                    <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-amber-200 transition-colors">
                      {getLocalizedText(layer.title, lang)}
                    </h3>
                    <div className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
                      <FormattedText text={getLocalizedText(layer.threat, lang)} className="text-xs leading-5 text-slate-400" />
                    </div>
                  </Link>
                </StaggerItem>
                ))}
              </StaggerContainer>
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
                <Wrench className="h-7 w-7 text-slate-950" aria-hidden="true" />
              </div>
              <div>
                <Badge className="hallmark-badge text-[10px] uppercase tracking-widest">{t('nav.fix')}</Badge>
                <h1 className="mt-1 display-heading text-3xl font-extrabold text-white lg:text-4xl">{t('modeUx.fix.heading')}</h1>
                <p className="mt-1 max-w-2xl text-base leading-relaxed text-slate-400">{t('modeUx.fix.subtitle')}</p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <HubTabBar
        tabs={[
          { id: 'troubleshooters', labelKey: 'nav.troubleshooters', icon: HelpCircle },
          { id: 'defense', labelKey: 'nav.defense', icon: Shield },
        ]}
        className="mb-6"
      />

      <div className="animate-slideUp" key={activeTab}>
        {renderTabContent()}
      </div>
    </PageShell>
  )
}
