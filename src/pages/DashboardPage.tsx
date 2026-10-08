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
        <section className="space-y-6">
          {/* ── Compact brand hero ── */}
          <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-slate-900/40 px-5 py-4">
            <img
              src="/logo.png"
              alt={t('app.name')}
              className="h-14 w-14 shrink-0 rounded-xl object-cover shadow-md ring-1 ring-white/10"
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                {t('app.name')}
              </h1>
              <p className="mt-0.5 truncate text-xs hallmark-text-tertiary sm:text-sm">
                {t('app.thesis')}
              </p>
            </div>
          </div>
        </section>
      }
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* ─── Daily Focus, main card ─── */}
        <DailyFocusCard
          isLoading={manifestQuery.isLoading}
          todayItem={todayItem}
          onRefresh={handleRefresh}
          spinKey={spinKey}
        />

        {/* ─── Compact Stats Strip, single horizontal bar ─── */}
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

        {/* ─── What's New, compact update strip ─── */}
        <DashboardWhatsNew />

        {/* ─── Hub Explorer, full width ─── */}
        <DashboardHubExplorer />

        {/* ─── With gratitude - Guardian HCMC & coach Jon TRAN ─── */}
        <section className="lg:col-span-12 animate-fadeIn md:[animation-delay:250ms]">
          <div className="relative overflow-hidden rounded-2xl border border-amber-400/20 bg-linear-to-r from-amber-400/[0.10] via-amber-300/[0.04] to-rose-400/[0.07] px-5 py-4">
            <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-amber-400 to-rose-400 text-slate-950 shadow-lg shadow-amber-500/20">
                  <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-200/90">{t('about.thanks.heading')}</p>
                  <p className="mt-1 text-xs leading-5 text-amber-50/75">{t('about.thanks.dashboard')}</p>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <a
                  href="https://www.facebook.com/profile.php?id=100087911966054"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300/25 bg-amber-300/10 px-3 py-2 text-xs font-semibold text-amber-100 transition-colors hover:border-amber-200/50 hover:bg-amber-300/20 hover:text-white"
                >
                  <FacebookIcon className="h-3.5 w-3.5 shrink-0" />
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/guardianhcmc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-rose-300/25 bg-rose-300/10 px-3 py-2 text-xs font-semibold text-rose-100 transition-colors hover:border-rose-200/50 hover:bg-rose-300/20 hover:text-white"
                >
                  <InstagramIcon className="h-3.5 w-3.5 shrink-0" />
                  Instagram
                </a>
                <Link
                  to="/about"
                  className="inline-flex items-center rounded-lg border border-white/[0.10] px-3.5 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-amber-300/30 hover:text-amber-100"
                >
                  {t('about.thanks.more')}
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageShell>
  )
}
