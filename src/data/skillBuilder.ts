import type {
  BodyMechanicsSystem,
  BodyPartInstruction,
  BodyPartKey,
  BodyChecklist,
  ConnectionPoint,
  DecisionBranch,
  DirectionalCue,
  Drill,
  FailureResponse,
  IfThenDecision,
  LocalizedStringArray,
  LocalizedText,
  MechanicType,
  MechanicsPhase,
  PlayerRole,
  PositionalRelationship,
  QuickCard,
  ReactionBranch,
  MicroDetailSystem,
  SkillDomain,
  SkillNode,
  SkillTest,
} from '../types/skill'
import { qualityChecklistsBySkillId } from './qualityChecklists'
import { microDetailSystemBySkillId } from './microDetailSystems'
import { technicalDetailsBySkillId } from './technicalDetails'
import { blackbeltDetailsBySkillId } from './blackbeltDetails'
import { la, lt, type SkillSeed } from './skills/skillSeedFactory'
import { generatedBlackbeltDetailsForSkill } from './generatedBlackbeltDetails'

const firstText = (items: string[]) => items.find((item) => item.trim().length) ?? ''

const firstLocalizedArrayText = (items: LocalizedStringArray): LocalizedText =>
  lt(firstText(items.vi), firstText(items.en), firstText(items.fr))

const clipCue = (text: string) => {
  const clipped = text.split(/[.;:!?]/)[0].trim()
  return clipped || text.trim()
}

const quickCardFor = (seedValue: SkillSeed, microDetailSystem?: MicroDetailSystem): QuickCard | undefined => {
  if (!microDetailSystem) return undefined
  const topThree = microDetailSystem.topFiveDetails.slice(0, 3)
  if (!topThree.length) return undefined

  const threeCues = la(
    topThree.map((detail) => clipCue(detail.correctionCue.vi || detail.liveCue.vi || detail.title.vi)),
    topThree.map((detail) => clipCue(detail.correctionCue.en || detail.liveCue.en || detail.title.en)),
    topThree.map((detail) => clipCue(detail.correctionCue.fr || detail.liveCue.fr || detail.title.fr)),
  )

  const firstFastPath = microDetailSystem.fastFinishPaths[0]

  return {
    goal: seedValue.goal,
    threeCues,
    doNotDo: firstLocalizedArrayText(microDetailSystem.doNotDo),
    ifItFails: firstFastPath
      ? lt(
          firstFastPath.nextBestOption.vi,
          firstFastPath.nextBestOption.en,
          firstFastPath.nextBestOption.fr,
        )
      : lt('Reset position and return to the next branch.', 'Reset position and return to the next branch.', 'Réinitialisez la position et revenez à la branche suivante.'),
    safetyReminder: firstLocalizedArrayText(microDetailSystem.safetyNotes),
  }
}

const domainConcepts: Record<SkillDomain, string[]> = {
  positional_awareness: ['positional hierarchy', 'inside position', 'dilemma', 'failure response'],
  survival_defense: ['frames', 'inside position', 'danger signal', 'breathing space'],
  escapes: ['frame', 'hip escape', 'inside position', 'transition chain'],
  guard_retention: ['guard retention', 'knee line', 'inside position', 'hip mobility'],
  guard_offense: ['off-balancing', 'shin-to-shin', 'ashi garami', 'wrestle-up'],
  wrestle_up_wrestling: ['hand fighting', 'front headlock', 'sprawl', 'go-behind'],
  passing: ['head position', 'bodylock', 'headquarters', 'knee cut'],
  pins_rides: ['crossface', 'underhook', 'ride', 'mat return'],
  back_control: ['seatbelt', 'inside position', 'strangle alignment', 'hand fighting'],
  submission_systems: ['dilemma', 'knee line', 'finishing mechanics', 'safety tap'],
}

const fallbackNext = ['inside-position', 'frames-pummeling', 'failure-response-transitions']

const conceptList = (seedValue: SkillSeed): LocalizedStringArray => {
  const unique = [...new Set([...seedValue.concepts, ...domainConcepts[seedValue.domain]])].slice(0, 8)
  return la(
    unique.map((concept) => `${concept}: cue chính trong ${seedValue.title.vi}; kiểm tra vị trí cơ thể trước khi dùng lực.`),
    unique.map((concept) => `${concept}: key cue in ${seedValue.title.en}; check body position before adding force.`),
    unique.map((concept) => `${concept}: cue clé dans ${seedValue.title.fr}; vérifier la position du corps avant d’ajouter la force.`),
  )
}

const checklistFor = (seedValue: SkillSeed): BodyChecklist => {
  const legLock = seedValue.tags.some((tag) => ['leg-lock', 'heel-hook', 'ankle-lock', 'knee-safety'].includes(tag))
  if (legLock) {
    return {
      head: lt('Đầu không lao về phía lực xoắn; nhìn vào knee line.', 'Head does not dive into rotational force; eyes track the knee line.', 'La tête ne plonge pas dans la rotation; les yeux suivent la knee line.'),
      rightHand: lt('Một tay kiểm soát chân/heel exposure, tay kia sẵn sàng post hoặc tap.', 'One hand monitors the leg or heel exposure, the other can post or tap.', 'Une main surveille jambe ou talon, l’autre peut poster ou taper.'),
      hips: lt('Hông lùi để giải phóng knee line trước khi xoay.', 'Hips move back to clear the knee line before rotating.', 'Les hanches reculent pour libérer la knee line avant de tourner.'),
      insideLeg: lt('Gối trong không bị kẹt sâu qua hông đối thủ.', 'Inside knee is not trapped deeply past the opponent’s hips.', 'Le genou intérieur n’est pas piégé au-delà des hanches adverses.'),
      outsideLeg: lt('Chân ngoài tạo base thay vì xoay mù.', 'Outside leg builds base instead of blind spinning.', 'La jambe extérieure crée la base au lieu de tourner à l’aveugle.'),
      pressure: lt('Tap sớm khi thấy lực xoắn vào gối hoặc cổ chân.', 'Tap early when rotational force reaches knee or ankle.', 'Taper tôt quand la rotation atteint genou ou cheville.'),
    }
  }

  return {
    head: lt(`Đầu giữ đúng line để không mất posture trong ${seedValue.title.vi}.`, `Head stays on the correct line so posture is not lost in ${seedValue.title.en}.`, `La tête reste sur la bonne ligne pour ne pas perdre posture dans ${seedValue.title.fr}.`),
    eyes: lt('Mắt đọc hông, vai và tay gần nhất của đối thủ.', 'Eyes read the opponent’s hips, shoulders, and nearest hand.', 'Les yeux lisent hanches, épaules et main proche.'),
    rightHand: lt('Tay phải tìm inside position, frame hoặc grip có mục tiêu.', 'Right hand seeks inside position, a frame, or a purposeful grip.', 'La main droite cherche inside position, frame ou grip utile.'),
    leftHand: lt('Tay trái hỗ trợ pummel, hand fighting hoặc khóa hip line.', 'Left hand supports pummeling, hand fighting, or hip-line control.', 'La main gauche aide pummeling, hand fighting ou contrôle des hanches.'),
    hips: lt('Hông không nằm phẳng; tạo góc để chuyển tiếp.', 'Hips are not flat; they create an angle for transition.', 'Les hanches ne sont pas plates; elles créent un angle de transition.'),
    spine: lt('Cột sống giữ cấu trúc; không gập cổ dưới áp lực.', 'Spine keeps structure; neck is not folded under pressure.', 'La colonne garde sa structure; le cou ne se plie pas sous pression.'),
    pressure: lt('Áp lực đi qua khung xương và connection, không chỉ bằng cơ tay.', 'Pressure travels through frames and connection, not only arm strength.', 'La pression passe par les frames et la connexion, pas seulement les bras.'),
  }
}

const dangerSignalsFor = (seedValue: SkillSeed): LocalizedStringArray => {
  const legLock = seedValue.tags.some((tag) => ['leg-lock', 'heel-hook', 'ankle-lock', 'knee-safety'].includes(tag))
  const neck = seedValue.tags.some((tag) => ['choke', 'front-headlock', 'neck-safety'].includes(tag))
  if (legLock) {
    return la(
      ['Knee line bị giữ sâu qua hông đối thủ.', 'Gót chân bị lộ và đối thủ có hai tay khóa.', 'Bạn xoay theo hướng không thấy được lực khóa.', 'Đau gối/cổ chân xuất hiện trước khi bạn hiểu vị trí.', 'Partner tăng lực nhanh thay vì kiểm soát.'],
      ['Your knee line is trapped past the opponent’s hips.', 'Your heel is exposed and the opponent has two-handed control.', 'You rotate without seeing the locking direction.', 'Knee or ankle pain appears before you understand the position.', 'The partner increases force quickly instead of controlling.'],
      ['Votre knee line est piégée au-delà des hanches adverses.', 'Votre talon est exposé et l’adversaire contrôle à deux mains.', 'Vous tournez sans voir la direction du lock.', 'Douleur genou/cheville avant de comprendre la position.', 'Le partenaire augmente la force vite au lieu de contrôler.'],
    )
  }
  if (neck) {
    return la(
      ['Cằm bị kéo khỏi ngực và đường thở bị hẹp.', 'Chin strap sâu, khuỷu đối thủ đóng sát thân.', 'Bạn chống tay xuống thảm và cổ bị kéo dài.', 'Hông ở sai phía so với đầu.', 'Bạn cố thoát bằng cách xoay cổ.'],
      ['Chin is pulled off the chest and airway narrows.', 'Deep chin strap with opponent’s elbow tight to body.', 'You post a hand and your neck gets stretched.', 'Hips are on the wrong side of the head.', 'You try to escape by twisting the neck.'],
      ['Le menton est arraché de la poitrine et la respiration se ferme.', 'Chin strap profond avec coude adverse serré.', 'Vous postez une main et le cou s’allonge.', 'Les hanches sont du mauvais côté de la tête.', 'Vous essayez de sortir en tordant le cou.'],
    )
  }
  return la(
    [
      `Bạn mất inside position trong ${seedValue.title.vi}.`,
      'Đầu và hông của đối thủ thẳng hàng để tạo pressure.',
      'Khuỷu rời khỏi gối hoặc thân.',
      'Bạn phản ứng muộn sau khi đối thủ đã thắng grip.',
      'Bạn cố dùng sức thay vì đổi góc hoặc recover base.',
    ],
    [
      `You lose inside position during ${seedValue.title.en}.`,
      'The opponent aligns head and hips to create pressure.',
      'Your elbow separates from knee or torso.',
      'You react late after the opponent has already won the grip.',
      'You use force instead of changing angle or recovering base.',
    ],
    [
      `Vous perdez inside position pendant ${seedValue.title.fr}.`,
      'L’adversaire aligne tête et hanches pour créer pression.',
      'Votre coude quitte genou ou torse.',
      'Vous réagissez tard après que le grip est gagné.',
      'Vous forcez au lieu de changer angle ou récupérer la base.',
    ],
  )
}

const mistakesFor = (seedValue: SkillSeed): LocalizedStringArray =>
  la(
    [
      `Nhảy thẳng vào finish của ${seedValue.title.vi} trước khi có control.`,
      'Bỏ qua inside position và chỉ kéo/đẩy bằng tay.',
      'Không nhận diện danger signal đầu tiên.',
      'Giữ một lựa chọn quá lâu khi đối thủ đã phòng thủ đúng.',
      'Không có failure response khi kỹ thuật bị chặn.',
      'Drill đẹp nhưng không test bằng positional resistance.',
    ],
    [
      `Jumping to the finish of ${seedValue.title.en} before control is built.`,
      'Ignoring inside position and only pulling or pushing with arms.',
      'Missing the first danger signal.',
      'Holding one option too long after the opponent defends correctly.',
      'Having no failure response when the technique stalls.',
      'Drilling cleanly but never testing with positional resistance.',
    ],
    [
      `Aller au finish de ${seedValue.title.fr} avant le contrôle.`,
      'Ignorer inside position et seulement tirer/pousser avec les bras.',
      'Rater le premier signal de danger.',
      'Garder une option trop longtemps après la bonne défense.',
      'Aucune réponse quand la technique bloque.',
      'Driller proprement sans test en résistance positionnelle.',
    ],
  )

const decisionTreeFor = (seedValue: SkillSeed): DecisionBranch[] => {
  const next = seedValue.relatedSkills.length ? seedValue.relatedSkills : fallbackNext
  return [
    {
      trigger: lt('Nếu bạn thắng inside position trước.', 'If you win inside position first.', 'Si vous gagnez inside position en premier.'),
      response: lt(`Tiếp tục ${seedValue.title.vi} và ép đối thủ chọn phản ứng phòng thủ.`, `Continue ${seedValue.title.en} and force the opponent into a defensive choice.`, `Continuez ${seedValue.title.fr} et forcez une réponse défensive.`),
      nextSkillIds: [next[0]].filter(Boolean),
    },
    {
      trigger: lt('Nếu đối thủ giành head/hip line.', 'If the opponent wins head or hip line.', 'Si l’adversaire gagne ligne tête/hanche.'),
      response: lt('Dừng tấn công, dựng frame và pummel lại đường trong.', 'Pause the attack, rebuild frames, and pummel back inside.', 'Arrêtez l’attaque, reconstruisez les frames et pummel inside.'),
      nextSkillIds: ['frames-pummeling', 'inside-position'],
    },
    {
      trigger: lt('Nếu họ phòng thủ hướng đầu tiên.', 'If they defend the first line.', 'S’ils défendent la première ligne.'),
      response: lt('Chuyển sang lựa chọn thứ hai trong dilemma hoặc transition chain.', 'Switch to the second line in the dilemma or transition chain.', 'Passez à la seconde ligne du dilemme ou transition chain.'),
      nextSkillIds: [next[1] ?? 'dilemmas-two-way-attacks'],
    },
    {
      trigger: lt('Nếu kỹ thuật bị kẹt giữa chừng.', 'If the technique stalls halfway.', 'Si la technique bloque à mi-chemin.'),
      response: lt('Dùng failure response: đổi góc, đổi grip hoặc rút về base an toàn.', 'Use the failure response: change angle, change grip, or retreat to safe base.', 'Utilisez la réponse à l’échec : changer angle, grip ou revenir à une base sûre.'),
      nextSkillIds: ['failure-response-transitions', next[2] ?? 'scramble-control'],
    },
    {
      trigger: lt('Nếu xuất hiện danger signal.', 'If a danger signal appears.', 'Si un signal de danger apparaît.'),
      response: lt('Ưu tiên an toàn và thoát khỏi lực nguy hiểm trước khi tiếp tục.', 'Prioritize safety and exit dangerous force before continuing.', 'Priorisez la sécurité et sortez de la force dangereuse avant de continuer.'),
      nextSkillIds: seedValue.tags.includes('leg-lock') ? ['leg-lock-safety-basics'] : ['positional-hierarchy'],
    },
  ]
}

const failuresFor = (seedValue: SkillSeed): FailureResponse[] => [
  {
    failure: lt(`Bạn mất cấu trúc trong ${seedValue.title.vi}.`, `You lose structure during ${seedValue.title.en}.`, `Vous perdez la structure pendant ${seedValue.title.fr}.`),
    response: lt('Thu nhỏ mục tiêu: bảo vệ đầu/cổ, kết nối khuỷu-gối và recover inside position.', 'Shrink the goal: protect head and neck, reconnect elbow-knee, and recover inside position.', 'Réduisez l’objectif : protéger tête/cou, reconnecter coude-genou et récupérer inside position.'),
    nextSkillIds: ['inside-position', 'frames-pummeling'],
  },
  {
    failure: lt('Đối thủ phản ứng đúng với hướng tấn công đầu tiên.', 'The opponent correctly defends the first attack line.', 'L’adversaire défend correctement la première ligne.'),
    response: lt('Không cố ép; chuyển sang dilemma, back exposure hoặc reset grip.', 'Do not force it; switch to the dilemma, back exposure, or grip reset.', 'Ne forcez pas; passez au dilemme, exposition du dos ou reset grip.'),
    nextSkillIds: seedValue.relatedSkills.slice(0, 2),
  },
  {
    failure: lt('Bạn rơi vào scramble không có base.', 'You enter a scramble without base.', 'Vous entrez dans un scramble sans base.'),
    response: lt('Tìm head position, hip connection và mat return/go-behind nếu có.', 'Find head position, hip connection, and mat return or go-behind when available.', 'Trouvez head position, connexion hanche et mat return ou go-behind si disponible.'),
    nextSkillIds: ['scramble-control', 'mat-return-basics'],
  },
]

const drillsFor = (seedValue: SkillSeed): Drill[] => [
  {
    name: lt(`${seedValue.title.vi} shadow checklist`, `${seedValue.title.en} shadow checklist`, `${seedValue.title.fr} shadow checklist`),
    description: lt('Di chuyển chậm qua head, hands, hips và base trước khi có partner.', 'Move slowly through head, hands, hips, and base before adding a partner.', 'Passer lentement tête, mains, hanches et base avant partenaire.'),
    intensity: 'static',
    durationOrReps: lt('3 hiệp x 90 giây', '3 rounds x 90 seconds', '3 rounds x 90 secondes'),
  },
  {
    name: lt('Cue recognition rounds', 'Cue recognition rounds', 'Rounds de reconnaissance des cues'),
    description: lt('Partner đưa 3 cue khác nhau; bạn gọi tên danger signal và phản ứng đúng.', 'Partner presents 3 cues; you name the danger signal and respond correctly.', 'Le partenaire donne 3 cues; nommez le signal et répondez.'),
    intensity: 'progressive',
    durationOrReps: lt('5 phút đổi vai', '5 minutes, switch roles', '5 minutes, changer les rôles'),
  },
  {
    name: lt('Positional constraint sparring', 'Positional constraint sparring', 'Sparring positionnel avec contrainte'),
    description: lt(`Bắt đầu trong ${seedValue.title.vi}; chỉ tính điểm khi bạn đạt primary goal.`, `Start in ${seedValue.title.en}; score only when the primary goal is reached.`, `Commencer dans ${seedValue.title.fr}; score seulement si l’objectif est atteint.`),
    intensity: 'positional',
    durationOrReps: lt('4 hiệp x 3 phút', '4 rounds x 3 minutes', '4 rounds x 3 minutes'),
  },
  {
    name: lt('Live entry tracking', 'Live entry tracking', 'Suivi des entrées en live'),
    description: lt('Trong live roll, đánh dấu mỗi lần vào đúng tình huống và ghi lại failure response.', 'During live rolling, mark every correct entry and record the failure response.', 'Pendant le live, noter chaque entrée correcte et la réponse à l’échec.'),
    intensity: 'live',
    durationOrReps: lt('1 buổi tập', '1 training session', '1 séance'),
  },
]

const testsFor = (seedValue: SkillSeed): SkillTest[] => [
  {
    prompt: lt(`Tôi chưa nhận ra ${seedValue.title.vi} khi roll.`, `I do not recognize ${seedValue.title.en} while rolling.`, `Je ne reconnais pas ${seedValue.title.fr} en roll.`),
    successCriteria: lt('Bạn có thể mô tả vị trí và nguy cơ chính.', 'You can describe the position and main risk.', 'Vous pouvez décrire la position et le risque principal.'),
  },
  {
    prompt: lt('Tôi nhận diện được cue và danger signal.', 'I can recognize the cue and danger signal.', 'Je reconnais le cue et le signal de danger.'),
    successCriteria: lt('Bạn gọi đúng ít nhất 3 cue trong drill chậm.', 'You name at least 3 cues in slow drilling.', 'Vous nommez au moins 3 cues en drill lent.'),
  },
  {
    prompt: lt('Tôi drill được chậm với partner hợp tác.', 'I can drill it slowly with a cooperative partner.', 'Je peux le driller lentement avec partenaire coopératif.'),
    successCriteria: lt('Bạn hoàn thành 10 reps liên tiếp không mất cấu trúc.', 'You complete 10 clean reps without losing structure.', 'Vous faites 10 reps propres sans perdre la structure.'),
  },
  {
    prompt: lt('Tôi làm được trong positional sparring có kháng cự vừa.', 'I can do it in positional sparring with moderate resistance.', 'Je peux le faire en sparring positionnel avec résistance modérée.'),
    successCriteria: lt('Bạn đạt primary goal ít nhất 40% số lượt.', 'You reach the primary goal in at least 40% of attempts.', 'Vous atteignez l’objectif dans au moins 40% des essais.'),
  },
  {
    prompt: lt('Tôi dùng được trong live rolling với người ngang hoặc nhỉnh hơn.', 'I can use it in live rolling against similar or slightly better partners.', 'Je peux l’utiliser en live contre partenaires similaires ou légèrement meilleurs.'),
    successCriteria: lt('Bạn vào được kỹ năng và có failure response khi bị chặn.', 'You enter the skill and respond when it is blocked.', 'Vous entrez le skill et répondez quand il bloque.'),
  },
  {
    prompt: lt('Tôi dùng dưới áp lực cao hoặc dạy được mechanics/counters.', 'I can use it under high pressure or teach mechanics and counters.', 'Je peux l’utiliser sous haute pression ou enseigner mécanique et contres.'),
    successCriteria: lt('Bạn giải thích được principles, lỗi thường gặp và counter an toàn.', 'You explain principles, common mistakes, and safe counters.', 'Vous expliquez principes, erreurs fréquentes et contres sûrs.'),
  },
]

const isLegLockSkill = (seedValue: SkillSeed) =>
  seedValue.tags.some((tag) => ['leg-lock', 'heel-hook', 'ankle-lock', 'knee-safety'].includes(tag))

const isNeckSkill = (seedValue: SkillSeed) =>
  seedValue.tags.some((tag) => ['choke', 'front-headlock', 'neck-safety'].includes(tag))

const isDefensiveSkill = (seedValue: SkillSeed) =>
  seedValue.domain === 'survival_defense' || seedValue.domain === 'escapes' || seedValue.title.en.toLowerCase().includes('defense')

const roleForSkill = (seedValue: SkillSeed): PlayerRole => {
  if (isDefensiveSkill(seedValue)) return 'defender'
  if (seedValue.domain === 'passing' || seedValue.domain === 'pins_rides' || seedValue.domain === 'back_control') return 'top'
  if (seedValue.domain === 'guard_retention' || seedValue.domain === 'guard_offense') return 'bottom'
  if (seedValue.domain === 'submission_systems' || seedValue.domain === 'wrestle_up_wrestling') return 'attacker'
  return 'neutral'
}

const phaseTemplatesFor = (seedValue: SkillSeed): { id: string; name: LocalizedText; objective: LocalizedText }[] => {
  if (isLegLockSkill(seedValue)) {
    return [
      {
        id: 'recognize-entanglement',
        name: lt('Nhận diện entanglement', 'Recognize entanglement', 'Reconnaître l’entanglement'),
        objective: lt(
          `Đọc knee line, heel exposure và hướng xoay trước khi xử lý ${seedValue.title.vi}.`,
          `Read knee line, heel exposure, and rotation before acting inside ${seedValue.title.en}.`,
          `Lire knee line, exposition du talon et rotation avant d’agir dans ${seedValue.title.fr}.`,
        ),
      },
      {
        id: 'hide-heel-protect-knee',
        name: lt('Giấu gót và bảo vệ knee line', 'Hide heel and protect knee line', 'Cacher le talon et protéger knee line'),
        objective: lt('Giảm lực xoắn bằng heel hiding, hip angle và kiểm soát chân phụ.', 'Reduce rotational force with heel hiding, hip angle, and secondary-leg control.', 'Réduire la rotation avec talon caché, angle de hanche et contrôle de la jambe secondaire.'),
      },
      {
        id: 'clear-secondary-leg',
        name: lt('Giải phóng chân phụ', 'Clear the secondary leg', 'Libérer la jambe secondaire'),
        objective: lt('Tạo base để không bị giữ hai chân và không xoay mù.', 'Build base so both legs are not trapped and you do not spin blindly.', 'Créer une base pour éviter les deux jambes piégées et la rotation aveugle.'),
      },
      {
        id: 'free-knee-line-reset',
        name: lt('Thoát knee line và reset', 'Free knee line and reset', 'Libérer knee line et reset'),
        objective: lt('Đưa đầu gối ra khỏi hip line rồi đứng lên, come up hoặc reset guard an toàn.', 'Move the knee beyond the hip line, then stand, come up, or reset guard safely.', 'Sortir le genou de la ligne des hanches puis se relever, come up ou reset guard en sécurité.'),
      },
    ]
  }

  if (seedValue.domain === 'passing') {
    return [
      {
        id: 'entry-distance',
        name: lt('Vào range và quản lý khoảng cách', 'Entry and distance management', 'Entrée et gestion de distance'),
        objective: lt(`Vào ${seedValue.title.vi} mà không cho hook, shoulder crunch hoặc inside knee của guard player thắng trước.`, `Enter ${seedValue.title.en} without letting hooks, shoulder crunch, or inside knee win first.`, `Entrer dans ${seedValue.title.fr} sans laisser hooks, shoulder crunch ou inside knee gagner d’abord.`),
      },
      {
        id: 'kill-hooks-frames',
        name: lt('Giết hook và frame', 'Kill hooks and frames', 'Tuer hooks et frames'),
        objective: lt('Tách cấu trúc chân/tay của bottom player để pressure đi vào hông và vai.', 'Separate the bottom player’s leg and arm structure so pressure reaches hips and shoulders.', 'Séparer la structure bras/jambes du bottom pour que la pression arrive aux hanches et épaules.'),
      },
      {
        id: 'control-hips-shoulders',
        name: lt('Khóa hông và vai', 'Control hips and shoulders', 'Contrôler hanches et épaules'),
        objective: lt('Gắn chest, head và grip vào hip line/shoulder line để đối thủ không xoay lại.', 'Attach chest, head, and grips to hip line and shoulder line so they cannot rotate back in.', 'Connecter poitrine, tête et grips à hip line/shoulder line pour empêcher la rotation.'),
      },
      {
        id: 'clear-pass-stabilize',
        name: lt('Vượt knee line và ổn định pin', 'Clear pass line and stabilize', 'Franchir la ligne et stabiliser'),
        objective: lt('Vượt chân theo layer rồi giữ pin trước khi chuyển submission.', 'Clear the legs by layers, then hold the pin before chasing submissions.', 'Franchir les jambes par couches puis stabiliser avant soumission.'),
      },
    ]
  }

  if (seedValue.domain === 'guard_retention') {
    return [
      {
        id: 'recognize-pass',
        name: lt('Nhận diện kiểu pass', 'Recognize the pass type', 'Reconnaître le type de pass'),
        objective: lt('Đọc đầu, hông và chân dẫn của passer trước khi chest-to-chest xuất hiện.', 'Read the passer’s head, hips, and lead leg before chest-to-chest appears.', 'Lire tête, hanches et jambe avant du passer avant chest-to-chest.'),
      },
      {
        id: 'preserve-inside',
        name: lt('Giữ inside position', 'Preserve inside position', 'Préserver inside position'),
        objective: lt('Giữ knee-elbow connection, shin frame và hand fighting để không bị flattened.', 'Keep knee-elbow connection, shin frame, and hand fighting so you are not flattened.', 'Garder connexion coude-genou, shin frame et hand fighting pour ne pas être aplati.'),
      },
      {
        id: 'frame-hip-move',
        name: lt('Frame và di chuyển hông', 'Frame and move hips', 'Frame et mouvement de hanches'),
        objective: lt('Biến frame thành hip angle thay vì đẩy thẳng bằng tay.', 'Turn frames into hip angle instead of pushing straight with arms.', 'Transformer les frames en angle de hanche au lieu de pousser avec les bras.'),
      },
      {
        id: 'recover-or-attack',
        name: lt('Recover, wrestle-up hoặc re-attack', 'Recover, wrestle up, or re-attack', 'Recover, wrestle-up ou re-attack'),
        objective: lt('Khôi phục guard layer hoặc chuyển ngay thành sweep/wrestle-up khi passer overcommit.', 'Rebuild guard layers or convert to sweep or wrestle-up when the passer overcommits.', 'Reconstruire les couches de garde ou convertir en sweep/wrestle-up quand le passer overcommit.'),
      },
    ]
  }

  if (isDefensiveSkill(seedValue)) {
    return [
      {
        id: 'recognize-danger',
        name: lt('Nhận diện nguy hiểm', 'Recognize danger', 'Reconnaître le danger'),
        objective: lt(`Đọc body signal của ${seedValue.title.vi} trước khi cổ, vai, hông hoặc knee line bị khóa sâu.`, `Read the body signals of ${seedValue.title.en} before neck, shoulder, hips, or knee line are deeply locked.`, `Lire les signaux corporels de ${seedValue.title.fr} avant que cou, épaule, hanches ou knee line soient verrouillés.`),
      },
      {
        id: 'stop-threat',
        name: lt('Chặn threat ngay lập tức', 'Stop the immediate threat', 'Stopper la menace immédiate'),
        objective: lt('Ưu tiên đường thở, cổ, elbow-knee connection và inside knee trước khi escape lớn.', 'Prioritize airway, neck, elbow-knee connection, and inside knee before a big escape.', 'Prioriser respiration, cou, connexion coude-genou et inside knee avant grande sortie.'),
      },
      {
        id: 'rebuild-frames',
        name: lt('Dựng lại frame và inside position', 'Rebuild frames and inside position', 'Reconstruire frames et inside position'),
        objective: lt('Dùng forearm, knee wedge và hip angle để biến phòng thủ thành cấu trúc có lực.', 'Use forearm, knee wedge, and hip angle to turn defense into a force-bearing structure.', 'Utiliser forearm, knee wedge et angle de hanche pour créer une structure.'),
      },
      {
        id: 'create-angle-exit',
        name: lt('Tạo góc và thoát', 'Create angle and exit', 'Créer angle et sortir'),
        objective: lt('Thoát bằng angle, guard recovery, stand-up hoặc come-up mà không lộ cổ/lưng/chân.', 'Exit through angle, guard recovery, stand-up, or come-up without exposing neck, back, or legs.', 'Sortir par angle, récupération de garde, stand-up ou come-up sans exposer cou, dos ou jambes.'),
      },
    ]
  }

  if (seedValue.domain === 'wrestle_up_wrestling') {
    return [
      {
        id: 'initial-tie',
        name: lt('Vào tie hoặc shot line', 'Initial tie or shot line', 'Tie initial ou ligne de shot'),
        objective: lt('Thắng tay, đầu và khoảng cách trước khi vào chân, front headlock hoặc mat return.', 'Win hands, head, and distance before entering legs, front headlock, or mat return.', 'Gagner mains, tête et distance avant jambes, front headlock ou mat return.'),
      },
      {
        id: 'head-hip-alignment',
        name: lt('Căn đầu-hông', 'Head-hip alignment', 'Alignement tête-hanche'),
        objective: lt('Đưa đầu, vai và hông vào cùng một hệ lực để không bị guillotine, kimura hoặc sprawl.', 'Put head, shoulder, and hips into one force line so guillotine, kimura, or sprawl are limited.', 'Mettre tête, épaule et hanches sur une ligne de force pour limiter guillotine, kimura ou sprawl.'),
      },
      {
        id: 'finish-or-defend',
        name: lt('Finish hoặc phòng thủ phản công', 'Finish or defend counter', 'Finir ou défendre le contre'),
        objective: lt('Hoàn tất control trong khi đọc phản ứng turn in, turn away, stand hoặc invert.', 'Finish control while reading turn-in, turn-away, stand, or invert reactions.', 'Finir le contrôle en lisant turn-in, turn-away, stand ou invert.'),
      },
      {
        id: 'chain-to-position',
        name: lt('Nối sang vị trí kế tiếp', 'Chain to next position', 'Chaîner vers position suivante'),
        objective: lt('Chuyển ngay sang pass, ride, back control hoặc reset hand fighting.', 'Move directly to pass, ride, back control, or hand-fight reset.', 'Passer directement à pass, ride, back control ou reset hand fighting.'),
      },
    ]
  }

  return [
    {
      id: 'initial-map',
      name: lt('Đọc bản đồ ban đầu', 'Read the initial map', 'Lire la carte initiale'),
      objective: lt(`Xác định ${seedValue.title.vi} bắt đầu ở đâu trong positional hierarchy và ai đang thắng inside position.`, `Identify where ${seedValue.title.en} starts in the positional hierarchy and who owns inside position.`, `Identifier où commence ${seedValue.title.fr} dans la hiérarchie positionnelle et qui possède inside position.`),
    },
    {
      id: 'alignment',
      name: lt('Căn chỉnh cơ thể', 'Body alignment', 'Alignement corporel'),
      objective: lt('Đưa đầu, cột sống, hông, khuỷu và gối vào một cấu trúc chịu lực.', 'Connect head, spine, hips, elbows, and knees into a force-bearing structure.', 'Connecter tête, colonne, hanches, coudes et genoux en structure.'),
    },
    {
      id: 'control-dilemma',
      name: lt('Tạo control và dilemma', 'Create control and dilemma', 'Créer contrôle et dilemme'),
      objective: lt('Dùng connection point để buộc đối thủ chọn một hướng phòng thủ và mở hướng kế tiếp.', 'Use connection points to force one defensive choice and expose the next branch.', 'Utiliser les points de connexion pour forcer une défense et ouvrir la branche suivante.'),
    },
    {
      id: 'transition-loop',
      name: lt('Vòng lặp transition', 'Transition loop', 'Boucle de transition'),
      objective: lt('Nếu đường đầu tiên thất bại, đổi angle, grip hoặc mục tiêu mà vẫn giữ base an toàn.', 'If the first line fails, change angle, grip, or target while keeping safe base.', 'Si la première ligne échoue, changer angle, grip ou cible en gardant la base.'),
    },
  ]
}

