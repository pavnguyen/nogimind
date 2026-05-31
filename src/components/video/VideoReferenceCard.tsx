import { useTranslation } from 'react-i18next'
import { LazyYouTubeEmbed } from './LazyYouTubeEmbed'

type Props = {
  youtubeId: string
  embedUrl: string
  title: string
  channel: string
  whyUseful: string
  relevance: string
  level: string
  timestampStart?: number
  onReport?: (youtubeId: string) => void
  reported?: boolean
}

/** Format seconds to MM:SS */
function formatTimestamp(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export const VideoReferenceCard = ({
  youtubeId,
  embedUrl,
  title,
  channel,
  whyUseful,
  relevance,
  level,
  timestampStart,
  onReport,
  reported,
}: Props) => {
  const { t } = useTranslation()

  return (
    <article className="group relative grid gap-4 overflow-hidden rounded-xl border border-white/[0.06] bg-slate-950/50 p-3 shadow-glow-sm transition-all duration-200 hover:border-hallmark-accent-dim hover:shadow-glow sm:gap-5 sm:p-5 lg:grid-cols-[minmax(260px,0.9fr)_1fr]">
      {/* Left accent border — theme-aware */}
      <span className="absolute left-0 top-0 h-full w-0.5 bg-hallmark-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true" />

      <LazyYouTubeEmbed
        youtubeId={youtubeId}
        embedUrl={embedUrl}
        title={title}
        onReport={onReport}
      />

      <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-hallmark-accent-dim px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider hallmark-accent-text">
            {relevance === 'primary'
              ? t('video.relevance.primary_reference', 'Primary')
              : t('video.relevance.supplemental', 'Supplemental')}
          </span>
          <span className="inline-flex items-center rounded-md bg-white/[0.06] px-2 py-0.5 text-[11px] font-medium text-slate-400">
            {t(`video.level.${level}`, level)}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-amber-400/70">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM9.75 15.854v-7.708l6.083 3.854-6.083 3.854z" />
            </svg>
            {t('video.externalVideo')}
          </span>
        </div>

        {/* Title & channel */}
        <div className="space-y-1">
          <h3 className="text-[15px] font-semibold leading-snug text-white transition-colors group-hover:[color:var(--hallmark-text-accent)] sm:text-base">
            {title}
          </h3>
          <p className="flex items-center gap-1.5 text-sm text-slate-500">
            <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {channel}
          </p>
        </div>

        {/* Why useful — with subtle quote accent */}
        {whyUseful && (
          <div className="relative rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2.5 sm:px-4">
            <svg
              className="absolute left-2 top-2 h-3.5 w-3.5 text-slate-600/40"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.165 11 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.406-.62-2.917-1.179zm10 0c-1.03-1.094-1.583-2.321-1.583-4.31 0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.165 21 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.406-.62-2.917-1.179z" />
            </svg>
            <p className="pl-5 text-sm leading-6 text-slate-400">{whyUseful}</p>
          </div>
        )}

        {/* Bottom row: timestamp link + report status */}
        <div className="flex flex-wrap items-center gap-3">
          {timestampStart !== undefined && timestampStart > 0 && (
            <a
              href={`https://youtu.be/${youtubeId}?t=${timestampStart}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-hallmark-accent-dim bg-hallmark-accent-dim/30 px-2.5 py-1 text-[11px] font-semibold tracking-wide hallmark-accent-text transition-all hover:bg-hallmark-accent-dim/60"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
              {t('video.startAt', { time: formatTimestamp(timestampStart) })}
            </a>
          )}

          {reported && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-400/80">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('video.reportSuccess')}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
