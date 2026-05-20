import { readFileSync } from 'fs'

const enRaw = readFileSync('src/i18n/resources/en.ts', 'utf8')
const frRaw = readFileSync('src/i18n/resources/fr.ts', 'utf8')

// Parse { key: 'value' } pairs from code
function parsePairs(code, basePath = '') {
  const lines = code.split('\n')
  const result = {}
  const stack = [{ obj: result, path: basePath }]
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const t = line.trim()
    if (!t || t.startsWith('//') || t.startsWith('*') || t.startsWith('import') || t.startsWith('export')) continue
    if (t === '}' || t === '},' || t === '};') {
      if (stack.length > 1) stack.pop()
      continue
    }
    if (t.startsWith('...')) continue
    
    // Object start: key: {
    const objMatch = t.match(/^(\w+):\s*\{/)
    if (objMatch) {
      const key = objMatch[1]
      const cur = stack[stack.length - 1]
      const newPath = cur.path ? cur.path + '.' + key : key
      cur.obj[key] = {}
      stack.push({ obj: cur.obj[key], path: newPath })
      continue
    }
    
    // String value: key: 'value'
    // Handle single-line strings with possible escaped quotes
    const valMatch = t.match(/^(\w+):\s*'((?:[^'\\]|\\.)*)'\s*,?$/)
    if (valMatch) {
      const cur = stack[stack.length - 1]
      const path = cur.path ? cur.path + '.' + valMatch[1] : valMatch[1]
      result[path] = valMatch[2]
    }
  }
  return result
}

// Remove export / import prefix stuff
const enClean = enRaw.replace(/^export const en = /m, '').replace(/;?\s*$/, '')
let frClean = frRaw.replace(/^import .+$/m, '').replace(/^export const fr = /m, '').replace(/;?\s*$/, '')

const enVals = parsePairs(enClean)
const frVals = parsePairs(frClean)

console.log('EN string pairs:', Object.keys(enVals).length)
console.log('FR string pairs:', Object.keys(frVals).length)

const identical = []
for (const [path, frVal] of Object.entries(frVals)) {
  if (path.includes('...')) continue
  const enVal = enVals[path]
  if (enVal !== undefined && frVal === enVal && frVal !== '') {
    identical.push({ path, val: enVal })
  }
}

console.log('\n=== Identical EN=FR overrides:', identical.length, 'entries ===\n')

// Group by section
const groups = {}
for (const item of identical) {
  const section = item.path.split('.')[0]
  if (!groups[section]) groups[section] = []
  groups[section].push(item)
}

for (const [section, items] of Object.entries(groups).sort()) {
  console.log(`\n--- ${section} (${items.length}) ---`)
  for (const item of items) {
    console.log(`  ${item.path}: "${item.val}"`)
  }
}
