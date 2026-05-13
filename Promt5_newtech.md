You are working on my existing NoGi Mind app.

Goal:
Research, audit, and enrich the app with modern no-gi jiujitsu / submission grappling techniques, submissions, guards, transitions, rides, passing systems, leg locks, front headlock systems, wrestle-ups, counters, and safety-critical techniques.

This task is specifically about strengthening the app’s technical data.

The app should become a modern no-gi masterclass knowledge system:
- updated
- practical
- systematic
- body-position precise
- attacker/defender aware
- searchable
- validated
- production-ready

Important:
- Do NOT rebuild the app.
- Do NOT change the tech stack.
- Do NOT add backend/auth/payment/social/video upload/3D/SQLite.
- Keep TypeScript + Vite.
- Keep English / Vietnamese / French.
- English remains default.
- Keep language persistence.
- Keep npm run build passing.
- Keep npm run validate:data passing if available.
- Keep npm run validate:search passing if available.
- No TODO placeholders.
- No shallow filler.
- Do not copy copyrighted instructional text.
- Do not copy YouTube transcripts.
- Do not copy paid instructional content.
- Use public sources only for research direction.
- Write all app-facing content originally in NoGi Mind’s own wording.
- If source research is used, record source notes in docs only.

==================================================
MAIN OBJECTIVE
==================================================

Find and update modern no-gi technique coverage across:

1. Submissions
2. Guards
3. Passing
4. Transitions
5. Escapes
6. Counters
7. Rides
8. Wrestle-ups
9. Leg locks
10. Front headlock systems
11. Back takes
12. Modern pins/compression
13. Safety-critical techniques
14. Competition-meta techniques
15. Emerging / niche techniques

For each technique, decide:

- Already implemented and good
- Implemented but shallow
- Implemented but outdated/confusing
- Missing and should be added
- Too risky / needs safety-only page
- Too niche / add to manifest only
- Needs human review

==================================================
PHASE 1 — RESEARCH POLICY
==================================================

Create or update:

docs/TECHNIQUE_RESEARCH_POLICY.md

Rules:

Allowed:
- public YouTube titles/descriptions as discovery signals
- public competition examples
- public article titles
- public social posts as trend signals
- common technique names
- general grappling terminology
- your own original summaries
- existing /content folder if it belongs to this project

Not allowed:
- copying transcripts
- copying paid course structure
- copying full instructional wording
- copying proprietary terminology as if owned by app
- copying BJJGraph content
- copying another app’s data
- embedding pirated videos
- using fake sources

Research output should be original.

For every researched technique, add source note only in:

docs/MODERN_NOGI_RESEARCH_NOTES.md

Source note format:
- technique/system name
- source URL/title if available
- source type: public video / public article / competition example / internal content
- short original summary
- why relevant
- no copied long text
- human review needed: true/false

==================================================
PHASE 2 — CURRENT DATA AUDIT
==================================================

Audit current app data.

Create:

docs/MODERN_TECHNIQUE_COVERAGE_AUDIT.md

Audit:

1. Existing skills
- total skills
- submissions count
- guards count
- passing count
- leg locks count
- front headlock count
- wrestle-up count
- ride count
- safety count
- modern expansion count

2. Missing modern areas
- missing submissions
- missing guards
- missing transitions
- missing leg lock systems
- missing ride systems
- missing wrestle-up systems
- missing modern passing systems
- missing safety pages

3. Quality gaps
For each implemented technique, check:
- quickCard
- System Logic / conceptualTeaching
- Body Position / body-to-body details
- Money Details
- Outcomes & Branches
- Fix It Fast
- Safety
- stateMachine
- attacker/defender
- glossary links
- concept links
- search coverage
- en/vi/fr completeness

4. Relationship gaps
- broken relatedSkillIds
- weak relatedConceptIds
- weak relatedPositionIds
- missing glossary terms
- missing transition links
- missing problem maps
- missing chain links

