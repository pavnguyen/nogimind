import fs from 'fs';
import { newTrustedVideos } from '../src/data/videos/new_trusted_videos.ts';

const tsPath = 'src/data/videos/videoReferences.ts';
const text = fs.readFileSync(tsPath, 'utf8');

const prefixMatch = text.match(/([\s\S]*?export const videoReferences[^=]+=\s*)\[/);
if (!prefixMatch) {
  console.error("Could not find the export prefix.");
  process.exit(1);
}

const prefix = prefixMatch[1];
const startIndex = prefixMatch.index + prefix.length;
const jsonStr = text.substring(startIndex - 1);

try {
  let arr = JSON.parse(jsonStr);
  console.log(`Original count: ${arr.length}`);

  const blocklist = [
    'KD Grappling | Kieran Davern',
    'Juanjo BJJ Tecnicas y Drills',
    'Energia Martial Arts',
    'rashadmoves',
    'John Connors, Old Man BJJ Black Belt'
  ];

  arr = arr.filter(v => !blocklist.includes(v.channelName));
  console.log(`Count after removing low-quality channels: ${arr.length}`);

  arr.push(...newTrustedVideos);
  console.log(`Count after appending new trusted videos: ${arr.length}`);

  const formattedJson = JSON.stringify(arr, null, 2);
  const newContent = prefix + formattedJson + '\n';
  fs.writeFileSync(tsPath, newContent);
  console.log('Successfully updated videoReferences.ts');

} catch (e) {
  console.error("Failed:", e.message);
}
