import type { LocalizedStringArray, LocalizedText } from '../types/skill'
import type { RolePerspectiveData, TechniqueOutcomeResult, TechniqueStateMachine } from '../types/stateMachine'

const lt = (vi: string, en: string, fr: string): LocalizedText => ({ vi, en, fr })
const la = (vi: string[], en: string[], fr: string[]): LocalizedStringArray => ({ vi, en, fr })

const error = (vi: string, en: string, fr: string, viConsequence: string, enConsequence: string, frConsequence: string, viCorrection: string, enCorrection: string, frCorrection: string) => ({
  error: lt(vi, en, fr),
  consequence: lt(viConsequence, enConsequence, frConsequence),
  correction: lt(viCorrection, enCorrection, frCorrection),
})

const check = (vi: string, en: string, fr: string, viAnswer: string, enAnswer: string, frAnswer: string, safetyCritical = false) => ({
  question: lt(vi, en, fr),
  answer: lt(viAnswer, enAnswer, frAnswer),
  safetyCritical,
})

const role = (
  roleName: RolePerspectiveData['role'],
  goal: LocalizedText,
  cues: LocalizedStringArray,
  actions: LocalizedStringArray,
  safety = false,
): RolePerspectiveData => ({
  role: roleName,
  goal,
  recognitionCues: cues,
  primaryActions: actions,
  commonErrors: [
    error(
      'Đẩy hoặc kéo khi body line chưa đúng.',
      'Pushing or pulling before the body line is correct.',
      'Pousser ou tirer avant que la ligne du corps soit correcte.',
      'Lực trượt và đối thủ có counter angle.',
      'Force slides and the opponent gets a counter angle.',
      'La force glisse et l’adversaire obtient un angle de contre.',
      'Đặt contact trước, thêm lực sau.',
      'Set contact first, add force second.',
      'Placer le contact d’abord, ajouter la force ensuite.',
    ),
    error(
      'Chase finish khi mất kiểm soát hông/vai.',
      'Chasing the finish after losing hip or shoulder control.',
      'Chasser le finish après perte de contrôle hanche/épaule.',
      'Bạn mất position hoặc tạo scramble xấu.',
      'You lose position or create a bad scramble.',
      'Vous perdez la position ou créez un mauvais scramble.',
      'Reset control rồi mới branch.',
      'Reset control before branching.',
      'Reset contrôle avant de brancher.',
    ),
  ],
  knowledgeChecks: [
    check(
      'Body signal nào báo bạn nên reset thay vì ép tiếp?',
      'What body signal tells you to reset instead of forcing?',
      'Quel signal corporel indique de reset au lieu de forcer ?',
      'Khi contact chính hở, đầu/hông lệch sai line, hoặc đối thủ lấy lại inside position.',
      'When the main contact opens, head or hips drift off line, or the opponent regains inside position.',
      'Quand le contact principal s’ouvre, tête/hanches sortent de la ligne, ou l’adversaire reprend inside position.',
      safety,
    ),
    check(
      'Bạn tăng lực lúc nào?',
      'When do you add force?',
      'Quand ajouter la force ?',
      'Sau khi alignment, clamp và escape prevention đã rõ.',
      'After alignment, clamp, and escape prevention are clear.',
      'Après alignement, clamp et prévention de sortie.',
    ),
  ],
})

const outcome = (
  id: string,
  result: TechniqueOutcomeResult,
  label: LocalizedText,
  explanation: LocalizedText,
  triggerSignal: LocalizedText,
  target: Partial<Pick<TechniqueStateMachine['outcomes'][number], 'toSkillId' | 'toPositionId' | 'toSubmissionId' | 'toProblemId' | 'toSafetyNoteId'>>,
  confidence: 'low' | 'medium' | 'high' = 'medium',
) => ({ id, result, label, explanation, triggerSignal, confidence, ...target })

