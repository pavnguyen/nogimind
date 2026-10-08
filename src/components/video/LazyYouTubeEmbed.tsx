import { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Film, AlertTriangle, RefreshCw, Flag } from 'lucide-react'

type Props = {
  youtubeId: string
  embedUrl: string
  title: string
  onReport?: (youtubeId: string) => void
}

/**
 * How far outside the viewport a player starts to mount.
 * Players are only created once a card gets close to the screen, so a long list
 * of references does not load a dozen YouTube players at once.
 */
const PRELOAD_MARGIN = '240px'

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

/** Keep the URL free of a stale autoplay request, the viewer presses play. */
const playbackUrl = (embedUrl: string): string => {
  const separator = embedUrl.includes('?') ? '&' : '?'
  return `${embedUrl}${separator}playsinline=1&rel=0`
}

const OfflinePlaceholder = ({ t: translate }: { t: (key: string) => string }) => (
  <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-lg border border-warm-50/10 bg-warm-900/80 text-warm-500">
    <Film className="h-10 w-10 text-warm-600" />
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
  <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-lg border border-gold-400/20 bg-warm-900/90 text-warm-400">
    <AlertTriangle className="h-10 w-10 text-gold/70" />
    <p className="max-w-xs px-4 text-center text-sm font-medium text-gold">
      {translate('video.unavailable')}
    </p>
    <p className="max-w-xs px-4 text-center text-xs text-warm-500">
      {translate('video.unavailableHint')}
    </p>
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-1.5 rounded-md bg-warm-800 px-3 py-1.5 text-xs font-medium text-warm-300 transition hover:bg-warm-700 hover:text-warm-50"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        {translate('video.retry')}
      </button>
      {onReport && (
        <button
          type="button"
          onClick={onReport}
          className="inline-flex items-center gap-1.5 rounded-md bg-gold-400/10 px-3 py-1.5 text-xs font-medium text-gold transition hover:bg-gold-400/20"
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
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [thumbnailError, setThumbnailError] = useState(false)
  const [iframeError, setIframeError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const isOnline = useOnlineStatus()
  const thumbnailUrl = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`

  // Mount the real player as soon as the card approaches the viewport.
  useEffect(() => {
    if (mounted) return

    const node = containerRef.current
    if (!node) {
      setMounted(true)
      return
    }

    // Cards that are already on screen (or in a browser without
    // IntersectionObserver) skip the poster and mount right away.
    const rect = node.getBoundingClientRect()
    const alreadyVisible = rect.bottom >= 0 && rect.top <= (window.innerHeight || 0)
    if (alreadyVisible || typeof IntersectionObserver === 'undefined') {
      setMounted(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMounted(true)
          observer.disconnect()
        }
      },
      { rootMargin: PRELOAD_MARGIN },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [mounted])

  const handleThumbnailError = useCallback(() => {
    // Don't mark as unavailable on first load, retry once
    if (retryCount < 1) {
      setRetryCount(prev => prev + 1)
      return
    }
    setThumbnailError(true)
  }, [retryCount])

  const handleRetry = useCallback(() => {
    setThumbnailError(false)
    setIframeError(false)
    setRetryCount(0)
    setMounted(false)
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
    <div
      ref={containerRef}
      className="aspect-video overflow-hidden rounded-lg border border-warm-50/10 bg-warm-950"
    >
      {mounted ? (
        <iframe
          className="h-full w-full"
          src={playbackUrl(embedUrl)}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
          onError={() => setIframeError(true)}
        />
      ) : (
        // Poster while the player is still off screen. There is no play button
        // here on purpose: YouTube's own control is the single way to start the
        // video, so the viewer never has to click twice.
        <img
          key={retryCount}
          src={thumbnailUrl}
          alt=""
          loading="lazy"
          onError={handleThumbnailError}
          className="h-full w-full object-cover opacity-75"
        />
      )}
    </div>
  )
}
