/**
 * Check which skills still need video coverage after Galvao removal.
 * Reads videoReferences.ts and counts references per skill ID.
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const content = readFileSync(resolve('src/data/videos/videoReferences.ts'), 'utf-8')

// Find all unique skill IDs referenced
const skillRefs = {}
const regex = /relatedSkillIds:\s*\[([^\]]+)\]/g
let match
while ((match = regex.exec(content)) !== null) {
  const ids = match[1].split(',').map(s => s.trim().replace(/["']/g, '')).filter(Boolean)
  ids.forEach(id => {
    skillRefs[id] = (skillRefs[id] || 0) + 1
  })
}

// All known skill IDs based on the codebase
const allKnownSkills = [
  'rear-naked-choke-system', 'armbar-system', 'triangle-system', 'guillotine-system',
  'arm-triangle-mount', 'kimura-system', 'omoplata-system', 'gogoplata', 'buggy-choke',
  'choi-bar', 'smother-safety', 'heel-hook-safety', 'straight-ankle-lock-safety',
  'leg-lock-safety-basics',
  'back-control', 'back-escape', 'mount-control', 'mount-escape', 'mount-survival',
  's-mount-control', 's-mount-armbar', 'side-control-escape', 'side-control-pin',
  'bodylock-passing', 'knee-cut-passing', 'headquarters-passing', 'leg-drag-basics',
  'outside-passing', 'closed-guard-sweeps', 'closed-guard-posture-control',
  'butterfly-guard-off-balance', 'half-guard-knee-shield', 'octopus-guard-control',
  'guard-pulling-strategy', 'front-headlock-defense', 'shoulder-crunch-control',
  'single-leg-x-basics', 'k-guard-matrix', 'k-guard-entry',
  'false-reap-entry', 'saddle-inside-sankaku-control', 'crab-ride',
  'wrist-ride-back-exposure', 'rear-triangle-control',
  'sprawl-go-behind', 'single-leg-bjj', 'scramble-control',
  'hand-fighting', 'dogfight-knee-tap', 'turtle-ride', 'shin-to-shin-entry',
  'positional-hierarchy', 'inside-position',
]

console.log('=== SKILL VIDEO COVERAGE REPORT ===')
console.log('')

const missing = []
const lowCoverage = []

allKnownSkills.sort().forEach(id => {
  const count = skillRefs[id] || 0
  const status = count === 0 ? '❌ MISSING' : count <= 2 ? '⚠️ LOW' : '✅ OK'
  console.log(`${status.padEnd(10)} ${id.padEnd(40)} ${count} videos`)
  if (count === 0) missing.push(id)
  if (count > 0 && count <= 2) lowCoverage.push(id)
})

console.log('')
console.log(`=== SUMMARY ===`)
console.log(`Skills with 0 videos: ${missing.length}`)
console.log(`Skills with 1-2 videos: ${lowCoverage.length}`)
console.log(`Skills with 3+ videos: ${allKnownSkills.length - missing.length - lowCoverage.length}`)

if (missing.length > 0) {
  console.log('\nMISSING SKILLS:')
  missing.forEach(id => console.log(`  - ${id}`))
}
if (lowCoverage.length > 0) {
  console.log('\nLOW COVERAGE (1-2 videos):')
  lowCoverage.forEach(id => console.log(`  - ${id}`))
}
