import fs from 'fs';
import path from 'path';

const allDataFiles = [
  // i18n resources
  'src/i18n/resources/vi.ts',
  // Data files
  'src/data/concepts.ts',
  'src/data/positions.ts',
  'src/data/defensiveLayers.ts',
  'src/data/trainingMethods.ts',
  'src/data/qualityChecklists.ts',
  'src/data/technicalDetails.ts',
  'src/data/blackbeltDetails.ts',
  'src/data/generatedBodyToBodyDetails.ts',
  'src/data/generatedBlackbeltDetails.ts',
  'src/data/sharedKnowledge.ts',
  'src/data/masteryStages.ts',
  'src/data/archetypes.ts',
  'src/data/glossaryTerms.ts',
  'src/data/domains.ts',
  'src/data/skillBuilder.ts',
  'src/data/microDetailSystems.ts',
  'src/data/microDetailSystems_priority.ts',
  'src/data/microDetailSystems_armbar_triangle.ts',
  'src/data/microDetailSystems_omoplata.ts',
  'src/data/remainingCoverage.ts',
  'src/data/modernExpansionSkills.ts',
  'src/data/skillNodes.ts',
  'src/data/techniqueStateMachines.ts',
];

function analyzeFile(filePath) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) return null;
  const content = fs.readFileSync(fullPath, 'utf8');
  const matches = [...content.matchAll(/lt\('([^']*)'\s*,\s*'([^']*)'/g)];
  if (matches.length === 0) return null;
  const identical = matches.filter(m => m[1] === m[2] && m[1] !== '');
  const translated = matches.filter(m => m[1] !== m[2]);
  const pct = ((translated.length / matches.length) * 100).toFixed(1);
  return { file: filePath.replace('src/data/', '').replace('src/i18n/resources/', ''), total: matches.length, identical: identical.length, translated: translated.length, pct };
}

console.log('=' . repeat(80));
console.log('  PHASE 4 — VIETNAMESE TRANSLATION COVERAGE AUDIT');
console.log('=' . repeat(80));
console.log();

const results = [];
for (const f of allDataFiles) {
  const r = analyzeFile(f);
  if (r) results.push(r);
}

// Sort by coverage ascending
results.sort((a, b) => parseFloat(a.pct) - parseFloat(b.pct));

console.log('  SORTED BY COVERAGE (lowest first):');
console.log();

let totalEntries = 0, totalIdentical = 0, totalTranslated = 0;

for (const r of results) {
  totalEntries += r.total;
  totalIdentical += r.identical;
  totalTranslated += r.translated;
  const barLen = Math.round(r.translated / r.total * 20);
  const bar = '█'.repeat(barLen) + '░'.repeat(Math.max(0, 20 - barLen));
  const pctStr = String(r.pct).padStart(5) + '%';
  const idStr = String(r.identical).padStart(4);
  const trStr = String(r.translated).padStart(5);
  const totStr = String(r.total).padStart(5);
  console.log(`  ${bar}  ${pctStr}  ${idStr} iden  ${trStr}/${totStr}  ${r.file}`);
}

console.log();
console.log('—'.repeat(80));
console.log();

const overallPct = ((totalTranslated / totalEntries) * 100).toFixed(1);

// Group by coverage level
const groups = {
  '✅ DONE (100%)': results.filter(r => r.pct === '100.0'),
  '🟢 HIGH (90-99%)': results.filter(r => parseFloat(r.pct) >= 90 && parseFloat(r.pct) < 100),
  '🟡 MEDIUM (50-89%)': results.filter(r => parseFloat(r.pct) >= 50 && parseFloat(r.pct) < 90),
  '🔴 LOW (<50%)': results.filter(r => parseFloat(r.pct) < 50),
};

console.log();
console.log('  GROUP SUMMARY:');
console.log();
for (const [group, items] of Object.entries(groups)) {
  if (items.length === 0) continue;
  console.log(`  ${group}: ${items.length} files`);
  for (const item of items) {
    const flag = item.identical > 0 ? '⚠️' : '✅';
    console.log(`    ${flag} ${item.file} (${item.pct}%, ${item.identical} identical)`);
  }
  console.log();
}

console.log('—'.repeat(80));
console.log();
console.log(`  TỔNG QUAN:`);
console.log(`  • ${totalEntries} total lt() entries across ${results.length} files`);
console.log(`  • ${totalTranslated} translated (${overallPct}%)`);
console.log(`  • ${totalIdentical} identical remaining`);
console.log();

// Remaining identical breakdown
const withRemaining = results.filter(r => r.identical > 0).sort((a, b) => b.identical - a.identical);
if (withRemaining.length > 0) {
  console.log('  ⚠️ REMAINING IDENTICAL BREAKDOWN:');
  console.log();
  let sumIdentical = 0;
  for (const r of withRemaining) {
    sumIdentical += r.identical;
    console.log(`     ${String(r.identical).padStart(4)}  ${r.file}`);
  }
  console.log(`     ${'—'.repeat(6)}`);
  console.log(`     ${String(sumIdentical).padStart(4)}  TOTAL remaining`);
  console.log();

  // Categorize remaining entries
  console.log('  GROUP CLASSIFICATION:');
  console.log();
  // Known BJJ proper nouns
  const knownKept = ['concepts.ts:9', 'positions.ts:19', 'technicalDetails.ts:15', 'archetypes.ts:10', 'masteryStages.ts:10'];
  console.log('  🟢 Known BJJ terms / names (kept per policy):');
  for (const r of withRemaining) {
    const isKnown = r.file === 'concepts.ts' || r.file === 'positions.ts' || r.file === 'technicalDetails.ts' || r.file === 'archetypes.ts' || r.file === 'masteryStages.ts';
    if (isKnown) {
      console.log(`     ✅ ${r.file} (${r.identical} — BJJ proper nouns)`);
    }
  }
  console.log();
  console.log('  🔴 Needs Phase 5 translation:');
  for (const r of withRemaining) {
    const needsWork = !['concepts.ts', 'positions.ts', 'technicalDetails.ts', 'archetypes.ts', 'masteryStages.ts'].includes(r.file);
    if (needsWork) {
      console.log(`     ⚠️  ${r.file} (${r.identical} identical)`);
    }
  }
}

console.log();
console.log('=' . repeat(80));
