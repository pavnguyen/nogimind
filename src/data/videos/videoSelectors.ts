import type { LanguageCode } from '../../types/skill'
import type { VideoReference } from '../../types/video'
import { isProductionNoGiVideo } from './noGiVideoFilter'
import { videoReferences } from './videoReferences'

const byRelevance = (video: VideoReference) =>
  video.relevance === 'primary_reference' ||
  video.relevance === 'supplemental' ||
  video.relevance === 'safety_reference'

export const getVideosForSkill = (skillId: string): VideoReference[] =>
  videoReferences.filter((video) => isProductionNoGiVideo(video) && video.relatedSkillIds.includes(skillId))

export const getVideosForPosition = (positionId: string): VideoReference[] =>
  videoReferences.filter((video) => isProductionNoGiVideo(video) && video.relatedPositionIds?.includes(positionId))

export const getVideosForConcept = (conceptId: string): VideoReference[] =>
  videoReferences.filter((video) => isProductionNoGiVideo(video) && video.relatedConceptIds?.includes(conceptId))

export const getPrimaryVideoForSkill = (skillId: string): VideoReference | undefined =>
  getVideosForSkill(skillId).find((video) => video.relevance === 'primary_reference')

export const getSupplementalVideosForSkill = (skillId: string): VideoReference[] =>
  getVideosForSkill(skillId).filter(byRelevance)

export const getVideosByTag = (tag: string): VideoReference[] =>
  videoReferences.filter((video) => isProductionNoGiVideo(video) && video.techniqueTags.includes(tag))

export const getVideosByLanguage = (language: LanguageCode | 'unknown'): VideoReference[] =>
  videoReferences.filter((video) => isProductionNoGiVideo(video) && (video.language ?? 'unknown') === language)
