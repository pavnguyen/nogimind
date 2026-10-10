import type { LibraryTier, MetaStatus, ModernSystemGroup, RiskLevel, TechniqueFamily } from '../types/skill'

/**
 * Canonical values for the modern skill filters.
 *
 * These arrays drive URL parameter validation on the skill map and are the
 * list every locale needs `modern.*` labels for (see
 * `src/test/modernFilterLabels.test.ts`). Filter options in the UI are built
 * from the data itself, so a value only appears when at least one skill uses
 * it.
 */

export const libraryTiers: LibraryTier[] = [
  'core',
  'modern_expansion',
  'advanced_niche',
  'safety_critical',
]

export const techniqueFamilies: TechniqueFamily[] = [
  'guard',
  'passing',
  'submission',
  'back-take',
  'ride',
  'wrestling',
  'leg-lock',
  'front-headlock',
  'escape',
  'pin',
  'scramble',
  'safety',
  'compression',
  'ruleset',
]

export const modernSystemGroups: ModernSystemGroup[] = [
  'octopus',
  'clamp_guard',
  'shoulder_crunch',
  's_mount',
  'k_guard',
  'matrix',
  'false_reap',
  'leg_lock',
  'crab_ride',
  'wrist_ride',
  'x_guard',
  'single_leg_x',
  'front_headlock',
  'wrestle_up',
  'modern_passing',
  'turtle_ride',
  'smother',
  'back_triangle',
  'counter_wrestling',
  'back_control',
  'compression',
  'dagestani_handcuff',
  'foot_lock',
  'heel_hook',
  'leg_locking_safety',
  'mount_attacks',
  'neck_safety',
  'power_half_ride',
  'takedown_safety',
  'safety',
]

export const metaStatuses: MetaStatus[] = [
  'fundamental',
  'modern_common',
  'emerging',
  'specialized',
  'experimental',
]

export const riskLevels: RiskLevel[] = ['low', 'medium', 'high', 'safety_critical']
