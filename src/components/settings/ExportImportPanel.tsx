import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Download, RotateCcw, Upload } from 'lucide-react'
import { exportUserData } from '../../repositories/userDataRepository'
import { useImportUserDataMutation, useResetUserDataMutation } from '../../queries/userDataMutations'

export const ExportImportPanel = () => {
  const { t } = useTranslation()
  const importMutation = useImportUserDataMutation()
  const resetMutation = useResetUserDataMutation()
  const [json, setJson] = useState('')
  const [message, setMessage] = useState('')

  const handleExport = async () => {
    const data = await exportUserData()
    setJson(JSON.stringify(data, null, 2))
  }

  const handleImport = () => {
    try {
      const data = JSON.parse(json) as unknown
      importMutation.mutate(data as never, {
        onSuccess: () => setMessage(t('settings.imported')),
        onError: () => setMessage(t('settings.importError')),
      })
    } catch {
      setMessage(t('settings.importError'))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-md border border-cyan-300/25 bg-cyan-300/10 px-3 py-2 text-sm font-medium text-cyan-100"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          {t('settings.exportData')}
        </button>
        <button
          type="button"
          onClick={handleImport}
          className="inline-flex items-center gap-2 rounded-md border border-emerald-300/25 bg-emerald-300/10 px-3 py-2 text-sm font-medium text-emerald-100"
        >
          <Upload className="h-4 w-4" aria-hidden="true" />
          {t('settings.importData')}
        </button>
        <button
          type="button"
          onClick={() => resetMutation.mutate()}
          className="inline-flex items-center gap-2 rounded-md border border-rose-300/25 bg-rose-300/10 px-3 py-2 text-sm font-medium text-rose-100"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          {t('settings.resetData')}
        </button>
      </div>
      <textarea
        value={json}
        onChange={(event) => setJson(event.target.value)}
        placeholder={t('settings.pasteJson')}
        className="min-h-72 w-full rounded-md border border-white/10 bg-slate-900 p-3 font-mono text-sm text-slate-100"
      />
      <p className="text-sm text-slate-400">{message || t('settings.resetWarning')}</p>
    </div>
  )
}
