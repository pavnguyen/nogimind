import { en } from '../src/i18n/resources/en'
import { vi } from '../src/i18n/resources/vi'

type TranslationObj = Record<string, unknown>

interface SectionSummary {
  total: number
  translated: number
  identical: number
  gloss: number
  missing: number
}

interface AuditEntry {
  keyPath: string
  en: string
  vi: string
  status: 'translated' | 'identical' | 'has_english_gloss' | 'missing'
}

function flattenKeys(obj: TranslationObj, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'string') {
      result[fullKey] = value
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenKeys(value as TranslationObj, fullKey))
    }
    // Skip arrays and primitives that aren't strings/objects
  }
  return result
}

function hasEnglishGloss(viValue: string): boolean {
  // Check if value has English in parentheses (like "Tiếng Việt (English)")
  return /\([A-Za-z]/.test(viValue)
}

function getSection(keyPath: string): string {
  return keyPath.split('.')[0]
}

function isSubSection(keyPath: string): string {
  const parts = keyPath.split('.')
  return parts.length >= 2 ? `${parts[0]}.${parts[1]}` : parts[0]
}

// ── Main ──

const enFlat = flattenKeys(en as TranslationObj)
const viFlat = flattenKeys(vi as TranslationObj)

const entries: AuditEntry[] = []
const enKeySet = new Set(Object.keys(enFlat))

// Check all en keys
for (const [keyPath, enValue] of Object.entries(enFlat)) {
  if (!keyPath) continue

  if (!(keyPath in viFlat)) {
    entries.push({ keyPath, en: enValue, vi: '', status: 'missing' })
    continue
  }

  const viValue = viFlat[keyPath]

  if (viValue === enValue) {
    entries.push({ keyPath, en: enValue, vi: viValue, status: 'identical' })
  } else if (hasEnglishGloss(viValue)) {
    entries.push({ keyPath, en: enValue, vi: viValue, status: 'has_english_gloss' })
  } else {
    entries.push({ keyPath, en: enValue, vi: viValue, status: 'translated' })
  }
}

// Extra keys in vi but not in en
const extraKeys: string[] = []
for (const keyPath of Object.keys(viFlat)) {
  if (!enKeySet.has(keyPath)) {
    extraKeys.push(keyPath)
  }
}

// ── Summary ──

const totalKeys = Object.keys(enFlat).length
const translated = entries.filter(e => e.status === 'translated').length
const identical = entries.filter(e => e.status === 'identical').length
const hasGloss = entries.filter(e => e.status === 'has_english_gloss').length
const missing = entries.filter(e => e.status === 'missing').length
const coveragePct = ((translated + hasGloss) / totalKeys * 100).toFixed(1)

console.log('╔══════════════════════════════════════════════════════════════════════════╗')
console.log('║            VIETNAMESE i18n AUDIT —  en.ts  vs  vi.ts                    ║')
console.log('╚══════════════════════════════════════════════════════════════════════════╝')
console.log()

// Color helpers
const bold = (s: string) => `\x1b[1m${s}\x1b[0m`
const green = (s: string) => `\x1b[32m${s}\x1b[0m`
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`
const red = (s: string) => `\x1b[31m${s}\x1b[0m`
const cyan = (s: string) => `\x1b[36m${s}\x1b[0m`
const dim = (s: string) => `\x1b[2m${s}\x1b[0m`

console.log(`  ${bold('Total keys in en.ts:')}     ${cyan(String(totalKeys))}`)
console.log(`  ${green('✓ Translated (unique vi):')}  ${green(String(translated))}  ${dim(`(${(translated/totalKeys*100).toFixed(1)}%)`)}`)
console.log(`  ${yellow('⚠ Identical to en:')}        ${yellow(String(identical))}  ${dim(`(${(identical/totalKeys*100).toFixed(1)}%)`)}`)
console.log(`  ${yellow('◐ Has English gloss:')}      ${yellow(String(hasGloss))}  ${dim(`(${(hasGloss/totalKeys*100).toFixed(1)}%)`)}`)
console.log(`  ${red('✗ Missing from vi.ts:')}     ${red(String(missing))}  ${dim(`(${(missing/totalKeys*100).toFixed(1)}%)`)}`)
console.log(`  ${bold('Coverage (translated+gloss):')} ${coveragePct}%`)
if (extraKeys.length > 0) {
  console.log(`  ${cyan('⊕ Extra keys in vi only:')}    ${cyan(String(extraKeys.length))}`)
}
console.log()

// ── Section breakdown ──

console.log(bold('SECTION BREAKDOWN (sorted by coverage ascending)'))
console.log(dim('─'.repeat(80)))
console.log(
  dim('Section'.padEnd(32)),
  dim('Total'.padEnd(8)),
  dim('Done%').padEnd(8),
  dim('Identical').padEnd(12),
  dim('Gloss').padEnd(8),
  dim('Missing')
)
console.log(dim('─'.repeat(80)))

const sectionCounts: Record<string, SectionSummary> = {}

for (const entry of entries) {
  const section = getSection(entry.keyPath)
  if (!sectionCounts[section]) {
    sectionCounts[section] = { total: 0, translated: 0, identical: 0, gloss: 0, missing: 0 }
  }
  sectionCounts[section].total++
  sectionCounts[section][entry.status]++
}

const sortedSections = Object.entries(sectionCounts)
  .filter(([, counts]) => counts.total >= 3)
  .sort((a, b) => {
    const ratioA = a[1].translated / a[1].total
    const ratioB = b[1].translated / b[1].total
    return ratioA - ratioB
  })

for (const [section, counts] of sortedSections) {
  const donePct = ((counts.translated / counts.total) * 100).toFixed(0)
  const colorFn = Number(donePct) >= 80 ? green : Number(donePct) >= 50 ? yellow : red

  console.log(
    section.padEnd(32),
    String(counts.total).padEnd(8),
    colorFn(`${donePct}%`).padEnd(8),
    yellow(String(counts.identical)).padEnd(12),
    String(counts.gloss).padEnd(8),
    red(String(counts.missing))
  )
}
console.log()

// ── Sub-section breakdown ──

console.log(bold('SUB-SECTION BREAKDOWN (deeper drill-down)'))
console.log(dim('─'.repeat(80)))
console.log(
  dim('Sub-section'.padEnd(40)),
  dim('Total'.padEnd(8)),
  dim('Done%').padEnd(8),
  dim('Identical').padEnd(12),
  dim('Gloss').padEnd(8),
  dim('Missing')
)
console.log(dim('─'.repeat(80)))

const subSectionCounts: Record<string, SectionSummary> = {}

for (const entry of entries) {
  const sub = isSubSection(entry.keyPath)
  if (!subSectionCounts[sub]) {
    subSectionCounts[sub] = { total: 0, translated: 0, identical: 0, gloss: 0, missing: 0 }
  }
  subSectionCounts[sub].total++
  subSectionCounts[sub][entry.status]++
}

const sortedSubSections = Object.entries(subSectionCounts)
  .filter(([, counts]) => counts.total >= 3)
  .sort((a, b) => {
    const ratioA = a[1].translated / a[1].total
    const ratioB = b[1].translated / b[1].total
    return ratioA - ratioB
  })
  .slice(0, 40)

for (const [section, counts] of sortedSubSections) {
  const donePct = ((counts.translated / counts.total) * 100).toFixed(0)
  const colorFn = Number(donePct) >= 80 ? green : Number(donePct) >= 50 ? yellow : red

  console.log(
    section.padEnd(40),
    String(counts.total).padEnd(8),
    colorFn(`${donePct}%`).padEnd(8),
    yellow(String(counts.identical)).padEnd(12),
    String(counts.gloss).padEnd(8),
    red(String(counts.missing))
  )
}
console.log()

// ─── List: Untranslated keys ───

const identicalEntries = entries.filter(e => e.status === 'identical')
if (identicalEntries.length > 0) {
  console.log(bold(`UNTRANSLATED KEYS (VI === EN) — ${identicalEntries.length} total`))
  console.log(dim('─'.repeat(80)))
  for (const entry of identicalEntries.slice(0, 50)) {
    console.log(`  ${yellow(entry.keyPath)}`)
    console.log(`    ${dim('en:')} ${entry.en}`)
    console.log()
  }
  if (identicalEntries.length > 50) {
    console.log(dim(`  ... and ${identicalEntries.length - 50} more`))
    console.log()
  }
}

// ─── List: Keys with English gloss ───

const glossEntries = entries.filter(e => e.status === 'has_english_gloss')
if (glossEntries.length > 0) {
  console.log(bold(`KEYS WITH ENGLISH GLOSS (VI has (English)) — ${glossEntries.length} total`))
  console.log(dim('─'.repeat(80)))
  for (const entry of glossEntries.slice(0, 40)) {
    console.log(`  ${yellow(entry.keyPath)}`)
    console.log(`    ${dim('vi:')} ${entry.vi}`)
    console.log(`    ${dim('en:')} ${entry.en}`)
    console.log()
  }
  if (glossEntries.length > 40) {
    console.log(dim(`  ... and ${glossEntries.length - 40} more`))
    console.log()
  }
}

// ─── List: Missing keys ───

const missingEntries = entries.filter(e => e.status === 'missing')
if (missingEntries.length > 0) {
  console.log(bold(`MISSING KEYS (in en but not in vi) — ${missingEntries.length} total`))
  console.log(dim('─'.repeat(80)))
  for (const entry of missingEntries.slice(0, 50)) {
    console.log(`  ${red(entry.keyPath)}`)
    console.log(`    ${dim('en:')} ${entry.en}`)
    console.log()
  }
  if (missingEntries.length > 50) {
    console.log(dim(`  ... and ${missingEntries.length - 50} more`))
    console.log()
  }
}

// ─── Extra keys ───

if (extraKeys.length > 0) {
  console.log(bold(`EXTRA KEYS (in vi but NOT in en) — ${extraKeys.length} total`))
  console.log(dim('─'.repeat(80)))
  for (const key of extraKeys) {
    console.log(`  ${cyan(key)}`)
    console.log(`    ${dim('vi:')} ${viFlat[key]}`)
    console.log()
  }
}

// ─── Recommendations ───

console.log(bold('RECOMMENDATIONS'))
console.log(dim('─'.repeat(80)))

const worstSections = sortedSections.slice(0, 5)
if (worstSections.length > 0) {
  console.log(`  ${red('Priority sections to fix:')}`)
  for (const [section, counts] of worstSections) {
    const pct = (counts.translated / counts.total * 100).toFixed(0)
    console.log(`    - ${section} (${pct}% done, ${counts.identical} identical, ${counts.gloss} gloss, ${counts.missing} missing)`)
  }
  console.log()
}

console.log(`  ${yellow('Tip:')} Many keys are "identical" because vi.ts uses { ...en } spread.`)
console.log(`  Upgrade vi.ts to explicit translations section by section.`)
console.log(`  Run again after each batch to track progress: ${dim('tsx scripts/auditViKeys.ts')}`)
console.log()

// ─── Stats for tracking ───

console.log(dim('─'.repeat(80)))
console.log(dim(`Report generated: ${new Date().toISOString()}`))
console.log(dim(`Keys: ${totalKeys} total | ${translated} translated | ${identical} identical | ${hasGloss} gloss | ${missing} missing`))
