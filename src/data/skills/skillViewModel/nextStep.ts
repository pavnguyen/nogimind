import type { SkillNode } from './_helpers'
import { cap } from './_helpers'

export type NextStepView = {
  prerequisiteIds: string[]
  relatedSkillIds: string[]
  sharedPrincipleIds: string[]
  sharedCueIds: string[]
  sharedSafetyIds: string[]
}

export function buildNextStepView(skill: SkillNode): NextStepView {
  return {
    prerequisiteIds: cap(skill.prerequisites, 3),
    relatedSkillIds: cap(skill.relatedSkills, 3),
    sharedPrincipleIds: cap(skill.sharedPrincipleIds ?? [], 3),
    sharedCueIds: cap(skill.sharedCueIds ?? [], 3),
    sharedSafetyIds: cap(skill.sharedSafetyIds ?? [], 3),
  }
}
