/**
 * validate-relations.ts - Validate the cross-reference graph in content/
 *
 * Reads `content/` plus `src/data/archetypes.ts` only, no build step required.
 * Checks that every skill id referenced by another skill, by a position or by
 * an archetype resolves; that every position, concept and archetype referenced
 * by a skill or archetype resolves; that ids are canonical (lowercase
 * kebab-case, equal to their folder name); that the prerequisite graph is
 * acyclic; and that no `nextSkillIds` edge is asymmetric with the mirrored
 * `prerequisiteSkillIds` edge. Path checks stay informational until
 * `content/shared/path.json` exists (see the skills-study-hub spec, 6.8.3).
 *
 * Severities: errors fail the command and therefore CI. Warnings and
 * informational lines never fail.
 *
 * Usage:  npx tsx scripts/content/validate-relations.ts
 */

import { readFileSync, existsSync, readdirSync } from 'fs'
import { join, dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const CONTENT_ROOT = resolve(__dirname, '../../content')
const ARCHETYPES_FILE = resolve(__dirname, '../../src/data/archetypes.ts')

const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/

type Severity = 'error' | 'warning' | 'info'

/** Reference targets a skill or an archetype can point at. */
type Category = 'skill' | 'position' | 'concept' | 'archetype' | 'safetyNote'

interface Issue {
  severity: Severity
  source: string
  field: string
  message: string
}

interface SkillEntry {
  id: string
  folder: string
  path: string
  data: Record<string, unknown>
}

interface RefCount {
  checked: number
  dangling: number
}

const emptyCounts = (): Record<Category, RefCount> => ({
  skill: { checked: 0, dangling: 0 },
  position: { checked: 0, dangling: 0 },
  concept: { checked: 0, dangling: 0 },
  archetype: { checked: 0, dangling: 0 },
  safetyNote: { checked: 0, dangling: 0 },
})

// ── Loading ─────────────────────────────────────────────────────────────────

function listDirs(path: string): string[] {
  if (!existsSync(path)) return []
  return readdirSync(path, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort()
}

function readJsonFile(path: string): Record<string, unknown> | null {
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as Record<string, unknown>
  } catch {
    return null
  }
}

function readJsonArray(path: string): unknown[] {
  try {
    const parsed = JSON.parse(readFileSync(path, 'utf-8'))
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function loadSkills(): SkillEntry[] {
  const skillsRoot = join(CONTENT_ROOT, 'skills')
  const entries: SkillEntry[] = []
  for (const domainFolder of listDirs(skillsRoot)) {
    for (const skillFolder of listDirs(join(skillsRoot, domainFolder))) {
      const path = join(skillsRoot, domainFolder, skillFolder, 'skill.json')
      if (!existsSync(path)) continue
      const data = readJsonFile(path)
      if (!data) {
        entries.push({ id: skillFolder, folder: skillFolder, path, data: {} })
        continue
      }
      const id = typeof data.id === 'string' ? data.id : skillFolder
      entries.push({ id, folder: skillFolder, path, data })
    }
  }
  return entries
}

function positionFiles(): { id: string; folder: string; data: Record<string, unknown> }[] {
  const positionsRoot = join(CONTENT_ROOT, 'positions')
  const entries: { id: string; folder: string; data: Record<string, unknown> }[] = []
  for (const folder of listDirs(positionsRoot)) {
    const path = join(positionsRoot, folder, 'position.json')
    if (!existsSync(path)) continue
    const data = readJsonFile(path)
    if (!data) continue
    entries.push({ id: typeof data.id === 'string' ? data.id : folder, folder, data })
  }
  return entries
}

function loadConceptIds(): Set<string> {
  const ids = new Set<string>()
  for (const entry of readJsonArray(join(CONTENT_ROOT, 'shared', 'concepts.json'))) {
    if (entry && typeof entry === 'object' && typeof (entry as { id?: unknown }).id === 'string') {
      ids.add((entry as { id: string }).id)
    }
  }
  return ids
}

interface SourceRef {
  source: string
  field: string
  id: string
  target: Category
}

/** A relation value that is built at runtime, so it cannot be checked statically. */
interface DynamicRef {
  source: string
  field: string
  expression: string
}

/** Every labelled relation field used by the `src/data` reference data. */
const SOURCE_DATA_FIELDS: { target: Category; fields: string[] }[] = [
  {
    target: 'skill',
    fields: [
      'relatedSkillIds',
      'bestForSkillIds',
      'coreSkillIds',
      'supportSkillIds',
      'requiredDefensiveSkillIds',
      'skillId',
      'nextSkillId',
      'toSkillId',
      'toSubmissionId',
    ],
  },
  { target: 'concept', fields: ['relatedConceptIds', 'bestForConceptIds', 'coreConceptIds'] },
  { target: 'position', fields: ['relatedPositionIds', 'fromPositionId', 'nextPositionId'] },
  { target: 'safetyNote', fields: ['toSafetyNoteId'] },
]

/**
 * Helpers whose relation ids are positional rather than labelled, so they need
 * the call signature to be read: `item(id, category, title, short, tags,
 * relatedConceptIds, relatedSkillIds)` and `term(id, label, vi, en, fr,
 * examples, relatedSkillIds)` in src/data.
 */
const SOURCE_DATA_CALLS: { helper: string; args: { index: number; target: Category }[] }[] = [
  { helper: 'item', args: [{ index: 5, target: 'concept' }, { index: 6, target: 'skill' }] },
  { helper: 'term', args: [{ index: 6, target: 'skill' }] },
]

function srcDataRoot(): string {
  return resolve(__dirname, '../../src/data')
}

function listFiles(dir: string, ext: string): string[] {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith(ext))
    .map(entry => entry.name)
    .sort()
}

/** Blank out comments while keeping every byte offset, so line numbers stay true. */
function stripCommentsPreservingLines(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ' '))
    .replace(/\/\/[^\n]*/g, m => ' '.repeat(m.length))
}

