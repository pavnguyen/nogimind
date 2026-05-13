import type {
  BodyPart,
  BodySide,
  BodyTarget,
  BodyToBodyContact,
  BodyToBodyDetailSystem,
  BodyToBodyPhase,
  ContactType,
  ForceDirection,
  LocalizedText,
  SkillDomain,
} from '../types/skill'

type BodyToBodySeed = {
  id: string
  title: LocalizedText
  domain: SkillDomain
  tags: string[]
}

const lt = (vi: string, en: string, fr: string): LocalizedText => ({ vi, en, fr })

const me = (side: BodySide, bodyPart: BodyPart, detail?: LocalizedText): BodyTarget => ({ role: 'me', side, bodyPart, detail })
const opponent = (side: BodySide, bodyPart: BodyPart, detail?: LocalizedText): BodyTarget => ({ role: 'opponent', side, bodyPart, detail })

const sideLabels: Record<BodySide, LocalizedText> = {
  left: lt('trái', 'left', 'gauche'),
  right: lt('phải', 'right', 'droite'),
  near: lt('gần', 'near', 'proche'),
  far: lt('xa', 'far', 'éloigné'),
  inside: lt('trong', 'inside', 'intérieur'),
  outside: lt('ngoài', 'outside', 'extérieur'),
  top: lt('trên', 'top', 'haut'),
  bottom: lt('dưới', 'bottom', 'bas'),
  center: lt('giữa', 'center', 'centre'),
  both: lt('cả hai bên', 'both', 'deux côtés'),
  either: lt('bên nào cũng được', 'either', 'un côté'),
  diagonal: lt('chéo', 'diagonal', 'diagonal'),
  free: lt('tự do', 'free', 'libre'),
  post: lt('đang chống trụ', 'post', 'en appui'),
}

const bodyPartLabels: Record<BodyPart, LocalizedText> = {
  head: lt('đầu', 'head', 'tête'),
  eyes: lt('mắt', 'eyes', 'yeux'),
  ear: lt('tai', 'ear', 'oreille'),
  chin: lt('cằm', 'chin', 'menton'),
  neck: lt('cổ', 'neck', 'cou'),
  shoulder: lt('vai', 'shoulder', 'épaule'),
  chest: lt('ngực', 'chest', 'poitrine'),
  sternum: lt('xương ức', 'sternum', 'sternum'),
  ribs: lt('xương sườn', 'ribs', 'côtes'),
  spine: lt('cột sống', 'spine', 'colonne'),
  hip: lt('hông', 'hip', 'hanche'),
  pelvis: lt('khung chậu', 'pelvis', 'bassin'),
  hand: lt('bàn tay', 'hand', 'main'),
  wrist: lt('cổ tay', 'wrist', 'poignet'),
  forearm: lt('cẳng tay', 'forearm', 'avant-bras'),
  elbow: lt('khuỷu tay', 'elbow', 'coude'),
  biceps: lt('bắp tay trước', 'biceps', 'biceps'),
  triceps: lt('bắp tay sau', 'triceps', 'triceps'),
  knee: lt('gối', 'knee', 'genou'),
  thigh: lt('đùi', 'thigh', 'cuisse'),
  shin: lt('ống chân', 'shin', 'tibia'),
  ankle: lt('cổ chân', 'ankle', 'cheville'),
  heel: lt('gót chân', 'heel', 'talon'),
  toes: lt('ngón chân', 'toes', 'orteils'),
  foot: lt('bàn chân', 'foot', 'pied'),
  hook: lt('móc hook', 'hook', 'hook (crochet)'),
  floor: lt('thảm', 'floor', 'sol'),
  back: lt('lưng', 'back', 'dos'),
  arm: lt('cánh tay', 'arm', 'bras'),
  leg: lt('chân', 'leg', 'jambe'),
  body: lt('thân người', 'body', 'corps'),
  calf: lt('bắp chân', 'calf', 'mollet'),
}

const hasBodyToBodyMarkers = (text: string, lang: keyof LocalizedText) => {
  const lowered = text.toLowerCase()
  if (lang === 'vi') return (lowered.includes('tôi') || lowered.includes('mình')) && (lowered.includes('đối thủ') || lowered.includes('họ'))
  if (lang === 'fr') return (lowered.includes('mon ') || lowered.includes('ma ') || lowered.includes('mes ') || lowered.includes('je ')) && (lowered.includes('adversaire') || lowered.includes('adverse'))
  return (lowered.includes('my ') || lowered.includes('i ')) && (lowered.includes('opponent') || lowered.includes('their '))
}

const contactLabel = (target: BodyTarget, lang: keyof LocalizedText) => {
  const side = sideLabels[target.side][lang]
  const bodyPart = bodyPartLabels[target.bodyPart]?.[lang] ?? String(target.bodyPart).replace(/_/g, ' ')
  if (target.role === 'me') {
    if (lang === 'vi') return `${bodyPart} ${side} của tôi`
    if (lang === 'fr') return `mon/ma ${bodyPart} ${side}`
    return `my ${side} ${bodyPart}`
  }
  if (lang === 'vi') return `${bodyPart} ${side} của đối thủ`
  if (lang === 'fr') return `${bodyPart} ${side} de l'adversaire`
  return `opponent's ${side} ${bodyPart}`
}

const clarifyExactInstruction = (contact: BodyToBodyContact): LocalizedText => ({
  vi: hasBodyToBodyMarkers(contact.exactInstruction.vi, 'vi')
    ? contact.exactInstruction.vi
    : `${contactLabel(contact.myBodyPart, 'vi')} -> ${contactLabel(contact.opponentBodyPart, 'vi')}: ${contact.exactInstruction.vi}`,
  en: hasBodyToBodyMarkers(contact.exactInstruction.en, 'en')
    ? contact.exactInstruction.en
    : `${contactLabel(contact.myBodyPart, 'en')} -> ${contactLabel(contact.opponentBodyPart, 'en')}: ${contact.exactInstruction.en}`,
  fr: hasBodyToBodyMarkers(contact.exactInstruction.fr, 'fr')
    ? contact.exactInstruction.fr
    : `${contactLabel(contact.myBodyPart, 'fr')} -> ${contactLabel(contact.opponentBodyPart, 'fr')}: ${contact.exactInstruction.fr}`,
})