const bodyPartInstructionFor = (
  seedValue: SkillSeed,
  phaseName: LocalizedText,
  bodyPart: BodyPartKey,
  role: PlayerRole,
  mechanicType: MechanicType,
): BodyPartInstruction => {
  const legLock = isLegLockSkill(seedValue)
  const neck = isNeckSkill(seedValue)
  const title = seedValue.title
  const phrase = {
    vi: `${phaseName.vi.toLowerCase()} của ${title.vi}`,
    en: `${phaseName.en.toLowerCase()} of ${title.en}`,
    fr: `${phaseName.fr.toLowerCase()} de ${title.fr}`,
  }

  const commonErrors = la(
    [
      'Tách body part khỏi phần còn lại của chain.',
      'Dùng sức cơ thay vì cấu trúc xương và angle.',
      'Giữ quá lâu sau khi đối thủ đã đổi phản ứng.',
    ],
    [
      'Disconnecting the body part from the rest of the chain.',
      'Using muscular force instead of structure and angle.',
      'Holding too long after the opponent changes reaction.',
    ],
    [
      'Déconnecter cette partie du reste de la chaîne.',
      'Forcer avec les muscles au lieu de structure et angle.',
      'Rester trop longtemps après la réaction adverse.',
    ],
  )

  const correctionCues = la(
    ['Thở ra, thu nhỏ khoảng trống, rồi pummel lại inside position.', 'Nối đầu-gối-hông trước khi tăng lực.', 'Nếu mất line, reset angle trước khi tấn công tiếp.'],
    ['Exhale, shrink the space, then pummel back inside.', 'Connect head-knee-hip before adding force.', 'If the line is lost, reset angle before attacking again.'],
    ['Expirer, réduire l’espace, puis pummel inside.', 'Connecter tête-genou-hanche avant d’ajouter force.', 'Si la ligne est perdue, reset angle avant de réattaquer.'],
  )

  const map: Record<BodyPartKey, { instruction: LocalizedText; why: LocalizedText }> = {
    head: {
      instruction: lt(
        `Đầu là post và wedge trong ${phrase.vi}; giữ đầu cao hơn threat cổ nhưng đủ gần để chặn shoulder line hoặc hip line. Nếu tay phải là underhook, tai phải nên đi gần ribs/shoulder line để đầu không trôi ra ngoài.`,
        `The head is both post and wedge in the ${phrase.en}; keep it above neck danger but close enough to block shoulder line or hip line. If your right arm is the underhook, your right ear usually stays near their ribs or shoulder line so the head does not float outside.`,
        `La tête sert de post et wedge dans ${phrase.fr}; gardez-la au-dessus du danger au cou mais assez proche pour bloquer shoulder line ou hip line. Si le bras droit est underhook, l’oreille droite reste près des côtes ou de l’épaule.`,
      ),
      why: lt('Đầu sai vị trí làm cả shoulder line bị xoay và khiến frame/grip phía dưới mất lực.', 'A misplaced head lets the shoulder line rotate and makes lower frames or grips lose force.', 'Une tête mal placée permet la rotation de la ligne d’épaule et affaiblit frames ou grips.'),
    },
    eyes: {
      instruction: lt(
        `Trong ${title.vi}, mắt nhìn vào hông, vai gần và tay đang pummel; gaze ổn định giúp cổ không gập.`,
        `In ${title.en}, the eyes track the hips, near shoulder, and pummeling hand; a stable gaze keeps the neck organized.`,
        `Dans ${title.fr}, les yeux suivent les hanches, l’épaule proche et la main qui pummel; le regard garde le cou organisé.`,
      ),
      why: lt('Nhìn xuống sàn thường kéo đầu ra khỏi posture và làm bạn phản ứng muộn.', 'Looking at the mat usually pulls the head out of posture and delays reactions.', 'Regarder le tapis sort souvent la tête de la posture et retarde la réaction.'),
    },
    ears: {
      instruction: lt(
        `Trong ${title.vi}, tai gần phải chạm hoặc bám rất sát ribs, hông hoặc shoulder line tùy phase; tai trôi xa là đầu đã mất vai trò wedge.`,
        `In ${title.en}, the near ear should stay close to ribs, hip, or shoulder line depending on phase; a floating ear means the head has stopped acting as a wedge.`,
        `Dans ${title.fr}, l’oreille proche doit rester près des côtes, de la hanche ou de la shoulder line selon la phase; si elle flotte, la tête ne fait plus wedge.`,
      ),
      why: lt('Ear connection cho bạn cảm nhận micro-rotation trước khi mắt thấy được.', 'Ear connection lets you feel micro-rotation before the eyes see it.', 'La connexion par l’oreille fait sentir les micro-rotations avant les yeux.'),
    },
    chin: {
      instruction: lt(neck ? 'Cằm thu về ngực nhưng không gập cổ cứng; giữ đường thở mở và không cho chin strap ăn sâu.' : 'Cằm hơi thu để cổ nối với spine; đừng ngửa cằm khi tạo pressure hoặc frame.', neck ? 'Chin stays tucked to the chest without rigid neck flexion; keep airway open and deny deep chin strap.' : 'Chin is lightly tucked so the neck connects to the spine; do not lift the chin while pressuring or framing.', neck ? 'Menton rentré sans flexion rigide; garder respiration ouverte et refuser chin strap profond.' : 'Menton légèrement rentré pour connecter cou et colonne; ne pas lever le menton sous pression ou frame.'),
      why: lt('Cằm nâng làm cổ dài ra và mở guillotine, crossface hoặc strangle alignment.', 'A lifted chin lengthens the neck and opens guillotine, crossface, or strangle alignment.', 'Un menton levé allonge le cou et ouvre guillotine, crossface ou strangulation.'),
    },
    neck: {
      instruction: lt(
        `Trong ${title.vi}, cổ giữ ngắn, thẳng với spine và không xoay chống lại lực.`,
        `In ${title.en}, the neck stays short, aligned with the spine, and does not twist against force.`,
        `Dans ${title.fr}, le cou reste court, aligné avec la colonne et ne tourne pas contre la force.`,
      ),
      why: lt(
        `Trong ${title.vi}, cổ nối đầu với hông; cổ dài hoặc xoắn làm mất posture và tăng rủi ro.`,
        `In ${title.en}, the neck connects head to hips; a long or twisted neck loses posture and raises risk.`,
        `Dans ${title.fr}, le cou relie tête et hanches; long ou tordu, il perd posture et augmente le risque.`,
      ),
    },
    shoulders: {
      instruction: lt(
        `Trong ${title.vi}, một vai tạo pressure hoặc frame còn vai kia phải còn xoay được; shoulder line phải hướng vào mục tiêu kế tiếp.`,
        `In ${title.en}, one shoulder creates pressure or frame while the other stays free to rotate; the shoulder line must point toward the next target.`,
        `Dans ${title.fr}, une épaule crée pressure ou frame pendant que l’autre reste libre de tourner; la shoulder line vise la cible suivante.`,
      ),
      why: lt('Shoulder line bị xoay sai sẽ làm bạn bị flatten, bị back exposure hoặc mất pass line.', 'A mis-rotated shoulder line leads to flattening, back exposure, or losing the pass line.', 'Une shoulder line mal tournée mène à flattening, exposition du dos ou perte de pass line.'),
    },
    chest: {
      instruction: lt(
        `Trong ${title.vi}, ngực đi chéo: chest-to-chest để pin, chest-to-hip để khóa hông, hoặc off-line để tạo angle.`,
        `In ${title.en}, the chest works diagonally: chest-to-chest to pin, chest-to-hip to lock hips, or off-line to create angle.`,
        `Dans ${title.fr}, la poitrine travaille en diagonale : chest-to-chest pour pin, chest-to-hip pour bloquer les hanches, ou hors axe pour créer l’angle.`,
      ),
      why: lt('Chest pressure đúng làm đối thủ khó thở, khó xoay và khó pummel inside knee.', 'Correct chest pressure limits breathing, rotation, and inside-knee pummeling.', 'Bonne pression de poitrine limite respiration, rotation et pummel du genou inside.'),
    },
    sternum: {
      instruction: lt(
        `Trong ${title.vi}, sternum là điểm lái pressure; hướng sternum về near shoulder, far hip hoặc centerline tùy phase.`,
        `In ${title.en}, the sternum steers pressure; aim it toward near shoulder, far hip, or centerline by phase.`,
        `Dans ${title.fr}, le sternum dirige la pression; visez l’épaule proche, far hip ou centerline selon la phase.`,
      ),
      why: lt(
        `Trong ${title.vi}, sternum định hướng trọng lượng; thiếu hướng thì pressure chỉ là nằm nặng.`,
        `In ${title.en}, the sternum gives weight a direction; without it, pressure is only heavy.`,
        `Dans ${title.fr}, le sternum donne direction au poids; sans lui, la pression est seulement lourde.`,
      ),
    },
    ribs: {
      instruction: lt(
        `Trong ${title.vi}, ribs giữ khoảng thở nhỏ; đừng flare ribs khi bị pressure hoặc squeeze.`,
        `In ${title.en}, the ribs keep a small breathing pocket; do not flare them under pressure or squeeze.`,
        `Dans ${title.fr}, les côtes gardent une petite respiration; ne les ouvrez pas sous pressure ou squeeze.`,
      ),
      why: lt('Ribs flare làm elbow-knee connection mở và cho đối thủ underhook/crossface sâu hơn.', 'Flared ribs open elbow-knee connection and give deeper underhook or crossface.', 'Les côtes ouvertes exposent coude-genou et donnent underhook/crossface profond.'),
    },
    spine: {
      instruction: lt(
        `Trong ${title.vi}, spine giữ một đường cong chủ động: đủ dài để tạo base, đủ tròn để không bị kéo cổ/hông ra khỏi nhau.`,
        `In ${title.en}, the spine keeps an active curve: long enough for base, rounded enough that neck and hips cannot be separated.`,
        `Dans ${title.fr}, la colonne garde une courbe active : assez longue pour la base, assez ronde pour ne pas séparer cou et hanches.`,
      ),
      why: lt(
        `Trong ${title.vi}, spine là trục quay; trục gãy làm frame, wedge và hook không cùng hướng.`,
        `In ${title.en}, the spine is the rotation axis; a broken axis makes frames, wedges, and hooks point in different directions.`,
        `Dans ${title.fr}, la colonne est l’axe de rotation; cassée, frames, wedges et hooks partent dans des directions différentes.`,
      ),
    },
    hips: {
      instruction: lt(
        `Trong ${title.vi}, hông là động cơ chính: đổi hip angle trước khi đẩy, kéo hoặc finish.`,
        `In ${title.en}, the hips are the engine: change hip angle before pushing, pulling, or finishing.`,
        `Dans ${title.fr}, les hanches sont le moteur : changer l’angle avant de pousser, tirer ou finir.`,
      ),
      why: lt('Không có hip angle, tay phải làm việc thay cho toàn thân và dễ mỏi/mất cấu trúc.', 'Without hip angle, arms do the work of the whole body and fatigue or lose structure.', 'Sans angle de hanches, les bras font le travail du corps et perdent structure.'),
    },
    pelvis: {
      instruction: lt(
        `Trong ${title.vi}, pelvis hướng trọng lượng hoặc escape line; xoay pelvis về far hip khi tạo angle.`,
        `In ${title.en}, the pelvis aims weight or the escape line; rotate it toward the far hip when creating angle.`,
        `Dans ${title.fr}, le pelvis dirige le poids ou la sortie; tournez-le vers far hip pour créer l’angle.`,
      ),
      why: lt(
        `Trong ${title.vi}, pelvis phải lái lực; nếu không, pressure nằm ở vai/tay và escape rời rạc.`,
        `In ${title.en}, pelvis must steer force; otherwise pressure lives in shoulders or arms and escapes fragment.`,
        `Dans ${title.fr}, le bassin doit diriger la force; sinon la pression reste épaules/bras et l’escape se fragmente.`,
      ),
    },
    hands: {
      instruction: lt(
        `Trong ${title.vi}, tay lấy đúng grip của phase: wrist control, hip block, chin strap, bodylock hoặc post ngắn.`,
        `In ${title.en}, the hands take the phase grip: wrist control, hip block, chin strap, bodylock, or a short post.`,
        `Dans ${title.fr}, les mains prennent le grip de phase : wrist control, hip block, chin strap, bodylock ou post court.`,
      ),
      why: lt('Tay là điểm kết nối đầu tiên nhưng cũng là lever đối thủ sẽ tấn công.', 'Hands are the first connection point but also the lever the opponent will attack.', 'Les mains sont le premier point de connexion mais aussi le levier attaqué.'),
    },
    wrists: {
      instruction: lt(
        `Trong ${title.vi}, wrist giữ trung lập; xoay lòng bàn tay để grip không bị bẻ.`,
        `In ${title.en}, wrists stay neutral; palm angle protects grip and turns forearm into frame.`,
        `Dans ${title.fr}, les poignets restent neutres; l’angle de paume protège le grip.`,
      ),
      why: lt('Wrist gập yếu làm grip mất lực và mở đường wrist peel, kimura hoặc heel exposure control.', 'A bent wrist weakens grip and opens wrist peels, kimura, or heel-exposure control.', 'Un poignet plié affaiblit le grip et ouvre peel, kimura ou contrôle du talon.'),
    },
    elbows: {
      instruction: lt(
        `Trong ${title.vi}, khuỷu ở gần ribs hoặc gối trừ khi bạn cố ý dùng nó làm wedge.`,
        `In ${title.en}, elbows stay near the ribs or knees unless you are deliberately using them as wedges.`,
        `Dans ${title.fr}, les coudes restent près des côtes ou des genoux sauf si vous les utilisez volontairement comme wedge.`,
      ),
      why: lt(
        `Trong ${title.vi}, elbow-knee connection là khóa an toàn để không mất lớp guard/escape.`,
        `In ${title.en}, elbow-knee connection keeps the guard or escape layer from collapsing.`,
        `Dans ${title.fr}, la connexion coude-genou protège la couche garde/escape.`,
      ),
    },
    forearms: {
      instruction: lt(
        `Trong ${title.vi}, forearm frame bằng xương ngang collarbone, hip hoặc bicep; đừng duỗi thẳng bench press.`,
        `In ${title.en}, the forearm frames through bone across collarbone, hip, or bicep; do not extend into a bench press.`,
        `Dans ${title.fr}, le forearm frame par l’os sur clavicule, hanche ou biceps; ne pas tendre en bench press.`,
      ),
      why: lt(
        `Trong ${title.vi}, forearm frame giữ khoảng cách và mở đường cho knee/hip pummel.`,
        `In ${title.en}, forearm frames preserve distance and open the knee or hip pummel lane.`,
        `Dans ${title.fr}, le forearm frame garde distance et ouvre la voie genou/hanche.`,
      ),
    },
    biceps: {
      instruction: lt(
        `Trong ${title.vi}, biceps không kéo một mình; dùng như clamp hoặc lever nối với lưng và hông.`,
        `In ${title.en}, the biceps do not pull alone; use them as clamps or levers connected to the back and hips.`,
        `Dans ${title.fr}, les biceps ne tirent pas seuls; utilisez-les comme clamp ou levier relié au dos et aux hanches.`,
      ),
      why: lt('Biceps kéo cô lập dễ mở khuỷu và cho đối thủ pummel hoặc peel grip.', 'Isolated biceps pulling opens elbows and lets the opponent pummel or peel grips.', 'Le tirage isolé ouvre les coudes et permet pummel ou peel grip.'),
    },
    knees: {
      instruction: lt(legLock ? 'Đầu gối đọc knee line: nếu gối bị giữ qua hông đối thủ, ưu tiên free knee line trước mọi turn.' : 'Gối là wedge và cảm biến inside position; gối gần nên tìm lại elbow hoặc hip line trước khi bạn đẩy đầu đối thủ.', legLock ? 'Knees read the knee line: if the knee is trapped past the opponent’s hips, free it before any turn.' : 'Knees are wedges and inside-position sensors; the near knee finds elbow or hip line before you push the opponent’s head.', legLock ? 'Les genoux lisent knee line : si le genou est piégé au-delà des hanches, le libérer avant toute rotation.' : 'Les genoux sont wedges et capteurs inside; le genou proche retrouve coude ou hip line avant de pousser la tête.'),
      why: lt('Gối mất inside position làm guard layer, escape line và leg lock safety sụp cùng lúc.', 'Losing inside-knee position collapses guard layers, escape lines, and leg-lock safety together.', 'Perdre inside knee effondre garde, sortie et sécurité leg lock ensemble.'),
    },
    thighs: {
      instruction: lt(
        `Trong ${title.vi}, đùi tạo clamp hoặc wedge vào hip line; giữ adductor active vừa đủ để kiểm soát.`,
        `In ${title.en}, the thighs create clamps or wedges on the hip line; keep the adductors active enough to control.`,
        `Dans ${title.fr}, les cuisses créent un clamp ou wedge sur la hip line; gardez les adducteurs actifs pour contrôler.`,
      ),
      why: lt('Thigh pressure đúng khóa hông; đùi quá cứng làm bạn không chuyển phase được.', 'Correct thigh pressure pins hips; overly rigid thighs stop your own phase transitions.', 'Bonne pression des cuisses bloque les hanches; trop rigide bloque vos transitions.'),
    },
    shins: {
      instruction: lt(
        `Trong ${title.vi}, shin dùng làm frame, hook hoặc rail dẫn hướng hông đối thủ; shin phải nối với knee angle và active foot.`,
        `In ${title.en}, the shin acts as a frame, hook, or rail guiding the opponent’s hips; it must connect to knee angle and active foot.`,
        `Dans ${title.fr}, le tibia sert de frame, hook ou rail pour guider les hanches; il doit connecter angle du genou et pied actif.`,
      ),
      why: lt('Shin thụ động cho passer vượt knee line hoặc cho leg locker gom chân phụ.', 'A passive shin lets the passer clear knee line or the leg locker collect the secondary leg.', 'Un tibia passif permet passer knee line ou capturer la jambe secondaire.'),
    },
    ankles: {
      instruction: lt(
        `Trong ${title.vi}, ankle giữ alignment với gối; khi post, cổ chân không sụp vào trong.`,
        `In ${title.en}, the ankle stays aligned with the knee; when posting, it does not collapse inward.`,
        `Dans ${title.fr}, la cheville reste alignée avec le genou; en post elle ne s’effondre pas vers l’intérieur.`,
      ),
      why: lt('Ankle sụp làm base yếu và mở heel exposure hoặc foot drag.', 'A collapsed ankle weakens base and opens heel exposure or foot drags.', 'Une cheville effondrée affaiblit base et expose talon ou foot drag.'),
    },
    heels: {
      instruction: lt(
        legLock
          ? `Trong ${title.vi}, gót chân phải ẩn khỏi line bàn tay đối thủ; nếu heel line xuất hiện, dừng xoay và tap hoặc free knee line có kiểm soát.`
          : `Trong ${title.vi}, gót chân định hướng hook/post; heel quá nhẹ làm mất base, heel quá lộ tạo foot control cho đối thủ.`,
        legLock
          ? `In ${title.en}, the heel stays hidden from the opponent’s hand line; if the heel line appears, stop rotating and tap or free the knee line with control.`
          : `In ${title.en}, the heel steers hooks and posts; a weightless heel loses base, an exposed heel gives foot control.`,
        legLock
          ? `Dans ${title.fr}, le talon reste caché de la ligne des mains adverses; si le talon apparaît, arrêtez la rotation et tapez ou libérez la knee line avec contrôle.`
          : `Dans ${title.fr}, le talon dirige hooks/posts; un talon trop léger perd la base, un talon exposé donne le contrôle du pied.`,
      ),
      why: lt(
        `Trong ${title.vi}, heel exposure là tín hiệu nguy hiểm lớn trong leg entanglement và cũng là dấu base yếu khi passing/wrestling.`,
        `In ${title.en}, heel exposure is a major leg-entanglement danger signal and also marks weak base in passing or wrestling.`,
        `Dans ${title.fr}, l’exposition du talon est un signal majeur en leg entanglement et marque une base faible en passing/wrestling.`,
      ),
    },
    toes: {
      instruction: lt(
        `Trong ${title.vi}, toes active trên mat khi cần drive hoặc sprawl; trong guard, toes giữ hook sống.`,
        `In ${title.en}, the toes stay active on the mat when driving or sprawling; in guard, they keep the hooks alive.`,
        `Dans ${title.fr}, les orteils restent actifs sur le tapis pour drive ou sprawl; en garde, ils gardent les hooks vivants.`,
      ),
      why: lt('Toes chết làm weight distribution rơi vào gối hoặc lưng, khiến transition chậm.', 'Dead toes dump weight into knees or back and slow transitions.', 'Des orteils passifs chargent genoux ou dos et ralentissent transition.'),
    },
    feet: {
      instruction: lt(
        `Trong ${title.vi}, feet là base, hook hoặc brake; đặt chân để drive, lift hoặc rút ra không bị trap.`,
        `In ${title.en}, feet act as base, hooks, or brakes; place them so you can drive, lift, or withdraw safely.`,
        `Dans ${title.fr}, les pieds servent de base, hooks ou freins; placez-les pour drive, lift ou retirer sans piège.`,
      ),
      why: lt('Foot position quyết định bạn có thể chuyển từ defense sang offense hay bị giữ tại chỗ.', 'Foot position decides whether you can convert defense to offense or remain stuck.', 'La position des pieds décide si vous convertissez défense en attaque ou restez bloqué.'),
    },
  }

  const selected = map[bodyPart]
  const withSkillContext = (text: LocalizedText): LocalizedText => ({
    vi: text.vi.includes(title.vi) ? text.vi : `${title.vi}: ${text.vi}`,
    en: text.en.includes(title.en) ? text.en : `${title.en}: ${text.en}`,
    fr: text.fr.includes(title.fr) ? text.fr : `${title.fr} : ${text.fr}`,
  })

  return {
    bodyPart,
    role,
    mechanicType,
    instruction: withSkillContext(selected.instruction),
    whyItMatters: withSkillContext(selected.why),
    commonErrors,
    correctionCues,
  }
}

const bodyPartsByPhase: { bodyParts: BodyPartKey[]; mechanicTypes: MechanicType[] }[] = [
  { bodyParts: ['head', 'eyes', 'hands', 'elbows', 'hips', 'feet'], mechanicTypes: ['alignment', 'inside_position', 'grip', 'wedge', 'mobility', 'post'] },
  { bodyParts: ['chin', 'neck', 'shoulders', 'forearms', 'knees', 'spine'], mechanicTypes: ['safety', 'alignment', 'pressure', 'frame', 'inside_position', 'alignment'] },
  { bodyParts: ['chest', 'sternum', 'ribs', 'wrists', 'thighs', 'shins'], mechanicTypes: ['pressure', 'pressure', 'alignment', 'grip', 'wedge', 'hook'] },
  { bodyParts: ['pelvis', 'ears', 'biceps', 'ankles', 'heels', 'toes'], mechanicTypes: ['weight_distribution', 'alignment', 'lever', 'mobility', 'safety', 'post'] },
]

const connectionPointFor = (seedValue: SkillSeed, phaseId: string, index: number, role: PlayerRole): ConnectionPoint => {
  const pairings: [BodyPartKey, BodyPartKey, LocalizedText, LocalizedText][] = [
    ['head', 'hips', lt('Đầu tới hip line', 'Head to hip line', 'Tête vers hip line'), lt('Chặn hông xoay tự do và nối đầu với pressure line.', 'Blocks free hip rotation and connects the head to the pressure line.', 'Bloque la rotation des hanches et connecte la tête à la ligne de pression.')],
    ['forearms', 'chest', lt('Forearm frame vào ngực/vai', 'Forearm frame to chest or shoulder', 'Forearm frame sur poitrine/épaule'), lt('Giữ khoảng cách bằng xương để tạo đường pummel cho gối hoặc tay.', 'Maintains skeletal distance so knee or hand can pummel inside.', 'Maintient distance osseuse pour pummel genou ou main.')],
    ['knees', 'hips', lt('Knee wedge vào hip line', 'Knee wedge to hip line', 'Knee wedge sur hip line'), lt('Ngăn chest-to-chest hoặc đóng hông đối thủ trước khi chuyển phase.', 'Prevents chest-to-chest or closes the opponent’s hips before transition.', 'Empêche chest-to-chest ou ferme les hanches avant transition.')],
    ['chest', 'shoulders', lt('Chest pressure tới shoulder line', 'Chest pressure to shoulder line', 'Pression poitrine vers shoulder line'), lt('Làm vai đối thủ quay lệch với hông để giảm bridge, pummel hoặc invert.', 'Turns the opponent’s shoulders away from hips to reduce bridge, pummel, or inversion.', 'Tourne les épaules loin des hanches pour réduire bridge, pummel ou inversion.')],
    ['hands', 'wrists', lt('Hand fight vào wrist line', 'Hand fight to wrist line', 'Hand fight sur wrist line'), lt('Kiểm soát lever đầu tiên trước khi cổ, hông hoặc chân bị tấn công.', 'Controls the first lever before neck, hips, or legs are attacked.', 'Contrôle le premier levier avant attaque cou, hanches ou jambes.')],
    ['feet', 'knees', lt('Foot post và knee line', 'Foot post and knee line', 'Post du pied et knee line'), lt('Tạo base để đổi góc mà không bị kéo vào entanglement.', 'Creates base to change angle without being pulled into entanglement.', 'Crée base pour changer angle sans entrer en entanglement.')],
  ]
  const selected = pairings[(index + phaseId.length) % pairings.length]
  return {
    id: `${phaseId}-connection-${index + 1}`,
    role,
    name: selected[2],
    yourBodyPart: selected[0],
    opponentBodyPart: selected[1],
    purpose: selected[3],
    pressureDirection: lt(
      `Dẫn lực theo đường chéo vào ${seedValue.title.vi}, không đổ thẳng xuống.`,
      `Drive diagonally through ${seedValue.title.en}, not straight down.`,
      `Diriger la force en diagonale dans ${seedValue.title.fr}, pas droit vers le bas.`,
    ),
    commonErrors: la(
      ['Connection chỉ chạm nhẹ nhưng không chịu lực.', 'Đẩy thẳng làm đối thủ xoay ra ngoài.', 'Giữ connection sau khi mục tiêu đã đổi.'],
      ['The connection only touches and does not bear weight.', 'Pushing straight lets the opponent rotate out.', 'Holding the connection after the target has changed.'],
      ['Connexion seulement posée, sans porter poids.', 'Pousser droit laisse tourner.', 'Garder la connexion après changement de cible.'],
    ),
  }
}

const directionalCueFor = (phaseId: string, index: number): DirectionalCue => {
  const cues: { direction: DirectionalCue['direction']; bodyParts: BodyPartKey[]; cue: LocalizedText; purpose: LocalizedText }[] = [
    {
      direction: 'diagonal',
      bodyParts: ['head', 'chest', 'hips'],
      cue: lt('Đẩy đường chéo đầu-ngực-hông, không đẩy ngang bằng tay.', 'Drive the head-chest-hip diagonal, not sideways with the arms.', 'Pousser la diagonale tête-poitrine-hanche, pas latéral avec les bras.'),
      purpose: lt('Đường chéo làm đối thủ khó bridge, rotate hoặc pummel lại.', 'The diagonal line makes bridge, rotation, or re-pummeling harder.', 'La diagonale rend bridge, rotation ou re-pummel plus difficile.'),
    },
    {
      direction: 'toward_far_hip',
      bodyParts: ['sternum', 'shoulders', 'knees'],
      cue: lt('Sternum hướng về far hip khi bạn cần tạo angle.', 'Aim the sternum toward the far hip when you need angle.', 'Diriger le sternum vers far hip pour créer angle.'),
      purpose: lt('Tách shoulder line khỏi hip line để mở pass, escape hoặc submission branch.', 'Separates shoulder line from hip line to open pass, escape, or submission branches.', 'Sépare shoulder line et hip line pour ouvrir pass, escape ou soumission.'),
    },
    {
      direction: 'down',
      bodyParts: ['pelvis', 'toes', 'chest'],
      cue: lt('Nặng bằng pelvis và active toes, không bằng cổ hoặc tay.', 'Make weight through pelvis and active toes, not neck or arms.', 'Mettre le poids par pelvis et orteils actifs, pas cou ou bras.'),
      purpose: lt('Weight distribution đúng giữ mobility trong khi vẫn tạo pressure.', 'Correct weight distribution preserves mobility while creating pressure.', 'Bonne distribution du poids garde mobilité avec pression.'),
    },
    {
      direction: 'rotate_left',
      bodyParts: ['hips', 'spine', 'knees'],
      cue: lt('Xoay hông trước, spine đi theo, gối giữ wedge.', 'Rotate hips first, let spine follow, keep knees as wedges.', 'Tourner les hanches d’abord, colonne suit, genoux en wedges.'),
      purpose: lt('Tạo angle bằng thân dưới thay vì kéo bằng vai.', 'Creates angle with lower body rather than pulling with shoulders.', 'Crée angle avec bas du corps plutôt qu’épaules.'),
    },
    {
      direction: 'toward_near_shoulder',
      bodyParts: ['forearms', 'elbows', 'hands'],
      cue: lt('Frame vào near shoulder rồi pummel khuỷu về ribs.', 'Frame into the near shoulder, then pummel elbow back to ribs.', 'Frame sur épaule proche puis pummel coude vers côtes.'),
      purpose: lt('Khôi phục inside position trước khi đổi cấp độ.', 'Recovers inside position before changing levels.', 'Récupère inside position avant changement de niveau.'),
    },
  ]
  const selected = cues[(index + phaseId.length) % cues.length]
  return {
    id: `${phaseId}-cue-${index + 1}`,
    ...selected,
  }
}

const phaseSignals = (seedValue: SkillSeed, phaseName: LocalizedText) => ({
  checkpoints: la(
    [
      `Đầu, hông và khuỷu cùng hướng trong ${phaseName.vi}.`,
      `Trong ${seedValue.title.vi} - ${phaseName.vi}, bạn có một inside connection: underhook, inside knee, forearm frame hoặc head position.`,
      'Weight distribution cho phép đổi hướng mà không chống tay dài.',
    ],
    [
      `Head, hips, and elbows point into one system during ${phaseName.en}.`,
      `During ${seedValue.title.en} - ${phaseName.en}, you own one inside connection: underhook, inside knee, forearm frame, or head position.`,
      'Weight distribution lets you change direction without a long hand post.',
    ],
    [
      `Dans ${seedValue.title.fr} - ${phaseName.fr}, tête, hanches et coudes travaillent ensemble.`,
      `Dans ${seedValue.title.fr} - ${phaseName.fr}, vous possédez une connexion inside : underhook, inside knee, forearm frame ou head position.`,
      'La distribution du poids permet de changer direction sans post long.',
    ],
  ),
  dangerSignals: la(
    [
      'Khuỷu tách khỏi ribs hoặc gối.',
      isLegLockSkill(seedValue) ? 'Knee line bị giữ sâu hoặc heel line lộ.' : 'Đầu thấp hơn chest đối thủ và cằm bị kéo lên.',
      'Hông bị flatten hoặc chân post bị trap.',
    ],
    [
      'Elbow separates from ribs or knee.',
      isLegLockSkill(seedValue) ? 'Knee line is trapped or heel line is exposed.' : 'Head drops below the opponent’s chest and chin is lifted.',
      'Hips are flattened or the posting foot is trapped.',
    ],
    [
      'Le coude quitte côtes ou genou.',
      isLegLockSkill(seedValue) ? 'Knee line piégée ou talon exposé.' : 'La tête descend sous la poitrine adverse et le menton se lève.',
      'Les hanches sont aplaties ou le pied de post est piégé.',
    ],
  ),
  successSignals: la(
    [
      'Bạn cảm nhận được connection chịu lực, không chỉ chạm.',
      `Trong ${seedValue.title.vi}, đối thủ phải chọn turn in, turn away, frame, stand hoặc reset thay vì tấn công tự do.`,
      `Bạn có nhánh tiếp theo rõ ràng từ ${seedValue.title.vi}.`,
    ],
    [
      'You feel the connection bearing weight, not merely touching.',
      `In ${seedValue.title.en}, the opponent must choose turn in, turn away, frame, stand, or reset instead of freely attacking.`,
      `You have a clear next branch from ${seedValue.title.en}.`,
    ],
    [
      'La connexion porte du poids, pas seulement contact.',
      `Dans ${seedValue.title.fr}, l’adversaire doit choisir turn in, turn away, frame, stand ou reset au lieu d’attaquer librement.`,
      `Vous avez une branche claire depuis ${seedValue.title.fr}.`,
    ],
  ),
})

const phaseFor = (seedValue: SkillSeed, template: ReturnType<typeof phaseTemplatesFor>[number], index: number): MechanicsPhase => {
  const role = roleForSkill(seedValue)
  const parts = bodyPartsByPhase[index % bodyPartsByPhase.length]
  const signals = phaseSignals(seedValue, template.name)
  const objectiveWithSkill = lt(
    template.objective.vi.includes(seedValue.title.vi) ? template.objective.vi : `${seedValue.title.vi}: ${template.objective.vi}`,
    template.objective.en.includes(seedValue.title.en) ? template.objective.en : `${seedValue.title.en}: ${template.objective.en}`,
    template.objective.fr.includes(seedValue.title.fr) ? template.objective.fr : `${seedValue.title.fr} : ${template.objective.fr}`,
  )
  return {
    id: template.id,
    name: template.name,
    objective: objectiveWithSkill,
    bodyPartInstructions: parts.bodyParts.map((bodyPart, bodyPartIndex) =>
      bodyPartInstructionFor(seedValue, template.name, bodyPart, role, parts.mechanicTypes[bodyPartIndex] ?? 'alignment'),
    ),
    connectionPoints: [connectionPointFor(seedValue, template.id, 0, role), connectionPointFor(seedValue, template.id, 1, role)],
    directionalCues: [directionalCueFor(template.id, 0), directionalCueFor(template.id, 1)],
    checkpoints: signals.checkpoints,
    dangerSignals: signals.dangerSignals,
    successSignals: signals.successSignals,
  }
}

const bodyMechanicsSystemFor = (seedValue: SkillSeed): BodyMechanicsSystem => {
  const legLock = isLegLockSkill(seedValue)
  const neck = isNeckSkill(seedValue)
  const phases = phaseTemplatesFor(seedValue).map((template, index) => phaseFor(seedValue, template, index))
  return {
    overview: lt(
      `${seedValue.title.vi} là một hệ thống body mechanics: bắt đầu từ tình huống rõ ràng, thắng inside position hoặc safety line, dùng head-hands-hips-knees-feet như một chain, rồi chuyển sang nhánh tiếp theo nếu phản ứng đầu tiên bị chặn.`,
      `${seedValue.title.en} is a body mechanics system: start from a clear situation, win inside position or the safety line, use head-hands-hips-knees-feet as one chain, then move to the next branch if the first reaction is blocked.`,
      `${seedValue.title.fr} est un système de mécanique corporelle : partir d’une situation claire, gagner inside position ou ligne de sécurité, utiliser tête-mains-hanches-genoux-pieds comme une chaîne, puis passer à la branche suivante si la première réponse est bloquée.`,
    ),
    topPlayerGoal: ['passing', 'pins_rides', 'back_control'].includes(seedValue.domain)
      ? lt(
          `${seedValue.title.vi}: top player khóa hip line/shoulder line, tạo pressure có hướng và ổn định trước khi tấn công.`,
          `${seedValue.title.en}: top player locks hip line and shoulder line, creates directed pressure, and stabilizes before attacking.`,
          `${seedValue.title.fr} : le top verrouille hip line/shoulder line, crée pression dirigée et stabilise avant attaque.`,
        )
      : undefined,
    bottomPlayerGoal: ['guard_retention', 'guard_offense', 'escapes', 'survival_defense'].includes(seedValue.domain)
      ? lt(
          `${seedValue.title.vi}: bottom player giữ elbow-knee connection, inside knee và hip angle để không bị flatten rồi chuyển sang recover hoặc offense.`,
          `${seedValue.title.en}: bottom player keeps elbow-knee connection, inside knee, and hip angle to avoid flattening, then recovers or attacks.`,
          `${seedValue.title.fr} : le bottom garde connexion coude-genou, inside knee et angle de hanches pour éviter flattening puis recover ou attaque.`,
        )
      : undefined,
    attackerGoal: ['submission_systems', 'wrestle_up_wrestling'].includes(seedValue.domain)
      ? lt(
          `${seedValue.title.vi}: attacker tạo hai hướng threat, dùng grip/head position để khóa lever trước khi tăng lực.`,
          `${seedValue.title.en}: attacker creates two threat lines and uses grip and head position to lock levers before adding force.`,
          `${seedValue.title.fr} : l’attaquant crée deux menaces et utilise grip/head position pour verrouiller les leviers avant force.`,
        )
      : undefined,
    defenderGoal: isDefensiveSkill(seedValue)
      ? lt('Defender bảo vệ cổ, spine, knee line và inside position trước khi tìm escape lớn.', 'Defender protects neck, spine, knee line, and inside position before hunting a large escape.', 'Le défenseur protège cou, colonne, knee line et inside position avant grande sortie.')
      : undefined,
    phases,
    globalPrinciples: la(
      [
        'Head position, elbow-knee connection và hip angle quyết định phần lớn exchange.',
        `Trong ${seedValue.title.vi}, inside position đặt wedge/frame/hook giữa bạn và lực của đối thủ.`,
        'Pressure phải có hướng: toward near shoulder, far hip, knee line hoặc mat return line.',
        `For ${seedValue.title.en}, right-underhook orientation means the right ear stays near ribs or shoulder line and the hips turn with the angle.`,
      ],
      [
        'Head position, elbow-knee connection, and hip angle decide most exchanges.',
        `In ${seedValue.title.en}, inside position places a wedge, frame, or hook between you and force.`,
        'Pressure needs direction: toward near shoulder, far hip, knee line, or mat-return line.',
        `For ${seedValue.title.en}, right-underhook orientation means the right ear stays near ribs or shoulder line and the hips turn with the angle.`,
      ],
      [
        `Dans ${seedValue.title.fr}, head position, coude-genou et angle de hanches guident l’échange.`,
        `Dans ${seedValue.title.fr}, inside position place wedge, frame ou hook entre vous et la force adverse.`,
        'La pression doit avoir direction : near shoulder, far hip, knee line ou mat return line.',
        `Pour ${seedValue.title.fr}, si le bras droit est underhook, l’oreille droite reste près des côtes ou de la shoulder line et les hanches suivent l’angle.`,
      ],
    ),
    nonNegotiables: la(
      [
        'Không hy sinh cổ, spine hoặc knee line để cố hoàn tất kỹ thuật.',
        'Không để khuỷu tách xa ribs/gối khi đang phòng thủ.',
        'Không chase submission trước khi có connection chịu lực.',
      ],
      [
        'Do not sacrifice neck, spine, or knee line to force the technique.',
        'Do not let elbows drift far from ribs or knees while defending.',
        'Do not chase submissions before connection bears weight.',
      ],
      [
        'Ne pas sacrifier cou, colonne ou knee line pour forcer la technique.',
        'Ne pas laisser les coudes loin des côtes/genoux en défense.',
        'Ne pas chasser la soumission avant connexion porteuse.',
      ],
    ),
    commonMechanicalErrors: la(
      [
        'Đầu nhìn xuống sàn và mất posture.',
        'Đẩy bằng tay thẳng thay vì dùng frame/wedge.',
        'Hông nằm phẳng hoặc quá cao so với mục tiêu pressure.',
        legLock ? 'Xoay chống lại heel hook pressure.' : 'Bỏ qua danger signal: chin lifted, elbow separated, hip flattened.',
      ],
      [
        'Head looks at the mat and loses posture.',
        'Pushing with straight arms instead of frames or wedges.',
        'Hips are flat or too high for the pressure goal.',
        legLock ? 'Rotating against heel hook pressure.' : 'Ignoring danger signals: chin lifted, elbow separated, hip flattened.',
      ],
      [
        'La tête regarde le tapis et perd posture.',
        'Pousser bras tendus au lieu de frames/wedges.',
        'Hanches plates ou trop hautes pour la pression.',
        legLock ? 'Tourner contre la pression du heel hook.' : 'Ignorer les signaux : menton levé, coude séparé, hanche aplatie.',
      ],
    ),
    correctionCues: la(
      ['Tai gần connection point.', 'Khuỷu về ribs, gối về khuỷu.', 'Sternum lái pressure theo đường chéo.', 'Active toes trước khi drive hoặc sprawl.'],
      ['Near ear to the connection point.', 'Elbow to ribs, knee to elbow.', 'Sternum steers diagonal pressure.', 'Active toes before driving or sprawling.'],
      ['Oreille proche au point de connexion.', 'Coude aux côtes, genou au coude.', 'Sternum dirige pression diagonale.', 'Orteils actifs avant drive ou sprawl.'],
    ),
    safetyNotes: la(
      [
        legLock || neck ? 'Tap sớm và tập dưới sự giám sát đủ chuyên môn.' : 'Tăng kháng cự theo từng nấc, không nhảy thẳng vào live speed.',
        legLock ? 'Không xoay chống lại heel hook; giấu gót và free knee line trước.' : 'Bảo vệ cổ và spine khi dùng pressure hoặc bridge.',
        neck ? 'Không crank cổ hoặc siết khi alignment chưa đúng; ưu tiên cơ chế kiểm soát.' : 'Không dùng đau để thay thế control.',
        'Không xem đây là lời khuyên y tế; dừng lại khi có đau bất thường.',
      ],
      [
        legLock || neck ? 'Tap early and train under qualified supervision.' : 'Increase resistance progressively; do not jump straight to live speed.',
        legLock ? 'Do not rotate against heel-hook pressure; hide heel and free the knee line first.' : 'Protect neck and spine when applying pressure or bridging.',
        neck ? 'Do not crank the neck or squeeze without alignment; prioritize controlled mechanics.' : 'Do not use pain as a substitute for control.',
        'This is not medical advice; stop when unusual pain appears.',
      ],
      [
        legLock || neck ? 'Taper tôt et s’entraîner sous supervision qualifiée.' : 'Augmenter la résistance progressivement; pas directement en live speed.',
        legLock ? 'Ne pas tourner contre heel-hook pressure; cacher le talon et libérer knee line d’abord.' : 'Protéger cou et colonne sous pression ou bridge.',
        neck ? 'Ne pas crank le cou ou serrer sans alignment; prioriser mécanique contrôlée.' : 'Ne pas utiliser la douleur comme remplacement du contrôle.',
        'Ceci n’est pas un avis médical; arrêter en cas de douleur inhabituelle.',
      ],
    ),
  }
}