function extractQuoted(value: string): string[] {
  return [...value.matchAll(/'([^']*)'|"([^"]*)"/g)].map(m => m[1] ?? m[2]).filter(Boolean)
}

/**
 * Raw text of the value that starts at `start`: an array or object literal, a
 * quoted or template string, or an identifier path. Bracket scanning respects
 * quotes so a comma inside a string does not cut the value short.
 */
function readValueExpression(source: string, start: number): string {
  let i = start
  while (i < source.length && /\s/.test(source[i])) i += 1
  const first = source[i]
  if (first === '[' || first === '{') {
    const opening = first
    const closing = opening === '[' ? ']' : '}'
    let depth = 0
    let quote: string | null = null
    while (i < source.length) {
      const ch = source[i]
      if (quote) {
        if (ch === quote && source[i - 1] !== '\\') quote = null
      } else if (ch === "'" || ch === '"' || ch === '`') {
        quote = ch
      } else if (ch === opening) {
        depth += 1
      } else if (ch === closing) {
        depth -= 1
        if (depth === 0) return source.slice(start, i + 1).trim()
      }
      i += 1
    }
    return source.slice(start, i).trim()
  }
  if (first === "'" || first === '"' || first === '`') {
    const quote = first
    i += 1
    while (i < source.length && !(source[i] === quote && source[i - 1] !== '\\')) i += 1
    return source.slice(start, i + 1).trim()
  }
  const rest = source.slice(i)
  const identifier = rest.match(/^[A-Za-z_$][\w$]*(?:[.?!]*\[[^\]]*\]|[.?!][\w$]+)*/)
  return identifier ? identifier[0] : ''
}

