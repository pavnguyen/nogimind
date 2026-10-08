/**
 * Contrast + palette guard.
 *
 *   npm run validate:contrast
 *
 * Two independent checks, both failing the command (exit 1) with a table:
 *
 * 1. WCAG — every pair of colours the app actually puts on top of each other
 *    (text on page/card/elevated, accent text on tints, ink on accent fills,
 *    focus rings) is measured in both dark and light mode. Text needs 4.5:1,
 *    UI/ink-on-fill needs 3:1.
 *
 * 2. Palette guard — every `text-<tone>` / `bg-<scale>-<shade>` style class used
 *    in src/ must resolve to a variable that exists in the palette. Tailwind v4
 *    silently drops unknown utilities, so without this a typo or a renamed
 *    token would render as "no colour" with no error anywhere.
 *
 * Values are read straight out of the two CSS files, so the check tracks the
 * real stylesheet rather than a copy of it.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const themeCss = readFileSync(join(root, 'src/styles/hallmark-themes.css'), 'utf8')
const indexCss = readFileSync(join(root, 'src/index.css'), 'utf8')

// ── colour maths ───────────────────────────────────────────────────────────

type Rgb = [number, number, number]

const parseColor = (value: string): Rgb | null => {
  const v = value.trim()
  const hex = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (hex) {
    const h = hex[1]
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as Rgb
  }
  const rgba = v.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\)$/i)
  if (rgba) {
    const [, r, g, b, a] = rgba
    const alpha = a === undefined ? 1 : Number(a)
    if (alpha === 1) return [Number(r), Number(g), Number(b)]
    return [Number(r), Number(g), Number(b)] // alpha handled by `blend`
  }
  return null
}

const alphaOf = (value: string): number => {
  const m = value.match(/rgba\(\s*[\d.]+[,\s]+[\d.]+[,\s]+[\d.]+[,\s/]+([\d.]+)\)/i)
  return m ? Number(m[1]) : 1
}

const channel = (c: number) => {
  const s = c / 255
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}
const luminance = ([r, g, b]: Rgb) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
const contrast = (a: Rgb, b: Rgb) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
const blend = (fg: Rgb, bg: Rgb, alpha: number): Rgb =>
  [0, 1, 2].map((i) => fg[i] * alpha + bg[i] * (1 - alpha)) as Rgb

// ── CSS variable extraction ────────────────────────────────────────────────

type VarMap = Record<string, string>

/**
 * Pulls `--name: value;` declarations out of blocks whose selector matches.
 * Brace-balanced, because `@theme` in index.css nests `@keyframes` blocks.
 */
const readVars = (css: string, selectors: string[]): VarMap => {
  const out: VarMap = {}
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`(?:^|[}\\n])\\s*(${selectors.map(esc).join('|')})\\s*\\{`, 'g')
  let m: RegExpExecArray | null
  while ((m = re.exec(css))) {
    const open = css.indexOf('{', m.index)
    let depth = 0
    let i = open
    while (i < css.length) {
      if (css[i] === '{') depth++
      else if (css[i] === '}') {
        depth--
        if (depth === 0) break
      }
      i++
    }
    const body = css.slice(open + 1, i)
    // `[^;{}]` keeps declarations inside nested blocks (e.g. @keyframes) out.
    for (const decl of body.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)) out[decl[1]] = decl[2].trim()
    re.lastIndex = i
  }
  return out
}

/**
 * `readVars` is deliberately not nesting-aware, so the light-mode blocks are
 * cut out of the stylesheet first — otherwise their `:root` declarations would
 * silently overwrite the dark ones and both modes would report identical
 * numbers (the exact bug this split prevents).
 */
