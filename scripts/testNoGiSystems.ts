/**
 * NoGi Mind — Classification, Mapping & Learning Path Tests
 *
 * These tests verify:
 * 1. classifyNoGiVideo still works correctly
 * 2. Video-to-skill mapping produces correct results
 * 3. Learning paths reference valid skill IDs
 * 4. No duplicate IDs in paths or skills
 *
 * Run with: npx tsx scripts/testNoGiSystems.ts
 */

import { classifyNoGiVideo, type NoGiVideoClassification } from '../src/data/videos/noGiVideoFilter'
import { mapVideoToSkills } from '../src/data/videos/videoSkillMapping'
import { noGiLearningPaths } from '../src/data/noGiLearningPaths'
import { skillNodes } from '../src/data/skillNodes'

// ─── Test Helpers ────────────────────────────────────────────────
let passed = 0
let failed = 0

function assert(condition: boolean, message: string) {
  if (condition) {
    passed++
    console.log(`  ✅ ${message}`)
  } else {
    failed++
    console.error(`  ❌ ${message}`)
  }
}

function assertStatus(result: NoGiVideoClassification, expected: 'keep' | 'manual_review' | 'reject', label: string) {
  assert(result.status === expected, `${label}: expected "${expected}", got "${result.status}" [${result.reasons.join(', ')}]`)
}

function makeVideo(overrides: {
  id?: string
  title: string
  channelName: string
  techniqueTags?: string[]
  sourceNote?: string
  source_page?: string
}) {
  return {
    id: overrides.id ?? 'test-video',
    title: { en: overrides.title, vi: overrides.title, fr: overrides.title },
    channelName: overrides.channelName,
    techniqueTags: overrides.techniqueTags ?? [],
    sourceNote: overrides.sourceNote,
    source_page: overrides.source_page,
  }
}

// ─── SECTION 1: classifyNoGiVideo Tests ──────────────────────────
console.log('\n═══ classifyNoGiVideo Tests ═══')

// 1.1 Trusted No-Gi channel with technique signal → keep
console.log('\n--- Trusted channel + technique signal ---')
assertStatus(
  classifyNoGiVideo(makeVideo({
    title: 'K Guard Entries - No Gi',
    channelName: 'Lachlan Giles',
    techniqueTags: ['k-guard', 'guard'],
  })),
  'keep',
  'Lachlan Giles K Guard no-gi → keep',
)

assertStatus(
  classifyNoGiVideo(makeVideo({
    title: 'False Reap Entry from RDLR',
    channelName: 'Jason Rau',
    techniqueTags: ['false reap', 'leg lock'],
  })),
  'keep',
  'Jason Rau false reap → keep',
)

assertStatus(
  classifyNoGiVideo(makeVideo({
    title: 'Crucifix from Turtle - No Gi',
    channelName: 'Lachlan Giles',
    techniqueTags: ['crucifix', 'turtle'],
  })),
  'keep',
  'Lachlan Giles crucifix no-gi → keep',
)

assertStatus(
  classifyNoGiVideo(makeVideo({
    title: 'Ham Sandwich to Electric Chair',
    channelName: 'Brandon Mccaghren',
    techniqueTags: ['Ham sandwich', 'calf slicer'],
  })),
  'keep',
  'Brandon Mccaghren ham sandwich → keep',
)

assertStatus(
  classifyNoGiVideo(makeVideo({
    title: 'Deep Half Guard Sweeps - No Gi Grappling',
    channelName: 'Knight Jiu Jitsu',
    techniqueTags: ['Deep half guard', 'sweep'],
  })),
  'keep',
  'Knight JJ deep half guard no-gi → keep',
)

// 1.2 Gi-only videos → reject
console.log('\n--- Gi-only videos ---')
assertStatus(
  classifyNoGiVideo(makeVideo({
    title: 'Lapel Guard Sweeps',
    channelName: 'Some Channel',
    techniqueTags: ['lapel', 'guard'],
  })),
  'reject',
  'Lapel guard → reject',
)