export const clarifyBodyToBodyDetails = (details: BodyToBodyDetailSystem): BodyToBodyDetailSystem => ({
  ...details,
  phases: details.phases.map((item) => ({
    ...item,
    contacts: item.contacts.map((contactItem) => ({
      ...contactItem,
      exactInstruction: clarifyExactInstruction(contactItem),
    })),
  })),
})

const contact = (
  id: string,
  title: LocalizedText,
  myBodyPart: BodyTarget,
  opponentBodyPart: BodyTarget,
  contactType: ContactType,
  forceDirection: ForceDirection,
  exactInstruction: LocalizedText,
  whyItWorks: LocalizedText,
  commonMisplacement: LocalizedText,
  correctionCue: LocalizedText,
  liveCue: LocalizedText,
  prevents?: LocalizedText,
  safetyNote?: LocalizedText,
): BodyToBodyContact => ({
  id,
  title,
  myBodyPart,
  opponentBodyPart,
  contactType,
  forceDirection,
  pressureLevel: contactType === 'finish_pressure' || contactType === 'safety_release' ? 'progressive' : 'medium',
  timing: lt('Thiết lập ngay khi contact này xuất hiện, trước khi tăng lực.', 'Use this as soon as the contact appears, before adding force.', 'Utilisez ce contact dès qu’il apparaît, avant d’ajouter de la force.'),
  exactInstruction,
  whyItWorks,
  commonMisplacement,
  correctionCue,
  liveCue,
  prevents,
  safetyNote,
})

const phase = (id: string, title: LocalizedText, goal: LocalizedText, contacts: BodyToBodyContact[], successSignal: LocalizedText, failureSignal: LocalizedText): BodyToBodyPhase => ({
  id,
  title,
  goal,
  contacts,
  successSignal,
  failureSignal,
})

const system = (seed: BodyToBodySeed, phases: BodyToBodyPhase[], mostImportantContacts: string[]): BodyToBodyDetailSystem => ({
  overview: lt(
    `${seed.title.vi}: kiểm tra contact giữa cơ thể tôi và đối thủ trước khi tăng lực hoặc chuyển nhánh.`,
    `${seed.title.en}: check my body contacts against the opponent before adding force or branching.`,
    `${seed.title.fr} : vérifier mes contacts sur le corps adverse avant d’ajouter force ou branche.`,
  ),
  defaultOrientation: lt(
    'Mặc định dùng near/far. Khi đổi bên, mirror trái/phải nhưng giữ nguyên đường contact.',
    'Default uses near/far. If you switch sides, mirror left/right but keep the same contact line.',
    'Par défaut near/far. Si vous changez de côté, inversez gauche/droite mais gardez la même ligne de contact.',
  ),
  phases,
  leftRightMirrorNote: lt(
    'Khi đổi bên, body part đổi theo, nhưng mục tiêu vẫn là chặn cùng shoulder line, hip line hoặc knee line.',
    'When sides switch, body parts mirror, but the goal still blocks the same shoulder line, hip line, or knee line.',
    'Quand le côté change, les parties du corps s’inversent, mais l’objectif bloque la même shoulder line, hip line ou knee line.',
  ),
  mostImportantContacts,
})

const safetyNote = lt(
  'Tăng lực từ từ, dừng ngay khi partner tap hoặc khi cổ, gối, vai có dấu hiệu bất thường.',
  'Add force slowly and stop when the partner taps or neck, knee, or shoulder feels abnormal.',
  'Ajoutez la force lentement et arrêtez si le partenaire tape ou si cou, genou ou épaule semble anormal.',
)

