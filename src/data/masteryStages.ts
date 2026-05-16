import type { LocalizedStringArray, LocalizedText } from '../types/skill'

const lt = (vi: string, en: string, fr: string): LocalizedText => ({ vi, en, fr })
const la = (vi: string[], en: string[], fr: string[]): LocalizedStringArray => ({ vi, en, fr })

export type MasteryStage = {
  id: string
  order: number
  title: LocalizedText
  shortDescription: LocalizedText
  philosophy: LocalizedText
  whatToLearn: LocalizedStringArray
  commonMistakes: LocalizedStringArray
  keySkillIds: string[]
  keyConceptIds: string[]
  technicalFocus: LocalizedStringArray
  highLevelExecution: LocalizedText
}

export const masteryStages: MasteryStage[] = [
  {
    id: 'survive',
    order: 1,
    title: lt('Survive', 'Survive', 'Survivre'),
    shortDescription: lt('Ngừng thua ngay lập tức trước khi nghĩ tới tấn công.', 'Stop losing immediately before thinking about attack.', 'Arrêter de perdre immédiatement avant de penser attaque.'),
    philosophy: lt('Survival là khả năng thở, giữ cổ/gối/cột sống an toàn và không cho đối thủ lấy control miễn phí.', 'Survival is the ability to breathe, keep neck/knees/spine safe, and deny free control.', 'Survivre signifie respirer, protéger cou/genoux/colonne et refuser le contrôle gratuit.'),
    whatToLearn: la(['Nhận diện danger signal', 'Frame cơ bản', 'Chin tuck', 'Tap timing', 'Không panic khi bị pin'], ['Danger signal recognition', 'Basic frames', 'Chin tuck', 'Tap timing', 'No panic under pins'], ['Reconnaissance danger', 'Frames de base', 'Chin tuck', 'Timing du tap', 'Ne pas paniquer sous pin']),
    commonMistakes: la(['Đẩy bằng tay thẳng', 'Nín thở', 'Xoay cổ khi bị front headlock', 'Để elbow xa ribs', 'Tập thoát quá muộn'], ['Pushing with straight arms', 'Holding breath', 'Twisting neck in front headlock', 'Elbows away from ribs', 'Escaping too late'], ['Pousser bras tendus', 'Bloquer respiration', 'Tordre cou en front headlock', 'Coudes loin côtes', 'Sortir trop tard']),
    keySkillIds: ['side-control-survival', 'mount-survival', 'back-survival', 'leg-lock-safety-basics', 'front-headlock-defense'],
    keyConceptIds: ['positional-hierarchy', 'early-vs-late-defense', 'frames', 'head-position', 'leg-lock-safety-hierarchy'],
    technicalFocus: la(['Tạo không gian thở', 'Cổ ngắn', 'Elbow-knee connection', 'Không expose heel', 'Frame trước khi hip escape'], ['Breathing space', 'Short neck', 'Elbow-knee connection', 'Do not expose heel', 'Frame before hip escape'], ['Espace respiratoire', 'Cou court', 'Connexion coude-genou', 'Ne pas exposer talon', 'Frame avant hip escape']),
    highLevelExecution: lt('Người giỏi không thoát bằng hoảng loạn; họ chặn control point đầu tiên rồi mới đổi góc.', 'High-level players do not escape through panic; they block the first control point, then change angle.', 'Le haut niveau ne sort pas par panique; il bloque le premier point de contrôle puis change angle.'),
  },
  {
    id: 'escape',
    order: 2,
    title: lt('Escape', 'Escape', 'Sortir'),
    shortDescription: lt('Thoát pin và bad position bằng layer rõ ràng.', 'Escape pins and bad positions through clear layers.', 'Sortir des pins et mauvaises positions par couches claires.'),
    philosophy: lt('Escape tốt bắt đầu bằng phòng thủ sớm, rồi khôi phục frame, knee line và hip angle.', 'Good escaping starts with early defense, then rebuilds frames, knee line, and hip angle.', 'Une bonne sortie commence tôt, puis reconstruit frames, knee line et angle hanche.'),
    whatToLearn: la(['Side control escape', 'Mount escape', 'Back escape', 'Turtle escape', 'Front headlock defense'], ['Side control escape', 'Mount escape', 'Back escape', 'Turtle escape', 'Front headlock defense'], ['Escape side control', 'Escape mount', 'Escape back', 'Escape turtle', 'Défense front headlock']),
    commonMistakes: la(['Bench press', 'Turn away không plan', 'Quên hand fight', 'Hip escape khi elbow còn ngoài', 'Trao back khi thoát mount'], ['Bench pressing', 'Turning away without a plan', 'Forgetting hand fight', 'Hip escaping while elbow is outside', 'Giving back during mount escape'], ['Bench press', 'Tourner sans plan', 'Oublier hand fight', 'Hip escape coude dehors', 'Donner dos depuis mount']),
    keySkillIds: ['side-control-escape', 'mount-escape', 'back-escape', 'front-headlock-defense', 'turtle-escape'],
    keyConceptIds: ['elbow-knee-connection', 'frames', 'inside-position', 'early-vs-late-defense', 'base-balance'],
    technicalFocus: la(['Near elbow inside', 'Shoulder line to mat', 'Hand fight trước', 'Knee wedge', 'Stand-up khi có base'], ['Near elbow inside', 'Shoulder line to mat', 'Hand fight first', 'Knee wedge', 'Stand up when base exists'], ['Coude proche dedans', 'Shoulder line au tapis', 'Hand fight d’abord', 'Knee wedge', 'Se relever avec base']),
    highLevelExecution: lt('Escape cao cấp không chỉ là ra ngoài; nó ra ngoài vào guard, wrestle-up hoặc counter.', 'High-level escaping does not merely get out; it exits into guard, wrestle-up, or counter.', 'L’escape haut niveau ne sort pas seulement; il sort vers garde, wrestle-up ou contre.'),
  },
  {
    id: 'retain_guard',
    order: 3,
    title: lt('Retain Guard', 'Retain Guard', 'Retenir la garde'),
    shortDescription: lt('Ngăn chest-to-chest và rebuild inside position.', 'Deny chest-to-chest and rebuild inside position.', 'Refuser chest-to-chest et reconstruire inside position.'),
    philosophy: lt('Guard retention là cuộc đua giữa feet, knees, frames và hip angle trước khi passer đóng line.', 'Guard retention is the race between feet, knees, frames, and hip angle before the passer closes the line.', 'La rétention est la course pieds, genoux, frames et angle avant fermeture du passer.'),
    whatToLearn: la(['Seated guard', 'Supine guard', 'Knee shield', 'Shin frame', 'Inside knee'], ['Seated guard', 'Supine guard', 'Knee shield', 'Shin frame', 'Inside knee'], ['Seated guard', 'Supine guard', 'Knee shield', 'Shin frame', 'Genou inside']),
    commonMistakes: la(['Nằm flat', 'Đẩy đầu khi inside knee đã mất', 'Feet chết', 'Knee line bị vượt', 'Không đổi sang wrestle-up'], ['Lying flat', 'Pushing head after inside knee is lost', 'Dead feet', 'Knee line cleared', 'Not switching to wrestle-up'], ['Rester plat', 'Pousser tête sans genou inside', 'Pieds morts', 'Knee line franchie', 'Ne pas passer wrestle-up']),
    keySkillIds: ['seated-guard-retention', 'supine-guard-retention', 'half-guard-knee-shield', 'butterfly-guard-off-balance', 'technical-stand-up'],
    keyConceptIds: ['guard-retention-layers', 'inside-position', 'hooks', 'frames', 'angle-creation'],
    technicalFocus: la(['Active toes', 'Knee-to-elbow', 'Hip scoot', 'Shin frame', 'Butterfly hook'], ['Active toes', 'Knee-to-elbow', 'Hip scoot', 'Shin frame', 'Butterfly hook'], ['Orteils actifs', 'Genou-coude', 'Hip scoot', 'Shin frame', 'Butterfly hook']),
    highLevelExecution: lt('Guard tốt không chờ pass; nó buộc passer đi qua nhiều layer rồi biến phòng thủ thành entry.', 'Good guard does not wait for the pass; it makes the passer cross layers and turns defense into entry.', 'Bonne garde n’attend pas le pass; elle force plusieurs couches et transforme défense en entrée.'),
  },
  {
    id: 'build_entries',
    order: 4,
    title: lt('Build Entries', 'Build Entries', 'Construire entrées'),
    shortDescription: lt('Tạo entry đáng tin cậy từ đứng, guard hoặc top.', 'Create reliable entries from standing, guard, or top.', 'Créer des entrées fiables depuis debout, garde ou top.'),
    philosophy: lt('Entry tốt xuất hiện khi bạn thắng hand/head/hip line trước khi cố kết thúc.', 'Good entries appear when you win hand, head, or hip line before trying to finish.', 'Les bonnes entrées viennent après gain main/tête/hanche avant finish.'),
    whatToLearn: la(['Hand fighting', 'Shin-to-shin', 'Single leg', 'Snapdown', 'Guard pull strategy'], ['Hand fighting', 'Shin-to-shin', 'Single leg', 'Snapdown', 'Guard pull strategy'], ['Hand fighting', 'Shin-to-shin', 'Single leg', 'Snapdown', 'Stratégie guard pull']),
    commonMistakes: la(['Bắn shot không head position', 'Entry không grip', 'Ngồi guard không frame', 'Chạy vào front headlock', 'Không có reset'], ['Shooting without head position', 'Entering without grip', 'Sitting guard without frames', 'Running into front headlock', 'No reset'], ['Shot sans tête', 'Entrée sans grip', 'S’asseoir sans frame', 'Courir dans front headlock', 'Pas de reset']),
    keySkillIds: ['hand-fighting', 'shin-to-shin-entry', 'single-leg-bjj', 'snapdown-front-headlock', 'guard-pulling-strategy'],
    keyConceptIds: ['connection-before-control', 'head-position', 'base-balance', 'angle-creation', 'wrestle-up-philosophy'],
    technicalFocus: la(['Collar tie/inside tie', 'Head above hips', 'Grip before level change', 'Safe guard pull', 'Posture break'], ['Collar tie/inside tie', 'Head above hips', 'Grip before level change', 'Safe guard pull', 'Posture break'], ['Collar tie/inside tie', 'Tête au-dessus hanches', 'Grip avant level change', 'Guard pull sûr', 'Casser posture']),
    highLevelExecution: lt('Entry cao cấp không là lao vào; nó là ép đối thủ phản ứng sai line.', 'High-level entry is not rushing in; it forces the opponent to react on the wrong line.', 'Entrée haut niveau n’est pas foncer; elle force mauvaise réaction.'),
  },
  {
    id: 'pass_and_pin',
    order: 5,
    title: lt('Pass and Pin', 'Pass and Pin', 'Passer et pinner'),
    shortDescription: lt('Vượt guard rồi ổn định control trước khi chuyển attack.', 'Pass guard and stabilize control before attacking.', 'Passer la garde puis stabiliser avant attaquer.'),
    philosophy: lt('Passing hiện đại không chạy quanh chân; nó thắng hip line, shoulder line và inside position.', 'Modern passing does not run around legs; it wins hip line, shoulder line, and inside position.', 'Le passing moderne ne court pas autour des jambes; il gagne hip line, shoulder line et inside position.'),
    whatToLearn: la(['Bodylock', 'Knee cut', 'Headquarters', 'Side control pin', 'Mount control'], ['Bodylock', 'Knee cut', 'Headquarters', 'Side control pin', 'Mount control'], ['Bodylock', 'Knee cut', 'Headquarters', 'Side control pin', 'Mount control']),
    commonMistakes: la(['Thả lock trước khi pin', 'Đè thẳng xuống', 'Head ở giữa tay đối thủ', 'Knee line chưa clear', 'Không ổn định side control'], ['Releasing lock before pin', 'Pressure straight down', 'Head between opponent hands', 'Knee line not clear', 'Not stabilizing side control'], ['Lâcher lock avant pin', 'Pression droite bas', 'Tête entre mains adverses', 'Knee line pas clear', 'Pas stabiliser side control']),
    keySkillIds: ['bodylock-passing', 'knee-cut-passing', 'headquarters-passing', 'side-control-pin', 'mount-control'],
    keyConceptIds: ['pressure-direction', 'connection-before-control', 'inside-position', 'hip-line-shoulder-line', 'wedges'],
    technicalFocus: la(['Chest-to-hip', 'Underhook/crossface', 'Knee cut angle', 'Head offset', 'Stabilize before release'], ['Chest-to-hip', 'Underhook/crossface', 'Knee cut angle', 'Head offset', 'Stabilize before release'], ['Chest-to-hip', 'Underhook/crossface', 'Angle knee cut', 'Tête décalée', 'Stabiliser avant relâcher']),
    highLevelExecution: lt('Pass cao cấp làm guard không còn xoay được; pin là kết quả của việc khóa hai line, không chỉ vượt chân.', 'High-level passing removes guard rotation; the pin comes from locking two lines, not merely clearing legs.', 'Passing haut niveau enlève rotation; le pin vient de deux lignes verrouillées, pas seulement jambes franchies.'),
  },
  {
    id: 'create_dilemmas',
    order: 6,
    title: lt('Create Dilemmas', 'Create Dilemmas', 'Créer dilemmes'),
    shortDescription: lt('Ép đối thủ phòng thủ một hướng và mở hướng khác.', 'Force defense on one line and open another.', 'Forcer défense sur une ligne et ouvrir l’autre.'),
    philosophy: lt('Dilemma tốt có hai threat thật, cùng control point và branch rõ nếu threat đầu fail.', 'A good dilemma has two real threats, one shared control point, and a clear branch if the first fails.', 'Un bon dilemme a deux vraies menaces, un contrôle commun et branche claire.'),
    whatToLearn: la(['Front headlock', 'Kimura trap', 'Back control', 'Arm triangle', 'Failure response'], ['Front headlock', 'Kimura trap', 'Back control', 'Arm triangle', 'Failure response'], ['Front headlock', 'Kimura trap', 'Back control', 'Arm triangle', 'Réponse à l’échec']),
    commonMistakes: la(['Threat thứ hai giả', 'Bỏ control để chase finish', 'Không đọc reaction', 'Chỉ squeeze', 'Không reset khi mất angle'], ['Fake second threat', 'Leaving control to chase finish', 'Not reading reaction', 'Only squeezing', 'No reset when angle is lost'], ['Deuxième menace fausse', 'Quitter contrôle pour finish', 'Ne pas lire réaction', 'Seulement serrer', 'Pas reset sans angle']),
    keySkillIds: ['dilemmas-two-way-attacks', 'guillotine-system', 'kimura-system', 'rear-naked-choke-system', 'failure-response-transitions'],
    keyConceptIds: ['dilemma-attacks', 'failure-response', 'control-before-submission', 'levers', 'angle-creation'],
    technicalFocus: la(['Shared control point', 'Reaction read', 'Switch timing', 'No overcommit', 'Recover control'], ['Shared control point', 'Reaction read', 'Switch timing', 'No overcommit', 'Recover control'], ['Point contrôle commun', 'Lire réaction', 'Timing switch', 'Pas overcommit', 'Récupérer contrôle']),
    highLevelExecution: lt('Người giỏi không ép một move; họ ép một quyết định.', 'High-level players do not force one move; they force one decision.', 'Le haut niveau ne force pas une technique; il force une décision.'),
  },
  {
    id: 'finish_safely',
    order: 7,
    title: lt('Finish Safely', 'Finish Safely', 'Finir en sécurité'),
    shortDescription: lt('Finish bằng isolation, angle, slack removal và kiểm soát lực.', 'Finish with isolation, angle, slack removal, and controlled force.', 'Finir avec isolation, angle, retrait du slack et force contrôlée.'),
    philosophy: lt('Submission tốt không phải squeeze mạnh; nó khóa escape line trước khi tăng pressure.', 'A good submission is not harder squeezing; it locks escape lines before pressure rises.', 'Une bonne soumission n’est pas serrer plus fort; elle verrouille sorties avant pression.'),
    whatToLearn: la(['RNC', 'Guillotine', 'Arm triangle', 'Kimura', 'Leg lock safety'], ['RNC', 'Guillotine', 'Arm triangle', 'Kimura', 'Leg lock safety'], ['RNC', 'Guillotine', 'Arm triangle', 'Kimura', 'Sécurité leg lock']),
    commonMistakes: la(['Finish khi control chưa xong', 'Crank cổ/gối', 'Không remove slack', 'Sai elbow line', 'Không tap/reset sớm'], ['Finishing before control', 'Cranking neck/knee', 'No slack removal', 'Wrong elbow line', 'No early tap/reset'], ['Finir sans contrôle', 'Crank cou/genou', 'Pas retirer slack', 'Mauvaise elbow line', 'Pas tap/reset tôt']),
    keySkillIds: ['rear-naked-choke-system', 'guillotine-system', 'arm-triangle-mount', 'kimura-system', 'heel-hook-safety'],
    keyConceptIds: ['control-before-submission', 'leg-lock-safety-hierarchy', 'pressure-direction', 'levers', 'head-position'],
    technicalFocus: la(['Elbow alignment', 'Wrist depth', 'Shoulder pressure', 'Hip angle', 'Safety tempo'], ['Elbow alignment', 'Wrist depth', 'Shoulder pressure', 'Hip angle', 'Safety tempo'], ['Alignement coude', 'Profondeur poignet', 'Shoulder pressure', 'Angle hanches', 'Tempo sécurité']),
    highLevelExecution: lt('Finish cao cấp có cảm giác ít lực vì tất cả đường thoát đã bị đóng.', 'High-level finishes feel low-force because escape lines are already closed.', 'Les finishes haut niveau semblent peu forcés car les sorties sont fermées.'),
  },
  {
    id: 'chain_systems',
    order: 8,
    title: lt('Chain Systems', 'Chain Systems', 'Chaîner systèmes'),
    shortDescription: lt('Nối attack, defense, re-attack và reset thành hệ thống.', 'Connect attack, defense, re-attack, and reset into a system.', 'Connecter attaque, défense, re-attaque et reset en système.'),
    philosophy: lt('System là khi thất bại đầu tiên đã có branch sẵn, không phải bắt đầu lại từ số không.', 'A system means the first failure already has a branch, not a full restart.', 'Un système signifie que le premier échec a déjà une branche.'),
    whatToLearn: la(['Technique chains', 'If-then decisions', 'Opponent reactions', 'Escape maps', 'Game tree'], ['Technique chains', 'If-then decisions', 'Opponent reactions', 'Escape maps', 'Game tree'], ['Chaînes techniques', 'Décisions if-then', 'Réactions adverses', 'Escape maps', 'Game tree']),
    commonMistakes: la(['Học move rời rạc', 'Không biết reset node', 'Branch quá muộn', 'Chase finish khi mất control', 'Không có A-game path'], ['Learning isolated moves', 'No reset node', 'Branching too late', 'Chasing finish after control is gone', 'No A-game path'], ['Moves isolés', 'Pas reset node', 'Branch trop tard', 'Chasser finish sans contrôle', 'Pas de chemin A-game']),
    keySkillIds: ['failure-response-transitions', 'bodylock-passing', 'half-guard-wrestle-up', 'back-control', 'scramble-control'],
    keyConceptIds: ['failure-response', 'dilemma-attacks', 'positional-hierarchy', 'connection-before-control', 'deliberate-practice'],
    technicalFocus: la(['Start node', 'Failure branch', 'Reset node', 'Follow-up skill', 'Opponent escape read'], ['Start node', 'Failure branch', 'Reset node', 'Follow-up skill', 'Opponent escape read'], ['Start node', 'Failure branch', 'Reset node', 'Follow-up skill', 'Lire escape adverse']),
    highLevelExecution: lt('Người giỏi nhìn một exchange như graph có node, line và reset, không phải một move đơn.', 'High-level players see an exchange as a graph of nodes, lines, and resets, not one move.', 'Le haut niveau voit échange comme graphe de nodes, lignes et resets.'),
  },
  {
    id: 'adapt_to_opponents',
    order: 9,
    title: lt('Adapt to Opponents', 'Adapt to Opponents', 'S’adapter'),
    shortDescription: lt('Đọc archetype đối thủ và đổi line đúng lúc.', 'Read opponent archetypes and change lines at the right time.', 'Lire archétypes adverses et changer ligne au bon moment.'),
    philosophy: lt('Adaptation là đọc pressure, posture, grips và escape route trước khi họ hoàn thành.', 'Adaptation reads pressure, posture, grips, and escape route before they complete it.', 'L’adaptation lit pression, posture, grips et escape avant fin.'),
    whatToLearn: la(['Opponent escape maps', 'Archetypes', 'Scramble control', 'Back retention', 'Front headlock choices'], ['Opponent escape maps', 'Archetypes', 'Scramble control', 'Back retention', 'Front headlock choices'], ['Escape maps adverses', 'Archétypes', 'Scramble control', 'Back retention', 'Choix front headlock']),
    commonMistakes: la(['Không nhận ra escape sớm', 'Cố cùng line', 'Không đổi grip', 'Để opponent set pace', 'Không có counter khi họ overcommit'], ['Missing early escape signals', 'Forcing same line', 'Not changing grip', 'Letting opponent set pace', 'No counter when they overcommit'], ['Manquer signaux tôt', 'Forcer même ligne', 'Ne pas changer grip', 'Subir rythme', 'Pas de counter sur overcommit']),
    keySkillIds: ['back-control', 'turtle-ride', 'snapdown-front-headlock', 'sprawl-go-behind', 'scramble-control'],
    keyConceptIds: ['base-balance', 'head-position', 'pressure-direction', 'dilemma-attacks', 'failure-response'],
    technicalFocus: la(['Early signal', 'Prevention', 'Follow-up', 'Risk control', 'Tempo change'], ['Early signal', 'Prevention', 'Follow-up', 'Risk control', 'Tempo change'], ['Signal tôt', 'Prévention', 'Follow-up', 'Contrôle risque', 'Changement tempo']),
    highLevelExecution: lt('Adaptation cao cấp là thắng trước khi phản ứng của đối thủ thành escape hoàn chỉnh.', 'High-level adaptation wins before the opponent reaction becomes a complete escape.', 'Adaptation haut niveau gagne avant que réaction devienne escape complet.'),
  },
  {
    id: 'black_belt_mindset',
    order: 10,
    title: lt('Black Belt Mindset', 'Black Belt Mindset', 'Mentalité black belt'),
    shortDescription: lt('Tư duy bằng principles, timing, control systems và diagnosis.', 'Think through principles, timing, control systems, and diagnosis.', 'Penser en principes, timing, systèmes de contrôle et diagnostic.'),
    philosophy: lt('Đây không hứa hẹn đai. Nó mô tả cách tư duy kỹ thuật: đơn giản, chính xác, an toàn và thích nghi.', 'This does not promise a belt. It describes technical thinking: simple, precise, safe, and adaptive.', 'Cela ne promet pas de ceinture. Cela décrit une pensée technique simple, précise, sûre et adaptable.'),
    whatToLearn: la(['Diagnose lỗi', 'Dạy bằng cue ngắn', 'Build systems', 'Giữ safety', 'Điều chỉnh theo ruleset'], ['Diagnose errors', 'Teach with short cues', 'Build systems', 'Keep safety', 'Adjust to rulesets'], ['Diagnostiquer erreurs', 'Enseigner par cues courts', 'Construire systèmes', 'Garder sécurité', 'Adapter ruleset']),
    commonMistakes: la(['Sưu tầm move', 'Nói quá nhiều chỉ dẫn (cue)', 'Không test pressure', 'Bỏ qua safety', 'Không đọc đối thủ'], ['Collecting moves', 'Too many cues', 'Not pressure-testing', 'Ignoring safety', 'Not reading opponents'], ['Collectionner moves', 'Trop de cues', 'Pas pressure-test', 'Ignorer sécurité', 'Ne pas lire adversaire']),
    keySkillIds: ['positional-hierarchy', 'inside-position', 'dilemmas-two-way-attacks', 'failure-response-transitions'],
    keyConceptIds: ['positional-hierarchy', 'inside-position', 'control-before-submission', 'failure-response', 'deliberate-practice'],
    technicalFocus: la(['Principle first', 'Cue compression', 'Problem diagnosis', 'Risk selection', 'System design'], ['Principle first', 'Cue compression', 'Problem diagnosis', 'Risk selection', 'System design'], ['Principe d’abord', 'Compression cues', 'Diagnostic problème', 'Sélection risque', 'Design système']),
    highLevelExecution: lt('Tư duy cao cấp không hỏi “move nào?” trước; nó hỏi “line nào đang mở, control point nào đang mất, branch nào an toàn?”', 'High-level thinking does not ask “which move?” first; it asks “which line is open, which control point is lost, which branch is safe?”', 'La pensée haut niveau ne demande pas “quelle technique ?” d’abord; elle demande quelle ligne est ouverte, quel contrôle est perdu, quelle branche est sûre.'),
  },
]
