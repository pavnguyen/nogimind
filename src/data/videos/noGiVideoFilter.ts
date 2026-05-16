import type { VideoReference } from '../../types/video'

type VideoLike = Pick<VideoReference, 'title' | 'channelName' | 'techniqueTags' | 'sourceNote'> & {
  id?: string
  summary?: string
  source_page?: string
  source_name?: string
}

export type NoGiVideoStatus = 'keep' | 'manual_review' | 'reject'

export type NoGiVideoClassification = {
  status: NoGiVideoStatus
  reasons: string[]
}

const visualNoGiSignals = [
  'no gi',
  'no-gi',
  'nogi',
  'grappling',
  'adcc',
  'mma',
  'wrestling',
  'submission grappling',
  'b-team',
]

const technicalNoGiSignals = [
  'heel hook',
  'leg lock',
  'leglock',
  'body lock',
  'bodylock',
  'front headlock',
  'crab ride',
  'k guard',
  'k-guard',
  'saddle',
  'inside sankaku',
  'straight ankle lock',
]

const trustedNoGiChannels = [
  'Gordon Ryan',
  'Craig Jones',
  'Lachlan Giles',
  'Neil Melanson',
  'Giancarlo Bodoni',
  'Nicky Ryan',
  'Jason Rau',
  'B-Team Jiu Jitsu',
  'Ben Kool Tech',
  'Brian Glick',
  'Garry Tonon',
]

const deniedGiLeaningChannels = [
  'The Grappling Academy',
]

// Channels known to produce primarily Gi content.
// Videos from these channels are auto-rejected regardless of title signals.
const giOnlyChannels = [
  'Stephan Kesting',
  'AOJ',
  'AOJ+',
  'Art of Jiu Jitsu',
  'Art of Jiujitsu',
  'Tainan Dalpra',
  'Mendes Brothers',
  'Mendes Bros',
  'Mendes BJJ',
  'The Grappling Accademy',
]

const giOnlySignals = [
  'kimono',
  'lapel',
  'collar',
  'sleeve',
  'lasso',
  'spider',
  'worm',
  'collar choke',
  'bow and arrow',
  'loop choke',
  'baseball bat choke',
  'cross grip',
]

const transferableSignals = [
  'butterfly',
  'half guard',
  'x guard',
  'single leg x',
  'de la riva',
  'reverse de la riva',
  'closed guard',
  'inverted guard',
  'knee shield',
]

const normalized = (value: string) =>
  value
    .toLowerCase()
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()

const hasStandaloneGi = (text: string) =>
  /\bgi\b/.test(
    text
      .replace(/\bno\s*-?\s*gi\b/g, '')
      .replace(/\bnogi\b/g, ''),
  )

const getTitleText = (video: VideoLike) =>
  typeof video.title === 'string'
    ? video.title
    : video.title.en

const isBjjTipsGenerated = (video: VideoLike) =>
  video.id?.startsWith('bjj-') ||
  video.sourceNote?.toLowerCase().includes('bjj.tips') ||
  video.source_page?.startsWith('instructors/') ||
  video.source_page?.startsWith('positions/')

export const classifyNoGiVideo = (video: VideoLike): NoGiVideoClassification => {
  if (deniedGiLeaningChannels.some((channel) => normalized(video.channelName) === normalized(channel))) {
    return { status: 'reject', reasons: ['channel is gi-leaning'] }
  }

  const visualHaystack = normalized([
    getTitleText(video),
    video.channelName,
    video.sourceNote ?? '',
    video.source_page ?? '',
    video.source_name ?? '',
  ].join(' '))
  const sourceHaystack = normalized([
    visualHaystack,
    video.summary ?? '',
  ].join(' '))
  const tagHaystack = normalized(video.techniqueTags.join(' '))
  const haystack = `${sourceHaystack} ${tagHaystack}`.trim()

  const visualReasons = visualNoGiSignals.filter((signal) => visualHaystack.includes(signal))
  const technicalReasons = technicalNoGiSignals.filter((signal) => haystack.includes(signal))
  const trustedChannel = trustedNoGiChannels.some((channel) => normalized(video.channelName) === normalized(channel))
  const strongReasons = [...visualReasons, ...technicalReasons]
  const giReasons = giOnlySignals.filter((signal) => haystack.includes(signal))
  if (hasStandaloneGi(haystack)) giReasons.push('standalone gi')

  if (giReasons.length > 0) {
    return { status: 'reject', reasons: giReasons }
  }

  // Auto-reject known Gi-heavy channels
  if (giOnlyChannels.some((channel) => normalized(video.channelName) === normalized(channel))) {
    return { status: 'reject', reasons: ['gi-heavy channel'] }
  }

  if (isBjjTipsGenerated(video)) {
    if (visualReasons.length > 0) return { status: 'keep', reasons: visualReasons }
    if (trustedChannel && technicalReasons.length > 0) {
      return { status: 'keep', reasons: ['trusted no-gi channel', ...technicalReasons] }
    }
    return { status: 'reject', reasons: ['bjj.tips item lacks visual no-gi proof'] }
  }

  if (strongReasons.length > 0 && giReasons.length === 0) {
    return { status: 'keep', reasons: strongReasons }
  }

  const transferableReasons = transferableSignals.filter((signal) => haystack.includes(signal))
  if (transferableReasons.length > 0) {
    return { status: 'manual_review', reasons: transferableReasons }
  }

  return { status: 'keep', reasons: ['no gi-specific conflict found'] }
}

export const isProductionNoGiVideo = (video: VideoLike) =>
  classifyNoGiVideo(video).status !== 'reject'