const submissionContacts = (seed: BodyToBodySeed) => [
  contact(`${seed.id}-hand-wrist`, lt('Tay kiểm soát cổ tay', 'Hand controls wrist', 'Main contrôle poignet'), me('near', 'hand'), opponent('near', 'wrist'), 'hand_fight', 'pull_toward_you', lt('Tay gần của tôi kéo cổ tay gần của đối thủ về phía ngực để mở hướng tấn công.', 'My near hand pulls the opponent’s near wrist toward my chest to open the attack line.', 'Ma main proche tire le poignet proche de l’adversaire vers ma poitrine pour ouvrir la ligne d’attaque.'), lt('Kiểm soát cổ tay kéo tay phòng thủ ra khỏi vùng cổ hoặc shoulder line.', 'Wrist control removes the defensive hand from the neck or shoulder line.', 'Le contrôle du poignet enlève la main défensive de la ligne du cou ou de l’épaule.'), lt('Kéo ngón tay thay vì cổ tay làm grip dễ tuột.', 'Pulling fingers instead of the wrist makes the grip slip.', 'Tirer les doigts au lieu du poignet fait glisser le grip.'), lt('Thắng cổ tay trước.', 'Wrist first.', 'Poignet d’abord.'), lt('Thắng cổ tay.', 'Win wrist.', 'Gagner poignet.'), lt('Chặn đối thủ lấy lại hand fight.', 'Prevents hand-fight recovery.', 'Empêche la récupération du hand fight.')),
  contact(`${seed.id}-head-shoulder`, lt('Đầu chặn vai', 'Head blocks shoulder', 'Tête bloque épaule'), me('near', 'head'), opponent('near', 'shoulder'), 'head_position', 'pin_inward', lt('Đầu của tôi ghim vai gần của đối thủ vào trong để họ không xoay lại posture.', 'My head pins the opponent’s near shoulder inward so they cannot rotate back to posture.', 'Ma tête bloque l’épaule proche de l’adversaire vers l’intérieur pour empêcher le retour posture.'), lt('Vị trí đầu đóng đường rút vai hoặc quay mặt ra ngoài.', 'Head position closes the path for shoulder withdrawal or face-out rotation.', 'La head position ferme la voie pour retirer l’épaule ou tourner le visage.'), lt('Đầu nổi cao làm vai họ trượt ra.', 'A floating head lets their shoulder slide out.', 'Une tête flottante laisse l’épaule sortir.'), lt('Đầu chặn vai.', 'Head blocks shoulder.', 'Tête bloque épaule.'), lt('Chặn bằng đầu.', 'Head block.', 'Tête bloque.')),
  contact(`${seed.id}-chest-line`, lt('Ngực đóng khoảng trống', 'Chest closes space', 'Poitrine ferme espace'), me('center', 'chest'), opponent('center', 'chest'), 'chest_connection', 'close_inward', lt('Ngực của tôi ép sát thân trên của đối thủ để không còn khoảng trống giữa hai shoulder line.', 'My chest closes into the opponent’s upper body so there is no space between the shoulder lines.', 'Ma poitrine se ferme sur le haut du corps adverse pour supprimer l’espace entre les shoulder lines.'), lt('Khoảng trống biến mất trước khi lực kết thúc được đưa vào.', 'Space disappears before finish pressure enters.', 'L’espace disparaît avant la pression de finish.'), lt('Dùng tay siết trước khi ngực đóng sát.', 'Squeezing with arms before the chest closes.', 'Serrer avec les bras avant que la poitrine ferme.'), lt('Đóng ngực trước, tăng lực sau.', 'Chest before force.', 'Poitrine avant force.'), lt('Không để hở khoảng trống.', 'No space.', 'Pas d’espace.')),
  contact(`${seed.id}-elbow-line`, lt('Khuỷu khép đường siết', 'Elbow closes line', 'Coude ferme ligne'), me('near', 'elbow'), opponent('center', 'neck'), 'finish_pressure', 'close_inward', lt('Khuỷu gần của tôi khép về xương sườn để loại bỏ độ rỗng trong đường siết cổ hoặc khóa vai.', 'My near elbow closes toward my ribs so the neck line or shoulder-lock line has no slack.', 'Mon coude proche revient vers mes côtes pour enlever le slack de la ligne du cou ou de l’épaule.'), lt('Khi không còn độ rỗng, lực kết thúc nhỏ hơn nhưng sạch hơn.', 'When slack is gone, finishing force is smaller and cleaner.', 'Sans slack, la force de finish est plus petite et plus propre.'), lt('Khuỷu mở ra ngoài làm mất đường finish.', 'Flaring the elbow out loses the finishing line.', 'Ouvrir le coude dehors perd la ligne de finish.'), lt('Khuỷu khép về xương sườn.', 'Elbow to ribs.', 'Coude aux côtes.'), lt('Xóa độ rỗng.', 'Slack out.', 'Slack dehors.'), undefined, safetyNote),
  contact(`${seed.id}-hip-stay`, lt('Hông giữ vị trí', 'Hips keep position', 'Hanches gardent position'), me('both', 'hip'), opponent('both', 'hip'), 'pin', 'drive_diagonal', lt('Hông của tôi ép chéo qua hip line của đối thủ để finish không làm tôi mất vị trí.', 'My hips drive diagonally through the opponent’s hip line so the finish does not cost position.', 'Mes hanches poussent en diagonale à travers la hip line adverse pour ne pas perdre la position en finissant.'), lt('Kiểm soát hông giữ được nhánh tiếp theo nếu finish bị chặn.', 'Hip control keeps the next branch if the finish is defended.', 'Le contrôle des hanches garde la branche suivante si le finish est défendu.'), lt('Đuổi theo finish trong khi hông rời khỏi đối thủ.', 'Chasing the finish while hips disconnect from the opponent.', 'Chasser le finish pendant que les hanches se déconnectent.'), lt('Giữ hông trước.', 'Hips stay first.', 'Hanches d’abord.'), lt('Giữ hông dính.', 'Keep hips.', 'Garder hanches.')),
]

