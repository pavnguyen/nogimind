/**
 * skillViewModel.ts
 * Pure builder functions for the Technique Card OS.
 * Each function takes a SkillNode and returns a typed view-model.
 * Safe to wrap in useMemo — no side effects, no external state.
 */

import type {
  BodyToBodyContact,
  BodyToBodyPhase,
  LanguageCode,
  LocalizedStringArray,
  LocalizedText,
  SkillNode,
} from '../../../types/skill'
import type { TechniqueStateMachine, TechniqueOutcome } from '../../../types/stateMachine'
import { getLocalizedText } from '../../../utils/localization'

export type {
  BodyToBodyContact,
  BodyToBodyPhase,
  LanguageCode,
  LocalizedText,
  SkillNode,
  TechniqueOutcome,
  TechniqueStateMachine,
}

// ─── Shared helpers ────────────────────────────────────────────────────────────

const VI_TERM_FIXES: Array<[RegExp, string]> = [
  [/\bwrist\b/gi, 'cổ tay'],
  [/\bankle\b/gi, 'mắt cá chân'],
  [/\bheel\b/gi, 'gót chân'],
  [/\bknee line\b/gi, 'đường gối'],
  [/\bhip line\b/gi, 'đường hông'],
  [/\belbow line\b/gi, 'đường khuỷu tay'],
  [/\bshoulder line\b/gi, 'đường vai'],
  [/\bcenterline\b/gi, 'đường trung tuyến'],
  [/^Chin first, squeeze later\.?$/gi, 'Vào cằm trước, siết sau.'],
  [/^Angle first\.?$/gi, 'Lấy góc trước.'],
  [/^Hands win, then squeeze\.?$/gi, 'Thắng tay trước rồi mới siết.'],
  [/^Line first\.?$/gi, 'Ưu tiên đường lực trước.'],
  [/^Head safe\.?$/gi, 'Đầu an toàn.'],
  [/^Hips under\.?$/gi, 'Hông ở dưới đường lực.'],
  [/^Step and angle\.?$/gi, 'Bước chân rồi lấy góc.'],
]

export const normalizeViTerms = (value: string, lang: LanguageCode): string => {
  if (lang !== 'vi' || !value) return value
  return VI_TERM_FIXES.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value)
}

export const loc = (t: LocalizedText | LocalizedStringArray | undefined, lang: LanguageCode): string =>
  normalizeViTerms(getLocalizedText(t, lang), lang)

export const locArr = (arr: { vi: string[]; en: string[]; fr: string[] }, lang: LanguageCode): string[] =>
  (arr[lang] ?? arr.en ?? []).map((item) => normalizeViTerms(item, lang))

export const dedupe = (strings: string[]): string[] => [...new Set(strings.filter(Boolean))]

export const cap = <T>(arr: T[], n: number): T[] => arr.slice(0, n)