const splitLightMedia = (css: string): { dark: string; light: string[] } => {
  const bodies: string[] = []
  const start = /@media\s*\(prefers-color-scheme:\s*light\)\s*\{/g
  const ranges: Array<[number, number]> = []
  let m: RegExpExecArray | null
  while ((m = start.exec(css))) {
    let depth = 1
    const from = m.index + m[0].length
    let i = from
    while (i < css.length && depth > 0) {
      if (css[i] === '{') depth++
      else if (css[i] === '}') depth--
      i++
    }
    bodies.push(css.slice(from, i - 1))
    ranges.push([m.index, i])
  }
  let darkOnly = css
  for (const [from, to] of ranges.reverse()) darkOnly = darkOnly.slice(0, from) + darkOnly.slice(to)
  return { dark: darkOnly, light: bodies }
}

const themeSplit = splitLightMedia(themeCss)
const indexSplit = splitLightMedia(indexCss)

const dark: VarMap = {
  ...readVars(indexSplit.dark, ['@theme']),
  ...readVars(themeSplit.dark, [':root']),
}
const light: VarMap = { ...dark }
for (const body of [...indexSplit.light, ...themeSplit.light]) Object.assign(light, readVars(body, [':root']))

const hubVar = (css: string, hub: string, name: string): string | undefined => {
  const re = new RegExp(`\\[data-hub="${hub}"\\]\\s*\\{([^}]*)\\}`, 'g')
  let m: RegExpExecArray | null
  while ((m = re.exec(css))) {
    const found = new RegExp(`${name}\\s*:\\s*([^;]+);`).exec(m[1])
    if (found) return found[1].trim()
  }
  return undefined
}

// ── checks ────────────────────────────────────────────────────────────────

const fails: string[] = []
const warn: string[] = []

const resolveVar = (vars: VarMap, name: string): string | undefined => {
  let value = vars[name]
  for (let hop = 0; hop < 5 && value && value.startsWith('var('); hop++) {
    const inner = /var\((--[\w-]+)/.exec(value)?.[1]
    value = inner ? vars[inner] : undefined
  }
  return value
}

type CheckOptions = {
  min?: number
  /** Alpha of the background colour, e.g. a `/10` or `/50` tint. */
  bgAlpha?: number
  /** What a semi-transparent background is composited over. */
  backdropVar?: string
}

const check = (
  mode: 'dark' | 'light',
  label: string,
  fgVar: string,
  bgVar: string,
  { min = 4.5, bgAlpha = 1, backdropVar = '--hallmark-bg-primary' }: CheckOptions = {},
) => {
  const vars = mode === 'dark' ? dark : light
  const fgRaw = resolveVar(vars, fgVar)
  const bgRaw = resolveVar(vars, bgVar)
  const backdropRaw = resolveVar(vars, backdropVar)
  if (!fgRaw || !bgRaw || !backdropRaw) {
    fails.push(`${mode} · ${label} · missing token (${!fgRaw ? fgVar : !bgRaw ? bgVar : backdropVar})`)
    return
  }
  const fg = parseColor(fgRaw)
  const bg = parseColor(bgRaw)
  const backdrop = parseColor(backdropRaw)
  if (!fg || !bg || !backdrop) {
    fails.push(`${mode} · ${label} · unparsable colour (${fgRaw} / ${bgRaw})`)
    return
  }
  const bgOn = bgAlpha < 1 ? blend(bg, backdrop, bgAlpha) : bg
  const fgOn = alphaOf(fgRaw) < 1 ? blend(fg, bgOn, alphaOf(fgRaw)) : fg
  const ratio = contrast(fgOn, bgOn)
  const ok = ratio >= min - 0.005
  if (!ok) fails.push(`${mode} · ${label} · ${ratio.toFixed(2)}:1 (needs ${min}:1) · ${fgRaw} on ${bgRaw}`)
  return ratio
}

const TONES = ['gold', 'copper', 'moss', 'jade', 'sea', 'steel', 'sand'] as const
const TEXT_SHADES = [300, 400, 500, 600] as const

for (const mode of ['dark', 'light'] as const) {
  const surfaces = ['--hallmark-bg-primary', '--hallmark-bg-surface', '--hallmark-bg-card']
  // body copy
  for (const t of ['--hallmark-text-primary', '--hallmark-text-secondary', '--hallmark-text-tertiary']) {
    for (const s of surfaces) check(mode, `${t} on ${s}`, t, s)
  }
  // the Tailwind neutral ramp actually used for text
  for (const shade of TEXT_SHADES) {
    for (const s of surfaces) check(mode, `warm-${shade} on ${s.replace('--hallmark-bg-', '')}`, `--color-warm-${shade}`, s)
  }
  // semantic accent text on every surface
  for (const tone of TONES) {
    for (const s of surfaces) check(mode, `text-${tone} on ${s.replace('--hallmark-bg-', '')}`, `--color-${tone}`, s)
    // accent text on its own tinted chip / badge background
    check(mode, `text-${tone} on ${tone}-400/10 badge`, `--color-${tone}`, `--color-${tone}-400`, {
      bgAlpha: 0.1,
      backdropVar: '--hallmark-bg-card',
    })
    check(mode, `text-${tone} on ${tone}-900/50 chip`, `--color-${tone}`, `--color-${tone}-900`, {
      bgAlpha: 0.5,
      backdropVar: '--hallmark-bg-primary',
    })
    // ink / on-accent on solid tone fills
    check(mode, `on-accent on ${tone}-400 fill`, '--color-on-accent', `--color-${tone}-400`)
    check(mode, `on-accent on ${tone}-500 fill`, '--color-on-accent', `--color-${tone}-500`)
  }
  // per-hub accent (the value the [data-hub] block sets) used as text
  const hubCss = mode === 'dark' ? themeSplit.dark : themeSplit.light.join('\n')
  const pageRaw = mode === 'dark' ? dark['--hallmark-bg-primary'] : light['--hallmark-bg-primary']
  const cardRaw = mode === 'dark' ? dark['--hallmark-bg-card'] : light['--hallmark-bg-card']
  for (const hub of ['learn', 'study', 'defense', 'build', 'reference']) {
    for (const [name, bgRaw] of [
      ['--hallmark-text-accent', pageRaw],
      ['--hallmark-accent', pageRaw],
      ['--hallmark-text-accent', cardRaw],
      ['--hallmark-focus-ring', pageRaw],
    ] as const) {
      if (name === '--hallmark-focus-ring') {
        // Focus rings may be semi-transparent; composite before measuring,
        // and they are a UI affordance, so 3:1 (not 4.5:1) applies.
        const raw = hubVar(hubCss, hub, name)
        const base = parseColor(bgRaw ?? '')
        const tint = raw ? parseColor(raw) : null
        if (!raw || !tint || !base) {
          fails.push(`${mode} · hub ${hub} · missing ${name}`)
          continue
        }
        const ratio = contrast(blend(tint, base, alphaOf(raw)), base)
        if (ratio < 3) fails.push(`${mode} · hub ${hub} focus ring · ${ratio.toFixed(2)}:1 (needs 3:1)`)
        continue
      }
      const accent = hubVar(hubCss, hub, name)
      const bg = parseColor(bgRaw ?? '')
      const fg = accent ? parseColor(accent) : null
      if (!fg || !bg) {
        fails.push(`${mode} · hub ${hub} · missing ${name} / surface`)
        continue
      }
      const ratio = contrast(fg, bg)
      if (ratio < 4.5) {
        fails.push(`${mode} · hub ${hub} ${name} on surface · ${ratio.toFixed(2)}:1 · ${accent} on ${bgRaw}`)
      }
    }
  }
  // focus ring must be visible against the page
  const ring = mode === 'dark' ? dark['--hallmark-focus-ring'] : light['--hallmark-focus-ring']
  if (ring) {
    const page = parseColor(resolveVar(mode === 'dark' ? dark : light, '--hallmark-bg-primary')!)!
    const ratio = contrast(blend(parseColor(ring)!, page, alphaOf(ring)), page)
    if (ratio < 3) fails.push(`${mode} · focus ring on page · ${ratio.toFixed(2)}:1 (needs 3:1)`)
  } else {
    fails.push(`${mode} · --hallmark-focus-ring · missing`)
  }
}

// ── palette guard: classes used in src/ must resolve to real tokens ────────

const defined = new Set(Object.keys(dark))
const walk = (dir: string, out: string[] = []) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      // Only the translation *data* is skipped — `src/components/i18n` holds real
      // components, and skipping every directory named `i18n` is exactly how the
      // language switcher kept two legacy classes through the first sweep.
      const isTranslationData = entry === 'resources' && dir.endsWith('i18n')
      if (!isTranslationData && entry !== 'node_modules') walk(full, out)
    } else if (/\.(ts|tsx)$/.test(entry)) out.push(full)
  }
  return out
}

