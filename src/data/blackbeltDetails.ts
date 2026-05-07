import type {
  AngleDetail,
  BlackbeltDetailSystem,
  BodyPart,
  BodySide,
  BodyTarget,
  BodyToBodyContact,
  BodyToBodyDetailSystem,
  BodyToBodyPhase,
  ClampMechanic,
  ContactType,
  FinishTip,
  ForceDirection,
  LocalizedText,
  PressureDetail,
} from '../types/skill'

const lt = (vi: string, en: string, fr: string): LocalizedText => ({ vi, en, fr })

const me = (side: BodySide, bodyPart: BodyPart, detail?: LocalizedText): BodyTarget => ({ role: 'me', side, bodyPart, detail })
const opponent = (side: BodySide, bodyPart: BodyPart, detail?: LocalizedText): BodyTarget => ({ role: 'opponent', side, bodyPart, detail })

const contact = (
  id: string,
  title: LocalizedText,
  myBodyPart: BodyTarget,
  opponentBodyPart: BodyTarget,
  contactType: ContactType,
  forceDirection: ForceDirection | undefined,
  exactInstruction: LocalizedText,
  whyItWorks: LocalizedText,
  commonMisplacement: LocalizedText,
  correctionCue: LocalizedText,
  liveCue: LocalizedText,
  prevents?: LocalizedText,
  creates?: LocalizedText,
  safetyNote?: LocalizedText,
): BodyToBodyContact => ({
  id,
  title,
  myBodyPart,
  opponentBodyPart,
  contactType,
  forceDirection,
  pressureLevel: contactType === 'finish_pressure' ? 'progressive' : 'medium',
  timing: lt('Ngay khi contact này xuất hiện.', 'As soon as this contact appears.', 'Des que ce contact apparait.'),
  exactInstruction,
  whyItWorks,
  commonMisplacement,
  correctionCue,
  liveCue,
  prevents,
  creates,
  safetyNote,
})

const phase = (
  id: string,
  title: LocalizedText,
  goal: LocalizedText,
  contacts: BodyToBodyContact[],
  successSignal: LocalizedText,
  failureSignal: LocalizedText,
): BodyToBodyPhase => ({ id, title, goal, contacts, successSignal, failureSignal })

const system = (
  overview: LocalizedText,
  defaultOrientation: LocalizedText,
  phases: BodyToBodyPhase[],
  mostImportantContacts: string[],
): BodyToBodyDetailSystem => ({
  overview,
  defaultOrientation,
  phases,
  leftRightMirrorNote: lt(
    'Nếu đổi bên, mirror trái/phải nhưng giữ near/far và hướng lực giống nhau.',
    'If you switch sides, mirror left and right while keeping the same near/far logic and force direction.',
    'Si vous changez de cote, inversez gauche/droite en gardant la logique proche/loin et la direction de force.',
  ),
  mostImportantContacts,
})

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
  situation: lt('Khi control gần ổn nhưng đối thủ còn xoay được.', 'When control is close but the opponent can still rotate.', 'Quand le controle est presque etabli mais que l adversaire peut encore tourner.'),
  clampWith,
  clampAgainst,
  exactAction,
  pressureDirection,
  whyItWorks,
  commonLeak,
  correctionCue,
  liveCue: correctionCue,
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
  situation: lt('Khi alignment va control da ro.', 'When alignment and control are clear.', 'Quand alignement et controle sont clairs.'),
  setupRequirement,
  exactFinishingAction,
  bodyPartRoles: [
    { bodyPart: 'hands / elbows / chest / hips', role: exactFinishingAction },
  ],
  finishTrigger,
  falseFinishSignal,
  opponentEscape,
  prevention,
  safetyNote,
})

const blackbelt = (
  overview: LocalizedText,
  clampMechanics: ClampMechanic[],
  finishTips: FinishTip[],
  pressureDetails: PressureDetail[],
  angleDetails: AngleDetail[],
  oneSentenceGold: LocalizedText,
): BlackbeltDetailSystem => ({
  overview,
  clampMechanics,
  finishTips,
  pressureDetails,
  angleDetails,
  opponentEscapePrevention: [
    {
      escape: lt('Đối thủ xoay vai ra ngoài.', 'The opponent rotates the shoulder line out.', 'L adversaire tourne la ligne d epaule.'),
      earlySignal: lt('Vai gần bắt đầu trượt hoặc hông quay.', 'The near shoulder starts sliding or the hips turn.', 'L epaule proche glisse ou les hanches tournent.'),
      prevention: lt('Đóng chest/head clamp trước khi tăng lực.', 'Close the chest/head clamp before adding force.', 'Fermez le clamp poitrine/tete avant force.'),
      nextBestBranch: lt('Reset grip hoặc chuyển nhánh an toàn.', 'Reset the grip or switch to the safe branch.', 'Reset le grip ou changez de branche sure.'),
    },
    {
      escape: lt('Đối thủ thắng hand fight.', 'The opponent wins the hand fight.', 'L adversaire gagne le hand fight.'),
      earlySignal: lt('Cổ tay của bạn bị peel hoặc khuỷu flare.', 'Your wrist is peeled or elbow flares.', 'Votre poignet est peel ou le coude s ouvre.'),
      prevention: lt('Thu khuỷu về ribs và lấy lại wrist line.', 'Bring elbow to ribs and reclaim the wrist line.', 'Ramenez le coude aux cotes et reprenez wrist line.'),
      nextBestBranch: lt('Đổi angle trước khi force lại.', 'Change angle before forcing again.', 'Changez l angle avant de forcer.'),
    },
    {
      escape: lt('Đối thủ tạo khoảng trống bằng hip line.', 'The opponent creates space through the hip line.', 'L adversaire cree espace par la hip line.'),
      earlySignal: lt('Hông họ quay hoặc knee line quay vào giữa.', 'Their hips turn or knee line returns inside.', 'Les hanches tournent ou knee line revient dedans.'),
      prevention: lt('Khóa hip line bằng chest, knee hoặc foot post.', 'Lock the hip line with chest, knee, or foot post.', 'Verrouillez hip line avec poitrine, genou ou foot post.'),
      nextBestBranch: lt('Ổn định lại rồi mới finish/advance.', 'Stabilize again before finish or advance.', 'Stabilisez avant finish ou avance.'),
    },
  ],
  oneSentenceGold,
})

const neckSafety = lt('Tăng lực chậm và thả ngay khi partner tap hoặc báo khó chịu ở cổ.', 'Add force slowly and release immediately when the partner taps or reports neck discomfort.', 'Ajoutez la force lentement et relachez des que le partenaire tape ou signale une gene au cou.')
const legSafety = lt('Không xoay mạnh khi knee line còn kẹt; tap sớm khi có lực xoắn vào gối.', 'Do not rotate hard while the knee line is trapped; tap early when twisting force reaches the knee.', 'Ne tournez pas fort si la knee line est piegee; tapez tot si la torsion atteint le genou.')

