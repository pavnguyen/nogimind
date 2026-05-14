#!/usr/bin/env python3
"""Rebuild src/data/videos/videoReferences.ts from scratch."""
import json
import re
from collections import OrderedDict

# Manually curated entries
# Manually curated entries (VI text is normalized at output time)
MANUAL_ENTRIES = [
    {
        "id": "lachlan-rnc-three-chokes",
        "title": ("3 BJJ Chokes That Everybody Should Know", "3 dòn siét BJJ ai cung nên biét", "3 étranglements BJJ à connaître"),
        "channelName": "Lachlan Giles",
        "url": "https://www.youtube.com/watch?v=LhB7Y7LAig0",
        "youtubeId": "LhB7Y7LAig0",
        "language": "en",
        "relatedSkillIds": ["rear-naked-choke-system"],
        "relatedPositionIds": ["back-control-position"],
        "techniqueTags": ["rnc", "rear-naked-choke", "back-control", "choke"],
        "relevance": "supplemental",
        "level": "intermediate",
        "whyUseful": (
            "Useful as an outside visual reference for choke alignment and finishing mechanics from back control.",
            "Huu ich nhu video tham khao ngoai de nhin alignment va mechanics finish khi siet tu back control.",
            "Utile comme reference visuelle externe pour alignement et mecanique de finish depuis le dos.",
        ),
        "whatToWatchFor": (
            ["Choking elbow alignment", "Head and chest connection", "Hand-fight order before squeezing", "Clean strangle instead of jaw crank"],
            ["Alignment cua elbow siet", "Ket noi dau va nguc", "Thu tu hand fight truoc khi siet", "Siet sach thay vi crank ham"],
            ["Alignement du coude étrangleur", "Connexion tete et poitrine", "Ordre du hand fight avant serrage", "Etranglement propre plutot que machoire"],
        ),
        "caution": (
            "Release immediately on tap or distress; do not force pressure through the jaw or neck.",
            "Tha ngay khi tap hoac co dau hieu kho chiu; khong ep luc qua ham hoac co.",
            "Relachez immediatement au tap ou signe de detresse; ne forcez pas sur la machoire ou le cou.",
        ),
        "timestamps": [
            ("intro", "Intro", "Giới thiệu", "Introduction", 0),
            ("rnc", "Rear Naked Choke", "Đòn siết cổ sau", "Étranglement arrière", 60),
            ("guillotine", "Guillotine Choke", "Đòn siết guillotine", "Étranglement guillotine", 372),
            ("anaconda", "Anaconda Choke", "Đòn siết anaconda", "Étranglement anaconda", 660),
        ],
        "sourceNote": "Public YouTube reference found via BJJ Tips listing for Lachlan Giles videos.",
    },
    {
        "id": "lachlan-body-lock-pass-standard",
        "title": ("The Body Lock Pass: Standard version", "Body Lock Pass: phien ban tieu chuan", "Body Lock Pass : version standard"),
        "channelName": "Lachlan Giles",
        "url": "https://www.youtube.com/watch?v=ce7g__eV5iA",
        "youtubeId": "ce7g__eV5iA",
        "language": "en",
        "relatedSkillIds": ["bodylock-passing"],
        "relatedPositionIds": ["butterfly-guard"],
        "techniqueTags": ["bodylock", "passing", "butterfly-guard", "hip-control"],
        "relevance": "primary_reference",
        "level": "intermediate",
        "whyUseful": (
            "A focused public reference for the bodylock pass entry, hip-line control, and keeping the pass structured before clearing legs.",
            "Video tham khao public tap trung vao entry bodylock, kiem soat hip line va giu cau truc truoc khi clear chan.",
            "Reference publique centree sur entree bodylock, controle de la hip line et structure avant de passer les jambes.",
        ),
        "whatToWatchFor": (
            ["Hands locked low around the hip line", "Head position while entering", "Leg blocking before advancing", "Balance while clearing the knee line"],
            ["Tay khoa thap quanh hip line", "Vi tri dau khi vao pass", "Chan chan truoc khi tien len", "Base khi clear knee line"],
            ["Mains verrouillees bas autour de la hip line", "Position de tete a entree", "Blocage des jambes avant avancer", "Base en passant la knee line"],
        ),
        "timestamps": [
            ("full-video", "Full technique breakdown", "Phân tích kỹ thuật toàn bộ", "Analyse technique complète", 0),
        ],
        "sourceNote": "Public YouTube reference found via BJJ Tips listing for Lachlan Giles videos.",
    },
    {
        "id": "lachlan-inside-heel-hook-setup-safety",
        "title": ("Inside Heel Hook: Setup and Safety", "Inside Heel Hook: setup va an toan", "Inside Heel Hook : setup et securite"),
        "channelName": "Lachlan Giles",
        "url": "https://www.youtube.com/watch?v=w-W0ug7Edag",
        "youtubeId": "w-W0ug7Edag",
        "language": "en",
        "relatedSkillIds": ["heel-hook-safety", "leg-lock-safety-basics", "saddle-inside-sankaku-control"],
        "relatedPositionIds": ["saddle-inside-sankaku"],
        "techniqueTags": ["heel-hook", "inside-heel-hook", "saddle", "knee-line", "safety"],
        "relevance": "safety_reference",
        "level": "advanced",
        "whyUseful": (
            "A safety-first reference for why control, knee-line awareness, and release discipline matter before any heel hook pressure.",
            "Video tham khao thien ve an toan: vi sao control, nhan dien knee line va ky luat tha quan trong truoc moi luc heel hook.",
            "Reference orientee securite sur le controle, la knee line et la discipline de relache avant toute pression heel hook.",
        ),
        "whatToWatchFor": (
            ["Knee-line control before finishing", "Saddle control shape", "Slow pressure and partner communication", "Abort when the defender cannot rotate safely"],
            ["Kiem soat knee line truoc finish", "Cau truc saddle control", "Tang luc cham va giao tiep voi partner", "Dung khi defender khong the xoay an toan"],
            ["Controle de knee line avant finish", "Structure de controle saddle", "Pression lente et communication", "Arret si defenseur ne peut pas tourner en securite"],
        ),
        "caution": (
            "Heel hooks are safety-critical. Train under qualified supervision and stop before rotational knee pressure spikes.",
            "Heel hook la ky thuat safety-critical. Tap duoi su giam sat phu hop va dung truoc khi luc xoan vao goi tang manh.",
            "Les heel hooks sont critiques pour la securite. Travaillez sous supervision et arretez avant le pic de torsion au genou.",
        ),
        "timestamps": [
            ("full-video", "Full technique breakdown", "Phân tích kỹ thuật toàn bộ", "Analyse technique complète", 0),
        ],
        "sourceNote": "Public YouTube reference found via BJJ Tips listing for Lachlan Giles videos.",
    },
    {
        "id": "lachlan-side-control-escape-frames",
        "title": ("Escape Side Control Fundamentals Part 1: Prevention and Frames Escape", "Nen tang thoat side control phan 1: Phong ngua va frame thoat", "Fondamentaux sortie side control partie 1 : Prevention et sortie frames"),
        "channelName": "Lachlan Giles",
        "url": "https://www.youtube.com/watch?v=LFl6mmLhxIQ",
        "youtubeId": "LFl6mmLhxIQ",
        "language": "en",
        "relatedSkillIds": ["side-control-escape"],
        "relatedPositionIds": ["side-control-bottom"],
        "techniqueTags": ["side-control", "escape", "frames", "underhook"],
        "relevance": "supplemental",
        "level": "beginner",
        "whyUseful": (
            "A practical reference for turning frames into space before choosing guard recovery, underhook, or turtle.",
            "Video tham khao thuc dung cho viec bien frame thanh khoang trong truoc khi chon recover guard, underhook hoac turtle.",
            "Reference pratique pour transformer les frames en espace avant de choisir recover guard, underhook ou turtle.",
        ),
        "whatToWatchFor": (
            ["Frame placement before hip movement", "Elbow position under pressure", "Head safety during the escape", "When to recover guard instead of forcing the turn"],
            ["Dat frame truoc khi di chuyen hong", "Vi tri elbow khi bi pressure", "An toan dau khi thoat", "Khi nao recover guard thay vi co xoay"],
            ["Placement des frames avant mouvement des hanches", "Position du coude sous pression", "Securite de la tete pendant la sortie", "Quand recuperer la garde que forcer le turn"],
        ),
        "timestamps": [
            ("full-video", "Full technique breakdown", "Phân tích kỹ thuật toàn bộ", "Analyse technique complète", 0),
        ],
        "sourceNote": "Public YouTube reference found via BJJ Tips listing for Lachlan Giles videos.",
    },
    {
        "id": "lachlan-mount-escape-inside-leg",
        "title": ("Mount escape: The most important battle to win", "Thoat mount: tran chien quan trong nhat", "Sortie de mount : la bataille la plus importante"),
        "channelName": "Lachlan Giles",
        "url": "https://www.youtube.com/watch?v=S5zkk2B7pfw",
        "youtubeId": "S5zkk2B7pfw",
        "language": "en",
        "relatedSkillIds": ["mount-escape", "mount-survival"],
        "relatedPositionIds": ["mount-bottom"],
        "techniqueTags": ["mount", "escape", "inside-position", "elbow-knee"],
        "relevance": "supplemental",
        "level": "beginner",
        "whyUseful": (
            "Good outside reference for the mount escape priority: regain inside leg position before chasing a big bridge.",
            "Video tham khao tot cho uu tien thoat mount: lay lai inside leg position truoc khi co bridge lon.",
            "Bonne reference externe pour la priorite de sortie de mount : regagner inside leg position avant de chercher un grand bridge.",
        ),
        "whatToWatchFor": (
            ["Inside leg positioning", "Knee-elbow recovery", "Avoid exposing neck or arms", "Use small hip movement before big effort"],
            ["Inside leg positioning", "Keo knee-elbow lai gan", "Khong lo co hoac tay", "Dung chuyen dong hong nho truoc khi dung luc lon"],
            ["Position interieure des jambes", "Recuperation genou-coude", "Ne pas exposer cou ou bras", "Petit mouvement des hanches avant gros effort"],
        ),
        "timestamps": [
            ("full-video", "Full technique breakdown", "Phân tích kỹ thuật toàn bộ", "Analyse technique complète", 0),
        ],
        "sourceNote": "Public YouTube reference found via BJJ Tips listing for Lachlan Giles videos.",
    },
    # ─── Safety-critical skill references ──────────────────────────
    {
        "id": "gogoplata-safety-reference",
        "title": (
            "Gogoplata CHOKE | Setups and 4 WAYS to finish",
            "Gogoplata CHOKE | Setups va 4 CACH ket thuc",
            "Gogoplata CHOKE | Setups et 4 FACONS de finir",
        ),
        "channelName": "Energia Martial Arts",
        "url": "https://www.youtube.com/watch?v=PsYSobSqBgI",
        "youtubeId": "PsYSobSqBgI",
        "language": "en",
        "relatedSkillIds": ["gogoplata"],
        "relatedPositionIds": [],
        "techniqueTags": ["gogoplata", "rubber-guard", "choke", "neck-safety"],
        "relevance": "safety_reference",
        "level": "advanced",
        "whyUseful": (
            "A reference covering gogoplata setups and finishes while highlighting the neck strain and flexibility risks of forcing the technique.",
            "Video tham khao ve setup va finish gogoplata, nhan manh nguy co cang co va rang buoc do gian khi co ep ky thuat.",
            "Reference couvrant les setups et finishes gogoplata tout en soulignant la tension cervicale et les risques de flexibilite.",
        ),
        "whatToWatchFor": (
            ["Foot placement on the throat vs chin", "Avoid cranking the neck", "Recognize when flexibility is insufficient", "Release on tap or distress"],
            ["Dat chan len co thay vi ham", "Tranh bop co", "Nhan biet khi do gian khong du", "Tha ngay khi tap hoac dau hieu kho chiu"],
            ["Placement du pied sur la gorge vs menton", "Eviter de tordre le cou", "Reconnaitre quand la flexibilite est insuffisante", "Relacher au tap ou signe de detresse"],
        ),
        "caution": (
            "Gogoplata applies pressure directly to the neck and throat. Tap early if you feel any neck strain, jaw discomfort, or breathing difficulty. Do not force the technique if shoulder or hip flexibility is limited.",
            "Gogoplata gay ap luc truc tiep len co va hong. Tap som neu cam thay cang co, kho chiu ham hoac kho tho. Khong co ep ky thuat neu do gian vai hoac hong bi han che.",
            "Le gogoplata applique une pression directe sur le cou et la gorge. Tapez tot si vous sentez une tension cervicale, une gene a la machoire ou une difficulte respiratoire.",
        ),
        "timestamps": [
            ("full-video", "Full technique breakdown", "Phan tich ky thuat toan bo", "Analyse technique complete", 0),
        ],
        "sourceNote": "Public YouTube reference selected for safety-critical coverage.",
    },
    {
        "id": "buggy-choke-safety-reference",
        "title": (
            "The Buggy Choke",
            "The Buggy Choke",
            "The Buggy Choke",
        ),
        "channelName": "ZombieProofBJJ",
        "url": "https://www.youtube.com/watch?v=-b7Avb1x7g8",
        "youtubeId": "-b7Avb1x7g8",
        "language": "en",
        "relatedSkillIds": ["buggy-choke"],
        "relatedPositionIds": [],
        "techniqueTags": ["buggy-choke", "submission", "neck-safety", "escape-counter"],
        "relevance": "safety_reference",
        "level": "intermediate",
        "whyUseful": (
            "A focused reference for understanding buggy choke mechanics and why neck alignment and partner communication are critical when training this submission from side control bottom.",
            "Video tham khao tap trung vao co che buggy choke va vi sao canh co va giao tiep voi partner la rat quan trong khi tap ky thuat nay tu duoi side control.",
            "Reference centree sur la mecanique du buggy choke et pourquoi l'alignement du cou et la communication sont cruciaux quand on travaille cette soumission.",
        ),
        "whatToWatchFor": (
            ["Neck alignment during the roll", "Partner awareness before applying pressure", "Spine position under load", "Release discipline on resistance"],
            ["Canh co khi xoay nguoi", "Nhan thuc cua partner truoc khi ep luc", "Vi tri cot song khi chiu tai", "Ky luat tha khi gap khang cu"],
            ["Alignement du cou pendant le roulis", "Conscience du partenaire avant d'appliquer la pression", "Position de la colonne sous charge", "Discipline de relachement sur resistance"],
        ),
        "caution": (
            "Buggy chokes apply rotational pressure to the neck and spine. Tap immediately on any neck discomfort. Do not bridge or roll explosively while the choke is locked.",
            "Buggy choke gay ap luc xoan len co va cot song. Tap ngay khi co kho chiu. Khong bridge hoac xoay manh khi choke da khoa.",
            "Les buggy chokes appliquent une pression rotationnelle sur le cou et la colonne. Tapez immediatement sur toute gene cervicale.",
        ),
        "timestamps": [
            ("full-video", "Full technique breakdown", "Phan tich ky thuat toan bo", "Analyse technique complete", 0),
        ],
        "sourceNote": "Public YouTube reference selected for safety-critical coverage.",
    },
    {
        "id": "false-reap-safety-reference",
        "title": (
            "Don't Fear the Reaper in BJJ (Protect Your Knee & Avoid DQ in IBJJF)",
            "Dung so Reaper trong BJJ (Bao ve goi va tranh DQ trong IBJJF)",
            "N'ayez pas peur du Reaper en BJJ (Protegez votre genou et evitez DQ en IBJJF)",
        ),
        "channelName": "Chewjitsu",
        "url": "https://www.youtube.com/watch?v=bqiMzgjmo_U",
        "youtubeId": "bqiMzgjmo_U",
        "language": "en",
        "relatedSkillIds": ["false-reap-entry", "heel-hook-safety", "leg-lock-safety-basics"],
        "relatedPositionIds": ["saddle-inside-sankaku"],
        "techniqueTags": ["knee-reap", "false-reap", "leg-lock", "knee-safety", "injury-prevention"],
        "relevance": "safety_reference",
        "level": "intermediate",
        "whyUseful": (
            "Essential safety reference for understanding the knee reap mechanism, why the false reap entry can still stress the knee, and how to train leg entanglements responsibly.",
            "Tham khao an toan can thiet de hieu co che knee reap, vi sao false reap entry van co the gay ap luc len goi, va cach tap leg entanglement mot cach co trach nhiem.",
            "Reference de securite essentielle pour comprendre le mecanisme du knee reap, pourquoi la false reap entry peut stresser le genou, et comment travailler les leg entanglements de facon responsable.",
        ),
        "whatToWatchFor": (
            ["Knee rotation limits during reap", "Recognizing when the knee line is compromised", "Escaping before rotational pressure spikes", "IBJJF rules for knee reaping"],
            ["Gioi han xoay goi khi reap", "Nhan biet khi knee line bi ton thuong", "Thoat truoc khi ap luc xoan tang manh", "Luat IBJJF ve knee reap"],
            ["Limites de rotation du genou pendant le reap", "Reconnaitre quand la knee line est compromise", "Sortir avant le pic de pression rotationnelle", "Regles IBJJF sur le knee reap"],
        ),
        "caution": (
            "The reap position and false reap both put rotational stress on the knee. Train with a trusted partner, increase pressure gradually, and stop immediately if the defender cannot rotate their hips freely.",
            "Reap position va false reap deu gay ap luc xoan len goi. Tap voi partner dang tin cay, tang luc tu tu va dung ngay khi defender khong the xoay hong tu do.",
            "La position de reap et la false reap mettent toutes deux un stress rotationnel sur le genou. Travaillez avec un partenaire de confiance et arretez si le defenseur ne peut pas tourner librement.",
        ),
        "timestamps": [
            ("full-video", "Full technique breakdown", "Phan tich ky thuat toan bo", "Analyse technique complete", 0),
        ],
        "sourceNote": "Public YouTube reference selected for safety-critical coverage.",
    },
    {
        "id": "smother-safety-reference",
        "title": (
            "Simple Mother's Milk Submission Smother Choke",
            "Don Mother's Milk Submission Smother Choke don gian",
            "Simple soumission Mother's Milk Smother Choke",
        ),
        "channelName": "Invisible Jiu Jitsu",
        "url": "https://www.youtube.com/watch?v=2uAzRUGtnkA",
        "youtubeId": "2uAzRUGtnkA",
        "language": "en",
        "relatedSkillIds": ["smother-safety"],
        "relatedPositionIds": [],
        "techniqueTags": ["smother-choke", "mothers-milk", "mount", "positional-control", "breathing-safety"],
        "relevance": "safety_reference",
        "level": "intermediate",
        "whyUseful": (
            "A reference for understanding smother choke mechanics, mouth/breathing safety, and the importance of partner communication when training face-covering submissions.",
            "Tham khao de hieu co che smother choke, an toan mieng/tho, va tam quan trong cua giao tiep partner khi tap submissions biet mat.",
            "Reference pour comprendre la mecanique du smother choke, la securite respiratoire et l'importance de la communication lors de l'entrainement des soumissions couvrant le visage.",
        ),
        "whatToWatchFor": (
            ["Mouth and nose clearance", "Partner breathing awareness", "Releasing when the defender cannot breathe", "Avoiding forcing through resistance"],
            ["Thong thoang mieng va mui", "Nhan thuc ve hoi tho cua partner", "Tha khi defender khong the tho", "Tranh co ep qua khang cu"],
            ["Degagement bouche et nez", "Conscience de la respiration du partenaire", "Relacher quand le defenseur ne peut pas respirer", "Eviter de forcer a travers la resistance"],
        ),
        "caution": (
            "Smother chokes restrict breathing. Tap immediately if you cannot breathe or feel panic. Do not apply force over the mouth and nose simultaneously. Train only with trusted partners.",
            "Smother choke han che tho. Tap ngay neu khong the tho hoac cam thay hoang loan. Khong ep luc len mieng va mui cung luc. Chi tap voi partner dang tin cay.",
            "Les smother chokes restreignent la respiration. Tapez immediatement si vous ne pouvez pas respirer ou sentez de la panique. Ne forcez pas sur la bouche et le nez simultanement.",
        ),
        "timestamps": [
            ("full-video", "Full technique breakdown", "Phan tich ky thuat toan bo", "Analyse technique complete", 0),
        ],
        "sourceNote": "Public YouTube reference selected for safety-critical coverage.",
    },
]

