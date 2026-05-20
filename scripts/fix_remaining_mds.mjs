import { readFileSync, writeFileSync } from 'fs'

const path = 'src/data/microDetailSystems.ts'
let content = readFileSync(path, 'utf8')

const replacements = [
  // 1. Stabilize side control. → Ổn định side control.
  { from: "lt('Stabilize side control.', 'Stabilize side control.', 'Stabilisez le side control.')", to: "lt('Ổn định side control.', 'Stabilize side control.', 'Stabilisez le side control.')" },
  // 2. Stabilize. → Ổn định.
  { from: "cue: lt('Stabilize.', 'Stabilize.', 'Stabilisez.')", to: "cue: lt('Ổn định.', 'Stabilize.', 'Stabilisez.')" },
  // 3. Branch, don't force. (2x) → Branch, đừng ép.
  { from: "lt('Branch, don\u2019t force.', 'Branch, don\u2019t force.', 'Branchez, ne forcez pas.')", to: "lt('Branch, đừng ép.', 'Branch, don\u2019t force.', 'Branchez, ne forcez pas.')" },
  // 4. Branch. → Branch. (keep English)
  // No change needed
  // 5. Staple. → Staple. (keep English)  
  // No change needed
  // 6. Hip bump swing → Hip bump swing (keep English)
  // No change needed
]

let count = 0
for (const { from, to } of replacements) {
  const occurrences = (content.match(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length
  if (occurrences > 0) {
    content = content.replaceAll(from, to)
    count += occurrences
    console.log(`Replaced ${occurrences}x: ${from.substring(0, 60)}...`)
  } else {
    console.log(`NOT FOUND: ${from.substring(0, 60)}...`)
  }
}

console.log(`\nTotal replacements: ${count}`)

// Verify remaining identical
const matches = [...content.matchAll(/lt\('([^']*)'\s*,\s*'([^']*)'/g)]
const identical = matches.filter(m => m[1] === m[2] && m[1] !== '')
console.log(`Remaining identical: ${identical.length}`)
if (identical.length > 0) {
  identical.forEach(m => console.log(`  - [${m[1]}]`))
}

writeFileSync(path, content, 'utf8')
console.log('File saved.')
