import type { SkillNode } from './_helpers'
import { cap } from './_helpers'

export type NextStepView = {
  prerequisiteIds: string[]
  relatedSkillIds: string[]
}

export function buildNextStepView(skill: SkillNode): NextStepView {
  return {
    prerequisiteIds: cap(skill.prerequisites, 3),
    relatedSkillIds: cap(skill.relatedSkills, 3),
  }
}
