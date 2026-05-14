#!/usr/bin/env python3
"""Insert microDetailSystem and qualityChecklist entries for 9 new seed-based skills."""
import re

# ============================================================
# DATA: micro_entries for microDetailSystems.ts
# ============================================================
micro_entries = """
  'closed-guard-posture-control': {
    overview: lt('Kiem soat posture bang leg tension, hip angle va hand fight de mo sweep va submission.', 'Control posture with leg tension, hip angle, and hand fighting to open sweeps and submissions.', 'Controler posture avec tension jambes, angle hanche et hand fighting pour ouvrir sweeps et soumissions.'),
    topFiveDetails: [
      md('cgpc-leg-tension', 'angle', lt('Chan khoa hong', 'Legs lock hips', 'Jambes verrouillent hanches'), lt('Hai chan khoa sat lung ho va ep hong xuong.', 'Lock legs tight across their back and press hips down.', 'Verrouiller jambes dos et presser hanches bas.'), 'both', 'close_in', ['legs', 'hips', 'knees'], lt('Khi ho bat dau posture.', 'When they start to posture up.', 'Quand ils commencent a se redresser.'), lt('Leg lock giu ho thap va khong xoay duoc.', 'Leg lock keeps them low and unable to turn.', 'Leg lock garde bas et sans rotation.'), lt('Chan long de ho thoat.', 'Loose legs let them escape.', 'Jambes laches pour sortie.'), lt('Squeeze then break.', 'Squeeze then break.', 'Serrez puis cassez.'), lt('Ho khong the posture len.', 'They cannot posture up.', 'Ils ne peuvent pas redresser.'), safetyText),
    ],
    leftRightGuides: [],
    fastFinishPaths: [],
    troubleshootingTips: [],
    doNotDo: la([], [], []),
    safetyNotes: safety,
  },
  'closed-guard-sweeps': {
    overview: lt('Sweep tu closed guard bang hip bump, scissor va flower sweep khi elbow da tach va posture da gay.', 'Sweep from closed guard with hip bump, scissor, and flower sweeps when the elbow is separated and posture is broken.', 'Sweep depuis closed guard avec hip bump, scissor et flower sweeps quand coude est ecarte et posture cassee.'),
    topFiveDetails: [
      md('cgs-hip-bump', 'angle', lt('Hip bump swing', 'Hip bump swing', 'Hip bump swing'), lt('Nhac hong swing nguoi len ve phia vai ho.', 'Lift hips and swing your body toward their shoulder.', 'Soulever hanches et balancer vers epaule.'), 'both', 'drive_diagonal', ['hips', 'knees', 'shoulders'], lt('Khi ho ep nguoi ve truoc.', 'When they press forward.', 'Quand ils pressent avant.'), lt('Hip bump dung momentum ho de sweep.', 'Hip bump uses their momentum to sweep.', 'Hip bump utilise momentum pour sweep.'), lt('Hip bump yeu khong du luc.', 'Weak hip bump with no power.', 'Hip bump faible.'), lt('Bump hard, angle wide.', 'Bump hard, angle wide.', 'Bump fort, angle large.'), lt('Ho mat base va post.', 'They lose base and post.', 'Perdent base et postent.'), safetyText),
    ],
    leftRightGuides: [],
    fastFinishPaths: [],
    troubleshootingTips: [],
    doNotDo: la([], [], []),
    safetyNotes: safety,
  },
  'de-la-riva-sweeps': {
    overview: lt('Sweep tu DLR bang hook inside, sleeve grip va hip rotation de vao X-guard, SLX hoac len top.', 'Sweep from DLR with inside hook, sleeve grip, and hip rotation to enter X-guard, SLX, or come on top.', 'Sweep depuis DLR avec hook interieur, grip manche et rotation hanche pour X-guard, SLX ou top.'),
    topFiveDetails: [
      md('dlrs-hook', 'hook', lt('DLR hook keo', 'DLR hook pulls', 'Hook DLR tire'), lt('Hook chan keo ve phia ban va xoay hong ho.', 'Hook their leg toward you and rotate their hip.', 'Hooker leur jambe vers vous et tourner hanche.'), 'inside', 'pull_toward_you', ['feet', 'shins', 'hips'], lt('Khi ban co sleeve grip.', 'When you have the sleeve grip.', 'Quand vous avez grip manche.'), lt('Hook keo pha base ho.', 'Hook pull breaks their base.', 'Hook tir brise leur base.'), lt('Hook khong tension.', 'Hook without tension.', 'Hook sans tension.'), lt('Hook active, sleeve pulls.', 'Hook active, sleeve pulls.', 'Hook actif, manche tire.'), lt('Ho mat base.', 'They lose base.', 'Ils perdent base.'), safetyText),
    ],
    leftRightGuides: [],
    fastFinishPaths: [],
    troubleshootingTips: [],
    doNotDo: la([], [], []),
    safetyNotes: safety,
  },
  'de-la-riva-back-take': {
    overview: lt('Back take tu DLR bang far hip control, berimbolo spin va hook placement de ket thuc o back control.', 'Back take from DLR with far hip control, berimbolo spin, and hook placement to finish in back control.', 'Prise de dos depuis DLR avec controle hanche loin, berimbolo et placement hook pour dos.'),
    topFiveDetails: [
      md('dlrbt-far-hip', 'grip', lt('Far hip grip', 'Far hip grip', 'Grip hanche loin'), lt('Mot tay giu far hip belt/pants truoc khi spin.', 'One hand grips the far hip belt/pants before the spin.', 'Main grip ceinture/pantalon hanche loin avant spin.'), 'far', 'pin_in', ['hands', 'hips', 'belt'], lt('Khi ho chong sweep.', 'When they defend the sweep.', 'Quand ils defendent sweep.'), lt('Far hip grip keo ho vao back line.', 'Far hip grip pulls them into back line.', 'Grip hanche loin tire vers ligne dos.'), lt('Bo far hip grip.', 'Releasing far hip grip.', 'Lacher grip hanche loin.'), lt('Grip the far hip.', 'Grip the far hip.', 'Grip hanche loin.'), lt('Ho bi keo vao back.', 'They are pulled into back.', 'Tires vers dos.'), safetyText),
    ],
    leftRightGuides: [],
    fastFinishPaths: [],
    troubleshootingTips: [],
    doNotDo: la([], [], []),
    safetyNotes: safety,
  },
  'reverse-de-la-riva-transitions': {
    overview: lt('Transition tu RDLR bang outside hook, hip rotation va kimura trap de vao DLR, X-guard hoac sweep.', 'Transition from RDLR with outside hook, hip rotation, and kimura trap into DLR, X-guard, or sweep.', 'Transition depuis RDLR avec hook exterieur, rotation hanche et kimura trap vers DLR, X-guard ou sweep.'),
    topFiveDetails: [
      md('rdlr-hook', 'hook', lt('Outside hook keo', 'Outside hook pulls', 'Hook exterieur tire'), lt('Hook ngoai keo chan gan len va xoay hong ho.', 'Outside hook pulls the near leg up and rotates their hip.', 'Hook exterieur tire jambe proche et tourne hanche.'), 'outside', 'pull_toward_you', ['feet', 'shins', 'hips'], lt('Khi ho de vao RDLR.', 'When they pressure into RDLR.', 'Quand ils pressionnent RDLR.'), lt('Hook keo mo rotation opportunity.', 'Hook pull opens rotation opportunity.', 'Hook tir ouvre rotation.'), lt('Hook khong tension.', 'Hook without tension.', 'Hook sans tension.'), lt('Hook and rotate.', 'Hook and rotate.', 'Hook et tournez.'), lt('Hip rotation available.', 'Hip rotation available.', 'Rotation hanche disponible.'), safetyText),
    ],
    leftRightGuides: [],
    fastFinishPaths: [],
    troubleshootingTips: [],
    doNotDo: la([], [], []),
    safetyNotes: safety,
  },
  'z-guard-sweeps': {
    overview: lt('Sweep tu Z-guard bang deep half entry, waiter sweep va underhook control de dao vi tri tu bottom.', 'Sweep from Z-guard using deep half entry, waiter sweep, and underhook control to reverse from bottom.', 'Sweep depuis Z-guard avec entree deep half, waiter sweep et underhook pour inverser depuis bottom.'),
    topFiveDetails: [
      md('zgs-underhook', 'grip', lt('Underhook deep', 'Deep underhook', 'Underhook profond'), lt('Dua tay qua nach va bat chat lung ho.', 'Slide arm through armpit and grip their back.', 'Passer bras sous aisselle et grip dos.'), 'near', 'close_in', ['hands', 'arms', 'shoulders'], lt('Khi ban dang o Z-guard.', 'When you are in Z-guard.', 'Quand vous etes en Z-guard.'), lt('Underhook cho phep deep half entry.', 'Underhook enables deep half entry.', 'Underhook permet entree deep half.'), lt('Underhook nong.', 'Shallow underhook.', 'Underhook superficiel.'), lt('Pummel deep.', 'Pummel deep.', 'Pummel profond.'), lt('Underhook chat.', 'Underhook tight.', 'Underhook serre.'), safetyText),
    ],
    leftRightGuides: [],
    fastFinishPaths: [],
    troubleshootingTips: [],
    doNotDo: la([], [], []),
    safetyNotes: safety,
  },
  'knee-on-belly-control': {
    overview: lt('Kiem soat knee on belly bang goi nang, far hip grip va shoulder isolation de kiem soat va chuyen vi tri.', 'Control knee on belly with heavy knee, far hip grip, and shoulder isolation to control and transition.', 'Controler genou ventre avec genou lourd, grip hanche loin et isolation epaule pour controler et transiter.'),
    topFiveDetails: [
      md('kob-knee', 'pressure', lt('Goi nang tren bung', 'Knee heavy on belly', 'Genou lourd sur ventre'), lt('Dat goi nang len bung hoac sternum, khong tren ribs.', 'Place knee heavy on belly or sternum, not on ribs.', 'Placer genou lourd sur ventre ou sternum, pas cotes.'), 'near', 'drive_down', ['knees', 'hips', 'belly'], lt('Khi vua len KOB.', 'When you first get to KOB.', 'Quand vous arrivez KOB.'), lt('Knee nang lam ho kho bridge.', 'Heavy knee makes bridging hard.', 'Genou lourd rend bridge difficile.'), lt('Knee tren ribs.', 'Knee on ribs.', 'Genou sur cotes.'), lt('Weight through knee.', 'Weight through knee.', 'Poids a travers genou.'), lt('Ho khong the bridge.', 'They cannot bridge.', 'Ils peuvent pas bridge.'), safetyText),
    ],
    leftRightGuides: [],
    fastFinishPaths: [],
    troubleshootingTips: [],
    doNotDo: la([], [], []),
    safetyNotes: safety,
  },
  'north-south-control': {
    overview: lt('Kiem soat north south bang shoulder pressure, arm control va choke threat de control va chuyen mount/side.', 'Control north south with shoulder pressure, arm control, and choke threat to control and transition to mount/side.', 'Controler north south avec pression epaule, controle bras et menace choke pour controler et transiter mount/side.'),
    topFiveDetails: [
      md('ns-shoulder-press', 'pressure', lt('Shoulder pressure tren co', 'Shoulder pressure on neck', 'Pression epaule sur cou'), lt('Dat shoulder nang len co/nguc ho va drive cheo.', 'Place shoulder heavily on their neck/chest and drive diagonally.', 'Placer epaule lourde sur cou/poitrine et pousser diagonale.'), 'near', 'drive_diagonal', ['shoulders', 'chest', 'neck'], lt('Khi ban den NS.', 'When you enter NS.', 'Quand vous arrivez NS.'), lt('Shoulder pressure ngan ho bridge.', 'Shoulder pressure prevents bridging.', 'Pression epaule empeche bridge.'), lt('Khong co shoulder contact.', 'No shoulder contact.', 'Pas contact epaule.'), lt('Drive through the shoulder.', 'Drive through the shoulder.', 'Poussez a travers epaule.'), lt('Ho bi ep thap.', 'They are pressed low.', 'Ils sont presses bas.'), safetyText),
    ],
    leftRightGuides: [],
    fastFinishPaths: [],
    troubleshootingTips: [],
    doNotDo: la([], [], []),
    safetyNotes: safety,
  },
  'inverted-guard-control': {
    overview: lt('Inverted guard dung invert angles de dat chan len hip/shoulder line va ket noi K-guard, matrix hoac leg entry.', 'Inverted guard uses invert angles to place feet on hip/shoulder line and connect to K-guard, matrix, or leg entries.', 'Garde inversee utilise angles inversion pour pieds sur hip/shoulder line et connexion K-guard, matrix ou entrees jambes.'),
    topFiveDetails: [
      md('ig-invert', 'angle', lt('Invert safety', 'Invert safety', 'Securite inversion'), lt('Xoay shoulders truoc, dua hong qua head, giu co an toan.', 'Rotate shoulders first, bring hips over head, keep neck safe.', 'Tourner epaules dabord, hanches par-dessus tete, cou sur.'), 'both', 'rotate_left', ['shoulders', 'hips', 'spine'], lt('Khi muon invert vao guard.', 'When you want to invert into guard.', 'Quand vous voulez inverser garde.'), lt('Invert dung ky thuat bao ve co.', 'Correct invert protects the neck.', 'Inversion correcte protege cou.'), lt('Invert bang co.', 'Inverting with the neck.', 'Inverser avec cou.'), lt('Shoulders first.', 'Shoulders first.', 'Epaules dabord.'), lt('Co khong co ap luc.', 'No neck pressure.', 'Pas pression cou.'), safetyText),
    ],
    leftRightGuides: [],
    fastFinishPaths: [],
    troubleshootingTips: [],
    doNotDo: la([], [], []),
    safetyNotes: safetyLeg,
  },
"""

