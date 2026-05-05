import type { GrapplingArchetype } from '../types/archetype'
import type { LocalizedStringArray, LocalizedText } from '../types/skill'

const lt = (vi: string, en: string, fr: string): LocalizedText => ({ vi, en, fr })
const la = (vi: string[], en: string[], fr: string[]): LocalizedStringArray => ({ vi, en, fr })

type ArchetypeSeed = {
  id: string
  title: LocalizedText
  shortDescription: LocalizedText
  philosophy: LocalizedText
  bestFor: LocalizedStringArray
  notIdealFor: LocalizedStringArray
  coreConceptIds: string[]
  coreSkillIds: string[]
  supportSkillIds: string[]
  requiredDefensiveSkillIds: string[]
  commonWeaknesses: LocalizedStringArray
  trainingPriorities: LocalizedStringArray
}

const strategyFor = (
  seed: ArchetypeSeed,
  firstSkillIds: string[],
  secondSkillIds: string[],
  thirdSkillIds: string[],
): GrapplingArchetype['ifThenStrategy'] => [
  {
    if: lt(
      'Nếu đối thủ chặn đường chính của archetype này.',
      'If the opponent blocks the main lane of this archetype.',
      'Si l’adversaire bloque la ligne principale de cet archétype.',
    ),
    then: lt(
      'Đổi sang nhánh hỗ trợ gần nhất thay vì cố thắng cùng một hướng bằng sức.',
      'Switch to the nearest support branch instead of trying to force the same direction.',
      'Passez à la branche de soutien la plus proche au lieu de forcer la même direction.',
    ),
    why: lt(
      `${seed.title.vi} hoạt động tốt khi bạn biến phản ứng phòng thủ thành thông tin cho nhánh tiếp theo.`,
      `${seed.title.en} works best when you turn the defensive reaction into information for the next branch.`,
      `${seed.title.fr} fonctionne mieux quand la réaction défensive devient information pour la branche suivante.`,
    ),
    skillIds: firstSkillIds,
  },
  {
    if: lt(
      'Nếu bạn mất inside position hoặc head position.',
      'If you lose inside position or head position.',
      'Si vous perdez inside position ou head position.',
    ),
    then: lt(
      'Ưu tiên rebuild posture, frame, pummel hoặc hand fight trước khi tiếp tục tấn công.',
      'Prioritize rebuilding posture, frames, pummeling, or hand fighting before continuing offense.',
      'Priorisez posture, frames, pummeling ou hand fight avant de continuer l’attaque.',
    ),
    why: lt(
      'Archetype bền không chỉ có chuỗi tấn công; nó có cách quay lại cấu trúc khi phase bị phá.',
      'A durable archetype is not only an attack chain; it has a way back to structure when the phase breaks.',
      'Un archétype durable n’est pas seulement une chaîne offensive; il sait revenir à la structure quand la phase casse.',
    ),
    skillIds: secondSkillIds,
  },
  {
    if: lt(
      'Nếu round bắt đầu nhanh, hỗn loạn hoặc bạn bị kéo khỏi A-game.',
      'If the round becomes fast, chaotic, or pulls you away from your A-game.',
      'Si le round devient rapide, chaotique ou vous éloigne de votre A-game.',
    ),
    then: lt(
      'Reset về một điểm kiểm soát đơn giản: head, hip line, elbow-knee connection hoặc hand fight.',
      'Reset to a simple control point: head, hip line, elbow-knee connection, or hand fight.',
      'Revenez à un point de contrôle simple: tête, hip line, connexion coude-genou ou hand fight.',
    ),
    why: lt(
      'Game tree cá nhân chỉ đáng tin khi có điểm reset rõ ràng dưới áp lực.',
      'A personal game tree is reliable only when it has clear reset points under pressure.',
      'Un game tree personnel est fiable seulement avec des points de reset clairs sous pression.',
    ),
    skillIds: thirdSkillIds,
  },
]

const archetype = (
  seed: ArchetypeSeed,
  firstSkillIds = seed.coreSkillIds.slice(0, 3),
  secondSkillIds = seed.requiredDefensiveSkillIds.slice(0, 3),
  thirdSkillIds = seed.supportSkillIds.slice(0, 3),
): GrapplingArchetype => ({
  ...seed,
  ifThenStrategy: strategyFor(seed, firstSkillIds, secondSkillIds, thirdSkillIds),
})

