/**
 * Skill prose helpers for the pipeline Learn / Fix tabs.
 *
 * Several content fields (`fixItFast`, `keyCorrections`) pack a "trigger, then
 * answer" pair into one string. The pair is authored in the locale's own
 * language, so the punctuation is the only reliable signal:
 *
 * - `Can't straighten their arm? Pin the elbow to your hip.` (en)
 * - `Không thể duỗi thẳng cánh tay của họ? Dùng chân kẹp khuỷu tay vào hông.` (vi)
 * - `Bị flatten: underhook quá nông` (colon form)
 * - `Nếu họ thả tay ra, đầu gối của bạn quá thấp - hãy đưa nó lên ngang vai.` (dash form)
 *
 * Parsing by delimiter instead of by an English prefix keeps the paired
 * trigger/answer layout working in every locale.
 */

export type ProblemAndFix = {
  /** The trigger, for example a failed attempt or an opponent reaction. */
  problem: string
  /** What to do about it. */
  fix: string
}

// A trigger is short; `?` ends it in every locale. Dashes and colons are also
// used, but only when both halves stay short enough to read as a pair, which
// keeps ordinary prose ("Half Guard → underhook → sweep") from splitting.
const QUESTION_SPLIT = /^(.{4,140}?\?)\s+(\S.*)$/s
const DASH_SPLIT = /^(.{4,120}?)\s+[-–]\s+(\S.*)$/s
const COLON_SPLIT = /^(.{4,120}?)\s*:\s+(\S.*)$/s

export const splitProblemAndFix = (text: string): ProblemAndFix | null => {
  const value = text.trim()

  for (const pattern of [QUESTION_SPLIT, DASH_SPLIT, COLON_SPLIT]) {
    const match = value.match(pattern)
    if (match) return { problem: match[1], fix: match[2] }
  }

  return null
}

/**
 * One-line preview for a collapsed section header. Markdown bold markers and
 * newlines are dropped so the text can sit on a single line.
 */
export const previewOf = (text: string, maxLength = 110): string => {
  const value = text
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (value.length <= maxLength) return value
  const cut = value.slice(0, maxLength)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trimEnd()}...`
}

/** Preview built from the first entry of a section's list. */
export const firstItemPreview = (items: string[], maxLength = 110): string | undefined =>
  items.length > 0 ? previewOf(items[0], maxLength) : undefined

// Only explicit step separators count. Commas are left alone: splitting a
// sentence on them would break the meaning of a single cue.
const CUE_SPLIT = /\s*(?:→|->|·|•|;)\s*/

/**
 * `shortInstruction` is the "key cues" line. Many entries already chain the
 * steps with arrows (`A → B → C`); splitting those lets the hero show the cues
 * side by side instead of one long paragraph.
 *
 * Returns the original text in a single-element array when it is not a chain
 * of 2 to 4 steps.
 */
export const splitCues = (text: string, maxSteps = 5): string[] => {
  const value = text.trim()
  if (!value) return []
  const parts = value
    .split(CUE_SPLIT)
    .map((part) => part.trim())
    .filter(Boolean)
  if (parts.length < 2 || parts.length > maxSteps) return [value]
  return parts
}
