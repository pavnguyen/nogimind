#!/usr/bin/env python3
"""Translate content.vi.json and content.fr.json for 12 new skills."""
import json, os

SKILLS_DIR = 'content/skills'

# ============================================================
# FRENCH TRANSLATIONS
# ============================================================
translations_fr = {
    # 1. LATERAL DROP / HEADLOCK THROW
    'lateral-drop-headlock-throw': {
        'shortInstruction': 'Attrapez la tête/overhook, avancez le pied à l\'intérieur de leur ligne de jambes, abaissez les hanches sous les leurs, pivotez les épaules et retombez en mount ou side control.',
        'summary': 'La projection latérale utilise vos hanches comme point d\'appui pour faire basculer l\'adversaire par-dessus vous depuis une clé de tête. La clé du BJJ est de rester sur vos pieds pour retomber en position dominante plutôt que de les suivre au sol.',
        'whyItWorks': [
            'La clé de tête contrôle leur posture et les empêche de s\'appuyer ou de reculer',
            'Vos hanches placées devant les leurs créent un pivot de rotation — ils doivent pivoter par-dessus vous',
            'Plier les genoux et abaisser les hanches sous les leurs charge leur poids sur votre hanche — la projection devient facile',
            'Retomber au-dessus vous donne une position immédiate — vous ne sacrifiez pas la position pour la projection'
        ],
        'commonMistakes': [
            'Se pencher à la taille au lieu d\'abaisser les hanches — cela fatigue le dos et manque de levier',
            'Ne pas avancer le pied à l\'intérieur de leur ligne de jambes — sans position intérieure, la projection échoue',
            'Les suivre au sol au lieu de rester au-dessus — cela perd l\'avantage positionnel',
            'Garder la clé de tête trop longtemps après la projection — relâchez et passez à la position suivante'
        ],
        'coachingCues': [
            'Hanches sous les leurs, pas de flexion du buste',
            'Pied à l\'intérieur, clé serrée, abaissez et pivotez',
            'Restez debout — ils tombent, vous restez',
            'S\'ils s\'appuient, passez en double leg'
        ],
        'safetySummary': [
            'Abaisser les hanches trop brusquement peut fatiguer le bas du dos — utilisez une descente contrôlée',
            'Assurez-vous que votre tête est à l\'extérieur de leur corps pour éviter de retomber sur votre cou',
            'Ne gardez pas la clé de tête quand ils tombent — relâchez pour éviter de retomber sur votre tête ou épaule'
        ],
        'keyCorrections': [
            'S\'ils bloquent avec le bras éloigné : relâchez la tête et passez en double leg',
            'S\'ils reculent hors de la clé : contournez en front headlock et snapdown',
            'S\'ils s\'abaissent pour contrer : tirez-les dans votre guard et attaquez depuis le bas'
        ],
        'systemLogic': {
            'corePrinciple': 'Lateral drop : attrapez la tête/overhook → avancez le pied à l\'intérieur → abaissez les hanches sous les leurs (pliez les genoux, pas le buste) → pivotez les épaules → ils basculent par-dessus vos hanches → retombez en mount ou side control.',
            'decisionTree': [
                {'condition': 'Ils s\'appuient sur le bras éloigné pour bloquer', 'action': 'relâchez la tête et passez en double leg'},
                {'condition': 'Ils reculent hors de la clé de tête', 'action': 'contournez en front headlock et snapdown'},
                {'condition': 'Ils s\'abaissent pour contrer', 'action': 'tirez-les dans votre guard et attaquez depuis le bas'}
            ],
            'exitStrategies': [
                'Si la projection échoue et que vous êtes dessous, récupérez la guarde',
                'Si vous retombez dans leur guarde après la tentative, levez-vous et passez'
            ]
        },
        'moneyDetails': [
            'La projection latérale est l\'un des takedowns les plus efficaces depuis une clé de tête en no-gi',
            'Maîtriser la finition debout est ce qui distingue la projection latérale BJJ de celle de la lutte',
            'La projection latérale est particulièrement efficace contre les adversaires qui se jettent en avant tête baissée'
        ],
        'fixItFast': [
            'S\'ils s\'appuient sur le bras éloigné : relâchez et passez immédiatement en single leg',
            'S\'ils s\'affaissent (sprawl) : vous êtes trop lent — reset et préparez la clé avec plus de contrôle',
            'S\'ils tirent la guarde pendant la projection : restez debout et passez au lieu de les suivre'
        ]
    },

    # 2. BERIMBOLO / INVERSION BACK TAKE
    'berimbolo-back-take': {
        'shortInstruction': 'Accrochez DLR/RDLR, l\'adversaire avance, inversez par-dessus votre épaule éloignée, tirez leur hanche éloignée à travers la roulade, et retombez derrière eux en back control.',
        'summary': 'La prise de dos par berimbolo utilise une inversion (roulade par-dessus l\'épaule) pour passer de dessous l\'adversaire à derrière lui. Déclenchée quand l\'adversaire avance, vous roulez par-dessus l\'épaule, tirez la hanche éloignée et retombez en back control.',
        'whyItWorks': [
            'L\'inversion sous eux quand ils avancent inverse la relation intérieur/extérieur — vous passez de l\'intérieur de leur guarde à l\'extérieur de leur dos',
            'L\'accrochage de la hanche éloignée les empêche de vous suivre à travers l\'inversion',
            'Leur pas en avant est le déclencheur — s\'ils avancent, le berimbolo est disponible',
            'L\'inversion utilise leur élan contre eux — aucune force requise'
        ],
        'commonMistakes': [
            'Inverser par-dessus le sommet de la tête au lieu de l\'épaule — dangereux pour le cou',
            'Lâcher l\'accroche de jambe pendant l\'inversion — vous perdez la connexion et ils s\'éloignent',
            'Ne pas tirer la hanche éloignée pendant la roulade — la traction est ce qui fait pivoter votre corps à travers',
            'S\'arrêter en position truck au lieu de continuer jusqu\'au back control — il faut terminer la prise de dos'
        ],
        'coachingCues': [
            'Roulade sur l\'épaule, pas sur la tête',
            'Ils avancent = votre fenêtre',
            'Tirez la hanche éloignée — ça vous fait pivoter',
            'Ne vous arrêtez pas au truck — finissez en back control'
        ],
        'safetySummary': [
            'Inverser par-dessus le sommet de la tête peut blesser la colonne cervicale — roulez toujours sur l\'épaule',
            'Si vous sentez une pression sur le cou pendant l\'inversion, abandonnez immédiatement',
            'Pratiquez le berimbolo sur des tapis souples avec un partenaire coopératif avant de l\'utiliser en combat'
        ],
        'keyCorrections': [
            'S\'ils n\'avancent pas : le berimbolo n\'est pas disponible — restez en DLR/RDLR et sweep plutôt',
            'S\'ils reculent pour éviter l\'inversion : lâchez l\'accroche DLR et entrez en K-guard',
            'S\'ils vous suivent à travers l\'inversion : ils défendent correctement — rentrez en guarde et réessayez'
        ],
        'systemLogic': {
            'corePrinciple': 'Berimbolo back take : guarde DLR ou RDLR → l\'adversaire avance (déclencheur) → inversez par-dessus l\'épaule éloignée → tirez leur hanche éloignée à travers la roulade → retombez derrière eux → remplacez l\'accroche par le back control.',
            'decisionTree': [
                {'condition': 'Ils n\'avancent pas', 'action': 'le berimbolo n\'est pas disponible — restez en DLR/RDLR et sweep plutôt'},
                {'condition': 'Ils reculent pour éviter l\'inversion', 'action': 'lâchez l\'accroche DLR et entrez en K-guard'},
                {'condition': 'Ils vous suivent à travers l\'inversion', 'action': 'ils défendent correctement — rentrez en guarde et réessayez'}
            ],
            'exitStrategies': [
                'Si vous ne pouvez pas finir la prise de dos, rentrez en guarde et reset',
                'S\'ils vous aplatisent pendant la roulade, protégez votre cou et récupérez la guarde'
            ]
        },
        'moneyDetails': [
            'Le berimbolo a révolutionné le jeu de guarde BJJ moderne en introduisant les prises de dos par inversion',
            'Maîtriser le berimbolo vous donne une entrée fiable en back control depuis la guarde sans force',
            'Le berimbolo est particulièrement efficace contre les adversaires qui appuient vers l\'avant avec leur poids'
        ],
        'fixItFast': [
            'S\'ils s\'appuient sur une main pour bloquer la prise de dos : attaquez ce bras avec une kimura ou un armbar',
            'S\'ils reculent : relâchez et passez en K-guard entry',
            'Si vous calez au milieu de la roulade : tirez leur hanche plus fort — la traction manuelle est le moteur de l\'inversion'
        ]
    },

    # 3. K-GUARD TO OUTSIDE ASHI
    'k-guard-to-outside-ashi': {
        'shortInstruction': 'Depuis le K-guard, quand ils reculent, relâchez l\'accroche extérieure et passez la jambe à l\'intérieur de leur jambe éloignée. Ré-entrez en outside ashi avec exposition du talon.',
        'summary': 'La transition K-guard vers outside ashi passe d\'une position de guarde à un enchevêtrement de jambes en relâchant l\'accroche K-guard et en pompant directement dans l\'outside ashi. La transition est plus rapide que l\'adversaire ne peut défendre car vous êtes déjà sous eux avec une jambe enchevêtrée.',
        'whyItWorks': [
            'Le K-guard a déjà vos hanches sous les leurs et votre jambe enchevêtrée — vous êtes déjà à 50% dans le leg lock',
            'Relâcher l\'accroche K-guard et rentrer en outside ashi est un seul mouvement — ils ne peuvent pas défendre deux positions en séquence',
            'L\'outside ashi vous donne une exposition du talon sur la jambe éloignée tout en protégeant votre propre ligne de genou',
            'La transition se produit sous leur champ de vision — beaucoup ne reconnaissent pas la menace jusqu\'à ce qu\'il soit trop tard'
        ],
        'commonMistakes': [
            'Perdre le K-guard avant d\'établir l\'outside ashi — il y a un trou entre les deux où vous êtes vulnérable',
            'Les laisser dégager leur genou éloigné pendant la transition — il faut garder la jambe éloignée piégée',
            'Aller trop tôt en saddle — finissez depuis l\'outside ashi d\'abord ; le saddle est l\'option de secours',
            'Ne pas contrôler leur main proche — ils peuvent s\'appuyer sur votre tête ou décoller l\'enchevêtrement'
        ],
        'coachingCues': [
            'L\'accroche K-guard tire, la jambe outside ashi pompe — deux mouvements qui n\'en font qu\'un',
            'Gardez la jambe éloignée piégée pendant la transition — perdez-la, perdez l\'entrée',
            'Finissez depuis l\'outside ashi avant d\'envisager le saddle',
            'Contrôlez la main proche — s\'ils s\'appuient sur votre tête, l\'enchevêtrement échoue'
        ],
        'safetySummary': [
            'Cette transition implique des enchevêtrements de jambes — assurez-vous de connaître les positions de sécurité avant de pratiquer',
            'N\'appliquez pas de pression de heel hook pendant le drill — pratiquez la transition avec un mouvement contrôlé seulement',
            'Si vous perdez l\'enchevêtrement, récupérez immédiatement la guarde plutôt que de lutter pour le heel hook'
        ],
        'keyCorrections': [
            'S\'ils reculent pour dégager le K-guard : pompez la jambe en outside ashi',
            'S\'ils avancent pour faire pression : restez en K-guard et sweep plutôt',
            'S\'ils s\'appuient sur votre tête pour bloquer : pompez leur bras ou passez en omoplata'
        ],
        'systemLogic': {
            'corePrinciple': 'K-guard to outside ashi : établissez le K-guard → l\'adversaire recule (déclencheur) → relâchez l\'accroche K-guard → pompez votre jambe à l\'intérieur de leur jambe éloignée → rentrez en outside ashi → exposez le talon.',
            'decisionTree': [
                {'condition': 'Ils reculent pour dégager le K-guard', 'action': 'pompez la jambe en outside ashi'},
                {'condition': 'Ils avancent pour faire pression', 'action': 'restez en K-guard et sweep plutôt'},
                {'condition': 'Ils s\'appuient sur votre tête pour bloquer', 'action': 'pompez leur bras ou passez en omoplata'}
            ],
            'exitStrategies': [
                'S\'ils libèrent leur jambe éloignée, rentrez en K-guard ou récupérez la guarde',
                'Si vous perdez l\'enchevêtrement, ne le poursuivez pas — reset en full guarde'
            ]
        },
        'moneyDetails': [
            'Le K-guard vers outside ashi est la principale entrée en leg lock utilisée par les compétiteurs no-gi d\'élite au niveau ADCC',
            'Maîtriser cette transition vous donne un chemin direct de la guarde au heel hook qui contourne de nombreuses défenses courantes',
            'Le K-guard est l\'une des positions de guarde les plus sûres pour entrer dans les leg locks car vos hanches sont sous les leurs'
        ],
        'fixItFast': [
            'S\'ils libèrent leur jambe éloignée : vous avez perdu la position — rentrez en K-guard ou récupérez la guarde',
            'S\'ils s\'appuient sur votre tête : pompez le bras et rétablissez l\'enchevêtrement',
            'S\'ils reculent mais vous ratez l\'entrée outside ashi : récupérez la full guarde et réessayez depuis le K-guard'
        ]
    },

    # 4. INSIDE & OUTSIDE HEEL HOOK
    'inside-outside-heel-hook': {
        'shortInstruction': 'Établissez l\'enchevêtrement de jambes, dégagez la ligne de genou, sécurisez le boot grip, pivotez les hanches dans la direction de finition, trayez le mollet avec votre tibia, finissez par rotation pas par compression.',
        'summary': 'Le heel hook se finit en faisant pivoter le pied par rapport au genou en utilisant la rotation des hanches plutôt que la force des bras. L\'inside heel hook tourne le pied vers l\'extérieur ; l\'outside heel hook tourne le pied vers l\'intérieur. Les deux nécessitent le contrôle de la ligne de genou, le boot grip et la compression du mollet.',
        'whyItWorks': [
            'Le heel hook attaque le genou dans son plan de rotation le plus faible — le genou NE tourne PAS latéralement',
            'La rotation des hanches génère le couple (pas la traction des bras) — vos hanches sont plus fortes que vos bras',
            'Le boot grip (tibia piégeant le talon) vous donne un avantage mécanique sur leur pied — vous contrôlez la rotation',
            'Traire le mollet crée la finition sans force explosive — c\'est une compression + rotation, pas une secousse'
        ],
        'commonMistakes': [
            'Serrer le heel hook avant d\'établir le contrôle de la ligne de genou — vous ne finirez pas et risquez de perdre l\'enchevêtrement',
            'Tirer avec les bras au lieu de pivoter les hanches — cela fatigue les bras et manque de puissance',
            'Ne pas « traire le mollet » — une bonne compression du mollet crée la finition, pas la torsion du pied seule',
            'Les laisser cacher leur talon dans votre aisselle — cela neutralise la rotation'
        ],
        'coachingCues': [
            'Ligne de genou d\'abord, puis le boot, puis la rotation',
            'Pivotez les hanches, ne tirez pas le pied',
            'Trairez le mollet — la compression est la finition',
            'Si le talon disparaît, vous avez perdu l\'angle'
        ],
        'safetySummary': [
            'Les heel hooks peuvent causer de graves blessures au genou (rupture LCA, LCP, LLE, LCM) — appliquez lentement et relâchez au premier signe de résistance',
            'Ne forcez jamais un heel hook à l\'entraînement — la blessure peut ne pas être immédiatement ressentie par l\'adversaire',
            'Tapez tôt sur les heel hooks — ils causent des blessures avant que la douleur ne soit ressentie',
            'Pratiquez les heel hooks uniquement avec des partenaires de confiance qui comprennent les risques'
        ],
        'keyCorrections': [
            'Inside heel hook : pivotez les hanches vers leur pied (le pied tourne vers l\'extérieur)',
            'Outside heel hook : pivotez les hanches loin de leur pied (le pied tourne vers l\'intérieur)',
            'S\'ils cachent leur talon : rétablissez le boot grip en faisant levier avec votre avant-bras'
        ],
        'systemLogic': {
            'corePrinciple': 'Heel hook : établissez l\'enchevêtrement → dégagez la ligne de genou → sécurisez le boot grip → pivotez les hanches dans la direction de finition → trayez le mollet avec votre tibia → finissez par rotation, pas par compression.',
            'decisionTree': [
                {'condition': 'Inside heel hook', 'action': 'pivotez les hanches vers leur pied (pied vers l\'extérieur) — cible LCL/MCL'},
                {'condition': 'Outside heel hook', 'action': 'pivotez les hanches loin de leur pied (pied vers l\'intérieur) — cible ACL/PCL'},
                {'condition': 'Ils cachent leur talon', 'action': 'rétablissez le boot grip en faisant levier avec l\'avant-bras'}
            ],
            'exitStrategies': [
                'S\'ils dégagent la ligne de genou, relâchez l\'enchevêtrement et rentrez depuis la guarde',
                'Si le heel hook échoue, passez en toe hold ou straight ankle lock'
            ]
        },
        'moneyDetails': [
            'Les heel hooks sont la soumission de jambe la plus efficace en no-gi au niveau élite',
            'Comprendre la mécanique inside vs outside heel hook est essentiel pour un leg locking sûr et efficace',
            'Le boot grip et la finition en trayant le mollet doivent être drillés des milliers de fois pour construire une mémoire musculaire sûre'
        ],
        'fixItFast': [
            'Si le talon disparaît : vous avez perdu le contrôle de l\'angle — relâchez et rentrez à nouveau dans l\'enchevêtrement',
            'S\'ils dégagent la ligne de genou : abandonnez l\'attaque — vous ne pouvez pas finir sans contrôle de la ligne de genou',
            'Si vous ne pouvez pas obtenir le boot grip : passez à un toe hold ou straight ankle lock à la place'
        ]
    },

    # 5. TOE HOLD / ESTIMA LOCK
    'toe-hold-system': {
        'shortInstruction': 'Contrôlez le genou, attrapez leur pied (prise traditionnelle ou figure-four), dorsifléchissez les orteils vers le tibia et pivotez en utilisant la rotation du corps.',
        'summary': 'Le toe hold hyperétend les ligaments de la cheville en combinant dorsiflexion et rotation. La variante Estima lock offre plus de couple de rotation avec une prise figure-four. Le toe hold est plus efficace quand l\'adversaire est à plat ventre et que le genou est immobilisé.',
        'whyItWorks': [
            'Le toe hold hyperétend les ligaments de la cheville et coince l\'astragale — la cheville a une résistance minimale dans cette direction',
            'La prise figure-four (Estima lock) crée une force de rotation de vos bras ET de la rotation de votre corps — plus de couple',
            'Les toe holds sont disponibles depuis des positions où les heel hooks ne le sont pas (outside ashi, 50/50 et certaines passes de guarde)',
            'Le toe hold est légal dans la plupart des niveaux de ceinture où les heel hooks sont interdits'
        ],
        'commonMistakes': [
            'Attaquer le toe hold avant de contrôler le genou — ils vont pivoter et s\'échapper',
            'Utiliser seulement la force des bras sans rotation du corps — la rotation doit venir de votre tronc',
            'Appliquer le toe hold dans la mauvaise direction — il faut dorsiflexion + rotation, pas plantarflexion',
            'Garder la soumission trop longtemps sans progrès — les toe holds ont une fenêtre étroite avant qu\'ils ne s\'échappent'
        ],
        'coachingCues': [
            'Contrôlez le genou, puis attaquez le pied',
            'Dorsiflexion d\'abord, puis rotation — pas l\'inverse',
            'Adversaire à plat ventre est votre meilleure cible',
            'Prise figure-four, rotation du corps, tap'
        ],
        'safetySummary': [
            'Le toe hold attaque la cheville et peut provoquer des déchirures ligamentaires — appliquez progressivement',
            'Ne forcez pas le toe hold — la blessure peut survenir avant que l\'adversaire ne ressente la douleur',
            'Soyez particulièrement prudent avec les partenaires qui ont des blessures préexistantes à la cheville'
        ],
        'keyCorrections': [
            'Prise traditionnelle : une main sur le talon, une sur les orteils — forces opposées',
            'Estima lock : prise figure-four, attrapez votre propre poignet, cuvettez leur talon',
            'S\'ils tournent pour s\'échapper : vous avez perdu le contrôle du genou — relâchez et rentrez à nouveau'
        ],
        'systemLogic': {
            'corePrinciple': 'Système de toe hold : isolez le pied → contrôlez le genou (bloqué contre votre aisselle) → sécurisez la prise (traditionnelle ou figure-four Estima) → dorsifléchissez le pied → pivotez le pied avec rotation du corps → finition.',
            'decisionTree': [
                {'condition': 'Ils sont à plat ventre', 'action': 'idéal — ils ne peuvent pas tourner pour s\'échapper'},
                {'condition': 'Ils sont sur le dos', 'action': 'sécurisez d\'abord le genou avant d\'attaquer le pied'},
                {'condition': 'Ils tournent pour s\'échapper', 'action': 'vous avez perdu le contrôle du genou — relâchez et rentrez à nouveau dans l\'enchevêtrement'}
            ],
            'exitStrategies': [
                'Si le toe hold échoue, passez au straight ankle lock',
                'S\'ils dégagent le genou, relâchez et rentrez depuis le 50/50'
            ]
        },
        'moneyDetails': [
            'Le toe hold est légal en IBJJF ceinture marron/noire et dans la plupart des divisions no-gi — c\'est une attaque de jambe polyvalente',
            'La variante Estima lock est plus puissante que la prise traditionnelle pour les petits gabarits',
            'Avoir un toe hold fiable vous donne une option d\'attaque de jambe à moindre risque quand les heel hooks sont illégaux'
        ],
        'fixItFast': [
            'Si la prise traditionnelle échoue : passez à l\'Estima lock (figure-four pour plus de rotation)',
            'S\'ils tournent : relâchez et rentrez à nouveau — ne luttez pas pour maintenir la prise',
            'Si vous ne pouvez pas contrôler le genou : le toe hold ne fonctionnera pas — passez à une autre attaque'
        ]
    },

    # 6. CALF SLICER / COMPRESSION LOCKS
    'calf-slicer-system': {
        'shortInstruction': 'Depuis le saddle ou 50/50, placez votre tibia en travers du ventre de leur mollet, piégez leur pied, serrez vos talons l\'un vers l\'autre en tirant le pied vers votre poitrine.',
        'summary': 'Le calf slicer comprime le muscle du mollet contre le tibia, créant un verrou musculaire qui ne repose pas sur l\'hyperextension. Il est disponible depuis les enchevêtrements de jambes où les heel hooks sont défendus ou illégaux, et doit être appliqué progressivement pour la sécurité.',
        'whyItWorks': [
            'La compression tibia-contre-mollet crée un verrou musculaire — le muscle du mollet est comprimé contre le tibia et le péroné',
            'Contrairement aux clés articulaires, le calf slicer ne repose pas sur l\'hyperextension — il fonctionne par la douleur et la fatigue musculaire',
            'Les calf slicers sont disponibles depuis des enchevêtrements de jambes où les heel hooks sont défendus ou illégaux',
            'La compression crée un verrou secondaire qui bloque la cheville — le pied ne peut pas s\'échapper'
        ],
        'commonMistakes': [
            'Placer le tibia sur la cheville au lieu du ventre du mollet — la compression de la cheville est plus faible et plus facile à échapper',
            'Ne pas piéger leur pied — si le pied est libre, ils peuvent glisser hors de la compression',
            'Appliquer le slicer sans isolement — ils peuvent tourner si leur hanche est libre',
            'Utiliser une pression explosive — les calf slicers doivent être appliqués progressivement pour la sécurité'
        ],
        'coachingCues': [
            'Tibia sur le ventre du mollet, pas sur la cheville',
            'Piégez le pied, verrouillez la compression',
            'Serrez les talons — plus les talons sont proches, plus la compression est forte',
            'Appliquez lentement — les calf slicers n\'ont pas besoin d\'explosion'
        ],
        'safetySummary': [
            'Les calf slicers attaquent le tissu musculaire — appliquez lentement et relâchez quand l\'adversaire tape',
            'N\'appliquez pas de pression explosive — la compression peut déchirer le muscle',
            'Sachez que les calf slicers peuvent provoquer des crampes et des spasmes musculaires même après la libération'
        ],
        'keyCorrections': [
            'Depuis le saddle : contrôlez la jambe du dessus, amenez le tibia en travers du mollet, serrez les talons',
            'Depuis le 50/50 : enjambez, piégez le pied sous l\'aisselle, poussez le tibia dans le mollet',
            'S\'ils tendent la jambe : relâchez — le calf slicer nécessite un genou plié'
        ],
        'systemLogic': {
            'corePrinciple': 'Calf slicer : entrez depuis un enchevêtrement (saddle ou 50/50) → piégez leur pied contre votre corps → placez votre tibia en travers du ventre de leur mollet → serrez vos talons l\'un vers l\'autre → comprimez le muscle du mollet contre le tibia.',
            'decisionTree': [
                {'condition': 'Ils tendent la jambe', 'action': 'relâchez et rentrez à nouveau dans l\'enchevêtrement — le calf slicer nécessite un genou plié'},
                {'condition': 'Ils tournent pour sortir', 'action': 'vous avez perdu le contrôle de la hanche — rétablissez la guarde ou l\'enchevêtrement'}
            ],
            'exitStrategies': [
                'Si le calf slicer échoue, passez à un heel hook ou ankle lock',
                'Si vous perdez l\'enchevêtrement, récupérez immédiatement la guarde'
            ]
        },
        'moneyDetails': [
            'Les calf slicers sont légaux à tous les niveaux de ceinture en IBJJF et dans la plupart des règlements no-gi',
            'Le calf slicer est particulièrement efficace contre les adversaires plus grands car il ne nécessite pas de force',
            'Avoir un calf slicer fiable vous donne une option de soumission depuis les enchevêtrements de jambes sans les risques du heel hook'
        ],
        'fixItFast': [
            'S\'ils tendent la jambe : relâchez immédiatement et rentrez à nouveau dans l\'enchevêtrement',
            'S\'ils tournent pour sortir : rétablissez la guarde et essayez une autre entrée',
            'Si la compression n\'est pas assez serrée : rapprochez vos talons l\'un de l\'autre'
        ]
    },

    # 7. MOUNTED TRIANGLE / ARMBAR FROM MOUNT
    'mounted-triangle': {
        'shortInstruction': 'Montez en S-mount, piégez leur bras proche avec votre jambe du même côté, passez votre jambe du dessus par-dessus leur tête, rapprochez les talons, serrez les genoux.',
        'summary': 'Le triangle monté est une soumission à haut pourcentage depuis le mount qui utilise la gravité et la pression du dessus pour empêcher l\'adversaire de se redresser ou de stacker. La montée en S-mount est le gardien — ne tentez jamais depuis un mount bas.',
        'whyItWorks': [
            'Depuis le mount, leur bras est déjà comprimé par votre poids — vous n\'avez pas besoin de casser leur posture comme depuis la guarde',
            'La gravité travaille pour vous — votre poids appuie et serre le triangle sans avoir besoin de serrer plus fort',
            'S\'ils défendent le triangle en se redressant, vous attaquez l\'armbar — le dilemme triangle-armbar est plus fort depuis le dessus',
            'Ils ne peuvent pas vous stacker depuis le mount comme ils le feraient depuis la guarde — cela supprime la contre-attaque principale du triangle'
        ],
        'commonMistakes': [
            'Tenter le triangle monté depuis un mount bas — il faut monter en S-mount d\'abord',
            'Ne pas piéger le bras avant d\'enjamber — si le bras est libre, le triangle n\'est pas disponible',
            'Passer la jambe en travers du tibia au lieu de derrière la tête',
            'Serrer les genoux avant de rapprocher les talons — talons d\'abord, puis genoux'
        ],
        'coachingCues': [
            'S-mount d\'abord, triangle ensuite — jamais depuis un mount bas',
            'Piégez le bras avant d\'enjamber — bras libre = pas de triangle',
            'Talons rapprochés, genoux serrés — deux mouvements séparés',
            'Ils se redressent = votre entrée pour l\'armbar'
        ],
        'safetySummary': [
            'Ne tirez pas sur la tête en appliquant le triangle — cela peut fatiguer le cou',
            'Relâchez le triangle immédiatement quand l\'adversaire tape',
            'Attention à ne pas hyperétendre leur coude quand vous passez à l\'armbar'
        ],
        'keyCorrections': [
            'S\'ils essaient de stacker : impossible depuis le mount — finissez le triangle',
            'S\'ils se redressent : passez votre bras sous leur bras qui défend et faites un armbar',
            'S\'ils tournent sur le côté : relâchez le triangle et prenez le dos'
        ],
        'systemLogic': {
            'corePrinciple': 'Triangle monté : depuis le mount → montez en S-mount → piégez leur bras proche → passez votre jambe du dessus par-dessus leur tête (pied derrière la tête) → rapprochez les talons → serrez les genoux → s\'ils se redressent, passez à l\'armbar.',
            'decisionTree': [
                {'condition': 'Ils essaient de stacker', 'action': 'impossible depuis le mount — finissez le triangle'},
                {'condition': 'Ils se redressent pour défendre', 'action': 'passez votre bras sous leur bras qui défend et faites un armbar'},
                {'condition': 'Ils tournent sur le côté', 'action': 'relâchez le triangle et prenez le dos'}
            ],
            'exitStrategies': [
                'Si vous ne pouvez pas sécuriser le triangle, retournez en mount et reset',
                'S\'ils s\'échappent en guarde, levez-vous et passez à nouveau'
            ]
        },
        'moneyDetails': [
            'Le triangle monté est l\'une des soumissions les plus efficaces depuis le mount en no-gi',
            'Maîtriser la montée en S-mount est la clé — le triangle vient facilement une fois le S-mount établi',
            'Le dilemme triangle-armbar depuis le mount est plus dangereux pour l\'adversaire que depuis la guarde'
        ],
        'fixItFast': [
            'S\'ils verrouillent leurs mains : décollez-les en pivotant les hanches',
            'S\'ils se redressent : passez immédiatement à l\'armbar',
            'Si le triangle est lâche : votre position S-mount n\'était pas assez haute'
        ]
    },

    # 8. PERUVIAN NECKTIE
    'peruvian-necktie': {
        'shortInstruction': 'Depuis le front headlock, glissez le bras sous le cou, attrapez votre propre biceps, enroulez l\'autre bras par-dessus la tête, faites un pas sur le côté et pliez leur corps vers l\'avant.',
        'summary': 'La Peruvian necktie comprime les deux artères carotides simultanément en utilisant votre avant-bras et votre biceps. Ce n\'est pas une compression — le poids du corps de l\'adversaire crée l\'étranglement quand vous les pliez vers l\'avant. Disponible quand l\'adversaire se détourne du front headlock.',
        'whyItWorks': [
            'Votre avant-bras et votre biceps compriment les deux carotides simultanément — c\'est un étranglement sanguin, pas une torsion du cou',
            'Plier leur corps vers l\'avant les empêche de se redresser — leur propre poids serre l\'étranglement',
            'La prise crée une structure verrouillée qui ne peut pas être décollée',
            'La Peruvian necktie complète la guillotine (qui fonctionne quand ils tournent vers l\'intérieur) — elle fonctionne quand ils tournent vers l\'extérieur'
        ],
        'commonMistakes': [
            'Serrer avec les bras au lieu d\'utiliser le poids du corps — cela fatigue les bras et n\'étrangle pas efficacement',
            'Ne pas faire un pas sur le côté avant de plier — vous avez besoin de l\'angle pour créer le pli vers l\'avant',
            'Tenir la prise trop bas sur leur cou — l\'étranglement doit comprimer les carotides sur les côtés du cou',
            'Essayer la Peruvian contre un adversaire en turtle qui est encore lourd sur ses mains'
        ],
        'coachingCues': [
            'Pliez, ne serrez pas — leur poids fait l\'étranglement',
            'Faites un pas sur le côté avant de plier',
            'Avant-bras d\'un côté, biceps de l\'autre',
            'Carotides, pas la trachée'
        ],
        'safetySummary': [
            'La Peruvian necktie comprime les artères carotides — appliquez lentement et relâchez immédiatement au tap',
            'N\'utilisez pas la Peruvian necktie comme une torsion du cou — elle doit cibler les carotides, pas la colonne cervicale',
            'Assurez-vous que le bras étrangleur est positionné correctement pour éviter de comprimer la trachée'
        ],
        'keyCorrections': [
            'S\'ils tournent vers vous : passez à la guillotine ou au D\'Arce',
            'S\'ils se redressent : la Peruvian est disponible — faites un pas et pliez',
            'S\'ils deviennent mous : la Peruvian ne fonctionnera pas — passez au turtle ride ou à la prise de dos'
        ],
        'systemLogic': {
            'corePrinciple': 'Peruvian necktie : front headlock → l\'adversaire se détourne (déclencheur) → glissez le bras sous le cou et attrapez votre propre biceps → enroulez l\'autre bras par-dessus la tête → verrouillez en figure-four → faites un pas sur le côté → pliez leur corps vers l\'avant — leur poids serre l\'étranglement.',
            'decisionTree': [
                {'condition': 'Ils tournent vers vous au lieu de se détourner', 'action': 'passez à la guillotine ou au D\'Arce'},
                {'condition': 'Ils se redressent', 'action': 'la Peruvian est disponible — faites un pas et pliez'}
            ],
            'exitStrategies': [
                'Si la Peruvian ne finit pas, passez au front headlock et réattaquez',
                'S\'ils s\'échappent, utilisez le front headlock pour les rabattre au sol'
            ]
        },
        'moneyDetails': [
            'La Peruvian necktie est l\'un des étranglements les plus efficaces depuis la position de front headlock',
            'Maîtriser la Peruvian vous donne une finition quand l\'adversaire se détourne — elle complète le système de front headlock',
            'La Peruvian necktie est particulièrement efficace contre les adversaires qui essaient de se redresser hors du front headlock'
        ],
        'fixItFast': [
            'S\'ils défendent en attrapant votre bras étrangleur : repompez vers le front headlock et réattaquez',
            'S\'ils tournent vers l\'intérieur : passez immédiatement à la guillotine',
            'Si l\'étranglement n\'est pas serré : faites un pas plus profond sur le côté avant de plier'
        ]
    },

    # 9. BODY TRIANGLE CONTROL
    'body-triangle-control': {
        'shortInstruction': 'Depuis le back control, glissez la jambe du dessus par-dessus leur hanche, verrouillez les jambes autour de leur taille (tibia derrière le genou), serrez pour comprimer le diaphragme et combattez des mains pour l\'étranglement.',
        'summary': 'Le body triangle immobilise les hanches de l\'adversaire en verrouillant vos jambes autour de leur taille. Il comprime le diaphragme, empêche l\'échappée de hanche et ne peut pas être décollé facilement. C\'est principalement un contrôle qui prépare le rear-naked choke.',
        'whyItWorks': [
            'Verrouiller vos jambes autour de leur taille comprime leur diaphragme — ils se fatiguent plus vite et ne peuvent pas générer de mouvement explosif',
            'Le body triangle empêche l\'échappée de hanche — pour s\'échapper du dos, l\'adversaire doit d\'abord créer de l\'espace au niveau des hanches',
            'Contrairement aux crochets, le body triangle ne peut pas être décollé facilement — c\'est une structure verrouillée',
            'Le body triangle fonctionne aussi comme une soumission par compression du corps — une compression prolongée peut forcer le tap'
        ],
        'commonMistakes': [
            'Verrouiller le body triangle trop haut (au niveau des côtes au lieu des hanches) — ils peuvent encore bouger les hanches',
            'Laisser le body triangle se desserrer — un triangle lâche leur donne de l\'espace pour s\'échapper',
            'Utiliser seulement le body triangle sans attaquer l\'étranglement — vous devez toujours travailler pour le RNC',
            'Verrouiller le triangle et se détendre — vous devez toujours combattre des mains pour la finition'
        ],
        'coachingCues': [
            'Hanches, pas côtes — verrouillez bas sur la taille',
            'Triangle serré = contrôle serré ; triangle lâche = échappée',
            'Le body triangle contrôle les hanches ; les mains contrôlent l\'étranglement',
            'Gardez-le mais ne cessez pas de travailler'
        ],
        'safetySummary': [
            'Le body triangle comprime le diaphragme — si le partenaire a des problèmes respiratoires, utilisez des crochets traditionnels à la place',
            'Ne verrouillez pas le body triangle trop fort pendant le combat positionnel — relâchez périodiquement pour permettre la respiration',
            'Le body triangle peut causer une gêne au niveau des côtes — relâchez si le partenaire signale une gêne'
        ],
        'keyCorrections': [
            'S\'ils essaient de décoller le triangle : serrez plus fort et continuez à combattre des mains',
            'S\'ils s\'aplatissent à plat ventre : relâchez et passez aux crochets ou au crab ride',
            'S\'ils créent de l\'espace : déverrouillez, ajustez et reverrouillez plus serré'
        ],
        'systemLogic': {
            'corePrinciple': 'Body triangle : depuis le back control → glissez la jambe du dessus par-dessus leur hanche → verrouillez les jambes autour de leur taille (tibia derrière le genou) → serrez pour comprimer leur diaphragme → maintenez en combattant des mains pour le RNC.',
            'decisionTree': [
                {'condition': 'Ils essaient de décoller le triangle', 'action': 'serrez plus fort et continuez à combattre des mains'},
                {'condition': 'Ils s\'aplatissent à plat ventre', 'action': 'relâchez le triangle et passez aux crochets ou au crab ride'},
                {'condition': 'Ils créent de l\'espace', 'action': 'déverrouillez, ajustez et reverrouillez plus serré — n\'acceptez jamais un triangle lâche'}
            ],
            'exitStrategies': [
                'Si vous devez ajuster la position, déverrouillez le triangle, faites l\'ajustement, puis reverrouillez',
                'Si le body triangle échoue, passez aux crochets traditionnels pour la mobilité'
            ]
        },
        'moneyDetails': [
            'Le body triangle est le système de contrôle du dos le plus efficace dans la compétition no-gi moderne',
            'Maîtriser le body triangle empêche l\'échappée de hanche — la méthode d\'évasion du dos la plus courante',
            'La combinaison body triangle + RNC est la position de finition la plus dominante en no-gi'
        ],
        'fixItFast': [
            'Si le triangle est lâche : rapprochez vos hanches et reverrouillez',
            'S\'ils s\'aplatissent à plat ventre : relâchez immédiatement le triangle et passez aux crochets',
            'Si vous ne pouvez pas finir le RNC : maintenez le body triangle et attendez qu\'ils se fatiguent'
        ]
    },

    # 10. GIFT WRAP / ARM DRAG BACK TAKE
    'gift-wrap-back-take': {
        'shortInstruction': 'Depuis le side control, isolez le bras éloigné, pliez-le derrière leur dos, enjambez leur tête, tournez derrière eux et établissez le back control.',
        'summary': 'La prise de dos par gift wrap neutralise le bras éloigné de l\'adversaire en le pliant derrière son dos, puis utilise une rotation pour prendre le dos. Avec un bras piégé, leur capacité à défendre la prise de dos est réduite de moitié.',
        'whyItWorks': [
            'Plier leur bras derrière leur dos crée une poignée qui contrôle leur épaule — ils ne peuvent pas tourner vers vous ni s\'appuyer',
            'Avec un bras neutralisé, leur capacité à défendre la prise de dos est réduite de moitié',
            'Le gift wrap est disponible depuis toute position au-dessus où vous pouvez isoler un bras éloigné',
            'Tourner derrière eux en contrôlant le gift wrap crée la prise de dos — la rotation + le contrôle du bras les empêche de vous suivre'
        ],
        'commonMistakes': [
            'Essayer le gift wrap de trop loin — vous devez être poitrine contre poitrine pour isoler le bras éloigné',
            'Ne pas plier assez le bras derrière leur dos — si le bras n\'est pas derrière, ils peuvent le retirer',
            'Tourner sans contrôler le bras — vous finissez derrière eux mais ils ont encore leurs deux bras fonctionnels',
            'Garder le gift wrap trop longtemps après avoir sécurisé le back control — relâchez et passez à l\'étranglement'
        ],
        'coachingCues': [
            'Poitrine contre poitrine d\'abord, puis attrapez le bras éloigné',
            'Pliez-le derrière leur dos — pouce vers le haut',
            'Tournez serré, restez connecté',
            'Le gift wrap est l\'entrée ; le back control est la destination'
        ],
        'safetySummary': [
            'Ne forcez pas le bras derrière leur dos s\'ils résistent fortement — cela peut blesser l\'épaule',
            'Pliez le bras doucement et utilisez la rotation pour créer la prise de dos, pas le pliage du bras seul',
            'Si le partenaire a une blessure préexistante à l\'épaule, évitez complètement le gift wrap'
        ],
        'keyCorrections': [
            'S\'ils résistent à l\'isolation du bras : passez à l\'arm drag ou à la kimura depuis le side control',
            'S\'ils roulent loin pour s\'échapper : suivez-les — la roulade devient une opportunité de prise de dos',
            'S\'ils s\'aplatissent à plat ventre : maintenez le side control et avancez vers le mount à la place'
        ],
        'systemLogic': {
            'corePrinciple': 'Gift wrap back take : depuis le side control/mount → isolez le bras éloigné → pliez-le derrière leur dos → enjambez leur tête → tournez derrière → relâchez le gift wrap → établissez le back control.',
            'decisionTree': [
                {'condition': 'Ils résistent à l\'isolation du bras', 'action': 'passez à l\'arm drag ou à la kimura depuis le side control'},
                {'condition': 'Ils roulent loin pour s\'échapper', 'action': 'suivez-les — la roulade devient une opportunité de prise de dos'},
                {'condition': 'Ils s\'aplatissent à plat ventre', 'action': 'maintenez le side control et avancez vers le mount à la place'}
            ],
            'exitStrategies': [
                'Si la rotation n\'atteint pas le dos, retournez en side control et essayez une autre entrée de prise de dos',
                'S\'ils tournent vers vous, passez au mount'
            ]
        },
        'moneyDetails': [
            'Le gift wrap est la prise de dos la plus efficace depuis le side control en no-gi',
            'Maîtriser le gift wrap vous donne un chemin fiable du side control au back control',
            'Le gift wrap est particulièrement efficace contre les adversaires qui s\'appuient sur le bras éloigné pour échapper au side control'
        ],
        'fixItFast': [
            'S\'ils résistent à l\'isolation du bras : passez à l\'arm drag ou à la kimura',
            'Si la rotation ne fonctionne pas : votre enjambée n\'était pas assez profonde — enjambez plus loin par-dessus leur tête',
            'S\'ils vous suivent pendant la rotation : gardez votre poitrine connectée et terminez la prise de dos'
        ]
    },

    # 11. LEG DRAG TO BACK TAKE
    'leg-drag-to-back-take': {
        'shortInstruction': 'Contrôlez leur jambe proche, traînez-la en travers de votre corps, l\'adversaire s\'appuie sur le bras éloigné (déclencheur), relâchez la jambe, passez sous leur bras et tournez derrière.',
        'summary': 'La leg drag vers la prise de dos est un mouvement continu de la passe de guarde au back control. La leg drag force l\'adversaire à s\'appuyer sur son bras éloigné — et cet appui devient l\'entrée pour la prise de dos.',
        'whyItWorks': [
            'La leg drag les a déjà sur un côté — ils sont déjà partiellement exposés pour la prise de dos',
            'Leur réponse défensive (s\'appuyer sur le bras éloigné) crée l\'ouverture pour la prise de dos',
            'La transition est continue — il n\'y a pas de pause entre la passe et la prise de dos',
            'Relâcher la jambe et passer sous leur bras inverse l\'angle en un seul mouvement'
        ],
        'commonMistakes': [
            'Garder la leg drag trop longtemps — vous devez relâcher quand ils s\'appuient sur le bras éloigné',
            'Passer par-dessus leur bras au lieu de passer dessous — passer dessous vous donne l\'accès au dos',
            'Ne pas contrôler leur hanche éloignée pendant la rotation — ils peuvent se retourner vers vous',
            'Perdre la proximité pendant la transition — vous devez rester connecté tout au long'
        ],
        'coachingCues': [
            'Tirez la jambe, lisez l\'appui, passez dessous',
            'Relâchez la jambe quand ils s\'appuient — c\'est votre déclencheur',
            'Passez sous le bras, pas par-dessus',
            'Restez connecté — pas d\'espace'
        ],
        'safetySummary': [
            'Attention à ne pas hyperétendre leur jambe pendant la leg drag — contrôlez la jambe à la cheville ou au pantalon',
            'Ne tirez pas la jambe agressivement — une traînée contrôlée avec un bon jeu de pieds est plus sûre',
            'Si l\'adversaire résiste fortement, relâchez la leg drag et passez à une autre passe'
        ],
        'keyCorrections': [
            'S\'ils ne s\'appuient pas sur le bras éloigné : continuez la leg drag jusqu\'au side control ou mount',
            'S\'ils s\'appuient et vous passez dessous : back control établi',
            'S\'ils se détournent pendant la traînée : relâchez la jambe et prenez le dos directement'
        ],
        'systemLogic': {
            'corePrinciple': 'Leg drag vers prise de dos : contrôlez leur jambe proche → traînez-la en travers de votre corps → l\'adversaire s\'appuie sur le bras éloigné (déclencheur) → relâchez la jambe → passez sous leur bras qui s\'appuie → tournez derrière → établissez le back control.',
            'decisionTree': [
                {'condition': 'Ils ne s\'appuient pas sur le bras éloigné', 'action': 'continuez la leg drag jusqu\'au side control ou mount'},
                {'condition': 'Ils s\'appuient et vous passez dessous', 'action': 'back control établi'},
                {'condition': 'Ils se détournent pendant la traînée', 'action': 'relâchez la jambe et prenez le dos directement'}
            ],
            'exitStrategies': [
                'Si la prise de dos échoue, vous devriez toujours avoir le side control',
                'S\'ils tournent vers vous, passez à la passe'
            ]
        },
        'moneyDetails': [
            'La leg drag vers la prise de dos est une chaîne à haute valeur qui connecte la passe au back control de manière fluide',
            'Maîtriser cette transition vous donne un chemin direct de la passe de guarde au back control 4 points',
            'La leg drag vers la prise de dos est particulièrement efficace contre les adversaires qui s\'appuient largement pour défendre la passe'
        ],
        'fixItFast': [
            'S\'ils ne s\'appuient pas : continuez la traînée jusqu\'au side control — la prise de dos n\'est pas disponible',
            'Si vous passez par-dessus au lieu de dessous : reset et passez sous le bras',
            'S\'ils tournent vers vous pendant la traînée : passez à la passe — la prise de dos n\'est plus disponible'
        ]
    },

    # 12. TURTLE TO GUARD RECOVERY
    'turtle-to-guard-recovery': {
        'shortInstruction': 'Depuis la turtle, protégez le cou, lisez l\'engagement du poids, abaissez la hanche proche, donnez un coup de pied à la jambe éloignée à travers, pompez le bras intérieur et rétablissez la guarde.',
        'summary': 'La récupération de guarde depuis la turtle utilise un basculement explosif des hanches pour créer de l\'espace, ramener les jambes entre vous et l\'adversaire, et rétablir la guarde. Contrairement à la remontée debout qui désengage, la récupération de guarde maintient le combat dans votre guarde où vous pouvez attaquer.',
        'whyItWorks': [
            'Depuis la turtle, vous pouvez explosivement échapper les hanches quand l\'adversaire engage son poids vers l\'avant',
            'Le basculement des hanches crée de l\'espace pour ramener vos jambes entre vous et eux',
            'Pomper le bras intérieur les empêche d\'établir le contrôle seatbelt ou body triangle',
            'Récupérer la guarde plutôt que de se lever est plus sûr quand l\'adversaire a engagé son poids sur le dessus'
        ],
        'commonMistakes': [
            'Essayer de récupérer la guarde avant de protéger le cou — couvrez toujours le cou d\'abord',
            'Poser les deux mains au sol pour se lever — cela expose le dos à un étranglement',
            'Donner le coup de pied sans pomper le bras intérieur — ils maintiennent le contrôle seatbelt',
            'Rester trop longtemps en turtle — la turtle est une position réactive ; vous devez lire et exploser'
        ],
        'coachingCues': [
            'Cou d\'abord, puis basculement des hanches, puis pompe',
            'Abaissez la hanche, donnez le coup de pied — un mouvement explosif',
            'Pompez le bras intérieur ou ils gardent le seatbelt',
            'Lisez leur engagement de poids — c\'est votre déclencheur'
        ],
        'safetySummary': [
            'Protégez votre cou avant toute tentative d\'évasion de turtle — l\'étranglement vient en premier',
            'N\'explosez pas dans une position où votre cou ou votre colonne est exposé',
            'Si l\'adversaire a un seatbelt profond, ne luttez pas — pompez d\'abord le bras'
        ],
        'keyCorrections': [
            'S\'ils engagent le poids vers l\'avant : votre déclencheur — basculez les hanches et récupérez la guarde',
            'S\'ils contournent sur le côté : asseyez-vous directement en guarde',
            'S\'ils vous aplatisent : la turtle est perdue — protégez le cou et attendez qu\'ils créent de l\'espace'
        ],
        'systemLogic': {
            'corePrinciple': 'Récupération de guarde depuis la turtle : depuis la turtle → protégez le cou → lisez l\'engagement du poids de l\'adversaire vers l\'avant (déclencheur) → abaissez la hanche proche au sol → donnez un coup de pied à la jambe éloignée à travers → pompez le bras intérieur → rétablissez la guarde.',
            'decisionTree': [
                {'condition': 'Ils engagent le poids vers l\'avant', 'action': 'votre déclencheur — basculement des hanches et récupérez la guarde'},
                {'condition': 'Ils contournent sur le côté à la place', 'action': 'asseyez-vous directement en guarde'},
                {'condition': 'Ils vous aplatisent à plat ventre', 'action': 'la turtle est perdue — protégez le cou et attendez de l\'espace'}
            ],
            'exitStrategies': [
                'Si la récupération de guarde échoue, levez-vous et reset',
                'S\'ils prennent le dos pendant la tentative, protégez votre cou et échappez-vous du dos'
            ]
        },
        'moneyDetails': [
            'La récupération de guarde depuis la turtle est une alternative plus sûre à la remontée debout quand l\'adversaire a le poids engagé vers l\'avant',
            'Maîtriser la récupération de guarde depuis la turtle supprime la peur d\'être amené au sol depuis la turtle',
            'La récupération de guarde est particulièrement utile contre les adversaires qui attaquent immédiatement le dos depuis la turtle'
        ],
        'fixItFast': [
            'S\'ils attrapent un seatbelt : pompez le bras intérieur avant de tenter le basculement des hanches',
            'Si vous ne pouvez pas donner le coup de pied : vos hanches sont trop hautes — abaissez la hanche plus bas avant de donner le coup',
            'S\'ils vous aplatisent : attendez qu\'ils créent de l\'espace, puis explosez dans le basculement des hanches'
        ]
    }
}


