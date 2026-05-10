import type {
  AngleDetail,
  BlackbeltDetailSystem,
  ClampMechanic,
  FinishTip,
  LocalizedText,
  PressureDetail,
  SkillNode,
} from '../types/skill'

const lt = (vi: string, en: string, fr: string): LocalizedText => ({ vi, en, fr })

const isSubmission = (skill: SkillNode) => skill.domain === 'submission_systems' || skill.techniqueFamily === 'submission'
const isPassing = (skill: SkillNode) => skill.domain === 'passing' || skill.techniqueFamily === 'passing'
const isEscape = (skill: SkillNode) => skill.domain === 'escapes' || skill.domain === 'survival_defense' || skill.techniqueFamily === 'escape'
const isWrestling = (skill: SkillNode) => skill.domain === 'wrestle_up_wrestling' || skill.techniqueFamily === 'wrestling'
const isGuard = (skill: SkillNode) => skill.domain === 'guard_retention' || skill.domain === 'guard_offense' || skill.techniqueFamily === 'guard'
const isLegLock = (skill: SkillNode) => skill.riskLevel === 'safety_critical' || skill.tags.some((tag) => tag.includes('heel') || tag.includes('leg-lock') || tag.includes('knee-line') || tag.includes('ashi') || tag.includes('saddle'))

const clamp = (
  id: string,
  title: LocalizedText,
  clampWith: string[],
  clampAgainst: string[],
  exactAction: LocalizedText,
  pressureDirection: LocalizedText,
  whyItWorks: LocalizedText,
  commonLeak: LocalizedText,
  correctionCue: LocalizedText,
): ClampMechanic => ({
  id,
  title,
  situation: lt('Khi contact đã có nhưng đối thủ còn xoay, pummel hoặc tạo frame.', 'When contact exists but the opponent can still rotate, pummel, or build a frame.', 'Quand le contact existe mais l’adversaire peut encore tourner, pummel ou créer un frame.'),
  clampWith,
  clampAgainst,
  exactAction,
  pressureDirection,
  whyItWorks,
  commonLeak,
  correctionCue,
  liveCue: correctionCue,
})

const finish = (
  id: string,
  title: LocalizedText,
  setupRequirement: LocalizedText,
  exactFinishingAction: LocalizedText,
  finishTrigger: LocalizedText,
  falseFinishSignal: LocalizedText,
  opponentEscape: LocalizedText,
  prevention: LocalizedText,
  safetyNote?: LocalizedText,
): FinishTip => ({
  id,
  title,
  situation: lt('Khi control, isolation và angle đã rõ.', 'When control, isolation, and angle are clear.', 'Quand contrôle, isolation et angle sont clairs.'),
  setupRequirement,
  exactFinishingAction,
  bodyPartRoles: [
    { bodyPart: 'head', role: lt('Chặn posture hoặc hướng xoay.', 'Blocks posture or rotation direction.', 'Bloque posture ou direction de rotation.') },
    { bodyPart: 'hands / elbows', role: lt('Loại slack và giữ line finish.', 'Remove slack and keep the finishing line.', 'Enlèvent slack et gardent la ligne de finish.') },
    { bodyPart: 'hips / chest', role: lt('Tạo lực cuối bằng thân người, không bằng giật tay.', 'Create final force with the body, not arm yanking.', 'Créent la force finale avec le corps, pas en tirant aux bras.') },
  ],
  finishTrigger,
  falseFinishSignal,
  opponentEscape,
  prevention,
  safetyNote,
})

const pressure = (
  id: string,
  title: LocalizedText,
  sourceBodyPart: string,
  targetLine: LocalizedText,
  direction: LocalizedText,
  commonWrongDirection: LocalizedText,
  correctionCue: LocalizedText,
): PressureDetail => ({ id, title, sourceBodyPart, targetLine, direction, commonWrongDirection, correctionCue })

const angle = (
  id: string,
  title: LocalizedText,
  angleGoal: LocalizedText,
  howToCreateAngle: LocalizedText,
  whatAnglePrevents: LocalizedText,
  commonMistake: LocalizedText,
  correctionCue: LocalizedText,
): AngleDetail => ({ id, title, angleGoal, howToCreateAngle, whatAnglePrevents, commonMistake, correctionCue })

const safetyNote = lt(
  'Tăng lực từ từ, tap sớm, và reset nếu lực vào cổ, gối, vai hoặc spine không rõ.',
  'Add force gradually, tap early, and reset if force on neck, knee, shoulder, or spine is unclear.',
  'Ajoutez la force progressivement, tapez tôt et reset si la force sur cou, genou, épaule ou colonne est floue.',
)

