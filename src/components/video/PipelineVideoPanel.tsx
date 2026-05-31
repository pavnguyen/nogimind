import { useTranslation } from 'react-i18next'
import { useSkillVideosQuery } from '../../queries/contentQueries'
import { VideoReferenceCard } from './VideoReferenceCard'
import { SectionAccordion } from '../skill/SectionAccordion'
import { useVideoReport } from '../../hooks/useVideoReport'

type Props = {
  skillId: string
}

export const PipelineVideoPanel = ({ skillId }: Props) => {
  const { t } = useTranslation()
  const videosQuery = useSkillVideosQuery(skillId)
  const videos = videosQuery.data?.videos ?? []
  const { reportedIds, handleReport } = useVideoReport(skillId)

  if (videosQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400/30 border-t-cyan-400" />
      </div>
    )
  }

  if (!videos.length) {
    return (
      <p className="py-8 text-center text-sm text-slate-500">
        {t('common.none', 'No video references available yet.')}
      </p>
    )
  }

  return (
    <SectionAccordion
      id="pipeline-video-references"
      title={t('video.videoReferences')}
      badge={`${videos.length} ${t('video.publicYouTubeReference')}`}
      accentColor="cyan"
      defaultOpen
    >
      <div className="space-y-4">
        <p className="rounded-lg border border-cyan-300/15 bg-cyan-300/8 px-3 py-2 text-xs leading-5 text-cyan-100">
          {t('video.externalNote')}
        </p>
        {videos.map((video, i) => (
          <div key={video.youtubeId}>
            <VideoReferenceCard
              youtubeId={video.youtubeId}
              embedUrl={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
              channel={video.channel}
              whyUseful={video.whyUseful}
              relevance={video.relevance}
              level={video.level}
              timestampStart={video.timestampStart}
              onReport={!reportedIds.has(video.youtubeId) ? handleReport : undefined}
              reported={reportedIds.has(video.youtubeId)}
            />
            {/* Separator line between videos */}
            {i < videos.length - 1 && (
              <div className="mt-4 border-t border-white/[0.04]" />
            )}
          </div>
        ))}
      </div>
    </SectionAccordion>
  )
}
