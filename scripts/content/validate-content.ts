/**
 * validate-content.ts — Validate all content JSON files against Zod schemas
 *
 * Usage:  npx tsx scripts/content/validate-content.ts
 */

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import type { z } from 'zod'
import {
  SkillMetaSchema,
  SkillContentSchema,
  SkillVideoRefSchema,
} from '../../src/types/content'
import { discoverSkills, getSkillContentPath } from './load-json.js'

// ── Types ───────────────────────────────────────────────────────────────────

interface ValidationIssue {
  type: 'error' | 'warning'
  skill: string
  field: string
  message: string
}

// ── Zod validation helper ───────────────────────────────────────────────────

/**
 * Parse data against a Zod schema and return formatted issues.
 * Handles the `.safeParse()` result and formats ZodIssue messages
 * into ValidationIssue objects.
 */
function validateWithZod<T>(
  skillId: string,
  label: string,
  schema: z.ZodSchema<T>,
  data: unknown,
  issues: ValidationIssue[],
  severity: 'error' | 'warning' = 'error',
): void {
  const result = schema.safeParse(data)
  if (!result.success) {
    for (const zodIssue of result.error.issues) {
      const pathStr = zodIssue.path.length > 0
        ? `${label}.${zodIssue.path.join('.')}`
        : label
      const code = zodIssue.code === 'invalid_union' ? ' (schema mismatch)' : ''
      issues.push({
        type: severity,
        skill: skillId,
        field: pathStr,
        message: `${zodIssue.message}${code}`,
      })
    }
  }
}

// ── Cross-file validations (beyond Zod's scope) ─────────────────────────────

/** Check that skill.json id matches the folder name. */
function checkIdMismatch(
  skillId: string,
  meta: Record<string, unknown>,
  issues: ValidationIssue[],
): void {
  if (meta.id && meta.id !== skillId) {
    issues.push({
      type: 'error',
      skill: skillId,
      field: 'skill.json.id',
      message: `ID mismatch: folder name is "${skillId}" but skill.json says "${meta.id}"`,
    })
  }
}

/** Check for duplicate youtubeId across skill boundaries. */
function checkDuplicateVideoIds(
  allVideoMappings: { skillId: string; youtubeId: string }[]
): ValidationIssue[] {
  const videoMap = new Map<string, string[]>()
  for (const { skillId, youtubeId } of allVideoMappings) {
    const existing = videoMap.get(youtubeId) ?? []
    existing.push(skillId)
    videoMap.set(youtubeId, existing)
  }

  const issues: ValidationIssue[] = []
  for (const [youtubeId, skills] of videoMap) {
    if (skills.length > 1) {
      issues.push({
        type: 'warning',
        skill: skills.join(', '),
        field: 'videos.youtubeId',
        message: `Duplicate youtubeId "${youtubeId}" shared across skills: ${skills.join(', ')}`,
      })
    }
  }
  return issues
}// ── Content quality thresholds ──────────────────────────────────────────────

const MIN_CONTENT_THRESHOLDS: Record<string, { min: number; severity: 'error' | 'warning'; label: string }> = {
  description: { min: 20, severity: 'error', label: 'content.en.json.description' },
  shortInstruction: { min: 10, severity: 'warning', label: 'content.en.json.shortInstruction' },
  summary: { min: 20, severity: 'warning', label: 'content.en.json.summary' },
  whyItWorks: { min: 3, severity: 'warning', label: 'content.en.json.whyItWorks' },
  coachingCues: { min: 3, severity: 'warning', label: 'content.en.json.coachingCues' },
  commonMistakes: { min: 2, severity: 'warning', label: 'content.en.json.commonMistakes' },
}

/**
 * Check that a skill has at least minimal usable content.
 * Prevents empty or skeleton skills from passing validation.
 */
