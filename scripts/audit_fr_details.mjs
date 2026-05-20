import { readFileSync } from 'fs'

const enCode = readFileSync('src/i18n/resources/en.ts', 'utf8')
const frCode = readFileSync('src/i18n/resources/fr.ts', 'utf8')

// Parse EN: all leaf keys with values
function parseEN(code) {
  const keys = {}
  const lines = code.split('\n')
  const stack = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) continue
    if (trimmed === '}' || trimmed === '},' || trimmed === '],') {
      if (stack.length > 0) stack.pop()
      continue
    }
    const valMatch = trimmed.match(/^(\w+):\s*(.+?)(?:,\s*)?$/)
    if (!valMatch) continue
    const prop = valMatch[1]
    const value = valMatch[2].trim()

    if (value === '{') {
      stack.push(prop)
    } else if (value.startsWith("'") || value.startsWith('"') || value.startsWith('`')) {
      const fullPath = [...stack, prop].join('.')
      const strRaw = value.replace(/^['"`]/, '').replace(/['"`],?$/, '').trim()
      keys[fullPath] = strRaw
    } else if (value.startsWith('{{')) {
      const fullPath = [...stack, prop].join('.')
      keys[fullPath] = value
    } else {
      const fullPath = [...stack, prop].join('.')
      keys[fullPath] = value.replace(/,$/, '')
    }
  }
  return keys
}

// Parse FR: only explicitly overridden keys (skip spreads)
function parseFR(code) {
  const keys = new Set()
  const lines = code.split('\n')
  const stack = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) continue
    if (trimmed === '}' || trimmed === '},' || trimmed === '],') {
      if (stack.length > 0) stack.pop()
      continue
    }
    const valMatch = trimmed.match(/^(\w+):\s*(.+?)(?:,\s*)?$/)
    if (!valMatch) continue
    const prop = valMatch[1]
    const value = valMatch[2].trim()

    if (value.startsWith('...')) continue // skip spread - falls back to EN
    if (value === '{') {
      stack.push(prop)
    } else if (value.startsWith("'") || value.startsWith('"') || value.startsWith('`') || value.startsWith('{{')) {
      const fullPath = [...stack, prop].join('.')
      keys.add(fullPath)
    } else {
      const fullPath = [...stack, prop].join('.')
      keys.add(fullPath)
    }
  }
  return keys
}

const enKeys = parseEN(enCode.replace('export const en = ', '').replace(/^\{/, '').replace(/\}$/, ''))
const frKeys = parseFR(frCode.replace('export const fr = ', '').replace(/^\{/, '').replace(/\}$/, ''))

// Group EN keys by top-level section
const sections = {}
for (const [path, val] of Object.entries(enKeys)) {
  const top = path.split('.')[0]
  if (!sections[top]) sections[top] = {}
  sections[top][path] = val
}

// For each section, find missing keys (in EN but not overridden in FR)
console.log('=== MISSING KEYS IN FR (falling back to EN via ...en spread) ===\n')

let totalMissing = 0
for (const [section, keys] of Object.entries(sections).sort()) {
  const missing = Object.keys(keys).filter(k => !frKeys.has(k))
  if (missing.length === 0) continue

  totalMissing += missing.length
  console.log(`\n## ${section} (${missing.length}/${Object.keys(keys).length} keys missing)\n`)

  // Show missing keys with their EN values
  for (const path of missing) {
    const val = keys[path]
    // Truncate long values
    const displayVal = val.length > 80 ? val.substring(0, 77) + '...' : val
    console.log(`  - ${path}: "${displayVal}"`)
  }
}

console.log(`\n\n=== TOTAL: ${totalMissing} keys missing in FR ===`)
