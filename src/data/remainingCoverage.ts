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
  title: LocalizedText,
  instruction: LocalizedText,
  when: LocalizedText,
  why: LocalizedText,
  mistake: LocalizedText,
  cue: LocalizedText,
  live: LocalizedText,
  side: MicroDetail['side'] = 'both',
  direction: MicroDetail['direction'] = 'close_in',
  bodyParts: string[] = ['hands', 'hips'],
  safety?: LocalizedText,
): MicroDetail => ({
  id,
  category,
  title,
  shortInstruction: instruction,
  side,
  direction,
  bodyParts,
  whenToUse: when,
  whyItWorks: why,
  commonMistake: mistake,
  correctionCue: cue,
  liveCue: live,
  safetyNote: safety,
})

const mkGuide = (id: string, scenario: LocalizedText, leftHand: LocalizedText, rightHand: LocalizedText, leftLeg: LocalizedText, rightLeg: LocalizedText, head: LocalizedText, hips: LocalizedText, note: LocalizedText): LeftRightGuide => ({
  id,
  scenario,
  leftHand,
  rightHand,
  leftLeg,
  rightLeg,
  head,
  hips,
  note,
})

const mkPath = (id: string, title: LocalizedText, steps: Array<[LocalizedText, string, LocalizedText]>, finish: LocalizedText, abort: LocalizedText, next: LocalizedText, safety?: LocalizedText): FastFinishPath => ({
  id,
  title,
  steps: steps.map(([instruction, bodyPart, commonMistake], index) => ({
    id: `${id}-${index + 1}`,
    order: index + 1,
    instruction,
    keyBodyPart: bodyPart,
    commonMistake,
  })),
  finishTrigger: finish,
  abortSignal: abort,
  nextBestOption: next,
  safetyNote: safety,
})

const mkCheck = (
  id: string,
  title: LocalizedText,
  question: LocalizedText,
  success: LocalizedText,
  failure: LocalizedText,
  fix: LocalizedText,
  bodyParts: BodyPartKey[],
  severity: QualityCheckItem['severity'],
  relatedMicroDetailIds: string[] = [],
): QualityCheckItem => ({
  id,
  title,
  question,
  successSignal: success,
  failureSignal: failure,
  quickFix: fix,
  bodyParts,
  severity,
  relatedMicroDetailIds,
})