export const archetypes: GrapplingArchetype[] = [
  archetype({
    id: 'wrestle-up-player',
    title: lt('Wrestle-Up Player', 'Wrestle-Up Player', 'Joueur wrestle-up'),
    shortDescription: lt(
      'Dùng seated guard, shin-to-shin và half guard để đứng lên single leg thay vì nằm chờ sweep.',
      'Uses seated guard, shin-to-shin, and half guard to rise into single legs instead of waiting for sweeps.',
      'Utilise seated guard, shin-to-shin et half guard pour monter en single leg plutôt qu’attendre le sweep.',
    ),
    philosophy: lt(
      'Bạn biến guard thành wrestling entry. Mục tiêu là giữ đầu và hông sống, thắng underhook hoặc shin connection, rồi lên gối trước khi đối thủ khóa chest-to-chest.',
      'You turn guard into wrestling entries. The goal is to keep head and hips alive, win an underhook or shin connection, then come to a knee before the opponent locks chest-to-chest.',
      'Vous transformez la garde en entrées de lutte. Garder tête et hanches actives, gagner underhook ou connexion shin, puis monter au genou avant le chest-to-chest.',
    ),
    bestFor: la(
      ['Người thích áp lực chủ động từ bottom.', 'Người có cardio tốt và muốn tạo scramble có kiểm soát.', 'Người muốn guard dẫn tới top position.'],
      ['Players who like active bottom pressure.', 'Athletes with good pace who want controlled scrambles.', 'Practitioners who want guard to lead to top position.'],
      ['Ceux qui aiment une pression active depuis bottom.', 'Athlètes avec bon rythme qui veulent des scrambles contrôlés.', 'Pratiquants qui veulent que la garde mène au top.'],
    ),
    notIdealFor: la(
      ['Người chưa bảo vệ cổ tốt khi lên single leg.', 'Người hay để đầu thấp trong front headlock.', 'Người không muốn chịu nhịp scramble.'],
      ['Players who cannot protect the neck while rising on single legs.', 'Players who drop their head into front headlocks.', 'Players who avoid scramble pace.'],
      ['Ceux qui protègent mal le cou en single leg.', 'Ceux qui baissent la tête dans front headlock.', 'Ceux qui évitent le rythme scramble.'],
    ),
    coreConceptIds: ['wrestle-up-philosophy', 'inside-position', 'head-position', 'base-balance', 'failure-response'],
    coreSkillIds: ['seated-guard-retention', 'shin-to-shin-entry', 'half-guard-wrestle-up', 'single-leg-bjj', 'bodylock-passing', 'back-control'],
    supportSkillIds: ['technical-stand-up', 'butterfly-guard-off-balance', 'hand-fighting', 'mat-return-basics', 'scramble-control'],
    requiredDefensiveSkillIds: ['front-headlock-defense', 'sprawl-go-behind', 'side-control-escape', 'back-escape'],
    commonWeaknesses: la(
      ['Cổ bị guillotine khi đầu thấp.', 'Lên gối nhưng không khóa hip line.', 'Tấn công single leg khi elbow-knee connection đã mất.', 'Scramble quá lâu sau khi đã có top.'],
      ['Guillotined when the head drops.', 'Coming to a knee without controlling the hip line.', 'Attacking single legs after elbow-knee connection is lost.', 'Scrambling too long after top position is available.'],
      ['Guillotine quand la tête tombe.', 'Monter au genou sans contrôler hip line.', 'Attaquer single leg après perte coude-genou.', 'Scrambler trop longtemps quand top est disponible.'],
    ),
    trainingPriorities: la(
      ['Drill front headlock defense trước mỗi wrestle-up block.', 'Tập seated guard retention với mục tiêu lên gối.', 'Chạy round pass-or-wrestle-up 3 phút.', 'Review lại bị kẹt ở head position hay hip line.'],
      ['Drill front headlock defense before every wrestle-up block.', 'Train seated guard retention with the goal of coming to a knee.', 'Run three-minute pass-or-wrestle-up rounds.', 'Review whether failures came from head position or hip line.'],
      ['Driller front headlock defense avant chaque bloc wrestle-up.', 'Travailler seated guard retention avec objectif monter au genou.', 'Faire rounds pass-or-wrestle-up de 3 minutes.', 'Revoir si l’échec vient tête ou hip line.'],
    ),
  }),
  archetype({
    id: 'pressure-passer',
    title: lt('Pressure Passer', 'Pressure Passer', 'Passeur pression'),
    shortDescription: lt(
      'Ưu tiên bodylock, headquarters và knee cut để khóa hip line trước khi vượt chân.',
      'Prioritizes bodylock, headquarters, and knee cut passing to lock the hip line before clearing legs.',
      'Priorise bodylock, headquarters et knee cut pour verrouiller la hip line avant de passer les jambes.',
    ),
    philosophy: lt(
      'Passing không phải chạy quanh chân; đó là lấy đi khả năng xoay hông, frame và đưa gối vào lại. Pressure đi chéo qua chest, shoulder và head position.',
      'Passing is not running around legs; it removes the opponent’s ability to rotate hips, frame, and reinsert knees. Pressure travels diagonally through chest, shoulder, and head position.',
      'Passer n’est pas courir autour des jambes; c’est enlever rotation de hanches, frames et réinsertion du genou. La pression va en diagonale par poitrine, épaule et tête.',
    ),
    bestFor: la(
      ['Người thích top control và tempo chậm chắc.', 'Người muốn chuyển pass thành side control hoặc mount.', 'Người có khả năng giữ pressure mà không overcommit.'],
      ['Players who like top control and steady tempo.', 'Players who want passes to connect directly to pins.', 'Players who can pressure without overcommitting.'],
      ['Ceux qui aiment top control et tempo solide.', 'Ceux qui veulent connecter pass et pin.', 'Ceux qui peuvent presser sans trop s’engager.'],
    ),
    notIdealFor: la(
      ['Người chưa hiểu leg lock safety khi vào close range.', 'Người hay để đầu giữa hai tay đối thủ.', 'Người chỉ muốn outside movement nhanh.'],
      ['Players without leg lock safety in close range.', 'Players who center their head between the opponent’s arms.', 'Players who only want fast outside movement.'],
      ['Ceux sans sécurité leg lock en close range.', 'Ceux qui centrent la tête entre les bras adverses.', 'Ceux qui veulent seulement mouvement outside rapide.'],
    ),
    coreConceptIds: ['connection-before-control', 'pressure-direction', 'inside-position', 'wedges', 'positional-hierarchy'],
    coreSkillIds: ['bodylock-passing', 'headquarters-passing', 'knee-cut-passing', 'side-control-pin', 'mount-control', 'arm-triangle-mount'],
    supportSkillIds: ['hand-fighting', 'leg-drag-basics', 'outside-passing', 'mat-return-basics', 'back-control'],
    requiredDefensiveSkillIds: ['leg-lock-safety-basics', 'heel-hook-safety', 'front-headlock-defense', 'scramble-control'],
    commonWeaknesses: la(
      ['Bị butterfly lift vì weight quá cao.', 'Bị shoulder crunch vì đầu nằm giữa.', 'Clear knee line rồi thả control quá sớm.', 'Đè thẳng xuống thay vì pressure chéo.'],
      ['Getting butterfly lifted because weight is too high.', 'Getting shoulder-crunched because the head is centered.', 'Releasing control too early after clearing the knee line.', 'Driving straight down instead of diagonal pressure.'],
      ['Se faire lever par butterfly car poids trop haut.', 'Subir shoulder crunch car tête centrée.', 'Relâcher trop tôt après avoir passé knee line.', 'Presser droit vers le bas au lieu de diagonale.'],
    ),
    trainingPriorities: la(
      ['Tập bodylock với mục tiêu giết hook trước khi pass.', 'Headquarters rounds: passer chỉ được qua khi kiểm soát hip line.', 'Sau mỗi pass phải giữ side control 10 giây.', 'Review lại bị recover guard bằng knee shield hay underhook.'],
      ['Train bodylock with the goal of killing hooks before passing.', 'Headquarters rounds where the passer can score only after hip-line control.', 'After every pass, hold side control for ten seconds.', 'Review whether guard recovery came from knee shield or underhook.'],
      ['Travailler bodylock en tuant hooks avant passer.', 'Rounds headquarters avec score seulement après contrôle hip line.', 'Après chaque pass, tenir side control dix secondes.', 'Voir si la récupération vient knee shield ou underhook.'],
    ),
  }),
  archetype({
    id: 'front-headlock-player',
    title: lt('Front Headlock Player', 'Front Headlock Player', 'Joueur front headlock'),
    shortDescription: lt(
      'Dùng hand fighting, snapdown và go-behind/guillotine dilemma để phạt posture thấp.',
      'Uses hand fighting, snapdowns, and go-behind or guillotine dilemmas to punish low posture.',
      'Utilise hand fighting, snapdown et dilemme go-behind/guillotine pour punir posture basse.',
    ),
    philosophy: lt(
      'Front headlock tốt không chỉ là bóp cổ. Nó là kiểm soát đầu, elbow line và hip angle để đối thủ phải chọn giữa bảo vệ cổ, tránh go-behind hoặc recover posture.',
      'A good front headlock is not only squeezing the neck. It controls head, elbow line, and hip angle so the opponent must choose between neck defense, go-behind defense, or posture recovery.',
      'Un bon front headlock n’est pas juste serrer le cou. Il contrôle tête, elbow line et angle de hanches pour forcer défense du cou, go-behind ou posture.',
    ),
    bestFor: la(
      ['Người thích wrestling ties và snapdown.', 'Người muốn submission threat nối với back take.', 'Người phản ứng tốt trong scramble đầu-cổ.'],
      ['Players who like wrestling ties and snapdowns.', 'Players who want submission threats connected to back takes.', 'Players who react well in head-and-neck scrambles.'],
      ['Ceux qui aiment ties de lutte et snapdowns.', 'Ceux qui veulent connecter soumission et back take.', 'Ceux qui réagissent bien dans scrambles tête-cou.'],
    ),
    notIdealFor: la(
      ['Người không kiểm soát lực cổ an toàn.', 'Người giữ guillotine quá lâu sau khi mất angle.', 'Người chưa có back control follow-up.'],
      ['Players who cannot control neck pressure safely.', 'Players who hold guillotines too long after losing angle.', 'Players without back-control follow-up.'],
      ['Ceux qui contrôlent mal la pression du cou.', 'Ceux qui gardent guillotine trop longtemps après perte angle.', 'Ceux sans follow-up back control.'],
    ),
    coreConceptIds: ['head-position', 'dilemma-attacks', 'control-before-submission', 'early-vs-late-defense', 'failure-response'],
    coreSkillIds: ['hand-fighting', 'snapdown-front-headlock', 'guillotine-system', 'sprawl-go-behind', 'back-control', 'rear-naked-choke-system'],
    supportSkillIds: ['single-leg-bjj', 'turtle-ride', 'mat-return-basics', 'scramble-control'],
    requiredDefensiveSkillIds: ['front-headlock-defense', 'back-survival', 'leg-lock-safety-basics'],
    commonWeaknesses: la(
      ['Chin strap nông nhưng vẫn squeeze.', 'Đuổi guillotine khi đối thủ đã qua đúng side.', 'Không chuyển go-behind khi đầu đối thủ thoát.', 'Dùng lực cổ thay vì hip angle và elbow control.'],
      ['Squeezing with a shallow chin strap.', 'Chasing guillotine after the opponent passes to the correct side.', 'Not switching to go-behind when the head exits.', 'Using neck force instead of hip angle and elbow control.'],
      ['Serrer avec chin strap peu profond.', 'Chasser guillotine après le bon side pass.', 'Ne pas passer go-behind quand la tête sort.', 'Utiliser force du cou au lieu angle hanches et coude.'],
    ),
    trainingPriorities: la(
      ['Chạy round front headlock với mục tiêu chuyển giữa go-behind và guillotine.', 'Tập defense để hiểu khi nào neck pressure nguy hiểm.', 'Drill snapdown có reset posture an toàn.', 'Không finish neck attack ở tốc độ live khi chưa có kiểm soát.'],
      ['Run front headlock rounds switching between go-behind and guillotine.', 'Train defense to understand when neck pressure becomes dangerous.', 'Drill snapdowns with safe posture reset.', 'Do not finish neck attacks at live speed without control.'],
      ['Faire rounds front headlock entre go-behind et guillotine.', 'Travailler défense pour lire danger cou.', 'Driller snapdown avec reset posture sûr.', 'Ne pas finir attaque du cou vite sans contrôle.'],
    ),
  }),
  archetype({
    id: 'back-control-finisher',
    title: lt('Back Control Finisher', 'Back Control Finisher', 'Finisseur back control'),
    shortDescription: lt(
      'Tập trung lấy lưng, giữ chest-to-back, thắng hand fight và finish RNC có kiểm soát.',
      'Focuses on taking the back, keeping chest-to-back, winning hand fights, and finishing controlled RNCs.',
      'Se concentre sur prendre le dos, garder chest-to-back, gagner hand fight et finir RNC contrôlé.',
    ),
    philosophy: lt(
      'Back control là nơi positional hierarchy gặp submission. Người chơi này không săn cổ trước; họ khóa shoulder line, hook retention và hand fighting rồi mới mở strangle.',
      'Back control is where positional hierarchy meets submission. This player does not chase the neck first; they lock shoulder line, hook retention, and hand fighting before opening the strangle.',
      'Back control relie hiérarchie et soumission. Ce joueur ne chasse pas le cou d’abord; il verrouille shoulder line, hooks et hand fight avant le strangle.',
    ),
    bestFor: la(
      ['Người kiên nhẫn trong control.', 'Người thích submission có xác suất cao.', 'Người muốn chuyển turtle, mount và scramble thành back takes.'],
      ['Patient control players.', 'Players who prefer high-percentage submissions.', 'Players who want turtle, mount, and scrambles to become back takes.'],
      ['Joueurs patients en contrôle.', 'Ceux qui aiment soumissions haute probabilité.', 'Ceux qui transforment turtle, mount et scrambles en back takes.'],
    ),
    notIdealFor: la(
      ['Người squeeze RNC trước khi thắng hand fight.', 'Người dễ mất hook khi đối thủ xoay vai.', 'Người thiếu mount transition khi mất lưng.'],
      ['Players who squeeze RNC before winning the hand fight.', 'Players who lose hooks when shoulders rotate.', 'Players without mount transition when the back is lost.'],
      ['Ceux qui serrent RNC avant hand fight.', 'Ceux qui perdent hooks quand épaules tournent.', 'Ceux sans transition mount quand le dos est perdu.'],
    ),
    coreConceptIds: ['control-before-submission', 'hooks', 'connection-before-control', 'dilemma-attacks', 'failure-response'],
    coreSkillIds: ['back-control', 'rear-naked-choke-system', 'turtle-ride', 'mount-control', 'arm-triangle-mount'],
    supportSkillIds: ['hand-fighting', 'mat-return-basics', 'scramble-control', 'kimura-system'],
    requiredDefensiveSkillIds: ['back-survival', 'back-escape', 'mount-survival'],
    commonWeaknesses: la(
      ['Đuổi choke khi chest-to-back mất.', 'Không recover top hook trước khi đối thủ đặt vai xuống thảm.', 'Hand fight sai thứ tự.', 'Body triangle/hook quá cứng làm mất transition.'],
      ['Chasing the choke after chest-to-back is lost.', 'Not recovering the top hook before the opponent gets shoulders to the mat.', 'Hand fighting in the wrong order.', 'Using hooks or body triangle so rigidly that transitions disappear.'],
      ['Chasser choke après perte chest-to-back.', 'Ne pas récupérer top hook avant épaules au sol.', 'Mauvais ordre de hand fight.', 'Hooks/body triangle trop rigides qui bloquent transitions.'],
    ),
    trainingPriorities: la(
      ['Back retention round: chỉ tính điểm nếu giữ lưng sau escape attempt.', 'Hand fight sequence trước mọi RNC drill.', 'Tập mất lưng chuyển mount thay vì squeeze muộn.', 'Ghi lại cách đối thủ thoát: clear hook, shoulder mat hay peel hand.'],
      ['Back-retention rounds score only if the back is held after an escape attempt.', 'Hand-fight sequence before every RNC drill.', 'Train losing back into mount instead of late squeezing.', 'Record how opponents escape: clear hook, shoulders to mat, or peel hand.'],
      ['Rounds back retention: score si dos gardé après tentative sortie.', 'Séquence hand fight avant chaque RNC drill.', 'Travailler perte du dos vers mount au lieu squeeze tardif.', 'Noter sortie: hook, épaules au sol ou peel hand.'],
    ),
  }),
  archetype({
    id: 'leg-lock-safety-first',
    title: lt('Leg Lock Safety First', 'Leg Lock Safety First', 'Sécurité leg lock d’abord'),
    shortDescription: lt(
      'Ưu tiên nhận diện knee line, heel exposure và tap timing trước khi tấn công chân.',
      'Prioritizes knee-line recognition, heel exposure, and tap timing before leg attacks.',
      'Priorise reconnaissance knee line, talon exposé et timing de tap avant attaques de jambes.',
    ),
    philosophy: lt(
      'Leg entanglement là vùng học kỹ thuật nhưng cũng là vùng an toàn. Bạn học thứ tự: nhận diện, giấu heel, giải phóng knee line, rồi mới nghĩ tới counter hoặc offense.',
      'Leg entanglements are technical learning zones and safety zones. You learn the order: recognize, hide the heel, free the knee line, then consider countering or offense.',
      'Les entanglements sont techniques et sécurité. Ordre: reconnaître, cacher talon, libérer knee line, puis seulement counter ou attaque.',
    ),
    bestFor: la(
      ['Người mới vào leg lock game.', 'Người tập ở gym có nhiều ashi/saddle.', 'Người muốn thi đấu ruleset có heel hook.'],
      ['Players entering the leg lock game.', 'Practitioners in rooms with lots of ashi or saddle.', 'Competitors in rulesets with heel hooks.'],
      ['Ceux qui entrent dans le leg lock game.', 'Salles avec beaucoup ashi/saddle.', 'Compétiteurs ruleset avec heel hooks.'],
    ),
    notIdealFor: la(
      ['Người muốn học finish nguy hiểm trước safety.', 'Người không tap sớm khi bị lực xoắn.', 'Người tập submission chân không có giám sát.'],
      ['Players who want dangerous finishes before safety.', 'Players who do not tap early to rotational force.', 'Players training leg submissions without supervision.'],
      ['Ceux qui veulent finish dangereux avant sécurité.', 'Ceux qui ne tapent pas tôt sous rotation.', 'Ceux qui travaillent jambes sans supervision.'],
    ),
    coreConceptIds: ['leg-lock-safety-hierarchy', 'knee-line', 'early-vs-late-defense', 'inside-position', 'deliberate-practice'],
    coreSkillIds: ['leg-lock-safety-basics', 'straight-ankle-lock-safety', 'heel-hook-safety', 'single-leg-x-basics', 'k-guard-entry'],
    supportSkillIds: ['guard-pulling-strategy', 'competition-ruleset-awareness', 'supine-guard-retention', 'technical-stand-up'],
    requiredDefensiveSkillIds: ['leg-lock-safety-basics', 'heel-hook-safety', 'straight-ankle-lock-safety'],
    commonWeaknesses: la(
      ['Xoay khi heel exposed và knee line còn kẹt.', 'Không clear secondary leg.', 'Tấn công chân khi chưa hiểu ruleset.', 'Coi đau là tín hiệu duy nhất thay vì đọc position sớm.'],
      ['Rotating while heel is exposed and knee line is trapped.', 'Failing to clear the secondary leg.', 'Attacking legs without understanding ruleset.', 'Treating pain as the first signal instead of reading position early.'],
      ['Tourner talon exposé et knee line piégée.', 'Ne pas libérer jambe secondaire.', 'Attaquer jambes sans ruleset.', 'Attendre douleur au lieu lire position tôt.'],
    ),
    trainingPriorities: la(
      ['Luôn bắt đầu bằng round thoát knee line chậm.', 'Nói rõ intensity trước khi drill heel hook.', 'Tap sớm khi không chắc hướng lực.', 'Không crank submission chân trong training.'],
      ['Always begin with slow knee-line escape rounds.', 'State intensity clearly before heel hook drilling.', 'Tap early when force direction is unclear.', 'Never crank leg submissions in training.'],
      ['Toujours commencer par sorties knee line lentes.', 'Clarifier intensité avant heel hook drill.', 'Taper tôt si direction de force floue.', 'Ne jamais forcer leg submissions à l’entraînement.'],
    ),
  }),
  archetype({
    id: 'guard-retention-specialist',
    title: lt('Guard Retention Specialist', 'Guard Retention Specialist', 'Spécialiste rétention de garde'),
    shortDescription: lt(
      'Xây guard quanh layers: feet, shins, knees, frames, hips và pummeling để passer không khóa chest-to-chest.',
      'Builds guard around layers: feet, shins, knees, frames, hips, and pummeling so passers cannot lock chest-to-chest.',
      'Construit la garde en couches: pieds, tibias, genoux, frames, hanches et pummel pour empêcher chest-to-chest.',
    ),
    philosophy: lt(
      'Guard retention là hệ thống phục hồi cấu trúc. Bạn không chỉ giữ guard; bạn nhận diện pass line, bảo vệ inside knee, tạo frame và đổi sang attack khi passer overcommit.',
      'Guard retention is a structure-recovery system. You do not only keep guard; you read pass lines, protect inside knee, frame, and attack when the passer overcommits.',
      'La rétention est un système de reconstruction. Lire pass line, protéger inside knee, frame et attaquer quand le passer overcommit.',
    ),
    bestFor: la(
      ['Người bị pass nhiều bởi pressure passer.', 'Người muốn guard bền trước khi học attack phức tạp.', 'Người nhỏ hơn cần angle và frames.'],
      ['Players often passed by pressure passers.', 'Players who want durable guard before complex offense.', 'Smaller players who need angles and frames.'],
      ['Ceux souvent passés par pressure passers.', 'Ceux qui veulent garde solide avant offense complexe.', 'Petits gabarits qui ont besoin angles et frames.'],
    ),
    notIdealFor: la(
      ['Người chỉ muốn submission từ bottom mà bỏ qua posture.', 'Người không muốn tập hip mobility.', 'Người để tay duỗi dài khi frame.'],
      ['Players who only chase bottom submissions while ignoring posture.', 'Players unwilling to train hip mobility.', 'Players who frame with long extended arms.'],
      ['Ceux qui chassent soumissions bottom sans posture.', 'Ceux qui évitent mobilité hanches.', 'Ceux qui framment bras tendus.'],
    ),
    coreConceptIds: ['guard-retention-layers', 'frames', 'wedges', 'inside-position', 'elbow-knee-connection'],
    coreSkillIds: ['seated-guard-retention', 'supine-guard-retention', 'half-guard-knee-shield', 'butterfly-guard-off-balance', 'technical-stand-up'],
    supportSkillIds: ['shin-to-shin-entry', 'single-leg-x-basics', 'k-guard-entry', 'half-guard-wrestle-up'],
    requiredDefensiveSkillIds: ['side-control-survival', 'side-control-escape', 'mount-survival'],
    commonWeaknesses: la(
      ['Frame bằng tay thẳng thay vì forearm/knee structure.', 'Mất inside knee rồi vẫn cố đẩy đầu.', 'Không chuyển retention thành off-balance.', 'Chỉ recover guard nhưng không tạo threat.'],
      ['Framing with straight arms instead of forearm or knee structure.', 'Losing inside knee and still trying to push the head.', 'Not converting retention into off-balancing.', 'Recovering guard without creating threats.'],
      ['Frame bras tendus au lieu structure avant-bras/genou.', 'Perdre inside knee et pousser la tête quand même.', 'Ne pas convertir rétention en off-balance.', 'Récupérer sans créer menace.'],
    ),
    trainingPriorities: la(
      ['Guard retention round với passer chọn pass line.', 'Drill knee-elbow recovery trước khi sweep.', 'Thêm one attack sau mỗi retention success.', 'Ghi lại pass nào đánh bại layer nào.'],
      ['Guard-retention rounds where passer chooses pass line.', 'Drill knee-elbow recovery before sweeps.', 'Add one attack after every retention success.', 'Record which pass beat which layer.'],
      ['Rounds rétention où passer choisit pass line.', 'Driller récupération genou-coude avant sweeps.', 'Ajouter une attaque après chaque succès.', 'Noter quel pass bat quelle couche.'],
    ),
  }),
  archetype({
    id: 'half-guard-wrestler',
    title: lt('Half Guard Wrestler', 'Half Guard Wrestler', 'Lutteur half guard'),
    shortDescription: lt(
      'Dùng knee shield, underhook và dogfight logic để chuyển half guard thành sweep, single leg hoặc back exposure.',
      'Uses knee shield, underhook, and dogfight logic to turn half guard into sweeps, single legs, or back exposure.',
      'Utilise knee shield, underhook et logique dogfight pour transformer half guard en sweep, single leg ou back exposure.',
    ),
    philosophy: lt(
      'Half guard không phải vị trí chịu đè. Bạn dùng knee shield để ngăn flatten, underhook để thắng shoulder line, rồi vào dogfight hoặc single leg trước khi crossface ổn định.',
      'Half guard is not a place to accept being flattened. You use knee shield to prevent flattening, underhook to win shoulder line, then enter dogfight or single leg before the crossface settles.',
      'Half guard n’est pas accepter d’être aplati. Knee shield contre flatten, underhook gagne shoulder line, puis dogfight/single leg avant crossface stable.',
    ),
    bestFor: la(
      ['Người thích bottom wrestling từ half guard.', 'Người bị bodylock/knee cut nhiều.', 'Người muốn sweep nối với passing.'],
      ['Players who like bottom wrestling from half guard.', 'Players often hit by bodylock or knee cut.', 'Players who want sweeps connected to passing.'],
      ['Ceux qui aiment lutter depuis half guard.', 'Ceux qui subissent bodylock/knee cut.', 'Ceux qui veulent connecter sweep et passing.'],
    ),
    notIdealFor: la(
      ['Người hay để crossface sâu.', 'Người không pummel underhook sớm.', 'Người lên dogfight nhưng bỏ hip control.'],
      ['Players who allow deep crossface.', 'Players who do not pummel underhook early.', 'Players who rise to dogfight without hip control.'],
      ['Ceux qui laissent crossface profond.', 'Ceux qui ne pummel pas underhook tôt.', 'Ceux qui montent dogfight sans hip control.'],
    ),
    coreConceptIds: ['wedges', 'pummeling', 'wrestle-up-philosophy', 'hip-line-shoulder-line', 'failure-response'],
    coreSkillIds: ['half-guard-knee-shield', 'half-guard-wrestle-up', 'single-leg-bjj', 'bodylock-passing', 'scramble-control'],
    supportSkillIds: ['seated-guard-retention', 'side-control-escape', 'technical-stand-up', 'hand-fighting'],
    requiredDefensiveSkillIds: ['side-control-survival', 'front-headlock-defense', 'mount-escape'],
    commonWeaknesses: la(
      ['Knee shield quá thấp nên bị flatten.', 'Underhook thắng nhưng đầu vẫn thấp.', 'Dogfight không kiểm soát far hip.', 'Bỏ lỡ transition sang single leg khi họ backstep.'],
      ['Knee shield too low and getting flattened.', 'Winning underhook while the head remains low.', 'Dogfight without far-hip control.', 'Missing the single-leg transition when they backstep.'],
      ['Knee shield trop bas et flatten.', 'Underhook gagné mais tête basse.', 'Dogfight sans contrôle far hip.', 'Rater single leg quand il backstep.'],
    ),
    trainingPriorities: la(
      ['Drill crossface prevention bằng knee shield + inside hand.', 'Dogfight rounds bắt đầu từ underhook 50%.', 'Nếu mất underhook, chuyển retention trước khi wrestle-up.', 'Kết thúc sweep bằng pass hoặc pin.'],
      ['Drill crossface prevention with knee shield and inside hand.', 'Dogfight rounds starting from a 50% underhook.', 'If underhook is lost, retain before wrestling up.', 'Finish every sweep with pass or pin.'],
      ['Driller prevention crossface avec knee shield et main inside.', 'Rounds dogfight depuis underhook 50%.', 'Si underhook perdu, retenir avant wrestle-up.', 'Finir chaque sweep par pass ou pin.'],
    ),
  }),
  archetype({
    id: 'scramble-controller',
    title: lt('Scramble Controller', 'Scramble Controller', 'Contrôleur de scramble'),
    shortDescription: lt(
      'Biến scramble thành cuộc đua ưu tiên: head position, hip control, inside limbs và back exposure.',
      'Turns scrambles into priority races: head position, hip control, inside limbs, and back exposure.',
      'Transforme scramble en courses de priorités: tête, hanches, membres inside et dos exposé.',
    ),
    philosophy: lt(
      'Scramble không phải hỗn loạn nếu bạn biết checkpoint. Bạn thắng bằng việc post ngắn, giữ đầu trên hông, không lộ cổ/chân và chuyển ngay khi đối thủ quay lưng.',
      'Scramble is not chaos when you know checkpoints. You win by posting short, keeping head above hips, protecting neck and legs, and transitioning as soon as the opponent exposes the back.',
      'Scramble n’est pas chaos avec checkpoints. Post court, tête au-dessus hanches, protéger cou/jambes, et transiter quand le dos s’ouvre.',
    ),
    bestFor: la(
      ['Người có tốc độ và khả năng chuyển phase.', 'Người hay gặp wrestler hoặc scrambler.', 'Người muốn biến defense thành attack.'],
      ['Fast players who can change phases.', 'Players facing wrestlers or scramblers.', 'Players who want defense to become offense.'],
      ['Joueurs rapides capables de changer phase.', 'Ceux qui affrontent lutteurs/scramblers.', 'Ceux qui veulent transformer défense en attaque.'],
    ),
    notIdealFor: la(
      ['Người panic khi mất position.', 'Người post tay dài.', 'Người chưa có safety trong leg entanglement và front headlock.'],
      ['Players who panic when position changes.', 'Players who post long arms.', 'Players lacking leg-entanglement and front-headlock safety.'],
      ['Ceux qui paniquent quand position change.', 'Ceux qui postent bras longs.', 'Ceux sans sécurité leg entanglement/front headlock.'],
    ),
    coreConceptIds: ['base-balance', 'posts', 'head-position', 'failure-response', 'early-vs-late-defense'],
    coreSkillIds: ['scramble-control', 'sprawl-go-behind', 'mat-return-basics', 'back-control', 'single-leg-bjj'],
    supportSkillIds: ['technical-stand-up', 'hand-fighting', 'turtle-ride', 'front-headlock-defense'],
    requiredDefensiveSkillIds: ['front-headlock-defense', 'leg-lock-safety-basics', 'back-survival'],
    commonWeaknesses: la(
      ['Chasing top khi cổ bị expose.', 'Post tay xa và bị kimura/arm drag.', 'Không reset sau khi thắng exchange.', 'Để scramble kéo vào leg lock không nhận diện knee line.'],
      ['Chasing top while the neck is exposed.', 'Posting far and getting kimura or arm-dragged.', 'Not resetting after winning the exchange.', 'Letting scrambles drift into leg locks without reading knee line.'],
      ['Chasser top avec cou exposé.', 'Poster loin et subir kimura/arm drag.', 'Ne pas reset après échange gagné.', 'Laisser scramble aller vers leg lock sans lire knee line.'],
    ),
    trainingPriorities: la(
      ['Scramble rounds có rule: thắng position rồi ổn định 5 giây.', 'Drill short posts và safe head position.', 'Luôn nối scramble với pin/back hoặc disengage.', 'Review lại scramble thua vì cổ, lưng hay knee line.'],
      ['Scramble rounds with a rule: win position and stabilize five seconds.', 'Drill short posts and safe head position.', 'Always connect scrambles to pin, back, or disengage.', 'Review whether scramble losses came from neck, back, or knee line.'],
      ['Rounds scramble: gagner position puis stabiliser 5 secondes.', 'Driller posts courts et head position sûre.', 'Connecter scramble à pin, back ou disengage.', 'Noter pertes: cou, dos ou knee line.'],
    ),
  }),
  archetype({
    id: 'submission-chain-hunter',
    title: lt('Submission Chain Hunter', 'Submission Chain Hunter', 'Chasseur de chaînes de soumission'),
    shortDescription: lt(
      'Xây submission bằng dilemma: guillotine, kimura, back take, arm triangle và RNC nối theo phản ứng.',
      'Builds submissions through dilemmas: guillotine, kimura, back take, arm triangle, and RNC chained by reaction.',
      'Construit les soumissions par dilemmes: guillotine, kimura, back take, arm triangle et RNC selon réactions.',
    ),
    philosophy: lt(
      'Bạn không săn một finish duy nhất. Bạn isolate một line, chờ đối thủ phòng thủ đúng, rồi dùng phản ứng đó để chuyển sang submission hoặc control tốt hơn.',
      'You do not hunt one finish. You isolate one line, let the opponent defend correctly, then use that reaction to switch to a better submission or control.',
      'Vous ne chassez pas un seul finish. Isoler une ligne, laisser la bonne défense, puis utiliser la réaction vers meilleure soumission ou contrôle.',
    ),
    bestFor: la(
      ['Người đã có control nền tảng.', 'Người thích phản ứng và chain attacks.', 'Người muốn submission mà vẫn giữ position.'],
      ['Players with foundational control.', 'Players who like reactions and chain attacks.', 'Players who want submissions while keeping position.'],
      ['Ceux avec contrôle de base.', 'Ceux qui aiment réactions et chaînes.', 'Ceux qui veulent soumettre sans perdre position.'],
    ),
    notIdealFor: la(
      ['Người bỏ qua control trước submission.', 'Người crank khi finish không rõ.', 'Người chưa có defensive safety khi counter xảy ra.'],
      ['Players who skip control before submission.', 'Players who crank when the finish is unclear.', 'Players without defensive safety when counters happen.'],
      ['Ceux qui sautent contrôle avant soumission.', 'Ceux qui forcent quand finish flou.', 'Ceux sans safety défensive face aux counters.'],
    ),
    coreConceptIds: ['control-before-submission', 'dilemma-attacks', 'levers', 'angle-creation', 'connection-before-control'],
    coreSkillIds: ['guillotine-system', 'kimura-system', 'arm-triangle-mount', 'rear-naked-choke-system', 'back-control'],
    supportSkillIds: ['mount-control', 'side-control-pin', 'snapdown-front-headlock', 'turtle-ride'],
    requiredDefensiveSkillIds: ['front-headlock-defense', 'back-survival', 'leg-lock-safety-basics'],
    commonWeaknesses: la(
      ['Squeeze trước khi isolate.', 'Nhảy submission và mất pin.', 'Không biết nhánh tiếp theo khi elbow bị giấu.', 'Tăng lực thay vì đổi angle.'],
      ['Squeezing before isolation.', 'Jumping submission and losing the pin.', 'Not knowing the next branch when the elbow hides.', 'Adding force instead of changing angle.'],
      ['Serrer avant isolation.', 'Sauter soumission et perdre pin.', 'Ne pas savoir branche suivante quand coude caché.', 'Ajouter force au lieu angle.'],
    ),
    trainingPriorities: la(
      ['Round control-before-submission: không được finish trong 20 giây đầu.', 'Drill hai nhánh cho mỗi reaction.', 'Dừng finish nếu safety signal xuất hiện.', 'Review: finish fail do isolation, angle hay control?'],
      ['Control-before-submission rounds: no finishing in first twenty seconds.', 'Drill two branches for every reaction.', 'Stop finishing when a safety signal appears.', 'Review whether failed finishes came from isolation, angle, or control.'],
      ['Rounds contrôle avant soumission: pas de finish 20 premières secondes.', 'Driller deux branches par réaction.', 'Arrêter si signal sécurité.', 'Review: échec par isolation, angle ou contrôle?'],
    ),
  }),
  archetype({
    id: 'defensive-counter-grappler',
    title: lt('Defensive Counter Grappler', 'Defensive Counter Grappler', 'Contre-grappler défensif'),
    shortDescription: lt(
      'Ưu tiên survival, escape, safety recognition và counter sau khi đối thủ overcommit.',
      'Prioritizes survival, escapes, safety recognition, and counters after the opponent overcommits.',
      'Priorise survie, sorties, reconnaissance danger et counters après overcommit adverse.',
    ),
    philosophy: lt(
      'Defense không phải chờ thua. Bạn xây early defense, nhận diện danger signal, recover structure và phản công khi đối thủ mất base hoặc bỏ hip line.',
      'Defense is not waiting to lose. You build early defense, recognize danger signals, recover structure, and counter when the opponent loses base or abandons hip line.',
      'La défense n’est pas attendre de perdre. Construire early defense, lire danger, reconstruire, puis contrer quand l’adversaire perd base ou hip line.',
    ),
    bestFor: la(
      ['Người mới cần giảm panic.', 'Người hay bị pin/submission.', 'Người muốn game ít rủi ro và bền lâu.'],
      ['Beginners who need less panic.', 'Players often pinned or submitted.', 'Players who want a durable low-risk game.'],
      ['Débutants qui veulent moins paniquer.', 'Ceux souvent pinnés ou soumis.', 'Ceux qui veulent jeu durable peu risqué.'],
    ),
    notIdealFor: la(
      ['Người chỉ phòng thủ và không học chuyển sang attack.', 'Người tap quá muộn để chứng minh toughness.', 'Người không ghi lại lỗi lặp lại.'],
      ['Players who only defend and never learn to attack.', 'Players who tap late to prove toughness.', 'Players who do not record repeating errors.'],
      ['Ceux qui défendent seulement sans attaquer.', 'Ceux qui tapent tard pour prouver dureté.', 'Ceux qui ne notent pas erreurs répétées.'],
    ),
    coreConceptIds: ['early-vs-late-defense', 'failure-response', 'frames', 'positional-hierarchy', 'deliberate-practice'],
    coreSkillIds: ['side-control-survival', 'mount-survival', 'back-survival', 'side-control-escape', 'mount-escape', 'back-escape'],
    supportSkillIds: ['front-headlock-defense', 'leg-lock-safety-basics', 'technical-stand-up', 'scramble-control'],
    requiredDefensiveSkillIds: ['leg-lock-safety-basics', 'front-headlock-defense', 'back-survival', 'mount-survival'],
    commonWeaknesses: la(
      ['Thoát muộn khi pin đã ổn định.', 'Frame bằng sức tay thay vì cấu trúc.', 'Recover guard nhưng không giữ layer tiếp theo.', 'Không chuyển counter khi đối thủ overcommit.'],
      ['Escaping late after the pin is stable.', 'Framing with arm strength instead of structure.', 'Recovering guard without keeping the next layer.', 'Not countering when the opponent overcommits.'],
      ['Sortir tard après pin stable.', 'Frame avec force des bras.', 'Récupérer garde sans garder couche suivante.', 'Ne pas contrer quand adversaire overcommit.'],
    ),
    trainingPriorities: la(
      ['Start-from-bad-position rounds mỗi tuần.', 'Escape-only round với tiêu chí thở và frame trước.', 'Ghi lại danger signal đầu tiên sau buổi tập.', 'Sau escape phải reset hoặc counter rõ ràng.'],
      ['Start-from-bad-position rounds every week.', 'Escape-only rounds where breathing and frames come first.', 'Record the first danger signal.', 'After escape, reset or counter clearly.'],
      ['Rounds départ mauvaise position chaque semaine.', 'Rounds escape-only avec respiration et frames d’abord.', 'Noter premier danger signal.', 'Après sortie, reset ou counter clairement.'],
    ),
  }),
]