/** `skillId: string`, `relatedSkillIds: string[]`, `Partial<...>`: a type, not data. */
function isTypeExpression(value: string): boolean {
  if (/^(string|number|boolean|any|unknown|never|null|undefined)(\[\])?$/.test(value)) return true
  return /^[A-Z][A-Za-z0-9_$]*(<|\[|$)/.test(value)
}

/** Split a call body on top-level commas, respecting strings and brackets. */
function splitTopLevelArgs(body: string): string[] {
  const args: string[] = []
  let current = ''
  let depth = 0
  let quote: string | null = null

  for (let i = 0; i < body.length; i += 1) {
    const ch = body[i]
    if (quote) {
      current += ch
      if (ch === quote && body[i - 1] !== '\\') quote = null
      continue
    }
    if (ch === "'" || ch === '"') {
      quote = ch
      current += ch
      continue
    }
    if ('([{'.includes(ch)) depth += 1
    if (')]}'.includes(ch)) depth -= 1
    if (ch === ',' && depth === 0) {
      args.push(current)
      current = ''
      continue
    }
    current += ch
  }
  if (current.trim()) args.push(current)
  return args
}

function findCallArgs(source: string, name: string): { line: number; args: string[] }[] {
  const found: { line: number; args: string[] }[] = []
  const pattern = new RegExp(`\\b${name}\\(`, 'g')
  let match: RegExpExecArray | null
  while ((match = pattern.exec(source)) !== null) {
    const start = match.index + match[0].length
    let depth = 1
    let quote: string | null = null
    let i = start
    while (i < source.length && depth > 0) {
      const ch = source[i]
      if (quote) {
        if (ch === quote && source[i - 1] !== '\\') quote = null
      } else if (ch === "'" || ch === '"') {
        quote = ch
      } else if ('([{'.includes(ch)) {
        depth += 1
      } else if (')]}'.includes(ch)) {
        depth -= 1
      }
      i += 1
    }
    const line = source.slice(0, match.index).split('\n').length
    found.push({ line, args: splitTopLevelArgs(source.slice(start, i - 1)) })
  }
  return found
}

/** Archetype ids, read from the `archetype({ id: '...' })` blocks. */
function loadArchetypeIds(): Set<string> {
  const ids = new Set<string>()
  if (!existsSync(ARCHETYPES_FILE)) return ids
  for (const block of readFileSync(ARCHETYPES_FILE, 'utf-8').split('archetype({').slice(1)) {
    const idMatch = block.match(/id:\s*'([^']+)'/)
    if (idMatch) ids.add(idMatch[1])
  }
  return ids
}

/** Shared knowledge item ids, which `toSafetyNoteId` points at. */
function loadSafetyNoteIds(): Set<string> {
  const ids = new Set<string>()
  const path = join(srcDataRoot(), 'sharedKnowledge.ts')
  if (!existsSync(path)) return ids
  for (const { args } of findCallArgs(readFileSync(path, 'utf-8'), 'item')) {
    const id = extractQuoted(args[0] ?? '')[0]
    if (id) ids.add(id)
  }
  return ids
}

/**
 * Every relation id in `src/data`, from the labelled seed fields and from the
 * positional `item(...)` / `term(...)` helpers. This is TypeScript rather than
 * JSON, so it is read with a light scanner; the summary prints how many refs
 * each shape contributed, so a parse failure shows up as a zero instead of as
 * a false pass.
 */
function loadSourceDataRefs(): { refs: SourceRef[]; dynamic: DynamicRef[] } {
  const refs: SourceRef[] = []
  const dynamic: DynamicRef[] = []
  const root = srcDataRoot()
  for (const file of listFiles(root, '.ts')) {
    const source = stripCommentsPreservingLines(readFileSync(join(root, file), 'utf-8'))
    for (const { target, fields } of SOURCE_DATA_FIELDS) {
      for (const field of fields) {
        // `field?: type` is a declaration; only `field: value` carries data.
        const pattern = new RegExp(`\\b${field}(\\?)?\\s*:`, 'g')
        let match: RegExpExecArray | null
        while ((match = pattern.exec(source)) !== null) {
          if (match[1]) continue
          const valueStart = match.index + match[0].length
          const expression = readValueExpression(source, valueStart)
          const line = source.slice(0, match.index).split('\n').length
          const loc = `src/data/${file}:${line}`
          const quoted = extractQuoted(expression)
          if (quoted.length > 0) {
            for (const id of quoted) refs.push({ source: loc, field, id, target })
            continue
          }
          if (isTypeExpression(expression)) continue
          dynamic.push({ source: loc, field, expression })
        }
      }
    }
    for (const { helper, args: argSpecs } of SOURCE_DATA_CALLS) {
      for (const { line, args } of findCallArgs(source, helper)) {
        for (const spec of argSpecs) {
          if (spec.index >= args.length) continue
          for (const id of extractQuoted(args[spec.index])) {
            refs.push({
              source: `src/data/${file}:${line}`,
              field: `${helper}()[${spec.index}]`,
              id,
              target: spec.target,
            })
          }
        }
      }
    }
  }
  return { refs, dynamic }
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((v): v is string => typeof v === 'string')
}