const reactionBranchesFor = (seedValue: SkillSeed): ReactionBranch[] => {
  const next = [...seedValue.relatedSkills, ...seedValue.prerequisites, ...fallbackNext].filter(Boolean)
  const pick = (index: number) => [...new Set(next)].slice(index, index + 2)
  return [
    {
      opponentReaction: lt('Đối thủ frame mạnh vào vai/cổ.', 'Opponent frames hard into shoulder or neck.', 'L’adversaire frame fort sur épaule ou cou.'),
      bodySignal: lt('Forearm của họ thẳng, shoulder line của bạn bị đẩy lệch.', 'Their forearm straightens and your shoulder line gets displaced.', 'Son forearm se tend et votre shoulder line se déplace.'),
      recommendedResponse: lt('Đổi angle bằng hông, pummel lại inside elbow rồi quay lại pressure/grip.', 'Change angle with hips, pummel inside elbow back, then return to pressure or grip.', 'Changer angle par les hanches, pummel coude inside puis revenir pressure/grip.'),
      nextSkillIds: pick(0),
      bodyMechanicAdjustment: lt('Sternum không đẩy thẳng; hướng về far hip hoặc near shoulder để làm frame mất góc.', 'Do not drive sternum straight; aim toward far hip or near shoulder to misalign the frame.', 'Ne pas pousser sternum droit; viser far hip ou near shoulder pour casser l’angle du frame.'),
    },
    {
      opponentReaction: lt('Đối thủ pummel inside position.', 'Opponent pummels inside position.', 'L’adversaire pummel inside position.'),
      bodySignal: lt('Khuỷu/gối trong của họ vào giữa bạn và centerline.', 'Their inside elbow or knee enters between you and the centerline.', 'Son coude/genou inside entre entre vous et centerline.'),
      recommendedResponse: lt('Thu khuỷu về ribs, dùng head position chặn line và re-pummel bằng knee/forearm.', 'Return elbow to ribs, block the line with head position, and re-pummel with knee or forearm.', 'Ramener coude aux côtes, bloquer avec head position et re-pummel genou/forearm.'),
      nextSkillIds: pick(1),
      bodyMechanicAdjustment: lt('Giữ tai gần connection point; nếu tai trôi, đầu không còn chặn được shoulder/hip rotation.', 'Keep the ear near the connection point; if it floats, the head no longer blocks shoulder or hip rotation.', 'Garder l’oreille proche; si elle flotte, la tête ne bloque plus rotation épaules/hanches.'),
    },
    {
      opponentReaction: lt('Đối thủ turn away.', 'Opponent turns away.', 'L’adversaire turn away.'),
      bodySignal: lt('Far shoulder biến mất, near hip quay khỏi bạn.', 'Far shoulder disappears and near hip rotates away.', 'Far shoulder disparaît et near hip tourne loin.'),
      recommendedResponse: lt('Theo bằng hip connection, tìm back exposure, turtle ride hoặc mat return.', 'Follow with hip connection and look for back exposure, turtle ride, or mat return.', 'Suivre avec connexion hanche et chercher back exposure, turtle ride ou mat return.'),
      nextSkillIds: ['turtle-ride', 'back-control'].filter((id) => id !== seedValue.id),
      bodyMechanicAdjustment: lt('Đừng kéo bằng biceps; dùng chest/pelvis để giữ khoảng cách ngắn.', 'Do not pull with biceps; use chest and pelvis to keep distance short.', 'Ne pas tirer biceps; utiliser poitrine et pelvis pour garder distance courte.'),
    },
    {
      opponentReaction: lt('Đối thủ turn in.', 'Opponent turns in.', 'L’adversaire turn in.'),
      bodySignal: lt('Near knee hoặc near elbow của họ tìm lại inside lane.', 'Their near knee or near elbow searches back inside.', 'Son genou ou coude proche cherche inside lane.'),
      recommendedResponse: lt('Đặt knee wedge/forearm frame vào hip-shoulder line rồi quay về control.', 'Place knee wedge or forearm frame into hip-shoulder line, then return to control.', 'Placer knee wedge ou forearm frame dans hip-shoulder line puis revenir contrôle.'),
      nextSkillIds: pick(2),
      bodyMechanicAdjustment: lt('Gối và khuỷu của bạn phải đóng trước khi tăng pressure.', 'Your knee and elbow must close before adding pressure.', 'Votre genou et coude doivent fermer avant d’ajouter pression.'),
    },
    {
      opponentReaction: lt('Đối thủ đứng dậy hoặc tạo base cao.', 'Opponent stands or builds a high base.', 'L’adversaire se relève ou construit une base haute.'),
      bodySignal: lt('Toes active, hông nhô lên, head line rời khỏi mat.', 'Active toes, hips rising, and head line leaving the mat.', 'Orteils actifs, hanches montent, ligne de tête quitte le tapis.'),
      recommendedResponse: lt('Theo hip line, đổi sang mat return, single leg, snapdown hoặc reset hand fighting.', 'Follow hip line and switch to mat return, single leg, snapdown, or hand-fight reset.', 'Suivre hip line et passer mat return, single leg, snapdown ou reset hand fight.'),
      nextSkillIds: ['mat-return-basics', 'single-leg-bjj', 'snapdown-front-headlock'].filter((id) => id !== seedValue.id),
      bodyMechanicAdjustment: lt('Active toes của bạn đi trước; nếu gối chết trên mat, bạn sẽ trễ nhịp.', 'Your active toes move first; dead knees on the mat make you late.', 'Vos orteils actifs bougent d’abord; genoux morts au tapis vous rendent en retard.'),
    },
    {
      opponentReaction: lt('Đối thủ invert hoặc đưa chân vào trong.', 'Opponent inverts or inserts legs inside.', 'L’adversaire invert ou insère les jambes inside.'),
      bodySignal: lt('Hip line của họ quay lên trời, shin/feet tìm lại centerline.', 'Their hip line turns upward and shins or feet recover centerline.', 'Sa hip line monte et shins/pieds récupèrent centerline.'),
      recommendedResponse: lt('Kiểm soát knee line, giữ chest-to-hip hoặc rút về leg lock safety nếu cần.', 'Control the knee line, keep chest-to-hip, or retreat to leg-lock safety when needed.', 'Contrôler knee line, garder chest-to-hip ou revenir sécurité leg lock si besoin.'),
      nextSkillIds: ['leg-lock-safety-basics', 'outside-passing'].filter((id) => id !== seedValue.id),
      bodyMechanicAdjustment: lt('Không đuổi chân bằng tay dài; dùng shin, knee wedge hoặc hip switch.', 'Do not chase legs with long arms; use shin, knee wedge, or hip switch.', 'Ne pas chasser les jambes bras longs; utiliser shin, knee wedge ou hip switch.'),
    },
    {
      opponentReaction: lt('Đối thủ giấu khuỷu hoặc giấu cổ.', 'Opponent hides elbow or neck.', 'L’adversaire cache coude ou cou.'),
      bodySignal: lt('Elbow line dính vào ribs, chin tuck và hand fight đóng lại.', 'Elbow line sticks to ribs, chin tucks, and hand fight closes.', 'Elbow line colle aux côtes, menton rentré et hand fight fermé.'),
      recommendedResponse: lt('Chuyển sang lever thứ hai: wrist, shoulder line, hip line hoặc back exposure.', 'Switch to the second lever: wrist, shoulder line, hip line, or back exposure.', 'Passer au second levier : wrist, shoulder line, hip line ou back exposure.'),
      nextSkillIds: pick(3),
      bodyMechanicAdjustment: lt('Đổi grip trước khi đổi sức; grip mới phải nối với hông.', 'Change grip before adding force; the new grip must connect to the hips.', 'Changer grip avant force; le nouveau grip doit connecter aux hanches.'),
    },
    {
      opponentReaction: lt('Đối thủ thắng head position.', 'Opponent wins head position.', 'L’adversaire gagne head position.'),
      bodySignal: lt('Đầu bạn bị đẩy ngoài centerline và spine bắt đầu gập hoặc xoay sai.', 'Your head is pushed off centerline and the spine starts folding or mis-rotating.', 'Votre tête sort de centerline et la colonne commence à plier ou mal tourner.'),
      recommendedResponse: lt('Dừng finish, lấy lại head line bằng frame ngắn, chin tuck và hip angle.', 'Pause the finish and recover head line with short frame, chin tuck, and hip angle.', 'Stopper le finish et récupérer head line avec frame court, chin tuck et angle de hanche.'),
      nextSkillIds: ['inside-position', 'frames-pummeling'].filter((id) => id !== seedValue.id),
      bodyMechanicAdjustment: lt('Cổ ngắn, mắt nhìn hông/vai; đừng xoay cổ để thoát.', 'Short neck, eyes on hips and shoulders; do not twist the neck to escape.', 'Cou court, yeux sur hanches/épaules; ne pas tordre le cou pour sortir.'),
    },
  ]
}

const positionalRelationshipsFor = (seedValue: SkillSeed): PositionalRelationship[] => {
  const role = roleForSkill(seedValue)
  const firstPhase = phaseFor(seedValue, phaseTemplatesFor(seedValue)[0], 0)
  return [
    {
      id: `${seedValue.id}-relationship`,
      name: lt(`${seedValue.title.vi}: relationship map`, `${seedValue.title.en}: relationship map`, `${seedValue.title.fr} : carte de relation`),
      description: lt(
        `Mối quan hệ chính trong ${seedValue.title.vi} là cuộc đua giữa inside position, head line, hip line và khả năng đổi phase khi đối thủ phản ứng.`,
        `The core relationship in ${seedValue.title.en} is the race between inside position, head line, hip line, and the ability to change phase when the opponent reacts.`,
        `La relation centrale dans ${seedValue.title.fr} est la course entre inside position, head line, hip line et changement de phase.`,
      ),
      dominantPlayer: role,
      keyControlPoints: firstPhase.connectionPoints,
      escapePriorities: la(
        ['Bảo vệ cổ/spine/knee line trước.', 'Khôi phục elbow-knee connection.', 'Tạo hip angle rồi mới đứng dậy hoặc recover guard.'],
        ['Protect neck, spine, and knee line first.', 'Rebuild elbow-knee connection.', 'Create hip angle before standing or recovering guard.'],
        ['Protéger cou, colonne et knee line d’abord.', 'Reconstruire connexion coude-genou.', 'Créer angle de hanche avant stand ou recover guard.'],
      ),
      attackPriorities: la(
        ['Thắng head position hoặc inside grip.', 'Khóa hip line/shoulder line bằng connection chịu lực.', 'Tạo dilemma trước khi chase finish.'],
        ['Win head position or inside grip.', 'Lock hip line or shoulder line with weight-bearing connection.', 'Create dilemma before chasing the finish.'],
        ['Gagner head position ou grip inside.', 'Verrouiller hip line/shoulder line avec connexion porteuse.', 'Créer dilemme avant finish.'],
      ),
    },
  ]
}

const targetInstruction = (
  bodyPart: BodyPartKey,
  role: PlayerRole,
  mechanicType: MechanicType,
  instruction: LocalizedText,
  whyItMatters: LocalizedText,
  commonErrors: LocalizedStringArray,
  correctionCues: LocalizedStringArray,
): BodyPartInstruction => ({
  bodyPart,
  role,
  mechanicType,
  instruction,
  whyItMatters,
  commonErrors,
  correctionCues,
})

const targetConnection = (
  id: string,
  role: PlayerRole,
  name: LocalizedText,
  yourBodyPart: BodyPartKey,
  opponentBodyPart: BodyPartKey,
  purpose: LocalizedText,
  pressureDirection: LocalizedText,
): ConnectionPoint => ({
  id,
  role,
  name,
  yourBodyPart,
  opponentBodyPart,
  purpose,
  pressureDirection,
  commonErrors: la(
    ['Chỉ chạm vào điểm kết nối nhưng không đưa trọng lượng qua đó.', 'Đẩy thẳng làm đối thủ xoay ra ngoài.', 'Giữ connection sau khi phase đã đổi.'],
    ['Touching the connection without sending weight through it.', 'Pushing straight lets the opponent rotate out.', 'Keeping the connection after the phase has changed.'],
    ['Toucher la connexion sans y envoyer le poids.', 'Pousser droit laisse l’adversaire tourner.', 'Garder la connexion après le changement de phase.'],
  ),
})

const targetCue = (
  id: string,
  direction: DirectionalCue['direction'],
  bodyParts: BodyPartKey[],
  cue: LocalizedText,
  purpose: LocalizedText,
): DirectionalCue => ({
  id,
  direction,
  bodyParts,
  cue,
  purpose,
})

const targetPhase = (
  id: string,
  name: LocalizedText,
  objective: LocalizedText,
  role: PlayerRole,
  instructions: BodyPartInstruction[],
  checkpoints: LocalizedStringArray,
  dangerSignals: LocalizedStringArray,
  successSignals: LocalizedStringArray,
): MechanicsPhase => ({
  id,
  name,
  objective,
  bodyPartInstructions: instructions,
  connectionPoints: [
    targetConnection(
      `${id}-head-hip`,
      role,
      lt('Head/ear tới hip hoặc shoulder line', 'Head/ear to hip or shoulder line', 'Tête/oreille vers hip ou shoulder line'),
      'head',
      'hips',
      lt('Dùng đầu như wedge để chặn rotation trước khi dùng tay kéo/đẩy.', 'Use the head as a wedge to block rotation before pulling or pushing with hands.', 'Utiliser la tête comme wedge pour bloquer rotation avant tirer/pousser avec les mains.'),
      lt('Lực đi chéo qua đầu-ngực-hông, không cắm thẳng xuống.', 'Pressure travels diagonally through head-chest-hips, not straight down.', 'La pression passe en diagonale tête-poitrine-hanches, pas droit vers le bas.'),
    ),
    targetConnection(
      `${id}-elbow-knee`,
      role,
      lt('Elbow-knee hoặc wrist-hip connection', 'Elbow-knee or wrist-hip connection', 'Connexion coude-genou ou poignet-hanche'),
      'elbows',
      'ribs',
      lt('Đóng lever gần nhất để không cho đối thủ pummel inside hoặc tách tay.', 'Close the nearest lever so the opponent cannot pummel inside or isolate the arm.', 'Fermer le levier proche pour empêcher pummel inside ou isolation du bras.'),
      lt('Thu vào centerline trước, rồi mới đổi angle.', 'Pull into centerline first, then change angle.', 'Ramener vers centerline d’abord, puis changer angle.'),
    ),
  ],
  directionalCues: [
    targetCue(
      `${id}-diagonal`,
      'diagonal',
      ['head', 'chest', 'hips'],
      lt('Tạo đường chéo đầu-ngực-hông thay vì đẩy ngang bằng tay.', 'Create a head-chest-hip diagonal instead of pushing sideways with arms.', 'Créer une diagonale tête-poitrine-hanche au lieu de pousser latéralement avec les bras.'),
      lt('Đường chéo làm frame, hook hoặc bridge của đối thủ mất hướng.', 'The diagonal makes their frame, hook, or bridge lose direction.', 'La diagonale fait perdre direction au frame, hook ou bridge adverse.'),
    ),
    targetCue(
      `${id}-hip-line`,
      'toward_far_hip',
      ['sternum', 'pelvis', 'knees'],
      lt('Sternum và pelvis hướng về far hip khi cần angle.', 'Aim sternum and pelvis toward the far hip when angle is needed.', 'Diriger sternum et pelvis vers far hip quand il faut angle.'),
      lt('Tách shoulder line khỏi hip line để mở branch tiếp theo.', 'Separates shoulder line from hip line to open the next branch.', 'Sépare shoulder line et hip line pour ouvrir la branche suivante.'),
    ),
  ],
  checkpoints,
  dangerSignals,
  successSignals,
})

const conciseInstruction = (
  bodyPart: BodyPartKey,
  role: PlayerRole,
  mechanicType: MechanicType,
  instruction: LocalizedText,
  whyItMatters: LocalizedText,
): BodyPartInstruction =>
  targetInstruction(
    bodyPart,
    role,
    mechanicType,
    instruction,
    whyItMatters,
    la(
      ['Body part tách khỏi head-hips-knees chain.', 'Dùng sức tay/cổ thay vì angle.', 'Giữ line cũ khi đối thủ đã đổi phản ứng.'],
      ['The body part disconnects from the head-hips-knees chain.', 'Using arm or neck force instead of angle.', 'Holding the old line after the opponent changes reaction.'],
      ['La partie se déconnecte de la chaîne tête-hanches-genoux.', 'Forcer bras/cou au lieu de l’angle.', 'Garder l’ancienne ligne après réaction adverse.'],
    ),
    la(
      ['Nối về centerline.', 'Thở ra rồi đổi angle.', 'Nếu mất inside position, reset trước khi tăng lực.'],
      ['Reconnect to centerline.', 'Exhale, then change angle.', 'If inside position is lost, reset before adding force.'],
      ['Reconnecter centerline.', 'Expirer puis changer angle.', 'Si inside position est perdue, reset avant force.'],
    ),
  )

const bodylockPassingMechanics = (): BodyMechanicsSystem => ({
  overview: lt(
    'Bodylock passing là hệ thống khóa hông trước khi vượt chân. Bạn không chạy quanh guard; bạn làm hông đối thủ mất khả năng xoay, nâng butterfly hook, tạo shoulder crunch hoặc pummel inside knee.',
    'Bodylock passing is a system for locking the hips before clearing the legs. You are not running around guard; you are removing the opponent’s ability to rotate, elevate with butterfly hooks, create shoulder crunch, or pummel an inside knee.',
    'Le bodylock passing verrouille les hanches avant de franchir les jambes. Vous ne contournez pas la garde; vous retirez rotation, élévation butterfly hook, shoulder crunch et pummel inside knee.',
  ),
  topPlayerGoal: lt('Top player muốn chest-to-hip, đầu lệch, tay khóa quanh hông và trọng lượng đi chéo để vượt knee line rồi ổn định pin.', 'Top player wants chest-to-hip, offset head, hands locked around the hips, and diagonal weight to clear the knee line and stabilize the pin.', 'Le top veut chest-to-hip, tête décalée, mains verrouillées autour des hanches et poids diagonal pour passer knee line puis stabiliser.'),
  bottomPlayerGoal: lt('Bottom player muốn giữ shin frame, butterfly hook, shoulder crunch hoặc inside knee để xoay hông lại vào centerline.', 'Bottom player wants shin frame, butterfly hook, shoulder crunch, or inside knee to rotate hips back to centerline.', 'Le bottom veut shin frame, butterfly hook, shoulder crunch ou inside knee pour ramener les hanches à centerline.'),
  phases: [
    targetPhase(
      'bodylock-entry',
      lt('Vào chest-to-hip connection', 'Enter chest-to-hip connection', 'Entrer chest-to-hip'),
      lt('Đưa ngực/vai vào gần hông mà không đặt đầu giữa hai tay đối thủ.', 'Connect chest and shoulder near the hips without centering your head between their arms.', 'Connecter poitrine/épaule près des hanches sans centrer la tête entre ses bras.'),
      'top',
      [
        targetInstruction('head', 'top', 'alignment', lt('Đầu thấp hơn vai đối thủ và lệch về một bên hông; tai gần hông, trán không nằm giữa hai tay của họ.', 'Head stays lower than their shoulders and offset toward one hip; ear near the hip, forehead not centered between their hands.', 'Tête plus basse que les épaules et décalée vers une hanche; oreille près hanche, front non centré entre ses mains.'), lt('Đầu lệch làm shoulder crunch yếu và biến đầu thành wedge chặn hip rotation.', 'An offset head weakens shoulder crunch and turns the head into a wedge against hip rotation.', 'Une tête décalée affaiblit shoulder crunch et devient wedge contre rotation des hanches.'), la(['Đầu ở giữa ngực', 'Đầu quá cao', 'Nhìn xuống mat'], ['Head centered on chest', 'Head too high', 'Looking at the mat'], ['Tête centrée poitrine', 'Tête trop haute', 'Regarder le tapis']), la(['Tai gần hông', 'Cổ ngắn', 'Mắt nhìn hip line'], ['Ear near hip', 'Short neck', 'Eyes on hip line'], ['Oreille près hanche', 'Cou court', 'Yeux sur hip line'])),
        targetInstruction('eyes', 'top', 'alignment', lt('Mắt nhìn hip line và đầu gối trong của bottom player; đừng nhìn xuống sàn khi lock tay.', 'Eyes track hip line and the bottom player’s inside knee; do not stare at the floor while locking hands.', 'Les yeux suivent hip line et inside knee du bottom; ne regardez pas le tapis pendant le verrou.'), lt('Gaze này giúp bạn đọc butterfly lift, knee pummel và invert trước khi chúng có lực.', 'This gaze reads butterfly lift, knee pummel, and inversion before they develop force.', 'Ce regard lit butterfly lift, knee pummel et inversion avant la force.'), la(['Nhìn vào grip của mình', 'Không thấy inside knee', 'Phản ứng muộn với invert'], ['Looking at your own grip', 'Missing the inside knee', 'Late reaction to inversion'], ['Regarder son grip', 'Rater inside knee', 'Réaction tardive à inversion']), la(['Mắt hông-gối', 'Đầu yên, mắt quét', 'Đọc knee pummel trước'], ['Eyes hip-knee', 'Head still, eyes scan', 'Read knee pummel first'], ['Yeux hanche-genou', 'Tête stable, yeux scannent', 'Lire knee pummel d’abord'])),
        targetInstruction('chest', 'top', 'pressure', lt('Ngực kết nối vào belt line/hông, không đổ lên ngực họ. Chest-to-hip làm hông họ nặng trước khi bạn vượt chân.', 'Chest connects to belt line and hips, not their chest. Chest-to-hip makes their hips heavy before you clear legs.', 'Poitrine connectée belt line/hanches, pas poitrine adverse. Chest-to-hip rend ses hanches lourdes avant de passer.'), lt('Nếu ngực quá cao, họ shoulder crunch, frame cổ hoặc tạo butterfly lift.', 'If the chest is too high, they shoulder crunch, frame the neck, or build butterfly lift.', 'Si la poitrine est trop haute, il shoulder crunch, frame le cou ou élève butterfly.'), la(['Chest quá cao', 'Nằm thẳng xuống', 'Không có sternum direction'], ['Chest too high', 'Dropping straight down', 'No sternum direction'], ['Poitrine trop haute', 'Tomber droit', 'Pas de direction sternum']), la(['Sternum tới hip line', 'Vai gần hông', 'Nặng chéo'], ['Sternum to hip line', 'Shoulder near hip', 'Diagonal weight'], ['Sternum vers hip line', 'Épaule près hanche', 'Poids diagonal'])),
        targetInstruction('hands', 'top', 'grip', lt('Hai tay khóa quanh hông hoặc dưới mông; wrist trung lập, bàn tay không leo cao lên ribs nơi họ có thể peel.', 'Hands lock around hips or under the butt; wrists neutral, hands do not climb high to ribs where they can peel.', 'Mains verrouillées autour hanches ou sous fesses; poignets neutres, mains pas hautes sur côtes où il peut peel.'), lt('Grip thấp khóa pelvis, còn grip cao chỉ ôm thân và để hông xoay.', 'A low grip locks the pelvis; a high grip hugs the torso and lets hips rotate.', 'Grip bas verrouille pelvis; grip haut serre torse et laisse tourner les hanches.'), la(['Grip quá cao', 'Wrist gập', 'Kéo bằng biceps'], ['Grip too high', 'Bent wrists', 'Pulling with biceps'], ['Grip trop haut', 'Poignets pliés', 'Tirer biceps']), la(['Khóa dưới hip bones', 'Wrist thẳng', 'Kéo bằng lưng-hông'], ['Lock below hip bones', 'Straight wrists', 'Pull with back and hips'], ['Verrou sous hanches', 'Poignets droits', 'Tirer dos-hanches'])),
        targetInstruction('knees', 'top', 'wedge', lt('Gối đi rộng vừa đủ để base; gối gần chặn shin frame, gối xa sẵn sàng windshield để clear knee line.', 'Knees stay wide enough for base; near knee blocks shin frame, far knee is ready to windshield to clear the knee line.', 'Genoux assez larges pour base; genou proche bloque shin frame, genou loin prêt à windshield pour passer knee line.'), lt('Knees định base và quyết định bạn có bị butterfly lift hay không.', 'Knees define base and decide whether butterfly hooks can lift you.', 'Les genoux définissent base et empêchent butterfly lift.'), la(['Hai gối sát nhau', 'Gối nằm trên hook', 'Base rơi vào tay'], ['Knees too narrow', 'Knee sitting on hook', 'Base falling to hands'], ['Genoux trop serrés', 'Genou sur hook', 'Base tombe sur mains']), la(['Gối rộng, hông thấp', 'Chặn shin trước', 'Clear từng layer'], ['Wide knees, low hips', 'Block shin first', 'Clear one layer at a time'], ['Genoux larges, hanches basses', 'Bloquer tibia d’abord', 'Passer couche par couche'])),
      ],
      la(['Tai gần hông', 'Grip dưới hip bones', 'Inside knee của họ chưa vào giữa'], ['Ear near hip', 'Grip below hip bones', 'Their inside knee is not between you'], ['Oreille près hanche', 'Grip sous hanches', 'Inside knee pas entre vous']),
      la(['Đầu nằm giữa hai tay họ', 'Butterfly hook nâng được hông bạn', 'Shoulder crunch kéo vai bạn lên'], ['Head centered between their hands', 'Butterfly hook lifts your hips', 'Shoulder crunch elevates your shoulder'], ['Tête entre ses mains', 'Butterfly hook soulève vos hanches', 'Shoulder crunch monte votre épaule']),
      la(['Hông họ nặng', 'Shin frame bị tắt', 'Bạn có thể thở và chuyển gối'], ['Their hips feel heavy', 'Shin frame is shut down', 'You can breathe and move knees'], ['Ses hanches sont lourdes', 'Shin frame éteint', 'Vous respirez et bougez les genoux']),
    ),
    targetPhase(
      'bodylock-kill-frames',
      lt('Giết hook và frame', 'Kill hooks and frames', 'Tuer hooks et frames'),
      lt('Tắt butterfly hook, shin frame và hand frame trước khi clear chân.', 'Shut down butterfly hook, shin frame, and hand frames before clearing legs.', 'Éteindre butterfly hook, shin frame et hand frames avant passer les jambes.'),
      'top',
      [
        targetInstruction('elbows', 'top', 'inside_position', lt('Khuỷu ôm vào hip line, không flare ra ngoài. Nếu khuỷu mở, họ pummel shin hoặc shoulder crunch.', 'Elbows clamp into hip line, not flared outside. If elbows open, they pummel shin or shoulder crunch.', 'Coudes clamp sur hip line, pas ouverts. Si les coudes ouvrent, il pummel shin ou shoulder crunch.'), lt('Elbows là khóa chống họ đưa cấu trúc vào giữa bạn và hông họ.', 'Elbows prevent them from inserting structure between you and their hips.', 'Les coudes empêchent sa structure d’entrer entre vous et ses hanches.'), la(['Elbow flare', 'Ôm bằng cánh tay', 'Khuỷu đè lên mat'], ['Elbow flare', 'Hugging with arms', 'Elbow posted on mat'], ['Coudes ouverts', 'Serrer avec bras', 'Coude sur tapis']), la(['Khuỷu về túi quần', 'Đóng trước khi drive', 'Clamp bằng lats'], ['Elbows to pockets', 'Close before driving', 'Clamp with lats'], ['Coudes vers poches', 'Fermer avant drive', 'Clamp avec dorsaux'])),
        targetInstruction('forearms', 'top', 'frame', lt('Forearm gần chặn shin frame như một thanh chắn; không duỗi tay đẩy chân, hãy dùng cẳng tay và ngực ép shin xuống.', 'Near forearm blocks shin frame like a bar; do not extend the arm to push the leg, use forearm and chest to fold the shin down.', 'Avant-bras proche bloque shin frame comme barre; ne pas tendre le bras, utiliser forearm et poitrine pour plier tibia.'), lt('Forearm đúng biến chân họ thành cấu trúc bị gập, không phải hook sống.', 'Correct forearm turns their leg into a folded structure, not a live hook.', 'Bon forearm transforme sa jambe en structure pliée, pas hook vivant.'), la(['Đẩy bằng bàn tay', 'Forearm không chịu lực', 'Để shin vào cổ'], ['Pushing with hand', 'Forearm carries no weight', 'Letting shin reach neck'], ['Pousser main', 'Forearm sans poids', 'Laisser tibia au cou']), la(['Cẳng tay như xà ngang', 'Chest đè shin', 'Đừng duỗi khuỷu'], ['Forearm like a crossbar', 'Chest folds shin', 'Do not straighten elbow'], ['Forearm comme barre', 'Poitrine plie tibia', 'Ne pas tendre coude'])),
        targetInstruction('hips', 'top', 'weight_distribution', lt('Hông thấp vừa đủ để không bị lift nhưng không ngồi lên gót. 60-70% trọng lượng qua chest/shoulder, còn hông mobile để bước qua.', 'Hips are low enough not to be lifted but not sitting on heels. Send 60-70% weight through chest and shoulder while hips stay mobile to step over.', 'Hanches assez basses pour ne pas être soulevées mais pas assises. 60-70% poids par poitrine/épaule, hanches mobiles pour passer.'), lt('Nếu hông chết, bạn nặng nhưng không pass; nếu hông cao, hook nâng bạn.', 'Dead hips make you heavy without passing; high hips let hooks lift you.', 'Hanches mortes rendent lourd sans passer; hanches hautes se font lever par hooks.'), la(['Ngồi lên gót', 'Hông cao', 'Weight vào hai gối'], ['Sitting on heels', 'High hips', 'Weight on both knees'], ['Assis sur talons', 'Hanches hautes', 'Poids sur deux genoux']), la(['Hông thấp-mobile', 'Toes active', 'Bước bằng hip, không bằng tay'], ['Low mobile hips', 'Active toes', 'Step with hips, not hands'], ['Hanches basses mobiles', 'Orteils actifs', 'Passer avec hanches, pas mains'])),
        targetInstruction('feet', 'top', 'post', lt('Feet và toes active như chân chống. Một chân post để chống bridge, chân kia nhẹ để windshield qua shin.', 'Feet and toes are active posts. One foot posts against bridge, the other stays light enough to windshield over the shin.', 'Pieds et orteils actifs comme posts. Un pied contre bridge, l’autre léger pour windshield sur tibia.'), lt('Active toes cho bạn drive mà không chống tay dài, và cho phép đổi pass line nhanh.', 'Active toes let you drive without long hand posts and switch pass lines quickly.', 'Orteils actifs permettent drive sans long post main et changement rapide de pass line.'), la(['Toes chết', 'Hai chân song song hẹp', 'Post tay dài'], ['Dead toes', 'Narrow parallel feet', 'Long hand post'], ['Orteils morts', 'Pieds parallèles serrés', 'Long post main']), la(['Toes cắm mat', 'Một chân nặng một chân nhẹ', 'Đổi chân như windshield'], ['Toes grip mat', 'One heavy foot one light foot', 'Windshield the feet'], ['Orteils dans tapis', 'Un pied lourd un léger', 'Windshield pieds'])),
        targetInstruction('shoulders', 'top', 'pressure', lt('Vai gần hông ép xuống, vai xa giữ thấp để không bị shoulder crunch kéo lên. Không nhún vai cứng.', 'Near shoulder pressures down by the hip, far shoulder stays low so shoulder crunch cannot lift you. Do not shrug stiffly.', 'Épaule proche met pression près hanche, épaule loin reste basse pour éviter shoulder crunch. Ne pas hausser épaules.'), lt('Shoulder line ổn định giúp chest-to-hip giữ lực khi bạn đổi gối.', 'A stable shoulder line keeps chest-to-hip pressure while your knees move.', 'Shoulder line stable garde chest-to-hip pendant mouvement des genoux.'), la(['Vai cao', 'Bị kéo vào shoulder crunch', 'Vai rời ngực'], ['High shoulder', 'Pulled into shoulder crunch', 'Shoulder disconnects from chest'], ['Épaule haute', 'Pris shoulder crunch', 'Épaule déconnectée poitrine']), la(['Vai nặng xuống hip', 'Cổ ngắn', 'Ngực đi cùng vai'], ['Heavy shoulder to hip', 'Short neck', 'Chest follows shoulder'], ['Épaule lourde vers hanche', 'Cou court', 'Poitrine suit épaule'])),
      ],
      la(['Hook không nâng hông bạn', 'Forearm/chest gập shin frame', 'Khuỷu khóa hip line'], ['Hook cannot lift your hips', 'Forearm/chest folds shin frame', 'Elbows lock hip line'], ['Hook ne soulève pas vos hanches', 'Forearm/poitrine plie shin frame', 'Coudes verrouillent hip line']),
      la(['Hook vào dưới đùi', 'Frame vào cổ', 'Khuỷu bị peel ra ngoài'], ['Hook enters under thigh', 'Frame reaches neck', 'Elbow gets peeled outside'], ['Hook sous cuisse', 'Frame au cou', 'Coude peel dehors']),
      la(['Bạn đổi gối không mất grip', 'Bottom player phải frame bằng tay dài', 'Hip line của họ không xoay'], ['You switch knees without losing grip', 'Bottom player must long-frame', 'Their hip line cannot rotate'], ['Vous changez genou sans perdre grip', 'Bottom doit long-frame', 'Sa hip line ne tourne pas']),
    ),
    targetPhase(
      'bodylock-clear-line',
      lt('Clear knee line', 'Clear the knee line', 'Passer knee line'),
      lt('Vượt từng layer chân mà vẫn giữ hông đối thủ bị khóa.', 'Clear each leg layer while keeping the opponent’s hips locked.', 'Passer chaque couche de jambe en gardant les hanches verrouillées.'),
      'top',
      [
        targetInstruction('knees', 'top', 'transition_mechanic', lt('Gối gần windshield qua shin; gối xa không rơi vào half guard sâu. Clear từng inch, không nhảy qua cả guard.', 'Near knee windshields over the shin; far knee does not fall into deep half guard. Clear inches, not the whole guard at once.', 'Genou proche windshield sur tibia; genou loin ne tombe pas deep half. Passer centimètre par centimètre.'), lt('Knee line là cửa pass; nếu bạn vội, bottom player lấy lại inside knee.', 'The knee line is the gate of the pass; rushing gives the bottom player inside knee back.', 'Knee line est la porte du pass; se presser rend inside knee au bottom.'), la(['Nhảy qua chân', 'Rơi vào half sâu', 'Bỏ grip để clear'], ['Jumping over legs', 'Falling into deep half', 'Releasing grip to clear'], ['Sauter les jambes', 'Tomber deep half', 'Lâcher grip pour passer']), la(['Clear theo layer', 'Gối gần windshield', 'Giữ hip lock'], ['Clear by layers', 'Near knee windshield', 'Keep hip lock'], ['Passer par couches', 'Genou proche windshield', 'Garder hip lock'])),
        targetInstruction('sternum', 'top', 'pressure', lt('Sternum hướng chéo vào far hip khi bạn bước qua; đừng để sternum xoay lên trần.', 'Aim sternum diagonally into far hip while stepping over; do not let sternum rotate up to the ceiling.', 'Diriger sternum en diagonale vers far hip pendant le passage; ne pas laisser sternum tourner vers plafond.'), lt('Sternum direction giữ hông họ bị đóng khi chân bạn đang chuyển.', 'Sternum direction keeps their hips closed while your legs transition.', 'La direction du sternum garde ses hanches fermées pendant transition des jambes.'), la(['Sternum nổi', 'Ngực rời hông', 'Pressure thẳng xuống'], ['Sternum floats', 'Chest leaves hips', 'Pressure straight down'], ['Sternum flotte', 'Poitrine quitte hanches', 'Pression droite']), la(['Sternum tới far hip', 'Ngực dính belt line', 'Bước nhỏ'], ['Sternum to far hip', 'Chest glued to belt line', 'Small steps'], ['Sternum vers far hip', 'Poitrine collée belt line', 'Petits pas'])),
        targetInstruction('hands', 'top', 'grip', lt('Grip không mở khi chân clear. Nếu cần đổi grip, đổi một tay một lần và giữ wrist sát hông họ.', 'Grip does not open while legs clear. If you must adjust, change one hand at a time and keep wrists tight to their hips.', 'Grip ne s’ouvre pas pendant passage. Si ajustement, une main à la fois et poignets serrés aux hanches.'), lt('Mở grip đúng lúc họ có không gian xoay là cách mất bodylock nhanh nhất.', 'Opening the grip when they have rotation space is the fastest way to lose bodylock.', 'Ouvrir le grip quand il a rotation est le plus rapide pour perdre bodylock.'), la(['Mở cả hai tay', 'Grip trượt lên ribs', 'Wrist xa hông'], ['Opening both hands', 'Grip slides to ribs', 'Wrists far from hips'], ['Ouvrir deux mains', 'Grip glisse côtes', 'Poignets loin hanches']), la(['Một tay đổi một tay khóa', 'Wrist sát pelvis', 'Grip thấp'], ['One hand adjusts, one locks', 'Wrists near pelvis', 'Low grip'], ['Une main ajuste, une verrouille', 'Poignets près pelvis', 'Grip bas'])),
        targetInstruction('thighs', 'top', 'wedge', lt('Đùi gần pin đùi họ xuống mat như wedge; đừng kẹp quá cứng khiến hông bạn không chuyển được.', 'Near thigh pins their thigh to the mat as a wedge; do not clamp so hard your hips cannot move.', 'Cuisse proche pin sa cuisse au tapis comme wedge; ne pas clamp trop fort sinon vos hanches bloquent.'), lt('Thigh wedge giữ chân họ không pummel lại vào centerline.', 'The thigh wedge stops their leg from pummeling back to centerline.', 'Le wedge de cuisse empêche sa jambe de pummel centerline.'), la(['Đùi không có pressure', 'Clamp cứng', 'Để chân họ lùa lại'], ['No thigh pressure', 'Rigid clamp', 'Letting their leg reinsert'], ['Pas de pression cuisse', 'Clamp rigide', 'Laisser jambe rentrer']), la(['Đùi pin, hông mobile', 'Wedge gần hip', 'Clear từng layer'], ['Thigh pins, hips mobile', 'Wedge near hip', 'Clear by layers'], ['Cuisse pin, hanches mobiles', 'Wedge près hanche', 'Passer par couches'])),
        targetInstruction('head', 'top', 'alignment', lt('Đầu tiếp tục lệch; khi clear line, đầu không đuổi theo vai họ mà đi cùng hip lock.', 'Head stays offset; while clearing, it does not chase their shoulders but stays with the hip lock.', 'Tête reste décalée; pendant passage elle ne chasse pas les épaules mais reste avec hip lock.'), lt('Nếu đầu leo cao, họ recover shoulder frame và xoay guard lại.', 'If the head climbs high, they recover shoulder frame and rotate guard back in.', 'Si la tête monte, il récupère shoulder frame et remet la garde.'), la(['Đầu leo vai', 'Mất ear-to-hip', 'Cổ dài'], ['Head climbs to shoulder', 'Losing ear-to-hip', 'Long neck'], ['Tête monte épaule', 'Perdre ear-to-hip', 'Cou long']), la(['Tai theo hip', 'Cổ ngắn', 'Đầu là wedge'], ['Ear follows hip', 'Short neck', 'Head is wedge'], ['Oreille suit hanche', 'Cou court', 'Tête wedge'])),
      ],
      la(['Grip còn khóa thấp', 'Một knee line đã clear', 'Hông họ không xoay lại'], ['Grip remains low', 'One knee line has cleared', 'Their hips cannot rotate back'], ['Grip reste bas', 'Une knee line passée', 'Ses hanches ne reviennent pas']),
      la(['Inside knee của họ vào giữa', 'Bạn phải post tay dài', 'Họ vào deep half hoặc single leg'], ['Their inside knee enters', 'You need a long hand post', 'They enter deep half or single leg'], ['Inside knee entre', 'Long post main nécessaire', 'Il entre deep half ou single leg']),
      la(['Bạn có góc side control/headquarters', 'Bottom player chỉ còn frame tay', 'Knee line đã qua mà chest vẫn dính hông'], ['You have side-control or headquarters angle', 'Bottom player only has hand frames', 'Knee line cleared while chest stays on hips'], ['Vous avez angle side control/headquarters', 'Bottom n’a que frames mains', 'Knee line passée avec poitrine aux hanches']),
    ),
    targetPhase(
      'bodylock-stabilize',
      lt('Ổn định pin sau pass', 'Stabilize the pin after passing', 'Stabiliser le pin après pass'),
      lt('Chuyển từ khóa hông sang kiểm soát vai/hông mà không cho re-guard.', 'Transition from hip lock to shoulder and hip control without allowing re-guard.', 'Passer du hip lock au contrôle épaules/hanches sans re-guard.'),
      'top',
      [
        targetInstruction('shoulders', 'top', 'pressure', lt('Vai gần chuyển từ hip pressure sang crossface/shoulder pressure; vai không đập vào mặt, nó xoay head line khỏi hips.', 'Near shoulder changes from hip pressure to crossface or shoulder pressure; it does not smash the face, it turns head line away from hips.', 'Épaule proche passe de hip pressure à crossface/shoulder pressure; elle ne frappe pas le visage, elle tourne head line loin hanches.'), lt('Đầu họ quay khỏi hông thì re-guard yếu đi.', 'When their head turns away from hips, re-guard becomes weaker.', 'Quand sa tête tourne loin des hanches, re-guard faiblit.'), la(['Bỏ hông quá sớm', 'Crossface thô', 'Vai không nối sternum'], ['Leaving hips too early', 'Crude crossface', 'Shoulder not connected to sternum'], ['Quitter hanches trop tôt', 'Crossface brutal', 'Épaule non connectée sternum']), la(['Vai xoay đầu, không crank', 'Hip block còn đó', 'Sternum đi theo vai'], ['Shoulder turns head, not crank', 'Hip block remains', 'Sternum follows shoulder'], ['Épaule tourne tête, pas crank', 'Hip block reste', 'Sternum suit épaule'])),
        targetInstruction('elbows', 'top', 'wedge', lt('Khuỷu gần chặn hip escape; khuỷu xa tìm underhook hoặc bicep control để không cho họ quay vào.', 'Near elbow blocks hip escape; far elbow seeks underhook or bicep control so they cannot turn in.', 'Coude proche bloque hip escape; coude loin cherche underhook ou bicep control pour empêcher turn in.'), lt('Elbow placement là hàng rào cuối chống re-guard.', 'Elbow placement is the final fence against re-guard.', 'Placement du coude est la dernière barrière contre re-guard.'), la(['Khuỷu rời hip', 'Không có underhook/bicep control', 'Đuổi submission sớm'], ['Elbow leaves hip', 'No underhook or bicep control', 'Chasing submission early'], ['Coude quitte hanche', 'Pas underhook/bicep', 'Chasser soumission tôt']), la(['Khuỷu khóa hip', 'Underhook sau pin', 'Pin trước, submit sau'], ['Elbow locks hip', 'Underhook after pin', 'Pin first, submit later'], ['Coude bloque hip', 'Underhook après pin', 'Pin avant soumission'])),
        targetInstruction('hips', 'top', 'weight_distribution', lt('Hông switch từ thấp-mobile sang nặng-có hướng; không nhảy lên mount nếu shoulder line chưa bị kiểm soát.', 'Hips switch from low-mobile to heavy-directed; do not jump to mount before shoulder line is controlled.', 'Hanches passent de basses-mobiles à lourdes-dirigées; ne pas monter mount avant contrôle shoulder line.'), lt('Ổn định pin cần shoulder line và hip line bị tách, không chỉ hai chân đã qua.', 'A stable pin requires shoulder line separated from hip line, not only legs cleared.', 'Pin stable demande shoulder line séparée de hip line, pas seulement jambes passées.'), la(['Nhảy mount sớm', 'Hông quá cao', 'Không chặn hip escape'], ['Jumping to mount early', 'Hips too high', 'No hip-escape block'], ['Monter mount trop tôt', 'Hanches trop hautes', 'Pas de bloc hip escape']), la(['Hông nặng có hướng', 'Block hip rồi mới advance', 'Tách vai khỏi hông'], ['Heavy directed hips', 'Block hip before advancing', 'Separate shoulders from hips'], ['Hanches lourdes dirigées', 'Bloquer hanche avant avancer', 'Séparer épaules hanches'])),
        targetInstruction('hands', 'top', 'grip', lt('Tay chuyển từ bodylock sang underhook, crossface hoặc wrist control theo thứ tự; không mở cả hai tay khi họ còn hip angle.', 'Hands transition from bodylock to underhook, crossface, or wrist control in order; do not open both hands while they still have hip angle.', 'Mains passent bodylock vers underhook, crossface ou wrist control dans l’ordre; ne pas ouvrir deux mains si hip angle reste.'), lt('Grip transition đúng giữ continuity giữa pass và pin.', 'Correct grip transition keeps continuity between pass and pin.', 'Bonne transition de grip garde continuité entre pass et pin.'), la(['Mở grip cùng lúc', 'Không kiểm soát wrist', 'Bỏ crossface/underhook'], ['Opening grip at once', 'No wrist control', 'Skipping crossface or underhook'], ['Ouvrir grip d’un coup', 'Pas wrist control', 'Sauter crossface/underhook']), la(['Một connection đổi một connection giữ', 'Wrist trước submission', 'Underhook trước mount'], ['One connection changes while one remains', 'Wrist before submission', 'Underhook before mount'], ['Une connexion change, une reste', 'Wrist avant soumission', 'Underhook avant mount'])),
        targetInstruction('toes', 'top', 'post', lt('Toes active để micro-adjust pressure. Nếu toes chết, trọng lượng rơi vào đầu gối và bottom player hip escape được.', 'Active toes micro-adjust pressure. If toes die, weight falls into knees and the bottom player can hip escape.', 'Orteils actifs pour micro-ajuster pression. Si morts, poids tombe dans genoux et bottom hip escape.'), lt('Pin tốt vẫn phải mobile; active toes giữ bạn nặng mà không bị kẹt.', 'A good pin stays mobile; active toes keep you heavy without being stuck.', 'Un bon pin reste mobile; orteils actifs rendent lourd sans bloquer.'), la(['Toes chết', 'Hai gối chịu hết trọng lượng', 'Không theo được hip escape'], ['Dead toes', 'All weight on knees', 'Cannot follow hip escape'], ['Orteils morts', 'Tout poids genoux', 'Ne suit pas hip escape']), la(['Toes cắm mat', 'Pressure micro-step', 'Nặng nhưng mobile'], ['Toes grip mat', 'Pressure micro-step', 'Heavy but mobile'], ['Orteils dans tapis', 'Micro-step pression', 'Lourd mais mobile'])),
      ],
      la(['Shoulder line bị kiểm soát', 'Hip escape bị chặn', 'Bạn đổi grip không mất chest pressure'], ['Shoulder line controlled', 'Hip escape blocked', 'Grip changes without losing chest pressure'], ['Shoulder line contrôlée', 'Hip escape bloqué', 'Changement grip sans perdre chest pressure']),
      la(['Bottom lấy lại inside knee', 'Bạn mất cả hai tay connection', 'Họ turn in vào underhook'], ['Bottom recovers inside knee', 'You lose both hand connections', 'They turn in to underhook'], ['Bottom récupère inside knee', 'Vous perdez deux connexions mains', 'Il turn in underhook']),
      la(['Side control hoặc mount ổn định', 'Bottom phải phòng thủ trước khi recover', 'Bạn có underhook/crossface hoặc wrist control'], ['Stable side control or mount', 'Bottom must defend before recovering', 'You have underhook/crossface or wrist control'], ['Side control ou mount stable', 'Bottom défend avant recover', 'Vous avez underhook/crossface ou wrist control']),
    ),
  ],
  globalPrinciples: la(
    ['Khóa hông trước khi vượt chân.', 'Đầu lệch về hip line để tránh shoulder crunch.', 'Grip thấp điều khiển pelvis tốt hơn grip cao.', 'Clear từng layer chân, không nhảy qua guard.', 'Pin phải ổn định trước khi chase submission.'],
    ['Lock hips before clearing legs.', 'Offset the head toward hip line to avoid shoulder crunch.', 'Low grip controls pelvis better than high grip.', 'Clear leg layers one at a time; do not jump over guard.', 'Stabilize the pin before chasing submissions.'],
    ['Verrouiller les hanches avant passer les jambes.', 'Tête décalée vers hip line pour éviter shoulder crunch.', 'Grip bas contrôle pelvis mieux que grip haut.', 'Passer les couches une par une; ne pas sauter la garde.', 'Stabiliser le pin avant soumission.'],
  ),
  nonNegotiables: la(['Cổ ngắn và đầu lệch.', 'Không mở bodylock khi hông họ còn xoay.', 'Không crank mặt/cổ để giữ pin.'], ['Short neck and offset head.', 'Do not open bodylock while their hips can rotate.', 'Do not crank face or neck to hold the pin.'], ['Cou court et tête décalée.', 'Ne pas ouvrir bodylock si les hanches tournent.', 'Ne pas crank visage/cou pour pin.']),
  commonMechanicalErrors: la(
    ['Đầu ở giữa hai tay đối thủ.', 'Grip quá cao trên ribs.', 'Hông cao bị butterfly lift.', 'Đẩy shin bằng bàn tay thẳng.', 'Nhảy qua guard thay vì clear layer.', 'Bỏ hip lock trước khi shoulder line bị kiểm soát.'],
    ['Head centered between opponent’s hands.', 'Grip too high on ribs.', 'High hips get butterfly lifted.', 'Pushing shin with straight hands.', 'Jumping over guard instead of clearing layers.', 'Leaving hip lock before shoulder line is controlled.'],
    ['Tête centrée entre les mains.', 'Grip trop haut sur côtes.', 'Hanches hautes soulevées butterfly.', 'Pousser tibia bras tendus.', 'Sauter la garde au lieu de couches.', 'Quitter hip lock avant contrôler shoulder line.'],
  ),
  correctionCues: la(['Tai gần hông.', 'Grip dưới hip bones.', 'Sternum về far hip.', 'Khuỷu về túi quần.', 'Clear từng layer rồi pin.'], ['Ear near hip.', 'Grip below hip bones.', 'Sternum toward far hip.', 'Elbows to pockets.', 'Clear layers, then pin.'], ['Oreille près hanche.', 'Grip sous hanches.', 'Sternum vers far hip.', 'Coudes vers poches.', 'Passer couches puis pin.']),
  safetyNotes: la(['Không dùng crossface để crank cổ.', 'Tăng pressure từ từ trong positional sparring.', 'Nếu partner báo đau cổ/lưng, giảm lực và reset.'], ['Do not use crossface to crank the neck.', 'Increase pressure gradually in positional sparring.', 'If partner reports neck or back pain, reduce force and reset.'], ['Ne pas utiliser crossface pour crank le cou.', 'Augmenter pression progressivement en sparring positionnel.', 'Si partenaire signale douleur cou/dos, réduire et reset.']),
})