5. Search gaps
Test queries:
- armbar
- triangle
- omoplata
- rnc
- guillotine
- arm triangle
- kimura
- heel hook
- false reap
- k guard
- matrix
- saddle
- backside 50/50
- crab ride
- wrist ride
- octopus
- clamp guard
- shoulder crunch
- buggy choke
- gogoplata
- choi bar
- tarikoplata
- smother
- wrestle up
- dogfight
- front headlock
- high wrist guillotine
- japanese necktie
- peruvian necktie
- tay phải cổ tay trái
- đường gối
- giấu gót
- ép vai
- ép ngực
- coude
- poignet
- étranglement

Do not stop after audit. Continue enrichment.

==================================================
PHASE 3 — MODERN TECHNIQUE TAXONOMY
==================================================

Create or update:

docs/MODERN_NOGI_TECHNIQUE_TAXONOMY.md

Organize modern no-gi techniques into these groups:

A. Core Submissions
- RNC
- Armbar
- Triangle
- Guillotine
- Arm Triangle
- Kimura
- Omoplata
- D’Arce
- Anaconda
- North-South Choke
- Straight Ankle Lock
- Heel Hook
- Kneebar
- Toe Hold

B. Modern Submissions
- High-Wrist Guillotine
- Low-Wrist Guillotine
- High-Elbow Guillotine
- Japanese Necktie
- Peruvian Necktie
- Rear Triangle
- Mounted Triangle
- Back Triangle Armbar
- Gogoplata
- Locoplata
- Buggy Choke
- Reverse Buggy Choke
- Choi Bar
- Tarikoplata
- Baratoplata
- Aoki Lock Awareness
- Z-Lock Awareness
- Estima Lock Awareness
- Shotgun Ankle Lock
- Texas Cloverleaf
- Smother / Chest Compression Awareness

C. Guard Systems
- Seated Guard
- Supine Guard
- Butterfly Guard
- Half Guard
- Knee Shield
- Dogfight
- Shin-to-Shin
- Single Leg X
- X Guard
- K-Guard
- Matrix
- Octopus Guard
- Clamp Guard
- Shoulder Crunch
- Overhook Guard
- High Guard
- 50/50
- False Reap
- Reverse De La Riva No-Gi
- No-Gi De La Riva

D. Passing Systems
- Bodylock Passing
- Chest-to-Chest Half Guard Passing
- Knee Cut
- Headquarters
- Split Squat Passing
- Float Passing
- Long-Step
- Backstep
- Leg Drag
- Shin Staple
- Tripod Passing
- Leg Pin Passing
- Double Under Stack
- Torreando No-Gi
- Outside Passing
- Camping Headquarters

E. Rides / Back Takes
- Crab Ride
- Wrist Ride
- Cross-Wrist Ride
- Spiral Ride
- Claw Ride
- Power Half
- Leg Ride
- Near Ankle Ride
- Far Ankle Ride
- Dagestani Handcuff
- Chair Sit Back Take
- Turtle Ride
- Truck / Twister Hook Awareness

F. Wrestle-Ups / Scrambles
- Half Guard Underhook to Dogfight
- Dogfight Knee Tap
- Dogfight Back Take
- Hip Heist Wrestle-Up
- Low Single from Seated Guard
- Shin-to-Shin Wrestle-Up
- Front Headlock Counter Wrestle-Up
- Sit-Out
- Peek-Out
- Granby Recovery
- Switch
- Limp Arm
- Whizzer Defense

G. Front Headlock
- Chin Strap
- Front Headlock Control
- High-Wrist Guillotine
- Arm-In Guillotine
- D’Arce
- Anaconda
- Schultz Headlock
- Japanese Necktie
- Peruvian Necktie
- Front Headlock to Go-Behind
- Front Headlock to Back Take
- Cement Mixer / Roll-Through

