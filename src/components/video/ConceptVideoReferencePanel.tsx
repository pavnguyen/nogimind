import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { LanguageCode } from '../../types/skill'
import { getVideosForConcept } from '../../data/videos'
import { VideoReferenceSection } from './VideoReferenceSection'

type Props = {
  conceptId: string
  lang: LanguageCode
}

export const ConceptVideoReferencePanel = ({ conceptId, lang }: Props) => {
  const { t } = useTranslation()
  const videos = useMemo(() => getVideosForConcept(conceptId), [conceptId])

  return videos.length ? (
    <VideoReferenceSection videos={videos} lang={lang} />
  ) : (
    <p className="text-sm text-slate-500">{t('common.none')}</p>
  )
}
