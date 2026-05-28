/**
 * scaffold-skill.ts — Create a new skill content folder with template files.
 *
 * Usage:  npx tsx scripts/content/scaffold-skill.ts <domain> <skill-id>
 * Example: npx tsx scripts/content/scaffold-skill.ts passing knee-cut-passing
 */

import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs'
import { join, dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const CONTENT_ROOT = resolve(__dirname, '../../content')

const VALID_DOMAINS = [
  'submissions', 'guard', 'passing', 'escapes', 'pins',
  'leg-locks', 'wrestling', 'foundation', 'modern', 'priority',
]

function scaffoldSkill(domain: string, skillId: string): void {
  const skillDir = join(CONTENT_ROOT, 'skills', domain, skillId)

  if (existsSync(skillDir)) {
    console.log(`\n⚠ Skill folder already exists: ${skillDir}\n`)
    return
  }

  mkdirSync(skillDir, { recursive: true })

  const templates: [string, string][] = [
    ['skill.json', JSON.stringify({
      id: skillId,
      domain,
      level: 'intermediate',
      name: skillId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      aliases: [],
      keywords: [],
      relatedSkills: [],
      relatedPositions: [],
      relatedConcepts: [],
    }, null, 2)],
    ['content.en.json', JSON.stringify({
      id: skillId,
      locale: 'en',
      name: skillId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      description: '',
      shortInstruction: '',
      summary: '',
      whyItWorks: [],
      commonMistakes: [],
      coachingCues: [],
    }, null, 2)],
    ['content.vi.json', JSON.stringify({
      id: skillId,
      locale: 'vi',
      name: '',
      description: '',
      commonMistakes: [],
    }, null, 2)],
    ['content.fr.json', JSON.stringify({
      id: skillId,
      locale: 'fr',
      name: '',
      description: '',
      commonMistakes: [],
    }, null, 2)],
  ]

  for (const [name, content] of templates) {
    writeFileSync(join(skillDir, name), content + '\n', 'utf-8')
    console.log(`  ✓ ${name}`)
  }

  console.log(`\n✅ Created skill: ${domain}/${skillId}\n`)
  console.log('  Next steps:')
  console.log(`    1. Edit content/skills/${domain}/${skillId}/skill.json`)
  console.log(`    2. Add content in content.en.json, content.vi.json, content.fr.json`)
  console.log(`    3. Optionally create videos.json`)
  console.log(`    4. Run 'npm run build:content' to generate artifacts\n`)
}

// ── CLI ──────────────────────────────────────────────────────────────────────

const [, , domain, skillId] = process.argv

if (!domain || !skillId) {
  console.log('\nUsage: npx tsx scripts/content/scaffold-skill.ts <domain> <skill-id>\n')
  console.log(`Valid domains: ${VALID_DOMAINS.join(', ')}\n`)
  process.exit(1)
}

if (!VALID_DOMAINS.includes(domain)) {
  console.log(`\n⚠ Invalid domain: "${domain}"`)
  console.log(`Valid domains: ${VALID_DOMAINS.join(', ')}\n`)
  process.exit(1)
}

if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(skillId)) {
  console.log('\n⚠ skill-id must be kebab-case (e.g., "knee-cut-passing")\n')
  process.exit(1)
}

scaffoldSkill(domain, skillId)
