import { describe, it, expect } from 'vitest'
import {
  normalizeSearchQuery,
  normalizeSearchText,
  haystackIncludesQuery,
  matchesSearchQuery,
} from './searchText'

describe('normalizeSearchText', () => {
  it('removes Vietnamese diacritics and folds đ', () => {
    expect(normalizeSearchText('Khóa tay')).toBe('khoa tay')
    expect(normalizeSearchText('Bẻ cổ chân')).toBe('be co chan')
    expect(normalizeSearchText('Đòn siết cổ sau')).toBe('don siet co sau')
  })

  it('leaves english text intact apart from case', () => {
    expect(normalizeSearchText('Rear Naked Choke')).toBe('rear naked choke')
  })

  it('keeps the same length as its source so match offsets stay valid', () => {
    const source = 'Khóa gót chân - Đánh giá 50/50'
    expect(normalizeSearchText(source)).toHaveLength(source.length)
  })
})

describe('normalizeSearchQuery', () => {
  it('trims surrounding whitespace', () => {
    expect(normalizeSearchQuery('  Khóa Tay  ')).toBe('khoa tay')
  })
})

describe('haystackIncludesQuery', () => {
  it('matches accented content from a diacritic-free query', () => {
    expect(haystackIncludesQuery('Khóa tay từ mount', 'khoa tay')).toBe(true)
  })

  it('matches content queried with diacritics', () => {
    expect(haystackIncludesQuery('Khóa tay từ mount', normalizeSearchQuery('khóa tay'))).toBe(true)
    expect(haystackIncludesQuery('Guard retention', normalizeSearchQuery('khóa tay'))).toBe(false)
  })

  it('treats an empty query as "no filter"', () => {
    expect(haystackIncludesQuery('anything', '')).toBe(true)
    expect(haystackIncludesQuery('', '')).toBe(true)
  })

  it('ignores case on both sides', () => {
    expect(matchesSearchQuery('GUARD RETENTION', 'guard retention')).toBe(true)
  })

  it('does not match unrelated text', () => {
    expect(matchesSearchQuery('Guard retention', 'khoa tay')).toBe(false)
  })
})
