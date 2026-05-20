import fs from 'fs';
const c = fs.readFileSync('src/data/blackbeltDetails.ts', 'utf8');
const m = [...c.matchAll(/lt\('([^']*)'\s*,\s*'([^']*)'/g)];
const id = m.filter(x => x[1] === x[2] && x[1] !== '');
console.log('Remaining identical vi=en:', id.length);
id.forEach(x => {
  const lineNum = (c.substring(0, x.index).match(/\n/g) || []).length + 1;
  console.log('Line ' + lineNum + ': ["' + x[1] + '"]');
});