H. Leg Locks
- Knee Line
- Heel Exposure
- Outside Ashi
- Inside Ashi
- Cross Ashi
- Saddle / Inside Sankaku
- 50/50
- Backside 50/50
- K-Guard to Matrix
- False Reap
- Secondary Leg Control
- Leg Pummeling
- Ankle Lock
- Heel Hook
- Aoki Lock Awareness
- Z-Lock Awareness
- Toe Hold
- Kneebar
- Safety Exits

I. Safety / Ruleset
- Heel Hook Safety
- False Reap Safety
- Reaping Awareness
- Knee Line Defense
- Neck Crank Recognition
- Spine Lock Awareness
- Shoulder Lock Safety
- Smother Safety
- Compression vs Strangle
- Kani Basami Safety
- Flying Attack Safety
- Slam Risk Awareness
- Late Tap Danger Signals

==================================================
PHASE 4 — UPDATE MANIFESTS
==================================================

Create or update manifests:

src/data/manifests/modernTechniqueManifest.ts
src/data/manifests/submissionManifest.ts
src/data/manifests/transitionManifest.ts
src/data/manifests/guardSystemManifest.ts
src/data/manifests/safetyManifest.ts

Each manifest item:

type PlannedTechnique = {
  id: string;
  title: string;
  category:
    | "submission"
    | "guard"
    | "passing"
    | "transition"
    | "escape"
    | "counter"
    | "ride"
    | "wrestle_up"
    | "leg_lock"
    | "front_headlock"
    | "safety"
    | "system";

  modernRelevance:
    | "core"
    | "modern_common"
    | "emerging"
    | "specialized"
    | "safety_critical"
    | "needs_review";

  status:
    | "implemented"
    | "implemented_needs_enrichment"
    | "planned"
    | "source_available"
    | "needs_research"
    | "needs_human_review"
    | "do_not_add_yet";

  priority: 1 | 2 | 3 | 4 | 5;

  riskLevel:
    | "low"
    | "medium"
    | "high"
    | "safety_critical";

  relatedPositionIds?: string[];
  relatedSkillIds?: string[];
  relatedConceptIds?: string[];
  notes?: string;
};

Rules:
- Do not expose planned techniques as pages.
- Only implemented complete skills appear in live app.
- Coverage dashboard should show planned vs implemented.

==================================================
PHASE 5 — ADD / ENRICH HIGH-PRIORITY MODERN TECHNIQUES
==================================================

Add or enrich these first.

Submissions:
1. High-Wrist Guillotine
2. Arm-In Guillotine
3. D’Arce
4. Anaconda
5. Japanese Necktie
6. Peruvian Necktie
7. Rear Triangle
8. Mounted Triangle
9. Gogoplata
10. Buggy Choke
11. Choi Bar
12. Tarikoplata
13. Straight Ankle Lock
14. Heel Hook Safety
15. Aoki Lock Awareness
16. Z-Lock Awareness
17. Smother Safety

Guards / Entries:
18. Octopus Guard
19. Clamp Guard
20. Shoulder Crunch
21. K-Guard
22. Matrix
23. False Reap
24. Shin-to-Shin
25. Single Leg X
26. X Guard
27. 50/50
28. Backside 50/50

Transitions:
29. Octopus to Dogfight
30. Octopus to Back Take
31. Clamp Guard to Triangle
32. Clamp Guard to Armbar
33. Clamp Guard to Omoplata
34. Shoulder Crunch to Sweep
35. K-Guard to Matrix
36. K-Guard to Backside 50/50
37. False Reap to Saddle
38. Saddle to Backside 50/50
39. 50/50 to Heel Exposure
40. Crab Ride to Back Take
41. Wrist Ride to Back Exposure
42. Turtle Spiral Ride to Back
43. Half Guard Underhook to Dogfight
44. Dogfight to Knee Tap
45. Dogfight to Back Take
46. Hip Heist Wrestle-Up
47. Low Single from Seated Guard
48. Bodylock Pass to Mount
49. Bodylock Pass to Back Take
50. Headquarters to Leg Drag
51. Knee Cut to Backstep
52. Front Headlock to Go-Behind

