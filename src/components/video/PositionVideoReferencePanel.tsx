import { useTranslation } from 'react-i18next'
import { useQueries } from '@tanstack/react-query'
import { VideoReferenceCard } from './VideoReferenceCard'
import { getSkillVideos } from '../../content-runtime/videos'
import { contentKeys } from '../../queries/contentQueries'
import { useVideoReport } from '../../hooks/useVideoReport'
import type { SkillVideoReference } from '../../content-runtime/videos'

type Props = {
  skillIds: string[]
}

export const PositionVideoReferencePanel = ({ skillIds }: Props) => {
  const { t } = useTranslation()
  const { reportedIds, handleReport } = useVideoReport()

  const videoQueries = useQueries({
    queries: skillIds.map((id) => ({
      queryKey: contentKeys.skillVideos(id),
      queryFn: () => getSkillVideos(id),
      enabled: Boolean(id),
      staleTime: 10 * 60 * 1000,
    })),
  })

  const isLoading = videoQueries.some((q) => q.isLoading)

  // Combine all videos from all related skills
  const allVideos: { video: SkillVideoReference; skillId: string }[] = []
  for (const query of videoQueries) {
    if (query.data?.videos) {
      for (const v of query.data.videos) {
        allVideos.push({ video: v, skillId: query.data.skillId })
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400/30 border-t-cyan-400" />
      </div>
    )
  }

  if (!allVideos.length) {
    return (
      <p className="py-8 text-center text-sm text-slate-500">
        {t('common.none')}
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {allVideos.map(({ video, skillId }) => (
        <VideoReferenceCard
          key={`${skillId}-${video.youtubeId}`}
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
      ))}
    </div>
  )
}