const progressions = (safety = false): TechniqueStateMachine['trainingProgressions'] => [
  {
    phase: lt('Đặt hình', 'Static shape', 'Forme statique'),
    focus: lt('Contact chính và hướng lực.', 'Main contact and force direction.', 'Contact principal et direction de force.'),
    instruction: lt('Dừng ở từng checkpoint và nói rõ body part nào chạm body part nào.', 'Pause at each checkpoint and name which body part contacts which body part.', 'Pause à chaque checkpoint et nommer quel body part contacte quel body part.'),
    intensity: 'static',
  },
  {
    phase: lt('Kháng cự tăng dần', 'Progressive resistance', 'Résistance progressive'),
    focus: lt('Giữ clamp khi đối thủ tạo phản ứng đầu tiên.', 'Keep the clamp through the first defensive reaction.', 'Garder le clamp sur la première réaction défensive.'),
    instruction: lt('Partner chỉ dùng một escape/counter đã định trước.', 'Partner uses only one agreed escape or counter.', 'Le partenaire utilise une sortie ou contre prévu.'),
    intensity: 'progressive',
  },
  {
    phase: safety ? lt('Safety review', 'Safety review', 'Revue sécurité') : lt('Positional round', 'Positional round', 'Round positionnel'),
    focus: safety ? lt('Tap, release và abort signal.', 'Tap, release, and abort signal.', 'Tap, relâchement et signal abort.') : lt('Success, failure và branch.', 'Success, failure, and branch.', 'Succès, échec et branche.'),
    instruction: safety
      ? lt('Dừng ngay khi có tap, đau bất thường hoặc line nguy hiểm.', 'Stop immediately on tap, unusual pain, or unsafe line.', 'Arrêter immédiatement sur tap, douleur anormale ou ligne dangereuse.')
      : lt('Bắt đầu từ position gốc và đi tới outcome tự nhiên.', 'Start from the source position and flow to the natural outcome.', 'Partir de la position source et aller vers l’outcome naturel.'),
    intensity: 'positional',
  },
]

type Spec = {
  skillId: string
  fromPositionId?: string
  role?: 'top' | 'bottom' | 'attacker' | 'defender' | 'neutral'
  safety?: boolean
  attackerGoal: LocalizedText
  defenderGoal: LocalizedText
  cues: LocalizedStringArray
  actions: LocalizedStringArray
  outcomes: TechniqueStateMachine['outcomes']
}

const machine = (spec: Spec): TechniqueStateMachine => ({
  id: `${spec.skillId}-state-machine`,
  skillId: spec.skillId,
  fromPositionId: spec.fromPositionId,
  startingRole: spec.role ?? 'attacker',
  outcomes: spec.outcomes,
  attacker: role('attacker', spec.attackerGoal, spec.cues, spec.actions, spec.safety),
  defender: role(
    'defender',
    spec.defenderGoal,
    la(
      ['Contact chính bắt đầu khóa line của bạn.', 'Bạn mất inside position.', spec.safety ? 'Có đau bất thường hoặc pressure tăng nhanh.' : 'Opponent đổi angle trước khi tăng lực.'],
      ['The main contact starts locking your line.', 'You lose inside position.', spec.safety ? 'There is unusual pain or fast pressure increase.' : 'Opponent changes angle before adding force.'],
      ['Le contact principal verrouille votre ligne.', 'Vous perdez inside position.', spec.safety ? 'Douleur anormale ou pression qui augmente vite.' : 'L’adversaire change angle avant force.'],
    ),
    la(
      ['Giữ line an toàn.', 'Tạo frame/wedge sớm.', spec.safety ? 'Tap hoặc yêu cầu reset sớm.' : 'Branch trước khi position bị ổn định.'],
      ['Keep the safe line.', 'Build frame or wedge early.', spec.safety ? 'Tap or request reset early.' : 'Branch before the position stabilizes.'],
      ['Garder la ligne sûre.', 'Créer frame ou wedge tôt.', spec.safety ? 'Taper ou demander reset tôt.' : 'Brancher avant stabilisation.'],
    ),
    spec.safety,
  ),
  trainingProgressions: progressions(spec.safety),
})

