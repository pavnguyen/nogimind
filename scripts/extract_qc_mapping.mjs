import fs from 'fs';

// Extract all EN→VI translations from qualityChecklists.ts
const c = fs.readFileSync('src/data/qualityChecklists.ts', 'utf8');
const matches = [...c.matchAll(/lt\('([^']*)'\s*,\s*'([^']*)'/g)];

const mapping = {};
let reuseCount = 0;
let skipCount = 0;

for (const m of matches) {
  const vi = m[1];
  const en = m[2];
  if (vi !== en && vi !== '' && en !== '') {
    mapping[en] = vi;
    reuseCount++;
  } else if (vi === en && vi !== '') {
    skipCount++;
  }
}

console.log(`Extracted ${reuseCount} EN→VI mappings from qualityChecklists.ts`);
console.log(`(Skipped ${skipCount} identical entries)`);

// Save as JSON for reuse
fs.writeFileSync('scripts/qc_mapping.json', JSON.stringify(mapping, null, 2));
console.log('Saved to scripts/qc_mapping.json');

// Show overlap with microDetailSystems identical entries
const mc = fs.readFileSync('src/data/microDetailSystems.ts', 'utf8');
const mMatches = [...mc.matchAll(/lt\('([^']*)'\s*,\s*'([^']*)'/g)];
const idMatches = mMatches.filter(x => x[1] === x[2] && x[1] !== '');
const uniquePhrases = [...new Set(idMatches.map(x => x[1]))].sort();

let found = 0;
let notFound = 0;
for (const phrase of uniquePhrases) {
  if (mapping[phrase]) {
    found++;
  } else {
    notFound++;
  }
}
console.log(`\nOverlap with microDetailSystems.ts:`);
console.log(`  Found in qualityChecklists: ${found}`);
console.log(`  NOT found (need new translations): ${notFound}`);
console.log();

// Show the phrases that need new translations
console.log('Phrases needing new translations:');
for (const phrase of uniquePhrases) {
  if (!mapping[phrase]) {
    console.log(`  "${phrase}"`);
  }
}
