import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'
import { en } from '../i18n/resources/en'
import { vi } from '../i18n/resources/vi'
import { fr } from '../i18n/resources/fr'
import {
  libraryTiers,
  metaStatuses,
  modernSystemGroups,
  riskLevels,
  techniqueFamilies,
} from '../data/modernFilters'

/**
 * Every modern filter value must have a human-readable label in all three
 * languages, otherwise the skill filters render raw machine codes such as
 * `family:leg_lock` instead of `Leg Lock`.
 */

const locales = { en, vi, fr } as const
type Lang = keyof typeof locales
type Group = 'library' | 'family' | 'system' | 'risk' | 'meta'

const labelFor = (lang: Lang, group: Group, value: string): string | undefined => {
  const modern = locales[lang].modern as unknown as Record<string, Record<string, string | undefined>>
  return modern[group]?.[value]
}

const VOCABULARIES: Array<[Group, string[]]> = [
  ['library', libraryTiers],
  ['family', techniqueFamilies],
  ['system', modernSystemGroups],
  ['risk', riskLevels],
  ['meta', metaStatuses],
]

describe('modern filter labels', () => {
  for (const [group, values] of VOCABULARIES) {
    for (const value of values) {
      for (const lang of Object.keys(locales) as Lang[]) {
        it(`${group}.${value} has a label in ${lang}`, () => {
          expect(labelFor(lang, group, value), `modern.${group}.${value} missing in ${lang}.ts`).toBeTruthy()
        })
      }
    }
  }
})

// ── Content tags must resolve to labels too ───────────────────────────────

const CONTENT_SKILLS_DIR = join(__dirname, '../../content/skills')

/** Same value mapping as `skillsRepository`, where the fields are derived. */
const TAG_GROUP_TO_LABEL_GROUP: Record<string, Group> = {
  family: 'family',
  group: 'system',
  tier: 'library',
  risk: 'risk',
  meta: 'meta',
}

const toLabelValue = (prefix: string, rawValue: string): string =>
  prefix === 'family' ? rawValue.toLowerCase() : rawValue.toLowerCase().replace(/-/g, '_')

/** Distinct `group:value` pairs used across every skill in content/. */
const collectContentTagValues = (): Map<Group, Set<string>> => {
  const found = new Map<Group, Set<string>>()
  if (!existsSync(CONTENT_SKILLS_DIR)) return found
  for (const domain of readdirSync(CONTENT_SKILLS_DIR)) {
    const domainDir = join(CONTENT_SKILLS_DIR, domain)
    if (!existsSync(domainDir) || !readdirSync(domainDir, { withFileTypes: true }).every((entry) => entry.isDirectory())) {
      continue
    }
    for (const skill of readdirSync(domainDir)) {
      const skillJson = join(domainDir, skill, 'skill.json')
      if (!existsSync(skillJson)) continue
      const parsed = JSON.parse(readFileSync(skillJson, 'utf8')) as { tags?: string[] }
      for (const tag of parsed.tags ?? []) {
        const separator = tag.indexOf(':')
        if (separator < 0) continue
        const prefix = tag.slice(0, separator)
        const group = TAG_GROUP_TO_LABEL_GROUP[prefix]
        if (!group) continue
        const values = found.get(group) ?? new Set<string>()
        values.add(toLabelValue(prefix, tag.slice(separator + 1)))
        found.set(group, values)
      }
    }
  }
  return found
}

describe('content filter tags have labels', () => {
  const contentValues = collectContentTagValues()

  it('reads prefixed tags from content', () => {
    expect([...contentValues.values()].reduce((total, values) => total + values.size, 0)).toBeGreaterThan(30)
  })

  for (const [group, values] of contentValues) {
    for (const value of values) {
      for (const lang of Object.keys(locales) as Lang[]) {
        it(`content ${group}.${value} resolves to a label in ${lang}`, () => {
          expect(labelFor(lang, group, value), `modern.${group}.${value} missing in ${lang}.ts`).toBeTruthy()
        })
      }
    }
  }
})