assertStatus(
  classifyNoGiVideo(makeVideo({
    title: 'Spider Guard Passing',
    channelName: 'Some Channel',
    techniqueTags: ['spider', 'passing'],
  })),
  'reject',
  'Spider guard → reject',
)

assertStatus(
  classifyNoGiVideo(makeVideo({
    title: 'Bow and Arrow Choke from Back',
    channelName: 'Some Channel',
    techniqueTags: ['bow and arrow', 'choke'],
  })),
  'reject',
  'Bow and arrow choke → reject',
)

assertStatus(
  classifyNoGiVideo(makeVideo({
    title: 'Collar Choke from Mount',
    channelName: 'Some Channel',
    techniqueTags: ['collar choke', 'mount'],
  })),
  'reject',
  'Collar choke → reject',
)

// 1.3 Gi-heavy channels → reject
console.log('\n--- Gi-heavy channels ---')
assertStatus(
  classifyNoGiVideo(makeVideo({
    title: 'Guard Sweep Tutorial',
    channelName: 'AOJ',
    techniqueTags: ['guard', 'sweep'],
  })),
  'reject',
  'AOJ channel → reject',
)

assertStatus(
  classifyNoGiVideo(makeVideo({
    title: 'Passing Fundamentals',
    channelName: 'Mendes Brothers',
    techniqueTags: ['passing'],
  })),
  'reject',
  'Mendes Brothers channel → reject',
)

assertStatus(
  classifyNoGiVideo(makeVideo({
    title: 'Side Control Techniques',
    channelName: 'The Grappling Academy',
    techniqueTags: ['side-control'],
  })),
  'reject',
  'The Grappling Academy (denied) → reject',
)

// 1.4 bjj.tips generated without visual No-Gi proof → reject
console.log('\n--- bjj.tips without proof ---')
assertStatus(
  classifyNoGiVideo(makeVideo({
    id: 'bjj-some-video-abc',
    title: 'Guard Sweep Overview',
    channelName: 'Unknown',
    techniqueTags: ['guard'],
    sourceNote: 'BJJ.Tips listing',
  })),
  'reject',
  'bjj.tips generated without no-gi proof → reject',
)

// 1.5 bjj.tips generated WITH visual No-Gi proof → keep
assertStatus(
  classifyNoGiVideo(makeVideo({
    id: 'bjj-some-video-def',
    title: 'No Gi Wrestling Up',
    channelName: 'Unknown',
    techniqueTags: ['wrestling'],
    sourceNote: 'BJJ.Tips listing',
  })),
  'keep',
  'bjj.tips generated with no-gi proof in title → keep',
)

// 1.6 Transferable-only items → manual_review
console.log('\n--- Transferable-only techniques ---')
assertStatus(
  classifyNoGiVideo(makeVideo({
    title: 'Butterfly Guard Basics',
    channelName: 'Unknown Channel',
    techniqueTags: ['butterfly'],
  })),
  'manual_review',
  'Butterfly without no-gi proof from unknown → manual_review',
)


// ─── SECTION 2: Video-to-Skill Mapping Tests ────────────────────
console.log('\n═══ Video-to-Skill Mapping Tests ═══')

// 2.1 K Guard maps to k-guard-entry
console.log('\n--- Skill ID mapping ---')
const kGuardMatches = mapVideoToSkills({
  id: 'test-kguard',
  title: 'K Guard Entries and Matrix',
  channelName: 'Lachlan Giles',
  techniqueTags: ['k-guard', 'matrix'],
})
assert(
  kGuardMatches.some((m) => m.skillId === 'k-guard-entry'),
  'K Guard video maps to k-guard-entry',
)
assert(
  kGuardMatches.some((m) => m.skillId === 'k-guard-matrix'),
  'K Guard video also maps to k-guard-matrix',
)

