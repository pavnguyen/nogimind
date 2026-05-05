import type { LocalizedText } from '../types/skill'

const normalizeBlock = (text: string) =>
  text
    .replace(/\s+/g, ' ')
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
    .trim()
    .toLowerCase()

export type DuplicateBlock = {
  text: string
  count: number
  sources: string[]
}

export const extractLocalizedTexts = (value: unknown): string[] => {
  if (!value) return []
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap((item) => extractLocalizedTexts(item))
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>
    if (typeof record.vi === 'string' && typeof record.en === 'string' && typeof record.fr === 'string') {
      const localized = record as LocalizedText
      return [localized.vi, localized.en, localized.fr]
    }
    return Object.values(record).flatMap((item) => extractLocalizedTexts(item))
  }
  return []
}

export const findDuplicateBlocks = (
  entries: { id: string; texts: unknown }[],
  minLength = 80,
  minCount = 2,
): DuplicateBlock[] => {
  const map = new Map<string, { text: string; sources: Set<string> }>()

  for (const entry of entries) {
    for (const text of extractLocalizedTexts(entry.texts)) {
      const trimmed = normalizeBlock(text)
      if (trimmed.length < minLength) continue
      const existing = map.get(trimmed)
      if (existing) existing.sources.add(entry.id)
      else map.set(trimmed, { text: text.trim(), sources: new Set([entry.id]) })
    }
  }

  return [...map.entries()]
    .filter(([, value]) => value.sources.size >= minCount)
    .map(([, value]) => ({ text: value.text, count: value.sources.size, sources: [...value.sources] }))
    .sort((a, b) => b.count - a.count || b.text.length - a.text.length)
}