export const techniqueStateMachines: TechniqueStateMachine[] = [
  machine({
    skillId: 'rear-naked-choke-system',
    fromPositionId: 'back-control-position',
    safety: true,
    attackerGoal: lt('Giữ chest-to-back, thắng hand fight rồi đặt choking elbow dưới cằm trước squeeze.', 'Keep chest-to-back, win the hand fight, then align the choking elbow under the chin before squeezing.', 'Garder chest-to-back, gagner hand fight, puis aligner coude sous menton avant squeeze.'),
    defenderGoal: lt('Bảo vệ cổ, phá wrist line và đưa shoulder xuống mat trước khi choke line kín.', 'Protect the neck, break wrist line, and put a shoulder to the mat before the choke line closes.', 'Protéger le cou, casser wrist line et mettre une épaule au sol avant fermeture.'),
    cues: la(['Chest dính lưng.', 'Elbow dưới cằm.', 'Squeeze sau cùng.'], ['Chest glued.', 'Elbow under chin.', 'Squeeze last.'], ['Poitrine collée.', 'Coude sous menton.', 'Squeeze en dernier.']),
    actions: la(['Ẩn wrist sau hand fight.', 'Kéo elbow về ribs để xóa slack.', 'Branch sang arm trap/mount nếu họ đặt shoulder xuống mat.'], ['Hide wrist after hand fight.', 'Pull elbow to ribs to remove slack.', 'Branch to arm trap or mount if they get shoulder to mat.'], ['Cacher wrist après hand fight.', 'Tirer coude aux côtes pour enlever slack.', 'Branch arm trap ou mount si épaule au sol.']),
    outcomes: [
      outcome('rnc-success', 'success', lt('Strangle sạch', 'Clean strangle', 'Strangle propre'), lt('Elbow line đúng, slack hết và chest-to-back không hở.', 'Elbow line is correct, slack is gone, and chest-to-back stays closed.', 'Ligne du coude correcte, slack retiré, chest-to-back fermé.'), lt('Chin line mở và defensive hand bị thắng.', 'Chin line opens and defensive hand is beaten.', 'Chin line ouverte et main défensive battue.'), { toSubmissionId: 'rear-naked-choke-system' }, 'high'),
      outcome('rnc-retain', 'failure', lt('Giữ back control', 'Retain back control', 'Garder back control'), lt('Finish chưa ra nhưng hooks, seatbelt và chest vẫn còn.', 'Finish fails but hooks, seatbelt, and chest connection remain.', 'Finish échoue mais hooks, seatbelt et poitrine restent.'), lt('Họ giấu cằm nhưng chưa đặt shoulder xuống mat.', 'They hide the chin but cannot put shoulder to mat.', 'Il cache menton mais pas épaule au sol.'), { toSkillId: 'back-control' }, 'high'),
      outcome('rnc-counter', 'counter', lt('Shoulder xuống mat', 'Shoulder to mat', 'Épaule au sol'), lt('Defender mở cửa back escape; attacker phải chuyển mount hoặc retention.', 'Defender opens the back escape door; attacker must switch to mount or retention.', 'Le défenseur ouvre sortie du dos; attaquant passe mount ou retention.'), lt('Chest-to-back hở và top hook bị clear.', 'Chest-to-back opens and top hook is cleared.', 'Chest-to-back ouvert et top hook clear.'), { toSkillId: 'mount-control' }, 'medium'),
      outcome('rnc-safety', 'safety_abort', lt('Abort neck crank', 'Abort neck crank', 'Stop neck crank'), lt('Nếu áp lực là đau cổ/hàm thay vì strangle sạch, giảm lực và reset line.', 'If pressure is neck or jaw pain instead of clean strangle, reduce force and reset line.', 'Si pression douleur cou/mâchoire au lieu de strangle propre, réduire et reset.'), lt('Partner đau cổ trước khi có choke pressure.', 'Partner feels neck pain before choke pressure.', 'Partenaire sent douleur cou avant choke pressure.'), { toSafetyNoteId: 'neck_attack_safety' }, 'high'),
    ],
  }),
  machine({
    skillId: 'arm-triangle-mount',
    fromPositionId: 'mount-top',
    safety: true,
    attackerGoal: lt('Kéo tay qua centerline, dùng đầu chặn elbow quay về ribs, rồi tạo angle trước pressure.', 'Pull the arm across centerline, use head to block elbow recovery, then angle before pressure.', 'Tirer le bras au-delà centerline, tête bloque retour coude, puis angle avant pression.'),
    defenderGoal: lt('Đưa elbow về ribs, xoay shoulder line vuông lại và không để đầu bị khóa.', 'Return elbow to ribs, square shoulder line, and deny head block.', 'Ramener coude aux côtes, remettre shoulder line square et refuser head block.'),
    cues: la(['Arm qua giữa.', 'Đầu chặn elbow.', 'Góc trước squeeze.'], ['Arm across.', 'Head blocks elbow.', 'Angle before squeeze.'], ['Bras traverse.', 'Tête bloque coude.', 'Angle avant squeeze.']),
    actions: la(['Kéo wrist/elbow qua centerline.', 'Walk hips sang side.', 'Nếu họ bridge mạnh, giữ mount hoặc branch back take.'], ['Pull wrist and elbow across centerline.', 'Walk hips to the side.', 'If they bridge hard, keep mount or branch to back take.'], ['Tirer wrist/coude centerline.', 'Marcher hanches côté.', 'Si bridge fort, garder mount ou branch back take.']),
    outcomes: [
      outcome('at-success', 'success', lt('Arm triangle finish', 'Arm triangle finish', 'Finish arm triangle'), lt('Shoulder của họ ép vào cổ, shoulder pressure đi chéo và hips đã tạo angle.', 'Their shoulder compresses the neck, shoulder pressure runs diagonally, and hips create angle.', 'Son épaule compresse cou, pression épaule diagonale, hanches créent angle.'), lt('Elbow bị kẹt qua centerline và họ không đưa tay về ribs.', 'Elbow is trapped across centerline and cannot return to ribs.', 'Coude piégé au-delà centerline.'), { toSubmissionId: 'arm-triangle-mount' }, 'high'),
      outcome('at-reset', 'failure', lt('Reset mount', 'Reset mount', 'Reset mount'), lt('Finish chưa ra, quay về mount control thay vì squeeze bằng tay.', 'Finish is not there; return to mount control instead of arm squeezing.', 'Finish absent; revenir mount control plutôt que squeeze bras.'), lt('Họ thở bình thường và elbow bắt đầu về ribs.', 'They breathe normally and elbow starts returning to ribs.', 'Il respire normalement et coude revient côtes.'), { toSkillId: 'mount-control' }, 'high'),
      outcome('at-counter', 'counter', lt('Bridge hoặc roll', 'Bridge or roll', 'Bridge ou roll'), lt('Nếu hips nhẹ, defender có thể bridge, turn hoặc recover half guard.', 'If hips are light, defender can bridge, turn, or recover half guard.', 'Si hanches légères, défenseur bridge, tourne ou recover half guard.'), lt('Pressure thẳng xuống mặt và mount base hở.', 'Pressure goes straight into face and mount base opens.', 'Pression droite visage et base mount ouverte.'), { toSkillId: 'mount-escape' }, 'medium'),
      outcome('at-safety', 'safety_abort', lt('Abort face crank', 'Abort face crank', 'Stop face crank'), lt('Nếu chỉ ép mặt/hàm, giảm lực và reset arm-across line.', 'If it is only face or jaw pressure, reduce force and reset arm-across line.', 'Si pression visage/mâchoire seulement, réduire et reset bras au centre.'), lt('Partner đau mặt/cổ nhưng không có choke.', 'Partner has face or neck pain but no choke.', 'Douleur visage/cou sans choke.'), { toSafetyNoteId: 'neck_attack_safety' }, 'high'),
    ],
  }),
  machine({
    skillId: 'bodylock-passing',
    fromPositionId: 'bodylock-passing-position',
    attackerGoal: lt('Khóa hip line thấp, giết butterfly hook rồi clear knee line trước khi pin.', 'Lock low hip line, kill the butterfly hook, then clear knee line before pinning.', 'Verrouiller hip line bas, tuer butterfly hook, puis clear knee line avant pin.'),
    defenderGoal: lt('Tạo shin frame hoặc shoulder crunch trước khi chest-to-hip khóa hông.', 'Build shin frame or shoulder crunch before chest-to-hip locks the hips.', 'Créer shin frame ou shoulder crunch avant chest-to-hip.'),
    cues: la(['Lock hông thấp.', 'Giết hook trước.', 'Pin rồi mới thả bodylock.'], ['Lock hips low.', 'Kill hook first.', 'Pin before releasing bodylock.'], ['Lock hanches bas.', 'Tuer hook d’abord.', 'Pin avant lâcher bodylock.']),
    actions: la(['Hands nối dưới hip bones.', 'Head lệch khỏi shoulder crunch.', 'Chest ép chéo vào near hip.'], ['Hands connect under hip bones.', 'Head stays off shoulder-crunch line.', 'Chest drives diagonally into near hip.'], ['Mains sous hip bones.', 'Tête hors shoulder crunch.', 'Poitrine diagonale near hip.']),
    outcomes: [
      outcome('bodylock-pass', 'success', lt('Side control hoặc mount', 'Side control or mount', 'Side control ou mount'), lt('Knee line đã clear và shoulder/hip line bị ổn định.', 'Knee line is cleared and shoulder or hip line is stabilized.', 'Knee line clear et shoulder/hip line stabilisée.'), lt('Shin frame không nâng được hông bạn.', 'Shin frame can no longer lift your hips.', 'Shin frame ne lève plus vos hanches.'), { toSkillId: 'side-control-pin' }, 'high'),
      outcome('bodylock-reset', 'failure', lt('Reset bodylock/headquarters', 'Reset bodylock/headquarters', 'Reset bodylock/headquarters'), lt('Bạn chưa clear hook; giữ base và reset layer.', 'Hook is not cleared; keep base and reset the layer.', 'Hook pas clear; garder base et reset layer.'), lt('Butterfly hook còn nâng được knee hoặc hip.', 'Butterfly hook can still lift knee or hip.', 'Butterfly hook peut encore lever genou/hanche.'), { toSkillId: 'headquarters-passing' }, 'high'),
      outcome('bodylock-counter', 'counter', lt('Shoulder crunch / lift', 'Shoulder crunch or lift', 'Shoulder crunch ou lift'), lt('Defender thắng head/shoulder line và tạo sweep hoặc guillotine threat.', 'Defender wins head or shoulder line and creates sweep or guillotine threat.', 'Défenseur gagne tête/épaule et crée sweep ou guillotine.'), lt('Đầu bạn ở center và elbow mở khỏi ribs.', 'Your head is centered and elbow opens away from ribs.', 'Votre tête centrée et coude ouvert.'), { toSkillId: 'butterfly-guard-off-balance' }, 'medium'),
    ],
  }),
]

