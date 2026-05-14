import { mkdir, writeFile } from 'node:fs/promises'

type Candidate = {
  query: string
  title: string
  channel: string
  url: string
  youtubeId: string
  relatedSkillGuess: string
  reason: string
  needsHumanReview: true
}

const queries = [
  { query: 'no gi rear naked choke details', skill: 'rear-naked-choke-system' },
  { query: 'rear naked choke hand fighting no gi', skill: 'rear-naked-choke-system' },
  { query: 'no gi armbar from mount details', skill: 'armbar-system' },
  { query: 'no gi triangle choke angle', skill: 'triangle-system' },
  { query: 'no gi body lock pass', skill: 'bodylock-passing' },
  { query: 'heel hook safety knee line', skill: 'heel-hook-safety' },
  { query: 'octopus guard no gi', skill: 'octopus-guard' },
  { query: 'false reap no gi', skill: 'false-reap-entry' },
  { query: 'crab ride no gi', skill: 'crab-ride' },
  { query: 'no gi smother safety', skill: 'smother-safety' },
]

const main = async () => {
  const apiKey = process.env.YOUTUBE_API_KEY
  await mkdir('content', { recursive: true })

  if (!apiKey) {
    await writeFile(
      'content/video-candidates.json',
      `${JSON.stringify({
        generatedAt: new Date().toISOString(),
        skipped: true,
        reason: 'YOUTUBE_API_KEY is not configured. Add candidates manually after human review.',
        candidates: [] as Candidate[],
      }, null, 2)}\n`,
    )
    console.log('Skipped YouTube candidate collection: YOUTUBE_API_KEY is not configured.')
    return
  }

  const candidates: Candidate[] = []
  for (const item of queries) {
    const url = new URL('https://www.googleapis.com/youtube/v3/search')
    url.searchParams.set('part', 'snippet')
    url.searchParams.set('type', 'video')
    url.searchParams.set('maxResults', '3')
    url.searchParams.set('q', item.query)
    url.searchParams.set('key', apiKey)
    const response = await fetch(url)
    if (!response.ok) continue
    const body = await response.json() as {
      items?: Array<{
        id?: { videoId?: string }
        snippet?: { title?: string; channelTitle?: string }
      }>
    }
    body.items?.forEach((result) => {
      const youtubeId = result.id?.videoId
      if (!youtubeId) return
      candidates.push({
        query: item.query,
        title: result.snippet?.title ?? '',
        channel: result.snippet?.channelTitle ?? '',
        url: `https://www.youtube.com/watch?v=${youtubeId}`,
        youtubeId,
        relatedSkillGuess: item.skill,
        reason: 'YouTube Data API candidate only; verify source quality, public status, and relevance before adding to production data.',
        needsHumanReview: true,
      })
    })
  }

  await writeFile(
    'content/video-candidates.json',
    `${JSON.stringify({ generatedAt: new Date().toISOString(), skipped: false, candidates }, null, 2)}\n`,
  )
  console.log(`Wrote ${candidates.length} video candidates to content/video-candidates.json.`)
}

main().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})

