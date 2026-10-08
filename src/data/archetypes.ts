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

const archetype = (seed: ArchetypeSeed): GrapplingArchetype => seed

export const archetypes: GrapplingArchetype[] = [
  archetype({
    id: 'wrestle-up-player',
    title: lt('Người chơi wrestle-up', 'Wrestle-Up Player', 'Joueur wrestle-up'),
    shortDescription: lt(
      'Dùng seated Guard, shin-to-shin và Half Guard để đứng lên single leg thay vì nằm chờ sweep.',
      'Uses seated Guard, shin-to-shin, and Half Guard to rise into single legs instead of waiting for sweeps.',
      'Utilise seated Guard, shin-to-shin et Half Guard pour monter en single leg plutôt qu’attendre le sweep.',
    ),
    philosophy: lt(
      'Bạn biến Guard thành wrestling entry. Mục tiêu là giữ đầu và hông sống, thắng underhook hoặc shin connection, rồi lên gối trước khi đối thủ khóa chest-to-chest.',
      'You turn Guard into wrestling entries. The goal is to keep head and hips alive, win an underhook or shin connection, then come to a knee before the opponent locks chest-to-chest.',
      'Vous transformez la garde en entrées de lutte. Garder tête et hanches actives, gagner underhook ou connexion shin, puis monter au genou avant le chest-to-chest.',
    ),
    bestFor: la(
      ['Người thích áp lực chủ động từ bottom.', 'Người có cardio tốt và muốn tạo scramble có kiểm soát.', 'Người muốn Guard dẫn tới top position.'],
      ['Players who like active bottom pressure.', 'Athletes with good pace who want controlled scrambles.', 'Practitioners who want Guard to lead to top position.'],
      ['Ceux qui aiment une pression active depuis bottom.', 'Athlètes avec bon rythme qui veulent des scrambles contrôlés.', 'Pratiquants qui veulent que la garde mène au top.'],
    ),
    notIdealFor: la(
      ['Người chưa bảo vệ cổ tốt khi lên single leg.', 'Người hay để đầu thấp trong Front Headlock.', 'Người không muốn chịu nhịp scramble.'],
      ['Players who cannot protect the neck while rising on single legs.', 'Players who drop their head into front headlocks.', 'Players who avoid scramble pace.'],
      ['Ceux qui protègent mal le cou en single leg.', 'Ceux qui baissent la tête dans Front Headlock.', 'Ceux qui évitent le rythme scramble.'],
    ),
    coreConceptIds: ['wrestle-up-philosophy', 'inside-position', 'head-position', 'base-balance', 'failure-response'],
    coreSkillIds: ['seated-Guard-retention', 'shin-to-shin-entry', 'half-Guard-wrestle-up', 'single-leg-bjj', 'bodylock-passing', 'back-control'],
    supportSkillIds: ['technical-stand-up', 'butterfly-Guard-off-balance', 'hand-fighting', 'mat-return-basics', 'scramble-control', 'bjj-foot-sweeps', 'double-leg-bjj'],
    requiredDefensiveSkillIds: ['front-headlock-defense', 'sprawl-go-behind', 'side-control-escape', 'back-escape'],
    commonWeaknesses: la(
      ['Cổ bị Guillotine khi đầu thấp.', 'Lên gối nhưng không khóa hip line.', 'Tấn công single leg khi elbow-knee connection đã mất.', 'Scramble quá lâu sau khi đã có top.'],
      ['Guillotined when the head drops.', 'Coming to a knee without controlling the hip line.', 'Attacking single legs after elbow-knee connection is lost.', 'Scrambling too long after top position is available.'],
      ['Guillotine quand la tête tombe.', 'Monter au genou sans contrôler hip line.', 'Attaquer single leg après perte coude-genou.', 'Scrambler trop longtemps quand top est disponible.'],
    ),
    trainingPriorities: la(
      ['Drill Front Headlock defense trước mỗi wrestle-up block.', 'Tập seated Guard retention với mục tiêu lên gối.', 'Chạy round pass-or-wrestle-up 3 phút.', 'Review lại bị kẹt ở head position hay hip line.'],
      ['Drill Front Headlock defense before every wrestle-up block.', 'Train seated Guard retention with the goal of coming to a knee.', 'Run three-minute pass-or-wrestle-up rounds.', 'Review whether failures came from head position or hip line.'],
      ['Driller Front Headlock defense avant chaque bloc wrestle-up.', 'Travailler seated Guard retention avec objectif monter au genou.', 'Faire rounds pass-or-wrestle-up de 3 minutes.', 'Revoir si l’échec vient tête ou hip line.'],
    ),
  }),
  archetype({
    id: 'pressure-passer',
    title: lt('Pressure passer', 'Pressure Passer', 'Passeur pression'),
    shortDescription: lt(
      'Ưu tiên Bodylock, headquarters và Knee Cut để khóa hip line trước khi vượt chân.',
      'Prioritizes Bodylock, headquarters, and Knee Cut passing to lock the hip line before clearing legs.',
      'Priorise Bodylock, headquarters et Knee Cut pour verrouiller la hip line avant de passer les jambes.',
    ),
    philosophy: lt(
      'Passing không phải chạy quanh chân; đó là lấy đi khả năng xoay hông, frame và đưa gối vào lại. Pressure đi chéo qua chest, shoulder và head position.',
      'Passing is not running around legs; it removes the opponent’s ability to rotate hips, frame, and reinsert knees. Pressure travels diagonally through chest, shoulder, and head position.',
      'Passer n’est pas courir autour des jambes; c’est enlever rotation de hanches, frames et réinsertion du genou. La pression va en diagonale par poitrine, épaule et tête.',
    ),
    bestFor: la(
      ['Người thích top control và tempo chậm chắc.', 'Người muốn chuyển pass thành Side Control hoặc Mount.', 'Người có khả năng giữ pressure mà không overcommit.'],
      ['Players who like top control and steady tempo.', 'Players who want passes to connect directly to pins.', 'Players who can pressure without overcommitting.'],
      ['Ceux qui aiment top control et tempo solide.', 'Ceux qui veulent connecter pass et pin.', 'Ceux qui peuvent presser sans trop s’engager.'],
    ),
    notIdealFor: la(
      ['Người chưa hiểu Leg Lock safety khi vào close range.', 'Người hay để đầu giữa hai tay đối thủ.', 'Người chỉ muốn outside movement nhanh.'],
      ['Players without Leg Lock safety in close range.', 'Players who center their head between the opponent’s arms.', 'Players who only want fast outside movement.'],
      ['Ceux sans sécurité Leg Lock en close range.', 'Ceux qui centrent la tête entre les bras adverses.', 'Ceux qui veulent seulement mouvement outside rapide.'],
    ),
    coreConceptIds: ['connection-before-control', 'pressure-direction', 'inside-position', 'wedges', 'positional-hierarchy'],
    coreSkillIds: ['bodylock-passing', 'headquarters-passing', 'knee-cut-passing', 'side-control-pin', 'Mount-control', 'arm-triangle-Mount'],
    supportSkillIds: ['hand-fighting', 'leg-drag-basics', 'outside-passing', 'mat-return-basics', 'back-control', 'toreando-passing', 'tripod-folding-pass', 'over-under-pass'],
    requiredDefensiveSkillIds: ['leg-lock-safety-basics', 'heel-hook-safety', 'front-headlock-defense', 'scramble-control'],
    commonWeaknesses: la(
      ['Bị butterfly lift vì weight quá cao.', 'Bị Shoulder Crunch vì đầu nằm giữa.', 'Clear knee line rồi thả control quá sớm.', 'Đè thẳng xuống thay vì pressure chéo.'],
      ['Getting butterfly lifted because weight is too high.', 'Getting shoulder-crunched because the head is centered.', 'Releasing control too early after clearing the knee line.', 'Driving straight down instead of diagonal pressure.'],
      ['Se faire lever par butterfly car poids trop haut.', 'Subir Shoulder Crunch car tête centrée.', 'Relâcher trop tôt après avoir passé knee line.', 'Presser droit vers le bas au lieu de diagonale.'],
    ),
    trainingPriorities: la(
      ['Tập Bodylock với mục tiêu giết hook trước khi pass.', 'Headquarters rounds: passer chỉ được qua khi kiểm soát hip line.', 'Sau mỗi pass phải giữ Side Control 10 giây.', 'Review lại bị recover Guard bằng knee shield hay underhook.'],
      ['Train Bodylock with the goal of killing hooks before passing.', 'Headquarters rounds where the passer can score only after hip-line control.', 'After every pass, hold Side Control for ten seconds.', 'Review whether Guard recovery came from knee shield or underhook.'],
      ['Travailler Bodylock en tuant hooks avant passer.', 'Rounds headquarters avec score seulement après contrôle hip line.', 'Après chaque pass, tenir Side Control dix secondes.', 'Voir si la récupération vient knee shield ou underhook.'],
    ),
  }),
  archetype({
    id: 'front-headlock-player',
    title: lt('Người chơi Front Headlock', 'Front Headlock Player', 'Joueur Front Headlock'),
    shortDescription: lt(
      'Dùng hand fighting, snapdown và go-behind/Guillotine dilemma để phạt posture thấp.',
      'Uses hand fighting, snapdowns, and go-behind or Guillotine dilemmas to punish low posture.',
      'Utilise hand fighting, snapdown et dilemme go-behind/Guillotine pour punir posture basse.',
    ),
    philosophy: lt(
      'Front Headlock tốt không chỉ là bóp cổ. Nó là kiểm soát đầu, elbow line và hip angle để đối thủ phải chọn giữa bảo vệ cổ, tránh go-behind hoặc recover posture.',
      'A good Front Headlock is not only squeezing the neck. It controls head, elbow line, and hip angle so the opponent must choose between neck defense, go-behind defense, or posture recovery.',
      'Un bon Front Headlock n’est pas juste serrer le cou. Il contrôle tête, elbow line et angle de hanches pour forcer défense du cou, go-behind ou posture.',
    ),
    bestFor: la(
      ['Người thích wrestling ties và snapdown.', 'Người muốn submission threat nối với Back Take.', 'Người phản ứng tốt trong scramble đầu-cổ.'],
      ['Players who like wrestling ties and snapdowns.', 'Players who want submission threats connected to Back Takes.', 'Players who react well in head-and-neck scrambles.'],
      ['Ceux qui aiment ties de lutte et snapdowns.', 'Ceux qui veulent connecter soumission et Back Take.', 'Ceux qui réagissent bien dans scrambles tête-cou.'],
    ),
    notIdealFor: la(
      ['Người không kiểm soát lực cổ an toàn.', 'Người giữ Guillotine quá lâu sau khi mất angle.', 'Người chưa có back control follow-up.'],
      ['Players who cannot control neck pressure safely.', 'Players who hold Guillotines too long after losing angle.', 'Players without back-control follow-up.'],
      ['Ceux qui contrôlent mal la pression du cou.', 'Ceux qui gardent Guillotine trop longtemps après perte angle.', 'Ceux sans follow-up back control.'],
    ),
    coreConceptIds: ['head-position', 'dilemma-attacks', 'control-before-submission', 'early-vs-late-defense', 'failure-response'],
    coreSkillIds: ['hand-fighting', 'snapdown-front-headlock', 'Guillotine-system', 'sprawl-go-behind', 'back-control', 'rear-naked-choke-system'],
    supportSkillIds: ['single-leg-bjj', 'turtle-ride', 'mat-return-basics', 'scramble-control', 'chin-strap-control'],
    requiredDefensiveSkillIds: ['front-headlock-defense', 'back-survival', 'leg-lock-safety-basics'],
    commonWeaknesses: la(
      ['Chin strap nông nhưng vẫn squeeze.', 'Đuổi Guillotine khi đối thủ đã qua đúng side.', 'Không chuyển go-behind khi đầu đối thủ thoát.', 'Dùng lực cổ thay vì hip angle và elbow control.'],
      ['Squeezing with a shallow chin strap.', 'Chasing Guillotine after the opponent passes to the correct side.', 'Not switching to go-behind when the head exits.', 'Using neck force instead of hip angle and elbow control.'],
      ['Serrer avec chin strap peu profond.', 'Chasser Guillotine après le bon side pass.', 'Ne pas passer go-behind quand la tête sort.', 'Utiliser force du cou au lieu angle hanches et coude.'],
    ),
    trainingPriorities: la(
      ['Chạy round Front Headlock với mục tiêu chuyển giữa go-behind và Guillotine.', 'Tập defense để hiểu khi nào neck pressure nguy hiểm.', 'Drill snapdown có reset posture an toàn.', 'Không finish neck attack ở tốc độ live khi chưa có kiểm soát.'],
      ['Run Front Headlock rounds switching between go-behind and Guillotine.', 'Train defense to understand when neck pressure becomes dangerous.', 'Drill snapdowns with safe posture reset.', 'Do not finish neck attacks at live speed without control.'],
      ['Faire rounds Front Headlock entre go-behind et Guillotine.', 'Travailler défense pour lire danger cou.', 'Driller snapdown avec reset posture sûr.', 'Ne pas finir attaque du cou vite sans contrôle.'],
    ),
  }),
  archetype({
    id: 'back-control-finisher',
    title: lt('Finisher back control', 'Back Control Finisher', 'Finisseur back control'),
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
      ['Người kiên nhẫn trong control.', 'Người thích submission có xác suất cao.', 'Người muốn chuyển Turtle, Mount và scramble thành Back Takes.'],
      ['Patient control players.', 'Players who prefer high-percentage submissions.', 'Players who want Turtle, Mount, and scrambles to become Back Takes.'],
      ['Joueurs patients en contrôle.', 'Ceux qui aiment soumissions haute probabilité.', 'Ceux qui transforment Turtle, Mount et scrambles en Back Takes.'],
    ),
    notIdealFor: la(
      ['Người squeeze RNC trước khi thắng hand fight.', 'Người dễ mất hook khi đối thủ xoay vai.', 'Người thiếu Mount transition khi mất lưng.'],
      ['Players who squeeze RNC before winning the hand fight.', 'Players who lose hooks when shoulders rotate.', 'Players without Mount transition when the back is lost.'],
      ['Ceux qui serrent RNC avant hand fight.', 'Ceux qui perdent hooks quand épaules tournent.', 'Ceux sans transition Mount quand le dos est perdu.'],
    ),
    coreConceptIds: ['control-before-submission', 'hooks', 'connection-before-control', 'dilemma-attacks', 'failure-response'],
    coreSkillIds: ['back-control', 'rear-naked-choke-system', 'turtle-ride', 'Mount-control', 'arm-triangle-Mount'],
    supportSkillIds: ['hand-fighting', 'mat-return-basics', 'scramble-control', 'kimura-system'],
    requiredDefensiveSkillIds: ['back-survival', 'back-escape', 'Mount-survival'],
    commonWeaknesses: la(
      ['Đuổi choke khi chest-to-back mất.', 'Không recover top hook trước khi đối thủ đặt vai xuống thảm.', 'Hand fight sai thứ tự.', 'Body triangle/hook quá cứng làm mất transition.'],
      ['Chasing the choke after chest-to-back is lost.', 'Not recovering the top hook before the opponent gets shoulders to the mat.', 'Hand fighting in the wrong order.', 'Using hooks or Body Triangle so rigidly that transitions disappear.'],
      ['Chasser choke après perte chest-to-back.', 'Ne pas récupérer top hook avant épaules au sol.', 'Mauvais ordre de hand fight.', 'Hooks/Body Triangle trop rigides qui bloquent transitions.'],
    ),
    trainingPriorities: la(
      ['Back retention round: chỉ tính điểm nếu giữ lưng sau escape attempt.', 'Hand fight sequence trước mọi RNC drill.', 'Tập mất lưng chuyển Mount thay vì squeeze muộn.', 'Ghi lại cách đối thủ thoát: clear hook, shoulder mat hay peel hand.'],
      ['Back-retention rounds score only if the back is held after an escape attempt.', 'Hand-fight sequence before every RNC drill.', 'Train losing back into Mount instead of late squeezing.', 'Record how opponents escape: clear hook, shoulders to mat, or peel hand.'],
      ['Rounds back retention: score si dos gardé après tentative sortie.', 'Séquence hand fight avant chaque RNC drill.', 'Travailler perte du dos vers Mount au lieu squeeze tardif.', 'Noter sortie: hook, épaules au sol ou peel hand.'],
    ),
  }),
  archetype({
    id: 'leg-lock-safety-first',
    title: lt('An toàn Leg Lock trước tiên', 'Leg Lock Safety First', 'Sécurité Leg Lock d’abord'),
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
      ['Người mới vào Leg Lock game.', 'Người tập ở gym có nhiều ashi/saddle.', 'Người muốn thi đấu ruleset có Heel Hook.'],
      ['Players entering the Leg Lock game.', 'Practitioners in rooms with lots of ashi or Saddle.', 'Competitors in rulesets with Heel Hooks.'],
      ['Ceux qui entrent dans le Leg Lock game.', 'Salles avec beaucoup ashi/saddle.', 'Compétiteurs ruleset avec Heel Hooks.'],
    ),
    notIdealFor: la(
      ['Người muốn học finish nguy hiểm trước safety.', 'Người không tap sớm khi bị lực xoắn.', 'Người tập submission chân không có giám sát.'],
      ['Players who want dangerous finishes before safety.', 'Players who do not tap early to rotational force.', 'Players training leg submissions without supervision.'],
      ['Ceux qui veulent finish dangereux avant sécurité.', 'Ceux qui ne tapent pas tôt sous rotation.', 'Ceux qui travaillent jambes sans supervision.'],
    ),
    coreConceptIds: ['leg-lock-safety-hierarchy', 'knee-line', 'early-vs-late-defense', 'inside-position', 'deliberate-practice'],
    coreSkillIds: ['leg-lock-safety-basics', 'straight-ankle-lock-safety', 'heel-hook-safety', 'single-leg-x-basics', 'k-Guard-entry'],
    supportSkillIds: ['Guard-pulling-strategy', 'supine-Guard-retention', 'technical-stand-up', 'heel-hook-finishing-system', 'calf-compression-locks', 'toe-hold-estima-lock'],
    requiredDefensiveSkillIds: ['leg-lock-safety-basics', 'heel-hook-safety', 'straight-ankle-lock-safety'],
    commonWeaknesses: la(
      ['Xoay khi heel exposed và knee line còn kẹt.', 'Không clear secondary leg.', 'Tấn công chân khi chưa hiểu ruleset.', 'Coi đau là tín hiệu duy nhất thay vì đọc position sớm.'],
      ['Rotating while heel is exposed and knee line is trapped.', 'Failing to clear the secondary leg.', 'Attacking legs without understanding ruleset.', 'Treating pain as the first signal instead of reading position early.'],
      ['Tourner talon exposé et knee line piégée.', 'Ne pas libérer jambe secondaire.', 'Attaquer jambes sans ruleset.', 'Attendre douleur au lieu lire position tôt.'],
    ),
    trainingPriorities: la(
      ['Luôn bắt đầu bằng round thoát knee line chậm.', 'Nói rõ intensity trước khi drill Heel Hook.', 'Tap sớm khi không chắc hướng lực.', 'Không crank submission chân trong training.'],
      ['Always begin with slow knee-line escape rounds.', 'State intensity clearly before Heel Hook drilling.', 'Tap early when force direction is unclear.', 'Never crank leg submissions in training.'],
      ['Toujours commencer par sorties knee line lentes.', 'Clarifier intensité avant Heel Hook drill.', 'Taper tôt si direction de force floue.', 'Ne jamais forcer leg submissions à l’entraînement.'],
    ),
  }),
  archetype({
    id: 'Guard-retention-specialist',
    title: lt('Chuyên gia Guard retention', 'Guard Retention Specialist', 'Spécialiste rétention de garde'),
    shortDescription: lt(
      'Xây Guard quanh layers: feet, shins, knees, frames, hips và pummeling để passer không khóa chest-to-chest.',
      'Builds Guard around layers: feet, shins, knees, frames, hips, and pummeling so passers cannot lock chest-to-chest.',
      'Construit la garde en couches: pieds, tibias, genoux, frames, hanches et pummel pour empêcher chest-to-chest.',
    ),
    philosophy: lt(
      'Guard retention là hệ thống phục hồi cấu trúc. Bạn không chỉ giữ Guard; bạn nhận diện pass line, bảo vệ inside knee, tạo frame và đổi sang attack khi passer overcommit.',
      'Guard retention is a structure-recovery system. You do not only keep Guard; you read pass lines, protect inside knee, frame, and attack when the passer overcommits.',
      'La rétention est un système de reconstruction. Lire pass line, protéger inside knee, frame et attaquer quand le passer overcommit.',
    ),
    bestFor: la(
      ['Người bị pass nhiều bởi pressure passer.', 'Người muốn Guard bền trước khi học attack phức tạp.', 'Người nhỏ hơn cần angle và frames.'],
      ['Players often passed by pressure passers.', 'Players who want durable Guard before complex offense.', 'Smaller players who need angles and frames.'],
      ['Ceux souvent passés par pressure passers.', 'Ceux qui veulent garde solide avant offense complexe.', 'Petits gabarits qui ont besoin angles et frames.'],
    ),
    notIdealFor: la(
      ['Người chỉ muốn submission từ bottom mà bỏ qua posture.', 'Người không muốn tập hip mobility.', 'Người để tay duỗi dài khi frame.'],
      ['Players who only chase bottom submissions while ignoring posture.', 'Players unwilling to train hip mobility.', 'Players who frame with long extended arms.'],
      ['Ceux qui chassent soumissions bottom sans posture.', 'Ceux qui évitent mobilité hanches.', 'Ceux qui framment bras tendus.'],
    ),
    coreConceptIds: ['Guard-retention-layers', 'frames', 'wedges', 'inside-position', 'elbow-knee-connection'],
    coreSkillIds: ['seated-Guard-retention', 'supine-Guard-retention', 'half-Guard-knee-shield', 'butterfly-Guard-off-balance', 'technical-stand-up'],
    supportSkillIds: ['shin-to-shin-entry', 'single-leg-x-basics', 'k-Guard-entry', 'half-Guard-wrestle-up'],
    requiredDefensiveSkillIds: ['side-control-survival', 'side-control-escape', 'Mount-survival'],
    commonWeaknesses: la(
      ['Frame bằng tay thẳng thay vì forearm/knee structure.', 'Mất inside knee rồi vẫn cố đẩy đầu.', 'Không chuyển retention thành off-balance.', 'Chỉ recover Guard nhưng không tạo threat.'],
      ['Framing with straight arms instead of forearm or knee structure.', 'Losing inside knee and still trying to push the head.', 'Not converting retention into off-balancing.', 'Recovering Guard without creating threats.'],
      ['Frame bras tendus au lieu structure avant-bras/genou.', 'Perdre inside knee et pousser la tête quand même.', 'Ne pas convertir rétention en off-balance.', 'Récupérer sans créer menace.'],
    ),
    trainingPriorities: la(
      ['Guard retention round với passer chọn pass line.', 'Drill knee-elbow recovery trước khi sweep.', 'Thêm one attack sau mỗi retention success.', 'Ghi lại pass nào đánh bại layer nào.'],
      ['Guard-retention rounds where passer chooses pass line.', 'Drill knee-elbow recovery before sweeps.', 'Add one attack after every retention success.', 'Record which pass beat which layer.'],
      ['Rounds rétention où passer choisit pass line.', 'Driller récupération genou-coude avant sweeps.', 'Ajouter une attaque après chaque succès.', 'Noter quel pass bat quelle couche.'],
    ),
  }),
  archetype({
    id: 'half-Guard-wrestler',
    title: lt('Vật sĩ Half Guard', 'Half Guard Wrestler', 'Lutteur Half Guard'),
    shortDescription: lt(
      'Dùng knee shield, underhook và Dogfight logic để chuyển Half Guard thành sweep, single leg hoặc back exposure.',
      'Uses knee shield, underhook, and Dogfight logic to turn Half Guard into sweeps, single legs, or back exposure.',
      'Utilise knee shield, underhook et logique Dogfight pour transformer Half Guard en sweep, single leg ou back exposure.',
    ),
    philosophy: lt(
      'Half Guard không phải vị trí chịu đè. Bạn dùng knee shield để ngăn flatten, underhook để thắng shoulder line, rồi vào Dogfight hoặc single leg trước khi crossface ổn định.',
      'Half Guard is not a place to accept being flattened. You use knee shield to prevent flattening, underhook to win shoulder line, then enter Dogfight or single leg before the crossface settles.',
      'Half Guard n’est pas accepter d’être aplati. Knee shield contre flatten, underhook gagne shoulder line, puis dogfight/single leg avant crossface stable.',
    ),
    bestFor: la(
      ['Người thích bottom wrestling từ Half Guard.', 'Người bị bodylock/knee cut nhiều.', 'Người muốn sweep nối với passing.'],
      ['Players who like bottom wrestling from Half Guard.', 'Players often hit by Bodylock or Knee Cut.', 'Players who want sweeps connected to passing.'],
      ['Ceux qui aiment lutter depuis Half Guard.', 'Ceux qui subissent bodylock/knee cut.', 'Ceux qui veulent connecter sweep et passing.'],
    ),
    notIdealFor: la(
      ['Người hay để crossface sâu.', 'Người không pummel underhook sớm.', 'Người lên Dogfight nhưng bỏ hip control.'],
      ['Players who allow deep crossface.', 'Players who do not pummel underhook early.', 'Players who rise to Dogfight without hip control.'],
      ['Ceux qui laissent crossface profond.', 'Ceux qui ne pummel pas underhook tôt.', 'Ceux qui montent Dogfight sans hip control.'],
    ),
    coreConceptIds: ['wedges', 'pummeling', 'wrestle-up-philosophy', 'hip-line-shoulder-line', 'failure-response'],
    coreSkillIds: ['half-Guard-knee-shield', 'half-Guard-wrestle-up', 'single-leg-bjj', 'bodylock-passing', 'scramble-control'],
    supportSkillIds: ['seated-Guard-retention', 'side-control-escape', 'technical-stand-up', 'hand-fighting', 'coyote-half-Guard'],
    requiredDefensiveSkillIds: ['side-control-survival', 'front-headlock-defense', 'Mount-escape'],
    commonWeaknesses: la(
      ['Knee shield quá thấp nên bị flatten.', 'Underhook thắng nhưng đầu vẫn thấp.', 'Dogfight không kiểm soát far hip.', 'Bỏ lỡ transition sang single leg khi họ backstep.'],
      ['Knee shield too low and getting flattened.', 'Winning underhook while the head remains low.', 'Dogfight without far-hip control.', 'Missing the single-leg transition when they backstep.'],
      ['Knee shield trop bas et flatten.', 'Underhook gagné mais tête basse.', 'Dogfight sans contrôle far hip.', 'Rater single leg quand il backstep.'],
    ),
    trainingPriorities: la(
      ['Drill crossface prevention bằng knee shield + inside hand.', 'Dogfight rounds bắt đầu từ underhook 50%.', 'Nếu mất underhook, chuyển retention trước khi wrestle-up.', 'Kết thúc sweep bằng pass hoặc pin.'],
      ['Drill crossface prevention with knee shield and inside hand.', 'Dogfight rounds starting from a 50% underhook.', 'If underhook is lost, retain before wrestling up.', 'Finish every sweep with pass or pin.'],
      ['Driller prevention crossface avec knee shield et main inside.', 'Rounds Dogfight depuis underhook 50%.', 'Si underhook perdu, retenir avant wrestle-up.', 'Finir chaque sweep par pass ou pin.'],
    ),
  }),
  archetype({
    id: 'scramble-controller',
    title: lt('Người kiểm soát scramble', 'Scramble Controller', 'Contrôleur de scramble'),
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
      ['Người panic khi mất position.', 'Người post tay dài.', 'Người chưa có safety trong leg entanglement và Front Headlock.'],
      ['Players who panic when position changes.', 'Players who post long arms.', 'Players lacking leg-entanglement and front-headlock safety.'],
      ['Ceux qui paniquent quand position change.', 'Ceux qui postent bras longs.', 'Ceux sans sécurité leg entanglement/Front Headlock.'],
    ),
    coreConceptIds: ['base-balance', 'posts', 'head-position', 'failure-response', 'early-vs-late-defense'],
    coreSkillIds: ['scramble-control', 'sprawl-go-behind', 'mat-return-basics', 'back-control', 'single-leg-bjj', 'double-leg-bjj'],
    supportSkillIds: ['technical-stand-up', 'hand-fighting', 'turtle-ride', 'front-headlock-defense'],
    requiredDefensiveSkillIds: ['front-headlock-defense', 'leg-lock-safety-basics', 'back-survival'],
    commonWeaknesses: la(
      ['Chasing top khi cổ bị expose.', 'Post tay xa và bị kimura/arm drag.', 'Không reset sau khi thắng exchange.', 'Để scramble kéo vào Leg Lock không nhận diện knee line.'],
      ['Chasing top while the neck is exposed.', 'Posting far and getting Kimura or arm-dragged.', 'Not resetting after winning the exchange.', 'Letting scrambles drift into Leg Locks without reading knee line.'],
      ['Chasser top avec cou exposé.', 'Poster loin et subir kimura/arm drag.', 'Ne pas reset après échange gagné.', 'Laisser scramble aller vers Leg Lock sans lire knee line.'],
    ),
    trainingPriorities: la(
      ['Scramble rounds có rule: thắng position rồi ổn định 5 giây.', 'Drill short posts và safe head position.', 'Luôn nối scramble với pin/back hoặc disengage.', 'Review lại scramble thua vì cổ, lưng hay knee line.'],
      ['Scramble rounds with a rule: win position and stabilize five seconds.', 'Drill short posts and safe head position.', 'Always connect scrambles to pin, back, or disengage.', 'Review whether scramble losses came from neck, back, or knee line.'],
      ['Rounds scramble: gagner position puis stabiliser 5 secondes.', 'Driller posts courts et head position sûre.', 'Connecter scramble à pin, back ou disengage.', 'Noter pertes: cou, dos ou knee line.'],
    ),
  }),
  archetype({
    id: 'submission-chain-hunter',
    title: lt('Thợ săn submission chain', 'Submission Chain Hunter', 'Chasseur de chaînes de soumission'),
    shortDescription: lt(
      'Xây submission bằng dilemma: Guillotine, Kimura, Back Take, Arm Triangle và RNC nối theo phản ứng.',
      'Builds submissions through dilemmas: Guillotine, Kimura, Back Take, Arm Triangle, and RNC chained by reaction.',
      'Construit les soumissions par dilemmes: Guillotine, Kimura, Back Take, Arm Triangle et RNC selon réactions.',
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
    coreSkillIds: ['Guillotine-system', 'kimura-system', 'arm-triangle-Mount', 'rear-naked-choke-system', 'back-control'],
    supportSkillIds: ['Mount-control', 'side-control-pin', 'snapdown-front-headlock', 'turtle-ride', 'heel-hook-finishing-system', 'calf-compression-locks', 'toe-hold-estima-lock', 'mounted-triangle-armbar'],
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
    title: lt('Counter grappler phòng thủ', 'Defensive Counter Grappler', 'Contre-grappler défensif'),
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
    coreSkillIds: ['side-control-survival', 'Mount-survival', 'back-survival', 'side-control-escape', 'Mount-escape', 'back-escape'],
    supportSkillIds: ['front-headlock-defense', 'leg-lock-safety-basics', 'technical-stand-up', 'scramble-control'],
    requiredDefensiveSkillIds: ['leg-lock-safety-basics', 'front-headlock-defense', 'back-survival', 'Mount-survival'],
    commonWeaknesses: la(
      ['Thoát muộn khi pin đã ổn định.', 'Frame bằng sức tay thay vì cấu trúc.', 'Recover Guard nhưng không giữ layer tiếp theo.', 'Không chuyển counter khi đối thủ overcommit.'],
      ['Escaping late after the pin is stable.', 'Framing with arm strength instead of structure.', 'Recovering Guard without keeping the next layer.', 'Not countering when the opponent overcommits.'],
      ['Sortir tard après pin stable.', 'Frame avec force des bras.', 'Récupérer garde sans garder couche suivante.', 'Ne pas contrer quand adversaire overcommit.'],
    ),
    trainingPriorities: la(
      ['Start-from-bad-position rounds mỗi tuần.', 'Escape-only round với tiêu chí thở và frame trước.', 'Ghi lại danger signal đầu tiên sau buổi tập.', 'Sau escape phải reset hoặc counter rõ ràng.'],
      ['Start-from-bad-position rounds every week.', 'Escape-only rounds where breathing and frames come first.', 'Record the first danger signal.', 'After escape, reset or counter clearly.'],
      ['Rounds départ mauvaise position chaque semaine.', 'Rounds escape-only avec respiration et frames d’abord.', 'Noter premier danger signal.', 'Après sortie, reset ou counter clairement.'],
    ),
  }),
]