# Skill mapping for scraped videos
SKILL_MAPPING = {
    "rear-naked-choke-system": {"keywords": ["rear naked choke", "rnc", "rear naked", "back choke", "naked choke"], "tags": ["rnc", "rear-naked-choke", "back-control", "choke"], "positions": ["back-control-position"], "relevance": "primary_reference", "level": "advanced"},
    "armbar-system": {"keywords": ["armbar", "arm bar", "armbar adjustment", "armbar setup"], "tags": ["armbar", "elbow-line", "shoulder-isolation", "submission"], "positions": [], "relevance": "primary_reference", "level": "advanced"},
    "arm-triangle-mount": {"keywords": ["arm triangle", "arm-triangle"], "tags": ["arm-triangle", "mount", "choke", "neck-safety"], "positions": [], "relevance": "primary_reference", "level": "advanced"},
    "back-control": {"keywords": ["back control", "back take", "back attack", "back mount", "back position", "taking the back", "arm drag to back"], "tags": ["back-control", "back-take", "control", "seatbelt"], "positions": ["back-control-position"], "relevance": "primary_reference", "level": "intermediate"},
    "back-escape": {"keywords": ["back escape", "escape back"], "tags": ["back-escape", "defense", "survival"], "positions": [], "relevance": "supplemental", "level": "beginner"},
    "bodylock-passing": {"keywords": ["body lock pass", "body lock", "bodylock", "body lock pass off"], "tags": ["bodylock", "passing", "hip-control"], "positions": [], "relevance": "primary_reference", "level": "intermediate"},
    "buggy-choke": {"keywords": ["buggy choke"], "tags": ["buggy-choke", "submission", "escape-counter"], "positions": [], "relevance": "primary_reference", "level": "intermediate"},
    "butterfly-guard-off-balance": {"keywords": ["butterfly guard", "butterfly swee", "shoulder crunch", "sumi gaeshi"], "tags": ["butterfly-guard", "sweep", "off-balance", "guard-system"], "positions": ["butterfly-guard"], "relevance": "primary_reference", "level": "intermediate"},
    "choi-bar": {"keywords": ["choi bar"], "tags": ["choi-bar", "armbar", "submission"], "positions": [], "relevance": "primary_reference", "level": "advanced"},
    "crab-ride": {"keywords": ["crab ride"], "tags": ["crab-ride", "back-take", "leg-ride"], "positions": [], "relevance": "primary_reference", "level": "advanced"},
    "dogfight-knee-tap": {"keywords": ["dog fight", "dogfight"], "tags": ["dogfight", "knee-tap", "half-guard"], "positions": [], "relevance": "supplemental", "level": "intermediate"},
    "false-reap-entry": {"keywords": ["false reap"], "tags": ["false-reap", "leg-entry", "guard"], "positions": [], "relevance": "primary_reference", "level": "advanced"},
    "front-headlock-defense": {"keywords": ["front headlock escape", "front headlock defense", "guillotine escape"], "tags": ["front-headlock", "defense", "escape"], "positions": ["front-headlock-top"], "relevance": "primary_reference", "level": "intermediate"},
    "gogoplata": {"keywords": ["gogoplata"], "tags": ["gogoplata", "submission", "guard-attack"], "positions": [], "relevance": "primary_reference", "level": "advanced"},
    "guard-pulling-strategy": {"keywords": ["guard pull", "knee pull guard"], "tags": ["guard-pull", "strategy", "guard-entry"], "positions": [], "relevance": "supplemental", "level": "beginner"},
    "guillotine-system": {"keywords": ["guillotine"], "tags": ["guillotine", "front-headlock", "choke", "neck-safety"], "positions": ["front-headlock-top"], "relevance": "primary_reference", "level": "advanced"},
    "half-guard-knee-shield": {"keywords": ["half guard", "forcing half guard"], "tags": ["half-guard", "knee-shield", "guard-system"], "positions": ["half-guard-bottom"], "relevance": "primary_reference", "level": "intermediate"},
    "hand-fighting": {"keywords": ["hand fighting"], "tags": ["hand-fighting", "grip-fighting", "fundamentals"], "positions": [], "relevance": "supplemental", "level": "beginner"},
    "headquarters-passing": {"keywords": ["headquarters"], "tags": ["headquarters", "passing", "guard-passing"], "positions": [], "relevance": "supplemental", "level": "intermediate"},
    "heel-hook-safety": {"keywords": ["heel hook", "heelhook"], "tags": ["heel-hook", "leg-lock", "knee-line", "safety"], "positions": ["saddle-inside-sankaku"], "relevance": "safety_reference", "level": "advanced"},
    "k-guard-matrix": {"keywords": ["k guard", "k-guard"], "tags": ["k-guard", "matrix", "leg-entanglements"], "positions": [], "relevance": "primary_reference", "level": "advanced"},
    "kimura-system": {"keywords": ["kimura"], "tags": ["kimura", "shoulder-lock", "submission"], "positions": [], "relevance": "primary_reference", "level": "advanced"},
    "knee-cut-passing": {"keywords": ["knee cut", "knee slice", "knee cut pass"], "tags": ["knee-cut", "passing", "knee-slice"], "positions": [], "relevance": "primary_reference", "level": "intermediate"},
    "leg-drag-basics": {"keywords": ["leg drag"], "tags": ["leg-drag", "passing"], "positions": [], "relevance": "supplemental", "level": "intermediate"},
    "mount-control": {"keywords": ["mount position", "mount option", "never lose mount"], "tags": ["mount", "control", "pressure"], "positions": [], "relevance": "supplemental", "level": "intermediate"},
    "mount-escape": {"keywords": ["mount escape", "mount esc", "mount escape"], "tags": ["mount", "escape", "bridge"], "positions": ["mount-bottom"], "relevance": "primary_reference", "level": "beginner"},
    "octopus-guard-control": {"keywords": ["octopus guard"], "tags": ["octopus-guard", "half-guard", "guard-system"], "positions": ["half-guard-bottom"], "relevance": "primary_reference", "level": "intermediate"},
    "omoplata-system": {"keywords": ["omoplata", "omoplata open"], "tags": ["omoplata", "shoulder-lock", "guard", "submission"], "positions": [], "relevance": "primary_reference", "level": "advanced"},
    "rear-triangle-control": {"keywords": ["rear triangle", "body triangle"], "tags": ["rear-triangle", "back-control", "choke"], "positions": ["back-control-position"], "relevance": "supplemental", "level": "intermediate"},
    "s-mount-control": {"keywords": ["s mount"], "tags": ["s-mount", "mount", "control"], "positions": [], "relevance": "supplemental", "level": "advanced"},
    "saddle-inside-sankaku-control": {"keywords": ["saddle entry", "inside sankaku", "saddle armbar"], "tags": ["saddle", "inside-sankaku", "leg-control"], "positions": ["saddle-inside-sankaku"], "relevance": "primary_reference", "level": "advanced"},
    "side-control-escape": {"keywords": ["side control escape", "side control"], "tags": ["side-control", "escape", "frames", "underhook"], "positions": ["side-control-bottom"], "relevance": "supplemental", "level": "beginner"},
    "triangle-system": {"keywords": ["triangle choke", "triangle fini", "triangle setup"], "tags": ["triangle", "choke", "guard", "neck-safety"], "positions": [], "relevance": "primary_reference", "level": "intermediate"},
    "single-leg-x-control": {"keywords": ["single leg x", "single leg-x", "single leg x guard", "ashi garami"], "tags": ["single-leg-x", "guard", "leg-control"], "positions": [], "relevance": "primary_reference", "level": "intermediate"},
    "x-guard-control": {"keywords": ["x guard", "x-guard"], "tags": ["x-guard", "guard", "sweep"], "positions": [], "relevance": "primary_reference", "level": "intermediate"},
}

