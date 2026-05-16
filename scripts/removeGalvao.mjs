/**
 * Script to remove all Andre Galvao video references from videoReferences.ts
 * and report which skill IDs lose coverage.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const filePath = resolve('src/data/videos/videoReferences.ts')
const content = readFileSync(filePath, 'utf-8')

// Strategy: Parse the array entries by tracking brace depth
// We need to find each object entry that has channelName: "Andre Galvao"
// and remove it from the array.

const lines = content.split('\n')
const resultLines = []
let braceDepth = 0
let currentEntryLines = []
let inTargetEntry = false
let entryStartCollecting = false
let entriesRemoved = 0
let affectedSkills = new Set()
const entryIdsRemoved = []

// We'll work at the array element level.
// The videoReferences array is: export const videoReferences: VideoReference[] = [
// Each entry starts with { and ends with },
// We need to identify entries containing "Andre Galvao" and skip them.

let arrayStarted = false
let arrayEnded = false

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  const trimmed = line.trim()

  // Detect start of the array
  if (trimmed === "export const videoReferences: VideoReference[] = [" || 
      trimmed.startsWith("export const videoReferences")) {
    arrayStarted = true
    resultLines.push(line)
    continue
  }

  if (!arrayStarted || arrayEnded) {
    resultLines.push(line)
    continue
  }

  // End of array
  if (trimmed === ']') {
    arrayEnded = true
    resultLines.push(line)
    continue
  }

  // Track brace depth within an entry
  for (const ch of line) {
    if (ch === '{') braceDepth++
    if (ch === '}') braceDepth--
  }

  currentEntryLines.push(line)

  // When we close an entry (braceDepth goes back to the array level)
  if (braceDepth === 0 && currentEntryLines.length > 0) {
    const entryText = currentEntryLines.join('\n')
    
    if (entryText.includes('Andre Galvao') && entryText.includes('channelName:')) {
      // Extract the ID and relatedSkillIds for reporting
      const idMatch = entryText.match(/id:\s*["']([^"']+)["']/)
      const skillMatch = entryText.match(/relatedSkillIds:\s*\[([^\]]+)\]/)
      if (idMatch) entryIdsRemoved.push(idMatch[1])
      if (skillMatch) {
        skillMatch[1].split(',').forEach(s => {
          const skillId = s.trim().replace(/["']/g, '')
          if (skillId) affectedSkills.add(skillId)
        })
      }
      entriesRemoved++
    } else {
      resultLines.push(...currentEntryLines)
    }
    currentEntryLines = []
  }
}

// Write the cleaned file
const output = resultLines.join('\n')
writeFileSync(filePath, output, 'utf-8')

console.log('=== REMOVAL REPORT ===')
console.log(`Entries removed: ${entriesRemoved}`)
console.log(`Entry IDs removed:`)
entryIdsRemoved.forEach(id => console.log(`  - ${id}`))
console.log(`\nAffected skills (need replacement):`)
affectedSkills.forEach(skill => console.log(`  - ${skill}`))
console.log(`\nTotal unique skills affected: ${affectedSkills.size}`)
