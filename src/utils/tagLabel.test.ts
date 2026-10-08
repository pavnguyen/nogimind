import { describe, it, expect } from 'vitest'
import { formatTagLabel } from './tagLabel'

describe('formatTagLabel', () => {
  it('capitalises single technique words', () => {
    expect(formatTagLabel('armbar')).toBe('Armbar')
    expect(formatTagLabel('triangle')).toBe('Triangle')
    expect(formatTagLabel('kimura')).toBe('Kimura')
  })

  it('capitalises every word of a hyphenated tag', () => {
    expect(formatTagLabel('heel-hook')).toBe('Heel Hook')
    expect(formatTagLabel('neck-safety')).toBe('Neck Safety')
    expect(formatTagLabel('rear-naked-choke')).toBe('Rear Naked Choke')
  })

  it('handles underscores and existing capitals', () => {
    expect(formatTagLabel('family:leg_lock')).toBe('Family: Leg Lock')
    expect(formatTagLabel('half-Guard')).toBe('Half Guard')
    expect(formatTagLabel('Mount')).toBe('Mount')
  })

  it('keeps namespaced tags readable', () => {
    expect(formatTagLabel('tier:modern-expansion')).toBe('Tier: Modern Expansion')
    expect(formatTagLabel('risk:safety-critical')).toBe('Risk: Safety Critical')
  })

  it('upper-cases known acronyms instead of title-casing them', () => {
    expect(formatTagLabel('rnc')).toBe('RNC')
    expect(formatTagLabel('bjj')).toBe('BJJ')
    expect(formatTagLabel('adcc')).toBe('ADCC')
  })

  it('leaves the value untouched when there is nothing to split', () => {
    expect(formatTagLabel('')).toBe('')
    expect(formatTagLabel('knee line')).toBe('Knee Line')
  })
})