# ─── VI diacritic normalization ────────────────────────────────────────────────
# Maps simplified-VI words (no diacritics) to proper-VI (full diacritics).
VI_WORD_MAP = {
    # Common BJJ / grappling terms
    'don': 'dòn', 'dòn': 'đòn', 'siét': 'siết', 'siet': 'siết', 'biét': 'biết', 'biet': 'biết',
    'cung': 'cung', 'nên': 'nên', 'nen': 'nên',
    'Huu': 'Hữu', 'Huu ich': 'Hữu ích', 'ich': 'ích',
    'nhu': 'như', 'nhu mot': 'như một',
    'tham khao': 'tham khảo', 'ngoai': 'ngoài',
    'nhin': 'nhìn', 'va': 'và',
    'khi': 'khi',
    'tu': 'từ',
    'Tha': 'Thả', 'tha': 'thả',
    'ngay': 'ngay',
    'hoac': 'hoặc',
    'co': 'có',
    'dau hieu': 'dấu hiệu', 'dau': 'đầu',
    'kho chiu': 'khó chịu',
    'khong': 'không',
    'ep': 'ép',
    'luc': 'lực', 'luc qua': 'lực qua',
    'ham': 'hàm',
    'co': 'cổ',
    # Body parts and positions
    'tay': 'tay',
    'khoa': 'khóa', 'thap': 'thấp',
    'quanh': 'quanh',
    'vi tri': 'vị trí', 'vi': 'vị', 'tri': 'trí',
    'vao': 'vào',
    'tien len': 'tiến lên', 'tien': 'tiến',
    'base': 'base',
    'clear': 'clear',
    'chan': 'chân',
    'Alignment': 'Alignment', 'cua': 'của',
    'Ket noi': 'Kết nối', 'Ket': 'Kết', 'noi': 'nối',
    'nguc': 'ngực',
    'Thu tu': 'Thứ tự', 'thu tu': 'thứ tự', 'thu': 'thứ',
    'hand fight': 'hand fight',
    'truoc': 'trước',
    'Siet sach': 'Siết sạch', 'sach': 'sạch',
    'thay vi': 'thay vì', 'thay': 'thay', 'vi': 'vì',
    'crank ham': 'crank hàm', 'crank': 'crank',
    # Manual entry specific
    'phien ban': 'phiên bản', 'phien': 'phiên', 'ban': 'bản', 'tieu chuan': 'tiêu chuẩn', 'tieu': 'tiêu', 'chuan': 'chuẩn',
    'Nen tang': 'Nền tảng', 'nen tang': 'nền tảng', 'nen': 'nền', 'tang': 'tảng',
    'thoat': 'thoát', 'phan': 'phần',
    'Video tham khao': 'Video tham khảo',
    'tap trung': 'tập trung', 'tap': 'tập', 'trung': 'trung',
    'entry': 'entry',
    'kiem soat': 'kiểm soát', 'kiem': 'kiểm', 'soat': 'soát',
    'giu': 'giữ',
    'cau truc': 'cấu trúc', 'cau': 'cấu', 'truc': 'trúc',
    'tot cho': 'tốt cho', 'tot': 'tốt', 'cho': 'cho',
    'uu tien': 'ưu tiên', 'uu': 'ưu',
    'lay lai': 'lấy lại', 'lay': 'lấy', 'lai': 'lại',
    'bridge lon': 'bridge lớn', 'lon': 'lớn',
    'thien ve': 'thiên về', 'thien': 'thiên',
    'an toan': 'an toàn', 'toan': 'toàn',
    'nhan dien': 'nhận diện', 'nhan': 'nhận', 'dien': 'diện',
    'ky luat': 'kỷ luật', 'ky': 'kỷ', 'luat': 'luật',
    'quan trong': 'quan trọng', 'quan': 'quan', 'trong': 'trọng',
    'moi': 'mỗi',
    'thuc dung': 'thực dụng', 'thuc': 'thực', 'dung': 'dụng',
    'viec': 'việc', 'bien': 'biến',
    'thanh': 'thành',
    'khoang trong': 'khoảng trống', 'khoang': 'khoảng', 'trong': 'trống',
    'chon': 'chọn',
    'recover guard': 'recover guard',
    'underhook': 'underhook',
    'Dat frame': 'Đặt frame', 'Dat': 'Đặt', 'dat': 'đặt',
    'frame': 'frame',
    'di chuyen': 'di chuyển', 'chuyen': 'chuyển',
    'hong': 'hông',
    'bi': 'bị',
    'pressure': 'pressure',
    'An toan dau': 'An toàn đầu',
    'khi thoat': 'khi thoát',
    'Khi nao': 'Khi nào', 'nao': 'nào',
    'co xoay': 'cố xoay', 'co gang': 'cố gắng', 'gang': 'gắng',
    'Keo': 'Kéo', 'keo': 'kéo',
    'lai gan': 'lại gần', 'gan': 'gần',
    'Khong lo': 'Không lộ', 'kho': 'khó', 'lo': 'lộ',
    'hoac tay': 'hoặc tay',
    'Dung chuyen dong': 'Dùng chuyển động', 'dong': 'động',
    'nho': 'nhỏ',
    'dung luc': 'dùng lực',
    # Scraped template patterns
    'cung cap': 'cung cấp', 'cap': 'cấp',
    'phan tich': 'phân tích', 'tich': 'tích',
    'chi tiet': 'chi tiết',
    'voi': 'với',
    'loi khuyen': 'lời khuyên', 'loi': 'lời', 'khuyen': 'khuyên',
    'tap luyen': 'tập luyện', 'luyen': 'luyện',
    'thuc te': 'thực tế',
    # whatToWatchFor patterns
    'Positioning co the': 'Positioning cơ thể', 'co the': 'cơ thể', 'the': 'thể',
    'phan bo': 'phân bổ', 'bo': 'bổ',
    'trong luong': 'trọng lượng', 'luong': 'lượng',
    'Kiem soat grip': 'Kiểm soát grip', 'grip': 'grip',
    'dat tay': 'đặt tay',
    'Mechanics hoan thien': 'Mechanics hoàn thiện', 'hoan': 'hoàn', 'thien': 'thiện',
    'Loi thuong gap': 'Lỗi thường gặp', 'loi': 'lỗi', 'thuong': 'thường',
    'gap': 'gặp',
    'can tranh': 'cần tránh', 'can': 'cần', 'tranh': 'tránh',
    # Heel hook safety caution
    'Heel hook la': 'Heel hook là', 'la': 'là',
    'ky thuat': 'kỹ thuật', 'thuat': 'thuật',
    'safety-critical': 'safety-critical',
    'duoi su': 'dưới sự', 'su': 'sự',
    'giam sat': 'giám sát', 'giam': 'giám', 'sat': 'sát',
    'phu hop': 'phù hợp', 'phu': 'phù', 'hop': 'hợp',
    'va dung': 'và dừng', 'dung': 'dừng',
    'luc xoan': 'lực xoắn', 'xoan': 'xoắn',
    'goi': 'gối',
    'tang manh': 'tăng mạnh', 'tang': 'tăng', 'manh': 'mạnh',
    'Cau truc': 'Cấu trúc',
    'saddle control': 'saddle control',
    'Tang luc': 'Tăng lực',
    'cham': 'chậm',
    'giao tiep': 'giao tiếp', 'giao': 'giao', 'tiep': 'tiếp',
    'partner': 'partner',
    'Dung khi': 'Dừng khi',
    'defender': 'defender',
    'xoay': 'xoay',
}

