import { useTranslation } from 'react-i18next'
import type { LanguageCode } from '../../types/skill'
import type { VideoTimestamp } from '../../types/video'
import { getLocalizedText } from '../../utils/localization'

type Props = {
  timestamps?: VideoTimestamp[]
  lang: LanguageCode
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60
  return `${minutes}:${String(remainder).padStart(2, '0')}`
}

export const VideoTimestampList = ({ timestamps, lang }: Props) => {
  const { t } = useTranslation()
  if (!timestamps?.length) return null

  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/55 p-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{t('video.timestamps')}</p>
      <div className="mt-2 space-y-2">
        {timestamps.map((timestamp) => (
          <div key={timestamp.id} className="text-sm leading-6 text-slate-300">
            <span className="mr-2 rounded bg-white/8 px-1.5 py-0.5 font-mono text-xs text-cyan-100">{formatTime(timestamp.timeSeconds)}</span>
            <span className="font-medium text-slate-100">{getLocalizedText(timestamp.label, lang)}</span>
            {timestamp.note ? <p className="ml-12 text-xs text-slate-500">{getLocalizedText(timestamp.note, lang)}</p> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