const seatedGuardRetentionMechanics = (): BodyMechanicsSystem => ({
  overview: lt(
    'Seated guard retention là hệ thống giữ đầu và hông sống khi passer muốn flatten bạn. Mục tiêu không phải chỉ ngồi yên giữ khoảng cách, mà là tạo shin frame, hand fight và hip angle để recover, wrestle-up hoặc re-attack.',
    'Seated guard retention keeps head and hips alive when the passer wants to flatten you. The goal is not merely sitting at distance, but building shin frames, hand fighting, and hip angle to recover, wrestle up, or re-attack.',
    'La rétention seated guard garde tête et hanches vivantes quand le passer veut vous aplatir. Le but n’est pas juste rester assis, mais créer shin frames, hand fighting et angle de hanches pour recover, wrestle-up ou re-attack.',
  ),
  bottomPlayerGoal: lt('Bottom player muốn giữ head higher than hips, elbows inside, shin frame sống và feet có thể post hoặc hook.', 'Bottom player wants head higher than hips, elbows inside, active shin frame, and feet ready to post or hook.', 'Le bottom veut tête plus haute que hanches, coudes inside, shin frame actif et pieds prêts à post ou hook.'),
  topPlayerGoal: lt('Top player muốn kéo đầu xuống, staple shin, vượt knee line hoặc bodylock để biến seated guard thành supine/flattened guard.', 'Top player wants to pull the head down, staple the shin, clear knee line, or bodylock to turn seated guard into supine or flattened guard.', 'Le top veut tirer tête, staple tibia, passer knee line ou bodylock pour transformer seated en supine/flattened guard.'),
  phases: [
    targetPhase(
      'seated-read',
      lt('Đọc pass và giữ posture', 'Read the pass and keep posture', 'Lire le pass et garder posture'),
      lt('Đọc đầu, tay và chân lead của passer trước khi họ chạm chest-to-chest hoặc staple shin.', 'Read passer head, hands, and lead leg before chest-to-chest or shin staple arrives.', 'Lire tête, mains et jambe lead du passer avant chest-to-chest ou shin staple.'),
      'bottom',
      [
        targetInstruction('head', 'bottom', 'alignment', lt('Đầu cao hơn hông và hơi lệch ngoài centerline; nếu đầu thấp hơn ngực passer, snapdown/front headlock xuất hiện.', 'Head stays above hips and slightly off centerline; if it drops below the passer’s chest, snapdown or front headlock appears.', 'Tête au-dessus des hanches et légèrement hors centerline; si sous poitrine du passer, snapdown/front headlock apparaît.'), lt('Head height quyết định bạn còn base để hand fight hay bị kéo thành turtle/front headlock.', 'Head height decides whether you can hand fight from base or get pulled into turtle/front headlock.', 'Hauteur de tête décide hand fight avec base ou être tiré turtle/front headlock.'), la(['Đầu cúi', 'Trán giữa hai tay passer', 'Cổ dài'], ['Head dipped', 'Forehead between passer hands', 'Long neck'], ['Tête baissée', 'Front entre mains passer', 'Cou long']), la(['Đỉnh đầu cao', 'Cằm thu', 'Mắt nhìn hông/pass line'], ['Crown high', 'Chin tucked', 'Eyes on hips/pass line'], ['Sommet tête haut', 'Menton rentré', 'Yeux hanches/pass line'])),
        targetInstruction('eyes', 'bottom', 'alignment', lt('Mắt nhìn hông và chân lead, không nhìn tay mình. Bạn cần thấy bodylock entry, knee cut step và outside circle sớm.', 'Eyes watch hips and lead leg, not your own hands. You need early reads on bodylock entry, knee-cut step, and outside circle.', 'Yeux sur hanches et jambe lead, pas vos mains. Lire tôt bodylock, knee cut et outside circle.'), lt('Gaze đúng cho bạn thời gian đặt shin frame trước khi passer vào range.', 'Correct gaze gives time to place shin frame before passer enters range.', 'Bon regard donne temps de placer shin frame avant entrée du passer.'), la(['Nhìn xuống mat', 'Không thấy chân lead', 'Phản ứng sau khi bị staple'], ['Looking at mat', 'Missing lead leg', 'Reacting after staple'], ['Regarder tapis', 'Rater jambe lead', 'Réagir après staple']), la(['Eyes hip-knee-hand', 'Đọc bước đầu', 'Đặt shin trước contact'], ['Eyes hip-knee-hand', 'Read first step', 'Place shin before contact'], ['Yeux hanche-genou-main', 'Lire premier pas', 'Placer shin avant contact'])),
        targetInstruction('spine', 'bottom', 'alignment', lt('Spine hơi tròn chủ động, ribs không flare; posture giống lò xo để hip heist hoặc invert nhẹ khi cần.', 'Spine has an active rounded posture, ribs not flared; it behaves like a spring for hip heist or light inversion.', 'Colonne ronde active, côtes non ouvertes; comme ressort pour hip heist ou inversion légère.'), lt('Spine quá thẳng dễ bị kéo snapdown; spine sập làm hông chết.', 'An over-straight spine is easy to snap down; a collapsed spine kills hips.', 'Colonne trop droite facile snapdown; colonne effondrée tue les hanches.'), la(['Ngồi thẳng cứng', 'Lưng sập', 'Ribs flare'], ['Rigid upright sitting', 'Collapsed back', 'Flared ribs'], ['Assis droit rigide', 'Dos effondré', 'Côtes ouvertes']), la(['Lưng lò xo', 'Ribs đóng', 'Hông sẵn sàng heist'], ['Spring spine', 'Ribs closed', 'Hips ready to heist'], ['Colonne ressort', 'Côtes fermées', 'Hanches prêtes heist'])),
        targetInstruction('hands', 'bottom', 'grip', lt('Tay chủ động hand fight cổ tay/bicep trước khi passer chạm đầu. Một tay kiểm soát wrist, tay kia sẵn sàng post ngắn hoặc underhook.', 'Hands hand fight wrist or bicep before the passer touches your head. One hand controls wrist, the other is ready for short post or underhook.', 'Mains hand fight poignet/biceps avant contact tête. Une main contrôle wrist, l’autre prête post court ou underhook.'), lt('Nếu passer thắng tay trước, họ kéo đầu hoặc bodylock mà shin frame không còn đủ.', 'If the passer wins hands first, they pull the head or bodylock and shin frame is not enough.', 'Si passer gagne mains d’abord, il tire tête ou bodylock et shin frame ne suffit plus.'), la(['Đặt hai tay sau lưng', 'Post tay dài', 'Không kiểm soát wrist'], ['Both hands behind you', 'Long hand post', 'No wrist control'], ['Deux mains derrière', 'Long post main', 'Pas wrist control']), la(['Wrist trước đầu', 'Post ngắn', 'Một tay fight một tay base'], ['Wrist before head', 'Short post', 'One hand fights one bases'], ['Wrist avant tête', 'Post court', 'Une main fight une base'])),
        targetInstruction('feet', 'bottom', 'post', lt('Một foot post để giữ khoảng cách, foot kia sẵn sàng shin-to-shin hoặc butterfly hook. Toes active, heel không kéo sát mông.', 'One foot posts to manage distance, the other is ready for shin-to-shin or butterfly hook. Toes active, heel not pulled too close to the butt.', 'Un pied post pour distance, l’autre prêt shin-to-shin ou butterfly hook. Orteils actifs, talon pas trop proche des fesses.'), lt('Feet quyết định bạn là seated guard có threat hay chỉ là người đang ngồi chờ bị pass.', 'Feet decide whether you are a threatening seated guard or just sitting to be passed.', 'Les pieds décident si seated guard menace ou attend le pass.'), la(['Hai gót sát mông', 'Toes chết', 'Không có hook threat'], ['Both heels tucked close', 'Dead toes', 'No hook threat'], ['Deux talons proches', 'Orteils morts', 'Pas menace hook']), la(['Một post một hook', 'Toes active', 'Heel tạo range'], ['One post one hook', 'Active toes', 'Heel creates range'], ['Un post un hook', 'Orteils actifs', 'Talon crée range'])),
      ],
      la(['Đầu cao hơn hông', 'Một tay kiểm soát wrist/bicep', 'Một shin hoặc foot đã chặn range'], ['Head above hips', 'One hand controls wrist or bicep', 'One shin or foot controls range'], ['Tête au-dessus hanches', 'Une main contrôle wrist/biceps', 'Un shin/pied contrôle distance']),
      la(['Đầu bị kéo dưới chest', 'Passer staple shin', 'Hai tay post dài sau lưng'], ['Head pulled below chest', 'Passer staples shin', 'Both hands post long behind you'], ['Tête tirée sous poitrine', 'Passer staple tibia', 'Deux mains post longues derrière']),
      la(['Bạn thấy pass line sớm', 'Passer phải vòng xa hơn', 'Bạn có shin-to-shin/butterfly entry'], ['You see pass line early', 'Passer must take a longer route', 'You have shin-to-shin or butterfly entry'], ['Vous voyez pass line tôt', 'Passer prend route plus longue', 'Vous avez shin-to-shin/butterfly']),
    ),
    targetPhase(
      'seated-inside',
      lt('Giữ inside knee và shin frame', 'Keep inside knee and shin frame', 'Garder inside knee et shin frame'),
      lt('Đưa shin/knee vào giữa bạn và pressure line trước khi passer đóng hông.', 'Put shin and knee between you and pressure line before the passer closes hips.', 'Mettre shin/genou entre vous et pressure line avant fermeture des hanches.'),
      'bottom',
      [
        targetInstruction('knees', 'bottom', 'inside_position', lt('Inside knee hướng vào centerline như wedge; không để passer staple gối ra ngoài hip line.', 'Inside knee points to centerline as a wedge; do not let the passer staple it outside hip line.', 'Inside knee vise centerline comme wedge; ne pas laisser passer le staple hors hip line.'), lt('Inside knee là layer chính ngăn chest-to-chest.', 'Inside knee is the primary layer preventing chest-to-chest.', 'Inside knee est la couche principale contre chest-to-chest.'), la(['Inside knee bị staple', 'Gối mở ra ngoài', 'Đẩy đầu khi chưa có knee'], ['Inside knee stapled', 'Knee opens outside', 'Pushing head before knee'], ['Inside knee staple', 'Genou ouvert dehors', 'Pousser tête avant genou']), la(['Gối vào giữa', 'Knee-elbow gần nhau', 'Recover knee trước head push'], ['Knee between', 'Knee-elbow close', 'Recover knee before head push'], ['Genou entre', 'Coude-genou proches', 'Recover genou avant pousser tête'])),
        targetInstruction('shins', 'bottom', 'frame', lt('Shin frame đặt ngang hip/bicep line, không chỉ chạm bằng bàn chân. Shin chịu lực để passer không vào chest-to-hip.', 'Shin frame sits across hip or bicep line, not only foot contact. The shin bears weight so the passer cannot enter chest-to-hip.', 'Shin frame sur hip/bicep line, pas seulement pied. Le tibia porte poids pour bloquer chest-to-hip.'), lt('Shin frame biến chân thành cấu trúc chịu lực thay vì hook bị đè.', 'Shin frame turns the leg into a weight-bearing structure instead of a crushed hook.', 'Shin frame transforme jambe en structure portante au lieu de hook écrasé.'), la(['Chỉ đẩy bằng foot', 'Shin nằm thấp', 'Không nối với hip angle'], ['Pushing only with foot', 'Shin too low', 'No hip angle connection'], ['Pousser seulement pied', 'Shin trop bas', 'Pas connexion angle hanche']), la(['Shin ngang hip', 'Knee active', 'Foot hỗ trợ shin'], ['Shin across hip', 'Active knee', 'Foot supports shin'], ['Shin sur hanche', 'Genou actif', 'Pied soutient shin'])),
        targetInstruction('elbows', 'bottom', 'wedge', lt('Khuỷu gần ribs/gối; elbow flare cho passer underhook hoặc bodylock sâu.', 'Elbows stay near ribs and knees; elbow flare gives the passer underhook or deep bodylock.', 'Coudes près côtes/genoux; coudes ouverts donnent underhook ou bodylock profond.'), lt('Elbow-knee connection giữ thân bạn không bị mở.', 'Elbow-knee connection keeps your torso from being opened.', 'Connexion coude-genou empêche votre torse de s’ouvrir.'), la(['Elbow flare', 'Tay reach quá xa', 'Khuỷu rời knee'], ['Elbow flare', 'Reaching too far', 'Elbow leaves knee'], ['Coude ouvert', 'Reach trop loin', 'Coude quitte genou']), la(['Khuỷu về ribs', 'Knee-elbow touch', 'Frame ngắn trước'], ['Elbow to ribs', 'Knee-elbow touch', 'Short frame first'], ['Coude aux côtes', 'Coude-genou touch', 'Frame court d’abord'])),
        targetInstruction('hips', 'bottom', 'mobility', lt('Hông hơi nghiêng, không ngồi phẳng trên xương cụt. Hip angle cho shin frame có lực và mở technical stand-up.', 'Hips are angled, not flat on tailbone. Hip angle gives shin frame power and opens technical stand-up.', 'Hanches en angle, pas plates sur coccyx. Angle donne force au shin frame et ouvre technical stand-up.'), lt('Flat hips làm bạn bị kéo supine hoặc bodylock dễ.', 'Flat hips let you be pulled supine or bodylocked easily.', 'Hanches plates vous font tirer supine ou bodylock facilement.'), la(['Ngồi phẳng', 'Không đổi hip angle', 'Hông xa khỏi shin'], ['Sitting flat', 'No hip angle change', 'Hips disconnected from shin'], ['Assis plat', 'Pas changement angle', 'Hanches déconnectées shin']), la(['Một hông nhẹ', 'Hip heist sẵn', 'Shin nối hông'], ['One hip light', 'Hip heist ready', 'Shin connects to hip'], ['Une hanche légère', 'Hip heist prêt', 'Shin connecté hanche'])),
        targetInstruction('heels', 'bottom', 'hook', lt('Heel của hook active kéo hoặc nâng vừa đủ; heel không lộ để passer bắt ankle drag dễ.', 'Hook heel stays active to pull or lift just enough; heel is not exposed for easy ankle drag.', 'Talon du hook actif pour tirer/lever juste assez; talon pas exposé à ankle drag.'), lt('Heel active giữ hook sống mà không mất base.', 'An active heel keeps the hook alive without losing base.', 'Talon actif garde hook vivant sans perdre base.'), la(['Hook chết', 'Heel lộ quá xa', 'Chỉ dùng toes'], ['Dead hook', 'Heel exposed too far', 'Only using toes'], ['Hook mort', 'Talon trop exposé', 'Seulement orteils']), la(['Heel kéo nhẹ', 'Hook sống', 'Rút foot khi bị drag'], ['Heel pulls lightly', 'Live hook', 'Withdraw foot when dragged'], ['Talon tire léger', 'Hook vivant', 'Retirer pied si drag'])),
      ],
      la(['Inside knee ở giữa', 'Shin chịu lực', 'Elbow-knee đóng'], ['Inside knee is between', 'Shin bears weight', 'Elbow-knee is closed'], ['Inside knee entre', 'Shin porte poids', 'Coude-genou fermé']),
      la(['Knee bị staple', 'Bodylock grip vào hông', 'Hông phẳng và đầu thấp'], ['Knee stapled', 'Bodylock grip reaches hips', 'Flat hips and low head'], ['Genou staple', 'Bodylock aux hanches', 'Hanches plates et tête basse']),
      la(['Passer không vào chest-to-hip', 'Bạn có off-balance hoặc stand-up threat', 'Hook/shin buộc passer đổi hướng'], ['Passer cannot enter chest-to-hip', 'You have off-balance or stand-up threat', 'Hook/shin forces passer to change direction'], ['Passer ne rentre pas chest-to-hip', 'Vous avez off-balance ou stand-up', 'Hook/shin force changement direction']),
    ),
    targetPhase(
      'seated-frame-move',
      lt('Frame và hip movement', 'Frame and hip movement', 'Frame et mouvement de hanches'),
      lt('Biến frame thành góc hông thay vì đẩy thẳng.', 'Turn frames into hip angle instead of pushing straight.', 'Transformer les frames en angle de hanche au lieu de pousser droit.'),
      'bottom',
      [
        targetInstruction('forearms', 'bottom', 'frame', lt('Forearm frame vào collarbone/bicep/hip line; không bench press. Frame giữ khoảng cách đủ để hông di chuyển.', 'Forearm frames collarbone, bicep, or hip line; do not bench press. The frame preserves just enough space for hips to move.', 'Forearm frame clavicule, biceps ou hip line; pas bench press. Le frame garde espace pour bouger hanches.'), lt('Frame không tạo escape; frame tạo khoảng trống để hông tạo escape.', 'The frame does not escape; it creates space for hips to escape.', 'Le frame ne sort pas; il crée espace pour que les hanches sortent.'), la(['Duỗi tay thẳng', 'Frame vào mặt', 'Không move hips'], ['Straight-arm pushing', 'Framing face', 'No hip movement'], ['Bras tendus', 'Frame visage', 'Pas mouvement hanches']), la(['Forearm xương', 'Frame rồi hip heist', 'Khuỷu hơi cong'], ['Bone forearm', 'Frame then hip heist', 'Slight elbow bend'], ['Avant-bras osseux', 'Frame puis hip heist', 'Coude légèrement plié'])),
        targetInstruction('pelvis', 'bottom', 'mobility', lt('Pelvis xoay ra khỏi pressure line trước; vai và đầu đi theo sau. Đừng cố kéo thân trên khi hông còn bị khóa.', 'Pelvis rotates out of pressure line first; shoulders and head follow. Do not pull upper body while hips are locked.', 'Pelvis sort de pressure line d’abord; épaules et tête suivent. Ne tirez pas haut du corps si hanches verrouillées.'), lt('Pelvis là engine của guard retention; thân trên chỉ dẫn hướng.', 'Pelvis is the engine of guard retention; upper body only steers.', 'Le pelvis est moteur de rétention; haut du corps dirige seulement.'), la(['Kéo bằng vai', 'Pelvis không xoay', 'Post tay dài'], ['Pulling with shoulders', 'Pelvis does not rotate', 'Long hand post'], ['Tirer épaules', 'Pelvis ne tourne pas', 'Long post main']), la(['Pelvis trước', 'Vai theo sau', 'Post ngắn rồi thu'], ['Pelvis first', 'Shoulders follow', 'Short post then retract'], ['Pelvis d’abord', 'Épaules suivent', 'Post court puis rentrer'])),
        targetInstruction('wrists', 'bottom', 'grip', lt('Wrists trung lập khi hand fight; nếu wrist gập, passer peel và kéo đầu bạn xuống.', 'Wrists stay neutral during hand fighting; bent wrists are peeled and let the passer pull your head down.', 'Poignets neutres en hand fight; poignets pliés se font peel et permettent tirer tête.'), lt('Wrist alignment giữ grip đủ lâu để shin/knee pummel.', 'Wrist alignment keeps grips long enough for shin or knee pummeling.', 'Alignement du poignet garde grip assez longtemps pour pummel shin/genou.'), la(['Wrist gập', 'Grip bằng ngón', 'Không kết nối elbow'], ['Bent wrist', 'Finger grip only', 'No elbow connection'], ['Poignet plié', 'Grip doigts seulement', 'Pas connexion coude']), la(['Knuckles thẳng', 'Wrist-elbow một line', 'Grip đổi thành frame'], ['Straight knuckles', 'Wrist-elbow one line', 'Grip becomes frame'], ['Knuckles droits', 'Poignet-coude une ligne', 'Grip devient frame'])),
        targetInstruction('toes', 'bottom', 'post', lt('Toes của foot post bám mat để hip heist; toes của hook active để lift/drag nhẹ.', 'Toes of posting foot grip the mat for hip heist; toes of hook foot stay active for light lift or drag.', 'Orteils du pied post accrochent pour hip heist; orteils du hook actifs pour lift/drag léger.'), lt('Toes active biến seated guard thành base động, không phải vị trí ngồi tĩnh.', 'Active toes make seated guard a dynamic base, not a static sitting position.', 'Orteils actifs rendent seated guard base dynamique, pas position assise statique.'), la(['Toes chết', 'Foot post quá xa', 'Hook không active'], ['Dead toes', 'Post foot too far', 'Inactive hook'], ['Orteils morts', 'Pied post trop loin', 'Hook inactif']), la(['Toes cắm', 'Foot gần hông', 'Hook kéo nhẹ'], ['Toes grip', 'Foot near hip', 'Hook pulls lightly'], ['Orteils grip', 'Pied près hanche', 'Hook tire léger'])),
        targetInstruction('shoulders', 'bottom', 'alignment', lt('Shoulders không quay lưng hoàn toàn cho passer. Shoulder line nghiêng đủ để frame, nhưng ngực vẫn có thể quay lại đối diện.', 'Shoulders do not fully turn away from the passer. Shoulder line angles enough to frame, but chest can still turn back to face them.', 'Épaules ne tournent pas complètement dos au passer. Shoulder line angle pour frame, mais poitrine peut revenir face.'), lt('Nếu shoulder line quay quá xa, passer lấy back exposure hoặc bodylock sau lưng.', 'If shoulder line turns too far, the passer gets back exposure or rear bodylock.', 'Si shoulder line tourne trop, passer prend back exposure ou bodylock arrière.'), la(['Quay lưng quá sớm', 'Vai sập', 'Không thể face lại'], ['Turning back too early', 'Collapsed shoulder', 'Cannot face back in'], ['Tourner dos trop tôt', 'Épaule effondrée', 'Impossible revenir face']), la(['Vai angle, ngực còn mở', 'Frame rồi face', 'Không cho back exposure'], ['Shoulder angles, chest stays available', 'Frame then face', 'Deny back exposure'], ['Épaule angle, poitrine disponible', 'Frame puis face', 'Refuser back exposure'])),
      ],
      la(['Frame chịu lực bằng xương', 'Pelvis đổi angle', 'Post ngắn có thể thu lại'], ['Frame bears weight through bone', 'Pelvis changes angle', 'Short post can retract'], ['Frame porte par os', 'Pelvis change angle', 'Post court peut rentrer']),
      la(['Frame tay thẳng', 'Back exposure', 'Hông vẫn bị khóa'], ['Straight-arm frame', 'Back exposure', 'Hips still locked'], ['Frame bras tendus', 'Back exposure', 'Hanches toujours verrouillées']),
      la(['Bạn recover shin/knee', 'Passer phải reset range', 'Bạn vào technical stand-up hoặc hook entry'], ['You recover shin or knee', 'Passer must reset range', 'You enter technical stand-up or hook entry'], ['Vous récupérez shin/genou', 'Passer reset range', 'Vous entrez technical stand-up ou hook']),
    ),
    targetPhase(
      'seated-recover-attack',
      lt('Recover hoặc re-attack', 'Recover or re-attack', 'Recover ou re-attack'),
      lt('Khi passer overcommit, chuyển retention thành wrestle-up, shin-to-shin, butterfly off-balance hoặc technical stand-up.', 'When the passer overcommits, convert retention into wrestle-up, shin-to-shin, butterfly off-balance, or technical stand-up.', 'Quand passer overcommit, convertir rétention en wrestle-up, shin-to-shin, butterfly off-balance ou technical stand-up.'),
      'bottom',
      [
        targetInstruction('hands', 'bottom', 'lever', lt('Nếu wrist hoặc bicep của passer đi quá xa, kéo nhẹ để tạo off-balance; không kéo bằng biceps một mình.', 'If passer wrist or bicep reaches too far, pull lightly to off-balance; do not pull with biceps alone.', 'Si wrist/biceps du passer va trop loin, tirer léger pour off-balance; pas biceps seul.'), lt('Hand control biến frame phòng thủ thành lever tấn công.', 'Hand control turns defensive frames into offensive levers.', 'Hand control transforme frame défensif en levier offensif.'), la(['Kéo bằng tay đơn lẻ', 'Không dùng hook', 'Giữ wrist quá lâu'], ['Pulling with arm only', 'No hook involvement', 'Holding wrist too long'], ['Tirer bras seul', 'Pas hook', 'Garder wrist trop longtemps']), la(['Hand-hook cùng lúc', 'Pull để họ post', 'Đổi sang underhook nếu họ rút tay'], ['Hand and hook together', 'Pull to make them post', 'Switch to underhook if they retract'], ['Main et hook ensemble', 'Tirer pour post', 'Passer underhook s’il retire'])),
        targetInstruction('hips', 'bottom', 'transition_mechanic', lt('Hông heist lên khi đầu bạn cao và một tay kiểm soát wrist/underhook. Đừng đứng khi đầu thấp.', 'Hips heist up when your head is high and one hand controls wrist or underhook. Do not stand when the head is low.', 'Hanches heist quand tête haute et une main contrôle wrist/underhook. Ne pas se lever tête basse.'), lt('Hip heist đúng nối guard retention sang wrestle-up mà không đưa cổ vào front headlock.', 'Correct hip heist connects guard retention to wrestle-up without feeding front headlock.', 'Bon hip heist connecte rétention à wrestle-up sans donner front headlock.'), la(['Đứng đầu thấp', 'Hông lên trước tay', 'Không kiểm soát wrist'], ['Standing with low head', 'Hips rise before hands', 'No wrist control'], ['Se lever tête basse', 'Hanches avant mains', 'Pas wrist control']), la(['Đầu cao rồi heist', 'Một hand control', 'Hông dưới vai'], ['Head high then heist', 'One hand control', 'Hips under shoulders'], ['Tête haute puis heist', 'Une main contrôle', 'Hanches sous épaules'])),
        targetInstruction('shins', 'bottom', 'hook', lt('Shin-to-shin entry đến từ shin frame sống: shin trượt xuống chân gần, knee outside, foot hook nhẹ.', 'Shin-to-shin entry comes from a live shin frame: shin slides to near leg, knee outside, foot hooks lightly.', 'Entrée shin-to-shin vient d’un shin frame vivant: tibia glisse jambe proche, genou dehors, pied hook léger.'), lt('Shin transition giữ bạn attached khi passer rút hông.', 'The shin transition keeps you attached as the passer withdraws hips.', 'Transition shin garde attachment quand passer retire hanches.'), la(['Shin rơi khỏi leg', 'Foot hook quá sâu', 'Knee vào trong bị smash'], ['Shin falls off leg', 'Foot hook too deep', 'Knee inside gets smashed'], ['Shin tombe jambe', 'Foot hook trop profond', 'Genou inside smash']), la(['Shin trượt, không nhảy', 'Knee outside', 'Hook nhẹ'], ['Shin slides, does not jump', 'Knee outside', 'Light hook'], ['Shin glisse, pas saut', 'Genou dehors', 'Hook léger'])),
        targetInstruction('neck', 'bottom', 'safety', lt('Cổ ngắn khi come up; nếu chin bị kéo ra hoặc head bị snap, quay về seated frame thay vì ép wrestle-up.', 'Neck stays short when coming up; if chin is pulled out or head is snapped, return to seated frame instead of forcing wrestle-up.', 'Cou court en come up; si menton tiré ou tête snap, revenir seated frame au lieu de forcer wrestle-up.'), lt('Neck safety quyết định bạn convert được hay bị front headlock.', 'Neck safety decides whether you convert or feed front headlock.', 'Sécurité cou décide conversion ou front headlock donné.'), la(['Cằm ngửa', 'Cổ dài khi đứng', 'Ép vào guillotine'], ['Chin lifted', 'Long neck while standing', 'Forcing into guillotine'], ['Menton levé', 'Cou long en stand', 'Forcer dans guillotine']), la(['Chin tuck', 'Đầu cao hơn chest', 'Reset nếu mất neck line'], ['Chin tuck', 'Head above chest', 'Reset if neck line lost'], ['Menton rentré', 'Tête au-dessus poitrine', 'Reset si neck line perdue'])),
        targetInstruction('feet', 'bottom', 'mobility', lt('Foot post đẩy mat để đứng hoặc xoay vào single leg; hook foot giữ họ không bước tự do.', 'Posting foot drives the mat to stand or rotate into single leg; hook foot stops them from stepping freely.', 'Pied de post pousse tapis pour stand ou rotation single leg; foot hook empêche ses pas libres.'), lt('Feet phối hợp quyết định bạn re-attack hay chỉ recover guard.', 'Coordinated feet decide whether you re-attack or only recover guard.', 'Coordination des pieds décide re-attack ou simple recover guard.'), la(['Hai foot cùng làm một việc', 'Không có post', 'Hook bị kéo đi'], ['Both feet doing same job', 'No post', 'Hook gets dragged away'], ['Deux pieds même rôle', 'Pas de post', 'Hook tiré']), la(['Một post một hook', 'Drive rồi attach', 'Nếu họ lùi, stand up'], ['One post one hook', 'Drive then attach', 'If they retreat, stand up'], ['Un post un hook', 'Drive puis attach', 'S’il recule, stand up'])),
      ],
      la(['Đầu cao khi come up', 'Một hand control còn giữ', 'Hook/post chia vai trò rõ'], ['Head high when coming up', 'One hand control remains', 'Hook and post have clear jobs'], ['Tête haute en come up', 'Une main contrôle', 'Hook et post rôles clairs']),
      la(['Snapdown/front headlock xuất hiện', 'Passer kéo hook ra', 'Bạn đứng không có hand control'], ['Snapdown/front headlock appears', 'Passer drags hook off', 'You stand without hand control'], ['Snapdown/front headlock apparaît', 'Passer drag hook', 'Vous stand sans hand control']),
      la(['Bạn recover guard layer hoặc single leg', 'Passer phải post tay', 'Bạn reset distance an toàn'], ['You recover a guard layer or single leg', 'Passer must post a hand', 'You reset distance safely'], ['Vous recover couche de garde ou single leg', 'Passer doit post main', 'Distance reset sûre']),
    ),
  ],
  globalPrinciples: la(['Đầu cao hơn hông.', 'Inside knee trước khi đẩy đầu.', 'Frame tạo khoảng trống cho hông, không phải để đẩy người.', 'Một foot post, một foot hook.', 'Retention tốt phải có re-attack threat.'], ['Head above hips.', 'Inside knee before pushing the head.', 'Frames create space for hips, not to push people away.', 'One foot posts, one foot hooks.', 'Good retention carries re-attack threat.'], ['Tête au-dessus hanches.', 'Inside knee avant pousser tête.', 'Frames créent espace pour hanches, pas pousser.', 'Un pied post, un pied hook.', 'Bonne rétention menace re-attack.']),
  nonNegotiables: la(['Không đứng dậy khi đầu thấp.', 'Không post hai tay dài sau lưng.', 'Không để inside knee bị staple mà vẫn cố attack.'], ['Do not stand with low head.', 'Do not long-post both hands behind you.', 'Do not attack while inside knee is stapled.'], ['Ne pas se lever tête basse.', 'Ne pas long-post deux mains derrière.', 'Ne pas attaquer avec inside knee staple.']),
  commonMechanicalErrors: la(['Ngồi phẳng trên xương cụt.', 'Đầu cúi vào front headlock.', 'Frame bằng tay thẳng.', 'Inside knee bị staple.', 'Hai foot đều post hoặc đều hook.', 'Không có hand fight trước khi passer vào range.'], ['Sitting flat on tailbone.', 'Head dipping into front headlock.', 'Straight-arm framing.', 'Inside knee stapled.', 'Both feet posting or both hooking.', 'No hand fight before passer enters range.'], ['Assis plat sur coccyx.', 'Tête dans front headlock.', 'Frame bras tendus.', 'Inside knee staple.', 'Deux pieds post ou deux hooks.', 'Pas hand fight avant entrée passer.']),
  correctionCues: la(['Đỉnh đầu cao.', 'Knee-elbow gần.', 'Shin chịu lực.', 'Frame rồi hip heist.', 'Một post một hook.'], ['Crown high.', 'Knee-elbow close.', 'Shin bears weight.', 'Frame then hip heist.', 'One post one hook.'], ['Sommet tête haut.', 'Coude-genou proche.', 'Shin porte poids.', 'Frame puis hip heist.', 'Un post un hook.']),
  safetyNotes: la(['Bảo vệ cổ khi technical stand-up hoặc wrestle-up.', 'Nếu bị snapdown, reset frame trước khi đứng.', 'Không tập neck pressure hoặc guillotine escape một mình.'], ['Protect the neck during technical stand-up or wrestle-up.', 'If snapped down, reset frames before standing.', 'Do not train neck pressure or guillotine escape alone.'], ['Protéger le cou en technical stand-up ou wrestle-up.', 'Si snapdown, reset frames avant stand.', 'Ne pas travailler pression cou ou guillotine escape seul.']),
})

