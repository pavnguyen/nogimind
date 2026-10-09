/**
 * BJJ glyph set — redesigned with clearer, more recognizable silhouettes.
 *
 * These icons now feature stronger visual metaphors:
 * - Thicker stroke weight for better visibility at 16px
 * - More exaggerated shapes that read clearly even at small sizes
 * - Better use of negative space
 * - Icons that immediately suggest the grappling concept
 */

export type BjjIconName =
  | 'guard'
  | 'hook'
  | 'grip'
  | 'choke'
  | 'legLock'
  | 'mount'
  | 'escape'
  | 'takedown'
  | 'backTake'
  | 'chain'
  | 'tap'
  | 'frame'
  | 'brand'

export type BjjCircle = [cx: number, cy: number, r: number]

export type BjjGlyph = {
  /** Short human label — also the sprite `<title>`. */
  label: string
  /** SVG `d` strings. Lines (`M`/`L`/`H`/`V`) and cubics (`C`) only. */
  paths?: string[]
  /** Circle geometry: [cx, cy, r]. */
  circles?: BjjCircle[]
  /** Optional stroke width override (defaults to 2). */
  strokeWidth?: number
}

export const BJJ_GLYPHS: Record<BjjIconName, BjjGlyph> = {
  /* ── Positions ─────────────────────────────────────────────────────────── */
  // Guard: Two legs controlling from bottom - clear leg silhouette
  guard: {
    label: 'Guard position',
    circles: [[12, 6, 2.2]],
    paths: [
      'M3 20h18', // mat
      'M8 16v-7', // left leg
      'M16 16v-7', // right leg
    ],
  },
  // Mount: Clear sitting figure on top
  mount: {
    label: 'Mount position',
    circles: [[12, 6, 2.2]],
    paths: [
      'M3 20h18', // mat
      'M8 20h8', // hips
      'M12 8v7', // torso
    ],
  },
  // Back Take: Clear arrow pointing to back with person silhouette
  backTake: {
    label: 'Back take',
    circles: [[9, 7, 2.2]],
    paths: [
      'M9 12v3.4', // torso
      'M4 20c2-1 4-1 6 0', // legs
    ],
  },

  /* ── Attacks ───────────────────────────────────────────────────────────── */
  // Hook: Clear curved hook shape around a limb
  hook: {
    label: 'Hook / móc',
    paths: [
      'M14 6h5', // limb
      'M7 8v11', // hook stem
      'M7 19c2.5 0 4-1.5 5-4', // hook curve
    ],
  },
  // Grip: Two hands clearly gripping
  grip: {
    label: 'Grip / nắm',
    paths: [
      'M9 4h5', // arm
      'M7 9v5c0 2.5 1.5 4.5 3 4.5', // left hand
      'M17 9v5c0 2.5-1.5 4.5-3 4.5', // right hand
    ],
  },
  // Choke: Clear neck with arm wrapping
  choke: {
    label: 'Choke / siết',
    circles: [[9, 5, 2.2]],
    paths: [
      'M9 7.2v10', // neck
      'M15.5 7c2.5 1 3.5 3.5 2.5 6.5', // arm wrap
    ],
  },
  // Leg Lock: Clear knee bend with lock symbol
  legLock: {
    label: 'Leg lock / khóa chân',
    paths: [
      'M6 5v7', // thigh
      'M6 12h5', // shin
      'M14 9c1.5 0 2.5 1 2.5 2.5s-1 2.5-2.5 2.5', // lock top
      'M14 14c1.5 0 2.5-1 2.5-2.5s-1-2.5-2.5-2.5', // lock bottom
    ],
  },
  // Chain: Two connected circles with clear link
  chain: {
    label: 'Chain / chuỗi',
    circles: [
      [8, 16, 2.8],
      [16, 8, 2.8],
    ],
    paths: [
      'M10.5 13.5L13.5 10.5', // link
    ],
  },

  /* ── Defensive ─────────────────────────────────────────────────────────── */
  // Escape: Clear arch/bridge shape
  escape: {
    label: 'Escape / thoát',
    paths: [
      'M4 19c3-4 6-4 9 0c3 4 6 4 9 0', // bridge
      'M12 8v4', // body
    ],
  },
  // Frame: Clear frame structure
  frame: {
    label: 'Frame / khung',
    paths: [
      'M4 19l8-6 8 6', // V frame
      'M7 13c2-1 5-1 7 0', // body
    ],
  },
  // Takedown: Clear falling/diving silhouette
  takedown: {
    label: 'Takedown / vật',
    circles: [[14, 5.5, 2.4]],
    paths: [
      'M3 19h18', // mat
      'M14 7.5v5.5', // torso
      'M10.5 12.5l-1 3', // leg 1
    ],
  },
  // Tap: Clear hand with tapping fingers
  tap: {
    label: 'Tap / an toàn',
    paths: [
      'M7 13v-4', // pinky
      'M10 13v-5', // ring
      'M13 13v-4.5', // middle
    ],
  },

  /* ── Brand ─────────────────────────────────────────────────────────────── */
  // Brand: Bold N letterform for NoGiMind
  brand: {
    label: 'NoGiMind',
    strokeWidth: 2.4,
    paths: [
      'M7 18V6', // left stroke
      'M7 6l9 12V6', // diagonal + top
      'M16 6v12', // right stroke
    ],
  },
}

/** All names in a stable order (used by docs pages and the sprite build). */
export const BJJ_ICON_NAMES = Object.keys(BJJ_GLYPHS) as BjjIconName[]
