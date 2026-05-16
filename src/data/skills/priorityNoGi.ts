/**
 * Priority No-Gi Skill Seeds
 *
 * These fill gaps in the existing skill library for the priority skills:
 * - crucifix-control
 * - bear-trap-ham-sandwich
 * - deep-half-guard
 * - half-butterfly-to-leg-entanglements
 *
 * Additive only — does not duplicate or overwrite existing skills.
 * Existing skills like k-guard-entry, false-reap-entry, k-guard-matrix,
 * saddle-inside-sankaku-control already exist in guard.ts / legLocks.ts /
 * modernExpansionSkills.ts.
 */
import { seed, type SkillSeed } from './skillSeedFactory'

export const priorityNoGiSkillSeeds: SkillSeed[] = [
  // ─── Crucifix Control ──────────────────────────────────────────
  seed(
    'crucifix-control',
    'Crucifix Control',
    'Crucifix Control',
    'Contrôle Crucifix',
    'pins_rides',
    'intermediate',
    ['crucifix', 'pin', 'back-attack', 'arm-trap'],
    // vi description
    'Dùng crucifix để trap tay đối thủ bằng chân, tạo dilemma giữa choke và armlock mà không cần full back control.',
    // en description
    'Use the crucifix to trap the opponent\'s arm with your legs, creating a dilemma between choke and armlock without requiring full back control.',
    // fr description
    'Utiliser le crucifix pour piéger le bras adverse avec les jambes, créant un dilemme entre étranglement et armlock sans besoin de contrôle dorsal complet.',
    // vi goal
    'Trap cánh tay bằng chân, kiểm soát shoulder line và mở one-arm choke hoặc armlock.',
    // en goal
    'Trap the arm with your legs, control the shoulder line, and open a one-arm choke or armlock.',
    // fr goal
    'Piéger le bras avec les jambes, contrôler la shoulder line et ouvrir un one-arm choke ou armlock.',
    // concepts
    ['crucifix', 'arm trap', 'one-arm choke', 'shoulder control', 'turtle attack', 'high ground'],
    // prerequisites
    ['sprawl-go-behind', 'back-control'],
    // relatedSkills
    ['crab-ride', 'rear-naked-choke-system', 'turtle-ride'],
  ),

  // ─── Bear Trap / Ham Sandwich ──────────────────────────────────
  seed(
    'bear-trap-ham-sandwich',
    'Bear Trap / Ham Sandwich',
    'Bear Trap / Ham Sandwich',
    'Bear Trap / Ham Sandwich',
    'submission_systems',
    'advanced',
    ['bear-trap', 'ham-sandwich', 'calf-slicer', 'compression', 'leg-lock', 'half-butterfly'],
    // vi description
    'Dùng bear trap / ham sandwich để tạo compression lock (calf slicer) từ half butterfly hoặc half guard, buộc đối thủ chọn giữa tap hoặc lộ back/sweep.',
    // en description
    'Use the bear trap / ham sandwich to create a compression lock (calf slicer) from half butterfly or half guard, forcing the opponent to tap or expose their back or sweep.',
    // fr description
    'Utiliser le bear trap / ham sandwich pour créer un compression lock (calf slicer) depuis half butterfly ou half guard, forçant le tap ou l\'exposition du dos.',
    // vi goal
    'Thread chân qua giữa chân đối thủ, clamp tạo compression trên bắp chân/hamstring, finish hoặc chuyển sweep.',
    // en goal
    'Thread your leg between the opponent\'s legs, clamp to create compression on the calf or hamstring, finish or transition to sweep.',
    // fr goal
    'Passer votre jambe entre les jambes adverses, clamper pour compression sur mollet/ischio-jambier, finir ou transitionner vers sweep.',
    // concepts
    ['bear trap', 'ham sandwich', 'calf slicer', 'compression lock', 'electric chair', 'half butterfly'],
    // prerequisites
    ['half-guard-knee-shield', 'leg-lock-safety-basics'],
    // relatedSkills
    ['deep-half-guard', 'half-butterfly-to-leg-entanglements', 'heel-hook-safety'],
  ),

  // ─── Deep Half Guard ───────────────────────────────────────────
  seed(
    'deep-half-guard',
    'Deep Half Guard',
    'Deep Half Guard',
    'Deep Half Guard',
    'guard_offense',
    'intermediate',
    ['deep-half', 'half-guard', 'sweep', 'underhook'],
    // vi description
    'Dùng deep half guard để đưa hông dưới hông đối thủ, kiểm soát chân gần và tạo sweep, waiter, hoặc back take khi passer overcommit.',
    // en description
    'Use deep half guard to get your hips under the opponent\'s hips, control the near leg, and create sweeps, waiter transitions, or back takes when the passer overcommits.',
    // fr description
    'Utiliser deep half guard pour placer vos hanches sous celles de l\'adversaire, contrôler la jambe proche et créer sweeps, waiter ou back takes quand le passer overcommit.',
    // vi goal
    'Xoay hông dưới hông, ôm chân gần và chọn sweep hoặc back door trước khi bị flatten.',
    // en goal
    'Turn hips under, hug the near leg, and choose sweep or back door before being flattened.',
    // fr goal
    'Tourner les hanches dessous, enlacer la jambe proche et choisir sweep ou back door avant flatten.',
    // concepts
    ['deep half', 'waiter sweep', 'Homers sweep', 'back door', 'underhook', 'coyote half guard'],
    // prerequisites
    ['half-guard-knee-shield', 'supine-guard-retention'],
    // relatedSkills
    ['half-butterfly-to-leg-entanglements', 'bear-trap-ham-sandwich', 'half-guard-wrestle-up'],
  ),

  // ─── Half Butterfly to Leg Entanglements ───────────────────────
  seed(
    'half-butterfly-to-leg-entanglements',
    'Half Butterfly to Leg Entanglements',
    'Half Butterfly to Leg Entanglements',
    'Half Butterfly vers Leg Entanglements',
    'guard_offense',
    'advanced',
    ['half-butterfly', 'leg-lock', 'bear-trap', 'k-guard', 'leg-entry'],
    // vi description
    'Dùng half butterfly hook để off-balance, rồi chuyển vào K-guard, bear trap, hoặc leg entanglement khi đối thủ phản ứng.',
    // en description
    'Use the half butterfly hook to off-balance, then transition into K-Guard, bear trap, or leg entanglement when the opponent reacts.',
    // fr description
    'Utiliser le half butterfly hook pour déséquilibrer, puis transiter vers K-Guard, bear trap ou leg entanglement sur la réaction adverse.',
    // vi goal
    'Nâng hông bằng butterfly hook, đọc phản ứng và vào K-guard hoặc bear trap tùy hướng đối thủ.',
    // en goal
    'Elevate hips with butterfly hook, read the reaction, and enter K-Guard or bear trap based on opponent direction.',
    // fr goal
    'Élever les hanches avec butterfly hook, lire la réaction et entrer K-Guard ou bear trap selon la direction adverse.',
    // concepts
    ['half butterfly', 'butterfly hook', 'K-guard entry', 'bear trap', 'elevation', 'leg entry'],
    // prerequisites
    ['butterfly-guard-off-balance', 'half-guard-knee-shield', 'k-guard-entry'],
    // relatedSkills
    ['k-guard-matrix', 'bear-trap-ham-sandwich', 'deep-half-guard', 'false-reap-entry'],
  ),

  // ─── Wrestling Up from Guard ───────────────────────────────────
  seed(
    'wrestling-up-from-guard',
    'Wrestling Up from Guard',
    'Wrestling Up from Guard',
    'Wrestle-Up depuis la Garde',
    'wrestle_up_wrestling',
    'intermediate',
    ['wrestle-up', 'guard', 'standing', 'single-leg'],
    // vi description
    'Hệ thống wrestling up từ seated/butterfly guard: dùng shin-to-shin, 2-on-1, hoặc underhook để chuyển sang single leg hoặc front headlock.',
    // en description
    'Wrestling up system from seated or butterfly guard: use shin-to-shin, 2-on-1, or underhook to convert to single leg or front headlock.',
    // fr description
    'Système de wrestle-up depuis seated/butterfly guard : utiliser shin-to-shin, 2-on-1 ou underhook pour convertir en single leg ou front headlock.',
    // vi goal
    'Đứng dậy an toàn với head position tốt, gom chân hoặc snap down để lên top.',
    // en goal
    'Stand up safely with good head position, collect a leg or snap down to reach top position.',
    // fr goal
    'Se lever en sécurité avec bonne position de tête, capter une jambe ou snap down pour monter top.',
    // concepts
    ['wrestle up', 'shin-to-shin', '2-on-1', 'underhook', 'head position', 'single leg'],
    // prerequisites
    ['seated-guard-retention', 'hand-fighting', 'technical-stand-up'],
    // relatedSkills
    ['single-leg-bjj', 'snapdown-front-headlock', 'half-guard-wrestle-up'],
  ),

  // ─── Front Headlock System ─────────────────────────────────────
  seed(
    'front-headlock-system',
    'Front Headlock System',
    'Front Headlock System',
    'Système Front Headlock',
    'wrestle_up_wrestling',
    'intermediate',
    ['front-headlock', 'guillotine', 'darce', 'anaconda', 'go-behind'],
    // vi description
    'Hệ thống front headlock nối snap down → guillotine / darce / anaconda / go-behind thành chuỗi tấn công liên tục.',
    // en description
    'Front headlock system chains snap down into guillotine, darce, anaconda, or go-behind as a continuous attack sequence.',
    // fr description
    'Système front headlock enchaînant snap down vers guillotine, darce, anaconda ou go-behind comme séquence d\'attaque continue.',
    // vi goal
    'Kiểm soát đầu dưới vai, chọn submission hoặc back take dựa trên phản ứng của đối thủ.',
    // en goal
    'Control the head below your shoulder line, choose submission or back take based on opponent reaction.',
    // fr goal
    'Contrôler la tête sous votre ligne d\'épaule, choisir soumission ou back take selon la réaction.',
    // concepts
    ['front headlock', 'guillotine', 'darce', 'anaconda', 'go-behind', 'snap down'],
    // prerequisites
    ['snapdown-front-headlock', 'hand-fighting'],
    // relatedSkills
    ['guillotine-system', 'sprawl-go-behind', 'back-control'],
  ),

  // ─── Back Attack System ────────────────────────────────────────
  seed(
    'back-attack-system',
    'Back Attack System',
    'Back Attack System',
    'Système d\'Attaque du Dos',
    'back_control',
    'intermediate',
    ['back-control', 'rnc', 'arm-triangle', 'body-triangle'],
    // vi description
    'Hệ thống back attack: seatbelt → hooks/body triangle → hand fight → RNC / arm triangle / transition khi đối thủ xoay.',
    // en description
    'Back attack system: seatbelt → hooks or body triangle → hand fight → RNC, arm triangle, or transition when the opponent turns.',
    // fr description
    'Système d\'attaque du dos : seatbelt → hooks/body triangle → hand fight → RNC, arm triangle ou transition si l\'adversaire tourne.',
    // vi goal
    'Giữ back control, thắng hand fight và kết thúc RNC hoặc arm triangle.',
    // en goal
    'Maintain back control, win the hand fight, and finish with RNC or arm triangle.',
    // fr goal
    'Garder le contrôle dorsal, gagner le hand fight et finir avec RNC ou arm triangle.',
    // concepts
    ['back control', 'seatbelt', 'body triangle', 'hand fighting', 'RNC', 'arm triangle'],
    // prerequisites
    ['back-control', 'rear-naked-choke-system'],
    // relatedSkills
    ['crucifix-control', 'crab-ride', 'turtle-ride'],
  ),

  // ─── Leg Lock Defense ──────────────────────────────────────────
  seed(
    'leg-lock-defense',
    'Leg Lock Defense',
    'Leg Lock Defense',
    'Défense Leg Lock',
    'survival_defense',
    'intermediate',
    ['leg-lock', 'defense', 'heel-hook', 'knee-safety', 'escape'],
    // vi description
    'Nhận diện và thoát leg lock: giấu gót, clear knee line, quay đúng hướng và tap sớm khi cần.',
    // en description
    'Recognize and escape leg locks: hide the heel, clear the knee line, turn the correct direction, and tap early when needed.',
    // fr description
    'Reconnaître et sortir des leg locks : cacher le talon, libérer knee line, tourner dans la bonne direction et taper tôt si nécessaire.',
    // vi goal
    'Thoát trước khi lực xoắn vào gối, giữ base và recover guard an toàn.',
    // en goal
    'Escape before rotational force reaches the knee, keep base, and recover guard safely.',
    // fr goal
    'Sortir avant que la rotation n\'atteigne le genou, garder la base et récupérer la garde en sécurité.',
    // concepts
    ['heel hide', 'knee line', 'boot defense', 'rotation direction', 'tap timing', 'ashi escape'],
    // prerequisites
    ['leg-lock-safety-basics', 'heel-hook-safety'],
    // relatedSkills
    ['single-leg-x-basics', 'saddle-inside-sankaku-control', 'k-guard-entry'],
  ),
]