const PROP = 'text|bg|border|from|to|via|ring|ring-offset|outline|divide|fill|stroke|placeholder|caret|accent|indicator|decoration'
const SCALE = /(?<![\w-])(?:text|bg|border|from|to|via|ring|ring-offset|outline|divide|fill|stroke|placeholder|caret|accent|indicator|decoration)-(warm|gold|copper|moss|jade|sea|steel|sand)-(\d{2,3})(?![\w-])/g
const SEMANTIC = /(?<![\w-])(?:text|border|fill|stroke|bg|ring|outline)-(gold|copper|moss|jade|sea|steel|sand|on-accent)(?![\w-])/g

const usedScales = new Set<string>()
const usedSemantic = new Set<string>()
for (const file of walk(join(root, 'src'))) {
  const src = readFileSync(file, 'utf8')
  for (const m of src.matchAll(SCALE)) usedScales.add(`--color-${m[1]}-${m[2]}`)
  for (const m of src.matchAll(SEMANTIC)) usedSemantic.add(`--color-${m[1]}`)
  void PROP
}

for (const token of usedScales) {
  if (!defined.has(token)) fails.push(`palette · class uses undefined token ${token}`)
}
for (const token of usedSemantic) {
  if (!defined.has(token)) fails.push(`palette · class uses undefined token ${token}`)
}