Passing / Rides:
53. Split Squat Pass
54. Float Pass
55. Long-Step Pass
56. Chest-to-Chest Half Guard Pass
57. Shin Staple Pass
58. Leg Pin Pass
59. Crab Ride
60. Wrist Ride
61. Spiral Ride
62. Claw Ride
63. Power Half Ride

Safety:
64. False Reap Safety
65. Heel Hook Defense
66. Knee Line Escape
67. Reaping Awareness
68. Neck Crank Recognition
69. Compression vs Strangle Recognition
70. Slam Risk Awareness

Do not add shallow versions.
If too many, implement first 20 deeply and mark the rest planned.

==================================================
PHASE 6 — REQUIRED DATA PER TECHNIQUE
==================================================

Every implemented technique must include:

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
- left/right where relevant
- force direction
- defender reaction
- correction cue

3. Money Details
- top 5 micro details
- clamp/angle/pressure/finish mechanics
- quality signals
- common leaks
- blackbelt mechanics where relevant

4. Outcomes & Branches
- success
- failure
- counter
- reset
- branch
- safety_abort if relevant

5. Fix It Fast
- at least 5 problems
- why it happens
- body correction
- cue
- next branch

6. Safety
Required if risk is high or safety_critical:
- risk type
- tap/release protocol
- defender recognition cues
- safety abort
- what not to force

7. Relationships
- related skills
- related positions
- related concepts
- glossary terms
- transitions/chains where relevant

8. i18n
- English
- Vietnamese
- French

==================================================
PHASE 7 — BODY POSITION REQUIREMENTS
==================================================

All modern techniques must include precise attacker/defender body-position data.

Bad:
- control the arm
- apply pressure
- use your hips
- finish the choke

Good:
- The attacker’s right hand pulls the defender’s left wrist across the defender’s centerline.
- The attacker’s left knee wedges beside the defender’s right shoulder.
- The attacker’s chest stays glued to the defender’s upper back.
- The attacker’s hips rotate toward the defender’s far hip.
- The defender’s right elbow must stay separated from their ribs before the attacker extends.

Vietnamese:
- Tay phải của attacker kéo cổ tay trái của defender qua centerline.
- Gối trái của attacker chèn sát vai phải của defender.
- Ngực của attacker dán vào lưng trên của defender.
- Hông của attacker xoay về phía hông xa của defender.

French:
- La main droite de l’attaquant tire le poignet gauche du défenseur au-delà de la ligne centrale.
- Le genou gauche de l’attaquant bloque l’épaule droite du défenseur.
- La poitrine de l’attaquant reste collée au haut du dos du défenseur.

==================================================
PHASE 8 — TECHNIQUE-SPECIFIC RESEARCH TARGETS
==================================================

When researching or enriching, focus on these key modern details:

Octopus:
- far hip wrap
- sitting angle
- crossface prevention
- hip line escape
- dogfight branch
- back take branch
- kimura trap branch

Clamp Guard:
- knee over shoulder line
- wrist control
- posture breaking
- triangle / armbar / omoplata dilemma
- shoulder clamp

Shoulder Crunch:
- shoulder line clamp
- head/posture control
- hip angle
- sweep / armbar / triangle

K-Guard / Matrix:
- hip angle
- leg threading
- knee line
- backside exposure
- matrix back take
- heel exposure only after control

False Reap:
- hip line control
- knee line safety
- secondary leg
- no blind rotation
- branch to saddle/backside 50/50

Crab Ride:
- hooks behind knees/hips
- hip steering
- wrist/ankle control
- back exposure
- mat return

Wrist Ride:
- wrist pin
- shoulder line collapse
- back exposure
- spiral ride / mat return branches

Buggy Choke:
- side control bottom context
- near arm under own leg
- leg over neck-side shoulder
- hip angle
- safety: crank vs strangle

Gogoplata:
- shin across throat line
- posture broken
- foot behind head/shoulder
- safety: neck crank awareness

