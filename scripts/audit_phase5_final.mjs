import fs from 'fs'
import path from 'path'

const dataDir = 'src/data'

function findFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...findFiles(fullPath))
    else if (entry.name.endsWith('.ts')) files.push(fullPath)
  }
  return files
}

const dataFiles = findFiles(dataDir).filter(f => {
  const content = fs.readFileSync(f, 'utf8')
  return content.includes('lt(')
}).sort()

console.log('='.repeat(70))
console.log('📊 PHASE 5 — VI TRANSLATION COVERAGE AUDIT (FINAL)')
console.log('='.repeat(70))

let totalCalls = 0
let totalTranslated = 0
let totalIdentical = 0
const fileResults = []

for (const file of dataFiles) {
  const content = fs.readFileSync(file, 'utf8')
  const shortName = file.replace(dataDir + '/', '')
  const regex = /lt\('([^']*)'\s*,\s*'([^']*)'/g
  const matches = [...content.matchAll(regex)]
  const total = matches.length
  const identical = matches.filter(m => m[1] === m[2] && m[1] !== '').length
  const translated = total - identical

  totalCalls += total
  totalTranslated += translated
  totalIdentical += identical

  const pct = total > 0 ? (translated / total * 100).toFixed(1) : '100.0'
  fileResults.push({ shortName, total, identical, translated, pct })

  if (identical > 0) {
    const uniqueIdentical = [...new Set(matches.filter(m => m[1] === m[2] && m[1] !== '').map(m => m[1]))]
    console.log(`\n  ${shortName}: ${total} lt() — ${identical} identical (${pct}%)`)
    uniqueIdentical.slice(0, 15).forEach(e => console.log(`    - [${e}]`))
    if (uniqueIdentical.length > 15) console.log(`    ... and ${uniqueIdentical.length - 15} more`)
  }
}

console.log('\n' + '='.repeat(70))
console.log('📈 SUMMARY')
console.log('='.repeat(70))
console.log(`  Total lt() calls: ${totalCalls}`)
console.log(`  Translated:       ${totalTranslated}`)
console.log(`  Identical:        ${totalIdentical}`)
console.log(`  Coverage:         ${(totalTranslated / totalCalls * 100).toFixed(1)}%`)

console.log('\n' + '='.repeat(70))
console.log('📋 PER-FILE BREAKDOWN')
console.log('='.repeat(70))

fileResults.sort((a, b) => parseFloat(a.pct) - parseFloat(b.pct))

console.log(`  ${'File'.padEnd(45)} ${'Total'.padEnd(6)} ${'Ident'.padEnd(6)} ${'Coverage'.padEnd(8)}`)
console.log('  ' + '-'.repeat(65))
for (const r of fileResults) {
  const status = r.identical === 0 ? '✅' : r.identical <= 5 ? '🟢' : r.identical <= 20 ? '🟡' : '🔴'
  console.log(`  ${status} ${r.shortName.padEnd(43)} ${String(r.total).padEnd(6)} ${String(r.identical).padEnd(6)} ${r.pct}%`)
}

console.log('\n' + '='.repeat(70))
console.log('🏁 FILES AT 100%')
console.log('='.repeat(70))
const done = fileResults.filter(r => r.identical === 0)
done.forEach(r => console.log(`  ✅ ${r.shortName}`))
console.log(`\n  ${done.length}/${fileResults.length} files fully translated`)

console.log('\n' + '='.repeat(70))
console.log('🔍 FILES NOT YET 100%')
console.log('='.repeat(70))
const remaining = fileResults.filter(r => r.identical > 0)
if (remaining.length === 0) {
  console.log('  🎉 All files are at 100%!')
} else {
  for (const r of remaining) {
    console.log(`  ⚠️  ${r.shortName}: ${r.identical} identical (${r.pct}%)`)
  }
}

console.log('\n' + '='.repeat(70))
console.log('📝 ALL REMAINING IDENTICAL ENTRIES')
console.log('='.repeat(70))

const allRemainingIdentical = []
for (const file of dataFiles) {
  const content = fs.readFileSync(file, 'utf8')
  const shortName = file.replace(dataDir + '/', '')
  const regex = /lt\('([^']*)'\s*,\s*'([^']*)'/g
  const matches = [...content.matchAll(regex)]
  const identical = matches.filter(m => m[1] === m[2] && m[1] !== '')
  for (const m of identical) allRemainingIdentical.push({ file: shortName, text: m[1] })
}

const grouped = {}
for (const item of allRemainingIdentical) {
  if (!grouped[item.text]) grouped[item.text] = []
  grouped[item.text].push(item.file)
}

const sortedEntries = Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]))
if (sortedEntries.length === 0) {
  console.log('  🎉 No remaining identical entries!')
} else {
  for (const [text, files] of sortedEntries) {
    const uniqueFiles = [...new Set(files)]
    console.log(`  [${text}] (${uniqueFiles.length} file(s))`)
    uniqueFiles.forEach(f => console.log(`    - ${f}`))
  }
  console.log(`\n  Total unique identical phrases: ${sortedEntries.length}`)
}

console.log('\n' + '='.repeat(70))
console.log('🌐 i18n RESOURCES CHECK')
console.log('='.repeat(70))

const enPath = 'src/i18n/resources/en.ts'
const viPath = 'src/i18n/resources/vi.ts'

if (fs.existsSync(enPath) && fs.existsSync(viPath)) {
  function countLeafStrings(code) {
    const strMatches = code.match(/'([^']*)'/g)
    return strMatches ? strMatches.length : 0
  }
  const enStrings = countLeafStrings(fs.readFileSync(enPath, 'utf8'))
  const viStrings = countLeafStrings(fs.readFileSync(viPath, 'utf8'))
  console.log(`  EN strings: ${enStrings}`)
  console.log(`  VI strings: ${viStrings}`)
  const diff = viStrings - enStrings
  console.log(`  Diff: ${diff >= 0 ? '+' : ''}${diff}`)
}

console.log('\n✅ Done.')
