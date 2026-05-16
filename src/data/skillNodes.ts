import type { SkillNode } from '../types/skill'
import { buildSkillsFromSeeds, finalizeSkill } from './skillBuilder'
import { escapeSkillSeeds } from './skills/escapes'
import { foundationSkillSeeds } from './skills/foundation'
import { guardSkillSeeds } from './skills/guard'
import { legLockSkillSeeds } from './skills/legLocks'
import { modernExpansionSkills } from './skills/modern'
import { passingSkillSeeds } from './skills/passing'
import { pinAndRideSkillSeeds } from './skills/pins'
import { priorityNoGiSkillSeeds } from './skills/priorityNoGi'
import { submissionSkillSeeds } from './skills/submissions'
import { wrestlingSkillSeeds } from './skills/wrestling'

const coreSkillSeeds = [
  ...foundationSkillSeeds,
  ...escapeSkillSeeds,
  ...guardSkillSeeds,
  ...wrestlingSkillSeeds,
  ...passingSkillSeeds,
  ...pinAndRideSkillSeeds,
  ...submissionSkillSeeds,
  ...legLockSkillSeeds,
  ...priorityNoGiSkillSeeds,
]

export const coreSkillNodes: SkillNode[] = buildSkillsFromSeeds(coreSkillSeeds)

export const skillNodes: SkillNode[] = [
  ...coreSkillNodes,
  ...modernExpansionSkills.map(finalizeSkill),
]
