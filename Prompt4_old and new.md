You are working on my existing NoGi Mind app.

Goal:
Research, audit, improve, and enrich the app with modern no-gi jiujitsu / submission grappling techniques.

Very important:
This task is NOT only about adding new techniques.

You must also deeply review and improve all existing techniques, skills, submissions, guards, transitions, positions, concepts, glossary terms, search documents, and relationships already present in the app.

For every existing item, decide:

1. Keep as-is because it is already good.
2. Improve because it is useful but shallow.
3. Rewrite because it is vague/confusing.
4. Merge because it duplicates another item.
5. Split because it mixes too many ideas.
6. Reconnect because related skills/concepts/positions are wrong or weak.
7. Add safety because it is risky.
8. Add Body Position because attacker/defender details are missing.
9. Add Fix It Fast because common failures are missing.
10. Add search synonyms because it is hard to find.
11. Add glossary/concept links because learning context is missing.
12. Move to manifest only if incomplete or too niche.

Do NOT only append new data.
Improve the existing app data first, then add new modern no-gi content.

==================================================
CORE OBJECTIVE
==================================================

Make NoGi Mind stronger in two directions:

A. Improve existing content
- remove vague text
- remove repeated generic explanations
- fix mixed languages
- fix weak translations
- fix broken references
- add missing body-position details
- add missing attacker/defender details
- add missing System Logic
- add missing Details
- add missing Fix It Fast
- add missing Outcomes & Branches
- add missing Safety
- add missing glossary/concept links
- improve search coverage

B. Add missing modern no-gi content
- modern submissions
- modern guards
- modern transitions
- modern rides
- modern wrestle-ups
- modern leg lock systems
- front headlock systems
- safety-critical techniques
- competition-meta techniques
- emerging/niche techniques when relevant

==================================================
EXISTING CONTENT REVIEW
==================================================

Before adding new techniques, audit existing implemented data.

Create:

docs/EXISTING_TECHNIQUE_REVIEW.md

For each existing skill/technique/submission/transition, review:

1. Title clarity
2. Category correctness
3. English/Vietnamese/French quality
4. System Logic quality
5. Body Position quality
6. Details quality
7. Outcomes & Branches quality
8. Fix It Fast quality
9. Safety quality
10. Related skills quality
11. Related positions quality
12. Related concepts quality
13. Glossary links quality
14. Search discoverability
15. Duplicate/redundant content
16. Missing modern no-gi context
17. Whether it needs enrichment, merge, split, or rewrite

Use statuses:

- good
- needs_enrichment
- needs_rewrite
- needs_body_position
- needs_safety
- needs_search
- needs_relationship_fix
- duplicate
- too_shallow
- needs_human_review

Do not stop after the audit.
Immediately improve the highest-priority problems.

==================================================
IMPROVE EXISTING SKILLS FIRST
==================================================

Priority existing skills to review and improve first:

Core:
1. RNC
2. Armbar
3. Triangle
4. Guillotine
5. Arm Triangle
6. Kimura
7. Omoplata
8. Heel Hook Safety
9. Back Control
10. Mount Control
11. S-Mount Control
12. Side Control Pin
13. Bodylock Passing
14. Knee Cut Passing
15. Side Control Escape
16. Mount Escape
17. Back Escape
18. Front Headlock Defense
19. Hand Fighting
20. Dogfight

Modern:
21. Octopus Guard
22. Clamp Guard
23. Shoulder Crunch
24. S-Mount Armbar
25. Gogoplata
26. Buggy Choke
27. Choi Bar
28. Tarikoplata
29. Crab Ride
30. Wrist Ride
31. False Reap
32. K-Guard Matrix
33. Saddle / Inside Sankaku
34. Backside 50/50
35. Rear Triangle
36. Smother Safety

For each existing skill, ensure it has:

1. System Logic
- problemSolved
- corePrinciple
- mechanicalWhy
- preconditions
- ifThenBranches
- oneSentenceMentalModel

2. Body Position
- attacker body map
- defender body map
- at least 3 phases
- at least 4 contact cards
- exact attacker body part → defender body part
- force direction
- defender reaction
- correction cue

3. Details
- top 5 details
- clamp / angle / pressure / finish mechanics
- quality signals
- common leaks
- blackbelt-level details where relevant

4. Outcomes & Branches
- success
- failure
- counter
- reset
- branch
- safety_abort if relevant

5. Fix It Fast
- at least 5 common problems
- why it happens
- body correction
- cue
- next branch

6. Safety
Required for:
- neck attacks
- spine pressure
- shoulder locks
- elbow locks
- knee/heel attacks
- compression/smother
- flying/jumping attacks
- late defense situations

7. Relationships
- related skills
- related positions
- related concepts
- glossary terms
- chains
- problem maps

8. Search
- aliases
- English terms
- Vietnamese terms
- Vietnamese no-diacritic variants
- French terms
- body-position searchable phrases

