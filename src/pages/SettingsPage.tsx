import { useTranslation } from 'react-i18next'
import { SectionCard } from '../components/common/SectionCard'
import { ViewModeSwitcher } from '../components/common/ViewModeSwitcher'
import { LanguageSwitcher } from '../components/i18n/LanguageSwitcher'
import { ExportImportPanel } from '../components/settings/ExportImportPanel'
import { useSettingsStore } from '../stores/useSettingsStore'
import type { SkillMapView } from '../types/settings'

export default function SettingsPage() {
  const { t } = useTranslation()
  const skillMapView = useSettingsStore((state) => state.skillMapView)
  const setSkillMapView = useSettingsStore((state) => state.setSkillMapView)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white">{t('settings.heading')}</h1>
        <p className="mt-2 max-w-3xl text-slate-400">{t('settings.subtitle')}</p>
      </div>
      <SectionCard title={t('settings.language')}>
        <LanguageSwitcher />
      </SectionCard>
      <SectionCard title={t('settings.viewMode')}>
        <ViewModeSwitcher />
      </SectionCard>
      <SectionCard title={t('settings.skillMapDefault')}>
        <div className="inline-flex rounded-lg border border-white/10 bg-slate-950/70 p-1">
          {(['cards', 'graph'] as SkillMapView[]).map((view) => (
            <button
              type="button"
              key={view}
              onClick={() => setSkillMapView(view)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${skillMapView === view ? 'bg-emerald-300 text-slate-950' : 'text-slate-300 hover:bg-white/10'}`}
            >
              {t(`common.${view}`)}
            </button>
          ))}
        </div>
      </SectionCard>
      <SectionCard title={t('settings.exportImport')}>
        <ExportImportPanel />
      </SectionCard>
      <SectionCard title={t('app.name')}>
        <p className="text-sm text-slate-400">{t('app.version')}</p>
      </SectionCard>
    </div>
  )
}
