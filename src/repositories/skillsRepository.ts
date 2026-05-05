import { skillNodes } from '../data/skillNodes'

export const getSkills = async () => skillNodes

export const getSkillById = async (id: string) => skillNodes.find((skill) => skill.id === id)
