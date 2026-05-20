import fs from 'fs'

function extractKeys(code) {
  const keys = new Set()
  // Find the start of the actual object (after 'export const X = {')
  const objStartMarker = code.match(/export\s+const\s+\w+\s*=\s*\{/)
  if (!objStartMarker) return keys
  const startBrace = objStartMarker.index + objStartMarker[0].length - 1 // position of the '{'
  const endBrace = code.lastIndexOf('}')
  if (startBrace < 0 || endBrace < 0) return keys

  const objContent = code.substring(startBrace + 1, endBrace)

  function walk(text, path) {
    let i = 0
    while (i < text.length) {
      const ch = text[i]
      if (ch === ' ' || ch === '\n' || ch === '\t' || ch === '\r') { i++; continue }
      if (ch === '/' && text[i+1] === '/') { while (i < text.length && text[i] !== '\n') i++; continue }
      if (ch === '/' && text[i+1] === '*') { i += 2; while (i < text.length && !(text[i] === '*' && text[i+1] === '/')) i++; i += 2; continue }
      if (ch === '}' || ch === ')' || ch === ']') break

      const keyMatch = text.slice(i).match(/^(\w+)\s*:\s*/)
      if (!keyMatch) { i++; continue }

      const keyName = keyMatch[1]
      i += keyMatch[0].length
      const fullPath = path ? path + '.' + keyName : keyName

      // Skip spread operators
      if (text.slice(i).match(/^\.\.\./)) {
        const spreadMatch = text.slice(i).match(/^\.\.\.[^,}]+[,}]?/)
        if (spreadMatch) i += spreadMatch[0].length
        continue
      }

      // Check if value is a template literal starting with backtick
      const trimmedRest = text.slice(i).trimStart()
      if (trimmedRest[0] === '`') {
        keys.add(fullPath)
        // Find closing backtick
        let j = 1
        while (j < trimmedRest.length) {
          if (trimmedRest[j] === '`' && trimmedRest[j-1] !== '\\') { j++; break }
          if (trimmedRest[j] === '$' && trimmedRest[j+1] === '{') {
            // Skip template expression
            let depth = 1
            j += 2
            while (j < trimmedRest.length && depth > 0) {
              if (trimmedRest[j] === '{') depth++
              else if (trimmedRest[j] === '}') depth--
              j++
            }
          }
          j++
        }
        i += 1 + j
        // skip comma
        while (i < text.length && (text[i] === ',' || text[i] === ' ' || text[i] === '\n')) i++
        continue
      }

      if (trimmedRest[0] === '{') {
        let depth = 1
        let j = 1
        while (j < trimmedRest.length && depth > 0) {
          if (trimmedRest[j] === '{') depth++
          else if (trimmedRest[j] === '}') depth--
          if (depth > 0) j++
        }
        const innerContent = trimmedRest.substring(1, j)
        walk(innerContent, fullPath)
        i += 1 + j
      } else {
        // Leaf value (string with ' or ")
        keys.add(fullPath)
        while (i < text.length && text[i] !== ',' && text[i] !== '}' && text[i] !== ')') i++
        if (text[i] === ',') i++
      }
    }
  }

  walk(objContent, '')
  return keys
}

const viContent = fs.readFileSync('src/i18n/resources/vi.ts', 'utf8')
const enContent = fs.readFileSync('src/i18n/resources/en.ts', 'utf8')

const viKeys = extractKeys(viContent)
const enKeys = extractKeys(enContent)

console.log('EN keys:', enKeys.size)
console.log('VI keys:', viKeys.size)
console.log('Diff:', viKeys.size - enKeys.size >= 0 ? '+' + (viKeys.size - enKeys.size) : (viKeys.size - enKeys.size))

const onlyInVI = [...viKeys].filter(k => !enKeys.has(k)).sort()
const onlyInEN = [...enKeys].filter(k => !viKeys.has(k)).sort()

console.log('\n--- Only in VI (not in EN): ' + onlyInVI.length + ' ---')
if (onlyInVI.length === 0) console.log('  (none)')
onlyInVI.forEach(k => console.log('  ' + k))

console.log('\n--- Only in EN (not in VI): ' + onlyInEN.length + ' ---')
if (onlyInEN.length === 0) console.log('  (none)')
onlyInEN.forEach(k => console.log('  ' + k))

// Summary
if (onlyInVI.length === 0 && onlyInEN.length === 0) {
  console.log('\n✅ BALANCED: EN and VI have the same keys.')
} else {
  console.log('\n⚠️  IMBALANCE: ' + onlyInVI.length + ' VI-only keys, ' + onlyInEN.length + ' EN-only keys.')
}