export const bodyToBodyDetailsBySkillId = new Map<string, BodyToBodyDetailSystem>([
  ['rear-naked-choke-system', system(
    lt('RNC là chest-to-back, hand fight và elbow alignment trước khi squeeze.', 'RNC is chest-to-back connection, hand fight, and elbow alignment before squeeze.', 'Le RNC est connexion chest-to-back, hand fight et alignement du coude avant squeeze.'),
    lt('Ví dụ bên phải: tay phải là choking arm, tay trái thắng wrist fight.', 'Right-side example: right arm is the choking arm, left hand wins wrist fight.', 'Exemple cote droit : bras droit etrangleur, main gauche gagne wrist fight.'),
    [
      phase('rnc-control', lt('Control / Entry', 'Control / Entry', 'Controle / entree'), lt('Gắn ngực vào lưng và chặn shoulder line.', 'Attach chest to back and block the shoulder line.', 'Coller poitrine au dos et bloquer shoulder line.'), [
        contact('rnc-chest-back', lt('Chest glued to back', 'Chest glued to back', 'Poitrine collee au dos'), me('center', 'sternum'), opponent('center', 'chest', lt('Lưng trên / bả vai.', 'Upper back / shoulder blades.', 'Haut du dos / omoplates.')), 'chest_connection', 'close_inward', lt('Ngực của tôi áp sát lưng trên của đối thủ giữa hai bả vai.', 'My sternum stays glued to the opponent’s upper back between the shoulder blades.', 'Mon sternum reste colle au haut du dos entre les omoplates.'), lt('Không còn khoảng trống để họ đưa vai xuống thảm.', 'There is no space for them to put shoulders to the mat.', 'Il n y a plus d espace pour poser les epaules au tapis.'), lt('Ngực trượt quá cao làm mất hông.', 'Sliding the chest too high loses hip control.', 'Poitrine trop haute perd le controle des hanches.'), lt('Chest glued.', 'Chest glued.', 'Poitrine collee.'), lt('Chest glued.', 'Chest glued.', 'Poitrine collee.'), lt('Chặn shoulder-to-mat escape.', 'Prevents shoulder-to-mat escape.', 'Bloque la sortie epaules au tapis.')),
        contact('rnc-head-head', lt('Head blocks turn', 'Head blocks turn', 'Tete bloque le turn'), me('right', 'ear'), opponent('left', 'head'), 'head_position', 'pin_inward', lt('Tai phải của tôi áp sát đầu trái của đối thủ để họ không quay vào trong.', 'My right ear stays glued to the opponent’s left side of the head so they cannot turn in.', 'Mon oreille droite reste collee au cote gauche de sa tete pour bloquer le turn-in.'), lt('Head clamp làm shoulder line khó xoay.', 'The head clamp makes shoulder-line rotation hard.', 'Le clamp de tete bloque la rotation des epaules.'), lt('Để đầu xa cho họ quay cằm vào choking arm.', 'Leaving the head far lets them turn the chin into the choking arm.', 'Tete loin laisse rentrer le menton vers le bras.'), lt('Ear to head.', 'Ear to head.', 'Oreille a tete.'), lt('Head glued.', 'Head glued.', 'Tete collee.')),
      ], lt('Chest-to-back không có khe.', 'Chest-to-back has no gap.', 'Chest-to-back sans espace.'), lt('Vai họ chạm thảm hoặc đầu bạn trôi ra ngoài.', 'Their shoulders touch mat or your head floats out.', 'Ses epaules touchent le tapis ou votre tete flotte.')),
      phase('rnc-alignment', lt('Isolation / Alignment', 'Isolation / Alignment', 'Isolation / alignement'), lt('Thắng tay và đưa elbow vào đúng chin line.', 'Win hands and place elbow on the chin line.', 'Gagner les mains et placer le coude sous la ligne du menton.'), [
        contact('rnc-wrist-fight', lt('Support hand wins wrist', 'Support hand wins wrist', 'Main support gagne poignet'), me('left', 'hand'), opponent('left', 'wrist'), 'hand_fight', 'pull_left', lt('Tay trái của tôi kéo cổ tay trái của đối thủ xuống dưới chest line.', 'My left hand pulls the opponent’s left wrist below the chest line.', 'Ma main gauche tire son poignet gauche sous la ligne de poitrine.'), lt('Defensive hand không còn che cổ.', 'The defensive hand can no longer cover the neck.', 'La main defensive ne couvre plus le cou.'), lt('Kéo ngón tay thay vì cổ tay làm grip trượt.', 'Pulling fingers instead of the wrist makes the grip slip.', 'Tirer les doigts au lieu du poignet fait glisser.'), lt('Wrist first.', 'Wrist first.', 'Poignet d abord.'), lt('Hands first.', 'Hands first.', 'Mains d abord.'), lt('Ngăn two-on-one defense.', 'Prevents two-on-one defense.', 'Bloque defense two-on-one.')),
        contact('rnc-elbow-chin', lt('Elbow under chin', 'Elbow under chin', 'Coude sous menton'), me('right', 'elbow'), opponent('center', 'chin'), 'finish_pressure', 'pull_toward_you', lt('Khuỷu phải của tôi đi dưới chin line trước khi squeeze.', 'My right elbow aligns under the opponent’s chin line before squeezing.', 'Mon coude droit s aligne sous le menton avant squeeze.'), lt('Hai bên cổ được đóng thay vì siết mặt.', 'Both sides of the neck close instead of squeezing the face.', 'Les deux cotes du cou ferment au lieu de serrer le visage.'), lt('Elbow lệch ngoài biến thành face crank.', 'Elbow outside turns into a face crank.', 'Coude dehors devient crank du visage.'), lt('Elbow first.', 'Elbow first.', 'Coude d abord.'), lt('Align first.', 'Align first.', 'Aligner d abord.'), undefined, undefined, neckSafety),
      ], lt('Cằm mở và elbow ở giữa.', 'Chin clears and elbow is centered.', 'Menton libere et coude centre.'), lt('Bạn đang siết qua hàm hoặc má.', 'You are squeezing through jaw or cheek.', 'Vous serrez machoire ou joue.')),
      phase('rnc-finish', lt('Finish / Safety', 'Finish / Safety', 'Finish / securite'), lt('Remove slack rồi dùng chest expansion.', 'Remove slack, then use chest expansion.', 'Enlever slack puis expansion poitrine.'), [
        contact('rnc-slack', lt('Elbow removes slack', 'Elbow removes slack', 'Coude enleve slack'), me('right', 'elbow'), opponent('center', 'neck'), 'pull', 'pull_toward_you', lt('Khuỷu phải của tôi kéo về ribs phải để xóa slack trước khi squeeze.', 'My right elbow pulls toward my right ribs to remove slack before squeeze.', 'Mon coude droit tire vers mes cotes droites pour enlever slack avant squeeze.'), lt('Slack hết thì squeeze nhỏ cũng finish.', 'When slack is gone, a small squeeze can finish.', 'Sans slack, petit squeeze suffit.'), lt('Curl bằng biceps khi còn slack.', 'Curling with biceps while slack remains.', 'Curl biceps avec slack restant.'), lt('Slack out.', 'Slack out.', 'Enlever slack.'), lt('Slack, then squeeze.', 'Slack, then squeeze.', 'Slack puis squeeze.'), undefined, undefined, neckSafety),
      ], lt('Finish đến từ chest expansion, không phải crank.', 'Finish comes from chest expansion, not crank.', 'Le finish vient de l expansion poitrine, pas crank.'), lt('Họ thở được hoặc vai xuống thảm.', 'They can breathe or shoulders reach the mat.', 'Il respire ou epaules au tapis.')),
    ],
    ['rnc-chest-back', 'rnc-wrist-fight', 'rnc-elbow-chin', 'rnc-slack'],
  )],
  ['arm-triangle-mount', system(
    lt('Arm triangle cần kéo tay qua centerline, khóa elbow recovery bằng đầu, rồi tạo angle trước pressure.', 'Arm triangle needs the arm across centerline, head blocking elbow recovery, then angle before pressure.', 'Arm triangle demande bras au-dela centerline, tete qui bloque le retour du coude, puis angle avant pression.'),
    lt('Ví dụ bên phải: tay phải kéo tay trái đối thủ qua centerline.', 'Right-side example: right hand pulls the opponent’s left arm across centerline.', 'Exemple cote droit : main droite tire le bras gauche adverse au-dela centerline.'),
    [
      phase('at-entry', lt('Control / Entry', 'Control / Entry', 'Controle / entree'), lt('Tách arm khỏi ribs từ mount.', 'Separate the arm from ribs from mount.', 'Separer le bras des cotes depuis mount.'), [
        contact('at-arm-across', lt('Arm across centerline', 'Arm across centerline', 'Bras au-dela centerline'), me('right', 'hand'), opponent('left', 'elbow'), 'drag', 'pull_right', lt('Tay phải của tôi kéo khuỷu trái của đối thủ qua centerline trước khi drop shoulder.', 'My right hand pulls the opponent’s left elbow across centerline before dropping shoulder pressure.', 'Ma main droite tire son coude gauche au-dela centerline avant pression epaule.'), lt('Vai họ tự đóng vào cổ.', 'Their shoulder closes into their own neck.', 'Son epaule ferme son cou.'), lt('Drop pressure trước khi arm qua giữa.', 'Dropping pressure before the arm crosses.', 'Mettre pression avant bras au centre.'), lt('Arm across first.', 'Arm across first.', 'Bras traverse d abord.'), lt('Across first.', 'Across first.', 'Traverse d abord.')),
        contact('at-head-elbow', lt('Head blocks elbow', 'Head blocks elbow', 'Tete bloque coude'), me('right', 'head'), opponent('left', 'elbow'), 'head_position', 'pin_inward', lt('Đầu của tôi chặn khuỷu trái của đối thủ quay về ribs.', 'My head blocks the opponent’s left elbow from returning to their ribs.', 'Ma tete bloque son coude gauche pour empecher le retour aux cotes.'), lt('Họ không rebuild frame hoặc underhook.', 'They cannot rebuild frame or underhook.', 'Il ne reconstruit pas frame ou underhook.'), lt('Để đầu cao làm elbow trượt về ribs.', 'A high head lets the elbow slide back to ribs.', 'Tete haute laisse le coude revenir aux cotes.'), lt('Head blocks elbow.', 'Head blocks elbow.', 'Tete bloque coude.'), lt('Block elbow.', 'Block elbow.', 'Bloque coude.')),
      ], lt('Elbow của họ không quay về ribs.', 'Their elbow cannot return to ribs.', 'Son coude ne revient pas aux cotes.'), lt('Họ kéo elbow về và nhìn ra ngoài.', 'They pull elbow back and face out.', 'Il ramene le coude et regarde dehors.')),
      phase('at-angle', lt('Angle / Pressure', 'Angle / Pressure', 'Angle / pression'), lt('Walk hips to side before squeeze.', 'Walk hips to the side before squeeze.', 'Marcher les hanches sur le cote avant squeeze.'), [
        contact('at-shoulder-neck', lt('Diagonal shoulder', 'Diagonal shoulder', 'Epaule diagonale'), me('right', 'shoulder'), opponent('left', 'neck'), 'finish_pressure', 'drive_diagonal', lt('Vai phải của tôi ép chéo vào neck line, không ép thẳng xuống mặt.', 'My right shoulder drives diagonally into the neck line, not straight down into the face.', 'Mon epaule droite pousse en diagonale dans la ligne du cou, pas droit dans le visage.'), lt('Lực đóng động mạch và giữ jaw line an toàn hơn.', 'Force closes the strangle line and keeps pressure cleaner.', 'La force ferme la ligne d etranglement proprement.'), lt('Ép vào mặt tạo đau nhưng không finish sạch.', 'Driving into the face creates pain but not a clean finish.', 'Pousser dans le visage fait mal sans finish propre.'), lt('Diagonal shoulder.', 'Diagonal shoulder.', 'Epaule diagonale.'), lt('Angle, then pressure.', 'Angle, then pressure.', 'Angle puis pression.'), undefined, undefined, neckSafety),
        contact('at-hip-walk', lt('Hips walk out', 'Hips walk out', 'Hanches sortent'), me('right', 'hip'), opponent('far', 'shoulder'), 'pin', 'circle_outside', lt('Hông của tôi walk sang side để chest line vuông góc hơn với cổ.', 'My hips walk to the side so my chest line becomes more perpendicular to the neck.', 'Mes hanches marchent sur le cote pour rendre la poitrine plus perpendiculaire au cou.'), lt('Angle giảm nhu cầu squeeze bằng tay.', 'Angle reduces the need to squeeze with arms.', 'L angle reduit le besoin de serrer aux bras.'), lt('Ở square mount rồi bóp bằng biceps.', 'Staying square in mount and squeezing with biceps.', 'Rester square en mount et serrer aux biceps.'), lt('Walk first.', 'Walk first.', 'Marcher d abord.'), lt('Angle first.', 'Angle first.', 'Angle d abord.')),
      ], lt('Cổ đóng khi bạn thở ra và squeeze nhẹ.', 'The neck closes when you exhale and squeeze lightly.', 'Le cou ferme avec expiration et squeeze leger.'), lt('Họ bridge hoặc elbow quay lại ribs.', 'They bridge or elbow returns to ribs.', 'Il bridge ou coude revient aux cotes.')),
      phase('at-finish', lt('Finish / Safety', 'Finish / Safety', 'Finish / securite'), lt('Finish chậm, giữ mount nếu mất line.', 'Finish slowly and keep mount if line is lost.', 'Finir lentement et garder mount si la ligne est perdue.'), [
        contact('at-mount-hip-clamp', lt('Mount hip clamp', 'Mount hip clamp', 'Clamp hanche mount'), me('both', 'knee'), opponent('both', 'hip'), 'clamp', 'pin_inward', lt('Hai gối của tôi kẹp quanh hip line để không mất mount khi chase choke.', 'My knees clamp around the hip line so I do not lose mount while chasing the choke.', 'Mes genoux clampent la hip line pour ne pas perdre mount en chassant le choke.'), lt('Position vẫn sống nếu finish fail.', 'The position stays alive if the finish fails.', 'La position reste vivante si le finish rate.'), lt('Duỗi chân và trượt khỏi mount.', 'Extending legs and sliding off mount.', 'Etendre les jambes et glisser hors mount.'), lt('Keep mount.', 'Keep mount.', 'Garder mount.'), lt('Mount first.', 'Mount first.', 'Mount d abord.')),
      ], lt('Bạn có pressure và vẫn còn mount.', 'You have pressure and still own mount.', 'Vous avez pression et mount.'), lt('Bạn mất mount để chase cổ.', 'You lose mount chasing the neck.', 'Vous perdez mount en chassant le cou.')),
    ],
    ['at-arm-across', 'at-head-elbow', 'at-shoulder-neck', 'at-hip-walk'],
  )],
])

