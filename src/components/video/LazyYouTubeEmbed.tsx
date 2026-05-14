import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  youtubeId: string
  embedUrl: string
  title: string
}

export const LazyYouTubeEmbed = ({ youtubeId, embedUrl, title }: Props) => {
  const { t } = useTranslation()
  const [loaded, setLoaded] = useState(false)
  const thumbnailUrl = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`

  return (
    <div className="aspect-video overflow-hidden rounded-lg border border-white/10 bg-slate-950">
      {loaded ? (
        <iframe
          className="h-full w-full"
          src={embedUrl}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group relative h-full w-full overflow-hidden text-left"
          aria-label={`${t('video.watch')}: ${title}`}
        >
          <img
            src={thumbnailUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-75 transition duration-200 group-hover:scale-[1.02] group-hover:opacity-90"
          />
          <span className="absolute inset-0 bg-slate-950/35" />
          <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-950/40 transition group-hover:bg-white">
            ▶
          </span>
          <span className="absolute bottom-3 left-3 rounded-md bg-slate-950/80 px-2.5 py-1 text-xs font-semibold text-cyan-100">
            {t('video.watch')}
          </span>
        </button>
      )}
    </div>
  )
}

