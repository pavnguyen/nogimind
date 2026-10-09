import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BjjBrandMark, BjjGuard } from './index'
import { BJJ_GLYPHS, BJJ_ICON_NAMES, type BjjGlyph } from './paths'

/**
 * Guards the drawing rules documented at the top of `paths.ts`.
 *
 * The 16px raster check is done by hand (the icons are looked at as bitmaps);
 * everything that can be decided from the numbers is asserted here, so a later
 * edit cannot quietly re-introduce an arc, an off-canvas point, a one-pixel
 * nub, or two strokes that neither touch nor separate cleanly.
 */

const JOIN = 2 // centre lines closer than this are one stroke on purpose
const CLEARANCE = 2.5 // ...and further apart than this are clearly two
const MIN_RUN = 2.5 // no straight run shorter than this survives 16px
const MIN_CIRCLE_RADIUS = 2
const SAFE_MIN = 2
const SAFE_MAX = 22
const MAX_ELEMENTS = 4
const SUBDIVISIONS = 24

type Point = { x: number; y: number }

type Element = {
  /** Densified centre line, used for the clearance check. */
  points: Point[]
  /** Lengths of straight runs only — curves are not measured. */
  straightRuns: number[]
}

const TOKEN = /[A-Za-z]|-?\d*\.?\d+/g

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y)

/** Parses the line/cubic subset used by the glyph set. Throws on arcs. */
function parsePath(d: string): Element {
  if (/[Aa]/.test(d)) throw new Error(`elliptical arcs are not part of the glyph language: ${d}`)

  const tokens = d.match(TOKEN) ?? []
  const element: Element = { points: [], straightRuns: [] }
  let cursor: Point = { x: 0, y: 0 }
  let subpathStart: Point = cursor
  let previousControl: Point | null = null
  let command = ''
  let i = 0

  const num = (offset: number) => {
    const value = Number(tokens[i + offset])
    if (!Number.isFinite(value)) throw new Error(`malformed path data: ${d}`)
    return value
  }

  const moveTo = (point: Point) => {
    element.points.push(point)
    cursor = point
  }

  const lineTo = (point: Point) => {
    element.straightRuns.push(distance(cursor, point))
    moveTo(point)
  }

  while (i < tokens.length) {
    const token = tokens[i]
    if (/^[A-Za-z]$/.test(token)) {
      command = token
      i += 1
      if (command === 'Z' || command === 'z') {
        lineTo(subpathStart)
        previousControl = null
      }
      continue
    }
    if (!command) throw new Error(`path data starts without a command: ${d}`)

    const relative = command === command.toLowerCase()
    const origin = relative ? cursor : { x: 0, y: 0 }

    switch (command.toUpperCase()) {
      case 'M': {
        const point = { x: origin.x + num(0), y: origin.y + num(1) }
        i += 2
        moveTo(point)
        subpathStart = point
        previousControl = null
        command = relative ? 'l' : 'L' // implicit lineto after a move
        break
      }
      case 'L': {
        lineTo({ x: origin.x + num(0), y: origin.y + num(1) })
        i += 2
        previousControl = null
        break
      }
      case 'H': {
        lineTo({ x: origin.x + num(0), y: cursor.y })
        i += 1
        previousControl = null
        break
      }
      case 'V': {
        lineTo({ x: cursor.x, y: origin.y + num(0) })
        i += 1
        previousControl = null
        break
      }
      case 'C':
      case 'S': {
        const smooth = command.toUpperCase() === 'S'
        const c1 = smooth
          ? previousControl
            ? { x: 2 * cursor.x - previousControl.x, y: 2 * cursor.y - previousControl.y }
            : { ...cursor }
          : { x: origin.x + num(0), y: origin.y + num(1) }
        const step = smooth ? 0 : 2
        const c2 = { x: origin.x + num(step), y: origin.y + num(step + 1) }
        const end = { x: origin.x + num(step + 2), y: origin.y + num(step + 3) }
        i += step + 4
        // sample the curve so the clearance check sees its real shape
        for (let k = 1; k <= SUBDIVISIONS; k += 1) {
          const t = k / SUBDIVISIONS
          const u = 1 - t
          element.points.push({
            x: u * u * u * cursor.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * end.x,
            y: u * u * u * cursor.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * end.y,
          })
        }
        cursor = end
        previousControl = c2
        break
      }
      default:
        throw new Error(`unsupported path command "${command}" in: ${d}`)
    }
  }

  return element
}

function elementsOf(glyph: BjjGlyph): Element[] {
  const paths = (glyph.paths ?? []).map(parsePath)
  const circles = (glyph.circles ?? []).map(([cx, cy, r]) => ({
    points: Array.from({ length: 64 }, (_, k) => {
      const angle = (2 * Math.PI * k) / 64
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
    }),
    straightRuns: [] as number[],
  }))
  return [...paths, ...circles]
}

