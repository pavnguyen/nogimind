import type {
  FastFinishPath,
  LeftRightGuide,
  LocalizedStringArray,
  LocalizedText,
  MicroDetail,
  MicroDetailSystem,
} from '../types/skill'

const lt = (vi: string, en = vi, fr = en): LocalizedText => ({ vi, en, fr })
const la = (vi: string[], en: string[], fr: string[]): LocalizedStringArray => ({ vi, en, fr })

const md = (
  id: string,
  category: MicroDetail['category'],
  title: LocalizedText,
  shortInstruction: LocalizedText,
  side: MicroDetail['side'],
  direction: MicroDetail['direction'],
  bodyParts: string[],
  whenToUse: LocalizedText,
  whyItWorks: LocalizedText,
  commonMistake: LocalizedText,
  correctionCue: LocalizedText,
  liveCue: LocalizedText,
  safetyNote?: LocalizedText,
): MicroDetail => ({ id, category, title, shortInstruction, side, direction, bodyParts, whenToUse, whyItWorks, commonMistake, correctionCue, liveCue, safetyNote })

const path = (
  id: string,
  title: LocalizedText,
  steps: FastFinishPath['steps'],
  finishTrigger: LocalizedText,
  abortSignal: LocalizedText,
  nextBestOption: LocalizedText,
  safetyNote?: LocalizedText,
): FastFinishPath => ({ id, title, steps, finishTrigger, abortSignal, nextBestOption, safetyNote })

const guide = (
  id: string,
  scenario: LocalizedText,
  leftHand: LocalizedText,
  rightHand: LocalizedText,
  leftLeg: LocalizedText,
  rightLeg: LocalizedText,
  head: LocalizedText = lt('', '', ''),
  hips: LocalizedText = lt('', '', ''),
  note: LocalizedText = lt('', '', ''),
): LeftRightGuide => ({ id, scenario, leftHand, rightHand, leftLeg, rightLeg, head, hips, note })

const safety = la(
  [
    'Tap sớm khi cổ, khuỷu gối, cổ chân hoặc vai bị xoắn.',
    'Không crank hoặc xoay mù khi chưa kiểm soát được đường an toàn.',
    'Tập với partner kiểm soát được lực.',
  ],
  [
    'Tap early when the neck, knee, ankle, or shoulder twists.',
    'Do not crank or spin blindly when the safety line is unclear.',
    'Train with a partner who can control force.',
  ],
  [
    'Tapez tôt si le cou, genou, cheville ou épaule se tord.',
    'Ne crank pas et ne tournez pas à l’aveugle si la ligne de sécurité est floue.',
    'Travaillez avec un partenaire qui contrôle la force.',
  ],
)

const safetyText = lt(
  'An toàn: tập chậm, tap sớm, và không xoay mù khi chưa rõ đường an toàn.',
  'Safety: train slowly, tap early, and do not spin blindly when the safety line is unclear.',
  'Sécurité : travaillez lentement, tapez tôt et ne tournez pas à l’aveugle quand la ligne de sécurité n’est pas claire.',
)