const passingContacts = (seed: BodyToBodySeed) => [
  contact(`${seed.id}-hand-hip`, lt('Hai tay ghim hip line', 'Hands pin hip line', 'Mains pin hip line'), me('both', 'hand'), opponent('both', 'hip'), 'grip', 'close_inward', lt('Hai tay của tôi ghim hip line của đối thủ trước khi tôi bước qua chân.', 'My hands pin the opponent’s hip line before I step past the legs.', 'Mes mains bloquent la hip line adverse avant de passer les jambes.'), lt('Khi hip line bị ghim, đối thủ recover guard chậm hơn.', 'A pinned hip line slows guard recovery.', 'Une hip line bloquée ralentit le recover guard.'), lt('Đặt tay quá cao lên xương sườn khiến hông họ vẫn xoay được.', 'Hands high on ribs let their hips keep rotating.', 'Mains hautes sur les côtes laissent les hanches tourner.'), lt('Tay vào hip line.', 'Hands to hip line.', 'Mains hip line.'), lt('Ghim hông.', 'Pin hips.', 'Pin hanches.'), lt('Chặn hip escape.', 'Prevents hip escape.', 'Empêche hip escape.')),
  contact(`${seed.id}-head-shoulder`, lt('Đầu chặn shoulder line', 'Head blocks shoulder line', 'Tête bloque shoulder line'), me('near', 'head'), opponent('near', 'shoulder'), 'head_position', 'pin_inward', lt('Đầu của tôi đặt cạnh vai gần của đối thủ để chặn họ xoay vai quay lại guard.', 'My head sits beside the opponent’s near shoulder to stop them turning the shoulder back into guard.', 'Ma tête reste près de l’épaule proche adverse pour bloquer le retour de l’épaule vers la garde.'), lt('Vị trí đầu tách shoulder line khỏi hip line.', 'Head position separates shoulder line from hip line.', 'La head position sépare shoulder line et hip line.'), lt('Đầu ở centerline cho họ dựng frame hoặc vào shoulder crunch.', 'Head on centerline gives them frames or shoulder crunch.', 'Tête sur centerline donne frames ou shoulder crunch.'), lt('Đầu lệch cạnh vai.', 'Head beside shoulder.', 'Tête près épaule.'), lt('Đầu lệch khỏi line.', 'Head off line.', 'Tête décalée.')),
  contact(`${seed.id}-chest-hip`, lt('Ngực ép hông', 'Chest drives hip', 'Poitrine pousse hanche'), me('center', 'chest'), opponent('near', 'hip'), 'chest_connection', 'drive_diagonal', lt('Ngực của tôi ép chéo xuống hông gần của đối thủ để hông họ không xoay lại guard.', 'My chest drives diagonally down into the opponent’s near hip so their hips cannot rotate back to guard.', 'Ma poitrine pousse en diagonale vers la hanche proche adverse pour empêcher le retour en garde.'), lt('Áp lực có hướng làm frame của đối thủ yếu đi.', 'Directed pressure weakens frames.', 'La pression dirigée affaiblit les frames.'), lt('Ép thẳng xuống khiến hông họ shrimp ra được.', 'Straight-down pressure lets their hips shrimp out.', 'Pression droite vers le bas laisse les hanches shrimp.'), lt('Ngực ép vào hông.', 'Chest to hip.', 'Poitrine hanche.'), lt('Ngực ép chéo.', 'Diagonal chest.', 'Poitrine diagonale.')),
  contact(`${seed.id}-knee-shin`, lt('Gối triệt tiêu shin line', 'Knee kills shin line', 'Genou tue shin line'), me('near', 'knee'), opponent('near', 'shin'), 'knee_wedge', 'pin_inward', lt('Gối gần của tôi chèn vào shin gần của đối thủ trước khi tôi clear knee line.', 'My near knee wedges into the opponent’s near shin before I clear the knee line.', 'Mon genou proche bloque le tibia proche adverse avant de libérer la knee line.'), lt('Khi shin line bị triệt tiêu, hook hoặc knee shield không còn nâng được nữa.', 'A dead shin line cannot lift as a hook or knee shield.', 'Une shin line morte ne lift plus comme hook ou knee shield.'), lt('Bước qua khi shin của họ vẫn còn lực.', 'Stepping over while their shin is still alive.', 'Passer alors que son tibia est encore vivant.'), lt('Triệt tiêu shin trước.', 'Kill shin first.', 'Tuer shin d’abord.'), lt('Xử lý shin trước.', 'Shin first.', 'Shin d’abord.')),
  contact(`${seed.id}-forearm-hip`, lt('Cẳng tay chặn re-guard', 'Forearm blocks re-guard', 'Avant-bras bloque re-guard'), me('near', 'forearm'), opponent('near', 'hip'), 'pin', 'close_inward', lt('Cẳng tay gần của tôi chặn hông gần của đối thủ khi tôi thả grip để ổn định pin.', 'My near forearm blocks the opponent’s near hip as I release the grip to stabilize the pin.', 'Mon avant-bras proche bloque la hanche proche adverse quand je lâche le grip pour stabiliser le pin.'), lt('Thả grip nhưng không mở ngay đường re-guard.', 'Releasing the grip does not open immediate re-guard.', 'Relâcher le grip n’ouvre pas un re-guard immédiat.'), lt('Buông grip khi hip line chưa bị ghim.', 'Releasing the grip before the hip line is pinned.', 'Lâcher le grip avant de pin la hip line.'), lt('Ghim trước, thả sau.', 'Pin, then release.', 'Pin puis relâche.'), lt('Ổn định trước.', 'Settle first.', 'Stabiliser.')),
]

