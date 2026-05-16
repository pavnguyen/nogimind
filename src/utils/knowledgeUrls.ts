export const getSkillUrl = (skillId: string) => `/skills/${skillId}`

export const getConceptUrl = (conceptId: string) => `/concepts/${conceptId}`

export const getPositionUrl = (positionId: string) => `/positions/${positionId}`

export const getChainUrl = (chainId: string) => `/chains?q=${encodeURIComponent(chainId)}`

export const getTroubleshooterUrl = (skillId: string) => `/troubleshooters/${skillId}`

export const getEscapeMapUrl = (skillId: string) => `/escape-maps/${skillId}`

export const getProblemUrl = (problemId: string) => `/search?q=${encodeURIComponent(problemId)}`

export const getArchetypeUrl = (archetypeId: string) => `/archetypes/${archetypeId}`

export const getMasteryUrl = (stageId?: string) => (stageId ? `/mastery#${stageId}` : '/mastery')

export const getGlossaryUrl = (term: string) => `/glossary?q=${encodeURIComponent(term)}`
