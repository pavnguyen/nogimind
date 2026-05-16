import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { LanguageCode } from '../../types/skill'
import { getVideosForPosition } from '../../data/videos'
import { VideoReferenceSection } from './VideoReferenceSection'

type Props = {
  positionId: string
  lang: LanguageCode
}

export const PositionVideoReferencePanel = ({ positionId, lang }: Props) => {
  const { t } = useTranslation()
  const videos = useMemo(() => getVideosForPosition(positionId), [positionId])

  return videos.length ? (
    <VideoReferenceSection videos={videos} lang={lang} />
  ) : (
    <p className="text-sm text-slate-500">{t('common.none')}</p>
  )
}