bodyToBodyDetailsBySkillId.set('bodylock-passing', system(
  lt('Bodylock passing là khóa hip line trước khi vượt chân.', 'Bodylock passing locks the hip line before clearing legs.', 'Bodylock passing verrouille hip line avant de passer les jambes.'),
  lt('Ví dụ bên phải: đầu ở lệch bên vai phải đối thủ, tay khóa thấp quanh hông.', 'Right-side example: head offset beside the opponent’s right shoulder, hands locked low around hips.', 'Exemple cote droit : tete decalee pres de son epaule droite, mains basses autour des hanches.'),
  [
    phase('bl-entry', lt('Entry', 'Entry', 'Entree'), lt('Khóa hông thay vì ribs.', 'Lock hips, not ribs.', 'Verrouiller hanches, pas cotes.'), [
      contact('bl-low-lock', lt('Low hip lock', 'Low hip lock', 'Verrou bas des hanches'), me('both', 'hand'), opponent('both', 'hip'), 'clamp', 'close_inward', lt('Hai tay của tôi khóa thấp quanh hip line của đối thủ, không cao trên ribs.', 'My hands lock low around the opponent’s hip line, not high on the ribs.', 'Mes mains verrouillent bas autour de la hip line, pas haut sur les cotes.'), lt('Hip rotation mất trước khi knee line bị clear.', 'Hip rotation is removed before the knee line is cleared.', 'La rotation de hanche disparait avant clear knee line.'), lt('Lock cao trên ribs cho họ shoulder crunch hoặc butterfly lift.', 'Locking high on ribs gives shoulder crunch or butterfly lift.', 'Lock haut sur cotes donne shoulder crunch ou lift butterfly.'), lt('Lock hips.', 'Lock hips.', 'Verrou hanches.'), lt('Hands low.', 'Hands low.', 'Mains basses.'), lt('Ngăn hip escape và invert.', 'Prevents hip escape and inversion.', 'Bloque hip escape et inversion.')),
      contact('bl-head-offset', lt('Head offset', 'Head offset', 'Tete decalee'), me('right', 'head'), opponent('right', 'shoulder'), 'head_position', 'drive_diagonal', lt('Đầu phải của tôi ở lệch bên vai phải của đối thủ để tránh shoulder crunch.', 'My right side of head stays offset beside the opponent’s right shoulder to avoid shoulder crunch.', 'Ma tete reste decalee pres de son epaule droite pour eviter shoulder crunch.'), lt('Head off-center giữ posture và giảm counter.', 'Off-center head keeps posture and reduces counters.', 'Tete hors centre garde posture et reduit counters.'), lt('Đặt đầu giữa ngực cho họ crunch đầu xuống.', 'Putting head on center chest lets them crunch it down.', 'Tete au centre permet crunch.'), lt('Head off center.', 'Head off center.', 'Tete decalee.'), lt('Offset head.', 'Offset head.', 'Tete off.')),
    ], lt('Hông họ không quay tự do.', 'Their hips cannot rotate freely.', 'Ses hanches ne tournent plus librement.'), lt('Họ lift bằng butterfly hook.', 'They lift with butterfly hook.', 'Il lift avec butterfly hook.')),
    phase('bl-control', lt('Hip / Hook Control', 'Hip / Hook Control', 'Controle hanche / hook'), lt('Giết hook trước khi clear knee.', 'Kill the hook before clearing knee.', 'Tuer hook avant clear knee.'), [
      contact('bl-chest-hip', lt('Chest to near hip', 'Chest to near hip', 'Poitrine a hanche proche'), me('center', 'chest'), opponent('near', 'hip'), 'chest_connection', 'drive_diagonal', lt('Ngực của tôi ép chéo vào near hip để họ không xoay lại guard.', 'My chest drives diagonally into the opponent’s near hip so they cannot rotate back to guard.', 'Ma poitrine pousse en diagonale dans la hanche proche pour bloquer retour guard.'), lt('Hip line bị đóng nên frames yếu đi.', 'The hip line closes, weakening frames.', 'La hip line ferme et affaiblit les frames.'), lt('Ngực nổi làm họ tạo knee shield lại.', 'Floating chest lets them rebuild knee shield.', 'Poitrine flottante laisse reconstruire knee shield.'), lt('Chest to hip.', 'Chest to hip.', 'Poitrine hanche.'), lt('Chest heavy.', 'Chest heavy.', 'Poitrine lourde.'), lt('Ngăn guard recovery.', 'Prevents guard recovery.', 'Bloque recover guard.')),
      contact('bl-knee-hook', lt('Knee kills hook', 'Knee kills hook', 'Genou tue hook'), me('right', 'knee'), opponent('left', 'shin'), 'knee_wedge', 'pin_inward', lt('Gối phải của tôi chèn vào shin trái/butterfly hook trước khi clear knee line.', 'My right knee wedges into the opponent’s left shin or butterfly hook before clearing the knee line.', 'Mon genou droit bloque son tibia gauche / butterfly hook avant clear knee line.'), lt('Hook chết thì họ không lift được base.', 'A dead hook cannot lift your base.', 'Hook mort ne lift plus la base.'), lt('Clear knee khi hook còn sống.', 'Clearing knee while the hook is still alive.', 'Clear knee avec hook vivant.'), lt('Kill hook first.', 'Kill hook first.', 'Tuer hook d abord.'), lt('Hook first.', 'Hook first.', 'Hook d abord.')),
    ], lt('Hook không còn lift.', 'The hook no longer lifts.', 'Le hook ne lift plus.'), lt('Bạn bị nâng hoặc rotate.', 'You get lifted or rotated.', 'Vous etes lift ou tourne.')),
    phase('bl-stabilize', lt('Pass Stabilization', 'Pass Stabilization', 'Stabilisation du pass'), lt('Ổn định pin trước khi thả bodylock.', 'Stabilize the pin before releasing bodylock.', 'Stabiliser le pin avant relacher bodylock.'), [
      contact('bl-pin-release', lt('Release after pin', 'Release after pin', 'Relacher apres pin'), me('near', 'forearm'), opponent('near', 'hip'), 'pin', 'close_inward', lt('Forearm gần của tôi block near hip khi tay thả bodylock để chuyển sang side control.', 'My near forearm blocks the near hip as my hands release the bodylock into side control.', 'Mon forearm proche bloque la hanche proche quand je relache bodylock vers side control.'), lt('Không có re-guard ngay lúc release.', 'There is no re-guard during release.', 'Pas de re-guard au relachement.'), lt('Thả lock khi hip line chưa bị pin.', 'Releasing the lock before hip line is pinned.', 'Relacher avant hip line pin.'), lt('Pin, then release.', 'Pin, then release.', 'Pin puis relache.'), lt('Settle first.', 'Settle first.', 'Stabiliser d abord.')),
    ], lt('Bạn chuyển sang pin mà không mở khoảng trống.', 'You enter pin without opening space.', 'Vous entrez pin sans ouvrir espace.'), lt('Họ shrimp ngay khi bạn thả tay.', 'They shrimp as soon as you release hands.', 'Il shrimp des que vous relachez.')),
  ],
  ['bl-low-lock', 'bl-head-offset', 'bl-chest-hip', 'bl-knee-hook'],
))

