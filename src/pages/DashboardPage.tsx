import { useMemo, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles } from 'lucide-react'
import { PageShell } from '../components/common/PageShell'
import { DailyFocusCard } from '../components/dashboard/DailyFocusCard'
import { DashboardHubExplorer } from '../components/dashboard/DashboardHubExplorer'
import { DashboardFixSection } from '../components/dashboard/DashboardFixSection'
import { DashboardWhatsNew } from '../components/dashboard/DashboardWhatsNew'
import { useManifestQuery } from '../queries/contentQueries'
import type { ManifestEntry } from '../content-runtime/manifests'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getBuildDate } from '../utils/version'


const dailySeed = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

const hashString = (value: string) => {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0
  }
  return hash
}

const pickDailyItem = <T,>(items: T[], key: string): T | undefined => {
  if (!items.length) return undefined
  return items[hashString(`${dailySeed()}:${key}`) % items.length]
}

export default function DashboardPage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)

  // ── Generated content pipeline (Phase 2) ──────────────────────────────
  const manifestQuery = useManifestQuery(lang)
  const manifest: ManifestEntry[] = useMemo(() => manifestQuery.data ?? [], [manifestQuery.data])

  // Stats from manifest
  const pipelineSkillCount = manifest.length
  const pipelineSafetyCount = manifest.filter((s) =>
    s.tags?.some((tag) => tag.includes('safety') || tag.includes('neck') || tag.includes('spine')),
  ).length

  // Daily picks for the main card (always a skill)
  const [skillRefreshKey, setSkillRefreshKey] = useState(0)
  const [spinKey, setSpinKey] = useState(0)
  const skillOfDay = useMemo(() => manifest.length > 0 ? pickDailyItem(manifest, `skill:${skillRefreshKey}`) : undefined, [manifest, skillRefreshKey])
  const handleRefresh = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSkillRefreshKey((k) => k + 1)
    setSpinKey((k) => k + 1)
  }, [])
  const todayItem = skillOfDay
    ? { title: skillOfDay.name, description: skillOfDay.summary, linkTo: `/skills/${skillOfDay.id}` }
    : undefined

  return (
    <PageShell
      header={
        <section className="space-y-6">
          {/* ── Simplified hero ── */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl hallmark-icon-box">
              <Sparkles className="h-5 w-5 text-slate-950" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
                {t('app.name')}
              </h1>
              <p className="mt-px text-xs hallmark-text-tertiary truncate">{t('app.thesis')}</p>
            </div>
          </div>
        </section>
      }
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* ─── Daily Focus — main card ─── */}
        <DailyFocusCard
          isLoading={manifestQuery.isLoading}
          todayItem={todayItem}
          onRefresh={handleRefresh}
          spinKey={spinKey}
        />

        {/* ─── Compact Stats Strip — single horizontal bar ─── */}
        <section className="lg:col-span-12 animate-fadeIn">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 rounded-xl border border-white/[0.06] bg-slate-900/40 px-5 py-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest hallmark-text-tertiary">{t('dashboard.totalSkills')}</p>
              <p className="mt-0.5 text-base font-bold hallmark-accent-text">{pipelineSkillCount}</p>
            </div>
            <div className="h-6 w-px bg-white/[0.06]" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest hallmark-text-tertiary">{t('dashboard.safetyCritical')}</p>
              <p className="mt-0.5 text-base font-bold text-rose-400">{pipelineSafetyCount}</p>
            </div>
            <div className="h-6 w-px bg-white/[0.06]" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest hallmark-text-tertiary">{t('dashboard.lastUpdate')}</p>
              <p className="mt-0.5 text-base font-semibold hallmark-text-secondary">{getBuildDate()}</p>
            </div>
          </div>
        </section>

        {/* ─── What's New — compact update strip ─── */}
        <DashboardWhatsNew />

        {/* ─── Hub Explorer — full width ─── */}
        <DashboardHubExplorer />

        {/* ─── Fix a problem — full width ─── */}
        <DashboardFixSection />
      </div>
    </PageShell>
  )
}
