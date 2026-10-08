/**
 * Generates `public/icons/bjj-sprite.svg` from the shared glyph data in
 * `src/components/icons/bjj/paths.ts`.
 *
 * The React components and the sprite therefore can never drift apart — the
 * sprite is always derived, never hand-edited. Run with `npm run gen:bjj-sprite`.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BJJ_GLYPHS, BJJ_ICON_NAMES } from '../src/components/icons/bjj/paths'

const here = dirname(fileURLToPath(import.meta.url))
const out = resolve(here, '../public/icons/bjj-sprite.svg')

const symbols = BJJ_ICON_NAMES.map((name) => {
  const glyph = BJJ_GLYPHS[name]
  const circles = (glyph.circles ?? [])
    .map(([cx, cy, r]) => `    <circle cx="${cx}" cy="${cy}" r="${r}" />`)
    .join('\n')
  const paths = (glyph.paths ?? []).map((d) => `    <path d="${d}" />`).join('\n')
  return [
    `  <symbol id="bjj-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor"`,
    `          stroke-width="${glyph.strokeWidth ?? 2}" stroke-linecap="round" stroke-linejoin="round">`,
    `    <title>${glyph.label}</title>`,
    circles,
    paths,
    '  </symbol>',
  ]
    .filter(Boolean)
    .join('\n')
})

const svg = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
${symbols}
</svg>
`

mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, svg)
console.log(`✓ wrote ${out} (${BJJ_ICON_NAMES.length} symbols)`)