Choi Bar / Tarikoplata:
- shoulder line isolation
- wrist control
- hip rotation
- elbow line exposure
- branch to triangle/omoplata/kimura
- safety: gradual shoulder/elbow pressure

Leg Locks:
- knee line
- heel exposure
- secondary leg control
- hide heel
- free knee line
- no blind spin
- safety abort

Smother / Compression:
- progressive pressure
- chest/sternum line
- breathing distress recognition
- release on tap/distress
- safety-critical labeling

==================================================
PHASE 9 — SEARCH UPDATE
==================================================

Search must index all new technique data.

Index:
- technique title
- aliases
- tags
- System Logic
- Body Position
- Money Details
- Outcomes & Branches
- Fix It Fast
- Safety
- glossary
- concepts
- transitions
- body contact cards

Search examples must work:

English:
- new no gi techniques
- modern no gi submissions
- false reap
- k guard matrix
- crab ride
- wrist ride
- shoulder crunch
- clamp guard
- octopus dogfight
- buggy choke safety
- gogoplata crank
- choi bar
- tarikoplata
- high wrist guillotine
- japanese necktie
- peruvian necktie
- bodylock pass to mount
- knee line escape
- mounted triangle choke
- mounted crucifix
- mounted cross choke
- mounted armbar  
- mounted foot lock
- mounted ankle lock
- mounted heel hook
- mounted triangle
- mounted guillot
- mounted omoplata
- mounted reverse triangle
- mounted crucifix sweep
- mounted cross choke escape
- mounted armbar escape
- mounted triangle escape
- mounted foot lock escape
- mounted ankle lock escape
- mounted heel hook escape
- mounted triangle escape
- mounted armbar escape
- mounted cross choke escape
- mounted crucifix escape
- sit out escape
- peek out escape
- granby recovery
- switch escape
- limp arm escape
- whizzer defense escape
- front headlock counter wrestle-up
- single leg x guard pass
- knee cut pass
- body lock pass
- double under pass
- stack pass
- tripod pass
- leg pin passing
- backstep passing
- shin staple passing
- torreando no gi
- float passing
- split squat passing
- outside passing
- head and arm control
- half guard underhook to dogfight
- dogfight knee tap
- dogfight back take
- octopus guard
- clamp guard
- matrix guard
- rear-triangle-finish
- rear-triangle-escape
- mounted crucifix escape
- mounted cross choke escape
- mounted armbar escape
- sit out escape
- peek out escape
- granby recovery
- switch escape
- limp arm escape
- whizzer defense escape
- front headlock counter wrestle-up
- single leg x guard pass
- knee cut pass
- body lock pass
- double under pass
- stack pass
- tripod pass
- leg pin passing
- backstep passing
- shin staple passing
- torreando no gi
- float passing
- split squat passing
- outside passing
- head and arm control
- half guard underhook to dogfight
- dogfight knee tap
- dogfight back take
- octopus guard
- clamp guard
- matrix guard
- rear-triangle-finish
- rear-triangle-escape
- mounted crucifix escape
- mounted cross choke escape
- mounted armbar escape
- side control escape
- side control stack pass
- side control armbar escape
- side control triangle escape
- side control omoplata escape
- side control kimura escape
- side control guillotine escape
- back take from side control
- back take from mount
- back take from rear mount
- front headlock control
- front headlock escape
- front headlock armbar escape
- front headlock triangle escape
- front headlock omoplata escape
- front headlock kimura escape
- front headlock guillotine escape
- front headlock counter wrestle-up
- triangle choke basics
- knee bar basics
- omoplata basics
- reverse triangle basics
- rear triangle basics
- triangle choke escape
- knee bar escape
- omoplata escape
- reverse triangle escape
- rear triangle escape
- calf slicer basics
- calf slicer escape
- calf slicer escape
- calf slicer escape
- front headlock counter wrestle-up
- body lock pass
- reverse de la riva pass
- leg drag pass
- shin staple pass
- torreando pass
- outside pass
- backstep pass
- knee cut pass