/** Read `relatedSkills`, which holds `{ id, type }` objects in the current corpus. */
function relatedSkillIds(skill: SkillEntry, issues: Issue[]): string[] {
  const raw = skill.data.relatedSkills
  if (raw === undefined || raw === null) return []
  if (!Array.isArray(raw)) {
    issues.push({
      severity: 'error',
      source: skill.id,
      field: 'relatedSkills',
      message: 'relatedSkills should be an array',
    })
    return []
  }
  const ids: string[] = []
  for (const [i, entry] of raw.entries()) {
    if (entry && typeof entry === 'object' && typeof (entry as { id?: unknown }).id === 'string') {
      ids.push((entry as { id: string }).id)
    } else if (typeof entry === 'string') {
      // Tolerated for legacy files, but the canonical shape is { id, type }.
      ids.push(entry)
    } else {
      issues.push({
        severity: 'error',
        source: skill.id,
        field: `relatedSkills[${i}]`,
        message: 'entry has no string id',
      })
    }
  }
  return ids
}

// ── Checks ──────────────────────────────────────────────────────────────────

/** Every skill id reference on a skill, in the order they are reported. */
function skillReferenceFields(skill: SkillEntry, issues: Issue[]): { field: string; id: string }[] {
  const refs: { field: string; id: string }[] = []
  for (const id of relatedSkillIds(skill, issues)) {
    refs.push({ field: 'relatedSkills[].id', id })
  }
  for (const field of ['prerequisiteSkillIds', 'nextSkillIds', 'relatedSkillIds']) {
    for (const id of asStringArray(skill.data[field])) {
      refs.push({ field, id })
    }
  }
  return refs
}

function reportDangling(
  issues: Issue[],
  counts: RefCount,
  source: string,
  field: string,
  id: string,
  target: Category,
): void {
  counts.checked += 1
  counts.dangling += 1
  issues.push({
    severity: 'error',
    source,
    field,
    message: `unknown ${target} id "${id}"`,
  })
}

/** Skill -> skill references. */
function checkSkillRefs(skills: SkillEntry[], skillIds: Set<string>, issues: Issue[]): RefCount {
  const counts = { checked: 0, dangling: 0 }
  for (const skill of skills) {
    for (const ref of skillReferenceFields(skill, issues)) {
      counts.checked += 1
      if (!skillIds.has(ref.id)) {
        counts.dangling += 1
        issues.push({
          severity: 'error',
          source: skill.id,
          field: ref.field,
          message: `unknown skill id "${ref.id}"`,
        })
      } else if (ref.id === skill.id) {
        issues.push({
          severity: 'error',
          source: skill.id,
          field: ref.field,
          message: 'a skill may not reference itself',
        })
      }
    }
  }
  return counts
}

/** Position page -> skill references. */
function checkPositionSkillRefs(skillIds: Set<string>, issues: Issue[]): RefCount {
  const counts = { checked: 0, dangling: 0 }
  for (const position of positionFiles()) {
    for (const id of asStringArray(position.data.relatedSkillIds)) {
      if (!skillIds.has(id)) {
        reportDangling(issues, counts, `position:${position.id}`, 'relatedSkillIds', id, 'skill')
      } else {
        counts.checked += 1
      }
    }
  }
  return counts
}

/** Skill -> position, concept and archetype references. */
const SKILL_TARGET_FIELDS: { target: Category; fields: string[] }[] = [
  { target: 'position', fields: ['relatedPositions', 'relatedPositionIds'] },
  { target: 'concept', fields: ['relatedConcepts', 'relatedConceptIds'] },
  { target: 'archetype', fields: ['archetypeIds', 'relatedArchetypeIds'] },
]

