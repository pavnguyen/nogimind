import fs from 'fs';

let c = fs.readFileSync('src/data/blackbeltDetails.ts', 'utf8');
let count = 0;

// 1. Arm across centerline
let old1 = "lt('Arm across centerline', 'Arm across centerline', 'Bras au-delà centerline')";
let new1 = "lt('Tay qua centerline', 'Arm across centerline', 'Bras au-delà centerline')";
if (c.includes(old1)) {
  c = c.replace(old1, new1);
  count++;
  console.log('✅ Fixed: Arm across centerline');
} else {
  console.log('❌ Not found: Arm across centerline');
  // Try to find it
  const idx = c.indexOf("Arm across centerline");
  if (idx >= 0) console.log('  Found at index', idx, 'context:', c.substring(Math.max(0, idx-20), idx+60));
}

// 2. Hips lift
let old2 = "lt('Hips lift', 'Hips lift', 'Hanches lèvent')";
let new2 = "lt('Nhấc hông', 'Hips lift', 'Hanches lèvent')";
if (c.includes(old2)) {
  c = c.replace(old2, new2);
  count++;
  console.log('✅ Fixed: Hips lift');
} else {
  console.log('❌ Not found: Hips lift');
  const idx = c.indexOf("Hips lift");
  if (idx >= 0) console.log('  Found at index', idx, 'context:', c.substring(Math.max(0, idx-10), idx+50));
}

// 3. Arm across, head blocks elbow
let old3 = "lt('Arm across, head blocks elbow, dismount for angle, then slow squeeze.', 'Arm across, head blocks elbow, dismount for angle, then slow squeeze.', 'Cánh tay qua, đầu chặn khuỷu, xuống ngựa tạo góc, sau đó siết chậm.')";
let new3 = "lt('Tay qua, đầu chặn khuỷu, xuống ngựa tạo góc, rồi siết chậm.', 'Arm across, head blocks elbow, dismount for angle, then slow squeeze.', 'Cánh tay qua, đầu chặn khuỷu, xuống ngựa tạo góc, sau đó siết chậm.')";
if (c.includes(old3)) {
  c = c.replace(old3, new3);
  count++;
  console.log('✅ Fixed: Arm across, head blocks...');
} else {
  console.log('❌ Not found: Arm across, head blocks...');
  const idx = c.indexOf("Arm across, head blocks elbow");
  if (idx >= 0) console.log('  Found at index', idx, 'context:', c.substring(Math.max(0, idx-5), idx+80));
}

console.log(`\nTotal replacements: ${count}`);
fs.writeFileSync('src/data/blackbeltDetails.ts', c, 'utf8');
console.log('File saved.');