const closestApproach = (a: Element, b: Element) =>
  Math.min(...a.points.flatMap((p) => b.points.map((q) => distance(p, q))))

const glyphs = BJJ_ICON_NAMES.map((name) => [name, BJJ_GLYPHS[name]] as const)

describe('BJJ glyph set', () => {
  it('exposes exactly the declared icon names', () => {
    expect(Object.keys(BJJ_GLYPHS).sort()).toEqual([...BJJ_ICON_NAMES].sort())
    expect(BJJ_ICON_NAMES).toHaveLength(13)
  })

  it.each(glyphs)('%s: is a sparse figure inside the safe area', (_name, glyph) => {
    const elements = elementsOf(glyph)
    expect(elements.length).toBeGreaterThanOrEqual(1)
    expect(elements.length).toBeLessThanOrEqual(MAX_ELEMENTS)
    expect(glyph.label.length).toBeGreaterThan(0)

    for (const element of elements) {
      for (const { x, y } of element.points) {
        expect(x).toBeGreaterThanOrEqual(SAFE_MIN)
        expect(x).toBeLessThanOrEqual(SAFE_MAX)
        expect(y).toBeGreaterThanOrEqual(SAFE_MIN)
        expect(y).toBeLessThanOrEqual(SAFE_MAX)
      }
    }
  })

  it.each(glyphs)('%s: has no straight run shorter than one pixel at 16px', (_name, glyph) => {
    const runs = elementsOf(glyph).flatMap((element) => element.straightRuns)
    for (const run of runs) expect(run).toBeGreaterThanOrEqual(MIN_RUN)
  })

  it.each(glyphs)('%s: keeps every stroke either joined or clearly separate', (_name, glyph) => {
    const elements = elementsOf(glyph)
    for (let a = 0; a < elements.length; a += 1) {
      for (let b = a + 1; b < elements.length; b += 1) {
        const gap = closestApproach(elements[a], elements[b])
        // 2.0–2.5 units is the dead zone: too far to fuse, too close to split,
        // and at 16px it renders as a smear rather than two limbs.
        expect(gap <= JOIN || gap >= CLEARANCE).toBe(true)
      }
    }
  })

  it.each(glyphs)('%s: draws heads as circles of r >= 2', (_name, glyph) => {
    for (const [, , r] of glyph.circles ?? []) expect(r).toBeGreaterThanOrEqual(MIN_CIRCLE_RADIUS)
  })

  it.each(glyphs)('%s: keeps the outline weight in range', (_name, glyph) => {
    const weight = glyph.strokeWidth ?? 2
    expect(weight).toBeGreaterThanOrEqual(2)
    expect(weight).toBeLessThanOrEqual(2.8)
  })

  it('never reuses a label', () => {
    const labels = Object.values(BJJ_GLYPHS).map((glyph) => glyph.label)
    expect(new Set(labels).size).toBe(labels.length)
  })

  it('renders the brand mark with its heavier weight and the hub icons at 2', () => {
    const brand = render(<BjjBrandMark className="h-4 w-4" />).container.querySelector('svg')
    expect(brand).toHaveAttribute('stroke-width', '2.4')
    expect(brand?.querySelector('path')).toHaveAttribute('d', BJJ_GLYPHS.brand.paths?.[0])

    const guard = render(<BjjGuard className="h-4 w-4" />).container.querySelector('svg')
    expect(guard).toHaveAttribute('stroke-width', '2')
    expect(guard).toHaveAttribute('viewBox', '0 0 24 24')
  })

  it('ships a sprite that matches the glyph data exactly', () => {
    // vitest runs with the project root as cwd, and import.meta.url is not a
    // file URL once vite has transformed the module
    const sprite = readFileSync(resolve(process.cwd(), 'public/icons/bjj-sprite.svg'), 'utf8')
    const symbols = new Map(
      [...sprite.matchAll(/<symbol id="bjj-([\w-]+)"([\s\S]*?)<\/symbol>/g)].map(
        (match) => [match[1] ?? '', match[2] ?? ''] as const,
      ),
    )

    expect([...symbols.keys()].sort()).toEqual([...BJJ_ICON_NAMES].sort())

    for (const name of BJJ_ICON_NAMES) {
      const glyph = BJJ_GLYPHS[name]
      const block = symbols.get(name) ?? ''
      expect(block).toContain(`stroke-width="${glyph.strokeWidth ?? 2}"`)
      expect(block).toContain(`<title>${glyph.label}</title>`)
      for (const d of glyph.paths ?? []) expect(block).toContain(`d="${d}"`)
      for (const [cx, cy, r] of glyph.circles ?? []) {
        expect(block).toContain(`cx="${cx}" cy="${cy}" r="${r}"`)
      }
    }
  })
})