function checkSkillTargetRefs(
  skills: SkillEntry[],
  universes: Record<Category, Set<string>>,
  issues: Issue[],
): Record<Category, RefCount> {
  const counts = emptyCounts()
  for (const skill of skills) {
    for (const { target, fields } of SKILL_TARGET_FIELDS) {
      for (const field of fields) {
        for (const id of asStringArray(skill.data[field])) {
          if (!universes[target].has(id)) {
            reportDangling(issues, counts[target], skill.id, field, id, target)
          } else {
            counts[target].checked += 1
          }
        }
      }
    }
  }
  return counts
}

/** `src/data` -> skill, concept, position and safety-note references. */
function checkSourceDataRefs(
  refs: SourceRef[],
  universes: Record<Category, Set<string>>,
  issues: Issue[],
): Record<Category, RefCount> {
  const counts = emptyCounts()
  for (const ref of refs) {
    if (!universes[ref.target].has(ref.id)) {
      reportDangling(issues, counts[ref.target], ref.source, ref.field, ref.id, ref.target)
    } else {
      counts[ref.target].checked += 1
    }
  }
  return counts
}

function checkIdHygiene(skills: SkillEntry[], issues: Issue[]): void {
  const seen = new Map<string, string>()
  for (const skill of skills) {
    if (!KEBAB_CASE.test(skill.id)) {
      issues.push({
        severity: 'error',
        source: skill.folder,
        field: 'skill.json.id',
        message: `"${skill.id}" is not lowercase kebab-case`,
      })
    }
    if (skill.id !== skill.folder) {
      issues.push({
        severity: 'error',
        source: skill.folder,
        field: 'skill.json.id',
        message: `id "${skill.id}" does not match folder name "${skill.folder}"`,
      })
    }
    const previous = seen.get(skill.id)
    if (previous) {
      issues.push({
        severity: 'error',
        source: skill.folder,
        field: 'skill.json.id',
        message: `id "${skill.id}" is also used by "${previous}"`,
      })
    } else {
      seen.set(skill.id, skill.folder)
    }
  }

  for (const position of positionFiles()) {
    if (position.id !== position.folder) {
      issues.push({
        severity: 'error',
        source: `position:${position.folder}`,
        field: 'position.json.id',
        message: `id "${position.id}" does not match folder name "${position.folder}"`,
      })
    }
  }
}

/** A nextSkillIds edge must be mirrored by a prerequisiteSkillIds edge on the target. */
function checkAsymmetry(skills: SkillEntry[], issues: Issue[]): { edges: number; asymmetric: number } {
  let edges = 0
  let asymmetric = 0
  const byId = new Map(skills.map(s => [s.id, s]))
  for (const skill of skills) {
    for (const nextId of asStringArray(skill.data.nextSkillIds)) {
      const target = byId.get(nextId)
      if (!target) continue // already reported as dangling
      edges += 1
      const mirrored = asStringArray(target.data.prerequisiteSkillIds).includes(skill.id)
      const related = asStringArray(target.data.relatedSkillIds).includes(skill.id)
      if (!mirrored) {
        asymmetric += 1
        issues.push({
          severity: 'error',
          source: skill.id,
          field: 'nextSkillIds',
          message: `"${nextId}" does not list "${skill.id}" in prerequisiteSkillIds${related ? ' (only in relatedSkillIds)' : ''}`,
        })
      }
    }
  }
  return { edges, asymmetric }
}

function checkCycles(skills: SkillEntry[], issues: Issue[]): number {
  const byId = new Map(skills.map(s => [s.id, s]))
  const state = new Map<string, 'visiting' | 'done'>()
  let cycles = 0

  const visit = (id: string, trail: string[]): void => {
    if (state.get(id) === 'done') return
    if (state.get(id) === 'visiting') {
      cycles += 1
      const start = trail.indexOf(id)
      const cycle = trail.slice(start === -1 ? 0 : start).concat(id)
      issues.push({
        severity: 'error',
        source: id,
        field: 'prerequisiteSkillIds',
        message: `prerequisite cycle: ${cycle.join(' -> ')}`,
      })
      return
    }
    const skill = byId.get(id)
    if (!skill) return
    state.set(id, 'visiting')
    for (const prereq of asStringArray(skill.data.prerequisiteSkillIds)) {
      visit(prereq, trail.concat(id))
    }
    state.set(id, 'done')
  }

  for (const skill of skills) visit(skill.id, [])
  return cycles
}