const halfGuardWrestleUpMechanics = (): BodyMechanicsSystem => ({
  overview: lt(
    'Half Guard Wrestle-Up biến bottom half guard thành cuộc đua single leg. Bạn không chỉ “thoát half”; bạn dùng knee shield, underhook, head position và hip heist để đưa hông dưới vai rồi gom chân đối thủ.',
    'Half Guard Wrestle-Up turns bottom half guard into a single-leg race. You are not merely escaping half guard; you use knee shield, underhook, head position, and hip heist to bring hips under shoulders and collect the leg.',
    'Half Guard Wrestle-Up transforme bottom half guard en course single leg. Vous ne sortez pas seulement de half; vous utilisez knee shield, underhook, head position et hip heist pour mettre les hanches sous les épaules et capter la jambe.',
  ),
  bottomPlayerGoal: lt('Bottom player muốn thắng underhook/head position, lên khuỷu-gối, gom chân gần và chuyển sang single leg, sweep hoặc bodylock passing.', 'Bottom player wants underhook and head position, elbow-knee rise, near-leg collection, then single leg, sweep, or bodylock passing.', 'Le bottom veut underhook/head position, montée coude-genou, capturer jambe proche puis single leg, sweep ou bodylock passing.'),
  topPlayerGoal: lt('Top player muốn crossface, flatten hips, whizzer nặng và tách elbow-knee để chặn come-up.', 'Top player wants crossface, flattened hips, heavy whizzer, and separated elbow-knee connection to stop the come-up.', 'Le top veut crossface, hanches aplaties, whizzer lourd et séparation coude-genou pour stopper come-up.'),
  phases: [
    targetPhase('hg-shield-underhook', lt('Knee shield và underhook', 'Knee shield and underhook', 'Knee shield et underhook'), lt('Giữ distance đủ để thắng underhook mà không ăn crossface.', 'Keep enough distance to win underhook without accepting crossface.', 'Garder distance pour gagner underhook sans accepter crossface.'), 'bottom', [
      conciseInstruction('head', 'bottom', 'alignment', lt('Đầu ở dưới cằm/vai gần của top player, không nằm thấp dưới chest. Tai bên underhook gần ribs để head position chặn crossface.', 'Head stays under the near chin or shoulder, not low under the chest. The underhook-side ear stays near ribs so head position blocks crossface.', 'Tête sous menton/épaule proche, pas basse sous poitrine. Oreille côté underhook près côtes pour bloquer crossface.'), lt('Head position quyết định underhook là đòn tấn công hay chỉ là tay bị whizzer đè.', 'Head position decides whether the underhook is an attack or an arm trapped under whizzer.', 'Head position décide si underhook attaque ou bras piégé sous whizzer.')),
      conciseInstruction('eyes', 'bottom', 'alignment', lt('Mắt nhìn far knee và hip line của top player để biết khi nào họ sprawl, backstep hoặc pummel crossface.', 'Eyes track the far knee and hip line to read sprawl, backstep, or crossface pummel.', 'Yeux sur far knee et hip line pour lire sprawl, backstep ou crossface pummel.'), lt('Gaze đúng giúp bạn lên gối trước khi họ flatten hông.', 'Correct gaze lets you come to the knee before hips are flattened.', 'Bon regard permet monter au genou avant flattening.')),
      conciseInstruction('hands', 'bottom', 'grip', lt('Tay underhook không reach cao; bàn tay đi quanh ribs/lat hoặc hip, wrist thẳng. Tay còn lại kiểm soát wrist/crossface arm.', 'Underhook hand does not reach high; it wraps ribs, lat, or hip with a straight wrist. The other hand controls wrist or crossface arm.', 'Main underhook pas trop haute; elle entoure côtes/lat/hanche poignet droit. Autre main contrôle wrist/crossface arm.'), lt('Underhook thấp nối với hông; underhook cao bị whizzer và kimura.', 'A low underhook connects to hips; a high underhook invites whizzer and kimura.', 'Underhook bas connecte hanches; haut invite whizzer/kimura.')),
      conciseInstruction('elbows', 'bottom', 'inside_position', lt('Khuỷu underhook kéo về ribs sau khi luồn vào; khuỷu còn lại đóng với knee shield để không bị tách tay.', 'Underhook elbow returns toward ribs after insertion; the other elbow closes to knee shield to prevent arm separation.', 'Coude underhook revient aux côtes après insertion; l’autre coude ferme sur knee shield.'), lt('Elbow position bảo vệ shoulder line khỏi whizzer/crossface.', 'Elbow position protects shoulder line from whizzer and crossface.', 'Position du coude protège shoulder line contre whizzer/crossface.')),
      conciseInstruction('knees', 'bottom', 'wedge', lt('Knee shield chĩa vào sternum/hip line, không nằm ngang quá thấp. Gối trong giữ half guard đủ để cảm nhận leg line.', 'Knee shield points into sternum or hip line, not low and flat. The inside knee keeps half guard enough to feel leg line.', 'Knee shield vers sternum/hip line, pas bas et plat. Genou inside garde half pour sentir leg line.'), lt('Knee shield tạo khoảng cho underhook và chặn chest-to-chest.', 'Knee shield creates underhook space and blocks chest-to-chest.', 'Knee shield crée espace underhook et bloque chest-to-chest.')),
    ], la(['Head position chặn crossface', 'Underhook thấp nối hông', 'Knee shield còn chịu lực'], ['Head position blocks crossface', 'Low underhook connects to hips', 'Knee shield still bears weight'], ['Head position bloque crossface', 'Underhook bas connecté hanches', 'Knee shield porte poids']), la(['Crossface sâu', 'Whizzer kéo vai xuống', 'Knee shield bị smash phẳng'], ['Deep crossface', 'Whizzer pulls shoulder down', 'Knee shield smashed flat'], ['Crossface profond', 'Whizzer tire épaule', 'Knee shield écrasé']), la(['Top không flatten được', 'Bạn nhìn thấy far knee', 'Underhook nâng shoulder line'], ['Top cannot flatten', 'You can see far knee', 'Underhook lifts shoulder line'], ['Top ne flatten pas', 'Vous voyez far knee', 'Underhook lève shoulder line'])),
    targetPhase('hg-come-up', lt('Lên khuỷu-gối', 'Come to elbow and knee', 'Monter coude-genou'), lt('Đưa hông dưới vai mà không để đầu bị snapdown.', 'Bring hips under shoulders without letting the head get snapped down.', 'Mettre hanches sous épaules sans snapdown.'), 'bottom', [
      conciseInstruction('chin', 'bottom', 'safety', lt('Cằm thu, cổ ngắn; không nhìn xuống mat khi lên khuỷu.', 'Chin tucked, neck short; do not look at the mat while rising to elbow.', 'Menton rentré, cou court; ne pas regarder tapis en montant coude.'), lt('Chin lifted biến wrestle-up thành front headlock.', 'A lifted chin turns wrestle-up into front headlock.', 'Menton levé transforme wrestle-up en front headlock.')),
      conciseInstruction('forearms', 'bottom', 'post', lt('Forearm hoặc bàn tay post ngắn ngay dưới vai; post dài phía trước làm bạn bị kimura/guillotine.', 'Forearm or hand posts short under the shoulder; a long forward post exposes kimura or guillotine.', 'Forearm ou main post court sous épaule; long post expose kimura/guillotine.'), lt('Post ngắn nâng spine mà vẫn cho elbow quay về ribs.', 'A short post lifts the spine while allowing elbow to return to ribs.', 'Post court lève colonne et permet coude aux côtes.')),
      conciseInstruction('hips', 'bottom', 'mobility', lt('Hông heist lên và ra ngoài, đưa pelvis dưới shoulder line trước khi kéo chân.', 'Hips heist up and out, bringing pelvis under shoulder line before pulling the leg.', 'Hanches heist haut/dehors, pelvis sous shoulder line avant tirer jambe.'), lt('Nếu hips không dưới vai, single leg chỉ là kéo bằng tay.', 'If hips are not under shoulders, the single leg is only arm pulling.', 'Sans hanches sous épaules, single leg est tirage bras.')),
      conciseInstruction('toes', 'bottom', 'post', lt('Toes của chân ngoài cắm mat để drive; chân half guard không kẹp chết, nó mở đường cho knee slide ra.', 'Outside-leg toes grip the mat to drive; the half-guard leg does not clamp dead, it creates room for knee slide out.', 'Orteils jambe extérieure dans tapis pour drive; jambe half ne clamp pas morte, elle crée place pour sortir genou.'), lt('Active toes biến come-up thành base, không phải scramble mù.', 'Active toes turn the come-up into base, not blind scramble.', 'Orteils actifs transforment come-up en base, pas scramble aveugle.')),
      conciseInstruction('spine', 'bottom', 'alignment', lt('Spine đi từ nghiêng sang cao dần; ribs đóng để không bị whizzer kéo sập.', 'Spine rises from angled to tall; ribs stay closed so whizzer cannot collapse you.', 'Colonne monte d’angle à haute; côtes fermées contre whizzer.'), lt('Spine là trục nối underhook với drive chân.', 'The spine links underhook to leg drive.', 'La colonne relie underhook et drive des jambes.')),
    ], la(['Cằm thu', 'Pelvis dưới vai', 'Post ngắn dưới shoulder'], ['Chin tucked', 'Pelvis under shoulders', 'Short post under shoulder'], ['Menton rentré', 'Pelvis sous épaules', 'Post court sous épaule']), la(['Head snap xuống', 'Post tay dài', 'Whizzer làm vai sập'], ['Head snapped down', 'Long hand post', 'Whizzer collapses shoulder'], ['Tête snapdown', 'Long post', 'Whizzer effondre épaule']), la(['Bạn lên một gối', 'Underhook còn sống', 'Top phải sprawl hoặc post'], ['You reach one knee', 'Underhook remains alive', 'Top must sprawl or post'], ['Vous arrivez un genou', 'Underhook vivant', 'Top doit sprawl ou post'])),
    targetPhase('hg-collect-leg', lt('Gom single leg', 'Collect the single leg', 'Capter single leg'), lt('Chuyển underhook và head position thành kiểm soát chân gần.', 'Turn underhook and head position into near-leg control.', 'Transformer underhook/head position en contrôle jambe proche.'), 'attacker', [
      conciseInstruction('head', 'attacker', 'pressure', lt('Đầu dán vào ribs/hip line, không nằm ngoài chân. Đẩy bằng tai/trán vào hướng làm họ mất base.', 'Head sticks to ribs or hip line, not outside the leg. Drive ear or forehead into the direction that breaks base.', 'Tête collée côtes/hip line, pas dehors jambe. Drive oreille/front vers direction qui casse base.'), lt('Head pressure thay thế tay trong việc lái hông.', 'Head pressure steers hips instead of hands doing all the work.', 'Head pressure dirige hanches au lieu des mains.')),
      conciseInstruction('hands', 'attacker', 'grip', lt('Hai tay gom quanh knee line hoặc dưới hamstring; wrist không cross quá xa để tránh kimura.', 'Hands collect around knee line or under hamstring; wrists do not cross too far to avoid kimura.', 'Mains autour knee line ou sous hamstring; poignets pas trop croisés pour éviter kimura.'), lt('Grip đúng giữ chân gần trong khi bạn đổi base.', 'Correct grip keeps the near leg while your base changes.', 'Bon grip garde jambe proche pendant changement base.')),
      conciseInstruction('shoulders', 'attacker', 'alignment', lt('Shoulder dưới đưa vào thigh/hip, shoulder trên không bị whizzer kéo xuống.', 'Low shoulder enters thigh or hip, top shoulder does not get dragged down by whizzer.', 'Épaule basse entre cuisse/hanche, épaule haute pas tirée par whizzer.'), lt('Shoulder alignment bảo vệ spine khi bạn drive.', 'Shoulder alignment protects the spine while driving.', 'Alignement épaules protège colonne pendant drive.')),
      conciseInstruction('knees', 'attacker', 'post', lt('Gối ngoài làm base; gối trong trượt ra khỏi half guard để bạn không tự khóa hông.', 'Outside knee bases; inside knee slides out of half guard so you do not trap your own hips.', 'Genou extérieur base; genou intérieur sort de half pour ne pas bloquer vos hanches.'), lt('Knees quyết định single leg có finish hay bị sprawled.', 'Knees decide whether the single leg finishes or gets sprawled on.', 'Les genoux décident finish single leg ou sprawl subi.')),
      conciseInstruction('feet', 'attacker', 'mobility', lt('Feet bước nhỏ theo góc, không đứng thẳng lên dưới whizzer. Một foot drive, một foot điều chỉnh circle.', 'Feet take small angle steps, not standing straight under whizzer. One foot drives, one adjusts the circle.', 'Pieds font petits pas d’angle, pas debout sous whizzer. Un pied drive, un ajuste cercle.'), lt('Footwork giữ bạn trên base khi top player sprawl.', 'Footwork keeps you based when the top player sprawls.', 'Footwork garde base quand top sprawl.')),
    ], la(['Head dán hip/ribs', 'Hai tay dưới knee line', 'Một gối làm base'], ['Head glued to hip/ribs', 'Hands below knee line', 'One knee bases'], ['Tête collée hanche/côtes', 'Mains sous knee line', 'Un genou base']), la(['Whizzer kéo vai', 'Head ngoài chân', 'Grip quá cao'], ['Whizzer pulls shoulder', 'Head outside leg', 'Grip too high'], ['Whizzer tire épaule', 'Tête dehors jambe', 'Grip trop haut']), la(['Top mất base', 'Bạn có single leg hoặc bodylock', 'Họ phải post tay'], ['Top loses base', 'You have single leg or bodylock', 'They must post a hand'], ['Top perd base', 'Vous avez single leg/bodylock', 'Il doit post main'])),
    targetPhase('hg-finish-transition', lt('Finish hoặc transition', 'Finish or transition', 'Finir ou transition'), lt('Nếu single leg bị chặn, đổi sang bodylock passing, mat return hoặc back exposure.', 'If the single leg is stopped, switch to bodylock passing, mat return, or back exposure.', 'Si single leg bloqué, passer bodylock passing, mat return ou back exposure.'), 'attacker', [
      conciseInstruction('pelvis', 'attacker', 'weight_distribution', lt('Pelvis đi theo chân bạn gom; không để hông rơi lại xuống mat sau khi họ sprawl.', 'Pelvis follows the collected leg; do not let hips fall back to the mat after they sprawl.', 'Pelvis suit jambe captée; ne pas laisser hanches retomber au tapis après sprawl.'), lt('Pelvis pressure giúp bạn chuyển single leg sang mat return/bodylock.', 'Pelvis pressure lets you convert single leg to mat return or bodylock.', 'Pelvis pressure convertit single leg en mat return/bodylock.')),
      conciseInstruction('elbows', 'attacker', 'grip', lt('Elbows kéo về ribs khi đổi grip; elbow flare mở kimura hoặc crossface lại.', 'Elbows pull to ribs while changing grips; elbow flare opens kimura or crossface again.', 'Coudes vers côtes en changement grip; coudes ouverts ouvrent kimura/crossface.'), lt('Elbows đóng giữ connection khi branch đổi.', 'Closed elbows keep connection during branch changes.', 'Coudes fermés gardent connexion pendant changement branche.')),
      conciseInstruction('eyes', 'attacker', 'alignment', lt('Mắt đọc far hip và tay post: nếu họ turn away, lấy back; nếu họ sprawl, chuyển bodylock.', 'Eyes read far hip and posting hand: if they turn away, take back; if they sprawl, switch bodylock.', 'Yeux lisent far hip et main post: s’il turn away, back; s’il sprawl, bodylock.'), lt('If-then reactions bắt đầu từ gaze, không từ sức kéo.', 'If-then reactions start from gaze, not pulling strength.', 'Les réactions if-then commencent par regard, pas force.')),
      conciseInstruction('thighs', 'attacker', 'wedge', lt('Thigh gần chặn chân họ bước qua; thigh xa tạo base để circle.', 'Near thigh blocks their leg from stepping over; far thigh builds base to circle.', 'Cuisse proche bloque sa jambe; cuisse loin crée base pour circle.'), lt('Thigh wedge ngăn họ recover top pressure.', 'The thigh wedge stops them recovering top pressure.', 'Le wedge de cuisse empêche récupération pression top.')),
      conciseInstruction('neck', 'attacker', 'safety', lt('Cổ ngắn trong mọi finish. Nếu cổ bị cuốn guillotine, bỏ single leg và quay về frame/posture.', 'Neck stays short in every finish. If the neck is wrapped for guillotine, abandon single leg and recover frame/posture.', 'Cou court dans chaque finish. Si guillotine, abandonner single leg et récupérer frame/posture.'), lt('Bảo vệ cổ quan trọng hơn hoàn tất sweep.', 'Protecting the neck is more important than finishing the sweep.', 'Protéger le cou est plus important que finir sweep.')),
    ], la(['Có branch nếu single leg fail', 'Elbows đóng khi đổi grip', 'Cổ an toàn'], ['There is a branch if single leg fails', 'Elbows closed while switching grips', 'Neck is safe'], ['Branche si single leg échoue', 'Coudes fermés au changement grip', 'Cou sûr']), la(['Guillotine wrap', 'Kimura grip', 'Hông rơi lại mat'], ['Guillotine wrap', 'Kimura grip', 'Hips fall back to mat'], ['Guillotine wrap', 'Kimura grip', 'Hanches retombent']), la(['Bạn lên top hoặc vào pass', 'Top player post tay', 'Bạn giữ leg/hip connection'], ['You come on top or enter pass', 'Top player posts hand', 'You keep leg or hip connection'], ['Vous arrivez top ou pass', 'Top post main', 'Vous gardez connexion jambe/hanche'])),
  ],
  globalPrinciples: la(['Underhook chỉ mạnh khi head position đúng.', 'Knee shield tạo space cho come-up.', 'Hips phải lên dưới shoulders trước khi kéo chân.', 'Cổ ngắn hơn sweep đẹp.', 'Nếu single leg fail, chuyển branch ngay.'], ['Underhook is strong only with correct head position.', 'Knee shield creates space for the come-up.', 'Hips must rise under shoulders before pulling the leg.', 'A short neck matters more than a pretty sweep.', 'If single leg fails, branch immediately.'], ['Underhook fort seulement avec bonne head position.', 'Knee shield crée espace pour come-up.', 'Hanches sous épaules avant tirer jambe.', 'Cou court plus important que joli sweep.', 'Si single leg échoue, changer branche.']),
  nonNegotiables: la(['Không ăn crossface sâu.', 'Không đứng với cằm ngửa.', 'Không kéo single leg chỉ bằng tay.'], ['Do not accept deep crossface.', 'Do not stand with chin lifted.', 'Do not pull single leg with arms only.'], ['Ne pas accepter crossface profond.', 'Ne pas se lever menton levé.', 'Ne pas tirer single leg seulement bras.']),
  commonMechanicalErrors: la(['Underhook cao bị whizzer.', 'Đầu ngoài chân.', 'Post tay dài.', 'Hông không lên dưới vai.', 'Gối trong tự khóa half guard.', 'Không có branch khi bị sprawl.'], ['High underhook gets whizzered.', 'Head outside the leg.', 'Long hand post.', 'Hips never rise under shoulders.', 'Inside knee traps your own half guard.', 'No branch when sprawled on.'], ['Underhook haut pris whizzer.', 'Tête dehors jambe.', 'Long post main.', 'Hanches pas sous épaules.', 'Genou inside bloque half.', 'Pas de branche contre sprawl.']),
  correctionCues: la(['Tai vào ribs.', 'Cằm thu.', 'Hông dưới vai.', 'Elbows về ribs.', 'Single leg fail thì bodylock.'], ['Ear to ribs.', 'Chin tucked.', 'Hips under shoulders.', 'Elbows to ribs.', 'Single leg fails, bodylock.'], ['Oreille aux côtes.', 'Menton rentré.', 'Hanches sous épaules.', 'Coudes aux côtes.', 'Single leg fail, bodylock.']),
  safetyNotes: la(['Không cố finish nếu cổ bị guillotine.', 'Tập mat return có kiểm soát, không xoắn gối.', 'Tap/reset nếu cổ hoặc spine bị ép bất thường.'], ['Do not force the finish if the neck is in guillotine.', 'Train mat returns with control and no knee twisting.', 'Tap or reset if neck or spine is pressured unusually.'], ['Ne pas forcer si cou en guillotine.', 'Mat return contrôlé sans torsion genou.', 'Taper/reset si cou ou colonne sous pression anormale.']),
})