function checkContentQuality(
  skillId: string,
  content: Record<string, unknown>,
  issues: ValidationIssue[],
): void {
  for (const [field, rules] of Object.entries(MIN_CONTENT_THRESHOLDS)) {
    const value = content[field]
    let length = 0

    if (typeof value === 'string') {
      length = (value as string).trim().length
    } else if (Array.isArray(value)) {
      length = (value as unknown[]).length
    }

    if (length < rules.min) {
      issues.push({
        type: rules.severity,
        skill: skillId,
        field: rules.label,
        message: `Content too sparse: only ${length} item(s), minimum ${rules.min} required`,
      })
    }
  }

  // Cross-check: the skill must have at least SOME meaningful content
  const contentFields = ['whyItWorks', 'coachingCues', 'commonMistakes', 'systemLogic', 'shortInstruction']
  const totalContent = contentFields.reduce((sum, f) => {
    const val = content[f]
    return sum + (typeof val === 'string' && (val as string).trim().length > 0 ? 1 : Array.isArray(val) ? (val as unknown[]).length : 0)
  }, 0)

  if (totalContent < 3) {
    issues.push({
      type: 'warning',
      skill: skillId,
      field: 'content.en.json (overall)',
      message: `Very sparse content: only ${totalContent} item(s) across all sections. Add at least whyItWorks, coachingCues, and commonMistakes.`,
    })
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🔍 Content Validation (Zod) — schema version 1\n')
  const skills = discoverSkills()
  console.log(`Checking ${skills.length} skills...\n`)

  const allIssues: ValidationIssue[] = []
  let missingEnContent = 0
  const allVideoIds: { skillId: string; youtubeId: string }[] = []

  for (const { domain, id } of skills) {
    const skillPath = getSkillContentPath(domain, id)

    // ── skill.json — validate with Zod SkillMetaSchema ────────────────
    const metaPath = join(skillPath, 'skill.json')
    if (!existsSync(metaPath)) {
      allIssues.push({ type: 'error', skill: id, field: 'skill.json', message: 'skill.json not found' })
      continue
    }
    const metaRaw = readFileSync(metaPath, 'utf-8')
    const meta: unknown = JSON.parse(metaRaw)
    validateWithZod(id, 'skill.json', SkillMetaSchema, meta, allIssues)

    // Cross-file: id in folder vs id in file
    if (meta && typeof meta === 'object' && !Array.isArray(meta)) {
      checkIdMismatch(id, meta as Record<string, unknown>, allIssues)
    }

    // ── content.*.json — validate with Zod SkillContentSchema ─────────
    for (const locale of ['en', 'vi', 'fr']) {
      const contentPath = join(skillPath, `content.${locale}.json`)
      if (!existsSync(contentPath)) {
        allIssues.push({
          type: locale === 'en' ? 'error' : 'warning',
          skill: id,
          field: `content.${locale}.json`,
          message: `Content file missing for ${locale.toUpperCase()}`,
        })
        if (locale === 'en') missingEnContent++
        continue
      }
      const contentRaw = readFileSync(contentPath, 'utf-8')
      const content: unknown = JSON.parse(contentRaw)
      validateWithZod(id, `content.${locale}.json`, SkillContentSchema, content, allIssues)

      // Content quality checks only for English (primary locale)
      if (locale === 'en' && content && typeof content === 'object' && !Array.isArray(content)) {
        checkContentQuality(id, content as Record<string, unknown>, allIssues)
      }
    }

    // ── videos.json — validate with Zod SkillVideoRefSchema array ─────
    const videosPath = join(skillPath, 'videos.json')
    if (existsSync(videosPath)) {
      const videosRaw = readFileSync(videosPath, 'utf-8')
      const videos: unknown = JSON.parse(videosRaw)

      if (Array.isArray(videos)) {
        // Validate each entry with SkillVideoRefSchema
        for (const [i, v] of videos.entries()) {
          validateWithZod(id, `videos.json[${i}]`, SkillVideoRefSchema, v, allIssues)
          if (v && typeof v === 'object' && 'youtubeId' in (v as Record<string, unknown>)) {
            const ytid = (v as Record<string, unknown>).youtubeId
            if (typeof ytid === 'string') {
              allVideoIds.push({ skillId: id, youtubeId: ytid })
            }
          }
        }
      } else {
        allIssues.push({
          type: 'error',
          skill: id,
          field: 'videos.json',
          message: 'videos.json should be an array of video references',
        })
      }
    }
  }

  allIssues.push(...checkDuplicateVideoIds(allVideoIds))

  const errors = allIssues.filter(i => i.type === 'error')
  const warnings = allIssues.filter(i => i.type === 'warning')

  console.log(`\n📊 Results:`)
  console.log(`  Skills checked: ${skills.length}`)
  console.log(`  Errors:         ${errors.length}`)
  console.log(`  Warnings:       ${warnings.length}`)
  if (missingEnContent > 0) console.log(`  Missing EN:     ${missingEnContent}`)

  if (errors.length > 0) {
    console.log('\n❌ Errors:')
    for (const e of errors) {
      console.log(`  [${e.skill}] ${e.field}: ${e.message}`)
    }
  }
  if (warnings.length > 0) {
    console.log('\n⚠ Warnings:')
    for (const w of warnings) {
      console.log(`  [${w.skill}] ${w.field}: ${w.message}`)
    }
  }

  if (errors.length === 0) {
    console.log('\n✅ Validation passed!\n')
  } else {
    console.log(`\n❌ ${errors.length} error(s) found.\n`)
    process.exit(1)
  }
}

main().catch(err => {
  console.error('Validation failed:', err)
  process.exit(1)
})
