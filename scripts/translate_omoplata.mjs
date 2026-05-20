import fs from 'fs';

// Load existing translations from all translated files
const sources = [
  'src/data/microDetailSystems.ts',
  'src/data/qualityChecklists.ts',
  'src/data/blackbeltDetails.ts',
  'src/data/generatedBodyToBodyDetails.ts',
  'src/data/microDetailSystems_armbar_triangle.ts',
  'src/data/masteryStages.ts',
];

const fullMap = {};
for (const path of sources) {
  const c = fs.readFileSync(path, 'utf8');
  const regex = /lt\('([^']*)'\s*,\s*'([^']*)'/g;
  let m;
  while ((m = regex.exec(c)) !== null) {
    if (m[1] !== m[2] && m[1] !== '' && m[2] !== '') {
      fullMap[m[2]] = m[1];
    }
  }
}
console.log(`Loaded ${Object.keys(fullMap).length} existing translations`);

// Complete EN→VI mapping
const enToVi = {
  ...fullMap,

  // New translations for omoplata-specific cues
  'Hips out.': 'Hông ra.',
  'No post.': 'Không post.',
  'Outside angle.': 'Góc ngoài.',
  'Shin high.': 'Shin cao.',
  'Square.': 'Square.',
  'Tap or sweep.': 'Tap hoặc sweep.',
  'Wrist, angle, sit tall, slow hips.': 'Cổ tay, góc, ngồi cao, hông chậm.',
};

// Apply to file
let c = fs.readFileSync('src/data/microDetailSystems_omoplata.ts', 'utf8');
let count = 0;

for (const [en, vi] of Object.entries(enToVi)) {
  if (en === vi) continue;
  const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`lt\\('${escaped}'`, 'g');
  const newC = c.replace(regex, `lt('${vi}'`);
  if (newC !== c) {
    count += ((c.match(regex) || []).length);
    c = newC;
  }
}

fs.writeFileSync('src/data/microDetailSystems_omoplata.ts', c, 'utf8');
console.log(`Applied ${count} translations.`);