const frontHeadlockDefenseMechanics = (): BodyMechanicsSystem => ({
  overview: lt(
    'Front Headlock Defense là hệ thống bảo vệ cổ trước, rồi mới thoát vị trí. Người phòng thủ phải làm cằm-cổ an toàn, thắng hand fight gần chin strap, đưa hông dưới vai và circle ra góc không cho guillotine, go-behind hoặc back take.',
    'Front Headlock Defense is a neck-first safety system. The defender protects chin and neck, wins the hand fight around the chin strap, brings hips under shoulders, and circles to an angle that denies guillotine, go-behind, or back take.',
    'La défense front headlock est un système de sécurité du cou. Le défenseur protège menton/cou, gagne le hand fight autour du chin strap, met les hanches sous les épaules et sort en angle contre guillotine, go-behind ou back take.',
  ),
  defenderGoal: lt('Defender muốn cằm thu, airway mở, tay kiểm soát choking wrist, spine trở lại dưới hông và thoát ra bằng circle hoặc rebuild base.', 'Defender wants chin tucked, airway open, choking wrist controlled, spine back under hips, then circle out or rebuild base.', 'Le défenseur veut menton rentré, respiration libre, poignet de choke contrôlé, colonne sous hanches puis sortie en cercle ou base.'),
  attackerGoal: lt('Attacker muốn đầu bạn thấp dưới shoulder line, chin strap sâu, elbow kéo về ribs và hông bạn kéo dài để mở guillotine/go-behind.', 'Attacker wants your head below shoulder line, deep chin strap, elbow pulled to ribs, and your hips stretched to open guillotine or go-behind.', 'L’attaquant veut votre tête sous shoulder line, chin strap profond, coude aux côtes et hanches allongées pour guillotine/go-behind.'),
  phases: [
    targetPhase('fhl-recognize', lt('Nhận diện danger line', 'Recognize the danger line', 'Reconnaître la ligne de danger'), lt('Biết khi nào đầu, cằm và hông đang thẳng hàng cho front headlock trước khi squeeze xuất hiện.', 'Know when head, chin, and hips are aligned for front headlock before the squeeze appears.', 'Savoir quand tête, menton et hanches sont alignés pour front headlock avant le squeeze.'), 'defender', [
      conciseInstruction('head', 'defender', 'alignment', lt('Đầu không được treo dưới ngực đối thủ. Đưa trán hoặc thái dương vào ribs/shoulder line gần để biến đầu thành post ngắn.', 'Head must not hang under the opponent’s chest. Bring forehead or temple to the near ribs or shoulder line so the head becomes a short post.', 'La tête ne doit pas pendre sous la poitrine adverse. Mettre front/tempe vers côtes ou shoulder line proche pour créer un post court.'), lt('Head post ngắn ngăn họ kéo shoulder line của bạn xuống và nối guillotine.', 'A short head post stops them pulling your shoulder line down into guillotine.', 'Un post court de tête empêche la traction de votre shoulder line vers guillotine.')),
      conciseInstruction('eyes', 'defender', 'alignment', lt('Mắt nhìn hip line hoặc near knee, không nhìn xuống mat. Gaze này giúp bạn biết họ đang circle go-behind hay kéo guillotine.', 'Eyes look at hip line or near knee, not the mat. This gaze tells you whether they circle go-behind or pull guillotine.', 'Les yeux vers hip line ou genou proche, pas le tapis. Ce regard lit go-behind ou guillotine.'), lt('Nếu mắt xuống sàn, spine thường gập và cằm lộ.', 'When eyes drop to the floor, the spine usually folds and the chin exposes.', 'Quand les yeux tombent, la colonne plie et le menton s’expose.')),
      conciseInstruction('chin', 'defender', 'safety', lt('Cằm thu về xương ức nhưng không nín thở. Cằm phải giấu khỏi cổ tay chin strap trước khi bạn cố đứng.', 'Chin tucks toward sternum without holding breath. Hide the chin from the chin-strap wrist before trying to stand.', 'Menton rentré vers sternum sans bloquer respiration. Cacher menton du poignet chin strap avant de se relever.'), lt('Chin lifted biến mọi circle thành neck crank hoặc guillotine finish.', 'A lifted chin turns every circle into a neck crank or guillotine finish.', 'Menton levé transforme chaque cercle en crank ou guillotine.')),
      conciseInstruction('hands', 'defender', 'grip', lt('Hai tay tìm choking wrist và bicep gần. Một tay peel wrist, tay còn lại chặn elbow kéo sâu.', 'Hands find the choking wrist and near bicep. One hand peels the wrist while the other blocks the elbow from pulling deep.', 'Les mains cherchent choking wrist et biceps proche. Une main peel le poignet, l’autre bloque coude profond.'), lt('Hand fight đúng giải phóng airway trước khi body movement bắt đầu.', 'Correct hand fighting frees the airway before body movement begins.', 'Bon hand fight libère respiration avant mouvement du corps.')),
      conciseInstruction('knees', 'defender', 'post', lt('Knees kéo dưới hông; đừng nằm dài trên bụng. Một knee post gần tay kiểm soát để chuẩn bị circle.', 'Knees pull under hips; do not lie long on the belly. One knee posts near the controlling hand to prepare the circle.', 'Genoux sous hanches; ne pas rester long sur ventre. Un genou post près de la main de contrôle pour préparer cercle.'), lt('Knees dưới hông làm snapdown mất lực và cho bạn đổi góc.', 'Knees under hips remove snapdown power and let you change angle.', 'Genoux sous hanches enlèvent puissance snapdown et donnent angle.')),
    ], la(['Cằm thu nhưng còn thở', 'Một tay kiểm soát choking wrist', 'Knees trở lại dưới hips'], ['Chin tucked while breathing', 'One hand controls choking wrist', 'Knees return under hips'], ['Menton rentré avec respiration', 'Une main contrôle choking wrist', 'Genoux sous hanches']), la(['Cằm bị kéo ra', 'Đầu thấp dưới chest', 'Hông kéo dài ra sau'], ['Chin pulled out', 'Head low under chest', 'Hips stretched behind'], ['Menton sorti', 'Tête basse sous poitrine', 'Hanches étirées derrière']), la(['Airway còn mở', 'Attacker chưa nối elbow-chest', 'Bạn có thể circle một bên'], ['Airway remains open', 'Attacker has not connected elbow to chest', 'You can circle to one side'], ['Respiration ouverte', 'Attaquant pas connecté coude-poitrine', 'Vous pouvez circle'])),
    targetPhase('fhl-stop-threat', lt('Chặn threat tức thì', 'Stop the immediate threat', 'Bloquer la menace immédiate'), lt('Tắt choking wrist, đóng shoulder line và giữ cổ ngắn trước khi đổi base.', 'Shut down the choking wrist, close shoulder line, and keep the neck short before changing base.', 'Éteindre choking wrist, fermer shoulder line et garder cou court avant changer base.'), 'defender', [
      conciseInstruction('neck', 'defender', 'safety', lt('Cổ ngắn và thẳng với spine; không xoay mạnh vào phía đang bị siết. Nếu áp lực tăng nhanh, tap/reset.', 'Neck stays short and aligned with spine; do not rotate hard into the choking side. If pressure escalates quickly, tap or reset.', 'Cou court aligné avec colonne; ne pas tourner fort côté étranglement. Si pression monte vite, taper/reset.'), lt('Rotation sai dưới front headlock có thể tạo áp lực nguy hiểm lên cổ.', 'Wrong rotation under front headlock can create dangerous neck pressure.', 'Mauvaise rotation sous front headlock peut créer pression dangereuse sur le cou.')),
      conciseInstruction('shoulders', 'defender', 'frame', lt('Shoulders shrug nhẹ để đóng khoảng cổ, nhưng không nâng cứng. Shoulder gần đi về tai để giảm không gian under jaw.', 'Shoulders shrug lightly to close neck space, but not stiffly. Near shoulder travels toward ear to reduce under-jaw space.', 'Épaules shrug léger pour fermer espace cou, pas raide. Épaule proche vers oreille pour réduire espace sous mâchoire.'), lt('Shoulder line đóng làm chin strap khó ăn sâu.', 'A closed shoulder line makes deep chin strap harder.', 'Shoulder line fermée rend chin strap profond difficile.')),
      conciseInstruction('forearms', 'defender', 'frame', lt('Forearm gần chắn vào wrist/bicep của choking arm như frame ngắn; không duỗi thẳng tay ra xa.', 'Near forearm blocks the choking wrist or bicep as a short frame; do not straighten the arm far away.', 'Avant-bras proche bloque poignet/biceps de choke comme frame court; ne pas tendre loin.'), lt('Frame ngắn bảo vệ cổ mà không tặng kimura hoặc arm drag.', 'A short frame protects the neck without giving kimura or arm drag.', 'Frame court protège le cou sans offrir kimura ou arm drag.')),
      conciseInstruction('elbows', 'defender', 'inside_position', lt('Elbows về ribs trong lúc peel. Elbow flare cho attacker kéo tay qua centerline và chuyển go-behind.', 'Elbows return to ribs while peeling. Elbow flare lets the attacker drag the arm across centerline and go behind.', 'Coudes aux côtes pendant peel. Coude ouvert permet drag à travers centerline et go-behind.'), lt('Elbows là cửa giữ inside position của thân trên.', 'Elbows are the gate that keeps upper-body inside position.', 'Les coudes gardent inside position du haut du corps.')),
      conciseInstruction('ribs', 'defender', 'alignment', lt('Ribs đóng khi thở ra; tránh arch lưng để tìm posture. Posture phải đến từ knees/hips, không từ cổ.', 'Ribs close on exhale; avoid arching the back to find posture. Posture must come from knees and hips, not the neck.', 'Côtes fermées à l’expiration; éviter cambrer pour posture. La posture vient genoux/hanches, pas cou.'), lt('Ribs mở làm spine dài và cằm dễ bị kéo ra.', 'Open ribs lengthen the spine and make the chin easier to pull out.', 'Côtes ouvertes allongent colonne et exposent menton.')),
    ], la(['Forearm chặn choking wrist', 'Shoulder line đóng', 'Cổ không bị xoay'], ['Forearm blocks choking wrist', 'Shoulder line is closed', 'Neck is not rotated'], ['Avant-bras bloque choking wrist', 'Shoulder line fermée', 'Cou sans rotation']), la(['Elbow flare', 'Cổ dài', 'Ribs mở và lưng arch'], ['Elbow flare', 'Long neck', 'Open ribs and arched back'], ['Coude ouvert', 'Cou long', 'Côtes ouvertes et dos cambré']), la(['Grip của họ trượt lên cằm', 'Bạn lấy lại hơi thở', 'Họ phải đổi sang go-behind thay vì finish'], ['Their grip slides onto the chin', 'You recover breath', 'They must switch to go-behind instead of finishing'], ['Son grip glisse sur menton', 'Vous respirez', 'Il doit passer go-behind au lieu de finir'])),
    targetPhase('fhl-rebuild-base', lt('Rebuild base và posture', 'Rebuild base and posture', 'Reconstruire base et posture'), lt('Đưa hips dưới shoulders, lấy lại spine angle và tạo đường circle an toàn.', 'Bring hips under shoulders, recover spine angle, and create a safe circling line.', 'Mettre hanches sous épaules, récupérer angle de colonne et créer sortie circulaire sûre.'), 'defender', [
      conciseInstruction('spine', 'defender', 'alignment', lt('Spine đi từ gập sang nghiêng-cao, không bật thẳng cổ. Đầu, sternum và pelvis phải trở lại cùng một trục.', 'Spine moves from folded to angled and tall, not by snapping the neck upright. Head, sternum, and pelvis return to one axis.', 'Colonne passe de pliée à inclinée-haute, pas par extension du cou. Tête, sternum et pelvis reviennent sur un axe.'), lt('Spine alignment cho phép tay và chân làm việc cùng nhau.', 'Spine alignment lets hands and legs work together.', 'Alignement colonne permet mains et jambes ensemble.')),
      conciseInstruction('pelvis', 'defender', 'mobility', lt('Pelvis trượt dưới vai bằng hip heist nhỏ. Nếu pelvis ở sau xa, attacker kéo đầu bạn mãi.', 'Pelvis slides under shoulders with a small hip heist. If pelvis stays far behind, the attacker keeps pulling the head.', 'Pelvis glisse sous épaules par petit hip heist. Si pelvis loin derrière, l’attaquant tire tête sans fin.'), lt('Pelvis dưới vai là base để đứng hoặc circle.', 'Pelvis under shoulders is the base to stand or circle.', 'Pelvis sous épaules est la base pour stand ou circle.')),
      conciseInstruction('feet', 'defender', 'post', lt('Feet và toes active; một foot post để drive, foot kia bước circle khỏi choking side.', 'Feet and toes are active; one foot posts to drive while the other steps a circle away from the choking side.', 'Pieds et orteils actifs; un pied post pour drive, l’autre circle loin du côté choke.'), lt('Footwork chuyển defense từ nằm chịu sang thoát góc.', 'Footwork turns defense from surviving underneath to escaping angle.', 'Footwork transforme survie en sortie d’angle.')),
      conciseInstruction('hands', 'defender', 'grip', lt('Hand fight chuyển từ peel sang kiểm soát wrist/elbow để attacker không nối lại chin strap khi bạn đứng.', 'Hand fight shifts from peeling to wrist and elbow control so the attacker cannot reconnect chin strap as you rise.', 'Hand fight passe de peel à contrôle wrist/elbow pour empêcher reconnection chin strap en montant.'), lt('Nếu tay bỏ sớm, họ re-snap khi hips vừa lên.', 'If hands release early, they re-snap as soon as hips rise.', 'Si mains lâchent tôt, il re-snap dès que hanches montent.')),
      conciseInstruction('ears', 'defender', 'alignment', lt('Ear gần ép vào ribs/shoulder line an toàn, không để tai ở dưới nách sâu. Ear position cho biết đầu có còn wedge hay đã bị kéo qua centerline.', 'Near ear presses into a safe ribs or shoulder line, not deep under the armpit. Ear position tells whether the head is still a wedge or has been dragged across centerline.', 'Oreille proche vers côtes/shoulder line sûre, pas profondément sous aisselle. Position oreille indique wedge ou drag centerline.'), lt('Ear đúng giúp đầu chống circle của attacker mà không lộ cổ.', 'Correct ear position lets the head resist attacker circling without exposing the neck.', 'Bonne position oreille résiste circle adverse sans exposer cou.')),
    ], la(['Pelvis dưới shoulders', 'Một foot post một foot circle', 'Hand control chưa bỏ'], ['Pelvis under shoulders', 'One foot posts and one circles', 'Hand control has not released'], ['Pelvis sous épaules', 'Un pied post et un circle', 'Contrôle main gardé']), la(['Đứng thẳng cổ trước hips', 'Bỏ wrist control', 'Tai bị kéo dưới nách'], ['Standing the neck before hips', 'Releasing wrist control', 'Ear dragged under armpit'], ['Redresser cou avant hanches', 'Lâcher wrist control', 'Oreille sous aisselle']), la(['Bạn cao dần mà airway vẫn mở', 'Attacker mất elbow connection', 'Bạn có angle để circle'], ['You rise while airway stays open', 'Attacker loses elbow connection', 'You have an angle to circle'], ['Vous montez avec respiration ouverte', 'Attaquant perd connexion coude', 'Vous avez angle pour circle'])),
    targetPhase('fhl-exit', lt('Circle out hoặc convert', 'Circle out or convert', 'Sortir en cercle ou convertir'), lt('Thoát ra góc an toàn, hoặc chuyển sang single leg/bodylock nếu attacker overcommit.', 'Exit to a safe angle, or convert to single leg or bodylock if the attacker overcommits.', 'Sortir vers angle sûr, ou convertir single leg/bodylock si attaquant overcommit.'), 'defender', [
      conciseInstruction('head', 'defender', 'transition_mechanic', lt('Đầu đi ra ngoài shoulder line của attacker trước khi bạn quay ngực lên. Nếu đầu còn dưới chest, đừng spin mù.', 'Head exits outside the attacker’s shoulder line before your chest turns up. If the head is still under chest, do not blind spin.', 'La tête sort hors shoulder line avant tourner poitrine. Si tête sous poitrine, ne pas spinner aveuglément.'), lt('Head exit trước ngăn guillotine re-attack.', 'Head exits first to prevent guillotine re-attack.', 'Sortie tête d’abord empêche re-attaque guillotine.')),
      conciseInstruction('hips', 'defender', 'mobility', lt('Hips circle theo đầu, không lùi thẳng. Lùi thẳng kéo cổ trở lại vào chin strap.', 'Hips circle with the head, not straight backward. Backing straight up pulls the neck back into chin strap.', 'Hanches circle avec tête, pas recul droit. Recul droit ramène cou dans chin strap.'), lt('Hip angle là thứ thật sự giải phóng cổ.', 'Hip angle is what truly frees the neck.', 'Angle de hanche libère vraiment le cou.')),
      conciseInstruction('knees', 'defender', 'post', lt('Knee ngoài bước lên hoặc ra góc; knee trong không để kẹt dưới trọng lượng attacker.', 'Outside knee steps up or out to angle; inside knee does not stay trapped under attacker weight.', 'Genou extérieur monte ou sort en angle; genou intérieur pas bloqué sous poids adverse.'), lt('Knee step làm circle có base thay vì roll cổ.', 'The knee step gives the circle base instead of rolling the neck.', 'Le pas de genou donne base au cercle au lieu de rouler le cou.')),
      conciseInstruction('wrists', 'defender', 'grip', lt('Wrists giữ neutral khi đổi từ peel sang underhook/single leg. Wrist gập làm bạn mất hand fight lần hai.', 'Wrists stay neutral when switching from peel to underhook or single leg. Bent wrists lose the second hand fight.', 'Poignets neutres du peel vers underhook/single leg. Poignets pliés perdent le deuxième hand fight.'), lt('Wrist alignment giữ connection trong transition.', 'Wrist alignment keeps connection through the transition.', 'Alignement poignet garde connexion en transition.')),
      conciseInstruction('eyes', 'defender', 'alignment', lt('Mắt quét hip và far hand: nếu attacker overcommit go-behind, xoay vào single leg; nếu họ lùi, reset hand fight.', 'Eyes scan hip and far hand: if attacker overcommits go-behind, turn into single leg; if they retreat, reset hand fight.', 'Yeux sur hanche et main loin: si go-behind overcommit, tourner single leg; s’il recule, reset hand fight.'), lt('Exit tốt luôn có if-then, không chỉ thoát khỏi grip.', 'Good exits carry an if-then, not only grip escape.', 'Bonne sortie a un if-then, pas seulement sortie grip.')),
    ], la(['Head ra ngoài shoulder line', 'Hips circle cùng đầu', 'Bạn có thể reset hoặc attack'], ['Head clears outside shoulder line', 'Hips circle with head', 'You can reset or attack'], ['Tête hors shoulder line', 'Hanches circle avec tête', 'Vous pouvez reset ou attaquer']), la(['Blind spin', 'Lùi thẳng', 'Knee kẹt dưới trọng lượng'], ['Blind spin', 'Backing straight up', 'Knee trapped under weight'], ['Spin aveugle', 'Recul droit', 'Genou coincé sous poids']), la(['Cổ tự do', 'Bạn đối diện lại hoặc vào leg', 'Attacker không còn chin strap sâu'], ['Neck is free', 'You face back in or enter the leg', 'Attacker no longer has deep chin strap'], ['Cou libre', 'Vous refaites face ou entrez jambe', 'Plus de chin strap profond'])),
  ],
  globalPrinciples: la(['Bảo vệ airway trước khi thoát.', 'Cằm-cổ-spine phải an toàn trước khi đứng.', 'Hand fight gần choking wrist luôn ưu tiên hơn đẩy hông.', 'Hips dưới shoulders làm snapdown mất lực.', 'Circle bằng head-hips-knees, không spin cổ.'], ['Protect the airway before escaping.', 'Chin, neck, and spine must be safe before standing.', 'Hand fighting near the choking wrist beats pushing hips first.', 'Hips under shoulders weaken the snapdown.', 'Circle with head, hips, and knees, not by spinning the neck.'], ['Protéger respiration avant sortie.', 'Menton, cou et colonne sûrs avant stand.', 'Hand fight près choking wrist avant pousser hanches.', 'Hanches sous épaules affaiblissent snapdown.', 'Circle avec tête-hanches-genoux, pas rotation du cou.']),
  nonNegotiables: la(['Không xoay mạnh vào áp lực cổ.', 'Không đứng khi chin strap sâu.', 'Không bỏ wrist control trước khi head line thoát.'], ['Do not rotate hard into neck pressure.', 'Do not stand with a deep chin strap.', 'Do not release wrist control before head line clears.'], ['Ne pas tourner fort contre pression cou.', 'Ne pas stand avec chin strap profond.', 'Ne pas lâcher wrist control avant sortie tête.']),
  commonMechanicalErrors: la(['Nhìn xuống mat.', 'Cằm ngửa.', 'Peel bằng tay thẳng.', 'Knees kéo dài sau hips.', 'Blind spin dưới chest.', 'Bỏ wrist control quá sớm.'], ['Looking at the mat.', 'Chin lifted.', 'Peeling with straight arms.', 'Knees stretched behind hips.', 'Blind spinning under chest.', 'Releasing wrist control too early.'], ['Regarder tapis.', 'Menton levé.', 'Peel bras tendus.', 'Genoux loin derrière hanches.', 'Spin aveugle sous poitrine.', 'Lâcher wrist trop tôt.']),
  correctionCues: la(['Cằm vào sternum.', 'Hai tay vào choking wrist.', 'Knees dưới hips.', 'Head ra ngoài shoulder line.', 'Circle bằng hips.'], ['Chin to sternum.', 'Both hands to choking wrist.', 'Knees under hips.', 'Head outside shoulder line.', 'Circle with hips.'], ['Menton au sternum.', 'Deux mains au choking wrist.', 'Genoux sous hanches.', 'Tête hors shoulder line.', 'Circle avec hanches.']),
  safetyNotes: la(['Tap sớm nếu cổ, airway hoặc spine bị ép.', 'Tập dưới giám sát có chuyên môn, nhất là guillotine và neck crank defense.', 'Không xoay cổ mạnh để thoát front headlock.', 'Không tập áp lực cổ nguy hiểm một mình.'], ['Tap early if neck, airway, or spine is pressured.', 'Train under qualified supervision, especially guillotine and neck crank defense.', 'Do not rotate the neck hard to escape front headlock.', 'Do not train dangerous neck pressure alone.'], ['Taper tôt si cou, respiration ou colonne sous pression.', 'S’entraîner sous supervision qualifiée, surtout guillotine et neck crank defense.', 'Ne pas tourner fort le cou pour sortir front headlock.', 'Ne pas travailler pression cou dangereuse seul.']),
})

const backControlMechanics = (): BodyMechanicsSystem => ({
  overview: lt(
    'Back Control là hệ thống giữ chest-to-back, thắng hand fight và tạo dilemma giữa choke, arm trap, mount transition hoặc mat return. Kiểm soát lưng không chỉ là có hooks; đó là quản lý shoulder line, hip line và cổ của đối thủ theo thứ tự an toàn.',
    'Back Control is a system for keeping chest-to-back connection, winning the hand fight, and creating dilemmas between choke, arm trap, mount transition, or mat return. Back control is not just hooks; it is ordered management of shoulder line, hip line, and neck safety.',
    'Le back control garde chest-to-back, gagne le hand fight et crée dilemme choke, arm trap, transition mount ou mat return. Ce n’est pas seulement des hooks; c’est gérer shoulder line, hip line et sécurité du cou.',
  ),
  attackerGoal: lt('Attacker muốn chest-to-back không đứt, seatbelt kín, hooks/body triangle kiểm soát hip line và hand fighting mở cổ mà không crank.', 'Attacker wants unbroken chest-to-back, tight seatbelt, hooks or body triangle controlling hip line, and hand fighting that opens the neck without cranking.', 'L’attaquant veut chest-to-back continu, seatbelt serré, hooks/body triangle sur hip line et hand fighting qui ouvre le cou sans crank.'),
  defenderGoal: lt('Defender muốn thắng two-on-one, đặt shoulder xuống mat, clear hook nguy hiểm và quay về guard hoặc top.', 'Defender wants two-on-one hand control, one shoulder to the mat, dangerous hook cleared, and a turn back to guard or top.', 'Le défenseur veut two-on-one, une épaule au tapis, clear hook dangereux et retour garde ou top.'),
  phases: [
    targetPhase('back-seatbelt', lt('Seatbelt và chest-to-back', 'Seatbelt and chest-to-back', 'Seatbelt et chest-to-back'), lt('Gắn sternum vào lưng và khóa shoulder line trước khi săn choke.', 'Attach sternum to the back and lock shoulder line before hunting the choke.', 'Coller sternum au dos et verrouiller shoulder line avant chercher choke.'), 'attacker', [
      conciseInstruction('chest', 'attacker', 'pressure', lt('Chest dán giữa hai shoulder blades, không nằm lệch quá cao lên cổ. Sternum giữ họ không xoay vai xuống mat.', 'Chest sticks between the shoulder blades, not too high on the neck. Sternum stops them rotating a shoulder to the mat.', 'Poitrine entre omoplates, pas trop haute sur cou. Sternum empêche rotation épaule au tapis.'), lt('Chest-to-back là connection chính; hooks chỉ giữ hip line.', 'Chest-to-back is the primary connection; hooks only manage hip line.', 'Chest-to-back est connexion principale; hooks gèrent hip line.')),
      conciseInstruction('head', 'attacker', 'alignment', lt('Đầu ở cạnh đầu họ, thường về phía choking arm, tai gần thái dương hoặc shoulder line. Không đưa đầu qua centerline để họ ép xuống mat.', 'Head stays beside their head, often on the choking-arm side, ear near temple or shoulder line. Do not cross centerline where they can pin it to the mat.', 'Tête à côté de la sienne, souvent côté choking arm, oreille près tempe/shoulder line. Ne pas traverser centerline où il peut la clouer au tapis.'), lt('Head placement chặn shoulder rotation và bảo vệ bạn khỏi bị escape về phía choking arm.', 'Head placement blocks shoulder rotation and protects against escape toward the choking-arm side.', 'Head placement bloque rotation épaule et protège contre sortie côté choking arm.')),
      conciseInstruction('hands', 'attacker', 'grip', lt('Seatbelt có một tay qua vai, một tay dưới nách; hand choking ẩn sau hand control, không thò cổ tay trần vào two-on-one.', 'Seatbelt has one arm over shoulder, one under armpit; the choking hand hides behind hand control, not exposed naked to two-on-one.', 'Seatbelt: un bras par-dessus épaule, un sous aisselle; main de choke cachée derrière hand control, pas exposée au two-on-one.'), lt('Grip kín làm defender phải chọn bảo vệ cổ hoặc clear hooks.', 'A hidden grip makes the defender choose between neck defense and hook clearing.', 'Grip caché force choix défense cou ou clear hooks.')),
      conciseInstruction('elbows', 'attacker', 'inside_position', lt('Elbow của choking arm đi về centerline ngực họ; elbow dưới nách kẹp ribs, không flare.', 'Choking-arm elbow tracks their chest centerline; under-arm elbow clamps ribs without flaring.', 'Coude choking arm vers centerline poitrine; coude sous aisselle clamp côtes sans ouvrir.'), lt('Elbows đóng giữ shoulder line và làm arm trap/choke cùng một hệ.', 'Closed elbows keep shoulder line and make arm trap and choke part of one system.', 'Coudes fermés gardent shoulder line et lient arm trap/choke.')),
      conciseInstruction('shoulders', 'attacker', 'alignment', lt('Shoulders song song sau shoulders của họ; không ngả ra sau kéo bằng biceps. Áp lực đến từ chest và lats.', 'Shoulders stay parallel behind their shoulders; do not lean back and pull with biceps. Pressure comes from chest and lats.', 'Épaules parallèles derrière les siennes; ne pas tirer en arrière aux biceps. Pression vient poitrine et dorsaux.'), lt('Shoulder alignment giữ bạn attached khi họ bridge hoặc slide.', 'Shoulder alignment keeps you attached when they bridge or slide.', 'Alignement épaules garde attachement quand il bridge ou slide.')),
    ], la(['Sternum dán giữa shoulder blades', 'Seatbelt kín', 'Đầu không qua centerline'], ['Sternum glued between shoulder blades', 'Seatbelt is hidden', 'Head does not cross centerline'], ['Sternum entre omoplates', 'Seatbelt caché', 'Tête pas au-delà centerline']), la(['Chest rời lưng', 'Hand choking bị two-on-one', 'Đầu bị ép xuống mat'], ['Chest disconnects from back', 'Choking hand caught two-on-one', 'Head pinned to mat'], ['Poitrine déconnectée du dos', 'Main choke prise two-on-one', 'Tête clouée tapis']), la(['Họ không đặt shoulder xuống mat', 'Bạn thở được và hand fight có thứ tự', 'Hooks vẫn active'], ['They cannot put shoulder to mat', 'You can breathe and hand fight in order', 'Hooks stay active'], ['Il ne met pas épaule au tapis', 'Vous respirez et hand fight en ordre', 'Hooks actifs'])),
    targetPhase('back-hip-hooks', lt('Hooks, hips và hip line', 'Hooks, hips, and hip line', 'Hooks, hanches et hip line'), lt('Dùng hips, knees và feet để điều khiển hướng escape mà không bóp chân chết.', 'Use hips, knees, and feet to direct escape routes without dead squeezing the legs.', 'Utiliser hanches, genoux et pieds pour diriger sorties sans serrer jambes mortes.'), 'attacker', [
      conciseInstruction('hips', 'attacker', 'weight_distribution', lt('Hips dán vào sacrum/hip line của họ. Nếu họ trượt xuống, hips đi theo trước khi tay kéo choke.', 'Hips stick to their sacrum and hip line. If they slide down, hips follow before the hands pull choke.', 'Hanches collées sacrum/hip line. S’il glisse, les hanches suivent avant tirer choke.'), lt('Hip connection giữ hooks không bị kéo dài và giữ chest-to-back sống.', 'Hip connection keeps hooks from stretching out and keeps chest-to-back alive.', 'Connexion hanches empêche hooks allongés et garde chest-to-back.')),
      conciseInstruction('knees', 'attacker', 'wedge', lt('Knees ép nhẹ vào hai bên hip line như wedges; không mở quá rộng để họ đưa lưng xuống mat.', 'Knees pinch lightly around hip line as wedges; do not open wide enough for them to put back to the mat.', 'Genoux pincent léger autour hip line comme wedges; pas trop ouverts pour permettre dos au tapis.'), lt('Knee wedges định hướng họ phải escape qua hand fight trước.', 'Knee wedges force them to address the hand fight before escaping hips.', 'Wedges genoux forcent hand fight avant sortie hanches.')),
      conciseInstruction('feet', 'attacker', 'hook', lt('Feet làm hooks active bằng instep/heel, không bắt chéo feet trước hông. Nếu body triangle, khóa có kiểm soát và chú ý knee safety.', 'Feet create active hooks with instep and heel; do not cross feet in front of hips. If body triangle is used, lock with control and respect knee safety.', 'Pieds hooks actifs par cou-de-pied/talon; ne pas croiser pieds devant hanches. Si body triangle, verrou contrôlé et sécurité genou.'), lt('Feet sai cho defender ankle lock hoặc clear hook miễn phí.', 'Bad feet give the defender ankle locks or free hook clears.', 'Mauvais pieds donnent ankle lock ou clear hook gratuit.')),
      conciseInstruction('heels', 'attacker', 'hook', lt('Heels kéo nhẹ về mông họ để giữ hip connection; heel không móc quá sâu khiến knee của bạn bị torque.', 'Heels pull lightly toward their hips to keep connection; the heel does not hook so deep that your knee is torqued.', 'Talons tirent léger vers hanches pour connexion; talon pas trop profond qui tord votre genou.'), lt('Heel tension giữ họ gần mà không cần squeeze đùi quá mức.', 'Heel tension keeps them close without excessive thigh squeezing.', 'Tension talon garde proche sans squeeze cuisses excessif.')),
      conciseInstruction('toes', 'attacker', 'mobility', lt('Toes active để đổi hook: một hook giữ, hook kia có thể reinsert, trap arm hoặc chuyển mount.', 'Toes stay active to switch hooks: one hook holds while the other can reinsert, trap an arm, or transition to mount.', 'Orteils actifs pour changer hooks: un garde, l’autre reinsert, trap arm ou transition mount.'), lt('Active toes làm retention nhanh khi defender clear một chân.', 'Active toes make retention fast when the defender clears one leg.', 'Orteils actifs rendent retention rapide quand il clear une jambe.')),
    ], la(['Hips dán hip line', 'Knees là wedges', 'Feet không bắt chéo nguy hiểm'], ['Hips glued to hip line', 'Knees act as wedges', 'Feet are not crossed dangerously'], ['Hanches collées hip line', 'Genoux wedges', 'Pieds pas croisés dangereux']), la(['Hooks duỗi thẳng', 'Knees mở rộng', 'Feet bị ankle lock'], ['Hooks stretched straight', 'Knees open wide', 'Feet caught in ankle lock'], ['Hooks tendus', 'Genoux ouverts', 'Pieds pris ankle lock']), la(['Defender không trượt xuống tự do', 'Bạn đổi hook được', 'Hip line của họ quay theo bạn'], ['Defender cannot slide freely', 'You can switch hooks', 'Their hip line turns with you'], ['Défenseur ne glisse pas librement', 'Vous changez hooks', 'Sa hip line tourne avec vous'])),
    targetPhase('back-handfight', lt('Hand fight và dilemma cổ', 'Hand fight and neck dilemma', 'Hand fight et dilemme du cou'), lt('Mở đường vào cổ bằng kiểm soát tay có thứ tự, không crank hàm hoặc cổ.', 'Open the neck with ordered hand control, not jaw or neck cranking.', 'Ouvrir le cou par contrôle des mains ordonné, pas crank mâchoire/cou.'), 'attacker', [
      conciseInstruction('wrists', 'attacker', 'grip', lt('Wrists thẳng khi hand fight; choking wrist ẩn sau tay còn lại đến khi có đường dưới cằm.', 'Wrists stay straight during hand fighting; choking wrist hides behind the other hand until there is a path under the chin.', 'Poignets droits en hand fight; choking wrist caché derrière autre main jusqu’au chemin sous menton.'), lt('Wrist thẳng khó bị peel và giữ lực kết nối qua elbow.', 'Straight wrists are harder to peel and keep force connected through the elbow.', 'Poignets droits plus difficiles à peel et force connectée au coude.')),
      conciseInstruction('forearms', 'attacker', 'lever', lt('Forearm không cưa ngang mặt. Nó đi như wedge dưới chin khi cổ mở, hoặc làm lever kéo hand defense xuống.', 'Forearm does not saw across the face. It wedges under chin when the neck opens, or acts as a lever to pull hand defense down.', 'Avant-bras ne scie pas visage. Il wedge sous menton quand cou s’ouvre, ou levier pour descendre défense main.'), lt('Forearm đúng tạo choke path mà không cần áp lực thô vào hàm.', 'Correct forearm work creates a choke path without crude jaw pressure.', 'Bon forearm crée chemin choke sans pression brute sur mâchoire.')),
      conciseInstruction('biceps', 'attacker', 'finishing_mechanic', lt('Biceps của choking arm đóng vào một bên cổ chỉ khi cổ đã mở; biceps không kéo đầu ra sau.', 'The choking-arm biceps closes on one side of the neck only after the neck opens; the biceps does not pull the head backward.', 'Biceps du bras choke ferme un côté du cou seulement quand le cou ouvre; ne tire pas tête en arrière.'), lt('Biceps alignment giúp strangle sạch và giảm neck crank.', 'Biceps alignment creates a cleaner strangle and reduces neck crank.', 'Alignement biceps crée strangulation propre et réduit neck crank.')),
      conciseInstruction('hands', 'attacker', 'grip', lt('Nếu họ thắng two-on-one, đổi sang arm trap hoặc short choke threat thay vì giật tay ra. Tay gần hips có thể đẩy wrist họ xuống hook.', 'If they win two-on-one, switch to arm trap or short-choke threat instead of yanking the hand out. The hip-side hand can push their wrist down to a hook.', 'S’il gagne two-on-one, passer arm trap ou short choke au lieu d’arracher main. Main côté hanche pousse wrist vers hook.'), lt('Dilemma đến từ branch, không từ kéo mạnh hơn.', 'The dilemma comes from branching, not pulling harder.', 'Le dilemme vient des branches, pas tirer plus fort.')),
      conciseInstruction('eyes', 'attacker', 'alignment', lt('Mắt nhìn hand fight và far shoulder, không nhìn mỗi cổ. Nếu far shoulder trượt xuống mat, retention ưu tiên hơn finish.', 'Eyes watch the hand fight and far shoulder, not only the neck. If far shoulder slides to mat, retention matters more than finishing.', 'Yeux sur hand fight et épaule loin, pas seulement cou. Si far shoulder glisse au tapis, retention avant finish.'), lt('Gaze đúng cho biết khi nào attack, khi nào giữ lưng.', 'Correct gaze tells when to attack and when to retain the back.', 'Bon regard dit quand attaquer et quand retenir le dos.')),
    ], la(['Wrist choking ẩn', 'Forearm không crank mặt', 'Mắt thấy far shoulder'], ['Choking wrist hidden', 'Forearm is not cranking the face', 'Eyes see far shoulder'], ['Choking wrist caché', 'Forearm ne crank pas visage', 'Yeux voient far shoulder']), la(['Giật tay khỏi two-on-one', 'Forearm cưa mặt', 'Không thấy shoulder escape'], ['Yanking hand from two-on-one', 'Forearm sawing the face', 'Missing shoulder escape'], ['Arracher main du two-on-one', 'Forearm scie visage', 'Rater shoulder escape']), la(['Defender phải chọn cổ hoặc arm trap', 'Bạn giữ chest-to-back', 'Choke path mở dưới cằm'], ['Defender must choose neck or arm trap', 'You keep chest-to-back', 'Choke path opens under chin'], ['Défenseur choisit cou ou arm trap', 'Vous gardez chest-to-back', 'Chemin choke sous menton'])),
    targetPhase('back-retention-transition', lt('Retention và transition', 'Retention and transition', 'Retention et transition'), lt('Khi defender clear hook hoặc đặt shoulder xuống, chuyển hooks, mount transition hoặc mat return thay vì bám choke.', 'When the defender clears a hook or gets a shoulder to the mat, switch hooks, transition to mount, or mat return instead of clinging to choke.', 'Quand défenseur clear hook ou met épaule au tapis, changer hooks, transition mount ou mat return au lieu de s’accrocher au choke.'), 'attacker', [
      conciseInstruction('head', 'attacker', 'post', lt('Head follows escape side as a post against shoulder rotation. Nếu họ quay về choking arm, đầu bạn chặn đường shoulder xuống mat.', 'Head follows the escape side as a post against shoulder rotation. If they turn toward the choking arm, your head blocks the shoulder path to the mat.', 'Tête suit côté escape comme post contre rotation épaule. S’il tourne côté choking arm, votre tête bloque épaule au tapis.'), lt('Head post mua thời gian để reinsert hook.', 'The head post buys time to reinsert a hook.', 'Le post de tête donne temps pour remettre hook.')),
      conciseInstruction('chest', 'attacker', 'pressure', lt('Chest không nổi lên khi đổi hook. Sternum trượt theo spine của họ như một miếng dán.', 'Chest does not float while switching hooks. Sternum slides along their spine like a sticker.', 'Poitrine ne flotte pas pendant changement hook. Sternum glisse le long colonne comme autocollant.'), lt('Chest floating là khoảnh khắc defender quay vào guard.', 'Floating chest is the moment the defender turns into guard.', 'Poitrine flottante donne retour guard.')),
      conciseInstruction('knees', 'attacker', 'transition_mechanic', lt('Knee gần reinsert vào hip line; knee xa có thể bước qua mount nếu họ đưa lưng xuống mat.', 'Near knee reinserts into hip line; far knee can step over to mount if they put back to the mat.', 'Genou proche reinsert hip line; genou loin peut passer mount s’il met dos au tapis.'), lt('Knees quyết định bạn giữ back hay đổi sang mount đúng lúc.', 'Knees decide whether you retain back or switch to mount at the right time.', 'Genoux décident garder back ou transition mount au bon moment.')),
      conciseInstruction('hands', 'attacker', 'transition_mechanic', lt('Hands chuyển từ choke grip sang seatbelt/mat return khi họ đứng. Không kéo cổ khi họ đang tải trọng lên chân.', 'Hands switch from choke grip to seatbelt or mat return when they stand. Do not pull the neck while they are loading weight onto feet.', 'Mains passent choke grip à seatbelt/mat return quand il se lève. Ne pas tirer cou quand poids sur pieds.'), lt('Transition grip bảo vệ cổ đối thủ và giữ kiểm soát.', 'Transition grips protect the opponent’s neck and keep control.', 'Grip transition protège cou adverse et garde contrôle.')),
      conciseInstruction('pelvis', 'attacker', 'weight_distribution', lt('Pelvis đi sát theo hips của defender. Nếu hips bạn rơi xa, hooks thành kéo chân và chest-to-back đứt.', 'Pelvis follows the defender’s hips closely. If your hips fall away, hooks become leg pulling and chest-to-back breaks.', 'Pelvis suit hanches du défenseur. Si vos hanches s’éloignent, hooks deviennent traction jambes et chest-to-back casse.'), lt('Pelvis connection là cầu giữa hooks và upper-body control.', 'Pelvis connection bridges hooks and upper-body control.', 'Connexion pelvis relie hooks et contrôle haut du corps.')),
    ], la(['Chest không nổi', 'Hook được reinsert hoặc mount mở', 'Head chặn shoulder escape'], ['Chest does not float', 'Hook reinserts or mount opens', 'Head blocks shoulder escape'], ['Poitrine ne flotte pas', 'Hook reinsert ou mount ouvert', 'Tête bloque shoulder escape']), la(['Bám choke khi mất hook', 'Hips rơi xa', 'Defender đặt shoulder xuống mat'], ['Clinging to choke after losing hook', 'Hips fall away', 'Defender puts shoulder to mat'], ['S’accrocher au choke sans hook', 'Hanches éloignées', 'Défenseur met épaule au tapis']), la(['Bạn giữ back hoặc mount', 'Defender không quay vào guard', 'Hand fight reset có thứ tự'], ['You keep back or mount', 'Defender cannot turn into guard', 'Hand fight resets in order'], ['Vous gardez back ou mount', 'Défenseur ne revient pas guard', 'Hand fight reset en ordre'])),
  ],
  globalPrinciples: la(['Chest-to-back trước choke.', 'Hooks quản lý hip line, không thay thế sternum connection.', 'Hand fight tạo dilemma: cổ, arm trap, mount hoặc mat return.', 'Head post chặn shoulder escape.', 'Finish phải sạch và có kiểm soát, không crank cổ.'], ['Chest-to-back before choke.', 'Hooks manage hip line, not replace sternum connection.', 'Hand fighting creates dilemmas: neck, arm trap, mount, or mat return.', 'Head post blocks shoulder escape.', 'Finishes must be clean and controlled, not neck cranks.'], ['Chest-to-back avant choke.', 'Hooks gèrent hip line, ne remplacent pas sternum connection.', 'Hand fight crée dilemmes: cou, arm trap, mount ou mat return.', 'Head post bloque shoulder escape.', 'Finish propre et contrôlé, pas neck crank.']),
  nonNegotiables: la(['Không kéo cổ khi chest-to-back đã mất.', 'Không bắt chéo feet trước hông đối thủ.', 'Không crank hàm/cổ để thay thế choke mechanics.'], ['Do not pull the neck after chest-to-back is lost.', 'Do not cross feet in front of the opponent’s hips.', 'Do not crank jaw or neck as a substitute for choke mechanics.'], ['Ne pas tirer cou après perte chest-to-back.', 'Ne pas croiser pieds devant hanches adverses.', 'Ne pas crank mâchoire/cou à la place des mécaniques choke.']),
  commonMechanicalErrors: la(['Chest nổi khỏi lưng.', 'Hooks duỗi chết.', 'Feet bắt chéo nguy hiểm.', 'Choking hand bị two-on-one sớm.', 'Bám choke khi defender đã đặt shoulder xuống mat.', 'Crank cổ thay vì mở đường dưới cằm.'], ['Chest floating off the back.', 'Hooks stretched and dead.', 'Feet crossed dangerously.', 'Choking hand exposed to early two-on-one.', 'Clinging to choke after shoulder hits the mat.', 'Cranking the neck instead of opening under the chin.'], ['Poitrine flotte hors dos.', 'Hooks tendus morts.', 'Pieds croisés dangereux.', 'Main choke exposée two-on-one tôt.', 'S’accrocher au choke après épaule au tapis.', 'Crank cou au lieu d’ouvrir sous menton.']),
  correctionCues: la(['Sternum dán lưng.', 'Đầu chặn shoulder escape.', 'Knees là wedges.', 'Ẩn choking wrist.', 'Mất hook thì reinsert hoặc mount.'], ['Sternum glued to back.', 'Head blocks shoulder escape.', 'Knees are wedges.', 'Hide the choking wrist.', 'Lost hook means reinsert or mount.'], ['Sternum collé dos.', 'Tête bloque shoulder escape.', 'Genoux wedges.', 'Cacher choking wrist.', 'Hook perdu: reinsert ou mount.']),
  safetyNotes: la(['Không crank cổ hoặc hàm trong training.', 'Tap sớm khi bị strangle hoặc neck pressure.', 'Tập hand fight và choke finish dưới giám sát có chuyên môn.', 'Body triangle và hooks phải có kiểm soát để bảo vệ knees/ankles.'], ['Do not crank the neck or jaw in training.', 'Tap early to strangles or neck pressure.', 'Train hand fighting and choke finishes under qualified supervision.', 'Use body triangle and hooks with control to protect knees and ankles.'], ['Ne pas crank cou ou mâchoire en training.', 'Taper tôt sur strangle ou pression cou.', 'Travailler hand fight et choke finish sous supervision qualifiée.', 'Body triangle/hooks avec contrôle pour protéger genoux/chevilles.']),
})