// ── legacy palette guard: the old hues must not come back ─────────────────

const LEGACY_HUE =
  /(^|[^a-z-])(?:text|bg|border|border-[tblrxyse]|from|to|via|ring|ring-offset|outline|divide|fill|stroke|shadow|decoration|placeholder|caret|accent)-(slate|cyan|amber|emerald|teal|sky|violet|indigo|blue|purple|pink|red|orange|green)-\d{2,3}/
const LEGACY_HEX = /#(?:a78bfa|22d3ee|34d399|fb923c|06080d|0b1018|101722|182234|94a3b8|64748b)/i
let legacyHits = 0
for (const file of walk(join(root, 'src'))) {
  const src = readFileSync(file, 'utf8')
  if (LEGACY_HUE.test(src) || LEGACY_HEX.test(src)) {
    legacyHits++
    fails.push(`legacy palette · ${relative(root, file)} still uses an old hue/hex`)
  }
}

// ── report ────────────────────────────────────────────────────────────────

console.log('contrast + palette guard')
console.log(`  files scanned for legacy hues: ${legacyHits === 0 ? 'clean' : 'see failures'}`)
console.log(`  modes checked: dark, light`)
console.log(`  palette tokens defined: ${defined.size}`)
console.log(`  scale tokens referenced in src/: ${usedScales.size}`)
console.log(`  semantic accent tokens referenced: ${usedSemantic.size}`)

if (warn.length) {
  console.log('\nwarnings:')
  for (const w of warn) console.log(`  ⚠ ${w}`)
}

if (fails.length) {
  console.error(`\n✗ ${fails.length} problem(s):`)
  for (const f of fails) console.error(`  ✗ ${f}`)
  process.exit(1)
}
console.log('\n✓ all pairs pass WCAG AA and every referenced token exists')
void relative