==================================================
REWRITE VAGUE EXISTING CONTENT
==================================================

Find and improve vague phrases.

Replace vague text like:

- control the arm
- apply pressure
- use your hips
- finish the choke
- keep tight
- get angle
- break posture
- isolate the limb

With precise body-position text:

- The attacker’s right hand pulls the defender’s left wrist across the defender’s centerline.
- The attacker’s left knee wedges beside the defender’s right shoulder.
- The attacker’s chest stays glued to the defender’s upper back.
- The attacker’s hips rotate toward the defender’s far hip.
- The defender’s right elbow must stay separated from their ribs before the attacker extends.
- The attacker’s shoulder drives diagonally into the defender’s neck line.
- The attacker’s head blocks the defender’s elbow from returning to centerline.

Vietnamese examples:
- Tay phải của attacker kéo cổ tay trái của defender qua centerline.
- Gối trái của attacker chèn sát vai phải của defender.
- Ngực của attacker dán vào lưng trên của defender.
- Hông của attacker xoay về phía hông xa của defender.

French examples:
- La main droite de l’attaquant tire le poignet gauche du défenseur au-delà de la ligne centrale.
- Le genou gauche de l’attaquant bloque l’épaule droite du défenseur.
- La poitrine de l’attaquant reste collée au haut du dos du défenseur.

==================================================
REMOVE DUPLICATION
==================================================

Find repeated generic explanations across skills.

If the same concept appears repeatedly:
- move general explanation to concepts or glossary
- keep skill-specific application inside the skill

Examples:
- Control Before Submission
- Angle Before Force
- Clamp Before Torque
- Hand Fight Before Choke
- Protect Knee Line
- Hide Heel Before Rotation
- Pressure Needs Direction
- Frames Are Structure
- Reactions Create Branches

Do not repeat long paragraphs in every skill.
Use relatedConceptIds and concise skill-specific application.

Create/Update:

docs/DUPLICATION_AND_CLEANUP_REPORT.md

Include:
- repeated patterns found
- what was moved to concepts/glossary
- what was kept skill-specific
- files changed

==================================================
RELATIONSHIP CONSISTENCY CHECK
==================================================

Audit all existing relationships.

Fix:
- broken relatedSkillIds
- weak relatedSkillIds
- missing prerequisites
- missing relatedPositionIds
- missing relatedConceptIds
- missing relatedGlossaryIds
- unrelated concepts attached to wrong skills
- missing problem maps
- missing transition links
- missing chain links
- safety-critical skill without safety concept

For every existing technique, ensure:
- related skills actually make sense
- related positions match the technique
- concepts are relevant
- glossary terms are useful
- stateMachine outcomes link to real branches where possible

Create:

docs/RELATIONSHIP_REVIEW_REPORT.md

==================================================
SEARCH IMPROVEMENT FOR EXISTING DATA
==================================================

Do not only index new data.
Improve search for existing data.

For each existing skill, add/improve:
- aliases
- common English search terms
- Vietnamese search terms
- Vietnamese no-diacritic search terms
- French search terms
- body-part search terms
- problem-based search terms

Examples:

RNC:
- rear naked choke
- RNC
- choke from back
- elbow under chin
- chest glued to back
- siết cổ sau
- khuyu duoi cam
- nguc dan lung
- étranglement arrière
- coude sous le menton

Armbar:
- armbar
- elbow line
- thumb direction
- armbar slipping
- khóa tay
- khoa tay
- tuột khuỷu
- coude
- clé de bras

False Reap:
- false reap
- knee line
- heel exposure
- giấu gót
- duong goi
- giau got
- ligne du genou

Search should find both:
- technique names
- common problems
- body-position phrases

==================================================
AFTER EXISTING REVIEW, ADD NEW MODERN CONTENT
==================================================

After improving existing content, add missing modern no-gi techniques.

Do this in priority order.

Modern submissions:
1. High-Wrist Guillotine
2. Low-Wrist Guillotine
3. High-Elbow Guillotine
4. Japanese Necktie
5. Peruvian Necktie
6. Rear Triangle
7. Mounted Triangle
8. Back Triangle Armbar
9. Gogoplata
10. Buggy Choke
11. Reverse Buggy Choke
12. Choi Bar
13. Tarikoplata
14. Baratoplata
15. Aoki Lock Awareness
16. Z-Lock Awareness
17. Shotgun Ankle Lock
18. Texas Cloverleaf
19. Smother Safety
20. Compression vs Strangle Recognition

Modern guards:
21. Octopus Guard
22. Clamp Guard
23. Shoulder Crunch
24. K-Guard
25. Matrix
26. False Reap
27. Shin-to-Shin
28. Single Leg X
29. X Guard
30. 50/50
31. Backside 50/50
32. Overhook Guard
33. High Guard
34. No-Gi De La Riva
35. No-Gi Reverse De La Riva

