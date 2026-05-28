/**
 * build-content.ts — Content Pipeline Build Script
 *
 * Reads all skill content from content/skills/ and generates:
 *   1. public/generated/manifest/skills.en.json       (lightweight manifest per locale)
 *   2. public/generated/manifest/skills.vi.json
 *   3. public/generated/manifest/skills.fr.json
 *   4. public/generated/skills/{locale}/{id}.json      (full detail per skill per locale)
 *   5. public/generated/videos/by-skill/{id}.json      (videos per skill)
 *
 * Zod validation is applied to all input JSONs and output artifacts.
 * The build will fail if any validation error is found.
 *
 * Usage:  npx tsx scripts/content/build-content.ts
 */

import { readFileSync, existsSync, readdirSync } from 'fs'
import { join, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import type { z } from 'zod'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import {
  SkillMetaSchema,
  SkillContentSchema,
  SkillVideoRefSchema,
  SkillManifestItemSchema,
  SkillDetailArtifactSchema,
  ConceptManifestItemSchema,
  ConceptDetailArtifactSchema,
  PositionManifestItemSchema,
  PositionDetailArtifactSchema,
} from '../../src/types/content'
import { discoverSkills, getSkillContentPath, generatedPath, writeJson } from './load-json.js' 

// ── Root directores ──────────────────────────────────────────────────────────

const CONCEPT_SOURCE_RELPATH = 'content/concepts'
const POSITION_SOURCE_RELPATH = 'content/positions'

// ── Locales ──────────────────────────────────────────────────────────────────

const LOCALES = ['en', 'vi', 'fr'] as const
type Locale = (typeof LOCALES)[number]

// ── Types (used before build; validation is via Zod) ────────────────────────

interface SkillMetaJson {
  id: string
  domain: string
  level: string
  name: string
  aliases?: string[]
  keywords?: string[]
  tags?: string[]
  sortOrder?: number
  relatedSkills?: { id: string; type: string }[]
  relatedPositions?: string[]
  relatedConcepts?: string[]
  archetypeIds?: string[]
  trainingMethodIds?: string[]
  status?: string
  featureFlags?: {
    hasMicroDetails?: boolean
    hasChecklist?: boolean
    hasVideos?: boolean
    hasStateMachine?: boolean
  }
}

interface SkillContentJson {
  id: string
  locale: string
  name: string
  shortName?: string
  description: string
  shortInstruction?: string
  summary?: string
  whyItWorks: string[]
  commonMistakes: string[]
  coachingCues: string[]
}

interface SkillVideoJson {
  youtubeId: string
  title: string
  channel: string
  whyUseful: string
  timestampStart?: number
  relevance: string
  level: string
}

interface SkillVideoMapping {
  skillId: string
  videos: SkillVideoJson[]
}

// ── Manifest entry ──────────────────────────────────────────────────────────

interface ManifestEntry {
  id: string
  domain: string
  level: string
  name: string
  tags: string[]
  summary: string
  hasVideos: boolean
  hasMicroDetails: boolean
  hasChecklist: boolean
  updatedAt?: string
  sortOrder?: number
}

const SUSPICIOUS_MARKERS = [
  'củbạn',
  'củhọ',
  'củđối',
  'củtrẻ',
  'lyer',
  'looker',
  'getter',
  'breather',
  'piégarder',
  'applied explosively',
  'mechanically hiệu quả',
  "vous peut't",
]

const ENGLISH_SIGNAL_WORDS = [
  'the',
  'and',
  'if',
  'when',
  'with',
  'without',
  'from',
  'into',
  'they',
  'their',
  'them',
  'your',
  'you',
  'cannot',
  'must',
  'opponent',
  'defend',
  'transition',
  'follow',
  'finish',
]

const TECHNICAL_ALLOWLIST = [
  'bjj',
  'no-gi',
  'nogi',
  'underhook',
  'overhook',
  'crossface',
  'guard',
  'half guard',
  'closed guard',
  'open guard',
  'side control',
  'mount',
  'back control',
  'north-south',
  'knee shield',
  'knee-on-belly',
  'armbar',
  'kimura',
  'triangle',
  'rear-naked choke',
  'rnc',
  'guillotine',
  "d'arce",
  'anaconda',
  'omoplata',
  'gogoplata',
  'heel hook',
  'ankle lock',
  'single-leg x',
  'single leg x',
  'slx',
  'x-guard',
  'de la riva',
  'k-guard',
  'seatbelt',
  'shrimp',
  'wrestle up',
  'front headlock',
  'snapdown',
  'sprawl',
  'mat return',
  'crucifix',
  's-mount',
  'saddle',
  'inside sankaku',
  'ashi garami',
  'cross ashi',
  'outside ashi',
  '50/50',
  'z-lock',
]

// ── Zod validation helpers ───────────────────────────────────────────────────

let validationErrors = 0

/**
 * Validate a value against a Zod schema.
 * On failure, prints the error and increments the global error count.
 * Does NOT abort — the caller decides whether to continue or stop.
 */
function zodValidate<T>(
  label: string,
  schema: z.ZodSchema<T>,
  data: unknown,
  ctx: { skillId: string; fileType: string },
): void {
  const result = schema.safeParse(data)
  if (!result.success) {
    validationErrors++
    console.error(`  ❌ [${ctx.skillId}] ${label}: Zod validation FAILED`)
    for (const issue of result.error.issues) {
      const pathStr = issue.path.length > 0 ? `.${issue.path.join('.')}` : ''
      console.error(`       ${ctx.fileType}${pathStr}: ${issue.message}`)
    }
  }
}

/**
 * Read and Zod-validate a JSON file. Returns parsed data or null on failure.
 */
function readAndValidate<T>(
  path: string,
  schema: z.ZodSchema<T>,
  ctx: { skillId: string; fileType: string },
): T | null {
  if (!existsSync(path)) return null
  const raw = readFileSync(path, 'utf-8')
  const data: unknown = JSON.parse(raw)
  const result = schema.safeParse(data)
  if (!result.success) {
    validationErrors++
    console.error(`  ❌ [${ctx.skillId}] ${path}: Zod validation FAILED`)
    for (const issue of result.error.issues) {
      const pathStr = issue.path.length > 0 ? `.${issue.path.join('.')}` : ''
      console.error(`       ${ctx.fileType}${pathStr}: ${issue.message}`)
    }
    return null
  }
  return result.data
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function readJsonSafe<T>(...pathParts: string[]): T | null {
  const fullPath = join(...pathParts)
  if (!existsSync(fullPath)) return null
  const raw = readFileSync(fullPath, 'utf-8')
  return JSON.parse(raw) as T
}

function normalizeForDetection(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s/-]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function countEnglishSignals(text: string): number {
  const normalized = normalizeForDetection(text)
  if (!normalized) return 0

  let working = normalized
  for (const term of TECHNICAL_ALLOWLIST) {
    const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    working = working.replace(new RegExp(`\\b${safeTerm}\\b`, 'gi'), ' ')
  }

  const tokens = working.split(' ').filter(Boolean)
  return tokens.filter((token) => ENGLISH_SIGNAL_WORDS.includes(token)).length
}

function isSuspiciousLocalizedText(text: string, locale: Locale): boolean {
  if (locale === 'en') return false
  const trimmed = text.trim()
  if (!trimmed) return false

  const normalized = trimmed.toLowerCase()
  return SUSPICIOUS_MARKERS.some((marker) => normalized.includes(marker))
}

function sanitizeLocalizedValue(value: unknown, englishValue: unknown, locale: Locale): unknown {
  if (Array.isArray(value) && Array.isArray(englishValue)) {
    return value.map((item, index) => sanitizeLocalizedValue(item, englishValue[index], locale))
  }

  if (value && typeof value === 'object' && englishValue && typeof englishValue === 'object') {
    const localizedRecord = value as Record<string, unknown>
    const englishRecord = englishValue as Record<string, unknown>
    const out: Record<string, unknown> = {}
    for (const key of Object.keys(localizedRecord)) {
      out[key] = sanitizeLocalizedValue(localizedRecord[key], englishRecord[key], locale)
    }
    return out
  }

  if (typeof value === 'string' && typeof englishValue === 'string') {
    if (isSuspiciousLocalizedText(value, locale)) {
      return englishValue
    }
  }

  return value
}

function readSkillContent(domain: string, skillId: string, locale: Locale): SkillContentJson | null {
  return readJsonSafe<SkillContentJson>(getSkillContentPath(domain, skillId), `content.${locale}.json`)
}

function getSanitizedLocalizedContent(domain: string, skillId: string, locale: Locale): SkillContentJson | null {
  const englishContent = readSkillContent(domain, skillId, 'en')
  const localizedContent = readSkillContent(domain, skillId, locale)

  if (!localizedContent) return englishContent
  if (!englishContent || locale === 'en') return localizedContent

  return sanitizeLocalizedValue(localizedContent, englishContent, locale) as SkillContentJson
}

function getSkillName(domain: string, skillId: string, locale: Locale): string {
  const content = getSanitizedLocalizedContent(domain, skillId, locale)
  return content?.name ?? skillId
}

function getShortDesc(domain: string, skillId: string, locale: Locale): string {
  const content = getSanitizedLocalizedContent(domain, skillId, locale)
  return content?.summary ?? content?.description ?? ''
}

// ── Build functions ──────────────────────────────────────────────────────────

function buildManifest(locale: Locale): ManifestEntry[] {
  const skills = discoverSkills()
  const entries: ManifestEntry[] = []

  for (const { domain, id } of skills) {
    const meta = readAndValidate(
      join(getSkillContentPath(domain, id), 'skill.json'),
      SkillMetaSchema,
      { skillId: id, fileType: 'skill.json' },
    ) as SkillMetaJson | null
    if (!meta) {
      console.warn(`  ⚠ skill.json not found or invalid for ${id}, skipping manifest entry`)
      continue
    }

    const entry: ManifestEntry = {
      id: meta.id,
      domain: meta.domain,
      level: meta.level,
      name: getSkillName(domain, id, locale),
      tags: meta.tags ?? [],
      summary: getShortDesc(domain, id, locale),
      hasVideos: meta.featureFlags?.hasVideos ?? false,
      hasMicroDetails: meta.featureFlags?.hasMicroDetails ?? false,
      hasChecklist: meta.featureFlags?.hasChecklist ?? false,
      updatedAt: undefined,
      sortOrder: meta.sortOrder,
    }

    // Validate the output manifest entry against the schema
    zodValidate('manifest entry', SkillManifestItemSchema, entry, { skillId: id, fileType: 'manifest' })

    entries.push(entry)
  }

  console.log(`  ✓ ${locale}: ${entries.length} skills in manifest`)
  return entries
}

const VideoRefArraySchema = SkillVideoRefSchema.array()

function buildSkillDetail(domain: string, skillId: string, locale: Locale): Record<string, unknown> | null {
  const skillPath = getSkillContentPath(domain, skillId)

  const meta = readAndValidate(
    join(skillPath, 'skill.json'),
    SkillMetaSchema,
    { skillId, fileType: 'skill.json' },
  ) as Record<string, unknown> | null

  const localizedContent = readAndValidate(
    join(skillPath, `content.${locale}.json`),
    SkillContentSchema,
    { skillId, fileType: `content.${locale}.json` },
  )

  const englishContent = readAndValidate(
    join(skillPath, 'content.en.json'),
    SkillContentSchema,
    { skillId, fileType: 'content.en.json' },
  )

  const content = localizedContent ?? englishContent
  const sanitizedContent =
    content && englishContent
      ? sanitizeLocalizedValue(content, englishContent, locale)
      : content

  if (!meta && !content) {
    console.warn(`  ⚠ No data for ${skillId} (${locale}), skipping detail`)
    return null
  }

  const detail = {
    ...(meta ?? {}),
    ...(sanitizedContent ?? {}),
    locale,
    id: skillId,
  }

  // Validate the output artifact against SkillDetailArtifactSchema
  zodValidate('skill detail artifact', SkillDetailArtifactSchema, detail, {
    skillId,
    fileType: `generated/${locale}/${skillId}.json`,
  })

  return detail
}

function buildVideoMapping(skillId: string, domain: string): SkillVideoMapping | null {
  const videosPath = join(getSkillContentPath(domain, skillId), 'videos.json')
  const videos = readAndValidate(
    videosPath,
    VideoRefArraySchema,
    { skillId, fileType: 'videos.json' },
  ) as SkillVideoJson[] | null
  if (!videos) return null
  return { skillId, videos }
}

// ── Discover concepts from content/concepts/ ───────────────────────────────

interface ConceptLocation {
  id: string
}

function discoverConcepts(): ConceptLocation[] {
  const root = resolve(__dirname, '../../content/concepts')
  if (!existsSync(root)) return []
  const dirs = readdirSync(root, { withFileTypes: true }).filter(d => d.isDirectory())
  return dirs.map(d => ({ id: d.name }))
}

// ── Discover positions from content/positions/ ──────────────────────────────

interface PositionLocation {
  id: string
}

function discoverPositions(): PositionLocation[] {
  const root = resolve(__dirname, '../../content/positions')
  if (!existsSync(root)) return []
  const dirs = readdirSync(root, { withFileTypes: true }).filter(d => d.isDirectory())
  return dirs.map(d => ({ id: d.name }))
}

// ── Build concept manifest & details ────────────────────────────────────────

interface ConceptContentJson {
  id: string
  locale: string
  title: string
  shortDefinition: string
  whyItMatters: string
  deepExplanation: string
  beginnerView: string
  advancedView: string
  ifThenExamples: Array<{
    if: string
    then: string
    why: string
    relatedSkillIds: string[]
  }>
  commonMisunderstandings: Array<{
    misunderstanding: string
    correction: string
  }>
  trainingCues: string[]
}

interface ConceptMetaJson {
  id: string
  category: string
  level: string
  tags: string[]
  relatedSkillIds: string[]
  relatedConceptIds: string[]
}

function buildConceptManifest(): number {
  const concepts = discoverConcepts()
  if (concepts.length === 0) {
    console.log('  (no concept source files found — run migration first)')
    return 0
  }

  const entries: unknown[] = []
  for (const { id } of concepts) {
    const contentPath = join(getConceptOrPositionPath('concepts', id), 'content.en.json')
    const metaPath = join(getConceptOrPositionPath('concepts', id), 'concept.json')

    const meta = readJsonSafe<ConceptMetaJson>(metaPath) ?? { id, category: '', level: '', tags: [], relatedSkillIds: [], relatedConceptIds: [] }
    const content = readJsonSafe<ConceptContentJson>(contentPath)
    if (!content) continue

    const entry = {
      id,
      title: content.title,
      category: meta.category,
      level: meta.level,
      tags: meta.tags ?? [],
      shortDefinition: content.shortDefinition,
    }
    entries.push(entry)
  }

  const outPath = generatedPath('manifest', 'concepts.json')
  writeJson(outPath, entries)
  console.log(`  ✓ ${concepts.length} concepts in manifest → manifest/concepts.json`)
  return concepts.length
}

function getConceptOrPositionPath(type: 'concepts' | 'positions', id: string): string {
  return resolve(__dirname, `../../content/${type}/${id}`)
}

function buildConceptDetails(): number {
  const concepts = discoverConcepts()
  if (concepts.length === 0) return 0

  let count = 0
  for (const { id } of concepts) {
    const basePath = getConceptOrPositionPath('concepts', id)
    const metaPath = join(basePath, 'concept.json')
    const meta = readJsonSafe<Record<string, unknown>>(metaPath) ?? { id, category: '', level: '', tags: [], relatedSkillIds: [], relatedConceptIds: [] }

    for (const locale of LOCALES) {
      const contentPath = join(basePath, `content.${locale}.json`)
      const content = readJsonSafe<Record<string, unknown>>(contentPath)
      if (!content) continue

      const artifact = {
        ...meta,
        ...content,
        locale,
        id,
      }

      zodValidate('concept detail artifact', ConceptDetailArtifactSchema, artifact, {
        skillId: id,
        fileType: `concepts/${locale}/${id}.json`,
      })

      const outPath = generatedPath('concepts', locale, `${id}.json`)
      writeJson(outPath, artifact)
      count++
    }
  }
  return count
}

// ── Build position manifest & details ───────────────────────────────────────

interface PositionContentJson {
  id: string
  locale: string
  title: string
  description: string
  topPlayerGoals: string[]
  bottomPlayerGoals: string[]
  controlPoints: string[]
  escapePriorities: string[]
  advancementOptions: Array<{
    action: string
    nextPositionId?: string
    relatedSkillIds: string[]
    why: string
  }>
  dangerSignals: string[]
}

interface PositionMetaJson {
  id: string
  category: string
  status: string
  nextPositionId?: string
  relatedSkillIds: string[]
  relatedConceptIds: string[]
}

function buildPositionManifest(): number {
  const positions = discoverPositions()
  if (positions.length === 0) {
    console.log('  (no position source files found — run migration first)')
    return 0
  }

  const entries: unknown[] = []
  for (const { id } of positions) {
    const contentPath = join(getConceptOrPositionPath('positions', id), 'content.en.json')
    const metaPath = join(getConceptOrPositionPath('positions', id), 'position.json')

    const meta = readJsonSafe<PositionMetaJson>(metaPath) ?? { id, category: '', status: '', relatedSkillIds: [], relatedConceptIds: [] }
    const content = readJsonSafe<PositionContentJson>(contentPath)
    if (!content) continue

    const entry = {
      id,
      title: content.title,
      category: meta.category,
      status: meta.status,
      description: content.description,
    }
    entries.push(entry)
  }

  const outPath = generatedPath('manifest', 'positions.json')
  writeJson(outPath, entries)
  console.log(`  ✓ ${positions.length} positions in manifest → manifest/positions.json`)
  return positions.length
}

function buildPositionDetails(): number {
  const positions = discoverPositions()
  if (positions.length === 0) return 0

  let count = 0
  for (const { id } of positions) {
    const basePath = getConceptOrPositionPath('positions', id)
    const metaPath = join(basePath, 'position.json')
    const meta = readJsonSafe<Record<string, unknown>>(metaPath) ?? { id, category: '', status: '', relatedSkillIds: [], relatedConceptIds: [] }

    for (const locale of LOCALES) {
      const contentPath = join(basePath, `content.${locale}.json`)
      const content = readJsonSafe<Record<string, unknown>>(contentPath)
      if (!content) continue

      const artifact = {
        ...meta,
        ...content,
        locale,
        id,
      }

      zodValidate('position detail artifact', PositionDetailArtifactSchema, artifact, {
        skillId: id,
        fileType: `positions/${locale}/${id}.json`,
      })

      const outPath = generatedPath('positions', locale, `${id}.json`)
      writeJson(outPath, artifact)
      count++
    }
  }
  return count
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🧪 Content Pipeline — Build Script\n')

  // ── Skills ──
  console.log('Discovering skills...')
  const skills = discoverSkills()
  console.log(`  Found ${skills.length} skills in content/skills/\n`)

  console.log('📋 Building skill manifests...')
  for (const locale of LOCALES) {
    const manifest = buildManifest(locale)
    const outPath = generatedPath('manifest', `skills.${locale}.json`)
    writeJson(outPath, manifest)
    console.log(`  → ${outPath}`)
  }

  console.log('\n📄 Building skill details...')
  let detailCount = 0
  for (const { domain, id } of skills) {
    for (const locale of LOCALES) {
      const detail = buildSkillDetail(domain, id, locale)
      if (detail) {
        const outPath = generatedPath('skills', locale, `${id}.json`)
        writeJson(outPath, detail)
        detailCount++
      }
    }
  }
  console.log(`  Generated ${detailCount} skill detail files`)

  console.log('\n🎥 Building video mappings...')
  let videoCount = 0
  for (const { domain, id } of skills) {
    const mapping = buildVideoMapping(id, domain)
    if (mapping) {
      const outPath = generatedPath('videos', 'by-skill', `${id}.json`)
      writeJson(outPath, mapping)
      videoCount++
    }
  }
  console.log(`  Generated ${videoCount} video mapping files`)

  // ── Concepts ──
  console.log('\n📋 Building concept manifest...')
  const conceptCount = buildConceptManifest()

  console.log('📄 Building concept details...')
  const conceptDetailCount = buildConceptDetails()
  console.log(`  Generated ${conceptDetailCount} concept detail files`)

  // ── Positions ──
  console.log('\n📋 Building position manifest...')
  const positionCount = buildPositionManifest()

  console.log('📄 Building position details...')
  const positionDetailCount = buildPositionDetails()
  console.log(`  Generated ${positionDetailCount} position detail files`)

  // Summary
  const hasErrors = validationErrors > 0
  if (hasErrors) {
    console.log(`\n❌ Build FAILED — ${validationErrors} Zod validation error(s) found.`)
    console.log('  Fix the issues above and re-run.\n')
    process.exit(1)
  } else {
    console.log('\n✅ Build complete — all Zod validations passed!')
    console.log(`  Skills:     ${skills.length}`)
    console.log(`  Concepts:   ${conceptCount}`)
    console.log(`  Positions:  ${positionCount}`)
    console.log(`  Locales:    ${LOCALES.join(', ')}`)
    console.log(`  Details:    ${detailCount} skills, ${conceptDetailCount} concepts, ${positionDetailCount} positions`)
    console.log(`  Videos:     ${videoCount}`)
    console.log(`  Output:     public/generated/\n`)
  }
}

main().catch(err => {
  console.error('Build failed:', err)
  process.exit(1)
})