const LEVEL_ORDER: Record<string, number> = { beginner: 0, intermediate: 1, advanced: 2 }

/** A prerequisite that sits above the skill it feeds inverts the learning order. */
function checkLevelInversions(skills: SkillEntry[], issues: Issue[]): number {
  const byId = new Map(skills.map(s => [s.id, s]))
  let inversions = 0
  for (const skill of skills) {
    const level = LEVEL_ORDER[String(skill.data.level)]
    if (level === undefined) continue
    for (const prereqId of asStringArray(skill.data.prerequisiteSkillIds)) {
      const prereq = byId.get(prereqId)
      if (!prereq) continue
      const prereqLevel = LEVEL_ORDER[String(prereq.data.level)]
      if (prereqLevel === undefined) continue
      if (prereqLevel > level) {
        inversions += 1
        issues.push({
          severity: 'warning',
          source: skill.id,
          field: 'prerequisiteSkillIds',
          message: `prerequisite "${prereqId}" is ${prereq.data.level} but "${skill.id}" is ${skill.data.level}`,
        })
      }
    }
  }
  return inversions
}

function checkPrerequisiteCoverage(skills: SkillEntry[]): number {
  let count = 0
  for (const skill of skills) {
    const prereqs = asStringArray(skill.data.prerequisiteSkillIds).length
    const next = asStringArray(skill.data.nextSkillIds).length
    if (prereqs > 0 && next === 0) count += 1
  }
  return count
}

// ── Path checks (informational until content/shared/path.json exists) ───────

interface PathReport {
  active: boolean
  steps: number
}

function checkPath(issues: Issue[]): PathReport {
  const pathFile = join(CONTENT_ROOT, 'shared', 'path.json')
  if (!existsSync(pathFile)) {
    issues.push({
      severity: 'info',
      source: 'content/shared/path.json',
      field: 'path',
      message: 'not present yet, path checks skipped (added in a later slice)',
    })
    return { active: false, steps: 0 }
  }

  const data = readJsonFile(pathFile)
  if (!data) {
    issues.push({
      severity: 'error',
      source: 'content/shared/path.json',
      field: 'path',
      message: 'does not parse as JSON',
    })
    return { active: true, steps: 0 }
  }
  const rawSteps = Array.isArray(data) ? data : (data.steps as unknown)
  if (!Array.isArray(rawSteps)) {
    issues.push({
      severity: 'error',
      source: 'content/shared/path.json',
      field: 'steps',
      message: 'expected an array of steps',
    })
    return { active: true, steps: 0 }
  }
  return { active: true, steps: rawSteps.length }
}

// ── Main ────────────────────────────────────────────────────────────────────

