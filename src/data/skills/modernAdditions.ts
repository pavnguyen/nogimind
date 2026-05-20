/**
 * Modern No-Gi Additions
 *
 * Fills critical gaps identified in the modernAdditionManifest:
 * - Backside 50/50, 50/50 heel exposure, knee line escape
 * - D'Arce, Anaconda, compression vs strangle
 * - Cross-wrist ride, claw ride, HQ/split-squat passing
 * - Seated hand-fighting, arm drag, body lock takedown, ankle pick
 * - Shotgun ankle lock, clamp→triangle, false reap→saddle bridges
 * - Niche additions: reverse buggy, baratoplata, texas cloverleaf,
 *   truck/twister, aoki lock, von flue choke
 */
import { seed, type SkillSeed } from './skillSeedFactory'

export const modernAdditionSkillSeeds: SkillSeed[] = [

  // ─── Backside 50/50 Control ────────────────────────────────────
  seed(
    'backside-50-50-control',
    'Backside 50/50 Control',
    'Backside 50/50 Control',
    'Contrôle Backside 50/50',
    'submission_systems',
    'advanced',
    ['backside-50-50', 'leg-lock', 'heel-hook', 'entanglement', 'leg-entanglement'],
    // vi description
    'Kiểm soát backside 50/50 — vị trí leg entanglement nơi bạn ở phía sau hip line của đối thủ, tạo heel hook mà không cần saddle.',
    // en description
    'Control the backside 50/50 — a leg entanglement position behind the opponent\'s hip line, generating heel hook threat without requiring the saddle.',
    // fr description
    'Contrôler le backside 50/50 — une position d\'entanglement derrière la hip line adverse, générant une menace heel hook sans nécessiter le saddle.',
    // vi goal
    'Giữ hip line phía sau, kiểm soát cả hai chân và chọn heel hook hoặc back take khi đối thủ xoay.',
    // en goal
    'Stay behind the hip line, control both legs, and choose heel hook or back take when the opponent turns.',
    // fr goal
    'Rester derrière la hip line, contrôler les deux jambes et choisir heel hook ou back take quand l\'adversaire tourne.',
    // concepts
    ['backside 50/50', 'heel hook', 'hip line', 'entanglement', 'leg control', 'secondary leg'],
    // prerequisites
    ['saddle-inside-sankaku-control', 'false-reap-entry', 'k-guard-entry'],
    // relatedSkills
    ['fifty-fifty-to-heel-exposure', 'knee-line-escape', 'heel-hook-safety'],
  ),

  // ─── 50/50 → Heel Exposure ─────────────────────────────────────
  seed(
    'fifty-fifty-to-heel-exposure',
    '50/50 to Heel Exposure',
    '50/50 to Heel Exposure',
    '50/50 vers Exposure du Talon',
    'submission_systems',
    'advanced',
    ['50-50', 'heel-hook', 'heel-exposure', 'leg-lock', 'entanglement'],
    // vi description
    'Từ 50/50 position, xoay hip angle và kiểm soát chân phụ để lộ heel đối thủ, tạo finish heel hook an toàn.',
    // en description
    'From the 50/50 position, rotate the hip angle and control the secondary leg to expose the opponent\'s heel for a safe heel hook finish.',
    // fr description
    'Depuis 50/50, tourner l\'angle de hanche et contrôler la jambe secondaire pour exposer le talon adverse et finir le heel hook en sécurité.',
    // vi goal
    'Xác định chân mục tiêu, khóa heel và xoay hip line đúng hướng để finish trước khi mất control.',
    // en goal
    'Identify the target leg, lock the heel, and rotate the hip line in the correct direction to finish before losing control.',
    // fr goal
    'Identifier la jambe cible, verrouiller le talon et tourner la hip line dans la bonne direction pour finir.',
    // concepts
    ['heel exposure', '50/50', 'hip rotation', 'secondary leg', 'finishing mechanics'],
    // prerequisites
    ['backside-50-50-control', 'heel-hook-safety', 'leg-lock-safety-basics'],
    // relatedSkills
    ['saddle-inside-sankaku-control', 'knee-line-escape', 'k-guard-entry'],
  ),

  // ─── Knee Line Escape / Heel Hide Defense ───────────────────────
  seed(
    'knee-line-escape',
    'Knee Line Escape / Heel Hide',
    'Knee Line Escape / Heel Hide',
    'Évasion Knee Line / Cache Talon',
    'survival_defense',
    'intermediate',
    ['knee-line', 'leg-lock', 'heel-hide', 'defense', 'escape'],
    // vi description
    'Thoát knee line khỏi leg entanglement: giấu gót, tách hông, clear chân phụ và xoay đúng hướng trước khi lực xoắn đến gối.',
    // en description
    'Escape the knee line from leg entanglements: hide the heel, separate the hips, clear the secondary leg, and rotate correctly before rotational force reaches the knee.',
    // fr description
    'Sortir la knee line des entanglements : cacher le talon, écarter les hanches, libérer la jambe secondaire et tourner correctement avant que la rotation n\'atteigne le genou.',
    // vi goal
    'Đưa gối ra khỏi hip line đối thủ, ẩn gót và reset guard hoặc đứng lên an toàn.',
    // en goal
    'Move the knee past the opponent\'s hip line, hide the heel, and reset guard or stand safely.',
    // fr goal
    'Sortir le genou de la hip line adverse, cacher le talon et réinitialiser la garde ou se lever en sécurité.',
    // concepts
    ['heel hide', 'knee line', 'boot defense', 'rotation direction', 'tap timing', 'secondary leg'],
    // prerequisites
    ['leg-lock-safety-basics', 'heel-hook-safety'],
    // relatedSkills
    ['single-leg-x-basics', 'saddle-inside-sankaku-control', 'backside-50-50-control'],
  ),

  // ─── Compression vs Strangle Recognition ────────────────────────
  seed(
    'compression-vs-strangle-recognition',
    'Compression vs Strangle',
    'Compression vs Strangle',
    'Compression vs Stranglement',
    'positional_awareness',
    'intermediate',
    ['compression', 'strangle', 'neck-safety', 'leg-lock', 'decision-making'],
    // vi description
    'Phân biệt compression lock (calf slicer, bicep slicer) với strangle/choke và phản ứng đúng: tap khi compression vào khớp, fight khi vào cổ.',
    // en description
    'Recognize compression locks (calf slicer, bicep slicer) vs strangles and respond correctly: tap when compression targets the joint, fight when targeting the neck.',
    // fr description
    'Distinguer compression locks (calf slicer, bicep slicer) des étranglements et réagir correctement : taper pour compression articulaire, combattre pour le cou.',
    // vi goal
    'Trong 1-2 giây, xác định đúng loại submission và quyết định tap hay tiếp tục thoát.',
    // en goal
    'Within 1-2 seconds, correctly identify the submission type and decide to tap or continue escaping.',
    // fr goal
    'En 1-2 secondes, identifier le type de soumission et décider taper ou continuer à s\'échapper.',
    // concepts
    ['compression lock', 'strangle', 'joint safety', 'neck safety', 'tap timing', 'submission recognition'],
    // prerequisites
    ['heel-hook-safety', 'leg-lock-safety-basics'],
    // relatedSkills
    ['knee-line-escape', 'bear-trap-ham-sandwich', 'guillotine-system'],
  ),

  // ─── D'Arce Choke ──────────────────────────────────────────────
  seed(
    'darce-choke',
    'D\'Arce Choke',
    'D\'Arce Choke',
    'Étranglement D\'Arce',
    'submission_systems',
    'intermediate',
    ['darce', 'choke', 'front-headlock', 'arm-triangle', 'shoulder-crunch'],
    // vi description
    'D\'Arce choke từ front headlock hoặc when opponent turns in: khóa vai-cổ bằng arm triangle, dùng shoulder pressure để siết.',
    // en description
    'D\'Arce choke from front headlock or when the opponent turns in: lock the shoulder and neck in an arm triangle with shoulder pressure for the finish.',
    // fr description
    'D\'Arce choke depuis front headlock ou quand l\'adversaire tourne : verrouiller épaule et cou en arm triangle avec pression d\'épaule pour finir.',
    // vi goal
    'Khóa tay qua nách, shoulder crunch vào cổ, dùng chest pressure để hoàn tất D\'Arce hoặc chuyển go-behind.',
    // en goal
    'Thread the arm through the far armpit, apply shoulder crunch to the neck, and use chest pressure to finish the D\'Arce or transition to go-behind.',
    // fr goal
    'Enfiler le bras sous l\'aisselle opposée, shoulder crunch sur le cou et pression de poitrine pour finir le D\'Arce ou go-behind.',
    // concepts
    ['darce', 'arm triangle', 'front headlock', 'shoulder crunch', 'chest pressure', 'go-behind'],
    // prerequisites
    ['front-headlock-system', 'snapdown-front-headlock'],
    // relatedSkills
    ['anaconda-choke', 'guillotine-system', 'sprawl-go-behind', 'crucifix-control'],
  ),

  // ─── Anaconda Choke ────────────────────────────────────────────
  seed(
    'anaconda-choke',
    'Anaconda Choke',
    'Anaconda Choke',
    'Étranglement Anaconda',
    'submission_systems',
    'intermediate',
    ['anaconda', 'choke', 'front-headlock', 'arm-triangle'],
    // vi description
    'Anaconda choke từ front headlock: khóa tay gần của bạn qua cổ đối thủ, kéo đầu gối và xoay shoulder line để tạo arm triangle từ phía ngược lại.',
    // en description
    'Anaconda choke from front headlock: your near arm locks around the neck, pull the elbow to the knee and rotate the shoulder line to create the arm triangle from the opposite side.',
    // fr description
    'Anaconda choke depuis front headlock : le bras proche verrouille le cou, tirer coude au genou et tourner shoulder line pour créer l\'arm triangle côté opposé.',
    // vi goal
    'Lock tay qua cổ, xoay hip-shoulder line để siết, hoặc chuyển D\'Arce / guillotine khi đối thủ phòng thủ.',
    // en goal
    'Lock the arm around the neck, rotate hip-shoulder line to squeeze, or transition to D\'Arce or guillotine when the opponent defends.',
    // fr goal
    'Verrouiller le bras autour du cou, tourner hip-shoulder line pour serrer, ou passer à D\'Arce/guillotine si défense.',
    // concepts
    ['anaconda', 'arm triangle', 'front headlock', 'hip rotation', 'shoulder crunch'],
    // prerequisites
    ['front-headlock-system', 'snapdown-front-headlock'],
    // relatedSkills
    ['darce-choke', 'guillotine-system', 'sprawl-go-behind'],
  ),

  // ─── Cross-Wrist Ride ──────────────────────────────────────────
  seed(
    'cross-wrist-ride',
    'Cross-Wrist Ride',
    'Cross-Wrist Ride',
    'Cross-Wrist Ride',
    'pins_rides',
    'advanced',
    ['cross-wrist', 'ride', 'turtle', 'back-exposure', 'wrist-control'],
    // vi description
    'Cross-wrist ride: khóa cổ tay đối thủ chéo nhau trên lưng, dùng chest pressure và hip connection để control turtle và lộ back.',
    // en description
    'Cross-wrist ride: lock the opponent\'s wrists crossed on their back, use chest pressure and hip connection to control the turtle and expose the back.',
    // fr description
    'Cross-wrist ride : verrouiller les poignets croisés sur le dos adverse, utiliser pression poitrine et connexion hanche pour contrôler turtle et exposer le dos.',
    // vi goal
    'Bắt wrist, đưa ra sau lưng, chest-to-spine và kéo shoulder line lên để lộ back.',
    // en goal
    'Trap both wrists, bring them behind the back, chest-to-spine, and pull the shoulder line up to expose the back.',
    // fr goal
    'Piéger les poignets, les ramener derrière le dos, chest-to-spine et tirer shoulder line pour exposer le dos.',
    // concepts
    ['cross-wrist', 'wrist control', 'turtle ride', 'back exposure', 'chest-to-spine'],
    // prerequisites
    ['turtle-ride', 'crab-ride'],
    // relatedSkills
    ['claw-ride', 'crucifix-control', 'back-control'],
  ),

  // ─── Claw Ride ─────────────────────────────────────────────────
  seed(
    'claw-ride',
    'Claw Ride',
    'Claw Ride',
    'Claw Ride',
    'pins_rides',
    'advanced',
    ['claw-ride', 'ride', 'turtle', 'back-exposure', 'body-lock'],
    // vi description
    'Claw ride: dùng arm và chest clamp vào hip line/torso từ turtle, tạo base và lấy back exposure bằng hip switch và hand fighting.',
    // en description
    'Claw ride: use arm and chest clamps around the hip line or torso from turtle, build base, and secure back exposure through hip switches and hand fighting.',
    // fr description
    'Claw ride : utiliser bras et poitrine en clamp autour hip line/torse depuis turtle, créer base et exposer le dos par hip switch et hand fighting.',
    // vi goal
    'Clamp hông, chest-to-side, hip switch qua back khi đối thủ turn away hoặc post tay.',
    // en goal
    'Clamp the hips, chest-to-side, hip switch to back when the opponent turns away or posts a hand.',
    // fr goal
    'Clamp hanches, chest-to-side, hip switch vers dos quand l\'adversaire turn away ou poste une main.',
    // concepts
    ['claw ride', 'turtle', 'body lock', 'hip switch', 'back exposure'],
    // prerequisites
    ['turtle-ride', 'crab-ride'],
    // relatedSkills
    ['cross-wrist-ride', 'crucifix-control', 'back-attack-system'],
  ),

  // ─── HQ / Split-Squat Passing ──────────────────────────────────
  seed(
    'hq-split-squat-passing',
    'HQ / Split-Squat Passing',
    'HQ / Split-Squat Passing',
    'Passage HQ / Split-Squat',
    'passing',
    'intermediate',
    ['hq', 'split-squat', 'headquarters', 'passing', 'knee-cut', 'bodylock'],
    // vi description
    'Headquarters (HQ) và split-squat passing: quản lý distance với one knee up, one knee down, chặn shin frame và chọn knee cut / bodylock / toreando dựa trên phản ứng guard player.',
    // en description
    'Headquarters (HQ) and split-squat passing: manage distance with one knee up and one knee down, block the shin frame, and choose knee cut, bodylock, or toreando based on the guard player\'s reaction.',
    // fr description
    'Passage HQ / split-squat : gérer la distance avec un genou levé et un genou au sol, bloquer le shin frame et choisir knee cut, bodylock ou toreando selon réaction du guard player.',
    // vi goal
    'Kiểm soát distance từ HQ, đọc reaction của guard player, chọn đúng pass line và clear knee line.',
    // en goal
    'Control distance from HQ, read the guard player\'s reactions, choose the correct pass line, and clear the knee line.',
    // fr goal
    'Contrôler distance depuis HQ, lire les réactions du guard, choisir la bonne pass line et franchir knee line.',
    // concepts
    ['headquarters', 'split-squat', 'knee cut', 'bodylock', 'toreando', 'knee line'],
    // prerequisites
    ['bodylock-passing', 'knee-cut-passing'],
    // relatedSkills
    ['knee-cut-passing', 'bodylock-passing', 'outside-passing', 'leg-drag-basics'],
  ),

  // ─── Seated Guard Hand-Fighting ─────────────────────────────────
  seed(
    'seated-hand-fighting',
    'Seated Guard Hand-Fighting',
    'Seated Guard Hand-Fighting',
    'Hand-Fighting Garde Assise',
    'guard_retention',
    'beginner',
    ['seated-guard', 'hand-fighting', 'collar-tie', 'pummel', 'guard-retention'],
    // vi description
    'Hand-fighting cơ bản từ seated guard: collar tie, pummel inside position, block grips và tạo angle trước khi passer vào chest-to-chest.',
    // en description
    'Fundamental hand-fighting from seated guard: collar tie, pummel for inside position, block grips, and create angle before the passer enters chest-to-chest.',
    // fr description
    'Hand-fighting fondamental depuis garde assise : collar tie, pummel inside position, bloquer grips et créer angle avant que le passer n\'entre en chest-to-chest.',
    // vi goal
    'Thắng hand fight, giữ inside position và ngăn passer khóa chest-to-hip.',
    // en goal
    'Win the hand fight, maintain inside position, and prevent the passer from locking chest-to-hip.',
    // fr goal
    'Gagner le hand fight, garder inside position et empêcher le passer de verrouiller chest-to-hip.',
    // concepts
    ['seated guard', 'hand fighting', 'collar tie', 'inside position', 'pummel', 'grip breaking'],
    // prerequisites
    ['supine-guard-retention', 'hand-fighting'],
    // relatedSkills
    ['seated-guard-retention', 'butterfly-guard-off-balance', 'wrestling-up-from-guard'],
  ),

  // ─── Arm Drag System ────────────────────────────────────────────
  seed(
    'arm-drag-system',
    'Arm Drag System',
    'Arm Drag System',
    'Système Arm Drag',
    'wrestle_up_wrestling',
    'intermediate',
    ['arm-drag', 'back-take', 'single-leg', 'front-headlock', 'wrestling'],
    // vi description
    'Hệ thống arm drag: kéo tay đối thủ qua centerline, kết hợp head movement và footwork để lấy back, single leg hoặc front headlock.',
    // en description
    'Arm drag system: pull the opponent\'s arm across the centerline, combine head movement and footwork to take the back, single leg, or front headlock.',
    // fr description
    'Système arm drag : tirer le bras adverse à travers centerline, combiner mouvement de tête et footwork pour prendre le dos, single leg ou front headlock.',
    // vi goal
    'Drag tay, chuyển hông ra sau hip line và chọn back take hoặc takedown.',
    // en goal
    'Drag the arm, move hips behind the hip line, and choose back take or takedown.',
    // fr goal
    'Drag le bras, déplacer hanches derrière hip line et choisir back take ou takedown.',
    // concepts
    ['arm drag', 'back take', 'single leg', 'front headlock', 'angle', 'footwork'],
    // prerequisites
    ['hand-fighting', 'technical-stand-up'],
    // relatedSkills
    ['single-leg-bjj', 'snapdown-front-headlock', 'back-attack-system'],
  ),

  // ─── Body Lock Takedown / Mat Returns ───────────────────────────
  seed(
    'body-lock-takedown',
    'Body Lock Takedown / Mat Returns',
    'Body Lock Takedown / Mat Returns',
    'Body Lock Takedown / Mat Returns',
    'wrestle_up_wrestling',
    'intermediate',
    ['body-lock', 'takedown', 'mat-return', 'double-leg', 'wrestling'],
    // vi description
    'Body lock takedown và mat return: khóa vòng tay quanh torso từ clinch hoặc turtle, drive through hips và return opponent to mat.',
    // en description
    'Body lock takedown and mat return: lock arms around the torso from clinch or turtle, drive through the hips, and return the opponent to the mat.',
    // fr description
    'Body lock takedown et mat return : verrouiller les bras autour du torse depuis clinch ou turtle, drive à travers les hanches et ramener l\'adversaire au tapis.',
    // vi goal
    'Khóa torso, head position lệch, drive hip-to-hip và theo opponent xuống mat với chest-to-chest control.',
    // en goal
    'Lock the torso, offset head position, drive hip-to-hip, and follow the opponent to the mat with chest-to-chest control.',
    // fr goal
    'Verrouiller torse, tête décalée, drive hanche-à-hanche et suivre l\'adversaire au tapis avec chest-to-chest.',
    // concepts
    ['body lock', 'mat return', 'takedown', 'clinche', 'hip drive', 'chest control'],
    // prerequisites
    ['hand-fighting', 'sprawl-go-behind'],
    // relatedSkills
    ['single-leg-bjj', 'snapdown-front-headlock', 'turtle-ride'],
  ),

  // ─── Ankle Pick / Low Single ────────────────────────────────────
  seed(
    'ankle-pick-low-single',
    'Ankle Pick / Low Single',
    'Ankle Pick / Low Single',
    'Ankle Pick / Low Single',
    'wrestle_up_wrestling',
    'intermediate',
    ['ankle-pick', 'low-single', 'takedown', 'wrestling', 'shot'],
    // vi description
    'Ankle pick và low single leg: tấn công chân trụ bằng hand fighting và head movement, finish bằng cách nâng ankle và drive ngang.',
    // en description
    'Ankle pick and low single leg: attack the lead leg with hand fighting and head movement, finish by lifting the ankle and driving laterally.',
    // fr description
    'Ankle pick et low single leg : attaquer la jambe avant avec hand fighting et mouvement de tête, finir en soulevant la cheville et poussant latéralement.',
    // vi goal
    'Đánh lạc hướng head/hand, vào chân trụ, nâng ankle và drive shoulder vào hip để finish.',
    // en goal
    'Fake head or hand, attack the lead leg, lift the ankle and drive the shoulder into the hip to finish.',
    // fr goal
    'Feinter tête/main, attaquer jambe avant, soulever cheville et pousser épaule dans la hanche.',
    // concepts
    ['ankle pick', 'low single', 'head movement', 'hand fighting', 'lead leg', 'takedown'],
    // prerequisites
    ['hand-fighting', 'technical-stand-up'],
    // relatedSkills
    ['single-leg-bjj', 'arm-drag-system', 'body-lock-takedown'],
  ),

  // ─── Shotgun Ankle Lock ─────────────────────────────────────────
  seed(
    'shotgun-ankle-lock',
    'Shotgun Ankle Lock',
    'Shotgun Ankle Lock',
    'Shotgun Ankle Lock',
    'submission_systems',
    'advanced',
    ['shotgun-ankle-lock', 'leg-lock', 'ankle-lock', 'straight-ankle', 'saddle'],
    // vi description
    'Shotgun ankle lock: từ saddle hoặc 50/50, bắt chéo chân đối thủ và dùng hip rotation + chest pressure để tạo straight ankle lock mạnh hơn standard.',
    // en description
    'Shotgun ankle lock: from saddle or 50/50, cross the opponent\'s legs and use hip rotation and chest pressure to create a stronger straight ankle lock.',
    // fr description
    'Shotgun ankle lock : depuis saddle ou 50/50, croiser les jambes adverses et utiliser rotation des hanches et pression poitrine pour un straight ankle lock plus fort.',
    // vi goal
    'Bắt chéo chân, lock ankle, xoay hông lên ngực và finish bằng shoulder pressure.',
    // en goal
    'Cross the legs, lock the ankle, rotate hips toward the chest, and finish with shoulder pressure.',
    // fr goal
    'Croiser les jambes, verrouiller cheville, tourner hanches vers poitrine et finir par pression épaule.',
    // concepts
    ['shotgun ankle lock', 'straight ankle', 'leg entanglement', 'saddle', 'finishing mechanics'],
    // prerequisites
    ['saddle-inside-sankaku-control', 'leg-lock-safety-basics'],
    // relatedSkills
    ['heel-hook-safety', 'backside-50-50-control', 'fifty-fifty-to-heel-exposure'],
  ),

  // ─── Clamp → Triangle Bridge ─────────────────────────────────────
  seed(
    'clamp-to-triangle-bridge',
    'Clamp Guard → Triangle',
    'Clamp Guard to Triangle Bridge',
    'Clamp Guard vers Triangle',
    'guard_offense',
    'advanced',
    ['clamp-guard', 'triangle', 'transition', 'guard-offense', 'submission-chain'],
    // vi description
    'Nối clamp guard vào triangle: khi đối thủ chống đỡ clamp bằng cách đứng lên hoặc tách hông, dùng reaction đó để vào triangle choke.',
    // en description
    'Bridge clamp guard into triangle: when the opponent defends the clamp by standing or separating hips, use that reaction to enter the triangle choke.',
    // fr description
    'Connecter clamp guard au triangle : quand l\'adversaire défend le clamp en se levant ou écartant les hanches, utiliser cette réaction pour entrer le triangle choke.',
    // vi goal
    'Từ clamp, đọc phản ứng stand/post của đối thủ và chuyển ngay vào triangle choke.',
    // en goal
    'From clamp, read the opponent\'s stand or post reaction and immediately transition to triangle choke.',
    // fr goal
    'Depuis clamp, lire la réaction stand/post de l\'adversaire et passer immédiatement au triangle choke.',
    // concepts
    ['clamp guard', 'triangle choke', 'transition', 'guard offense', 'submission chain'],
    // prerequisites
    ['clamp-guard-system', 'triangle-armbar-dilemma'],
    // relatedSkills
    ['omoplata-system', 'false-reap-entry', 'k-guard-entry'],
  ),

  // ─── False Reap → Saddle Bridge ──────────────────────────────────
  seed(
    'false-reap-to-saddle-bridge',
    'False Reap → Saddle',
    'False Reap to Saddle Bridge',
    'False Reap vers Saddle',
    'guard_offense',
    'advanced',
    ['false-reap', 'saddle', 'transition', 'inside-sankaku', 'leg-lock-entry'],
    // vi description
    'Nối false reap vào saddle (inside sankaku): khi đối thủ tách hông ra khỏi false reap, dùng momentum để xoay vào saddle/leg entanglement.',
    // en description
    'Bridge false reap into saddle (inside sankaku): when the opponent separates their hips from the false reap, use the momentum to rotate into saddle or leg entanglement.',
    // fr description
    'Connecter false reap au saddle (inside sankaku) : quand l\'adversaire écarte les hanches du false reap, utiliser l\'élan pour tourner dans le saddle.',
    // vi goal
    'Đọc hip reaction của đối thủ, xoay hông theo và khóa saddle trước khi họ reset guard.',
    // en goal
    'Read the opponent\'s hip reaction, rotate following the movement, and lock the saddle before they reset guard.',
    // fr goal
    'Lire la réaction de hanche adverse, tourner et verrouiller le saddle avant reset.',
    // concepts
    ['false reap', 'saddle', 'inside sankaku', 'leg entry', 'transition chain'],
    // prerequisites
    ['false-reap-entry', 'k-guard-entry'],
    // relatedSkills
    ['saddle-inside-sankaku-control', 'clamp-to-triangle-bridge', 'k-guard-matrix'],
  ),

  // ─── Reverse Buggy Choke ─────────────────────────────────────────
  seed(
    'reverse-buggy-choke',
    'Reverse Buggy Choke',
    'Reverse Buggy Choke',
    'Reverse Buggy Choke',
    'submission_systems',
    'advanced',
    ['reverse-buggy', 'choke', 'leg', 'shoulder-crunch', 'submission'],
    // vi description
    'Reverse buggy choke: từ bottom khi bị pass, dùng chân quàng qua cổ và tay đối thủ để tạo choke từ dưới lên.',
    // en description
    'Reverse buggy choke: from bottom when being passed, wrap the legs around the opponent\'s neck and arm to create a choke from underneath.',
    // fr description
    'Reverse buggy choke : depuis le bottom en étant passé, enrouler les jambes autour du cou et du bras adverses pour créer un étranglement par dessous.',
    // vi goal
    'Kẹp cổ và tay bằng chân, siết shoulder-to-shoulder để finish, tap hoặc chuyển sweep.',
    // en goal
    'Trap the neck and arm with your legs, squeeze shoulder-to-shoulder to finish, tap, or transition to sweep.',
    // fr goal
    'Piéger cou et bras avec les jambes, serrer épaule-à-épaule pour finir, taper ou transitionner vers sweep.',
    // concepts
    ['reverse buggy', 'buggy choke', 'leg choke', 'shoulder crunch'],
    // prerequisites
    ['side-control-escape', 'side-control-survival'],
    // relatedSkills
    ['triple-attack-system', 'omoplata-system'],
  ),

  // ─── Baratoplata ────────────────────────────────────────────────
  seed(
    'baratoplata',
    'Baratoplata',
    'Baratoplata',
    'Baratoplata',
    'submission_systems',
    'advanced',
    ['baratoplata', 'shoulder-lock', 'kimura', 'omoplata', 'submission'],
    // vi description
    'Baratoplata: shoulder lock từ guard, dùng leg và hip angle để khóa vai đối thủ, tương tự kimura nhưng từ angle khác.',
    // en description
    'Baratoplata: a shoulder lock from guard using the legs and hip angle to isolate the opponent\'s shoulder, similar to a kimura but from a different angle.',
    // fr description
    'Baratoplata : clé d\'épaule depuis la garde utilisant les jambes et l\'angle de hanche pour isoler l\'épaule adverse, similaire au kimura mais sous un angle différent.',
    // vi goal
    'Bắt tay đối thủ, xoay hip angle và dùng leg để khóa vai trước khi finish.',
    // en goal
    'Trap the opponent\'s arm, rotate the hip angle, and use the legs to lock the shoulder before finishing.',
    // fr goal
    'Piéger le bras adverse, tourner l\'angle de hanche et utiliser les jambes pour verrouiller l\'épaule avant de finir.',
    // concepts
    ['baratoplata', 'shoulder lock', 'kimura grip', 'hip angle', 'leg control'],
    // prerequisites
    ['kimura-system', 'omoplata-system'],
    // relatedSkills
    ['omoplata-system', 'triangle-armbar-dilemma'],
  ),

  // ─── Texas Cloverleaf ──────────────────────────────────────────
  seed(
    'texas-cloverleaf',
    'Texas Cloverleaf',
    'Texas Cloverleaf',
    'Texas Cloverleaf',
    'submission_systems',
    'advanced',
    ['texas-cloverleaf', 'heel-hook', 'leg-lock', 'entanglement', 'submission'],
    // vi description
    'Texas cloverleaf: heel hook từ reaping position với leg configuration độc đáo, tạo rotational pressure trực tiếp lên knee.',
    // en description
    'Texas cloverleaf: a heel hook from a reaping position with a unique leg configuration, creating direct rotational pressure on the knee.',
    // fr description
    'Texas cloverleaf : heel hook depuis position reaping avec configuration de jambes unique, créant pression rotationnelle directe sur le genou.',
    // vi goal
    'Khóa leg configuration, xoay hip line và finish heel hook với rotational pressure.',
    // en goal
    'Lock the leg configuration, rotate the hip line, and finish the heel hook with rotational pressure.',
    // fr goal
    'Verrouiller la configuration jambes, tourner hip line et finir le heel hook par pression rotationnelle.',
    // concepts
    ['texas cloverleaf', 'heel hook', 'reap', 'rotational pressure', 'leg entanglement'],
    // prerequisites
    ['heel-hook-safety', 'false-reap-entry'],
    // relatedSkills
    ['saddle-inside-sankaku-control', 'backside-50-50-control', 'fifty-fifty-to-heel-exposure'],
  ),

  // ─── Truck / Twister ────────────────────────────────────────────
  seed(
    'truck-twister',
    'Truck / Twister',
    'Truck / Twister',
    'Truck / Twister',
    'submission_systems',
    'advanced',
    ['truck', 'twister', 'back-attack', 'body-lock', 'spine-lock'],
    // vi description
    'Truck position và twister: từ back hoặc side control, lock body triangle around torso và kéo đầu đối thủ về phía hông để tạo spinal lock.',
    // en description
    'Truck position and twister: from back or side control, lock a body triangle around the torso and pull the opponent\'s head toward the hip to create a spinal lock.',
    // fr description
    'Truck position et twister : depuis le dos ou side control, verrouiller un body triangle autour du torse et tirer la tête vers la hanche pour un spinal lock.',
    // vi goal
    'Body lock từ back/side, kéo đầu vào hip và finish twister hoặc chuyển back control.',
    // en goal
    'Body lock from back or side, pull the head toward the hip, and finish the twister or transition to back control.',
    // fr goal
    'Body lock depuis dos/côté, tirer tête vers hanche et finir twister ou passer au contrôle dorsal.',
    // concepts
    ['truck', 'twister', 'spinal lock', 'body triangle', 'back attack'],
    // prerequisites
    ['back-control', 'crab-ride'],
    // relatedSkills
    ['crucifix-control', 'back-attack-system', 'claw-ride'],
  ),

  // ─── Aoki Lock ──────────────────────────────────────────────────
  seed(
    'aoki-lock',
    'Aoki Lock',
    'Aoki Lock',
    'Aoki Lock',
    'submission_systems',
    'advanced',
    ['aoki-lock', 'knee-bar', 'leg-lock', 'heel-hook', 'submission'],
    // vi description
    'Aoki lock: từ 50/50 hoặc leg entanglement, dùng grip đặc biệt để tạo knee bar kết hợp với hip rotation, finish nhanh mà không cần full saddle.',
    // en description
    'Aoki lock: from 50/50 or leg entanglement, use a special grip to create a knee bar combined with hip rotation, finishing quickly without requiring full saddle.',
    // fr description
    'Aoki lock : depuis 50/50 ou entanglement, utiliser un grip spécial pour créer un knee bar combiné à rotation des hanches, finir rapidement sans saddle complet.',
    // vi goal
    'Bắt grip đặc biệt, xoay hip line và finish knee bar/heel hook trước khi đối thủ thoát.',
    // en goal
    'Secure the special grip, rotate the hip line, and finish with a knee bar or heel hook before the opponent escapes.',
    // fr goal
    'Prendre le grip spécial, tourner hip line et finir knee bar/heel hook avant sortie adverse.',
    // concepts
    ['aoki lock', 'knee bar', 'heel hook', 'leg entanglement', 'finishing mechanics'],
    // prerequisites
    ['heel-hook-safety', 'leg-lock-safety-basics'],
    // relatedSkills
    ['fifty-fifty-to-heel-exposure', 'shotgun-ankle-lock', 'texas-cloverleaf'],
  ),

  // ─── Von Flue Choke ─────────────────────────────────────────────
  seed(
    'von-flue-choke',
    'Von Flue Choke',
    'Von Flue Choke',
    'Étranglement Von Flue',
    'submission_systems',
    'intermediate',
    ['von-flue', 'choke', 'guillotine', 'defense', 'shoulder-pressure'],
    // vi description
    'Von Flue choke: khi bị guillotine từ top, dùng shoulder pressure vào cổ đối thủ và chest-to-chest control để siết choke từ trên xuống.',
    // en description
    'Von Flue choke: when caught in a guillotine from top, use shoulder pressure on the opponent\'s neck and chest-to-chest control to choke from top position.',
    // fr description
    'Von Flue choke : quand vous êtes pris en guillotine du top, utiliser pression d\'épaule sur le cou adverse et chest-to-chest pour étrangler depuis le top.',
    // vi goal
    'Từ guillotine defense, chuyển shoulder vào cổ, chest-to-chest và siết Von Flue.',
    // en goal
    'From guillotine defense, transition the shoulder into the neck, chest-to-chest, and squeeze the Von Flue.',
    // fr goal
    'Depuis défense guillotine, passer l\'épaule dans le cou, chest-to-chest et serrer le Von Flue.',
    // concepts
    ['von flue', 'guillotine counter', 'shoulder pressure', 'chest control', 'top choke'],
    // prerequisites
    ['guillotine-system', 'sprawl-go-behind'],
    // relatedSkills
    ['darce-choke', 'front-headlock-system', 'leg-lock-defense'],
  ),
]