# Build a sorted list of multi-word keys first (longest match wins)
_VI_MAP_KEYS = sorted(VI_WORD_MAP.keys(), key=len, reverse=True)

def normalize_vi(text: str) -> str:
    """Normalize simplified Vietnamese text to use proper diacritics."""
    import re
    result = text
    for old_word in _VI_MAP_KEYS:
        # Case-sensitive replacement for exact words/phrases
        # Use word-boundary matching to avoid partial replacements
        pattern = re.compile(r'\b' + re.escape(old_word) + r'\b', re.IGNORECASE)
        new_word = VI_WORD_MAP[old_word]
        # Preserve original case pattern
        def replacer(match):
            matched = match.group(0)
            if matched.isupper():
                return new_word.upper()
            elif matched[0].isupper():
                return new_word[0].upper() + new_word[1:]
            else:
                return new_word
        result = pattern.sub(replacer, result)
    return result

try:
    with open("content/yt_channel_cache.json") as f:
        yt_channel_cache = json.load(f)
    print("Loaded channel cache:", len(yt_channel_cache), "entries")
except FileNotFoundError:
    yt_channel_cache = {}
    print("No channel cache found at content/yt_channel_cache.json")

# Load scraped videos
with open("content/bjj_tips_videos.json") as f:
    all_videos = json.load(f)

