import { searchKnowledge } from '../src/utils/knowledgeSearch'
import type { LanguageCode } from '../src/types/skill'

const checks: { query: string; lang: LanguageCode; expectedId: string }[] = [
  { query: 'RNC elbow under chin', lang: 'en', expectedId: 'rear-naked-choke-system' },
  { query: 'nguc dan lung', lang: 'vi', expectedId: 'rear-naked-choke-system' },
  { query: 'armbar thumb direction', lang: 'en', expectedId: 'armbar-system' },
  { query: 'tuot khuyu', lang: 'vi', expectedId: 'armbar-system' },
  { query: 'triangle one shoulder out', lang: 'en', expectedId: 'triangle-system' },
  { query: 'omoplata shoulder clamp', lang: 'en', expectedId: 'omoplata-system' },
  { query: 'false reap knee line', lang: 'en', expectedId: 'false-reap-entry' },
  { query: 'compression safety smother', lang: 'en', expectedId: 'smother-safety' },
  { query: 'high wrist guillotine', lang: 'en', expectedId: 'high-wrist-guillotine' },
  { query: 'crab ride back take', lang: 'en', expectedId: 'crab-ride' },
]

const failures = checks.flatMap((check) => {
  const results = searchKnowledge(check.query, check.lang).slice(0, 8)
  return results.some((result) =>
    result.id === check.expectedId ||
    result.id.startsWith(`${check.expectedId}:`) ||
    result.id.includes(`:${check.expectedId}:`) ||
    result.id.includes(`:${check.expectedId}-`),
  )
    ? []
    : [`"${check.query}" (${check.lang}) did not return ${check.expectedId}; got ${results.map((result) => result.id).join(', ') || 'no results'}`]
})

if (failures.length) {
  console.error('Search validation failed')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`Search validation passed (${checks.length} queries).`)
