import { skillNodes } from '../src/data/skillNodes'

const counts = {
  total: skillNodes.length,
  submissions: 0,
  guards: 0,
  passing: 0,
  legLocks: 0,
  wrestling: 0,
  escapes: 0,
  pinsAndRides: 0,
  survival: 0,
  modernExpansion: 0,
  safety: 0,
}

skillNodes.forEach(skill => {
  const domain = skill.domain
  if (domain === 'submission_systems') counts.submissions++
  if (domain === 'guard_offense' || domain === 'guard_retention') counts.guards++
  if (domain === 'passing') counts.passing++
  if (domain === 'leg_lock_systems') counts.legLocks++
  if (domain === 'wrestle_up_wrestling') counts.wrestling++
  if (domain === 'escapes') counts.escapes++
  if (domain === 'pins_rides') counts.pinsAndRides++
  if (domain === 'survival_defense' || domain === 'positional_awareness') counts.survival++
  
  if (skill.modernSystemGroup) counts.modernExpansion++
  if (skill.tags?.includes('safety')) counts.safety++
})

console.log('--- Skill Counts ---')
console.log(JSON.stringify(counts, null, 2))

const qualityGaps = skillNodes.filter(skill => {
  const hasBodyPosition = skill.bodyToBodyDetails && skill.bodyToBodyDetails.phases.length >= 3
  const hasMoneyDetails = skill.microDetailSystem && skill.microDetailSystem.topFiveDetails && skill.microDetailSystem.topFiveDetails.length >= 5
  return !hasBodyPosition || !hasMoneyDetails
}).map(s => ({ id: s.id, phases: s.bodyToBodyDetails?.phases.length, details: s.microDetailSystem?.topFiveDetails?.length }))

console.log('\n--- Quality Gaps (Incomplete Body Position or Money Details) ---')
console.log(JSON.stringify(qualityGaps, null, 2))