const escapeContacts = (seed: BodyToBodySeed) => [
  contact(`${seed.id}-forearm-frame`, lt('Frame bằng cẳng tay', 'Forearm frame', 'Frame avant-bras'), me('near', 'forearm'), opponent('near', 'neck'), 'frame', 'push_away', lt('Cẳng tay gần của tôi frame vào cổ hoặc vai gần của đối thủ trước khi hông tôi di chuyển.', 'My near forearm frames on the opponent’s neck or near shoulder before my hips move.', 'Mon avant-bras proche frame sur le cou ou l’épaule proche adverse avant que mes hanches bougent.'), lt('Frame tạo khoảng trống cho hip escape, không phải để bench press đối thủ.', 'The frame creates space for hip escape instead of bench pressing.', 'Le frame crée l’espace pour hip escape au lieu de bench press.'), lt('Duỗi thẳng tay đẩy người nhưng khuỷu vẫn bị tách.', 'Straight arms push the person while the elbow stays separated.', 'Bras tendus poussent mais le coude reste séparé.'), lt('Frame trước, hông sau.', 'Frame before hips.', 'Frame avant hanches.'), lt('Frame trước.', 'Frame first.', 'Frame d’abord.'), lt('Chặn áp lực ngực.', 'Prevents chest pressure.', 'Empêche chest pressure.')),
  contact(`${seed.id}-hand-hip`, lt('Tay xa chặn hông', 'Far hand checks hip', 'Main loin contrôle hanche'), me('far', 'hand'), opponent('near', 'hip'), 'frame', 'push_away', lt('Tay xa của tôi chặn hông gần của đối thủ để họ không bám theo hông tôi.', 'My far hand checks the opponent’s near hip so they cannot follow my hips.', 'Ma main éloignée contrôle la hanche proche adverse pour empêcher le follow des hanches.'), lt('Frame ở hông ngăn áp lực bám theo cú shrimp.', 'The hip frame stops pressure from following the shrimp.', 'Le frame sur hanche empêche la pression de suivre le shrimp.'), lt('Chỉ frame ở cổ và để hông họ bám theo.', 'Framing only the neck and letting their hips follow.', 'Frame seulement le cou et laisser ses hanches suivre.'), lt('Một frame cổ, một frame hông.', 'One neck frame, one hip frame.', 'Un frame cou, un frame hanche.'), lt('Frame hông.', 'Hip frame.', 'Frame hanche.')),
  contact(`${seed.id}-elbow-knee`, lt('Khuỷu nối lại với gối', 'Elbow reconnects to knee', 'Coude reconnecte genou'), me('near', 'elbow'), opponent('center', 'chest'), 'wedge', 'close_inward', lt('Khuỷu gần của tôi kéo về gối gần để dựng lại kết nối elbow-knee dưới ngực đối thủ.', 'My near elbow pulls toward my near knee to rebuild elbow-knee connection under the opponent’s chest.', 'Mon coude proche revient vers mon genou proche pour reconstruire elbow-knee connection sous la poitrine adverse.'), lt('Khi elbow-knee được nối lại, lớp guard có đường quay về.', 'When elbow-knee reconnects, the guard layer has a path back.', 'Quand coude-genou reconnecte, la couche de garde peut revenir.'), lt('Gối chạy ra ngoài khi khuỷu vẫn còn bị tách.', 'The knee moves outside while the elbow is still separated.', 'Le genou sort alors que le coude reste séparé.'), lt('Khuỷu về gối.', 'Elbow to knee.', 'Coude au genou.'), lt('Nối elbow-knee.', 'Elbow-knee.', 'Coude-genou.')),
  contact(`${seed.id}-hip-shrimp`, lt('Hông thoát khỏi line', 'Hips move off line', 'Hanches sortent de ligne'), me('both', 'hip'), opponent('center', 'chest'), 'push', 'circle_outside', lt('Hông của tôi shrimp chéo ra xa ngực đối thủ sau khi frame đã chịu lực.', 'My hips shrimp diagonally away from the opponent’s chest after the frame carries weight.', 'Mes hanches shrimp en diagonale loin de la poitrine adverse après que le frame porte le poids.'), lt('Hông tạo góc; tay không phải để đẩy người ra.', 'Hips create the angle; arms do not push the person away.', 'Les hanches créent l’angle; les bras ne poussent pas la personne.'), lt('Xoay lưng trước khi hông tạo được góc.', 'Turning the back before the hips have angle.', 'Tourner le dos avant que les hanches aient l’angle.'), lt('Hông đi sau frame.', 'Hips after frame.', 'Hanches après frame.'), lt('Di chuyển hông.', 'Hips move.', 'Hanches bougent.')),
  contact(`${seed.id}-foot-post`, lt('Bàn chân chống trụ để thoát', 'Foot posts for exit', 'Pied poste pour sortie'), me('far', 'foot'), opponent('bottom', 'hip'), 'foot_post', 'push_away', lt('Bàn chân xa của tôi chống xuống thảm để đẩy hông ra khỏi pressure line của đối thủ.', 'My far foot posts on the mat to drive my hips away from the opponent’s pressure line.', 'Mon pied éloigné poste au tapis pour pousser mes hanches hors de la ligne de pression adverse.'), lt('Foot post biến frame thành chuyển động thật.', 'The foot post turns the frame into real movement.', 'Le foot post transforme le frame en vrai mouvement.'), lt('Không có foot post nên chỉ xoay được vai.', 'No foot post means only the shoulders turn.', 'Sans foot post, seules les épaules tournent.'), lt('Chống trụ rồi thoát.', 'Post, then exit.', 'Post puis sortie.'), lt('Chống chân.', 'Post foot.', 'Pied post.')),
]

