import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { LanguageCode } from '../../types/skill'
import { getVideosForSkill } from '../../data/videos'
import { VideoReferenceSection } from './VideoReferenceSection'

type Props = {
  skillId: string
  lang: LanguageCode
}

export const SkillVideoReferencePanel = ({ skillId, lang }: Props) => {
  const { t } = useTranslation()
  const videos = useMemo(() => getVideosForSkill(skillId), [skillId])

  return videos.length ? (
    <VideoReferenceSection videos={videos} lang={lang} />
  ) : (
    <p className="text-sm text-slate-500">{t('common.none')}</p>
  )
}
