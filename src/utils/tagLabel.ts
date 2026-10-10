/**
 * Display formatting for technique tags.
 *
 * Tag values stay lowercase machine keys (`neck-safety`, `tier:modern-expansion`,
 * `family:leg_lock`) because search, filters and analytics match on them. Chips and
 * filter options render the human-readable label instead, so technique names read
 * "Armbar", "Heel Hook", "Neck Safety".
 */

/** Tokens that are acronyms, not words, and must stay upper-case. */
const ACRONYMS = new Set(['bjj', 'rnc', 'mma', 'adcc', 'ibjjf', 'nogi'])

const capitalizeWord = (word: string): string =>
  ACRONYMS.has(word.toLowerCase()) ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)

/**
 * Turn a machine tag into its display label.
 *
 * `armbar` -> `Armbar`, `neck-safety` -> `Neck Safety`,
 * `tier:modern-expansion` -> `Tier: Modern Expansion`, `family:leg_lock` -> `Family: Leg Lock`.
 */
export const formatTagLabel = (tag: string): string =>
  tag
    .split(':')
    .map((segment) => segment.split(/[\s\-_]+/).filter(Boolean).map(capitalizeWord).join(' '))
    .join(': ')

/** Filter groups whose labels live under the `modern.*` i18n namespace. */
type ModernLabelGroup = 'library' | 'family' | 'system' | 'risk' | 'meta'

/**
 * Label for a canonical filter value, e.g. `leg-lock` -> `Leg Lock`.
 *
 * Resolves `modern.<group>.<value>` from the locale files (those keys are
 * guarded by `src/test/modernFilterLabels.test.ts`) and falls back to the
 * formatted tag label, so a value that arrives from content without a key
 * renders as a readable name instead of a raw machine code.
 */
export const modernFilterLabel = (
  t: (key: string) => string,
  group: ModernLabelGroup,
  value: string,
): string => {
  const key = `modern.${group}.${value}`
  const resolved = t(key)
  return resolved && resolved !== key ? resolved : formatTagLabel(value)
}