const guardContacts = (seed: BodyToBodySeed) => [
  contact(`${seed.id}-shin-biceps`, lt('Shin chặn arm line', 'Shin blocks arm line', 'Tibia bloque bras'), me('near', 'shin'), opponent('near', 'biceps'), 'wedge', 'push_away', lt('Shin gần của tôi chặn biceps gần của đối thủ để họ không áp sát ngực trực tiếp.', 'My near shin blocks the opponent’s near biceps so they cannot drive straight to chest-to-chest.', 'Mon tibia proche bloque le biceps proche adverse pour empêcher chest-to-chest direct.'), lt('Shin frame giữ khoảng cách để hông có thể xoay.', 'The shin frame keeps distance for hip rotation.', 'Le shin frame garde la distance pour rotation de hanches.'), lt('Shin rơi quá thấp dưới hip line.', 'The shin falls low below the hip line.', 'Le tibia tombe sous hip line.'), lt('Shin phải chịu lực.', 'Shin carries weight.', 'Tibia porte poids.'), lt('Giữ shin có lực.', 'Live shin.', 'Tibia vivant.')),
  contact(`${seed.id}-hand-wrist`, lt('Tay kiểm soát cổ tay', 'Hand controls wrist', 'Main contrôle poignet'), me('near', 'hand'), opponent('near', 'wrist'), 'grip', 'pull_toward_you', lt('Tay gần của tôi kéo cổ tay gần của đối thủ về centerline để phá posture.', 'My near hand pulls the opponent’s near wrist toward centerline to break posture.', 'Ma main proche tire le poignet proche adverse vers centerline pour casser posture.'), lt('Kiểm soát cổ tay buộc passer phải chống trụ hoặc rút tay về.', 'Wrist control forces the passer to post or retract the hand.', 'Le contrôle du poignet force le passer à poster ou retirer la main.'), lt('Kéo bằng biceps khi không có hook hoặc shin hỗ trợ.', 'Pulling with biceps without hook or shin.', 'Tirer aux biceps sans hook ou tibia.'), lt('Tay và shin đi cùng nhau.', 'Hand and shin together.', 'Main et tibia ensemble.'), lt('Tay-shin.', 'Hand-shin.', 'Main-tibia.')),
  contact(`${seed.id}-hip-angle`, lt('Hông tạo góc', 'Hips create angle', 'Hanches créent angle'), me('both', 'hip'), opponent('center', 'hip'), 'hip_connection', 'circle_outside', lt('Hông của tôi xoay chéo ra ngoài hip line của đối thủ để tạo góc attack hoặc retention.', 'My hips rotate diagonally outside the opponent’s hip line to create attack or retention angle.', 'Mes hanches tournent en diagonale hors de la hip line adverse pour créer angle attaque ou rétention.'), lt('Guard sống nhờ góc hông, không chỉ nhờ grip.', 'Guard stays alive through hip angle, not only grips.', 'La garde vit par angle de hanches, pas seulement grips.'), lt('Ngồi phẳng và kéo bằng tay.', 'Sitting flat and pulling with hands.', 'Rester plat et tirer aux mains.'), lt('Hông tạo góc.', 'Hips make angle.', 'Hanches créent angle.'), lt('Góc hông.', 'Hip angle.', 'Angle hanches.')),
  contact(`${seed.id}-foot-hip`, lt('Bàn chân chống hip line', 'Foot posts hip line', 'Pied poste hip line'), me('far', 'foot'), opponent('near', 'hip'), 'foot_post', 'push_away', lt('Bàn chân xa của tôi chống vào hông gần của đối thủ để giữ range trước khi đổi hook.', 'My far foot posts on the opponent’s near hip to keep range before changing hooks.', 'Mon pied éloigné poste sur la hanche proche adverse pour garder range avant de changer hook.'), lt('Foot post giữ khoảng cách khi tay đang pummel.', 'The foot post keeps distance while hands pummel.', 'Le foot post garde distance pendant le pummel des mains.'), lt('Foot post quá cao làm mất hip line.', 'Posting too high loses the hip line.', 'Post trop haut perd la hip line.'), lt('Bàn chân vào hông.', 'Foot to hip.', 'Pied hanche.'), lt('Chống vào hông.', 'Post hip.', 'Post hanche.')),
  contact(`${seed.id}-knee-inside`, lt('Gối thắng inside lane', 'Knee wins inside lane', 'Genou gagne inside'), me('near', 'knee'), opponent('near', 'hip'), 'knee_wedge', 'circle_inside', lt('Gối gần của tôi pummel vào trong hip line của đối thủ trước khi họ staple chân tôi.', 'My near knee pummels inside the opponent’s hip line before they staple my leg.', 'Mon genou proche pummel inside la hip line adverse avant qu’il staple ma jambe.'), lt('Gối trong là cửa để recover guard hoặc vào attack.', 'The inside knee is the gate to recover guard or attack.', 'Le genou inside est la porte pour recover guard ou attaquer.'), lt('Đẩy đầu khi gối trong đã bị staple.', 'Pushing the head while the inside knee is stapled.', 'Pousser la tête pendant que le genou inside est staple.'), lt('Gối trong trước.', 'Inside knee first.', 'Genou inside d’abord.'), lt('Gối trong.', 'Inside knee.', 'Genou inside.')),
]

