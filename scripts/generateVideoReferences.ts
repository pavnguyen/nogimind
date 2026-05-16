/**
 * Generate video reference TypeScript source code from scraped bjj.tips data.
 * Run: tsx scripts/generateVideoReferences.ts > /tmp/generated_videos.ts
 *
 * This script reads content/bjj_tips_videos.json and generates TypeScript
 * VideoReference entries matching existing skill IDs.
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'
import { classifyNoGiVideo } from '../src/data/videos/noGiVideoFilter'

interface ScrapedVideo {
  source_page: string
  source_name: string
  source_type: string
  technique: string
  url: string
  summary: string
}

type ScrapedVideoWithTags = ScrapedVideo & { techniqueTags: string[]; title: { en: string; vi: string; fr: string }; channelName: string }

interface SkillMatchConfig {
  id: string
  keywords: string[]
  level: string
  tags: string[]
  positionIds: string[]
  relevance: string
}

const data: ScrapedVideo[] = JSON.parse(
  readFileSync(resolve('content/bjj_tips_videos.json'), 'utf-8'),
)

const skillsConfig: SkillMatchConfig[] = [
  { id: 'rear-naked-choke-system', keywords: ['rear naked choke', 'rnc', 'rear naked'], level: 'advanced', tags: ['rnc', 'rear-naked-choke', 'back-control', 'choke'], positionIds: ['back-control-position'], relevance: 'primary_reference' },
  { id: 'armbar-system', keywords: ['armbar', 'arm bar'], level: 'advanced', tags: ['armbar', 'elbow-line', 'shoulder-isolation', 'submission'], positionIds: [], relevance: 'primary_reference' },
  { id: 'triangle-system', keywords: ['triangle choke', 'triangle finis', 'triangle system', 'triangle from'], level: 'advanced', tags: ['triangle', 'choke', 'guard', 'neck-safety'], positionIds: [], relevance: 'primary_reference' },
  { id: 'guillotine-system', keywords: ['guillotine'], level: 'advanced', tags: ['guillotine', 'front-headlock', 'choke', 'neck-safety'], positionIds: ['front-headlock'], relevance: 'primary_reference' },
  { id: 'arm-triangle-mount', keywords: ['arm triangle', 'arm-triangle'], level: 'advanced', tags: ['arm-triangle', 'mount', 'choke', 'neck-safety'], positionIds: [], relevance: 'primary_reference' },
  { id: 'kimura-system', keywords: ['kimura'], level: 'advanced', tags: ['kimura', 'shoulder-lock', 'submission'], positionIds: [], relevance: 'primary_reference' },
  { id: 'omoplata-system', keywords: ['omoplata'], level: 'advanced', tags: ['omoplata', 'shoulder-lock', 'guard', 'submission'], positionIds: [], relevance: 'primary_reference' },
  { id: 'heel-hook-safety', keywords: ['heel hook', 'heelhook', 'inside heel hook', 'outside heel hook'], level: 'advanced', tags: ['heel-hook', 'leg-lock', 'knee-line', 'safety'], positionIds: ['saddle-inside-sankaku'], relevance: 'safety_reference' },
  { id: 'back-control', keywords: ['back control', 'back take', 'back attack', 'back mount', 'taking the back'], level: 'intermediate', tags: ['back-control', 'back-take', 'control', 'seatbelt'], positionIds: ['back-control-position'], relevance: 'primary_reference' },
  { id: 'bodylock-passing', keywords: ['body lock pass', 'body lock', 'bodylock'], level: 'intermediate', tags: ['bodylock', 'passing', 'hip-control'], positionIds: [], relevance: 'primary_reference' },
  { id: 'knee-cut-passing', keywords: ['knee cut', 'knee slice', 'knee slide'], level: 'intermediate', tags: ['knee-cut', 'passing', 'knee-slice'], positionIds: [], relevance: 'primary_reference' },
  { id: 'side-control-escape', keywords: ['side control escape', 'escape side control', 'side control defense'], level: 'beginner', tags: ['side-control', 'escape', 'frames'], positionIds: ['side-control-bottom'], relevance: 'primary_reference' },
  { id: 'mount-escape', keywords: ['mount escape', 'escape mount', 'mount escape'], level: 'beginner', tags: ['mount', 'escape', 'bridge'], positionIds: ['mount-bottom'], relevance: 'primary_reference' },
  { id: 'front-headlock-defense', keywords: ['front headlock defense', 'front headlock escape', 'defend front headlock'], level: 'intermediate', tags: ['front-headlock', 'defense', 'escape'], positionIds: [], relevance: 'primary_reference' },
  { id: 'octopus-guard-control', keywords: ['octopus guard', 'octopus escape', 'octopus system'], level: 'intermediate', tags: ['octopus-guard', 'half-guard', 'guard-system'], positionIds: ['half-guard-bottom'], relevance: 'primary_reference' },
  { id: 'shoulder-crunch-control', keywords: ['shoulder crunch'], level: 'intermediate', tags: ['shoulder-crunch', 'control', 'position'], positionIds: [], relevance: 'primary_reference' },
  { id: 's-mount-armbar', keywords: ['s mount armbar', 's-mount armbar'], level: 'advanced', tags: ['s-mount', 'armbar', 'mount', 'submission'], positionIds: ['mount-top'], relevance: 'primary_reference' },
  { id: 'false-reap-entry', keywords: ['false reap'], level: 'advanced', tags: ['false-reap', 'leg-entry', 'guard'], positionIds: [], relevance: 'primary_reference' },
  { id: 'k-guard-matrix', keywords: ['k guard', 'k-guard'], level: 'advanced', tags: ['k-guard', 'matrix', 'leg-entanglements'], positionIds: [], relevance: 'primary_reference' },
  { id: 'saddle-inside-sankaku-control', keywords: ['saddle', 'inside sankaku', 'inside heel hook'], level: 'advanced', tags: ['saddle', 'inside-sankaku', 'leg-control'], positionIds: ['saddle-inside-sankaku'], relevance: 'primary_reference' },
  { id: 'crab-ride', keywords: ['crab ride'], level: 'advanced', tags: ['crab-ride', 'back-take', 'leg-ride'], positionIds: [], relevance: 'primary_reference' },
  { id: 'wrist-ride-back-exposure', keywords: ['wrist ride', 'wrist lock', 'wrist control'], level: 'advanced', tags: ['wrist-ride', 'back-exposure', 'control'], positionIds: [], relevance: 'primary_reference' },
  { id: 'buggy-choke', keywords: ['buggy choke', 'buggy'], level: 'intermediate', tags: ['buggy-choke', 'submission', 'escape-counter'], positionIds: [], relevance: 'primary_reference' },
  { id: 'gogoplata', keywords: ['gogoplata'], level: 'advanced', tags: ['gogoplata', 'submission', 'guard-attack'], positionIds: [], relevance: 'primary_reference' },
  { id: 'choi-bar', keywords: ['choi bar', 'choibar'], level: 'advanced', tags: ['choi-bar', 'armbar', 'submission'], positionIds: [], relevance: 'primary_reference' },
  { id: 'smother-safety', keywords: ['smother choke', 'smother'], level: 'intermediate', tags: ['smother', 'safety', 'positional-control'], positionIds: [], relevance: 'safety_reference' },
  { id: 'back-escape', keywords: ['back escape', 'escape back', 'back defense', 'escape the back'], level: 'beginner', tags: ['back-escape', 'defense', 'survival'], positionIds: [], relevance: 'supplemental' },
  { id: 'mount-control', keywords: ['mount control', 'mount position', 'mount pressure', 'mount attack', 'mount finis', 'mounted'], level: 'intermediate', tags: ['mount', 'control', 'pressure'], positionIds: [], relevance: 'supplemental' },
  { id: 'side-control-pin', keywords: ['side control pressure', 'side control pin', 'side control submission', 'side control attack'], level: 'intermediate', tags: ['side-control', 'pin', 'pressure'], positionIds: ['side-control-top'], relevance: 'supplemental' },
  { id: 'butterfly-guard-off-balance', keywords: ['butterfly guard', 'butterfly sweep', 'butterfly system'], level: 'intermediate', tags: ['butterfly-guard', 'sweep', 'off-balance', 'guard-system'], positionIds: ['butterfly-guard'], relevance: 'primary_reference' },
  { id: 'half-guard-knee-shield', keywords: ['half guard', 'half-guard', 'knee shield'], level: 'intermediate', tags: ['half-guard', 'knee-shield', 'guard-system'], positionIds: ['half-guard-bottom'], relevance: 'primary_reference' },
  { id: 'single-leg-bjj', keywords: ['single leg takedown', 'single leg'], level: 'intermediate', tags: ['single-leg', 'takedown', 'wrestling'], positionIds: [], relevance: 'supplemental' },
  { id: 'guard-pulling-strategy', keywords: ['guard pull', 'guard pulling', 'pull guard'], level: 'beginner', tags: ['guard-pull', 'strategy', 'guard-entry'], positionIds: [], relevance: 'supplemental' },
  { id: 'hand-fighting', keywords: ['hand fight', 'hand fighting', 'grip fight', 'grip break'], level: 'beginner', tags: ['hand-fighting', 'grip-fighting', 'fundamentals'], positionIds: [], relevance: 'supplemental' },
  { id: 'leg-drag-basics', keywords: ['leg drag'], level: 'intermediate', tags: ['leg-drag', 'passing'], positionIds: [], relevance: 'supplemental' },
  { id: 'headquarters-passing', keywords: ['headquarters'], level: 'intermediate', tags: ['headquarters', 'passing', 'guard-passing'], positionIds: [], relevance: 'supplemental' },
  { id: 'dogfight-knee-tap', keywords: ['dogfight', 'dog fight', 'knee tap'], level: 'intermediate', tags: ['dogfight', 'knee-tap', 'half-guard'], positionIds: [], relevance: 'supplemental' },
  { id: 'turtle-ride', keywords: ['turtle', 'turtle guard', 'turtle attack', 'turtle position'], level: 'intermediate', tags: ['turtle', 'ride', 'positional-advantage'], positionIds: ['turtle-position'], relevance: 'supplemental' },
  { id: 'shin-to-shin-entry', keywords: ['shin to shin', 'shin guard', 'shin on shin'], level: 'intermediate', tags: ['shin-to-shin', 'guard-entry', 'guard-system'], positionIds: [], relevance: 'supplemental' },
  { id: 'single-leg-x-basics', keywords: ['single leg x', 'single leg x guard', '1lx'], level: 'intermediate', tags: ['single-leg-x', 'guard', 'leg-entanglements'], positionIds: [], relevance: 'supplemental' },
  { id: 'rear-triangle-control', keywords: ['rear triangle', 'body triangle'], level: 'intermediate', tags: ['rear-triangle', 'back-control', 'choke'], positionIds: ['back-control-position'], relevance: 'supplemental' },
  { id: 's-mount-control', keywords: ['s mount', 's-mount'], level: 'advanced', tags: ['s-mount', 'mount', 'control'], positionIds: [], relevance: 'supplemental' },
  { id: 'sprawl-go-behind', keywords: ['sprawl'], level: 'beginner', tags: ['sprawl', 'go-behind', 'defense'], positionIds: [], relevance: 'supplemental' },
  { id: 'scramble-control', keywords: ['scramble'], level: 'intermediate', tags: ['scramble', 'control', 'transitions'], positionIds: [], relevance: 'supplemental' },
]

const instructorPriority: Record<string, number> = {
  'John Danaher': 10, 'Gordon Ryan': 10, 'Lachlan Giles': 9, 'Craig Jones': 9,
  'Mikey Musumeci': 8, 'Ryan Hall': 8, 'Bernardo Faria': 7, 'Tom DeBlass': 6,
  'Andre Galvao': 7, 'Firas Zahabi': 7, 'Adam Wardzinski': 7,
  'Neil Melanson': 8, 'Keenan Cornelius': 7, 'Giancarlo Bodoni': 7,
  'Rob Biernacki': 7, 'Jason Rau': 7, 'Travis Stevens': 7, 'Jeff Glover': 6,
  'Heath Pedigo': 6, 'Matt Daquino': 5, 'Brian Glick': 5,
}

const extractYoutubeId = (url: string): string | null => {
  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1) || null
    if (parsed.hostname.endsWith('youtube.com')) {
      if (parsed.pathname === '/watch') return parsed.searchParams.get('v')
      if (parsed.pathname.startsWith('/embed/')) return parsed.pathname.split('/')[2] || null
      if (parsed.pathname.startsWith('/shorts/')) return parsed.pathname.split('/')[2] || null
    }
    return null
  } catch { return null }
}

const toId = (str: string): string =>
  str.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)

const generateLt = (en: string, vi: string, fr: string): string =>
  `lt(\n      ${JSON.stringify(en)},\n      ${JSON.stringify(vi)},\n      ${JSON.stringify(fr)},\n    )`

const generateLa = (en: string[], vi: string[], fr: string[]): string =>
  `la(\n      ${JSON.stringify(en)},\n      ${JSON.stringify(vi)},\n      ${JSON.stringify(fr)},\n    )`

const translateTitle = (title: string): [string, string, string] => {
  return [title, title, title]
}

const translateWhyUseful = (skillId: string, technique: string, instructor: string): [string, string, string] => {
  const templates: Record<string, [string, string, string]> = {
    'rear-naked-choke-system': [
      `${instructor} demonstrates RNC mechanics, hand fighting order, and finishing details from back control.`,
      `${instructor} trình bày mechanics RNC, thứ tự hand fighting và chi tiết finish từ back control.`,
      `${instructor} montre la mécanique RNC, l'ordre du hand fighting et les détails de finish depuis le dos.`,
    ],
    'armbar-system': [
      `${instructor} breaks down armbar setup, hip positioning, and controlled arm extension for clean finishes.`,
      `${instructor} phân tích setup armbar, positioning hông và extension tay có kiểm soát để finish sạch.`,
      `${instructor} détaille le setup armbar, le positionnement des hanches et l'extension contrôlée.`,
    ],
    'triangle-system': [
      `${instructor} shows triangle choke mechanics: one-shoulder-in, angle cut, and squeeze details.`,
      `${instructor} chỉ mechanics triangle choke: one-shoulder-in, cắt góc và chi tiết squeeze.`,
      `${instructor} montre la mécanique triangle choke : une épaule dedans, angle et serrage.`,
    ],
    'guillotine-system': [
      `${instructor} covers guillotine setup, chin strap connection, and finishing angle from front headlock.`,
      `${instructor} trình bày setup guillotine, kết nối chin strap và angle finish từ front headlock.`,
      `${instructor} couvre le setup guillotine, connexion chin strap et l'angle de finish.`,
    ],
    'kimura-system': [
      `${instructor} demonstrates kimura grip control, shoulder isolation, and finishing mechanics.`,
      `${instructor} trình diễn kimura grip control, cô lập shoulder và mechanics finish.`,
      `${instructor} démontre le contrôle kimura grip, l'isolation d'épaule et la mécanique de finish.`,
    ],
    'omoplata-system': [
      `${instructor} teaches omoplata entry, hip angle control, and shoulder pressure finishing.`,
      `${instructor} dạy entry omoplata, kiểm soát hip angle và finish bằng shoulder pressure.`,
      `${instructor} enseigne l'entrée omoplata, le contrôle d'angle de hanche et la pression d'épaule.`,
    ],
    'heel-hook-safety': [
      `${instructor} explains heel hook safety, knee-line control, and responsible training practices.`,
      `${instructor} giải thích an toàn heel hook, kiểm soát knee line và tập luyện có trách nhiệm.`,
      `${instructor} explique la sécurité heel hook, le contrôle de knee line et la pratique responsable.`,
    ],
    'back-control': [
      `${instructor} details back control mechanics, seatbelt grip, body triangle, and back attack chains.`,
      `${instructor} chi tiết mechanics back control, seatbelt grip, body triangle và chuỗi đòn back attack.`,
      `${instructor} détaille les mécaniques du back control, seatbelt, body triangle et chaînes d'attaques.`,
    ],
    'bodylock-passing': [
      `${instructor} demonstrates bodylock passing, hip-line control, and clearing the legs.`,
      `${instructor} trình diễn bodylock passing, kiểm soát hip-line và clear chân.`,
      `${instructor} démontre le bodylock passing, le contrôle de la hip line et le passage des jambes.`,
    ],
    'butterfly-guard-off-balance': [
      `${instructor} teaches butterfly guard sweeps, off-balancing, and hook positioning.`,
      `${instructor} dạy butterfly guard sweep, làm mất thăng bằng và positioning hook.`,
      `${instructor} enseigne les sweeps butterfly guard, le déséquilibre et le positionnement du hook.`,
    ],
    'half-guard-knee-shield': [
      `${instructor} shows half guard systems, knee shield retention, and sweep transitions.`,
      `${instructor} chỉ hệ thống half guard, knee shield retention và chuyển sweep.`,
      `${instructor} montre les systèmes half guard, knee shield retention et transitions de sweep.`,
    ],
  }

  return templates[skillId] || [
    `${instructor} provides a detailed breakdown of ${technique.toLowerCase()} with practical drilling advice.`,
    `${instructor} cung cấp phân tích chi tiết ${technique.toLowerCase()} với lời khuyên tập luyện thực tế.`,
    `${instructor} fournit une analyse détaillée de ${technique.toLowerCase()} avec des conseils pratiques.`,
  ]
}

const generateWatchFor = (technique: string): [string[], string[], string[]] => {
  const en = [
    'Body positioning and weight distribution',
    'Grip placement before movement',
    'Completion mechanics and safety check',
    'Common mistakes to avoid',
  ]
  const vi = [
    'Positioning cơ thể và phân bổ trọng lượng',
    'Đặt grip trước khi di chuyển',
    'Mechanics hoàn thiện và kiểm tra an toàn',
    'Lỗi thường gặp cần tránh',
  ]
  const fr = [
    'Positionnement du corps et répartition du poids',
    'Placement des grips avant le mouvement',
    'Mécanique de completion et vérification sécurité',
    'Erreurs courantes à éviter',
  ]
  return [en, vi, fr]
}

// Match videos to skills
const seenIds = new Map<string, Set<string>>()
const matches = new Map<string, ScrapedVideo[]>()

for (const skill of skillsConfig) {
  seenIds.set(skill.id, new Set())
  matches.set(skill.id, [])
}

for (const video of data) {
  const titleLower = video.technique.toLowerCase()
  const source = video.source_name
  const ytId = extractYoutubeId(video.url)
  if (!ytId) continue

  for (const skill of skillsConfig) {
    const classification = classifyNoGiVideo({
      ...video,
      title: { en: video.technique, vi: video.technique, fr: video.technique },
      channelName: source,
      techniqueTags: skill.tags,
      sourceNote: 'BJJ.Tips public YouTube listing.',
    } satisfies ScrapedVideoWithTags)
    if (classification.status === 'reject') continue

    const seen = seenIds.get(skill.id)!
    if (seen.has(ytId)) continue

    for (const kw of skill.keywords) {
      if (kw.toLowerCase() in titleLower.split(' ') || titleLower.includes(kw.toLowerCase())) {
        seen.add(ytId)
        matches.get(skill.id)!.push(video)
        break
      }
    }
  }
}

// Select best videos per skill
const selected = new Map<string, ScrapedVideo[]>()

for (const skill of skillsConfig) {
  const videos = matches.get(skill.id) || []
  videos.sort((a, b) => {
    const pa = instructorPriority[a.source_name] ?? 1
    const pb = instructorPriority[b.source_name] ?? 1
    const ca = classifyNoGiVideo({
      ...a,
      title: { en: a.technique, vi: a.technique, fr: a.technique },
      channelName: a.source_name,
      techniqueTags: skill.tags,
    } satisfies ScrapedVideoWithTags)
    const cb = classifyNoGiVideo({
      ...b,
      title: { en: b.technique, vi: b.technique, fr: b.technique },
      channelName: b.source_name,
      techniqueTags: skill.tags,
    } satisfies ScrapedVideoWithTags)
    const statusScore = (status: string) => status === 'keep' ? 2 : 1
    return statusScore(cb.status) - statusScore(ca.status) || pb - pa
  })

  const top = videos.slice(0, 3)
  if (top.length > 0) {
    selected.set(skill.id, top)
  }
}

// Generate TypeScript output
let output = `
// ─── Auto-generated video references from bjj.tips ──────────────────────────

export const bjjTipsVideoReferences: VideoReference[] = [
`

let entryIndex = 0
const allEntries: string[] = []

for (const [skillId, videos] of selected) {
  const skill = skillsConfig.find(s => s.id === skillId)!
  for (const video of videos) {
    const ytId = extractYoutubeId(video.url)!
    const id = `bjj-${toId(video.source_name)}-${ytId}`
    const [enTitle, viTitle, frTitle] = translateTitle(video.technique.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&'))
    const [enWhy, viWhy, frWhy] = translateWhyUseful(skillId, video.technique, video.source_name)
    const [enWatch, viWatch, frWatch] = generateWatchFor(video.technique)

    const entry = `  {
    id: ${JSON.stringify(id)},
    provider: 'youtube',
    title: ${generateLt(enTitle, viTitle, frTitle)},
    channelName: ${JSON.stringify(video.source_name)},
    url: ${JSON.stringify(video.url)},
    embedUrl: ${JSON.stringify(`https://www.youtube.com/embed/${ytId}`)},
    youtubeId: ${JSON.stringify(ytId)},
    language: 'en',
    relatedSkillIds: [${JSON.stringify(skillId)}],
    ${skill.positionIds.length > 0 ? `relatedPositionIds: [${skill.positionIds.map(p => JSON.stringify(p)).join(', ')}],` : ''}
    techniqueTags: [${skill.tags.map(t => JSON.stringify(t)).join(', ')}],
    relevance: ${JSON.stringify(skill.relevance)},
    level: ${JSON.stringify(skill.level)},
    whyUseful: ${generateLt(enWhy, viWhy, frWhy)},
    whatToWatchFor: ${generateLa(enWatch, viWatch, frWatch)},
    sourceNote: 'Curated from bjj.tips public YouTube listings.',
  },`

    allEntries.push(entry)
    entryIndex++
  }
}

output += allEntries.join('\n')
output += '\n]\n'

console.log(output)
console.log(`// Generated ${entryIndex} video references for ${selected.size} skills`)
