import type {
  BodyPartKey,
  FastFinishPath,
  LeftRightGuide,
  LocalizedStringArray,
  LocalizedText,
  MicroDetail,
  MicroDetailSystem,
  QualityCheckItem,
  TechniqueQualityChecklist,
} from '../types/skill'

const lt = (vi: string, en: string, fr: string): LocalizedText => ({ vi, en, fr })
const la = (vi: string[], en: string[], fr: string[]): LocalizedStringArray => ({ vi, en, fr })

const mkDetail = (
  id: string,
  category: MicroDetail['category'],
  title: string,
  instruction: string,
  when: string,
  why: string,
  mistake: string,
  cue: string,
  live: string,
  side: MicroDetail['side'] = 'both',
  direction: MicroDetail['direction'] = 'close_in',
  bodyParts: string[] = ['hands', 'hips'],
  safety?: string,
): MicroDetail => ({
  id,
  category,
  title: lt(title, title, title),
  shortInstruction: lt(instruction, instruction, instruction),
  side,
  direction,
  bodyParts,
  whenToUse: lt(when, when, when),
  whyItWorks: lt(why, why, why),
  commonMistake: lt(mistake, mistake, mistake),
  correctionCue: lt(cue, cue, cue),
  liveCue: lt(live, live, live),
  safetyNote: safety ? lt(safety, safety, safety) : undefined,
})

const mkGuide = (id: string, scenario: string, leftHand: string, rightHand: string, leftLeg: string, rightLeg: string, head: string, hips: string, note: string): LeftRightGuide => ({
  id,
  scenario: lt(scenario, scenario, scenario),
  leftHand: lt(leftHand, leftHand, leftHand),
  rightHand: lt(rightHand, rightHand, rightHand),
  leftLeg: lt(leftLeg, leftLeg, leftLeg),
  rightLeg: lt(rightLeg, rightLeg, rightLeg),
  head: lt(head, head, head),
  hips: lt(hips, hips, hips),
  note: lt(note, note, note),
})

const mkPath = (id: string, title: string, steps: Array<[string, string, string]>, finish: string, abort: string, next: string, safety?: string): FastFinishPath => ({
  id,
  title: lt(title, title, title),
  steps: steps.map(([instruction, bodyPart, commonMistake], index) => ({
    id: `${id}-${index + 1}`,
    order: index + 1,
    instruction: lt(instruction, instruction, instruction),
    keyBodyPart: bodyPart,
    commonMistake: lt(commonMistake, commonMistake, commonMistake),
  })),
  finishTrigger: lt(finish, finish, finish),
  abortSignal: lt(abort, abort, abort),
  nextBestOption: lt(next, next, next),
  safetyNote: safety ? lt(safety, safety, safety) : undefined,
})

const mkCheck = (
  id: string,
  title: string,
  question: string,
  success: string,
  failure: string,
  fix: string,
  bodyParts: BodyPartKey[],
  severity: QualityCheckItem['severity'],
  relatedMicroDetailIds: string[] = [],
): QualityCheckItem => ({
  id,
  title: lt(title, title, title),
  question: lt(question, question, question),
  successSignal: lt(success, success, success),
  failureSignal: lt(failure, failure, failure),
  quickFix: lt(fix, fix, fix),
  bodyParts,
  severity,
  relatedMicroDetailIds,
})

