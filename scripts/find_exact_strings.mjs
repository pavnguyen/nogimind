import fs from 'fs';
const c = fs.readFileSync('src/data/blackbeltDetails.ts', 'utf8');
const lines = c.split('\n');

const lookFor = ['Arm across centerline', 'Hips lift', 'Arm across, head blocks elbow'];

for (let i = 0; i < lines.length; i++) {
  for (const term of lookFor) {
    if (lines[i].includes(`lt('${term}`)) {
      console.log(`Line ${i+1} (${term}):`);
      // Find the full lt() call
      const line = lines[i];
      const startIdx = line.indexOf(`lt('${term}`);
      if (startIdx >= 0) {
        const before = line.substring(0, startIdx);
        const after = line.substring(startIdx);
        // Extract up to the closing ')'
        let depth = 0;
        let endIdx = 0;
        for (let j = 0; j < after.length; j++) {
          if (after[j] === '(') depth++;
          if (after[j] === ')') {
            depth--;
            if (depth === 0) { endIdx = j + 1; break; }
          }
        }
        const fullCall = after.substring(0, endIdx);
        console.log('  EXACT:', JSON.stringify(fullCall));
      }
    }
  }
}
