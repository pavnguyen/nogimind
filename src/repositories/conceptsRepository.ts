import { concepts } from '../data/concepts'

export const getConcepts = async () => concepts

export const getConceptById = async (id: string) => concepts.find((concept) => concept.id === id)