const makeSystem = (id: string, title: string, overview: string, kind: 'control' | 'escape' | 'guard' | 'wrestling' | 'safety'): MicroDetailSystem => {
  const titleLower = title.toLowerCase()
  return {
    overview: lt(overview, overview, overview),
    topFiveDetails: [
      mkDetail(`${id}-entry`, 'grip', `${title} entry contact`, `My hands, head, or hips must win the first control point before I add force.`, `When the exchange starts`, `The first body contact decides whether ${titleLower} has a real lane.`, `You add force before one body line is actually attached.`, `Body line first.`, `Line first.`, 'both', 'close_in', ['hands', 'head', 'hips']),
      mkDetail(`${id}-head`, 'head', `${title} head position`, `My head stays on the safe or inside side so the opponent cannot steer my spine.`, `When posture or angle matters`, `Head position controls direction, posture, and neck safety.`, `Your head floats outside the safe line.`, 'Head safe side.', 'Head safe.', 'inside', 'pin_in', ['head', 'shoulders', 'ears']),
      mkDetail(`${id}-hands`, 'hand', `${title} hand line`, `My hands clear the opponent's wrist, grip, or frame before I force the next action.`, `When the opponent can hand fight`, `Hands decide whether the lane stays open or collapses.`, `You ignore the wrist or frame that is blocking the lane.`, 'Clear the hand line.', 'Hands clear.', 'both', 'pin_in', ['hands', 'wrists', 'forearms']),
      mkDetail(`${id}-lower`, kind === 'safety' ? 'safety' : 'hip', `${title} hip and knee line`, `My hips, knees, or feet keep the angle so my upper body does not work alone.`, `When lower body connection matters`, `Lower-body alignment keeps the contact useful under resistance.`, `Your hips float or knees drift away from the line.`, 'Hips under the line.', 'Hips under.', 'both', 'drive_diagonal', ['hips', 'knees', 'feet']),
      mkDetail(`${id}-branch`, 'timing', `${title} next branch`, `If the first lane is blocked, I change angle before forcing through the same resistance.`, `When the first line is denied`, `Changing angle keeps the system moving without losing position.`, `You force one lane until the contact breaks.`, 'Angle, then branch.', 'Angle first.', 'both', 'open_out', ['hands', 'hips', 'head']),
    ],
    leftRightGuides: [
      mkGuide(`${id}-lr1`, `Right-side ${title} work`, 'Left hand covers or posts.', 'Right hand does the main job.', 'Left leg keeps base.', 'Right leg drives the line.', 'Head stays glued to the near side.', 'Hips stay heavy and angled.', 'One side protects, the other side attacks.'),
      mkGuide(`${id}-lr2`, `Left-side ${title} work`, 'Left hand does the main job.', 'Right hand covers or posts.', 'Left leg drives the line.', 'Right leg keeps base.', 'Head stays on the safe side.', 'Hips stay connected and low.', 'Swap roles, keep the same structure.'),
    ],
    fastFinishPaths: [mkPath(
      `${id}-fast`,
      kind === 'escape' ? `${title} fast escape path` : `${title} fast path`,
      [
        [`Attach the first body line for ${titleLower}.`, 'hands', 'You start before the body line is attached.'],
        ['Set the head and hips.', 'head', 'Head drifts and the line breaks.'],
        ['Control hands, hooks, or frames.', 'hands', 'Hands are ignored.'],
        [kind === 'escape' ? 'Recover space and inside position.' : kind === 'guard' ? 'Keep the guard layer alive.' : kind === 'wrestling' ? 'Use the off-balance or shot.' : 'Angle for control or finish.', kind === 'control' ? 'hips' : 'knees', 'You stay square.'],
        [kind === 'escape' ? 'Branch to guard or turtle.' : kind === 'guard' ? 'Recover the next layer.' : kind === 'wrestling' ? 'Finish or re-attack.' : kind === 'safety' ? 'Stop if safety is unclear.' : 'Change angle if blocked.', 'feet', 'You freeze on the first option.'],
      ],
      kind === 'escape' ? 'Space is back and you can recover.' : kind === 'safety' ? 'The line is safe enough to continue.' : 'The structure is stable enough to continue.',
      kind === 'escape' ? 'The line is still trapped.' : 'The first line is lost.',
      kind === 'escape' ? 'Recover the next layer.' : kind === 'safety' ? 'Reset and protect the line.' : 'Move to the next branch.',
      kind === 'safety' ? 'Train slowly and tap early.' : undefined,
    )],
    troubleshootingTips: [
      { problem: lt(`Bạn mất mốc kiểm soát đầu tiên trong ${titleLower}.`, `You lose the first body line on ${titleLower}.`, `Vous perdez la première ligne sur ${titleLower}.`), quickFix: lt('Gắn lại tay, đầu hoặc hông vào đúng line trước khi tăng lực.', 'Reattach the hand, head, or hip line before adding force.', 'Rattachez main, tête ou hanche avant d’ajouter force.'), cue: lt('Line trước.', 'Line first.', 'Ligne d’abord.') },
      { problem: lt('Đầu trôi khỏi safe side.', 'Your head drifts away from the safe side.', 'Votre tête quitte le côté sûr.'), quickFix: lt('Đặt đầu lại bên trong hoặc bên an toàn.', 'Put the head back on the inside or safe side.', 'Replacez la tête inside ou côté sûr.'), cue: lt('Đầu an toàn.', 'Head safe.', 'Tête sûre.') },
      { problem: lt('Tay chưa clear grip/frame của đối thủ.', 'Hands have not cleared the opponent grip or frame.', 'Les mains n’ont pas libéré le grip ou frame adverse.'), quickFix: lt('Clear cổ tay hoặc frame trước khi ép tiếp.', 'Clear the wrist or frame before forcing again.', 'Libérez poignet ou frame avant de forcer.'), cue: lt('Clear tay.', 'Clear hands.', 'Mains libres.') },
      { problem: lt('Hips float or base breaks.', 'Hips float or base breaks.', 'Les hanches flottent ou la base casse.'), quickFix: lt('Lower the hips and rebuild base.', 'Lower the hips and rebuild base.', 'Baissez les hanches et reconstruisez la base.'), cue: lt('Base first.', 'Base first.', 'Base d’abord.') },
      { problem: lt('Line đầu bị chặn.', 'The first lane is blocked.', 'La première ligne est bloquée.'), quickFix: lt('Đổi góc trước khi đổi nhánh.', 'Change angle before branching.', 'Changez l’angle avant la branche.'), cue: lt('Góc trước.', 'Angle first.', 'Angle d’abord.') },
    ],
    doNotDo: la(
      ['Đừng mất mốc kiểm soát đầu tiên.', 'Đừng đẩy vuông khi cần góc.', 'Đừng để đầu trôi ra ngoài.', 'Đừng quên tay phòng thủ.', 'Đừng cố một nhánh quá lâu.'],
      ['Do not lose the first body line.', 'Do not drive square when angle is needed.', 'Do not let the head drift outside.', 'Do not forget the defensive hands.', 'Do not force one branch too long.'],
      ['Ne perdez pas la première ligne.', 'Ne poussez pas carré quand l’angle est nécessaire.', 'Ne laissez pas la tête sortir.', 'N’oubliez pas les mains défensives.', 'Ne forcez pas une seule branche trop longtemps.'],
    ),
    safetyNotes: kind === 'safety' ? la(['Tap early.', 'Do not rotate blindly.', 'Train under supervision.'], ['Tap early.', 'Do not rotate blindly.', 'Train under supervision.'], ['Tapez tôt.', 'Ne tournez pas à l’aveugle.', 'Travaillez sous supervision.']) : la(['Keep the line safe.', 'Tap early when danger appears.', 'Do not force through pain.'], ['Keep the line safe.', 'Tap early when danger appears.', 'Do not force through pain.'], ['Gardez la ligne sûre.', 'Tapez tôt quand le danger apparaît.', 'Ne forcez pas à travers la douleur.']),
  }
}

