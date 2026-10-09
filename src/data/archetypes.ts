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
    title: lt('Người chơi Wrestle-Up', 'Wrestle-Up Player', 'Joueur wrestle-up'),
    shortDescription: lt(
      'Dùng Seated Guard, Shin-to-Shin và Half Guard để đứng dậy vào Single Leg thay vì nằm chờ sweep.',
      'Uses seated Guard, shin-to-shin, and Half Guard to rise into single legs instead of waiting for sweeps.',
      'Utilise seated Guard, shin-to-shin et Half Guard pour monter en single leg plutôt qu’attendre le sweep.',
    ),
    philosophy: lt(
      'Bạn biến Guard thành cửa vào wrestling. Mục tiêu là giữ cho đầu và hông còn hoạt động được, thắng underhook hoặc shin connection, rồi lên gối trước khi đối thủ khóa được chest-to-chest.',
      'You turn Guard into wrestling entries. The goal is to keep head and hips alive, win an underhook or shin connection, then come to a knee before the opponent locks chest-to-chest.',
      'Vous transformez la garde en entrées de lutte. Garder tête et hanches actives, gagner underhook ou connexion shin, puis monter au genou avant le chest-to-chest.',
    ),
    bestFor: la(
      ['Người thích gây áp lực chủ động khi ở dưới.', 'Người có thể lực tốt và muốn tạo ra những pha scramble trong tầm kiểm soát.', 'Người muốn từ Guard leo lên được thế trên.'],
      ['Players who like active bottom pressure.', 'Athletes with good pace who want controlled scrambles.', 'Practitioners who want Guard to lead to top position.'],
      ['Ceux qui aiment une pression active depuis bottom.', 'Athlètes avec bon rythme qui veulent des scrambles contrôlés.', 'Pratiquants qui veulent que la garde mène au top.'],
    ),
    notIdealFor: la(
      ['Người chưa bảo vệ được cổ khi lên Single Leg.', 'Người hay để đầu thấp trong Front Headlock.', 'Người ngại nhịp độ scramble.'],
      ['Players who cannot protect the neck while rising on single legs.', 'Players who drop their head into front headlocks.', 'Players who avoid scramble pace.'],
      ['Ceux qui protègent mal le cou en single leg.', 'Ceux qui baissent la tête dans Front Headlock.', 'Ceux qui évitent le rythme scramble.'],
    ),
    coreConceptIds: ['wrestle-up-philosophy', 'inside-position', 'head-position', 'base-balance', 'failure-response'],
    coreSkillIds: ['seated-Guard-retention', 'shin-to-shin-entry', 'half-Guard-wrestle-up', 'single-leg-bjj', 'bodylock-passing', 'back-control'],
    supportSkillIds: ['technical-stand-up', 'butterfly-Guard-off-balance', 'hand-fighting', 'mat-return-basics', 'scramble-control', 'bjj-foot-sweeps', 'double-leg-bjj'],
    requiredDefensiveSkillIds: ['front-headlock-defense', 'sprawl-go-behind', 'side-control-escape', 'back-escape'],
    commonWeaknesses: la(
      ['Bị Guillotine vì cúi đầu thấp.', 'Lên gối nhưng không khóa được đường hông.', 'Vẫn tấn công Single Leg khi đã mất kết nối khuỷu-gối.', 'Scramble quá lâu dù đã lên được thế trên.'],
      ['Guillotined when the head drops.', 'Coming to a knee without controlling the hip line.', 'Attacking single legs after elbow-knee connection is lost.', 'Scrambling too long after top position is available.'],
      ['Guillotine quand la tête tombe.', 'Monter au genou sans contrôler hip line.', 'Attaquer single leg après perte coude-genou.', 'Scrambler trop longtemps quand top est disponible.'],
    ),
    trainingPriorities: la(
      ['Drill phòng thủ Front Headlock trước mỗi block Wrestle-Up.', 'Tập giữ Seated Guard với mục tiêu lên gối.', 'Chạy round pass-or-wrestle-up 3 phút.', 'Xem lại xem mình kẹt ở vị trí đầu hay đường hông.'],
      ['Drill Front Headlock defense before every wrestle-up block.', 'Train seated Guard retention with the goal of coming to a knee.', 'Run three-minute pass-or-wrestle-up rounds.', 'Review whether failures came from head position or hip line.'],
      ['Driller Front Headlock defense avant chaque bloc wrestle-up.', 'Travailler seated Guard retention avec objectif monter au genou.', 'Faire rounds pass-or-wrestle-up de 3 minutes.', 'Revoir si l’échec vient tête ou hip line.'],
    ),
  }),
  archetype({
    id: 'pressure-passer',
    title: lt('Pressure Passer', 'Pressure Passer', 'Passeur pression'),
    shortDescription: lt(
      'Ưu tiên Bodylock, Headquarters và Knee Cut để khóa đường hông trước khi vượt chân.',
      'Prioritizes Bodylock, headquarters, and Knee Cut passing to lock the hip line before clearing legs.',
      'Priorise Bodylock, headquarters et Knee Cut pour verrouiller la hip line avant de passer les jambes.',
    ),
    philosophy: lt(
      'Pass không phải là chạy vòng quanh chân. Nó lấy đi khả năng xoay hông, dựng frame và đưa gối vào lại của đối thủ; áp lực đi chéo qua ngực, vai và vị trí đầu.',
      'Passing is not running around legs; it removes the opponent’s ability to rotate hips, frame, and reinsert knees. Pressure travels diagonally through chest, shoulder, and head position.',
      'Passer n’est pas courir autour des jambes; c’est enlever rotation de hanches, frames et réinsertion du genou. La pression va en diagonale par poitrine, épaule et tête.',
    ),
    bestFor: la(
      ['Người thích kiểm soát thế trên với nhịp chậm mà chắc.', 'Người muốn sau mỗi pass là vào ngay Side Control hoặc Mount.', 'Người giữ được áp lực mà không lao người quá đà.'],
      ['Players who like top control and steady tempo.', 'Players who want passes to connect directly to pins.', 'Players who can pressure without overcommitting.'],
      ['Ceux qui aiment top control et tempo solide.', 'Ceux qui veulent connecter pass et pin.', 'Ceux qui peuvent presser sans trop s’engager.'],
    ),
    notIdealFor: la(
      ['Người chưa nắm an toàn Leg Lock khi áp sát.', 'Người hay để đầu vào giữa hai tay đối thủ.', 'Người chỉ thích di chuyển nhanh ở vòng ngoài.'],
      ['Players without Leg Lock safety in close range.', 'Players who center their head between the opponent’s arms.', 'Players who only want fast outside movement.'],
      ['Ceux sans sécurité Leg Lock en close range.', 'Ceux qui centrent la tête entre les bras adverses.', 'Ceux qui veulent seulement mouvement outside rapide.'],
    ),
    coreConceptIds: ['connection-before-control', 'pressure-direction', 'inside-position', 'wedges', 'positional-hierarchy'],
    coreSkillIds: ['bodylock-passing', 'headquarters-passing', 'knee-cut-passing', 'side-control-pin', 'Mount-control', 'arm-triangle-Mount'],
    supportSkillIds: ['hand-fighting', 'leg-drag-basics', 'outside-passing', 'mat-return-basics', 'back-control', 'toreando-passing', 'tripod-folding-pass', 'over-under-pass'],
    requiredDefensiveSkillIds: ['leg-lock-safety-basics', 'heel-hook-safety', 'front-headlock-defense', 'scramble-control'],
    commonWeaknesses: la(
      ['Bị Butterfly nâng lên vì trọng lượng dồn quá cao.', 'Bị Shoulder Crunch vì để đầu vào giữa.', 'Vượt được đường gối rồi thả kiểm soát quá sớm.', 'Đè thẳng xuống thay vì đè chéo.'],
      ['Getting butterfly lifted because weight is too high.', 'Getting shoulder-crunched because the head is centered.', 'Releasing control too early after clearing the knee line.', 'Driving straight down instead of diagonal pressure.'],
      ['Se faire lever par butterfly car poids trop haut.', 'Subir Shoulder Crunch car tête centrée.', 'Relâcher trop tôt après avoir passé knee line.', 'Presser droit vers le bas au lieu de diagonale.'],
    ),
    trainingPriorities: la(
      ['Tập Bodylock với mục tiêu dập hook trước khi pass.', 'Round Headquarters: chỉ tính là qua khi đã kiểm soát đường hông.', 'Sau mỗi pass phải giữ Side Control 10 giây.', 'Xem lại xem đối thủ gỡ Guard bằng knee shield hay underhook.'],
      ['Train Bodylock with the goal of killing hooks before passing.', 'Headquarters rounds where the passer can score only after hip-line control.', 'After every pass, hold Side Control for ten seconds.', 'Review whether Guard recovery came from knee shield or underhook.'],
      ['Travailler Bodylock en tuant hooks avant passer.', 'Rounds headquarters avec score seulement après contrôle hip line.', 'Après chaque pass, tenir Side Control dix secondes.', 'Voir si la récupération vient knee shield ou underhook.'],
    ),
  }),
  archetype({
    id: 'front-headlock-player',
    title: lt('Người chơi Front Headlock', 'Front Headlock Player', 'Joueur Front Headlock'),
    shortDescription: lt(
      'Dùng hand fighting, snapdown và dilemma go-behind/Guillotine để phạt tư thế cúi thấp.',
      'Uses hand fighting, snapdowns, and go-behind or Guillotine dilemmas to punish low posture.',
      'Utilise hand fighting, snapdown et dilemme go-behind/Guillotine pour punir posture basse.',
    ),
    philosophy: lt(
      'Front Headlock tốt không chỉ là bóp cổ. Nó là kiểm soát đầu, đường khuỷu và góc hông, buộc đối thủ phải chọn giữa bảo vệ cổ, chống go-behind hoặc gượng lại tư thế.',
      'A good Front Headlock is not only squeezing the neck. It controls head, elbow line, and hip angle so the opponent must choose between neck defense, go-behind defense, or posture recovery.',
      'Un bon Front Headlock n’est pas juste serrer le cou. Il contrôle tête, elbow line et angle de hanches pour forcer défense du cou, go-behind ou posture.',
    ),
    bestFor: la(
      ['Người thích wrestling tie và snapdown.', 'Người muốn mối đe dọa submission luôn nối với Back Take.', 'Người phản ứng tốt trong scramble quanh đầu và cổ.'],
      ['Players who like wrestling ties and snapdowns.', 'Players who want submission threats connected to Back Takes.', 'Players who react well in head-and-neck scrambles.'],
      ['Ceux qui aiment ties de lutte et snapdowns.', 'Ceux qui veulent connecter soumission et Back Take.', 'Ceux qui réagissent bien dans scrambles tête-cou.'],
    ),
    notIdealFor: la(
      ['Người chưa kiểm soát được lực siết cổ an toàn.', 'Người giữ Guillotine quá lâu sau khi đã mất góc.', 'Người chưa có phương án nối tiếp khi mất Back Control.'],
      ['Players who cannot control neck pressure safely.', 'Players who hold Guillotines too long after losing angle.', 'Players without back-control follow-up.'],
      ['Ceux qui contrôlent mal la pression du cou.', 'Ceux qui gardent Guillotine trop longtemps après perte angle.', 'Ceux sans follow-up back control.'],
    ),
    coreConceptIds: ['head-position', 'dilemma-attacks', 'control-before-submission', 'early-vs-late-defense', 'failure-response'],
    coreSkillIds: ['hand-fighting', 'snapdown-front-headlock', 'Guillotine-system', 'sprawl-go-behind', 'back-control', 'rear-naked-choke-system'],
    supportSkillIds: ['single-leg-bjj', 'turtle-ride', 'mat-return-basics', 'scramble-control', 'chin-strap-control'],
    requiredDefensiveSkillIds: ['front-headlock-defense', 'back-survival', 'leg-lock-safety-basics'],
    commonWeaknesses: la(
      ['Chin strap còn nông nhưng vẫn siết.', 'Vẫn đuổi Guillotine khi đối thủ đã qua sang bên an toàn.', 'Không chuyển sang go-behind khi đầu đối thủ thoát ra.', 'Dùng lực cổ thay vì góc hông và kiểm soát khuỷu.'],
      ['Squeezing with a shallow chin strap.', 'Chasing Guillotine after the opponent passes to the correct side.', 'Not switching to go-behind when the head exits.', 'Using neck force instead of hip angle and elbow control.'],
      ['Serrer avec chin strap peu profond.', 'Chasser Guillotine après le bon side pass.', 'Ne pas passer go-behind quand la tête sort.', 'Utiliser force du cou au lieu angle hanches et coude.'],
    ),
    trainingPriorities: la(
      ['Chạy round Front Headlock, chuyển qua lại giữa go-behind và Guillotine.', 'Tập phòng thủ để biết khi nào lực siết cổ trở nên nguy hiểm.', 'Drill snapdown kèm động tác lấy lại tư thế an toàn.', 'Không finish đòn cổ ở tốc độ live khi chưa kiểm soát được.'],
      ['Run Front Headlock rounds switching between go-behind and Guillotine.', 'Train defense to understand when neck pressure becomes dangerous.', 'Drill snapdowns with safe posture reset.', 'Do not finish neck attacks at live speed without control.'],
      ['Faire rounds Front Headlock entre go-behind et Guillotine.', 'Travailler défense pour lire danger cou.', 'Driller snapdown avec reset posture sûr.', 'Ne pas finir attaque du cou vite sans contrôle.'],
    ),
  }),
  archetype({
    id: 'back-control-finisher',
    title: lt('Finisher Back Control', 'Back Control Finisher', 'Finisseur back control'),
    shortDescription: lt(
      'Tập trung lấy lưng, giữ chest-to-back, thắng hand fight và finish RNC trong tầm kiểm soát.',
      'Focuses on taking the back, keeping chest-to-back, winning hand fights, and finishing controlled RNCs.',
      'Se concentre sur prendre le dos, garder chest-to-back, gagner hand fight et finir RNC contrôlé.',
    ),
    philosophy: lt(
      'Back Control là nơi phân cấp vị trí gặp submission. Người chơi này không săn cổ trước: họ khóa đường vai, giữ hook và thắng hand fighting rồi mới mở đòn siết.',
      'Back control is where positional hierarchy meets submission. This player does not chase the neck first; they lock shoulder line, hook retention, and hand fighting before opening the strangle.',
      'Back control relie hiérarchie et soumission. Ce joueur ne chasse pas le cou d’abord; il verrouille shoulder line, hooks et hand fight avant le strangle.',
    ),
    bestFor: la(
      ['Người kiên nhẫn khi kiểm soát.', 'Người thích những submission có xác suất cao.', 'Người muốn biến Turtle, Mount và scramble thành Back Take.'],
      ['Patient control players.', 'Players who prefer high-percentage submissions.', 'Players who want Turtle, Mount, and scrambles to become Back Takes.'],
      ['Joueurs patients en contrôle.', 'Ceux qui aiment soumissions haute probabilité.', 'Ceux qui transforment Turtle, Mount et scrambles en Back Takes.'],
    ),
    notIdealFor: la(
      ['Người siết RNC trước khi thắng hand fight.', 'Người dễ mất hook khi đối thủ xoay vai.', 'Người không có phương án chuyển sang Mount khi mất lưng.'],
      ['Players who squeeze RNC before winning the hand fight.', 'Players who lose hooks when shoulders rotate.', 'Players without Mount transition when the back is lost.'],
      ['Ceux qui serrent RNC avant hand fight.', 'Ceux qui perdent hooks quand épaules tournent.', 'Ceux sans transition Mount quand le dos est perdu.'],
    ),
    coreConceptIds: ['control-before-submission', 'hooks', 'connection-before-control', 'dilemma-attacks', 'failure-response'],
    coreSkillIds: ['back-control', 'rear-naked-choke-system', 'turtle-ride', 'Mount-control', 'arm-triangle-Mount'],
    supportSkillIds: ['hand-fighting', 'mat-return-basics', 'scramble-control', 'kimura-system'],
    requiredDefensiveSkillIds: ['back-survival', 'back-escape', 'Mount-survival'],
    commonWeaknesses: la(
      ['Vẫn đuổi đòn siết sau khi đã mất chest-to-back.', 'Không gỡ lại top hook trước khi đối thủ đặt vai xuống thảm.', 'Hand fight sai thứ tự.', 'Body Triangle hoặc hook quá cứng nên mất luôn khả năng chuyển thế.'],
      ['Chasing the choke after chest-to-back is lost.', 'Not recovering the top hook before the opponent gets shoulders to the mat.', 'Hand fighting in the wrong order.', 'Using hooks or Body Triangle so rigidly that transitions disappear.'],
      ['Chasser choke après perte chest-to-back.', 'Ne pas récupérer top hook avant épaules au sol.', 'Mauvais ordre de hand fight.', 'Hooks/Body Triangle trop rigides qui bloquent transitions.'],
    ),
    trainingPriorities: la(
      ['Round giữ lưng: chỉ tính điểm khi vẫn giữ được lưng sau một lần đối thủ thoát.', 'Chạy trình tự hand fight trước mọi drill RNC.', 'Tập chuyển sang Mount khi mất lưng thay vì siết muộn.', 'Ghi lại cách đối thủ thoát: gỡ hook, hạ vai xuống thảm hay bẻ tay.'],
      ['Back-retention rounds score only if the back is held after an escape attempt.', 'Hand-fight sequence before every RNC drill.', 'Train losing back into Mount instead of late squeezing.', 'Record how opponents escape: clear hook, shoulders to mat, or peel hand.'],
      ['Rounds back retention: score si dos gardé après tentative sortie.', 'Séquence hand fight avant chaque RNC drill.', 'Travailler perte du dos vers Mount au lieu squeeze tardif.', 'Noter sortie: hook, épaules au sol ou peel hand.'],
    ),
  }),
  archetype({
    id: 'leg-lock-safety-first',
    title: lt('An toàn Leg Lock trước tiên', 'Leg Lock Safety First', 'Sécurité Leg Lock d’abord'),
    shortDescription: lt(
      'Ưu tiên nhận diện đường gối, lúc nào gót bị hở và khi nào phải tap, trước khi tấn công chân.',
      'Prioritizes knee-line recognition, heel exposure, and tap timing before leg attacks.',
      'Priorise reconnaissance knee line, talon exposé et timing de tap avant attaques de jambes.',
    ),
    philosophy: lt(
      'Leg entanglement vừa là vùng học kỹ thuật vừa là vùng phải giữ an toàn. Bạn học theo thứ tự: nhận diện, giấu gót, gỡ đường gối, rồi mới nghĩ tới phản đòn hay tấn công.',
      'Leg entanglements are technical learning zones and safety zones. You learn the order: recognize, hide the heel, free the knee line, then consider countering or offense.',
      'Les entanglements sont techniques et sécurité. Ordre: reconnaître, cacher talon, libérer knee line, puis seulement counter ou attaque.',
    ),
    bestFor: la(
      ['Người mới bước vào Leg Lock.', 'Người tập ở phòng có nhiều ashi và saddle.', 'Người muốn thi đấu ở ruleset cho phép Heel Hook.'],
      ['Players entering the Leg Lock game.', 'Practitioners in rooms with lots of ashi or Saddle.', 'Competitors in rulesets with Heel Hooks.'],
      ['Ceux qui entrent dans le Leg Lock game.', 'Salles avec beaucoup ashi/saddle.', 'Compétiteurs ruleset avec Heel Hooks.'],
    ),
    notIdealFor: la(
      ['Người muốn học đòn kết thúc nguy hiểm trước khi học an toàn.', 'Người không tap sớm khi bị lực xoắn.', 'Người tập submission chân mà không có người giám sát.'],
      ['Players who want dangerous finishes before safety.', 'Players who do not tap early to rotational force.', 'Players training leg submissions without supervision.'],
      ['Ceux qui veulent finish dangereux avant sécurité.', 'Ceux qui ne tapent pas tôt sous rotation.', 'Ceux qui travaillent jambes sans supervision.'],
    ),
    coreConceptIds: ['leg-lock-safety-hierarchy', 'knee-line', 'early-vs-late-defense', 'inside-position', 'deliberate-practice'],
    coreSkillIds: ['leg-lock-safety-basics', 'straight-ankle-lock-safety', 'heel-hook-safety', 'single-leg-x-basics', 'k-Guard-entry'],
    supportSkillIds: ['Guard-pulling-strategy', 'supine-Guard-retention', 'technical-stand-up', 'heel-hook-finishing-system', 'calf-compression-locks', 'toe-hold-estima-lock'],
    requiredDefensiveSkillIds: ['leg-lock-safety-basics', 'heel-hook-safety', 'straight-ankle-lock-safety'],
    commonWeaknesses: la(
      ['Xoay người khi gót đang hở và đường gối còn bị kẹt.', 'Không gỡ được chân còn lại.', 'Tấn công chân khi chưa hiểu ruleset.', 'Coi đau là tín hiệu duy nhất thay vì đọc vị trí từ sớm.'],
      ['Rotating while heel is exposed and knee line is trapped.', 'Failing to clear the secondary leg.', 'Attacking legs without understanding ruleset.', 'Treating pain as the first signal instead of reading position early.'],
      ['Tourner talon exposé et knee line piégée.', 'Ne pas libérer jambe secondaire.', 'Attaquer jambes sans ruleset.', 'Attendre douleur au lieu lire position tôt.'],
    ),
    trainingPriorities: la(
      ['Luôn mở đầu bằng round thoát đường gối với tốc độ chậm.', 'Nói rõ mức độ mạnh nhẹ trước khi drill Heel Hook.', 'Tap sớm khi không chắc hướng lực.', 'Không crank submission chân trong tập.'],
      ['Always begin with slow knee-line escape rounds.', 'State intensity clearly before Heel Hook drilling.', 'Tap early when force direction is unclear.', 'Never crank leg submissions in training.'],
      ['Toujours commencer par sorties knee line lentes.', 'Clarifier intensité avant Heel Hook drill.', 'Taper tôt si direction de force floue.', 'Ne jamais forcer leg submissions à l’entraînement.'],
    ),
  }),
  archetype({
    id: 'Guard-retention-specialist',
    title: lt('Chuyên gia giữ Guard', 'Guard Retention Specialist', 'Spécialiste rétention de garde'),
    shortDescription: lt(
      'Xây Guard theo từng lớp: bàn chân, cẳng chân, gối, frame, hông và pummeling, để passer không khóa được chest-to-chest.',
      'Builds Guard around layers: feet, shins, knees, frames, hips, and pummeling so passers cannot lock chest-to-chest.',
      'Construit la garde en couches: pieds, tibias, genoux, frames, hanches et pummel pour empêcher chest-to-chest.',
    ),
    philosophy: lt(
      'Giữ Guard là một hệ thống dựng lại cấu trúc. Bạn không chỉ cố giữ Guard, mà đọc được hướng pass, bảo vệ đầu gối phía trong, dựng frame và phản công ngay khi passer lao quá đà.',
      'Guard retention is a structure-recovery system. You do not only keep Guard; you read pass lines, protect inside knee, frame, and attack when the passer overcommits.',
      'La rétention est un système de reconstruction. Lire pass line, protéger inside knee, frame et attaquer quand le passer overcommit.',
    ),
    bestFor: la(
      ['Người hay bị pressure passer vượt qua.', 'Người muốn Guard bền trước khi học những đòn tấn công phức tạp.', 'Người nhỏ con cần góc và frame.'],
      ['Players often passed by pressure passers.', 'Players who want durable Guard before complex offense.', 'Smaller players who need angles and frames.'],
      ['Ceux souvent passés par pressure passers.', 'Ceux qui veulent garde solide avant offense complexe.', 'Petits gabarits qui ont besoin angles et frames.'],
    ),
    notIdealFor: la(
      ['Người chỉ muốn submission từ dưới mà bỏ qua tư thế.', 'Người không muốn tập độ linh hoạt của hông.', 'Người duỗi thẳng tay khi dựng frame.'],
      ['Players who only chase bottom submissions while ignoring posture.', 'Players unwilling to train hip mobility.', 'Players who frame with long extended arms.'],
      ['Ceux qui chassent soumissions bottom sans posture.', 'Ceux qui évitent mobilité hanches.', 'Ceux qui framment bras tendus.'],
    ),
    coreConceptIds: ['Guard-retention-layers', 'frames', 'wedges', 'inside-position', 'elbow-knee-connection'],
    coreSkillIds: ['seated-Guard-retention', 'supine-Guard-retention', 'half-Guard-knee-shield', 'butterfly-Guard-off-balance', 'technical-stand-up'],
    supportSkillIds: ['shin-to-shin-entry', 'single-leg-x-basics', 'k-Guard-entry', 'half-Guard-wrestle-up'],
    requiredDefensiveSkillIds: ['side-control-survival', 'side-control-escape', 'Mount-survival'],
    commonWeaknesses: la(
      ['Frame bằng tay thẳng thay vì cấu trúc cẳng tay và gối.', 'Mất đầu gối phía trong mà vẫn cố đẩy đầu.', 'Không chuyển từ giữ Guard sang làm mất thăng bằng đối thủ.', 'Chỉ gỡ lại Guard mà không tạo ra đe dọa nào.'],
      ['Framing with straight arms instead of forearm or knee structure.', 'Losing inside knee and still trying to push the head.', 'Not converting retention into off-balancing.', 'Recovering Guard without creating threats.'],
      ['Frame bras tendus au lieu structure avant-bras/genou.', 'Perdre inside knee et pousser la tête quand même.', 'Ne pas convertir rétention en off-balance.', 'Récupérer sans créer menace.'],
    ),
    trainingPriorities: la(
      ['Round giữ Guard, để passer tự chọn hướng pass.', 'Drill gỡ gối và khuỷu về trước khi sweep.', 'Sau mỗi lần giữ Guard thành công phải thêm một đòn tấn công.', 'Ghi lại xem hướng pass nào phá được lớp nào.'],
      ['Guard-retention rounds where passer chooses pass line.', 'Drill knee-elbow recovery before sweeps.', 'Add one attack after every retention success.', 'Record which pass beat which layer.'],
      ['Rounds rétention où passer choisit pass line.', 'Driller récupération genou-coude avant sweeps.', 'Ajouter une attaque après chaque succès.', 'Noter quel pass bat quelle couche.'],
    ),
  }),
  archetype({
    id: 'half-Guard-wrestler',
    title: lt('Vật sĩ Half Guard', 'Half Guard Wrestler', 'Lutteur Half Guard'),
    shortDescription: lt(
      'Dùng knee shield, underhook và logic Dogfight để biến Half Guard thành sweep, Single Leg hoặc cơ hội lấy lưng.',
      'Uses knee shield, underhook, and Dogfight logic to turn Half Guard into sweeps, single legs, or back exposure.',
      'Utilise knee shield, underhook et logique Dogfight pour transformer Half Guard en sweep, single leg ou back exposure.',
    ),
    philosophy: lt(
      'Half Guard không phải chỗ để nằm chịu đè. Bạn dùng knee shield để không bị ép bẹp, dùng underhook để thắng đường vai, rồi vào Dogfight hoặc Single Leg trước khi crossface ổn định.',
      'Half Guard is not a place to accept being flattened. You use knee shield to prevent flattening, underhook to win shoulder line, then enter Dogfight or single leg before the crossface settles.',
      'Half Guard n’est pas accepter d’être aplati. Knee shield contre flatten, underhook gagne shoulder line, puis dogfight/single leg avant crossface stable.',
    ),
    bestFor: la(
      ['Người thích wrestling từ thế dưới ở Half Guard.', 'Người hay bị Bodylock hoặc Knee Cut.', 'Người muốn sau sweep là vào ngay passing.'],
      ['Players who like bottom wrestling from Half Guard.', 'Players often hit by Bodylock or Knee Cut.', 'Players who want sweeps connected to passing.'],
      ['Ceux qui aiment lutter depuis Half Guard.', 'Ceux qui subissent bodylock/knee cut.', 'Ceux qui veulent connecter sweep et passing.'],
    ),
    notIdealFor: la(
      ['Người hay để đối thủ crossface sâu.', 'Người không pummel lấy underhook từ sớm.', 'Người lên Dogfight nhưng bỏ kiểm soát hông.'],
      ['Players who allow deep crossface.', 'Players who do not pummel underhook early.', 'Players who rise to Dogfight without hip control.'],
      ['Ceux qui laissent crossface profond.', 'Ceux qui ne pummel pas underhook tôt.', 'Ceux qui montent Dogfight sans hip control.'],
    ),
    coreConceptIds: ['wedges', 'pummeling', 'wrestle-up-philosophy', 'hip-line-shoulder-line', 'failure-response'],
    coreSkillIds: ['half-Guard-knee-shield', 'half-Guard-wrestle-up', 'single-leg-bjj', 'bodylock-passing', 'scramble-control'],
    supportSkillIds: ['seated-Guard-retention', 'side-control-escape', 'technical-stand-up', 'hand-fighting', 'coyote-half-Guard'],
    requiredDefensiveSkillIds: ['side-control-survival', 'front-headlock-defense', 'Mount-escape'],
    commonWeaknesses: la(
      ['Knee shield đặt quá thấp nên bị ép bẹp.', 'Thắng underhook nhưng vẫn để đầu thấp.', 'Vào Dogfight mà không kiểm soát hông phía xa.', 'Bỏ lỡ nhịp chuyển sang Single Leg khi đối thủ backstep.'],
      ['Knee shield too low and getting flattened.', 'Winning underhook while the head remains low.', 'Dogfight without far-hip control.', 'Missing the single-leg transition when they backstep.'],
      ['Knee shield trop bas et flatten.', 'Underhook gagné mais tête basse.', 'Dogfight sans contrôle far hip.', 'Rater single leg quand il backstep.'],
    ),
    trainingPriorities: la(
      ['Drill chống crossface bằng knee shield và tay phía trong.', 'Round Dogfight bắt đầu từ tư thế underhook 50%.', 'Mất underhook thì phải giữ Guard lại trước khi wrestle-up.', 'Kết thúc mỗi sweep bằng pass hoặc pin.'],
      ['Drill crossface prevention with knee shield and inside hand.', 'Dogfight rounds starting from a 50% underhook.', 'If underhook is lost, retain before wrestling up.', 'Finish every sweep with pass or pin.'],
      ['Driller prevention crossface avec knee shield et main inside.', 'Rounds Dogfight depuis underhook 50%.', 'Si underhook perdu, retenir avant wrestle-up.', 'Finir chaque sweep par pass ou pin.'],
    ),
  }),
  archetype({
    id: 'scramble-controller',
    title: lt('Người kiểm soát scramble', 'Scramble Controller', 'Contrôleur de scramble'),
    shortDescription: lt(
      'Biến scramble thành cuộc đua giành thứ tự ưu tiên: vị trí đầu, kiểm soát hông, tay chân phía trong và việc lộ lưng.',
      'Turns scrambles into priority races: head position, hip control, inside limbs, and back exposure.',
      'Transforme scramble en courses de priorités: tête, hanches, membres inside et dos exposé.',
    ),
    philosophy: lt(
      'Scramble không hề hỗn loạn nếu bạn biết các mốc cần kiểm tra. Bạn thắng bằng cách post tay ngắn, giữ đầu luôn trên hông đối thủ, không để lộ cổ hay chân, và chuyển thế ngay khi đối thủ quay lưng lại.',
      'Scramble is not chaos when you know checkpoints. You win by posting short, keeping head above hips, protecting neck and legs, and transitioning as soon as the opponent exposes the back.',
      'Scramble n’est pas chaos avec checkpoints. Post court, tête au-dessus hanches, protéger cou/jambes, et transiter quand le dos s’ouvre.',
    ),
    bestFor: la(
      ['Người có tốc độ và đổi nhịp nhanh.', 'Người hay gặp wrestler hoặc dân scramble.', 'Người muốn biến phòng thủ thành tấn công.'],
      ['Fast players who can change phases.', 'Players facing wrestlers or scramblers.', 'Players who want defense to become offense.'],
      ['Joueurs rapides capables de changer phase.', 'Ceux qui affrontent lutteurs/scramblers.', 'Ceux qui veulent transformer défense en attaque.'],
    ),
    notIdealFor: la(
      ['Người cuống khi bị mất vị trí.', 'Người post tay quá xa.', 'Người chưa an toàn trong leg entanglement và Front Headlock.'],
      ['Players who panic when position changes.', 'Players who post long arms.', 'Players lacking leg-entanglement and front-headlock safety.'],
      ['Ceux qui paniquent quand position change.', 'Ceux qui postent bras longs.', 'Ceux sans sécurité leg entanglement/Front Headlock.'],
    ),
    coreConceptIds: ['base-balance', 'posts', 'head-position', 'failure-response', 'early-vs-late-defense'],
    coreSkillIds: ['scramble-control', 'sprawl-go-behind', 'mat-return-basics', 'back-control', 'single-leg-bjj', 'double-leg-bjj'],
    supportSkillIds: ['technical-stand-up', 'hand-fighting', 'turtle-ride', 'front-headlock-defense'],
    requiredDefensiveSkillIds: ['front-headlock-defense', 'leg-lock-safety-basics', 'back-survival'],
    commonWeaknesses: la(
      ['Đuổi theo thế trên khi cổ đang hở.', 'Post tay xa nên bị Kimura hoặc arm drag.', 'Không lấy lại thế sau khi thắng một nhịp.', 'Để scramble trôi vào Leg Lock mà không nhận diện đường gối.'],
      ['Chasing top while the neck is exposed.', 'Posting far and getting Kimura or arm-dragged.', 'Not resetting after winning the exchange.', 'Letting scrambles drift into Leg Locks without reading knee line.'],
      ['Chasser top avec cou exposé.', 'Poster loin et subir kimura/arm drag.', 'Ne pas reset après échange gagné.', 'Laisser scramble aller vers Leg Lock sans lire knee line.'],
    ),
    trainingPriorities: la(
      ['Round scramble có luật: thắng vị trí rồi phải giữ ổn định 5 giây.', 'Drill post tay ngắn và giữ đầu an toàn.', 'Luôn kết thúc scramble bằng pin, lấy lưng hoặc tách ra hẳn.', 'Xem lại xem thua scramble vì cổ, vì lưng hay vì đường gối.'],
      ['Scramble rounds with a rule: win position and stabilize five seconds.', 'Drill short posts and safe head position.', 'Always connect scrambles to pin, back, or disengage.', 'Review whether scramble losses came from neck, back, or knee line.'],
      ['Rounds scramble: gagner position puis stabiliser 5 secondes.', 'Driller posts courts et head position sûre.', 'Connecter scramble à pin, back ou disengage.', 'Noter pertes: cou, dos ou knee line.'],
    ),
  }),
  archetype({
    id: 'submission-chain-hunter',
    title: lt('Thợ săn chuỗi submission', 'Submission Chain Hunter', 'Chasseur de chaînes de soumission'),
    shortDescription: lt(
      'Xây chuỗi submission bằng dilemma: Guillotine, Kimura, Back Take, Arm Triangle rồi RNC, nối nhau theo phản ứng của đối thủ.',
      'Builds submissions through dilemmas: Guillotine, Kimura, Back Take, Arm Triangle, and RNC chained by reaction.',
      'Construit les soumissions par dilemmes: Guillotine, Kimura, Back Take, Arm Triangle et RNC selon réactions.',
    ),
    philosophy: lt(
      'Bạn không săn một đòn kết thúc duy nhất. Bạn tách riêng một hướng, để đối thủ phòng thủ đúng cách, rồi dùng chính phản ứng đó để chuyển sang submission hoặc thế kiểm soát tốt hơn.',
      'You do not hunt one finish. You isolate one line, let the opponent defend correctly, then use that reaction to switch to a better submission or control.',
      'Vous ne chassez pas un seul finish. Isoler une ligne, laisser la bonne défense, puis utiliser la réaction vers meilleure soumission ou contrôle.',
    ),
    bestFor: la(
      ['Người đã có nền kiểm soát vững.', 'Người thích đọc phản ứng và nối đòn.', 'Người muốn ăn submission mà vẫn giữ được vị trí.'],
      ['Players with foundational control.', 'Players who like reactions and chain attacks.', 'Players who want submissions while keeping position.'],
      ['Ceux avec contrôle de base.', 'Ceux qui aiment réactions et chaînes.', 'Ceux qui veulent soumettre sans perdre position.'],
    ),
    notIdealFor: la(
      ['Người bỏ qua kiểm soát để lao vào submission.', 'Người crank khi chưa rõ đòn kết thúc.', 'Người chưa an toàn khi bị phản đòn.'],
      ['Players who skip control before submission.', 'Players who crank when the finish is unclear.', 'Players without defensive safety when counters happen.'],
      ['Ceux qui sautent contrôle avant soumission.', 'Ceux qui forcent quand finish flou.', 'Ceux sans safety défensive face aux counters.'],
    ),
    coreConceptIds: ['control-before-submission', 'dilemma-attacks', 'levers', 'angle-creation', 'connection-before-control'],
    coreSkillIds: ['Guillotine-system', 'kimura-system', 'arm-triangle-Mount', 'rear-naked-choke-system', 'back-control'],
    supportSkillIds: ['Mount-control', 'side-control-pin', 'snapdown-front-headlock', 'turtle-ride', 'heel-hook-finishing-system', 'calf-compression-locks', 'toe-hold-estima-lock', 'mounted-triangle-armbar'],
    requiredDefensiveSkillIds: ['front-headlock-defense', 'back-survival', 'leg-lock-safety-basics'],
    commonWeaknesses: la(
      ['Siết trước khi tách được tay đối thủ.', 'Nhảy vào submission rồi mất luôn pin.', 'Không biết nhánh tiếp theo khi đối thủ giấu khuỷu.', 'Tăng lực thay vì đổi góc.'],
      ['Squeezing before isolation.', 'Jumping submission and losing the pin.', 'Not knowing the next branch when the elbow hides.', 'Adding force instead of changing angle.'],
      ['Serrer avant isolation.', 'Sauter soumission et perdre pin.', 'Ne pas savoir branche suivante quand coude caché.', 'Ajouter force au lieu angle.'],
    ),
    trainingPriorities: la(
      ['Round kiểm soát trước submission: 20 giây đầu không được finish.', 'Drill hai nhánh cho mỗi phản ứng.', 'Dừng finish ngay khi thấy dấu hiệu mất an toàn.', 'Xem lại: finish hỏng vì chưa tách tay, vì góc hay vì mất kiểm soát?'],
      ['Control-before-submission rounds: no finishing in first twenty seconds.', 'Drill two branches for every reaction.', 'Stop finishing when a safety signal appears.', 'Review whether failed finishes came from isolation, angle, or control.'],
      ['Rounds contrôle avant soumission: pas de finish 20 premières secondes.', 'Driller deux branches par réaction.', 'Arrêter si signal sécurité.', 'Review: échec par isolation, angle ou contrôle?'],
    ),
  }),
  archetype({
    id: 'defensive-counter-grappler',
    title: lt('Counter Grappler phòng thủ', 'Defensive Counter Grappler', 'Contre-grappler défensif'),
    shortDescription: lt(
      'Ưu tiên sống sót, thoát thế, nhận diện nguy hiểm và phản đòn sau khi đối thủ lao quá đà.',
      'Prioritizes survival, escapes, safety recognition, and counters after the opponent overcommits.',
      'Priorise survie, sorties, reconnaissance danger et counters après overcommit adverse.',
    ),
    philosophy: lt(
      'Phòng thủ không phải là ngồi chờ thua. Bạn dựng phòng thủ từ sớm, nhận diện tín hiệu nguy hiểm, lấy lại cấu trúc và phản công khi đối thủ mất nền hoặc bỏ đường hông.',
      'Defense is not waiting to lose. You build early defense, recognize danger signals, recover structure, and counter when the opponent loses base or abandons hip line.',
      'La défense n’est pas attendre de perdre. Construire early defense, lire danger, reconstruire, puis contrer quand l’adversaire perd base ou hip line.',
    ),
    bestFor: la(
      ['Người mới cần bớt cuống.', 'Người hay bị pin hoặc bị submission.', 'Người muốn lối đánh ít rủi ro và bền.'],
      ['Beginners who need less panic.', 'Players often pinned or submitted.', 'Players who want a durable low-risk game.'],
      ['Débutants qui veulent moins paniquer.', 'Ceux souvent pinnés ou soumis.', 'Ceux qui veulent jeu durable peu risqué.'],
    ),
    notIdealFor: la(
      ['Người chỉ phòng thủ mà không học cách chuyển sang tấn công.', 'Người tap quá muộn để tỏ ra cứng.', 'Người không ghi lại những lỗi mình lặp lại.'],
      ['Players who only defend and never learn to attack.', 'Players who tap late to prove toughness.', 'Players who do not record repeating errors.'],
      ['Ceux qui défendent seulement sans attaquer.', 'Ceux qui tapent tard pour prouver dureté.', 'Ceux qui ne notent pas erreurs répétées.'],
    ),
    coreConceptIds: ['early-vs-late-defense', 'failure-response', 'frames', 'positional-hierarchy', 'deliberate-practice'],
    coreSkillIds: ['side-control-survival', 'Mount-survival', 'back-survival', 'side-control-escape', 'Mount-escape', 'back-escape'],
    supportSkillIds: ['front-headlock-defense', 'leg-lock-safety-basics', 'technical-stand-up', 'scramble-control'],
    requiredDefensiveSkillIds: ['leg-lock-safety-basics', 'front-headlock-defense', 'back-survival', 'Mount-survival'],
    commonWeaknesses: la(
      ['Thoát quá muộn, khi pin đã ổn định.', 'Frame bằng sức tay thay vì bằng cấu trúc.', 'Gỡ lại Guard nhưng không giữ lớp tiếp theo.', 'Không phản đòn khi đối thủ lao quá đà.'],
      ['Escaping late after the pin is stable.', 'Framing with arm strength instead of structure.', 'Recovering Guard without keeping the next layer.', 'Not countering when the opponent overcommits.'],
      ['Sortir tard après pin stable.', 'Frame avec force des bras.', 'Récupérer garde sans garder couche suivante.', 'Ne pas contrer quand adversaire overcommit.'],
    ),
    trainingPriorities: la(
      ['Mỗi tuần chạy round bắt đầu từ thế xấu.', 'Round chỉ thoát thế, ưu tiên hít thở và dựng frame trước.', 'Sau buổi tập, ghi lại tín hiệu nguy hiểm đầu tiên mình nhận ra.', 'Thoát xong phải lấy lại thế hoặc phản đòn rõ ràng.'],
      ['Start-from-bad-position rounds every week.', 'Escape-only rounds where breathing and frames come first.', 'Record the first danger signal.', 'After escape, reset or counter clearly.'],
      ['Rounds départ mauvaise position chaque semaine.', 'Rounds escape-only avec respiration et frames d’abord.', 'Noter premier danger signal.', 'Après sortie, reset ou counter clairement.'],
    ),
  }),
]