export const omoplataMicroDetailSystemEntry: [string, MicroDetailSystem] = ['omoplata-system', {
  overview: lt('Omoplata là shoulder clamp + wrist control + hip angle; finish hoặc sweep đến từ hông, không từ giật vai.', 'Omoplata is shoulder clamp plus wrist control plus hip angle; the finish or sweep comes from hips, not shoulder jerking.', 'Omoplata = clamp épaule + poignet + angle hanche; finish/sweep par les hanches, pas coup épaule.'),
  topFiveDetails: [
    md('omoplata-shin-shoulder', 'knee', lt('Shin kẹp shoulder line', 'Shin clamps shoulder line', 'Tibia clamp shoulder line'), lt('Ống chân attacker kẹp qua shoulder line của defender trước khi attacker ngồi dậy.', 'The attacker’s shin clamps across the defender’s shoulder line before the attacker sits up.', 'Le tibia clamp shoulder line avant de se redresser.'), 'right', 'clamp', ['shins', 'shoulders'], lt('Khi defender posture thấp.', 'When defender posture is low.', 'Quand posture basse.'), lt('Shoulder bị kẹp nên defender khó rút arm hoặc posture.', 'The shoulder is clamped, so the defender cannot easily pull the arm free or posture.', 'Épaule clampée donc difficile de sortir bras/posture.'), lt('Shin thấp dưới elbow line.', 'Shin low below elbow line.', 'Tibia bas sous elbow line.'), lt('Shin over shoulder.', 'Shin over shoulder.', 'Tibia sur épaule.'), lt('Shoulder trapped.', 'Shoulder trapped.', 'Épaule piégée.'), safetyText),
    md('omoplata-wrist-pin', 'hand', lt('Wrist không được post', 'Wrist cannot post', 'Poignet ne peut pas poster'), lt('Tay attacker giữ wrist defender xuống để defender không post hoặc roll sớm.', 'The attacker controls the defender’s wrist down so the defender cannot post or roll early.', 'L’attaquant contrôle le poignet pour empêcher post ou roll tôt.'), 'near', 'pull_toward_you', ['hands', 'wrists'], lt('Trước khi sit up.', 'Before sitting up.', 'Avant de se redresser.'), lt('Wrist control giữ shoulder lever kết nối với hông attacker.', 'Wrist control keeps the shoulder lever connected to the attacker’s hips.', 'Contrôle poignet garde le levier épaule connecté aux hanches.'), lt('Bỏ wrist để ngồi dậy.', 'Releasing the wrist to sit up.', 'Lâcher poignet pour s’asseoir.'), lt('Own wrist.', 'Own wrist.', 'Contrôle poignet.'), lt('No post.', 'No post.', 'Pas de post.'), safetyText),
    md('omoplata-hip-angle', 'hip', lt('Hông ra ngoài vai', 'Hips outside shoulder', 'Hanches hors épaule'), lt('Hông attacker scoot ra ngoài shoulder line để defender bị kéo dài, không nằm square.', 'The attacker’s hips scoot outside the shoulder line so the defender is stretched, not squared.', 'Les hanches sortent hors shoulder line pour allonger le défenseur.'), 'both', 'circle_outside', ['hips', 'shoulders'], lt('Sau khi wrist bị khóa.', 'After wrist is controlled.', 'Après contrôle poignet.'), lt('Hip angle chặn roll path và tạo sweep/finish line.', 'Hip angle blocks the roll path and creates the sweep or finish line.', 'Angle hanche bloque roll path et crée sweep/finish.'), lt('Ở square rồi ép vai.', 'Staying square and forcing the shoulder.', 'Rester square et forcer épaule.'), lt('Hips out first.', 'Hips out first.', 'Hanches dehors.'), lt('Angle outside.', 'Angle outside.', 'Angle dehors.'), safetyText),
    md('omoplata-chest-tall', 'chest', lt('Ngực dựng sau angle', 'Chest tall after angle', 'Poitrine haute après angle'), lt('Ngực attacker dựng lên sau khi hip angle có, giữ defender gập xuống mat.', 'The attacker’s chest rises after hip angle is set, keeping the defender folded toward the mat.', 'La poitrine monte après angle et garde le défenseur plié.'), 'center', 'posture', ['chest', 'spine', 'hips'], lt('Khi bắt đầu settle.', 'When starting to settle.', 'Au début stabilisation.'), lt('Posture cao chuyển lực từ hips vào shoulder thay vì kéo tay.', 'Tall posture transfers force from hips into shoulder instead of arm pulling.', 'Posture haute transfère hanches vers épaule.'), lt('Nằm phẳng kéo bằng tay.', 'Staying flat and pulling with arms.', 'Rester plat et tirer bras.'), lt('Sit tall after angle.', 'Sit tall after angle.', 'Se redresser après angle.'), lt('Posture tall.', 'Posture tall.', 'Posture haute.'), safetyText),
    md('omoplata-slow-shoulder', 'finish', lt('Shoulder pressure chậm', 'Slow shoulder pressure', 'Pression épaule lente'), lt('Hông attacker đi về phía trước từng chút; nếu defender roll thì attacker theo sweep thay vì giật vai.', 'The attacker’s hips move forward gradually; if the defender rolls, the attacker follows the sweep instead of jerking the shoulder.', 'Les hanches avancent lentement; si le défenseur roule, suivre le sweep.'), 'both', 'drive_forward', ['hips', 'shoulders'], lt('Khi defender bị gập và wrist còn bị giữ.', 'When defender is folded and wrist is still controlled.', 'Quand défenseur plié et poignet contrôlé.'), lt('Pressure chậm cho defender thời gian tap và giữ sweep branch.', 'Slow pressure gives the defender time to tap and keeps the sweep branch.', 'Pression lente laisse tap et garde le sweep.'), lt('Giật shoulder lock nhanh.', 'Jerking the shoulder lock fast.', 'Coup rapide sur épaule.'), lt('Slow hips.', 'Slow hips.', 'Hanches lentes.'), lt('Tap or sweep.', 'Tap or sweep.', 'Tap ou sweep.'), safetyText),
  ],
  leftRightGuides: [
    guide('omoplata-right', lt('Omoplata bên phải.', 'Right-side omoplata.', 'Omoplata côté droit.'), lt('Tay phải giữ wrist trái.', 'Right hand controls left wrist.', 'Main droite contrôle poignet gauche.'), lt('Tay trái post để ngồi dậy.', 'Left hand posts to sit up.', 'Main gauche post.'), lt('Chân trái hỗ trợ base.', 'Left leg supports base.', 'Jambe gauche base.'), lt('Shin phải kẹp shoulder trái.', 'Right shin clamps left shoulder.', 'Tibia droit clamp épaule gauche.'), lt('Đầu thấp cho đến khi angle có.', 'Head low until angle is set.', 'Tête basse jusqu’à angle.'), lt('Hông ra ngoài shoulder.', 'Hips outside shoulder.', 'Hanches dehors.'), lt('Wrist, angle, sit tall, slow hips.', 'Wrist, angle, sit tall, slow hips.', 'Poignet, angle, posture, lent.')),
    guide('omoplata-left', lt('Omoplata bên trái.', 'Left-side omoplata.', 'Omoplata côté gauche.'), lt('Tay trái giữ wrist phải.', 'Left hand controls right wrist.', 'Main gauche contrôle poignet droit.'), lt('Tay phải post để ngồi dậy.', 'Right hand posts to sit up.', 'Main droite post.'), lt('Chân phải hỗ trợ base.', 'Right leg supports base.', 'Jambe droite base.'), lt('Shin trái kẹp shoulder phải.', 'Left shin clamps right shoulder.', 'Tibia gauche clamp épaule droite.'), lt('Đầu thấp cho đến khi angle có.', 'Head low until angle is set.', 'Tête basse jusqu’à angle.'), lt('Hông ra ngoài shoulder.', 'Hips outside shoulder.', 'Hanches dehors.'), lt('Wrist, angle, sit tall, slow hips.', 'Wrist, angle, sit tall, slow hips.', 'Poignet, angle, posture, lent.')),
  ],
  fastFinishPaths: [
    path('omoplata-fast-path', lt('Đường omoplata sạch', 'Clean omoplata path', 'Chemin omoplata propre'), [
      { id: '1', order: 1, instruction: lt('Shin kẹp shoulder.', 'Shin clamps shoulder.', 'Tibia clamp épaule.'), keyBodyPart: 'shins', commonMistake: lt('Shin thấp.', 'Shin low.', 'Tibia bas.') },
      { id: '2', order: 2, instruction: lt('Wrist không post.', 'Wrist cannot post.', 'Poignet sans post.'), keyBodyPart: 'hands', commonMistake: lt('Bỏ wrist.', 'Releasing wrist.', 'Lâcher poignet.') },
      { id: '3', order: 3, instruction: lt('Hông ra ngoài.', 'Hips outside.', 'Hanches dehors.'), keyBodyPart: 'hips', commonMistake: lt('Square.', 'Square.', 'Square.') },
      { id: '4', order: 4, instruction: lt('Ngồi cao.', 'Sit tall.', 'Posture haute.'), keyBodyPart: 'chest', commonMistake: lt('Nằm phẳng.', 'Flat.', 'Plat.') },
      { id: '5', order: 5, instruction: lt('Hông tiến chậm.', 'Hips advance slowly.', 'Hanches avancent lentement.'), keyBodyPart: 'hips', commonMistake: lt('Giật vai.', 'Jerking shoulder.', 'Coup épaule.') },
    ], lt('Tap hoặc sweep xuất hiện có kiểm soát.', 'Tap or sweep appears under control.', 'Tap ou sweep sous contrôle.'), lt('Defender roll hoặc posture thoát.', 'Defender rolls or postures out.', 'Défenseur roll ou posture.'), lt('Theo sweep, triangle hoặc clamp reset.', 'Follow sweep, triangle, or clamp reset.', 'Suivre sweep, triangle ou reset clamp.'), safetyText),
  ],
  troubleshootingTips: [
    { problem: lt('Defender roll thoát.', 'Defender rolls out.', 'Défenseur roll out.'), quickFix: lt('Giữ wrist và theo sweep thay vì bám shoulder lock.', 'Keep wrist and follow the sweep instead of clinging to shoulder lock.', 'Garder poignet et suivre sweep.'), cue: lt('Follow the roll.', 'Follow the roll.', 'Suivre roll.') },
    { problem: lt('Không ngồi dậy được.', 'Cannot sit up.', 'Impossible de se redresser.'), quickFix: lt('Scoot hông ra ngoài trước, rồi post tay.', 'Scoot hips outside first, then post the hand.', 'Hanches dehors puis post main.'), cue: lt('Hips out.', 'Hips out.', 'Hanches dehors.') },
    { problem: lt('Shoulder pressure đau nhưng không tap.', 'Shoulder pressure hurts but no tap.', 'Pression douloureuse sans tap.'), quickFix: lt('Dừng giật; dựng chest và đưa hips tiến chậm.', 'Stop jerking; sit tall and move hips forward slowly.', 'Stop coup; posture haute et hanches lentes.'), cue: lt('Slow hips.', 'Slow hips.', 'Hanches lentes.') },
    { problem: lt('Defender posture lên.', 'Defender postures up.', 'Défenseur posture.'), quickFix: lt('Shin cao hơn shoulder line và giữ wrist xuống.', 'Raise shin above shoulder line and keep wrist down.', 'Tibia haut et poignet bas.'), cue: lt('Shin high.', 'Shin high.', 'Tibia haut.') },
    { problem: lt('Bị stack lại.', 'You get stacked back.', 'Vous êtes stacké.'), quickFix: lt('Angle ra ngoài thay vì kéo thẳng.', 'Angle outside instead of pulling straight.', 'Angle dehors, pas tirer droit.'), cue: lt('Outside angle.', 'Outside angle.', 'Angle dehors.') },
  ],
  doNotDo: la(['Đừng bỏ wrist.', 'Đừng ép vai nhanh.', 'Đừng nằm square.', 'Đừng ngồi dậy trước khi shoulder bị kẹp.', 'Đừng bỏ sweep branch.'], ['Do not release the wrist.', 'Do not force the shoulder fast.', 'Do not stay square.', 'Do not sit up before the shoulder is clamped.', 'Do not ignore the sweep branch.'], ['Ne lâchez pas poignet.', 'Ne forcez pas épaule vite.', 'Ne restez pas square.', 'Ne vous redressez pas avant clamp.', 'Gardez le sweep.']),
  safetyNotes: safety,
}]

