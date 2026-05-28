/**
 * validate-videos.ts — Check all YouTube video references for availability
 *
 * Uses the YouTube oEmbed API (no API key needed) to check if each video
 * is still accessible. Reports which videos are potentially unavailable.
 *
 * Usage:  npx tsx scripts/validate-videos.ts
 *         npx tsx scripts/validate-videos.ts --fix   (remove broken videos from JSON)
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface VideoRef {
  youtubeId: string
  title: string
  channel: string
  whyUseful: string
  timestampStart?: number
  relevance: string
  level: string
}

interface BrokenVideo {
  skillId: string
  youtubeId: string
  title: string
  reason: 'not_found' | 'private' | 'error' | 'thumbnail_404'
  statusCode?: number
}

// ── Skills discovery ──────────────────────────────────────────────────────

interface SkillLocation {
  domain: string
  id: string
}

function discoverSkills(): SkillLocation[] {
  const skillsRoot = resolve(__dirname, '../content/skills')
  const domains = readdirSync(skillsRoot, { withFileTypes: true }).filter(d => d.isDirectory())
  const skills: SkillLocation[] = []

  for (const domain of domains) {
    const domainPath = resolve(skillsRoot, domain.name)
    const skillDirs = readdirSync(domainPath, { withFileTypes: true }).filter(d => d.isDirectory())
    for (const skill of skillDirs) {
      skills.push({ domain: domain.name, id: skill.name })
    }
  }

  return skills
}

// ── YouTube availability check ───────────────────────────────────────────

/** Retry helper: resolves on first OK, rejects if all attempts fail */
async function fetchWithRetry(url: string, options: RequestInit, retries = 2): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) await new Promise(r => setTimeout(r, 1000 * attempt)) // backoff 1s, 2s
    try {
      const response = await fetch(url, options)
      // Non-network errors (4xx, 5xx) are valid — return immediately
      if (!response.ok) return response
      return response
    } catch {
      // Network/timeout errors — retry unless last attempt
      if (attempt === retries) throw new Error(`All ${retries + 1} attempts failed for ${url}`)
    }
  }
  throw new Error('Unreachable')
}