const domainWords = (skill: SkillNode) => {
  if (isSubmission(skill)) return {
    action: lt('finish sạch', 'clean finish', 'finish propre'),
    line: lt('neck/shoulder/ankle line', 'neck/shoulder/ankle line', 'ligne cou/épaule/cheville'),
    branch: lt('đổi angle, reset hand fight hoặc giữ position.', 'change angle, reset hand fight, or keep position.', 'changer angle, reset hand fight ou garder position.'),
  }
  if (isPassing(skill)) return {
    action: lt('ổn định pass', 'stabilize the pass', 'stabiliser le pass'),
    line: lt('hip line và shoulder line', 'hip line and shoulder line', 'hip line et shoulder line'),
    branch: lt('reset headquarters/bodylock hoặc chuyển hướng pass.', 'reset headquarters/bodylock or redirect the pass.', 'reset headquarters/bodylock ou rediriger le pass.'),
  }
  if (isEscape(skill)) return {
    action: lt('thoát mà không lộ cổ/lưng/chân', 'escape without exposing neck, back, or legs', 'sortir sans exposer cou, dos ou jambes'),
    line: lt('elbow-knee, hip angle và frame line', 'elbow-knee, hip angle, and frame line', 'coude-genou, angle de hanche et frame line'),
    branch: lt('recover guard, turtle có kiểm soát hoặc đứng lên.', 'recover guard, controlled turtle, or stand up.', 'recover guard, turtle contrôlé ou stand-up.'),
  }
  if (isWrestling(skill)) return {
    action: lt('lên top position an toàn cổ', 'come up to top position with neck safety', 'monter top avec sécurité du cou'),
    line: lt('head position, hip line và hand fight', 'head position, hip line, and hand fight', 'head position, hip line et hand fight'),
    branch: lt('đổi sang go-behind, mat return hoặc guard reset.', 'switch to go-behind, mat return, or guard reset.', 'passer go-behind, mat return ou reset garde.'),
  }
  if (isGuard(skill)) return {
    action: lt('giữ guard sống và tạo angle tấn công', 'keep guard alive and create attack angle', 'garder la garde vivante et créer angle d’attaque'),
    line: lt('inside knee, shin frame và hip angle', 'inside knee, shin frame, and hip angle', 'inside knee, shin frame et angle de hanche'),
    branch: lt('pummel lại inside knee, vào wrestle-up hoặc đổi guard.', 'pummel the inside knee back, wrestle up, or change guard.', 'repummel inside knee, wrestle-up ou changer de garde.'),
  }
  return {
    action: lt('giữ control và chọn nhánh tiếp theo', 'keep control and choose the next branch', 'garder contrôle et choisir la prochaine branche'),
    line: lt('head, shoulder, hip và knee line', 'head, shoulder, hip, and knee line', 'head, shoulder, hip et knee line'),
    branch: lt('ổn định lại rồi chuyển sang skill liên quan.', 'stabilize again, then move to a related skill.', 'stabiliser puis passer à une technique liée.'),
  }
}

