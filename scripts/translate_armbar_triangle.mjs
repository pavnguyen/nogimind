import fs from 'fs';

// Load existing translations from qualityChecklists.ts and microDetailSystems.ts
const qc = fs.readFileSync('src/data/qualityChecklists.ts', 'utf8');
const mds = fs.readFileSync('src/data/microDetailSystems.ts', 'utf8');

const regex = /lt\('([^']*)'\s*,\s*'([^']*)'/g;
const existingMap = {};
for (const c of [qc, mds]) {
  let m;
  while ((m = regex.exec(c)) !== null) {
    if (m[1] !== m[2] && m[1] !== '' && m[2] !== '') {
      existingMap[m[2]] = m[1];
    }
  }
}
console.log(`Loaded ${Object.keys(existingMap).length} existing translations`);

// EN → VI mapping for all 30 unique phrases
const enToVi = {
  ...existingMap,

  'Angle before squeeze.': 'Góc trước squeeze.',
  'Angle first.': 'Góc trước.',
  'Both legs own posture.': 'Cả hai chân kiểm soát posture.',
  'Elbow on hip line.': 'Khuỷu trên đường hông.',
  'Foot exposed.': 'Chân lộ.',
  'Head down.': 'Đầu xuống.',
  'Hide foot.': 'Giấu chân.',
  'Hip angle.': 'Góc hông.',
  'Hips to shoulder.': 'Hông lên vai.',
  'Knee first.': 'Gối trước.',
  'Knee near ear.': 'Gối gần tai.',
  "Knee, thumb, hips, slow lift.": 'Gối, ngón cái, hông, nhấc chậm.',
  'Knees, not neck.': 'Gối, không phải cổ.',
  'Lock protected.': 'Lock được bảo vệ.',
  'No elbow space.': 'Không khoảng trống khuỷu.',
  'One shoulder out.': 'Một vai ra ngoài.',
  'Own wrist.': 'Cổ tay của mình.',
  'Pinch, then lift.': 'Kẹp, rồi nhấc.',
  'Posture blocked.': 'Posture bị chặn.',
  'Posture broken.': 'Posture bị phá.',
  'Posture down.': 'Posture xuống.',
  'Posture first.': 'Posture trước.',
  'Shoulder split, posture, angle.': 'Vai tách, posture, góc.',
  'Shoulder split.': 'Vai tách.',
  'Shoulder trapped.': 'Vai bị giữ.',
  'Small squeeze.': 'Squeeze nhẹ.',
  'Square.': 'Square.',
  'Tap before spike.': 'Tap trước spike.',
  'Thumb first.': 'Ngón cái trước.',
  'Thumb up before hips.': 'Ngón cái lên trước hông.',
};

// Apply to microDetailSystems_armbar_triangle.ts
let c = fs.readFileSync('src/data/microDetailSystems_armbar_triangle.ts', 'utf8');
let count = 0;
let skipped = 0;

for (const [en, vi] of Object.entries(enToVi)) {
  if (en === vi) {
    skipped++;
    continue;
  }
  // Build regex: lt('en', 'en', ...) → lt('vi', 'en', ...)
  const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(lt\\()('${escaped}')`, 'g');
  const newC = c.replace(regex, (match, p1, p2) => {
    count++;
    return `lt('${vi}'`;
  });
  if (newC !== c) {
    c = newC;
  } else {
    // Try matching 'en' as second parameter: lt('fr', 'en', ...)
    const regex2 = new RegExp(`(,\\s*)('${escaped}')`, 'g');
    const newC2 = c.replace(regex2, (match, p1, p2) => {
      count++;
      // Don't replace - these are French params, we want VI
      return match;
    });
    // No change needed for second param - we only replace first param
  }
}

fs.writeFileSync('src/data/microDetailSystems_armbar_triangle.ts', c, 'utf8');
console.log(`\nApplied ${count} translations. Skipped ${skipped} identity mappings.`);