function main(): void {
  const skills = loadSkills()
  const skillIds = new Set(skills.map(s => s.id))
  const positions = positionFiles()
  const positionIds = new Set(positions.map(p => p.id))
  const conceptIds = loadConceptIds()
  const archetypeIds = loadArchetypeIds()
  const safetyNoteIds = loadSafetyNoteIds()
  const issues: Issue[] = []

  const universes: Record<Category, Set<string>> = {
    skill: skillIds,
    position: positionIds,
    concept: conceptIds,
    archetype: archetypeIds,
    safetyNote: safetyNoteIds,
  }

  console.log('\n🔗 Validating the relation graph in content/')

  checkIdHygiene(skills, issues)
  const skillRefs = checkSkillRefs(skills, skillIds, issues)
  const positionSkillRefs = checkPositionSkillRefs(skillIds, issues)
  const skillTargetRefs = checkSkillTargetRefs(skills, universes, issues)
  const sourceData = loadSourceDataRefs()
  const sourceDataRefs = checkSourceDataRefs(sourceData.refs, universes, issues)
  const asymmetry = checkAsymmetry(skills, issues)
  const cycles = checkCycles(skills, issues)
  const inversions = checkLevelInversions(skills, issues)
  const prereqOnly = checkPrerequisiteCoverage(skills)
  const path = checkPath(issues)

  const dangling =
    skillRefs.dangling +
    positionSkillRefs.dangling +
    skillTargetRefs.position.dangling +
    skillTargetRefs.concept.dangling +
    skillTargetRefs.archetype.dangling +
    sourceDataRefs.skill.dangling +
    sourceDataRefs.concept.dangling +
    sourceDataRefs.position.dangling +
    sourceDataRefs.safetyNote.dangling

  // Relation values built at runtime cannot be resolved here, so they are
  // reported instead of skipped silently.
  if (sourceData.dynamic.length > 0) {
    const samples = sourceData.dynamic
      .slice(0, 5)
      .map(d => `${d.source} ${d.field} = ${d.expression}`)
      .join('; ')
    issues.push({
      severity: 'info',
      source: 'src/data',
      field: 'dynamic refs',
      message: `${sourceData.dynamic.length} relation value(s) are not string literals and are not statically checked: ${samples}${sourceData.dynamic.length > 5 ? '; ...' : ''}`,
    })
  }

  const errors = issues.filter(i => i.severity === 'error')
  const warnings = issues.filter(i => i.severity === 'warning')
  const infos = issues.filter(i => i.severity === 'info')

  const domains = new Set(skills.map(s => s.path.split('/').slice(-3)[0]))

  console.log(`\n📊 Results:`)
  console.log(`  Skills checked:            ${skills.length} (${domains.size} folders)`)
  console.log(`  Positions / concepts:      ${positions.length} / ${conceptIds.size}`)
  console.log(`  Archetypes / safety notes: ${archetypeIds.size} / ${safetyNoteIds.size}`)
  console.log(`  Skill to skill refs:       ${skillRefs.checked}`)
  console.log(`  Position to skill refs:    ${positionSkillRefs.checked}`)
  console.log(`  Skill to position refs:    ${skillTargetRefs.position.checked}`)
  console.log(`  Skill to concept refs:     ${skillTargetRefs.concept.checked}`)
  console.log(`  Skill to archetype refs:   ${skillTargetRefs.archetype.checked}`)
  console.log(`  src/data to skill refs:    ${sourceDataRefs.skill.checked}`)
  console.log(`  src/data to concept refs:  ${sourceDataRefs.concept.checked}`)
  console.log(`  src/data to position refs: ${sourceDataRefs.position.checked}`)
  console.log(`  src/data to safety refs:   ${sourceDataRefs.safetyNote.checked}`)
  console.log(`  Dangling refs:             ${dangling}`)
  console.log(`  Asymmetric pairs:          ${asymmetry.asymmetric}`)
  console.log(`  Prerequisite cycles:       ${cycles}`)
  console.log(`  Level inversions:          ${inversions} (warning)`)
  console.log(`  Errors:                    ${errors.length}`)
  console.log(`  Warnings:                  ${warnings.length}`)
  console.log(`  Dynamic src/data refs:     ${sourceData.dynamic.length} (informational)`)
  console.log(`  Steps with a prereq but no next step: ${prereqOnly} (informational)`)
  console.log(`  Path checks:               ${path.active ? `active, ${path.steps} steps` : 'skipped, content/shared/path.json does not exist'}`)

  if (errors.length > 0) {
    console.log('\n❌ Errors:')
    for (const e of errors) {
      console.log(`  [${e.source}] ${e.field}: ${e.message}`)
    }
  }
  if (warnings.length > 0) {
    console.log('\n⚠ Warnings:')
    for (const w of warnings) {
      console.log(`  [${w.source}] ${w.field}: ${w.message}`)
    }
  }
  if (infos.length > 0) {
    console.log('\nℹ Informational:')
    for (const i of infos) {
      console.log(`  [${i.source}] ${i.field}: ${i.message}`)
    }
  }

  if (errors.length === 0) {
    console.log('\n✅ Relation graph validated!\n')
  } else {
    console.log(`\n❌ ${errors.length} error(s) found.\n`)
    process.exit(1)
  }
}

main()
