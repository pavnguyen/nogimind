import { useTranslation } from 'react-i18next'
import { useSkillVideosQuery } from '../../queries/contentQueries'
import { LazyYouTubeEmbed } from './LazyYouTubeEmbed'
import { SectionAccordion } from '../skill/SectionAccordion'

type Props = {
  skillId: string
}

export const PipelineVideoPanel = ({ skillId }: Props) => {
  const { t } = useTranslation()
  const videosQuery = useSkillVideosQuery(skillId)
  const videos = videosQuery.data?.videos ?? []

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
          <article
            key={video.youtubeId}
            className="grid gap-4 rounded-lg border border-white/10 bg-slate-950/60 p-4 lg:grid-cols-[minmax(260px,0.9fr)_1fr]"
          >
            <LazyYouTubeEmbed
              youtubeId={video.youtubeId}
              embedUrl={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
            />
            <div className="space-y-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-cyan-300/10 px-2 py-1 text-xs font-semibold text-cyan-100">
                    {video.relevance === 'primary' ? t('video.relevance.primary_reference', 'Primary') : t('video.relevance.supplemental', 'Supplemental')}
                  </span>
                  <span className="rounded-md bg-white/8 px-2 py-1 text-xs font-semibold text-slate-300">
                    {t(`video.level.${video.level}`, video.level)}
                  </span>
                  <span className="rounded-md bg-amber-300/10 px-2 py-1 text-xs font-semibold text-amber-100">
                    {t('video.externalVideo')}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-white">{video.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{video.channel}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{video.whyUseful}</p>
              </div>

              {video.timestampStart !== undefined && video.timestampStart > 0 && (
                <a
                  href={`https://youtu.be/${video.youtubeId}?t=${video.timestampStart}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  <span>⏱</span>
                  {t('video.startAt', 'Start at {time}', { time: formatTimestamp(video.timestampStart) })}
                </a>
              )}
            </div>

            {/* Separator line between videos */}
            {i < videos.length - 1 && (
              <div className="col-span-full border-t border-white/[0.06]" />
            )}
          </article>
        ))}
      </div>
    </SectionAccordion>
  )
}

/** Format seconds to MM:SS */
function formatTimestamp(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}