// 2.2 False reap → false-reap-entry
const falseReapMatches = mapVideoToSkills({
  id: 'test-false-reap',
  title: 'False Reap Inversion Tutorial',
  channelName: 'Jason Rau',
  techniqueTags: ['false reap'],
})
assert(
  falseReapMatches.some((m) => m.skillId === 'false-reap-entry'),
  'False reap video maps to false-reap-entry',
)

// 2.3 Crucifix → crucifix-control
const crucifixMatches = mapVideoToSkills({
  id: 'test-crucifix',
  title: 'Breaking Down the Crucifix',
  channelName: 'Lachlan Giles',
  techniqueTags: ['crucifix'],
})
assert(
  crucifixMatches.some((m) => m.skillId === 'crucifix-control'),
  'Crucifix video maps to crucifix-control',
)

// 2.4 Ham Sandwich → bear-trap-ham-sandwich
const hamMatches = mapVideoToSkills({
  id: 'test-ham',
  title: 'Ham Sandwich to Electric Chair',
  channelName: 'Brandon Mccaghren',
  techniqueTags: ['ham sandwich', 'calf slicer'],
})
assert(
  hamMatches.some((m) => m.skillId === 'bear-trap-ham-sandwich'),
  'Ham Sandwich video maps to bear-trap-ham-sandwich',
)

// 2.5 Bear Trap → bear-trap-ham-sandwich
const bearTrapMatches = mapVideoToSkills({
  id: 'test-bear-trap',
  title: 'Bear Trap Entries from Half Guard',
  channelName: 'Knight Jiu Jitsu',
  techniqueTags: ['bear trap'],
})
assert(
  bearTrapMatches.some((m) => m.skillId === 'bear-trap-ham-sandwich'),
  'Bear Trap video maps to bear-trap-ham-sandwich',
)

// 2.6 Deep Half Guard → deep-half-guard
const deepHalfMatches = mapVideoToSkills({
  id: 'test-deep-half',
  title: 'Deep Half Guard Sweeps No Gi',
  channelName: 'Lachlan Giles',
  techniqueTags: ['deep half'],
})
assert(
  deepHalfMatches.some((m) => m.skillId === 'deep-half-guard'),
  'Deep Half Guard video maps to deep-half-guard',
)

// 2.7 Body Lock → bodylock-passing
const bodyLockMatches = mapVideoToSkills({
  id: 'test-bodylock',
  title: 'Body Lock Pass Standard',
  channelName: 'Lachlan Giles',
  techniqueTags: ['bodylock'],
})
assert(
  bodyLockMatches.some((m) => m.skillId === 'bodylock-passing'),
  'Body Lock video maps to bodylock-passing',
)

// 2.8 Front Headlock → snapdown-front-headlock
const fhMatches = mapVideoToSkills({
  id: 'test-fh',
  title: 'Front Headlock to Darce Choke',
  channelName: 'Craig Jones',
  techniqueTags: ['front headlock', 'darce'],
})
assert(
  fhMatches.some((m) => m.skillId === 'snapdown-front-headlock'),
  'Front Headlock video maps to snapdown-front-headlock',
)

// 2.9 Crab Ride → crab-ride
const crabMatches = mapVideoToSkills({
  id: 'test-crab',
  title: 'Crab Ride System',
  channelName: 'Giancarlo Bodoni',
  techniqueTags: ['crab ride'],
})
assert(
  crabMatches.some((m) => m.skillId === 'crab-ride'),
  'Crab Ride video maps to crab-ride',
)

// 2.10 Trusted channel increases confidence
console.log('\n--- Confidence scoring ---')
const trustedMatch = mapVideoToSkills({
  id: 'test-trusted',
  title: 'K Guard Tutorial',
  channelName: 'Lachlan Giles',
  techniqueTags: ['k guard'],
})
const untrustedMatch = mapVideoToSkills({
  id: 'test-untrusted',
  title: 'K Guard Tutorial',
  channelName: 'Random Channel',
  techniqueTags: ['k guard'],
})
const trustedConf = trustedMatch.find((m) => m.skillId === 'k-guard-entry')?.confidence ?? 0
const untrustedConf = untrustedMatch.find((m) => m.skillId === 'k-guard-entry')?.confidence ?? 0
assert(
  trustedConf > untrustedConf,
  `Trusted channel confidence (${trustedConf}) > untrusted (${untrustedConf})`,
)