Vietnamese:
- kỹ thuật no gi hiện đại
- submission no gi mới
- false reap
- k guard matrix
- crab ride
- wrist ride
- kẹp vai
- ép vai
- đường gối
- giấu gót
- bẻ gót
- buggy choke an toàn
- gogoplata bị crank
- thoát knee line

French:
- techniques no gi modernes
- soumissions no gi modernes
- crochet de talon
- ligne du genou
- étranglement
- pression poitrine
- défense guillotine

==================================================
PHASE 10 — VALIDATION
==================================================

Update validate:data.

Fail for:
- duplicate IDs
- broken references
- missing en/vi/fr
- empty localized fields
- TODO placeholders
- implemented technique missing System Logic
- implemented technique missing Body Position
- implemented technique missing Money Details
- implemented technique missing Outcomes & Branches
- implemented technique missing Fix It Fast
- high-risk technique missing Safety
- safety-critical technique missing safety_abort
- body contact missing attackerTarget
- body contact missing defenderTarget
- missing force direction where relevant
- missing defender reaction
- shallow placeholder text

Warn for:
- planned modern technique not implemented
- technique missing video reference if video system exists
- search query returns zero results
- body-position wording too vague
- no related concept
- no related glossary term
- no transition link
- no problem map

==================================================
PHASE 11 — COVERAGE DASHBOARD
==================================================

Update /coverage.

Add modern no-gi coverage cards:

- Modern Submissions
- Modern Guards
- Modern Transitions
- Leg Lock Systems
- Front Headlock Systems
- Rides / Back Takes
- Wrestle-Ups
- Safety-Critical
- Needs Research
- Needs Human Review

Show:
- implemented
- planned
- needs enrichment
- needs safety
- missing translation
- missing search coverage

==================================================
PHASE 12 — DOCUMENTATION
==================================================

Create/update:

docs/MODERN_NOGI_RESEARCH_NOTES.md
docs/MODERN_TECHNIQUE_COVERAGE_AUDIT.md
docs/MODERN_NOGI_TECHNIQUE_TAXONOMY.md
docs/TECHNIQUE_RESEARCH_POLICY.md
docs/MODERN_NOGI_DATA_ENRICHMENT_REPORT.md

The final report should include:
- researched categories
- techniques added
- techniques enriched
- planned techniques
- safety-critical updates
- search updates
- validation updates
- remaining gaps

==================================================
IMPLEMENTATION STRATEGY
==================================================

Work in safe batches.

Batch 1:
- audit current data
- update manifests
- create taxonomy docs
- identify gaps

Batch 2:
- implement/enrich top 20 modern techniques deeply

Batch 3:
- implement/enrich next 20 techniques

Batch 4:
- update search, validation, coverage

Batch 5:
- docs/report

Do not add 100 shallow techniques.
Prefer 20 deep techniques over 100 weak ones.

==================================================
ACCEPTANCE CRITERIA
==================================================

Done when:

1. npm run build passes.
2. npm run validate:data passes if available.
3. npm run validate:search passes if available.
4. Modern technique audit exists.
5. Modern taxonomy exists.
6. Research notes exist if public sources were used.
7. Manifests updated.
8. At least 20 modern techniques are added or deeply enriched.
9. Safety-critical techniques have safety notes and safety_abort.
10. Body Position data exists for modern techniques.
11. Search finds new modern techniques.
12. Coverage dashboard shows modern no-gi categories.

==================================================
FINAL RESPONSE
==================================================

After implementation, respond with:

1. Research/audit summary.
2. Techniques added.
3. Techniques enriched.
4. Modern submissions updated.
5. Modern guards updated.
6. Modern transitions updated.
7. Safety-critical updates.
8. Search updates.
9. Coverage dashboard updates.
10. Validation result.
11. Build result.
12. Remaining recommended techniques.