bodyToBodyDetailsBySkillId.set('heel-hook-safety', system(
  lt('Heel hook safety là heel hidden, knee line free, rồi mới rotate.', 'Heel hook safety is heel hidden, knee line free, then rotation.', 'La securite heel hook: talon cache, knee line libre, puis rotation.'),
  lt('Ví dụ chân phải bị entangle: ưu tiên giấu gót phải và rút knee line phải.', 'Right leg example: hide the right heel and free the right knee line first.', 'Exemple jambe droite : cacher talon droit et liberer knee line droite d abord.'),
  [
    phase('hh-recognize', lt('Recognize', 'Recognize', 'Reconnaissance'), lt('Nhận diện heel exposure trước đau.', 'Read heel exposure before pain.', 'Lire exposition talon avant douleur.'), [
      contact('hh-hide-heel', lt('Hide heel', 'Hide heel', 'Cacher talon'), me('right', 'heel'), opponent('inside', 'hand'), 'safety_release', 'hide', lt('Gót phải của tôi quay khỏi line bàn tay đối thủ trước mọi turn.', 'My right heel turns away from the opponent’s hand line before any turn.', 'Mon talon droit tourne hors de la ligne des mains adverses avant tout turn.'), lt('Không có heel line để họ tạo torque.', 'There is no heel line for torque.', 'Pas de heel line pour torque.'), lt('Xoay khi gót còn lộ.', 'Turning while the heel is exposed.', 'Tourner avec talon expose.'), lt('Hide heel.', 'Hide heel.', 'Cache talon.'), lt('Heel first.', 'Heel first.', 'Talon d abord.'), undefined, undefined, legSafety),
      contact('hh-hand-fight', lt('Control hands', 'Control hands', 'Controler mains'), me('both', 'hand'), opponent('both', 'wrist'), 'hand_fight', 'pull_toward_you', lt('Hai tay của tôi peel hoặc kiểm soát cổ tay đang giữ heel line.', 'My hands peel or control the wrists attacking my heel line.', 'Mes mains peel ou controlent les poignets qui attaquent heel line.'), lt('Torque bị chậm lại trước khi bạn xoay.', 'Torque slows before you rotate.', 'Le torque ralentit avant rotation.'), lt('Chỉ spin chân mà không thắng tay.', 'Spinning the leg without winning hands.', 'Spinner la jambe sans gagner mains.'), lt('Hands first.', 'Hands first.', 'Mains d abord.'), lt('Peel hands.', 'Peel hands.', 'Peel mains.'), undefined, undefined, legSafety),
    ], lt('Heel không nằm trong grip line.', 'Heel is outside the grip line.', 'Talon hors grip line.'), lt('Gót lộ và knee line kẹt.', 'Heel exposed and knee line trapped.', 'Talon expose et knee line piegee.')),
    phase('hh-free-knee', lt('Free Knee Line', 'Free Knee Line', 'Liberer knee line'), lt('Rút gối qua hip line trước xoay.', 'Free knee past hip line before turning.', 'Sortir genou au-dela hip line avant tourner.'), [
      contact('hh-knee-line', lt('Knee line first', 'Knee line first', 'Knee line d abord'), me('right', 'knee'), opponent('near', 'hip'), 'safety_release', 'pull_toward_you', lt('Gối phải của tôi trượt qua hip line đối thủ trước khi hông xoay.', 'My right knee slides past the opponent’s hip line before my hips rotate.', 'Mon genou droit glisse au-dela de sa hip line avant rotation des hanches.'), lt('Khi knee line tự do, rotation không kéo trực tiếp vào gối.', 'When knee line is free, rotation does not load the knee directly.', 'Knee line libre evite charge directe sur genou.'), lt('Turn khi knee còn bị kẹp.', 'Turning while the knee is still trapped.', 'Tourner avec genou encore piege.'), lt('Knee line first.', 'Knee line first.', 'Knee line d abord.'), lt('Free knee.', 'Free knee.', 'Libere genou.'), undefined, undefined, legSafety),
      contact('hh-clear-second-leg', lt('Clear second leg', 'Clear second leg', 'Liberer deuxieme jambe'), me('left', 'foot'), opponent('outside', 'thigh'), 'post', 'push_away', lt('Chân trái của tôi post và clear khỏi secondary leg để không bị re-trap.', 'My left foot posts and clears away from the secondary leg so I do not get re-trapped.', 'Mon pied gauche poste et sort de la jambe secondaire pour eviter re-trap.'), lt('Second leg không khóa lại hip rotation.', 'The second leg cannot re-lock hip rotation.', 'La deuxieme jambe ne reverrouille pas rotation.'), lt('Chỉ free knee line nhưng để chân phụ bị gom.', 'Freeing knee line while the secondary leg stays caught.', 'Liberer knee line avec jambe secondaire capturee.'), lt('Clear second leg.', 'Clear second leg.', 'Libere deuxieme.'), lt('Second leg.', 'Second leg.', 'Deuxieme jambe.'), undefined, undefined, legSafety),
    ], lt('Knee line và secondary leg đều tự do.', 'Knee line and secondary leg are both free.', 'Knee line et deuxieme jambe libres.'), lt('Bạn bị kéo lại vào entanglement.', 'You get pulled back into entanglement.', 'Vous etes ramene dans entanglement.')),
    phase('hh-exit', lt('Exit / Safety', 'Exit / Safety', 'Sortie / securite'), lt('Turn chỉ sau khi heel hidden và knee line free.', 'Turn only after heel is hidden and knee line is free.', 'Tourner seulement apres talon cache et knee line libre.'), [
      contact('hh-safe-turn', lt('No blind spin', 'No blind spin', 'Pas de spin aveugle'), me('right', 'hip'), opponent('inside', 'thigh'), 'safety_release', 'rotate_clockwise', lt('Hông phải của tôi chỉ xoay sau khi gót ẩn và knee line đã rút.', 'My right hip turns only after the heel is hidden and the knee line is free.', 'Ma hanche droite tourne seulement apres talon cache et knee line libre.'), lt('Exit có thứ tự thay vì gambling với dây chằng.', 'The exit is ordered instead of gambling with ligaments.', 'Sortie ordonnee sans jouer avec les ligaments.'), lt('Spin mù khi heel bị kiểm soát.', 'Blind spinning while the heel is controlled.', 'Spin aveugle avec talon controle.'), lt('No blind spin.', 'No blind spin.', 'Pas de spin aveugle.'), lt('Stop first.', 'Stop first.', 'Stop d abord.'), undefined, undefined, legSafety),
    ], lt('Không còn heel exposure hoặc torque.', 'There is no heel exposure or torque.', 'Plus d exposition talon ni torque.'), lt('Có lực xoắn vào gối: tap.', 'Twisting force reaches knee: tap.', 'Force de torsion au genou: tapez.')),
  ],
  ['hh-hide-heel', 'hh-hand-fight', 'hh-knee-line', 'hh-safe-turn'],
))

