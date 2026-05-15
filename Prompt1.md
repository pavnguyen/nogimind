You are working on the existing NoGi Mind app.

Goal:
Perform an aggressive production-grade redesign and hard refactor of NoGi Mind.

This is not a small cleanup.
This is a product-quality refactor.

I want the app to become cleaner, faster, more premium, more technical, more focused, and easier to learn.

Preserve valuable technical data.
Do NOT preserve bad old structure.

You are allowed to significantly restructure:
- UX/UI
- Skill Detail layout
- component architecture
- file organization
- data registries
- search architecture
- validation
- i18n structure
- performance loading strategy

But keep:
- TypeScript + Vite
- React
- English / Vietnamese / French
- English default
- language persistence
- frontend-only app
- existing valuable technical data
- /content data if present and owned by this project

Do NOT add:
- backend
- auth
- payment
- social
- video upload
- 3D
- SQLite
- personal profile/training journal/rating tracker

Keep:
- npm run build passing
- npm run validate:data passing if available
- npm run validate:search passing if available

No TODO placeholders.
No shallow filler.
No copied external content.

==================================================
HARD REFACTOR PRINCIPLE
==================================================

You should not keep old UI/component/data structure just because it exists.

If the current structure is messy, repetitive, confusing, or not production-grade, replace it.

Allowed:
- remove old top-level sections from rendering
- replace old Skill Detail layout
- create new section components
- create new view-model builders
- split huge files
- reorganize skills by category
- migrate old components into better components
- delete unused dead components after verifying no imports
- rename unclear files
- reduce navigation clutter
- simplify related knowledge
- merge blackbelt/micro/checklist data into better UI groups
- lazy-load heavy routes
- optimize MiniSearch
- reduce chunk size

Not allowed:
- deleting valuable data without migration
- breaking references
- breaking i18n
- breaking search
- breaking validation
- exporting incomplete stub skills

==================================================
NEW PRODUCT MODEL — TECHNIQUE CARD OS
==================================================

Refactor each Skill Detail page into a compact, premium learning card system.

Every technique should teach through these layers:

1. System Logic
Why this technique works.
What problem it solves.
What principle makes it work.
What must be true before attacking.

2. Body Position
Exact attacker vs defender body placement.
Attacker head/chest/hips/hands/legs.
Defender head/chest/hips/arms/legs.
Attacker body part → defender body part.
Force direction.
Correction cue.

3. Money Details
Micro details.
Blackbelt mechanics.
Clamp/angle/pressure/finish details.
Quality signals.
Common leaks.

4. Outcomes & Branches
Success.
Failure.
Counter.
Reset.
Branch.
Safety abort.
Opponent intention.
Next branch.

5. Fix It Fast
Problem-first troubleshooting.
Symptom → missing condition → body correction → cue → next branch.

6. Safety
Only top-level if relevant.
Otherwise compact chip.

7. Next Step
Compact, curated next learning items.
Not a giant related knowledge dump.

==================================================
REMOVE OLD TOP-LEVEL SECTIONS
==================================================

Remove these as separate top-level Skill Detail sections:

- Quick Start
- Micro Details
- Blackbelt Details
- Quality Checklist
- Related Knowledge
- Attacker / Defender

Do NOT delete the data.

Merge them:

Quick Start → System Logic
Micro Details → Money Details
Blackbelt Details → Money Details
Quality Checklist → Money Details + Fix It Fast
Related Knowledge → Next Step
Attacker / Defender → Body Position + Outcomes & Branches

The UI should have fewer top-level sections and more useful content per section.

==================================================
SECTION 1 — SYSTEM LOGIC
==================================================

System Logic should show:

- Goal
- 3 cues
- Problem solved
- Core principle
- Mechanical why
- Mental model
- Preconditions
- Do not do
- If it fails

It should be open by default.

It should be concise.
No long essay.
No repeated text.

Localized title:
en: System Logic
vi: Logic hệ thống
fr: Logique du système

==================================================
SECTION 2 — BODY POSITION
==================================================

This is the most important differentiator.

Rename Body-to-Body to Body Position.

Localized title:
en: Body Position
vi: Vị trí cơ thể
fr: Position du corps

Body Position must show:

Attacker Body Map:
- head
- chest
- hips
- left hand
- right hand
- left leg
- right leg

Defender Body Map:
- head
- chest
- hips
- left arm
- right arm
- left leg
- right leg

