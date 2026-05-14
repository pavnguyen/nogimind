import { searchKnowledge } from '../src/utils/knowledgeSearch'
import type { KnowledgeItemType } from '../src/types/knowledgeSearch'
import type { LanguageCode } from '../src/types/skill'

const checks: { query: string; lang: LanguageCode; expectedId: string; type?: KnowledgeItemType }[] = [
  { query: 'RNC elbow under chin', lang: 'en', expectedId: 'rear-naked-choke-system', type: 'skill' },
  { query: 'nguc ap lung rear naked choke', lang: 'vi', expectedId: 'rear-naked-choke-system', type: 'skill' },
  { query: 'armbar thumb direction', lang: 'en', expectedId: 'armbar-system', type: 'skill' },
  { query: 'tuot khuyu', lang: 'vi', expectedId: 'armbar-system', type: 'skill' },
  { query: 'triangle one shoulder out', lang: 'en', expectedId: 'triangle-system', type: 'skill' },
  { query: 'omoplata shoulder clamp', lang: 'en', expectedId: 'omoplata-system', type: 'skill' },
  { query: 'false reap knee line', lang: 'en', expectedId: 'false-reap-entry', type: 'skill' },
  { query: 'compression safety smother', lang: 'en', expectedId: 'smother-safety', type: 'skill' },
  { query: 'high wrist guillotine', lang: 'en', expectedId: 'high-wrist-guillotine', type: 'skill' },
  { query: 'crab ride back take', lang: 'en', expectedId: 'crab-ride', type: 'skill' },
]

const failures = checks.flatMap((check) => {
  const results = searchKnowledge(check.query, check.lang, { type: check.type }).slice(0, 8)
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