bodyToBodyDetailsBySkillId.set('guillotine-system', system(
  lt('Guillotine finish cần chin strap sâu, elbow line đúng và hip angle trước squeeze.', 'Guillotine finish needs deep chin strap, correct elbow line, and hip angle before squeeze.', 'La guillotine demande chin strap profond, bonne ligne du coude et angle de hanche avant squeeze.'),
  lt('Ví dụ bên phải: tay phải là choking arm quanh cổ.', 'Right-side example: right arm is the choking arm around the neck.', 'Exemple cote droit : bras droit autour du cou.'),
  [
    phase('g-entry', lt('Entry', 'Entry', 'Entree'), lt('Đưa cổ vào pocket nhưng giữ airway an toàn khi tập.', 'Put the neck into the pocket while training safely.', 'Mettre le cou dans la poche en securite.'), [
      contact('g-chin-strap', lt('Chin strap wrist', 'Chin strap wrist', 'Poignet chin strap'), me('right', 'wrist'), opponent('center', 'chin'), 'wrap', 'pull_toward_you', lt('Cổ tay phải của tôi nằm dưới chin line, kéo cằm vào chest pocket.', 'My right wrist sits under the chin line and pulls the chin into the chest pocket.', 'Mon poignet droit sous le menton tire le menton dans la poche poitrine.'), lt('Cổ bị định hướng trước khi squeeze.', 'The neck is directed before squeeze.', 'Le cou est dirige avant squeeze.'), lt('Ôm quá nông trên mặt.', 'Wrapping too shallow across the face.', 'Wrap trop haut sur le visage.'), lt('Wrist under chin.', 'Wrist under chin.', 'Poignet sous menton.'), lt('Chin strap.', 'Chin strap.', 'Chin strap.'), undefined, undefined, neckSafety),
      contact('g-head-position', lt('Head beside head', 'Head beside head', 'Tete pres tete'), me('right', 'head'), opponent('right', 'head'), 'head_position', 'pin_inward', lt('Đầu phải của tôi ở cạnh đầu phải của đối thủ để họ không posture lên.', 'My right side of head stays beside the opponent’s right side of head so they cannot posture up.', 'Ma tete reste pres de sa tete cote droit pour bloquer posture.'), lt('Posture bị gãy mà không cần kéo cổ mạnh.', 'Posture breaks without yanking the neck.', 'Posture cassee sans tirer fort le cou.'), lt('Đầu thấp giữa hai tay làm họ crossface ra.', 'Low head between hands lets them crossface out.', 'Tete basse entre mains donne crossface.'), lt('Head beside.', 'Head beside.', 'Tete a cote.'), lt('Break posture.', 'Break posture.', 'Casser posture.')),
    ], lt('Cằm bị kéo vào pocket.', 'Chin is pulled into the pocket.', 'Menton tire dans la poche.'), lt('Họ nhìn lên và posture lại.', 'They look up and posture back.', 'Il regarde haut et posture.')),
    phase('g-angle', lt('Angle / Isolation', 'Angle / Isolation', 'Angle / isolation'), lt('Đổi hip angle để đóng cổ.', 'Change hip angle to close the neck.', 'Changer angle de hanche pour fermer le cou.'), [
      contact('g-elbow-line', lt('Elbow closes ribs', 'Elbow closes ribs', 'Coude ferme cotes'), me('right', 'elbow'), opponent('near', 'ribs'), 'clamp', 'close_inward', lt('Khuỷu phải của tôi kéo về ribs phải để đóng khoảng trống dưới cổ.', 'My right elbow pulls toward my right ribs to close space under the neck.', 'Mon coude droit revient vers mes cotes pour fermer l espace sous le cou.'), lt('Slack dưới cổ biến mất.', 'Slack under the neck disappears.', 'Le slack sous le cou disparait.'), lt('Elbow flare làm đầu họ trượt ra.', 'Flaring elbow lets their head slip out.', 'Coude ouvert laisse sortir la tete.'), lt('Elbow to ribs.', 'Elbow to ribs.', 'Coude aux cotes.'), lt('Close elbow.', 'Close elbow.', 'Ferme coude.'), undefined, undefined, neckSafety),
      contact('g-hip-angle', lt('Hip angle', 'Hip angle', 'Angle hanche'), me('right', 'hip'), opponent('center', 'neck'), 'pin', 'rotate_clockwise', lt('Hông phải của tôi xoay ra ngoài để cổ họ nằm trên đường chéo, không thẳng trước ngực.', 'My right hip rotates out so their neck sits on a diagonal, not straight in front of my chest.', 'Ma hanche droite sort pour mettre le cou sur diagonale, pas droit devant poitrine.'), lt('Angle biến squeeze thành closing line.', 'Angle turns squeeze into a closing line.', 'L angle transforme squeeze en fermeture.'), lt('Square hips làm squeeze thành kéo tay.', 'Square hips turn squeeze into arm pulling.', 'Hanches square = tirage aux bras.'), lt('Angle first.', 'Angle first.', 'Angle d abord.'), lt('Hip out.', 'Hip out.', 'Hanche dehors.')),
    ], lt('Cổ bị đóng bằng angle, không chỉ tay.', 'Neck closes through angle, not only arms.', 'Cou ferme par angle, pas bras seuls.'), lt('Họ đẩy đầu qua far side.', 'They push head to the far side.', 'Il pousse la tete far side.')),
    phase('g-finish', lt('Finish / Safety', 'Finish / Safety', 'Finish / securite'), lt('Squeeze chậm và branch nếu posture thắng.', 'Squeeze slowly and branch if posture wins.', 'Squeeze lent et branch si posture gagne.'), [
      contact('g-finish-line', lt('Rib-to-wrist finish', 'Rib-to-wrist finish', 'Finish cote-poignet'), me('right', 'ribs'), opponent('center', 'neck'), 'finish_pressure', 'compress_down', lt('Ribs phải của tôi kéo xuống wrist line thay vì kéo cổ bằng biceps.', 'My right ribs pull down toward the wrist line instead of yanking the neck with biceps.', 'Mes cotes droites descendent vers le poignet au lieu de tirer au biceps.'), lt('Thân đóng line đều hơn tay.', 'Torso closes the line more evenly than arms.', 'Le torse ferme mieux la ligne que les bras.'), lt('Crank cổ khi chin strap nông.', 'Cranking neck with shallow chin strap.', 'Crank cou avec chin strap peu profond.'), lt('Ribs to wrist.', 'Ribs to wrist.', 'Cotes vers poignet.'), lt('Body squeeze.', 'Body squeeze.', 'Squeeze corps.'), undefined, undefined, neckSafety),
    ], lt('Finish đến trước đau cổ sắc.', 'Finish comes before sharp neck pain.', 'Finish avant douleur vive au cou.'), lt('Đau cổ, không strangle: giảm lực.', 'Neck pain without strangle: reduce force.', 'Douleur cou sans etranglement: reduire.')),
  ],
  ['g-chin-strap', 'g-head-position', 'g-elbow-line', 'g-hip-angle'],
))