Contact Cards:
Attacker body part → Defender body part

Example:
Attacker right hand → Defender left wrist
Contact: pull / hand fight
Direction: pull across centerline
Why: removes the defensive hand
Cue: wrist across before squeeze

Writing standard:

Bad:
- control the arm
- apply pressure
- use hips
- finish the choke

Good:
- The attacker’s right hand pulls the defender’s left wrist across the defender’s centerline.
- The attacker’s left knee wedges beside the defender’s right shoulder.
- The attacker’s chest stays glued to the defender’s upper back.
- The attacker’s right elbow aligns under the defender’s chin before squeezing.

Vietnamese examples:
- Tay phải của attacker kéo cổ tay trái của defender qua centerline.
- Gối trái của attacker chèn sát vai phải của defender.
- Ngực của attacker dán vào lưng trên của defender.

French examples:
- La main droite de l’attaquant tire le poignet gauche du défenseur au-delà de la ligne centrale.
- Le genou gauche de l’attaquant bloque l’épaule droite du défenseur.
- La poitrine de l’attaquant reste collée au haut du dos du défenseur.

==================================================
SECTION 3 — MONEY DETAILS
==================================================

Money Details merges:

- microDetailSystem
- blackbeltDetails
- qualityChecklist critical items
- commonMistakes
- failureModes

Show:

A. Top 5 Money Details

B. Mechanics Groups:
- Clamp
- Angle
- Pressure
- Hand Fight
- Hip Line
- Shoulder Line
- Finish
- Escape Prevention

C. Quality Signals:
- critical check
- success signal
- failure signal
- quick fix

D. Blackbelt Mechanics:
- oneSentenceGold
- clampMechanics
- finishTips
- pressureDetails
- angleDetails
- opponentEscapePrevention

E. Common Leaks:
Leak → Why it breaks → Correction

Localized title:
en: Details
vi: Chi tiết
fr: Détails clés

==================================================
SECTION 4 — OUTCOMES & BRANCHES
==================================================

Merge:
- stateMachine
- attacker/defender
- opponent intentions
- ifThenBranches
- technique chains

Show:
- Success
- Failure
- Counter
- Reset
- Branch
- Safety Abort
- Defender intention
- Early signal
- Attacker prevention
- Next branch

Localized title:
en: Outcomes & Branches
vi: Kết quả & nhánh tiếp theo
fr: Résultats & branches

==================================================
SECTION 5 — FIX IT FAST
==================================================

Add a dedicated problem-first section.

Use:
- microDetailSystem.troubleshootingTips
- conceptualTeaching.failureModes
- qualityChecklist.failureSignal / quickFix
- commonMistakes
- stateMachine failure/counter outcomes

Card format:
Problem:
Why it happens:
Body correction:
Cue:
Next branch:

Localized title:
en: Fix It Fast
vi: Sửa nhanh
fr: Correction rapide

==================================================
SECTION 6 — SAFETY
==================================================

Safety appears as a top-level section only when relevant:

- riskLevel is high
- riskLevel is safety_critical
- safetyNotes exist
- stateMachine has safety_abort
- technique attacks neck, spine, shoulder, elbow, knee, heel, or compression

Otherwise show compact safety chip.

Safety includes:
- risk type
- tap/release protocol
- defender recognition cues
- safety abort
- what not to force
- training caution

==================================================
SECTION 7 — NEXT STEP
==================================================

Replace Related Knowledge.

Show maximum:
- 3 related skills
- 3 related concepts
- 3 glossary terms
- 1–2 chains
- 1 problem map if relevant

Prioritize:
1. missing prerequisite
2. next branch
3. common failure fix
4. same system
5. safety if relevant

No giant dump.

Localized title:
en: Next Step
vi: Bước tiếp theo
fr: Étape suivante

==================================================
ONE-MINUTE MODE
==================================================

Add compact One-Minute Mode.

Show only:
1. Goal
2. 3 cues
3. 3 most important body contacts
4. 1 finish/control trigger
5. 1 common failure
6. 1 next branch

Localized title:
en: One-Minute Mode
vi: Chế độ 1 phút
fr: Mode une minute

==================================================
VIEW-MODEL ARCHITECTURE
==================================================

Create or improve:

src/data/skills/skillViewModel.ts

Functions:

buildSystemLogicView(skill)
buildBodyPositionView(skill)
buildMoneyDetailsView(skill)
buildOutcomesBranchesView(skill)
buildFixItFastView(skill)
buildSafetyView(skill)
buildNextStepView(skill)
buildOneMinuteView(skill)