const wrestlingContacts = (seed: BodyToBodySeed) => [
  contact(`${seed.id}-hand-wrist`, lt('Tay kéo cổ tay', 'Hand pulls wrist', 'Main tire poignet'), me('right', 'hand'), opponent('left', 'wrist'), 'grip', 'pull_right', lt('Tay phải của tôi kéo cổ tay trái của đối thủ qua centerline để mở góc attack.', 'My right hand pulls the opponent’s left wrist across centerline to open the attack angle.', 'Ma main droite tire le poignet gauche adverse au-delà de centerline pour ouvrir l’angle.'), lt('Cổ tay đi qua centerline làm shoulder line yếu đi.', 'Wrist across centerline weakens the shoulder line.', 'Le poignet au-delà de centerline affaiblit shoulder line.'), lt('Kéo khuỷu khi chưa thắng cổ tay.', 'Pulling the elbow without winning wrist.', 'Tirer coude sans gagner poignet.'), lt('Cổ tay qua giữa.', 'Wrist across.', 'Poignet traverse.'), lt('Cổ tay qua line.', 'Wrist across.', 'Poignet traverse.')),
  contact(`${seed.id}-head-chest`, lt('Đầu ở trong chest line', 'Head inside chest line', 'Tête inside poitrine'), me('right', 'head'), opponent('center', 'chest'), 'head_position', 'drive_forward', lt('Phần phải của đầu tôi giữ bên trong chest line của đối thủ để không đưa cổ vào front headlock.', 'My right side of head stays inside the opponent’s chest line so I do not feed front headlock.', 'Le côté droit de ma tête reste inside la ligne de poitrine adverse pour ne pas donner front headlock.'), lt('Vị trí đầu quyết định hướng drive và độ an toàn của cổ.', 'Head position decides drive direction and neck safety.', 'La head position décide direction du drive et sécurité du cou.'), lt('Đầu ra ngoài hip line làm cổ bị kéo dài.', 'Head outside the hip line lengthens the neck.', 'Tête hors hip line allonge le cou.'), lt('Giữ đầu trong.', 'Head inside.', 'Tête inside.'), lt('Đầu an toàn.', 'Head safe.', 'Tête sûre.'), undefined, safetyNote),
  contact(`${seed.id}-shoulder-hip`, lt('Vai ép hông', 'Shoulder drives hip', 'Épaule pousse hanche'), me('near', 'shoulder'), opponent('near', 'hip'), 'push', 'drive_diagonal', lt('Vai gần của tôi ép chéo vào hông gần của đối thủ để phá base.', 'My near shoulder drives diagonally into the opponent’s near hip to break base.', 'Mon épaule proche pousse en diagonale dans la hanche proche adverse pour casser base.'), lt('Shoulder-to-hip biến hand fight thành áp lực toàn thân.', 'Shoulder-to-hip turns hand fight into whole-body pressure.', 'Shoulder-to-hip transforme hand fight en pression corps entier.'), lt('Kéo bằng tay khi vai chưa chạm hông.', 'Pulling with hands while shoulder does not touch hip.', 'Tirer aux mains sans épaule sur hanche.'), lt('Vai vào hông.', 'Shoulder to hip.', 'Épaule hanche.'), lt('Vai drive.', 'Shoulder drives.', 'Épaule pousse.')),
  contact(`${seed.id}-knee-line`, lt('Gối bước ra ngoài', 'Knee steps outside', 'Genou sort dehors'), me('near', 'knee'), opponent('near', 'knee'), 'knee_wedge', 'circle_outside', lt('Gối gần của tôi bước ra ngoài gối gần của đối thủ để tạo góc finish hoặc go-behind.', 'My near knee steps outside the opponent’s near knee to create finish or go-behind angle.', 'Mon genou proche sort à l’extérieur du genou proche adverse pour créer angle finish ou go-behind.'), lt('Outside knee line ngăn họ square lại.', 'Outside knee line stops them squaring back up.', 'La knee line dehors empêche de resquare.'), lt('Đứng square trước mặt họ quá lâu.', 'Standing square in front too long.', 'Rester square devant trop longtemps.'), lt('Gối ra ngoài.', 'Knee outside.', 'Genou dehors.'), lt('Gối ngoài.', 'Outside knee.', 'Genou dehors.')),
  contact(`${seed.id}-foot-post`, lt('Bàn chân chống trụ cho drive', 'Foot posts the drive', 'Pied poste le drive'), me('far', 'foot'), opponent('bottom', 'foot'), 'post', 'drive_forward', lt('Bàn chân xa của tôi chống mạnh xuống thảm để drive xuyên qua chân đối thủ, không kéo bằng lưng.', 'My far foot posts hard on the mat to drive through the opponent’s leg instead of pulling with my back.', 'Mon pied éloigné poste fort au tapis pour driver à travers la jambe adverse au lieu de tirer avec le dos.'), lt('Foot post tạo lực từ sàn.', 'The foot post creates force from the floor.', 'Le foot post crée la force depuis le sol.'), lt('Kéo bằng lưng và để cổ bị kéo dài.', 'Pulling with the back and a long neck.', 'Tirer avec le dos et cou long.'), lt('Chống trụ rồi drive.', 'Post, then drive.', 'Post puis drive.'), lt('Chống chân.', 'Post foot.', 'Pied post.')),
]