bodyToBodyDetailsBySkillId.set('kimura-system', system(
  lt('Kimura là wrist clamp, elbow separation và shoulder-line control trước torque.', 'Kimura is wrist clamp, elbow separation, and shoulder-line control before torque.', 'Kimura = clamp poignet, separation coude et controle shoulder line avant torque.'),
  lt('Ví dụ bên phải: tay phải kiểm soát wrist, tay trái luồn figure-four.', 'Right-side example: right hand controls wrist, left hand builds the figure-four.', 'Exemple cote droit : main droite controle poignet, main gauche fait figure-four.'),
  [
    phase('k-entry', lt('Wrist Clamp', 'Wrist Clamp', 'Clamp poignet'), lt('Pin wrist trước khi tách elbow.', 'Pin wrist before separating elbow.', 'Pinner poignet avant separer coude.'), [
      contact('k-wrist-pin', lt('Wrist pin', 'Wrist pin', 'Pin poignet'), me('right', 'hand'), opponent('left', 'wrist'), 'grip', 'pin_inward', lt('Tay phải của tôi pin cổ tay trái của đối thủ xuống mat hoặc hip line.', 'My right hand pins the opponent’s left wrist to the mat or hip line.', 'Ma main droite pin son poignet gauche au tapis ou hip line.'), lt('Wrist là lever đầu tiên của shoulder line.', 'The wrist is the first lever of the shoulder line.', 'Le poignet est le premier levier de shoulder line.'), lt('Nắm tay áo tưởng tượng thay vì pin wrist thật.', 'Gripping imaginary cloth instead of pinning the wrist.', 'Saisir tissu imaginaire au lieu de pin poignet.'), lt('Pin wrist.', 'Pin wrist.', 'Pin poignet.'), lt('Wrist first.', 'Wrist first.', 'Poignet d abord.')),
      contact('k-figure-four', lt('Figure-four lock', 'Figure-four lock', 'Figure-four'), me('left', 'hand'), opponent('left', 'forearm'), 'wrap', 'close_inward', lt('Tay trái của tôi luồn qua dưới forearm trái của đối thủ để khóa figure-four vào cổ tay phải của tôi.', 'My left hand threads under the opponent’s left forearm to lock figure-four to my right wrist.', 'Ma main gauche passe sous son avant-bras gauche pour figure-four sur mon poignet droit.'), lt('Hai tay biến wrist control thành shoulder control.', 'Both hands turn wrist control into shoulder control.', 'Les deux mains transforment poignet en controle epaule.'), lt('Lock lỏng làm wrist trượt ra.', 'Loose lock lets the wrist slide out.', 'Lock lache laisse glisser le poignet.'), lt('Lock tight.', 'Lock tight.', 'Lock serre.'), lt('No gap.', 'No gap.', 'Sans espace.')),
    ], lt('Wrist không trượt và elbow bắt đầu tách.', 'Wrist does not slip and elbow starts separating.', 'Poignet ne glisse pas et coude separe.'), lt('Wrist thoát khỏi grip.', 'Wrist escapes the grip.', 'Poignet sort du grip.')),
    phase('k-isolate', lt('Elbow / Shoulder Isolation', 'Elbow / Shoulder Isolation', 'Isolation coude / epaule'), lt('Tách elbow khỏi ribs.', 'Separate elbow from ribs.', 'Separer coude des cotes.'), [
      contact('k-elbow-separate', lt('Elbow off ribs', 'Elbow off ribs', 'Coude hors cotes'), me('right', 'forearm'), opponent('left', 'elbow'), 'lift', 'lift_up', lt('Forearm phải của tôi lift khuỷu trái của đối thủ khỏi ribs trước khi rotate.', 'My right forearm lifts the opponent’s left elbow away from ribs before rotation.', 'Mon avant-bras droit lift son coude gauche hors des cotes avant rotation.'), lt('Shoulder line bị isolate, torque cần ít lực hơn.', 'The shoulder line is isolated, so torque needs less force.', 'Shoulder line isolee, torque demande moins force.'), lt('Xoay wrist khi elbow còn dính ribs.', 'Rotating wrist while elbow stays glued to ribs.', 'Tourner poignet avec coude colle aux cotes.'), lt('Elbow off ribs.', 'Elbow off ribs.', 'Coude hors cotes.'), lt('Separate elbow.', 'Separate elbow.', 'Separe coude.'), undefined, undefined, lt('Không crank vai nhanh; tăng lực chậm.', 'Do not crank the shoulder fast; add force slowly.', 'Ne forcez pas l epaule vite; ajoutez force lentement.')),
      contact('k-hip-rotation', lt('Hip rotates shoulder', 'Hip rotates shoulder', 'Hanche tourne epaule'), me('right', 'hip'), opponent('left', 'shoulder'), 'finish_pressure', 'rotate_clockwise', lt('Hông phải của tôi xoay theo shoulder line thay vì kéo bằng tay.', 'My right hip rotates with the shoulder line instead of pulling with arms.', 'Ma hanche droite tourne avec shoulder line au lieu de tirer aux bras.'), lt('Hips create torque while arms keep clamp.', 'Hips create torque while arms keep the clamp.', 'Les hanches creent torque, les bras gardent clamp.'), lt('Chỉ kéo bằng biceps.', 'Pulling only with biceps.', 'Tirer seulement biceps.'), lt('Hips turn.', 'Hips turn.', 'Hanches tournent.'), lt('Hip, not arm.', 'Hip, not arm.', 'Hanche, pas bras.'), undefined, undefined, lt('Dừng khi partner tap hoặc shoulder đau sắc.', 'Stop when partner taps or sharp shoulder pain appears.', 'Arreter quand partenaire tape ou douleur vive epaule.')),
    ], lt('Elbow tách khỏi ribs và shoulder line bị khóa.', 'Elbow separates from ribs and shoulder line is locked.', 'Coude separe des cotes et shoulder line verrouillee.'), lt('Arm straightens hoặc họ roll out.', 'Arm straightens or they roll out.', 'Bras se tend ou il roll out.')),
    phase('k-branch', lt('Finish / Branch', 'Finish / Branch', 'Finish / branche'), lt('Nếu kimura line mất, chuyển back/armbar/triangle.', 'If kimura line is lost, branch to back, armbar, or triangle.', 'Si kimura line perdue, branch vers dos, armbar ou triangle.'), [
      contact('k-shoulder-clamp', lt('Shoulder line clamp', 'Shoulder line clamp', 'Clamp shoulder line'), me('center', 'chest'), opponent('left', 'shoulder'), 'clamp', 'close_inward', lt('Chest của tôi pin shoulder line trái để họ không quay theo torque.', 'My chest pins the opponent’s left shoulder line so they cannot rotate with the torque.', 'Ma poitrine pin sa shoulder line gauche pour bloquer rotation avec torque.'), lt('Shoulder không chạy theo wrist.', 'Shoulder cannot chase the wrist.', 'Epaule ne suit pas poignet.'), lt('Để chest rời làm họ roll.', 'Chest disconnect lets them roll.', 'Poitrine deconnectee permet roll.'), lt('Clamp shoulder.', 'Clamp shoulder.', 'Clamp epaule.'), lt('Chest pins.', 'Chest pins.', 'Poitrine pin.')),
    ], lt('Bạn giữ shoulder line hoặc có branch.', 'You keep shoulder line or have a branch.', 'Vous gardez shoulder line ou branche.'), lt('Họ duỗi tay và quay theo.', 'They straighten arm and rotate with it.', 'Il tend le bras et tourne avec.')),
  ],
  ['k-wrist-pin', 'k-figure-four', 'k-elbow-separate', 'k-hip-rotation'],
))

