import { archetypes } from '../data/archetypes'

export const getArchetypes = async () => archetypes

export const getArchetypeById = async (id: string) => archetypes.find((archetype) => archetype.id === id)
