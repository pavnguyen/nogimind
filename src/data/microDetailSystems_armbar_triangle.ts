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
    'Tap sớm khi cổ, gối, mắt cá chân hoặc vai bị xoắn.',
    'Không crank hoặc xoay mù khi chưa rõ đường an toàn.',
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

export const armbarTriangleMicroDetailSystemEntries: Array<[string, MicroDetailSystem]> = [
  ['armbar-system', {
    overview: lt('Armbar sạch là shoulder isolation, wrist/thumb direction và elbow trên hip line trước khi extension.', 'A clean armbar is shoulder isolation, wrist/thumb direction, and elbow above the hip line before extension.', 'Un armbar propre = isolation épaule, direction poignet/pouce et coude au-dessus de la hip line avant extension.'),
    topFiveDetails: [
      md('armbar-knee-near-head', 'knee', lt('Gối sát đầu/vai', 'Knee beside head/shoulder', 'Genou près tête/épaule'), lt('Gối phải của attacker chèn sát vai phải của defender trước khi ngả về armbar.', 'The attacker’s right knee wedges beside the defender’s right shoulder before sitting back.', 'Le genou droit de l’attaquant bloque l’épaule droite du défenseur avant de partir armbar.'), 'right', 'wedge', ['knees', 'shoulders'], lt('Trước khi ngả người.', 'Before sitting back.', 'Avant de partir en arrière.'), lt('Vai bị kẹp nên defender khó ngồi dậy hoặc rút elbow.', 'The shoulder is trapped, so the defender cannot easily sit up or pull the elbow free.', 'L’épaule est piégée, donc le défenseur ne peut pas se relever ou sortir le coude.'), lt('Gối xa đầu tạo đường stack.', 'A knee far from the head opens the stack path.', 'Genou loin ouvre le stack.'), lt('Knee near ear.', 'Knee near ear.', 'Genou près oreille.'), lt('Shoulder trapped.', 'Shoulder trapped.', 'Épaule piégée.'), safetyText),
      md('armbar-second-leg-posture', 'foot', lt('Chân thứ hai chặn posture', 'Second leg blocks posture', 'Deuxième jambe bloque posture'), lt('Ống chân trái của attacker đè qua chest/head line để defender không ngồi dậy.', 'The attacker’s left shin presses across the defender’s chest/head line so the defender cannot sit up.', 'Le tibia gauche presse poitrine/tête pour empêcher de se relever.'), 'left', 'compress_down', ['shins', 'chest', 'head'], lt('Khi elbow line đã lộ.', 'When the elbow line is exposed.', 'Quand elbow line est exposée.'), lt('Posture bị khóa trước khi elbow extension vào.', 'Posture is locked before elbow extension enters.', 'La posture est verrouillée avant extension du coude.'), lt('Chân thứ hai lỏng cho defender stack.', 'A loose second leg lets the defender stack.', 'Deuxième jambe lâche permet stack.'), lt('Both legs own posture.', 'Both legs own posture.', 'Deux jambes contrôlent posture.'), lt('Posture broken.', 'Posture broken.', 'Posture cassée.'), safetyText),
      md('armbar-thumb-line', 'hand', lt('Thumb line chỉ hướng elbow', 'Thumb line reveals elbow', 'Pouce révèle le coude'), lt('Hai tay attacker giữ wrist và xoay thumb của defender lên trước khi lift hip.', 'Both attacker hands control the wrist and rotate the defender’s thumb up before the hip lift.', 'Les deux mains contrôlent le poignet et orientent le pouce vers le haut avant hanches.'), 'both', 'pull_toward_you', ['hands', 'wrists', 'elbows'], lt('Ngay trước extension.', 'Right before extension.', 'Juste avant extension.'), lt('Thumb direction làm elbow line nằm đúng trên hip fulcrum.', 'Thumb direction puts the elbow line on the hip fulcrum.', 'La direction du pouce place le coude sur le pivot des hanches.'), lt('Kéo forearm nhưng không biết thumb direction.', 'Pulling the forearm without knowing thumb direction.', 'Tirer avant-bras sans direction pouce.'), lt('Thumb up before hips.', 'Thumb up before hips.', 'Pouce avant hanches.'), lt('Elbow on hip line.', 'Elbow on hip line.', 'Coude sur hip line.'), safetyText),
      md('armbar-hips-shoulder', 'hip', lt('Hông sát vai', 'Hips close to shoulder', 'Hanches près épaule'), lt('Hông attacker áp sát vai defender để elbow không trượt xuống dưới hip line.', 'The attacker’s hips stay tight to the defender’s shoulder so the elbow cannot slide below the hip line.', 'Les hanches restent près de l’épaule pour empêcher le coude de descendre.'), 'both', 'close_in', ['hips', 'shoulders', 'elbows'], lt('Trong lúc giữ finish line.', 'While holding the finish line.', 'Pendant la ligne de finish.'), lt('Hip line là điểm tựa; nếu hông xa thì elbow thoát.', 'The hip line is the fulcrum; if hips drift away, the elbow escapes.', 'La hip line est le pivot; hanches loin = coude sort.'), lt('Ngả người khi hông rời vai.', 'Falling back while hips drift from the shoulder.', 'Tomber avec hanches loin de l’épaule.'), lt('Hips to shoulder.', 'Hips to shoulder.', 'Hanches épaule.'), lt('No elbow space.', 'No elbow space.', 'Pas espace coude.'), safetyText),
      md('armbar-slow-extension', 'finish', lt('Extension tăng chậm', 'Gradual extension', 'Extension progressive'), lt('Hai gối attacker pinch quanh elbow line rồi hông lift chậm đến khi defender tap.', 'Both attacker knees pinch around the elbow line, then the hips lift slowly until the defender taps.', 'Les genoux pincent elbow line puis les hanches montent lentement jusqu’au tap.'), 'both', 'lift_up', ['knees', 'hips', 'elbows'], lt('Khi shoulder và wrist đã bị khóa.', 'When shoulder and wrist are locked.', 'Quand épaule et poignet sont verrouillés.'), lt('Extension chậm bảo vệ elbow và giữ control nếu defender xoay.', 'Slow extension protects the elbow and preserves control if the defender rotates.', 'Extension lente protège le coude et garde le contrôle.'), lt('Giật hông nhanh khi partner chưa kịp tap.', 'Jerking the hips before the partner can tap.', 'Coup de hanches avant tap.'), lt('Pinch, then lift.', 'Pinch, then lift.', 'Pincer puis lever.'), lt('Tap before spike.', 'Tap before spike.', 'Tap avant pic.'), safetyText),
    ],
    leftRightGuides: [
      guide('armbar-right', lt('Armbar bên phải.', 'Right-side armbar.', 'Armbar côté droit.'), lt('Hai tay giữ wrist phải.', 'Both hands control right wrist.', 'Deux mains contrôlent poignet droit.'), lt('Tay phải kéo thumb line lên.', 'Right hand lifts thumb line.', 'Main droite oriente pouce.'), lt('Chân trái đè chest/head line.', 'Left leg blocks chest/head line.', 'Jambe gauche bloque posture.'), lt('Gối phải sát tai/vai.', 'Right knee stays beside ear/shoulder.', 'Genou droit près oreille.'), lt('Đầu thấp, mắt nhìn elbow.', 'Head low, eyes on elbow.', 'Tête basse, yeux sur coude.'), lt('Hông sát vai.', 'Hips close to shoulder.', 'Hanches près épaule.'), lt('Knee, thumb, hips, slow lift.', 'Knee, thumb, hips, slow lift.', 'Genou, pouce, hanches, lent.')),
      guide('armbar-left', lt('Armbar bên trái.', 'Left-side armbar.', 'Armbar côté gauche.'), lt('Hai tay giữ wrist trái.', 'Both hands control left wrist.', 'Deux mains contrôlent poignet gauche.'), lt('Tay trái kéo thumb line lên.', 'Left hand lifts thumb line.', 'Main gauche oriente pouce.'), lt('Chân phải đè chest/head line.', 'Right leg blocks chest/head line.', 'Jambe droite bloque posture.'), lt('Gối trái sát tai/vai.', 'Left knee stays beside ear/shoulder.', 'Genou gauche près oreille.'), lt('Đầu thấp, mắt nhìn elbow.', 'Head low, eyes on elbow.', 'Tête basse, yeux sur coude.'), lt('Hông sát vai.', 'Hips close to shoulder.', 'Hanches près épaule.'), lt('Knee, thumb, hips, slow lift.', 'Knee, thumb, hips, slow lift.', 'Genou, pouce, hanches, lent.')),
    ],
    fastFinishPaths: [
      path('armbar-fast-path', lt('Đường armbar sạch', 'Clean armbar path', 'Chemin armbar propre'), [
        { id: '1', order: 1, instruction: lt('Gối sát đầu/vai.', 'Knee beside head/shoulder.', 'Genou près tête/épaule.'), keyBodyPart: 'knees', commonMistake: lt('Gối xa đầu.', 'Knee far from head.', 'Genou loin.') },
        { id: '2', order: 2, instruction: lt('Chân thứ hai chặn posture.', 'Second leg blocks posture.', 'Deuxième jambe bloque posture.'), keyBodyPart: 'legs', commonMistake: lt('Chân lỏng.', 'Loose leg.', 'Jambe lâche.') },
        { id: '3', order: 3, instruction: lt('Thumb line lên.', 'Thumb line up.', 'Pouce vers le haut.'), keyBodyPart: 'hands', commonMistake: lt('Không thấy thumb.', 'No thumb read.', 'Pouce non lu.') },
        { id: '4', order: 4, instruction: lt('Hông sát vai.', 'Hips close to shoulder.', 'Hanches près épaule.'), keyBodyPart: 'hips', commonMistake: lt('Hông xa.', 'Hips far.', 'Hanches loin.') },
        { id: '5', order: 5, instruction: lt('Pinch rồi lift chậm.', 'Pinch, then lift slowly.', 'Pincer puis lever lentement.'), keyBodyPart: 'hips', commonMistake: lt('Giật nhanh.', 'Fast jerk.', 'Coup rapide.') },
      ], lt('Elbow nằm trên hip line và partner tap an toàn.', 'Elbow stays on the hip line and partner taps safely.', 'Coude sur hip line et tap sûr.'), lt('Elbow tuột xuống dưới hip line.', 'Elbow slips below the hip line.', 'Coude sous hip line.'), lt('Quay về S-mount, triangle hoặc kimura grip.', 'Return to S-mount, triangle, or kimura grip.', 'Revenir S-mount, triangle ou kimura.'), safetyText),
    ],
    troubleshootingTips: [
      { problem: lt('Elbow tuột ra.', 'The elbow slips out.', 'Le coude sort.'), quickFix: lt('Đưa hông sát vai và pinch gối trước extension.', 'Move hips to the shoulder and pinch knees before extension.', 'Hanches vers épaule et genoux serrés.'), cue: lt('Hips to shoulder.', 'Hips to shoulder.', 'Hanches épaule.') },
      { problem: lt('Bị stack.', 'You get stacked.', 'Vous êtes stacké.'), quickFix: lt('Chân thứ hai đè chest/head line và quay angle.', 'Use the second leg across chest/head line and turn the angle.', 'Deuxième jambe bloque posture et angle.'), cue: lt('Posture blocked.', 'Posture blocked.', 'Posture bloquée.') },
      { problem: lt('Finish thành crank đau.', 'Finish becomes painful crank.', 'Le finish devient crank.'), quickFix: lt('Đọc thumb line và tăng extension chậm.', 'Read thumb line and extend slowly.', 'Lire le pouce et extension lente.'), cue: lt('Thumb first.', 'Thumb first.', 'Pouce d’abord.') },
      { problem: lt('Defender xoay thumb xuống.', 'Defender rotates thumb down.', 'Défenseur tourne pouce bas.'), quickFix: lt('Hai tay giữ wrist và đưa thumb về ceiling.', 'Control wrist with both hands and return thumb to ceiling.', 'Deux mains sur poignet, pouce plafond.'), cue: lt('Own wrist.', 'Own wrist.', 'Contrôle poignet.') },
      { problem: lt('Mất vị trí khi ngả.', 'You lose position when sitting back.', 'Vous perdez position.'), quickFix: lt('Gối sát đầu trước, rồi mới ngả.', 'Knee beside head first, then sit back.', 'Genou près tête avant de partir.'), cue: lt('Knee first.', 'Knee first.', 'Genou d’abord.') },
    ],
    doNotDo: la(['Đừng ngả khi gối xa đầu.', 'Đừng giật hông nhanh.', 'Đừng bỏ thumb line.', 'Đừng mở gối khi finish.', 'Đừng kéo bằng tay thay vì hông.'], ['Do not sit back with the knee far from the head.', 'Do not jerk the hips fast.', 'Do not ignore thumb line.', 'Do not open the knees while finishing.', 'Do not pull with arms instead of hips.'], ['Ne partez pas avec genou loin.', 'Ne donnez pas de coup de hanches.', 'N’ignorez pas le pouce.', 'N’ouvrez pas les genoux.', 'Ne tirez pas aux bras.']),
    safetyNotes: safety,
  }],
  ['triangle-system', {
    overview: lt('Triangle thắng bằng one-shoulder-in/one-shoulder-out, posture break và angle về trapped-arm side.', 'Triangle wins through one shoulder in/one shoulder out, posture break, and angle toward the trapped-arm side.', 'Le triangle gagne avec une épaule dedans/dehors, posture cassée et angle côté bras piégé.'),
    topFiveDetails: [
      md('triangle-shoulder-split', 'knee', lt('Một vai trong, một vai ngoài', 'One shoulder in, one shoulder out', 'Une épaule dedans, une dehors'), lt('Đùi attacker giữ một vai defender trong triangle trong khi vai kia bị đẩy ra ngoài.', 'The attacker’s thigh keeps one defender shoulder inside the triangle while the other shoulder is pushed out.', 'La cuisse garde une épaule dedans tandis que l’autre est dehors.'), 'both', 'close_in', ['thighs', 'shoulders'], lt('Trước khi khóa triangle.', 'Before locking the triangle.', 'Avant de verrouiller.'), lt('Shoulder split tạo khung strangle thật thay vì squeeze square.', 'The shoulder split creates the real strangle frame instead of a square squeeze.', 'La séparation d’épaules crée le vrai étranglement.'), lt('Hai vai cùng lọt vào trong làm triangle yếu.', 'Both shoulders inside makes the triangle weak.', 'Deux épaules dedans affaiblit.'), lt('One shoulder out.', 'One shoulder out.', 'Une épaule dehors.'), lt('Shoulder split.', 'Shoulder split.', 'Épaules séparées.'), safetyText),
      md('triangle-posture-break', 'hand', lt('Phá posture bằng đầu và wrist', 'Break posture with head and wrist', 'Casser posture tête/poignet'), lt('Hai tay attacker kéo đầu defender xuống trong khi giữ wrist bị kẹt qua centerline.', 'Both attacker hands pull the defender’s head down while the trapped wrist stays across centerline.', 'Les deux mains tirent la tête pendant que le poignet piégé traverse centerline.'), 'both', 'pull_toward_you', ['hands', 'head', 'wrists'], lt('Ngay khi shin qua cổ.', 'As soon as the shin crosses the neck.', 'Dès que tibia passe cou.'), lt('Posture thấp ngăn stack và giữ neck line đóng.', 'Low posture prevents stacking and keeps the neck line closed.', 'Posture basse bloque stack et garde cou fermé.'), lt('Khóa chân khi defender còn cao.', 'Locking legs while defender posture is tall.', 'Verrouiller jambes posture haute.'), lt('Posture first.', 'Posture first.', 'Posture d’abord.'), lt('Head down.', 'Head down.', 'Tête basse.'), safetyText),
      md('triangle-angle-cut', 'hip', lt('Angle về trapped arm', 'Angle toward trapped arm', 'Angle côté bras piégé'), lt('Hông attacker xoay về phía tay bị kẹt của defender trước khi squeeze.', 'The attacker’s hips rotate toward the defender’s trapped arm before squeezing.', 'Les hanches tournent côté bras piégé avant squeeze.'), 'both', 'circle_outside', ['hips', 'knees', 'shoulders'], lt('Sau posture break.', 'After posture break.', 'Après posture cassée.'), lt('Angle làm thigh cắt đúng neck line và giảm lực cổ.', 'The angle lines the thigh through the neck and reduces neck force.', 'L’angle aligne cuisse/cou et réduit force cervicale.'), lt('Ở square trước mặt defender.', 'Staying square in front of the defender.', 'Rester square devant.'), lt('Angle before squeeze.', 'Angle before squeeze.', 'Angle avant squeeze.'), lt('Hip angle.', 'Hip angle.', 'Angle hanche.'), safetyText),
      md('triangle-foot-hidden', 'foot', lt('Foot giấu sau gối', 'Foot hidden behind knee', 'Pied caché derrière genou'), lt('Bàn chân attacker giấu sau gối khóa để defender không bóc được lock.', 'The attacker’s foot hides behind the locking knee so the defender cannot peel it.', 'Le pied se cache derrière le genou pour empêcher peel.'), 'near', 'hide', ['feet', 'knees'], lt('Khi khóa figure-four.', 'When locking the figure-four.', 'Pendant figure-four.'), lt('Foot hidden giữ lock chắc mà không kéo ankle.', 'Hidden foot keeps the lock tight without pulling the ankle.', 'Pied caché garde le lock sans tirer cheville.'), lt('Foot exposed trên hip cho defender peel.', 'Foot exposed on the hip lets the defender peel.', 'Pied exposé permet peel.'), lt('Hide foot.', 'Hide foot.', 'Cacher pied.'), lt('Lock protected.', 'Lock protected.', 'Lock protégé.'), safetyText),
      md('triangle-knees-finish', 'finish', lt('Gối finish, tay giữ posture', 'Knees finish, hands hold posture', 'Genoux finissent, mains gardent posture'), lt('Hai gối attacker đóng vào shoulder line sau khi angle đã cắt; tay chỉ giữ posture.', 'Both attacker knees close into the shoulder line after the angle is cut; hands only keep posture.', 'Les genoux ferment shoulder line après angle; les mains gardent posture.'), 'both', 'close_in', ['knees', 'shoulders', 'head'], lt('Khi angle đã đúng.', 'When the angle is correct.', 'Quand angle est correct.'), lt('Knees tạo strangle sạch hơn kéo đầu thô.', 'Knees create a cleaner strangle than rough head pulling.', 'Les genoux créent un étranglement plus propre que tirer tête.'), lt('Kéo đầu mạnh thành neck crank.', 'Pulling the head hard becomes a neck crank.', 'Tirer fort la tête devient crank.'), lt('Knees, not neck.', 'Knees, not neck.', 'Genoux, pas cou.'), lt('Small squeeze.', 'Small squeeze.', 'Petite pression.'), safetyText),
    ],
    leftRightGuides: [
      guide('triangle-right', lt('Triangle bên phải.', 'Right-side triangle.', 'Triangle côté droit.'), lt('Hai tay kéo đầu và wrist.', 'Both hands pull head and wrist.', 'Deux mains tête/poignet.'), lt('Tay phải giữ posture.', 'Right hand keeps posture.', 'Main droite garde posture.'), lt('Chân trái khóa sau gối.', 'Left leg locks behind knee.', 'Jambe gauche verrouille.'), lt('Chân phải cắt qua cổ.', 'Right leg cuts across neck.', 'Jambe droite coupe cou.'), lt('Đầu defender kéo xuống.', 'Defender head pulled down.', 'Tête défenseur basse.'), lt('Hông xoay về tay bị kẹt.', 'Hips turn toward trapped arm.', 'Hanches côté bras piégé.'), lt('Shoulder split, posture, angle.', 'Shoulder split, posture, angle.', 'Épaules, posture, angle.')),
      guide('triangle-left', lt('Triangle bên trái.', 'Left-side triangle.', 'Triangle côté gauche.'), lt('Hai tay kéo đầu và wrist.', 'Both hands pull head and wrist.', 'Deux mains tête/poignet.'), lt('Tay trái giữ posture.', 'Left hand keeps posture.', 'Main gauche garde posture.'), lt('Chân phải khóa sau gối.', 'Right leg locks behind knee.', 'Jambe droite verrouille.'), lt('Chân trái cắt qua cổ.', 'Left leg cuts across neck.', 'Jambe gauche coupe cou.'), lt('Đầu defender kéo xuống.', 'Defender head pulled down.', 'Tête défenseur basse.'), lt('Hông xoay về tay bị kẹt.', 'Hips turn toward trapped arm.', 'Hanches côté bras piégé.'), lt('Shoulder split, posture, angle.', 'Shoulder split, posture, angle.', 'Épaules, posture, angle.')),
    ],
    fastFinishPaths: [
      path('triangle-fast-path', lt('Đường triangle sạch', 'Clean triangle path', 'Chemin triangle propre'), [
        { id: '1', order: 1, instruction: lt('Một vai trong, một vai ngoài.', 'One shoulder in, one out.', 'Une épaule dedans/dehors.'), keyBodyPart: 'knees', commonMistake: lt('Hai vai trong.', 'Both shoulders in.', 'Deux épaules dedans.') },
        { id: '2', order: 2, instruction: lt('Kéo posture xuống.', 'Pull posture down.', 'Casser posture.'), keyBodyPart: 'hands', commonMistake: lt('Posture cao.', 'Tall posture.', 'Posture haute.') },
        { id: '3', order: 3, instruction: lt('Cắt angle.', 'Cut angle.', 'Couper angle.'), keyBodyPart: 'hips', commonMistake: lt('Square.', 'Square.', 'Square.') },
        { id: '4', order: 4, instruction: lt('Giấu foot.', 'Hide foot.', 'Cacher pied.'), keyBodyPart: 'feet', commonMistake: lt('Foot exposed.', 'Foot exposed.', 'Pied exposé.') },
        { id: '5', order: 5, instruction: lt('Đóng gối.', 'Close knees.', 'Fermer genoux.'), keyBodyPart: 'knees', commonMistake: lt('Kéo cổ.', 'Neck pull.', 'Tirer cou.') },
      ], lt('Triangle đóng bằng knees sau angle.', 'Triangle closes with knees after angle.', 'Triangle fermé par genoux après angle.'), lt('Defender posture dậy hoặc stack.', 'Defender postures up or stacks.', 'Défenseur posture ou stack.'), lt('Chuyển armbar, omoplata hoặc clamp reset.', 'Switch to armbar, omoplata, or clamp reset.', 'Passer armbar, omoplata ou reset clamp.'), safetyText),
    ],
    troubleshootingTips: [
      { problem: lt('Triangle không siết.', 'Triangle does not squeeze.', 'Triangle ne serre pas.'), quickFix: lt('Cắt angle về trapped-arm side.', 'Cut angle toward trapped-arm side.', 'Couper côté bras piégé.'), cue: lt('Angle first.', 'Angle first.', 'Angle d’abord.') },
      { problem: lt('Bị stack.', 'You get stacked.', 'Vous êtes stacké.'), quickFix: lt('Kéo posture xuống và hip scoot ra angle.', 'Pull posture down and hip scoot to angle.', 'Posture basse et hanches dehors.'), cue: lt('Posture down.', 'Posture down.', 'Posture basse.') },
      { problem: lt('Foot bị peel.', 'Foot gets peeled.', 'Pied peelé.'), quickFix: lt('Giấu foot sau gối trước khi squeeze.', 'Hide the foot behind the knee before squeezing.', 'Cacher pied derrière genou.'), cue: lt('Hide foot.', 'Hide foot.', 'Cacher pied.') },
      { problem: lt('Thành neck crank.', 'It becomes a neck crank.', 'Ça devient crank.'), quickFix: lt('Đóng gối sau angle, không kéo đầu mạnh.', 'Close knees after angle; do not yank the head.', 'Genoux après angle, pas tirer tête.'), cue: lt('Knees, not neck.', 'Knees, not neck.', 'Genoux, pas cou.') },
      { problem: lt('Hai vai lọt vào trong.', 'Both shoulders get inside.', 'Deux épaules dedans.'), quickFix: lt('Đẩy một shoulder ra ngoài bằng thigh/knee line.', 'Push one shoulder out with thigh/knee line.', 'Sortir une épaule avec cuisse/genou.'), cue: lt('One shoulder out.', 'One shoulder out.', 'Une épaule dehors.') },
    ],
    doNotDo: la(['Đừng squeeze square.', 'Đừng kéo đầu thô.', 'Đừng để foot exposed.', 'Đừng khóa khi posture cao.', 'Đừng giữ hai vai trong.'], ['Do not squeeze square.', 'Do not yank the head.', 'Do not expose the foot.', 'Do not lock while posture is tall.', 'Do not keep both shoulders inside.'], ['Ne serrez pas square.', 'Ne tirez pas la tête fort.', 'Ne laissez pas pied exposé.', 'Ne verrouillez pas posture haute.', 'Ne gardez pas deux épaules dedans.']),
    safetyNotes: safety,
  }],
]