bodyToBodyDetailsBySkillId.set('straight-ankle-lock-safety', system(
  lt('Straight ankle lock cần ankle line đúng, knee line kiểm soát và hip extension an toàn.', 'Straight ankle lock needs correct ankle line, knee-line control, and safe hip extension.', 'Straight ankle lock demande ankle line correcte, controle knee line et extension hanche sure.'),
  lt('Ví dụ tấn công chân phải: forearm khóa ankle line, elbow về ribs.', 'Attacking right leg example: forearm locks ankle line, elbow returns to ribs.', 'Exemple attaque jambe droite : avant-bras verrouille ankle line, coude aux cotes.'),
  [
    phase('sal-entry', lt('Entry / Ankle Line', 'Entry / Ankle Line', 'Entree / ankle line'), lt('Đặt forearm vào đúng ankle line.', 'Place forearm on the correct ankle line.', 'Placer avant-bras sur bonne ankle line.'), [
      contact('sal-forearm-ankle', lt('Forearm under ankle', 'Forearm under ankle', 'Avant-bras sous cheville'), me('right', 'forearm'), opponent('right', 'ankle'), 'wrap', 'pull_toward_you', lt('Forearm phải của tôi nằm dưới ankle line phải của đối thủ, không nằm giữa calf.', 'My right forearm sits under the opponent’s right ankle line, not in the middle of the calf.', 'Mon avant-bras droit sous sa ankle line droite, pas au milieu du mollet.'), lt('Blade forearm tạo fulcrum rõ cho extension.', 'The forearm blade creates a clear fulcrum for extension.', 'Le tranchant de l avant-bras cree fulcrum pour extension.'), lt('Ôm quá thấp ở calf làm finish trượt.', 'Wrapping too low on calf makes finish slide.', 'Wrap trop bas sur mollet glisse.'), lt('Ankle line.', 'Ankle line.', 'Ankle line.'), lt('Wrist high.', 'Wrist high.', 'Poignet haut.'), undefined, undefined, legSafety),
      contact('sal-elbow-ribs', lt('Elbow to ribs', 'Elbow to ribs', 'Coude aux cotes'), me('right', 'elbow'), opponent('right', 'foot'), 'clamp', 'close_inward', lt('Khuỷu phải của tôi kéo về ribs phải để bàn chân không trượt ra khỏi pocket.', 'My right elbow pulls to my right ribs so the foot cannot slip out of the pocket.', 'Mon coude droit revient aux cotes pour garder le pied dans la poche.'), lt('Foot line bị kẹp sát thân.', 'The foot line is clamped tight to the torso.', 'La ligne du pied est clamp au torse.'), lt('Elbow mở làm heel/foot slip.', 'Open elbow lets heel or foot slip.', 'Coude ouvert laisse glisser talon/pied.'), lt('Elbow tight.', 'Elbow tight.', 'Coude serre.'), lt('Close elbow.', 'Close elbow.', 'Ferme coude.')),
    ], lt('Foot không trượt ra khỏi pocket.', 'Foot does not slip out of the pocket.', 'Pied ne glisse pas hors poche.'), lt('Bạn chỉ kéo calf.', 'You are only pulling calf.', 'Vous tirez seulement le mollet.')),
    phase('sal-control', lt('Knee Line Control', 'Knee Line Control', 'Controle knee line'), lt('Giữ knee line trước khi extend.', 'Control knee line before extending.', 'Controler knee line avant extension.'), [
      contact('sal-knee-clamp', lt('Knee line clamp', 'Knee line clamp', 'Clamp knee line'), me('both', 'knee'), opponent('right', 'knee'), 'clamp', 'pin_inward', lt('Hai gối của tôi kẹp quanh knee line phải để họ không boot và rút gối.', 'My knees clamp around the opponent’s right knee line so they cannot boot and pull the knee out.', 'Mes genoux clampent sa knee line droite pour bloquer boot et retrait genou.'), lt('Knee line bị giữ thì extension đi vào ankle.', 'When knee line is held, extension travels into the ankle.', 'Knee line tenue, extension va dans cheville.'), lt('Để knee line thoát rồi cố arch mạnh.', 'Letting knee line escape and arching harder.', 'Laisser sortir knee line puis arquer plus fort.'), lt('Clamp knee line.', 'Clamp knee line.', 'Clamp knee line.'), lt('Knees pinch.', 'Knees pinch.', 'Genoux serrent.'), undefined, undefined, legSafety),
      contact('sal-hip-extension', lt('Hip extension', 'Hip extension', 'Extension hanche'), me('center', 'hip'), opponent('right', 'ankle'), 'finish_pressure', 'drive_forward', lt('Hông của tôi extend chậm về phía ankle line, không giật lưng ra sau.', 'My hips extend slowly toward the ankle line, not by yanking my back backward.', 'Mes hanches s etendent lentement vers ankle line, pas en tirant le dos.'), lt('Hip extension tạo lực đều và kiểm soát được.', 'Hip extension creates even, controllable force.', 'Extension hanche cree force reguliere controlable.'), lt('Crank bằng lưng làm mất control và nguy hiểm.', 'Cranking with the back loses control and increases risk.', 'Crank au dos perd controle et augmente risque.'), lt('Hips slow.', 'Hips slow.', 'Hanches lentes.'), lt('Extend hips.', 'Extend hips.', 'Extension hanches.'), undefined, undefined, legSafety),
    ], lt('Extension vào ankle line, không vào knee twist.', 'Extension goes into ankle line, not knee twist.', 'Extension dans ankle line, pas torsion genou.'), lt('Knee line thoát hoặc foot slip.', 'Knee line escapes or foot slips.', 'Knee line sort ou pied glisse.')),
    phase('sal-safety', lt('Finish / Safety', 'Finish / Safety', 'Finish / securite'), lt('Tăng lực chậm và giữ rule set rõ.', 'Add force slowly and know the ruleset.', 'Ajouter force lentement et connaitre ruleset.'), [
      contact('sal-safe-release', lt('Safe release', 'Safe release', 'Relache securise'), me('both', 'hand'), opponent('right', 'foot'), 'safety_release', 'open_outward', lt('Hai tay của tôi giữ nhưng sẵn sàng thả ngay khi partner tap.', 'My hands hold position but release immediately when the partner taps.', 'Mes mains tiennent mais relachent des que partenaire tape.'), lt('Training giữ được an toàn và tin tưởng.', 'Training stays safe and trusted.', 'Training reste sur et fiable.'), lt('Giữ grip sau tap.', 'Holding grip after tap.', 'Garder grip apres tap.'), lt('Release on tap.', 'Release on tap.', 'Relache au tap.'), lt('Tap means stop.', 'Tap means stop.', 'Tap = stop.'), undefined, undefined, legSafety),
    ], lt('Partner có thời gian tap rõ.', 'Partner has clear time to tap.', 'Partenaire a temps clair pour taper.'), lt('Lực vào gối hoặc đau sắc.', 'Force enters knee or sharp pain appears.', 'Force dans genou ou douleur vive.')),
  ],
  ['sal-forearm-ankle', 'sal-elbow-ribs', 'sal-knee-clamp', 'sal-hip-extension'],
))