const makeSystem = (id: string, title: string, overview: string, kind: 'control' | 'escape' | 'guard' | 'wrestling' | 'safety'): MicroDetailSystem => {
  const titleViMap: Record<string, string> = {
    'positional-hierarchy': 'Thứ bậc vị trí',
    'inside-position': 'Đường trong',
    'frames-pummeling': 'Frame và pummel',
    'dilemmas-two-way-attacks': 'Dilemma và tấn công hai hướng',
    'failure-response-transitions': 'Phản ứng khi lỗi và chuyển nhánh',
    'back-survival': 'Sống sót ở back',
    'leg-lock-safety-basics': 'An toàn leg lock cơ bản',
    'seated-guard-retention': 'Giữ guard ngồi',
    'supine-guard-retention': 'Giữ guard nằm ngửa',
    'half-guard-knee-shield': 'Half guard knee shield',
    'half-guard-wrestle-up': 'Half guard wrestle-up',
    'shin-to-shin-entry': 'Vào đòn từ shin-to-shin',
    'single-leg-x-basics': 'Single-leg X cơ bản',
    'k-guard-entry': 'Vào K-guard',
    'butterfly-guard-off-balance': 'Butterfly off-balance',
    'technical-stand-up': 'Đứng kỹ thuật',
    'hand-fighting': 'Hand fighting',
    'snapdown-front-headlock': 'Snapdown vào front headlock',
    'single-leg-bjj': 'Single-leg cho BJJ',
    'sprawl-go-behind': 'Sprawl và go-behind',
    'guard-pulling-strategy': 'Chiến lược kéo guard',
    'scramble-control': 'Kiểm soát scramble',
  }
  const titleFrMap: Record<string, string> = {
    'positional-hierarchy': 'Hiérarchie positionnelle',
    'inside-position': 'Inside Position',
    'frames-pummeling': 'Frames et pummeling',
    'dilemmas-two-way-attacks': 'Dilemmes et attaques à deux voies',
    'failure-response-transitions': 'Réponse à l’échec et transitions',
    'back-survival': 'Survie au dos',
    'leg-lock-safety-basics': 'Sécurité leg lock',
    'seated-guard-retention': 'Rétention garde assise',
    'supine-guard-retention': 'Rétention garde supine',
    'half-guard-knee-shield': 'Knee shield half guard',
    'half-guard-wrestle-up': 'Half guard wrestle-up',
    'shin-to-shin-entry': 'Entrée shin-to-shin',
    'single-leg-x-basics': 'Bases single-leg X',
    'k-guard-entry': 'Entrée K-guard',
    'butterfly-guard-off-balance': 'Butterfly off-balance',
    'technical-stand-up': 'Technical stand-up',
    'hand-fighting': 'Hand fighting',
    'snapdown-front-headlock': 'Snapdown front headlock',
    'single-leg-bjj': 'Single-leg pour le BJJ',
    'sprawl-go-behind': 'Sprawl et go-behind',
    'guard-pulling-strategy': 'Stratégie guard pull',
    'scramble-control': 'Contrôle du scramble',
  }
  const titleVi = titleViMap[id] ?? title
  const titleFr = titleFrMap[id] ?? title
  const titleLower = title.toLowerCase()
  
  const l_overview = lt(
    `Hệ thống ${titleVi} tập trung vào kiểm soát vị trí, giữ đường an toàn và chuyển nhánh đúng thời điểm.`,
    `The ${title} system focuses on positional control, staying on the safe lane, and branching at the right time.`,
    `Le système ${titleFr} se concentre sur le contrôle positionnel, le maintien de la ligne de sécurité et la transition au bon moment.`
  )

  return {
    overview: l_overview,
    topFiveDetails: [
      mkDetail(
        `${id}-entry`, 
        'grip', 
        lt(`${titleVi}: điểm chạm`, `${title}: contact point`, `${titleFr} : point de contact`),
        lt(`Tay, đầu hoặc hông của tôi phải thắng điểm kiểm soát đầu tiên trước khi tăng lực.`, `Hands, head, or hips must win the first control point before adding force.`, `Mains, tête ou hanches doivent gagner le premier point de contrôle avant d’ajouter force.`),
        lt(`Khi bắt đầu pha trao đổi`, `At the start of the exchange`, `Au début de l’échange`),
        lt(`Điểm chạm cơ thể đầu tiên quyết định ${titleLower} có vào đúng đường hay không.`, `The first body contact decides if ${titleLower} stays on the correct line.`, `Le premier contact décide si ${titleLower} reste sur la bonne ligne.`),
        lt(`Bạn tăng lực khi chưa gắn được điểm chạm chính.`, `You add force before the main contact point is attached.`, `Vous ajoutez force avant que le point de contact soit attaché.`),
        lt(`Điểm chạm trước, lực sau.`, `Contact first, force second.`, `Contact d’abord, force ensuite.`),
        lt('Ưu tiên điểm chạm.', 'Priority on contact.', 'Priorité au contact.'),
        'both', 
        'close_in', 
        ['hands', 'head', 'hips']
      ),
      mkDetail(
        `${id}-head`, 
        'head', 
        lt(`${titleVi}: vị trí đầu`, `${title}: head position`, `${titleFr} : position de la tête`),
        lt(`Đầu của tôi phải ở phía an toàn hoặc phía trong để đối thủ không điều khiển được trục cột sống.`, `My head must stay on the safe side or inside to prevent spinal axis control.`, `Ma tête doit rester du côté sûr ou inside pour empêcher le contrôle de l’axe vertébral.`),
        lt(`Khi cần giữ posture hoặc góc`, `When maintaining posture or angle`, `Pour maintenir posture ou angle`),
        lt(`Vị trí đầu quyết định hướng lực, posture và an toàn cổ.`, `Head position decides force direction, posture, and neck safety.`, `La position de la tête décide de la direction, posture et sécurité du cou.`),
        lt(`Đầu trôi ra ngoài đường an toàn.`, `Head drifts outside the safe line.`, `La tête quitte la ligne de sécurité.`),
        lt('Giữ đầu ở phía an toàn.', 'Keep head on the safe side.', 'Garder la tête du côté sûr.'),
        lt('Đầu an toàn.', 'Head safe.', 'Tête sûre.'),
        'inside', 
        'pin_in', 
        ['head', 'shoulders', 'ears']
      ),
      mkDetail(
        `${id}-hands`, 
        'hand', 
        lt(`${titleVi}: đường tay`, `${title}: hand lines`, `${titleFr} : lignes de bras`),
        lt(`Tay của tôi phải dọn cổ tay, grip hoặc frame của đối thủ trước khi ép pha kế tiếp.`, `My hands must clear the opponent's wrists, grips, or frames before the next phase.`, `Mes mains doivent libérer poignets, grips ou frames adverses avant la phase suivante.`),
        lt(`Khi đối thủ có thể hand-fight`, `When the opponent can hand-fight`, `Quand l’adversaire peut hand-fight`),
        lt(`Tay quyết định đường vào còn mở hay đã bị khóa lại.`, `Hands decide if the entry is still open or has been locked.`, `Les mains décident si l’entrée est ouverte ou verrouillée.`),
        lt(`Bạn bỏ qua cổ tay hoặc frame đang chặn đường vào.`, `You ignore the wrist or frame blocking the entry.`, `Vous ignorez le poignet ou frame bloquant l’entrée.`),
        lt('Dọn đường tay trước.', 'Clear hand lines first.', 'Libérer les mains d’abord.'),
        lt('Tay đã clear.', 'Hands cleared.', 'Mains libres.'),
        'both', 
        'pin_in', 
        ['hands', 'wrists', 'forearms']
      ),
      mkDetail(
        `${id}-lower`, 
        kind === 'safety' ? 'safety' : 'hip', 
        lt(`${titleVi}: thân dưới`, `${title}: lower body`, `${titleFr} : bas du corps`),
        lt(`Hông, gối hoặc bàn chân của tôi phải giữ góc để thân trên không làm việc một mình.`, `My hips, knees, or feet must maintain the angle so the upper body doesn't work alone.`, `Mes hanches, genoux ou pieds doivent garder l’angle pour que le haut ne travaille pas seul.`),
        lt(`Khi kết nối thân dưới là yếu tố chính`, `When lower body connection is key`, `Quand la connexion du bas est clé`),
        lt(`Căn chỉnh thân dưới đúng giúp điểm chạm vẫn hiệu quả dưới áp lực kháng lực.`, `Correct lower body alignment keeps contact effective under resistance.`, `L’alignement du bas garde le contact efficace sous résistance.`),
        lt(`Hông bị nổi hoặc gối trôi khỏi đường lực.`, `Hips float or knees drift off the force line.`, `Les hanches flottent ou les genoux quittent la ligne.`),
        lt('Hông nằm dưới đường lực.', 'Hips stay under the force line.', 'Hanches sous la ligne de force.'),
        lt('Hông ở dưới.', 'Hips low.', 'Hanches basses.'),
        'both', 
        'drive_diagonal', 
        ['hips', 'knees', 'feet']
      ),
      mkDetail(
        `${id}-branch`, 
        'timing', 
        lt(`${titleVi}: chuyển nhánh`, `${title}: branching`, `${titleFr} : transition`),
        lt(`Nếu đường đầu tiên bị chặn, tôi đổi góc trước khi ép lại cùng một hướng lực.`, `If the first lane is blocked, I change angle before forcing the same direction again.`, `Si la première ligne est bloquée, je change d’angle avant de forcer à nouveau.`),
        lt(`Khi đường đầu tiên bị từ chối`, `When the first line is denied`, `Quand la première ligne est refusée`),
        lt(`Đổi góc đúng lúc giúp hệ thống tiếp tục chạy mà không mất vị trí.`, `Changing angle at the right time keeps the system running without losing position.`, `Changer d’angle au bon moment garde le système actif sans perdre la position.`),
        lt(`Bạn cố ép một đường đến khi cấu trúc bị gãy.`, `You force one line until the structure breaks.`, `Vous forcez une ligne jusqu’à ce que la structure casse.`),
        lt('Đổi góc rồi chuyển nhánh.', 'Change angle, then branch.', 'Angle avant la branche.'),
        lt('Góc trước.', 'Angle first.', 'Angle d’abord.'),
        'both', 
        'open_out', 
        ['hands', 'hips', 'head']
      ),
    ],
    leftRightGuides: [
      mkGuide(
        `${id}-lr1`, 
        lt(`Phòng thủ/Tấn công bên phải ${titleVi}`, `Right-side ${title} work`, `Travail ${titleFr} côté droit`),
        lt('Tay trái bọc lót hoặc post.', 'Left hand covers or posts.', 'Main gauche couvre ou poste.'),
        lt('Tay phải làm việc chính.', 'Right hand does the main job.', 'Main droite fait le travail principal.'),
        lt('Chân trái giữ base.', 'Left leg keeps base.', 'Jambe gauche garde la base.'),
        lt('Chân phải dẫn hướng lực.', 'Right leg drives the line.', 'Jambe droite dirige la force.'),
        lt('Đầu dán chặt vào phía gần.', 'Head stays glued to the near side.', 'Tête collée au côté proche.'),
        lt('Hông nặng và giữ góc.', 'Hips stay heavy and angled.', 'Hanches lourdes et avec angle.'),
        lt('Một bên bảo vệ, một bên tấn công.', 'One side protects, the other side attacks.', 'Un côté protège, l’autre attaque.')
      ),
      mkGuide(
        `${id}-lr2`, 
        lt(`Phòng thủ/Tấn công bên trái ${titleVi}`, `Left-side ${title} work`, `Travail ${titleFr} côté gauche`),
        lt('Tay trái làm việc chính.', 'Left hand does the main job.', 'Main gauche fait le travail principal.'),
        lt('Tay phải bọc lót hoặc post.', 'Right hand covers or posts.', 'Main droite couvre ou poste.'),
        lt('Chân trái dẫn hướng lực.', 'Left leg drives the line.', 'Jambe gauche dirige la force.'),
        lt('Chân phải giữ base.', 'Right leg keeps base.', 'Jambe droite garde la base.'),
        lt('Đầu ở phía an toàn.', 'Head stays on the safe side.', 'Tête du côté sûr.'),
        lt('Hông kết nối và hạ thấp.', 'Hips stay connected and low.', 'Hanches connectées et basses.'),
        lt('Đổi vai trò, giữ nguyên cấu trúc.', 'Swap roles, keep the same structure.', 'Inverser rôles, garder structure.')
      ),
    ],
    fastFinishPaths: [mkPath(
      `${id}-fast`,
      kind === 'escape' 
        ? lt(`Đường thoát nhanh ${titleVi}`, `${title} fast escape path`, `Sortie rapide ${titleFr}`)
        : lt(`Đường vào nhanh ${titleVi}`, `${title} fast path`, `Chemin rapide ${titleFr}`),
      [
        [lt(`Gắn đường cơ thể đầu tiên cho ${titleLower}.`, `Attach the first body line for ${titleLower}.`, `Attacher la première ligne pour ${titleLower}.`), 'hands', lt('Bạn bắt đầu trước khi đường cơ thể được gắn.', 'You start before the body line is attached.', 'Vous commencez avant que la ligne soit attachée.')],
        [lt('Đặt đầu và hông vào đúng vị trí.', 'Set the head and hips.', 'Placer tête et hanches.'), 'head', lt('Đầu bị trôi và đường lực bị gãy.', 'Head drifts and the line breaks.', 'La tête dévie et la ligne casse.')],
        [lt('Kiểm soát tay, hook hoặc frame.', 'Control hands, hooks, or frames.', 'Contrôler mains, hooks ou frames.'), 'hands', lt('Bỏ qua tay đối thủ.', 'Hands are ignored.', 'Mains ignorées.')],
        [
          kind === 'escape' ? lt('Lấy lại không gian và inside position.', 'Recover space and inside position.', 'Récupérer espace et inside position.') : 
          kind === 'guard' ? lt('Giữ lớp guard sống.', 'Keep the guard layer alive.', 'Garder la couche de garde vivante.') : 
          kind === 'wrestling' ? lt('Dùng off-balance hoặc shot.', 'Use the off-balance or shot.', 'Utiliser off-balance ou shot.') : 
          lt('Lấy góc để kiểm soát hoặc finish.', 'Angle for control or finish.', 'Angle pour contrôle ou finish.'), 
          kind === 'control' ? 'hips' : 'knees', 
          lt('Bạn đứng vuông góc.', 'You stay square.', 'Vous restez carré.')
        ],
        [
          kind === 'escape' ? lt('Chuyển sang guard hoặc turtle.', 'Branch to guard or turtle.', 'Passer en garde ou turtle.') : 
          kind === 'guard' ? lt('Khôi phục lớp kế tiếp.', 'Recover the next layer.', 'Récupérer la couche suivante.') : 
          kind === 'wrestling' ? lt('Finish hoặc tái tấn công.', 'Finish or re-attack.', 'Finir ou réattaquer.') : 
          kind === 'safety' ? lt('Dừng lại nếu an toàn không rõ ràng.', 'Stop if safety is unclear.', 'Arrêter si sécurité floue.') : 
          lt('Đổi góc nếu bị chặn.', 'Change angle if blocked.', 'Changer angle si bloqué.'), 
          'feet', 
          lt('Bạn bị đơ ở lựa chọn đầu tiên.', 'You freeze on the first option.', 'Vous figerez sur le premier choix.')
        ],
      ],
      kind === 'escape' ? lt('Có lại không gian và có thể recover.', 'Space is back and you can recover.', 'Espace récupéré et recovery possible.') : 
      kind === 'safety' ? lt('Đường lực đủ an toàn để tiếp tục.', 'The line is safe enough to continue.', 'Ligne assez sûre pour continuer.') : 
      lt('Cấu trúc đủ ổn định để tiếp tục.', 'The structure is stable enough to continue.', 'Structure assez stable pour continuer.'),
      kind === 'escape' ? lt('Đường lực vẫn bị kẹt.', 'The line is still trapped.', 'La ligne est encore piégée.') : 
      lt('Đường lực đầu tiên đã mất.', 'The first line is lost.', 'La première ligne est perdue.'),
      kind === 'escape' ? lt('Khôi phục lớp kế tiếp.', 'Recover the next layer.', 'Récupérer la couche suivante.') : 
      kind === 'safety' ? lt('Reset và bảo vệ đường lực.', 'Reset and protect the line.', 'Reset et protéger la ligne.') : 
      lt('Chuyển sang nhánh kế tiếp.', 'Move to the next branch.', 'Passer à la branche suivante.'),
      kind === 'safety' ? lt('Tập chậm và tap sớm.', 'Train slowly and tap early.', 'Drill lent et tap tôt.') : undefined,
    )],
    troubleshootingTips: [
      { problem: lt(`Bạn mất mốc kiểm soát đầu tiên trong ${titleLower}.`, `You lose the first body line on ${titleLower}.`, `Vous perdez la première ligne sur ${titleLower}.`), quickFix: lt('Gắn lại tay, đầu hoặc hông vào đúng đường lực trước khi tăng lực.', 'Reattach the hand, head, or hip line before adding force.', 'Rattachez main, tête ou hanche avant d’ajouter force.'), cue: lt('Đường lực trước.', 'Line first.', 'Ligne d’abord.') },
      { problem: lt('Đầu trôi khỏi phía an toàn.', 'Your head drifts away from the safe side.', 'Votre tête quitte le côté sûr.'), quickFix: lt('Đặt đầu lại phía trong hoặc phía an toàn.', 'Put the head back on the inside or safe side.', 'Replacez la tête inside ou côté sûr.'), cue: lt('Đầu an toàn.', 'Head safe.', 'Tête sûre.') },
      { problem: lt('Tay chưa dọn được grip/frame của đối thủ.', 'Hands have not cleared the opponent grip or frame.', 'Les mains n’ont pas libéré le grip ou frame adverse.'), quickFix: lt('Dọn cổ tay hoặc frame trước khi ép tiếp.', 'Clear the wrist or frame before forcing again.', 'Libérez poignet ou frame avant de forcer.'), cue: lt('Dọn tay trước.', 'Clear hands.', 'Mains libres.') },
      { problem: lt('Hông bị nổi hoặc base bị gãy.', 'Hips float or base breaks.', 'Les hanches flottent ou la base casse.'), quickFix: lt('Hạ hông xuống và dựng lại base.', 'Lower the hips and rebuild base.', 'Baissez les hanches et reconstruisez la base.'), cue: lt('Base trước.', 'Base first.', 'Base d’abord.') },
      { problem: lt('Đường đầu bị chặn.', 'The first lane is blocked.', 'La première ligne est bloquée.'), quickFix: lt('Đổi góc trước khi đổi nhánh.', 'Change angle before branching.', 'Changez l’angle avant la branche.'), cue: lt('Góc trước.', 'Angle first.', 'Angle d’abord.') },
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
  const safetyTitle = safety ? lt('Đường an toàn', 'Safety line', 'Ligne de sécurité') : lt('An toàn / Ổn định', 'Safety / settle', 'Sécurité / stabilité')
  const safetyQuestion = safety ? lt('Đường an toàn có được tôn trọng?', 'Is the safety line respected?', 'La ligne de sécurité est-elle respectée ?') : lt('Bạn có ổn định sau hành động?', 'Can you settle after the action?', 'Pouvez-vous stabiliser après l’action ?')
  const safetySuccess = safety ? lt('Đường nguy hiểm được tôn trọng.', 'The danger line is respected.', 'La ligne de danger est respectée.') : lt('Bạn có thể ổn định và tiếp tục.', 'You can settle and continue.', 'Vous pouvez stabiliser et continuer.')
  const safetyFailure = safety ? lt('Đường này vẫn còn rủi ro.', 'The line is still risky.', 'La ligne est encore risquée.') : lt('Bạn chưa ổn định.', 'You did not settle yet.', 'Vous n’avez pas encore stabilisé.')
  const safetyFix = safety ? lt('Dừng lại, reset và tập chậm lại.', 'Stop, reset, and slow down.', 'Arrêtez, resetez et ralentissez.') : lt('Ổn định trước khi di chuyển tiếp.', 'Settle before moving on.', 'Stabilisez avant de continuer.')
  
  const checks: QualityCheckItem[] = [
    mkCheck(
      `${id}-1`, 
      lt(`Đường ${title}`, `${title} line`, `Ligne ${title}`), 
      lt(`Đường kiểm soát đầu tiên cho ${title.toLowerCase()} có hiện diện?`, `Is the first control line for ${title.toLowerCase()} present?`, `La première ligne de contrôle pour ${title.toLowerCase()} est-elle présente ?`), 
      lt('Có, đường lực đã ổn định.', 'Yes, the line is stable.', 'Oui, la ligne est stable.'), 
      lt('Không, đường lực đang hở.', 'No, the line is open.', 'Non, la ligne est ouverte.'), 
      lt('Dựng lại đường đầu tiên.', 'Rebuild the first line.', 'Reconstruisez la première ligne.'), 
      ['hands', 'head', 'hips'], 
      'critical', 
      [`${id}-entry`]
    ),
    mkCheck(
      `${id}-2`, 
      lt('Vị trí đầu', 'Head position', 'Position de la tête'), 
      lt('Đầu ở phía an toàn hay phía trong?', 'Is the head on the safe or inside side?', 'La tête est-elle du côté sûr ou inside ?'), 
      lt('Có, đầu hỗ trợ đường lực.', 'Yes, the head helps the line.', 'Oui, la tête aide la ligne.'), 
      lt('Không, đầu trôi ra ngoài.', 'No, the head floats away.', 'Non, la tête dévie.'), 
      lt('Đặt đầu lại đúng line.', 'Put the head back on line.', 'Replacez la tête sur la ligne.'), 
      ['head', 'shoulders', 'ears'], 
      'critical', 
      [`${id}-head`]
    ),
    mkCheck(
      `${id}-3`, 
      kind === 'safety' ? lt('Đường an toàn', 'Safety line', 'Ligne de sécurité') : lt('Tay và grip', 'Hands and grips', 'Mains et grips'), 
      kind === 'safety' ? lt('Đường nguy hiểm đã clear?', 'Is the danger line clear?', 'La ligne de danger est-elle claire ?') : lt('Tay có đang kiểm soát đúng line?', 'Are the hands controlling the right line?', 'Les mains contrôlent-elles la bonne ligne ?'), 
      kind === 'safety' ? lt('Đường lực đủ an toàn để tiếp tục.', 'The line is safe enough to continue.', 'La ligne est assez sûre pour continuer.') : lt('Tay đang kiểm soát pha trao đổi.', 'The hands are controlling the exchange.', 'Les mains contrôlent l’échange.'), 
      kind === 'safety' ? lt('Đường này vẫn còn nguy hiểm.', 'The line is still dangerous.', 'La ligne est encore dangereuse.') : lt('Tay quá lỏng.', 'The hands are too loose.', 'Les mains sont quá lỏng.'), 
      kind === 'safety' ? lt('Dừng lại và reset an toàn.', 'Stop and reset safety.', 'Arrêtez et resetez la sécurité.') : lt('Thắng lại tay một lần nữa.', 'Win the hands again.', 'Gagnez les mains à nouveau.'), 
      ['hands', 'wrists', 'forearms'], 
      'critical', 
      [`${id}-hands`]
    ),
    mkCheck(
      `${id}-4`, 
      kind === 'guard' ? lt('Lớp guard', 'Guard layer', 'Couche de garde') : kind === 'escape' ? lt('Inside position', 'Inside position', 'Inside position') : kind === 'wrestling' ? lt('Off-balance hoặc shot', 'Off-balance or shot', 'Off-balance ou shot') : lt('Thân dưới', 'Lower body', 'Bas du corps'), 
      kind === 'guard' ? lt('Lớp guard còn sống không?', 'Is the guard layer still alive?', 'La couche de garde est-elle còn sống ?') : kind === 'escape' ? lt('Bạn đã lấy lại inside position chưa?', 'Have you recovered inside position?', 'Avez-vous récupéré inside position ?') : kind === 'wrestling' ? lt('Bạn có tạo được entry hoặc off-balance không?', 'Did you create the entry or off-balance?', 'Avez-vous créé l’entrée ou l’off-balance ?') : lt('Hông, gối hoặc chân có đang làm việc không?', 'Are the hips, knees, or feet doing the work?', 'Les hanches, genoux ou pieds travaillent-ils ?'), 
      kind === 'guard' ? lt('Guard vẫn có thể khôi phục.', 'The guard can still rebuild.', 'La garde peut encore reconstruire.') : kind === 'escape' ? lt('Bạn có đường quay lại.', 'You have a path back.', 'Vous avez un chemin de retour.') : kind === 'wrestling' ? lt('Đường tấn công đang mở.', 'The attack line is open.', 'La ligne d’attaque est ouverte.') : lt('Thân dưới đã kết nối.', 'The lower body is connected.', 'Le bas du corps est connecté.'), 
      kind === 'guard' ? lt('Guard đang sụp đổ.', 'The guard is collapsing.', 'La garde s’effondre.') : kind === 'escape' ? lt('Mất inside position.', 'Inside position is gone.', 'Inside position est perdue.') : kind === 'wrestling' ? lt('Entry bị phẳng.', 'The entry is flat.', 'L’entrée est plate.') : lt('Thân dưới bị trôi.', 'The lower body is floating.', 'Le bas du corps flotte.'), 
      kind === 'guard' ? lt('Khôi phục lớp guard.', 'Recover the guard layer.', 'Récupérez la couche de garde.') : kind === 'escape' ? lt('Dựng lại lớp inside.', 'Rebuild the inside layer.', 'Reconstruisez la couche inside.') : kind === 'wrestling' ? lt('Đổi góc và vào lại.', 'Change angle and re-enter.', 'Changez l’angle et ré-entrez.') : lt('Kết nối lại thân dưới.', 'Reconnect the lower body.', 'Reconnectez le bas du corps.'), 
      ['hips', 'knees', 'feet'], 
      'major', 
      [`${id}-lower`]
    ),
    mkCheck(
      `${id}-5`, 
      lt('Góc và timing', 'Angle and timing', 'Angle et timing'), 
      lt('Góc hoặc timing có đúng cho nhánh kế tiếp?', 'Is the angle or timing correct for the next branch?', 'L’angle ou le timing sont-ils bons pour la suite ?'), 
      lt('Có, nhánh đã sẵn sàng.', 'Yes, the branch is ready.', 'Oui, la branche est prête.'), 
      lt('Không, bạn đang đứng vuông góc.', 'No, you are driving square.', 'Non, vous êtes carré.'), 
      lt('Lấy góc trước khi dùng lực.', 'Take angle before force.', 'Angle avant la force.'), 
      ['hips', 'knees', 'feet'], 
      'major', 
      [`${id}-branch`]
    ),
    mkCheck(`${id}-6`, safetyTitle, safetyQuestion, safetySuccess, safetyFailure, safetyFix, ['hands', 'head', 'hips'], 'major', [`${id}-branch`]),
  ]
  return buildChecklist(kind === 'safety' ? 'safety' : kind === 'guard' ? 'guard' : kind === 'escape' ? 'escape' : kind === 'wrestling' ? 'wrestling' : 'control', lt(`Kiểm tra ${title.toLowerCase()} và các đường kiểm soát chính.`, `Check ${title.toLowerCase()} and the main lines.`, `Vérifiez ${title.toLowerCase()} et les lignes principales.`), checks, 70, lt('Checklist đủ tốt để tiếp tục.', 'Checklist is good enough to continue.', 'La checklist est assez bonne pour continuer.'), lt('Sửa đường đầu tiên đang gãy.', 'Fix the first broken line.', 'Corrigez la première ligne cassée.'))
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
