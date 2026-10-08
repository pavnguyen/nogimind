import { useMemo, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Heart } from 'lucide-react'
import { FacebookIcon, InstagramIcon } from '../components/common/BrandIcons'
import { PageShell } from '../components/common/PageShell'
import { DailyFocusCard } from '../components/dashboard/DailyFocusCard'
import { DashboardHubExplorer } from '../components/dashboard/DashboardHubExplorer'
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
        <section className="rounded-2xl border border-warm-50/[0.06] bg-warm-900/40 px-4 py-3.5 sm:px-5">
          {/* ── Brand + thesis, the single place the slogan appears ── */}
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src="/logo.png"
              alt={t('app.name')}
              className="h-10 w-10 shrink-0 rounded-lg object-cover shadow-md ring-1 ring-warm-50/10 sm:h-12 sm:w-12"
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-base font-bold tracking-tight text-warm-50 sm:text-lg">
                {t('app.name')}
              </h1>
              <p className="mt-0.5 text-xs leading-5 text-warm-400 sm:text-sm sm:leading-6">
                {t('app.thesis')}
              </p>
            </div>
          </div>

          {/* ── Inline stats, one row instead of a separate strip ── */}
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-warm-50/[0.06] pt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-widest hallmark-text-tertiary">{t('dashboard.totalSkills')}</span>
              <span className="text-sm font-bold hallmark-accent-text">{pipelineSkillCount}</span>
            </div>
            <div className="h-4 w-px bg-warm-50/[0.08]" aria-hidden="true" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-widest hallmark-text-tertiary">{t('dashboard.safetyCritical')}</span>
              <span className="text-sm font-bold text-copper">{pipelineSafetyCount}</span>
            </div>
            <div className="h-4 w-px bg-warm-50/[0.08]" aria-hidden="true" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-widest hallmark-text-tertiary">{t('dashboard.lastUpdate')}</span>
              <span className="text-sm font-semibold hallmark-text-secondary">{getBuildDate()}</span>
            </div>
          </div>

          {/* ── With gratitude, one compact line with a warm accent ── */}
          <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 rounded-lg border border-gold-400/25 bg-linear-to-r from-gold-400/[0.14] via-copper-400/[0.07] to-transparent px-3 py-2 text-[11px] font-medium leading-5 text-gold">
            <Heart className="h-3.5 w-3.5 shrink-0 fill-current text-gold" aria-hidden="true" />
            <span className="min-w-0">{t('about.thanks.dashboard')}</span>
            <span aria-hidden="true" className="text-gold/40">
              ·
            </span>
            <a
              href="https://www.facebook.com/profile.php?id=100087911966054"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Guardian HCMC on Facebook"
              className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-gold-400/20 text-gold transition-colors hover:bg-gold-400/35 hover:text-warm-50"
            >
              <FacebookIcon className="h-3.5 w-3.5 shrink-0" />
            </a>
            <a
              href="https://www.instagram.com/guardianhcmc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Guardian HCMC on Instagram"
              className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-copper-400/20 text-copper transition-colors hover:bg-copper-400/35 hover:text-warm-50"
            >
              <InstagramIcon className="h-3.5 w-3.5 shrink-0" />
            </a>
            <Link
              to="/about"
              className="font-semibold text-gold underline-offset-2 transition-colors hover:text-warm-50 hover:underline"
            >
              {t('about.thanks.more')}
            </Link>
          </div>
        </section>
      }
    >
      <div className="grid gap-5 lg:grid-cols-12">
        {/* ─── Daily Focus, main card ─── */}
        <DailyFocusCard
          isLoading={manifestQuery.isLoading}
          todayItem={todayItem}
          onRefresh={handleRefresh}
          spinKey={spinKey}
        />

        {/* ─── What's New, compact update strip ─── */}
        <DashboardWhatsNew />

        {/* ─── Hub Explorer, full width ─── */}
        <DashboardHubExplorer />
      </div>
    </PageShell>
  )
}