export const blackbeltDetailsBySkillId = new Map<string, BlackbeltDetailSystem>([
  ['rear-naked-choke-system', blackbelt(
    lt('RNC blackbelt detail: thắng tay, xóa slack, mở ngực.', 'RNC blackbelt detail: win hands, remove slack, expand chest.', 'Detail blackbelt RNC : gagner mains, enlever slack, ouvrir poitrine.'),
    [
      clamp('rnc-chest-clamp', lt('Chest-to-back clamp', 'Chest-to-back clamp', 'Clamp chest-to-back'), ['sternum', 'ribs'], ['upper back', 'shoulder blades'], lt('Dính sternum vào upper back và giữ ribs sau hông.', 'Glue sternum to upper back and keep ribs behind hips.', 'Coller sternum au haut du dos et garder cotes derriere hanches.'), lt('Close space inward.', 'Close space inward.', 'Fermer espace.'), lt('Shoulders không xuống mat.', 'Shoulders cannot reach mat.', 'Epaules ne vont pas tapis.'), lt('Chest quá cao.', 'Chest too high.', 'Poitrine trop haute.'), lt('Chest glued.', 'Chest glued.', 'Poitrine collee.')),
      clamp('rnc-elbow-clamp', lt('Choking elbow clamp', 'Choking elbow clamp', 'Clamp coude etrangleur'), ['choking elbow', 'ribs'], ['neck line'], lt('Kéo elbow về ribs sau khi elbow dưới chin.', 'Pull elbow to ribs after elbow is under chin.', 'Tirer coude aux cotes apres coude sous menton.'), lt('Pull slack backward.', 'Pull slack backward.', 'Tirer slack en arriere.'), lt('Slack biến mất.', 'Slack disappears.', 'Slack disparait.'), lt('Curl biceps sớm.', 'Early biceps curl.', 'Curl biceps trop tot.'), lt('Slack out.', 'Slack out.', 'Slack dehors.')),
    ],
    [
      finish('rnc-finish-tip-1', lt('Elbow before squeeze', 'Elbow before squeeze', 'Coude avant squeeze'), lt('Chin line cleared and hand fight won.', 'Chin line cleared and hand fight won.', 'Menton libere et hand fight gagne.'), lt('Pull elbow back, then expand chest and close shoulders.', 'Pull elbow back, then expand chest and close shoulders.', 'Tirer coude, ouvrir poitrine et fermer epaules.'), lt('Elbow is centered under chin.', 'Elbow is centered under chin.', 'Coude centre sous menton.'), lt('Squeezing jaw or face.', 'Squeezing jaw or face.', 'Serrer machoire ou visage.'), lt('Shoulders to mat.', 'Shoulders to mat.', 'Epaules au tapis.'), lt('Head clamp and chest-to-back.', 'Head clamp and chest-to-back.', 'Clamp tete et chest-to-back.'), neckSafety),
      finish('rnc-finish-tip-2', lt('Short choke branch', 'Short choke branch', 'Branche short choke'), lt('Defensive hand blocks full lock.', 'Defensive hand blocks full lock.', 'Main defensive bloque lock complet.'), lt('Keep wrist blade under jaw, head glued, and finish without chasing full figure-four.', 'Keep wrist blade under jaw, head glued, and finish without chasing full figure-four.', 'Garder poignet sous machoire, tete collee, finir sans chasser figure-four.'), lt('Wrist blade is deep.', 'Wrist blade is deep.', 'Poignet profond.'), lt('Wrist across face.', 'Wrist across face.', 'Poignet sur visage.'), lt('Peel wrist.', 'Peel wrist.', 'Peel poignet.'), lt('Win hand fight first.', 'Win hand fight first.', 'Gagner hand fight.'), neckSafety),
    ],
    [pressure('rnc-pressure-1', lt('Chest expansion', 'Chest expansion', 'Expansion poitrine'), 'chest', lt('Neck line', 'Neck line', 'Ligne du cou'), lt('Expand chest after slack removal.', 'Expand chest after slack removal.', 'Ouvrir poitrine apres slack.'), lt('Curling arms first.', 'Curling arms first.', 'Curl bras d abord.'), lt('Slack, then chest.', 'Slack, then chest.', 'Slack puis poitrine.')), pressure('rnc-pressure-2', lt('Head clamp pressure', 'Head clamp pressure', 'Pression clamp tete'), 'head', lt('Shoulder line', 'Shoulder line', 'Shoulder line'), lt('Pin head inward to stop turn-in.', 'Pin head inward to stop turn-in.', 'Pinner tete pour bloquer turn-in.'), lt('Head floats outside.', 'Head floats outside.', 'Tete flotte dehors.'), lt('Ear glued.', 'Ear glued.', 'Oreille collee.'))],
    [angle('rnc-angle-1', lt('Shoulder line denial', 'Shoulder line denial', 'Bloquer shoulder line'), lt('Keep shoulders off mat.', 'Keep shoulders off mat.', 'Garder epaules hors tapis.'), lt('Chest follows their upper back.', 'Chest follows their upper back.', 'Poitrine suit haut du dos.'), lt('Prevents back escape.', 'Prevents back escape.', 'Bloque back escape.'), lt('Sliding too high.', 'Sliding too high.', 'Glisser trop haut.'), lt('Follow shoulders.', 'Follow shoulders.', 'Suivre epaules.')), angle('rnc-angle-2', lt('Chin line angle', 'Chin line angle', 'Angle menton'), lt('Elbow under chin line.', 'Elbow under chin line.', 'Coude sous menton.'), lt('Win wrist, slide under jaw.', 'Win wrist, slide under jaw.', 'Gagner poignet, glisser sous machoire.'), lt('Prevents face squeeze.', 'Prevents face squeeze.', 'Evite squeeze visage.'), lt('Elbow outside.', 'Elbow outside.', 'Coude dehors.'), lt('Elbow first.', 'Elbow first.', 'Coude d abord.'))],
    lt('Win the hands, align the elbow, remove slack, then squeeze with the chest.', 'Win the hands, align the elbow, remove slack, then squeeze with the chest.', 'Gagner mains, aligner coude, enlever slack, puis squeeze poitrine.'),
  )],
  ['arm-triangle-mount', blackbelt(lt('Arm triangle blackbelt detail: arm across, head blocks, angle before pressure.', 'Arm triangle blackbelt detail: arm across, head blocks, angle before pressure.', 'Detail blackbelt arm triangle : bras traverse, tete bloque, angle avant pression.'), [], [], [], [], lt('Arm across first; head blocks elbow; angle before squeeze.', 'Arm across first; head blocks elbow; angle before squeeze.', 'Bras traverse; tete bloque coude; angle avant squeeze.'))],
  ['guillotine-system', blackbelt(lt('Guillotine blackbelt detail: chin strap, elbow line, hip angle.', 'Guillotine blackbelt detail: chin strap, elbow line, hip angle.', 'Detail blackbelt guillotine : chin strap, elbow line, angle hanche.'), [], [], [], [], lt('Wrist under chin, elbow to ribs, hip angle before squeeze.', 'Wrist under chin, elbow to ribs, hip angle before squeeze.', 'Poignet sous menton, coude aux cotes, angle avant squeeze.'))],
  ['kimura-system', blackbelt(lt('Kimura blackbelt detail: wrist first, elbow off ribs, hip rotation.', 'Kimura blackbelt detail: wrist first, elbow off ribs, hip rotation.', 'Detail blackbelt kimura : poignet, coude hors cotes, rotation hanche.'), [], [], [], [], lt('Pin wrist, separate elbow, rotate hips instead of arms.', 'Pin wrist, separate elbow, rotate hips instead of arms.', 'Pin poignet, separer coude, tourner hanches pas bras.'))],
  ['straight-ankle-lock-safety', blackbelt(lt('Straight ankle blackbelt detail: ankle line, elbow clamp, knee line, slow hips.', 'Straight ankle blackbelt detail: ankle line, elbow clamp, knee line, slow hips.', 'Detail blackbelt straight ankle : ankle line, clamp coude, knee line, hanches lentes.'), [], [], [], [], lt('Forearm on ankle line, elbow closed, knees clamp, hips extend slowly.', 'Forearm on ankle line, elbow closed, knees clamp, hips extend slowly.', 'Avant-bras sur ankle line, coude ferme, genoux clamp, hanches lentes.'))],
  ['heel-hook-safety', blackbelt(lt('Heel hook safety blackbelt detail: hide heel, free knee line, no blind spin.', 'Heel hook safety blackbelt detail: hide heel, free knee line, no blind spin.', 'Detail blackbelt heel hook : cacher talon, liberer knee line, pas de spin aveugle.'), [], [], [], [], lt('Hide heel first, free knee line second, turn only when safe.', 'Hide heel first, free knee line second, turn only when safe.', 'Cacher talon, liberer knee line, tourner seulement si sur.'))],
])
