import type { MicroDetailSystem, LocalizedText, LocalizedStringArray, MicroDetail } from '../types/skill'

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

const safetyText = lt('An toàn: tập chậm, tap sớm, và không xoay mù khi line an toàn chưa rõ.', 'Safety: train slowly, tap early, and do not spin blindly when the safety line is unclear.', 'Sécurité : travaillez lentement, tapez tôt et ne tournez pas à l’aveugle quand la ligne de sécurité n’est pas claire.')

export const priorityNoGiMicroDetailSystems: Record<string, MicroDetailSystem> = {
  'crucifix-control': {
    overview: lt('Kiểm soát crucifix bằng cách tách arms khỏi thân, giữ weight lên hips.', 'Crucifix control by separating arms from body, keeping weight on hips.', 'Contrôle crucifix en séparant les bras du corps, gardant le poids sur les hanches.'),
    topFiveDetails: [
      md('cru-arm-trap', 'grip', lt('Trap arm bằng hai chân', 'Trap arm with both legs', 'Bloquer bras avec les deux jambes'), lt('Kẹp cánh tay sát nách.', 'Pinch the arm tight to armpit.', 'Pincez le bras près de aisselle.'), 'near', 'close_in', ['legs', 'arms'], lt('Khi bắt đầu.', 'At the start.', 'Au début.'), lt('Tách arm khỏi thân.', 'Separates arm from torso.', 'Sépare le bras du torse.'), lt('Để lỏng chân.', 'Leaving legs loose.', 'Laisser jambes lâches.'), lt('Pinch knees.', 'Pinch knees.', 'Pincez genoux.'), lt('Arm bị kẹt.', 'Arm is trapped.', 'Bras est piégé.'), safetyText)
    ],
    leftRightGuides: [],
    fastFinishPaths: [],
    troubleshootingTips: [],
    doNotDo: la(['Chưa cập nhật'], ['Pending update'], ['Mise à jour en attente']),
    safetyNotes: la(['Chưa cập nhật'], ['Pending update'], ['Mise à jour en attente']),
  },
  'bear-trap-ham-sandwich': {
    overview: lt('Kiểm soát chân đối thủ bằng bear trap, ép calf slicer.', 'Control opponent leg with bear trap, apply calf slicer.', 'Contrôler jambe adverse avec bear trap, appliquer calf slicer.'),
    topFiveDetails: [
      md('bt-triangle', 'knee', lt('Khóa tam giác chân', 'Lock leg triangle', 'Verrouiller triangle jambe'), lt('Đan chân sau gối.', 'Weave legs behind knee.', 'Tisser jambes derrière genou.'), 'inside', 'close_in', ['knees', 'legs'], lt('Khi bắt đầu.', 'At the start.', 'Au début.'), lt('Tạo lực bẻ.', 'Creates breaking force.', 'Crée force de rupture.'), lt('Không khóa chặt.', 'Not locking tight.', 'Pas verrouillé serré.'), lt('Lock tight.', 'Lock tight.', 'Verrouillé serré.'), lt('Chân bị kẹt.', 'Leg is trapped.', 'Jambe est piégée.'), safetyText)
    ],
    leftRightGuides: [],
    fastFinishPaths: [],
    troubleshootingTips: [
      {
        problem: lt('Khó khóa tam giác', 'Hard to lock triangle', 'Difficile de verrouiller triangle'),
        cause: lt('Chân đối thủ duỗi thẳng', 'Opponent leg is straight', 'Jambe adverse droite'),
        fix: lt('Kéo gập gối họ lại', 'Bend their knee', 'Plier leur genou')
      }
    ],
    doNotDo: la(['Chưa cập nhật'], ['Pending update'], ['Mise à jour en attente']),
    safetyNotes: la(['Chưa cập nhật'], ['Pending update'], ['Mise à jour en attente']),
  },
  'deep-half-guard': {
    overview: lt('Chui sâu dưới hông, điều khiển trọng tâm đối thủ.', 'Get deep under hips, control opponent center of gravity.', 'Aller profond sous hanches, contrôler centre gravité adverse.'),
    topFiveDetails: [
      md('dh-hide-arm', 'head', lt('Giấu tay dưới đùi', 'Hide arm under thigh', 'Cacher bras sous cuisse'), lt('Tránh bị kimura.', 'Avoid kimura.', 'Éviter kimura.'), 'near', 'hide', ['arms', 'thighs'], lt('Khi chui vào.', 'When entering.', 'En entrant.'), lt('Bảo vệ tay.', 'Protects arm.', 'Protège bras.'), lt('Để lộ tay ngoài.', 'Leaving arm exposed outside.', 'Laisser bras exposé dehors.'), lt('Hide arm.', 'Hide arm.', 'Cacher bras.'), lt('Tay an toàn.', 'Arm is safe.', 'Bras est sûr.'), safetyText)
    ],
    leftRightGuides: [],
    fastFinishPaths: [],
    troubleshootingTips: [],
    doNotDo: la(['Chưa cập nhật'], ['Pending update'], ['Mise à jour en attente']),
    safetyNotes: la(['Chưa cập nhật'], ['Pending update'], ['Mise à jour en attente']),
  },
  'half-butterfly-to-leg-entanglements': {
    overview: lt('Dùng butterfly hook nâng đối thủ, chui vào chân.', 'Use butterfly hook to elevate, enter legs.', 'Utiliser hook butterfly pour élever, entrer jambes.'),
    topFiveDetails: [
      md('hb-elevate', 'hook', lt('Nâng bằng hook', 'Elevate with hook', 'Élever avec hook'), lt('Nhấc trọng tâm đối thủ.', 'Lift opponent center of gravity.', 'Lever centre gravité adverse.'), 'inside', 'push_away', ['legs', 'hips'], lt('Khi chuẩn bị vào đòn.', 'Before entering.', 'Avant entrée.'), lt('Tạo khoảng trống.', 'Creates space.', 'Crée espace.'), lt('Đẩy bằng tay.', 'Pushing with hands.', 'Pousser avec mains.'), lt('Elevate.', 'Elevate.', 'Élever.'), lt('Hông nhẹ.', 'Hips are light.', 'Hanches légères.'), safetyText)
    ],
    leftRightGuides: [],
    fastFinishPaths: [],
    troubleshootingTips: [],
    doNotDo: la(['Chưa cập nhật'], ['Pending update'], ['Mise à jour en attente']),
    safetyNotes: la(['Chưa cập nhật'], ['Pending update'], ['Mise à jour en attente']),
  },
  'wrestling-up-from-guard': {
    overview: lt('Đứng dậy từ guard để ôm chân hoặc bodylock.', 'Stand up from guard to leg attack or bodylock.', 'Se lever depuis la garde pour attaque jambe ou bodylock.'),
    topFiveDetails: [
      md('wu-post', 'hand', lt('Post tay đứng lên', 'Post hand to stand up', 'Poster main pour se lever'), lt('Dùng tay chống để nhấc hông.', 'Use hand post to lift hips.', 'Utiliser post main pour lever hanches.'), 'near', 'push_away', ['hands', 'hips'], lt('Khi có khoảng trống.', 'When there is space.', 'Quand il y a de l\'espace.'), lt('Tạo đà đứng.', 'Creates momentum to stand.', 'Crée élan pour se lever.'), lt('Cố đứng không post.', 'Trying to stand without posting.', 'Essayer se lever sans poster.'), lt('Post hand.', 'Post hand.', 'Poster main.'), lt('Hông nhấc lên.', 'Hips are lifted.', 'Hanches levées.'), safetyText)
    ],
    leftRightGuides: [],
    fastFinishPaths: [],
    troubleshootingTips: [],
    doNotDo: la(['Chưa cập nhật'], ['Pending update'], ['Mise à jour en attente']),
    safetyNotes: la(['Chưa cập nhật'], ['Pending update'], ['Mise à jour en attente']),
  },
  'front-headlock-system': {
    overview: lt('Kiểm soát đầu, tay, ép đối thủ xuống.', 'Control head, arm, snap opponent down.', 'Contrôler tête, bras, casser posture adverse.'),
    topFiveDetails: [
      md('fhs-snap', 'hand', lt('Snap down mạnh', 'Strong snap down', 'Snap down fort'), lt('Giật đầu đối thủ.', 'Snap opponent head.', 'Casser posture tête adverse.'), 'both', 'pull_toward_you', ['hands', 'head'], lt('Khi họ đứng cao.', 'When they stand tall.', 'Quand ils sont grands.'), lt('Phá posture.', 'Breaks posture.', 'Casse posture.'), lt('Kéo bằng bắp tay.', 'Pulling with biceps only.', 'Tirer seulement avec biceps.'), lt('Snap hard.', 'Snap hard.', 'Snap fort.'), lt('Họ mất thăng bằng.', 'They lose balance.', 'Ils perdent équilibre.'), safetyText)
    ],
    leftRightGuides: [],
    fastFinishPaths: [],
    troubleshootingTips: [],
    doNotDo: la(['Chưa cập nhật'], ['Pending update'], ['Mise à jour en attente']),
    safetyNotes: la(['Chưa cập nhật'], ['Pending update'], ['Mise à jour en attente']),
  },
  'back-attack-system': {
    overview: lt('Hệ thống tấn công từ lưng.', 'Attacking system from back.', 'Système attaque depuis dos.'),
    topFiveDetails: [
      md('bas-trap', 'arm', lt('Trap cánh tay', 'Trap arm', 'Bloquer bras'), lt('Dùng chân khóa tay đối thủ.', 'Use leg to trap opponent arm.', 'Utiliser jambe pour bloquer bras adverse.'), 'near', 'close_in', ['legs', 'arms'], lt('Khi muốn RNC.', 'When going for RNC.', 'Quand chercher RNC.'), lt('Loại bỏ phòng thủ.', 'Removes defense.', 'Enlève défense.'), lt('Chỉ bóp cổ.', 'Only squeezing neck.', 'Seulement serrer cou.'), lt('Trap arm.', 'Trap arm.', 'Bloquer bras.'), lt('Tay bị khóa.', 'Arm is trapped.', 'Bras bloqué.'), safetyText)
    ],
    leftRightGuides: [],
    fastFinishPaths: [],
    troubleshootingTips: [],
    doNotDo: la(['Chưa cập nhật'], ['Pending update'], ['Mise à jour en attente']),
    safetyNotes: la(['Chưa cập nhật'], ['Pending update'], ['Mise à jour en attente']),
  },
  'leg-lock-defense': {
    overview: lt('Bảo vệ gối, giấu gót chân.', 'Protect knee, hide heel.', 'Protéger genou, cacher talon.'),
    topFiveDetails: [
      md('lld-hide', 'heel', lt('Giấu gót chân', 'Hide heel', 'Cacher talon'), lt('Che gót khỏi tay đối thủ.', 'Hide heel from opponent hands.', 'Cacher talon des mains adverses.'), 'inside', 'hide', ['heels'], lt('Khi bị bắt chân.', 'When leg is caught.', 'Quand jambe est prise.'), lt('Tránh heel hook.', 'Avoids heel hook.', 'Évite heel hook.'), lt('Để lộ gót.', 'Exposing heel.', 'Exposer talon.'), lt('Hide heel.', 'Hide heel.', 'Cacher talon.'), lt('Gót an toàn.', 'Heel is safe.', 'Talon sûr.'), safetyText)
    ],
    leftRightGuides: [],
    fastFinishPaths: [],
    troubleshootingTips: [],
    doNotDo: la(['Chưa cập nhật'], ['Pending update'], ['Mise à jour en attente']),
    safetyNotes: la(['Chưa cập nhật'], ['Pending update'], ['Mise à jour en attente']),
  }
}