Modern transitions:
36. Octopus to Dogfight
37. Octopus to Back Take
38. Octopus to Kimura Trap
39. Clamp Guard to Triangle
40. Clamp Guard to Armbar
41. Clamp Guard to Omoplata
42. Shoulder Crunch to Sweep
43. K-Guard to Matrix
44. K-Guard to Backside 50/50
45. K-Guard to Heel Exposure
46. False Reap to Saddle
47. Saddle to Backside 50/50
48. 50/50 to Heel Exposure
49. Crab Ride to Back Take
50. Wrist Ride to Back Exposure
51. Turtle Spiral Ride to Back
52. Half Guard Underhook to Dogfight
53. Dogfight to Knee Tap
54. Dogfight to Back Take
55. Hip Heist Wrestle-Up
56. Low Single from Seated Guard
57. Bodylock Pass to Mount
58. Bodylock Pass to Back Take
59. Headquarters to Leg Drag
60. Knee Cut to Backstep
61. Front Headlock to Go-Behind

Modern rides:
62. Crab Ride
63. Wrist Ride
64. Cross-Wrist Ride
65. Spiral Ride
66. Claw Ride
67. Power Half Ride
68. Leg Ride
69. Near Ankle Ride
70. Dagestani Handcuff

Safety:
71. False Reap Safety
72. Heel Hook Defense
73. Knee Line Escape
74. Reaping Awareness
75. Neck Crank Recognition
76. Spine Lock Awareness
77. Compression Safety
78. Slam Risk Awareness
79. Flying Attack Safety
80. Kani Basami Safety

If too much:
- implement/enrich the top 20 deeply
- mark the rest in manifest
- report remaining work

==================================================
VALIDATION UPDATE
==================================================

Update validation to check both existing and new content.

Fail for:
- broken references
- duplicate IDs
- missing en/vi/fr
- empty localized fields
- TODO placeholders
- implemented skill missing System Logic
- implemented skill missing Body Position
- implemented skill missing Details
- implemented skill missing Outcomes & Branches
- implemented skill missing Fix It Fast
- high-risk skill missing Safety
- body contact missing attackerTarget
- body contact missing defenderTarget
- body contact missing force direction where relevant
- safety-critical skill missing safety_abort
- exported incomplete skill

Warn for:
- existing skill marked needs_enrichment
- vague wording
- missing left/right detail
- missing defender reaction
- weak related concepts
- weak glossary links
- search query returns zero results
- duplicate content across skills
- modern technique planned but not implemented

==================================================
DOCUMENTATION
==================================================

Create/update:

docs/EXISTING_TECHNIQUE_REVIEW.md
docs/DUPLICATION_AND_CLEANUP_REPORT.md
docs/RELATIONSHIP_REVIEW_REPORT.md
docs/MODERN_TECHNIQUE_COVERAGE_AUDIT.md
docs/MODERN_NOGI_DATA_ENRICHMENT_REPORT.md

Final report must include:
1. Existing skills reviewed.
2. Existing skills improved.
3. Existing skills rewritten.
4. Existing duplicates merged.
5. Relationships fixed.
6. Search terms improved.
7. New modern techniques added.
8. Techniques moved to manifest only.
9. Safety improvements.
10. Remaining gaps.

==================================================
IMPLEMENTATION STRATEGY
==================================================

Work in this order:

Batch 1:
Review and improve existing highest-priority skills.

Batch 2:
Fix duplicates and weak relationships.

Batch 3:
Improve search aliases/synonyms for existing content.

Batch 4:
Add/enrich top modern techniques.

Batch 5:
Update validation, coverage, docs.

Do not add many new skills before fixing bad existing ones.

Depth over count:
20 deeply improved skills are better than 100 shallow additions.

==================================================
ACCEPTANCE CRITERIA
==================================================

Done when:

1. Existing content audit exists.
2. Existing high-priority skills are improved.
3. Duplicates/redundant content reduced.
4. Relationships are more coherent.
5. Search improves for existing and new content.
6. At least 20 existing techniques are deeply improved.
7. At least 10–20 missing modern techniques are added or planned.
8. Safety-critical items are corrected.
9. Body Position details are improved.
10. Validation checks existing and new quality.
11. npm run build passes.
12. npm run validate:data passes if available.
13. npm run validate:search passes if available.
14. No TODO placeholders.
15. No shallow filler.
16. No backend/auth/payment/social/video upload/3D/SQLite added.

FINAL RESPONSE:
After implementation, report:
1. Existing content reviewed.
2. Existing content improved.
3. New techniques added.
4. Techniques planned but not implemented.
5. Relationship fixes.
6. Search improvements.
7. Safety improvements.
8. Validation result.
9. Build result.
10. Remaining recommended next batch.
Important priority: improve existing implemented content first. Do not only add new techniques. Existing shallow/confusing data must be upgraded before expanding the library.