const targetedBodyMechanicsSystemFor = (seedValue: SkillSeed): BodyMechanicsSystem | undefined => {
  switch (seedValue.id) {
    case 'bodylock-passing':
      return bodylockPassingMechanics()
    case 'seated-guard-retention':
      return seatedGuardRetentionMechanics()
    case 'half-guard-wrestle-up':
      return halfGuardWrestleUpMechanics()
    case 'front-headlock-defense':
      return frontHeadlockDefenseMechanics()
    case 'back-control':
      return backControlMechanics()
    default:
      return undefined
  }
}

const ifThen = (
  id: string,
  priority: IfThenDecision['priority'],
  ifCondition: LocalizedText,
  bodySignal: LocalizedText,
  thenAction: LocalizedText,
  why: LocalizedText,
  commonMistake: LocalizedText,
  correctionCue: LocalizedText,
  nextSkillIds: string[],
): IfThenDecision => ({
  id,
  priority,
  ifCondition,
  bodySignal,
  thenAction,
  why,
  commonMistake,
  correctionCue,
  nextSkillIds,
})

const targetedIfThenDecisions: Record<string, IfThenDecision[]> = {
  'bodylock-passing': [
    ifThen('bodylock-head-frame', 'prevent', lt('Nếu bottom player frame vào cổ hoặc vai bạn.', 'If the bottom player frames your neck or shoulder.', 'Si le bottom frame votre cou ou épaule.'), lt('Đầu bạn nằm giữa hai tay, chest leo cao, và vai bị kéo lên khỏi hip line.', 'Your head is between both hands, chest has climbed high, and shoulder is being lifted off the hip line.', 'Votre tête est entre ses mains, poitrine trop haute, épaule tirée hors hip line.'), lt('Hạ đầu lệch về một hip, đưa tai gần hông, rồi nối lại chest-to-hip trước khi peel frame.', 'Lower the head off-center toward one hip, bring ear near the hip, then reconnect chest-to-hip before peeling the frame.', 'Baisser la tête décalée vers une hanche, oreille près hanche, puis reconnecter chest-to-hip avant peel frame.'), lt('Head offset biến đầu thành wedge và làm shoulder crunch yếu đi.', 'The offset head becomes a wedge and weakens shoulder crunch.', 'La tête décalée devient wedge et affaiblit shoulder crunch.'), lt('Đẩy frame bằng tay thẳng trong khi đầu vẫn ở centerline.', 'Pushing the frame with straight arms while the head stays on centerline.', 'Pousser le frame bras tendus pendant que la tête reste centerline.'), lt('Tai tới hip trước, tay xử lý sau.', 'Ear to hip first, hands solve second.', 'Oreille vers hip d’abord, mains ensuite.'), ['inside-position', 'frames-pummeling']),
    ifThen('bodylock-butterfly-lift', 'control', lt('Nếu butterfly hook bắt đầu nâng hông bạn.', 'If the butterfly hook starts lifting your hips.', 'Si le butterfly hook commence à lever vos hanches.'), lt('Hông bạn nhẹ, gối gần bị kéo lên, toes mất bám mat.', 'Your hips feel light, near knee is lifted, and toes lose mat connection.', 'Vos hanches deviennent légères, genou proche monte, orteils perdent le tapis.'), lt('Mở base, cắm toes, dùng forearm và chest gập shin frame xuống trước khi bước qua.', 'Widen base, dig toes into the mat, and use forearm plus chest to fold the shin frame before stepping over.', 'Élargir base, planter orteils, utiliser forearm et poitrine pour plier shin frame avant passer.'), lt('Bạn phải giết khả năng elevation trước khi pass line có ý nghĩa.', 'You must kill elevation before the pass line matters.', 'Il faut tuer l’élévation avant que la pass line compte.'), lt('Khóa bodylock chặt hơn nhưng để hook còn sống.', 'Locking the bodylock tighter while the hook stays alive.', 'Serrer bodylock plus fort avec hook encore vivant.'), lt('Shin chết rồi mới clear knee line.', 'Dead shin, then clear knee line.', 'Shin mort, puis passer knee line.'), ['headquarters-passing', 'knee-cut-passing']),
    ifThen('bodylock-inside-knee', 'prevent', lt('Nếu họ pummel inside knee vào giữa bạn và hông họ.', 'If they pummel an inside knee between you and their hips.', 'S’il pummel inside knee entre vous et ses hanches.'), lt('Bạn cảm thấy knee shield mọc lại dưới sternum hoặc elbow của bạn bị đẩy ra ngoài.', 'You feel the knee shield rebuilding under your sternum or your elbow being pushed outside.', 'Vous sentez knee shield revenir sous sternum ou votre coude poussé dehors.'), lt('Dừng drive, đóng elbows vào hip line, windshield gối xa và clear knee line theo từng layer.', 'Stop driving, close elbows to hip line, windshield the far knee, and clear knee line layer by layer.', 'Arrêter drive, fermer coudes sur hip line, windshield genou loin et clear knee line couche par couche.'), lt('Inside knee là cấu trúc chính giúp bottom player xoay hông lại vào guard.', 'The inside knee is the main structure that lets the bottom player rotate hips back into guard.', 'Inside knee est la structure qui lui rend rotation de hanches vers guard.'), lt('Đè thẳng qua knee shield và làm hông bạn cao.', 'Driving straight through the knee shield and raising your hips.', 'Forcer droit à travers knee shield et monter hanches.'), lt('Elbows về hip line, clear từng layer.', 'Elbows to hip line, clear one layer at a time.', 'Coudes vers hip line, couche par couche.'), ['knee-cut-passing', 'headquarters-passing']),
    ifThen('bodylock-turn-away', 'advance', lt('Nếu họ turn away để tránh chest-to-hip.', 'If they turn away to avoid chest-to-hip.', 'S’il turn away pour éviter chest-to-hip.'), lt('Far hip quay ra ngoài, near knee rút khỏi bạn, và lưng bắt đầu lộ.', 'Far hip rotates away, near knee withdraws, and the back starts to show.', 'Far hip tourne dehors, genou proche se retire, dos commence à apparaître.'), lt('Theo hip line bằng chest, đổi grip sang hip/seatbelt hoặc leg drag thay vì giữ bodylock cũ.', 'Follow the hip line with chest and switch grip to hip, seatbelt, or leg drag instead of holding the old bodylock.', 'Suivre hip line avec poitrine et passer grip hip, seatbelt ou leg drag au lieu de garder ancien bodylock.'), lt('Turn away mở back exposure nhưng chỉ khi chest đi cùng hips.', 'Turning away exposes the back only if your chest follows their hips.', 'Turn away expose le dos seulement si votre poitrine suit les hanches.'), lt('Bám grip cũ và để chest rời hông.', 'Clinging to the old grip while chest disconnects from hips.', 'S’accrocher à l’ancien grip pendant que poitrine quitte hanches.'), lt('Chest theo hip, branch theo lưng.', 'Chest follows hip, branch follows back.', 'Poitrine suit hip, branche suit dos.'), ['leg-drag-basics', 'back-control']),
    ifThen('bodylock-turn-in', 'control', lt('Nếu họ turn in mạnh để re-guard.', 'If they turn in hard to re-guard.', 'S’il turn in fort pour re-guard.'), lt('Shoulder gần xoay vào bạn, inside knee tìm lại centerline, và hand frame đẩy cổ.', 'Near shoulder rotates into you, inside knee searches centerline, and hand frame pushes the neck.', 'Épaule proche tourne vers vous, inside knee cherche centerline, hand frame pousse cou.'), lt('Đặt shoulder pressure chéo vào near shoulder, underhook/crossface khi knee line đã clear, rồi ổn định side control.', 'Place diagonal shoulder pressure into the near shoulder, underhook or crossface after knee line clears, then stabilize side control.', 'Mettre shoulder pressure diagonale sur near shoulder, underhook/crossface après clear knee line, puis stabiliser side control.'), lt('Bạn tách shoulder line khỏi hip line để re-guard không có trục xoay.', 'You separate shoulder line from hip line so re-guard has no rotation axis.', 'Vous séparez shoulder line et hip line, donc re-guard sans axe.'), lt('Chạy quanh chân nhưng không kiểm soát vai.', 'Running around the legs without controlling shoulders.', 'Courir autour des jambes sans contrôler épaules.'), lt('Vai trước, chân sau.', 'Shoulders first, legs second.', 'Épaules d’abord, jambes ensuite.'), ['side-control-pin', 'mount-control']),
    ifThen('bodylock-shoulder-crunch', 'reset', lt('Nếu shoulder crunch bắt vai bạn lên.', 'If shoulder crunch lifts your shoulder.', 'Si shoulder crunch soulève votre épaule.'), lt('Vai gần bị kéo cao, cổ dài, và đầu bắt đầu bị kẹp giữa arm line của họ.', 'Near shoulder is pulled high, neck lengthens, and head starts getting trapped between their arm line.', 'Épaule proche tirée haute, cou long, tête piégée entre ses bras.'), lt('Ngừng pass, đưa forehead/tai lệch ra ngoài, thu elbow về ribs và reset bodylock hoặc chuyển headquarters.', 'Pause the pass, move forehead or ear off-center, pull elbow to ribs, and reset bodylock or switch to headquarters.', 'Pause pass, décaler front/oreille, ramener coude aux côtes et reset bodylock ou headquarters.'), lt('Reset sớm bảo vệ cổ và shoulder line trước khi họ chuyển guillotine/kimura.', 'Early reset protects neck and shoulder line before they convert to guillotine or kimura.', 'Reset tôt protège cou et shoulder line avant guillotine/kimura.'), lt('Drive thêm vì nghĩ pressure sẽ giải quyết shoulder crunch.', 'Driving harder because you think pressure will solve the shoulder crunch.', 'Driver plus fort en pensant que pression résout shoulder crunch.'), lt('Cổ ngắn, elbow về ribs.', 'Short neck, elbow to ribs.', 'Cou court, coude aux côtes.'), ['front-headlock-defense', 'headquarters-passing']),
    ifThen('bodylock-hip-frame', 'control', lt('Nếu họ frame vào hip để tạo khoảng trống.', 'If they frame your hip to create distance.', 'S’il frame votre hip pour créer espace.'), lt('Bàn tay họ đẩy belt line, hips lùi ra, và chest-to-hip của bạn bắt đầu lỏng.', 'Their hand pushes your belt line, hips slide away, and your chest-to-hip starts loosening.', 'Sa main pousse belt line, hanches reculent, chest-to-hip se relâche.'), lt('Đổi angle sternum chéo qua far hip, peel elbow gần và đi sang side control thay vì kéo thẳng.', 'Change sternum angle diagonally through far hip, peel the near elbow, and move to side control instead of pulling straight.', 'Changer angle sternum en diagonale vers far hip, peel coude proche et aller side control au lieu de tirer droit.'), lt('Frame khỏe khi bạn đẩy thẳng; nó yếu khi áp lực đi chéo qua hip line.', 'The frame is strong when you push straight; it weakens when pressure runs diagonally through hip line.', 'Le frame est fort contre poussée droite; faible contre pression diagonale hip line.'), lt('Kéo tay frame bằng biceps và làm grip bodylock hở.', 'Pulling the framing hand with biceps and opening the bodylock grip.', 'Tirer la main frame aux biceps et ouvrir grip bodylock.'), lt('Đổi góc frame, đừng kéo frame.', 'Change the frame angle; do not pull the frame.', 'Changer angle du frame, ne pas tirer.'), ['side-control-pin', 'inside-position']),
    ifThen('bodylock-underhook-threat', 'prevent', lt('Nếu họ luồn underhook hoặc elbow vào trong bodylock.', 'If they insert an underhook or elbow inside the bodylock.', 'S’il insère underhook ou coude dans bodylock.'), lt('Elbow của họ nằm giữa ribs bạn và hip line của họ; shoulder của họ bắt đầu nâng.', 'Their elbow sits between your ribs and their hip line; their shoulder starts rising.', 'Son coude entre vos côtes et sa hip line; son épaule commence à monter.'), lt('Đóng elbow của bạn, sprawl hông thấp vừa đủ và pummel lại inside line trước khi pass.', 'Close your elbow, sprawl hips just enough, and pummel the inside line back before passing.', 'Fermer votre coude, sprawl hanches juste assez et repummel inside line avant passer.'), lt('Underhook tạo trục cho họ wrestle-up hoặc xoay ra sau bạn.', 'The underhook creates the axis for wrestle-up or rotating behind you.', 'Underhook crée l’axe pour wrestle-up ou rotation derrière vous.'), lt('Cố bước qua khi underhook đã vào sâu.', 'Trying to step over after the underhook is already deep.', 'Essayer de passer quand underhook est déjà profond.'), lt('Pummel trước, pass sau.', 'Pummel first, pass second.', 'Pummel d’abord, passer ensuite.'), ['inside-position', 'half-guard-wrestle-up']),
    ifThen('bodylock-knee-line-cleared', 'advance', lt('Nếu knee line đã clear và hips của họ bị nặng.', 'If the knee line is cleared and their hips are heavy.', 'Si knee line est clear et ses hanches lourdes.'), lt('Hai gối bạn qua line chân, shin frame không còn nâng được, và bottom player quay chậm.', 'Both knees are past the leg line, shin frame no longer lifts, and bottom player turns slowly.', 'Vos deux genoux au-delà line des jambes, shin frame ne lève plus, bottom tourne lentement.'), lt('Đổi từ bodylock sang underhook/crossface, hip block và side control pin trước khi tấn công tiếp.', 'Switch from bodylock to underhook or crossface, hip block, and side-control pin before attacking further.', 'Passer bodylock vers underhook/crossface, hip block et pin side control avant attaquer.'), lt('Pass chỉ tính khi shoulder và hip line bị ổn định, không chỉ khi chân đã qua.', 'The pass counts when shoulder and hip lines are stabilized, not only when legs are cleared.', 'Le pass compte quand shoulder et hip line sont stables, pas seulement jambes passées.'), lt('Nhảy sang submission trước khi pin.', 'Jumping to submission before pinning.', 'Sauter sur soumission avant pin.'), lt('Clear chân xong, pin vai-hông.', 'Legs cleared; pin shoulders and hips.', 'Jambes passées; pin épaules et hanches.'), ['side-control-pin', 'mount-control']),
    ifThen('bodylock-neck-risk', 'survive', lt('Nếu guillotine hoặc neck pressure xuất hiện trong lúc bodylock.', 'If guillotine or neck pressure appears during the bodylock.', 'Si guillotine ou pression cou apparaît pendant bodylock.'), lt('Cằm bị kéo ra, forearm nằm dưới cổ, và bạn phải xoay cổ để tiếp tục pass.', 'Chin is pulled out, forearm is under the neck, and you would need to twist the neck to keep passing.', 'Menton sorti, forearm sous cou, et il faudrait tordre le cou pour continuer.'), lt('Bỏ pass line, bảo vệ choking wrist, thu cổ ngắn và reset posture hoặc thoát ra angle an toàn.', 'Abandon the pass line, control the choking wrist, shorten the neck, and reset posture or exit to a safe angle.', 'Abandonner pass line, contrôler choking wrist, raccourcir cou et reset posture ou sortir angle sûr.'), lt('Cổ an toàn luôn ưu tiên hơn hoàn tất pass.', 'Neck safety always outranks finishing the pass.', 'Sécurité du cou avant finir le pass.'), lt('Cố pass bằng cách xoay cổ qua áp lực.', 'Trying to pass by rotating the neck through pressure.', 'Essayer de passer en tournant cou sous pression.'), lt('Cổ nguy hiểm thì reset.', 'Neck danger means reset.', 'Danger cou veut dire reset.'), ['front-headlock-defense', 'hand-fighting']),
  ],
  'seated-guard-retention': [
    ifThen('seated-snapdown', 'survive', lt('Nếu passer snap đầu bạn xuống.', 'If the passer snaps your head down.', 'Si le passer snap votre tête vers le bas.'), lt('Đầu thấp hơn chest, cằm bắt đầu mở, và tay bạn muốn post dài ra trước.', 'Head drops below chest, chin starts opening, and your hands want to post long in front.', 'Tête sous poitrine, menton s’ouvre, mains veulent long post devant.'), lt('Hai tay vào wrist/bicep, cằm thu, hips lùi một nhịp rồi quay lại seated frame hoặc technical stand-up.', 'Put both hands to wrist or bicep, tuck chin, move hips back one beat, then return to seated frame or technical stand-up.', 'Deux mains sur wrist/biceps, menton rentré, hanches reculent un temps puis retour seated frame ou technical stand-up.'), lt('Bạn giải phóng cổ trước khi rebuild guard layer.', 'You free the neck before rebuilding the guard layer.', 'Vous libérez le cou avant reconstruire la garde.'), lt('Đứng dậy với đầu thấp và cổ dài.', 'Standing with low head and long neck.', 'Se lever tête basse et cou long.'), lt('Cằm thu, tay vào wrist.', 'Chin tucked, hands to wrist.', 'Menton rentré, mains au poignet.'), ['front-headlock-defense', 'technical-stand-up']),
    ifThen('seated-inside-knee-stapled', 'recover', lt('Nếu inside knee bị staple xuống mat.', 'If the inside knee gets stapled to the mat.', 'Si inside knee est staple au tapis.'), lt('Gối trong không chạm elbow, shin không còn chịu lực, và passer bắt đầu đi quanh hip.', 'Inside knee no longer touches elbow, shin stops bearing weight, and passer starts circling the hip.', 'Genou inside ne touche plus coude, shin ne porte plus, passer contourne hip.'), lt('Frame vào shoulder/bicep, hip heist nhỏ và pummel knee-elbow lại trước khi tấn công.', 'Frame shoulder or bicep, make a small hip heist, and pummel knee-elbow back together before attacking.', 'Frame épaule/biceps, petit hip heist, repummel genou-coude avant attaquer.'), lt('Inside knee là cửa giữ hip line không bị vượt.', 'The inside knee is the gate that keeps hip line from being passed.', 'Inside knee est la porte qui empêche passer hip line.'), lt('Đẩy đầu passer trong khi gối vẫn bị staple.', 'Pushing the passer’s head while the knee remains stapled.', 'Pousser la tête du passer pendant que genou reste staple.'), lt('Knee-elbow trước, push sau.', 'Knee-elbow first, push second.', 'Genou-coude d’abord, pousser ensuite.'), ['supine-guard-retention', 'frames-pummeling']),
    ifThen('seated-bodylock-entry', 'prevent', lt('Nếu passer bắt đầu khóa bodylock quanh hông.', 'If the passer starts locking a bodylock around your hips.', 'Si le passer commence bodylock autour de vos hanches.'), lt('Chest của họ áp vào belt line, đầu thấp lệch hông, và tay họ nối dưới hip bones.', 'Their chest connects to your belt line, head is low by the hip, and hands join under hip bones.', 'Sa poitrine connecte belt line, tête basse près hanche, mains sous hanches.'), lt('Đặt shin frame sống, shoulder crunch nhẹ vào vai gần, pummel knee vào giữa và quay hip line ra ngoài.', 'Build a live shin frame, create light shoulder crunch on the near shoulder, pummel knee inside, and rotate hip line out.', 'Créer shin frame vivant, léger shoulder crunch sur épaule proche, pummel knee inside et tourner hip line dehors.'), lt('Bạn phải tạo lại cấu trúc giữa chest của họ và hips của bạn.', 'You must rebuild structure between their chest and your hips.', 'Il faut recréer structure entre sa poitrine et vos hanches.'), lt('Chỉ đẩy đầu và để hông bị khóa.', 'Only pushing the head while hips stay locked.', 'Seulement pousser tête pendant que hanches sont verrouillées.'), lt('Shin giữa chest và hip.', 'Shin between chest and hip.', 'Shin entre poitrine et hip.'), ['half-guard-knee-shield', 'frames-pummeling']),
    ifThen('seated-passer-retreats', 'advance', lt('Nếu passer lùi khỏi range của bạn.', 'If the passer retreats out of your range.', 'Si le passer recule hors range.'), lt('Hands của họ rời khỏi đầu gối, weight về gót, và bạn có khoảng trống trước hips.', 'Their hands leave your knees, weight shifts to heels, and space opens in front of your hips.', 'Ses mains quittent vos genoux, poids vers talons, espace devant hanches.'), lt('Technical stand-up hoặc đứng vào hand fight; đừng ngồi lại chờ họ vào pass lần nữa.', 'Technical stand up or rise into hand fighting; do not stay seated waiting for the next pass.', 'Technical stand-up ou monter en hand fight; ne pas rester assis à attendre prochain pass.'), lt('Khi họ rút, seated guard chuyển thành base đứng an toàn.', 'When they retreat, seated guard becomes a safe standing base.', 'Quand il recule, seated guard devient base debout sûre.'), lt('Scoot theo bằng mông thấp và đầu thấp.', 'Scooting after them with low hips and low head.', 'Scoot après lui avec hanches et tête basses.'), lt('Nếu họ lùi, đứng có cấu trúc.', 'If they retreat, stand with structure.', 'S’il recule, se relever structuré.'), ['technical-stand-up', 'hand-fighting']),
    ifThen('seated-overreaching-hand', 'advance', lt('Nếu passer reach tay quá xa để kéo chân bạn.', 'If the passer reaches too far to pull your leg.', 'Si le passer reach trop loin pour tirer votre jambe.'), lt('Wrist của họ vượt qua knee line, elbow tách khỏi ribs, và weight rơi lên tay.', 'Their wrist crosses your knee line, elbow separates from ribs, and weight falls onto the hand.', 'Son wrist dépasse knee line, coude quitte côtes, poids tombe sur main.'), lt('Kéo wrist/bicep cùng butterfly hoặc shin hook để off-balance, rồi vào shin-to-shin hoặc wrestle-up.', 'Pull wrist or bicep together with butterfly or shin hook to off-balance, then enter shin-to-shin or wrestle-up.', 'Tirer wrist/biceps avec butterfly ou shin hook pour off-balance, puis shin-to-shin ou wrestle-up.'), lt('Elbow tách khỏi ribs biến tay họ thành lever.', 'An elbow separated from ribs turns their arm into a lever.', 'Coude séparé des côtes transforme son bras en levier.'), lt('Kéo tay bằng biceps mà không có hook.', 'Pulling the arm with biceps and no hook.', 'Tirer le bras aux biceps sans hook.'), lt('Hand và hook cùng lúc.', 'Hand and hook together.', 'Main et hook ensemble.'), ['shin-to-shin-entry', 'half-guard-wrestle-up']),
    ifThen('seated-outside-pass', 'recover', lt('Nếu passer đi outside và đẩy chân bạn qua một bên.', 'If the passer goes outside and pushes your leg to one side.', 'Si le passer passe outside et pousse votre jambe sur un côté.'), lt('Cổ chân bị kéo qua centerline, hip line bắt đầu xoay, và shoulder gần muốn chạm mat.', 'Ankle is dragged across centerline, hip line starts rotating, and near shoulder wants to touch the mat.', 'Cheville tirée à travers centerline, hip line tourne, épaule proche veut toucher tapis.'), lt('Square shoulders, pummel inside knee lại và chuyển sang supine retention nếu seated angle mất.', 'Square shoulders, pummel the inside knee back, and switch to supine retention if seated angle is lost.', 'Remettre épaules face, repummel inside knee et passer supine retention si angle seated perdu.'), lt('Bạn giữ shoulder line đối diện để hip line không bị kéo thành leg drag.', 'You keep shoulder line facing so hip line cannot be pulled into leg drag.', 'Vous gardez shoulder line face pour éviter leg drag.'), lt('Quay lưng quá sớm và cho back exposure.', 'Turning the back too early and giving back exposure.', 'Tourner dos trop tôt et donner back exposure.'), lt('Face lại trước khi xoay hông.', 'Face back before rotating hips.', 'Refaire face avant tourner hanches.'), ['supine-guard-retention', 'leg-drag-basics']),
    ifThen('seated-inside-tie-won', 'advance', lt('Nếu bạn thắng inside tie hoặc underhook từ seated.', 'If you win inside tie or underhook from seated.', 'Si vous gagnez inside tie ou underhook depuis seated.'), lt('Đầu bạn cao hơn hông, elbow nối ribs, và shoulder của passer bị nâng nhẹ.', 'Your head is above hips, elbow connects to ribs, and passer shoulder is slightly elevated.', 'Votre tête au-dessus hanches, coude connecté côtes, épaule du passer légèrement levée.'), lt('Hip heist lên khuỷu-gối và chuyển ngay sang wrestle-up hoặc single leg.', 'Hip heist to elbow-knee and immediately convert to wrestle-up or single leg.', 'Hip heist vers coude-genou et convertir tout de suite wrestle-up ou single leg.'), lt('Inside tie tốt tạo đường cho hips lên dưới shoulders.', 'A good inside tie creates the lane for hips to rise under shoulders.', 'Bon inside tie crée la voie pour hanches sous épaules.'), lt('Giữ grip nhưng không nâng hips.', 'Holding the grip without lifting hips.', 'Garder grip sans monter hanches.'), lt('Grip thắng thì hông lên.', 'Win grip, raise hips.', 'Grip gagné, hanches montent.'), ['half-guard-wrestle-up', 'single-leg-bjj']),
    ifThen('seated-both-hands-behind', 'reset', lt('Nếu bạn thấy mình post cả hai tay sau lưng.', 'If you notice both hands posted behind you.', 'Si vous voyez vos deux mains postées derrière.'), lt('Chest ngửa lên, đầu lùi sau hips, và feet không còn hook/frame rõ ràng.', 'Chest opens upward, head falls behind hips, and feet no longer have clear hook or frame jobs.', 'Poitrine ouverte vers haut, tête derrière hanches, pieds sans rôle hook/frame clair.'), lt('Thu tay về trước centerline, đưa một shin hoặc forearm làm frame, rồi reset seated base.', 'Bring hands back in front of centerline, place one shin or forearm as a frame, then reset seated base.', 'Ramener mains devant centerline, placer shin ou forearm comme frame, puis reset seated base.'), lt('Hai tay sau lưng làm hips chết và cổ dễ bị snap.', 'Both hands behind you kill hip mobility and expose the neck to snapdowns.', 'Deux mains derrière tuent mobilité hanches et exposent cou aux snapdowns.'), lt('Đẩy người bằng tay sau thay vì tạo frame trước mặt.', 'Pushing yourself with hands behind instead of building frames in front.', 'Pousser avec mains derrière au lieu de frames devant.'), lt('Tay trước, đầu cao.', 'Hands in front, head high.', 'Mains devant, tête haute.'), ['inside-position', 'technical-stand-up']),
    ifThen('seated-leg-entry-risk', 'survive', lt('Nếu passer ngồi vào ashi garami hoặc kiểm soát heel line.', 'If the passer sits into ashi garami or controls heel line.', 'Si le passer s’assoit en ashi garami ou contrôle heel line.'), lt('Knee line của bạn bắt đầu bị kẹp, heel xoay ra ngoài, và toes không còn tự chỉ hướng an toàn.', 'Your knee line starts getting trapped, heel rotates outward, and toes no longer point safely.', 'Votre knee line commence à être piégée, talon tourne dehors, orteils ne pointent plus sûrement.'), lt('Ẩn heel, thu knee line ra trước khi xoay, hand fight secondary leg và reset guard an toàn.', 'Hide the heel, extract knee line before rotating, hand fight the secondary leg, and reset guard safely.', 'Cacher talon, sortir knee line avant rotation, hand fight jambe secondaire et reset guard sûre.'), lt('Trong leg entanglement, thứ tự là heel an toàn rồi knee line tự do.', 'In leg entanglements, the order is safe heel then free knee line.', 'Dans leg entanglement: talon sûr puis knee line libre.'), lt('Xoay mạnh khi heel đang lộ.', 'Rotating hard while the heel is exposed.', 'Tourner fort avec talon exposé.'), lt('Hide heel, free knee line.', 'Hide heel, free knee line.', 'Cacher talon, libérer knee line.'), ['leg-lock-safety-basics', 'supine-guard-retention']),
    ifThen('seated-pass-stalls', 'control', lt('Nếu passer đứng yên ngoài range và không commit.', 'If the passer stays outside range and refuses to commit.', 'Si le passer reste hors range et refuse commit.'), lt('Họ đổi stance liên tục, tay không vào tie, và bạn không có hook connection.', 'They switch stance repeatedly, hands avoid ties, and you have no hook connection.', 'Il change stance, mains évitent ties, vous n’avez pas hook connection.'), lt('Tạo entry có trách nhiệm: shin-to-shin, technical stand-up, hoặc guard pull lại với grip rõ.', 'Create a responsible entry: shin-to-shin, technical stand-up, or re-pull with clear grips.', 'Créer entrée responsable: shin-to-shin, technical stand-up ou re-pull avec grips clairs.'), lt('Retention không chỉ chờ; nó phải tạo threat khiến passer phản ứng.', 'Retention is not waiting; it must create threats that make the passer react.', 'La rétention n’est pas attente; elle crée menaces qui forcent réaction.'), lt('Scoot theo không có grip và đầu thấp.', 'Scooting forward without grips and with low head.', 'Scoot sans grips et tête basse.'), lt('Entry phải có grip hoặc hook.', 'Entry needs grip or hook.', 'Entrée avec grip ou hook.'), ['shin-to-shin-entry', 'guard-pulling-strategy']),
  ],
  'half-guard-wrestle-up': [
    ifThen('hg-crossface', 'prevent', lt('Nếu top player thắng crossface.', 'If the top player wins crossface.', 'Si le top gagne crossface.'), lt('Mặt bạn bị quay ra xa, shoulder line phẳng, và underhook không còn nâng được vai.', 'Your face is turned away, shoulder line is flat, and underhook no longer lifts the shoulder.', 'Votre visage tourné loin, shoulder line plate, underhook ne lève plus épaule.'), lt('Dừng wrestle-up, frame bicep/collarbone, đưa knee shield lại giữa và lấy lại head position.', 'Pause the wrestle-up, frame bicep or collarbone, bring knee shield back inside, and recover head position.', 'Pause wrestle-up, frame biceps/clavicule, remettre knee shield inside et récupérer head position.'), lt('Crossface tách head position khỏi underhook, nên come-up mất base.', 'Crossface disconnects head position from underhook, so the come-up loses base.', 'Crossface déconnecte head position d’underhook, donc come-up perd base.'), lt('Cố kéo single leg khi mặt bị quay đi.', 'Trying to pull single leg while the face is turned away.', 'Tirer single leg avec visage tourné loin.'), lt('Mặt về họ, rồi mới lên.', 'Face them, then rise.', 'Faire face, puis monter.'), ['half-guard-knee-shield', 'side-control-survival']),
    ifThen('hg-underhook-won', 'advance', lt('Nếu bạn thắng underhook và đầu ở dưới cằm họ.', 'If you win underhook with head under their chin.', 'Si vous gagnez underhook avec tête sous son menton.'), lt('Tai gần ribs, elbow về ribs, và shoulder của top player bị nâng khỏi chest-to-chest.', 'Ear is near ribs, elbow returns to ribs, and top player shoulder lifts away from chest-to-chest.', 'Oreille près côtes, coude aux côtes, épaule du top quitte chest-to-chest.'), lt('Hip heist lên khuỷu-gối, giữ cằm thu, gom near leg dưới knee line.', 'Hip heist to elbow-knee, keep chin tucked, and collect the near leg below knee line.', 'Hip heist vers coude-genou, menton rentré, capter near leg sous knee line.'), lt('Underhook mạnh khi nó nối head position với hips đang lên.', 'The underhook is strong when it connects head position to rising hips.', 'Underhook fort quand il connecte head position aux hanches qui montent.'), lt('Reach underhook cao và quên đưa hips lên.', 'Reaching a high underhook and forgetting to raise hips.', 'Reach underhook haut et oublier hanches.'), lt('Tai vào ribs, hông dưới vai.', 'Ear to ribs, hips under shoulders.', 'Oreille aux côtes, hanches sous épaules.'), ['single-leg-bjj', 'mat-return-basics']),
    ifThen('hg-heavy-whizzer', 'control', lt('Nếu top player đặt whizzer nặng lên underhook.', 'If the top player puts a heavy whizzer on the underhook.', 'Si le top met whizzer lourd sur underhook.'), lt('Vai underhook bị kéo xuống, ribs bị gập, và đầu muốn rơi ra ngoài chân.', 'Underhook shoulder is pulled down, ribs fold, and head wants to fall outside the leg.', 'Épaule underhook tirée bas, côtes pliées, tête veut tomber dehors jambe.'), lt('Giữ head position, đưa elbow về ribs, đổi angle sang single leg thấp hoặc chuyển bodylock nếu họ over-sprawl.', 'Keep head position, return elbow to ribs, change angle to low single leg, or switch bodylock if they over-sprawl.', 'Garder head position, coude aux côtes, changer angle low single ou bodylock s’il over-sprawl.'), lt('Whizzer nặng mở base của họ nếu bạn không để vai bị sập.', 'A heavy whizzer opens their base if you do not let the shoulder collapse.', 'Whizzer lourd ouvre sa base si votre épaule ne s’effondre pas.'), lt('Đẩy lên bằng vai vào whizzer.', 'Trying to lift into the whizzer with the shoulder.', 'Pousser l’épaule contre whizzer.'), lt('Không nâng whizzer; đổi angle.', 'Do not lift the whizzer; change angle.', 'Ne pas lever whizzer; changer angle.'), ['scramble-control', 'bodylock-passing']),
    ifThen('hg-kimura-risk', 'survive', lt('Nếu wrist của bạn bị tách cho kimura.', 'If your wrist is separated for kimura.', 'Si votre wrist est séparé pour kimura.'), lt('Elbow rời ribs, wrist bị kéo qua hip line, và shoulder line bắt đầu xoay.', 'Elbow leaves ribs, wrist is pulled across hip line, and shoulder line starts rotating.', 'Coude quitte côtes, poignet tiré à travers hip line, shoulder line tourne.'), lt('Bỏ underhook cao, kéo elbow về ribs, nắm thigh/hip hoặc pummel lại frame trước khi come-up.', 'Abandon the high underhook, pull elbow to ribs, grab thigh or hip, or pummel back to frame before coming up.', 'Abandonner underhook haut, coude aux côtes, saisir cuisse/hanche ou repummel frame avant come-up.'), lt('Elbow-ribs connection bảo vệ shoulder trước kimura trap.', 'Elbow-to-ribs connection protects the shoulder from kimura trap.', 'Connexion coude-côtes protège épaule du kimura trap.'), lt('Giật tay ra xa làm shoulder càng lộ.', 'Yanking the arm away and exposing the shoulder more.', 'Arracher bras et exposer plus épaule.'), lt('Elbow về ribs trước.', 'Elbow to ribs first.', 'Coude aux côtes d’abord.'), ['kimura-system', 'frames-pummeling']),
    ifThen('hg-guillotine-risk', 'survive', lt('Nếu cổ bị cuốn guillotine khi bạn lên.', 'If the neck gets wrapped for guillotine as you rise.', 'Si le cou est pris guillotine en montant.'), lt('Cằm ngửa, forearm nằm dưới cổ, và đầu nằm ngoài hip line.', 'Chin is lifted, forearm sits under neck, and head is outside hip line.', 'Menton levé, forearm sous cou, tête hors hip line.'), lt('Dừng single leg, hai tay vào choking wrist, cổ ngắn, quay về frame hoặc front headlock defense.', 'Stop the single leg, put both hands to choking wrist, shorten the neck, and return to frame or front headlock defense.', 'Arrêter single leg, deux mains sur choking wrist, cou court, revenir frame ou front headlock defense.'), lt('Không có sweep nào đáng đổi lấy cổ nguy hiểm.', 'No sweep is worth trading for neck danger.', 'Aucun sweep ne vaut un cou dangereux.'), lt('Cố finish single leg bằng cách xoay qua áp lực cổ.', 'Trying to finish the single leg by rotating through neck pressure.', 'Finir single leg en tournant à travers pression cou.'), lt('Cổ nguy hiểm thì bỏ leg.', 'Neck danger means abandon the leg.', 'Danger cou: lâcher la jambe.'), ['front-headlock-defense', 'hand-fighting']),
    ifThen('hg-top-sprawls', 'advance', lt('Nếu top player sprawl hông nặng để phá single leg.', 'If the top player sprawls heavy hips to stop the single leg.', 'Si le top sprawl hanches lourdes pour stopper single leg.'), lt('Hip của họ rơi sau, leg bạn gom nặng xuống, và tay họ phải post hoặc whizzer sâu.', 'Their hips drop back, the collected leg gets heavy, and they must post a hand or deepen whizzer.', 'Ses hanches tombent arrière, jambe captée lourde, il doit post main ou whizzer profond.'), lt('Giữ head-ribs connection, đổi sang bodylock passing, mat return angle hoặc come out the back.', 'Keep head-to-ribs connection and switch to bodylock passing, mat-return angle, or coming out the back.', 'Garder tête-côtes et passer bodylock passing, angle mat return ou sortir derrière.'), lt('Sprawl làm chân khó kéo nhưng thường mở hip/back transition.', 'Sprawl makes the leg hard to pull but often opens hip or back transition.', 'Sprawl rend jambe dure à tirer mais ouvre souvent transition hip/dos.'), lt('Kéo chân bằng tay khi hips bạn rơi lại mat.', 'Pulling the leg with arms while your hips fall back to mat.', 'Tirer jambe aux bras pendant que hanches retombent.'), lt('Sprawl thì branch, không kéo.', 'Sprawl means branch, not pull.', 'Sprawl veut dire branche, pas tirer.'), ['bodylock-passing', 'scramble-control']),
    ifThen('hg-shield-smashed', 'recover', lt('Nếu knee shield bị smash phẳng.', 'If the knee shield gets smashed flat.', 'Si knee shield est écrasé.'), lt('Gối nằm dưới hip line, chest-to-chest đến gần, và inside elbow bị tách khỏi knee.', 'Knee sits below hip line, chest-to-chest closes in, and inside elbow separates from knee.', 'Genou sous hip line, chest-to-chest arrive, coude inside séparé du genou.'), lt('Chuyển sang survival frame, recover knee-elbow hoặc dùng side control escape nếu pass đã xảy ra.', 'Switch to survival frames, recover knee-elbow, or use side-control escape if the pass has happened.', 'Passer frames de survie, recover genou-coude ou side-control escape si pass déjà là.'), lt('Khi shield chết, mục tiêu đổi từ attack sang rebuild structure.', 'When the shield dies, the goal changes from attack to rebuilding structure.', 'Quand shield meurt, objectif passe attaque à reconstruction structure.'), lt('Cố giữ underhook offense dù chest-to-chest đã vào.', 'Keeping underhook offense after chest-to-chest has arrived.', 'Garder offense underhook après chest-to-chest.'), lt('Shield chết thì survive trước.', 'Dead shield means survive first.', 'Shield mort: survivre d’abord.'), ['side-control-survival', 'side-control-escape']),
    ifThen('hg-far-hand-posts', 'advance', lt('Nếu top player phải post far hand để giữ base.', 'If the top player has to post the far hand for base.', 'Si le top doit post far hand pour base.'), lt('Far hand chạm mat, shoulder line tách khỏi hip line, và near leg nhẹ hơn.', 'Far hand touches the mat, shoulder line separates from hip line, and near leg gets lighter.', 'Far hand touche tapis, shoulder line séparée hip line, near leg plus légère.'), lt('Chạy single leg hoặc mat return ngay khi hand còn post; đừng đợi họ lấy lại crossface.', 'Run the single leg or mat return while the hand is still posted; do not wait for crossface to return.', 'Finir single leg ou mat return tant que main post; ne pas attendre retour crossface.'), lt('Posted hand là dấu hiệu base bị chia đôi.', 'A posted hand is the signal that their base is split.', 'Main postée signale base divisée.'), lt('Dừng lại để chỉnh grip đẹp hơn.', 'Stopping to make the grip prettier.', 'S’arrêter pour améliorer grip.'), lt('Hand post là go signal.', 'Posted hand is the go signal.', 'Main postée = signal go.'), ['single-leg-bjj', 'mat-return-basics']),
    ifThen('hg-backstep', 'prevent', lt('Nếu top player backstep để tránh wrestle-up.', 'If the top player backsteps to avoid the wrestle-up.', 'Si le top backstep pour éviter wrestle-up.'), lt('Hip của họ quay qua đầu bạn, knee line đổi hướng, và underhook bắt đầu mất leg access.', 'Their hip rotates over your head, knee line changes direction, and underhook starts losing leg access.', 'Sa hanche tourne au-dessus tête, knee line change, underhook perd accès jambe.'), lt('Giữ elbow-knee connection, theo hip bằng head position, hoặc reset half guard/leg safety trước khi họ settle.', 'Keep elbow-knee connection, follow the hip with head position, or reset half guard and leg safety before they settle.', 'Garder coude-genou, suivre hip avec head position ou reset half/leg safety avant settle.'), lt('Backstep đổi hướng pass; bạn cần đổi hướng frames, không giữ line cũ.', 'Backstep changes the pass direction; you must change frame direction, not hold the old line.', 'Backstep change direction pass; changer direction frames, pas garder ancienne line.'), lt('Bám underhook cũ và để hông bị xoay qua.', 'Holding the old underhook while hips rotate past you.', 'Garder ancien underhook pendant que hanches passent.'), lt('Hip đổi thì frame đổi.', 'When hip changes, frame changes.', 'Hip change, frame change.'), ['half-guard-knee-shield', 'leg-lock-safety-basics']),
    ifThen('hg-near-leg-hidden', 'control', lt('Nếu near leg bị họ giấu khỏi single leg.', 'If they hide the near leg from the single leg.', 'S’il cache near leg du single leg.'), lt('Knee rút ra xa tay bạn, hip square lại, và whizzer bắt đầu kéo vai.', 'Knee withdraws from your hands, hip squares back, and whizzer starts pulling the shoulder.', 'Genou se retire de vos mains, hip resquare, whizzer tire épaule.'), lt('Đổi từ leg collection sang underhook bodylock, come-up to body, hoặc reset knee shield.', 'Switch from leg collection to underhook bodylock, come up to the body, or reset knee shield.', 'Passer leg collection à bodylock underhook, come-up au corps ou reset knee shield.'), lt('Nếu chân biến mất, thân trên vẫn có thể là connection để lên top.', 'If the leg disappears, the upper body can still be the connection to come on top.', 'Si jambe disparaît, haut du corps peut connecter pour monter top.'), lt('Reach xa theo chân và lộ cổ.', 'Reaching far after the leg and exposing the neck.', 'Reach loin après jambe et exposer cou.'), lt('Chân mất thì lấy hip/body.', 'Lost leg means take hip or body.', 'Jambe perdue: prendre hip/body.'), ['bodylock-passing', 'scramble-control']),
  ],
  'front-headlock-defense': [
    ifThen('fhl-chin-strap-deep', 'survive', lt('Nếu chin strap vào sâu dưới cằm.', 'If the chin strap gets deep under the chin.', 'Si chin strap entre profond sous menton.'), lt('Wrist của họ nằm dưới cằm, cằm bị kéo ra khỏi sternum, và bạn khó nói/thở.', 'Their wrist sits under the chin, chin is pulled away from sternum, and talking or breathing is harder.', 'Son wrist sous menton, menton tiré hors sternum, parler/respirer difficile.'), lt('Hai tay vào choking wrist, cằm thu lại, shoulder shrug nhẹ và reset airway trước khi circle.', 'Put both hands to the choking wrist, tuck chin, lightly shrug shoulder, and reset airway before circling.', 'Deux mains sur choking wrist, menton rentré, shoulder shrug léger et reset respiration avant circle.'), lt('Airway an toàn là ưu tiên đầu tiên trong front headlock.', 'A safe airway is the first priority in front headlock.', 'Respiration sûre est priorité numéro un en front headlock.'), lt('Circle ngay khi wrist còn dưới cằm.', 'Circling immediately while the wrist remains under the chin.', 'Circle immédiatement avec wrist encore sous menton.'), lt('Wrist trước, circle sau.', 'Wrist first, circle second.', 'Wrist d’abord, circle ensuite.'), ['hand-fighting', 'front-headlock-defense']),
    ifThen('fhl-guillotine-lock', 'survive', lt('Nếu guillotine lock bắt đầu đóng.', 'If the guillotine lock starts closing.', 'Si le lock guillotine commence à fermer.'), lt('Elbow choking kéo về ribs họ, forearm ép cổ, và neck của bạn bị buộc xoay.', 'Choking elbow pulls to their ribs, forearm pressures the neck, and your neck is forced to rotate.', 'Coude choking vers ses côtes, forearm presse cou, votre cou forcé à tourner.'), lt('Tap/reset nếu áp lực tăng; nếu còn an toàn, kiểm soát wrist, đưa hips dưới shoulders và thoát về phía không choke.', 'Tap or reset if pressure escalates; if still safe, control wrist, bring hips under shoulders, and exit to the non-choking side.', 'Taper/reset si pression monte; si sûr, contrôler wrist, hanches sous épaules et sortir côté non-choke.'), lt('Không xoay cổ qua lực siết; bạn phải giảm lock trước.', 'Do not rotate the neck through the squeeze; you must reduce the lock first.', 'Ne pas tourner cou dans squeeze; réduire le lock d’abord.'), lt('Cố lăn hoặc xoay mạnh để thoát.', 'Trying to roll or twist hard to escape.', 'Rouler ou tordre fort pour sortir.'), lt('Áp lực cổ tăng thì tap sớm.', 'Rising neck pressure means tap early.', 'Pression cou monte: taper tôt.'), ['front-headlock-defense', 'positional-hierarchy']),
    ifThen('fhl-go-behind-circle', 'prevent', lt('Nếu attacker circle ra sau cho go-behind.', 'If the attacker circles behind for a go-behind.', 'Si l’attaquant circle derrière pour go-behind.'), lt('Đầu họ đi qua shoulder line của bạn, hip của họ vòng sang góc, và elbow bạn bị kéo qua centerline.', 'Their head crosses your shoulder line, hips circle to an angle, and your elbow is dragged across centerline.', 'Sa tête traverse shoulder line, hanches circle angle, votre coude drag centerline.'), lt('Square knees dưới hips, giữ elbow về ribs và circle theo họ cho đến khi bạn face lại hoặc recover guard.', 'Square knees under hips, keep elbow to ribs, and circle with them until you face back in or recover guard.', 'Genoux sous hanches, coude aux côtes et circle avec lui jusqu’à refaire face ou recover guard.'), lt('Go-behind thắng khi shoulder line của bạn bị kéo qua hip line.', 'Go-behind wins when your shoulder line is dragged past hip line.', 'Go-behind gagne quand votre shoulder line dépasse hip line.'), lt('Post tay xa dài và cho họ arm drag.', 'Long-posting the far hand and giving arm drag.', 'Long post main loin et donner arm drag.'), lt('Elbow về ribs, knees theo hips.', 'Elbow to ribs, knees follow hips.', 'Coude aux côtes, genoux suivent hanches.'), ['sprawl-go-behind', 'scramble-control']),
    ifThen('fhl-heavy-sprawl', 'recover', lt('Nếu họ sprawl hông nặng lên đầu và vai bạn.', 'If they sprawl heavy hips onto your head and shoulders.', 'S’il sprawl hanches lourdes sur tête et épaules.'), lt('Hips bạn kéo dài ra sau, knees không dưới vai, và forehead bị ép xuống mat.', 'Your hips stretch behind, knees are not under shoulders, and forehead is forced toward the mat.', 'Vos hanches étirées derrière, genoux pas sous épaules, front vers tapis.'), lt('Thu knees dưới hips từng bên, giữ cổ ngắn, dùng forearm frame chống wrist/bicep trước khi đứng.', 'Walk knees under hips one side at a time, keep neck short, and use forearm frame against wrist or bicep before standing.', 'Ramener genoux sous hanches un côté à la fois, cou court, forearm frame sur wrist/biceps avant stand.'), lt('Base phục hồi từ knees và hips, không phải từ việc bật cổ lên.', 'Base returns from knees and hips, not by popping the neck upright.', 'Base revient genoux/hanches, pas en redressant le cou.'), lt('Đẩy cổ lên trước khi knees quay dưới hips.', 'Lifting the neck before knees return under hips.', 'Lever cou avant genoux sous hanches.'), lt('Knees trước, cổ sau.', 'Knees first, neck second.', 'Genoux d’abord, cou ensuite.'), ['front-headlock-defense', 'technical-stand-up']),
    ifThen('fhl-hands-locked', 'survive', lt('Nếu attacker khóa hai tay quanh đầu/tay bạn.', 'If the attacker locks hands around your head and arm.', 'Si l’attaquant verrouille mains autour tête/bras.'), lt('Một arm của bạn bị kẹt với đầu, shoulder bị kéo vào tai, và ribs bắt đầu đóng cứng.', 'One arm is trapped with the head, shoulder is pulled to ear, and ribs start locking stiffly.', 'Un bras piégé avec tête, épaule tirée vers oreille, côtes se bloquent.'), lt('Tạo frame ở bicep/wrist, đưa elbow bị kẹt về ribs, và ưu tiên giải phóng arm line trước khi quay.', 'Frame the bicep or wrist, bring the trapped elbow toward ribs, and free the arm line before turning.', 'Frame biceps/wrist, ramener coude piégé aux côtes et libérer arm line avant tourner.'), lt('Head-and-arm control nguy hiểm khi elbow bị tách khỏi ribs.', 'Head-and-arm control is dangerous when the elbow separates from ribs.', 'Head-and-arm dangereux quand coude quitte côtes.'), lt('Quay người khi arm vẫn bị kẹt.', 'Turning while the arm is still trapped.', 'Tourner avec bras encore piégé.'), lt('Giải phóng elbow trước khi xoay.', 'Free the elbow before rotating.', 'Libérer coude avant rotation.'), ['frames-pummeling', 'front-headlock-defense']),
    ifThen('fhl-darce-line', 'prevent', lt('Nếu họ chuyển sang d’arce/anaconda line.', 'If they switch toward a d’arce or anaconda line.', 'S’il passe vers ligne d’arce/anaconda.'), lt('Bicep của họ đi sâu qua cổ, shoulder bạn bị ép vào cổ, và arm của bạn bị kéo qua centerline.', 'Their bicep travels deep through the neck, your shoulder is compressed into the neck, and your arm is dragged across centerline.', 'Son biceps passe profond au cou, votre épaule compressée dans cou, bras drag centerline.'), lt('Đóng elbow về ribs, đưa shoulder line vuông lại, tạo frame ở hip/bicep và không để họ nối grip sâu.', 'Close elbow to ribs, square shoulder line, frame hip or bicep, and deny the deep grip connection.', 'Fermer coude aux côtes, resquare shoulder line, frame hip/biceps et refuser grip profond.'), lt('Bạn phá choke bằng cách lấy lại elbow-ribs và shoulder alignment.', 'You break the choke line by recovering elbow-to-ribs and shoulder alignment.', 'Vous cassez choke line en récupérant coude-côtes et shoulder alignment.'), lt('Đẩy đầu họ nhưng để arm bị kéo qua.', 'Pushing their head while the arm stays dragged across.', 'Pousser sa tête pendant que bras reste drag.'), lt('Elbow-ribs casse choke line.', 'Elbow-ribs breaks the choke line.', 'Coude-côtes casse choke line.'), ['frames-pummeling', 'positional-hierarchy']),
    ifThen('fhl-wrist-cleared', 'recover', lt('Nếu bạn peel được choking wrist.', 'If you successfully peel the choking wrist.', 'Si vous peelez choking wrist.'), lt('Cằm trở lại sternum, airflow dễ hơn, và elbow của attacker tách khỏi ribs.', 'Chin returns to sternum, airflow improves, and attacker elbow separates from ribs.', 'Menton revient sternum, respiration mieux, coude attaquant quitte côtes.'), lt('Đừng dừng lại; đưa hips dưới shoulders và circle ra ngoài shoulder line ngay khi wrist còn bị kiểm soát.', 'Do not pause; bring hips under shoulders and circle outside shoulder line while the wrist is still controlled.', 'Ne pas pause; hanches sous épaules et circle hors shoulder line tant que wrist contrôlé.'), lt('Peel wrist chỉ mở cửa; hips và angle mới là escape.', 'Peeling the wrist only opens the door; hips and angle create the escape.', 'Peel wrist ouvre porte; hanches et angle font escape.'), lt('Ăn mừng sớm và bỏ wrist control.', 'Celebrating early and releasing wrist control.', 'Célébrer tôt et lâcher wrist.'), lt('Peel xong phải circle.', 'After peel, circle.', 'Après peel, circle.'), ['technical-stand-up', 'hand-fighting']),
    ifThen('fhl-attacker-posts', 'advance', lt('Nếu attacker post tay để giữ balance.', 'If the attacker posts a hand for balance.', 'Si l’attaquant post une main pour balance.'), lt('Một hand rời chin strap/lock, weight rơi về bên đó, và hip line mở cho single leg.', 'One hand leaves chin strap or lock, weight falls to that side, and hip line opens for single leg.', 'Une main quitte chin strap/lock, poids tombe côté-là, hip line ouverte pour single leg.'), lt('Giữ cổ an toàn rồi quay vào leg hoặc bodylock; nếu cổ chưa an toàn, chỉ dùng post đó để thoát.', 'Keep the neck safe, then turn into the leg or bodylock; if neck is not safe, use the post only to escape.', 'Garder cou sûr puis tourner vers jambe/bodylock; si cou pas sûr, utiliser post seulement pour sortir.'), lt('Posted hand chia base của họ và giảm khả năng finish choke.', 'A posted hand splits their base and reduces finishing ability.', 'Main postée divise base et réduit finish choke.'), lt('Attack leg trong khi chin strap còn sâu.', 'Attacking the leg while chin strap is still deep.', 'Attaquer jambe avec chin strap encore profond.'), lt('Cổ an toàn rồi mới counter.', 'Safe neck before counter.', 'Cou sûr avant counter.'), ['single-leg-bjj', 'bodylock-passing']),
    ifThen('fhl-user-posts-long', 'reset', lt('Nếu bạn phải post tay dài phía trước.', 'If you catch yourself long-posting a hand in front.', 'Si vous vous surprenez long post devant.'), lt('Elbow thẳng, shoulder bị kéo xa ribs, và attacker có thể drag arm hoặc go-behind.', 'Elbow is straight, shoulder is pulled away from ribs, and attacker can drag the arm or go behind.', 'Coude droit, épaule loin côtes, attaquant peut drag arm ou go-behind.'), lt('Thu post ngắn dưới shoulder, đưa elbow về ribs và rebuild knees under hips.', 'Shorten the post under shoulder, return elbow to ribs, and rebuild knees under hips.', 'Raccourcir post sous épaule, coude aux côtes et reconstruire genoux sous hanches.'), lt('Post dài là lever cho attacker; post ngắn là base cho bạn.', 'A long post is their lever; a short post is your base.', 'Long post est son levier; post court votre base.'), lt('Để tay dài vì sợ mặt chạm mat.', 'Leaving the hand long because you fear the face touching mat.', 'Laisser main longue par peur du visage au tapis.'), lt('Post ngắn dưới vai.', 'Short post under shoulder.', 'Post court sous épaule.'), ['frames-pummeling', 'front-headlock-defense']),
    ifThen('fhl-airway-compromised', 'survive', lt('Nếu airway, cổ hoặc spine bị ép bất thường.', 'If airway, neck, or spine is pressured unusually.', 'Si respiration, cou ou colonne sous pression anormale.'), lt('Bạn không thở bình thường, cổ bị xoắn, hoặc có áp lực sắc/nhanh vào cổ.', 'You cannot breathe normally, neck is twisted, or there is sharp or fast neck pressure.', 'Vous ne respirez pas normalement, cou tordu, ou pression vive/rapide au cou.'), lt('Tap sớm hoặc dừng reset với partner/coach; không cố chứng minh toughness trong neck attack.', 'Tap early or stop and reset with partner or coach; do not try to prove toughness inside a neck attack.', 'Taper tôt ou arrêter/reset avec partenaire/coach; ne pas prouver dureté dans attaque cou.'), lt('Safety là một decision branch thật, không phải thất bại kỹ thuật.', 'Safety is a real decision branch, not a technical failure.', 'La sécurité est une vraie branche, pas échec technique.'), lt('Chờ quá lâu vì nghĩ mình gần thoát.', 'Waiting too long because you think you are close to escaping.', 'Attendre trop car vous pensez être presque sorti.'), lt('Neck danger: tap/reset.', 'Neck danger: tap/reset.', 'Danger cou: taper/reset.'), ['positional-hierarchy', 'front-headlock-defense']),
  ],
  'back-control': [
    ifThen('back-two-on-one', 'control', lt('Nếu defender thắng two-on-one trên choking hand.', 'If the defender wins two-on-one on the choking hand.', 'Si le défenseur gagne two-on-one sur choking hand.'), lt('Cả hai tay họ kéo wrist choking xuống, elbow bạn tách khỏi centerline, và chest-to-back bắt đầu lỏng.', 'Both their hands pull your choking wrist down, your elbow leaves centerline, and chest-to-back starts loosening.', 'Ses deux mains tirent votre choking wrist, votre coude quitte centerline, chest-to-back se relâche.'), lt('Đừng giật tay; ẩn wrist, chuyển sang arm trap bằng hook hoặc đổi sang short choke/seatbelt reset.', 'Do not yank the hand; hide the wrist, switch to arm trap with a hook, or move to short choke or seatbelt reset.', 'Ne pas arracher main; cacher wrist, passer arm trap avec hook ou short choke/seatbelt reset.'), lt('Two-on-one mở arm trap nếu hips và hooks còn dính.', 'Two-on-one opens arm trap if hips and hooks stay attached.', 'Two-on-one ouvre arm trap si hanches/hooks attachés.'), lt('Kéo tay mạnh làm chest rời lưng.', 'Yanking the hand and letting chest leave the back.', 'Arracher main et laisser poitrine quitter dos.'), lt('Ẩn wrist, trap arm.', 'Hide wrist, trap arm.', 'Cacher wrist, trap arm.'), ['rear-naked-choke-system', 'back-control']),
    ifThen('back-shoulder-to-mat', 'prevent', lt('Nếu defender đặt được một shoulder xuống mat.', 'If the defender gets one shoulder to the mat.', 'Si le défenseur met une épaule au tapis.'), lt('Far shoulder trượt thấp hơn sternum bạn, head của bạn bị đẩy qua centerline, và hooks bị kéo dài.', 'Far shoulder slides below your sternum, your head is pushed across centerline, and hooks stretch long.', 'Far shoulder glisse sous votre sternum, votre tête poussée centerline, hooks allongés.'), lt('Head post chặn shoulder, chest trượt theo spine, và reinsert hook hoặc chuyển mount nếu họ quay qua.', 'Head post blocks the shoulder, chest slides with the spine, and you reinsert hook or switch to mount if they turn through.', 'Head post bloque épaule, poitrine suit colonne, reinsert hook ou transition mount s’il tourne.'), lt('Shoulder-to-mat là cửa chính của back escape.', 'Shoulder-to-mat is the main door for back escape.', 'Épaule au tapis est la porte principale de back escape.'), lt('Tiếp tục săn choke khi chest-to-back đã mất.', 'Continuing to hunt choke after chest-to-back is lost.', 'Continuer choke après perte chest-to-back.'), lt('Shoulder xuống thì retention trước.', 'Shoulder down means retention first.', 'Épaule au sol: retention d’abord.'), ['mount-control', 'back-control']),
    ifThen('back-hook-cleared', 'recover', lt('Nếu họ clear được một hook.', 'If they clear one hook.', 'S’il clear un hook.'), lt('Một foot bị đẩy khỏi hip line, knee mở rộng, và pelvis của bạn rơi xa hông họ.', 'One foot is pushed off hip line, knee opens wide, and your pelvis falls away from their hips.', 'Un pied poussé hors hip line, genou ouvert, pelvis loin de ses hanches.'), lt('Hips theo họ trước, chest không nổi, rồi reinsert hook bằng toes active hoặc chuyển mount.', 'Follow with hips first, keep chest from floating, then reinsert hook with active toes or switch to mount.', 'Suivre hanches d’abord, poitrine ne flotte pas, puis reinsert hook avec orteils actifs ou mount.'), lt('Hook chỉ reinsert được nếu pelvis còn gần hip line.', 'A hook can reinsert only if pelvis stays close to hip line.', 'Hook peut revenir seulement si pelvis près hip line.'), lt('Kéo bằng chân khi hips đã rơi xa.', 'Pulling with the leg after hips have fallen away.', 'Tirer avec jambe après hanches éloignées.'), lt('Hips trước, hook sau.', 'Hips first, hook second.', 'Hanches d’abord, hook ensuite.'), ['mount-control', 'back-control']),
    ifThen('back-chin-hidden', 'submit', lt('Nếu defender giấu cằm và khóa cổ.', 'If the defender hides the chin and shells the neck.', 'Si le défenseur cache menton et ferme cou.'), lt('Cằm chạm sternum, hands che đường vào cổ, và forearm của bạn chỉ nằm trên hàm.', 'Chin touches sternum, hands block neck entry, and your forearm only sits on the jaw.', 'Menton sur sternum, mains bloquent entrée cou, forearm seulement sur mâchoire.'), lt('Không crank hàm; attack hand fight, trap arm, hoặc chuyển mount/back retention để mở cổ sau.', 'Do not crank the jaw; attack the hand fight, trap an arm, or switch to mount or back retention to open the neck later.', 'Ne pas crank mâchoire; attaquer hand fight, trap arm ou passer mount/back retention pour ouvrir cou plus tard.'), lt('Cổ mở bằng dilemma tay-hông, không bằng ép thô vào mặt.', 'The neck opens through hand-and-hip dilemmas, not crude face pressure.', 'Le cou s’ouvre par dilemmes mains-hanches, pas pression brute visage.'), lt('Ép forearm qua mặt để tìm finish nhanh.', 'Forcing the forearm across the face for a fast finish.', 'Forcer forearm sur visage pour finish rapide.'), lt('Mở tay trước, cổ sau.', 'Open hands first, neck second.', 'Ouvrir mains d’abord, cou ensuite.'), ['rear-naked-choke-system', 'mount-control']),
    ifThen('back-defender-stands', 'control', lt('Nếu defender đứng dậy với seatbelt còn đó.', 'If the defender stands while seatbelt remains.', 'Si le défenseur se lève avec seatbelt encore là.'), lt('Feet họ dưới hips, chest-to-back còn dính, và hands đang bận hand fight.', 'Their feet are under hips, chest-to-back still attached, and hands are busy hand fighting.', 'Ses pieds sous hanches, chest-to-back attaché, mains occupées hand fight.'), lt('Đổi sang mat return grip quanh hips/seatbelt, giữ đầu an toàn và đưa họ xuống có kiểm soát.', 'Switch to mat-return grip around hips or seatbelt, keep head safe, and return them with control.', 'Passer grip mat return autour hanches/seatbelt, tête sûre et retour contrôlé.'), lt('Khi họ đứng, pin trên lưng thành ride và mat return.', 'When they stand, back control becomes ride and mat return.', 'Quand il se lève, back control devient ride et mat return.'), lt('Kéo cổ về sau thay vì kiểm soát hips.', 'Pulling the neck backward instead of controlling hips.', 'Tirer cou en arrière au lieu de contrôler hanches.'), lt('Hips control, not neck pull.', 'Control hips, do not pull neck.', 'Contrôler hanches, pas tirer cou.'), ['mat-return-basics', 'turtle-ride']),
    ifThen('back-turns-into-guard', 'advance', lt('Nếu defender quay mạnh vào guard của bạn.', 'If the defender turns hard into your guard.', 'Si le défenseur tourne fort vers votre garde.'), lt('Chest-to-back đứt, shoulder line square lại, và hook gần bị đẩy qua centerline.', 'Chest-to-back breaks, shoulder line squares back, and near hook is pushed across centerline.', 'Chest-to-back casse, shoulder line redevient square, hook proche poussé centerline.'), lt('Chấp nhận transition: knee qua belly line vào mount hoặc top half thay vì bám back đã mất.', 'Accept the transition: step knee across belly line into mount or top half instead of clinging to lost back control.', 'Accepter transition: genou traverse belly line vers mount ou top half au lieu de s’accrocher au back perdu.'), lt('Giữ top control tốt hơn là mất back và rơi bottom.', 'Keeping top control is better than losing back and falling bottom.', 'Garder top control vaut mieux que perdre back et tomber bottom.'), lt('Bám hook đã mất và bị đảo ngược.', 'Clinging to a lost hook and getting reversed.', 'S’accrocher à hook perdu et se faire renverser.'), lt('Back mất thì mount/top.', 'Lost back means mount or top.', 'Back perdu: mount ou top.'), ['mount-control', 'bodylock-passing']),
    ifThen('back-feet-crossed-risk', 'survive', lt('Nếu bạn bắt chéo feet trước hông họ.', 'If you cross feet in front of their hips.', 'Si vous croisez pieds devant ses hanches.'), lt('Ankles nằm trong tầm họ kẹp, knees mở, và hips bạn không còn điều khiển hip line.', 'Ankles are available for them to trap, knees open, and your hips no longer manage hip line.', 'Chevilles disponibles à piéger, genoux ouverts, hanches ne gèrent plus hip line.'), lt('Uncross ngay, đặt hooks active hai bên hip line hoặc chuyển body triangle có kiểm soát nếu phù hợp.', 'Uncross immediately, place active hooks on both sides of hip line, or switch to a controlled body triangle if appropriate.', 'Décroiser immédiatement, hooks actifs des deux côtés hip line ou body triangle contrôlé si adapté.'), lt('Feet sai biến control thành ankle danger cho chính bạn.', 'Bad feet turn control into ankle danger for you.', 'Mauvais pieds transforment contrôle en danger cheville pour vous.'), lt('Squeeze chân mạnh hơn để giữ lưng.', 'Squeezing the legs harder to keep the back.', 'Serrer jambes plus fort pour garder dos.'), lt('Hooks active, ankles safe.', 'Active hooks, safe ankles.', 'Hooks actifs, chevilles sûres.'), ['back-control', 'positional-hierarchy']),
    ifThen('back-arm-trap-opens', 'submit', lt('Nếu một tay defender bị kéo xuống hook line.', 'If one defender hand is pulled down to hook line.', 'Si une main du défenseur est tirée vers hook line.'), lt('Wrist họ thấp gần hip, elbow tách khỏi ribs, và cổ còn một tay bảo vệ.', 'Their wrist is low near hip, elbow separates from ribs, and the neck has only one defending hand.', 'Son wrist bas près hip, coude séparé côtes, cou défendu par une seule main.'), lt('Trap wrist bằng hook, giữ chest-to-back, rồi chuyển hand fight sang choking hand còn lại.', 'Trap the wrist with the hook, keep chest-to-back, then switch hand fight to the remaining defending hand.', 'Trap wrist avec hook, garder chest-to-back, puis hand fight sur main restante.'), lt('Arm trap tạo dilemma thật: họ chọn clear hook hoặc bảo vệ cổ.', 'Arm trap creates a real dilemma: they choose hook clear or neck defense.', 'Arm trap crée vrai dilemme: clear hook ou défendre cou.'), lt('Thả chest-to-back để kéo tay xuống sâu hơn.', 'Releasing chest-to-back to pull the arm lower.', 'Lâcher chest-to-back pour tirer bras plus bas.'), lt('Trap bằng hook, không bằng rời chest.', 'Trap with hook, not by leaving chest.', 'Trap avec hook, pas quitter chest.'), ['rear-naked-choke-system', 'dilemmas-two-way-attacks']),
    ifThen('back-chest-disconnects', 'reset', lt('Nếu chest-to-back của bạn bị đứt.', 'If your chest-to-back connection breaks.', 'Si votre chest-to-back connection casse.'), lt('Có khoảng sáng giữa sternum và lưng họ, head bạn ở xa, và hands chỉ còn kéo seatbelt.', 'There is daylight between sternum and their back, your head is far, and hands are only pulling seatbelt.', 'Espace entre sternum et dos, tête loin, mains tirent seulement seatbelt.'), lt('Ngừng finish, kéo sternum trở lại spine line, head post gần shoulder và reset hooks/seatbelt.', 'Stop finishing, bring sternum back to spine line, head post near shoulder, and reset hooks and seatbelt.', 'Arrêter finish, remettre sternum sur spine line, head post près shoulder et reset hooks/seatbelt.'), lt('Back control sống bằng connection, không bằng kéo tay.', 'Back control lives through connection, not arm pulling.', 'Back control vit par connexion, pas traction bras.'), lt('Tăng squeeze tay khi chest đã rời.', 'Increasing arm squeeze after chest disconnects.', 'Augmenter squeeze bras après perte poitrine.'), lt('Sternum về lưng trước.', 'Sternum back to back first.', 'Sternum au dos d’abord.'), ['back-control', 'back-escape']),
    ifThen('back-neck-safety-risk', 'survive', lt('Nếu finish tạo neck crank thay vì strangle sạch.', 'If the finish becomes a neck crank instead of a clean strangle.', 'Si le finish devient neck crank au lieu de strangle propre.'), lt('Áp lực nằm trên hàm/cổ xoay, defender đau cổ trước khi có strangle pressure.', 'Pressure is on jaw or rotating neck, and defender feels neck pain before strangle pressure.', 'Pression sur mâchoire/cou en rotation, défenseur sent douleur cou avant strangle.'), lt('Giảm lực, reset choking line dưới cằm hoặc chuyển hand fight/arm trap; tập dưới giám sát và để partner tap sớm.', 'Reduce force, reset choking line under the chin, or switch to hand fight or arm trap; train under supervision and let partner tap early.', 'Réduire force, reset choking line sous menton ou hand fight/arm trap; entraînement supervisé et partenaire tape tôt.'), lt('Safety và mechanics sạch giúp training bền vững hơn crank mạnh.', 'Safety and clean mechanics make training more sustainable than hard cranking.', 'Sécurité et mechanics propres rendent training durable, mieux que crank fort.'), lt('Ép cổ vì vị trí tay chưa đúng.', 'Cranking because hand position is not correct.', 'Crank car position main pas correcte.'), lt('Nếu là crank, reset line.', 'If it is a crank, reset the line.', 'Si c’est crank, reset line.'), ['rear-naked-choke-system', 'positional-hierarchy']),
  ],
}

