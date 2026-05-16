import type { SkillNode } from '../types/skill'

const domainPriority = ['survival_defense', 'escapes', 'guard_retention', 'wrestle_up_wrestling', 'passing']

export const getRecommendedSkills = (
  skills: SkillNode[],
) => {
  return skills
    .map((skill) => {
      let score = 0
      score += skill.level === 'beginner' ? 4 : skill.level === 'intermediate' ? 2 : 1
      score += domainPriority.includes(skill.domain) ? 3 : 0
      score += skill.prerequisites.length ? Math.max(0, 3 - skill.prerequisites.length) : 3
      return { skill, score }
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.skill)
}
