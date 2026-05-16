/**
 * Script to add new curated No-Gi video references to videoReferences.ts
 * after removing Andre Galvao entries.
 * 
 * Run: node scripts/addNewVideos.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const filePath = resolve('src/data/videos/videoReferences.ts')
const content = readFileSync(filePath, 'utf-8')

const lt = (en, vi, fr) => `lt(\n        ${JSON.stringify(en)},\n        ${JSON.stringify(vi)},\n        ${JSON.stringify(fr)},\n      )`
const la = (en, vi, fr) => `la(\n        ${JSON.stringify(en)},\n        ${JSON.stringify(vi)},\n        ${JSON.stringify(fr)},\n      )`

const newEntries = [
  // ======= MISSING SKILLS (0 videos) =======
  
  // closed-guard-sweeps
  {
    id: "chewjitsu-closed-guard-sweeps-4",
    title: "4 Full Guard Sweeps Every BJJ White Belt Should Learn",
    channelName: "Chewjitsu",
    youtubeId: "6oo323AQ0JI",
    skillIds: ["closed-guard-sweeps"],
    positionIds: ["closed-guard"],
    tags: ["closed-guard", "sweep", "guard-system", "pendulum", "scissor"],
    whyUseful: "Chewjitsu provides a practical breakdown of four essential closed guard sweeps with clear details for No-Gi application, covering timing and weight distribution.",
    whatToWatch: ["Scissor sweep hip placement", "Pendulum sweep timing", "Flower sweep mechanics", "When to abandon sweep and reset"],
    level: "beginner",
  },
  {
    id: "knight-closed-guard-attack-sequence",
    title: "Closed Guard Attack Sequence for White Belts (& Everyone Else)",
    channelName: "Knight Jiu-Jitsu",
    youtubeId: "X3j7OWFyAB4",
    skillIds: ["closed-guard-sweeps"],
    positionIds: ["closed-guard"],
    tags: ["closed-guard", "sweep", "submission", "guard-system", "attack-sequence"],
    whyUseful: "A structured approach to linking attacks and sweeps from closed guard, building a complete system rather than isolated techniques.",
    whatToWatch: ["Sweep timing after breaking posture", "Transition from sweep to submission", "Weight distribution during attacks", "Recognizing opponent reactions"],
    level: "beginner",
  },
  {
    id: "knight-first-4-sweeps-nogi",
    title: "The First 4 Sweeps You Need To Know",
    channelName: "Knight Jiu-Jitsu",
    youtubeId: "qp5AXBHxQec",
    skillIds: ["closed-guard-sweeps"],
    positionIds: ["closed-guard"],
    tags: ["closed-guard", "sweep", "guard-system", "beginner"],
    whyUseful: "A No-Gi focused approach to fundamental closed guard sweeps, breaking down the essential mechanics for building a reliable guard game.",
    whatToWatch: ["Hip placement for each sweep", "Arm drag connections", "Timing the off-balance", "Transition between sweeps"],
    level: "beginner",
  },

  // k-guard-entry
  {
    id: "lachlan-k-guard-best-entanglement",
    title: "K guard is the best for leg entanglement entries: Inside vs outside position",
    channelName: "Lachlan Giles",
    youtubeId: "-0BnL1xQRT8",
    skillIds: ["k-guard-entry", "k-guard-matrix"],
    positionIds: ["k-guard"],
    tags: ["k-guard", "leg-entanglement", "leg-lock", "inside-position"],
    whyUseful: "Lachlan Giles explains why K guard is the premier entry for leg entanglements, focusing on inside vs outside position concepts and entry mechanics.",
    whatToWatch: ["Foot placement on the hip", "Knee line control during entry", "Inside vs outside positioning", "Connection to saddle/ashi garami"],
    level: "advanced",
  },
  {
    id: "lachlan-perfect-k-guard",
    title: "How To Do The Perfect BJJ K Guard by Lachlan Giles",
    channelName: "Lachlan Giles",
    youtubeId: "2b7bqY7iZBs",
    skillIds: ["k-guard-entry", "k-guard-matrix"],
    positionIds: ["k-guard"],
    tags: ["k-guard", "leg-entanglement", "leg-lock", "system"],
    whyUseful: "A comprehensive breakdown of K guard fundamentals from a world-class No-Gi competitor, covering entry, control, and finishing options.",
    whatToWatch: ["Entry setup from seated guard", "Shin-to-shin connection", "Breaking opponent posture", "Transitioning to leg attacks"],
    level: "advanced",
  },

  // outside-passing
  {
    id: "gordon-ryan-passing-system",
    title: "The Best No Gi Guard Passing System On The Planet by Gordon Ryan",
    channelName: "Bernardo Faria BJJ Fanatics",
    youtubeId: "OdscGUlottI",
    skillIds: ["outside-passing"],
    tags: ["passing", "outside-passing", "guard-passing", "gordon-ryan", "system"],
    whyUseful: "Gordon Ryan demonstrates his complete No-Gi guard passing system with a focus on outside passing, including the key principles that make his passing unstoppable.",
    whatToWatch: ["Head position during outside pass", "Leg pummeling to clear hooks", "Pressure direction before pass", "When to switch to inside pass"],
    level: "advanced",
  },
  {
    id: "rob-houghton-outside-passing",
    title: "A SIMPLE System for ADVANCED Outside Passing - BJJ Analysis",
    channelName: "Rob Houghton BJJ",
    youtubeId: "xajzAuQ1BfY",
    skillIds: ["outside-passing"],
    tags: ["passing", "outside-passing", "guard-passing", "system"],
    whyUseful: "A systematic breakdown of outside passing principles, showing how to chain outside passing concepts together for effective guard passing.",
    whatToWatch: ["Creating angles for outside pass", "Leg pinning before passing", "Countering opponent frames", "Transition to side control"],
    level: "intermediate",
  },

  // s-mount-armbar
  {
    id: "mergali-s-mount-armbar",
    title: "S Mount Armbar by Nicholas Meregali",
    channelName: "BJJ Fanatics",
    youtubeId: "c8eCbqAyyuw",
    skillIds: ["s-mount-armbar", "armbar-system"],
    tags: ["s-mount", "armbar", "submission", "mount", "shoulder-isolation"],
    whyUseful: "Nicholas Meregali demonstrates the S-mount armbar with details on maintaining position, breaking the grip, and finishing mechanics.",
    whatToWatch: ["S-mount weight distribution", "Hip position for arm isolation", "Grip breaking sequence", "Finish without losing position"],
    level: "intermediate",
  },
  {
    id: "kayfabe-s-mount-armbar",
    title: "BJJ Basics: S-Mount Armbar",
    channelName: "Kayfabe Jiu-Jitsu",
    youtubeId: "uNRWdy9752k",
    skillIds: ["s-mount-armbar", "armbar-system"],
    tags: ["s-mount", "armbar", "submission", "mount", "basics"],
    whyUseful: "A clear, beginner-friendly breakdown of the S-mount armbar covering the fundamental mechanics and common pitfalls.",
    whatToWatch: ["Transitioning from mount to S-mount", "Figure-four leg position", "Arm isolation details", "Finishing angle"],
    level: "beginner",
  },

  // shoulder-crunch-control
  {
    id: "coach-ben-shoulder-crunch-sweep",
    title: "Gordon Ryan's Shoulder Crunch Sweep From Butterfly Guard",
    channelName: "Coach Ben BJJ",
    youtubeId: "KLwqvzhW3A8",
    skillIds: ["shoulder-crunch-control"],
    tags: ["shoulder-crunch", "butterfly-guard", "sweep", "gordon-ryan"],
    whyUseful: "A focused breakdown of Gordon Ryan's shoulder crunch sweep from butterfly guard, a key control system for No-Gi grappling.",
    whatToWatch: ["Shoulder crunch grip details", "Weight distribution for sweep", "Connection to submissions", "Timing the off-balance"],
    level: "intermediate",
  },
  {
    id: "kd-shoulder-crunch-attacks",
    title: "3 Shoulder Crunch Attacks | Sweep | Triangle Choke | Leg Lock Entry",
    channelName: "KD Grappling",
    youtubeId: "yMxvGPvteng",
    skillIds: ["shoulder-crunch-control"],
    tags: ["shoulder-crunch", "sweep", "triangle", "leg-lock", "submission"],
    whyUseful: "Shows how shoulder crunch control connects to multiple attacks including sweeps, triangles, and leg lock entries for a complete system.",
    whatToWatch: ["Maintaining shoulder crunch under pressure", "Transition timing between attacks", "Recognizing opponent reactions", "Leg lock entry from shoulder crunch"],
    level: "intermediate",
  },

  // single-leg-bjj
  {
    id: "grappling-education-nogi-takedowns",
    title: "5 Easiest NoGi Judo Takedowns for BJJ",
    channelName: "Grappling Education",
    youtubeId: "VqryaY9afQU",
    skillIds: ["single-leg-bjj"],
    tags: ["takedown", "single-leg", "wrestling", "nogi", "judo"],
    whyUseful: "Shows No-Gi adapted takedowns including single leg entries that work within the BJJ context, with attention to neck safety and landing position.",
    whatToWatch: ["Single leg entry mechanics", "Head position during takedown", "Landing safely without giving up position", "Chain to guard or passing"],
    level: "beginner",
  },
  {
    id: "josh-saunders-takedowns-bjj",
    title: "Takedowns For BJJ Are Easy Once You Understand This",
    channelName: "Josh Saunders",
    youtubeId: "WFkFOvCUAuE",
    skillIds: ["single-leg-bjj"],
    tags: ["takedown", "single-leg", "wrestling", "bjj"],
    whyUseful: "Simplifies the takedown game for BJJ practitioners, showing how single leg takedown concepts connect to the broader grappling game.",
    whatToWatch: ["Setup before shooting", "Head position safety", "Finishing the single leg", "Transition to guard or pass"],
    level: "beginner",
  },

  // sprawl-go-behind
  {
    id: "jordan-laster-sprawl-go-behind",
    title: "Sprawl and Go Behind",
    channelName: "Jordan Laster",
    youtubeId: "lAsAx8XoETM",
    skillIds: ["sprawl-go-behind"],
    tags: ["sprawl", "go-behind", "wrestling", "takedown-defense", "back-take"],
    whyUseful: "A focused tutorial on the sprawl-and-go-behind sequence, essential for defending takedowns and taking the back in No-Gi grappling.",
    whatToWatch: ["Hip weight during sprawl", "Hand position on the head/neck", "Circling behind mechanics", "When to commit to the go-behind"],
    level: "intermediate",
  },
  {
    id: "bjj-fanatics-sprawl-ben-askren",
    title: "Wrestling Moves - Sprawl by Ben Askren",
    channelName: "BJJ Fanatics",
    youtubeId: "J0kcsLXX1Ms",
    skillIds: ["sprawl-go-behind"],
    tags: ["sprawl", "wrestling", "takedown-defense", "ben-askren"],
    whyUseful: "Ben Askren, an Olympic wrestler, breaks down the sprawl with high-level wrestling detail applicable to No-Gi takedown defense.",
    whatToWatch: ["Hip positioning for effective sprawl", "Weight distribution on opponent", "Countering the single leg", "Transition from sprawl to front headlock"],
    level: "intermediate",
  },

  // straight-ankle-lock-safety
  {
    id: "chewjitsu-straight-ankle-white-belt",
    title: "Straight Ankle Lock for White Belts (Powerful Details for More Finishes)",
    channelName: "Chewjitsu",
    youtubeId: "5ZAqUQpsus8",
    skillIds: ["straight-ankle-lock-safety", "leg-lock-safety-basics"],
    tags: ["straight-ankle-lock", "leg-lock", "safety", "submission", "beginner"],
    whyUseful: "A safety-first approach to the straight ankle lock, covering mechanics, common mistakes, and the importance of controlled pressure.",
    whatToWatch: ["Foot placement for safety", "Applying pressure gradually", "Recognizing when to release", "Partner communication"],
    caution: "Straight ankle locks apply rotational pressure to the knee and ankle. Tap immediately on any foot or knee discomfort.",
    level: "beginner",
  },
  {
    id: "brian-glick-straight-ankle-finish",
    title: "Straight Ankle Lock Finish",
    channelName: "BJJ Fanatics",
    youtubeId: "OODhY1jlH3Q",
    skillIds: ["straight-ankle-lock-safety", "leg-lock-safety-basics"],
    tags: ["straight-ankle-lock", "leg-lock", "finish", "brian-glick"],
    whyUseful: "Brian Glick provides detailed finishing mechanics for the straight ankle lock while emphasizing safety and controlled submission training.",
    whatToWatch: ["Body position for leverage", "Chin strap control", "Hip pressure direction", "Release discipline"],
    caution: "Apply ankle lock pressure slowly and release immediately on any foot or knee discomfort.",
    level: "beginner",
  },

  // wrist-ride-back-exposure
  {
    id: "marcelo-wrist-control-back",
    title: "Double Wrist Control from SEAT BELT, REAR NAKED CHOKE with Wrist Wriggle",
    channelName: "BJJ Fanatics",
    youtubeId: "iLtzc8Rd3CU",
    skillIds: ["wrist-ride-back-exposure", "back-control"],
    tags: ["wrist-control", "seat-belt", "back-control", "rnc", "marcelo-garcia"],
    whyUseful: "Marcelo Garcia demonstrates double wrist control from the seat belt position, a key component of wrist-ride back exposure systems.",
    whatToWatch: ["Seat belt grip details", "Wrist control isolation", "Choke setup from wrist control", "Hand-fighting order"],
    level: "advanced",
  },
  {
    id: "brian-glick-gift-wrap-back",
    title: "GIFT WRAP to Take the Back (Sitting Method) - No Gi BJJ",
    channelName: "Brian Glick",
    youtubeId: "tSS_rEP6acg",
    skillIds: ["wrist-ride-back-exposure", "back-control"],
    tags: ["gift-wrap", "back-take", "wrist-control", "mount", "brian-glick"],
    whyUseful: "Brian Glick demonstrates the gift wrap back take from mount, using wrist ride principles to expose the back and secure the position.",
    whatToWatch: ["Gift wrap entry timing", "Hip position for back take", "Transition to back hooks", "Preventing the roll-out escape"],
    level: "intermediate",
  },

  // ======= LOW COVERAGE SKILLS (1-2 videos each) =======

  // closed-guard-posture-control
  {
    id: "shawn-williams-closed-guard-posture",
    title: "Breaking The Closed Guard Posture No-Gi For White Belt",
    channelName: "Bernardo Faria BJJ Fanatics",
    youtubeId: "9aokuB9Jd48",
    skillIds: ["closed-guard-posture-control"],
    positionIds: ["closed-guard"],
    tags: ["closed-guard", "posture", "breaking-posture", "no-gi", "beginner"],
    whyUseful: "Shawn Williams shows No-Gi specific methods for breaking and maintaining posture in closed guard, essential for any guard player.",
    whatToWatch: ["Head position when breaking posture", "Core engagement for balance", "Grip breaks without Gi fabric", "Timing the posture break"],
    level: "beginner",
  },

  // headquarters-passing
  {
    id: "knight-headquarters-passing",
    title: "Headquarters Guard Passing Simplified | No Gi Jiu-Jitsu",
    channelName: "Knight Jiu-Jitsu",
    youtubeId: "quM3u9Jxthg",
    skillIds: ["headquarters-passing"],
    tags: ["headquarters", "passing", "guard-passing", "knight-jiu-jitsu"],
    whyUseful: "A simplified approach to headquarters passing system, showing the key options and how to chain them together for effective guard passing.",
    whatToWatch: ["Headquarters control position", "Recognizing passing windows", "Transition between passing options", "Countering guard recovery"],
    level: "intermediate",
  },

  // mount-survival
  {
    id: "brandon-mccaghren-mount-escapes",
    title: "The First 3 Mount Escapes You Need To Know in BJJ",
    channelName: "Brandon Mccaghren",
    youtubeId: "SYel-mVSMAI",
    skillIds: ["mount-survival", "mount-escape"],
    positionIds: ["mount-bottom"],
    tags: ["mount", "escape", "survival", "bridge", "beginner"],
    whyUseful: "Brandon Mccaghren covers the three most important mount escapes a BJJ practitioner needs, with clear details for survival and escape.",
    whatToWatch: ["Elbow-knee connection before escape", "Bridge timing and direction", "Shrimp to guard recovery", "When to choose each escape variation"],
    level: "beginner",
  },

  // side-control-pin
  {
    id: "whitebelt-side-control-pin",
    title: "Top Side Control Pin Explaining How to Make Pressure",
    channelName: "White Belt Jiu Jitsu",
    youtubeId: "ptf6f5vXelw",
    skillIds: ["side-control-pin"],
    tags: ["side-control", "pin", "pressure", "positional-control"],
    whyUseful: "A focused tutorial on maintaining the side control pin with heavy pressure, essential for controlling opponents in No-Gi.",
    whatToWatch: ["Chest-to-chest pressure mechanics", "Hip weight vs shoulder weight", "Blocking the underhook", "Adjusting pressure with opponent movement"],
    level: "beginner",
  },

  // gogoplata
  {
    id: "hinger-gogoplata",
    title: "Gogoplata in 2 min",
    channelName: "Joshua Hinger",
    youtubeId: "7l5Obh7POek",
    skillIds: ["gogoplata"],
    tags: ["gogoplata", "submission", "rubber-guard", "choke"],
    whyUseful: "Joshua Hinger breaks down the gogoplata submission with clear mechanics for setup and finish.",
    whatToWatch: ["Foot placement on the throat", "Flexibility requirements", "Avoiding neck crank", "Entry from rubber guard"],
    caution: "Gogoplata applies pressure directly to the neck and throat. Tap early if you feel any neck strain or breathing difficulty.",
    level: "advanced",
  },

  // shin-to-shin-entry
  {
    id: "energia-shin-to-shin-basics",
    title: "Shin to shin basics",
    channelName: "Energia Martial Arts",
    youtubeId: "wFZf7Oyx0_4",
    skillIds: ["shin-to-shin-entry"],
    tags: ["shin-to-shin", "guard-entry", "guard-system"],
    whyUseful: "A clear breakdown of shin-to-shin guard entry fundamentals, showing how to enter, control, and transition to other guards.",
    whatToWatch: ["Foot positioning on the hip", "Connection to single leg X", "Preventing the smash pass", "Timing the entry"],
    level: "intermediate",
  },

  // turtle-ride
  {
    id: "kayfabe-turtle-roll-back",
    title: "No Gi BJJ: Rolling Back Attacks (Turtle Mount & Reverse Ride)",
    channelName: "Kayfabe Jiu-Jitsu",
    youtubeId: "DLncODiHFdM",
    skillIds: ["turtle-ride"],
    tags: ["turtle", "back-take", "ride", "positional-control"],
    whyUseful: "Covers rolling back attacks from turtle position including turtle mount and reverse ride concepts for exposing the back.",
    whatToWatch: ["Weight distribution on turtle", "Hand placement for control", "Timing the roll for back take", "Securing back hooks after ride"],
    level: "intermediate",
  },

  // single-leg-x-basics
  {
    id: "lachlan-slx-attacks",
    title: "Linking attacks from Single leg X guard (Lachlan Giles)",
    channelName: "Absolute MMA St Kilda - Melbourne",
    youtubeId: "SIe3OnvXGz4",
    skillIds: ["single-leg-x-basics"],
    tags: ["single-leg-x", "slx", "guard", "sweep", "leg-lock"],
    whyUseful: "Lachlan Giles shows how to link multiple attacks from single leg X guard including sweeps and leg lock entries for a complete system.",
    whatToWatch: ["Entry mechanics into SLX", "Knee line control", "Sweep timing", "Transition to legs or pass"],
    level: "intermediate",
  },
]

// Generate the full entry text for each video
function generateEntry(v) {
  const isSafety = v.caution ? 'safety_reference' : 'primary_reference'
  
  let entry = `  {\n`
  entry += `    id: "${v.id}",\n`
  entry += `    provider: 'youtube',\n`
  entry += `    title:\n      ${lt(v.title, v.title, v.title)},\n`
  entry += `    channelName: "${v.channelName}",\n`
  entry += `    url: "https://www.youtube.com/watch?v=${v.youtubeId}",\n`
  entry += `    embedUrl: "https://www.youtube.com/embed/${v.youtubeId}",\n`
  entry += `    youtubeId: "${v.youtubeId}",\n`
  entry += `    language: 'en',\n`
  entry += `    relatedSkillIds: ${JSON.stringify(v.skillIds)},\n`
  if (v.positionIds) {
    entry += `    relatedPositionIds: ${JSON.stringify(v.positionIds)},\n`
  }
  entry += `    techniqueTags: ${JSON.stringify(v.tags)},\n`
  entry += `    relevance: "${isSafety}",\n`
  entry += `    level: "${v.level}",\n`
  entry += `    whyUseful:\n      ${lt(v.whyUseful, v.whyUseful, v.whyUseful)},\n`
  entry += `    whatToWatchFor:\n      ${la(v.whatToWatch, v.whatToWatch, v.whatToWatch)},\n`
  if (v.caution) {
    entry += `    caution:\n      ${lt(v.caution, v.caution, v.caution)},\n`
  }
  entry += `    timestamps: [\n`
  entry += `      {\n`
  entry += `        id: "full-video",\n`
  entry += `        label:\n          ${lt("Full technique breakdown", "Phân tích kỹ thuật toàn bộ", "Analyse technique complète")},\n`
  entry += `        timeSeconds: 0,\n`
  entry += `      }\n`
  entry += `    ],\n`
  entry += `    sourceNote: "Curated No-Gi YouTube reference selected to replace removed Andre Galvao entries.",\n`
  entry += `  }`
  return entry
}

// Build the full new entries block
const newEntriesBlock = newEntries.map(generateEntry).join(',\n\n')

// Find the closing ] of the videoReferences array and insert before it
// The array ends with ] on its own line
const lastBracketIndex = content.lastIndexOf('\n]')
if (lastBracketIndex === -1) {
  console.error('Could not find closing bracket of videoReferences array!')
  process.exit(1)
}

const newContent = content.slice(0, lastBracketIndex + 1) + ',\n' + newEntriesBlock + '\n' + content.slice(lastBracketIndex + 1)

writeFileSync(filePath, newContent, 'utf-8')

console.log(`Done! Added ${newEntries.length} new video entries.`)
console.log('')
console.log('=== NEW ENTRIES BY SKILL ===')
const skillCounts = {}
newEntries.forEach(v => {
  v.skillIds.forEach(s => {
    skillCounts[s] = (skillCounts[s] || 0) + 1
  })
})
Object.entries(skillCounts).sort((a, b) => (a[1] < b[1] ? 1 : -1)).forEach(([skill, count]) => {
  console.log(`  ${skill}: +${count}`)
})