// 2.11 Gi-only signal prevents mapping
const giVideoMatches = mapVideoToSkills({
  id: 'test-gi',
  title: 'Lapel Guard to K Guard Transition',
  channelName: 'Some Channel',
  techniqueTags: ['lapel', 'k guard'],
})
assert(
  giVideoMatches.length === 0,
  'Gi-only signal prevents production mapping',
)

// 2.12 Paid course is allowed as reference
const paidMatches = mapVideoToSkills({
  id: 'test-paid',
  title: 'K Guard Complete System',
  channelName: 'Lachlan Giles',
  techniqueTags: ['k guard'],
  sourceType: 'paid_course',
})
assert(
  paidMatches.some((m) => m.suggestedPlacement === 'primary'),
  'Paid course from trusted instructor → primary placement',
)


// ─── SECTION 3: Learning Path Validation ─────────────────────────
console.log('\n═══ Learning Path Validation ═══')

const allSkillIds = new Set(skillNodes.map((s) => s.id))

// 3.1 All learning path skill IDs exist
for (const path of noGiLearningPaths) {
  const missing = path.skillSequence.filter((id) => !allSkillIds.has(id))
  assert(
    missing.length === 0,
    `Path "${path.id}": all skill IDs exist${missing.length > 0 ? ` (MISSING: ${missing.join(', ')})` : ''}`,
  )
}

// 3.2 No duplicate path IDs
const pathIds = noGiLearningPaths.map((p) => p.id)
const uniquePathIds = new Set(pathIds)
assert(
  pathIds.length === uniquePathIds.size,
  'No duplicate learning path IDs',
)

// 3.3 Each path has success criteria
for (const path of noGiLearningPaths) {
  assert(
    path.successCriteria.length > 0,
    `Path "${path.id}" has success criteria`,
  )
}


// ─── SECTION 4: Skill Data Integrity ─────────────────────────────
console.log('\n═══ Skill Data Integrity ═══')

// 4.1 No duplicate skill IDs
const skillIdList = skillNodes.map((s) => s.id)
const uniqueSkillIds = new Set(skillIdList)
const duplicateSkillIds = skillIdList.filter((id, i) => skillIdList.indexOf(id) !== i)
assert(
  duplicateSkillIds.length === 0,
  `No duplicate skill IDs${duplicateSkillIds.length > 0 ? ` (DUPES: ${[...new Set(duplicateSkillIds)].join(', ')})` : ''}`,
)

// 4.2 Priority skills exist
const prioritySkills = [
  'k-guard-entry',
  'false-reap-entry',
  'crucifix-control',
  'bear-trap-ham-sandwich',
  'deep-half-guard',
  'half-butterfly-to-leg-entanglements',
]
for (const skillId of prioritySkills) {
  assert(
    allSkillIds.has(skillId),
    `Priority skill "${skillId}" exists in skill nodes`,
  )
}

// 4.3 Expansion skills also present
const expansionCheck = [
  'k-guard-matrix',
  'saddle-inside-sankaku-control',
  'crab-ride',
  'octopus-guard-control',
]
for (const skillId of expansionCheck) {
  assert(
    allSkillIds.has(skillId),
    `Expansion skill "${skillId}" exists`,
  )
}


// ─── Results ─────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════')
console.log(`Total: ${passed + failed} tests`)
console.log(`  ✅ Passed: ${passed}`)
console.log(`  ❌ Failed: ${failed}`)
console.log('═══════════════════════════════════\n')

process.exit(failed > 0 ? 1 : 0)
