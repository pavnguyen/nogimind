/**
 * Shared text normalisation for the in-page search filters.
 *
 * Vietnamese is a primary audience language, so a query typed without
 * diacritics ("khoa tay") must match accented content ("khóa tay"). Folding is
 * done character by character, which keeps the normalised string exactly as long
 * as its source, callers that slice the original text by a match offset rely on
 * that.
 */

const COMBINING_MARKS = /[\u0300-\u036f]/g
const D_STROKE = /[đĐ]/g

/** Lowercase a single character and strip any diacritics it carries. */
const foldChar = (char: string): string =>
  char.normalize('NFD').replace(COMBINING_MARKS, '').replace(D_STROKE, 'd').toLowerCase()

/**
 * Normalise text for matching: lowercase, diacritics removed, `đ` folded to `d`.
 * Length-preserving, so `normalizeSearchText(text).indexOf(needle)` yields an
 * offset that is also valid in `text`.
 */
export const normalizeSearchText = (text: string): string =>
  Array.from(text, (char) => foldChar(char)).join('')

/** Normalise a user query (also trims surrounding whitespace). */
export const normalizeSearchQuery = (query: string): string => normalizeSearchText(query).trim()

/**
 * Check an already-normalised query against a haystack.
 * An empty query matches everything, so callers can use it as "no filter".
 */
export const haystackIncludesQuery = (haystack: string, normalizedQuery: string): boolean =>
  !normalizedQuery || normalizeSearchText(haystack).includes(normalizedQuery)

/** Convenience wrapper for one-off checks that do not reuse the normalised query. */
export const matchesSearchQuery = (haystack: string, query: string): boolean =>
  haystackIncludesQuery(haystack, normalizeSearchQuery(query))
