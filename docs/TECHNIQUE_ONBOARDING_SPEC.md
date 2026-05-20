# Technique Onboarding Workflow

> **Purpose:** Standardize the process of researching, designing, implementing, and validating a new no-gi technique in NoGi Mind.
>
> **Scope:** Pure no-gi techniques only (not Gi-to-NoGi adaptations). Every technique added must eventually include all required data modules.
>
> **Audience:** Developers and content writers adding new techniques to the app.

---

## Table of Contents

1. [Workflow Overview](#1-workflow-overview)
2. [Phase 0: Discovery & Research](#2-phase-0-discovery--research)
3. [Phase 1: Data Setup — Manifest + Seed](#3-phase-1-data-setup--manifest--seed)
4. [Phase 2: Position Setup](#4-phase-2-position-setup)
5. [Phase 3: Core Content — SkillBuilder + MicroModules](#5-phase-3-core-content--skillbuilder--micromodules)
6. [Phase 4: Advanced Content](#6-phase-4-advanced-content)
7. [Phase 5: Technique State Machine](#7-phase-5-technique-state-machine)
8. [Phase 6: Video References](#8-phase-6-video-references)
9. [Phase 7: Positioning & Concepts](#9-phase-7-positioning--concepts)
10. [Phase 8: Validation](#10-phase-8-validation)
11. [Phase 9: i18n & Translation](#11-phase-9-i18n--translation)
12. [Safety Guidelines](#12-safety-guidelines)
13. [Checklist Summary](#13-checklist-summary)

---

## 1. Workflow Overview

```
[Discover] → [Research] → [Add to Manifest] → [Create SkillSeed]
    → [Add Positions] → [Register in SkillNodes] → [Add microDetailSystem]
    → [Add quickCard] → [Add qualityChecklist] → [Add bodyToBodyDetails]
    → [Add blackbeltDetails] → [Add technicalDetails] → [Add stateMachine]
    → [Add videoReferences] → [Link concepts] → [Validate all]
```

**Key files touched** (in order):
| Step | File |
|---|---|
| Research notes | `docs/MODERN_NOGI_RESEARCH_NOTES.md` |
| Manifest | `src/data/manifests/*.ts` (pick correct category) |
| Skill seed | `src/data/skills/<category>.ts` |
| Skill builder | `src/data/skillBuilder.ts` |
| Skill registration | `src/data/skillNodes.ts` |
| Positions | `src/data/positions.ts` |
| Micro detail system | `src/data/microDetailSystems_priority.ts` or `src/data/microDetailSystems.ts` |
| Quality checklist | `src/data/qualityChecklists.ts` |
| Technical details | `src/data/technicalDetails.ts` |
| Blackbelt details | `src/data/blackbeltDetails.ts` or `src/data/generatedBlackbeltDetails.ts` |
| State machine | `src/data/techniqueStateMachines.ts` |
| Video references | `src/data/videos/videoReferences.ts` |
| Video mapping | `src/data/videos/videoSkillMapping.ts` |
| Validation | `npm run validate:data` |
| Skill validation | `npx tsx scripts/validateSkillData.ts` |

---

## 2. Phase 0: Discovery & Research

### 2.1 Discovery Signals

Techniques can be discovered from:
- Public YouTube titles, descriptions, and thumbnails (trending techniques, common teaching points)
- Competition analysis (ADCC, IBJJF, etc.) — observe and summarize from public footage
- Internal knowledge and the `/content` folder
- Refer to `docs/TECHNIQUE_RESEARCH_POLICY.md` for full guidelines

### 2.2 Structured Research (Mandatory)

**Goal:** Understand the technique well enough to write original content.

**Research deliverables:**

1. **Find 3+ high-quality sources:**
   - Public YouTube instructionals from trusted channels (see `trustedNoGiChannels` in `src/data/videos/videoSkillMapping.ts`)
   - Competition footage showing the technique
   - Cross-reference with existing `docs/MODERN_NOGI_RESEARCH_NOTES.md`

2. **Write a research summary** covering:
   - Technique name and alternative names
   - Body positions involved (source position → target position)
   - Primary mechanics: which body part does what, force direction, pressure line
   - Key body-to-body contact points
   - Common mistakes and failure points
   - Safety concerns (if any)
   - Prerequisite skills (skills the user should know first)
   - Related concepts linked already in the app

3. **Record research in the designated file:**
   - Append to `docs/MODERN_NOGI_RESEARCH_NOTES.md`
   - Format:
     ```
     ## [Technique Name]
     - Discovered: YYYY-MM-DD
     - Sources:
       - [Title] ([URL])
       - [Title] ([URL])
       - [Title] ([URL])
     - Source Types: Public Video, Competition, etc.
     - Summary: [2-3 sentence original summary]
     - Modern Meta Relevance: [why this matters now]
     - Prerequisite Skills: [skill1, skill2]
     - Risk Level: low | medium | high | safety_critical
     - Flag for human review: yes | no
     ```

### 2.3 Prohibited Practices 🔴

From `docs/TECHNIQUE_RESEARCH_POLICY.md`:
- **No direct copying** of transcripts, paid instructional content, or books
- **No proprietary wording** — do not use trademarked phrasing
- **No copyright infringement** — do not copy from BJJGraph or similar apps
- **No piracy** — do not link to or embed pirated video content
- **No AI filler** — every detail must be practical and execution-precise

### 2.4 Technique Categorization

Determine these fields during research (they map directly to data types):

| Field | Possible values | Source |
|---|---|---|
| `domain` | positional_awareness, survival_defense, escapes, guard_retention, guard_offense, wrestle_up_wrestling, passing, pins_rides, back_control, submission_systems | `SkillDomain` in `src/types/skill.ts` |
| `level` | beginner, intermediate, advanced | `SkillLevel` |
| `libraryTier` | core, modern_expansion, advanced_niche, safety_critical | `LibraryTier` |
| `metaStatus` | fundamental, modern_common, emerging, specialized, experimental | `MetaStatus` |
| `riskLevel` | low, medium, high, safety_critical | `RiskLevel` |
| `techniqueFamily` | guard, passing, submission, back_take, ride, wrestling, leg_lock, front_headlock, escape, pin, scramble, safety, compression, ruleset | `TechniqueFamily` |
| `modernSystemGroup` | octopus, clamp_guard, shoulder_crunch, s_mount, k_guard, matrix, false_reap, leg_lock, crab_ride, wrist_ride, x_guard, single_leg_x, front_headlock, wrestle_up, modern_passing, turtle_ride, smother, back_triangle, counter_wrestling, safety | `ModernSystemGroup` (only for modern system techniques) |

---

## 3. Phase 1: Data Setup — Manifest + Seed

### 3.1 Update the Manifest

Locate the correct manifest file based on `techniqueFamily`:

| Family | Manifest file |
|---|---|
| submission | `src/data/manifests/submissionManifest.ts` |
| guard | `src/data/manifests/guardSystemManifest.ts` |
| passing | `src/data/manifests/transitionManifest.ts` (if applicable) |
| ride, back_take, wrestling | `src/data/manifests/transitionManifest.ts` |
| safety | `src/data/manifests/safetyManifest.ts` |
| other / general | `src/data/manifests/modernTechniqueManifest.ts` |

Change the technique's `status` from `"planned"` to `"implemented"` (or `"implemented_needs_enrichment"` if only partial). If the technique does not exist in any manifest, add it with `status: "implemented"`.

### 3.2 Create the SkillSeed

Add a `SkillSeed` entry in the appropriate category file under `src/data/skills/`:

| File | Content |
|---|---|
| `foundation.ts` | Foundational skills |
| `guard.ts` | Guard techniques |
| `passing.ts` | Passing techniques |
| `submissions.ts` | Submission techniques |
| `escapes.ts` | Escape techniques |
| `pins.ts` | Pin and ride techniques |
| `wrestling.ts` | Wrestling / takedown techniques |
| `legLocks.ts` | Leg lock techniques |
| `priorityNoGi.ts` | Priority modern no-gi techniques |
| `modern.ts` | Modern expansion techniques |

**Seed template** (using `seed()` factory from `skillSeedFactory.ts`):

```typescript
seed(
  '<technique-id>',          // kebab-case unique ID
  '<Vietnamese title>',      // vi title
  '<English title>',         // en title
  '<French title>',          // fr title
  '<domain>',                // SkillDomain value
  '<level>',                 // 'beginner' | 'intermediate' | 'advanced'
  ['tag1', 'tag2', 'tag3'],  // tags array
  '<Vietnamese description>',// shortDescription (vi)
  '<English description>',   // shortDescription (en)
  '<French description>',    // shortDescription (fr)
  '<Vietnamese goal>',       // primaryGoal (vi)
  '<English goal>',          // primaryGoal (en)
  '<French goal>',           // primaryGoal (fr)
  ['concept1', 'concept2'],  // related concept IDs
  ['prereq1', 'prereq2'],    // prerequisite skill IDs
  ['related1', 'related2'],  // related skill IDs
)
```

**⚠️ Prerequisites policy:**
- `safety_critical` techniques **must** have at least 1 prerequisite
- `advanced_niche` techniques **should** have prerequisites
- Other tiers: prerequisites are optional but recommended
- See `validateData.ts` for exact validation rules

### 3.3 Register in SkillNodes

The `SkillSeed` is consumed by `src/data/skillNodes.ts`. Add the seed array to the imports and spread it into `coreSkillSeeds`:

```typescript
import { myNewSkillSeeds } from './skills/<file>'

const coreSkillSeeds = [
  // ...existing seeds
  ...myNewSkillSeeds,
]
```

If the technique is part of the "priority no-gi" set, also add it to `priorityNoGiSkillSeeds`.

### 3.4 Update SkillBuilder

If the technique needs **auto-generated content** from `skillBuilder.ts`, add entries for:
- `quickCardFor()` — auto-generates quick card from seed data
- `conceptList()` — resolves concept IDs to localized strings
- `checklistFor()` — generates body checklist
- `dangerSignalsFor()` — generates default danger signals
- `mistakesFor()` — generates common mistakes
- `decisionTreeFor()` — generates decision branches from failure responses
- `failuresFor()` — generates failure responses
- `drillsFor()` — generates drill suggestions
- `testsFor()` — generates skill tests

If the technique needs custom (non-auto-generated) data for any of these, add special-case logic in the corresponding builder function.

---

## 4. Phase 2: Position Setup

### 4.1 Check Position Coverage

Before adding the technique, check if its **source position** and **target position** exist:

1. Source position: where the technique starts from (e.g., `de-la-riva-guard` for berimbolo)
2. Target position: where the technique ends (e.g., `back-control` for berimbolo)

Look in `src/data/positions.ts`. If either position does not exist:

### 4.2 Add New Position (if needed)

Add a position entry following the existing pattern in `src/data/positions.ts`:

```typescript
{
  id: '<position-id>',
  title: lt('<vi>', '<en>', '<fr>'),
  shortDescription: lt('<vi>', '<en>', '<fr>'),
  topPlayerGoal: lt('<vi>', '<en>', '<fr>'),
  bottomPlayerGoal: lt('<vi>', '<en>', '<fr>'),
  dangerSignals: la(['<vi>'], ['<en>'], ['<fr>']),
  relatedSkillIds: ['<skill-id>'],
  relatedPositionIds: ['<position-id>'],
  relatedConceptIds: ['<concept-id>'],
}
```

### 4.3 Link Position to Technique

Update the technique's `SkillNode` to include `relatedPositionIds`.

---

## 5. Phase 3: Core Content — SkillBuilder + MicroModules

These are the **mandatory** data modules that every implemented technique must have:

### 5.1 Micro Detail System

Add a `MicroDetailSystem` entry. The system lives in one of:
- `src/data/microDetailSystems_priority.ts` (for priority no-gi techniques)
- `src/data/microDetailSystems.ts` (for other techniques)
- `src/data/microDetailSystems_armbar_triangle.ts` (for armbar/triangle related)
- `src/data/microDetailSystems_omoplata.ts` (for omoplata related)

**Minimum requirements** (validated by `validateData.ts`):
- `topFiveDetails`: at least 5 items
- `leftRightGuides`: at least 2 items
- `troubleshootingTips`: at least 5 items
- `doNotDo`: at least 5 items per language
- `safetyNotes`: at least 3 items per language
- `fastFinishPaths`: required for submission techniques

**Micro detail template:**
```typescript
md(
  '<detail-id>',           // unique kebab-case ID
  '<category>',            // MicroDetailCategory: hand, elbow, head, shoulder, chest, hip, knee, foot, angle, pressure, timing, grip, hook, finish, escape, safety, body, leg, calf
  lt('<vi>', '<en>', '<fr>'),  // title
  lt('<vi>', '<en>', '<fr>'),  // shortInstruction — must name body part + direction
  '<side>',                // left | right | near | far | inside | outside | both | either | center
  '<direction>',           // ForceDirection value
  ['bodyPart1', 'bodyPart2'], // body parts involved
  lt('<vi>', '<en>', '<fr>'),  // whenToUse
  lt('<vi>', '<en>', '<fr>'),  // whyItWorks
  lt('<vi>', '<en>', '<fr>'),  // commonMistake
  lt('<vi>', '<en>', '<fr>'),  // correctionCue
  lt('<vi>', '<en>', '<fr>'),  // liveCue — keep under 80 chars per language
  lt('<vi>', '<en>', '<fr>'),  // safetyNote (optional)
)
```

**Writing guidelines:**
- Every instruction should name which body part acts, which direction force goes, and what mistake kills the detail
- Keep `liveCue` short (under 80 chars) — these are for live rolling recall
- Use the `lt()` helper for all localized text
- Keep BJJ proper nouns in English per [i18n policy](#9-phase-9-i18n--translation)

### 5.2 Quick Card

Add a `QuickCard` to the technique or let `skillBuilder.ts` generate it from seed data.

**Minimum requirements** (validated):
- `goal`: meaningful localized text
- `threeCues`: exactly 3 localized cues per language
- `doNotDo`: localized safety note
- `ifItFails`: what to do if the technique fails
- `safetyReminder`: required for safety_critical techniques

For techniques with auto-generated quick cards, ensure `skillBuilder.ts` has the right logic.

### 5.3 Quality Checklist

Add a `TechniqueQualityChecklist` to `src/data/qualityChecklists.ts`.

**Minimum requirements:**
- `checks`: at least 6 items
- `critical` severity checks: at least 2
- `overview`: localized text
- `passThreshold`: number (e.g., 0.7)
- `ifPassed` / `ifFailed`: localized text

**Check template:**
```typescript
{
  id: '<check-id>',
  title: lt('<vi>', '<en>', '<fr>'),
  question: lt('<vi>', '<en>', '<fr>'),
  successSignal: lt('<vi>', '<en>', '<fr>'),
  failureSignal: lt('<vi>', '<en>', '<fr>'),
  quickFix: lt('<vi>', '<en>', '<fr>'),
  bodyParts: ['head', 'hips', 'knees'],  // BodyPartKey values
  relatedMicroDetailIds: ['<detail-id>'],  // optional, link to micro details
  severity: 'critical' | 'major' | 'minor',
}
```

**⚠️ Placement:** The technique ID must be in `qualityChecklistTargets` set in `validateData.ts` for validation to fire. If the technique is new, add it there.

---

## 6. Phase 4: Advanced Content

### 6.1 Body-To-Body Details

Add a `BodyToBodyDetailSystem` to the technique's data (usually inline in the skill definition or auto-generated by `skillBuilder.ts`).

**Minimum requirements:**
- `phases`: at least 3 phases
- Each phase must have contacts that include `myBodyPart`, `opponentBodyPart`, `contactType`, `exactInstruction`, `whyItWorks`, `commonMisplacement`, `correctionCue`, `liveCue`
- `exactInstruction` must explicitly name "my body part" and "opponent body part"
- Total contacts across all phases: at least 4

**Contact writing standard** (from `docs/CONTENT_STYLE_GUIDE.md`):
> **Good:** "My right hand pulls the opponent's left wrist across centerline."
> **Weak:** "Control the arm."

### 6.2 Blackbelt Details

Add a `BlackbeltDetailSystem` for clamp, pressure, angle, and finishing mechanics.

**Minimum sections:**
- `overview`: localized
- `clampMechanics`: array of `ClampMechanic` items
- `finishTips`: array of `FinishTip` items
- `pressureDetails`: array of `PressureDetail` items
- `angleDetails`: array of `AngleDetail` items
- `opponentEscapePrevention`: array of escape → prevention pairs
- `oneSentenceGold`: a single, memorable localized sentence

### 6.3 Technical Details

Add a `TechnicalDetailsSystem` for advanced mechanical breakdown.

**Minimum requirements:**
- `keyDetails`: at least 10 items (for technical target skills)
- `microAdjustments`: at least 5 items
- `commonFailurePatterns`: at least 5 items per language
- `liveCues`: at least 5 items per language
- `coachNotes`: at least 3 items per language
- `finishingMechanics`: required for submission targets

The technique ID must be in `technicalTargetSkillIds` set in `validateData.ts` for validation to fire.

---

## 7. Phase 5: Technique State Machine

Add a `TechniqueStateMachine` entry to `src/data/techniqueStateMachines.ts`.

### 7.1 Structure

Each state machine requires:
- `id`: unique ID (usually `{skillId}-state-machine`)
- `skillId`: the technique ID
- `fromPositionId`: the starting position ID (optional, but good practice)
- `startingRole`: `'attacker'` | `'defender'` | `'top'` | `'bottom'` | `'neutral'`
- `outcomes`: at least 3 outcomes
- `attacker` role perspective: `RolePerspectiveData` with:
  - `goal` (localized, ≥20 chars)
  - `recognitionCues` (localized array)
  - `primaryActions` (localized array)
  - `commonErrors` (array of error objects)
  - `knowledgeChecks` (array of check objects)
- `defender` role perspective: same shape as attacker
- `trainingProgressions`: at least 1 progression

### 7.2 Outcomes

Each outcome must specify:
- `id`: unique within the state machine
- `result`: `'success'` | `'failure'` | `'counter'` | `'reset'` | `'safety_abort'` | `'branch'`
- `label`: localized short label
- `explanation`: localized explanation
- `triggerSignal`: what signal triggers this outcome
- One of: `toSkillId`, `toPositionId`, `toSubmissionId`, `toProblemId`, `toSafetyNoteId`
- `confidence`: `'low'` | `'medium'` | `'high'`

### 7.3 Safety-Critical Requirements

If the technique is safety-critical:
- Must have a `safety_abort` outcome with `toSafetyNoteId`
- Must have attacker + defender knowledge checks where `safetyCritical: true`
- The defender perspective must be present

### 7.4 Helper Functions

Use the helper functions at the top of `techniqueStateMachines.ts`:
- `machine(spec)` — creates a full state machine from a `Spec` object
- `outcome(id, result, label, explanation, triggerSignal, target, confidence)` — creates an outcome
- `role(name, goal, cues, actions, safety)` — creates a role perspective
- `check(question, answer, safetyCritical)` — creates a knowledge check
- `progressions(safety)` — creates standard training progressions

---

## 8. Phase 6: Video References

### 8.1 Video Curation Rules (from `docs/VIDEO_CURATION_GUIDE.md`)

- Use public YouTube URLs only
- Prefer official/public channels, safety explanations, high-quality competition examples
- **No** pirated course footage, paid instructional reuploads, private/unlisted videos
- 1-3 strong references per skill
- Write original `whyUseful` and `whatToWatchFor` notes (do not copy descriptions)

### 8.2 Add Video References

Edit `src/data/videos/videoReferences.ts` to add entries, following the existing pattern:

```typescript
{
  id: '<unique-video-id>',
  provider: 'youtube',
  title: lt('<vi>', '<en>', '<fr>'),
  channelName: '<channel-name>',
  url: 'https://www.youtube.com/watch?v=<youtubeId>',
  embedUrl: 'https://www.youtube.com/embed/<youtubeId>',
  youtubeId: '<youtubeId>',
  language: 'en',
  relatedSkillIds: ['<skill-id>'],
  relatedPositionIds: ['<position-id>'],  // optional
  techniqueTags: ['tag1', 'tag2'],
  relevance: 'primary_reference' | 'supplemental' | 'safety_reference',
  level: 'beginner' | 'intermediate' | 'advanced',
  whyUseful: lt('<vi>', '<en>', '<fr>'),
  whatToWatchFor: la(['<vi>'], ['<en>'], ['<fr>']),
  caution: lt('<vi>', '<en>', '<fr>'),  // optional, for safety-critical techniques
  timestamps: [
    { id: 'full-video', label: lt('Full technique breakdown', '...', '...'), timeSeconds: 0 },
    // optional: add specific timestamps for key moments
  ],
  sourceNote: 'Curated No-Gi YouTube reference.',
}
```

### 8.3 Semi-Automated Candidate Workflow

If you have a `YOUTUBE_API_KEY` configured:

```bash
npx tsx scripts/collectVideoCandidates.ts
```

This writes candidates to `content/video-candidates.json`. Candidates are **never** production data until manually reviewed and added to `videoReferences.ts`.

**Search queries to try** (from `docs/VIDEO_CURATION_GUIDE.md`):
```
no gi <technique> details
<technique> no gi mechanics
<technique> setup no gi
```

### 8.4 Update Video-to-Skill Mapping

Add mapping rules in `src/data/videos/videoSkillMapping.ts`:

```typescript
{ patterns: ['<keyword1>', '<keyword2>'], skillId: '<skill-id>' },
{ patterns: ['<keyword3>', '<keyword4>'], skillId: '<skill-id>', aliases: ['<alias-skill-id>'] },
```

The mapping is used by `mapVideoToSkills()` which checks title/technique-tags for pattern matches and assigns confidence scores.

### 8.5 Validate Video Coverage

```bash
npx tsx scripts/checkGaps.mjs
```

This script reads `videoReferences.ts` and counts references per skill. Ensure the new technique has at least 1 video reference.

---

## 9. Phase 7: Positioning & Concepts

### 9.1 Link Existing Concepts

Ensure the technique links to existing concepts in `src/data/concepts.ts` via `relatedConceptIds`. Common concepts:

| Concept ID | Description |
|---|---|
| positional-hierarchy | Positional hierarchy |
| inside-position | Controlling the inside line |
| connection-before-control | Establishing connection before control |
| base-and-balance | Maintaining base and balance |
| angle-creation | Creating angles |
| pressure-direction | Direction of pressure |
| guard-retention-layers | Layers of guard retention |

If no existing concept fits, consider adding a new concept.

### 9.2 Add to Related Positions

Update the relevant position's `relatedSkillIds` in `src/data/positions.ts` to include the new technique.

### 9.3 Add Glossary Terms (if needed)

If the technique introduces new terminology not covered by existing `src/data/glossaryTerms.ts`, add glossary entries.

---

## 10. Phase 8: Validation

### 10.1 TypeScript Type Check

```bash
npx tsc --noEmit
```

Fix any type errors before proceeding.

### 10.2 Data Validation

```bash
npm run validate:data
```

This checks:
- Localized fields (vi/en/fr exist and are non-empty)
- Unique IDs across all data sets
- Broken references (relatedSkillIds, prerequisites, conceptIds, positionIds)
- Micro detail counts (≥5 topFiveDetails, ≥2 leftRightGuides, ≥5 troubleshootingTips)
- Quick card cue counts (exactly 3)
- Quality checklist depth (≥6 checks, ≥2 critical)
- Body-to-body contact structure (≥3 phases, ≥4 contacts)
- State machine completeness (≥3 outcomes, perspectives)
- Video references (YouTube URL validity, localized fields, linked IDs)
- Safety-critical checks (safety aborts, defender perspective, safety notes)
- Duplicate content detection
- Placeholder text detection

**Common errors to watch for:**
- Missing ID in any of the `validateData.ts` target sets (e.g., `technicalTargetSkillIds`, `qualityChecklistTargets`, `microDetailTargets`)
- Broken references to skills/positions/concepts that don't exist
- Insufficient item counts (micro details, checklist items, etc.)
- Vague language detection (e.g., "control the arm", "apply pressure")

### 10.3 Skill Data Validation

```bash
npx tsx scripts/validateSkillData.ts
```

This checks:
- Missing translations
- Missing related IDs
- Missing prerequisite IDs
- Body mechanics completeness
- Phase depth
- Empty strings and placeholder detection

### 10.4 Video Validation (included in validate:data)

The `validateData.ts` script already validates videos. Additional manual checks:
- Confirm the YouTube URL is public and accessible
- Verify `relatedSkillIds` lists the new technique
- Ensure `whyUseful` is original text (not copied from description)
- Check that `timestamps` array is not empty

---

## 11. Phase 9: i18n & Translation

### 11.1 General Rules

Every data module uses `lt(vi, en, fr)` and `la(vi[], en[], fr[])`. All three languages must be filled for every localized field.

### 11.2 BJJ Terminology: Keep English

Per `docs/CONTENT_STYLE_GUIDE.md` and established policy, keep the following in English:

| Category | Examples |
|---|---|
| BJJ position names | guard, mount, side control, turtle, scramble, back control, half guard |
| BJJ submission names | RNC, armbar, triangle, guillotine, kimura, omaplata, heel hook, ankle lock |
| BJJ system names | Octopus, Clamp Guard, K-Guard, Matrix, Crab Ride, S-Mount |
| BJJ mechanical terms | underhook, crossface, bodylock, frame, wedge, hook, post, grip |
| Anatomy as BJJ terms | knee line, hip line, shoulder line, centerline |
| Common BJJ actions | bridge, shrimp, post, pummel, shelf, staple, branch, reset, tap |
| Proper noun techniques | D'Arce, Anaconda, Choi Bar, Tarikoplata, Gogoplata, Buggy Choke |
| Safety terminology | roll, tap, submission, cage, mat |

### 11.3 Vietnamese: Translate Descriptive Text

For Vietnamese (`vi` field), translate the descriptive text around BJJ terms. Examples:

| English | Vietnamese |
|---|---|
| Hide the heel before rotating | Giấu gót chân trước khi xoay |
| Pull wrist across centerline | Kéo wrist qua centerline |
| Keep the knee line safe | Giữ knee line an toàn |
| Tap early, train slow | Tap sớm, tập chậm |

### 11.4 French: Similar Pattern

Keep common grappling terms in English (same list as above), translate surrounding context:

| English | French |
|---|---|
| Keep the clamp tight | Garder le clamp serré |
| Hide the heel | Cacher le talon |
| Release on tap | Relâcher au tap |

### 11.5 When in Doubt

- If a term is recognizable globally in BJJ, keep English
- If a term is descriptive/generic (e.g., "pressure", "angle", "timing"), translate
- Refer to existing translations in `src/i18n/resources/vi.ts` and `src/i18n/resources/fr.ts` for consistency

---

## 12. Safety Guidelines

Safety content is documented in:
- `docs/NOGI_MIND_CONTENT_STANDARD.md` (submission standard, state machine standard)
- `docs/CONTENT_STYLE_GUIDE.md` (safety phrases)
- `scripts/validateData.ts` (safety validation rules)
- `src/data/manifests/safetyManifest.ts` (safety technique planning)

### 12.1 Required Safety Phrases

Every safety-sensitive technique should include these phrases where appropriate:
- `apply gradually`
- `release on tap or distress`
- `tap early`
- `do not crank`
- `do not spin blindly`
- `clear knee line before rotation`
- `train under qualified supervision`

### 12.2 Do Not Do

- Do not give medical advice
- Do not teach sudden torque, blind rotation, or neck/spine cranking as normal finishing mechanics

### 12.3 High-Risk Technique Requirements

For techniques with `riskLevel: 'safety_critical'` or `'high'`:
- `microDetailSystem.safetyNotes` must have at least 3 items
- State machine must have `safety_abort` outcome
- Both attacker and defender perspectives must have `knowledgeChecks`
- At least one knowledge check must be `safetyCritical: true`
- Video references must include at least one `safety_reference` relevance entry

---

## 13. Checklist Summary

### Pre-Implementation
- [ ] Research: 3+ sources identified, summary written
- [ ] Research notes appended to `docs/MODERN_NOGI_RESEARCH_NOTES.md`
- [ ] Technique categorization determined (domain, level, tier, family, etc.)

### Data Setup
- [ ] Manifest updated (status changed to `implemented`)
- [ ] Skill seed added to `src/data/skills/<category>.ts`
- [ ] Seed imported and spread in `src/data/skillNodes.ts`
- [ ] `skillBuilder.ts` updated if auto-generation needed

### Positions
- [ ] Source position exists (or added to `src/data/positions.ts`)
- [ ] Target position exists (or added)
- [ ] Technique linked to positions via `relatedPositionIds`

### Core Content
- [ ] MicroDetailSystem added (≥5 details, ≥2 guides, ≥5 tips, ≥5 doNotDo, ≥3 safetyNotes)
- [ ] QuickCard added (goal, 3 cues, doNotDo, ifItFails)
- [ ] QualityChecklist added (≥6 checks, ≥2 critical)
- [ ] Technique ID in `qualityChecklistTargets` set

### Advanced Content
- [ ] BodyToBodyDetails added (≥3 phases, ≥4 contacts)
- [ ] BlackbeltDetails added (clamp, finish, pressure, angle, prevention)
- [ ] TechnicalDetails added (≥10 keyDetails, ≥5 microAdjustments, ≥5 patterns, ≥5 cues, ≥3 notes)
- [ ] Technique ID in `technicalTargetSkillIds` set

### State Machine
- [ ] State machine added to `techniqueStateMachines.ts`
- [ ] ≥3 outcomes with valid result types
- [ ] Attacker + defender perspectives with goal, cues, actions, errors, knowledgeChecks
- [ ] Safety-critical: safety_abort + safetyCritical knowledge checks

### Video References
- [ ] 1-3 video references added to `videoReferences.ts`
- [ ] Mapping rules added to `videoSkillMapping.ts`
- [ ] Original `whyUseful` and `whatToWatchFor` written
- [ ] Safety-critical: safety_reference video included

### Concepts & Glossary
- [ ] Related concept IDs linked
- [ ] New glossary terms added if needed
- [ ] Position `relatedSkillIds` updated

### i18n
- [ ] All `lt()` and `la()` calls filled for vi/en/fr
- [ ] BJJ proper nouns kept in English
- [ ] Descriptive text translated appropriately
- [ ] Content style guide followed

### Validation
- [ ] `npx tsc --noEmit` — passes
- [ ] `npm run validate:data` — 0 errors
- [ ] `npx tsx scripts/validateSkillData.ts` — 0 errors
- [ ] Video coverage checked (`npx tsx scripts/checkGaps.mjs`)
- [ ] Final code review completed

---

*Generated: 2026-05-14*
*Based on: Technique Onboarding Workflow user interview*
