import { useTranslation } from 'react-i18next'
import { SectionAccordion } from '../skill/SectionAccordion'
import type { LanguageCode } from '../../types/skill'
import type { VideoReference } from '../../types/video'
import { VideoReferenceCard } from './VideoReferenceCard'

type Props = {
  videos: VideoReference[]
  lang: LanguageCode
}

export const VideoReferenceSection = ({ videos, lang }: Props) => {
  const { t } = useTranslation()
  if (!videos.length) return null

  return (
    <SectionAccordion
      id="video-references"
      title={t('video.videoReferences')}
      badge={`${videos.length} ${t('video.publicYouTubeReference')}`}
      accentColor="cyan"
      defaultOpen
    >
      <div className="space-y-4">
        <p className="rounded-lg border border-cyan-300/15 bg-cyan-300/8 px-3 py-2 text-xs leading-5 text-cyan-100">
          {t('video.externalNote')}
        </p>
        {videos.map((video) => (
          <VideoReferenceCard key={video.id} video={video} lang={lang} />
        ))}
      </div>
    </SectionAccordion>
  )
}