# ============================================================
# DATA: qualityChecklist entries for qualityChecklists.ts
# ============================================================
checklist_entries = """
  'closed-guard-posture-control': (
    ['Leg lock active and tight', 'Hand fight won - elbow separated', 'Hip angle shifted off center', 'Head control down', 'Sweep entry or submission available'],
    'Leg lock and hand fight provide posture control and sweep entries.',
    50,
    lt('Posture control du tot de mo sweep hoac submission.', 'Posture control is good enough to open sweep or submission.', 'Controle de posture assez bon pour ouvrir sweep ou soumission.'),
    lt('Sweep hoac submission.', 'Sweep or submission.', 'Sweep ou soumission.'),
  ),
  'closed-guard-sweeps': (
    ['Posture broken before sweep', 'Elbow separated from body', 'Hip bump/scissor/flower sweep executed', 'Follow-up to top position', 'Base established on top'],
    'Sweeps rely on posture break and hip angle.',
    50,
    lt('Sweep da du tot de follow len top.', 'Sweep is good enough to follow to top.', 'Sweep assez bon pour suivre vers top.'),
    lt('Mount hoac side control.', 'Mount or side control.', 'Mount ou side control.'),
  ),
  'de-la-riva-sweeps': (
    ['Inside hook active with tension', 'Sleeve grip pulling away', 'Hip rotation opens entry', 'X-guard/SLX transition ready', 'Sweep finish to top'],
    'Hook and sleeve work together for off-balance.',
    50,
    lt('DLR sweep da du tot de chuyen entry.', 'DLR sweep is good enough to transition to entry.', 'Sweep DLR assez bon pour transition entree.'),
    lt('X-guard, SLX hoac top.', 'X-guard, SLX, or top.', 'X-guard, SLX ou top.'),
  ),
  'de-la-riva-back-take': (
    ['Far hip grip established', 'Berimbolo spin direction correct', 'Back hook placed high', 'Seatbelt secured', 'Chest-to-back connection'],
    'Spin and hook placement must be one motion.',
    50,
    lt('Back take da du tot de lock control.', 'Back take is good enough to lock control.', 'Prise de dos assez bonne pour verrouiller controle.'),
    lt('Back control va RNC.', 'Back control and RNC.', 'Controle dos et RNC.'),
  ),
  'reverse-de-la-riva-transitions': (
    ['Outside hook active', 'Hip rotation outward', 'Entry path chosen (DLR/X-guard/sweep)', 'Transition executed', 'Position secured'],
    'Hook then rotate - hesitation loses the entry.',
    50,
    lt('RDLR transition da du tot de vao entry.', 'RDLR transition is good enough to enter.', 'Transition RDLR assez bonne pour entrer.'),
    lt('DLR, X-guard hoac top.', 'DLR, X-guard, or top.', 'DLR, X-guard ou top.'),
  ),
  'z-guard-sweeps': (
    ['Knee shield active creating space', 'Underhook pummeled deep', 'Deep half entry or waiter grip set', 'Sweep or wrestle-up decision made', 'Position reversal or stand-up'],
    'Deep half entry neutralizes their weight advantage.',
    50,
    lt('Z-guard da du tot de sweep hoac wrestle-up.', 'Z-guard is good enough to sweep or wrestle-up.', 'Z-guard assez bon pour sweep ou wrestle-up.'),
    lt('Top position hoac standing.', 'Top position or standing.', 'Position top ou debout.'),
  ),
  'knee-on-belly-control': (
    ['Knee heavy on belly/sternum (not ribs)', 'Far hip grip controlling direction', 'Shoulder isolated or back exposed', 'Transition chosen (mount/back)', 'Executed within 5 seconds'],
    'KOB is a transition position - 5 second rule.',
    50,
    lt('KOB da du tot de transition.', 'KOB is good enough to transition.', 'KOB assez bon pour transition.'),
    lt('Mount hoac back take.', 'Mount or back take.', 'Mount ou prise de dos.'),
  ),
  'north-south-control': (
    ['Shoulder pressure on neck/chest', 'Arms pinned to mat', 'Forearm on choke line', 'Hip ride prevents escape', 'Transition ready if choke fails'],
    'Shoulder pressure and arm control set up the choke.',
    50,
    lt('NS control da du tot de choke hoac transition.', 'NS control is good enough to choke or transition.', 'Controle NS assez bon pour choke ou transition.'),
    lt('Choke hoac side control.', 'Choke or side control.', 'Choke ou side control.'),
  ),
  'inverted-guard-control': (
    ['Shoulders-first invert executed safely', 'Foot placed on hip/shoulder line', 'K-guard shin connection active', 'Matrix entry or sweep chosen', 'Leg entry or sweep executed'],
    'Invert safety is the priority - shoulders first, never neck.',
    50,
    lt('Inverted guard da du tot de entry.', 'Inverted guard is good enough to enter.', 'Garde inversee assez bonne pour entrer.'),
    lt('K-guard, matrix hoac leg entry.', 'K-guard, matrix, or leg entry.', 'K-guard, matrix ou entree jambe.'),
  ),
"""

