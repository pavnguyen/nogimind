import fs from 'fs';

const path = 'src/data/videos/videoReferences.ts';
let content = fs.readFileSync(path, 'utf8');

// Find all video objects
const blocklist = [
  'KD Grappling | Kieran Davern',
  'Juanjo BJJ Tecnicas y Drills',
  'Energia Martial Arts',
  'rashadmoves',
  'John Connors, Old Man BJJ Black Belt'
];

const objRegex = /\{\s*"id":\s*"[^"]+",[\s\S]*?(?=\},\s*\{|\}\s*\])/g;

let match;
let newContent = content;
let removedCount = 0;

while ((match = objRegex.exec(content)) !== null) {
  const block = match[0];
  let remove = false;
  for (const channel of blocklist) {
    if (block.includes('"channelName": "' + channel + '"')) {
      remove = true;
      break;
    }
  }
  
  if (remove) {
    // try to remove the block and the trailing comma if it exists
    const blockWithComma = block + '},';
    if (newContent.includes(blockWithComma)) {
      newContent = newContent.replace(blockWithComma, '');
    } else {
      newContent = newContent.replace(block + '}', '');
    }
    removedCount++;
  }
}

// Clean up any double commas or trailing commas before the closing bracket
newContent = newContent.replace(/,\s*,/g, ',');
newContent = newContent.replace(/,\s*\]/g, '\n]');

fs.writeFileSync(path, newContent);
console.log(`Removed ${removedCount} low-quality videos.`);
