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
  safetyNote?: LocalizedText | LocalizedStringArray,
): MicroDetail => ({ id, category, title, shortInstruction, side, direction, bodyParts, whenToUse, whyItWorks, commonMistake, correctionCue, liveCue, safetyNote })

const path = (
  id: string,
  title: LocalizedText,
  steps: FastFinishPath['steps'],
  finishTrigger: LocalizedText,
  abortSignal: LocalizedText,
  nextBestOption: LocalizedText,
  safetyNote?: LocalizedText | LocalizedStringArray,
): FastFinishPath => ({ id, title, steps, finishTrigger, abortSignal, nextBestOption, safetyNote })

const guide = (
  id: string,
  scenario: LocalizedText,
  leftHand: LocalizedText,
  rightHand: LocalizedText,
  leftLeg: LocalizedText = lt('', '', ''),
  rightLeg: LocalizedText = lt('', '', ''),
  head: LocalizedText = lt('', '', ''),
  hips: LocalizedText = lt('', '', ''),
  note: LocalizedText = lt('', '', ''),
): LeftRightGuide => ({ id, scenario, leftHand, rightHand, leftLeg, rightLeg, head, hips, note })

const safety = la(
  [
    'Tap sớm khi gối, cổ chân hoặc vai bị xoắn.',
    'Không xoay mù khi chưa kiểm soát hip line.',
    'Tập với partner biết kiểm soát lực và có kinh nghiệm leg lock.',
  ],
  [
    'Tap early when the knee, ankle, or shoulder twists.',
    'Do not spin blindly without hip line control.',
    'Train with a partner who can control force and has leg lock experience.',
  ],
  [
    'Tapez tôt si le genou, cheville ou épaule se tord.',
    'Ne tournez pas à l\'aveugle sans contrôle hip line.',
    'Travaillez avec un partenaire qui contrôle la force et a l\'expérience des leg locks.',
  ],
)

const safetyText = lt(
  'An toàn: tập chậm, tap sớm, và không xoay mù khi hip line chưa rõ.',
  'Safety: train slowly, tap early, and do not spin blindly when the hip line is unclear.',
  'Sécurité : travaillez lentement, tapez tôt et ne tournez pas à l\'aveugle quand la hip line n\'est pas claire.',
)