# ============================================================
# INSERT into microDetailSystems.ts
# ============================================================
print("Reading microDetailSystems.ts...")
with open('src/data/microDetailSystems.ts', 'r') as f:
    micro = f.read()

# Find the last '}' before 'Object.assign(systems, extraMicroDetailSystems)'
ins_point = micro.rfind('\n}\n\nObject.assign(systems, extraMicroDetailSystems)')
if ins_point == -1:
    print("ERROR: Could not find insertion point in microDetailSystems.ts")
else:
    # Insert before the closing '}'
    before = micro[:ins_point + 1]  # includes the newline before '}'
    after = micro[ins_point + 1:]   # starts with '}\n\nObject.assign...'
    new_micro = before + micro_entries + after
    with open('src/data/microDetailSystems.ts', 'w') as f:
        f.write(new_micro)
    print("SUCCESS: Inserted 9 microDetailSystem entries")

# ============================================================
# INSERT into qualityChecklists.ts
# ============================================================
print("Reading qualityChecklists.ts...")
with open('src/data/qualityChecklists.ts', 'r') as f:
    check = f.read()

# Find the last '}' before 'Object.assign(qualityChecklists, extraQualityChecklists)'
ins_point = check.rfind('\n}\n\nObject.assign(qualityChecklists, extraQualityChecklists)')
if ins_point == -1:
    print("ERROR: Could not find insertion point in qualityChecklists.ts")
else:
    before = check[:ins_point + 1]
    after = check[ins_point + 1:]
    new_check = before + checklist_entries + after
    with open('src/data/qualityChecklists.ts', 'w') as f:
        f.write(new_check)
    print("SUCCESS: Inserted 9 qualityChecklist entries")

print("Done!")
