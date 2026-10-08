import { describe, it, expect, beforeAll } from 'vitest'
import { resolveSearchAliases, setSearchData, syncSearchKnowledge } from './searchEngine'
import type { SkillNode } from '../types/skill'

const localized = (en: string, vi: string, fr: string) => ({ en, vi, fr })

const skill = {
  id: 'armbar-system',
  title: localized('Armbar System', 'Hệ thống khóa tay', 'Système clé de bras'),
  shortDescription: localized('Chain the Armbar.', 'Nối chuỗi khóa tay.', 'Enchaîner la clé de bras.'),
  tags: ['armbar'],
  domain: 'submission_systems',
  level: 'intermediate',
  whyItMatters: localized(
    'The Armbar is the highest percentage finish.',
    'Siết khóa tay khi đối thủ mở khuỷu tay và để lộ đường tay.',
    'La clé de bras punit le coude ouvert.',
  ),
  situation: localized('', '', ''),
  primaryGoal: localized('', '', ''),
  keyConcepts: { en: [], vi: [], fr: [] },
  bodyChecklist: {},
  decisionTree: [],
  dangerSignals: { en: [], vi: [], fr: [] },
  commonMistakes: { en: [], vi: [], fr: [] },
  failureResponses: [],
  drills: [],
  skillTests: [],
  prerequisites: [],
  relatedSkills: [],
  bodyMechanicsSystem: {
    overview: localized('', '', ''),
    phases: [],
    globalPrinciples: { en: [], vi: [], fr: [] },
    nonNegotiables: { en: [], vi: [], fr: [] },
    commonMechanicalErrors: { en: [], vi: [], fr: [] },
    correctionCues: { en: [], vi: [], fr: [] },
    safetyNotes: { en: [], vi: [], fr: [] },
  },
} as unknown as SkillNode

beforeAll(() => {
  setSearchData({
    skillNodes: [skill],
    concepts: [],
    positions: [],
    glossaryTerms: [],
    defensiveLayers: [],
    archetypes: [],
    techniqueStateMachineBySkillId: new Map(),
    techniqueStateMachines: [],
    microDetails: [],
  })
})

describe('syncSearchKnowledge snippets', () => {
  it('returns a snippet for a Vietnamese query typed without diacritics', () => {
    // "khuyu" only exists in the content as "khuỷu", so a diacritic-sensitive
    // lookup finds nothing to slice around.
    const [result] = syncSearchKnowledge('khuyu', 'vi', { mode: 'deep' })

    expect(result).toBeDefined()
    expect(result.snippet).toBeDefined()
    expect(result.snippet).toContain('khuỷu')
  })

  it('still returns a snippet when the no-diacritic query is upper-cased', () => {
    const [result] = syncSearchKnowledge('KHUYU', 'vi', { mode: 'deep' })

    expect(result?.snippet).toBeDefined()
    expect(result?.snippet).toContain('khuỷu')
  })

  it('returns a snippet for the diacritic query too', () => {
    const [result] = syncSearchKnowledge('khuỷu', 'vi', { mode: 'deep' })

    expect(result?.snippet).toBeDefined()
    expect(result?.snippet).toContain('khuỷu')
  })

  it('returns a snippet for an English query', () => {
    const [result] = syncSearchKnowledge('armbar', 'en', { mode: 'deep' })

    expect(result?.snippet).toBeDefined()
    expect(result?.snippet).toContain('Armbar')
  })
})

describe('resolveSearchAliases', () => {
  it('finds a row whose key is capitalised in the table', () => {
    const row = resolveSearchAliases('guillotine')

    expect(row).toBeDefined()
    expect(row).toContain('guillotine')
  })

  it('does not depend on the casing of the query', () => {
    expect(resolveSearchAliases('GUILLOTINE')).toEqual(resolveSearchAliases('guillotine'))
    expect(resolveSearchAliases('front headlock')).toEqual(resolveSearchAliases('Front Headlock'))
  })

  it('folds Vietnamese alias values so a plain-typed query can reach the row', () => {
    const row = resolveSearchAliases('armbar')

    expect(row).toBeDefined()
    expect(row).toContain('khoa tay')
    expect(row).not.toContain('khóa tay')
  })

  it('returns folded values so indexed and query terms stay comparable', () => {
    for (const value of resolveSearchAliases('guillotine') ?? []) {
      expect(value).toBe(value.toLowerCase())
      expect(value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')).toBe(value)
    }
  })

  it('returns undefined for a term that is not an alias key', () => {
    expect(resolveSearchAliases('not-a-real-term')).toBeUndefined()
  })
})