def match_skill(technique_text, config):
    text_lower = technique_text.lower()
    for kw in config["keywords"]:
        if kw in text_lower:
            return True
    return False

# Build entries from scraped data
scraped_entries = OrderedDict()

for video in all_videos:
    technique = video.get("technique", "")
    summary = video.get("summary", "")
    url = video.get("url", "")
    source_name = video.get("source_name", "")

    if not url:
        continue

    # Extract YouTube ID
    yt_id = ""
    if "=" in url:
        yt_id = url.split("=")[-1].split("&")[0]
    elif "/" in url:
        yt_id = url.split("/")[-1]

    if not yt_id or len(yt_id) < 5:
        continue

    # Find matching skills
    matched_skills = []
    matched_positions = set()
    matched_tags = set()
    relevance = None
    level = None

    text_to_match = technique + " " + summary[:200]

    for skill_id, config in SKILL_MAPPING.items():
        if match_skill(text_to_match, config):
            matched_skills.append(skill_id)
            matched_positions.update(config.get("positions", []))
            matched_tags.update(config.get("tags", []))
            if not relevance or config["relevance"] == "primary_reference":
                relevance = config["relevance"]
            if not level:
                level = config["level"]

    if not matched_skills:
        continue

    # Skip if manual entry covers this youtubeId
    if yt_id in {e["youtubeId"] for e in MANUAL_ENTRIES}:
        continue

    # If already mapped, merge
    if yt_id in scraped_entries:
        existing = scraped_entries[yt_id]
        existing["relatedSkillIds"] = list(set(existing["relatedSkillIds"]) | set(matched_skills))
        existing["relatedPositionIds"] = list(set(existing.get("relatedPositionIds", [])) | matched_positions)
        existing["techniqueTags"] = list(set(existing["techniqueTags"]) | matched_tags)
        continue

    # Generate entry
    src_name = source_name.lower().replace(" ", "-")[:20]
    entry_id = "bjj-" + src_name + "-" + yt_id
    entry_id = re.sub(r"[^a-z0-9_-]", "", entry_id)

    # Resolve real channel name for position-sourced entries
    real_channel = source_name or "BJJ Tips"
    if video.get("source_type") == "positions" and yt_id in yt_channel_cache and yt_channel_cache[yt_id]:
        real_channel = yt_channel_cache[yt_id]

    # Clean up title
    clean_title = technique.strip()
    if len(clean_title) > 120:
        clean_title = clean_title[:117] + "..."

    # Build summary
    why_en = source_name + " provides a detailed breakdown of " + clean_title + " with practical drilling advice."
    why_vi = normalize_vi(source_name + " cung cap phan tich chi tiet voi loi khuyen tap luyen thuc te.")
    why_fr = source_name + " fournit une analyse detaillee avec des conseils pratiques."

    scraped_entries[yt_id] = {
        "id": entry_id,
        "title": (clean_title, clean_title + " (phan tich)", clean_title + " (analyse)"),
        "channelName": real_channel,
        "url": url,
        "youtubeId": yt_id,
        "language": "en",
        "relatedSkillIds": matched_skills,
        "relatedPositionIds": sorted(matched_positions) if matched_positions else [],
        "techniqueTags": sorted(matched_tags) if matched_tags else [],
        "relevance": relevance or "supplemental",
        "level": level or "intermediate",
        "whyUseful": (why_en, why_vi, why_fr),
        "whatToWatchFor": (
            ["Body positioning and weight distribution", "Grip control and placement", "Finishing mechanics", "Common mistakes to avoid"],
            [normalize_vi("Positioning co the va phan bo trong luong"), normalize_vi("Kiem soat grip va dat tay"), normalize_vi("Mechanics hoan thien"), normalize_vi("Loi thuong gap can tranh")],
            ["Positionnement du corps et repartition du poids", "Controle et placement des grips", "Mecanique de finition", "Erreurs courantes a eviter"],
        ),
        "sourceNote": "Curated from bjj.tips public YouTube listings.",
    }

