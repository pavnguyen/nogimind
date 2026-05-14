import { useTranslation } from 'react-i18next'
import type { LanguageCode } from '../../types/skill'
import type { VideoReference } from '../../types/video'
import { getLocalizedArray, getLocalizedText } from '../../utils/localization'
import { LazyYouTubeEmbed } from './LazyYouTubeEmbed'
import { VideoTimestampList } from './VideoTimestampList'

type Props = {
  video: VideoReference
  lang: LanguageCode
}

export const VideoReferenceCard = ({ video, lang }: Props) => {
  const { t } = useTranslation()

  return (
    <article className="grid gap-4 rounded-lg border border-white/10 bg-slate-950/60 p-4 lg:grid-cols-[minmax(260px,0.9fr)_1fr]">
      <LazyYouTubeEmbed
        youtubeId={video.youtubeId}
        embedUrl={video.embedUrl}
        title={getLocalizedText(video.title, lang)}
      />
      <div className="space-y-4">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-cyan-300/10 px-2 py-1 text-xs font-semibold text-cyan-100">{t(`video.relevance.${video.relevance}`)}</span>
            <span className="rounded-md bg-white/8 px-2 py-1 text-xs font-semibold text-slate-300">{t(`video.level.${video.level}`)}</span>
            <span className="rounded-md bg-amber-300/10 px-2 py-1 text-xs font-semibold text-amber-100">{t('video.externalVideo')}</span>
          </div>
          <h3 className="mt-3 text-base font-semibold text-white">{getLocalizedText(video.title, lang)}</h3>
          <p className="mt-1 text-sm text-slate-400">{video.channelName}</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">{getLocalizedText(video.whyUseful, lang)}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{t('video.whatToWatchFor')}</p>
          <ul className="mt-2 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
            {getLocalizedArray(video.whatToWatchFor, lang).slice(0, 4).map((item) => (
              <li key={item} className="rounded-md bg-white/[0.04] px-3 py-2">{item}</li>
            ))}
          </ul>
        </div>

        <VideoTimestampList timestamps={video.timestamps} lang={lang} />

        {video.caution ? (
          <p className="rounded-md border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-xs leading-5 text-amber-100">
            {getLocalizedText(video.caution, lang)}
          </p>
        ) : null}
      </div>
    </article>
  )
}

