import type { VideoReference } from '../../types/video'
import { newTrustedVideos } from './new_trusted_videos'

// Curated public YouTube references only. Keep this list human-reviewed:
// no transcripts, no pirated course footage, no invented IDs, and no Gi-only techniques.
// BJJ.Tips imports require visible No-Gi proof in title/source or a trusted No-Gi channel.
export const videoReferences: VideoReference[] = [
  {
    "id": "lachlan-rnc-three-chokes",
    "provider": "youtube",
    "title": {
      "en": "3 BJJ Chokes That Everybody Should Know",
      "vi": "3 đòn siết BJJ ai cung nên biết",
      "fr": "3 étranglements BJJ à connaître"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=LhB7Y7LAig0",
    "embedUrl": "https://www.youtube.com/embed/LhB7Y7LAig0",
    "youtubeId": "LhB7Y7LAig0",
    "language": "en",
    "relatedSkillIds": [
      "rear-naked-choke-system"
    ],
    "relatedPositionIds": [
      "back-control-position"
    ],
    "techniqueTags": [
      "rnc",
      "rear-naked-choke",
      "back-control",
      "choke"
    ],
    "relevance": "supplemental",
    "level": "intermediate",
    "whyUseful": {
      "en": "Useful as an outside visual reference for choke alignment and finishing mechanics from back control.",
      "vi": "Hữu ích như Video tham khảo ngoài de nhìn Alignment và mechanics finish khi siết từ back control.",
      "fr": "Utile comme reference visuelle externe pour alignement et mecanique de finish depuis le dos."
    },
    "whatToWatchFor": {
      "en": [
        "Choking elbow alignment",
        "Head and chest connection",
        "Hand-fight order before squeezing",
        "Clean strangle instead of jaw crank"
      ],
      "vi": [
        "Alignment của elbow siết",
        "Kết nối đầu và ngực",
        "Thứ tự hand fight trước khi siết",
        "Siết sạch thay vì crank hàm"
      ],
      "fr": [
        "Alignement du coude étrangleur",
        "Connexion tete et poitrine",
        "Ordre du hand fight avant serrage",
        "Etranglement propre plutot que machoire"
      ]
    },
    "caution": {
      "en": "Release immediately on tap or distress; do not force pressure through the jaw or neck.",
      "vi": "Thả ngay khi tập hoặc cổ dấu hiệu khó chịu; không ép lực qua hàm hoặc cổ.",
      "fr": "Relachez immediatement au tap ou signe de detresse; ne forcez pas sur la machoire ou le cou."
    },
    "timestamps": [
      {
        "id": "intro",
        "label": {
          "en": "Intro",
          "vi": "Giới thiệu",
          "fr": "Introduction"
        },
        "timeSeconds": 0
      },
      {
        "id": "rnc",
        "label": {
          "en": "Rear Naked Choke",
          "vi": "Đòn siết cổ sau",
          "fr": "Étranglement arrière"
        },
        "timeSeconds": 60
      },
      {
        "id": "guillotine",
        "label": {
          "en": "Guillotine Choke",
          "vi": "Đòn siết guillotine",
          "fr": "Étranglement guillotine"
        },
        "timeSeconds": 372
      },
      {
        "id": "anaconda",
        "label": {
          "en": "Anaconda Choke",
          "vi": "Đòn siết anaconda",
          "fr": "Étranglement anaconda"
        },
        "timeSeconds": 660
      }
    ],
    "sourceNote": "Public YouTube reference found via BJJ Tips listing for Lachlan Giles videos."
  },
  {
    "id": "lachlan-body-lock-pass-standard",
    "provider": "youtube",
    "title": {
      "en": "The Body Lock Pass: Standard version",
      "vi": "Body Lock Pass: phiên bản tiêu chuẩn",
      "fr": "Body Lock Pass : version standard"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=ce7g__eV5iA",
    "embedUrl": "https://www.youtube.com/embed/ce7g__eV5iA",
    "youtubeId": "ce7g__eV5iA",
    "language": "en",
    "relatedSkillIds": [
      "bodylock-passing",
      "bodylock-pass"
    ],
    "relatedPositionIds": [
      "butterfly-guard"
    ],
    "techniqueTags": [
      "bodylock",
      "passing",
      "butterfly-guard",
      "hip-control"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "A focused public reference for the bodylock pass entry, hip-line control, and keeping the pass structured before clearing legs.",
      "vi": "Video tham khảo public tập trung vào entry bodylock, kiểm soát hip line và giữ cấu trúc trước khi clear chân.",
      "fr": "Reference publique centree sur entree bodylock, controle de la hip line et structure avant de passer les jambes."
    },
    "whatToWatchFor": {
      "en": [
        "Hands locked low around the hip line",
        "Head position while entering",
        "Leg blocking before advancing",
        "Balance while clearing the knee line"
      ],
      "vi": [
        "Tay khóa thấp quanh hip line",
        "Vị trí đầu khi vào pass",
        "Chân chân trước khi tiến lên",
        "Base khi clear knee line"
      ],
      "fr": [
        "Mains verrouillees bas autour de la hip line",
        "Position de tete a entree",
        "Blocage des jambes avant avancer",
        "Base en passant la knee line"
      ]
    },
    "timestamps": [
      {
        "id": "full-video",
        "label": {
          "en": "Full technique breakdown",
          "vi": "Phân tích kỹ thuật toàn bộ",
          "fr": "Analyse technique complète"
        },
        "timeSeconds": 0
      }
    ],
    "sourceNote": "Public YouTube reference found via BJJ Tips listing for Lachlan Giles videos."
  },
  {
    "id": "lachlan-inside-heel-hook-setup-safety",
    "provider": "youtube",
    "title": {
      "en": "Inside Heel Hook: Setup and Safety",
      "vi": "Inside Heel Hook: setup và an toàn",
      "fr": "Inside Heel Hook : setup et securite"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=w-W0ug7Edag",
    "embedUrl": "https://www.youtube.com/embed/w-W0ug7Edag",
    "youtubeId": "w-W0ug7Edag",
    "language": "en",
    "relatedSkillIds": [
      "heel-hook-safety",
      "leg-lock-safety-basics",
      "saddle-inside-sankaku-control"
    ],
    "relatedPositionIds": [
      "saddle-inside-sankaku"
    ],
    "techniqueTags": [
      "heel-hook",
      "inside-heel-hook",
      "saddle",
      "knee-line",
      "safety"
    ],
    "relevance": "safety_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "A safety-first reference for why control, knee-line awareness, and release discipline matter before any heel hook pressure.",
      "vi": "Video tham khảo thiên về an toàn: vì sao control, nhận diện knee line và kỷ luật Thả quan trọng trước mỗi lực heel hook.",
      "fr": "Reference orientee securite sur le controle, la knee line et la discipline de relache avant toute pression heel hook."
    },
    "whatToWatchFor": {
      "en": [
        "Knee-line control before finishing",
        "Saddle control shape",
        "Slow pressure and partner communication",
        "Abort when the defender cannot rotate safely"
      ],
      "vi": [
        "Kiểm soát knee line trước finish",
        "Cấu trúc saddle control",
        "Tăng lực chậm và giao tiếp với partner",
        "Dừng khi defender không thể xoay an toàn"
      ],
      "fr": [
        "Controle de knee line avant finish",
        "Structure de controle saddle",
        "Pression lente et communication",
        "Arret si defenseur ne peut pas tourner en securite"
      ]
    },
    "caution": {
      "en": "Heel hooks are safety-critical. Train under qualified supervision and stop before rotational knee pressure spikes.",
      "vi": "Heel hook là kỹ thuật safety-critical. Tập dưới sự giám sát phù hợp và dừng trước khi lực xoắn vào gối tăng mạnh.",
      "fr": "Les heel hooks sont critiques pour la securite. Travaillez sous supervision et arretez avant le pic de torsion au genou."
    },
    "timestamps": [
      {
        "id": "full-video",
        "label": {
          "en": "Full technique breakdown",
          "vi": "Phân tích kỹ thuật toàn bộ",
          "fr": "Analyse technique complète"
        },
        "timeSeconds": 0
      }
    ],
    "sourceNote": "Public YouTube reference found via BJJ Tips listing for Lachlan Giles videos."
  },
  {
    "id": "lachlan-side-control-escape-frames",
    "provider": "youtube",
    "title": {
      "en": "Escape Side Control Fundamentals Part 1: Prevention and Frames Escape",
      "vi": "Nền tảng thoát side control phần 1: Phong ngua và frame thoát",
      "fr": "Fondamentaux sortie side control partie 1 : Prevention et sortie frames"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=LFl6mmLhxIQ",
    "embedUrl": "https://www.youtube.com/embed/LFl6mmLhxIQ",
    "youtubeId": "LFl6mmLhxIQ",
    "language": "en",
    "relatedSkillIds": [
      "side-control-escape"
    ],
    "relatedPositionIds": [
      "side-control-bottom"
    ],
    "techniqueTags": [
      "side-control",
      "escape",
      "frames",
      "underhook"
    ],
    "relevance": "supplemental",
    "level": "beginner",
    "whyUseful": {
      "en": "A practical reference for turning frames into space before choosing guard recovery, underhook, or turtle.",
      "vi": "Video tham khảo thực dụng cho việc biến frame thành khoảng trống trước khi chọn recover guard, underhook hoặc turtle.",
      "fr": "Reference pratique pour transformer les frames en espace avant de choisir recover guard, underhook ou turtle."
    },
    "whatToWatchFor": {
      "en": [
        "Frame placement before hip movement",
        "Elbow position under pressure",
        "Head safety during the escape",
        "When to recover guard instead of forcing the turn"
      ],
      "vi": [
        "Đặt frame trước khi di chuyển hông",
        "Vị trí elbow khi bị pressure",
        "An toàn đầu khi thoát",
        "Khi nào recover guard thay vì cố xoay"
      ],
      "fr": [
        "Placement des frames avant mouvement des hanches",
        "Position du coude sous pression",
        "Securite de la tete pendant la sortie",
        "Quand recuperer la garde que forcer le turn"
      ]
    },
    "timestamps": [
      {
        "id": "full-video",
        "label": {
          "en": "Full technique breakdown",
          "vi": "Phân tích kỹ thuật toàn bộ",
          "fr": "Analyse technique complète"
        },
        "timeSeconds": 0
      }
    ],
    "sourceNote": "Public YouTube reference found via BJJ Tips listing for Lachlan Giles videos."
  },
  {
    "id": "lachlan-mount-escape-inside-leg",
    "provider": "youtube",
    "title": {
      "en": "Mount escape: The most important battle to win",
      "vi": "Thoát mount: tran chien quan trọng nhat",
      "fr": "Sortie de mount : la bataille la plus importante"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=S5zkk2B7pfw",
    "embedUrl": "https://www.youtube.com/embed/S5zkk2B7pfw",
    "youtubeId": "S5zkk2B7pfw",
    "language": "en",
    "relatedSkillIds": [
      "mount-escape",
      "mount-survival"
    ],
    "relatedPositionIds": [
      "mount-bottom"
    ],
    "techniqueTags": [
      "mount",
      "escape",
      "inside-position",
      "elbow-knee"
    ],
    "relevance": "supplemental",
    "level": "beginner",
    "whyUseful": {
      "en": "Good outside reference for the mount escape priority: regain inside leg position before chasing a big bridge.",
      "vi": "Video tham khảo tốt cho ưu tiên thoát mount: lấy lại inside leg position trước khi cổ bridge lớn.",
      "fr": "Bonne reference externe pour la priorite de sortie de mount : regagner inside leg position avant de chercher un grand bridge."
    },
    "whatToWatchFor": {
      "en": [
        "Inside leg positioning",
        "Knee-elbow recovery",
        "Avoid exposing neck or arms",
        "Use small hip movement before big effort"
      ],
      "vi": [
        "Inside leg positioning",
        "Kéo knee-elbow lại gần",
        "Không lộ cổ hoặc tay",
        "Dùng chuyển động hông nhỏ trước khi dùng lực lớn"
      ],
      "fr": [
        "Position interieure des jambes",
        "Recuperation genou-coude",
        "Ne pas exposer cou ou bras",
        "Petit mouvement des hanches avant gros effort"
      ]
    },
    "timestamps": [
      {
        "id": "full-video",
        "label": {
          "en": "Full technique breakdown",
          "vi": "Phân tích kỹ thuật toàn bộ",
          "fr": "Analyse technique complète"
        },
        "timeSeconds": 0
      }
    ],
    "sourceNote": "Public YouTube reference found via BJJ Tips listing for Lachlan Giles videos."
  },
  {
    "id": "buggy-choke-safety-reference",
    "provider": "youtube",
    "title": {
      "en": "The Buggy Choke",
      "vi": "Thể Buggy Choke",
      "fr": "The Buggy Choke"
    },
    "channelName": "ZombieProofBJJ",
    "url": "https://www.youtube.com/watch?v=-b7Avb1x7g8",
    "embedUrl": "https://www.youtube.com/embed/-b7Avb1x7g8",
    "youtubeId": "-b7Avb1x7g8",
    "language": "en",
    "relatedSkillIds": [
      "buggy-choke"
    ],
    "techniqueTags": [
      "buggy-choke",
      "submission",
      "neck-safety",
      "escape-counter"
    ],
    "relevance": "safety_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "A focused reference for understanding buggy choke mechanics and why neck alignment and partner communication are critical when training this submission from side control bottom.",
      "vi": "Video tham khảo tập trung vào cổ che buggy choke và vì sao canh cổ và giao tiếp với partner là rat quan trọng khi tập kỹ thuật nay từ duoi side control.",
      "fr": "Reference centree sur la mecanique du buggy choke et pourquoi l'alignement du cou et la communication sont cruciaux quand on travaille cette soumission."
    },
    "whatToWatchFor": {
      "en": [
        "Neck alignment during the roll",
        "Partner awareness before applying pressure",
        "Spine position under load",
        "Release discipline on resistance"
      ],
      "vi": [
        "Canh cổ khi xoay nguoi",
        "Nhận thực của partner trước khi ép lực",
        "Vị trí cot song khi chiu tai",
        "Kỷ luật Thả khi gặp khang cu"
      ],
      "fr": [
        "Alignement du cou pendant le roulis",
        "Conscience du partenaire avant d'appliquer la pression",
        "Position de la colonne sous charge",
        "Discipline de relachement sur resistance"
      ]
    },
    "caution": {
      "en": "Buggy chokes apply rotational pressure to the neck and spine. Tap immediately on any neck discomfort. Do not bridge or roll explosively while the choke is locked.",
      "vi": "Buggy choke gay ap lực xoắn len cổ và cot song. Tập ngay khi cổ khó chịu. Không bridge hoặc xoay mạnh khi choke da khóa.",
      "fr": "Les buggy chokes appliquent une pression rotationnelle sur le cou et la colonne. Tapez immediatement sur toute gene cervicale."
    },
    "timestamps": [
      {
        "id": "full-video",
        "label": {
          "en": "Full technique breakdown",
          "vi": "Phan tich ky thuat toan bo",
          "fr": "Analyse technique complete"
        },
        "timeSeconds": 0
      }
    ],
    "sourceNote": "Public YouTube reference selected for safety-critical coverage."
  },
  {
    "id": "false-reap-safety-reference",
    "provider": "youtube",
    "title": {
      "en": "Don't Fear the Reaper in BJJ (Protect Your Knee & Avoid DQ in IBJJF)",
      "vi": "Dừng so Reaper trống BJJ (Bao ve gối và tránh DQ trống IBJJF)",
      "fr": "N'ayez pas peur du Reaper en BJJ (Protegez votre genou et evitez DQ en IBJJF)"
    },
    "channelName": "Chewjitsu",
    "url": "https://www.youtube.com/watch?v=bqiMzgjmo_U",
    "embedUrl": "https://www.youtube.com/embed/bqiMzgjmo_U",
    "youtubeId": "bqiMzgjmo_U",
    "language": "en",
    "relatedSkillIds": [
      "false-reap-entry",
      "heel-hook-safety",
      "leg-lock-safety-basics"
    ],
    "relatedPositionIds": [
      "saddle-inside-sankaku"
    ],
    "techniqueTags": [
      "knee-reap",
      "false-reap",
      "leg-lock",
      "knee-safety",
      "injury-prevention"
    ],
    "relevance": "safety_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Essential safety reference for understanding the knee reap mechanism, why the false reap entry can still stress the knee, and how to train leg entanglements responsibly.",
      "vi": "Tham khảo an toàn cần thiet de hieu cổ che knee reap, vì sao false reap entry van cơ thể gay ap lực len gối, và cach tập leg entanglement mot cach cổ trach nhiem.",
      "fr": "Reference de securite essentielle pour comprendre le mecanisme du knee reap, pourquoi la false reap entry peut stresser le genou, et comment travailler les leg entanglements de facon responsable."
    },
    "whatToWatchFor": {
      "en": [
        "Knee rotation limits during reap",
        "Recognizing when the knee line is compromised",
        "Escaping before rotational pressure spikes",
        "IBJJF rules for knee reaping"
      ],
      "vi": [
        "Gioi han xoay gối khi reap",
        "Nhận biết khi knee line bị ton thường",
        "Thoát trước khi ap lực xoắn tăng mạnh",
        "Luật IBJJF ve knee reap"
      ],
      "fr": [
        "Limites de rotation du genou pendant le reap",
        "Reconnaitre quand la knee line est compromise",
        "Sortir avant le pic de pression rotationnelle",
        "Regles IBJJF sur le knee reap"
      ]
    },
    "caution": {
      "en": "The reap position and false reap both put rotational stress on the knee. Train with a trusted partner, increase pressure gradually, and stop immediately if the defender cannot rotate their hips freely.",
      "vi": "Reap position và false reap deu gay ap lực xoắn len gối. Tập với partner dang tin cay, Tăng lực từ từ và dừng ngay khi defender không thể xoay hông từ do.",
      "fr": "La position de reap et la false reap mettent toutes deux un stress rotationnel sur le genou. Travaillez avec un partenaire de confiance et arretez si le defenseur ne peut pas tourner librement."
    },
    "timestamps": [
      {
        "id": "full-video",
        "label": {
          "en": "Full technique breakdown",
          "vi": "Phan tich ky thuat toan bo",
          "fr": "Analyse technique complete"
        },
        "timeSeconds": 0
      }
    ],
    "sourceNote": "Public YouTube reference selected for safety-critical coverage."
  },
  {
    "id": "smother-safety-reference",
    "provider": "youtube",
    "title": {
      "en": "Simple Mother's Milk Submission Smother Choke",
      "vi": "Đòn Mother's Milk Submission Smother Choke đòn gian",
      "fr": "Simple soumission Mother's Milk Smother Choke"
    },
    "channelName": "Invisible Jiu Jitsu",
    "url": "https://www.youtube.com/watch?v=2uAzRUGtnkA",
    "embedUrl": "https://www.youtube.com/embed/2uAzRUGtnkA",
    "youtubeId": "2uAzRUGtnkA",
    "language": "en",
    "relatedSkillIds": [
      "smother-safety"
    ],
    "techniqueTags": [
      "smother-choke",
      "mothers-milk",
      "mount",
      "positional-control",
      "breathing-safety"
    ],
    "relevance": "safety_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "A reference for understanding smother choke mechanics, mouth/breathing safety, and the importance of partner communication when training face-covering submissions.",
      "vi": "Tham khảo de hieu cổ che smother choke, an toàn mieng/tho, và tam quan trọng của giao tiếp partner khi tập submissions biết mat.",
      "fr": "Reference pour comprendre la mecanique du smother choke, la securite respiratoire et l'importance de la communication lors de l'entrainement des soumissions couvrant le visage."
    },
    "whatToWatchFor": {
      "en": [
        "Mouth and nose clearance",
        "Partner breathing awareness",
        "Releasing when the defender cannot breathe",
        "Avoiding forcing through resistance"
      ],
      "vi": [
        "Thong thoang mieng và mui",
        "Nhận thực ve hoi tho của partner",
        "Thả khi defender không thể tho",
        "Tránh cổ ép qua khang cu"
      ],
      "fr": [
        "Degagement bouche et nez",
        "Conscience de la respiration du partenaire",
        "Relacher quand le defenseur ne peut pas respirer",
        "Eviter de forcer a travers la resistance"
      ]
    },
    "caution": {
      "en": "Smother chokes restrict breathing. Tap immediately if you cannot breathe or feel panic. Do not apply force over the mouth and nose simultaneously. Train only with trusted partners.",
      "vi": "Smother choke han che tho. Tập ngay neu không thể tho hoặc cam thay hoang loan. Không ép lực len mieng và mui cung lực. Chi tập với partner dang tin cay.",
      "fr": "Les smother chokes restreignent la respiration. Tapez immediatement si vous ne pouvez pas respirer ou sentez de la panique. Ne forcez pas sur la bouche et le nez simultanement."
    },
    "timestamps": [
      {
        "id": "full-video",
        "label": {
          "en": "Full technique breakdown",
          "vi": "Phan tich ky thuat toan bo",
          "fr": "Analyse technique complete"
        },
        "timeSeconds": 0
      }
    ],
    "sourceNote": "Public YouTube reference selected for safety-critical coverage."
  },
  {
    "id": "bjj-adam-wardzinski-m8tjs",
    "provider": "youtube",
    "title": {
      "en": "Adam Wardziński&#x27;s UNSTOPPABLE Butterfly Guard Sweep System  #bjj #jobelteixeiranubjj #grappling",
      "vi": "Adam Wardziński&#x27;s UNSTOPPABLE Butterfly Guard Sweep System  #bjj #jobelteixeiranubjj #grappling (phân tích)",
      "fr": "Adam Wardziński&#x27;s UNSTOPPABLE Butterfly Guard Sweep System  #bjj #jobelteixeiranubjj #grappling (analyse)"
    },
    "channelName": "Adam Wardzinski",
    "url": "https://www.youtube.com/watch?v=XmR8CHtjPVs",
    "embedUrl": "https://www.youtube.com/embed/XmR8CHtjPVs",
    "youtubeId": "XmR8CHtjPVs",
    "language": "en",
    "relatedSkillIds": [
      "butterfly-guard-off-balance"
    ],
    "relatedPositionIds": [
      "butterfly-guard"
    ],
    "techniqueTags": [
      "butterfly-guard",
      "guard-system",
      "off-balance",
      "sweep"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Adam Wardzinski provides a detailed breakdown of Adam Wardziński&#x27;s UNSTOPPABLE Butterfly Guard Sweep System  #bjj #jobelteixeiranubjj #grappling with practical drilling advice.",
      "vi": "Adam Wardzinski cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Adam Wardzinski fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-andre-galvao-_0ww",
    "provider": "youtube",
    "title": {
      "en": "[NO-GI ALLERT] 🚨 Headquarters Guard Pass To Gift Wrap by ADCC Hall of Fame Andre Galvao",
      "vi": "[NO-GI ALLERT] 🚨 Headquarters Guard Pass To Gift Wrap by ADCC Hall of Fame Andre Galvao (phân tích)",
      "fr": "[NO-GI ALLERT] 🚨 Headquarters Guard Pass To Gift Wrap by ADCC Hall of Fame Andre Galvao (analyse)"
    },
    "channelName": "Andre Galvao",
    "url": "https://www.youtube.com/watch?v=_F0ODVYOQww",
    "embedUrl": "https://www.youtube.com/embed/_F0ODVYOQww",
    "youtubeId": "_F0ODVYOQww",
    "language": "en",
    "relatedSkillIds": [
      "headquarters-passing"
    ],
    "techniqueTags": [
      "guard-passing",
      "headquarters",
      "passing"
    ],
    "relevance": "supplemental",
    "level": "intermediate",
    "whyUseful": {
      "en": "Andre Galvao provides a detailed breakdown of [NO-GI ALLERT] 🚨 Headquarters Guard Pass To Gift Wrap by ADCC Hall of Fame Andre Galvao with practical drilling advice.",
      "vi": "Andre Galvao cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Andre Galvao fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-bernardo-faria-5lt8g",
    "provider": "youtube",
    "title": {
      "en": "Bernardo Faria&#x27;s #1 Tip for Escaping BIGGER Opponents 🏃‍♂️💨  #jiujitsu #bjj  #grappling",
      "vi": "Bernardo Faria&#x27;s #1 Tip for Escaping BIGGER Opponents 🏃‍♂️💨  #jiujitsu #bjj  #grappling (phân tích)",
      "fr": "Bernardo Faria&#x27;s #1 Tip for Escaping BIGGER Opponents 🏃‍♂️💨  #jiujitsu #bjj  #grappling (analyse)"
    },
    "channelName": "Bernardo Faria",
    "url": "https://www.youtube.com/watch?v=B5lJMtF8LgA",
    "embedUrl": "https://www.youtube.com/embed/B5lJMtF8LgA",
    "youtubeId": "B5lJMtF8LgA",
    "language": "en",
    "relatedSkillIds": [
      "side-control-escape"
    ],
    "relatedPositionIds": [
      "side-control-bottom"
    ],
    "techniqueTags": [
      "escape",
      "frames",
      "side-control",
      "underhook"
    ],
    "relevance": "supplemental",
    "level": "beginner",
    "whyUseful": {
      "en": "Bernardo Faria provides a detailed breakdown of Bernardo Faria&#x27;s #1 Tip for Escaping BIGGER Opponents 🏃‍♂️💨  #jiujitsu #bjj  #grappling with practical drilling advice.",
      "vi": "Bernardo Faria cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Bernardo Faria fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-bernardo-faria-q24zyqk",
    "provider": "youtube",
    "title": {
      "en": "Bernardo Faria&#x27;s No Gi Jiu Jitsu Fundamentals",
      "vi": "Bernardo Faria&#x27;s No Gi Jiu Jitsu Fundamentals (phân tích)",
      "fr": "Bernardo Faria&#x27;s No Gi Jiu Jitsu Fundamentals (analyse)"
    },
    "channelName": "Bernardo Faria",
    "url": "https://www.youtube.com/watch?v=qSF2WZ4zyqk",
    "embedUrl": "https://www.youtube.com/embed/qSF2WZ4zyqk",
    "youtubeId": "qSF2WZ4zyqk",
    "language": "en",
    "relatedSkillIds": [
      "side-control-escape"
    ],
    "relatedPositionIds": [
      "side-control-bottom"
    ],
    "techniqueTags": [
      "escape",
      "frames",
      "side-control",
      "underhook"
    ],
    "relevance": "supplemental",
    "level": "beginner",
    "whyUseful": {
      "en": "Bernardo Faria provides a detailed breakdown of Bernardo Faria&#x27;s No Gi Jiu Jitsu Fundamentals with practical drilling advice.",
      "vi": "Bernardo Faria cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Bernardo Faria fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-brian-glick-q25zqch",
    "provider": "youtube",
    "title": {
      "en": "Easy Dilemma to Escape From Side Control with Brian Glick",
      "vi": "Easy Dilemma to Escape From Side Control with Brian Glick (phân tích)",
      "fr": "Easy Dilemma to Escape From Side Control with Brian Glick (analyse)"
    },
    "channelName": "Brian Glick",
    "url": "https://www.youtube.com/watch?v=Zq2R5zQqchQ",
    "embedUrl": "https://www.youtube.com/embed/Zq2R5zQqchQ",
    "youtubeId": "Zq2R5zQqchQ",
    "language": "en",
    "relatedSkillIds": [
      "side-control-escape"
    ],
    "relatedPositionIds": [
      "side-control-bottom"
    ],
    "techniqueTags": [
      "escape",
      "frames",
      "side-control",
      "underhook"
    ],
    "relevance": "supplemental",
    "level": "beginner",
    "whyUseful": {
      "en": "Brian Glick provides a detailed breakdown of Easy Dilemma to Escape From Side Control with Brian Glick with practical drilling advice.",
      "vi": "Brian Glick cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Brian Glick fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-brian-glick-rl76xe",
    "provider": "youtube",
    "title": {
      "en": "3 No Gi Guard Pulls You Should Know",
      "vi": "3 No Gi Guard Pulls You Should Know (phân tích)",
      "fr": "3 No Gi Guard Pulls You Should Know (analyse)"
    },
    "channelName": "Brian Glick",
    "url": "https://www.youtube.com/watch?v=rBlK7MT6xeQ",
    "embedUrl": "https://www.youtube.com/embed/rBlK7MT6xeQ",
    "youtubeId": "rBlK7MT6xeQ",
    "language": "en",
    "relatedSkillIds": [
      "guard-pulling-strategy"
    ],
    "techniqueTags": [
      "guard-entry",
      "guard-pull",
      "strategy"
    ],
    "relevance": "supplemental",
    "level": "beginner",
    "whyUseful": {
      "en": "Brian Glick provides a detailed breakdown of 3 No Gi Guard Pulls You Should Know with practical drilling advice.",
      "vi": "Brian Glick cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Brian Glick fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-craig-jones-bfo1k",
    "provider": "youtube",
    "title": {
      "en": "Craig Jones Clearing the kneeline. Leglock defense",
      "vi": "Craig Jones Clearing thể kneeline. Leglock defense (phân tích)",
      "fr": "Craig Jones Clearing the kneeline. Leglock defense (analyse)"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=JbRfIo1NTLk",
    "embedUrl": "https://www.youtube.com/embed/JbRfIo1NTLk",
    "youtubeId": "JbRfIo1NTLk",
    "language": "en",
    "relatedSkillIds": [
      "heel-hook-safety"
    ],
    "relatedPositionIds": [
      "saddle-inside-sankaku"
    ],
    "techniqueTags": [
      "heel-hook",
      "knee-line",
      "leg-lock",
      "safety"
    ],
    "relevance": "safety_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Craig Jones provides a detailed breakdown of Craig Jones Clearing the kneeline. Leglock defense with practical drilling advice.",
      "vi": "Craig Jones cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Craig Jones fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "caution": {
      "en": "Heel hooks are safety-critical. Train under qualified supervision and stop before rotational knee pressure spikes.",
      "vi": "Heel hook là kỹ thuật safety-critical. Tập dưới sự giám sát phù hợp và dừng trước khi lực xoắn vào gối tăng mạnh.",
      "fr": "Les heel hooks sont critiques pour la securite. Travaillez sous supervision et arretez avant le pic de torsion au genou."
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-craig-jones-link71j0",
    "provider": "youtube",
    "title": {
      "en": "Outside Heel Hook Kneebar by Craig Jones",
      "vi": "Outside Heel Hook Kneebar by Craig Jones (phân tích)",
      "fr": "Outside Heel Hook Kneebar by Craig Jones (analyse)"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=liNnk7X1Bj0",
    "embedUrl": "https://www.youtube.com/embed/liNnk7X1Bj0",
    "youtubeId": "liNnk7X1Bj0",
    "language": "en",
    "relatedSkillIds": [
      "heel-hook-safety"
    ],
    "relatedPositionIds": [
      "saddle-inside-sankaku"
    ],
    "techniqueTags": [
      "heel-hook",
      "knee-line",
      "leg-lock",
      "safety"
    ],
    "relevance": "safety_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Craig Jones provides a detailed breakdown of Outside Heel Hook Kneebar by Craig Jones with practical drilling advice.",
      "vi": "Craig Jones cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Craig Jones fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "caution": {
      "en": "Heel hooks are safety-critical. Train under qualified supervision and stop before rotational knee pressure spikes.",
      "vi": "Heel hook là kỹ thuật safety-critical. Tập dưới sự giám sát phù hợp và dừng trước khi lực xoắn vào gối tăng mạnh.",
      "fr": "Les heel hooks sont critiques pour la securite. Travaillez sous supervision et arretez avant le pic de torsion au genou."
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-craig-jones--u6wdw",
    "provider": "youtube",
    "title": {
      "en": "Outside Heel Hook Kneebar by Craig Jones",
      "vi": "Outside Heel Hook Kneebar by Craig Jones (phân tích)",
      "fr": "Outside Heel Hook Kneebar by Craig Jones (analyse)"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=-uTD6BwDCdw",
    "embedUrl": "https://www.youtube.com/embed/-uTD6BwDCdw",
    "youtubeId": "-uTD6BwDCdw",
    "language": "en",
    "relatedSkillIds": [
      "heel-hook-safety"
    ],
    "relatedPositionIds": [
      "saddle-inside-sankaku"
    ],
    "techniqueTags": [
      "heel-hook",
      "knee-line",
      "leg-lock",
      "safety"
    ],
    "relevance": "safety_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Craig Jones provides a detailed breakdown of Outside Heel Hook Kneebar by Craig Jones with practical drilling advice.",
      "vi": "Craig Jones cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Craig Jones fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "caution": {
      "en": "Heel hooks are safety-critical. Train under qualified supervision and stop before rotational knee pressure spikes.",
      "vi": "Heel hook là kỹ thuật safety-critical. Tập dưới sự giám sát phù hợp và dừng trước khi lực xoắn vào gối tăng mạnh.",
      "fr": "Les heel hooks sont critiques pour la securite. Travaillez sous supervision et arretez avant le pic de torsion au genou."
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-craig-jones-rjbat-no",
    "provider": "youtube",
    "title": {
      "en": "Rolling out of Heel Hooks (Craig Jones and Lachlan Giles)",
      "vi": "Rolling out of Heel Hooks (Craig Jones and Lachlan Giles) (phân tích)",
      "fr": "Rolling out of Heel Hooks (Craig Jones and Lachlan Giles) (analyse)"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=DrjbaXt-nTo",
    "embedUrl": "https://www.youtube.com/embed/DrjbaXt-nTo",
    "youtubeId": "DrjbaXt-nTo",
    "language": "en",
    "relatedSkillIds": [
      "heel-hook-safety"
    ],
    "relatedPositionIds": [
      "saddle-inside-sankaku"
    ],
    "techniqueTags": [
      "heel-hook",
      "knee-line",
      "leg-lock",
      "safety"
    ],
    "relevance": "safety_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Craig Jones provides a detailed breakdown of Rolling out of Heel Hooks (Craig Jones and Lachlan Giles) with practical drilling advice.",
      "vi": "Craig Jones cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Craig Jones fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "caution": {
      "en": "Heel hooks are safety-critical. Train under qualified supervision and stop before rotational knee pressure spikes.",
      "vi": "Heel hook là kỹ thuật safety-critical. Tập dưới sự giám sát phù hợp và dừng trước khi lực xoắn vào gối tăng mạnh.",
      "fr": "Les heel hooks sont critiques pour la securite. Travaillez sous supervision et arretez avant le pic de torsion au genou."
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-craig-jones-1ix_eyc",
    "provider": "youtube",
    "title": {
      "en": "Craig Jones - Z-Half Guard Choi Bar / Arm Saddle Armbar (Bringing Leg Over The Head)",
      "vi": "Craig Jones - Z-Half Guard Choi Bar / Arm Saddle Armbar (Bringing Leg Over Thể Head) (phân tích)",
      "fr": "Craig Jones - Z-Half Guard Choi Bar / Arm Saddle Armbar (Bringing Leg Over The Head) (analyse)"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=1AXix_eKyKc",
    "embedUrl": "https://www.youtube.com/embed/1AXix_eKyKc",
    "youtubeId": "1AXix_eKyKc",
    "language": "en",
    "relatedSkillIds": [
      "armbar-system",
      "choi-bar",
      "half-guard-knee-shield",
      "saddle-inside-sankaku-control"
    ],
    "relatedPositionIds": [
      "half-guard-bottom",
      "saddle-inside-sankaku"
    ],
    "techniqueTags": [
      "armbar",
      "choi-bar",
      "elbow-line",
      "guard-system",
      "half-guard",
      "inside-sankaku",
      "knee-shield",
      "leg-control",
      "saddle",
      "shoulder-isolation",
      "submission"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Craig Jones provides a detailed breakdown of Craig Jones - Z-Half Guard Choi Bar / Arm Saddle Armbar (Bringing Leg Over The Head) with practical drilling advice.",
      "vi": "Craig Jones cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Craig Jones fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Leg locks are safety-critical. Control slowly, stop before rotational pressure spikes, and release immediately on tap.",
      "vi": "Leg lock là nhóm kỹ thuật nhạy cảm. Kiểm soát chậm, dừng trước khi lực xoắn tăng mạnh và thả ngay khi tap.",
      "fr": "Les leg locks sont critiques pour la securite. Controlez lentement, arretez avant le pic de rotation et relachez au tap."
    }
  },
  {
    "id": "bjj-craig-jones-_mwuj-",
    "provider": "youtube",
    "title": {
      "en": "CRAIG JONES SEMINAR: Day 1 | Octopus Guard | B-Team x Bangtao BJJ | No Gi Jiu Jitsu",
      "vi": "CRAIG JONES SEMINAR: Day 1 | Octopus Guard | B-Team x Bangtao BJJ | No Gi Jiu Jitsu (phân tích)",
      "fr": "CRAIG JONES SEMINAR: Day 1 | Octopus Guard | B-Team x Bangtao BJJ | No Gi Jiu Jitsu (analyse)"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=M_mwuZYj-AU",
    "embedUrl": "https://www.youtube.com/embed/M_mwuZYj-AU",
    "youtubeId": "M_mwuZYj-AU",
    "language": "en",
    "relatedSkillIds": [
      "octopus-guard-control"
    ],
    "relatedPositionIds": [
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "guard-system",
      "half-guard",
      "octopus-guard"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Craig Jones provides a detailed breakdown of CRAIG JONES SEMINAR: Day 1 | Octopus Guard | B-Team x Bangtao BJJ | No Gi Jiu Jitsu with practical drilling advice.",
      "vi": "Craig Jones cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Craig Jones fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-craig-jones-n2mo",
    "provider": "youtube",
    "title": {
      "en": "Craig Jones’ Favorite Octopus Guard Sweep #bjj #jiujitsu #nogi #nogiboston #jiujitsutechnique",
      "vi": "Craig Jones’ Favorite Octopus Guard Sweep #bjj #jiujitsu #nogi #nogiboston #jiujitsutechnique (phân tích)",
      "fr": "Craig Jones’ Favorite Octopus Guard Sweep #bjj #jiujitsu #nogi #nogiboston #jiujitsutechnique (analyse)"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=n2SKmDoZNDU",
    "embedUrl": "https://www.youtube.com/embed/n2SKmDoZNDU",
    "youtubeId": "n2SKmDoZNDU",
    "language": "en",
    "relatedSkillIds": [
      "octopus-guard-control",
      "octopus-guard-sweep"
    ],
    "relatedPositionIds": [
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "guard-system",
      "half-guard",
      "octopus-guard"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Craig Jones provides a detailed breakdown of Craig Jones’ Favorite Octopus Guard Sweep #bjj #jiujitsu #nogi #nogiboston #jiujitsutechnique with practical drilling advice.",
      "vi": "Craig Jones cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Craig Jones fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-craig-jones-0n5fk8",
    "provider": "youtube",
    "title": {
      "en": "Rear Body Lock Outside Hook by Craig Jones",
      "vi": "Rear Body Lock Outside Hook by Craig Jones (phân tích)",
      "fr": "Rear Body Lock Outside Hook by Craig Jones (analyse)"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=EAW0nZF5fk8",
    "embedUrl": "https://www.youtube.com/embed/EAW0nZF5fk8",
    "youtubeId": "EAW0nZF5fk8",
    "language": "en",
    "relatedSkillIds": [
      "bodylock-passing"
    ],
    "techniqueTags": [
      "bodylock",
      "hip-control",
      "passing"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Craig Jones provides a detailed breakdown of Rear Body Lock Outside Hook by Craig Jones with practical drilling advice.",
      "vi": "Craig Jones cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Craig Jones fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-craig-jones-wt6_le",
    "provider": "youtube",
    "title": {
      "en": "BODY LOCK FOOT POST - Craig Jones",
      "vi": "BODY LOCK FOOT POST - Craig Jones (phân tích)",
      "fr": "BODY LOCK FOOT POST - Craig Jones (analyse)"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=wEMFt6_VleA",
    "embedUrl": "https://www.youtube.com/embed/wEMFt6_VleA",
    "youtubeId": "wEMFt6_VleA",
    "language": "en",
    "relatedSkillIds": [
      "bodylock-passing"
    ],
    "techniqueTags": [
      "bodylock",
      "hip-control",
      "passing"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Craig Jones provides a detailed breakdown of BODY LOCK FOOT POST - Craig Jones with practical drilling advice.",
      "vi": "Craig Jones cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Craig Jones fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-craig-jones-w7km",
    "provider": "youtube",
    "title": {
      "en": "Body Lock Foot Post by Craig Jones",
      "vi": "Body Lock Foot Post by Craig Jones (phân tích)",
      "fr": "Body Lock Foot Post by Craig Jones (analyse)"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=UFwGE7QFkmA",
    "embedUrl": "https://www.youtube.com/embed/UFwGE7QFkmA",
    "youtubeId": "UFwGE7QFkmA",
    "language": "en",
    "relatedSkillIds": [
      "bodylock-passing"
    ],
    "techniqueTags": [
      "bodylock",
      "hip-control",
      "passing"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Craig Jones provides a detailed breakdown of Body Lock Foot Post by Craig Jones with practical drilling advice.",
      "vi": "Craig Jones cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Craig Jones fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-craig-jones-t7kk",
    "provider": "youtube",
    "title": {
      "en": "How Craig Jones Breaks Guard with Body Lock Passing #jiujitsu #jiu #grappling #nogi #martialarts",
      "vi": "How Craig Jones Breaks Guard with Body Lock Passing #jiujitsu #jiu #grappling #nogi #martialarts (phân tích)",
      "fr": "How Craig Jones Breaks Guard with Body Lock Passing #jiujitsu #jiu #grappling #nogi #martialarts (analyse)"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=VtA7LEYkGSk",
    "embedUrl": "https://www.youtube.com/embed/VtA7LEYkGSk",
    "youtubeId": "VtA7LEYkGSk",
    "language": "en",
    "relatedSkillIds": [
      "bodylock-passing",
      "bodylock-pass"
    ],
    "techniqueTags": [
      "bodylock",
      "hip-control",
      "passing"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Craig Jones provides a detailed breakdown of How Craig Jones Breaks Guard with Body Lock Passing #jiujitsu #jiu #grappling #nogi #martialarts with practical drilling advice.",
      "vi": "Craig Jones cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Craig Jones fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-craig-jones-brwz0o",
    "provider": "youtube",
    "title": {
      "en": "Craig Jones sweep from headquarters #bjj #nogi #grappling #judo #bjjfanatics #jiujitsu #bjjwiki",
      "vi": "Craig Jones sweep from headquarters #bjj #nogi #grappling #judo #bjjfanatics #jiujitsu #bjjwiki (phân tích)",
      "fr": "Craig Jones sweep from headquarters #bjj #nogi #grappling #judo #bjjfanatics #jiujitsu #bjjwiki (analyse)"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=JbrwOzOFK0o",
    "embedUrl": "https://www.youtube.com/embed/JbrwOzOFK0o",
    "youtubeId": "JbrwOzOFK0o",
    "language": "en",
    "relatedSkillIds": [
      "headquarters-passing"
    ],
    "techniqueTags": [
      "guard-passing",
      "headquarters",
      "passing"
    ],
    "relevance": "supplemental",
    "level": "intermediate",
    "whyUseful": {
      "en": "Craig Jones provides a detailed breakdown of Craig Jones sweep from headquarters #bjj #nogi #grappling #judo #bjjfanatics #jiujitsu #bjjwiki with practical drilling advice.",
      "vi": "Craig Jones cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Craig Jones fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-craig-jones-s9ryfdi",
    "provider": "youtube",
    "title": {
      "en": "The Secret Grip That Craig Jones Uses To Defend Heel Hooks And Leg Attacks",
      "vi": "Thể Secret Grip That Craig Jones Uses To Defend Heel Hooks And Leg Attacks (phân tích)",
      "fr": "The Secret Grip That Craig Jones Uses To Defend Heel Hooks And Leg Attacks (analyse)"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=s9rJWyfNdiI",
    "embedUrl": "https://www.youtube.com/embed/s9rJWyfNdiI",
    "youtubeId": "s9rJWyfNdiI",
    "language": "en",
    "relatedSkillIds": [
      "heel-hook-safety"
    ],
    "relatedPositionIds": [
      "saddle-inside-sankaku"
    ],
    "techniqueTags": [
      "heel-hook",
      "knee-line",
      "leg-lock",
      "safety"
    ],
    "relevance": "safety_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Craig Jones provides a detailed breakdown of The Secret Grip That Craig Jones Uses To Defend Heel Hooks And Leg Attacks with practical drilling advice.",
      "vi": "Craig Jones cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Craig Jones fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "caution": {
      "en": "Heel hooks are safety-critical. Train under qualified supervision and stop before rotational knee pressure spikes.",
      "vi": "Heel hook là kỹ thuật safety-critical. Tập dưới sự giám sát phù hợp và dừng trước khi lực xoắn vào gối tăng mạnh.",
      "fr": "Les heel hooks sont critiques pour la securite. Travaillez sous supervision et arretez avant le pic de torsion au genou."
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-craig-jones-gdji",
    "provider": "youtube",
    "title": {
      "en": "Standing Rear Body Lock to Takedown by Craig Jones",
      "vi": "Standing Rear Body Lock to Takedown by Craig Jones (phân tích)",
      "fr": "Standing Rear Body Lock to Takedown by Craig Jones (analyse)"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=KgdKjHONiWU",
    "embedUrl": "https://www.youtube.com/embed/KgdKjHONiWU",
    "youtubeId": "KgdKjHONiWU",
    "language": "en",
    "relatedSkillIds": [
      "bodylock-passing"
    ],
    "techniqueTags": [
      "bodylock",
      "hip-control",
      "passing"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Craig Jones provides a detailed breakdown of Standing Rear Body Lock to Takedown by Craig Jones with practical drilling advice.",
      "vi": "Craig Jones cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Craig Jones fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-craig-jones-yhj0c_7",
    "provider": "youtube",
    "title": {
      "en": "Standing Rear Body Lock to Takedown by Craig Jones",
      "vi": "Standing Rear Body Lock to Takedown by Craig Jones (phân tích)",
      "fr": "Standing Rear Body Lock to Takedown by Craig Jones (analyse)"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=yhj0c_7QZOA",
    "embedUrl": "https://www.youtube.com/embed/yhj0c_7QZOA",
    "youtubeId": "yhj0c_7QZOA",
    "language": "en",
    "relatedSkillIds": [
      "bodylock-passing"
    ],
    "techniqueTags": [
      "bodylock",
      "hip-control",
      "passing"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Craig Jones provides a detailed breakdown of Standing Rear Body Lock to Takedown by Craig Jones with practical drilling advice.",
      "vi": "Craig Jones cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Craig Jones fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-craig-jones-bo7bj0lx",
    "provider": "youtube",
    "title": {
      "en": "ADCC-Tested Guillotine Choke | Craig Jones B-Team Technique",
      "vi": "ADCC-Tested Guillotine Choke | Craig Jones B-Team Technique (phân tích)",
      "fr": "ADCC-Tested Guillotine Choke | Craig Jones B-Team Technique (analyse)"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=bEo7bj0lxUY",
    "embedUrl": "https://www.youtube.com/embed/bEo7bj0lxUY",
    "youtubeId": "bEo7bj0lxUY",
    "language": "en",
    "relatedSkillIds": [
      "guillotine-system"
    ],
    "relatedPositionIds": [
      "front-headlock-top"
    ],
    "techniqueTags": [
      "choke",
      "front-headlock",
      "guillotine",
      "neck-safety"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Craig Jones provides a detailed breakdown of ADCC-Tested Guillotine Choke | Craig Jones B-Team Technique with practical drilling advice.",
      "vi": "Craig Jones cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Craig Jones fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Release immediately on tap or distress; seek a clean strangle and avoid forcing the jaw or cervical spine.",
      "vi": "Thả ngay khi tap hoặc có dấu hiệu khó chịu; ưu tiên siết sạch và tránh ép qua hàm hoặc cột sống cổ.",
      "fr": "Relachez immediatement au tap ou en detresse; cherchez un etranglement propre sans forcer machoire ou cervicales."
    }
  },
  {
    "id": "bjj-craig-jones-y1m678",
    "provider": "youtube",
    "title": {
      "en": "Craig Jones Teaches Morning Class at B-Team | Free Technique",
      "vi": "Craig Jones Teaches Morning Class at B-Team | Free Technique (phân tích)",
      "fr": "Craig Jones Teaches Morning Class at B-Team | Free Technique (analyse)"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=yWX1TRm67S8",
    "embedUrl": "https://www.youtube.com/embed/yWX1TRm67S8",
    "youtubeId": "yWX1TRm67S8",
    "language": "en",
    "relatedSkillIds": [
      "arm-triangle-mount"
    ],
    "techniqueTags": [
      "arm-triangle",
      "choke",
      "mount",
      "neck-safety"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Craig Jones provides a detailed breakdown of Craig Jones Teaches Morning Class at B-Team | Free Technique with practical drilling advice.",
      "vi": "Craig Jones cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Craig Jones fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Release immediately on tap or distress; seek a clean strangle and avoid forcing the jaw or cervical spine.",
      "vi": "Thả ngay khi tap hoặc có dấu hiệu khó chịu; ưu tiên siết sạch và tránh ép qua hàm hoặc cột sống cổ.",
      "fr": "Relachez immediatement au tap ou en detresse; cherchez un etranglement propre sans forcer machoire ou cervicales."
    }
  },
  {
    "id": "bjj-craig-jones-eja89w",
    "provider": "youtube",
    "title": {
      "en": "Crab Ride Back Take: CRAIG JONES BJJ Techniques",
      "vi": "Crab Ride Back Take: CRAIG JONES BJJ Techniques (phân tích)",
      "fr": "Crab Ride Back Take: CRAIG JONES BJJ Techniques (analyse)"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=Veja8IU9OMw",
    "embedUrl": "https://www.youtube.com/embed/Veja8IU9OMw",
    "youtubeId": "Veja8IU9OMw",
    "language": "en",
    "relatedSkillIds": [
      "back-control",
      "crab-ride"
    ],
    "relatedPositionIds": [
      "back-control-position"
    ],
    "techniqueTags": [
      "back-control",
      "back-take",
      "control",
      "crab-ride",
      "leg-ride",
      "seatbelt"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Craig Jones provides a detailed breakdown of Crab Ride Back Take: CRAIG JONES BJJ Techniques with practical drilling advice.",
      "vi": "Craig Jones cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Craig Jones fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-giancarlo-bodoni-k3v03b9g",
    "provider": "youtube",
    "title": {
      "en": "Back Attacks With ADCC Champion Part 3 # Shorts",
      "vi": "Back Attacks With ADCC Champion Part 3 # Shorts (phân tích)",
      "fr": "Back Attacks With ADCC Champion Part 3 # Shorts (analyse)"
    },
    "channelName": "Giancarlo Bodoni",
    "url": "https://www.youtube.com/watch?v=kM3Wv0Z3b9g",
    "embedUrl": "https://www.youtube.com/embed/kM3Wv0Z3b9g",
    "youtubeId": "kM3Wv0Z3b9g",
    "language": "en",
    "relatedSkillIds": [
      "back-control"
    ],
    "relatedPositionIds": [
      "back-control-position"
    ],
    "techniqueTags": [
      "back-control",
      "back-take",
      "control",
      "seatbelt"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Giancarlo Bodoni provides a detailed breakdown of Back Attacks With ADCC Champion Part 3 # Shorts with practical drilling advice.",
      "vi": "Giancarlo Bodoni cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Giancarlo Bodoni fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-giancarlo-bodoni-hqwhyo",
    "provider": "youtube",
    "title": {
      "en": "How to Attack Back Mount Part 4 - Back Attacks With ADCC Champion #shorts",
      "vi": "How to Attack Back Mount Part 4 - Back Attacks With ADCC Champion #shorts (phân tích)",
      "fr": "How to Attack Back Mount Part 4 - Back Attacks With ADCC Champion #shorts (analyse)"
    },
    "channelName": "Giancarlo Bodoni",
    "url": "https://www.youtube.com/watch?v=PQhROqQwhyo",
    "embedUrl": "https://www.youtube.com/embed/PQhROqQwhyo",
    "youtubeId": "PQhROqQwhyo",
    "language": "en",
    "relatedSkillIds": [
      "back-control"
    ],
    "relatedPositionIds": [
      "back-control-position"
    ],
    "techniqueTags": [
      "back-control",
      "back-take",
      "control",
      "seatbelt"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Giancarlo Bodoni provides a detailed breakdown of How to Attack Back Mount Part 4 - Back Attacks With ADCC Champion #shorts with practical drilling advice.",
      "vi": "Giancarlo Bodoni cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Giancarlo Bodoni fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-giancarlo-bodoni-nqfxzb4eg",
    "provider": "youtube",
    "title": {
      "en": "Rear Body Lock Knee Sweep #bjj #bjjtechniques #jiujitsu #wrestlingmove #adcc #takedown #standing",
      "vi": "Rear Body Lock Knee Sweep #bjj #bjjtechniques #jiujitsu #wrestlingmove #adcc #takedown #standing (phân tích)",
      "fr": "Rear Body Lock Knee Sweep #bjj #bjjtechniques #jiujitsu #wrestlingmove #adcc #takedown #standing (analyse)"
    },
    "channelName": "Giancarlo Bodoni",
    "url": "https://www.youtube.com/watch?v=nqfYxzbV4eg",
    "embedUrl": "https://www.youtube.com/embed/nqfYxzbV4eg",
    "youtubeId": "nqfYxzbV4eg",
    "language": "en",
    "relatedSkillIds": [
      "bodylock-passing"
    ],
    "techniqueTags": [
      "bodylock",
      "hip-control",
      "passing"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Giancarlo Bodoni provides a detailed breakdown of Rear Body Lock Knee Sweep #bjj #bjjtechniques #jiujitsu #wrestlingmove #adcc #takedown #standing with practical drilling advice.",
      "vi": "Giancarlo Bodoni cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Giancarlo Bodoni fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-giancarlo-bodoni-bjgb8s",
    "provider": "youtube",
    "title": {
      "en": "Giancarlo Bodoni’s NOGI Seminar",
      "vi": "Giancarlo Bodoni’s NOGI Seminar (phân tích)",
      "fr": "Giancarlo Bodoni’s NOGI Seminar (analyse)"
    },
    "channelName": "Giancarlo Bodoni",
    "url": "https://www.youtube.com/watch?v=bJMjOgDb8Ls",
    "embedUrl": "https://www.youtube.com/embed/bJMjOgDb8Ls",
    "youtubeId": "bJMjOgDb8Ls",
    "language": "en",
    "relatedSkillIds": [
      "half-guard-knee-shield"
    ],
    "relatedPositionIds": [
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "guard-system",
      "half-guard",
      "knee-shield"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Giancarlo Bodoni provides a detailed breakdown of Giancarlo Bodoni’s NOGI Seminar with practical drilling advice.",
      "vi": "Giancarlo Bodoni cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Giancarlo Bodoni fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-giancarlo-bodoni-zaidf-i",
    "provider": "youtube",
    "title": {
      "en": "Hand-fighting Tips from Front Headlock Pt.1 #shorts",
      "vi": "Hand-fighting Tips from Front Headlock Pt.1 #shorts (phân tích)",
      "fr": "Hand-fighting Tips from Front Headlock Pt.1 #shorts (analyse)"
    },
    "channelName": "Giancarlo Bodoni",
    "url": "https://www.youtube.com/watch?v=zAaIidf-SiM",
    "embedUrl": "https://www.youtube.com/embed/zAaIidf-SiM",
    "youtubeId": "zAaIidf-SiM",
    "language": "en",
    "relatedSkillIds": [
      "hand-fighting"
    ],
    "techniqueTags": [
      "fundamentals",
      "grip-fighting",
      "hand-fighting"
    ],
    "relevance": "supplemental",
    "level": "beginner",
    "whyUseful": {
      "en": "Giancarlo Bodoni provides a detailed breakdown of Hand-fighting Tips from Front Headlock Pt.1 #shorts with practical drilling advice.",
      "vi": "Giancarlo Bodoni cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Giancarlo Bodoni fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Release immediately on tap or distress; seek a clean strangle and avoid forcing the jaw or cervical spine.",
      "vi": "Thả ngay khi tap hoặc có dấu hiệu khó chịu; ưu tiên siết sạch và tránh ép qua hàm hoặc cột sống cổ.",
      "fr": "Relachez immediatement au tap ou en detresse; cherchez un etranglement propre sans forcer machoire ou cervicales."
    }
  },
  {
    "id": "bjj-giancarlo-bodoni-pq0z6uo",
    "provider": "youtube",
    "title": {
      "en": "IMPORTANT tips from Front Headlock pt.2 #shorts",
      "vi": "IMPORTANT tips from Front Headlock pt.2 #shorts (phân tích)",
      "fr": "IMPORTANT tips from Front Headlock pt.2 #shorts (analyse)"
    },
    "channelName": "Giancarlo Bodoni",
    "url": "https://www.youtube.com/watch?v=ACIpq0z6Nuo",
    "embedUrl": "https://www.youtube.com/embed/ACIpq0z6Nuo",
    "youtubeId": "ACIpq0z6Nuo",
    "language": "en",
    "relatedSkillIds": [
      "guillotine-system"
    ],
    "relatedPositionIds": [
      "front-headlock-top"
    ],
    "techniqueTags": [
      "choke",
      "front-headlock",
      "guillotine",
      "neck-safety"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Giancarlo Bodoni provides a detailed breakdown of IMPORTANT tips from Front Headlock pt.2 #shorts with practical drilling advice.",
      "vi": "Giancarlo Bodoni cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Giancarlo Bodoni fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Release immediately on tap or distress; seek a clean strangle and avoid forcing the jaw or cervical spine.",
      "vi": "Thả ngay khi tap hoặc có dấu hiệu khó chịu; ưu tiên siết sạch và tránh ép qua hàm hoặc cột sống cổ.",
      "fr": "Relachez immediatement au tap ou en detresse; cherchez un etranglement propre sans forcer machoire ou cervicales."
    }
  },
  {
    "id": "bjj-giancarlo-bodoni-lyfzr9za4",
    "provider": "youtube",
    "title": {
      "en": "TOP 3 Body Lock Variations",
      "vi": "TOP 3 Body Lock Variations (phân tích)",
      "fr": "TOP 3 Body Lock Variations (analyse)"
    },
    "channelName": "Giancarlo Bodoni",
    "url": "https://www.youtube.com/watch?v=lyfNzr9Rza4",
    "embedUrl": "https://www.youtube.com/embed/lyfNzr9Rza4",
    "youtubeId": "lyfNzr9Rza4",
    "language": "en",
    "relatedSkillIds": [
      "bodylock-passing"
    ],
    "techniqueTags": [
      "bodylock",
      "hip-control",
      "passing"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Giancarlo Bodoni provides a detailed breakdown of TOP 3 Body Lock Variations with practical drilling advice.",
      "vi": "Giancarlo Bodoni cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Giancarlo Bodoni fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-giancarlo-bodoni-i3y4beq7k",
    "provider": "youtube",
    "title": {
      "en": "Entering side body lock #bjj #bjjtechniques #bjjfanatics bjjfanatics.com for more instructionals!",
      "vi": "Entering side body lock #bjj #bjjtechniques #bjjfanatics bjjfanatics.com for more instructionals! (phân tích)",
      "fr": "Entering side body lock #bjj #bjjtechniques #bjjfanatics bjjfanatics.com for more instructionals! (analyse)"
    },
    "channelName": "Giancarlo Bodoni",
    "url": "https://www.youtube.com/watch?v=Fi3yK4beq7k",
    "embedUrl": "https://www.youtube.com/embed/Fi3yK4beq7k",
    "youtubeId": "Fi3yK4beq7k",
    "language": "en",
    "relatedSkillIds": [
      "bodylock-passing"
    ],
    "techniqueTags": [
      "bodylock",
      "hip-control",
      "passing"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Giancarlo Bodoni provides a detailed breakdown of Entering side body lock #bjj #bjjtechniques #bjjfanatics bjjfanatics.com for more instructionals! with practical drilling advice.",
      "vi": "Giancarlo Bodoni cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Giancarlo Bodoni fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-gordon-ryan-jbxv4cl",
    "provider": "youtube",
    "title": {
      "en": "All About Jiu Jitsu Half Guard No Gi by Gordon Ryan",
      "vi": "All About Jiu Jitsu Half Guard No Gi by Gordon Ryan (phân tích)",
      "fr": "All About Jiu Jitsu Half Guard No Gi by Gordon Ryan (analyse)"
    },
    "channelName": "Gordon Ryan",
    "url": "https://www.youtube.com/watch?v=jbxv4EIcRlE",
    "embedUrl": "https://www.youtube.com/embed/jbxv4EIcRlE",
    "youtubeId": "jbxv4EIcRlE",
    "language": "en",
    "relatedSkillIds": [
      "half-guard-knee-shield"
    ],
    "relatedPositionIds": [
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "guard-system",
      "half-guard",
      "knee-shield"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Gordon Ryan provides a detailed breakdown of All About Jiu Jitsu Half Guard No Gi by Gordon Ryan with practical drilling advice.",
      "vi": "Gordon Ryan cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Gordon Ryan fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-gordon-ryan-ad6q940",
    "provider": "youtube",
    "title": {
      "en": "Gordon Ryan - Body Lock Guard Pass Off Their Underhook",
      "vi": "Gordon Ryan - Body Lock Guard Pass Off Their Underhook (phân tích)",
      "fr": "Gordon Ryan - Body Lock Guard Pass Off Their Underhook (analyse)"
    },
    "channelName": "Gordon Ryan",
    "url": "https://www.youtube.com/watch?v=aAd6OIq94X0",
    "embedUrl": "https://www.youtube.com/embed/aAd6OIq94X0",
    "youtubeId": "aAd6OIq94X0",
    "language": "en",
    "relatedSkillIds": [
      "bodylock-passing",
      "half-guard-knee-shield",
      "k-guard-matrix"
    ],
    "relatedPositionIds": [
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "bodylock",
      "guard-system",
      "half-guard",
      "hip-control",
      "k-guard",
      "knee-shield",
      "leg-entanglements",
      "matrix",
      "passing"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Gordon Ryan provides a detailed breakdown of Gordon Ryan - Body Lock Guard Pass Off Their Underhook with practical drilling advice.",
      "vi": "Gordon Ryan cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Gordon Ryan fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-gordon-ryan-cy4nysyc",
    "provider": "youtube",
    "title": {
      "en": "Gordon Ryan&#x27;s Easy to Learn Dilemma to Improve Your Jiu Jitsu",
      "vi": "Gordon Ryan&#x27;s Easy to Learn Dilemma to Improve Your Jiu Jitsu (phân tích)",
      "fr": "Gordon Ryan&#x27;s Easy to Learn Dilemma to Improve Your Jiu Jitsu (analyse)"
    },
    "channelName": "Gordon Ryan",
    "url": "https://www.youtube.com/watch?v=cy4nLEQysyc",
    "embedUrl": "https://www.youtube.com/embed/cy4nLEQysyc",
    "youtubeId": "cy4nLEQysyc",
    "language": "en",
    "relatedSkillIds": [
      "half-guard-knee-shield"
    ],
    "relatedPositionIds": [
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "guard-system",
      "half-guard",
      "knee-shield"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Gordon Ryan provides a detailed breakdown of Gordon Ryan&#x27;s Easy to Learn Dilemma to Improve Your Jiu Jitsu with practical drilling advice.",
      "vi": "Gordon Ryan cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Gordon Ryan fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-gordon-ryan-n62vo",
    "provider": "youtube",
    "title": {
      "en": "Gordon Ryan&#x27;s Secret to Passing Half Guard in BJJ | From Blue Belt to ADCC Champions",
      "vi": "Gordon Ryan&#x27;s Secret to Passing Half Guard in BJJ | From Blue Belt to ADCC Champions (phân tích)",
      "fr": "Gordon Ryan&#x27;s Secret to Passing Half Guard in BJJ | From Blue Belt to ADCC Champions (analyse)"
    },
    "channelName": "Gordon Ryan",
    "url": "https://www.youtube.com/watch?v=n6W2voDUWAY",
    "embedUrl": "https://www.youtube.com/embed/n6W2voDUWAY",
    "youtubeId": "n6W2voDUWAY",
    "language": "en",
    "relatedSkillIds": [
      "half-guard-knee-shield"
    ],
    "relatedPositionIds": [
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "guard-system",
      "half-guard",
      "knee-shield"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Gordon Ryan provides a detailed breakdown of Gordon Ryan&#x27;s Secret to Passing Half Guard in BJJ | From Blue Belt to ADCC Champions with practical drilling advice.",
      "vi": "Gordon Ryan cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Gordon Ryan fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-gordon-ryan-2wzs",
    "provider": "youtube",
    "title": {
      "en": "How GORDON RYAN Evades Guillotines from Underhooks",
      "vi": "How GORDON RYAN Evades Guillotines from Underhooks (phân tích)",
      "fr": "How GORDON RYAN Evades Guillotines from Underhooks (analyse)"
    },
    "channelName": "Gordon Ryan",
    "url": "https://www.youtube.com/watch?v=2wAJVUZALzs",
    "embedUrl": "https://www.youtube.com/embed/2wAJVUZALzs",
    "youtubeId": "2wAJVUZALzs",
    "language": "en",
    "relatedSkillIds": [
      "guillotine-system",
      "half-guard-knee-shield"
    ],
    "relatedPositionIds": [
      "front-headlock-top",
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "choke",
      "front-headlock",
      "guard-system",
      "guillotine",
      "half-guard",
      "knee-shield",
      "neck-safety"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Gordon Ryan provides a detailed breakdown of How GORDON RYAN Evades Guillotines from Underhooks with practical drilling advice.",
      "vi": "Gordon Ryan cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Gordon Ryan fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Release immediately on tap or distress; seek a clean strangle and avoid forcing the jaw or cervical spine.",
      "vi": "Thả ngay khi tap hoặc có dấu hiệu khó chịu; ưu tiên siết sạch và tránh ép qua hàm hoặc cột sống cổ.",
      "fr": "Relachez immediatement au tap ou en detresse; cherchez un etranglement propre sans forcer machoire ou cervicales."
    }
  },
  {
    "id": "bjj-gordon-ryan-0pz4_ltf",
    "provider": "youtube",
    "title": {
      "en": "How To Perfectly Escape From Mount, Side Control and North South No Gi by Gordon Ryan",
      "vi": "How To Perfectly Escape From Mount, Side Control and North South No Gi by Gordon Ryan (phân tích)",
      "fr": "How To Perfectly Escape From Mount, Side Control and North South No Gi by Gordon Ryan (analyse)"
    },
    "channelName": "Gordon Ryan",
    "url": "https://www.youtube.com/watch?v=0pzF4_ltfJQ",
    "embedUrl": "https://www.youtube.com/embed/0pzF4_ltfJQ",
    "youtubeId": "0pzF4_ltfJQ",
    "language": "en",
    "relatedSkillIds": [
      "side-control-escape",
      "side-control-survival",
      "back-survival",
      "north-south-control"
    ],
    "relatedPositionIds": [
      "side-control-bottom"
    ],
    "techniqueTags": [
      "escape",
      "frames",
      "side-control",
      "underhook"
    ],
    "relevance": "supplemental",
    "level": "beginner",
    "whyUseful": {
      "en": "Gordon Ryan provides a detailed breakdown of How To Perfectly Escape From Mount, Side Control and North South No Gi by Gordon Ryan with practical drilling advice.",
      "vi": "Gordon Ryan cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Gordon Ryan fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-gordon-ryan-urzsw",
    "provider": "youtube",
    "title": {
      "en": "Mount Escapes for Blue Belts and ADCC Champions by Gordon Ryan",
      "vi": "Mount Escapes for Blue Belts and ADCC Champions by Gordon Ryan (phân tích)",
      "fr": "Mount Escapes for Blue Belts and ADCC Champions by Gordon Ryan (analyse)"
    },
    "channelName": "Gordon Ryan",
    "url": "https://www.youtube.com/watch?v=uSrYAzVADsw",
    "embedUrl": "https://www.youtube.com/embed/uSrYAzVADsw",
    "youtubeId": "uSrYAzVADsw",
    "language": "en",
    "relatedSkillIds": [
      "mount-escape",
      "s-mount-control",
      "s-mount-armbar"
    ],
    "relatedPositionIds": [
      "mount-bottom"
    ],
    "techniqueTags": [
      "bridge",
      "control",
      "escape",
      "mount",
      "s-mount"
    ],
    "relevance": "primary_reference",
    "level": "beginner",
    "whyUseful": {
      "en": "Gordon Ryan provides a detailed breakdown of Mount Escapes for Blue Belts and ADCC Champions by Gordon Ryan with practical drilling advice.",
      "vi": "Gordon Ryan cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Gordon Ryan fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-gordon-ryan-anyksi2",
    "provider": "youtube",
    "title": {
      "en": "BJJ Back Control NoGi with GORDON RYAN",
      "vi": "BJJ Back Control NoGi with GORDON RYAN (phân tích)",
      "fr": "BJJ Back Control NoGi with GORDON RYAN (analyse)"
    },
    "channelName": "Gordon Ryan",
    "url": "https://www.youtube.com/watch?v=anyMksSOi2Q",
    "embedUrl": "https://www.youtube.com/embed/anyMksSOi2Q",
    "youtubeId": "anyMksSOi2Q",
    "language": "en",
    "relatedSkillIds": [
      "back-control"
    ],
    "relatedPositionIds": [
      "back-control-position"
    ],
    "techniqueTags": [
      "back-control",
      "back-take",
      "control",
      "seatbelt"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Gordon Ryan provides a detailed breakdown of BJJ Back Control NoGi with GORDON RYAN with practical drilling advice.",
      "vi": "Gordon Ryan cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Gordon Ryan fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-gordon-ryan-sq9j4r8",
    "provider": "youtube",
    "title": {
      "en": "GORDON RYAN Leg Lock Defense - Defending From A Knee",
      "vi": "GORDON RYAN Leg Lock Defense - Defending From A Knee (phân tích)",
      "fr": "GORDON RYAN Leg Lock Defense - Defending From A Knee (analyse)"
    },
    "channelName": "Gordon Ryan",
    "url": "https://www.youtube.com/watch?v=sq9jW4ZZrU8",
    "embedUrl": "https://www.youtube.com/embed/sq9jW4ZZrU8",
    "youtubeId": "sq9jW4ZZrU8",
    "language": "en",
    "relatedSkillIds": [
      "heel-hook-safety"
    ],
    "relatedPositionIds": [
      "saddle-inside-sankaku"
    ],
    "techniqueTags": [
      "heel-hook",
      "knee-line",
      "leg-lock",
      "safety"
    ],
    "relevance": "safety_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Gordon Ryan provides a detailed breakdown of GORDON RYAN Leg Lock Defense - Defending From A Knee with practical drilling advice.",
      "vi": "Gordon Ryan cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Gordon Ryan fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "caution": {
      "en": "Heel hooks are safety-critical. Train under qualified supervision and stop before rotational knee pressure spikes.",
      "vi": "Heel hook là kỹ thuật safety-critical. Tập dưới sự giám sát phù hợp và dừng trước khi lực xoắn vào gối tăng mạnh.",
      "fr": "Les heel hooks sont critiques pour la securite. Travaillez sous supervision et arretez avant le pic de torsion au genou."
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-gordon-ryan-k4fqs-12",
    "provider": "youtube",
    "title": {
      "en": "Gordon Ryan Front Headlock Escape @GracieJiuJitsuMD",
      "vi": "Gordon Ryan Front Headlock Escape @GracieJiuJitsuMD (phân tích)",
      "fr": "Gordon Ryan Front Headlock Escape @GracieJiuJitsuMD (analyse)"
    },
    "channelName": "Gordon Ryan",
    "url": "https://www.youtube.com/watch?v=k4fqs-JN12M",
    "embedUrl": "https://www.youtube.com/embed/k4fqs-JN12M",
    "youtubeId": "k4fqs-JN12M",
    "language": "en",
    "relatedSkillIds": [
      "front-headlock-defense"
    ],
    "relatedPositionIds": [
      "front-headlock-top"
    ],
    "techniqueTags": [
      "defense",
      "escape",
      "front-headlock"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Gordon Ryan provides a detailed breakdown of Gordon Ryan Front Headlock Escape @GracieJiuJitsuMD with practical drilling advice.",
      "vi": "Gordon Ryan cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Gordon Ryan fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Release immediately on tap or distress; seek a clean strangle and avoid forcing the jaw or cervical spine.",
      "vi": "Thả ngay khi tap hoặc có dấu hiệu khó chịu; ưu tiên siết sạch và tránh ép qua hàm hoặc cột sống cổ.",
      "fr": "Relachez immediatement au tap ou en detresse; cherchez un etranglement propre sans forcer machoire ou cervicales."
    }
  },
  {
    "id": "bjj-gordon-ryan-8hzbpfaw",
    "provider": "youtube",
    "title": {
      "en": "Incredible Front Headlock Attacks by Gordon Ryan",
      "vi": "Incredible Front Headlock Attacks by Gordon Ryan (phân tích)",
      "fr": "Incredible Front Headlock Attacks by Gordon Ryan (analyse)"
    },
    "channelName": "Gordon Ryan",
    "url": "https://www.youtube.com/watch?v=8hzRbpUfawY",
    "embedUrl": "https://www.youtube.com/embed/8hzRbpUfawY",
    "youtubeId": "8hzRbpUfawY",
    "language": "en",
    "relatedSkillIds": [
      "guillotine-system"
    ],
    "relatedPositionIds": [
      "front-headlock-top"
    ],
    "techniqueTags": [
      "choke",
      "front-headlock",
      "guillotine",
      "neck-safety"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Gordon Ryan provides a detailed breakdown of Incredible Front Headlock Attacks by Gordon Ryan with practical drilling advice.",
      "vi": "Gordon Ryan cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Gordon Ryan fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Release immediately on tap or distress; seek a clean strangle and avoid forcing the jaw or cervical spine.",
      "vi": "Thả ngay khi tap hoặc có dấu hiệu khó chịu; ưu tiên siết sạch và tránh ép qua hàm hoặc cột sống cổ.",
      "fr": "Relachez immediatement au tap ou en detresse; cherchez un etranglement propre sans forcer machoire ou cervicales."
    }
  },
  {
    "id": "bjj-gordon-ryan-rbmffjz",
    "provider": "youtube",
    "title": {
      "en": "Front Headlock Attacks from Turtle Position by Gordon Ryan",
      "vi": "Front Headlock Attacks from Turtle Position by Gordon Ryan (phân tích)",
      "fr": "Front Headlock Attacks from Turtle Position by Gordon Ryan (analyse)"
    },
    "channelName": "Gordon Ryan",
    "url": "https://www.youtube.com/watch?v=rQbmIffEjzY",
    "embedUrl": "https://www.youtube.com/embed/rQbmIffEjzY",
    "youtubeId": "rQbmIffEjzY",
    "language": "en",
    "relatedSkillIds": [
      "back-control"
    ],
    "relatedPositionIds": [
      "back-control-position"
    ],
    "techniqueTags": [
      "back-control",
      "back-take",
      "control",
      "seatbelt"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Gordon Ryan provides a detailed breakdown of Front Headlock Attacks from Turtle Position by Gordon Ryan with practical drilling advice.",
      "vi": "Gordon Ryan cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Gordon Ryan fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Release immediately on tap or distress; seek a clean strangle and avoid forcing the jaw or cervical spine.",
      "vi": "Thả ngay khi tap hoặc có dấu hiệu khó chịu; ưu tiên siết sạch và tránh ép qua hàm hoặc cột sống cổ.",
      "fr": "Relachez immediatement au tap ou en detresse; cherchez un etranglement propre sans forcer machoire ou cervicales."
    }
  },
  {
    "id": "bjj-gordon-ryan-bih8-k",
    "provider": "youtube",
    "title": {
      "en": "The Shoulder Crunch Sumi Gaeshi Sweep From Butterfly Guard by Gordon Ryan (ADCC 2019 Breakdown)",
      "vi": "Thể Shoulder Crunch Sumi Gaeshi Sweep From Butterfly Guard by Gordon Ryan (ADCC 2019 Breakdown) (phân tích)",
      "fr": "The Shoulder Crunch Sumi Gaeshi Sweep From Butterfly Guard by Gordon Ryan (ADCC 2019 Breakdown) (analyse)"
    },
    "channelName": "Gordon Ryan",
    "url": "https://www.youtube.com/watch?v=VFbUih8C-Lk",
    "embedUrl": "https://www.youtube.com/embed/VFbUih8C-Lk",
    "youtubeId": "VFbUih8C-Lk",
    "language": "en",
    "relatedSkillIds": [
      "butterfly-guard-off-balance"
    ],
    "relatedPositionIds": [
      "butterfly-guard"
    ],
    "techniqueTags": [
      "butterfly-guard",
      "guard-system",
      "off-balance",
      "sweep"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Gordon Ryan provides a detailed breakdown of The Shoulder Crunch Sumi Gaeshi Sweep From Butterfly Guard by Gordon Ryan (ADCC 2019 Breakdown) with practical drilling advice.",
      "vi": "Gordon Ryan cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Gordon Ryan fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-gordon-ryan-r-colsg4",
    "provider": "youtube",
    "title": {
      "en": "Learn How To Do The Perfect Jiu Jitsu Body Lock Pass by Gordon Ryan",
      "vi": "Learn How To Do Thể Perfect Jiu Jitsu Body Lock Pass by Gordon Ryan (phân tích)",
      "fr": "Learn How To Do The Perfect Jiu Jitsu Body Lock Pass by Gordon Ryan (analyse)"
    },
    "channelName": "Gordon Ryan",
    "url": "https://www.youtube.com/watch?v=r-FNcolHsg4",
    "embedUrl": "https://www.youtube.com/embed/r-FNcolHsg4",
    "youtubeId": "r-FNcolHsg4",
    "language": "en",
    "relatedSkillIds": [
      "bodylock-passing",
      "bodylock-pass"
    ],
    "techniqueTags": [
      "bodylock",
      "hip-control",
      "passing"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Gordon Ryan provides a detailed breakdown of Learn How To Do The Perfect Jiu Jitsu Body Lock Pass by Gordon Ryan with practical drilling advice.",
      "vi": "Gordon Ryan cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Gordon Ryan fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-heath-pedigo-d24enofk",
    "provider": "youtube",
    "title": {
      "en": "Sweet Arm Bar Finish Daisy Fresh White Belt #daisyfresh #bjj #wrestling",
      "vi": "Sweet Arm Bar Finish Daisy Fresh White Belt #daisyfresh #bjj #wrestling (phân tích)",
      "fr": "Sweet Arm Bar Finish Daisy Fresh White Belt #daisyfresh #bjj #wrestling (analyse)"
    },
    "channelName": "Heath Pedigo",
    "url": "https://www.youtube.com/watch?v=d24eCnXGofk",
    "embedUrl": "https://www.youtube.com/embed/d24eCnXGofk",
    "youtubeId": "d24eCnXGofk",
    "language": "en",
    "relatedSkillIds": [
      "armbar-system"
    ],
    "techniqueTags": [
      "armbar",
      "elbow-line",
      "shoulder-isolation",
      "submission"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Heath Pedigo provides a detailed breakdown of Sweet Arm Bar Finish Daisy Fresh White Belt #daisyfresh #bjj #wrestling with practical drilling advice.",
      "vi": "Heath Pedigo cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Heath Pedigo fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-john-danaher-e10eul1xg",
    "provider": "youtube",
    "title": {
      "en": "How To Build The Perfect Half Guard Game For No Gi by John Danaher",
      "vi": "How To Build Thể Perfect Half Guard Game For No Gi by John Danaher (phân tích)",
      "fr": "How To Build The Perfect Half Guard Game For No Gi by John Danaher (analyse)"
    },
    "channelName": "John Danaher",
    "url": "https://www.youtube.com/watch?v=Ze10eulM1xg",
    "embedUrl": "https://www.youtube.com/embed/Ze10eulM1xg",
    "youtubeId": "Ze10eulM1xg",
    "language": "en",
    "relatedSkillIds": [
      "half-guard-knee-shield"
    ],
    "relatedPositionIds": [
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "guard-system",
      "half-guard",
      "knee-shield"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "John Danaher provides a detailed breakdown of How To Build The Perfect Half Guard Game For No Gi by John Danaher with practical drilling advice.",
      "vi": "John Danaher cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "John Danaher fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-john-danaher-22t",
    "provider": "youtube",
    "title": {
      "en": "This is Why Danaher&#x27;s Students Control EVERYONE in No-Gi",
      "vi": "This is Why Danaher&#x27;s Students Control EVERYONE in No-Gi (phân tích)",
      "fr": "This is Why Danaher&#x27;s Students Control EVERYONE in No-Gi (analyse)"
    },
    "channelName": "John Danaher",
    "url": "https://www.youtube.com/watch?v=2ITHQ2tOULQ",
    "embedUrl": "https://www.youtube.com/embed/2ITHQ2tOULQ",
    "youtubeId": "2ITHQ2tOULQ",
    "language": "en",
    "relatedSkillIds": [
      "butterfly-guard-off-balance"
    ],
    "relatedPositionIds": [
      "butterfly-guard"
    ],
    "techniqueTags": [
      "butterfly-guard",
      "guard-system",
      "off-balance",
      "sweep"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "John Danaher provides a detailed breakdown of This is Why Danaher&#x27;s Students Control EVERYONE in No-Gi with practical drilling advice.",
      "vi": "John Danaher cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "John Danaher fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-junny-ocasio-un62c",
    "provider": "youtube",
    "title": {
      "en": "Knee Shield Pass No Gi Direct To The Armbar by Junny Ocasio",
      "vi": "Knee Shield Pass No Gi Direct To Thể Armbar by Junny Ocasio (phân tích)",
      "fr": "Knee Shield Pass No Gi Direct To The Armbar by Junny Ocasio (analyse)"
    },
    "channelName": "Junny Ocasio",
    "url": "https://www.youtube.com/watch?v=uGnARC6G2Sc",
    "embedUrl": "https://www.youtube.com/embed/uGnARC6G2Sc",
    "youtubeId": "uGnARC6G2Sc",
    "language": "en",
    "relatedSkillIds": [
      "armbar-system"
    ],
    "techniqueTags": [
      "armbar",
      "elbow-line",
      "shoulder-isolation",
      "submission"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Junny Ocasio provides a detailed breakdown of Knee Shield Pass No Gi Direct To The Armbar by Junny Ocasio with practical drilling advice.",
      "vi": "Junny Ocasio cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Junny Ocasio fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-lachlan-giles-5h7o50",
    "provider": "youtube",
    "title": {
      "en": "Saddle Entries From Guard by Lachlan Giles",
      "vi": "Saddle Entries From Guard by Lachlan Giles (phân tích)",
      "fr": "Saddle Entries From Guard by Lachlan Giles (analyse)"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=K5XhO7o5QN0",
    "embedUrl": "https://www.youtube.com/embed/K5XhO7o5QN0",
    "youtubeId": "K5XhO7o5QN0",
    "language": "en",
    "relatedSkillIds": [
      "false-reap-entry"
    ],
    "techniqueTags": [
      "false-reap",
      "guard",
      "leg-entry"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Lachlan Giles provides a detailed breakdown of Saddle Entries From Guard by Lachlan Giles with practical drilling advice.",
      "vi": "Lachlan Giles cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Lachlan Giles fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Leg locks are safety-critical. Control slowly, stop before rotational pressure spikes, and release immediately on tap.",
      "vi": "Leg lock là nhóm kỹ thuật nhạy cảm. Kiểm soát chậm, dừng trước khi lực xoắn tăng mạnh và thả ngay khi tap.",
      "fr": "Les leg locks sont critiques pour la securite. Controlez lentement, arretez avant le pic de rotation et relachez au tap."
    }
  },
  {
    "id": "bjj-lachlan-giles-qrlfk_44",
    "provider": "youtube",
    "title": {
      "en": "How To Pass The BJJ Half Guard No Gi by Lachlan Giles",
      "vi": "How To Pass Thể BJJ Half Guard No Gi by Lachlan Giles (phân tích)",
      "fr": "How To Pass The BJJ Half Guard No Gi by Lachlan Giles (analyse)"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=qrlXfEOk_44",
    "embedUrl": "https://www.youtube.com/embed/qrlXfEOk_44",
    "youtubeId": "qrlXfEOk_44",
    "language": "en",
    "relatedSkillIds": [
      "half-guard-knee-shield"
    ],
    "relatedPositionIds": [
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "guard-system",
      "half-guard",
      "knee-shield"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Lachlan Giles provides a detailed breakdown of How To Pass The BJJ Half Guard No Gi by Lachlan Giles with practical drilling advice.",
      "vi": "Lachlan Giles cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Lachlan Giles fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-lachlan-giles-wzszim",
    "provider": "youtube",
    "title": {
      "en": "3 tips for improving your heel hooks. #bjj #nogi #lachlangiles #heelhooks #submeta",
      "vi": "3 tips for improving your heel hooks. #bjj #nogi #lachlangiles #heelhooks #submeta (phân tích)",
      "fr": "3 tips for improving your heel hooks. #bjj #nogi #lachlangiles #heelhooks #submeta (analyse)"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=HwzQsQZzimM",
    "embedUrl": "https://www.youtube.com/embed/HwzQsQZzimM",
    "youtubeId": "HwzQsQZzimM",
    "language": "en",
    "relatedSkillIds": [
      "heel-hook-safety"
    ],
    "relatedPositionIds": [
      "saddle-inside-sankaku"
    ],
    "techniqueTags": [
      "heel-hook",
      "knee-line",
      "leg-lock",
      "safety"
    ],
    "relevance": "safety_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Lachlan Giles provides a detailed breakdown of 3 tips for improving your heel hooks. #bjj #nogi #lachlangiles #heelhooks #submeta with practical drilling advice.",
      "vi": "Lachlan Giles cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Lachlan Giles fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "caution": {
      "en": "Heel hooks are safety-critical. Train under qualified supervision and stop before rotational knee pressure spikes.",
      "vi": "Heel hook là kỹ thuật safety-critical. Tập dưới sự giám sát phù hợp và dừng trước khi lực xoắn vào gối tăng mạnh.",
      "fr": "Les heel hooks sont critiques pour la securite. Travaillez sous supervision et arretez avant le pic de torsion au genou."
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-lachlan-giles-sp5-o4re",
    "provider": "youtube",
    "title": {
      "en": "Heel Hook pain Vs Knee pain by Lachlan Giles",
      "vi": "Heel Hook pain Vs Knee pain by Lachlan Giles (phân tích)",
      "fr": "Heel Hook pain Vs Knee pain by Lachlan Giles (analyse)"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=sDp5V-o4reY",
    "embedUrl": "https://www.youtube.com/embed/sDp5V-o4reY",
    "youtubeId": "sDp5V-o4reY",
    "language": "en",
    "relatedSkillIds": [
      "heel-hook-safety"
    ],
    "relatedPositionIds": [
      "saddle-inside-sankaku"
    ],
    "techniqueTags": [
      "heel-hook",
      "knee-line",
      "leg-lock",
      "safety"
    ],
    "relevance": "safety_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Lachlan Giles provides a detailed breakdown of Heel Hook pain Vs Knee pain by Lachlan Giles with practical drilling advice.",
      "vi": "Lachlan Giles cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Lachlan Giles fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "caution": {
      "en": "Heel hooks are safety-critical. Train under qualified supervision and stop before rotational knee pressure spikes.",
      "vi": "Heel hook là kỹ thuật safety-critical. Tập dưới sự giám sát phù hợp và dừng trước khi lực xoắn vào gối tăng mạnh.",
      "fr": "Les heel hooks sont critiques pour la securite. Travaillez sous supervision et arretez avant le pic de torsion au genou."
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-lachlan-giles-7k9gz92",
    "provider": "youtube",
    "title": {
      "en": "How To Do The Heel Hook Against Bigger And Stronger Opponents by Lachlan Giles (ADCC 2019 Breakdown)",
      "vi": "How To Do Thể Heel Hook Against Bigger And Stronger Opponents by Lachlan Giles (ADCC 2019 Breakdown) (phân tích)",
      "fr": "How To Do The Heel Hook Against Bigger And Stronger Opponents by Lachlan Giles (ADCC 2019 Breakdown) (analyse)"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=7k9gz9O2CWE",
    "embedUrl": "https://www.youtube.com/embed/7k9gz9O2CWE",
    "youtubeId": "7k9gz9O2CWE",
    "language": "en",
    "relatedSkillIds": [
      "heel-hook-safety"
    ],
    "relatedPositionIds": [
      "saddle-inside-sankaku"
    ],
    "techniqueTags": [
      "heel-hook",
      "knee-line",
      "leg-lock",
      "safety"
    ],
    "relevance": "safety_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Lachlan Giles provides a detailed breakdown of How To Do The Heel Hook Against Bigger And Stronger Opponents by Lachlan Giles (ADCC 2019 Breakdown) with practical drilling advice.",
      "vi": "Lachlan Giles cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Lachlan Giles fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "caution": {
      "en": "Heel hooks are safety-critical. Train under qualified supervision and stop before rotational knee pressure spikes.",
      "vi": "Heel hook là kỹ thuật safety-critical. Tập dưới sự giám sát phù hợp và dừng trước khi lực xoắn vào gối tăng mạnh.",
      "fr": "Les heel hooks sont critiques pour la securite. Travaillez sous supervision et arretez avant le pic de torsion au genou."
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-lachlan-giles-2oivr",
    "provider": "youtube",
    "title": {
      "en": "Outside Heel Hook Mechanics with Dr Lachlan Giles",
      "vi": "Outside Heel Hook Mechanics with Dr Lachlan Giles (phân tích)",
      "fr": "Outside Heel Hook Mechanics with Dr Lachlan Giles (analyse)"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=2WGoiVMGvrQ",
    "embedUrl": "https://www.youtube.com/embed/2WGoiVMGvrQ",
    "youtubeId": "2WGoiVMGvrQ",
    "language": "en",
    "relatedSkillIds": [
      "heel-hook-safety"
    ],
    "relatedPositionIds": [
      "saddle-inside-sankaku"
    ],
    "techniqueTags": [
      "heel-hook",
      "knee-line",
      "leg-lock",
      "safety"
    ],
    "relevance": "safety_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Lachlan Giles provides a detailed breakdown of Outside Heel Hook Mechanics with Dr Lachlan Giles with practical drilling advice.",
      "vi": "Lachlan Giles cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Lachlan Giles fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "caution": {
      "en": "Heel hooks are safety-critical. Train under qualified supervision and stop before rotational knee pressure spikes.",
      "vi": "Heel hook là kỹ thuật safety-critical. Tập dưới sự giám sát phù hợp và dừng trước khi lực xoắn vào gối tăng mạnh.",
      "fr": "Les heel hooks sont critiques pour la securite. Travaillez sous supervision et arretez avant le pic de torsion au genou."
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-lachlan-giles-a1g-ty",
    "provider": "youtube",
    "title": {
      "en": "Why heel hooks are a dangerous submission (Lachlan Giles)",
      "vi": "Why heel hooks are a dangerous submission (Lachlan Giles) (phân tích)",
      "fr": "Why heel hooks are a dangerous submission (Lachlan Giles) (analyse)"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=a1TJPgH-tyA",
    "embedUrl": "https://www.youtube.com/embed/a1TJPgH-tyA",
    "youtubeId": "a1TJPgH-tyA",
    "language": "en",
    "relatedSkillIds": [
      "heel-hook-safety"
    ],
    "relatedPositionIds": [
      "saddle-inside-sankaku"
    ],
    "techniqueTags": [
      "heel-hook",
      "knee-line",
      "leg-lock",
      "safety"
    ],
    "relevance": "safety_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Lachlan Giles provides a detailed breakdown of Why heel hooks are a dangerous submission (Lachlan Giles) with practical drilling advice.",
      "vi": "Lachlan Giles cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Lachlan Giles fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "caution": {
      "en": "Heel hooks are safety-critical. Train under qualified supervision and stop before rotational knee pressure spikes.",
      "vi": "Heel hook là kỹ thuật safety-critical. Tập dưới sự giám sát phù hợp và dừng trước khi lực xoắn vào gối tăng mạnh.",
      "fr": "Les heel hooks sont critiques pour la securite. Travaillez sous supervision et arretez avant le pic de torsion au genou."
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-lachlan-giles-e5_",
    "provider": "youtube",
    "title": {
      "en": "From K Guard to Taking the Back by Lachlan Giles",
      "vi": "From K Guard to Taking thể Back by Lachlan Giles (phân tích)",
      "fr": "From K Guard to Taking the Back by Lachlan Giles (analyse)"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=Ae5UYTTXE_Y",
    "embedUrl": "https://www.youtube.com/embed/Ae5UYTTXE_Y",
    "youtubeId": "Ae5UYTTXE_Y",
    "language": "en",
    "relatedSkillIds": [
      "back-control",
      "k-guard-matrix"
    ],
    "relatedPositionIds": [
      "back-control-position"
    ],
    "techniqueTags": [
      "back-control",
      "back-take",
      "control",
      "k-guard",
      "leg-entanglements",
      "matrix",
      "seatbelt"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Lachlan Giles provides a detailed breakdown of From K Guard to Taking the Back by Lachlan Giles with practical drilling advice.",
      "vi": "Lachlan Giles cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Lachlan Giles fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-lachlan-giles-rwvk_wgkw",
    "provider": "youtube",
    "title": {
      "en": "Guard Retention Entries to K Guard by Lachlan Giles",
      "vi": "Guard Retention Entries to K Guard by Lachlan Giles (phân tích)",
      "fr": "Guard Retention Entries to K Guard by Lachlan Giles (analyse)"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=rwvWLk_wgkw",
    "embedUrl": "https://www.youtube.com/embed/rwvWLk_wgkw",
    "youtubeId": "rwvWLk_wgkw",
    "language": "en",
    "relatedSkillIds": [
      "k-guard-matrix"
    ],
    "techniqueTags": [
      "k-guard",
      "leg-entanglements",
      "matrix"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Lachlan Giles provides a detailed breakdown of Guard Retention Entries to K Guard by Lachlan Giles with practical drilling advice.",
      "vi": "Lachlan Giles cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Lachlan Giles fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-lachlan-giles-2b7bq7is",
    "provider": "youtube",
    "title": {
      "en": "How To Do The Perfect BJJ K Guard by Lachlan Giles",
      "vi": "How To Do Thể Perfect BJJ K Guard by Lachlan Giles (phân tích)",
      "fr": "How To Do The Perfect BJJ K Guard by Lachlan Giles (analyse)"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=2b7bqY7iZBs",
    "embedUrl": "https://www.youtube.com/embed/2b7bqY7iZBs",
    "youtubeId": "2b7bqY7iZBs",
    "language": "en",
    "relatedSkillIds": [
      "k-guard-matrix"
    ],
    "techniqueTags": [
      "k-guard",
      "leg-entanglements",
      "matrix"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Lachlan Giles provides a detailed breakdown of How To Do The Perfect BJJ K Guard by Lachlan Giles with practical drilling advice.",
      "vi": "Lachlan Giles cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Lachlan Giles fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-lachlan-giles--0n1x8",
    "provider": "youtube",
    "title": {
      "en": "K guard is the best for leg entanglement entries: Inside vs outside position (Lachlan Giles)",
      "vi": "K guard is thể best for leg entanglement entries: Inside vs outside position (Lachlan Giles) (phân tích)",
      "fr": "K guard is the best for leg entanglement entries: Inside vs outside position (Lachlan Giles) (analyse)"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=-0BnL1xQRT8",
    "embedUrl": "https://www.youtube.com/embed/-0BnL1xQRT8",
    "youtubeId": "-0BnL1xQRT8",
    "language": "en",
    "relatedSkillIds": [
      "k-guard-matrix"
    ],
    "techniqueTags": [
      "k-guard",
      "leg-entanglements",
      "matrix"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Lachlan Giles provides a detailed breakdown of K guard is the best for leg entanglement entries: Inside vs outside position (Lachlan Giles) with practical drilling advice.",
      "vi": "Lachlan Giles cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Lachlan Giles fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-lachlan-giles-cv3s",
    "provider": "youtube",
    "title": {
      "en": "The secrets of K Guard By Lachlan Giles",
      "vi": "Thể secrets of K Guard By Lachlan Giles (phân tích)",
      "fr": "The secrets of K Guard By Lachlan Giles (analyse)"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=GZAHBcvE3Ds",
    "embedUrl": "https://www.youtube.com/embed/GZAHBcvE3Ds",
    "youtubeId": "GZAHBcvE3Ds",
    "language": "en",
    "relatedSkillIds": [
      "k-guard-matrix"
    ],
    "techniqueTags": [
      "k-guard",
      "leg-entanglements",
      "matrix"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Lachlan Giles provides a detailed breakdown of The secrets of K Guard By Lachlan Giles with practical drilling advice.",
      "vi": "Lachlan Giles cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Lachlan Giles fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-lachlan-giles-_be2-y",
    "provider": "youtube",
    "title": {
      "en": "How to Use Reverse De La Riva by Lachlan Giles",
      "vi": "How to Use Reverse De Là Riva by Lachlan Giles (phân tích)",
      "fr": "How to Use Reverse De La Riva by Lachlan Giles (analyse)"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=_beJGS2-yIE",
    "embedUrl": "https://www.youtube.com/embed/_beJGS2-yIE",
    "youtubeId": "_beJGS2-yIE",
    "language": "en",
    "relatedSkillIds": [
      "k-guard-matrix"
    ],
    "techniqueTags": [
      "k-guard",
      "leg-entanglements",
      "matrix"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Lachlan Giles provides a detailed breakdown of How to Use Reverse De La Riva by Lachlan Giles with practical drilling advice.",
      "vi": "Lachlan Giles cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Lachlan Giles fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-lachlan-giles-58tr4s",
    "provider": "youtube",
    "title": {
      "en": "No Gi Pendulum Sweep and Arm Bar from Closed Guard (Lachlan Giles)",
      "vi": "No Gi Pendulum Sweep and Arm Bar from Closed Guard (Lachlan Giles) (phân tích)",
      "fr": "No Gi Pendulum Sweep and Arm Bar from Closed Guard (Lachlan Giles) (analyse)"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=58ItAArEM4s",
    "embedUrl": "https://www.youtube.com/embed/58ItAArEM4s",
    "youtubeId": "58ItAArEM4s",
    "language": "en",
    "relatedSkillIds": [
      "armbar-system",
      "closed-guard-posture-control",
      "closed-guard-sweeps"
    ],
    "techniqueTags": [
      "armbar",
      "elbow-line",
      "shoulder-isolation",
      "submission"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Lachlan Giles provides a detailed breakdown of No Gi Pendulum Sweep and Arm Bar from Closed Guard (Lachlan Giles) with practical drilling advice.",
      "vi": "Lachlan Giles cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Lachlan Giles fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-lachlan-giles-aozc-fe",
    "provider": "youtube",
    "title": {
      "en": "Heel hook from 50/50. Absolute MMA Shanghai (Lachlan Giles)",
      "vi": "Heel hook from 50/50. Absolute MMA Shanghai (Lachlan Giles) (phân tích)",
      "fr": "Heel hook from 50/50. Absolute MMA Shanghai (Lachlan Giles) (analyse)"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=aHQozQc-feU",
    "embedUrl": "https://www.youtube.com/embed/aHQozQc-feU",
    "youtubeId": "aHQozQc-feU",
    "language": "en",
    "relatedSkillIds": [
      "heel-hook-safety"
    ],
    "relatedPositionIds": [
      "saddle-inside-sankaku"
    ],
    "techniqueTags": [
      "heel-hook",
      "knee-line",
      "leg-lock",
      "safety"
    ],
    "relevance": "safety_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Lachlan Giles provides a detailed breakdown of Heel hook from 50/50. Absolute MMA Shanghai (Lachlan Giles) with practical drilling advice.",
      "vi": "Lachlan Giles cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Lachlan Giles fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "caution": {
      "en": "Heel hooks are safety-critical. Train under qualified supervision and stop before rotational knee pressure spikes.",
      "vi": "Heel hook là kỹ thuật safety-critical. Tập dưới sự giám sát phù hợp và dừng trước khi lực xoắn vào gối tăng mạnh.",
      "fr": "Les heel hooks sont critiques pour la securite. Travaillez sous supervision et arretez avant le pic de torsion au genou."
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-lachlan-giles-mk-kx2y",
    "provider": "youtube",
    "title": {
      "en": "Body lock pass (Lachlan Giles)",
      "vi": "Body lock pass (Lachlan Giles) (phân tích)",
      "fr": "Body lock pass (Lachlan Giles) (analyse)"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=mk-kJx2yLYY",
    "embedUrl": "https://www.youtube.com/embed/mk-kJx2yLYY",
    "youtubeId": "mk-kJx2yLYY",
    "language": "en",
    "relatedSkillIds": [
      "bodylock-passing"
    ],
    "techniqueTags": [
      "bodylock",
      "hip-control",
      "passing"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Lachlan Giles provides a detailed breakdown of Body lock pass (Lachlan Giles) with practical drilling advice.",
      "vi": "Lachlan Giles cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Lachlan Giles fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-lachlan-giles-rds01",
    "provider": "youtube",
    "title": {
      "en": "Passing butterfly guard with the body lock (Lachlan Giles)",
      "vi": "Passing butterfly guard with thể body lock (Lachlan Giles) (phân tích)",
      "fr": "Passing butterfly guard with the body lock (Lachlan Giles) (analyse)"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=LLSSUrds01E",
    "embedUrl": "https://www.youtube.com/embed/LLSSUrds01E",
    "youtubeId": "LLSSUrds01E",
    "language": "en",
    "relatedSkillIds": [
      "bodylock-passing",
      "butterfly-guard-off-balance"
    ],
    "relatedPositionIds": [
      "butterfly-guard"
    ],
    "techniqueTags": [
      "bodylock",
      "butterfly-guard",
      "guard-system",
      "hip-control",
      "off-balance",
      "passing",
      "sweep"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Lachlan Giles provides a detailed breakdown of Passing butterfly guard with the body lock (Lachlan Giles) with practical drilling advice.",
      "vi": "Lachlan Giles cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Lachlan Giles fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-lachlan-giles-nn8jd4",
    "provider": "youtube",
    "title": {
      "en": "Leg Lock Entries by Lachlan Giles",
      "vi": "Leg Lock Entries by Lachlan Giles (phân tích)",
      "fr": "Leg Lock Entries by Lachlan Giles (analyse)"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=MLnnV8jd4LM",
    "embedUrl": "https://www.youtube.com/embed/MLnnV8jd4LM",
    "youtubeId": "MLnnV8jd4LM",
    "language": "en",
    "relatedSkillIds": [
      "k-guard-matrix"
    ],
    "techniqueTags": [
      "k-guard",
      "leg-entanglements",
      "matrix"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Lachlan Giles provides a detailed breakdown of Leg Lock Entries by Lachlan Giles with practical drilling advice.",
      "vi": "Lachlan Giles cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Lachlan Giles fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-lachlan-giles-99jr9js",
    "provider": "youtube",
    "title": {
      "en": "Lachlan Giles Being a Wizard for 12 Minutes Straight",
      "vi": "Lachlan Giles Being a Wizard for 12 Minutes Straight (phân tích)",
      "fr": "Lachlan Giles Being a Wizard for 12 Minutes Straight (analyse)"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=99OjJr9jXAs",
    "embedUrl": "https://www.youtube.com/embed/99OjJr9jXAs",
    "youtubeId": "99OjJr9jXAs",
    "language": "en",
    "relatedSkillIds": [
      "bodylock-passing",
      "crab-ride"
    ],
    "techniqueTags": [
      "back-take",
      "bodylock",
      "crab-ride",
      "hip-control",
      "leg-ride",
      "passing"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Lachlan Giles provides a detailed breakdown of Lachlan Giles Being a Wizard for 12 Minutes Straight with practical drilling advice.",
      "vi": "Lachlan Giles cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Lachlan Giles fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-mikey-musumeci-finvds",
    "provider": "youtube",
    "title": {
      "en": "Mikey Musumeci teaches Nina Drama his favorite jiujitsu submission #ufc #mma #shorts",
      "vi": "Mikey Musumeci teaches Nina Drama his favorite jiujitsu submission #ufc #mma #shorts (phân tích)",
      "fr": "Mikey Musumeci teaches Nina Drama his favorite jiujitsu submission #ufc #mma #shorts (analyse)"
    },
    "channelName": "Mikey Musumeci",
    "url": "https://www.youtube.com/watch?v=LfinTUvdsTM",
    "embedUrl": "https://www.youtube.com/embed/LfinTUvdsTM",
    "youtubeId": "LfinTUvdsTM",
    "language": "en",
    "relatedSkillIds": [
      "triangle-system"
    ],
    "techniqueTags": [
      "choke",
      "guard",
      "neck-safety",
      "triangle"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Mikey Musumeci provides a detailed breakdown of Mikey Musumeci teaches Nina Drama his favorite jiujitsu submission #ufc #mma #shorts with practical drilling advice.",
      "vi": "Mikey Musumeci cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Mikey Musumeci fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Release immediately on tap or distress; seek a clean strangle and avoid forcing the jaw or cervical spine.",
      "vi": "Thả ngay khi tap hoặc có dấu hiệu khó chịu; ưu tiên siết sạch và tránh ép qua hàm hoặc cột sống cổ.",
      "fr": "Relachez immediatement au tap ou en detresse; cherchez un etranglement propre sans forcer machoire ou cervicales."
    }
  },
  {
    "id": "bjj-mikey-musumeci-hta85lb8",
    "provider": "youtube",
    "title": {
      "en": "Choi Bar Escape by Mikey Musumeci | COBRINHA BJJ #cobrinhaonline #nogi #martialarts",
      "vi": "Choi Bar Escape by Mikey Musumeci | COBRINHA BJJ #cobrinhaonline #nogi #martialarts (phân tích)",
      "fr": "Choi Bar Escape by Mikey Musumeci | COBRINHA BJJ #cobrinhaonline #nogi #martialarts (analyse)"
    },
    "channelName": "Mikey Musumeci",
    "url": "https://www.youtube.com/watch?v=htFa8H5lbT8",
    "embedUrl": "https://www.youtube.com/embed/htFa8H5lbT8",
    "youtubeId": "htFa8H5lbT8",
    "language": "en",
    "relatedSkillIds": [
      "choi-bar"
    ],
    "techniqueTags": [
      "armbar",
      "choi-bar",
      "submission"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Mikey Musumeci provides a detailed breakdown of Choi Bar Escape by Mikey Musumeci | COBRINHA BJJ #cobrinhaonline #nogi #martialarts with practical drilling advice.",
      "vi": "Mikey Musumeci cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Mikey Musumeci fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-neil-melanson-26vm0rj9k",
    "provider": "youtube",
    "title": {
      "en": "Ground Fight Series The Manly Choke No Gi, Jiu Jitsu, Grappling",
      "vi": "Ground Fight Series Thể Manly Choke No Gi, Jiu Jitsu, Grappling (phân tích)",
      "fr": "Ground Fight Series The Manly Choke No Gi, Jiu Jitsu, Grappling (analyse)"
    },
    "channelName": "Neil Melanson",
    "url": "https://www.youtube.com/watch?v=26vm0MrjN9k",
    "embedUrl": "https://www.youtube.com/embed/26vm0MrjN9k",
    "youtubeId": "26vm0MrjN9k",
    "language": "en",
    "relatedSkillIds": [
      "guillotine-system",
      "half-guard-knee-shield"
    ],
    "relatedPositionIds": [
      "front-headlock-top",
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "choke",
      "front-headlock",
      "guard-system",
      "guillotine",
      "half-guard",
      "knee-shield",
      "neck-safety"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Neil Melanson provides a detailed breakdown of Ground Fight Series The Manly Choke No Gi, Jiu Jitsu, Grappling with practical drilling advice.",
      "vi": "Neil Melanson cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Neil Melanson fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Release immediately on tap or distress; seek a clean strangle and avoid forcing the jaw or cervical spine.",
      "vi": "Thả ngay khi tap hoặc có dấu hiệu khó chịu; ưu tiên siết sạch và tránh ép qua hàm hoặc cột sống cổ.",
      "fr": "Relachez immediatement au tap ou en detresse; cherchez un etranglement propre sans forcer machoire ou cervicales."
    }
  },
  {
    "id": "bjj-neil-melanson-myu132yw",
    "provider": "youtube",
    "title": {
      "en": "How Catch Wrestling Wrecks The Half Guard by Neil Melanson",
      "vi": "How Catch Wrestling Wrecks Thể Half Guard by Neil Melanson (phân tích)",
      "fr": "How Catch Wrestling Wrecks The Half Guard by Neil Melanson (analyse)"
    },
    "channelName": "Neil Melanson",
    "url": "https://www.youtube.com/watch?v=mAyIu13B2yw",
    "embedUrl": "https://www.youtube.com/embed/mAyIu13B2yw",
    "youtubeId": "mAyIu13B2yw",
    "language": "en",
    "relatedSkillIds": [
      "half-guard-knee-shield"
    ],
    "relatedPositionIds": [
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "guard-system",
      "half-guard",
      "knee-shield"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Neil Melanson provides a detailed breakdown of How Catch Wrestling Wrecks The Half Guard by Neil Melanson with practical drilling advice.",
      "vi": "Neil Melanson cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Neil Melanson fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-neil-melanson-dfsotaa4lk",
    "provider": "youtube",
    "title": {
      "en": "The Catch Wrestling Leg-Locks by Neil Melanson",
      "vi": "Thể Catch Wrestling Leg-Locks by Neil Melanson (phân tích)",
      "fr": "The Catch Wrestling Leg-Locks by Neil Melanson (analyse)"
    },
    "channelName": "Neil Melanson",
    "url": "https://www.youtube.com/watch?v=dfsotaaH4lk",
    "embedUrl": "https://www.youtube.com/embed/dfsotaaH4lk",
    "youtubeId": "dfsotaaH4lk",
    "language": "en",
    "relatedSkillIds": [
      "half-guard-knee-shield"
    ],
    "relatedPositionIds": [
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "guard-system",
      "half-guard",
      "knee-shield"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Neil Melanson provides a detailed breakdown of The Catch Wrestling Leg-Locks by Neil Melanson with practical drilling advice.",
      "vi": "Neil Melanson cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Neil Melanson fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Leg locks are safety-critical. Control slowly, stop before rotational pressure spikes, and release immediately on tap.",
      "vi": "Leg lock là nhóm kỹ thuật nhạy cảm. Kiểm soát chậm, dừng trước khi lực xoắn tăng mạnh và thả ngay khi tap.",
      "fr": "Les leg locks sont critiques pour la securite. Controlez lentement, arretez avant le pic de rotation et relachez au tap."
    }
  },
  {
    "id": "bjj-neil-melanson-qp1dof-g",
    "provider": "youtube",
    "title": {
      "en": "A NEW Grappling (Jiu Jitsu) Submission From The K-Guard by Neil Melanson",
      "vi": "A NEW Grappling (Jiu Jitsu) Submission From Thể K-Guard by Neil Melanson (phân tích)",
      "fr": "A NEW Grappling (Jiu Jitsu) Submission From The K-Guard by Neil Melanson (analyse)"
    },
    "channelName": "Neil Melanson",
    "url": "https://www.youtube.com/watch?v=qOp1Cdof-gE",
    "embedUrl": "https://www.youtube.com/embed/qOp1Cdof-gE",
    "youtubeId": "qOp1Cdof-gE",
    "language": "en",
    "relatedSkillIds": [
      "k-guard-matrix"
    ],
    "techniqueTags": [
      "k-guard",
      "leg-entanglements",
      "matrix"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Neil Melanson provides a detailed breakdown of A NEW Grappling (Jiu Jitsu) Submission From The K-Guard by Neil Melanson with practical drilling advice.",
      "vi": "Neil Melanson cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Neil Melanson fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-neil-melanson-tbj21pc",
    "provider": "youtube",
    "title": {
      "en": "BJJ Fanatics Podcast 645: Neil Melanson",
      "vi": "BJJ Fanatics Podcast 645: Neil Melanson (phân tích)",
      "fr": "BJJ Fanatics Podcast 645: Neil Melanson (analyse)"
    },
    "channelName": "Neil Melanson",
    "url": "https://www.youtube.com/watch?v=tZRbj21pZSc",
    "embedUrl": "https://www.youtube.com/embed/tZRbj21pZSc",
    "youtubeId": "tZRbj21pZSc",
    "language": "en",
    "relatedSkillIds": [
      "k-guard-matrix"
    ],
    "techniqueTags": [
      "k-guard",
      "leg-entanglements",
      "matrix"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Neil Melanson provides a detailed breakdown of BJJ Fanatics Podcast 645: Neil Melanson with practical drilling advice.",
      "vi": "Neil Melanson cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Neil Melanson fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-neil-melanson-pga4ch0",
    "provider": "youtube",
    "title": {
      "en": "Kimura Variation from K Guard by Neil Melanson",
      "vi": "Kimura Variation from K Guard by Neil Melanson (phân tích)",
      "fr": "Kimura Variation from K Guard by Neil Melanson (analyse)"
    },
    "channelName": "Neil Melanson",
    "url": "https://www.youtube.com/watch?v=TpgaC4cIUh0",
    "embedUrl": "https://www.youtube.com/embed/TpgaC4cIUh0",
    "youtubeId": "TpgaC4cIUh0",
    "language": "en",
    "relatedSkillIds": [
      "k-guard-matrix",
      "kimura-system"
    ],
    "techniqueTags": [
      "k-guard",
      "kimura",
      "leg-entanglements",
      "matrix",
      "shoulder-lock",
      "submission"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Neil Melanson provides a detailed breakdown of Kimura Variation from K Guard by Neil Melanson with practical drilling advice.",
      "vi": "Neil Melanson cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Neil Melanson fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-neil-melanson-cw6cm7g",
    "provider": "youtube",
    "title": {
      "en": "Tulsa Ride To Crab Ride Cross Face Chicken Wing by Neil Melanson",
      "vi": "Tulsa Ride To Crab Ride Cross Face Chicken Wing by Neil Melanson (phân tích)",
      "fr": "Tulsa Ride To Crab Ride Cross Face Chicken Wing by Neil Melanson (analyse)"
    },
    "channelName": "Neil Melanson",
    "url": "https://www.youtube.com/watch?v=cwXI6cmN7Cg",
    "embedUrl": "https://www.youtube.com/embed/cwXI6cmN7Cg",
    "youtubeId": "cwXI6cmN7Cg",
    "language": "en",
    "relatedSkillIds": [
      "crab-ride"
    ],
    "techniqueTags": [
      "back-take",
      "crab-ride",
      "leg-ride"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Neil Melanson provides a detailed breakdown of Tulsa Ride To Crab Ride Cross Face Chicken Wing by Neil Melanson with practical drilling advice.",
      "vi": "Neil Melanson cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Neil Melanson fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-pete-letsos-c4iag",
    "provider": "youtube",
    "title": {
      "en": "How To Use Pressure Passing In No Gi by Pete &quot;The Greek&quot;",
      "vi": "How To Use Pressure Passing In No Gi by Pete &quot;Thể Greek&quot; (phân tích)",
      "fr": "How To Use Pressure Passing In No Gi by Pete &quot;The Greek&quot; (analyse)"
    },
    "channelName": "Pete Letsos",
    "url": "https://www.youtube.com/watch?v=c4WZHDFiaAg",
    "embedUrl": "https://www.youtube.com/embed/c4WZHDFiaAg",
    "youtubeId": "c4WZHDFiaAg",
    "language": "en",
    "relatedSkillIds": [
      "butterfly-guard-off-balance"
    ],
    "relatedPositionIds": [
      "butterfly-guard"
    ],
    "techniqueTags": [
      "butterfly-guard",
      "guard-system",
      "off-balance",
      "sweep"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Pete Letsos provides a detailed breakdown of How To Use Pressure Passing In No Gi by Pete &quot;The Greek&quot; with practical drilling advice.",
      "vi": "Pete Letsos cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Pete Letsos fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-pete-letsos-peombs",
    "provider": "youtube",
    "title": {
      "en": "Over Under Against Butterfly Guard NoGi by Pete Letsos",
      "vi": "Over Under Against Butterfly Guard NoGi by Pete Letsos (phân tích)",
      "fr": "Over Under Against Butterfly Guard NoGi by Pete Letsos (analyse)"
    },
    "channelName": "Pete Letsos",
    "url": "https://www.youtube.com/watch?v=peCQCPomLbs",
    "embedUrl": "https://www.youtube.com/embed/peCQCPomLbs",
    "youtubeId": "peCQCPomLbs",
    "language": "en",
    "relatedSkillIds": [
      "butterfly-guard-off-balance"
    ],
    "relatedPositionIds": [
      "butterfly-guard"
    ],
    "techniqueTags": [
      "butterfly-guard",
      "guard-system",
      "off-balance",
      "sweep"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Pete Letsos provides a detailed breakdown of Over Under Against Butterfly Guard NoGi by Pete Letsos with practical drilling advice.",
      "vi": "Pete Letsos cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Pete Letsos fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-travis-stevens-57pqm3",
    "provider": "youtube",
    "title": {
      "en": "3 NoGi Takedowns You Need to Know | With Olympic Silver Medalist Travis Stevens",
      "vi": "3 NoGi Takedowns You Need to Know | With Olympic Silver Medalist Travis Stevens (phân tích)",
      "fr": "3 NoGi Takedowns You Need to Know | With Olympic Silver Medalist Travis Stevens (analyse)"
    },
    "channelName": "Travis Stevens",
    "url": "https://www.youtube.com/watch?v=57pBqAm3NIQ",
    "embedUrl": "https://www.youtube.com/embed/57pBqAm3NIQ",
    "youtubeId": "57pBqAm3NIQ",
    "language": "en",
    "relatedSkillIds": [
      "back-control"
    ],
    "relatedPositionIds": [
      "back-control-position"
    ],
    "techniqueTags": [
      "back-control",
      "back-take",
      "control",
      "seatbelt"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Travis Stevens provides a detailed breakdown of 3 NoGi Takedowns You Need to Know | With Olympic Silver Medalist Travis Stevens with practical drilling advice.",
      "vi": "Travis Stevens cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Travis Stevens fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-back-control-2t-k3-i28",
    "provider": "youtube",
    "title": {
      "en": "How GORDON RYAN Traps the Arm in Back Control #bjj #grappling #jiujitsu #bjjfanatics",
      "vi": "How GORDON RYAN Traps thể Arm in Back Control #bjj #grappling #jiujitsu #bjjfanatics (phân tích)",
      "fr": "How GORDON RYAN Traps the Arm in Back Control #bjj #grappling #jiujitsu #bjjfanatics (analyse)"
    },
    "channelName": "Back Control",
    "url": "https://www.youtube.com/watch?v=2tC-Fk3-i28",
    "embedUrl": "https://www.youtube.com/embed/2tC-Fk3-i28",
    "youtubeId": "2tC-Fk3-i28",
    "language": "en",
    "relatedSkillIds": [
      "back-control"
    ],
    "relatedPositionIds": [
      "back-control-position"
    ],
    "techniqueTags": [
      "back-control",
      "back-take",
      "control",
      "seatbelt"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Back Control provides a detailed breakdown of How GORDON RYAN Traps the Arm in Back Control #bjj #grappling #jiujitsu #bjjfanatics with practical drilling advice.",
      "vi": "Back Control cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Back Control fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-closed-guard-ztpvgiw",
    "provider": "youtube",
    "title": {
      "en": "The Best Way To Escape Closed Guard 👌 #gordonryan #bjj #adcc #nogi #mma #armbar #whitebelt #ufc",
      "vi": "Thể Best Way To Escape Closed Guard 👌 #gordonryan #bjj #adcc #nogi #mma #armbar #whitebelt #ufc (phân tích)",
      "fr": "The Best Way To Escape Closed Guard 👌 #gordonryan #bjj #adcc #nogi #mma #armbar #whitebelt #ufc (analyse)"
    },
    "channelName": "IsakIvanovicjj",
    "url": "https://www.youtube.com/watch?v=ztpvgMFYEiw",
    "embedUrl": "https://www.youtube.com/embed/ztpvgMFYEiw",
    "youtubeId": "ztpvgMFYEiw",
    "language": "en",
    "relatedSkillIds": [
      "armbar-system"
    ],
    "techniqueTags": [
      "armbar",
      "elbow-line",
      "shoulder-isolation",
      "submission"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Closed Guard provides a detailed breakdown of The Best Way To Escape Closed Guard 👌 #gordonryan #bjj #adcc #nogi #mma #armbar #whitebelt #ufc with practical drilling advice.",
      "vi": "Closed Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Closed Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-half-guard-7molebiqlo",
    "provider": "youtube",
    "title": {
      "en": "Knee shield half guard sweep, no gi Jiu Jitsu",
      "vi": "Knee shield half guard sweep, no gi Jiu Jitsu (phân tích)",
      "fr": "Knee shield half guard sweep, no gi Jiu Jitsu (analyse)"
    },
    "channelName": "Steven Kaloustian",
    "url": "https://www.youtube.com/watch?v=7moPlebiqlo",
    "embedUrl": "https://www.youtube.com/embed/7moPlebiqlo",
    "youtubeId": "7moPlebiqlo",
    "language": "en",
    "relatedSkillIds": [
      "half-guard-knee-shield"
    ],
    "relatedPositionIds": [
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "guard-system",
      "half-guard",
      "knee-shield"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Half Guard provides a detailed breakdown of Knee shield half guard sweep, no gi Jiu Jitsu with practical drilling advice.",
      "vi": "Half Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Half Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-half-guard-f-_kuu5ac",
    "provider": "youtube",
    "title": {
      "en": "Destroy the knee shield from half guard #grappling #submissiongrappling #nogijiujitsu #bjjtechnique",
      "vi": "Destroy thể knee shield from half guard #grappling #submissiongrappling #nogijiujitsu #bjjtechnique (phân tích)",
      "fr": "Destroy the knee shield from half guard #grappling #submissiongrappling #nogijiujitsu #bjjtechnique (analyse)"
    },
    "channelName": "BASE-9 Submission Grappling",
    "url": "https://www.youtube.com/watch?v=f-_kuuD5Kac",
    "embedUrl": "https://www.youtube.com/embed/f-_kuuD5Kac",
    "youtubeId": "f-_kuuD5Kac",
    "language": "en",
    "relatedSkillIds": [
      "half-guard-knee-shield"
    ],
    "relatedPositionIds": [
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "guard-system",
      "half-guard",
      "knee-shield"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Half Guard provides a detailed breakdown of Destroy the knee shield from half guard #grappling #submissiongrappling #nogijiujitsu #bjjtechnique with practical drilling advice.",
      "vi": "Half Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Half Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-mount-n23x9r0vg",
    "provider": "youtube",
    "title": {
      "en": "The no-gi EZEKIEL! 💥 #bjj #brazilianjiujitsu #jiujitsu",
      "vi": "Thể no-gi EZEKIEL! 💥 #bjj #brazilianjiujitsu #jiujitsu (phân tích)",
      "fr": "The no-gi EZEKIEL! 💥 #bjj #brazilianjiujitsu #jiujitsu (analyse)"
    },
    "channelName": "Jordan Teaches Jiujitsu",
    "url": "https://www.youtube.com/watch?v=nX2E3x9r0vg",
    "embedUrl": "https://www.youtube.com/embed/nX2E3x9r0vg",
    "youtubeId": "nX2E3x9r0vg",
    "language": "en",
    "relatedSkillIds": [
      "armbar-system",
      "arm-triangle-mount"
    ],
    "techniqueTags": [
      "arm-triangle",
      "armbar",
      "choke",
      "elbow-line",
      "mount",
      "neck-safety",
      "shoulder-isolation",
      "submission"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Mount provides a detailed breakdown of The no-gi EZEKIEL! 💥 #bjj #brazilianjiujitsu #jiujitsu with practical drilling advice.",
      "vi": "Mount cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Mount fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Release immediately on tap or distress; seek a clean strangle and avoid forcing the jaw or cervical spine.",
      "vi": "Thả ngay khi tap hoặc có dấu hiệu khó chịu; ưu tiên siết sạch và tránh ép qua hàm hoặc cột sống cổ.",
      "fr": "Relachez immediatement au tap ou en detresse; cherchez un etranglement propre sans forcer machoire ou cervicales."
    }
  },
  {
    "id": "bjj-mount-35ylr",
    "provider": "youtube",
    "title": {
      "en": "One mount escape even Giancarlo Bodoni couldn&#x27;t stop",
      "vi": "One mount escape even Giancarlo Bodoni couldn&#x27;t stop (phân tích)",
      "fr": "One mount escape even Giancarlo Bodoni couldn&#x27;t stop (analyse)"
    },
    "channelName": "Grappling Education",
    "url": "https://www.youtube.com/watch?v=HQB35yQlArE",
    "embedUrl": "https://www.youtube.com/embed/HQB35yQlArE",
    "youtubeId": "HQB35yQlArE",
    "language": "en",
    "relatedSkillIds": [
      "mount-escape"
    ],
    "relatedPositionIds": [
      "mount-bottom"
    ],
    "techniqueTags": [
      "bridge",
      "escape",
      "mount"
    ],
    "relevance": "primary_reference",
    "level": "beginner",
    "whyUseful": {
      "en": "Mount provides a detailed breakdown of One mount escape even Giancarlo Bodoni couldn&#x27;t stop with practical drilling advice.",
      "vi": "Mount cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Mount fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-mount-13x-zw",
    "provider": "youtube",
    "title": {
      "en": "3 Back Takes From Mount Using The Gift Wrap Control",
      "vi": "3 Back Takes From Mount Using Thể Gift Wrap Control (phân tích)",
      "fr": "3 Back Takes From Mount Using The Gift Wrap Control (analyse)"
    },
    "channelName": "MMA Leech",
    "url": "https://www.youtube.com/watch?v=UIWX13Sx-zw",
    "embedUrl": "https://www.youtube.com/embed/UIWX13Sx-zw",
    "youtubeId": "UIWX13Sx-zw",
    "language": "en",
    "relatedSkillIds": [
      "back-control"
    ],
    "relatedPositionIds": [
      "back-control-position"
    ],
    "techniqueTags": [
      "back-control",
      "back-take",
      "control",
      "seatbelt"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Mount provides a detailed breakdown of 3 Back Takes From Mount Using The Gift Wrap Control with practical drilling advice.",
      "vi": "Mount cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Mount fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-side-control-a7o8",
    "provider": "youtube",
    "title": {
      "en": "255lbs VS 155lbs Side Control ESCAPE!",
      "vi": "255lbs VS 155lbs Side Control ESCAPE! (phân tích)",
      "fr": "255lbs VS 155lbs Side Control ESCAPE! (analyse)"
    },
    "channelName": "TeachMeGrappling Coach Brian",
    "url": "https://www.youtube.com/watch?v=a7oLTZCSZL8",
    "embedUrl": "https://www.youtube.com/embed/a7oLTZCSZL8",
    "youtubeId": "a7oLTZCSZL8",
    "language": "en",
    "relatedSkillIds": [
      "side-control-escape"
    ],
    "relatedPositionIds": [
      "side-control-bottom"
    ],
    "techniqueTags": [
      "escape",
      "frames",
      "side-control",
      "underhook"
    ],
    "relevance": "supplemental",
    "level": "beginner",
    "whyUseful": {
      "en": "Side Control provides a detailed breakdown of 255lbs VS 155lbs Side Control ESCAPE! with practical drilling advice.",
      "vi": "Side Control cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Side Control fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-side-control-g-8fqvd0",
    "provider": "youtube",
    "title": {
      "en": "Passing Guard knee on belly mount sequence @Jitsu1365 #jiujitsu #bjj #grappling #guard #selfdefense",
      "vi": "Passing Guard knee on belly mount sequence @Jitsu1365 #jiujitsu #bjj #grappling #guard #selfdefense (phân tích)",
      "fr": "Passing Guard knee on belly mount sequence @Jitsu1365 #jiujitsu #bjj #grappling #guard #selfdefense (analyse)"
    },
    "channelName": "DK Ninja",
    "url": "https://www.youtube.com/watch?v=JgK-8Jfqvd0",
    "embedUrl": "https://www.youtube.com/embed/JgK-8Jfqvd0",
    "youtubeId": "JgK-8Jfqvd0",
    "language": "en",
    "relatedSkillIds": [
      "s-mount-control"
    ],
    "techniqueTags": [
      "control",
      "mount",
      "s-mount"
    ],
    "relevance": "supplemental",
    "level": "advanced",
    "whyUseful": {
      "en": "Side Control provides a detailed breakdown of Passing Guard knee on belly mount sequence @Jitsu1365 #jiujitsu #bjj #grappling #guard #selfdefense with practical drilling advice.",
      "vi": "Side Control cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Side Control fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-side-control-hupo8",
    "provider": "youtube",
    "title": {
      "en": "The Best Way to Start Escaping Side Control #brazilianjiujitsu #bjj #gordonryan #nogi #mma #armbar",
      "vi": "Thể Best Way to Start Escaping Side Control #brazilianjiujitsu #bjj #gordonryan #nogi #mma #armbar (phân tích)",
      "fr": "The Best Way to Start Escaping Side Control #brazilianjiujitsu #bjj #gordonryan #nogi #mma #armbar (analyse)"
    },
    "channelName": "IsakIvanovicjj",
    "url": "https://www.youtube.com/watch?v=hBMCuPpWoL8",
    "embedUrl": "https://www.youtube.com/embed/hBMCuPpWoL8",
    "youtubeId": "hBMCuPpWoL8",
    "language": "en",
    "relatedSkillIds": [
      "armbar-system",
      "side-control-escape"
    ],
    "relatedPositionIds": [
      "side-control-bottom"
    ],
    "techniqueTags": [
      "armbar",
      "elbow-line",
      "escape",
      "frames",
      "shoulder-isolation",
      "side-control",
      "submission",
      "underhook"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Side Control provides a detailed breakdown of The Best Way to Start Escaping Side Control #brazilianjiujitsu #bjj #gordonryan #nogi #mma #armbar with practical drilling advice.",
      "vi": "Side Control cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Side Control fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-side-control-jx44m",
    "provider": "youtube",
    "title": {
      "en": "AVOID THESE 3 COMMON BUGGY CHOKE MISTAKES | JAY ROD TECHNIQUE",
      "vi": "AVOID THESE 3 COMMON BUGGY CHOKE MISTAKES | JAY ROD TECHNIQUE (phân tích)",
      "fr": "AVOID THESE 3 COMMON BUGGY CHOKE MISTAKES | JAY ROD TECHNIQUE (analyse)"
    },
    "channelName": "The B-Team",
    "url": "https://www.youtube.com/watch?v=MjKERx4N4mY",
    "embedUrl": "https://www.youtube.com/embed/MjKERx4N4mY",
    "youtubeId": "MjKERx4N4mY",
    "language": "en",
    "relatedSkillIds": [
      "buggy-choke"
    ],
    "techniqueTags": [
      "buggy-choke",
      "escape-counter",
      "submission"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Side Control provides a detailed breakdown of AVOID THESE 3 COMMON BUGGY CHOKE MISTAKES | JAY ROD TECHNIQUE with practical drilling advice.",
      "vi": "Side Control cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Side Control fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Release immediately on tap or distress; seek a clean strangle and avoid forcing the jaw or cervical spine.",
      "vi": "Thả ngay khi tap hoặc có dấu hiệu khó chịu; ưu tiên siết sạch và tránh ép qua hàm hoặc cột sống cổ.",
      "fr": "Relachez immediatement au tap ou en detresse; cherchez un etranglement propre sans forcer machoire ou cervicales."
    }
  },
  {
    "id": "bjj-side-control-rjs59rf",
    "provider": "youtube",
    "title": {
      "en": "#sidecontrol #northsouth #bjj #top #principles #joemoreira #combatsport #nogi #grappling #mma #nogi",
      "vi": "#sidecontrol #northsouth #bjj #top #principles #joemoreira #combatsport #nogi #grappling #mma #nogi (phân tích)",
      "fr": "#sidecontrol #northsouth #bjj #top #principles #joemoreira #combatsport #nogi #grappling #mma #nogi (analyse)"
    },
    "channelName": "Universal Jiu-Jitsu Honduras",
    "url": "https://www.youtube.com/watch?v=rjs59IrfHHU",
    "embedUrl": "https://www.youtube.com/embed/rjs59IrfHHU",
    "youtubeId": "rjs59IrfHHU",
    "language": "en",
    "relatedSkillIds": [
      "side-control-escape"
    ],
    "relatedPositionIds": [
      "side-control-bottom"
    ],
    "techniqueTags": [
      "escape",
      "frames",
      "side-control",
      "underhook"
    ],
    "relevance": "supplemental",
    "level": "beginner",
    "whyUseful": {
      "en": "Side Control provides a detailed breakdown of #sidecontrol #northsouth #bjj #top #principles #joemoreira #combatsport #nogi #grappling #mma #nogi with practical drilling advice.",
      "vi": "Side Control cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Side Control fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-side-control-7tvl_a",
    "provider": "youtube",
    "title": {
      "en": "BACK TAKE from SIDE CONTROL | No GI Jiujitsu",
      "vi": "BACK TAKE from SIDE CONTROL | No GI Jiujitsu (phân tích)",
      "fr": "BACK TAKE from SIDE CONTROL | No GI Jiujitsu (analyse)"
    },
    "channelName": "stuartcooperfilms",
    "url": "https://www.youtube.com/watch?v=AQ7tvTlW_aQ",
    "embedUrl": "https://www.youtube.com/embed/AQ7tvTlW_aQ",
    "youtubeId": "AQ7tvTlW_aQ",
    "language": "en",
    "relatedSkillIds": [
      "back-control",
      "side-control-escape"
    ],
    "relatedPositionIds": [
      "back-control-position",
      "side-control-bottom"
    ],
    "techniqueTags": [
      "back-control",
      "back-take",
      "control",
      "escape",
      "frames",
      "seatbelt",
      "side-control",
      "underhook"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Side Control provides a detailed breakdown of BACK TAKE from SIDE CONTROL | No GI Jiujitsu with practical drilling advice.",
      "vi": "Side Control cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Side Control fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-butterfly-guard-ytv0f34e0",
    "provider": "youtube",
    "title": {
      "en": "Quick BUTTERFLY SWEEP tip 👊 #bjj #brazilianjiujitsu #jiujitsu #grappling",
      "vi": "Quick BUTTERFLY SWEEP tip 👊 #bjj #brazilianjiujitsu #jiujitsu #grappling (phân tích)",
      "fr": "Quick BUTTERFLY SWEEP tip 👊 #bjj #brazilianjiujitsu #jiujitsu #grappling (analyse)"
    },
    "channelName": "Jordan Teaches Jiujitsu",
    "url": "https://www.youtube.com/watch?v=ytv0Wf34Xe0",
    "embedUrl": "https://www.youtube.com/embed/ytv0Wf34Xe0",
    "youtubeId": "ytv0Wf34Xe0",
    "language": "en",
    "relatedSkillIds": [
      "butterfly-guard-off-balance"
    ],
    "relatedPositionIds": [
      "butterfly-guard"
    ],
    "techniqueTags": [
      "butterfly-guard",
      "guard-system",
      "off-balance",
      "sweep"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Butterfly Guard provides a detailed breakdown of Quick BUTTERFLY SWEEP tip 👊 #bjj #brazilianjiujitsu #jiujitsu #grappling with practical drilling advice.",
      "vi": "Butterfly Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Butterfly Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-butterfly-guard-sw9y2c8",
    "provider": "youtube",
    "title": {
      "en": "Octopus Basics - Butterfly Guard. Back Takes, Sweeps, Sumi Gaeshi, Yoko Overhead Shaolin, and more.",
      "vi": "Octopus Basics - Butterfly Guard. Back Takes, Sweeps, Sumi Gaeshi, Yoko Overhead Shaolin, and more. (phân tích)",
      "fr": "Octopus Basics - Butterfly Guard. Back Takes, Sweeps, Sumi Gaeshi, Yoko Overhead Shaolin, and more. (analyse)"
    },
    "channelName": "Pica Pau Jiu Jitsu & Grappling",
    "url": "https://www.youtube.com/watch?v=IswS9y2cWI8",
    "embedUrl": "https://www.youtube.com/embed/IswS9y2cWI8",
    "youtubeId": "IswS9y2cWI8",
    "language": "en",
    "relatedSkillIds": [
      "back-control",
      "butterfly-guard-off-balance",
      "half-guard-knee-shield",
      "octopus-guard-control"
    ],
    "relatedPositionIds": [
      "back-control-position",
      "butterfly-guard",
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "back-control",
      "back-take",
      "butterfly-guard",
      "control",
      "guard-system",
      "half-guard",
      "knee-shield",
      "octopus-guard",
      "off-balance",
      "seatbelt",
      "sweep"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Butterfly Guard provides a detailed breakdown of Octopus Basics - Butterfly Guard. Back Takes, Sweeps, Sumi Gaeshi, Yoko Overhead Shaolin, and more. with practical drilling advice.",
      "vi": "Butterfly Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Butterfly Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-butterfly-guard-6dfeeyla",
    "provider": "youtube",
    "title": {
      "en": "🚀 Quick No-Gi Arm Bar from Butterfly Guard! | BJJ Short",
      "vi": "🚀 Quick No-Gi Arm Bar from Butterfly Guard! | BJJ Short (phân tích)",
      "fr": "🚀 Quick No-Gi Arm Bar from Butterfly Guard! | BJJ Short (analyse)"
    },
    "channelName": "Gabriel Gonzaga",
    "url": "https://www.youtube.com/watch?v=6dfVeMeylaA",
    "embedUrl": "https://www.youtube.com/embed/6dfVeMeylaA",
    "youtubeId": "6dfVeMeylaA",
    "language": "en",
    "relatedSkillIds": [
      "armbar-system",
      "butterfly-guard-off-balance"
    ],
    "relatedPositionIds": [
      "butterfly-guard"
    ],
    "techniqueTags": [
      "armbar",
      "butterfly-guard",
      "elbow-line",
      "guard-system",
      "off-balance",
      "shoulder-isolation",
      "submission",
      "sweep"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Butterfly Guard provides a detailed breakdown of 🚀 Quick No-Gi Arm Bar from Butterfly Guard! | BJJ Short with practical drilling advice.",
      "vi": "Butterfly Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Butterfly Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-butterfly-guard-pe2quno",
    "provider": "youtube",
    "title": {
      "en": "Butterfly Guard | Trailer | Lorenz Sadychow | BJJ | Jiu Jitsu | No-Gi | Grappling #shorts",
      "vi": "Butterfly Guard | Trailer | Lorenz Sadychow | BJJ | Jiu Jitsu | No-Gi | Grappling #shorts (phân tích)",
      "fr": "Butterfly Guard | Trailer | Lorenz Sadychow | BJJ | Jiu Jitsu | No-Gi | Grappling #shorts (analyse)"
    },
    "channelName": "Systematic Jiu-Jitsu",
    "url": "https://www.youtube.com/watch?v=pe2qEQMCuno",
    "embedUrl": "https://www.youtube.com/embed/pe2qEQMCuno",
    "youtubeId": "pe2qEQMCuno",
    "language": "en",
    "relatedSkillIds": [
      "butterfly-guard-off-balance"
    ],
    "relatedPositionIds": [
      "butterfly-guard"
    ],
    "techniqueTags": [
      "butterfly-guard",
      "guard-system",
      "off-balance",
      "sweep"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Butterfly Guard provides a detailed breakdown of Butterfly Guard | Trailer | Lorenz Sadychow | BJJ | Jiu Jitsu | No-Gi | Grappling #shorts with practical drilling advice.",
      "vi": "Butterfly Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Butterfly Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-butterfly-guard-90e9d4",
    "provider": "youtube",
    "title": {
      "en": "An Introduction to Butterfly Guard with Nicky Ryan | B-Team Technique",
      "vi": "An Introduction to Butterfly Guard with Nicky Ryan | B-Team Technique (phân tích)",
      "fr": "An Introduction to Butterfly Guard with Nicky Ryan | B-Team Technique (analyse)"
    },
    "channelName": "The B-Team",
    "url": "https://www.youtube.com/watch?v=9M0XeJN9dX4",
    "embedUrl": "https://www.youtube.com/embed/9M0XeJN9dX4",
    "youtubeId": "9M0XeJN9dX4",
    "language": "en",
    "relatedSkillIds": [
      "butterfly-guard-off-balance"
    ],
    "relatedPositionIds": [
      "butterfly-guard"
    ],
    "techniqueTags": [
      "butterfly-guard",
      "guard-system",
      "off-balance",
      "sweep"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Butterfly Guard provides a detailed breakdown of An Introduction to Butterfly Guard with Nicky Ryan | B-Team Technique with practical drilling advice.",
      "vi": "Butterfly Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Butterfly Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-butterfly-guard-o41uut",
    "provider": "youtube",
    "title": {
      "en": "No Gi Butterfly Guard Pass #grappling #jiujitsu #wrestling #bjj #mma #jiujitsugrappling #rolling",
      "vi": "No Gi Butterfly Guard Pass #grappling #jiujitsu #wrestling #bjj #mma #jiujitsugrappling #rolling (phân tích)",
      "fr": "No Gi Butterfly Guard Pass #grappling #jiujitsu #wrestling #bjj #mma #jiujitsugrappling #rolling (analyse)"
    },
    "channelName": "Huxley Skate Co.",
    "url": "https://www.youtube.com/watch?v=oCB41uWSutU",
    "embedUrl": "https://www.youtube.com/embed/oCB41uWSutU",
    "youtubeId": "oCB41uWSutU",
    "language": "en",
    "relatedSkillIds": [
      "butterfly-guard-off-balance"
    ],
    "relatedPositionIds": [
      "butterfly-guard"
    ],
    "techniqueTags": [
      "butterfly-guard",
      "guard-system",
      "off-balance",
      "sweep"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Butterfly Guard provides a detailed breakdown of No Gi Butterfly Guard Pass #grappling #jiujitsu #wrestling #bjj #mma #jiujitsugrappling #rolling with practical drilling advice.",
      "vi": "Butterfly Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Butterfly Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-crab-ride-tikgjcw",
    "provider": "youtube",
    "title": {
      "en": "CRAB RIDE 🔥🔥 #BRAZILIANJIUJITSU #JIUJITSU #MMA #GRAPPLING #UFC #BJJ #MARTIALARTS #WRESTLING",
      "vi": "CRAB RIDE 🔥🔥 #BRAZILIANJIUJITSU #JIUJITSU #MMA #GRAPPLING #UFC #BJJ #MARTIALARTS #WRESTLING (phân tích)",
      "fr": "CRAB RIDE 🔥🔥 #BRAZILIANJIUJITSU #JIUJITSU #MMA #GRAPPLING #UFC #BJJ #MARTIALARTS #WRESTLING (analyse)"
    },
    "channelName": "Black Belt Randy ",
    "url": "https://www.youtube.com/watch?v=tikJQgjcAPw",
    "embedUrl": "https://www.youtube.com/embed/tikJQgjcAPw",
    "youtubeId": "tikJQgjcAPw",
    "language": "en",
    "relatedSkillIds": [
      "crab-ride"
    ],
    "techniqueTags": [
      "back-take",
      "crab-ride",
      "leg-ride"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Crab Ride provides a detailed breakdown of CRAB RIDE 🔥🔥 #BRAZILIANJIUJITSU #JIUJITSU #MMA #GRAPPLING #UFC #BJJ #MARTIALARTS #WRESTLING with practical drilling advice.",
      "vi": "Crab Ride cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Crab Ride fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-crab-ride-tf2i",
    "provider": "youtube",
    "title": {
      "en": "RDL - Crab Ride - Back Take #jiujitsu #bjj #grappling",
      "vi": "RDL - Crab Ride - Back Take #jiujitsu #bjj #grappling (phân tích)",
      "fr": "RDL - Crab Ride - Back Take #jiujitsu #bjj #grappling (analyse)"
    },
    "channelName": "Duck_Jitsu",
    "url": "https://www.youtube.com/watch?v=BBItfBQ2iRA",
    "embedUrl": "https://www.youtube.com/embed/BBItfBQ2iRA",
    "youtubeId": "BBItfBQ2iRA",
    "language": "en",
    "relatedSkillIds": [
      "back-control",
      "crab-ride"
    ],
    "relatedPositionIds": [
      "back-control-position"
    ],
    "techniqueTags": [
      "back-control",
      "back-take",
      "control",
      "crab-ride",
      "leg-ride",
      "seatbelt"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Crab Ride provides a detailed breakdown of RDL - Crab Ride - Back Take #jiujitsu #bjj #grappling with practical drilling advice.",
      "vi": "Crab Ride cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Crab Ride fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-crab-ride-5qpbeg",
    "provider": "youtube",
    "title": {
      "en": "Crab Ride Positional Training by ADCC Veteran Mike Perez",
      "vi": "Crab Ride Positional Training by ADCC Veteran Mike Perez (phân tích)",
      "fr": "Crab Ride Positional Training by ADCC Veteran Mike Perez (analyse)"
    },
    "channelName": "Atos Jiu-Jitsu HQ | World's Best BJJ Academy - Home Page",
    "url": "https://www.youtube.com/watch?v=5qpAbBMVPeg",
    "embedUrl": "https://www.youtube.com/embed/5qpAbBMVPeg",
    "youtubeId": "5qpAbBMVPeg",
    "language": "en",
    "relatedSkillIds": [
      "crab-ride"
    ],
    "techniqueTags": [
      "back-take",
      "crab-ride",
      "leg-ride"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Crab Ride provides a detailed breakdown of Crab Ride Positional Training by ADCC Veteran Mike Perez with practical drilling advice.",
      "vi": "Crab Ride cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Crab Ride fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-crab-ride-obo-q54",
    "provider": "youtube",
    "title": {
      "en": "CRAB RIDE MASTERCLASS: I’M THE CAPTAIN NOW!",
      "vi": "CRAB RIDE MASTERCLASS: I’M THỂ CAPTAIN NOW! (phân tích)",
      "fr": "CRAB RIDE MASTERCLASS: I’M THE CAPTAIN NOW! (analyse)"
    },
    "channelName": "Precision MMA ",
    "url": "https://www.youtube.com/watch?v=obVWYYo-q54",
    "embedUrl": "https://www.youtube.com/embed/obVWYYo-q54",
    "youtubeId": "obVWYYo-q54",
    "language": "en",
    "relatedSkillIds": [
      "crab-ride"
    ],
    "techniqueTags": [
      "back-take",
      "crab-ride",
      "leg-ride"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Crab Ride provides a detailed breakdown of CRAB RIDE MASTERCLASS: I’M THE CAPTAIN NOW! with practical drilling advice.",
      "vi": "Crab Ride cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Crab Ride fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-de-la-riva-guard-if0_q18",
    "provider": "youtube",
    "title": {
      "en": "Reverse De la Riva to Saddle Entry No Gi BJJ",
      "vi": "Reverse De là Riva to Saddle Entry No Gi BJJ (phân tích)",
      "fr": "Reverse De la Riva to Saddle Entry No Gi BJJ (analyse)"
    },
    "channelName": "Alec Baulding",
    "url": "https://www.youtube.com/watch?v=if0BE_q1JP8",
    "embedUrl": "https://www.youtube.com/embed/if0BE_q1JP8",
    "youtubeId": "if0BE_q1JP8",
    "language": "en",
    "relatedSkillIds": [
      "saddle-inside-sankaku-control"
    ],
    "relatedPositionIds": [
      "saddle-inside-sankaku"
    ],
    "techniqueTags": [
      "inside-sankaku",
      "leg-control",
      "saddle"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "De La Riva Guard provides a detailed breakdown of Reverse De la Riva to Saddle Entry No Gi BJJ with practical drilling advice.",
      "vi": "De Là Riva Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "De La Riva Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Leg locks are safety-critical. Control slowly, stop before rotational pressure spikes, and release immediately on tap.",
      "vi": "Leg lock là nhóm kỹ thuật nhạy cảm. Kiểm soát chậm, dừng trước khi lực xoắn tăng mạnh và thả ngay khi tap.",
      "fr": "Les leg locks sont critiques pour la securite. Controlez lentement, arretez avant le pic de rotation et relachez au tap."
    }
  },
  {
    "id": "bjj-front-headlock-zmoy4o",
    "provider": "youtube",
    "title": {
      "en": "Guillotine Choke",
      "vi": "Guillotine Choke (phân tích)",
      "fr": "Guillotine Choke (analyse)"
    },
    "channelName": "Absolute MMA St Kilda - Melbourne",
    "url": "https://www.youtube.com/watch?v=zmoyANCY4To",
    "embedUrl": "https://www.youtube.com/embed/zmoyANCY4To",
    "youtubeId": "zmoyANCY4To",
    "language": "en",
    "relatedSkillIds": [
      "guillotine-system"
    ],
    "relatedPositionIds": [
      "front-headlock-top"
    ],
    "techniqueTags": [
      "choke",
      "front-headlock",
      "guillotine",
      "neck-safety"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Front Headlock provides a detailed breakdown of Guillotine Choke with practical drilling advice.",
      "vi": "Front Headlock cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Front Headlock fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Release immediately on tap or distress; seek a clean strangle and avoid forcing the jaw or cervical spine.",
      "vi": "Thả ngay khi tap hoặc có dấu hiệu khó chịu; ưu tiên siết sạch và tránh ép qua hàm hoặc cột sống cổ.",
      "fr": "Relachez immediatement au tap ou en detresse; cherchez un etranglement propre sans forcer machoire ou cervicales."
    }
  },
  {
    "id": "bjj-front-headlock-qq3rez0g",
    "provider": "youtube",
    "title": {
      "en": "High Wrist Guillotine | Anaconda Choke Dilemma from Front Headlock #bjj #jiujitsu #blackbelt #nogi",
      "vi": "High Wrist Guillotine | Anaconda Choke Dilemma from Front Headlock #bjj #jiujitsu #blackbelt #nogi (phân tích)",
      "fr": "High Wrist Guillotine | Anaconda Choke Dilemma from Front Headlock #bjj #jiujitsu #blackbelt #nogi (analyse)"
    },
    "channelName": "Ben Kool Tech",
    "url": "https://www.youtube.com/watch?v=qq3ArezY0Ng",
    "embedUrl": "https://www.youtube.com/embed/qq3ArezY0Ng",
    "youtubeId": "qq3ArezY0Ng",
    "language": "en",
    "relatedSkillIds": [
      "guillotine-system",
      "high-wrist-guillotine"
    ],
    "relatedPositionIds": [
      "front-headlock-top"
    ],
    "techniqueTags": [
      "choke",
      "front-headlock",
      "guillotine",
      "neck-safety"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Front Headlock provides a detailed breakdown of High Wrist Guillotine | Anaconda Choke Dilemma from Front Headlock #bjj #jiujitsu #blackbelt #nogi with practical drilling advice.",
      "vi": "Front Headlock cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Front Headlock fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Release immediately on tap or distress; seek a clean strangle and avoid forcing the jaw or cervical spine.",
      "vi": "Thả ngay khi tap hoặc có dấu hiệu khó chịu; ưu tiên siết sạch và tránh ép qua hàm hoặc cột sống cổ.",
      "fr": "Relachez immediatement au tap ou en detresse; cherchez un etranglement propre sans forcer machoire ou cervicales."
    }
  },
  {
    "id": "bjj-k-guard-nq368p1i",
    "provider": "youtube",
    "title": {
      "en": "Diego Lopes BJJ K Guard System for DESTROYING MMA Fighters 😳 #bjj #mma #ufc",
      "vi": "Diego Lopes BJJ K Guard System for DESTROYING MMA Fighters 😳 #bjj #mma #ufc (phân tích)",
      "fr": "Diego Lopes BJJ K Guard System for DESTROYING MMA Fighters 😳 #bjj #mma #ufc (analyse)"
    },
    "channelName": "BJJ For MMA",
    "url": "https://www.youtube.com/watch?v=nq3M6Q8p1iY",
    "embedUrl": "https://www.youtube.com/embed/nq3M6Q8p1iY",
    "youtubeId": "nq3M6Q8p1iY",
    "language": "en",
    "relatedSkillIds": [
      "armbar-system",
      "k-guard-matrix"
    ],
    "techniqueTags": [
      "armbar",
      "elbow-line",
      "k-guard",
      "leg-entanglements",
      "matrix",
      "shoulder-isolation",
      "submission"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "K Guard provides a detailed breakdown of Diego Lopes BJJ K Guard System for DESTROYING MMA Fighters 😳 #bjj #mma #ufc with practical drilling advice.",
      "vi": "K Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "K Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-k-guard-79x4c",
    "provider": "youtube",
    "title": {
      "en": "Saddle entry from K Guard",
      "vi": "Saddle entry from K Guard (phân tích)",
      "fr": "Saddle entry from K Guard (analyse)"
    },
    "channelName": "Jason Rau | No-Gi Jiu-Jitsu Coach",
    "url": "https://www.youtube.com/watch?v=U79RLx4BZcI",
    "embedUrl": "https://www.youtube.com/embed/U79RLx4BZcI",
    "youtubeId": "U79RLx4BZcI",
    "language": "en",
    "relatedSkillIds": [
      "k-guard-matrix",
      "saddle-inside-sankaku-control"
    ],
    "relatedPositionIds": [
      "saddle-inside-sankaku"
    ],
    "techniqueTags": [
      "inside-sankaku",
      "k-guard",
      "leg-control",
      "leg-entanglements",
      "matrix",
      "saddle"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "K Guard provides a detailed breakdown of Saddle entry from K Guard with practical drilling advice.",
      "vi": "K Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "K Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Leg locks are safety-critical. Control slowly, stop before rotational pressure spikes, and release immediately on tap.",
      "vi": "Leg lock là nhóm kỹ thuật nhạy cảm. Kiểm soát chậm, dừng trước khi lực xoắn tăng mạnh và thả ngay khi tap.",
      "fr": "Les leg locks sont critiques pour la securite. Controlez lentement, arretez avant le pic de rotation et relachez au tap."
    }
  },
  {
    "id": "bjj-k-guard-2xm4",
    "provider": "youtube",
    "title": {
      "en": "NOGI BJJ K Guard to a crab 🦀 ride #bjj #grappling #NOGI",
      "vi": "NOGI BJJ K Guard to a crab 🦀 ride #bjj #grappling #NOGI (phân tích)",
      "fr": "NOGI BJJ K Guard to a crab 🦀 ride #bjj #grappling #NOGI (analyse)"
    },
    "channelName": "The Fight Coach",
    "url": "https://www.youtube.com/watch?v=IKSWQ2xXmF4",
    "embedUrl": "https://www.youtube.com/embed/IKSWQ2xXmF4",
    "youtubeId": "IKSWQ2xXmF4",
    "language": "en",
    "relatedSkillIds": [
      "crab-ride",
      "k-guard-matrix"
    ],
    "techniqueTags": [
      "back-take",
      "crab-ride",
      "k-guard",
      "leg-entanglements",
      "leg-ride",
      "matrix"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "K Guard provides a detailed breakdown of NOGI BJJ K Guard to a crab 🦀 ride #bjj #grappling #NOGI with practical drilling advice.",
      "vi": "K Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "K Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-k-guard-ul3-9b",
    "provider": "youtube",
    "title": {
      "en": "K Guard Entry To Heel Hook #bjj #kguard #heelhook #brazilianjiujitsu #grappling",
      "vi": "K Guard Entry To Heel Hook #bjj #kguard #heelhook #brazilianjiujitsu #grappling (phân tích)",
      "fr": "K Guard Entry To Heel Hook #bjj #kguard #heelhook #brazilianjiujitsu #grappling (analyse)"
    },
    "channelName": "Uriel Lopez",
    "url": "https://www.youtube.com/watch?v=uDlD3-I9bDU",
    "embedUrl": "https://www.youtube.com/embed/uDlD3-I9bDU",
    "youtubeId": "uDlD3-I9bDU",
    "language": "en",
    "relatedSkillIds": [
      "heel-hook-safety",
      "k-guard-matrix"
    ],
    "relatedPositionIds": [
      "saddle-inside-sankaku"
    ],
    "techniqueTags": [
      "heel-hook",
      "k-guard",
      "knee-line",
      "leg-entanglements",
      "leg-lock",
      "matrix",
      "safety"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "K Guard provides a detailed breakdown of K Guard Entry To Heel Hook #bjj #kguard #heelhook #brazilianjiujitsu #grappling with practical drilling advice.",
      "vi": "K Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "K Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Leg locks are safety-critical. Control slowly, stop before rotational pressure spikes, and release immediately on tap.",
      "vi": "Leg lock là nhóm kỹ thuật nhạy cảm. Kiểm soát chậm, dừng trước khi lực xoắn tăng mạnh và thả ngay khi tap.",
      "fr": "Les leg locks sont critiques pour la securite. Controlez lentement, arretez avant le pic de rotation et relachez au tap."
    }
  },
  {
    "id": "bjj-knee-on-belly-ozq7fu6bug",
    "provider": "youtube",
    "title": {
      "en": "My 2 favorite Armbars from knee on belly set up. #jiujitsu #finishes #bjj #grappling  #foryou #fyp",
      "vi": "My 2 favorite Armbars from knee on belly set up. #jiujitsu #finishes #bjj #grappling  #foryou #fyp (phân tích)",
      "fr": "My 2 favorite Armbars from knee on belly set up. #jiujitsu #finishes #bjj #grappling  #foryou #fyp (analyse)"
    },
    "channelName": "Art Gijon",
    "url": "https://www.youtube.com/watch?v=ozq7fQu6bug",
    "embedUrl": "https://www.youtube.com/embed/ozq7fQu6bug",
    "youtubeId": "ozq7fQu6bug",
    "language": "en",
    "relatedSkillIds": [
      "armbar-system"
    ],
    "techniqueTags": [
      "armbar",
      "elbow-line",
      "shoulder-isolation",
      "submission"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Knee On Belly provides a detailed breakdown of My 2 favorite Armbars from knee on belly set up. #jiujitsu #finishes #bjj #grappling  #foryou #fyp with practical drilling advice.",
      "vi": "Knee On Belly cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Knee On Belly fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-knee-on-belly-80cgw",
    "provider": "youtube",
    "title": {
      "en": "Knee on belly to armbar details #armbar #armlock #bjj #bjjblackbelt #jiujitsu #grappling #bjjlife",
      "vi": "Knee on belly to armbar details #armbar #armlock #bjj #bjjblackbelt #jiujitsu #grappling #bjjlife (phân tích)",
      "fr": "Knee on belly to armbar details #armbar #armlock #bjj #bjjblackbelt #jiujitsu #grappling #bjjlife (analyse)"
    },
    "channelName": "Carl Massaro BJJ",
    "url": "https://www.youtube.com/watch?v=80ZcMgSwJSM",
    "embedUrl": "https://www.youtube.com/embed/80ZcMgSwJSM",
    "youtubeId": "80ZcMgSwJSM",
    "language": "en",
    "relatedSkillIds": [
      "armbar-system"
    ],
    "techniqueTags": [
      "armbar",
      "elbow-line",
      "shoulder-isolation",
      "submission"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Knee On Belly provides a detailed breakdown of Knee on belly to armbar details #armbar #armlock #bjj #bjjblackbelt #jiujitsu #grappling #bjjlife with practical drilling advice.",
      "vi": "Knee On Belly cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Knee On Belly fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-knee-on-belly-m1wnwzqj4",
    "provider": "youtube",
    "title": {
      "en": "Knee On Belly Transitions to Mount &amp; Back Controls - BJJ Basics",
      "vi": "Knee On Belly Transitions to Mount &amp; Back Controls - BJJ Basics (phân tích)",
      "fr": "Knee On Belly Transitions to Mount &amp; Back Controls - BJJ Basics (analyse)"
    },
    "channelName": "MMA Leech",
    "url": "https://www.youtube.com/watch?v=m1wVnwzqjW4",
    "embedUrl": "https://www.youtube.com/embed/m1wVnwzqjW4",
    "youtubeId": "m1wVnwzqjW4",
    "language": "en",
    "relatedSkillIds": [
      "back-control"
    ],
    "relatedPositionIds": [
      "back-control-position"
    ],
    "techniqueTags": [
      "back-control",
      "back-take",
      "control",
      "seatbelt"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Knee On Belly provides a detailed breakdown of Knee On Belly Transitions to Mount &amp; Back Controls - BJJ Basics with practical drilling advice.",
      "vi": "Knee On Belly cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Knee On Belly fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-north-south-nthj3og",
    "provider": "youtube",
    "title": {
      "en": "North south choke #bjj #martialarts #mma",
      "vi": "North south choke #bjj #martialarts #mma (phân tích)",
      "fr": "North south choke #bjj #martialarts #mma (analyse)"
    },
    "channelName": "Gojani Bros Jiu-Jitsu",
    "url": "https://www.youtube.com/watch?v=nTtUhVjU3og",
    "embedUrl": "https://www.youtube.com/embed/nTtUhVjU3og",
    "youtubeId": "nTtUhVjU3og",
    "language": "en",
    "relatedSkillIds": [
      "guillotine-system",
      "side-control-escape"
    ],
    "relatedPositionIds": [
      "front-headlock-top",
      "side-control-bottom"
    ],
    "techniqueTags": [
      "choke",
      "escape",
      "frames",
      "front-headlock",
      "guillotine",
      "neck-safety",
      "side-control",
      "underhook"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "North South provides a detailed breakdown of North south choke #bjj #martialarts #mma with practical drilling advice.",
      "vi": "North South cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "North South fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings.",
    "caution": {
      "en": "Release immediately on tap or distress; seek a clean strangle and avoid forcing the jaw or cervical spine.",
      "vi": "Thả ngay khi tap hoặc có dấu hiệu khó chịu; ưu tiên siết sạch và tránh ép qua hàm hoặc cột sống cổ.",
      "fr": "Relachez immediatement au tap ou en detresse; cherchez un etranglement propre sans forcer machoire ou cervicales."
    }
  },
  {
    "id": "bjj-north-south-dttas",
    "provider": "youtube",
    "title": {
      "en": "Top 4 SUBMISSIONS - North / South Kimura Hold",
      "vi": "Top 4 SUBMISSIONS - North / South Kimura Hold (phân tích)",
      "fr": "Top 4 SUBMISSIONS - North / South Kimura Hold (analyse)"
    },
    "channelName": "Teaching you BJJ, MMA & Self-Defense",
    "url": "https://www.youtube.com/watch?v=dHNtPtaMQZs",
    "embedUrl": "https://www.youtube.com/embed/dHNtPtaMQZs",
    "youtubeId": "dHNtPtaMQZs",
    "language": "en",
    "relatedSkillIds": [
      "armbar-system",
      "kimura-system"
    ],
    "techniqueTags": [
      "armbar",
      "elbow-line",
      "kimura",
      "shoulder-isolation",
      "shoulder-lock",
      "submission"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "North South provides a detailed breakdown of Top 4 SUBMISSIONS - North / South Kimura Hold with practical drilling advice.",
      "vi": "North South cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "North South fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-octopus-guard-72-z",
    "provider": "youtube",
    "title": {
      "en": "🔥 “This Is Why Octopus Guard Works 🐙 | Lorenz Sadychow Breakdown”",
      "vi": "🔥 “This Is Why Octopus Guard Works 🐙 | Lorenz Sadychow Breakdown” (phân tích)",
      "fr": "🔥 “This Is Why Octopus Guard Works 🐙 | Lorenz Sadychow Breakdown” (analyse)"
    },
    "channelName": "More Than Grappling",
    "url": "https://www.youtube.com/watch?v=IT72RSQ-DzA",
    "embedUrl": "https://www.youtube.com/embed/IT72RSQ-DzA",
    "youtubeId": "IT72RSQ-DzA",
    "language": "en",
    "relatedSkillIds": [
      "half-guard-knee-shield",
      "octopus-guard-control"
    ],
    "relatedPositionIds": [
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "guard-system",
      "half-guard",
      "knee-shield",
      "octopus-guard"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Octopus Guard provides a detailed breakdown of 🔥 “This Is Why Octopus Guard Works 🐙 | Lorenz Sadychow Breakdown” with practical drilling advice.",
      "vi": "Octopus Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Octopus Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-octopus-guard-n_lbd3_o",
    "provider": "youtube",
    "title": {
      "en": "Counter to the octopus guard hip bump #bjj",
      "vi": "Counter to thể octopus guard hip bump #bjj (phân tích)",
      "fr": "Counter to the octopus guard hip bump #bjj (analyse)"
    },
    "channelName": "Nogi Nick",
    "url": "https://www.youtube.com/watch?v=n_lDTbd3_Zo",
    "embedUrl": "https://www.youtube.com/embed/n_lDTbd3_Zo",
    "youtubeId": "n_lDTbd3_Zo",
    "language": "en",
    "relatedSkillIds": [
      "octopus-guard-control"
    ],
    "relatedPositionIds": [
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "guard-system",
      "half-guard",
      "octopus-guard"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Octopus Guard provides a detailed breakdown of Counter to the octopus guard hip bump #bjj with practical drilling advice.",
      "vi": "Octopus Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Octopus Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-octopus-guard-g2l28_6g",
    "provider": "youtube",
    "title": {
      "en": "UFC heavyweight GOAT Tom Aspinall octopus guard 2.0 with Craig Jones ft Paul Hughes",
      "vi": "UFC heavyweight GOAT Tom Aspinall octopus guard 2.0 with Craig Jones ft Paul Hughes (phân tích)",
      "fr": "UFC heavyweight GOAT Tom Aspinall octopus guard 2.0 with Craig Jones ft Paul Hughes (analyse)"
    },
    "channelName": "The B-Team",
    "url": "https://www.youtube.com/watch?v=gP2l2G8Q_6g",
    "embedUrl": "https://www.youtube.com/embed/gP2l2G8Q_6g",
    "youtubeId": "gP2l2G8Q_6g",
    "language": "en",
    "relatedSkillIds": [
      "octopus-guard-control"
    ],
    "relatedPositionIds": [
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "guard-system",
      "half-guard",
      "octopus-guard"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Octopus Guard provides a detailed breakdown of UFC heavyweight GOAT Tom Aspinall octopus guard 2.0 with Craig Jones ft Paul Hughes with practical drilling advice.",
      "vi": "Octopus Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Octopus Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-open-guard-_r_u4",
    "provider": "youtube",
    "title": {
      "en": "Sneaky calf slicer when attacking k-guard 😯 #bjj #jiujitsu #grappling #submission #wrestling #judo",
      "vi": "Sneaky calf slicer when attacking k-guard 😯 #bjj #jiujitsu #grappling #submission #wrestling #judo (phân tích)",
      "fr": "Sneaky calf slicer when attacking k-guard 😯 #bjj #jiujitsu #grappling #submission #wrestling #judo (analyse)"
    },
    "channelName": "Christos Papadelos",
    "url": "https://www.youtube.com/watch?v=VD_RrG_QTu4",
    "embedUrl": "https://www.youtube.com/embed/VD_RrG_QTu4",
    "youtubeId": "VD_RrG_QTu4",
    "language": "en",
    "relatedSkillIds": [
      "k-guard-matrix"
    ],
    "techniqueTags": [
      "k-guard",
      "leg-entanglements",
      "matrix"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Open Guard provides a detailed breakdown of Sneaky calf slicer when attacking k-guard 😯 #bjj #jiujitsu #grappling #submission #wrestling #judo with practical drilling advice.",
      "vi": "Open Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Open Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-open-guard-45necv",
    "provider": "youtube",
    "title": {
      "en": "63 K-Guard Techniques In Just 18 Minutes by Jason Scully (BJJ / Grappling)",
      "vi": "63 K-Guard Techniques In Just 18 Minutes by Jason Scully (BJJ / Grappling) (phân tích)",
      "fr": "63 K-Guard Techniques In Just 18 Minutes by Jason Scully (BJJ / Grappling) (analyse)"
    },
    "channelName": "Jiu Jitsu In Minutes by Jason Scully",
    "url": "https://www.youtube.com/watch?v=O4G5neJScvU",
    "embedUrl": "https://www.youtube.com/embed/O4G5neJScvU",
    "youtubeId": "O4G5neJScvU",
    "language": "en",
    "relatedSkillIds": [
      "k-guard-matrix"
    ],
    "techniqueTags": [
      "k-guard",
      "leg-entanglements",
      "matrix"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Open Guard provides a detailed breakdown of 63 K-Guard Techniques In Just 18 Minutes by Jason Scully (BJJ / Grappling) with practical drilling advice.",
      "vi": "Open Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Open Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-open-guard-xjm2ofq8",
    "provider": "youtube",
    "title": {
      "en": "Nogi leg drag guard passing drill - getting down low",
      "vi": "Nogi leg drag guard passing drill - getting down low (phân tích)",
      "fr": "Nogi leg drag guard passing drill - getting down low (analyse)"
    },
    "channelName": "The Happy Pill Project",
    "url": "https://www.youtube.com/watch?v=xjm2WoMfBq8",
    "embedUrl": "https://www.youtube.com/embed/xjm2WoMfBq8",
    "youtubeId": "xjm2WoMfBq8",
    "language": "en",
    "relatedSkillIds": [
      "leg-drag-basics"
    ],
    "techniqueTags": [
      "leg-drag",
      "passing"
    ],
    "relevance": "supplemental",
    "level": "intermediate",
    "whyUseful": {
      "en": "Open Guard provides a detailed breakdown of Nogi leg drag guard passing drill - getting down low with practical drilling advice.",
      "vi": "Open Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Open Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-x-guard-l28z",
    "provider": "youtube",
    "title": {
      "en": "Wedging back take and crab ride from single leg x #jiujitsu #mma #nogi",
      "vi": "Wedging back take and crab ride from single leg x #jiujitsu #mma #nogi (phân tích)",
      "fr": "Wedging back take and crab ride from single leg x #jiujitsu #mma #nogi (analyse)"
    },
    "channelName": "Argyle mma",
    "url": "https://www.youtube.com/watch?v=UCOIl2FF8zE",
    "embedUrl": "https://www.youtube.com/embed/UCOIl2FF8zE",
    "youtubeId": "UCOIl2FF8zE",
    "language": "en",
    "relatedSkillIds": [
      "back-control",
      "crab-ride"
    ],
    "relatedPositionIds": [
      "back-control-position"
    ],
    "techniqueTags": [
      "back-control",
      "back-take",
      "control",
      "crab-ride",
      "leg-ride",
      "seatbelt"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "X Guard provides a detailed breakdown of Wedging back take and crab ride from single leg x #jiujitsu #mma #nogi with practical drilling advice.",
      "vi": "X Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "X Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-x-guard-e75erg",
    "provider": "youtube",
    "title": {
      "en": "Crab ride backtake with Ross Nicholls #shorts #bjj #backtake #crabride",
      "vi": "Crab ride backtake with Ross Nicholls #shorts #bjj #backtake #crabride (phân tích)",
      "fr": "Crab ride backtake with Ross Nicholls #shorts #bjj #backtake #crabride (analyse)"
    },
    "channelName": "Silverbacks MMA",
    "url": "https://www.youtube.com/watch?v=e75EZRLerXg",
    "embedUrl": "https://www.youtube.com/embed/e75EZRLerXg",
    "youtubeId": "e75EZRLerXg",
    "language": "en",
    "relatedSkillIds": [
      "crab-ride"
    ],
    "techniqueTags": [
      "back-take",
      "crab-ride",
      "leg-ride"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "X Guard provides a detailed breakdown of Crab ride backtake with Ross Nicholls #shorts #bjj #backtake #crabride with practical drilling advice.",
      "vi": "X Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "X Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-z-guard--1pvhpc54",
    "provider": "youtube",
    "title": {
      "en": "Shoulder crunch from Z guard. #10thplanet #grappling #halfguard #jiujitsu",
      "vi": "Shoulder crunch from Z guard. #10thplanet #grappling #halfguard #jiujitsu (phân tích)",
      "fr": "Shoulder crunch from Z guard. #10thplanet #grappling #halfguard #jiujitsu (analyse)"
    },
    "channelName": "DarceVader10p",
    "url": "https://www.youtube.com/watch?v=-1YYpvhpc54",
    "embedUrl": "https://www.youtube.com/embed/-1YYpvhpc54",
    "youtubeId": "-1YYpvhpc54",
    "language": "en",
    "relatedSkillIds": [
      "butterfly-guard-off-balance"
    ],
    "relatedPositionIds": [
      "butterfly-guard"
    ],
    "techniqueTags": [
      "butterfly-guard",
      "guard-system",
      "off-balance",
      "sweep"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Z Guard provides a detailed breakdown of Shoulder crunch from Z guard. #10thplanet #grappling #halfguard #jiujitsu with practical drilling advice.",
      "vi": "Z Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Z Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-z-guard-sk5x4",
    "provider": "youtube",
    "title": {
      "en": "Z-Guard VS. Knee Shield Half Guard",
      "vi": "Z-Guard VS. Knee Shield Half Guard (phân tích)",
      "fr": "Z-Guard VS. Knee Shield Half Guard (analyse)"
    },
    "channelName": "MMA Leech",
    "url": "https://www.youtube.com/watch?v=NsRHHZk5Nx4",
    "embedUrl": "https://www.youtube.com/embed/NsRHHZk5Nx4",
    "youtubeId": "NsRHHZk5Nx4",
    "language": "en",
    "relatedSkillIds": [
      "half-guard-knee-shield"
    ],
    "relatedPositionIds": [
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "guard-system",
      "half-guard",
      "knee-shield"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Z Guard provides a detailed breakdown of Z-Guard VS. Knee Shield Half Guard with practical drilling advice.",
      "vi": "Z Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Z Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "bjj-z-guard-p4i000",
    "provider": "youtube",
    "title": {
      "en": "Choi Bar From Z Guard (NOGI) by Yongwon Choi",
      "vi": "Choi Bar From Z Guard (NOGI) by Yongwon Choi (phân tích)",
      "fr": "Choi Bar From Z Guard (NOGI) by Yongwon Choi (analyse)"
    },
    "channelName": "Bernardo Faria BJJ Fanatics",
    "url": "https://www.youtube.com/watch?v=Up4iZ0Y0XX0",
    "embedUrl": "https://www.youtube.com/embed/Up4iZ0Y0XX0",
    "youtubeId": "Up4iZ0Y0XX0",
    "language": "en",
    "relatedSkillIds": [
      "choi-bar"
    ],
    "techniqueTags": [
      "armbar",
      "choi-bar",
      "submission"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Z Guard provides a detailed breakdown of Choi Bar From Z Guard (NOGI) by Yongwon Choi with practical drilling advice.",
      "vi": "Z Guard cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.",
      "fr": "Z Guard fournit une analyse detaillee avec des conseils pratiques."
    },
    "whatToWatchFor": {
      "en": [
        "Body positioning and weight distribution",
        "Grip control and placement",
        "Finishing mechanics",
        "Common mistakes to avoid"
      ],
      "vi": [
        "Positioning cơ thể và phân bổ trọng lượng",
        "Kiểm soát grip và đặt tay",
        "Mechanics hoàn thiện",
        "Lỗi thường gặp cần tránh"
      ],
      "fr": [
        "Positionnement du corps et repartition du poids",
        "Controle et placement des grips",
        "Mecanique de finition",
        "Erreurs courantes a eviter"
      ]
    },
    "sourceNote": "Curated from bjj.tips public YouTube listings."
  },
  {
    "id": "gordon-ryan-best-way-control-mount",
    "provider": "youtube",
    "title": {
      "en": "Best Way To Control The Mount In Jiu Jitsu by Gordon Ryan",
      "vi": "Gordon Ryan: cách kiểm soát mount hiệu quả",
      "fr": "Gordon Ryan : meilleure façon de contrôler la mount"
    },
    "channelName": "Bernardo Faria BJJ Fanatics",
    "url": "https://www.youtube.com/watch?v=kft2AkvKhWU",
    "embedUrl": "https://www.youtube.com/embed/kft2AkvKhWU",
    "youtubeId": "kft2AkvKhWU",
    "language": "en",
    "relatedSkillIds": [
      "mount-control"
    ],
    "relatedPositionIds": [
      "mount-top"
    ],
    "techniqueTags": [
      "mount",
      "mount-control",
      "no-gi",
      "pressure",
      "hand-fighting"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Gordon Ryan explains no-gi mount control using hand position, pressure, and predictable reactions instead of fabric grips.",
      "vi": "Gordon Ryan giải thích kiểm soát mount no-gi bằng vị trí tay, áp lực và phản ứng dự đoán được thay vì grip áo.",
      "fr": "Gordon Ryan explique le contrôle mount no-gi avec position des mains, pression et réactions prévisibles plutôt que grips tissu."
    },
    "whatToWatchFor": {
      "en": [
        "Cross hand control without cloth grips",
        "Weight distribution through hips and knees",
        "How bottom reactions expose arms",
        "Staying stable before attacking"
      ],
      "vi": [
        "Kiểm soát tay chéo không cần grip áo",
        "Phân bổ trọng lượng qua hông và gối",
        "Cách phản ứng của bottom lộ tay",
        "Ổn định trước khi tấn công"
      ],
      "fr": [
        "Contrôle croisé sans grip tissu",
        "Distribution du poids par hanches et genoux",
        "Réactions bottom qui exposent les bras",
        "Stabiliser avant attaque"
      ]
    },
    "sourceNote": "No-Gi mount control reference found through White Belt Club and BJJ.Tips mount listings."
  },
  {
    "id": "gordon-ryan-never-lose-mount",
    "provider": "youtube",
    "title": {
      "en": "How to Never Lose the Mount Position by Gordon Ryan",
      "vi": "Gordon Ryan: cách không mất mount position",
      "fr": "Gordon Ryan : comment ne pas perdre la mount"
    },
    "channelName": "Gordon Ryan",
    "url": "https://www.youtube.com/watch?v=zQbkvb_hkwY",
    "embedUrl": "https://www.youtube.com/embed/zQbkvb_hkwY",
    "youtubeId": "zQbkvb_hkwY",
    "language": "en",
    "relatedSkillIds": [
      "mount-control"
    ],
    "relatedPositionIds": [
      "mount-top"
    ],
    "techniqueTags": [
      "mount",
      "mount-control",
      "no-gi",
      "retention",
      "hand-fighting"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "A no-gi focused mount retention reference for stopping escape cycles before chasing submissions.",
      "vi": "Tham khảo no-gi về giữ mount và chặn chu kỳ escape trước khi săn submission.",
      "fr": "Référence no-gi pour conserver la mount et stopper les cycles de sortie avant de chasser la soumission."
    },
    "whatToWatchFor": {
      "en": [
        "Pinning the hand before it frames",
        "Following hip movement",
        "Separating elbow from ribs",
        "Returning to control when attacks fail"
      ],
      "vi": [
        "Pin tay trước khi họ frame",
        "Theo chuyển động hông",
        "Tách khuỷu khỏi sườn",
        "Quay lại control khi attack hụt"
      ],
      "fr": [
        "Bloquer la main avant le frame",
        "Suivre les hanches",
        "Séparer coude et côtes",
        "Revenir au contrôle si attaque échoue"
      ]
    },
    "sourceNote": "No-Gi mount control reference from Gordon Ryan public YouTube listing."
  },
  {
    "id": "brian-glick-gift-wrap-no-gi",
    "provider": "youtube",
    "title": {
      "en": "The Gift Wrap in 2 Minutes - No GI BJJ",
      "vi": "Gift wrap no-gi trong 2 phút",
      "fr": "Gift wrap no-gi en 2 minutes"
    },
    "channelName": "Brian Glick",
    "url": "https://www.youtube.com/watch?v=0t2Y-T6dFi0",
    "embedUrl": "https://www.youtube.com/embed/0t2Y-T6dFi0",
    "youtubeId": "0t2Y-T6dFi0",
    "language": "en",
    "relatedSkillIds": [
      "mount-control",
      "s-mount-control"
    ],
    "relatedPositionIds": [
      "mount-top"
    ],
    "techniqueTags": [
      "mount",
      "gift-wrap",
      "no-gi",
      "arm-isolation"
    ],
    "relevance": "supplemental",
    "level": "intermediate",
    "whyUseful": {
      "en": "Brian Glick shows a clear no-gi gift-wrap control that connects mount stability to back takes and arm isolation.",
      "vi": "Brian Glick trình bày gift-wrap no-gi rõ ràng, nối kiểm soát mount với back take và cô lập tay.",
      "fr": "Brian Glick montre un gift-wrap no-gi clair reliant stabilité mount, prises de dos et isolation du bras."
    },
    "whatToWatchFor": {
      "en": [
        "Wrist control without sleeves",
        "Knee position near the shoulder",
        "Preventing leg capture",
        "Back-take or submission branches"
      ],
      "vi": [
        "Kiểm soát cổ tay không cần tay áo",
        "Vị trí gối gần vai",
        "Không để chân bị bắt",
        "Nhánh back-take hoặc submission"
      ],
      "fr": [
        "Contrôle poignet sans manches",
        "Genou près de l’épaule",
        "Éviter la capture de jambe",
        "Branches dos ou soumission"
      ]
    },
    "sourceNote": "No-Gi BJJ mount/gift-wrap reference from Brian Glick public YouTube listing."
  },
  {
    "id": "brian-glick-ibjjf-legal-ankle-lock-system",
    "provider": "youtube",
    "title": {
      "en": "The IBJJF Legal Ankle Lock System",
      "vi": "Hệ thống ankle lock hợp lệ IBJJF",
      "fr": "Système ankle lock légal IBJJF"
    },
    "channelName": "Brian Glick",
    "url": "https://www.youtube.com/watch?v=W1SAJqqZFdI",
    "embedUrl": "https://www.youtube.com/embed/W1SAJqqZFdI",
    "youtubeId": "W1SAJqqZFdI",
    "language": "en",
    "relatedSkillIds": [
      "straight-ankle-lock-safety",
      "leg-lock-safety-basics",
      "single-leg-x-basics"
    ],
    "relatedPositionIds": [
      "outside-ashi",
      "single-leg-x"
    ],
    "techniqueTags": [
      "straight-ankle-lock",
      "ankle-lock",
      "leg-lock",
      "butterfly-ashi",
      "knee-line",
      "ruleset-safety"
    ],
    "relevance": "safety_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Brian Glick focuses on a ruleset-safe straight ankle lock structure, with butterfly ashi positioning and no-reap decision making.",
      "vi": "Brian Glick tập trung vào cấu trúc straight ankle lock an toàn theo luật, với butterfly ashi và quyết định không reap.",
      "fr": "Brian Glick détaille une structure de straight ankle lock sûre selon les règles, avec butterfly ashi et décisions sans reap."
    },
    "whatToWatchFor": {
      "en": [
        "Knee line position before finishing",
        "Butterfly ashi without reaping",
        "Foot placement on the hip line",
        "Resetting when the knee escapes"
      ],
      "vi": [
        "Vị trí knee line trước khi finish",
        "Butterfly ashi không reap",
        "Đặt chân trên hip line",
        "Reset khi knee line thoát"
      ],
      "fr": [
        "Position de knee line avant finition",
        "Butterfly ashi sans reap",
        "Placement du pied sur hip line",
        "Reset quand la knee line sort"
      ]
    },
    "caution": {
      "en": "Straight ankle locks still injure ankles and knees when rushed. Increase pressure slowly and release immediately on tap or unclear knee rotation.",
      "vi": "Straight ankle lock vẫn có thể làm đau cổ chân và gối nếu vội. Tăng lực chậm và thả ngay khi tap hoặc hướng xoay gối không rõ.",
      "fr": "Les straight ankle locks peuvent blesser cheville et genou si elles sont forcées. Augmentez lentement et relâchez au tap ou rotation floue."
    },
    "sourceNote": "Public YouTube reference selected for straight ankle lock safety and ruleset awareness."
  },
  {
    "id": "lachlan-giles-straight-ankle-locks",
    "provider": "youtube",
    "title": {
      "en": "Straight ankle locks (Lachlan Giles)",
      "vi": "Straight ankle locks với Lachlan Giles",
      "fr": "Straight ankle locks avec Lachlan Giles"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=cmimzr_oNbw",
    "embedUrl": "https://www.youtube.com/embed/cmimzr_oNbw",
    "youtubeId": "cmimzr_oNbw",
    "language": "en",
    "relatedSkillIds": [
      "straight-ankle-lock-safety",
      "single-leg-x-basics"
    ],
    "relatedPositionIds": [
      "single-leg-x",
      "outside-ashi"
    ],
    "techniqueTags": [
      "straight-ankle-lock",
      "ankle-lock",
      "single-leg-x",
      "leg-lock",
      "knee-line"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Lachlan Giles breaks down straight ankle lock control, common defenses, and how to keep the finish structured instead of cranking.",
      "vi": "Lachlan Giles phân tích control straight ankle lock, các defense thường gặp và cách giữ finish có cấu trúc thay vì crank.",
      "fr": "Lachlan Giles analyse le contrôle du straight ankle lock, les défenses communes et une finition structurée sans forcer."
    },
    "whatToWatchFor": {
      "en": [
        "Control before extension",
        "How the defender clears the knee line",
        "Grip placement on the ankle line",
        "Countering common escapes safely"
      ],
      "vi": [
        "Control trước khi extension",
        "Cách defender clear knee line",
        "Đặt grip trên ankle line",
        "Counter escape phổ biến an toàn"
      ],
      "fr": [
        "Contrôle avant extension",
        "Comment le défenseur sort la knee line",
        "Placement grip sur ankle line",
        "Contrer les sorties communes en sécurité"
      ]
    },
    "caution": {
      "en": "Use this as a mechanics reference, not permission to crank. Drill slowly and stop as soon as the defender taps or loses safe knee alignment.",
      "vi": "Dùng video này làm tham khảo mechanics, không phải để crank. Drill chậm và dừng ngay khi defender tap hoặc mất alignment gối an toàn.",
      "fr": "Utilisez comme référence mécanique, pas pour forcer. Travaillez lentement et stoppez au tap ou perte d’alignement genou."
    },
    "sourceNote": "Public YouTube reference found through BJJ.Tips and BJJUniversity straight ankle lock listings."
  },
  {
    "id": "gordon-no-gi-guard-retention-positions",
    "provider": "youtube",
    "title": {
      "en": "Understanding Guard Retention From The Most Important Positions In Jiu Jitsu No Gi",
      "vi": "Understanding Guard Retention From The Most Important Positions In Jiu Jitsu No Gi",
      "fr": "Understanding Guard Retention From The Most Important Positions In Jiu Jitsu No Gi"
    },
    "channelName": "Gordon Ryan",
    "url": "https://www.youtube.com/watch?v=bgPIcInPg-A",
    "embedUrl": "https://www.youtube.com/embed/bgPIcInPg-A",
    "youtubeId": "bgPIcInPg-A",
    "language": "en",
    "relatedSkillIds": [
      "seated-guard-retention",
      "supine-guard-retention",
      "guard-pulling-strategy"
    ],
    "relatedPositionIds": [
      "seated-guard"
    ],
    "techniqueTags": [
      "no-gi",
      "guard-retention",
      "seated-guard",
      "supine-guard"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Shows the core No-Gi guard retention layers NoGiMind uses for seated and supine recovery.",
      "vi": "Shows the core No-Gi guard retention layers NoGiMind uses for seated and supine recovery.",
      "fr": "Shows the core No-Gi guard retention layers NoGiMind uses for seated and supine recovery."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "brian-glick-bad-flexibility-guard-retention",
    "provider": "youtube",
    "title": {
      "en": "How People With Bad Flexibility Retain Guard (NoGi BJJ)",
      "vi": "How People With Bad Flexibility Retain Guard (NoGi BJJ)",
      "fr": "How People With Bad Flexibility Retain Guard (NoGi BJJ)"
    },
    "channelName": "Brian Glick",
    "url": "https://www.youtube.com/watch?v=LzjwOxqFkK8",
    "embedUrl": "https://www.youtube.com/embed/LzjwOxqFkK8",
    "youtubeId": "LzjwOxqFkK8",
    "language": "en",
    "relatedSkillIds": [
      "seated-guard-retention",
      "supine-guard-retention",
      "frames-pummeling"
    ],
    "relatedPositionIds": [
      "seated-guard"
    ],
    "techniqueTags": [
      "no-gi",
      "guard-retention",
      "frames",
      "hip-movement"
    ],
    "relevance": "supplemental",
    "level": "beginner",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "john-danaher-guard-retention-theory",
    "provider": "youtube",
    "title": {
      "en": "Guard Retention Theory by John Danaher",
      "vi": "Guard Retention Theory by John Danaher",
      "fr": "Guard Retention Theory by John Danaher"
    },
    "channelName": "John Danaher",
    "url": "https://www.youtube.com/watch?v=Psp1we_mMd8",
    "embedUrl": "https://www.youtube.com/embed/Psp1we_mMd8",
    "youtubeId": "Psp1we_mMd8",
    "language": "en",
    "relatedSkillIds": [
      "positional-hierarchy",
      "inside-position",
      "seated-guard-retention",
      "supine-guard-retention"
    ],
    "relatedPositionIds": [
      "seated-guard"
    ],
    "techniqueTags": [
      "no-gi",
      "guard-retention",
      "inside-position",
      "positional-hierarchy"
    ],
    "relevance": "conceptual",
    "level": "intermediate",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "craig-jones-omoplata-opens-legs",
    "provider": "youtube",
    "title": {
      "en": "Omoplata Opens To Legs by Craig Jones",
      "vi": "Omoplata Opens To Legs by Craig Jones",
      "fr": "Omoplata Opens To Legs by Craig Jones"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=6XlF5PFHaA0",
    "embedUrl": "https://www.youtube.com/embed/6XlF5PFHaA0",
    "youtubeId": "6XlF5PFHaA0",
    "language": "en",
    "relatedSkillIds": [
      "omoplata-system",
      "k-guard-entry"
    ],
    "relatedPositionIds": [
      "closed-guard",
      "seated-guard"
    ],
    "techniqueTags": [
      "no-gi",
      "omoplata",
      "leg-lock",
      "k-guard",
      "submission-chain"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion.",
    "caution": {
      "en": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early.",
      "vi": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early.",
      "fr": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early."
    }
  },
  {
    "id": "ryan-hall-omoplata-front-headlock",
    "provider": "youtube",
    "title": {
      "en": "Omoplata to Front Headlock by Ryan Hall",
      "vi": "Omoplata to Front Headlock by Ryan Hall",
      "fr": "Omoplata to Front Headlock by Ryan Hall"
    },
    "channelName": "Ryan Hall",
    "url": "https://www.youtube.com/watch?v=D4qGTP_xWjY",
    "embedUrl": "https://www.youtube.com/embed/D4qGTP_xWjY",
    "youtubeId": "D4qGTP_xWjY",
    "language": "en",
    "relatedSkillIds": [
      "omoplata-system",
      "snapdown-front-headlock",
      "fhl-go-behind"
    ],
    "relatedPositionIds": [
      "front-headlock-top",
      "seated-guard"
    ],
    "techniqueTags": [
      "no-gi",
      "omoplata",
      "front-headlock",
      "go-behind"
    ],
    "relevance": "supplemental",
    "level": "intermediate",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion.",
    "caution": {
      "en": "Neck and airway pressure can escalate fast. Apply gradually and release immediately on tap or discomfort.",
      "vi": "Neck and airway pressure can escalate fast. Apply gradually and release immediately on tap or discomfort.",
      "fr": "Neck and airway pressure can escalate fast. Apply gradually and release immediately on tap or discomfort."
    }
  },
  {
    "id": "brian-glick-clamp-guard-nogi",
    "provider": "youtube",
    "title": {
      "en": "Use The Clamp Guard to Make Your Opponent Question Their Life Choices (No-Gi BJJ)",
      "vi": "Use The Clamp Guard to Make Your Opponent Question Their Life Choices (No-Gi BJJ)",
      "fr": "Use The Clamp Guard to Make Your Opponent Question Their Life Choices (No-Gi BJJ)"
    },
    "channelName": "Brian Glick",
    "url": "https://www.youtube.com/watch?v=o01izcW5KIw",
    "embedUrl": "https://www.youtube.com/embed/o01izcW5KIw",
    "youtubeId": "o01izcW5KIw",
    "language": "en",
    "relatedSkillIds": [
      "clamp-guard-control",
      "triangle-system",
      "omoplata-system"
    ],
    "relatedPositionIds": [
      "closed-guard"
    ],
    "techniqueTags": [
      "no-gi",
      "clamp-guard",
      "triangle",
      "omoplata"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "brian-glick-clamp-guard-drill",
    "provider": "youtube",
    "title": {
      "en": "Perfect Drill for the Clamp Guard by Brian Glick",
      "vi": "Perfect Drill for the Clamp Guard by Brian Glick",
      "fr": "Perfect Drill for the Clamp Guard by Brian Glick"
    },
    "channelName": "Brian Glick",
    "url": "https://www.youtube.com/watch?v=oU8eqzC4etY",
    "embedUrl": "https://www.youtube.com/embed/oU8eqzC4etY",
    "youtubeId": "oU8eqzC4etY",
    "language": "en",
    "relatedSkillIds": [
      "clamp-guard-control",
      "shoulder-crunch-control"
    ],
    "relatedPositionIds": [
      "closed-guard",
      "seated-guard"
    ],
    "techniqueTags": [
      "no-gi",
      "clamp-guard",
      "shoulder-crunch",
      "drill"
    ],
    "relevance": "supplemental",
    "level": "beginner",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "craig-jones-octopus-front-head",
    "provider": "youtube",
    "title": {
      "en": "Octopus To Front Head by Craig Jones",
      "vi": "Octopus To Front Head by Craig Jones",
      "fr": "Octopus To Front Head by Craig Jones"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=nJTYYHSh4XU",
    "embedUrl": "https://www.youtube.com/embed/nJTYYHSh4XU",
    "youtubeId": "nJTYYHSh4XU",
    "language": "en",
    "relatedSkillIds": [
      "octopus-back-take",
      "fhl-go-behind",
      "front-headlock-defense"
    ],
    "relatedPositionIds": [
      "half-guard-bottom",
      "front-headlock-top"
    ],
    "techniqueTags": [
      "no-gi",
      "octopus",
      "front-headlock",
      "go-behind"
    ],
    "relevance": "supplemental",
    "level": "advanced",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion.",
    "caution": {
      "en": "Neck and airway pressure can escalate fast. Apply gradually and release immediately on tap or discomfort.",
      "vi": "Neck and airway pressure can escalate fast. Apply gradually and release immediately on tap or discomfort.",
      "fr": "Neck and airway pressure can escalate fast. Apply gradually and release immediately on tap or discomfort."
    }
  },
  {
    "id": "craig-jones-spiral-ride",
    "provider": "youtube",
    "title": {
      "en": "Spiral Ride by Craig Jones",
      "vi": "Spiral Ride by Craig Jones",
      "fr": "Spiral Ride by Craig Jones"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=PT50ievI18k",
    "embedUrl": "https://www.youtube.com/embed/PT50ievI18k",
    "youtubeId": "PT50ievI18k",
    "language": "en",
    "relatedSkillIds": [
      "spiral-ride",
      "wrist-ride-back-exposure",
      "turtle-ride"
    ],
    "relatedPositionIds": [
      "turtle-bottom",
      "back-control-position"
    ],
    "techniqueTags": [
      "no-gi",
      "spiral-ride",
      "ride",
      "back-exposure"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "brian-glick-crucifix-top-turtle",
    "provider": "youtube",
    "title": {
      "en": "Crucifix Top Turtle Entries Seatbelt Roll by Brian Glick",
      "vi": "Crucifix Top Turtle Entries Seatbelt Roll by Brian Glick",
      "fr": "Crucifix Top Turtle Entries Seatbelt Roll by Brian Glick"
    },
    "channelName": "Brian Glick",
    "url": "https://www.youtube.com/watch?v=4XhwLYc5wx4",
    "embedUrl": "https://www.youtube.com/embed/4XhwLYc5wx4",
    "youtubeId": "4XhwLYc5wx4",
    "language": "en",
    "relatedSkillIds": [
      "turtle-ride",
      "wrist-ride-back-exposure",
      "back-control"
    ],
    "relatedPositionIds": [
      "turtle-bottom",
      "back-control-position"
    ],
    "techniqueTags": [
      "no-gi",
      "turtle",
      "crucifix",
      "seatbelt",
      "back-control"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "brian-glick-double-leg-from-turtle",
    "provider": "youtube",
    "title": {
      "en": "Double Leg From Turtle by Brian Glick",
      "vi": "Double Leg From Turtle by Brian Glick",
      "fr": "Double Leg From Turtle by Brian Glick"
    },
    "channelName": "Brian Glick",
    "url": "https://www.youtube.com/watch?v=SPHRx98tljU",
    "embedUrl": "https://www.youtube.com/embed/SPHRx98tljU",
    "youtubeId": "SPHRx98tljU",
    "language": "en",
    "relatedSkillIds": [
      "turtle-ride",
      "mat-return-basics",
      "single-leg-bjj"
    ],
    "relatedPositionIds": [
      "turtle-bottom"
    ],
    "techniqueTags": [
      "no-gi",
      "turtle",
      "double-leg",
      "mat-return",
      "wrestling"
    ],
    "relevance": "supplemental",
    "level": "intermediate",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "craig-jones-north-south-choke-pin",
    "provider": "youtube",
    "title": {
      "en": "North South Choke As A Pinning Tool by Craig Jones",
      "vi": "North South Choke As A Pinning Tool by Craig Jones",
      "fr": "North South Choke As A Pinning Tool by Craig Jones"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=SPXanCnoBYA",
    "embedUrl": "https://www.youtube.com/embed/SPXanCnoBYA",
    "youtubeId": "SPXanCnoBYA",
    "language": "en",
    "relatedSkillIds": [
      "north-south-control",
      "side-control-pin",
      "dilemmas-two-way-attacks"
    ],
    "relatedPositionIds": [
      "north-south",
      "side-control-top"
    ],
    "techniqueTags": [
      "no-gi",
      "north-south",
      "pin",
      "choke"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion.",
    "caution": {
      "en": "Neck and airway pressure can escalate fast. Apply gradually and release immediately on tap or discomfort.",
      "vi": "Neck and airway pressure can escalate fast. Apply gradually and release immediately on tap or discomfort.",
      "fr": "Neck and airway pressure can escalate fast. Apply gradually and release immediately on tap or discomfort."
    }
  },
  {
    "id": "gordon-knee-on-belly-toreando",
    "provider": "youtube",
    "title": {
      "en": "Gordon Ryan Toreando to Knee on Belly",
      "vi": "Gordon Ryan Toreando to Knee on Belly",
      "fr": "Gordon Ryan Toreando to Knee on Belly"
    },
    "channelName": "Gordon Ryan",
    "url": "https://www.youtube.com/watch?v=LkGccU4EtRw",
    "embedUrl": "https://www.youtube.com/embed/LkGccU4EtRw",
    "youtubeId": "LkGccU4EtRw",
    "language": "en",
    "relatedSkillIds": [
      "knee-on-belly-control",
      "outside-passing",
      "leg-drag-pass"
    ],
    "relatedPositionIds": [
      "knee-on-belly",
      "seated-guard"
    ],
    "techniqueTags": [
      "no-gi",
      "knee-on-belly",
      "toreando",
      "outside-passing"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion.",
    "caution": {
      "en": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early.",
      "vi": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early.",
      "fr": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early."
    }
  },
  {
    "id": "brian-glick-knee-on-belly-single-leg-escape",
    "provider": "youtube",
    "title": {
      "en": "Escaping Knee on Belly Entering the Single Leg by Brian Glick",
      "vi": "Escaping Knee on Belly Entering the Single Leg by Brian Glick",
      "fr": "Escaping Knee on Belly Entering the Single Leg by Brian Glick"
    },
    "channelName": "Brian Glick",
    "url": "https://www.youtube.com/watch?v=zjl7EQAIrII",
    "embedUrl": "https://www.youtube.com/embed/zjl7EQAIrII",
    "youtubeId": "zjl7EQAIrII",
    "language": "en",
    "relatedSkillIds": [
      "knee-on-belly-control",
      "single-leg-bjj",
      "technical-stand-up"
    ],
    "relatedPositionIds": [
      "knee-on-belly"
    ],
    "techniqueTags": [
      "no-gi",
      "knee-on-belly",
      "single-leg",
      "escape"
    ],
    "relevance": "supplemental",
    "level": "beginner",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion.",
    "caution": {
      "en": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early.",
      "vi": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early.",
      "fr": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early."
    }
  },
  {
    "id": "brian-glick-inside-position-knee-cut",
    "provider": "youtube",
    "title": {
      "en": "Guard Passing BEST KEPT SECRETS: Inside Position Outside Knee Cut by Brian Glick",
      "vi": "Guard Passing BEST KEPT SECRETS: Inside Position Outside Knee Cut by Brian Glick",
      "fr": "Guard Passing BEST KEPT SECRETS: Inside Position Outside Knee Cut by Brian Glick"
    },
    "channelName": "Brian Glick",
    "url": "https://www.youtube.com/watch?v=BpKK6tCp4R0",
    "embedUrl": "https://www.youtube.com/embed/BpKK6tCp4R0",
    "youtubeId": "BpKK6tCp4R0",
    "language": "en",
    "relatedSkillIds": [
      "knee-cut-passing",
      "inside-position",
      "outside-passing"
    ],
    "relatedPositionIds": [
      "seated-guard",
      "headquarters-top"
    ],
    "techniqueTags": [
      "no-gi",
      "knee-cut",
      "inside-position",
      "passing"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion.",
    "caution": {
      "en": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early.",
      "vi": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early.",
      "fr": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early."
    }
  },
  {
    "id": "giancarlo-high-percentage-knee-cut",
    "provider": "youtube",
    "title": {
      "en": "Simple and Important Details for High Percentage Knee Cut Guard Passing",
      "vi": "Simple and Important Details for High Percentage Knee Cut Guard Passing",
      "fr": "Simple and Important Details for High Percentage Knee Cut Guard Passing"
    },
    "channelName": "Giancarlo Bodoni",
    "url": "https://www.youtube.com/watch?v=V0dVAzBA2zY",
    "embedUrl": "https://www.youtube.com/embed/V0dVAzBA2zY",
    "youtubeId": "V0dVAzBA2zY",
    "language": "en",
    "relatedSkillIds": [
      "knee-cut-passing",
      "headquarters-passing",
      "failure-response-transitions"
    ],
    "relatedPositionIds": [
      "headquarters-top",
      "seated-guard"
    ],
    "techniqueTags": [
      "no-gi",
      "knee-cut",
      "passing",
      "headquarters"
    ],
    "relevance": "supplemental",
    "level": "intermediate",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion.",
    "caution": {
      "en": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early.",
      "vi": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early.",
      "fr": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early."
    }
  },
  {
    "id": "open-guard-leg-drag-back-take",
    "provider": "youtube",
    "title": {
      "en": "Combining Leg Drag and Taking The Back",
      "vi": "Combining Leg Drag and Taking The Back",
      "fr": "Combining Leg Drag and Taking The Back"
    },
    "channelName": "Open Guard",
    "url": "https://www.youtube.com/watch?v=EPyqapk9v2Y",
    "embedUrl": "https://www.youtube.com/embed/EPyqapk9v2Y",
    "youtubeId": "EPyqapk9v2Y",
    "language": "en",
    "relatedSkillIds": [
      "leg-drag-basics",
      "leg-drag-pass",
      "crab-ride"
    ],
    "relatedPositionIds": [
      "seated-guard",
      "back-control-position"
    ],
    "techniqueTags": [
      "no-gi",
      "leg-drag",
      "back-take",
      "crab-ride"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "open-guard-rolling-back-take-leg-drag",
    "provider": "youtube",
    "title": {
      "en": "Rolling Back Take from the Leg Drag Guard",
      "vi": "Rolling Back Take from the Leg Drag Guard",
      "fr": "Rolling Back Take from the Leg Drag Guard"
    },
    "channelName": "Open Guard",
    "url": "https://www.youtube.com/watch?v=RCBRlcFORIw",
    "embedUrl": "https://www.youtube.com/embed/RCBRlcFORIw",
    "youtubeId": "RCBRlcFORIw",
    "language": "en",
    "relatedSkillIds": [
      "leg-drag-pass",
      "crab-ride",
      "wrist-ride-back-exposure"
    ],
    "relatedPositionIds": [
      "seated-guard",
      "back-control-position"
    ],
    "techniqueTags": [
      "no-gi",
      "leg-drag",
      "rolling-back-take",
      "crab-ride"
    ],
    "relevance": "supplemental",
    "level": "advanced",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "lachlan-single-leg-x-linking-attacks",
    "provider": "youtube",
    "title": {
      "en": "Linking attacks from Single Leg X guard",
      "vi": "Linking attacks from Single Leg X guard",
      "fr": "Linking attacks from Single Leg X guard"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=SIe3OnvXGz4",
    "embedUrl": "https://www.youtube.com/embed/SIe3OnvXGz4",
    "youtubeId": "SIe3OnvXGz4",
    "language": "en",
    "relatedSkillIds": [
      "single-leg-x-basics",
      "single-leg-x-control",
      "x-guard-control"
    ],
    "relatedPositionIds": [
      "single-leg-x",
      "x-guard-position"
    ],
    "techniqueTags": [
      "no-gi",
      "single-leg-x",
      "x-guard-position",
      "leg-lock"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion.",
    "caution": {
      "en": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early.",
      "vi": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early.",
      "fr": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early."
    }
  },
  {
    "id": "craig-underhook-dlr-single-leg-x",
    "provider": "youtube",
    "title": {
      "en": "Underhook De La Riva To Single Leg X by Craig Jones",
      "vi": "Underhook De La Riva To Single Leg X by Craig Jones",
      "fr": "Underhook De La Riva To Single Leg X by Craig Jones"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=AjzkgEu56iM",
    "embedUrl": "https://www.youtube.com/embed/AjzkgEu56iM",
    "youtubeId": "AjzkgEu56iM",
    "language": "en",
    "relatedSkillIds": [
      "de-la-riva-sweeps",
      "reverse-de-la-riva-transitions",
      "single-leg-x-control",
      "shin-to-shin-entry"
    ],
    "relatedPositionIds": [
      "de-la-riva-guard",
      "single-leg-x"
    ],
    "techniqueTags": [
      "no-gi",
      "underhook-dlr",
      "single-leg-x",
      "seated-guard-retention"
    ],
    "relevance": "supplemental",
    "level": "intermediate",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion.",
    "caution": {
      "en": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early.",
      "vi": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early.",
      "fr": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early."
    }
  },
  {
    "id": "gordon-ashi-x-retention-principles",
    "provider": "youtube",
    "title": {
      "en": "ASHI X GUARD RETENTION PRINCIPLES 1 by Gordon Ryan",
      "vi": "ASHI X GUARD RETENTION PRINCIPLES 1 by Gordon Ryan",
      "fr": "ASHI X GUARD RETENTION PRINCIPLES 1 by Gordon Ryan"
    },
    "channelName": "Gordon Ryan",
    "url": "https://www.youtube.com/watch?v=4Gu-saCVaIw",
    "embedUrl": "https://www.youtube.com/embed/4Gu-saCVaIw",
    "youtubeId": "4Gu-saCVaIw",
    "language": "en",
    "relatedSkillIds": [
      "x-guard-control",
      "single-leg-x-control",
      "supine-guard-retention"
    ],
    "relatedPositionIds": [
      "x-guard-position",
      "single-leg-x"
    ],
    "techniqueTags": [
      "no-gi",
      "ashi-x",
      "x-guard-position",
      "guard-retention"
    ],
    "relevance": "conceptual",
    "level": "advanced",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion.",
    "caution": {
      "en": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early.",
      "vi": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early.",
      "fr": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early."
    }
  },
  {
    "id": "john-danaher-tight-waist-x-guard",
    "provider": "youtube",
    "title": {
      "en": "Tight Waist To X Guard by John Danaher",
      "vi": "Tight Waist To X Guard by John Danaher",
      "fr": "Tight Waist To X Guard by John Danaher"
    },
    "channelName": "John Danaher",
    "url": "https://www.youtube.com/watch?v=XLY_1lLv6F4",
    "embedUrl": "https://www.youtube.com/embed/XLY_1lLv6F4",
    "youtubeId": "XLY_1lLv6F4",
    "language": "en",
    "relatedSkillIds": [
      "x-guard-control",
      "inside-position",
      "half-guard-wrestle-up"
    ],
    "relatedPositionIds": [
      "x-guard-position",
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "no-gi",
      "x-guard-position",
      "tight-waist",
      "wrestle-up"
    ],
    "relevance": "supplemental",
    "level": "intermediate",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "brian-glick-hip-heist",
    "provider": "youtube",
    "title": {
      "en": "Hip Heist by Brian Glick",
      "vi": "Hip Heist by Brian Glick",
      "fr": "Hip Heist by Brian Glick"
    },
    "channelName": "Brian Glick",
    "url": "https://www.youtube.com/watch?v=TTGvc28I2II",
    "embedUrl": "https://www.youtube.com/embed/TTGvc28I2II",
    "youtubeId": "TTGvc28I2II",
    "language": "en",
    "relatedSkillIds": [
      "hip-heist-wrestle-up",
      "technical-stand-up",
      "half-guard-wrestle-up"
    ],
    "relatedPositionIds": [
      "half-guard-bottom",
      "seated-guard"
    ],
    "techniqueTags": [
      "no-gi",
      "hip-heist",
      "wrestle-up",
      "technical-stand-up"
    ],
    "relevance": "primary_reference",
    "level": "beginner",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "firas-snapdown-into-shuck",
    "provider": "youtube",
    "title": {
      "en": "Snapdown into Shuck by Firas Zahabi",
      "vi": "Snapdown into Shuck by Firas Zahabi",
      "fr": "Snapdown into Shuck by Firas Zahabi"
    },
    "channelName": "Firas Zahabi",
    "url": "https://www.youtube.com/watch?v=1BOMVs_NJIk",
    "embedUrl": "https://www.youtube.com/embed/1BOMVs_NJIk",
    "youtubeId": "1BOMVs_NJIk",
    "language": "en",
    "relatedSkillIds": [
      "snapdown-front-headlock",
      "fhl-go-behind",
      "front-headlock-defense"
    ],
    "relatedPositionIds": [
      "front-headlock-top",
      "neutral-standing"
    ],
    "techniqueTags": [
      "no-gi",
      "snapdown",
      "front-headlock",
      "go-behind"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion.",
    "caution": {
      "en": "Neck and airway pressure can escalate fast. Apply gradually and release immediately on tap or discomfort.",
      "vi": "Neck and airway pressure can escalate fast. Apply gradually and release immediately on tap or discomfort.",
      "fr": "Neck and airway pressure can escalate fast. Apply gradually and release immediately on tap or discomfort."
    }
  },
  {
    "id": "giancarlo-armdrag-snapdown",
    "provider": "youtube",
    "title": {
      "en": "ARMDRAG To SNAPDOWN by Giancarlo Bodoni",
      "vi": "ARMDRAG To SNAPDOWN by Giancarlo Bodoni",
      "fr": "ARMDRAG To SNAPDOWN by Giancarlo Bodoni"
    },
    "channelName": "Giancarlo Bodoni",
    "url": "https://www.youtube.com/watch?v=ld4YuQqHxgw",
    "embedUrl": "https://www.youtube.com/embed/ld4YuQqHxgw",
    "youtubeId": "ld4YuQqHxgw",
    "language": "en",
    "relatedSkillIds": [
      "snapdown-front-headlock",
      "hand-fighting",
      "single-leg-bjj"
    ],
    "relatedPositionIds": [
      "neutral-standing"
    ],
    "techniqueTags": [
      "no-gi",
      "armdrag",
      "snapdown",
      "hand-fighting"
    ],
    "relevance": "supplemental",
    "level": "intermediate",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "firas-snapdown-vs-kneeling",
    "provider": "youtube",
    "title": {
      "en": "Snapdown vs Kneeling by Firas Zahabi",
      "vi": "Snapdown vs Kneeling by Firas Zahabi",
      "fr": "Snapdown vs Kneeling by Firas Zahabi"
    },
    "channelName": "Firas Zahabi",
    "url": "https://www.youtube.com/watch?v=URYZHOJwNN8",
    "embedUrl": "https://www.youtube.com/embed/URYZHOJwNN8",
    "youtubeId": "URYZHOJwNN8",
    "language": "en",
    "relatedSkillIds": [
      "snapdown-front-headlock",
      "sprawl-go-behind",
      "fhl-go-behind"
    ],
    "relatedPositionIds": [
      "front-headlock-top",
      "turtle-bottom"
    ],
    "techniqueTags": [
      "no-gi",
      "snapdown",
      "front-headlock",
      "go-behind"
    ],
    "relevance": "supplemental",
    "level": "beginner",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion.",
    "caution": {
      "en": "Neck and airway pressure can escalate fast. Apply gradually and release immediately on tap or discomfort.",
      "vi": "Neck and airway pressure can escalate fast. Apply gradually and release immediately on tap or discomfort.",
      "fr": "Neck and airway pressure can escalate fast. Apply gradually and release immediately on tap or discomfort."
    }
  },
  {
    "id": "heath-pedigo-dogfight-win",
    "provider": "youtube",
    "title": {
      "en": "How to WIN the Dogfight by Heath Pedigo",
      "vi": "How to WIN the Dogfight by Heath Pedigo",
      "fr": "How to WIN the Dogfight by Heath Pedigo"
    },
    "channelName": "Heath Pedigo",
    "url": "https://www.youtube.com/watch?v=05zlhBWAIrM",
    "embedUrl": "https://www.youtube.com/embed/05zlhBWAIrM",
    "youtubeId": "05zlhBWAIrM",
    "language": "en",
    "relatedSkillIds": [
      "dogfight-knee-tap",
      "half-guard-wrestle-up",
      "single-leg-bjj"
    ],
    "relatedPositionIds": [
      "half-guard-bottom",
      "dogfight"
    ],
    "techniqueTags": [
      "no-gi",
      "dogfight",
      "knee-tap",
      "wrestle-up"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "vi": "Useful No-Gi public YouTube reference for this NoGiMind skill.",
      "fr": "Useful No-Gi public YouTube reference for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion.",
    "caution": {
      "en": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early.",
      "vi": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early.",
      "fr": "Leg entanglements can injure knees quickly. Drill slowly, communicate clearly, and tap early."
    }
  },
  {
    "id": "danaher-back-escape",
    "provider": "youtube",
    "title": {
      "en": "Back Escape by John Danaher",
      "vi": "Back Escape by John Danaher",
      "fr": "Back Escape by John Danaher"
    },
    "channelName": "John Danaher",
    "url": "https://www.youtube.com/watch?v=tu3F0O5WL64",
    "embedUrl": "https://www.youtube.com/embed/tu3F0O5WL64",
    "youtubeId": "tu3F0O5WL64",
    "language": "en",
    "relatedSkillIds": [
      "back-escape",
      "back-survival"
    ],
    "relatedPositionIds": [
      "back-control-position"
    ],
    "techniqueTags": [
      "no-gi",
      "back-escape",
      "survival"
    ],
    "relevance": "primary_reference",
    "level": "intermediate",
    "whyUseful": {
      "en": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "vi": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "fr": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "volkanovski-craig-back-escape",
    "provider": "youtube",
    "title": {
      "en": "Alexander Volkanovski and Craig Jones Teach the Back Escape Technique",
      "vi": "Alexander Volkanovski and Craig Jones Teach the Back Escape Technique",
      "fr": "Alexander Volkanovski and Craig Jones Teach the Back Escape Technique"
    },
    "channelName": "Turtle",
    "url": "https://www.youtube.com/watch?v=uT-7lJxykCg",
    "embedUrl": "https://www.youtube.com/embed/uT-7lJxykCg",
    "youtubeId": "uT-7lJxykCg",
    "language": "en",
    "relatedSkillIds": [
      "back-escape",
      "scramble-control"
    ],
    "relatedPositionIds": [
      "back-control-position",
      "turtle-bottom"
    ],
    "techniqueTags": [
      "no-gi",
      "back-escape",
      "mma",
      "scramble"
    ],
    "relevance": "supplemental",
    "level": "intermediate",
    "whyUseful": {
      "en": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "vi": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "fr": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "lachlan-inverted-guard-retention",
    "provider": "youtube",
    "title": {
      "en": "Inverted Guard Retention by Lachlan Giles",
      "vi": "Inverted Guard Retention by Lachlan Giles",
      "fr": "Inverted Guard Retention by Lachlan Giles"
    },
    "channelName": "Lachlan Giles",
    "url": "https://www.youtube.com/watch?v=lY8JZMAm1N4",
    "embedUrl": "https://www.youtube.com/embed/lY8JZMAm1N4",
    "youtubeId": "lY8JZMAm1N4",
    "language": "en",
    "relatedSkillIds": [
      "inverted-guard-control",
      "supine-guard-retention"
    ],
    "relatedPositionIds": [
      "seated-guard"
    ],
    "techniqueTags": [
      "no-gi",
      "inverted-guard",
      "guard-retention"
    ],
    "relevance": "primary_reference",
    "level": "advanced",
    "whyUseful": {
      "en": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "vi": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "fr": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "z-guard-easiest-sweep",
    "provider": "youtube",
    "title": {
      "en": "Easiest Z guard sweep",
      "vi": "Easiest Z guard sweep",
      "fr": "Easiest Z guard sweep"
    },
    "channelName": "Z Guard",
    "url": "https://www.youtube.com/watch?v=jrJ9dCXv1_I",
    "embedUrl": "https://www.youtube.com/embed/jrJ9dCXv1_I",
    "youtubeId": "jrJ9dCXv1_I",
    "language": "en",
    "relatedSkillIds": [
      "z-guard-sweeps",
      "half-guard-wrestle-up"
    ],
    "relatedPositionIds": [
      "z-guard",
      "half-guard-bottom"
    ],
    "techniqueTags": [
      "no-gi",
      "z-guard",
      "sweep"
    ],
    "relevance": "supplemental",
    "level": "intermediate",
    "whyUseful": {
      "en": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "vi": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "fr": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "closed-guard-sweeps-three",
    "provider": "youtube",
    "title": {
      "en": "3 closed guard sweeps",
      "vi": "3 closed guard sweeps",
      "fr": "3 closed guard sweeps"
    },
    "channelName": "Closed Guard",
    "url": "https://www.youtube.com/watch?v=nJ3FLY0PbVs",
    "embedUrl": "https://www.youtube.com/embed/nJ3FLY0PbVs",
    "youtubeId": "nJ3FLY0PbVs",
    "language": "en",
    "relatedSkillIds": [
      "closed-guard-sweeps",
      "closed-guard-posture-control"
    ],
    "relatedPositionIds": [
      "closed-guard"
    ],
    "techniqueTags": [
      "no-gi",
      "closed-guard",
      "sweep"
    ],
    "relevance": "supplemental",
    "level": "beginner",
    "whyUseful": {
      "en": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "vi": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "fr": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "closed-guard-posture-break-sweep",
    "provider": "youtube",
    "title": {
      "en": "Easy closed guard sweep after you broke down their posture",
      "vi": "Easy closed guard sweep after you broke down their posture",
      "fr": "Easy closed guard sweep after you broke down their posture"
    },
    "channelName": "Closed Guard",
    "url": "https://www.youtube.com/watch?v=bvlwDCP7y8M",
    "embedUrl": "https://www.youtube.com/embed/bvlwDCP7y8M",
    "youtubeId": "bvlwDCP7y8M",
    "language": "en",
    "relatedSkillIds": [
      "closed-guard-posture-control",
      "closed-guard-sweeps"
    ],
    "relatedPositionIds": [
      "closed-guard"
    ],
    "techniqueTags": [
      "no-gi",
      "closed-guard",
      "posture-control",
      "sweep"
    ],
    "relevance": "supplemental",
    "level": "beginner",
    "whyUseful": {
      "en": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "vi": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "fr": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "craig-hit-em-with-the-hips",
    "provider": "youtube",
    "title": {
      "en": "Hit Em With The Hips by Craig Jones",
      "vi": "Hit Em With The Hips by Craig Jones",
      "fr": "Hit Em With The Hips by Craig Jones"
    },
    "channelName": "Craig Jones",
    "url": "https://www.youtube.com/watch?v=Gcvqd298-Xk",
    "embedUrl": "https://www.youtube.com/embed/Gcvqd298-Xk",
    "youtubeId": "Gcvqd298-Xk",
    "language": "en",
    "relatedSkillIds": [
      "scramble-control",
      "sprawl-go-behind",
      "failure-response-transitions"
    ],
    "relatedPositionIds": [
      "neutral-standing",
      "front-headlock-top"
    ],
    "techniqueTags": [
      "no-gi",
      "scramble",
      "wrestling",
      "hips"
    ],
    "relevance": "supplemental",
    "level": "intermediate",
    "whyUseful": {
      "en": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "vi": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "fr": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "s-mount-frame-armbar-control",
    "provider": "youtube",
    "title": {
      "en": "S Mount Frame Escape by Andre Galvao",
      "vi": "S Mount Frame Escape by Andre Galvao",
      "fr": "S Mount Frame Escape by Andre Galvao"
    },
    "channelName": "Andre Galvao",
    "url": "https://www.youtube.com/watch?v=iPcKmTSrjSw",
    "embedUrl": "https://www.youtube.com/embed/iPcKmTSrjSw",
    "youtubeId": "iPcKmTSrjSw",
    "language": "en",
    "relatedSkillIds": [
      "s-mount-armbar",
      "mount-control"
    ],
    "relatedPositionIds": [
      "mount-top"
    ],
    "techniqueTags": [
      "no-gi",
      "s-mount",
      "armbar",
      "mount"
    ],
    "relevance": "supplemental",
    "level": "intermediate",
    "whyUseful": {
      "en": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "vi": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "fr": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "tarikoplata-no-gi-reference",
    "provider": "youtube",
    "title": {
      "en": "Tarikoplata: The Most SAVAGE Shoulder Lock | Tarik Hopstock",
      "vi": "Tarikoplata: The Most SAVAGE Shoulder Lock | Tarik Hopstock",
      "fr": "Tarikoplata: The Most SAVAGE Shoulder Lock | Tarik Hopstock"
    },
    "channelName": "Tarik Hopstock",
    "url": "https://www.youtube.com/watch?v=DN8j2Fq8svk",
    "embedUrl": "https://www.youtube.com/embed/DN8j2Fq8svk",
    "youtubeId": "DN8j2Fq8svk",
    "language": "en",
    "relatedSkillIds": [
      "tarikoplata",
      "kimura-system"
    ],
    "relatedPositionIds": [
      "side-control-top",
      "closed-guard"
    ],
    "techniqueTags": [
      "no-gi",
      "tarikoplata",
      "kimura"
    ],
    "relevance": "supplemental",
    "level": "advanced",
    "whyUseful": {
      "en": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "vi": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "fr": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  {
    "id": "de-la-riva-back-take-leg-drag",
    "provider": "youtube",
    "title": {
      "en": "Reverse De La Riva to LEG DRAG & TRUCK",
      "vi": "Reverse De La Riva to LEG DRAG & TRUCK",
      "fr": "Reverse De La Riva to LEG DRAG & TRUCK"
    },
    "channelName": "De La Riva Guard",
    "url": "https://www.youtube.com/watch?v=AHEjvNvTiY8",
    "embedUrl": "https://www.youtube.com/embed/AHEjvNvTiY8",
    "youtubeId": "AHEjvNvTiY8",
    "language": "en",
    "relatedSkillIds": [
      "de-la-riva-back-take",
      "reverse-de-la-riva-transitions",
      "leg-drag-pass"
    ],
    "relatedPositionIds": [
      "de-la-riva-guard",
      "back-control-position"
    ],
    "techniqueTags": [
      "no-gi",
      "de-la-riva",
      "back-take",
      "leg-drag"
    ],
    "relevance": "supplemental",
    "level": "advanced",
    "whyUseful": {
      "en": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "vi": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill.",
      "fr": "Public No-Gi YouTube reference selected to improve coverage for this NoGiMind skill."
    },
    "whatToWatchFor": {
      "en": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "vi": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ],
      "fr": [
        "Connection before force",
        "Body position and angle",
        "Transition timing",
        "Safe controlled finish"
      ]
    },
    "sourceNote": "Public YouTube No-Gi reference selected for NoGiMind coverage expansion."
  },
  ...newTrustedVideos
]
