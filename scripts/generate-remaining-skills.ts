/**
 * generate-remaining-skills.ts
 *
 * Generates all content files for the 12 remaining skills from the spec.
 * Run: npx tsx scripts/generate-remaining-skills.ts
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = resolve(__dirname, '..')
const BASE = join(ROOT, 'content', 'skills')

interface SkillDef {
  id: string
  domain: string
  level: string
  name: string
  aliases: string[]
  tags: string[]
  keywords: string[]
  modernSystemGroup: string
  relatedSkills: { id: string; type: string }[]
  prerequisiteSkillIds: string[]
  archetypeIds: string[]
  // Content
  description: string
  shortInstruction: string
  summary: string
  whyItWorks: string[]
  commonMistakes: string[]
  coachingCues: string[]
  safetySummary: string[]
  keyCorrections: string[]
  systemLogic: { corePrinciple: string; decisionTree: { condition: string; action: string }[]; exitStrategies: string[] }
  moneyDetails: string[]
  fixItFast: string[]
  // Videos
  videos: { youtubeId: string; title: string; channel: string; whyUseful: string; relevance: string; level: string }[]
}

const skills: SkillDef[] = [
  // ── 1. lateral-drop-headlock-throw ──
  {
    id: 'lateral-drop-headlock-throw',
    domain: 'wrestle_up_wrestling',
    level: 'intermediate',
    name: 'Lateral Drop / Headlock Throw',
    aliases: ['headlock throw', 'lateral drop', 'hip throw headlock'],
    tags: ['tier:modern-expansion', 'meta:emerging', 'risk:high', 'family:wrestling', 'modern-no-gi'],
    keywords: ['headlock throw', 'lateral drop', 'hip throw', 'overhook throw'],
    modernSystemGroup: 'front_headlock',
    relatedSkills: [
      { id: 'snapdown-front-headlock', type: 'recommended' },
      { id: 'single-leg-bjj', type: 'alternative' },
    ],
    prerequisiteSkillIds: ['hand-fighting'],
    archetypeIds: ['wrestle-up-player'],
    description: 'The lateral drop is a hip-throw entry from a headlock or overhook. You use your hips as the fulcrum to rotate the opponent over your body and onto the mat. In BJJ, the key is landing in a dominant position (side control or mount) rather than following them to the mat.',
    shortInstruction: 'Secure headlock/overhook, step inside their leg line, drop hips below theirs, rotate shoulders away, and land in mount or side control.',
    summary: 'The lateral drop throw uses your hips as the fulcrum to rotate the opponent over your body from a headlock. The key BJJ adaptation is staying on your feet to land in a dominant position rather than following them to the mat.',
    whyItWorks: [
      'The headlock controls their posture and prevents them from posting or backing out',
      'Your hips positioned in front of theirs create a rotational fulcrum — they must rotate over you',
      'Bending your knees and dropping your hips below theirs loads them onto your hip — the throw becomes effortless',
      'Landing on top gives you immediate position — you do not sacrifice position for the takedown',
    ],
    commonMistakes: [
      'Bending at the waist instead of dropping the hips — this strains the back and lacks leverage',
      'Not stepping inside their leg line — without inside position, the throw fails',
      'Following them to the mat instead of staying on top — this gives away the positional advantage',
      'Holding the headlock too long after the throw finishes — release and progress to the next position',
    ],
    coachingCues: [
      'Hips below theirs, not waist bend',
      'Step inside, headlock tight, drop and rotate',
      'Stay on your feet — they go down, you stay up',
      'If they post, switch to double leg',
    ],
    safetySummary: [
      'Dropping your hips too explosively can strain your lower back — use controlled depth',
      'Ensure your head is positioned to the outside of their body to avoid landing on your neck',
      'Do not hold the headlock as they fall — release to avoid landing on your head or shoulder',
    ],
    keyCorrections: [
      'If they block by posting the far arm: release the headlock and switch to double leg',
      'If they back out of the headlock: circle to front headlock and snapdown',
      'If they drop level to counter: pull them into guard and attack from bottom',
    ],
    systemLogic: {
      corePrinciple: 'Lateral drop: secure headlock/overhook → step inside their leg line → drop hips below theirs (bend knees, not waist) → rotate shoulders away → they rotate over your hips → land in mount or side control.',
      decisionTree: [
        { condition: 'They post the far arm to block the throw', action: 'release headlock and switch to double leg' },
        { condition: 'They back out of the headlock', action: 'circle to front headlock and snapdown' },
        { condition: 'They drop level to counter', action: 'pull them into guard and attack from bottom' },
      ],
      exitStrategies: ['If the throw fails and you are underneath, recover guard', 'If you land in their guard after throw attempt, stand and pass'],
    },
    moneyDetails: [
      'The lateral drop is one of the highest-percentage takedowns from a headlock position in no-gi',
      'Mastering the stay-on-feet finish is what separates BJJ lateral drops from wrestling lateral drops',
      'The lateral drop is especially effective against opponents who lunge forward with their head low',
    ],
    fixItFast: [
      'If they post the far arm: release and switch to single leg immediately',
      'If they sprawl: you are too slow — reset and set up the headlock with more control',
      'If they pull guard during the throw: stay on your feet and pass instead of following',
    ],
    videos: [
      { youtubeId: 'dSkZMHGOKjs', title: 'Headlock / Lateral Drop For BJJ (Gi & No-Gi)', channel: 'BJJ Fanatics', whyUseful: 'Complete breakdown of the lateral drop throw from headlock position with BJJ-specific landing mechanics.', relevance: 'primary', level: 'intermediate' },
      { youtubeId: 'b_0MeyPqT50', title: 'How To Lateral Drop In BJJ', channel: 'Bernardo Faria BJJ Fanatics', whyUseful: 'Step-by-step demonstration of lateral drop mechanics with emphasis on hip position and safe landing.', relevance: 'supplemental', level: 'intermediate' },
    ],
  },

  // ── 2. berimbolo-back-take ──
  {
    id: 'berimbolo-back-take',
    domain: 'guard_offense',
    level: 'advanced',
    name: 'Berimbolo / Inversion Back Take',
    aliases: ['berimbolo', 'inversion back take', 'berimbolo guard'],
    tags: ['tier:modern-expansion', 'meta:modern-common', 'risk:medium', 'family:back_take', 'modern-no-gi'],
    keywords: ['berimbolo', 'inversion', 'DLR back take', 'RDLR back take', 'shoulder roll'],
    modernSystemGroup: 'x_guard',
    relatedSkills: [
      { id: 'coyote-half-guard', type: 'chain' },
      { id: 'k-guard-to-outside-ashi', type: 'alternative' },
    ],
    prerequisiteSkillIds: [],
    archetypeIds: ['guard-retention-specialist'],
    description: 'The berimbolo uses an inversion (rolling over your own shoulder) to reverse the angle from under the opponent to behind them. From De La Riva or RDLR, you roll under them as they step forward, hook their far hip, and come up behind them — the inversion trades being underneath for being behind.',
    shortInstruction: 'Hook DLR/RDLR, opponent steps forward, invert over your far shoulder, pull their far hip through the roll, and land behind them with back control.',
    summary: 'The berimbolo back take uses an inversion to trade being underneath the opponent for being behind them. Triggered by the opponent stepping forward, you roll over your shoulder, pull their far hip, and land in back control.',
    whyItWorks: [
      'Inverting under them as they step forward reverses the inside/outside relationship — you go from inside their guard to outside their back',
      'The far-hip hook prevents them from following you through the inversion',
      'Their forward step is the trigger — if they step forward, the berimbolo is available',
      'The inversion uses their forward momentum against them — no strength required',
    ],
    commonMistakes: [
      'Inverting over the top of the head instead of the shoulder — dangerous for the neck',
      'Letting go of the leg hook during inversion — you lose the connection and they step away',
      'Not pulling the far hip during the roll — the pull is what rotates your body through',
      'Stopping at the truck instead of flowing to back control — must complete the back take',
    ],
    coachingCues: [
      'Shoulder roll, not head roll',
      'Step forward = your window',
      'Pull the far hip — that rotates you through',
      "Don't stop at the truck — finish to back control",
    ],
    safetySummary: [
      'Inverting over the top of your head can injure your cervical spine — always roll over your shoulder',
      'If you feel pressure on your neck during the inversion, abort immediately',
      'Practice the berimbolo on soft mats with a cooperative partner before using it live',
    ],
    keyCorrections: [
      'If they do not step forward: berimbolo is not available — stay in DLR/RDLR and sweep instead',
      'If they step back to avoid the inversion: release the DLR hook and enter K-guard',
      'If they follow you through the inversion: they are defending correctly — re-enter guard and try again',
    ],
    systemLogic: {
      corePrinciple: 'Berimbolo back take: DLR or RDLR guard → opponent steps forward (trigger) → invert over your far shoulder → pull their far hip through the roll → land behind them → replace hook with back control.',
      decisionTree: [
        { condition: 'They do not step forward', action: 'berimbolo is not available — stay in DLR/RDLR and sweep instead' },
        { condition: 'They step back to avoid the inversion', action: 'release the DLR hook and enter K-guard' },
        { condition: 'They follow you through the inversion', action: 'they are defending correctly — re-enter guard and try again' },
      ],
      exitStrategies: ['If you cannot finish the back take, re-enter guard and reset', 'If they flatten you during the roll, protect your neck and recover guard'],
    },
    moneyDetails: [
      'The berimbolo revolutionized modern BJJ guard play by introducing inversion-based back takes',
      'Mastering the berimbolo gives you a reliable back take entry from guard that does not require strength',
      'The berimbolo is particularly effective against opponents who pressure forward with their weight',
    ],
    fixItFast: [
      'If they post a hand to block the back take: attack the posted arm with kimura or armbar',
      'If they step back: release and switch to K-guard entry',
      'If you stall mid-roll: pull their hip harder — the hand pull is the engine of the inversion',
    ],
    videos: [
      { youtubeId: 'V5t95XQvDgE', title: 'Berimbolo to Back Take — Modern BJJ Inversion System', channel: 'BJJ Fanatics', whyUseful: 'Comprehensive breakdown of the berimbolo mechanics including the shoulder roll, hip pull, and back take finish.', relevance: 'primary', level: 'advanced' },
      { youtubeId: 'G8ow1Vk7p1k', title: 'Mendes Bros — Berimbolo Details', channel: 'Mendes Bros', whyUseful: 'Details on the hand placement and timing for the berimbolo entry from standard DLR guard.', relevance: 'supplemental', level: 'advanced' },
    ],
  },

  // ── 3. k-guard-to-outside-ashi ──
  {
    id: 'k-guard-to-outside-ashi',
    domain: 'guard_offense',
    level: 'advanced',
    name: 'K-Guard to Outside Ashi',
    aliases: ['K-guard entry', 'K-guard leg lock', 'K-guard to heel hook'],
    tags: ['tier:modern-expansion', 'meta:modern-common', 'risk:high', 'family:leg_lock', 'modern-no-gi'],
    keywords: ['K-guard', 'outside ashi', 'heel hook entry', 'leg entanglement', 'saddle'],
    modernSystemGroup: 'k_guard',
    relatedSkills: [
      { id: 'inside-outside-heel-hook', type: 'chain' },
      { id: 'coyote-half-guard', type: 'supporting' },
    ],
    prerequisiteSkillIds: ['leg-lock-safety-basics'],
    archetypeIds: ['leg-lock-safety-first'],
    description: "K-guard to outside ashi is the primary leg-lock entry chain from K-guard. When the opponent defends the K-guard (by stepping back or posting), you release the K-guard hook and re-enter directly into outside ashi — the leg entanglement that leads to the saddle or straight heel hook exposure.",
    shortInstruction: 'From K-guard, as they step back, release outside hook and pummel leg inside their far leg. Re-enter outside ashi with heel exposure.',
    summary: 'K-guard to outside ashi transitions from a guard position to a leg entanglement by releasing the K-guard hook and pummeling directly into outside ashi. The transition is faster than the opponent can defend because you are already underneath them with one leg entangled.',
    whyItWorks: [
      'The K-guard already has your hips underneath theirs and your leg entangled — you are already 50% into the leg lock',
      'Releasing the K-guard hook and re-entering as outside ashi is one movement — they cannot defend both positions in sequence',
      'Outside ashi gives you heel exposure on the far leg while protecting your own knee line',
      'The transition happens below their field of vision — many do not recognize the threat until it is too late',
    ],
    commonMistakes: [
      'Losing the K-guard before establishing outside ashi — there is a gap between the two where you are vulnerable',
      'Letting them clear their far knee during the transition — must keep the far leg trapped',
      'Going to saddle too early — finish from outside ashi first; saddle is the backup option',
      'Not controlling their near hand — they can frame against your head or peel the leg entanglement',
    ],
    coachingCues: [
      'K-guard hook pulls, outside ashi leg pummels — two movements that feel like one',
      'Keep the far leg trapped through the transition — lose it, lose the entry',
      'Finish from outside ashi before considering saddle',
      'Control the near hand — if they frame your head, the entanglement fails',
    ],
    safetySummary: [
      'This transition involves leg entanglements — ensure you know the safety positions before practicing',
      'Do not apply heel hook pressure during drilling — practice the transition with controlled movement only',
      'If you lose the leg entanglement, immediately recover guard rather than fighting for the heel hook',
    ],
    keyCorrections: [
      'If they step back to clear K-guard: pummel leg to outside ashi',
      'If they step forward to pressure: stay in K-guard and sweep instead',
      'If they post on your head to block: pummel their arm or switch to omoplata',
    ],
    systemLogic: {
      corePrinciple: 'K-guard to outside ashi: establish K-guard → opponent steps back (trigger) → release K-guard hook → pummel your leg inside their far leg → re-enter as outside ashi → expose the heel.',
      decisionTree: [
        { condition: 'They step back to clear K-guard', action: 'pummel leg to outside ashi' },
        { condition: 'They step forward to pressure', action: 'stay in K-guard and sweep instead' },
        { condition: 'They post on your head to block', action: 'pummel their arm or switch to omoplata' },
      ],
      exitStrategies: ['If they free their far leg, re-enter K-guard or recover guard', 'If you lose the entanglement, do not chase it — reset to full guard'],
    },
    moneyDetails: [
      'K-guard to outside ashi is the primary leg-lock entry used by elite no-gi competitors at ADCC level',
      'Mastering this transition gives you a direct path from guard to heel hook that bypasses many common defenses',
      'The K-guard is one of the safest guard positions for entering leg locks because your hips are below theirs',
    ],
    fixItFast: [
      'If they free their far leg: you lost the position — re-enter K-guard or recover guard',
      'If they frame your head: pummel the arm and re-establish the entanglement',
      'If they step back but you miss the outside ashi entry: recover full guard and try again from K-guard',
    ],
    videos: [
      { youtubeId: 'rViMQydjFAU', title: 'K-Guard to Outside Ashi — Leg Lock Entry System', channel: 'BJJ Fanatics', whyUseful: 'Detailed breakdown of the K-guard to outside ashi transition with timing and common mistakes.', relevance: 'primary', level: 'advanced' },
      { youtubeId: '7n-W2ldmz9A', title: 'Craig Jones — K-Guard Entries', channel: 'B-Team Jiu Jitsu', whyUseful: 'Craig Jones demonstrates K-guard entries and transitions to leg entanglements at the highest level.', relevance: 'supplemental', level: 'advanced' },
    ],
  },

  // ── 4. inside-outside-heel-hook ──
  {
    id: 'inside-outside-heel-hook',
    domain: 'submission_systems',
    level: 'advanced',
    name: 'Inside & Outside Heel Hook Finishing',
    aliases: ['heel hook finishing', 'inside heel hook', 'outside heel hook'],
    tags: ['tier:safety-critical', 'meta:modern-common', 'risk:safety-critical', 'family:leg_lock', 'modern-no-gi'],
    keywords: ['heel hook', 'inside heel hook', 'outside heel hook', 'boot grip', 'milk the calf'],
    modernSystemGroup: 'leg_lock',
    relatedSkills: [
      { id: 'k-guard-to-outside-ashi', type: 'chain' },
      { id: 'straight-ankle-lock-safety', type: 'supporting' },
    ],
    prerequisiteSkillIds: ['leg-lock-safety-basics'],
    archetypeIds: ['leg-lock-safety-first'],
    description: 'The heel hook finish is a rotation of the foot relative to the knee, created by rotating your own hips and shoulders. Inside heel hook rotates the foot outward (away from their body), outside heel hook rotates the foot inward (toward their body). Both use hip rotation, not arm strength.',
    shortInstruction: 'In outside ashi, secure the boot grip (four fingers on heel, thumb on sole), rotate your hips in the finishing direction, and milk the calf with your shin.',
    summary: 'The heel hook finishes by rotating the foot relative to the knee using hip rotation rather than arm strength. Inside heel hooks rotate the foot outward; outside heel hooks rotate the foot inward. Both require knee line control, the boot grip, and the milk-the-calf compression to finish safely and effectively.',
    whyItWorks: [
      'The heel hook attacks the knee in its weakest rotational plane — the knee does NOT rotate laterally',
      'Hip rotation generates the torque (not arm pulling) — your hips are stronger than your arms',
      "The boot grip (shin trapping the heel) gives you mechanical advantage over their foot — you control rotation",
      "Milking the calf creates the finish without explosive force — it is a compression + rotation, not a yank",
    ],
    commonMistakes: [
      'Squeezing the heel hook before establishing knee line control — you will not finish and may lose the entanglement',
      'Pulling with the arms instead of rotating the hips — this fatigues your arms and lacks power',
      "Not 'milking the calf' — proper calf compression creates the finish, not the foot twist alone",
      'Letting them hide their heel in your armpit — this neutralizes the rotation',
    ],
    coachingCues: [
      'Knee line first, then the boot, then rotation',
      "Rotate the hips, don't pull the foot",
      'Milk the calf — the squeeze is the finish',
      'If the heel disappears, you lost the angle',
    ],
    safetySummary: [
      'Heel hooks can cause severe knee injuries (ACL, PCL, LCL, MCL tears) — apply slowly and release at the first sign of resistance',
      'Never crank a heel hook during training — the injury may not be immediately felt by the opponent',
      'Tap early to heel hooks — they cause injury before pain is felt',
      'Only practice heel hooks with trusted training partners who understand the risks',
    ],
    keyCorrections: [
      'Inside heel hook: rotate hips toward their foot (foot rotates outward)',
      'Outside heel hook: rotate hips away from their foot (foot rotates inward)',
      'If they hide their heel: re-establish boot grip by prying with your forearm',
    ],
    systemLogic: {
      corePrinciple: 'Heel hook finishing: establish leg entanglement → clear knee line → secure the boot grip → rotate hips in finishing direction → milk the calf with your shin → finish by rotation, not squeeze.',
      decisionTree: [
        { condition: 'Inside heel hook', action: 'rotate hips toward their foot (foot rotates outward) — targets LCL/MCL' },
        { condition: 'Outside heel hook', action: 'rotate hips away from their foot (foot rotates inward) — targets ACL/PCL' },
        { condition: 'They hide their heel', action: 're-establish boot grip by prying with your forearm' },
      ],
      exitStrategies: ['If they clear the knee line, release the entanglement and re-enter from guard', 'If the heel hook fails, transition to toe hold or straight ankle lock'],
    },
    moneyDetails: [
      'Heel hooks are the highest-percentage leg submission in no-gi at the elite level',
      'Understanding inside vs outside heel hook mechanics is essential for safe and effective leg locking',
      'The boot grip and milk-the-calf finish should be drilled thousands of times to build safe muscle memory',
    ],
    fixItFast: [
      'If the heel disappears: you lost angle control — release and re-enter the entanglement',
      'If they clear the knee line: abandon the attack — you cannot finish without knee line control',
      'If you cannot get the boot grip: switch to a toe hold or straight ankle lock instead',
    ],
    videos: [
      { youtubeId: 'f7Z8peL_yRc', title: 'Heel Hook Finishing Mechanics — Inside & Outside', channel: 'BJJ Fanatics', whyUseful: 'Complete breakdown of both inside and outside heel hook finishing mechanics with the boot grip and calf compression.', relevance: 'primary', level: 'advanced' },
      { youtubeId: 'Q0wlMjm2eHk', title: 'Lachlan Giles — Heel Hook Finishing Details', channel: 'Submeta', whyUseful: 'Lachlan Giles explains the fine details of heel hook finishing including hip rotation and common mistakes.', relevance: 'supplemental', level: 'advanced' },
    ],
  },

  // ── 5. toe-hold-system ──
  {
    id: 'toe-hold-system',
    domain: 'submission_systems',
    level: 'advanced',
    name: 'Toe Hold / Estima Lock',
    aliases: ['toe hold', 'Estima lock', 'foot lock'],
    tags: ['tier:advanced-niche', 'meta:specialized', 'risk:high', 'family:leg_lock', 'modern-no-gi'],
    keywords: ['toe hold', 'Estima lock', 'foot lock', 'ankle lock', 'dorsiflexion'],
    modernSystemGroup: 'leg_lock',
    relatedSkills: [
      { id: 'inside-outside-heel-hook', type: 'alternative' },
      { id: 'straight-ankle-lock-safety', type: 'supporting' },
    ],
    prerequisiteSkillIds: ['leg-lock-safety-basics'],
    archetypeIds: ['leg-lock-safety-first'],
    description: 'The toe hold attacks the ankle in dorsiflexion (bending the foot toward the shin) combined with rotation. The Estima lock variant uses a figure-four grip on the foot creating more rotation with less force.',
    shortInstruction: 'Control the knee, grip their foot (traditional or figure-four), dorsiflex the toes toward the shin, and rotate using body rotation.',
    summary: 'The toe hold hyperextends the ankle ligaments by combining dorsiflexion with rotation. The Estima lock variant provides more rotational torque with a figure-four grip. The toe hold is most effective when the opponent is belly-down and the knee is immobilized.',
    whyItWorks: [
      'The toe hold hyperextends the ankle ligaments and impinges the talus — the ankle has minimal resistance in this direction',
      'The figure-four grip (Estima lock) creates rotational force from your arms AND your body rotation — more torque',
      'Toe holds are available from positions where heel hooks are not (outside ashi, 50/50, and some guard passes)',
      'The toe hold is legal at most belt levels where heel hooks are prohibited',
    ],
    commonMistakes: [
      'Attacking the toe hold before controlling the knee — they will spin and escape',
      'Using only arm strength without body rotation — the rotation must come from your trunk',
      'Applying toe hold in the wrong direction — must dorsiflex + rotate, not plantarflex',
      'Holding the submission too long without progress — toe holds have a narrow window before they escape',
    ],
    coachingCues: [
      'Control the knee, then attack the foot',
      'Dorsiflex first, then rotate — not the other way',
      'Belly-down opponent is your best target',
      'Figure-four grip, body rotation, tap',
    ],
    safetySummary: [
      'The toe hold attacks the ankle and can cause ligament tears — apply progressively',
      'Do not crank the toe hold — the injury can occur before the opponent feels pain',
      'Be especially careful with training partners who have pre-existing ankle injuries',
    ],
    keyCorrections: [
      'Traditional grip: one hand on the heel, one on the toes — opposing forces',
      'Estima lock: figure-four grip, grab your own wrist, cup their heel',
      'If they spin to escape: you lost knee control — release and re-enter',
    ],
    systemLogic: {
      corePrinciple: 'Toe hold system: isolate the foot → control the knee (pin it to your armpit) → secure grip (traditional or figure-four Estima lock) → dorsiflex the foot → rotate the foot while using body rotation → finish.',
      decisionTree: [
        { condition: 'They are belly-down', action: 'ideal — they cannot spin to escape' },
        { condition: 'They are on their back', action: 'secure the knee first before attacking the foot' },
        { condition: 'They spin to escape', action: 'you lost knee control — release and re-enter the leg entanglement' },
      ],
      exitStrategies: ['If the toe hold fails, transition to the straight ankle lock', 'If they clear the knee, release and re-enter from 50/50'],
    },
    moneyDetails: [
      'The toe hold is legal at IBJJF brown/black belt and most no-gi divisions — it is a versatile leg attack',
      'The Estima lock variant is more powerful than the traditional grip for smaller practitioners',
      'Having a reliable toe hold gives you a lower-risk leg attack option when heel hooks are illegal',
    ],
    fixItFast: [
      'If traditional grip fails: switch to Estima lock (figure-four for more rotation)',
      'If they spin: release and re-enter — do not fight to maintain the grip',
      'If you cannot control the knee: the toe hold will not work — switch to a different attack',
    ],
    videos: [
      { youtubeId: '2aGx3RPMzps', title: 'Toe Hold System — Traditional & Estima Lock', channel: 'BJJ Fanatics', whyUseful: 'Comprehensive breakdown of the toe hold system including both traditional and Estima lock variants.', relevance: 'primary', level: 'advanced' },
      { youtubeId: '7CH2RL0T1HI', title: 'Estima Lock Details — Figure Four Foot Lock', channel: 'YouTube', whyUseful: 'Detailed look at the Estima lock figure-four grip and finishing mechanics.', relevance: 'supplemental', level: 'advanced' },
    ],
  },

  // ── 6. calf-slicer-system ──
  {
    id: 'calf-slicer-system',
    domain: 'submission_systems',
    level: 'advanced',
    name: 'Calf Slicer / Compression Locks',
    aliases: ['calf slicer', 'calf crusher', 'compression lock', 'shin compression'],
    tags: ['tier:advanced-niche', 'meta:specialized', 'risk:high', 'family:compression', 'modern-no-gi'],
    keywords: ['calf slicer', 'compression lock', 'shin compression', 'muscle lock'],
    modernSystemGroup: 'leg_lock',
    relatedSkills: [
      { id: 'inside-outside-heel-hook', type: 'alternative' },
      { id: 'toe-hold-system', type: 'alternative' },
    ],
    prerequisiteSkillIds: ['leg-lock-safety-basics'],
    archetypeIds: ['submission-chain-hunter'],
    description: 'Calf slicers compress the calf muscle between your shin and their own shin/hamstring, creating intense pain and muscle-locking pressure. Unlike joint locks that attack ligaments, calf slicers attack muscle tissue — the compression creates ischemia and pressure pain.',
    shortInstruction: 'From saddle or 50/50, place your shin across the belly of their calf, trap their foot, squeeze your heels together while pulling the foot toward your chest.',
    summary: 'Calf slicers compress the calf muscle against the tibia, creating a muscle lock that does not rely on hyperextension. They are available from leg entanglements where heel hooks are defended or illegal, and should be applied progressively for safety.',
    whyItWorks: [
      'The shin-to-calf compression creates a muscle lock — the calf muscle is compressed against the tibia and fibula',
      'Unlike joint locks, the calf slicer does not rely on hyperextension — it works on pain and muscle fatigue',
      'Calf slicers are available from leg entanglements where heel hooks are defended or illegal',
      'The compression creates a secondary pump that locks the ankle — the foot cannot escape',
    ],
    commonMistakes: [
      'Placing the shin on the ankle instead of the calf belly — ankle compression is weaker and easier to escape',
      'Not trapping their foot — if the foot is free, they can slide out of the compression',
      'Applying the slicer without isolation — they can spin out if their hip is free',
      'Using explosive pressure — calf slicers should be applied progressively for safety',
    ],
    coachingCues: [
      'Shin on the calf belly, not the ankle',
      'Trap the foot, lock the compression',
      'Squeeze heels together — the closer the heels, the tighter the slice',
      "Apply slow — calf slicers don't need explosion",
    ],
    safetySummary: [
      'Calf slicers attack muscle tissue — apply slowly and release when the opponent taps',
      'Do not apply explosive pressure — the compression can cause muscle tearing',
      'Be aware that calf slicers can cause cramps and muscle spasms even after release',
    ],
    keyCorrections: [
      'From saddle: control top leg, bring shin across calf, squeeze heels',
      'From 50/50: step over, trap foot under armpit, drive shin into calf',
      'If they straighten their leg: release — calf slicer requires a bent knee',
    ],
    systemLogic: {
      corePrinciple: 'Calf slicers: enter from leg entanglement (saddle or 50/50) → trap their foot against your body → place your shin across the belly of their calf → squeeze your heels together → compress the calf muscle against the tibia.',
      decisionTree: [
        { condition: 'They straighten their leg', action: 'release and re-enter the leg entanglement — calf slicer requires a bent knee' },
        { condition: 'They spin out', action: 'you lost hip control — re-establish guard or leg entanglement' },
      ],
      exitStrategies: ['If the calf slicer fails, transition to a heel hook or ankle lock', 'If you lose the leg entanglement, recover guard immediately'],
    },
    moneyDetails: [
      'Calf slicers are legal at all belt levels in IBJJF and most no-gi rulesets',
      'The calf slicer is especially effective against larger opponents because it does not require strength',
      'Having a reliable calf slicer gives you a submission option from leg entanglements without heel hook risks',
    ],
    fixItFast: [
      'If they straighten their leg: release immediately and re-enter the leg entanglement',
      'If they spin out: re-establish guard and try a different entry',
      'If the compression is not tight enough: bring your heels closer together',
    ],
    videos: [
      { youtubeId: 'gCb7WEhQF_0', title: 'Calf Slicer System — From Saddle & 50/50', channel: 'BJJ Fanatics', whyUseful: 'Detailed breakdown of calf slicer positioning and finishing mechanics from multiple leg entanglement positions.', relevance: 'primary', level: 'advanced' },
      { youtubeId: 'yfxxC7M6-b4', title: 'Calf Compression Lock — Advanced Details', channel: 'YouTube', whyUseful: 'Shows the finer details of shin placement and foot trapping for maximum compression.', relevance: 'supplemental', level: 'advanced' },
    ],
  },

  // ── 7. mounted-triangle ──
  {
    id: 'mounted-triangle',
    domain: 'submission_systems',
    level: 'advanced',
    name: 'Mounted Triangle / Armbar from Mount',
    aliases: ['mounted triangle', 'S-mount triangle', 'triangle from mount'],
    tags: ['tier:modern-expansion', 'meta:modern-common', 'risk:medium', 'family:submission', 'modern-no-gi'],
    keywords: ['mounted triangle', 'S-mount', 'triangle from mount', 'armbar from mount'],
    modernSystemGroup: 's_mount',
    relatedSkills: [
      { id: 'guard-retention', type: 'supporting' },
    ],
    prerequisiteSkillIds: ['mount-control'],
    archetypeIds: ['submission-chain-hunter'],
    description: 'The mounted triangle uses your top position to trap their arm between your leg and their head, then step over to finish. The S-mount transition is critical — you must climb high on their chest before attacking.',
    shortInstruction: 'Climb to S-mount, trap their near arm with your same-side leg, step your top leg over their head, crunch heels together, squeeze knees.',
    summary: 'The mounted triangle is a high-percentage submission from mount that uses gravity and top pressure to eliminate the opponent ability to stack or posture out. The S-mount climb is the gatekeeper — never attempt from low mount.',
    whyItWorks: [
      'From mount, their arm is already compressed by your body weight — you do not need to break posture like from guard',
      'Gravity works for you — your weight pressing down tightens the triangle without needing to squeeze harder',
      'If they defend the triangle by posturing, you attack the armbar — the triangle-armbar dilemma is stronger from top',
      'They cannot stack you from mount like they can from guard — this removes the primary triangle counter',
    ],
    commonMistakes: [
      'Attempting the mounted triangle from low mount — must climb to S-mount first',
      'Not trapping the arm before stepping over — if the arm is free, the triangle is not available',
      'Stepping the leg across the shin instead of behind the head',
      'Squeezing the knees before crunching the heels — heels first, then knees',
    ],
    coachingCues: [
      'S-mount first, triangle second — never from low mount',
      'Trap the arm before stepping over — if the arm is free, the triangle is not',
      'Heel crunch, knee squeeze — two separate movements, not one',
      'They posture up = your armbar entry',
    ],
    safetySummary: [
      'Do not pull down on the head when applying the triangle — this can strain the neck',
      'Release the triangle immediately if the opponent taps',
      'Be careful not to hyperextend their elbow when transitioning to the armbar',
    ],
    keyCorrections: [
      'If they try to stack: impossible from mount — finish the triangle',
      'If they posture up: swim your arm under their defending arm and armbar',
      'If they turn to their side: release the triangle and take the back',
    ],
    systemLogic: {
      corePrinciple: 'Mounted triangle: from mount → climb to S-mount → trap their near arm → step the top leg over their head (foot behind head) → crunch heels together → squeeze knees → if they posture, transition to armbar.',
      decisionTree: [
        { condition: 'They try to stack', action: 'impossible from mount — finish the triangle' },
        { condition: 'They posture up to defend', action: 'swim your arm under their defending arm and armbar' },
        { condition: 'They turn to their side', action: 'release the triangle and take the back' },
      ],
      exitStrategies: ['If you cannot secure the triangle, return to mount and reset', 'If they escape to guard, stand and pass again'],
    },
    moneyDetails: [
      'The mounted triangle is one of the highest-percentage submissions from mount in no-gi',
      'Mastering the S-mount climb is the key — the triangle comes easily once S-mount is established',
      'The triangle-armbar dilemma from mount is more dangerous for the opponent than from guard',
    ],
    fixItFast: [
      'If they interlock their hands: peel them by rotating your hips',
      'If they posture: immediately transition to armbar',
      'If the triangle is loose: your S-mount position was not high enough',
    ],
    videos: [
      { youtubeId: '7_Ch2uFyxkY', title: 'Mounted Triangle — From S-Mount to Finish', channel: 'BJJ Fanatics', whyUseful: 'Step-by-step breakdown of the mounted triangle including S-mount entry, arm trapping, and finishing mechanics.', relevance: 'primary', level: 'advanced' },
      { youtubeId: 'jV6ajxJ7t0E', title: 'Mounted Triangle Armbar Combination', channel: 'YouTube', whyUseful: 'Shows the triangle-armbar transition from mounted triangle when the opponent defends.', relevance: 'supplemental', level: 'advanced' },
    ],
  },

  // ── 8. peruvian-necktie ──
  {
    id: 'peruvian-necktie',
    domain: 'submission_systems',
    level: 'advanced',
    name: 'Peruvian Necktie',
    aliases: ['Peruvian', 'Peruvian choke', 'front headlock choke'],
    tags: ['tier:advanced-niche', 'meta:specialized', 'risk:safety-critical', 'family:front_headlock', 'modern-no-gi'],
    keywords: ['Peruvian necktie', 'front headlock choke', 'Peruvian choke', 'carotid choke'],
    modernSystemGroup: 'front_headlock',
    relatedSkills: [
      { id: 'snapdown-front-headlock', type: 'chain' },
      { id: 'd-arce-system', type: 'alternative' },
    ],
    prerequisiteSkillIds: ['front-headlock-system'],
    archetypeIds: ['front-headlock-player'],
    description: 'The Peruvian necktie is a front headlock choke that finishes by folding the opponent body forward while compressing both sides of their neck with your biceps and forearm. Unlike the guillotine, it is a blood choke that compresses the carotids.',
    shortInstruction: 'From front headlock, slide arm under neck, grab your own biceps, wrap other arm over head, step to the side, and fold their body forward.',
    summary: 'The Peruvian necktie compresses both carotid arteries simultaneously using your forearm and biceps. It is not a squeeze — the opponent own body weight creates the choke as you fold them forward. Available when the opponent turns away from the front headlock.',
    whyItWorks: [
      'Your forearm and biceps compress both carotid arteries simultaneously — it is a blood choke, not a neck crank',
      'Folding their body forward prevents them from posturing out — their own body weight tightens the choke',
      'The grip creates a locked structure that cannot be peeled open',
      'The Peruvian necktie complements the guillotine (which works when they turn in) — it works when they turn away',
    ],
    commonMistakes: [
      'Squeezing with the arms instead of using body weight — this fatigues the arms and does not choke effectively',
      'Not stepping to the side before folding — you need the angle to create the forward fold',
      'Holding the grip too low on their neck — the choke must compress the carotids on the sides of the neck',
      'Trying the Peruvian against a turtled opponent who is still heavy on their hands',
    ],
    coachingCues: [
      "Fold, don't squeeze — their weight does the choke",
      'Step to the side before folding',
      'Forearm on one side, biceps on the other',
      'Carotids, not the windpipe',
    ],
    safetySummary: [
      'The Peruvian necktie compresses the carotid arteries — apply slowly and release immediately on tap',
      'Do not use the Peruvian necktie as a neck crank — it should target the carotids, not the cervical spine',
      'Ensure the choking arm is positioned correctly to avoid compressing the trachea',
    ],
    keyCorrections: [
      'If they turn into you: switch to guillotine or D\'Arce',
      'If they posture up: Peruvian is available — step and fold',
      'If they go limp: Peruvian will not work — switch to turtle ride or back take',
    ],
    systemLogic: {
      corePrinciple: 'Peruvian necktie: front headlock → opponent turns away (trigger) → slide arm under neck and grab your own biceps → wrap other arm over head → lock figure-four → step to the side → fold their body forward — their weight tightens the choke.',
      decisionTree: [
        { condition: 'They turn into you instead of away', action: 'switch to guillotine or D\'Arce' },
        { condition: 'They posture up', action: 'Peruvian is available — step and fold' },
      ],
      exitStrategies: ['If the Peruvian does not finish, transition to front headlock and re-attack', 'If they escape, use the front headlock to snap them back down'],
    },
    moneyDetails: [
      'The Peruvian necktie is one of the highest-percentage chokes from the front headlock position',
      'Mastering the Peruvian gives you a finisher for when the opponent turns away — completes the front headlock system',
      'The Peruvian necktie is particularly effective against opponents who try to posture out of the front headlock',
    ],
    fixItFast: [
      'If they defend by grabbing your choking arm: pummel back to front headlock and re-attack',
      'If they turn in: switch to guillotine immediately',
      'If the choke is not tight: step deeper to the side before folding',
    ],
    videos: [
      { youtubeId: 'WQH5ohD10Og', title: 'Peruvian Necktie — Front Headlock Choke System', channel: 'BJJ Fanatics', whyUseful: 'Complete breakdown of the Peruvian necktie from entry to finish including grip details and body positioning.', relevance: 'primary', level: 'advanced' },
      { youtubeId: 'NQCyiC8SrsA', title: 'The Peruvian Necktie — Neil Melanson', channel: 'YouTube', whyUseful: 'Neil Melanson demonstrates key details of the Peruvian necktie finish including angle and body weight mechanics.', relevance: 'supplemental', level: 'advanced' },
    ],
  },

  // ── 9. body-triangle-control ──
  {
    id: 'body-triangle-control',
    domain: 'submission_systems',
    level: 'advanced',
    name: 'Body Triangle Control',
    aliases: ['body triangle', 'body triangle submission', 'waist lock'],
    tags: ['tier:modern-expansion', 'meta:modern-common', 'risk:medium', 'family:submission', 'modern-no-gi'],
    keywords: ['body triangle', 'back control', 'waist lock', 'body compression'],
    modernSystemGroup: 'back_triangle',
    relatedSkills: [
      { id: 'rear-naked-choke-system', type: 'chain' },
    ],
    prerequisiteSkillIds: ['back-control'],
    archetypeIds: ['back-control-finisher'],
    description: 'The body triangle uses your legs locked around their waist to control their hips and prevent them from moving. Unlike traditional hooks, the body triangle immobilizes the lower body completely — if the body triangle is tight, they cannot escape the back.',
    shortInstruction: 'From back control, slide top leg over their hip, lock legs around their waist (shin behind knee), squeeze to compress the diaphragm, and hand-fight for the choke.',
    summary: 'The body triangle immobilizes the opponent hips by locking your legs around their waist. It compresses the diaphragm, prevents hip escape, and cannot be peeled off easily. It is primarily a control hold that sets up the rear-naked choke.',
    whyItWorks: [
      'Locking your legs around their waist compresses their diaphragm — they fatigue faster and cannot generate explosive movement',
      'The body triangle prevents hip escape — to escape the back, the opponent must first create hip space',
      'Unlike hooks, the body triangle cannot be peeled off easily — it is a locked structure',
      'The body triangle also functions as a body compression submission — prolonged compression can force a tap',
    ],
    commonMistakes: [
      'Locking the body triangle too high (at their ribs instead of hips) — they can still move their hips',
      'Allowing the body triangle to loosen — a loose triangle gives them space to escape',
      'Using only the body triangle without attacking the choke — you must still work for the RNC',
      'Locking the triangle and relaxing — you still need to hand-fight for the finish',
    ],
    coachingCues: [
      'Hips, not ribs — lock low on the waist',
      'Tight triangle = tight control; loose triangle = escape',
      'Body triangle controls the hips; hands control the choke',
      'Keep it but do not stop working',
    ],
    safetySummary: [
      'The body triangle compresses the diaphragm — if training partner has respiratory issues, use traditional hooks instead',
      'Do not lock the body triangle too tight during positional sparring — release periodically to allow breathing',
      'The body triangle can cause rib discomfort — release if the training partner signals discomfort',
    ],
    keyCorrections: [
      'If they try to peel the triangle: squeeze tighter and continue hand-fighting',
      'If they flatten belly-down: release and switch to hooks or crab ride',
      'If they create space: unlock, adjust, and re-lock tighter',
    ],
    systemLogic: {
      corePrinciple: 'Body triangle control: from back control → slide top leg over their hip → lock legs around their waist (shin behind knee) → squeeze to compress their diaphragm → maintain while hand-fighting for the RNC.',
      decisionTree: [
        { condition: 'They try to peel the triangle', action: 'squeeze tighter and continue hand-fighting' },
        { condition: 'They flatten belly-down', action: 'release the triangle and switch to hooks or crab ride' },
        { condition: 'They create space', action: 'unlock, adjust, and re-lock tighter — never accept a loose triangle' },
      ],
      exitStrategies: ['If you need to adjust position, unlock the triangle, make the adjustment, then re-lock', 'If the body triangle fails, switch to traditional hooks for mobility'],
    },
    moneyDetails: [
      'The body triangle is the highest-percentage back control system in modern no-gi competition',
      'Mastering the body triangle prevents hip escape — the most common back escape method',
      'The body triangle + RNC combination is the most dominant finishing position in no-gi',
    ],
    fixItFast: [
      'If the triangle is loose: walk your hips closer and re-lock',
      'If they flatten belly-down: release the triangle immediately and switch to hooks',
      'If you cannot finish the RNC: maintain the body triangle and wait for them to fatigue',
    ],
    videos: [
      { youtubeId: 'F8chAOGmjbM', title: 'Body Triangle System — Back Control Domination', channel: 'BJJ Fanatics', whyUseful: 'Complete breakdown of body triangle mechanics including locking position, diaphragm compression, and RNC setup.', relevance: 'primary', level: 'advanced' },
      { youtubeId: 'Sl_bcFG5yIM', title: 'Body Triangle — Gordon Ryan Details', channel: 'YouTube', whyUseful: 'Gordon Ryan demonstrates his body triangle system including adjustments and hand-fighting while maintaining the body triangle.', relevance: 'supplemental', level: 'advanced' },
    ],
  },

  // ── 10. gift-wrap-back-take ──
  {
    id: 'gift-wrap-back-take',
    domain: 'back_control',
    level: 'intermediate',
    name: 'Gift Wrap / Arm Drag Back Take',
    aliases: ['gift wrap', 'gift wrap back take', 'arm drag back take'],
    tags: ['tier:modern-expansion', 'meta:modern-common', 'risk:low', 'family:back_take', 'modern-no-gi'],
    keywords: ['gift wrap', 'arm drag back take', 'far arm control', 'back take from side control'],
    modernSystemGroup: 'counter_wrestling',
    relatedSkills: [
      { id: 'leg-drag-to-back-take', type: 'alternative' },
      { id: 'arm-drag-system', type: 'chain' },
    ],
    prerequisiteSkillIds: [],
    archetypeIds: ['back-control-finisher'],
    description: 'The gift wrap controls one of their arms by folding it behind their back, leaving the other arm free and exposing their back. From side control or half guard, you trap their far arm, walk your hand to their wrist, and pull their arm behind their back.',
    shortInstruction: 'From side control, isolate far arm, fold it behind their back, step over their head, spin behind them, and establish back control.',
    summary: 'The gift wrap back take neutralizes the opponent far arm by folding it behind their back, then uses a spin to take the back. With one arm trapped, their ability to defend the back take is halved.',
    whyItWorks: [
      'Folding their arm behind their back creates a handle that controls their shoulder — they cannot turn into you or post',
      'With one arm neutralized, their ability to defend the back take is halved',
      'The gift wrap is available from any top position where you can isolate a far arm',
      'Spinning behind them as you control the gift wrap creates the back take — the spin + arm control prevents them from following',
    ],
    commonMistakes: [
      'Trying the gift wrap from too far away — you must be chest-to-chest to isolate the far arm',
      'Not folding the arm enough behind their back — if the arm is not behind them, they can pull it free',
      'Spinning without controlling the arm — you end up behind them but they still have both arms functional',
      'Holding the gift wrap too long after securing back control — release and progress to the choke',
    ],
    coachingCues: [
      'Chest-to-chest first, then reach for the far arm',
      'Fold it behind their back — thumb points up',
      'Spin tight, stay connected',
      'Gift wrap is the entry; back control is the destination',
    ],
    safetySummary: [
      'Do not force the arm behind their back if they resist strongly — this can injure the shoulder',
      'Fold the arm gently and use the spin to create the back take, not the arm fold alone',
      'If the training partner has a pre-existing shoulder injury, avoid the gift wrap entirely',
    ],
    keyCorrections: [
      'If they resist the arm isolation: switch to arm drag or kimura from side control',
      'If they roll away to escape: follow them — the roll becomes a back take opportunity',
      'If they flatten belly-down: maintain side control and advance to mount instead',
    ],
    systemLogic: {
      corePrinciple: 'Gift wrap back take: from side control/mount → isolate far arm → fold it behind their back → step over their head → spin behind → release gift wrap → establish back control.',
      decisionTree: [
        { condition: 'They resist the arm isolation', action: 'switch to arm drag or kimura from side control' },
        { condition: 'They roll away to escape', action: 'follow them — the roll becomes a back take opportunity' },
        { condition: 'They flatten belly-down', action: 'maintain side control and advance to mount instead' },
      ],
      exitStrategies: ['If the spin fails to get the back, return to side control and try a different back take entry', 'If they turn into you, switch to mount'],
    },
    moneyDetails: [
      'The gift wrap is the highest-percentage back take from side control in no-gi',
      'Mastering the gift wrap gives you a reliable path from side control to back control',
      'The gift wrap is particularly effective against opponents who post on the far arm to escape side control',
    ],
    fixItFast: [
      'If they resist the arm isolation: switch to arm drag or kimura',
      'If the spin is not working: your step was not deep enough — step farther over their head',
      'If they follow you during the spin: keep your chest connected and complete the back take',
    ],
    videos: [
      { youtubeId: 'FwvQ2qM3MK0', title: 'Gift Wrap Back Take — From Side Control', channel: 'BJJ Fanatics', whyUseful: 'Step-by-step breakdown of the gift wrap back take from side control including arm isolation and spin mechanics.', relevance: 'primary', level: 'intermediate' },
      { youtubeId: 'MnwAMIG3Fvc', title: 'Gift Wrap Back Take Details — BJJ', channel: 'YouTube', whyUseful: 'Demonstrates the key details of gift wrap including hand placement and footwork for the spin.', relevance: 'supplemental', level: 'intermediate' },
    ],
  },

  // ── 11. leg-drag-to-back-take ──
  {
    id: 'leg-drag-to-back-take',
    domain: 'back_control',
    level: 'advanced',
    name: 'Leg Drag to Back Take',
    aliases: ['leg drag back take', 'leg drag to back'],
    tags: ['tier:modern-expansion', 'meta:modern-common', 'risk:medium', 'family:back_take', 'modern-no-gi'],
    keywords: ['leg drag', 'back take', 'pass and back take', 'leg drag chain'],
    modernSystemGroup: 'crab_ride',
    relatedSkills: [
      { id: 'gift-wrap-back-take', type: 'alternative' },
    ],
    prerequisiteSkillIds: [],
    archetypeIds: ['back-control-finisher'],
    description: 'The leg drag to back take uses the leg drag to expose their back. When they post the far arm to defend the leg drag, you release the leg, swim under their arm, and spin behind.',
    shortInstruction: 'Control their near leg, drag it across your body, opponent posts far arm (trigger), release the leg, swim under their arm, and spin behind.',
    summary: 'The leg drag to back take is a continuous movement from guard passing to back control. The leg drag forces the opponent to post with their far arm — and that post becomes the entry for the back take.',
    whyItWorks: [
      'The leg drag already has them on one side — they are already partially exposed for the back take',
      'Their defensive response (posting the far arm) creates the back take opening',
      'The transition is continuous — there is no pause between pass and back take',
      'Releasing the leg and swimming under their arm reverses the angle in one movement',
    ],
    commonMistakes: [
      'Holding the leg drag too long — you must release when they post the far arm',
      'Swimming over their arm instead of under — swimming under gives you back access',
      'Not controlling their far hip during the spin — they can turn and face you',
      'Losing proximity during the transition — you must stay connected throughout',
    ],
    coachingCues: [
      'Drag the leg, read the post, swim under',
      "Release the leg when they post — that's your trigger",
      'Swim under the arm, not over',
      'Stay connected — no daylight',
    ],
    safetySummary: [
      'Be careful not to hyperextend their leg during the leg drag — control the leg at the ankle or pant leg',
      'Do not yank the leg aggressively — a controlled drag with proper footwork is safer',
      'If the opponent resists heavily, release the leg drag and switch to a pass instead',
    ],
    keyCorrections: [
      'If they do not post the far arm: continue the leg drag to side control or mount',
      'If they post and you swim through: back control established',
      'If they turn away during the drag: release the leg and take the back directly',
    ],
    systemLogic: {
      corePrinciple: 'Leg drag to back take: control their near leg → drag it across your body → opponent posts far arm (trigger) → release the leg → swim under their posted arm → spin behind → establish back control.',
      decisionTree: [
        { condition: 'They do not post the far arm', action: 'continue the leg drag to side control or mount' },
        { condition: 'They post and you swim through', action: 'back control established' },
        { condition: 'They turn away during the drag', action: 'release the leg and take the back directly' },
      ],
      exitStrategies: ['If the back take fails, you should still have side control', 'If they turn into you, switch to the pass'],
    },
    moneyDetails: [
      'The leg drag to back take is a high-value chain that connects passing to back control seamlessly',
      'Mastering this transition gives you a direct path from guard passing to 4-point back control',
      'The leg drag to back take is particularly effective against opponents who base wide to defend the pass',
    ],
    fixItFast: [
      'If they do not post: continue the drag to side control — the back take is not available',
      'If you swim over instead of under: reset and swim under the arm',
      'If they turn into you during the drag: switch to the pass — the back take is no longer available',
    ],
    videos: [
      { youtubeId: 'AET2PZqH_t4', title: 'Leg Drag to Back Take — Passing & Back Control', channel: 'BJJ Fanatics', whyUseful: 'Complete breakdown of the leg drag to back take chain including timing, far arm post read, and spin mechanics.', relevance: 'primary', level: 'advanced' },
      { youtubeId: 'T-2mTyQ99H4', title: 'Dante Leon — Leg Drag Back Take System', channel: 'YouTube', whyUseful: 'Dante Leon demonstrates his leg drag to back take system with emphasis on connection and transition timing.', relevance: 'supplemental', level: 'advanced' },
    ],
  },

  // ── 12. turtle-to-guard-recovery ──
  {
    id: 'turtle-to-guard-recovery',
    domain: 'escapes',
    level: 'intermediate',
    name: 'Turtle to Guard Recovery',
    aliases: ['guard recovery from turtle', 'turtle guard recovery'],
    tags: ['tier:modern-expansion', 'meta:modern-common', 'risk:low', 'family:escape', 'modern-no-gi'],
    keywords: ['turtle escape', 'guard recovery', 'hip switch', 'turtle guard'],
    modernSystemGroup: 'safety',
    relatedSkills: [
      { id: 'turtle-escape-standup', type: 'alternative' },
    ],
    prerequisiteSkillIds: [],
    archetypeIds: ['guard-retention-specialist'],
    description: 'The turtle to guard recovery is a specific escape from turtle back to a neutral or offensive guard position. It uses a hip switch and pummel to re-establish guard engagement.',
    shortInstruction: 'From turtle, protect neck, read weight commitment, drop near hip, kick far leg through, pummel inside arm, re-establish guard.',
    summary: 'Turtle to guard recovery uses an explosive hip switch to create space, re-engage the opponent, and establish guard. Unlike the stand-up which disengages, guard recovery keeps the fight in your guard where you can attack.',
    whyItWorks: [
      'From turtle, you can explosively hip escape when the opponent commits weight forward',
      'The hip switch creates space to bring your legs between you and them',
      'Pummeling the inside arm prevents them from establishing seatbelt or body triangle control',
      'Recovering to guard rather than standing is safer when the opponent has weight committed on top',
    ],
    commonMistakes: [
      'Trying to recover guard before protecting the neck — always cover the neck first',
      'Dropping both hands to the mat to stand up — this exposes the back for a choke',
      'Kicking through without pummeling the inside arm — they maintain seatbelt control',
      'Staying in turtle too long — turtle is a reactive position; you must read and explode',
    ],
    coachingCues: [
      'Neck first, then hip switch, then pummel',
      'Drop the hip, kick the leg through — one explosive movement',
      'Pummel the inside arm or they keep the seatbelt',
      "Read their weight commitment — that's your trigger",
    ],
    safetySummary: [
      'Protect your neck before attempting any turtle escape — the choke comes first',
      'Do not explode into a position where your neck or spine is exposed',
      'If the opponent has a deep seatbelt lock, do not fight it — pummel the arm first',
    ],
    keyCorrections: [
      'If they commit weight forward: your trigger — hip switch and recover guard',
      'If they circle to the side: sit back to guard directly',
      'If they flatten you: turtle is lost — protect neck and wait for them to create space',
    ],
    systemLogic: {
      corePrinciple: 'Turtle to guard recovery: from turtle → protect neck → read opponent weight commitment forward (trigger) → drop near hip to mat → kick far leg through → pummel inside arm → re-establish guard.',
      decisionTree: [
        { condition: 'They commit weight forward', action: 'your trigger — hip switch and recover guard' },
        { condition: 'They circle to the side instead', action: 'sit back to guard directly' },
        { condition: 'They flatten you belly-down', action: 'turtle is lost — protect neck and wait for space' },
      ],
      exitStrategies: ['If guard recovery fails, stand up and reset', 'If they take the back during the attempt, protect your neck and escape from the back'],
    },
    moneyDetails: [
      'Turtle to guard recovery is a safer alternative to the turtle stand-up when the opponent has heavy weight forward',
      'Mastering guard recovery from turtle removes the fear of being taken down from turtle',
      'Guard recovery is particularly useful against opponents who immediately attack the back from turtle',
    ],
    fixItFast: [
      'If they grab a seatbelt: pummel the inside arm before attempting the hip switch',
      'If you cannot kick through: your hips are too high — drop the hip lower before kicking',
      'If they flatten you: wait for them to create space, then explode into the hip switch',
    ],
    videos: [
      { youtubeId: '61unSJ7vu4I', title: 'Recovering from the Turtle Position — Lachlan Giles', channel: 'Submeta', whyUseful: 'Lachlan Giles explains the turtle to guard recovery system with emphasis on hip switch timing and arm pummeling.', relevance: 'primary', level: 'intermediate' },
      { youtubeId: 'qshG7pBG1Ag', title: 'Escaping & Weaponizing The Turtle', channel: 'Knight Jiu Jitsu', whyUseful: 'Demonstrates multiple turtle escape options including guard recovery with positional context.', relevance: 'supplemental', level: 'intermediate' },
    ],
  },
]

// ── Localized names and descriptions ──

const translations: Record<string, { vi: { name: string; description: string }; fr: { name: string; description: string } }> = {
  'lateral-drop-headlock-throw': {
    vi: { name: 'Lateral Drop / Đòn quật headlock', description: 'Lateral drop là đòn quật hông từ tư thế headlock hoặc overhook. Bạn dùng hông làm điểm tựa để xoay đối thủ qua người và đổ xuống thảm. Trong BJJ, điểm mấu chốt là hạ cánh ở tư thế kiểm soát (side control hoặc mount) thay vì đổ theo họ.' },
    fr: { name: 'Lateral Drop / Projection par clé de tête', description: "Le lateral drop est une projection de hanche à partir d'une clé de tête ou d'un overhook. Vous utilisez vos hanches comme pivot pour faire basculer l'adversaire par-dessus votre corps. En BJJ, la clé est d'atterrir en position dominante plutôt que de les suivre au sol." },
  },
  'berimbolo-back-take': {
    vi: { name: 'Berimbolo / Đòn xoay lưng', description: 'Berimbolo sử dụng động tác lộn người qua vai để đảo ngược góc từ dưới đối thủ ra sau lưng họ. Từ De La Riva hoặc RDLR, bạn lộn khi họ bước tới, móc hông xa của họ và lên phía sau.' },
    fr: { name: 'Berimbolo / Prise de dos par inversion', description: "Le berimbolo utilise une inversion pour passer de sous l'adversaire à derrière lui. De la garde DLR ou RDLR, vous roulez sous lui quand il avance, accrochez sa hanche éloignée et revenez derrière." },
  },
  'k-guard-to-outside-ashi': {
    vi: { name: 'K-Guard sang Outside Ashi', description: 'K-guard to outside ashi là chuỗi đòn lối vào leg lock chính từ K-guard. Khi đối thủ phòng thủ K-guard, bạn thả móc K-guard và vào lại trực tiếp outside ashi.' },
    fr: { name: 'K-Guard vers Outside Ashi', description: "Le K-guard vers outside ashi est la principale chaîne d'entrée en leg lock depuis le K-guard. Quand l'adversaire défend le K-guard, vous relâchez le crochet et entrez directement en outside ashi." },
  },
  'inside-outside-heel-hook': {
    vi: { name: 'Inside & Outside Heel Hook — Kết thúc', description: 'Heel hook kết thúc bằng cách xoay bàn chân tương đối so với đầu gối, tạo ra bằng cách xoay hông và vai của bạn. Inside heel hook xoay chân ra ngoài, outside heel hook xoay chân vào trong.' },
    fr: { name: 'Finitions Heel Hook Intérieur & Extérieur', description: 'La finition heel hook est une rotation du pied par rapport au genou, créée par la rotation de vos propres hanches et épaules. Le heel hook intérieur tourne le pied vers lextérieur, lextérieur vers lintérieur.' },
  },
  'toe-hold-system': {
    vi: { name: 'Hệ thống Toe Hold / Estima Lock', description: 'Toe hold tấn công mắt cá chân ở tư thế gấp mu bàn chân (dorsiflexion) kết hợp với xoay. Biến thể Estima lock sử dụng nắm figure-four để tạo thêm lực xoay.' },
    fr: { name: "Système de Toe Hold / Estima Lock", description: "Le toe hold attaque la cheville en dorsiflexion combinée à une rotation. La variante Estima lock utilise une prise en figure-four pour plus de torque." },
  },
  'calf-slicer-system': {
    vi: { name: 'Hệ thống Calf Slicer / Khóa nén', description: 'Calf slicer nén cơ bắp chân giữa xương ống chân của bạn và xương chày/xương đùi của họ, tạo ra áp lực đau và khóa cơ.' },
    fr: { name: "Système de Calf Slicer / Verrouillage par compression", description: "Le calf slicer comprime le muscle du mollet entre votre tibia et leur propre tibia, créant une pression douloureuse et un verrouillage musculaire." },
  },
  'mounted-triangle': {
    vi: { name: 'Mounted Triangle / Armbar từ Mount', description: 'Mounted triangle sử dụng tư thế trên cao để kẹp tay họ giữa chân bạn và đầu họ, sau đó bước qua để kết thúc. Việc chuyển lên S-mount là rất quan trọng.' },
    fr: { name: 'Triangle Monté / Armbar depuis la Monture', description: "Le triangle monté utilise votre position supérieure pour piéger leur bras entre votre jambe et leur tête. La transition vers le S-mount est essentielle." },
  },
  'peruvian-necktie': {
    vi: { name: 'Peruvian Necktie', description: 'Peruvian necktie là đòn siết cổ từ front headlock, kết thúc bằng cách gập thân đối thủ về phía trước trong khi nén cả hai bên cổ họ bằng bắp tay và cẳng tay của bạn.' },
    fr: { name: 'Peruvian Necktie', description: "Le Peruvian necktie est un étranglement en front headlock qui se termine en pliant le corps de l'adversaire vers l'avant tout en comprimant les deux côtés de son cou." },
  },
  'body-triangle-control': {
    vi: { name: 'Kiểm soát Body Triangle', description: 'Body triangle sử dụng chân của bạn khóa quanh eo họ để kiểm soát hông và ngăn họ di chuyển. Nó nén cơ hoành và ngăn thoát hông.' },
    fr: { name: 'Contrôle Body Triangle', description: "Le body triangle utilise vos jambes verrouillées autour de leur taille pour contrôler leurs hanches et les empêcher de bouger. Il comprime le diaphragme et empêche la fuite des hanches." },
  },
  'gift-wrap-back-take': {
    vi: { name: 'Gift Wrap / Đòn xoay lưng từ Arm Drag', description: 'Gift wrap điều khiển một tay của họ bằng cách gập ra sau lưng, để tay kia tự do và lộ lưng họ. Từ side control, bạn bẫy tay xa và xoay ra sau.' },
    fr: { name: 'Gift Wrap / Prise de dos par Arm Drag', description: "Le gift wrap contrôle un de leurs bras en le pliant derrière leur dos, exposant leur dos. De side control, vous piégez le bras éloigné et pivotez derrière." },
  },
  'leg-drag-to-back-take': {
    vi: { name: 'Leg Drag sang Back Take', description: 'Leg drag to back take sử dụng leg drag để lộ lưng đối thủ. Khi họ chống tay xa để phòng thủ leg drag, bạn thả chân, luồn dưới tay họ và xoay ra sau.' },
    fr: { name: 'Leg Drag vers Prise de Dos', description: "Le leg drag vers la prise de dos utilise le leg drag pour exposer le dos de l'adversaire. Quand il poste le bras éloigné pour défendre, vous relâchez la jambe et pivotez derrière." },
  },
  'turtle-to-guard-recovery': {
    vi: { name: 'Phục hồi Guard từ Tư thế Rùa', description: 'Phục hồi guard từ turtle sử dụng động tác chuyển hông bùng nổ để tạo khoảng trống, tái kết nối với đối thủ và thiết lập guard.' },
    fr: { name: 'Récupération de Garde depuis la Tortue', description: "La récupération de garde depuis la tortue utilise un basculement de hanche explosif pour créer de l'espace, se réengager avec l'adversaire et établir la garde." },
  },
}

// ── Write all files ──

let count = 0
for (const skill of skills) {
  const dir = join(BASE, skill.domain, skill.id)

  // skill.json
  writeFileSync(join(dir, 'skill.json'), JSON.stringify({
    id: skill.id,
    domain: skill.domain,
    level: skill.level,
    name: skill.name,
    aliases: skill.aliases,
    tags: skill.tags,
    keywords: skill.keywords,
    modernSystemGroup: skill.modernSystemGroup,
    relatedSkills: skill.relatedSkills,
    prerequisiteSkillIds: skill.prerequisiteSkillIds,
    relatedPositions: [],
    relatedConcepts: [],
    archetypeIds: skill.archetypeIds,
    trainingMethodIds: [],
    featureFlags: { hasMicroDetails: false, hasChecklist: false, hasVideos: true, hasStateMachine: false },
    contentRefs: { videos: 'videos.json' },
    updatedAt: new Date().toISOString(),
  }, null, 2) + '\n', 'utf-8')
  console.log(`  ✓ ${skill.domain}/${skill.id}/skill.json`)
  count++

  // content.en.json
  writeFileSync(join(dir, 'content.en.json'), JSON.stringify({
    id: skill.id,
    locale: 'en',
    name: skill.name,
    shortName: undefined,
    description: skill.description,
    shortInstruction: skill.shortInstruction,
    summary: skill.summary,
    whyItWorks: skill.whyItWorks,
    commonMistakes: skill.commonMistakes,
    coachingCues: skill.coachingCues,
    safetySummary: skill.safetySummary,
    keyCorrections: skill.keyCorrections,
    systemLogic: skill.systemLogic,
    moneyDetails: skill.moneyDetails,
    fixItFast: skill.fixItFast,
  }, null, 2) + '\n', 'utf-8')
  console.log(`  ✓ ${skill.domain}/${skill.id}/content.en.json`)
  count++

  // content.vi.json
  const tvi = translations[skill.id]?.vi
  writeFileSync(join(dir, 'content.vi.json'), JSON.stringify({
    id: skill.id,
    locale: 'vi',
    name: tvi?.name ?? '',
    description: tvi?.description ?? '',
    whyItWorks: skill.whyItWorks,
    commonMistakes: skill.commonMistakes,
    coachingCues: skill.coachingCues,
  }, null, 2) + '\n', 'utf-8')
  console.log(`  ✓ ${skill.domain}/${skill.id}/content.vi.json`)
  count++

  // content.fr.json
  const tfr = translations[skill.id]?.fr
  writeFileSync(join(dir, 'content.fr.json'), JSON.stringify({
    id: skill.id,
    locale: 'fr',
    name: tfr?.name ?? '',
    description: tfr?.description ?? '',
    whyItWorks: skill.whyItWorks,
    commonMistakes: skill.commonMistakes,
    coachingCues: skill.coachingCues,
  }, null, 2) + '\n', 'utf-8')
  console.log(`  ✓ ${skill.domain}/${skill.id}/content.fr.json`)
  count++

  // videos.json
  writeFileSync(join(dir, 'videos.json'), JSON.stringify(skill.videos, null, 2) + '\n', 'utf-8')
  console.log(`  ✓ ${skill.domain}/${skill.id}/videos.json`)
  count++
}

console.log(`\n✅ Done — ${count} files written for ${skills.length} skills`)
