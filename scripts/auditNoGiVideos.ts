import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { classifyNoGiVideo, type NoGiVideoStatus } from '../src/data/videos/noGiVideoFilter'
import { videoReferences } from '../src/data/videos/videoReferences'

type ScrapedVideo = {
  source_page: string
  source_name: string
  source_type: string
  technique: string
  url: string
  summary: string
}

const countByStatus = <T>(items: T[], classify: (item: T) => NoGiVideoStatus) =>
  items.reduce<Record<NoGiVideoStatus, number>>((acc, item) => {
    acc[classify(item)] += 1
    return acc
  }, { keep: 0, manual_review: 0, reject: 0 })

const scrapedVideos: ScrapedVideo[] = JSON.parse(
  readFileSync(resolve('content/bjj_tips_videos.json'), 'utf-8'),
)

const scrapedCounts = countByStatus(scrapedVideos, (video) =>
  classifyNoGiVideo({
    title: { en: video.technique, vi: video.technique, fr: video.technique },
    channelName: video.source_name,
    techniqueTags: [],
    sourceNote: video.source_page,
    summary: video.summary,
  }).status,
)

const productionCounts = countByStatus(videoReferences, (video) =>
  classifyNoGiVideo(video).status,
)

const productionRejects = videoReferences
  .map((video) => ({ video, classification: classifyNoGiVideo(video) }))
  .filter((item) => item.classification.status === 'reject')

const productionReview = videoReferences
  .map((video) => ({ video, classification: classifyNoGiVideo(video) }))
  .filter((item) => item.classification.status === 'manual_review')

console.log(JSON.stringify({
  bjjTipsSource: {
    total: scrapedVideos.length,
    ...scrapedCounts,
  },
  production: {
    total: videoReferences.length,
    ...productionCounts,
    rejectedIds: productionRejects.map(({ video, classification }) => ({
      id: video.id,
      title: video.title.en,
      reasons: classification.reasons,
    })),
    manualReviewSample: productionReview.slice(0, 25).map(({ video, classification }) => ({
      id: video.id,
      title: video.title.en,
      reasons: classification.reasons,
    })),
  },
}, null, 2))