const ifThenDecisionsFor = (seedValue: SkillSeed): IfThenDecision[] | undefined => targetedIfThenDecisions[seedValue.id]

const buildSkill = (seedValue: SkillSeed): SkillNode => ({
  id: seedValue.id,
  title: seedValue.title,
  domain: seedValue.domain,
  level: seedValue.level,
  tags: seedValue.tags,
  shortDescription: seedValue.shortDescription,
  whyItMatters: seedValue.why,
  situation: seedValue.situation,
  primaryGoal: seedValue.goal,
  keyConcepts: conceptList(seedValue),
  bodyChecklist: checklistFor(seedValue),
  decisionTree: decisionTreeFor(seedValue),
  dangerSignals: dangerSignalsFor(seedValue),
  commonMistakes: mistakesFor(seedValue),
  failureResponses: failuresFor(seedValue),
  drills: drillsFor(seedValue),
  skillTests: testsFor(seedValue),
  prerequisites: seedValue.prerequisites,
  relatedSkills: seedValue.relatedSkills,
  bodyMechanicsSystem: targetedBodyMechanicsSystemFor(seedValue) ?? bodyMechanicsSystemFor(seedValue),
  microDetailSystem: microDetailSystemBySkillId.get(seedValue.id),
  qualityChecklist: qualityChecklistsBySkillId.get(seedValue.id),
  positionalRelationships: positionalRelationshipsFor(seedValue),
  reactionBranches: reactionBranchesFor(seedValue),
  ifThenDecisions: ifThenDecisionsFor(seedValue),
  technicalDetails: technicalDetailsBySkillId[seedValue.id],
  blackbeltDetails: blackbeltDetailsBySkillId.get(seedValue.id),
  quickCard: quickCardFor(seedValue, microDetailSystemBySkillId.get(seedValue.id)),
})

export const finalizeSkill = (skill: SkillNode): SkillNode => ({
  ...skill,
  blackbeltDetails: skill.blackbeltDetails ?? generatedBlackbeltDetailsForSkill(skill),
})

export const buildSkillsFromSeeds = (seeds: SkillSeed[]): SkillNode[] => seeds.map(buildSkill).map(finalizeSkill)