# Add caution for safety entries
for entry in list(scraped_entries.values()):
    if entry["relevance"] == "safety_reference":
        entry["caution"] = (
            "Heel hooks are safety-critical. Train under qualified supervision and stop before rotational knee pressure spikes.",
            "Heel hook la ky thuat safety-critical. Tap duoi su giam sat phu hop va dung truoc khi luc xoan vao goi tang manh.",
            "Les heel hooks sont critiques pour la securite. Travaillez sous supervision et arretez avant le pic de torsion au genou.",
        )

# Merge all entries
all_entries = OrderedDict()

# Manual entries first (priority)
for entry in MANUAL_ENTRIES:
    all_entries[entry["youtubeId"]] = entry

# Scraped entries (skip if already covered)
for yt_id, entry in scraped_entries.items():
    if yt_id not in all_entries:
        all_entries[yt_id] = entry

print("Total unique entries:", len(all_entries))
print("  - Manual:", len(MANUAL_ENTRIES))
print("  - From scraped data:", len(all_entries) - len(MANUAL_ENTRIES))

# Generate TypeScript file
Q = '"'

def q(s):
    escaped = s.replace("\\", "\\\\").replace('"', '\\"')
    return Q + escaped + Q

def str_arr(items):
    if not items:
        return "[]"
    return "[" + ", ".join(q(x) for x in items) + "]"

