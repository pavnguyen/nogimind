import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Film, AlertTriangle, RefreshCw, Flag } from 'lucide-react'

type Props = {
  youtubeId: string
  embedUrl: string
  title: string
  onReport?: (youtubeId: string) => void
}

function useOnlineStatus() {
  const [online, setOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  )
  useEffect(() => {
    const goOnline = () => setOnline(true)
    const goOffline = () => setOnline(false)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])
  return online
}

const OfflinePlaceholder = ({ t: translate }: { t: (key: string) => string }) => (
  <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-lg border border-white/10 bg-slate-900/80 text-slate-500">
    <Film className="h-10 w-10 text-slate-600" />
    <p className="max-w-xs px-4 text-center text-sm">
      {translate('video.offline')}
    </p>
  </div>
)

const UnavailablePlaceholder = ({
  t: translate,
  onRetry,
  onReport,
}: {
  t: (key: string) => string
  onRetry: () => void
  onReport?: () => void
}) => (
  <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-lg border border-amber-400/20 bg-slate-900/90 text-slate-400">
    <AlertTriangle className="h-10 w-10 text-amber-400/70" />
    <p className="max-w-xs px-4 text-center text-sm font-medium text-amber-200">
      {translate('video.unavailable')}
    </p>
    <p className="max-w-xs px-4 text-center text-xs text-slate-500">
      {translate('video.unavailableHint')}
    </p>
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-1.5 rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        {translate('video.retry')}
      </button>
      {onReport && (
        <button
          type="button"
          onClick={onReport}
          className="inline-flex items-center gap-1.5 rounded-md bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-300 transition hover:bg-amber-400/20"
        >
          <Flag className="h-3.5 w-3.5" />
          {translate('video.reportBroken')}
        </button>
      )}
    </div>
  </div>
)

export const LazyYouTubeEmbed = ({ youtubeId, embedUrl, title, onReport }: Props) => {
  const { t } = useTranslation()
  const [loaded, setLoaded] = useState(false)
  const [thumbnailError, setThumbnailError] = useState(false)
  const [iframeError, setIframeError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const isOnline = useOnlineStatus()
  const thumbnailUrl = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`

  const handleThumbnailError = useCallback(() => {
    // Don't mark as unavailable on first load — retry once
    if (retryCount < 1) {
      setRetryCount(prev => prev + 1)
      return
    }
    setThumbnailError(true)
  }, [retryCount])

  const handleRetry = useCallback(() => {
    setThumbnailError(false)
    setIframeError(false)
    setLoaded(false)
    setRetryCount(0)
  }, [])

  const handleReport = useCallback(() => {
    onReport?.(youtubeId)
  }, [onReport, youtubeId])

  if (!isOnline) {
    return <OfflinePlaceholder t={t} />
  }

  // Unavailable state (thumbnail 404 after retry, or iframe error)
  if (thumbnailError || iframeError) {
    return (
      <UnavailablePlaceholder
        t={t}
        onRetry={handleRetry}
        onReport={onReport ? handleReport : undefined}
      />
    )
  }

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
          onError={() => setIframeError(true)}
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group relative h-full w-full overflow-hidden text-left"
          aria-label={`${t('video.watch')}: ${title}`}
        >
          <img
            key={retryCount}
            src={thumbnailUrl}
            alt=""
            loading="lazy"
            onError={handleThumbnailError}
            className="h-full w-full object-cover opacity-75 transition duration-300 group-hover:scale-105 group-hover:opacity-95"
          />
          {/* Gradient overlay from bottom for cinematic depth */}
          <span className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          {/* Play button with glow effect */}
          <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-400/30 ring-2 ring-white/10 backdrop-blur-sm transition duration-200 group-hover:scale-110 group-hover:bg-white group-hover:shadow-cyan-300/50">
            <svg className="ml-0.5 h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          {/* Duration-like watch badge */}
          <span className="absolute bottom-3 left-3 rounded-md bg-slate-950/80 px-2.5 py-1 text-xs font-semibold tracking-wide text-cyan-100 backdrop-blur-sm shadow-glow-sm">
            {t('video.watch')}
          </span>
        </button>
      )}
    </div>
  )
}