export const generatedBlackbeltDetailsForSkill = (skill: SkillNode): BlackbeltDetailSystem => {
  const words = domainWords(skill)
  const titleVi = skill.title.vi
  const titleEn = skill.title.en
  const titleFr = skill.title.fr
  const safety = isLegLock(skill) || skill.riskLevel === 'high' || skill.riskLevel === 'safety_critical' ? safetyNote : undefined

  const clampMechanics = [
    clamp(
      `${skill.id}-bb-primary-clamp`,
      lt('Primary clamp', 'Primary clamp', 'Clamp principal'),
      ['head', 'chest', 'elbows', 'hips'],
      ['shoulder line', 'hip line', 'knee line'],
      lt(`${titleVi}: đầu và ngực của tôi đóng vào ${words.line.vi}; khuỷu về ribs để không có khe pummel.`, `${titleEn}: my head and chest close into the ${words.line.en}; elbows return to ribs so there is no pummel gap.`, `${titleFr} : ma tête et ma poitrine ferment sur ${words.line.fr}; les coudes reviennent aux côtes pour supprimer le pummel.`),
      lt('Ép chéo vào line chính, không đè thẳng xuống mat.', 'Drive diagonally into the main line, not straight down into the mat.', 'Pousser en diagonale dans la ligne principale, pas droit vers le tapis.'),
      lt('Clamp đúng làm đối thủ phải phòng thủ theo một hướng thay vì xoay tự do.', 'A correct clamp forces one defensive direction instead of free rotation.', 'Un bon clamp force une direction défensive au lieu de rotation libre.'),
      lt('Ngực nổi, đầu xa, hoặc khuỷu flare tạo lại khoảng trống.', 'Floating chest, distant head, or flared elbows reopen space.', 'Poitrine flottante, tête loin ou coudes ouverts recréent espace.'),
      lt('Đầu-ngực-khuỷu đóng cùng lúc.', 'Head-chest-elbows close together.', 'Tête-poitrine-coudes ferment ensemble.'),
    ),
    clamp(
      `${skill.id}-bb-hip-clamp`,
      lt('Hip line clamp', 'Hip line clamp', 'Clamp hip line'),
      ['hips', 'knees', 'feet'],
      ['opponent hip line'],
      lt(`${titleVi}: hông của tôi đi trước, gối/foot post chặn hông đối thủ quay lại centerline.`, `${titleEn}: my hips lead first; knee or foot post blocks the opponent’s hips from turning back to centerline.`, `${titleFr} : mes hanches dirigent; genou ou foot post bloque le retour des hanches adverses vers centerline.`),
      lt('Pin inward rồi circle ra angle.', 'Pin inward, then circle to angle.', 'Pin inward puis circle vers l’angle.'),
      lt('Hip line bị chặn thì họ khó bridge, invert, pummel knee hoặc đứng lên.', 'A blocked hip line makes bridge, inversion, knee pummel, or standing harder.', 'Hip line bloquée rend bridge, inversion, pummel genou ou stand-up plus difficiles.'),
      lt('Chỉ kéo bằng tay khi hông không tham gia.', 'Pulling only with hands while hips are not involved.', 'Tirer seulement aux mains sans hanches.'),
      lt('Hông lái, tay giữ.', 'Hips steer, hands hold.', 'Hanches dirigent, mains gardent.'),
    ),
  ]

  const finishTips = isSubmission(skill) || isLegLock(skill)
    ? [
        finish(
          `${skill.id}-bb-finish-line`,
          lt('Finish line', 'Finish line', 'Ligne de finish'),
          lt(`${titleVi}: isolation đã có, angle đã rõ, và defensive hand/leg không còn chặn line.`, `${titleEn}: isolation is set, angle is clear, and the defensive hand or leg no longer blocks the line.`, `${titleFr} : isolation posée, angle clair, main ou jambe défensive ne bloque plus la ligne.`),
          lt(`Loại slack khỏi ${words.line.vi}, rồi tăng lực bằng chest/hips chậm và có kiểm soát.`, `Remove slack from the ${words.line.en}, then add force with chest or hips slowly and under control.`, `Enlevez le slack de ${words.line.fr}, puis ajoutez force avec poitrine ou hanches lentement et contrôlé.`),
          lt('Line không còn khe và đối thủ không thể pummel lại trong một nhịp.', 'There is no gap and the opponent cannot pummel back in one beat.', 'Plus d’espace et l’adversaire ne peut pas repummel en un temps.'),
          lt('Đối thủ đau ở khớp/cổ nhưng line finish chưa đóng.', 'The opponent feels joint or neck pain but the finishing line is not closed.', 'Douleur articulaire/cou mais ligne de finish pas fermée.'),
          lt('Họ xoay vai/hông ra ngoài hoặc thắng hand fight.', 'They rotate shoulder/hips out or win the hand fight.', 'Il tourne épaules/hanches dehors ou gagne hand fight.'),
          lt('Giữ clamp trước, finish sau; nếu line bẩn thì reset.', 'Clamp first, finish second; if the line is dirty, reset.', 'Clamp d’abord, finish ensuite; si la ligne est sale, reset.'),
          safety,
        ),
      ]
    : []

  const pressureDetails = [
    pressure(
      `${skill.id}-bb-pressure-diagonal`,
      lt('Directed pressure', 'Directed pressure', 'Pression dirigée'),
      'chest / shoulder / hips',
      words.line,
      lt(`${titleVi}: pressure đi chéo vào line chính để làm mất rotation, không chỉ làm đối thủ khó chịu.`, `${titleEn}: pressure drives diagonally into the main line to remove rotation, not merely to create discomfort.`, `${titleFr} : la pression pousse en diagonale dans la ligne principale pour enlever rotation, pas seulement gêner.`),
      lt('Ép thẳng xuống mat hoặc dùng tay kéo thay cho thân người.', 'Driving straight into the mat or using the arms instead of the body.', 'Pousser droit dans le tapis ou utiliser les bras au lieu du corps.'),
      lt('Ép chéo vào line.', 'Drive diagonal into the line.', 'Pression diagonale dans la ligne.'),
    ),
    pressure(
      `${skill.id}-bb-pressure-release`,
      lt('Pressure release discipline', 'Pressure release discipline', 'Discipline de relâche'),
      'hands / hips',
      lt('safety line', 'safety line', 'ligne de sécurité'),
      lt(`${titleVi}: nếu lực chuyển vào đau sắc ở cổ/gối/vai/spine, giảm lực và reset.`, `${titleEn}: if force turns into sharp neck, knee, shoulder, or spine pain, reduce force and reset.`, `${titleFr} : si la force devient douleur vive cou/genou/épaule/colonne, réduire et reset.`),
      lt('Cố chứng minh finish bằng crank hoặc force thêm.', 'Trying to prove the finish by cranking or adding force.', 'Prouver le finish par crank ou plus de force.'),
      lt('Không rõ lực thì reset.', 'If force is unclear, reset.', 'Force floue: reset.'),
    ),
  ]

  const angleDetails = [
    angle(
      `${skill.id}-bb-angle-line`,
      lt('Angle before force', 'Angle before force', 'Angle avant force'),
      lt(`Tạo angle để ${words.action.vi}.`, `Create angle to ${words.action.en}.`, `Créer l’angle pour ${words.action.fr}.`),
      lt(`${titleVi}: đầu giữ line, hông circle ra ngoài, rồi tay/gối đóng khe còn lại.`, `${titleEn}: head keeps the line, hips circle outside, then hands or knees close the remaining gap.`, `${titleFr} : tête garde la ligne, hanches circle dehors, puis mains ou genoux ferment l’espace restant.`),
      lt('Ngăn đối thủ square lại, pummel lại hoặc dùng bridge thẳng.', 'Prevents the opponent from squaring up, repummeling, or using a straight bridge.', 'Empêche resquare, repummel ou bridge droit.'),
      lt('Tăng lực khi vẫn square và line chưa bị cô lập.', 'Adding force while still square and the line is not isolated.', 'Ajouter force encore square et ligne non isolée.'),
      lt('Angle trước lực.', 'Angle before force.', 'Angle avant force.'),
    ),
  ]

  return {
    overview: lt(
      `${titleVi}: tầng blackbelt là đọc line, đóng clamp, tạo angle rồi mới ${words.action.vi}.`,
      `${titleEn}: blackbelt layer means reading the line, closing the clamp, creating angle, then ${words.action.en}.`,
      `${titleFr} : niveau blackbelt = lire la ligne, fermer le clamp, créer angle puis ${words.action.fr}.`,
    ),
    clampMechanics,
    finishTips,
    pressureDetails,
    angleDetails,
    opponentEscapePrevention: [
      {
        escape: lt('Đối thủ pummel lại inside.', 'The opponent pummels back inside.', 'L’adversaire repummel inside.'),
        earlySignal: lt('Khuỷu/gối của họ quay về giữa line.', 'Their elbow or knee returns toward the center line.', 'Son coude ou genou revient vers centerline.'),
        prevention: lt('Đóng elbow-knee/head clamp trước khi đổi lực.', 'Close elbow-knee or head clamp before changing force.', 'Fermer coude-genou ou head clamp avant de changer force.'),
        nextBestBranch: words.branch,
      },
      {
        escape: lt('Đối thủ tạo angle ngược.', 'The opponent creates the opposite angle.', 'L’adversaire crée l’angle opposé.'),
        earlySignal: lt('Hip line hoặc shoulder line của họ quay ra khỏi pressure.', 'Their hip line or shoulder line rotates away from pressure.', 'Sa hip line ou shoulder line tourne hors pression.'),
        prevention: lt('Theo bằng chest/head trước, tay đi sau.', 'Follow with chest/head first, hands second.', 'Suivre poitrine/tête d’abord, mains ensuite.'),
        nextBestBranch: words.branch,
      },
      {
        escape: lt('Đối thủ thắng hand fight/frame.', 'The opponent wins hand fight or frame.', 'L’adversaire gagne hand fight ou frame.'),
        earlySignal: lt('Cổ tay bị peel, forearm frame cứng lại, hoặc đầu bạn trôi xa.', 'Wrist is peeled, forearm frame hardens, or your head floats away.', 'Poignet peel, frame avant-bras devient dur, ou tête flotte.'),
        prevention: lt('Reset grip, đưa khuỷu về ribs, rồi tạo lại angle.', 'Reset grip, bring elbow to ribs, then rebuild angle.', 'Reset grip, coude aux côtes, puis reconstruire angle.'),
        nextBestBranch: words.branch,
      },
    ],
    oneSentenceGold: lt(
      `${titleVi}: đầu chặn line, hông tạo angle, tay giữ khe; force luôn đến sau clamp.`,
      `${titleEn}: head blocks the line, hips create angle, hands hold the gap; force always comes after clamp.`,
      `${titleFr} : tête bloque la ligne, hanches créent angle, mains gardent l’espace; force vient après clamp.`,
    ),
  }
}
