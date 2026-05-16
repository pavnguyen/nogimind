/**
 * Video-to-Skill Mapping Logic
 *
 * Maps video technique signals to skill IDs with confidence scores.
 * This is additive — it does NOT replace classifyNoGiVideo.
 */

export type VideoSkillMatch = {
  videoId: string
  skillId: string
  confidence: number
  reasons: string[]
  suggestedPlacement: 'primary' | 'supplemental' | 'manual_review'
}

type MappingRule = {
  patterns: string[]
  skillId: string
  aliases?: string[]
}

const mappingRules: MappingRule[] = [
  // Priority skills
  { patterns: ['k guard', 'k-guard', 'kguard'], skillId: 'k-guard-entry', aliases: ['k-guard-matrix'] },
  { patterns: ['false reap', 'false-reap'], skillId: 'false-reap-entry' },
  { patterns: ['crucifix', 'high ground'], skillId: 'crucifix-control' },
  { patterns: ['ham sandwich', 'ham-sandwich'], skillId: 'bear-trap-ham-sandwich' },
  { patterns: ['bear trap', 'bear-trap', 'beartrap'], skillId: 'bear-trap-ham-sandwich' },
  { patterns: ['calf slicer', 'calf-slicer', 'calf cutter', 'hamstring slicer', 'compression lock'], skillId: 'bear-trap-ham-sandwich' },
  { patterns: ['deep half', 'deep-half', 'deep half guard'], skillId: 'deep-half-guard' },
  { patterns: ['half butterfly', 'half-butterfly'], skillId: 'half-butterfly-to-leg-entanglements' },

  // Leg entanglements
  { patterns: ['saddle', 'inside sankaku', '411', 'inside-sankaku'], skillId: 'saddle-inside-sankaku-control' },
  { patterns: ['heel hook', 'heel-hook', 'inside heel hook'], skillId: 'heel-hook-safety' },
  { patterns: ['straight ankle lock', 'straight-ankle-lock'], skillId: 'straight-ankle-lock-safety' },
  { patterns: ['kneebar', 'knee bar'], skillId: 'kneebar-basics' },
  { patterns: ['toe hold', 'toehold'], skillId: 'toe-hold-basics' },

  // Guards
  { patterns: ['single leg x', 'single-leg-x', 'slx', 'ashi garami'], skillId: 'single-leg-x-basics' },
  { patterns: ['x guard', 'x-guard'], skillId: 'x-guard-control' },
  { patterns: ['reverse de la riva', 'rdlr', 'reverse-de-la-riva'], skillId: 'reverse-de-la-riva-transitions' },
  { patterns: ['de la riva', 'dlr'], skillId: 'de-la-riva-sweeps' },
  { patterns: ['butterfly guard', 'butterfly-guard'], skillId: 'butterfly-guard-off-balance' },
  { patterns: ['closed guard'], skillId: 'closed-guard-posture-control' },
  { patterns: ['half guard knee shield', 'knee shield'], skillId: 'half-guard-knee-shield' },

  // Wrestling & front headlock
  { patterns: ['front headlock', 'front-headlock', 'snap down', 'snapdown'], skillId: 'snapdown-front-headlock', aliases: ['front-headlock-system'] },
  { patterns: ['darce', 'd\'arce', 'darce choke'], skillId: 'snapdown-front-headlock' },
  { patterns: ['anaconda', 'anaconda choke'], skillId: 'snapdown-front-headlock' },
  { patterns: ['go behind', 'go-behind'], skillId: 'sprawl-go-behind' },
  { patterns: ['wrestling up', 'wrestle up', 'wrestle-up', 'wrestling-up'], skillId: 'half-guard-wrestle-up' },
  { patterns: ['single leg', 'single-leg'], skillId: 'single-leg-bjj' },
  { patterns: ['double leg', 'double-leg'], skillId: 'double-leg-takedown' },
  { patterns: ['high crotch', 'high-crotch'], skillId: 'high-crotch-takedown' },

  // Passing
  { patterns: ['body lock', 'bodylock', 'body-lock'], skillId: 'bodylock-passing' },
  { patterns: ['knee cut', 'knee-cut'], skillId: 'knee-cut-passing' },
  { patterns: ['leg drag', 'leg-drag'], skillId: 'leg-drag-basics' },

  // Back control
  { patterns: ['crab ride', 'crab-ride'], skillId: 'crab-ride' },
  { patterns: ['rear naked choke', 'rnc', 'rear-naked-choke'], skillId: 'rear-naked-choke-system' },
  { patterns: ['back control', 'back-control', 'seatbelt'], skillId: 'back-control' },

  // Controls & pins
  { patterns: ['mount', 'mount control'], skillId: 'mount-control' },
  { patterns: ['side control'], skillId: 'side-control-pin' },
]