const extraSpecs: Spec[] = [
  {
    skillId: 'guillotine-system',
    fromPositionId: 'front-headlock-top',
    safety: true,
    attackerGoal: lt('Nối chin strap, wrist depth và hip angle trước squeeze.', 'Connect chin strap, wrist depth, and hip angle before squeezing.', 'Connecter chin strap, profondeur poignet et angle hanche avant squeeze.'),
    defenderGoal: lt('Giữ cổ ngắn, phá choking wrist và quay ra angle an toàn.', 'Keep the neck short, peel choking wrist, and circle to a safe angle.', 'Cou court, peel choking wrist et sortir angle sûr.'),
    cues: la(['Wrist sâu.', 'Hip ra góc.', 'Go-behind nếu choke mất.'], ['Deep wrist.', 'Hip angle.', 'Go-behind if choke fails.'], ['Poignet profond.', 'Angle hanche.', 'Go-behind si choke échoue.']),
    actions: la(['Đóng elbow.', 'Không kéo cổ thẳng.', 'Branch front headlock/back.'], ['Close elbow.', 'Do not pull the neck straight.', 'Branch front headlock or back.'], ['Fermer coude.', 'Ne pas tirer cou droit.', 'Branch front headlock/dos.']),
    outcomes: [
      outcome('guillotine-success', 'success', lt('Clean guillotine', 'Clean guillotine', 'Guillotine propre'), lt('Chin strap sâu, elbow đóng và hip angle làm cổ bị đóng line.', 'Deep chin strap, closed elbow, and hip angle close the neck line.', 'Chin strap profond, coude fermé, angle hanche ferme la ligne.'), lt('Đầu họ thấp hơn shoulder line.', 'Their head is below shoulder line.', 'Tête sous shoulder line.'), { toSubmissionId: 'guillotine-system' }, 'high'),
      outcome('guillotine-failure', 'failure', lt('Choke line mất', 'Choke line lost', 'Ligne choke perdue'), lt('Nếu wrist nông hoặc hip angle mất, giữ front headlock thay vì kéo cổ.', 'If wrist is shallow or hip angle is lost, keep front headlock instead of pulling the neck.', 'Si poignet peu profond ou angle perdu, garder front headlock au lieu de tirer cou.'), lt('Cằm thoát khỏi wrist blade và elbow mở.', 'Chin slips off wrist blade and elbow opens.', 'Menton sort de wrist blade et coude ouvert.'), { toSkillId: 'snapdown-front-headlock' }, 'high'),
      outcome('guillotine-branch', 'branch', lt('Go-behind/back', 'Go-behind/back', 'Go-behind/dos'), lt('Khi họ chống choke bằng hand fight, dùng head position để đi sau.', 'When they defend choke with hand fight, use head position to go behind.', 'Quand il défend avec mains, utiliser head position pour passer derrière.'), lt('Họ đưa tay lên cổ và hips nhẹ.', 'Hands rise to neck and hips get light.', 'Mains montent au cou et hanches légères.'), { toSkillId: 'sprawl-go-behind' }, 'medium'),
      outcome('guillotine-safety', 'safety_abort', lt('Abort crank', 'Abort crank', 'Stop crank'), lt('Nếu là neck crank hoặc partner đau cổ, giảm lực và reset.', 'If it becomes a neck crank or partner has neck pain, reduce force and reset.', 'Si neck crank ou douleur cou, réduire et reset.'), lt('Pain cổ trước strangle.', 'Neck pain before strangle.', 'Douleur cou avant strangle.'), { toSafetyNoteId: 'neck_attack_safety' }, 'high'),
    ],
  },
  {
    skillId: 'kimura-system',
    fromPositionId: 'side-control-top',
    safety: true,
    attackerGoal: lt('Pin wrist, tách elbow khỏi ribs rồi dùng kimura grip làm hub.', 'Pin wrist, separate elbow from ribs, then use kimura grip as a hub.', 'Pin poignet, séparer coude des côtes, puis kimura grip comme hub.'),
    defenderGoal: lt('Dán elbow về ribs và xoay thumb/elbow line ra an toàn trước torque.', 'Glue elbow to ribs and rotate thumb/elbow line safe before torque.', 'Coller coude côtes et tourner thumb/elbow line avant torque.'),
    cues: la(['Wrist trước.', 'Elbow khỏi ribs.', 'Branch nếu tay thẳng.'], ['Wrist first.', 'Elbow off ribs.', 'Branch if arm straightens.'], ['Poignet d’abord.', 'Coude hors côtes.', 'Branch si bras tendu.']),
    actions: la(['Khóa wrist bằng hand gần.', 'Hip xoay, không kéo bằng tay.', 'Switch back/armbar khi họ straighten.'], ['Pin wrist with near hand.', 'Rotate hips, not arms.', 'Switch back or armbar when they straighten.'], ['Pin poignet main proche.', 'Tourner hanches, pas bras.', 'Switch dos/armbar si bras tendu.']),
    outcomes: [
      outcome('kimura-control', 'success', lt('Kimura control hub', 'Kimura control hub', 'Hub kimura'), lt('Shoulder line bị khóa và bạn có sweep/pass/back/finish branch.', 'Shoulder line is locked and sweep/pass/back/finish branches open.', 'Shoulder line verrouillée et branches ouvertes.'), lt('Elbow tách khỏi ribs.', 'Elbow separates from ribs.', 'Coude séparé des côtes.'), { toSkillId: 'kimura-system' }, 'high'),
      outcome('kimura-failure', 'failure', lt('Elbow returns to ribs', 'Elbow returns to ribs', 'Coude revient côtes'), lt('Nếu elbow về ribs, đừng torque; reset wrist pin hoặc đổi sang pass/back exposure.', 'If elbow returns to ribs, do not torque; reset wrist pin or switch to pass/back exposure.', 'Si coude revient côtes, ne pas torque; reset poignet ou passer dos/pass.'), lt('Elbow dán ribs và shoulder line square lại.', 'Elbow glues to ribs and shoulder line squares back.', 'Coude collé côtes et shoulder line resquare.'), { toSkillId: 'side-control-pin' }, 'high'),
      outcome('kimura-branch', 'branch', lt('Back/armbar branch', 'Back or armbar branch', 'Branche dos/armbar'), lt('Nếu arm straightens, kimura torque mất nhưng back exposure mở.', 'If arm straightens, kimura torque fades but back exposure opens.', 'Si bras tendu, torque kimura baisse mais dos s’ouvre.'), lt('Wrist còn nhưng elbow line thoát.', 'Wrist remains but elbow line escapes.', 'Poignet reste mais elbow line sort.'), { toSkillId: 'back-control' }, 'medium'),
      outcome('kimura-safety', 'safety_abort', lt('Abort shoulder torque', 'Abort shoulder torque', 'Stop torque épaule'), lt('Không torque nhanh khi shoulder line chưa được kiểm soát hoặc partner tap.', 'Do not torque fast when shoulder line is uncontrolled or partner taps.', 'Ne pas torque vite si shoulder line pas contrôlée ou tap.'), lt('Partner tap hoặc shoulder xoắn bất thường.', 'Partner taps or shoulder twists unusually.', 'Partner tape ou épaule tourne anormalement.'), { toSafetyNoteId: 'shoulder_lock_safety' }, 'high'),
    ],
  },
  {
    skillId: 'heel-hook-safety',
    fromPositionId: 'saddle-inside-sankaku',
    safety: true,
    attackerGoal: lt('Hiểu heel exposure, knee line và release protocol trước khi tăng rotation.', 'Understand heel exposure, knee line, and release protocol before adding rotation.', 'Comprendre heel exposure, knee line et release protocol avant rotation.'),
    defenderGoal: lt('Giấu heel, clear knee line và không xoay mù vào lực khóa.', 'Hide heel, clear knee line, and never spin blindly into the lock.', 'Cacher talon, clear knee line et ne pas tourner aveuglément.'),
    cues: la(['Giấu gót.', 'Knee line trước.', 'Tap sớm.'], ['Hide heel.', 'Knee line first.', 'Tap early.'], ['Cacher talon.', 'Knee line d’abord.', 'Taper tôt.']),
    actions: la(['Kiểm soát tay trước khi turn.', 'Clear second leg.', 'Abort khi knee còn kẹt.'], ['Control hands before turning.', 'Clear the second leg.', 'Abort while knee is trapped.'], ['Contrôler mains avant tourner.', 'Clear seconde jambe.', 'Abort si genou piégé.']),
    outcomes: [
      outcome('heel-safe', 'success', lt('Knee line free', 'Knee line free', 'Knee line libre'), lt('Defender clear knee line trước rotation nên leg lock danger giảm.', 'Defender clears knee line before rotation, reducing leg-lock danger.', 'Défenseur clear knee line avant rotation, danger réduit.'), lt('Knee vượt hip line và heel không bị exposed.', 'Knee passes hip line and heel is not exposed.', 'Genou passe hip line et talon non exposé.'), { toSkillId: 'leg-lock-safety-basics' }, 'high'),
      outcome('heel-failure', 'failure', lt('Escape chưa xong', 'Escape not finished', 'Sortie pas finie'), lt('Nếu knee line còn kẹt, dừng xoay và quay lại hand fight/heel hide.', 'If knee line is still trapped, stop turning and return to hand fight or heel hiding.', 'Si knee line encore piégée, arrêter rotation et revenir hand fight/cacher talon.'), lt('Knee chưa vượt hip line.', 'Knee has not passed hip line.', 'Genou pas au-delà hip line.'), { toSkillId: 'leg-lock-safety-basics' }, 'high'),
      outcome('heel-counter', 'counter', lt('Re-trap secondary leg', 'Secondary leg re-trap', 'Re-trap seconde jambe'), lt('Nếu second leg còn kẹt, opponent có thể kéo lại saddle/50-50.', 'If second leg remains trapped, opponent can pull back to saddle or 50/50.', 'Si seconde jambe piégée, retour saddle/50/50 possible.'), lt('Một chân thoát nhưng chân kia còn bị shelf.', 'One leg exits but the other is shelved.', 'Une jambe sort, l’autre reste shelf.'), { toSkillId: 'saddle-inside-sankaku-control' }, 'medium'),
      outcome('heel-abort', 'safety_abort', lt('Abort rotation', 'Abort rotation', 'Stop rotation'), lt('Nếu heel exposed và knee trapped, tap/reset thay vì xoay.', 'If heel is exposed and knee is trapped, tap or reset instead of turning.', 'Si talon exposé et genou piégé, taper/reset au lieu de tourner.'), lt('Heel bị bắt và knee chưa clear.', 'Heel is caught and knee is not clear.', 'Talon pris et genou pas clear.'), { toSafetyNoteId: 'heel_hook_safety' }, 'high'),
    ],
  },
]

