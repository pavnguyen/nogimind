/**
 * Script to search YouTube for No-Gi BJJ videos.
 * Usage: node scripts/search_youtube.mjs "<search query>"
 */
import { execSync } from 'node:child_process'

const query = process.argv[2]
if (!query) {
  console.error('Usage: node scripts/search_youtube.mjs "<search query>"')
  process.exit(1)
}

try {
  const output = execSync(
    `yt-dlp --flat-playlist --dump-json ytsearch5:"${query.replace(/"/g, '\\"')}" 2>/dev/null`,
    { encoding: 'utf-8', timeout: 15000 }
  )
  
  const lines = output.trim().split('\n').filter(Boolean)
  for (const line of lines) {
    try {
      const data = JSON.parse(line)
      console.log(`${data.id} | ${data.title || 'N/A'} | ${data.channel || data.uploader || 'N/A'}`)
    } catch {}
  }
} catch (e) {
  console.error(`Search failed: ${e.message}`)
}