lines = []
lines.append("import type { VideoReference } from '../../types/video'")
lines.append("")
lines.append("// Curated public YouTube references only. Keep this list human-reviewed:")
lines.append("// no transcripts, no pirated course footage, no invented IDs.")
lines.append("const lt = (en: string, vi: string, fr: string) => ({ en, vi, fr })")
lines.append("const la = (en: string[], vi: string[], fr: string[]) => ({ en, vi, fr })")
lines.append("")
lines.append("export const videoReferences: VideoReference[] = [")

entries_list = list(all_entries.values())
for i, entry in enumerate(entries_list):
    comma = "," if i < len(entries_list) - 1 else ""

    lines.append("  {")
    lines.append("    id: " + q(entry["id"]) + ",")
    lines.append("    provider: 'youtube',")
    t = entry["title"]
    lines.append("    title:")
    lines.append("      lt(")
    lines.append("        " + q(t[0]) + ",")
    lines.append("        " + q(normalize_vi(t[1])) + ",")
    lines.append("        " + q(t[2]) + ",")
    lines.append("      ),")
    lines.append("    channelName: " + q(entry["channelName"]) + ",")
    lines.append("    url: " + q(entry["url"]) + ",")
    lines.append("    embedUrl: " + q("https://www.youtube.com/embed/" + entry["youtubeId"]) + ",")
    lines.append("    youtubeId: " + q(entry["youtubeId"]) + ",")
    lines.append("    language: 'en',")
    lines.append("    relatedSkillIds: " + str_arr(entry["relatedSkillIds"]) + ",")
    if entry.get("relatedPositionIds"):
        lines.append("    relatedPositionIds: " + str_arr(entry["relatedPositionIds"]) + ",")
    lines.append("    techniqueTags: " + str_arr(entry.get("techniqueTags", [])) + ",")
    lines.append("    relevance: " + q(entry["relevance"]) + ",")
    lines.append("    level: " + q(entry["level"]) + ",")
    w = entry["whyUseful"]
    lines.append("    whyUseful:")
    lines.append("      lt(")
    lines.append("        " + q(w[0]) + ",")
    lines.append("        " + q(normalize_vi(w[1])) + ",")
    lines.append("        " + q(w[2]) + ",")
    lines.append("      ),")
    wa = entry["whatToWatchFor"]
    lines.append("    whatToWatchFor:")
    lines.append("      la(")
    lines.append("        " + str_arr(wa[0]) + ",")
    lines.append("        " + str_arr([normalize_vi(s) for s in wa[1]]) + ",")
    lines.append("        " + str_arr(wa[2]) + ",")
    lines.append("      ),")
    if entry.get("caution"):
        c = entry["caution"]
        lines.append("    caution:")
        lines.append("      lt(")
        lines.append("        " + q(c[0]) + ",")
        lines.append("        " + q(normalize_vi(c[1])) + ",")
        lines.append("        " + q(c[2]) + ",")
        lines.append("      ),")
    ts_data = entry.get("timestamps")
    if ts_data:
        lines.append("    timestamps: [")
        for ts_idx, ts in enumerate(ts_data):
            ts_id = ts[0]
            ts_label_en = ts[1]
            ts_label_vi = ts[2]
            ts_label_fr = ts[3]
            ts_time = ts[4]
            ts_comma = "," if ts_idx < len(ts_data) - 1 else ""
            lines.append("      {")
            lines.append("        id: " + q(ts_id) + ",")
            lines.append("        label:")
            lines.append("          lt(")
            lines.append("            " + q(ts_label_en) + ",")
            lines.append("            " + q(ts_label_vi) + ",")
            lines.append("            " + q(ts_label_fr) + ",")
            lines.append("          ),")
            lines.append("        timeSeconds: " + str(ts_time) + ",")
            lines.append("      }" + ts_comma)
        lines.append("    ],")
    lines.append("    sourceNote: " + q(entry.get("sourceNote", "Curated from bjj.tips public YouTube listings.")) + ",")
    lines.append("  }" + comma)

lines.append("]")
lines.append("")

with open("src/data/videos/videoReferences.ts", "w") as f:
    f.write("\n".join(lines) + "\n")

print("")
print("File written: src/data/videos/videoReferences.ts")
print("Total entries:", len(entries_list))