const controlContacts = (seed: BodyToBodySeed) => [
  contact(`${seed.id}-chest-shoulder`, lt('Ngực ghim shoulder line', 'Chest pins shoulder line', 'Poitrine pin shoulder line'), me('center', 'chest'), opponent('near', 'shoulder'), 'chest_connection', 'drive_diagonal', lt('Ngực của tôi ép chéo qua shoulder line của đối thủ để vai họ không quay vào trong.', 'My chest drives diagonally through the opponent’s shoulder line so their shoulder cannot turn in.', 'Ma poitrine pousse en diagonale à travers la shoulder line adverse pour empêcher l’épaule de rentrer.'), lt('Khi shoulder line bị ghim, họ khó bridge, turn hoặc recover guard.', 'A pinned shoulder line makes bridge, turn, or guard recovery harder.', 'Une shoulder line pin rend bridge, turn ou recover guard plus difficile.'), lt('Nằm nặng thẳng xuống nhưng không chặn shoulder line.', 'Lying heavy straight down without blocking shoulder line.', 'Peser droit vers le bas sans bloquer shoulder line.'), lt('Ép chéo qua vai.', 'Diagonal shoulder pressure.', 'Pression épaule diagonale.'), lt('Ghim vai.', 'Pin shoulder.', 'Pin épaule.')),
  contact(`${seed.id}-head-head`, lt('Đầu chặn hướng xoay', 'Head blocks turn', 'Tête bloque rotation'), me('near', 'head'), opponent('near', 'head'), 'head_position', 'pin_inward', lt('Đầu của tôi chặn phần đầu gần của đối thủ để họ không quay mặt về hướng thoát.', 'My head blocks the opponent’s near side of head so they cannot turn the face toward escape.', 'Ma tête bloque le côté proche de la tête adverse pour empêcher le visage de tourner vers la sortie.'), lt('Head block điều khiển hướng của shoulder line.', 'The head block controls shoulder-line direction.', 'Le blocage de tête dirige shoulder line.'), lt('Để đầu quá xa khiến họ quay mặt trước.', 'Leaving the head far lets them turn the face first.', 'Tête loin laisse tourner le visage.'), lt('Đầu chặn hướng xoay.', 'Head blocks turn.', 'Tête bloque turn.'), lt('Chặn bằng đầu.', 'Head block.', 'Tête bloque.')),
  contact(`${seed.id}-hand-wrist`, lt('Tay theo dõi cổ tay', 'Hand monitors wrist', 'Main surveille poignet'), me('near', 'hand'), opponent('near', 'wrist'), 'hand_fight', 'pull_toward_you', lt('Tay gần của tôi kiểm soát cổ tay gần của đối thủ để họ không dựng frame vào cổ tôi.', 'My near hand controls the opponent’s near wrist so they cannot build a frame into my neck.', 'Ma main proche contrôle le poignet proche adverse pour empêcher le frame sur mon cou.'), lt('Kiểm soát cổ tay làm frame của họ chậm hơn.', 'Wrist control slows the frame.', 'Le contrôle du poignet ralentit le frame.'), lt('Bỏ qua cổ tay rồi chỉ tăng pressure.', 'Ignoring the wrist and only adding pressure.', 'Ignorer le poignet et juste augmenter pression.'), lt('Cổ tay trước pressure.', 'Wrist before pressure.', 'Poignet avant pression.'), lt('Theo dõi cổ tay.', 'Watch wrist.', 'Surveille poignet.')),
  contact(`${seed.id}-knee-hip`, lt('Gối chặn hông', 'Knee blocks hip', 'Genou bloque hanche'), me('near', 'knee'), opponent('near', 'hip'), 'knee_wedge', 'pin_inward', lt('Gối gần của tôi chặn hông gần của đối thủ để họ không shrimp ra ngoài pressure.', 'My near knee blocks the opponent’s near hip so they cannot shrimp outside the pressure.', 'Mon genou proche bloque la hanche proche adverse pour empêcher le shrimp hors pression.'), lt('Hip block giữ pressure trên đúng line.', 'The hip block keeps pressure on the correct line.', 'Le blocage de hanche garde la pression sur la bonne ligne.'), lt('Gối quá xa hông làm họ recover knee.', 'Knee too far from hip lets them recover knee.', 'Genou trop loin de hanche laisse récupérer genou.'), lt('Gối sát hông.', 'Knee to hip.', 'Genou hanche.'), lt('Chặn hông.', 'Block hip.', 'Bloque hanche.')),
  contact(`${seed.id}-hip-heavy`, lt('Hông giữ nặng', 'Hips stay heavy', 'Hanches lourdes'), me('both', 'hip'), opponent('both', 'hip'), 'hip_connection', 'drive_diagonal', lt('Hông của tôi ép chéo qua hông đối thủ để control không phụ thuộc vào tay.', 'My hips drive diagonally through the opponent’s hips so control does not depend on my arms.', 'Mes hanches poussent en diagonale à travers les hanches adverses pour que le contrôle ne dépende pas des bras.'), lt('Hông tạo phân bổ trọng lượng bền hơn grip.', 'Hips create more durable weight distribution than grips.', 'Les hanches créent une répartition de poids plus durable que les grips.'), lt('Hông nhẹ, tay kéo quá nhiều.', 'Light hips and too much arm pulling.', 'Hanches légères et trop de traction bras.'), lt('Hông nặng theo góc chéo.', 'Heavy diagonal hips.', 'Hanches lourdes diagonales.'), lt('Hông nặng.', 'Heavy hips.', 'Hanches lourdes.')),
]

const contactsFor = (seed: BodyToBodySeed) => {
  if (seed.domain === 'submission_systems') return submissionContacts(seed)
  if (seed.domain === 'passing') return passingContacts(seed)
  if (seed.domain === 'escapes' || seed.domain === 'survival_defense') return escapeContacts(seed)
  if (seed.domain === 'guard_retention' || seed.domain === 'guard_offense') return guardContacts(seed)
  if (seed.domain === 'wrestle_up_wrestling') return wrestlingContacts(seed)
  return controlContacts(seed)
}

export const bodyToBodyDetailsForSkill = (seed: BodyToBodySeed): BodyToBodyDetailSystem => {
  const contacts = contactsFor(seed)
  return system(seed, [
    phase(`${seed.id}-entry`, lt('Contact vào đầu tiên', 'Entry contact', 'Contact d’entrée'), lt('Tạo contact đầu tiên mà không mất posture hoặc safety line.', 'Build first contact without losing posture or safety line.', 'Créer le premier contact sans perdre posture ou safety line.'), contacts.slice(0, 2), lt('Contact đầu tiên buộc đối thủ phải đổi base.', 'The first contact makes the opponent change base.', 'Le premier contact force l’adversaire à changer base.'), lt('Bạn kéo hoặc đẩy nhưng body line không đổi.', 'You pull or push but body lines do not change.', 'Vous tirez ou poussez sans changer les lignes du corps.')),
    phase(`${seed.id}-control`, lt('Clamp / kiểm soát', 'Clamp / control', 'Clamp / contrôle'), lt('Đóng shoulder line, hip line hoặc knee line quan trọng nhất.', 'Close the key shoulder line, hip line, or knee line.', 'Fermer la shoulder line, hip line ou knee line clé.'), contacts.slice(2, 4), lt('Line chính của đối thủ bị chặn.', 'The opponent’s key line is blocked.', 'La ligne clé adverse est bloquée.'), lt('Đối thủ pummel lại vào trong hoặc dựng lại frame.', 'The opponent pummels back inside or rebuilds a frame.', 'L’adversaire pummel inside ou reconstruit frame.')),
    phase(`${seed.id}-branch`, lt('Finish / chuyển nhánh', 'Finish / branch', 'Finish / branche'), lt('Ổn định, finish hoặc chuyển nhánh trước khi mất contact.', 'Stabilize, finish, or branch before contact is lost.', 'Stabiliser, finir ou brancher avant de perdre le contact.'), contacts.slice(4), lt('Bạn giữ được vị trí hoặc vào nhánh tiếp theo.', 'You keep position or enter the next branch.', 'Vous gardez la position ou entrez dans la branche suivante.'), lt('Contact bị mất trước khi bạn ổn định.', 'Contact is lost before you stabilize.', 'Le contact est perdu avant stabilisation.')),
  ], contacts.slice(0, 5).map((item) => item.id))
}