export const modernAdditionMicroDetailSystems: Record<string, MicroDetailSystem> = {

  // ═════════════════════════════════════════════════════════════════
  // Backside 50/50 Control
  // ═════════════════════════════════════════════════════════════════
  'backside-50-50-control': {
    overview: lt(
      'Backside 50/50 là vị trí leg entanglement phía sau hip line đối thủ. Khác với saddle (inside sankaku), bạn ở phía ngoài với cả hai chân crossed nhưng hip line của bạn ở sau hông họ. Ưu thế: heel hook mạnh hơn và back take luôn available.',
      'Backside 50/50 is a leg entanglement behind the opponent\'s hip line. Unlike saddle (inside sankaku), you are on the outside with both legs crossed but your hip line sits behind their hips. Advantage: stronger heel hook and back take is always available.',
      'Backside 50/50 est une position d\'entanglement derrière la hip line adverse. Contrairement au saddle (inside sankaku), vous êtes à l\'extérieur avec les jambes croisées mais votre hip line est derrière leurs hanches. Avantage : heel hook plus fort et back take toujours disponible.',
    ),
    topFiveDetails: [
      md('bs50-hip-line-behind', 'hip', lt('Hip line sau hông', 'Hip line behind theirs', 'Hip line derrière'), lt('Hip line của bạn phải luôn ở phía sau hip line họ, không để họ xoay square về bạn.', 'Your hip line must always stay behind their hip line — never let them square up toward you.', 'Votre hip line doit toujours rester derrière leur hip line — ne les laissez pas se mettre square vers vous.'), 'both', 'circle_outside', ['hips', 'pelvis', 'spine'], lt('Khi bạn vừa vào position.', 'When you first enter the position.', 'Quand vous entrez dans la position.'), lt('Hip line sau hông là key factor quyết định ai có angle ưu thế.', 'The hip line behind theirs is the key factor deciding who has the superior angle.', 'La hip line derrière est le facteur clé qui décide qui a l\'angle supérieur.'), lt('Để hip line trôi lên phía trước và bị xoay square.', 'Letting the hip line drift forward and getting squared up.', 'Laisser la hip line dériver vers l\'avant et se faire mettre square.'), lt('Hip sau hông.', 'Hip behind.', 'Hanche derrière.'), lt('Hip line bạn sau hip line họ.', 'Your hip line is behind theirs.', 'Votre hip line est derrière la leur.'), safetyText),
      md('bs50-crossed-legs', 'leg', lt('Chân crossed nhưng linh hoạt', 'Crossed legs but live', 'Jambes croisées mais vivantes'), lt('Cross chân 50/50: một chân trên/trước, một chân dưới/sau. Cả hai chân phải có thể di chuyển để theo hip line họ.', 'Cross the legs 50/50: one leg over/front, one leg under/back. Both legs must be able to move to follow their hip line.', 'Croisez les jambes 50/50 : une jambe dessus/devant, une jambe dessous/derrière. Les deux jambes doivent pouvoir bouger pour suivre leur hip line.'), 'both', 'close_in', ['legs', 'knees', 'ankles'], lt('Khi đã vào 50/50.', 'Once in 50/50.', 'Une fois en 50/50.'), lt('Cross legs cho phép bạn kiểm soát cả hai chân và tạo torque từ cả hai phía.', 'Crossed legs let you control both legs and generate torque from either side.', 'Les jambes croisées permettent de contrôler les deux jambes et de générer du torque des deux côtés.'), lt('Leg quá cứng hoặc lock chặt không thể di chuyển.', 'Legs too stiff or locked tight and unable to move.', 'Jambes trop rigides ou verrouillées sans mobilité.'), lt('Chân sống.', 'Live legs.', 'Jambes vivantes.'), lt('Bạn có thể chọn một trong hai chân để finish.', 'You can choose either leg to finish.', 'Vous pouvez choisir l\'une ou l\'autre jambe.'), safetyText),
      md('bs50-secondary-leg', 'foot', lt('Khóa chân phụ trước', 'Control secondary leg first', 'Contrôlez jambe secondaire d\'abord'), lt('Chân không phải target của bạn phải bị kiểm soát — kẹp giữa hai chân bạn hoặc ghim xuống mat.', 'The non-target leg must be controlled — either trapped between your legs or pinned to the mat.', 'La jambe non-cible doit être contrôlée — soit piégée entre vos jambes soit plaquée au tapis.'), 'both', 'pin_in', ['feet', 'ankles', 'knees'], lt('Trước khi tìm heel.', 'Before hunting the heel.', 'Avant de chercher le talon.'), lt('Secondary leg control chặn họ xoay ra và tạo room để bạn lộ heel.', 'Secondary leg control prevents them from turning out and creates room to expose the heel.', 'Le contrôle de la jambe secondaire les empêche de tourner et crée l\'espace pour exposer le talon.'), lt('Focus vào một chân quá sớm, để chân kia tự do.', 'Focusing on one leg too early and leaving the other leg free.', 'Se concentrer trop tôt sur une jambe et laisser l\'autre libre.'), lt('Khóa chân phụ.', 'Lock secondary.', 'Bloquez secondaire.'), lt('Họ không thể xoay để thoát.', 'They cannot turn to escape.', 'Ils ne peuvent pas tourner pour sortir.'), safetyText),
      md('bs50-heel-exposure', 'finish', lt('Lộ heel bằng hip rotation', 'Expose the heel with hip rotation', 'Exposer le talon par rotation hanche'), lt('Xoay hông bạn ra ngoài (external rotation) để lộ heel của target leg. Không kéo bằng tay — xoay bằng hông.', 'Rotate your hip outward (external rotation) to expose the heel of the target leg. Do not pull with your hands — rotate with the hips.', 'Tournez votre hanche vers l\'extérieur (rotation externe) pour exposer le talon de la jambe cible. Ne tirez pas avec les mains — tournez avec les hanches.'), 'near', 'rotate_left', ['hips', 'heels', 'knees'], lt('Khi secondary leg đã bị khóa.', 'When the secondary leg is locked.', 'Quand la jambe secondaire est verrouillée.'), lt('Hip rotation tạo lever để lộ heel mà không mất position.', 'Hip rotation creates the lever to expose the heel without losing position.', 'La rotation des hanches crée le levier pour exposer le talon sans perdre la position.'), lt('Kéo heel bằng tay thay vì xoay hông.', 'Pulling the heel with hands instead of rotating the hips.', 'Tirer le talon avec les mains au lieu de tourner les hanches.'), lt('Xoay hông.', 'Rotate hips.', 'Tournez hanches.'), lt('Heel lộ ra sau hip rotation.', 'The heel appears after the hip rotation.', 'Le talon apparaît après rotation hanche.'), safetyText),
      md('bs50-back-take-option', 'escape', lt('Sẵn sàng back take', 'Back take ready', 'Back take prêt'), lt('Khi họ xoay vào bạn để thoát heel hook, bạn buông leg entanglement và chuyển ngay vào back take — seatbelt và hooks.', 'When they turn into you to escape the heel hook, release the leg entanglement and immediately transition to back take — seatbelt and hooks.', 'Quand ils tournent vers vous pour sortir du heel hook, relâchez l\'entanglement et passez immédiatement au back take — seatbelt et hooks.'), 'both', 'rotate_right', ['hips', 'hands', 'feet'], lt('Khi có force xoay vào từ đối thủ.', 'When you feel them turning into you.', 'Quand vous les sentez tourner vers vous.'), lt('Back take là consolation prize: bạn mất leg lock nhưng lấy được vị trí tốt hơn.', 'Back take is the consolation prize: you lose the leg lock but gain a superior position.', 'Back take est le lot de consolation : vous perdez le leg lock mais gagnez une position supérieure.'), lt('Cố giữ heel hook khi họ đã xoay hẳn vào.', 'Trying to keep the heel hook after they have fully turned in.', 'Essayer de garder le heel hook après qu\'ils ont tourné.'), lt('Chuyển back.', 'Branch to back.', 'Branchez dos.'), lt('Bạn ở sau lưng họ.', 'You are behind them.', 'Vous êtes derrière eux.'), safetyText),
    ],
    leftRightGuides: [
      guide(
        'bs50-right-lead',
        lt('Backside 50/50 khi chân phải của bạn ở trên.', 'Backside 50/50 when your right leg is on top.', 'Backside 50/50 quand votre jambe droite est dessus.'),
        lt('Tay trái giữ posture hoặc post xuống mat.', 'Left hand keeps posture or posts on the mat.', 'Main gauche garde posture ou poste au tapis.'),
        lt('Tay phải control heel hoặc pants line.', 'Right hand controls the heel or pants line.', 'Main droite contrôle le talon ou la ligne de pantalon.'),
        lt('Chân trái ở dưới, kẹp secondary leg.', 'Left leg is underneath, trapping the secondary leg.', 'Jambe gauche en dessous, piégeant jambe secondaire.'),
        lt('Chân phải ở trên, chặn hip line họ.', 'Right leg is on top, blocking their hip line.', 'Jambe droite dessus, bloquant leur hip line.'),
        lt('Đầu thấp, mắt nhìn hip line họ.', 'Head low, eyes on their hip line.', 'Tête basse, regard sur leur hip line.'),
        lt('Hông lùi xuống dưới để giữ angle.', 'Hips drop back to keep the angle.', 'Hanches reculent pour garder l\'angle.'),
        lt('Chân phụ, hip sau, xoay hông.', 'Secondary leg, hip behind, rotate hips.', 'Jambe secondaire, hanche derrière, tourner hanches.'),
      ),
      guide(
        'bs50-left-lead',
        lt('Backside 50/50 khi chân trái của bạn ở trên.', 'Backside 50/50 when your left leg is on top.', 'Backside 50/50 quand votre jambe gauche est dessus.'),
        lt('Tay phải giữ posture hoặc post.', 'Right hand keeps posture or posts.', 'Main droite garde posture ou poste.'),
        lt('Tay trái control heel hoặc pants.', 'Left hand controls the heel or pants.', 'Main gauche contrôle le talon ou pantalon.'),
        lt('Chân phải ở dưới, kẹp secondary leg.', 'Right leg is underneath, trapping the secondary leg.', 'Jambe droite en dessous, piégeant jambe secondaire.'),
        lt('Chân trái ở trên, chặn hip line.', 'Left leg is on top, blocking the hip line.', 'Jambe gauche dessus, bloquant hip line.'),
        lt('Đầu thấp, giữ đường nhìn.', 'Head low, keep sight lines.', 'Tête basse, garder ligne de vue.'),
        lt('Hông sau hip line họ.', 'Hips behind their hip line.', 'Hanches derrière leur hip line.'),
        lt('Secondary lock, hip rotation, finish.', 'Secondary lock, hip rotation, finish.', 'Lock secondaire, rotation hanche, finish.'),
      ),
    ],
    fastFinishPaths: [
      path(
        'bs50-finish',
        lt('Heel hook từ backside 50/50', 'Heel hook from backside 50/50', 'Heel hook depuis backside 50/50'),
        [
          { id: '1', order: 1, instruction: lt('Chốt hip line sau hông họ.', 'Lock hip line behind theirs.', 'Verrouiller hip line derrière.'), keyBodyPart: 'hips', commonMistake: lt('Để hip line trôi lên.', 'Letting hip line drift forward.', 'Laisser hip line dériver.') },
          { id: '2', order: 2, instruction: lt('Khóa secondary leg.', 'Lock the secondary leg.', 'Verrouiller jambe secondaire.'), keyBodyPart: 'feet', commonMistake: lt('Bỏ chân phụ tự do.', 'Leaving secondary leg free.', 'Laisser jambe secondaire libre.') },
          { id: '3', order: 3, instruction: lt('Xoay hông ngoài để lộ heel.', 'Rotate hips outward to expose the heel.', 'Tourner hanches dehors pour exposer talon.'), keyBodyPart: 'hips', commonMistake: lt('Kéo bằng tay.', 'Pulling with hands.', 'Tirer avec mains.') },
          { id: '4', order: 4, instruction: lt('Khóa heel grip và finish.', 'Lock heel grip and finish.', 'Verrouiller grip talon et finir.'), keyBodyPart: 'hands', commonMistake: lt('Grip lỏng và tay tuột.', 'Loose grip and hand slips.', 'Grip lâche et main glisse.') },
          { id: '5', order: 5, instruction: lt('Sẵn sàng back take khi họ xoay.', 'Ready back take when they turn in.', 'Prêt back take quand ils tournent.'), keyBodyPart: 'hands', commonMistake: lt('Giữ leg lock quá lâu.', 'Holding the leg lock too long.', 'Garder leg lock trop longtemps.') },
        ],
        lt('Heel bị lộ và bạn có grip finish.', 'The heel is exposed and you have finishing grip.', 'Le talon est exposé et vous avez le grip de finish.'),
        lt('Họ xoay vào bạn mạnh.', 'They turn into you strongly.', 'Ils tournent vers vous fortement.'),
        lt('Chuyển ngay back take.', 'Immediately transition to back take.', 'Passez immédiatement au back take.'),
        safetyText,
      ),
    ],
    troubleshootingTips: [
      { problem: lt('Hip line bị xoay square.', 'Hip line gets squared up.', 'Hip line se fait square.'), quickFix: lt('Lùi hông xuống và kéo hip line bạn về sau.', 'Drop your hips back and pull your hip line behind.', 'Reculez les hanches et tirez votre hip line derrière.'), cue: lt('Hip sau.', 'Hip behind.', 'Hanche derrière.') },
      { problem: lt('Chân phụ thoát và họ turn out.', 'Secondary leg escapes and they turn out.', 'Jambe secondaire s\'échappe et ils tournent dehors.'), quickFix: lt('Kẹp chặt hơn và kéo secondary leg vào giữa hai đùi.', 'Clamp tighter and pull the secondary leg between both thighs.', 'Serrez plus fort et tirez la jambe secondaire entre les cuisses.'), cue: lt('Giữ chân phụ.', 'Hold secondary.', 'Gardez secondaire.') },
      { problem: lt('Không lộ được heel.', 'Cannot expose the heel.', 'Impossible d\'exposer le talon.'), quickFix: lt('Tăng hip rotation ra ngoài và điều chỉnh grip.', 'Increase external hip rotation and adjust the grip.', 'Augmentez rotation externe hanche et ajustez grip.'), cue: lt('Xoay hông.', 'Rotate hips.', 'Tournez hanches.') },
      { problem: lt('Heel lộ nhưng grip tuột.', 'Heel is exposed but grip slips.', 'Talon exposé mais grip glisse.'), quickFix: lt('Đổi grip — palm-to-palm hoặc figure-four trên heel.', 'Switch grip — palm-to-palm or figure-four over the heel.', 'Changez grip — palm-to-palm ou figure-four sur le talon.'), cue: lt('Đổi grip.', 'Switch grip.', 'Changez grip.') },
      { problem: lt('Mất position khi chuyển back take.', 'Losing position on back take transition.', 'Perte de position sur transition back take.'), quickFix: lt('Giữ seatbelt trước khi bỏ leg entanglement.', 'Establish seatbelt before releasing the leg entanglement.', 'Établir seatbelt avant de lâcher l\'entanglement.'), cue: lt('Seatbelt trước.', 'Seatbelt first.', 'Seatbelt d\'abord.') },
    ],
    doNotDo: la(
      ['Đừng để hip line trôi lên trước.', 'Đừng bỏ secondary leg tự do.', 'Đừng kéo heel bằng tay thay vì xoay hông.', 'Đừng giữ heel hook khi họ đã xoay hẳn vào.', 'Đừng lock chân quá cứng không di chuyển được.'],
      ['Do not let your hip line drift forward.', 'Do not leave the secondary leg free.', 'Do not pull the heel with your hands instead of rotating hips.', 'Do not hold the heel hook when they have fully turned in.', 'Do not lock your legs so tight they cannot move.'],
      ['Ne laissez pas votre hip line dériver vers l\'avant.', 'Ne laissez pas la jambe secondaire libre.', 'Ne tirez pas le talon avec les mains au lieu de tourner les hanches.', 'Ne gardez pas le heel hook quand ils ont complètement tourné.', 'Ne verrouillez pas les jambes si serrées qu\'elles ne bougent plus.'],
    ),
    safetyNotes: safety,
  },

  // ═════════════════════════════════════════════════════════════════
  // D'Arce Choke
  // ═════════════════════════════════════════════════════════════════
  'darce-choke': {
    overview: lt(
      'D\'Arce choke là arm triangle từ front headlock hoặc khi đối thủ turn in. Khác với anaconda (arm qua cùng side), D\'Arce dùng arm của bạn đi qua nách far side và chest-to-chest pressure. Mục tiêu: shoulder crunch vào cổ với chest pressure chéo, không phải bóp bằng biceps.',
      'The D\'Arce choke is an arm triangle from front headlock or when the opponent turns in. Unlike the anaconda (arm through same side), the D\'Arce uses your arm through the far armpit with chest-to-chest pressure. Goal: shoulder crunch into the neck with diagonal chest pressure, not bicep squeezing.',
      'Le D\'Arce choke est un arm triangle depuis front headlock ou quand l\'adversaire tourne. Contrairement à l\'anaconda (bras du même côté), le D\'Arce utilise votre bras sous l\'aisselle opposée avec pression chest-to-chest. Objectif : shoulder crunch dans le cou par pression poitrine diagonale, pas squeeze des biceps.',
    ),
    topFiveDetails: [
      md('darce-arm-deep', 'grip', lt('Arm sâu qua far armpit', 'Arm deep through far armpit', 'Bras profond sous aisselle opposée'), lt('Tay của bạn phải đi xuyên qua nách far side của đối thủ, forearm chạm far shoulder blade.', 'Your arm must thread through the opponent\'s far armpit, with your forearm touching their far shoulder blade.', 'Votre bras doit passer sous l\'aisselle opposée, l\'avant-bras touchant l\'omoplate éloignée.'), 'near', 'close_in', ['arms', 'shoulders', 'forearms'], lt('Khi bạn catch front headlock.', 'When you catch the front headlock.', 'Quand vous attrapez le front headlock.'), lt('Arm sâu tạo shoulder isolation giúp chest pressure finish thay vì bicep squeeze.', 'A deep arm creates shoulder isolation so chest pressure finishes instead of bicep squeeze.', 'Un bras profond crée l\'isolation d\'épaule pour que la pression poitrine finisse.'), lt('Arm quá nông, chỉ pressure vào shoulder không vô cổ.', 'Arm too shallow, pressure only on the shoulder, not the neck.', 'Bras trop superficiel, pression seulement sur l\'épaule.'), lt('Arm sâu.', 'Arm deep.', 'Bras profond.'), lt('Forearm chạm far shoulder blade.', 'Forearm touches far shoulder blade.', 'Avant-bras touche omoplate.'), safetyText),
      md('darce-shoulder-crunch', 'shoulder', lt('Shoulder crunch vào cổ', 'Shoulder crunch into the neck', 'Shoulder crunch dans le cou'), lt('Vai của bạn ép vào cổ đối thủ — shoulder to neck pressure. Đây là primary finishing mechanic, không phải bóp cánh tay.', 'Your shoulder presses into the opponent\'s neck — shoulder-to-neck pressure. This is the primary finishing mechanic, not arm squeezing.', 'Votre épaule presse le cou adverse — pression épaule-sur-cou. C\'est le mécanisme principal, pas serrer les bras.'), 'near', 'compress_down', ['shoulders', 'neck', 'chest'], lt('Khi arm đã deep và chin strap có.', 'When the arm is deep and chin strap is set.', 'Quand le bras est profond et le chin strap posé.'), lt('Shoulder crunch biến bodyweight của bạn thành choke pressure mà không tốn lực tay.', 'Shoulder crunch turns your bodyweight into choke pressure without using arm strength.', 'Shoulder crunch transforme votre poids en pression choke sans force des bras.'), lt('Squeeze bằng biceps thay vì ép vai.', 'Squeezing with biceps instead of pressing with the shoulder.', 'Serrer aux biceps au lieu de presser avec l\'épaule.'), lt('Vai ép.', 'Shoulder press.', 'Épaule presse.'), lt('Họ cảm thấy pressure ở cổ, không phải vai.', 'They feel pressure in the neck, not the shoulder.', 'Ils sentent la pression dans le cou, pas l\'épaule.'), safetyText),
      md('darce-chest-to-chest', 'chest', lt('Ngực nặng trên họ', 'Heavy chest on them', 'Poitrine lourde sur eux'), lt('Chest của bạn phải nặng trên body họ, không nổi lên. Ngực là nguồn lực chính cho choke.', 'Your chest must be heavy on their body, not floating. The chest is the main power source for the choke.', 'Votre poitrine doit être lourde sur leur corps, pas flotter. La poitrine est la source principale du choke.'), 'center', 'drive_down', ['chest', 'sternum', 'shoulders'], lt('Sau shoulder crunch.', 'After shoulder crunch.', 'Après shoulder crunch.'), lt('Chest-to-chest kết hợp với shoulder crunch tạo cấu trúc arm triangle kín.', 'Chest-to-chest combined with shoulder crunch creates a closed arm triangle.', 'Chest-to-chest avec shoulder crunch crée un arm triangle fermé.'), lt('Ngực nhấc lên để tìm angle, làm mất pressure.', 'Lifting the chest to find the angle, losing pressure.', 'Lever la poitrine pour angle, perdre la pression.'), lt('Ngực xuống.', 'Chest down.', 'Poitrine basse.'), lt('Body của họ không có space để escape.', 'Their body has no space to escape.', 'Leur corps n\'a pas d\'espace pour sortir.'), safetyText),
      md('darce-head-position', 'head', lt('Đầu lệch xa', 'Head positioned away', 'Tête positionnée loin'), lt('Đầu bạn ép vào side của head họ, không nằm trên ngực họ. Đầu lệch tạo tight seal.', 'Your head presses into the side of their head, not on their chest. An offset head creates a tight seal.', 'Votre tête presse le côté de leur tête, pas sur leur poitrine. Une tête décalée crée un joint étanche.'), 'near', 'drive_diagonal', ['head', 'shoulders', 'ears'], lt('Khi grip đã dính.', 'When the grip is attached.', 'Quand le grip est attaché.'), lt('Head position làm họ không thể turn face ra để giảm pressure.', 'Head position prevents them from turning their face out to relieve pressure.', 'La position de la tête les empêche de tourner le visage pour soulager la pression.'), lt('Đầu nằm giữa ngực họ.', 'Head stays in the middle of their chest.', 'Tête au milieu de leur poitrine.'), lt('Đầu lệch.', 'Head offset.', 'Tête décalée.'), lt('Họ không thể xoay mặt.', 'They cannot turn their face.', 'Ils ne peuvent pas tourner le visage.'), safetyText),
      md('darce-finish-vs-branch', 'finish', lt('Finish hoặc go-behind', 'Finish or go-behind', 'Finir ou go-behind'), lt('Nếu D\'Arce kín và không có defense, finish. Nếu họ cho space hoặc nâng ngực, chuyển go-behind, guillotine hoặc front headlock reset.', 'If the D\'Arce is tight with no defense, finish. If they give space or elevate their chest, transition to go-behind, guillotine, or front headlock reset.', 'Si D\'Arce serré sans défense, finir. S\'ils donnent de l\'espace ou soulèvent la poitrine, passer go-behind, guillotine ou reset front headlock.'), 'both', 'rotate_right', ['hips', 'head', 'hands'], lt('Sau 3-5 giây choke ở full pressure.', 'After 3-5 seconds at full choke pressure.', 'Après 3-5 secondes de pression choke max.'), lt('Biết khi nào finish vs branch là điểm khác biệt giữa submission và mất position.', 'Knowing when to finish vs branch is the difference between a submission and losing position.', 'Savoir quand finir vs brancher est la différence entre une soumission et perdre la position.'), lt('Cố ép D\'Arce sau khi họ đã thoát hip line.', 'Forcing the D\'Arce after they have escaped the hip line.', 'Forcer D\'Arce après qu\'ils ont échappé la hip line.'), lt('Branch nếu bị thoát.', 'Branch if escaped.', 'Branchez si sorti.'), lt('Họ tap hoặc bạn chuyển.', 'They tap or you transition.', 'Ils tapent ou vous transitionnez.'), safetyText),
    ],
    leftRightGuides: [
      guide(
        'darce-right-side',
        lt('D\'Arce choke khi bạn ở bên phải đối thủ.', 'D\'Arce choke when you are on the opponent\'s right side.', 'D\'Arce choke quand vous êtes côté droit de l\'adversaire.'),
        lt('Tay trái catch cổ và chin strap.', 'Left hand catches the neck and chin strap.', 'Main gauche attrape le cou et chin strap.'),
        lt('Tay phải thread qua nách far.', 'Right arm threads through the far armpit.', 'Bras droit passe sous aisselle opposée.'),
        lt('Chân trái giữ base thấp, knee chặn hip.', 'Left leg stays low, knee blocks the hip.', 'Jambe gauche basse, genou bloque hanche.'),
        lt('Chân phải ride hip họ hoặc post.', 'Right leg rides their hip or posts.', 'Jambe droite sur leur hanche ou poste.'),
        lt('Đầu ép sang phải của head họ.', 'Head presses to the right side of their head.', 'Tête presse côté droit de leur tête.'),
        lt('Ngực nặng trên shoulder line họ.', 'Chest heavy on their shoulder line.', 'Poitrine lourde sur leur shoulder line.'),
        lt('Vai ép, ngực down, head lệch.', 'Shoulder press, chest down, head offset.', 'Épaule presse, poitrine basse, tête décalée.'),
      ),
      guide(
        'darce-left-side',
        lt('D\'Arce choke khi bạn ở bên trái đối thủ.', 'D\'Arce choke when you are on the opponent\'s left side.', 'D\'Arce choke quand vous êtes côté gauche de l\'adversaire.'),
        lt('Tay phải catch cổ và chin strap.', 'Right hand catches the neck and chin strap.', 'Main droite attrape le cou et chin strap.'),
        lt('Tay trái thread qua nách far.', 'Left arm threads through the far armpit.', 'Bras gauche passe sous aisselle opposée.'),
        lt('Chân phải giữ base thấp, knee block.', 'Right leg stays low, knee blocks.', 'Jambe droite basse, genou bloque.'),
        lt('Chân trái ride hip hoặc post.', 'Left leg rides their hip or posts.', 'Jambe gauche sur hanche ou poste.'),
        lt('Đầu ép sang trái của head họ.', 'Head presses to the left side of their head.', 'Tête presse côté gauche de leur tête.'),
        lt('Vai trái ép vào neck line họ.', 'Left shoulder presses into their neck line.', 'Épaule gauche presse leur cou.'),
        lt('Arm deep, shoulder crunch, chest down.', 'Arm deep, shoulder crunch, chest down.', 'Bras profond, shoulder crunch, poitrine basse.'),
      ),
    ],
    fastFinishPaths: [
      path(
        'darce-fast-path',
        lt('D\'Arce đường nhanh', 'D\'Arce fast path', 'Chemin rapide D\'Arce'),
        [
          { id: '1', order: 1, instruction: lt('Front headlock catch + chin strap.', 'Front headlock catch plus chin strap.', 'Front headlock attrape + chin strap.'), keyBodyPart: 'hands', commonMistake: lt('Lock chưa ổn định.', 'Lock not yet stable.', 'Lock pas encore stable.') },
          { id: '2', order: 2, instruction: lt('Arm qua far armpit deep.', 'Arm through far armpit deep.', 'Bras sous aisselle opposée profond.'), keyBodyPart: 'arms', commonMistake: lt('Arm nông, chỉ đến elbow.', 'Arm shallow, only to the elbow.', 'Bras superficiel, seulement au coude.') },
          { id: '3', order: 3, instruction: lt('Shoulder crunch vào cổ.', 'Shoulder crunch into the neck.', 'Shoulder crunch dans le cou.'), keyBodyPart: 'shoulders', commonMistake: lt('Bóp bằng biceps.', 'Bicep squeeze.', 'Squeeze biceps.') },
          { id: '4', order: 4, instruction: lt('Chest xuống, head lệch.', 'Chest down, head offset.', 'Poitrine basse, tête décalée.'), keyBodyPart: 'chest', commonMistake: lt('Ngực nổi.', 'Chest floating.', 'Poitrine flottante.') },
          { id: '5', order: 5, instruction: lt('Finish hoặc go-behind.', 'Finish or go-behind.', 'Finir ou go-behind.'), keyBodyPart: 'hips', commonMistake: lt('Giữ choke khi đã mất angle.', 'Holding the choke after angle is gone.', 'Garder choke après angle perdu.') },
        ],
        lt('Arm deep + shoulder crunch = choke tight và họ không thể face ra.', 'Arm deep plus shoulder crunch equals tight choke with no face escape.', 'Bras profond + shoulder crunch = choke serré sans échappement face.'),
        lt('Họ elevate chest hoặc turn face ra.', 'They elevate the chest or turn the face out.', 'Ils soulèvent poitrine ou tournent le visage.'),
        lt('Chuyển go-behind, guillotine hoặc front headlock reset.', 'Switch to go-behind, guillotine, or front headlock reset.', 'Passez go-behind, guillotine ou reset front headlock.'),
        safetyText,
      ),
    ],
    troubleshootingTips: [
      { problem: lt('Choke không vào, chỉ shoulder pressure.', 'Choke does not land, only shoulder pressure.', 'Le choke ne marche pas, seulement pression épaule.'), quickFix: lt('Đưa arm sâu hơn qua armpit và ép shoulder vào neck line.', 'Thread the arm deeper through the armpit and press the shoulder into the neck line.', 'Passez le bras plus profond sous l\'aisselle et pressez l\'épaule dans le cou.'), cue: lt('Arm sâu.', 'Arm deep.', 'Bras profond.') },
      { problem: lt('Họ turn face ra và giảm pressure.', 'They turn their face out and reduce pressure.', 'Ils tournent le visage et réduisent la pression.'), quickFix: lt('Head position ép vào face họ và chest nặng hơn.', 'Press your head into their face and add chest weight.', 'Pressez votre tête dans leur visage et ajoutez poids poitrine.'), cue: lt('Đầu lệch.', 'Head offset.', 'Tête décalée.') },
      { problem: lt('Tay bị tuột khỏi armpit.', 'Your arm slips out of the armpit.', 'Votre bras glisse hors de l\'aisselle.'), quickFix: lt('Catch lại với gable grip và kéo arm sâu trước khi chest xuống.', 'Re-catch with gable grip and pull the arm deep before chest drops.', 'Reprenez gable grip et tirez bras profond avant poitrine basse.'), cue: lt('Grip lại.', 'Re-grip.', 'Reprendre grip.') },
      { problem: lt('Họ posture lên và stack bạn.', 'They posture up and stack you.', 'Ils posturent et vous stackent.'), quickFix: lt('Buông D\'Arce, chuyển guillotine hoặc front headlock.', 'Release the D\'Arce, switch to guillotine or front headlock.', 'Lâchez D\'Arce, passez guillotine ou front headlock.'), cue: lt('Branch.', 'Branch.', 'Branchez.') },
      { problem: lt('Choke thành crank cổ.', 'The choke becomes a neck crank.', 'Le choke devient un crank de cou.'), quickFix: lt('Điều chỉnh arm sâu hơn và dùng chest pressure thay vì kéo đầu.', 'Adjust arm deeper and use chest pressure instead of pulling the head.', 'Ajustez bras plus profond et utilisez pression poitrine au lieu de tirer tête.'), cue: lt('Ngực xuống.', 'Chest down.', 'Poitrine basse.') },
    ],
    doNotDo: la(
      ['Đừng squeeze bằng biceps.', 'Đừng để arm nông chỉ đến elbow.', 'Đừng nâng chest lên.', 'Đừng để head ở giữa.', 'Đừng ép D\'Arce khi họ đã thoát hip line.'],
      ['Do not squeeze with the biceps.', 'Do not leave the arm shallow at the elbow.', 'Do not lift the chest.', 'Do not keep the head in the middle.', 'Do not force the D\'Arce after they have escaped the hip line.'],
      ['Ne serrez pas avec les biceps.', 'Ne laissez pas le bras superficiel au coude.', 'Ne levez pas la poitrine.', 'Ne gardez pas la tête au milieu.', 'Ne forcez pas le D\'Arce après la sortie de hip line.'],
    ),
    safetyNotes: safety,
  },

  // ═════════════════════════════════════════════════════════════════
  // HQ / Split-Squat Passing
  // ═════════════════════════════════════════════════════════════════
  'hq-split-squat-passing': {
    overview: lt(
      'Headquarters (HQ) là vị trí passing với một gối lên (knee up) và một gối xuống (knee down). Split-squat là tên gọi cho tư thế này trong no-gi. Từ đây bạn có thể knee cut, bodylock, toreando hoặc leg drag dựa trên reaction của guard player. Mục tiêu: quản lý distance, đọc shin frame response, và chọn pass line tương ứng.',
      'Headquarters (HQ) is the passing position with one knee up and one knee down. Split-squat is the no-gi name for this stance. From here you can knee cut, bodylock, toreando, or leg drag based on the guard player\'s reaction. Goal: manage distance, read the shin frame response, and choose the corresponding pass line.',
      'Headquarters (HQ) est la position de passage avec un genou levé et un genou au sol. Split-squat est le nom no-gi pour cette posture. Depuis ici vous pouvez knee cut, bodylock, toreando ou leg drag selon la réaction du guard. Objectif : gérer la distance, lire la réponse shin frame et choisir la pass line correspondante.',
    ),
    topFiveDetails: [
      md('hq-knee-position', 'knee', lt('Gối up / gối down đúng', 'Knee up / knee down correct', 'Genou up / genou down correct'), lt('Gối up (lead knee) hướng về phía guard player, gối down (back knee) ở phía sau, tạo base rộng bằng vai.', 'The up knee (lead) points toward the guard player, the down knee (back) sits behind, creating a shoulder-width base.', 'Le genou up (lead) pointe vers le guard, le genou down (back) derrière, créant une base largeur d\'épaules.'), 'both', 'wedge', ['knees', 'shins', 'feet'], lt('Khi bạn vào HQ stance.', 'When you enter the HQ stance.', 'Quand vous entrez en stance HQ.'), lt('Knee up chống shin frame của guard, knee down giữ base và mobility.', 'The up knee counters the guard\'s shin frame, the down knee keeps base and mobility.', 'Le genou up contre le shin frame du guard, le genou down garde base et mobilité.'), lt('Gối up quá xa hoặc quá gần, mất balance.', 'Up knee too far or too close, losing balance.', 'Genou up trop loin ou trop proche, perte d\'équilibre.'), lt('Gối up ngang hông họ.', 'Up knee at hip height.', 'Genou up à hauteur hanche.'), lt('Bạn balanced và có thể chuyển bất kỳ pass line nào.', 'You are balanced and can transition to any pass line.', 'Vous êtes équilibré et pouvez passer à n\'importe quelle pass line.'), safetyText),
      md('hq-inside-position', 'hand', lt('Thắng inside hand position', 'Win inside hand position', 'Gagner inside position main'), lt('Tay trong (near their body) phải thắng inside position — tay của bạn ở giữa body họ và tay họ.', 'Your inside hand (near their body) must win inside position — your hand between their body and their hand.', 'Votre main inside (près de leur corps) doit gagner inside position — votre main entre leur corps et leur main.'), 'near', 'pin_in', ['hands', 'wrists', 'forearms'], lt('Trước khi guard player setup grips.', 'Before the guard player establishes grips.', 'Avant que le guard établisse ses grips.'), lt('Inside hand position quyết định ai có angle control.', 'Inside hand position decides who has angle control.', 'Inside hand position décide qui a le contrôle de l\'angle.'), lt('Đưa tay ra ngoài hoặc để guard player pummel inside.', 'Putting the hand outside or letting the guard pummel inside.', 'Mettre la main dehors ou laisser le guard pummel inside.'), lt('Inside tay.', 'Inside hand.', 'Main inside.'), lt('Bạn kiểm soát hand fight.', 'You control the hand fight.', 'Vous contrôlez le hand fight.'), safetyText),
      md('hq-read-shin-frame', 'timing', lt('Đọc phản ứng shin frame', 'Read the shin frame reaction', 'Lire la réaction shin frame'), lt('Shin frame của họ (chân gần) cho bạn biết họ muốn giữ distance (shin vào hip bạn) hay kéo bạn vào (shin mở, hook).', 'Their shin frame (near leg) tells you if they want distance (shin to your hip) or to pull you in (shin open, hook).', 'Leur shin frame (jambe proche) vous indique s\'ils veulent distance (shin sur votre hanche) ou vous attirer (shin ouvert, hook).'), 'both', 'drive_diagonal', ['shins', 'knees', 'hips'], lt('Khi bạn approach trong HQ stance.', 'When you approach in HQ stance.', 'Quand vous approchez en stance HQ.'), lt('Shin frame direction quyết định họ muốn open guard (push) hay closed guard (pull).', 'Shin frame direction decides if they want open guard (push) or closed guard (pull).', 'La direction du shin frame décide s\'ils veulent garde ouverte (push) ou fermée (pull).'), lt('Không đọc shin và chọn pass line mù.', 'Not reading the shin and choosing a blind pass line.', 'Ne pas lire le shin et choisir une pass line aveugle.'), lt('Đọc shin trước.', 'Read shin first.', 'Lisez shin d\'abord.'), lt('Bạn chọn đúng pass line.', 'You choose the correct pass line.', 'Vous choisissez la bonne pass line.'), safetyText),
      md('hq-pass-decision', 'angle', lt('Chọn pass line theo reaction', 'Choose pass line by reaction', 'Choisir pass line selon réaction'), lt('Shin frame push (khoảng cách) → knee cut. Shin frame pull (kéo bạn vào) → bodylock. Guard xoay hip ra → toreando/leg drag.', 'Shin frame pushing (distance) → knee cut. Shin frame pulling (drawing you in) → bodylock. Guard rotates hip out → toreando or leg drag.', 'Shin frame push (distance) → knee cut. Shin frame pull (attire) → bodylock. Guard tourne hanche dehors → toreando ou leg drag.'), 'both', 'drive_diagonal', ['hips', 'knees', 'feet'], lt('Sau khi đọc shin frame.', 'After reading the shin frame.', 'Après avoir lu le shin frame.'), lt('Đúng reaction = pass dễ hơn 50%.', 'Correct reaction makes the pass 50 percent easier.', 'Bonne réaction rend le pass 50 pour cent plus facile.'), lt('Knee cut khi họ pull hoặc bodylock khi họ push.', 'Knee cutting when they pull or bodylocking when they push.', 'Knee cut quand ils tirent ou bodylock quand ils poussent.'), lt('Đúng line.', 'Correct line.', 'Bonne ligne.'), lt('Pass line đang mở.', 'The pass line is open.', 'La pass line est ouverte.'), safetyText),
      md('hq-clearance', 'foot', lt('Clear đường chân cuối', 'Clear the final leg line', 'Libérer la ligne jambe finale'), lt('Sau khi qua initial defense, clear remaining leg line bằng cách kéo knee qua hoặc hip switch để tránh re-guard.', 'After passing the initial defense, clear the remaining leg line by pulling the knee through or hip switching to avoid re-guard.', 'Après la défense initiale, libérez la dernière ligne jambe en tirant le genou ou hip switch pour éviter re-guard.'), 'both', 'circle_outside', ['feet', 'knees', 'hips'], lt('Sau khi pass line được chọn.', 'After the pass line is chosen.', 'Après le choix de la pass line.'), lt('Clearance đảm bảo bạn không bị re-guard ngay sau pass.', 'Clearance ensures you do not get immediately re-guarded after the pass.', 'Clearance garantit que vous ne serez pas re-guardé immédiatement après le pass.'), lt('Dừng lại sau khi qua knee line mới.', 'Stopping after clearing the first knee line.', 'S\'arrêter après avoir franchi la première knee line.'), lt('Clear chân cuối.', 'Clear final leg.', 'Libérez dernière jambe.'), lt('Bạn đã qua hẳn guard.', 'You are fully past the guard.', 'Vous êtes complètement passé de la garde.'), safetyText),
    ],
    leftRightGuides: [
      guide(
        'hq-right-lead',
        lt('HQ với knee up bên phải.', 'HQ with right knee up.', 'HQ avec genou droit levé.'),
        lt('Tay trái pummel inside position.', 'Left hand pummels for inside position.', 'Main gauche pummel inside position.'),
        lt('Tay phải tạo khung frame hoặc post.', 'Right hand creates a frame or posts.', 'Main droite crée un frame ou poste.'),
        lt('Chân trái (knee down) giữ base.', 'Left leg (knee down) keeps base.', 'Jambe gauche (genou bas) garde base.'),
        lt('Chân phải (knee up) chặn shin frame.', 'Right leg (knee up) blocks the shin frame.', 'Jambe droite (genou haut) bloque shin frame.'),
        lt('Đầu thẳng, mắt nhìn hip họ.', 'Head straight, eyes on their hips.', 'Tête droite, regard sur leurs hanches.'),
        lt('Hông thấp, chest hướng về họ.', 'Hips low, chest facing them.', 'Hanches basses, poitrine vers eux.'),
        lt('Đọc shin, chọn line, clear chân.', 'Read shin, choose line, clear leg.', 'Lire shin, choisir ligne, libérer jambe.'),
      ),
      guide(
        'hq-left-lead',
        lt('HQ với knee up bên trái.', 'HQ with left knee up.', 'HQ avec genou gauche levé.'),
        lt('Tay phải pummel inside position.', 'Right hand pummels for inside position.', 'Main droite pummel inside position.'),
        lt('Tay trái tạo khung frame hoặc post.', 'Left hand creates a frame or posts.', 'Main gauche crée un frame ou poste.'),
        lt('Chân phải (knee down) giữ base.', 'Right leg (knee down) keeps base.', 'Jambe droite (genou bas) garde base.'),
        lt('Chân trái (knee up) chặn shin frame.', 'Left leg (knee up) blocks the shin frame.', 'Jambe gauche (genou haut) bloque shin frame.'),
        lt('Đầu thẳng, mắt nhìn hông.', 'Head straight, eyes on hips.', 'Tête droite, regard hanches.'),
        lt('Chest không bị xoay, hips thấp.', 'Chest stays square, hips low.', 'Poitrine carrée, hanches basses.'),
        lt('Inside tay trước, shin read, pass.', 'Inside hand first, shin read, pass.', 'Main inside d\'abord, lire shin, passer.'),
      ),
    ],
    fastFinishPaths: [
      path(
        'hq-fast-path',
        lt('Đường pass nhanh từ HQ', 'Fast pass from HQ', 'Pass rapide depuis HQ'),
        [
          { id: '1', order: 1, instruction: lt('Win inside hand position.', 'Win inside hand position.', 'Gagner inside hand position.'), keyBodyPart: 'hands', commonMistake: lt('Để guard pummel inside.', 'Letting guard pummel inside.', 'Laisser guard pummel inside.') },
          { id: '2', order: 2, instruction: lt('Đọc shin frame reaction.', 'Read shin frame reaction.', 'Lire réaction shin frame.'), keyBodyPart: 'knees', commonMistake: lt('Không đọc, vào pass mù.', 'Not reading, blind pass.', 'Ne pas lire, pass aveugle.') },
          { id: '3', order: 3, instruction: lt('Chọn pass line theo reaction.', 'Choose pass line by reaction.', 'Choisir pass line selon réaction.'), keyBodyPart: 'hips', commonMistake: lt('Chọn sai line.', 'Choosing the wrong line.', 'Choisir mauvaise ligne.') },
          { id: '4', order: 4, instruction: lt('Clear final leg line.', 'Clear final leg line.', 'Libérer dernière ligne jambe.'), keyBodyPart: 'feet', commonMistake: lt('Dừng sau first knee line.', 'Stopping after first knee line.', 'Arrêter après première knee line.') },
          { id: '5', order: 5, instruction: lt('Settle in side control or pin.', 'Settle in side control or pin.', 'Stabiliser en side control ou pin.'), keyBodyPart: 'chest', commonMistake: lt('Không ổn định, bị re-guard.', 'Not settling, getting re-guarded.', 'Ne pas stabiliser, se faire re-guarder.') },
        ],
        lt('Pass line clean + guard player không thể recover.', 'Pass line clean plus guard player cannot recover.', 'Pass line clean + guard ne peut pas récupérer.'),
        lt('Shin frame reset hoặc hook vào.', 'Shin frame resets or a hook reattaches.', 'Shin frame reset ou hook se rattache.'),
        lt('Reset HQ hoặc switch sang guard retention attack.', 'Reset HQ or switch to guard retention attack.', 'Reset HQ ou passer à l\'attaque de garde.'),
        safetyText,
      ),
    ],
    troubleshootingTips: [
      { problem: lt('Guard player liên tục pummel inside.', 'Guard player keeps pummeling inside.', 'Le garde pummel inside constamment.'), quickFix: lt('Đổi angle: step lead knee ra ngoài và attack leg drag lane.', 'Change angle: step the lead knee outside and attack the leg drag lane.', 'Changez angle : step genou lead dehors et attaquez la ligne leg drag.'), cue: lt('Đổi lane.', 'Switch lane.', 'Changez ligne.') },
      { problem: lt('Shin frame mạnh, không vào knee cut được.', 'Strong shin frame, cannot knee cut.', 'Shin frame fort, impossible knee cut.'), quickFix: lt('Chuyển bodylock hoặc toreando. Shin frame push = tire, không cut vào.', 'Switch to bodylock or toreando. Shin frame push equals tire, do not cut into it.', 'Passez bodylock ou toreando. Shin frame push = pneu, ne coupez pas dedans.'), cue: lt('Bodylock.', 'Bodylock.', 'Bodylock.') },
      { problem: lt('Mất balance ở HQ.', 'Losing balance in HQ.', 'Perte d\'équilibre en HQ.'), quickFix: lt('Mở rộng base (knee down ra sau) và hạ hips.', 'Widen the base (knee down goes back) and lower the hips.', 'Élargissez la base (genou bas va en arrière) et baissez les hanches.'), cue: lt('Base rộng.', 'Wide base.', 'Base large.') },
      { problem: lt('Pass xong bị re-guard ngay.', 'Pass then immediately get re-guarded.', 'Pass puis re-guardé immédiatement.'), quickFix: lt('Clear hoàn toàn leg line — kéo knee qua hết và ổn định chest-to-hip.', 'Fully clear the leg line — pull the knee all the way through and settle chest-to-hip.', 'Libérez complètement la leg line — tirez genou et stabilisez chest-to-hip.'), cue: lt('Clear hoàn toàn.', 'Fully clear.', 'Libérez complètement.') },
      { problem: lt('Guard player liên tục chuyển guard.', 'Guard player keeps switching guards.', 'Le guard change constamment de garde.'), quickFix: lt('Giữ pressure và inside position, không chase guard change.', 'Keep pressure and inside position, do not chase the guard change.', 'Gardez pression et inside position, ne poursuivez pas le changement de garde.'), cue: lt('Giữ pressure.', 'Keep pressure.', 'Gardez pression.') },
    ],
    doNotDo: la(
      ['Đừng để guard pummel inside position.', 'Đừng chọn pass line mù không đọc shin.', 'Đừng knee cut vào shin frame push.', 'Đừng dừng sau knee line đầu tiên.', 'Đừng mất balance với base hẹp.'],
      ['Do not let the guard pummel inside position.', 'Do not choose a blind pass line without reading the shin.', 'Do not knee cut into a shin frame push.', 'Do not stop after the first knee line.', 'Do not lose balance with a narrow base.'],
      ['Ne laissez pas le guard pummel inside position.', 'Ne choisissez pas une pass line aveugle sans lire le shin.', 'Ne knee cut pas dans un shin frame push.', 'Ne vous arrêtez pas après la première knee line.', 'Ne perdez pas l\'équilibre avec une base étroite.'],
    ),
    safetyNotes: la(
      ['Cẩn thận gối của bạn khi vào knee cut — không drop knee đột ngột lên shin họ.', 'Tránh xoay hông quá nhanh khi chuyển pass line.', 'Nếu gối bạn hoặc partner đau, dừng và reset.'],
      ['Be careful with your knee on knee cuts — do not drop the knee suddenly onto their shin.', 'Avoid rotating the hips too fast when switching pass lines.', 'If your knee or your partner\'s knee hurts, stop and reset.'],
      ['Attention à votre genou sur les knee cuts — ne laissez pas tomber le genou sur leur tibia.', 'Évitez de tourner les hanches trop vite en changeant de pass line.', 'Si votre genou ou celui du partenaire fait mal, arrêtez et reset.'],
    ),
  },
}