;[
  ['knee-cut-passing', 'knee-cut-position', 'Knee cut clears thigh line into side control.', 'Knee cut clear thigh line vào side control.', 'Knee cut clear thigh line vers side control.', 'side-control-pin'],
  ['side-control-escape', 'side-control-bottom', 'Frames create space to recover guard or underhook.', 'Frame tạo khoảng để recover guard hoặc underhook.', 'Frames créent espace pour recover guard ou underhook.', 'half-guard-knee-shield'],
  ['mount-escape', 'mount-bottom', 'Bridge and elbow-knee recovery rebuild guard.', 'Bridge và elbow-knee recovery dựng lại guard.', 'Bridge et coude-genou reconstruisent guard.', 'half-guard-knee-shield'],
  ['back-escape', 'back-escape-position', 'Hand fight and shoulder-to-mat open the escape.', 'Hand fight và shoulder-to-mat mở escape.', 'Hand fight et épaule au sol ouvrent sortie.', 'mount-escape'],
  ['front-headlock-defense', 'front-headlock-bottom', 'Short neck and wrist peel beat front headlock.', 'Cổ ngắn và peel wrist phá front headlock.', 'Cou court et peel wrist battent front headlock.', 'technical-stand-up'],
  ['false-reap-entry', 'outside-ashi', 'False reap creates backside leg-lock angle with safety rules.', 'False reap tạo backside angle với luật safety.', 'False reap crée angle backside avec sécurité.', 'saddle-inside-sankaku-control'],
  ['octopus-guard-control', 'side-control-bottom', 'Octopus turns hip angle into back exposure.', 'Octopus biến hip angle thành back exposure.', 'Octopus transforme angle hanche en exposition dos.', 'octopus-back-take'],
  ['s-mount-armbar', 'mount-top', 'S-mount isolates shoulder before armbar extension.', 'S-mount cô lập shoulder trước armbar extension.', 'S-mount isole épaule avant extension armbar.', 's-mount-control'],
  ['buggy-choke', 'side-control-bottom', 'Buggy is a side-control bottom threat, not a primary escape.', 'Buggy là threat từ bottom side control, không phải escape chính.', 'Buggy est menace bottom side, pas sortie primaire.', 'side-control-escape'],
  ['crab-ride', 'turtle-bottom', 'Crab ride exposes hips before back control.', 'Crab ride mở hip trước back control.', 'Crab ride expose hanches avant back control.', 'back-control'],
  ['wrist-ride-back-exposure', 'turtle-top', 'Wrist ride collapses shoulder line into back exposure.', 'Wrist ride làm sập shoulder line để mở back.', 'Wrist ride casse shoulder line vers dos.', 'back-control'],
  ['gogoplata', 'supine-guard', 'Shin line threatens neck only with gradual pressure.', 'Shin line đe dọa cổ với pressure tăng dần.', 'Shin line menace cou avec pression progressive.', 'clamp-guard-control'],
  ['choi-bar', 'supine-guard', 'Choi bar turns shoulder clamp into armbar branch.', 'Choi bar biến shoulder clamp thành armbar branch.', 'Choi bar transforme shoulder clamp en armbar.', 'clamp-guard-control'],
  ['tarikoplata', 'supine-guard', 'Tarikoplata attacks shoulder line from clamp guard.', 'Tarikoplata đánh shoulder line từ clamp guard.', 'Tarikoplata attaque shoulder line depuis clamp guard.', 'kimura-system'],
].forEach(([skillId, fromPositionId, en, vi, fr, nextSkillId]) => {
  extraSpecs.push({
    skillId,
    fromPositionId,
    safety: ['front-headlock-defense', 'false-reap-entry', 's-mount-armbar', 'buggy-choke', 'gogoplata', 'choi-bar', 'tarikoplata'].includes(skillId),
    attackerGoal: lt(vi, en, fr),
    defenderGoal: lt('Nhận signal sớm, lấy lại inside position và branch trước khi clamp ổn định.', 'Recognize early signal, regain inside position, and branch before the clamp stabilizes.', 'Reconnaître signal tôt, reprendre inside position et brancher avant clamp stable.'),
    cues: la(['Contact trước.', 'Góc trước lực.', 'Branch sớm.'], ['Contact first.', 'Angle before force.', 'Branch early.'], ['Contact d’abord.', 'Angle avant force.', 'Branch tôt.']),
    actions: la(['Đặt body-to-body contact chính.', 'Giữ pressure direction rõ.', 'Nếu mất line, reset hoặc chuyển nhánh.'], ['Set the main body-to-body contact.', 'Keep pressure direction clear.', 'If the line is lost, reset or branch.'], ['Placer contact corps-à-corps.', 'Garder direction pression claire.', 'Si ligne perdue, reset ou branch.']),
    outcomes: [
      outcome(`${skillId}-success`, 'success', lt('Outcome chính', 'Primary outcome', 'Outcome principal'), lt(vi, en, fr), lt('Contact chính kín và đối thủ không recover inside line.', 'Main contact is closed and opponent cannot recover inside line.', 'Contact principal fermé et inside line non récupérée.'), { toSkillId: nextSkillId }, 'medium'),
      outcome(`${skillId}-reset`, 'failure', lt('Reset position', 'Reset position', 'Reset position'), lt('Line chưa đủ sạch; reset để không mất position.', 'Line is not clean enough; reset to avoid losing position.', 'Ligne pas assez propre; reset pour ne pas perdre position.'), lt('Clamp hở hoặc hip/head line sai.', 'Clamp opens or hip/head line is wrong.', 'Clamp ouvert ou hip/head line mauvaise.'), { toSkillId: skillId }, 'medium'),
      outcome(`${skillId}-counter`, 'counter', lt('Counter / recover', 'Counter or recover', 'Contre ou recover'), lt('Defender lấy lại inside position và chuyển sang escape/counter.', 'Defender regains inside position and moves to escape or counter.', 'Défenseur reprend inside position et passe sortie/contre.'), lt('Defender có frame/wedge trước pressure.', 'Defender gets frame or wedge before pressure.', 'Défenseur obtient frame/wedge avant pression.'), { toSkillId: nextSkillId }, 'medium'),
      ...(['front-headlock-defense', 'false-reap-entry', 's-mount-armbar', 'buggy-choke', 'gogoplata', 'choi-bar', 'tarikoplata'].includes(skillId)
        ? [outcome(`${skillId}-safety`, 'safety_abort', lt('Safety abort', 'Safety abort', 'Stop sécurité'), lt('Nếu có đau cổ, vai, gối hoặc tap, release ngay và reset.', 'If neck, shoulder, knee pain or tap appears, release immediately and reset.', 'Si douleur cou/épaule/genou ou tap, relâcher immédiatement.'), lt('Pain tăng nhanh hoặc partner tap.', 'Pain rises fast or partner taps.', 'Douleur augmente vite ou partenaire tape.'), { toSafetyNoteId: `${skillId}-safety` }, 'high')]
        : []),
    ],
  })
})

techniqueStateMachines.push(...extraSpecs.map(machine))

export const techniqueStateMachineBySkillId = new Map(techniqueStateMachines.map((machineValue) => [machineValue.skillId, machineValue]))