async function checkVideoAvailability(
  youtubeId: string
): Promise<'ok' | 'not_found' | 'private' | 'error'> {
  try {
    // Method 1: Try oEmbed API first (with retry for transient failures)
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${youtubeId}&format=json`
    const response = await fetchWithRetry(oembedUrl, {
      method: 'GET',
      headers: { 'User-Agent': 'NoGiMind/1.0 Video Validator' },
      signal: AbortSignal.timeout(8000),
    })

    if (response.ok) return 'ok'

    // 401 = video is private
    if (response.status === 401) return 'private'

    // 404 = video not found
    if (response.status === 404) return 'not_found'

    // Other error
    return 'error'
  } catch {
    // Fallback: check thumbnail URL (with retry)
    try {
      const thumbUrl = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
      const thumbResponse = await fetchWithRetry(thumbUrl, {
        method: 'HEAD',
        signal: AbortSignal.timeout(5000),
      })
      if (thumbResponse.ok) return 'ok'
      return 'not_found'
    } catch {
      return 'error'
    }
  }
}

// ── Main ───────────────────────────────────────────────────────────────────

const shouldFix = process.argv.includes('--fix')

async function main() {
  console.log('\n🎥 YouTube Video Validation\n')
  console.log(`Mode: ${shouldFix ? 'CHECK + FIX (--fix)' : 'CHECK only'}\n`)

  const skills = discoverSkills()
  console.log(`Checking videos for ${skills.length} skills...\n`)

  const broken: BrokenVideo[] = []
  let totalVideos = 0
  let checkedVideos = 0
  let okVideos = 0

  for (const { domain, id: skillId } of skills) {
    const videosPath = resolve(__dirname, '../content/skills', domain, skillId, 'videos.json')
    if (!existsSync(videosPath)) continue

    const raw = readFileSync(videosPath, 'utf-8')
    let videos: VideoRef[] = []
    try {
      videos = JSON.parse(raw)
      if (!Array.isArray(videos)) continue
    } catch {
      console.warn(`  ⚠ [${skillId}] Could not parse videos.json`)
      continue
    }

    // Remove duplicates by youtubeId
    const seen = new Set<string>()
    const unique: VideoRef[] = []
    for (const v of videos) {
      if (!seen.has(v.youtubeId)) {
        seen.add(v.youtubeId)
        unique.push(v)
      }
    }

    totalVideos += unique.length

    for (const video of unique) {
      checkedVideos++
      const result = await checkVideoAvailability(video.youtubeId)

      if (result === 'ok') {
        okVideos++
        process.stdout.write('✓')
      } else {
        broken.push({
          skillId,
          youtubeId: video.youtubeId,
          title: video.title,
          reason: result,
        })
        process.stdout.write('✗')
      }

      if (checkedVideos % 50 === 0) {
        process.stdout.write(` (${checkedVideos}/${totalVideos})\n`)
      }
    }
  }

  process.stdout.write(` (${checkedVideos}/${checkedVideos})\n\n`)

  // ── Report ───────────────────────────────────────────────────────────

  console.log('📊 Results:')
  console.log(`  Total videos:   ${totalVideos}`)
  console.log(`  Available:      ${okVideos}`)
  console.log(`  Broken:         ${broken.length}`)

  if (broken.length > 0) {
    console.log('\n❌ Broken Videos:')
    for (const b of broken) {
      console.log(`  [${b.skillId}] ${b.youtubeId}`)
      console.log(`           ${b.title}`)
      console.log(`           Reason: ${b.reason}`)
      console.log(`           URL: https://youtu.be/${b.youtubeId}`)
      console.log()
    }

    // ── Fix mode: remove broken videos from JSON files ──────────────
    if (shouldFix) {
      console.log('🛠 Removing broken videos from videos.json files...\n')
      let removedCount = 0
      const processedSkills = new Set<string>()

      for (const b of broken) {
        if (processedSkills.has(b.skillId)) continue

        const skillBrokenIds = broken.filter(x => x.skillId === b.skillId).map(x => x.youtubeId)
        const skillBrokenSet = new Set(skillBrokenIds)

        const skill = skills.find(s => s.id === b.skillId)
        if (!skill) continue

        const videosPath = resolve(__dirname, '../content/skills', skill.domain, b.skillId, 'videos.json')
        if (!existsSync(videosPath)) continue

        const raw = readFileSync(videosPath, 'utf-8')
        const videos: VideoRef[] = JSON.parse(raw)

        const filtered = videos.filter(v => !skillBrokenSet.has(v.youtubeId))
        const removed = videos.length - filtered.length

        if (removed > 0) {
          writeFileSync(videosPath, JSON.stringify(filtered, null, 2) + '\n', 'utf-8')
          console.log(`  ✓ [${b.skillId}] Removed ${removed} broken video(s) (${videos.length} → ${filtered.length})`)
          removedCount += removed
        }
        processedSkills.add(b.skillId)
      }

      console.log(`\n  Total broken videos removed: ${removedCount}`)
      console.log('  Run `npm run build:content` to regenerate video mappings.\n')
    }

    // Save report
    const reportPath = resolve(__dirname, '../content/video-validation-report.json')
    writeFileSync(reportPath, JSON.stringify({
      generatedAt: new Date().toISOString(),
      totalVideos,
      okVideos,
      brokenCount: broken.length,
      broken,
    }, null, 2) + '\n', 'utf-8')
    console.log(`📝 Full report saved to content/video-validation-report.json\n`)
  } else {
    console.log('✅ All videos are available!\n')
  }

  if (shouldFix) {
    console.log('\n💡 Recommended process after fixing:')
    console.log('  1. Run `npm run build:content` to regenerate video mappings')
    console.log('  2. Manually find replacement videos for removed ones')
    console.log('  3. Add new video IDs by editing videos.json files directly')
    console.log('  4. Re-run this script to validate the new videos\n')
  }

  console.log()
}

main().catch(err => {
  console.error('Validation failed:', err)
  process.exit(1)
})