const trustedNoGiChannels = [
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
  'Miyao Brothers',
  'Carsahh',
  'Jozef Chen',
  'Brandon Mccaghren',
  'Knight Jiu Jitsu',
]

const giOnlySignals = [
  'kimono', 'lapel', 'collar', 'sleeve',
  'lasso', 'spider', 'worm', 'collar choke',
  'bow and arrow', 'loop choke', 'baseball bat choke', 'cross grip',
]

const normalized = (value: string) =>
  value.toLowerCase().replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim()

type VideoLikeForMapping = {
  id: string
  title: string
  channelName: string
  techniqueTags?: string[]
  sourceType?: string
}

export const mapVideoToSkills = (video: VideoLikeForMapping): VideoSkillMatch[] => {
  const titleNorm = normalized(typeof video.title === 'object' ? (video.title as { en: string }).en : video.title)
  const tagsNorm = normalized((video.techniqueTags ?? []).join(' '))
  const haystack = `${titleNorm} ${tagsNorm}`
  const channelNorm = normalized(video.channelName)

  // Check for Gi-only signals — reject
  const giHits = giOnlySignals.filter((signal) => haystack.includes(signal))
  if (giHits.length > 0) return []

  const isTrustedChannel = trustedNoGiChannels.some(
    (ch) => normalized(ch) === channelNorm,
  )

  const isPaidCourse = video.sourceType === 'paid_course'
  const isCourseExcerpt = video.sourceType === 'course_excerpt'

  const matches: VideoSkillMatch[] = []

  for (const rule of mappingRules) {
    const hitPatterns = rule.patterns.filter((p) => haystack.includes(p))
    if (hitPatterns.length === 0) continue

    let confidence: number
    let suggestedPlacement: VideoSkillMatch['suggestedPlacement']

    if (isPaidCourse) {
      confidence = 0.9
      suggestedPlacement = 'primary'
    } else if (isCourseExcerpt) {
      confidence = 0.85
      suggestedPlacement = 'supplemental'
    } else if (isTrustedChannel && hitPatterns.length > 0) {
      confidence = hitPatterns.length > 1 ? 0.95 : 0.9
      suggestedPlacement = 'primary'
    } else if (hitPatterns.length > 0) {
      confidence = 0.75
      suggestedPlacement = 'supplemental'
    } else {
      confidence = 0.6
      suggestedPlacement = 'manual_review'
    }

    const reasons = [
      ...hitPatterns.map((p) => `matched pattern: "${p}"`),
      ...(isTrustedChannel ? ['trusted no-gi channel'] : []),
      ...(isPaidCourse ? ['paid course reference'] : []),
      ...(isCourseExcerpt ? ['course excerpt'] : []),
    ]

    matches.push({
      videoId: video.id,
      skillId: rule.skillId,
      confidence,
      reasons,
      suggestedPlacement,
    })

    // Also map aliases
    if (rule.aliases) {
      for (const alias of rule.aliases) {
        matches.push({
          videoId: video.id,
          skillId: alias,
          confidence: confidence * 0.9,
          reasons: [...reasons, `alias of ${rule.skillId}`],
          suggestedPlacement: 'supplemental',
        })
      }
    }
  }

  return matches
}

export { mappingRules }
