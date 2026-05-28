import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'
import { Download, CheckCircle2 } from 'lucide-react'

import { getBuildDate } from '../utils/version'

import { LanguageSwitcher } from '../components/i18n/LanguageSwitcher'
import { ExportImportPanel } from '../components/settings/ExportImportPanel'

function useIsStandalone() {
  return typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches
}

function InstallAppButton() {
  const { t } = useTranslation()
  const isStandalone = useIsStandalone()
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const [installed, setInstalled] = useState(isStandalone)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)

    const onAppInstalled = () => {
      setInstalled(true)
      setDeferredPrompt(null)
    }
    window.addEventListener('appinstalled', onAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    ;(deferredPrompt as unknown as { prompt: () => Promise<void> }).prompt()
    const result = await (deferredPrompt as unknown as { userChoice: Promise<{ outcome: string }> }).userChoice
    if (result.outcome === 'accepted') {
      setInstalled(true)
    }
    setDeferredPrompt(null)
  }

  if (installed) {
    return (
      <button
        disabled
        className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-300"
      >
        <CheckCircle2 className="h-4 w-4" />
        {t('pwa.installed')}
      </button>
    )
  }

  if (!deferredPrompt) {
    return (
      <button
        disabled
        className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm font-medium text-slate-500"
      >
        <Download className="h-4 w-4" />
        {t('pwa.notAvailable')}
      </button>
    )
  }

  return (
    <button
      onClick={handleInstall}
      className="flex items-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-4 py-2.5 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20 hover:text-cyan-200"
    >
      <Download className="h-4 w-4" />
      {t('pwa.install')}
    </button>
  )
}

export default function SettingsPage() {
  const { t } = useTranslation()

  return (
    <PageShell
      header={
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">{t('settings.heading')}</h1>
          <p className="mt-1 text-sm text-slate-400">{t('settings.subtitle')}</p>
        </div>
      }
    >
      <SectionCard title={t('settings.language')}>
        <LanguageSwitcher />
      </SectionCard>

      <SectionCard title={t('settings.installApp')}>
        <p className="mb-3 text-sm text-slate-400">{t('pwa.description')}</p>
        <InstallAppButton />
      </SectionCard>

      <SectionCard title={t('settings.exportImport')}>
        <ExportImportPanel />
      </SectionCard>
      <SectionCard title={t('app.name')}>
        <p className="text-sm text-slate-400">{t('app.version')} · cập nhật {getBuildDate()}</p>
      </SectionCard>
    </PageShell>
  )
}
