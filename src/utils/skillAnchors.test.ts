import { describe, it, expect } from 'vitest'
import { SKILL_SECTIONS, skillAnchorForFields, skillTabForAnchor } from './skillAnchors'

describe('skillAnchors', () => {
  it('maps search fields to the section that renders them', () => {
    expect(skillAnchorForFields(['system logic'])).toBe(SKILL_SECTIONS.systemLogic)
    expect(skillAnchorForFields(['tags', 'fix it fast'])).toBe(SKILL_SECTIONS.fixItFast)
    expect(skillAnchorForFields(['instruction'])).toBe(SKILL_SECTIONS.microDetails)
    expect(skillAnchorForFields(['video references'])).toBe(SKILL_SECTIONS.videoReferences)
    expect(skillAnchorForFields(['next step'])).toBe(SKILL_SECTIONS.nextStep)
  })

  it('ignores unknown fields such as title or tags', () => {
    expect(skillAnchorForFields(['title', 'tags', 'description'])).toBeUndefined()
    expect(skillAnchorForFields([])).toBeUndefined()
  })

  it('resolves the tab that renders each anchor', () => {
    expect(skillTabForAnchor(SKILL_SECTIONS.systemLogic)).toBe('learn')
    expect(skillTabForAnchor(SKILL_SECTIONS.commonMistakes)).toBe('learn')
    expect(skillTabForAnchor(SKILL_SECTIONS.safety)).toBe('fix')
    expect(skillTabForAnchor(SKILL_SECTIONS.videoReferences)).toBe('watch')
    expect(skillTabForAnchor('pipeline-does-not-exist')).toBeUndefined()
    expect(skillTabForAnchor('')).toBeUndefined()
  })

  it('keeps every section id a unique pipeline-* anchor that has a tab', () => {
    const ids = Object.values(SKILL_SECTIONS)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) {
      expect(id).toMatch(/^pipeline-[a-z-]+$/)
      expect(skillTabForAnchor(id)).toBeDefined()
    }
  })
})