const makeChecklist = (id: string, title: string, kind: 'control' | 'escape' | 'guard' | 'wrestling' | 'safety', safety?: boolean): TechniqueQualityChecklist => {
  const safetyTitle = safety ? 'Safety line' : 'Safety / settle'
  const safetyQuestion = safety ? 'Is the safety line respected?' : 'Can you settle after the action?'
  const safetySuccess = safety ? 'The danger line is respected.' : 'You can settle and continue.'
  const safetyFailure = safety ? 'The line is still risky.' : 'You did not settle yet.'
  const safetyFix = safety ? 'Stop, reset, and slow down.' : 'Settle before moving on.'
  const checks: QualityCheckItem[] = [
    mkCheck(`${id}-1`, `${title} line`, `Is the first control line for ${title.toLowerCase()} present?`, 'Yes, the line is stable.', 'No, the line is open.', 'Rebuild the first line.', ['hands', 'head', 'hips'], 'critical', [`${id}-entry`]),
    mkCheck(`${id}-2`, 'Head position', 'Is the head on the safe or inside side?', 'Yes, the head helps the line.', 'No, the head floats away.', 'Put the head back on line.', ['head', 'shoulders', 'ears'], 'critical', [`${id}-head`]),
    mkCheck(`${id}-3`, kind === 'safety' ? 'Safety line' : 'Hands and grips', kind === 'safety' ? 'Is the danger line clear?' : 'Are the hands controlling the right line?', kind === 'safety' ? 'The line is safe enough to continue.' : 'The hands are controlling the exchange.', kind === 'safety' ? 'The line is still dangerous.' : 'The hands are too loose.', kind === 'safety' ? 'Stop and reset safety.' : 'Win the hands again.', ['hands', 'wrists', 'forearms'], 'critical', [`${id}-hands`]),
    mkCheck(`${id}-4`, kind === 'guard' ? 'Guard layer' : kind === 'escape' ? 'Inside position' : kind === 'wrestling' ? 'Off-balance or shot' : 'Lower body', kind === 'guard' ? 'Is the guard layer still alive?' : kind === 'escape' ? 'Have you recovered inside position?' : kind === 'wrestling' ? 'Did you create the entry or off-balance?' : 'Are the hips, knees, or feet doing the work?', kind === 'guard' ? 'The guard can still rebuild.' : kind === 'escape' ? 'You have a path back.' : kind === 'wrestling' ? 'The attack line is open.' : 'The lower body is connected.', kind === 'guard' ? 'The guard is collapsing.' : kind === 'escape' ? 'Inside position is gone.' : kind === 'wrestling' ? 'The entry is flat.' : 'The lower body is floating.', kind === 'guard' ? 'Recover the guard layer.' : kind === 'escape' ? 'Rebuild the inside layer.' : kind === 'wrestling' ? 'Change angle and re-enter.' : 'Reconnect the lower body.', ['hips', 'knees', 'feet'], 'major', [`${id}-lower`]),
    mkCheck(`${id}-5`, 'Angle and timing', 'Is the angle or timing correct for the next branch?', 'Yes, the branch is ready.', 'No, you are driving square.', 'Take angle before force.', ['hips', 'knees', 'feet'], 'major', [`${id}-branch`]),
    mkCheck(`${id}-6`, safetyTitle, safetyQuestion, safetySuccess, safetyFailure, safetyFix, ['hands', 'head', 'hips'], 'major', [`${id}-branch`]),
  ]
  return buildChecklist(kind === 'safety' ? 'safety' : kind === 'guard' ? 'guard' : kind === 'escape' ? 'escape' : kind === 'wrestling' ? 'wrestling' : 'control', lt(`Kiểm ${title.toLowerCase()} và các line chính.`, `Check ${title.toLowerCase()} and the main lines.`, `Vérifiez ${title.toLowerCase()} et les lignes principales.`), checks, 70, lt('Checklist tốt enough to continue.', 'Checklist is good enough to continue.', 'La checklist est assez bonne pour continuer.'), lt('Fix the first broken line.', 'Fix the first broken line.', 'Corrigez la première ligne cassée.'))
}

