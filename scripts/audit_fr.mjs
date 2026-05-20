import { readFileSync } from 'fs'

const enCode = readFileSync('src/i18n/resources/en.ts', 'utf8')
const frCode = readFileSync('src/i18n/resources/fr.ts', 'utf8')

// EN: parse all leaf keys
function parseEN(code) {
  const keys = {}
  const lines = code.split('\n')
  const stack = []
  let inObj = false

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*'))
      continue
    if (trimmed === '}' || trimmed === '},' || trimmed === '],') {
      if (stack.length > 0) stack.pop()
      continue
    }

    // Match property: value
    const valMatch = trimmed.match(/^(\w+):\s*(.+?)(?:,\s*)?$/)
    if (!valMatch) continue

    const prop = valMatch[1]
    const value = valMatch[2].trim()

    if (value === '{') {
      stack.push(prop)
    } else if (value.startsWith("'") || value.startsWith('"') || value.startsWith('`')) {
      const fullPath = [...stack, prop].join('.')
      // Extract the actual string value
      const strRaw = value.replace(/^['"`]/, '').replace(/['"`],?$/, '').trim()
      keys[fullPath] = strRaw
    } else if (value.startsWith('{{') || value === '{') {
      stack.push(prop)
    } else if (value.startsWith('...')) {
      // spread - skip
    } else {
      const fullPath = [...stack, prop].join('.')
      // Might be a number or boolean
      keys[fullPath] = value.replace(/,$/, '')
    }
  }
  return keys
}

// FR: parse overriding keys (those explicitly defined, not via ...en spread)
function parseFR(code) {
  const keys = {}
  const lines = code.split('\n')
  const stack = []
  let inObj = false

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*'))
      continue
    if (trimmed === '}' || trimmed === '},' || trimmed === '],') {
      if (stack.length > 0) stack.pop()
      continue
    }

    // Match property: value
    const valMatch = trimmed.match(/^(\w+):\s*(.+?)(?:,\s*)?$/)
    if (!valMatch) continue

    const prop = valMatch[1]
    const value = valMatch[2].trim()

    if (value.startsWith('...')) continue // skip spread (falls back to EN)

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

// Parse EN - need to handle export const en = { ... } wrapper
const enKeys = parseEN(enCode.replace('export const en = ', '').replace(/^\{/, '').replace(/\}$/, ''))
const frOverrides = parseFR(frCode.replace('export const fr = ', '').replace(/^\{/, '').replace(/\}$/, ''))

console.log('=== EN Keys ===')
console.log(`Total EN leaf keys: ${Object.keys(enKeys).length}`)
console.log(`\n=== FR Overrides ===`)
console.log(`Total FR explicit overrides: ${Object.keys(frOverrides).length}`)

// Find keys missing from FR (those that fall back to EN via ...en spread)
const allENPaths = Object.keys(enKeys)
const frDefinedPaths = new Set(Object.keys(frOverrides))

// Top-level keys
const enTopKeys = new Set(allENPaths.map(p => p.split('.')[0]))
const frTopKeys = new Set([...frDefinedPaths].map(p => p.split('.')[0]))
const missingTopKeys = [...enTopKeys].filter(k => !frTopKeys.has(k))
console.log(`\n=== Top-level keys NOT overridden in FR (falling back to EN) ===`)
missingTopKeys.forEach(k => console.log(`  - ${k} (${Object.entries(enKeys).filter(([path]) => path.startsWith(k+'.')).length} keys)`))

// Find identical EN=FR values in overridden keys
const identical = []
for (const [path, frVal] of Object.entries(frOverrides)) {
  const enVal = enKeys[path]
  if (enVal !== undefined && enVal === frVal && frVal !== '') {
    identical.push({ path, value: frVal })
  }
}

console.log(`\n=== Identical EN=FR overrides (${identical.length}) ===`)
identical.forEach(({ path, value }) => console.log(`  - ${path}: "${value}"`))

// Show key count comparison for overridden top-level sections
console.log(`\n=== Key count per section (EN vs FR overrides) ===`)
for (const topKey of [...enTopKeys].sort()) {
  const enCount = allENPaths.filter(p => p.startsWith(topKey+'.')).length
  const frCount = [...frDefinedPaths].filter(p => p.startsWith(topKey+'.')).length
  const status = frCount === 0 ? '⚠️  MISSING' : frCount < enCount ? `⚠️  ${frCount}/${enCount}` : `${frCount}/${enCount}`
  console.log(`  ${topKey}: EN=${enCount}, FR= ${status}`)
}

// Also check for FR-only keys (typos)
const frOnly = [...frDefinedPaths].filter(p => !enKeys[p])
if (frOnly.length > 0) {
  console.log(`\n⚠️ FR-only keys (possible typos): ${frOnly.length}`)
  frOnly.forEach(p => console.log(`  - ${p}: "${frOverrides[p]}"`))
}
