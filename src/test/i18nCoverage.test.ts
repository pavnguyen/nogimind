import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'
import { en } from '../i18n/resources/en'
import { vi } from '../i18n/resources/vi'
import { fr } from '../i18n/resources/fr'

const SRC_DIR = join(__dirname, '..')

// ── Resolve a dot-separated key against an object ─────────────────────────
function resolveKey(obj: Record<string, unknown>, key: string): unknown {
  const parts = key.split('.')
  let current: unknown = obj
  for (const part of parts) {
    if (current === null || current === undefined) return undefined
    if (typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[part]
  }
  return current
}

// ── Collect ALL .tsx files (excluding test/ spec files) ───────────────────
function collectTsxFiles(dir: string): string[] {
  const results: string[] = []
  try {
    const entries = readdirSync(dir)
    for (const entry of entries) {
      if (entry === 'node_modules' || entry === '__pycache__') continue
      if (entry.startsWith('.')) continue
      const full = join(dir, entry)
      try {
        if (statSync(full).isDirectory()) {
          results.push(...collectTsxFiles(full))
        } else if (entry.endsWith('.tsx') && !entry.endsWith('.test.tsx') && !entry.endsWith('.spec.tsx')) {
          results.push(full)
        }
      } catch {
        // skip unreadable
      }
    }
  } catch {
    // skip unreadable dirs
  }
  return results
}

// ── Extract static t('key') calls from file content ───────────────────────
function extractTCallKeys(content: string): string[] {
  const keys = new Set<string>()
  // Match t('some.key') or t("some.key") — but NOT t(`template${...}`)
  const regex = /\bt\(['"]([a-zA-Z][a-zA-Z0-9_.-]+)['"]/g
  let match: RegExpExecArray | null
  while ((match = regex.exec(content)) !== null) {
    const key = match[1]
    // Skip keys ending with a dot — these are string concatenation patterns
    // e.g. t('days.' + dayKeys[...]) → regex captures 'days.'
    if (key.endsWith('.')) continue
    // Skip dynamic keys that reference variables (contain template syntax)
    if (key.includes('${') || key.includes('$')) continue
    keys.add(key)
  }
  return [...keys]
}

// ── Known dynamic key patterns that are validated elsewhere ───────────────
const KNOWN_DYNAMIC_PREFIXES = [
  'modern.library.',   // t(`modern.library.${libraryTier}`) → core, modern_expansion, etc.
  'modern.family.',
  'modern.system.',
  'modern.risk.',
  'video.level.',      // t(`video.level.${level}`) → beginner, intermediate, advanced, blackbelt
  'intensity.',
  'trainingTypes.',
  'bodyToBody.sides.',
  'bodyToBody.bodyParts.',
  'bodyToBody.roles.',
  'domains.',
  'levels.',
  'mechanics.roles.',
  'mechanics.directions.',
  'mechanics.mechanicTypes.',
  'mechanics.filters.',
]

// ── Test suite ────────────────────────────────────────────────────────────
describe('i18n key coverage', () => {
  const allFiles = collectTsxFiles(SRC_DIR)

  // Collect all static t() keys
  const allStaticKeys = new Set<string>()
  const keyLocations = new Map<string, string[]>()

  for (const file of allFiles) {
    const content = readFileSync(file, 'utf8')
    const keys = extractTCallKeys(content)
    for (const key of keys) {
      allStaticKeys.add(key)
      if (!keyLocations.has(key)) keyLocations.set(key, [])
      keyLocations.get(key)!.push(file.replace(SRC_DIR, 'src'))
    }
  }

  const sortedKeys = [...allStaticKeys].sort()

  // ── Test every static key exists in all 3 languages ──────────────────────
  describe('all static t() keys exist in every language', () => {
    for (const key of sortedKeys) {
      it(`key "${key}" exists in en, vi, fr`, () => {
        const inEn = resolveKey(en as unknown as Record<string, unknown>, key)
        const inVi = resolveKey(vi as unknown as Record<string, unknown>, key)
        const inFr = resolveKey(fr as unknown as Record<string, unknown>, key)

        expect(inEn, `"${key}" missing in en.ts (used at: ${(keyLocations.get(key) ?? []).join(', ')})`).toBeDefined()
        expect(inVi, `"${key}" missing in vi.ts (used at: ${(keyLocations.get(key) ?? []).join(', ')})`).toBeDefined()
        expect(inFr, `"${key}" missing in fr.ts (used at: ${(keyLocations.get(key) ?? []).join(', ')})`).toBeDefined()
      })
    }

    it('has at least some t() keys to test (test integrity check)', () => {
      expect(sortedKeys.length).toBeGreaterThan(50)
    })
  })

  // ── Known dynamic prefix keys resolved at runtime ──────────────────────
  describe('known dynamic key prefixes have valid values in all languages', () => {
    for (const prefix of KNOWN_DYNAMIC_PREFIXES) {
      it(`dynamic prefix "${prefix}" has at least 1 child key in each language`, () => {
        const enChildren = getChildKeys(en as unknown as Record<string, unknown>, prefix)
        const viChildren = getChildKeys(vi as unknown as Record<string, unknown>, prefix)
        const frChildren = getChildKeys(fr as unknown as Record<string, unknown>, prefix)

        const langs = [
          { name: 'en', keys: enChildren },
          { name: 'vi', keys: viChildren },
          { name: 'fr', keys: frChildren },
        ]

        for (const lang of langs) {
          expect(
            lang.keys.length,
            `"${prefix}" has no child keys in ${lang.name}`
          ).toBeGreaterThan(0)
        }

        // Check that all 3 languages have same child keys
        expect(enChildren.sort()).toEqual(viChildren.sort())
        expect(enChildren.sort()).toEqual(frChildren.sort())
      })
    }
  })
})

// ── Helpers ──────────────────────────────────────────────────────────────
function getChildKeys(obj: Record<string, unknown>, prefix: string): string[] {
  const parts = prefix.split('.').filter(Boolean)
  let current: unknown = obj
  for (const part of parts) {
    if (!current || typeof current !== 'object') return []
    current = (current as Record<string, unknown>)[part]
  }
  if (!current || typeof current !== 'object') return []
  return Object.keys(current as Record<string, unknown>)
}