const buildChecklist = (type: TechniqueQualityChecklist['type'], overview: LocalizedText, checks: QualityCheckItem[], passThreshold: number, ifPassed: LocalizedText, ifFailed: LocalizedText): TechniqueQualityChecklist => ({ type, overview, checks, passThreshold, ifPassed, ifFailed })

const systemSpecs: Array<{ id: string; title: string; overview: string; kind: 'control' | 'escape' | 'guard' | 'wrestling' | 'safety'; checklistSafety?: boolean }> = [
  { id: 'positional-hierarchy', title: 'Positional Hierarchy', overview: 'Know which layer is safe, which is dangerous, and which layer should come next.', kind: 'control' },
  { id: 'inside-position', title: 'Inside Position', overview: 'Win the inside lane with hands, head, knees, and hips before you attack or escape.', kind: 'control' },
  { id: 'frames-pummeling', title: 'Frames and Pummeling', overview: 'Use structure to create space, then pummel back inside instead of pushing with arms.', kind: 'escape' },
  { id: 'dilemmas-two-way-attacks', title: 'Dilemmas and Two-Way Attacks', overview: 'Force the opponent to defend one line and expose the next.', kind: 'control' },
  { id: 'failure-response-transitions', title: 'Failure Response and Transitions', overview: 'When the first line fails, change angle, change grip, or change position quickly.', kind: 'control' },
  { id: 'back-survival', title: 'Back Survival', overview: 'Protect the neck, win the hands, and clear the hooks before you think about offense.', kind: 'escape' },
  { id: 'leg-lock-safety-basics', title: 'Leg Lock Safety Basics', overview: 'Hide the heel, free the knee line, and do not rotate blindly.', kind: 'safety', checklistSafety: true },
  { id: 'seated-guard-retention', title: 'Seated Guard Retention', overview: 'Keep inside position, posture control, and a clear recovery lane while seated.', kind: 'guard' },
  { id: 'supine-guard-retention', title: 'Supine Guard Retention', overview: 'Keep frames, feet, and hip movement alive while on your back.', kind: 'guard' },
  { id: 'half-guard-knee-shield', title: 'Half Guard Knee Shield', overview: 'Use the knee shield, underhook, and head line to protect and recover.', kind: 'guard' },
  { id: 'half-guard-wrestle-up', title: 'Half Guard Wrestle-Up', overview: 'Turn the half guard into a stand-up, single leg, or top position.', kind: 'wrestling' },
  { id: 'shin-to-shin-entry', title: 'Shin-to-Shin Entry', overview: 'Use shin contact, posture pull, and angle to enter your attack.', kind: 'wrestling' },
  { id: 'single-leg-x-basics', title: 'Single Leg X Basics', overview: 'Keep the connection, protect the knee line, and sweep or stand at the right time.', kind: 'wrestling' },
  { id: 'k-guard-entry', title: 'K-Guard Entry', overview: 'Use hip angle and hooks to create a safer entering line.', kind: 'guard' },
  { id: 'butterfly-guard-off-balance', title: 'Butterfly Guard Off-Balance', overview: 'Load the hooks and use a pull that breaks balance before the sweep.', kind: 'guard' },
  { id: 'technical-stand-up', title: 'Technical Stand-Up', overview: 'Post, protect the head, and stand without giving up the inside line.', kind: 'wrestling' },
  { id: 'hand-fighting', title: 'Hand Fighting', overview: 'Win the inside tie, peel wrists, and keep the head in the right place.', kind: 'wrestling' },
  { id: 'snapdown-front-headlock', title: 'Snapdown to Front Headlock', overview: 'Snap the head down, control the line, and move behind or to a front headlock.', kind: 'wrestling' },
  { id: 'single-leg-bjj', title: 'Single Leg for BJJ', overview: 'Keep the head safe, protect the knee line, and finish with angle.', kind: 'wrestling' },
  { id: 'sprawl-go-behind', title: 'Sprawl and Go-Behind', overview: 'Kill the shot, keep hips heavy, and circle behind the opponent.', kind: 'wrestling' },
  { id: 'competition-ruleset-awareness', title: 'Competition Ruleset Awareness', overview: 'Use pace, score, and risk to choose the right next exchange.', kind: 'control' },
  { id: 'guard-pulling-strategy', title: 'Guard Pulling Strategy', overview: 'Pull with purpose, land in a preferred guard, and keep the neck safe.', kind: 'guard' },
  { id: 'scramble-control', title: 'Scramble Control', overview: 'Win the head, hips, and inside lane before the scramble gets wild.', kind: 'wrestling' },
]

const extraMicroDetailSystems: Record<string, MicroDetailSystem> = Object.fromEntries(
  systemSpecs.map((spec) => [
    spec.id,
    makeSystem(spec.id, spec.title, spec.overview, spec.kind),
  ]),
)

const extraQualityChecklists: Record<string, TechniqueQualityChecklist> = Object.fromEntries(
  systemSpecs.map((spec) => [
    spec.id,
    makeChecklist(spec.id, spec.title, spec.kind, spec.checklistSafety),
  ]),
)

export { extraMicroDetailSystems, extraQualityChecklists }
