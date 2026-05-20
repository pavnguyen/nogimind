import fs from 'fs';
import path from 'path';

const dataDir = 'src/data';
const files = [
  // Core data files using lt()
  'src/i18n/resources/vi.ts',
  'src/i18n/resources/en.ts',
  'src/data/concepts.ts',
  'src/data/positions.ts',
  'src/data/defensiveLayers.ts',
  'src/data/trainingMethods.ts',
  'src/data/qualityChecklists.ts',
  'src/data/technicalDetails.ts',
  'src/data/blackbeltDetails.ts',
  'src/data/generatedBodyToBodyDetails.ts',
  'src/data/generatedBlackbeltDetails.ts',
  // Skills data
  'src/data/skills/modern.ts',
  'src/data/skills/submissions.ts',
  'src/data/skills/escapes.ts',
  'src/data/skills/guard.ts',
  'src/data/skills/passing.ts',
  'src/data/skills/legLocks.ts',
  'src/data/skills/pins.ts',
  'src/data/skills/foundation.ts',
  'src/data/skills/wrestling.ts',
  'src/data/skills/priorityNoGi.ts',
  'src/data/skills/skillSeedFactory.ts',
  'src/data/skills/skillViewModel.ts',
  // Other data
  'src/data/glossaryTerms.ts',
  'src/data/sharedKnowledge.ts',
  'src/data/masteryStages.ts',
  'src/data/domains.ts',
  'src/data/archetypes.ts',
  'src/data/technicalDetails.ts',
  'src/data/microDetailSystems.ts',
  'src/data/microDetailSystems_priority.ts',
  'src/data/microDetailSystems_armbar_triangle.ts',
  'src/data/microDetailSystems_omoplata.ts',
  'src/data/videos/videoReferences.ts',
  'src/data/videos/videoSelectors.ts',
  'src/data/videos/videoSkillMapping.ts',
  'src/data/videos/new_trusted_videos.ts',
  'src/data/videos/noGiVideoFilter.ts',
];

console.log('=' . repeat(80));
console.log('  PHASE 4 — VIETNAMESE TRANSLATION COVERAGE AUDIT');
console.log('=' . repeat(80));
console.log();

let totalEntries = 0;
let totalIdentical = 0;
let totalTranslated = 0;
const results = [];

for (const filePath of files) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) continue;

  const content = fs.readFileSync(fullPath, 'utf8');
  const matches = [...content.matchAll(/lt\('([^']*)'\s*,\s*'([^']*)'/g)];

  if (matches.length === 0) continue;

  const identical = matches.filter(m => m[1] === m[2] && m[1] !== '');
  const translated = matches.filter(m => m[1] !== m[2]);
  totalEntries += matches.length;
  totalIdentical += identical.length;
  totalTranslated += translated.length;

  const pct = ((translated.length / matches.length) * 100).toFixed(1);
  const shortName = filePath.replace('src/data/', '').replace('src/i18n/resources/', '');
  results.push({
    file: shortName,
    total: matches.length,
    identical: identical.length,
    translated: translated.length,
    pct,
  });

  const barLen = Math.round(translated.length / matches.length * 20);
  const bar = '█'.repeat(barLen) + '░'.repeat(Math.max(0, 20 - barLen));
  const pctStr = pct.padStart(5);
  const idStr = String(identical.length).padStart(4);
  const totStr = String(matches.length).padStart(5);
  console.log(`  ${bar}  ${pctStr}%  ${idStr} iden  ${totStr} total  ${shortName}`);
}

console.log();
console.log('—'.repeat(80));
console.log();

// Summary
const overallPct = ((totalTranslated / totalEntries) * 100).toFixed(1);
console.log(`  TỔNG:      ${totalEntries} entries`);
console.log(`  ĐÃ DỊCH:   ${totalTranslated}  (${overallPct}%)`);
console.log(`  IDENTICAL: ${totalIdentical}`);
console.log();

// Files with remaining identical
const remaining = results.filter(r => r.identical > 0);
if (remaining.length > 0) {
  console.log('  ⚠️  FILES CÒN IDENTICAL:');
  console.log();
  for (const r of remaining) {
    console.log(`     ${r.file}: ${r.identical} identical (${r.pct}% translated)`);
  }
  console.log();
} else {
  console.log('  ✅ Tất cả files đã kiểm tra đều có 0 identical!');
  console.log();
}

// Check remaining coverage files
const dataFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts') && !f.endsWith('.d.ts'));
const uncheckedData = dataFiles.filter(f => !files.some(x => x.includes(f)));
if (uncheckedData.length > 0) {
  console.log('  📁 Data files chưa kiểm tra (có thể không dùng lt()):');
  for (const f of uncheckedData) {
    // Quick check
    const c = fs.readFileSync(path.join(dataDir, f), 'utf8');
    const hasLt = c.includes("lt('");
    console.log(`     ${f}: ${hasLt ? '⚠️ CÓ lt()' : '— không có lt()'}`);
  }
}

// Phase 4 summary table
console.log();
console.log('—'.repeat(80));
console.log('  PHASE 4 PROGRESS SUMMARY');
console.log();
console.log('  File                                    Coverage    Identical');
console.log('  ' + '—'.repeat(55));
for (const r of results) {
  const name = r.file.padEnd(36);
  const pct = (r.pct + '%').padStart(6);
  const id = String(r.identical).padStart(4);
  console.log(`  ${name} ${pct}      ${id}`);
}
console.log();
console.log(`  TOTAL: ${totalTranslated}/${totalEntries} (${overallPct}%) — ${totalIdentical} identical remaining`);
console.log('=' . repeat(80));