def update_vi(skill_id, root, files):
    """Update content.vi.json for a skill."""
    if 'content.vi.json' not in files:
        return False
    path = os.path.join(root, 'content.vi.json')
    with open(path) as f:
        current = json.load(f)
    # (VI data is already written; keep existing)
    return True


def update_fr(skill_id, root, files):
    """Update content.fr.json for a skill."""
    global translations_fr
    if skill_id not in translations_fr:
        return False
    fr_path = os.path.join(root, 'content.fr.json')
    if not os.path.exists(fr_path):
        print(f'  SKIP {skill_id}: content.fr.json not found')
        return False

    with open(fr_path) as f:
        current = json.load(f)
    fr_data = translations_fr[skill_id]

    current['id'] = skill_id
    current['locale'] = 'fr'

    for key in ['shortInstruction', 'summary', 'whyItWorks', 'commonMistakes', 'coachingCues']:
        if key in fr_data:
            current[key] = fr_data[key]

    for key in ['safetySummary', 'keyCorrections', 'moneyDetails', 'fixItFast']:
        current[key] = fr_data.get(key, [])

    if 'systemLogic' in fr_data:
        current['systemLogic'] = fr_data['systemLogic']

    with open(fr_path, 'w') as f:
        json.dump(current, f, ensure_ascii=False, indent=2)
        f.write('\n')
    return True


def main():
    updated_vi = []
    updated_fr = []
    errors = []

    for root, dirs, files in os.walk(SKILLS_DIR):
        skill_id = os.path.basename(root)
        if skill_id not in translations_fr:
            continue

        # Check VI exists (already translated)
        if 'content.vi.json' in files:
            updated_vi.append(skill_id)
        else:
            errors.append(f'{skill_id}: content.vi.json not found')

        # Update FR
        if update_fr(skill_id, root, files):
            updated_fr.append(skill_id)

    print(f'✓ VI already done: {len(updated_vi)} skills')
    print(f'✓ FR updated: {len(updated_fr)} skills')
    for s in sorted(updated_fr):
        print(f'  - {s}')
    if errors:
        print(f'Errors:')
        for e in errors:
            print(f'  {e}')


if __name__ == '__main__':
    main()
    print('\nDone!')