These builders must:
- merge old data fields into new UI sections
- deduplicate repeated text
- limit displayed items
- rank important content
- avoid huge nested objects
- keep SkillDetailPage small
- be memoizable
- preserve all technical data

==================================================
COMPONENT HARD REFACTOR
==================================================

Create/refactor:

src/components/skill/
  SkillDetailPageShell.tsx
  SkillHeader.tsx
  OneMinuteMode.tsx
  SystemLogicSection.tsx
  BodyPositionSection.tsx
  BodyMapPanel.tsx
  BodyContactCard.tsx
  MoneyDetailsSection.tsx
  OutcomesBranchesSection.tsx
  FixItFastSection.tsx
  SafetySection.tsx
  NextStepSection.tsx

Stop rendering:
- QuickStartSection
- MicroDetailsSection
- BlackbeltDetailsSection
- QualityChecklistSection
- RelatedKnowledgeSection
- AttackerDefenderSection

If old components are no longer used, delete them.
If deletion is risky, keep temporarily but document why.

==================================================
DATA HARD REFACTOR
==================================================

Refactor data structure if current files are large or messy.

Rules:
- One skill = one file where practical.
- Only complete skills are exported.
- Planned/incomplete skills stay in manifest only.
- Split skills by category:
  - submissions
  - passing
  - guards
  - escapes
  - wrestling
  - modern
  - safety
  - rides
- Create clean registries/selectors.
- Avoid circular imports.
- Avoid giant data index files.

==================================================
PRIORITY SKILL ENRICHMENT
==================================================

Enrich these skills first with exact attacker/defender body positioning and the new compact UI data.

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
10. Bodylock Passing
11. Knee Cut Passing
12. Side Control Escape
13. Mount Escape
14. Front Headlock Defense

Modern:
15. Octopus Guard
16. Clamp Guard
17. Shoulder Crunch
18. S-Mount Armbar
19. False Reap
20. K-Guard to Matrix
21. Saddle / Inside Sankaku
22. Crab Ride
23. Wrist Ride
24. Buggy Choke
25. Gogoplata
26. Choi Bar
27. Tarikoplata
28. Smother Safety

Technique-specific body requirements:

RNC:
- attacker chest glued to defender upper back
- attacker choking elbow under defender chin
- attacker head tight beside defender head
- attacker non-choking hand controls defender wrist
- defender shoulders blocked from reaching mat
- branch to mount/back retention if shoulders reach mat

Armbar:
- attacker knee near defender head/shoulder
- attacker second leg controls defender chest/head line
- attacker hips close to defender shoulder
- attacker hands control defender wrist
- defender thumb direction controls elbow line
- defender elbow above attacker hip line
- gradual extension for safety

Triangle:
- defender one shoulder in, one shoulder out
- attacker cuts angle toward trapped arm side
- attacker controls defender posture
- attacker foot hides behind knee
- square angle is weak

Arm Triangle:
- defender arm across centerline
- attacker head blocks defender elbow recovery
- attacker shoulder drives diagonally into defender neck line
- attacker walks hips to finish angle
- face squeeze means angle/arm position is wrong

Bodylock Passing:
- attacker hands locked low around defender hip line
- attacker head avoids shoulder crunch line
- attacker chest connects to defender hips/ribs
- attacker kills butterfly hook before advancing
- defender wants lift, frame, or knee recovery

False Reap / K-Guard:
- attacker protects own knee line
- attacker controls defender hip line
- attacker creates heel exposure only after control
- defender tries to clear knee line or hide heel
- no blind rotation

Crab Ride / Wrist Ride:
- attacker hooks behind defender knee/hip
- attacker controls wrist/ankle/hip
- attacker knees pull defender hips over hooks
- defender tries to square hips
- branch to back take or mat return

Buggy / Gogoplata / Smother:
- exact neck/shoulder/chest/head positions
- distinguish strangle/compression from crank
- defender distress/tap recognition
- safety release

==================================================
SEARCH HARD REFACTOR
==================================================

Search must remain fast after UI/data refactor.

Requirements:
- MiniSearch index cached per language
- no rebuild on every keystroke
- debounce 150–250ms
- compact search documents
- separate language docs
- Vietnamese no-diacritic normalization
- synonym expansion
- result limiting or virtualization
- grouped duplicate results
- anchors mapped to new sections

Index:
- System Logic
- Body Position
- Money Details
- Outcomes & Branches
- Fix It Fast
- Safety
- Next Step
- underlying quickCard/micro/blackbelt/checklist/stateMachine/conceptualTeaching/body contacts

Old anchors map:
- quick-start → system-logic
- micro-details → money-details
- blackbelt-details → money-details
- quality-checklist → money-details
- attacker-defender → outcomes-branches
- related-knowledge → next-step

==================================================
VALIDATION
==================================================

Update validation.

Fail for:
- missing en/vi/fr
- empty localized strings
- TODO placeholders
- body position missing for implemented core/modern skills
- body position fewer than 3 phases
- fewer than 4 contact cards
- contact missing attackerTarget
- contact missing defenderTarget
- attackerTarget.actor not attacker
- defenderTarget.actor not defender
- missing exactInstruction
- missing whyItWorks
- missing correctionCue
- safety-critical skill missing safety_abort outcome
- safety-critical skill missing safety notes

Warn for:
- vague phrase: control the arm
- vague phrase: apply pressure
- vague phrase: use your hips
- vague phrase: finish the choke
- missing left/right in key contacts
- missing attacker hips
- missing defender reaction
- too many Next Step items
- duplicated content across sections
- Money Details too long
- System Logic too long

==================================================
PERFORMANCE REQUIREMENTS
==================================================

This hard refactor must improve performance.

Requirements:
- lazy-load heavy routes
- lazy-load graph components
- memoize view-model builders
- avoid rendering full body phases until expanded
- avoid rendering all related content
- avoid giant prop objects
- split large components
- keep search index cached
- avoid all-data imports at app root
- virtualize long lists
- document bundle/chunk impact

==================================================
DOCUMENTATION
==================================================

Create/update:

docs/HARD_REDESIGN_REPORT.md
docs/SKILL_DETAIL_UX_REFACTOR.md
docs/BODY_POSITION_PRECISION_MODEL.md
docs/TECHNIQUE_CARD_OS.md
docs/SEARCH_REFACTOR_REPORT.md
docs/PRODUCTION_READINESS_REPORT.md

HARD_REDESIGN_REPORT must explain:
- what old structure was replaced
- what data was preserved
- what components were removed
- what components were created
- what UX changed
- what performance improved
- what remains to clean up

==================================================
IMPLEMENTATION STRATEGY
==================================================

This is an aggressive refactor, but keep the app buildable.

Stage 1:
Audit and identify old structure to replace.

Stage 2:
Create new view-model builders and components.

Stage 3:
Replace Skill Detail layout.

Stage 4:
Stop rendering old sections.

Stage 5:
Delete dead components if safe.

Stage 6:
Enrich priority skills with body-position precision.

Stage 7:
Update search, validation, i18n, docs.

Stage 8:
Run build and validation.

If old architecture blocks the desired product quality, replace it.

Do not keep bad structure for compatibility unless absolutely necessary.

==================================================
ACCEPTANCE CRITERIA
==================================================

Done when:

1. npm run build passes.
2. npm run validate:data passes if available.
3. npm run validate:search passes if available.
4. Skill Detail uses the new Technique Card OS.
5. Old top-level sections are removed from rendering.
6. New sections are clean and compact.
7. Body Position shows attacker/defender body maps.
8. Contact cards show attacker body part → defender body part.
9. One-Minute Mode exists.
10. Money Details merges micro, blackbelt, quality signals.
11. Fix It Fast exists.
12. Next Step replaces Related Knowledge.
13. Search anchors are updated.
14. Search remains fast.
15. i18n labels exist in en/vi/fr.
16. Priority skills have precise body-position data.
17. No valuable data is deleted.
18. Dead UI/components are removed or documented.
19. UX feels significantly more premium and less cluttered.
20. Documentation is updated.

==================================================
FINAL RESPONSE
==================================================

After implementation, respond with:

1. Hard redesign summary.
2. Old structures removed/replaced.
3. New Skill Detail structure.
4. Components created/removed.
5. Data/view-model changes.
6. Body Position improvements.
7. Priority skills enriched.
8. Search changes.
9. Validation changes.
10. Performance changes.
11. Build result.
12. Validation result.
13. Remaining cleanup suggestions.

Be bold. This is allowed to be a hard redesign. Do not preserve old UI or component structure if it makes the product worse. Preserve the valuable data, not the clutter.