# New Modern No-Gi Skills — Specification Document

**Date:** 2026-05-28  
**Author:** Buffy (AI) via user interview  
**Status:** Draft — ready for review and approval

---

## 1. Background

NoGiMind is a no-gi BJJ knowledge app currently containing **~95+ skills** across 10 domains. The user (a coach/instructor) wants to add **modern skills (2020–2026)** to fill gaps in the app's coverage. This spec defines the scope, priorities, and technical requirements for adding **15–25 new skills** in a first phase.

---

## 2. User Preferences (from Interview)

| Dimension | Preference |
|-----------|-----------|
| **Quality vs Quantity** | Depth — rich content from the start |
| **Domain Focus** | All domains (distribute evenly) |
| **Target Role** | Coach / Instructor (teachable content for multiple levels) |
| **Time Period** | Only modern (2020–2026) |
| **Inclusion Criteria** | As broad as possible — mainstream + niche with teaching value |
| **Content Depth** | Full: summary, body mechanics, system connections, common mistakes, tags, safety notes |
| **Videos** | Find & attach YouTube refs from trusted channels from the start |
| **Granularity** | Fine-grained — separate skills per technique/subsystem |
| **Phase Size** | 15–25 skills |
| **Localization** | EN + VI + FR from the start |
| **Content Sections** | Must include: body mechanics detail, common mistakes & fixes, system connections |

---

## 3. Proposed Skills (18 total, organized by domain)

### Domain: passing
| # | Skill ID | Proposed Name | Rationale |
|---|----------|---------------|-----------|
| 1 | `toreando-passing` | Toreando / Float Passing | Modern athletic passing staying on feet — gap vs existing pressure-based passes |
| 2 | `tripod-folding-pass` | Tripod / Folding Pass | Head-down tripod base to fold guard — very common modern meta |
| 3 | `over-under-pass` | Over-Under / Smash Pass | Classic revived with modern refinements — half guard pressure passing |

### Domain: wrestle_up_wrestling
| # | Skill ID | Proposed Name | Rationale |
|---|----------|---------------|-----------|
| 4 | `double-leg-bjj` | Double Leg for BJJ | Double leg adapted with guillotine defense — big gap vs existing single leg |
| 5 | `bjj-foot-sweeps` | BJJ Foot Sweeps | Foot sweep entries for BJJ — modern wrestling integration trend |
| 6 | `lateral-drop-headlock-throw` | Lateral Drop / Headlock Throw | High percentage BJJ takedown — missing from existing wrestling skills |

### Domain: guard_offense
| # | Skill ID | Proposed Name | Rationale |
|---|----------|---------------|-----------|
| 7 | `coyote-half-guard` | Coyote Half Guard | Deep hook system from half guard — extremely popular modern system |
| 8 | `berimbolo-back-take` | Berimbolo / Inversion Back Take | Specific DLR inversion mechanics — existing DLR back take is more general |
| 9 | `k-guard-to-outside-ashi` | K-Guard to Outside Ashi | K-guard → outside ashi heel hook entry — important system connection |

### Domain: submission_systems
| # | Skill ID | Proposed Name | Rationale |
|---|----------|---------------|-----------|
| 10 | `inside-outside-heel-hook` | Inside & Outside Heel Hook Finishing | Detailed finishing mechanics — existing heel hook safety is safety-focused only |
| 11 | `toe-hold-system` | Toe Hold / Estima Lock | Complete toe hold system with Estima lock variant |
| 12 | `calf-slicer-system` | Calf Slicer / Compression Locks | Compression submission system — only bear trap exists |
| 13 | `mounted-triangle` | Mounted Triangle | Triangle choke from mount — specific high-percentage finish |
| 14 | `peruvian-necktie` | Peruvian Necktie | Front headlock finish — complements existing D'Arce/Anaconda/Guillotine |
| 15 | `body-triangle-control` | Body Triangle Control | Body triangle as separate control/submission system |

### Domain: pins_rides
| # | Skill ID | Proposed Name | Rationale |
|---|----------|---------------|-----------|
| 16 | `chin-strap-control` | Chin Strap / Head Control System | Chin strap dominance — key modern passing & turtle breaking tool |

### Domain: back_control
| # | Skill ID | Proposed Name | Rationale |
|---|----------|---------------|-----------|
| 17 | `gift-wrap-back-take` | Gift Wrap / Arm Drag Back Take | Gift wrap entries to back — fundamental modern back take path |
| 18 | `leg-drag-to-back-take` | Leg Drag to Back Take | Leg drag → back take chain — connects passing to back control |

### Domain: escapes
| # | Skill ID | Proposed Name | Rationale |
|---|----------|---------------|-----------|
| 19 | `turtle-to-guard-recovery` | Turtle to Guard Recovery | Escape from turtle back to guard — complements existing turtle-escape-standup |

### Technical note: 80/20 Position
The **80/20 leg control position** is a variation of the outside ashi position. Rather than a standalone skill, it should be integrated as a key positional detail within the `inside-outside-heel-hook` or `k-guard-to-outside-ashi` skill content (as a transition phase or specific control detail).

---

## 4. Content Requirements Per Skill

Each new skill directory must contain:

```
content/skills/{domain}/{skill-id}/
├── skill.json              # Metadata (id, domain, level, tags, relations)
├── content.en.json         # English content
├── content.vi.json         # Vietnamese content
├── content.fr.json         # French content
└── videos.json             # Video references (optional but preferred)
```

### Required Fields in `skill.json`

```jsonc
{
  "id": "kebab-case-id",
  "domain": "domain_name",
  "level": "beginner | intermediate | advanced",
  "name": "Display Name",
  "aliases": [],
  "keywords": [],
  "tags": [
    // Required prefixes:
    "tier:modern-expansion | advanced-niche | safety-critical",
    "meta:modern-common | emerging | specialized | experimental",
    "risk:low | medium | high | safety-critical",
    "family:...",
    "group:...",
    "modern-no-gi"
  ],
  "modernSystemGroup": "...", // From ModernSystemGroup type
  "relatedSkills": [
    { "id": "existing-skill-id", "type": "prerequisite | supporting | chain | alternative | recommended" }
  ],
  "prerequisiteSkillIds": [],
  "nextSkillIds": [],
  "relatedPositions": [],
  "relatedConcepts": [],
  "archetypeIds": [],
  "trainingMethodIds": [],
  "featureFlags": {
    "hasMicroDetails": false,
    "hasChecklist": false,
    "hasVideos": true,
    "hasStateMachine": false
  },
  "contentRefs": { "videos": "videos.json" },
  "sortOrder": null
}
```

### Required Content in `content.{locale}.json`

```jsonc
{
  "id": "skill-id",
  "locale": "en | vi | fr",
  "name": "Display Name",
  "shortName": "optional",
  "description": "Full technical description suitable for coaching (what, why, when)",
  "shortInstruction": "One-sentence mat-ready instruction",
  "summary": "2-3 sentence summary for manifest/listing",
  "whyItWorks": [
    "Mechanical reasons — body placement, angle, pressure, timing",
    "Not strategic value statements"
  ],
  "commonMistakes": [
    "Observable errors — what the coach sees when it goes wrong"
  ],
  "coachingCues": [
    "Short imperative cues for live correction"
  ],
  "safetySummary": [
    "Injury mechanisms and safe training practices"
  ],
  "keyCorrections": [
    "One corrective action per common failure"
  ],
  "fixItFast": [
    "Quick fixes for when the technique stalls in rolling"
  ],
  "moneyDetails": [
    "Body placement, angle, pressure, timing specifics"
  ],
  "systemLogic": {
    "corePrinciple": "Mechanical principle core to the skill",
    "decisionTree": [
      { "condition": "When opponent does X", "action": "Do Y" }
    ],
    "exitStrategies": ["When to abandon and what to do next"]
  }
}
```

### Tag Conventions

**Tier tags:**
- `tier:modern-expansion` — Core modern systems that are well-established
- `tier:advanced-niche` — Specialized, lower-percentage, or experimental
- `tier:safety-critical` — Potentially dangerous, safety content required

**Meta-status tags:**
- `meta:modern-common` — Widely used in modern competition
- `meta:emerging` — Newer techniques gaining adoption
- `meta:specialized` — Niche but effective
- `meta:experimental` — Unproven at highest levels

**Risk tags:**
- `risk:low` — Safe to drill at full speed
- `risk:medium` — Requires controlled drilling
- `risk:high` — Injury risk if applied incorrectly
- `risk:safety-critical` — Can cause severe injury

**Family tags:**
- `family:passing`, `family:guard`, `family:submission`, `family:back-take`, `family:ride`, `family:wrestling`, `family:leg-lock`, `family:front-headlock`, `family:escape`, `family:pin`, `family:scramble`, `family:safety`, `family:compression`

**Group tags:** Use the appropriate `ModernSystemGroup` value.

---

## 5. Video Reference Sources

Use these trusted channels for video references:

| Channel | Focus |
|---------|-------|
| B-Team | Modern no-gi systems, leg locks, wrestling |
| Craig Jones | Heel hooks, K-guard, leg entanglements |
| Lachlan Giles | Guard systems, leg locks, passing |
| Jozef Chen | Modern no-gi, wrestling integration |
| Submeta (Lachlan Giles) | Instructional content |
| Dante Leon | Modern passing and back takes |
| JR Kouzi / BJJ Mental Models | Teaching-focused breakdowns |
| Nick Salles / Neil Melanson | Upper body submissions, wrestling |
| BJJ Fanatics (preview/instructionals) | System instructionals |
| ADCC / CJI / FloGrappling | Competition footage with analysis |

**Video assignment criteria:**
- `relevance: primary` — Best single video for this skill
- `relevance: supplemental` — Good additional perspective
- `relevance: advanced` — For advanced details/variations
- `relevance: alternate` — Different approach to same technique
- `relevance: related` — Contextually related but not directly about the skill

---

## 6. System Connections (Skills → Existing Skills)

New skills must connect to the following existing infrastructure:

### Archetypes
New skills should be added to relevant archetypes in `src/data/archetypes.ts`:
- `wrestle-up-player` — gets: double-leg-bjj, bjj-foot-sweeps, coyote-half-guard
- `pressure-passer` — gets: tripod-folding-pass, over-under-pass, chin-strap-control
- `guard-retention-specialist` — gets: coyote-half-guard, turtle-to-guard-recovery
- `leg-lock-safety-first` — gets: inside-outside-heel-hook, toe-hold-system, k-guard-to-outside-ashi
- `back-control-finisher` — gets: gift-wrap-back-take, leg-drag-to-back-take, body-triangle-control
- `front-headlock-player` — gets: peruvian-necktie, chin-strap-control
- `submission-chain-hunter` — gets: mounted-triangle, calf-slicer-system, toe-hold-system

### Positions
New positions may need to be added to `content/shared/positions.json` if new positions are introduced (e.g., turtle guard recovery position, gift-wrap position).

### Concepts
New concepts may be needed if the skills introduce new mechanical principles not yet covered.

### Training Methods
New training methods may be needed for positional games specific to these new skills.

---

## 7. Proposed Level & Tag Assignment

| Skill ID | Level | Tier | Meta | Risk | Family | Group |
|----------|-------|------|------|------|--------|-------|
| `toreando-passing` | intermediate | modern-expansion | modern-common | low | passing | modern_passing |
| `tripod-folding-pass` | intermediate | modern-expansion | modern-common | low | passing | modern_passing |
| `over-under-pass` | intermediate | modern-expansion | modern-common | medium | passing | modern_passing |
| `double-leg-bjj` | intermediate | modern-expansion | modern-common | medium | wrestling | wrestle_up |
| `bjj-foot-sweeps` | intermediate | modern-expansion | modern-common | low | wrestling | wrestle_up |
| `lateral-drop-headlock-throw` | intermediate | modern-expansion | emerging | high | wrestling | front_headlock |
| `coyote-half-guard` | intermediate | modern-expansion | modern-common | medium | guard | single_leg_x |
| `berimbolo-back-take` | advanced | modern-expansion | modern-common | medium | back_take | x_guard |
| `k-guard-to-outside-ashi` | advanced | modern-expansion | modern-common | high | leg_lock | k_guard |
| `inside-outside-heel-hook` | advanced | safety-critical | modern-common | safety-critical | leg_lock | leg_lock |
| `toe-hold-system` | advanced | advanced-niche | specialized | high | leg_lock | leg_lock |
| `calf-slicer-system` | advanced | advanced-niche | specialized | high | submission | leg_lock |
| `mounted-triangle` | advanced | modern-expansion | modern-common | medium | submission | s_mount |
| `peruvian-necktie` | advanced | advanced-niche | specialized | safety-critical | submission | front_headlock |
| `body-triangle-control` | advanced | modern-expansion | modern-common | medium | submission | back_triangle |
| `chin-strap-control` | intermediate | modern-expansion | modern-common | low | front_headlock | counter_wrestling |
| `gift-wrap-back-take` | intermediate | modern-expansion | modern-common | low | back_take | counter_wrestling |
| `leg-drag-to-back-take` | advanced | modern-expansion | modern-common | medium | back_take | crab_ride |
| `turtle-to-guard-recovery` | intermediate | modern-expansion | modern-common | low | escape | safety |

---

## 8. Implementation Phases (Suggested Order)

### Phase 1 — Foundation (Skills 1–7)
Skills that build on existing systems with minimal prerequisite needs:
1. `toreando-passing` — complements existing outside-passing
2. `tripod-folding-pass` — complements existing pressure passing
3. `over-under-pass` — fills half guard passing gap
4. `double-leg-bjj` — fills major takedown gap
5. `bjj-foot-sweeps` — light takedown additions
6. `chin-strap-control` — fundamental head control
7. `coyote-half-guard` — modern half guard system

### Phase 2 — Back Takes & Transitions (Skills 8–12)
Skills that connect existing systems:
8. `gift-wrap-back-take`
9. `leg-drag-to-back-take`
10. `berimbolo-back-take`
11. `k-guard-to-outside-ashi`
12. `turtle-to-guard-recovery`

### Phase 3 — Submissions (Skills 13–19)
Advanced submission skills with safety prerequisites:
13. `inside-outside-heel-hook` — requires leg-lock-safety-basics
14. `toe-hold-system` — requires leg-lock-safety-basics
15. `calf-slicer-system` — requires leg-lock-safety-basics
16. `mounted-triangle` — requires mount-control
17. `peruvian-necktie` — requires front-headlock-system
18. `body-triangle-control` — requires back-control
19. `lateral-drop-headlock-throw`

---

## 9. Build & Validation

After each skill is created, run:

```bash
# Build content pipeline
npm run build:content

# Validate all content
npm run validate:content

# Build full app
npm run build

# Lint
npm run lint
```

The build pipeline:
1. Reads `content/skills/{domain}/{skill-id}/skill.json` — validates against `SkillMetaSchema`
2. Reads `content.{locale}.json` — validates against `SkillContentSchema`
3. Generates `public/generated/manifest/skills.{locale}.json` — validates against `SkillManifestItemSchema`
4. Generates `public/generated/skills/{locale}/{skill-id}.json` — validates against `SkillDetailArtifactSchema`
5. Generates video mappings if `videos.json` exists

All Zod validations must pass before the build succeeds.

---

## 10. Post-Implementation Checklist

- [ ] All 15–25 skills have complete `skill.json`, `content.en.json`, `content.vi.json`, `content.fr.json`
- [ ] Zod validation passes for all files
- [ ] Skills appear in generated manifests for all 3 locales
- [ ] Skills are linked to related skills (prerequisites, chains, alternatives)
- [ ] Skills are added to relevant archetypes in `src/data/archetypes.ts`
- [ ] Skills appear in search results
- [ ] New positions added to `content/shared/positions.json` if needed
- [ ] Video references added with proper attribution
- [ ] Build passes with 0 errors
- [ ] Lint passes with 0 warnings
- [ ] Translations are accurate (no machine-translation artifacts)

---

## 11. Detailed Content Outlines — Body Mechanics & Key Content per Skill

Each skill outline below defines what the **moneyDetails**, **whyItWorks**, **commonMistakes**, **coachingCues**, and **systemLogic** sections should convey. These are content blueprints — not final copy. Each outline captures the specific mechanical truths that make the technique work.

---

### toreado-passing — Toreando / Float Passing

**Body mechanics core:** The toreando pass works by creating a distance/angle problem for the opponent — you stay on your feet, control one sleeve or wrist, and circle past their legs while floating your weight. Unlike pressure passes, you never commit your chest to their hips until the pass is complete.

**whyItWorks (mechanical reasons):**
- Staying on your feet keeps your weight mobile — they cannot trap you in half guard or body lock
- Pulling one sleeve across their centerline forces them to turn, exposing the space for the pass
- Circling to the side of the controlled arm means their near leg cannot frame — the leg follows the hip, the hip follows the shoulder
- The float (lifting your weight over their legs) prevents them from catching you in a knee shield or butterfly hook

**moneyDetails (body placement details):**
- Grip their same-side sleeve or wrist with your lead hand — pull diagonally across your body to rotate their shoulders
- Step a wide arc with your lead leg, cutting past their knee line while keeping your head above your knee
- As you clear their legs, float your hips forward — chest should arrive after the legs clear, not before
- If they throw a butterfly hook, use your free hand to redirect the hook down as you skip past
- Key detail: the lead hand pull + the outside footwork happen *simultaneously* — if you step before pulling, they can follow you

**commonMistakes:**
- Stepping past before creating the shoulder rotation — they follow you and re-guard
- Dropping your head below their hip line — they catch you in a guillotine or shoulder crunch
- Staying square to them as you pass — must create the angle with the arm drag
- Committing weight forward too early — they catch you in a knee shield

**coachingCues:**
- "Pull the sleeve, circle the edge, float over the legs"
- "Feet before chest — legs clear, hips follow"
- "If they sit up, you went too shallow — cut deeper"
- "Lead hand pull + outside step = one movement"

**systemLogic corePrinciple:**
"Toreando pass: control their near arm → pull across to rotate their shoulders → circle outside their knee line → float your weight over their legs → stabilize side control. The pass succeeds by creating an angle they cannot defend — a squared-up toreando is a failed toreando."

**decisionTree:**
- They sit up to follow you → switch to snapdown or front headlock
- They throw butterfly hook → redirect the hook with your free hand and skip past
- They turn away → take the back
- They pull guard → circle to the other side and re-attack

---

### tripod-folding-pass — Tripod / Folding Pass

**Body mechanics core:** The tripod pass breaks the opponent's structural integrity by folding their torso toward their own legs. From headquarters, you post one leg wide, drop your head to their far hip, and drive forward — your head becomes the wedge that folds their trunk.

**whyItWorks (mechanical reasons):**
- Posting a wide base creates a tripod (two legs + one hand/head on the mat) — this gives you stability while folding
- Driving your head to their far hip creates a fulcrum — their own body weight becomes the resistance that prevents them from recovering posture
- Folding their torso toward their knees compresses their hip flexors — they cannot generate extension to frame or re-guard
- Once folded, their legs are trapped between their own chest and the mat — they have no space to reinsert knees

**moneyDetails (body placement details):**
- From headquarters, step one foot back and wide (the tripod stance) — this creates the base to drive forward
- Your far hand posts on the mat beside their hip for stability
- Drive your head (crown of the head, NOT forehead) into their far hip/side — your head is the wedge
- As you drive, walk your tripod forward — the forward walk folds their torso progressively
- Key detail: your head must go past their centerline to trap both of their legs on the same side
- When their shoulder touches their knee, the pass is complete — you can now slide to side control

**commonMistakes:**
- Driving with the forehead instead of the crown — this strains the neck and reduces wedge efficacy
- Not stepping wide enough — a narrow base means they can push you sideways
- Releasing head pressure too early — pass is not complete until their shoulder is past their knee
- Letting them frame against your head — must pin the far arm before driving

**coachingCues:**
- "Crown of the head to the far hip — not the forehead"
- "Tripod wide, drive forward, fold them shut"
- "When shoulder touches knee, the pass is done"
- "Head is the wedge, legs are the engine"

**systemLogic corePrinciple:**
"Tripod pass: pin far arm → step wide tripod base → drive crown of head to far hip → walk forward until shoulder touches knee → slide to side control. The pass uses head pressure + forward walk to fold the opponent — it succeeds because they cannot extend their hips to recover posture."

---

### over-under-pass — Over-Under / Smash Pass

**Body mechanics core:** The over-under pass controls one leg (underhook grip) and one arm (overhook grip) simultaneously, creating a chest-to-chest pin that eliminates their frames. From half guard, you pass by locking their near leg with your overhook arm and driving your weight through their chest.

**whyItWorks (mechanical reasons):**
- The over-under grip (one arm over their arm, one arm under their leg) creates an asymmetrical control that prevents them from framing on either side
- Your chest driving into their chest removes the space needed for knee shield or re-guarding
- The underhook on their leg prevents them from shrimping or recovering half guard
- The overhook on the near arm disables their strongest defense (the crossface frame)

**moneyDetails (body placement details):**
- From half guard, your overhook arm pinches their near arm against your ribs — this controls their crossface hand
- Your underhook arm reaches between their legs to grip their far hip (belt grip or hip bone) — this controls their hip line
- Your head must be glued to their sternum, not their face — sternum contact prevents them from framing across your head
- Drive forward and slightly to the side of the overhook — this direction collapses their structure
- Key detail: do NOT let your overhook arm slide past their elbow — keep the pinch at their armpit
- When their near shoulder touches the mat, the pass is complete — drive to side control

**commonMistakes:**
- Letting the overhook arm slide down to their forearm — they can pummel back to underhook
- Keeping your head too high (at their face) — they can crossface you back
- Not pinching the overhook tight enough — they free the arm and frame
- Driving straight forward instead of at an angle — must drive toward the overhook side

**coachingCues:**
- "Overhook pinches, underhook controls the hip, head on the sternum"
- "Drive to the overhook side — always"
- "If they recover guard, your underhook lost the hip — re-grip"
- "Chest to chest, no daylight"

**systemLogic corePrinciple:**
"Over-under pass: enter half guard → secure overhook (pinch arm to ribs) + underhook (grip far hip) → glue head to sternum → drive forward and to the overhook side → flatten their hip → clear the knee line → stabilize side control. The pass succeeds because the asymmetrical grip eliminates both their upper and lower body frames."

---

### double-leg-bjj — Double Leg for BJJ

**Body mechanics core:** The BJJ double leg is fundamentally different from wrestling double legs — you must protect your neck from guillotines, keep your head to the outside, and finish without exposing your back. The entry is lower, the head position is wider, and the finish is a lateral drive rather than a straight lift.

**whyItWorks (mechanical reasons):**
- Keeping your head to the outside (ear pressed against their ribs) prevents the guillotine — if your head is centered, you are choking yourself
- Driving laterally (through them, not straight up) uses momentum and base disruption rather than raw strength
- Both hands gripping behind their knees locks their legs together — they cannot sprawl or step back
- The finish (running the pipe or lateral drive) brings them to the mat safely without exposing your back

**moneyDetails (body placement details):**
- Level change: drop your hips below theirs by bending your knees, NOT your waist — bending at the waist exposes your neck
- Head position: your ear must press against their ribs/side, NOT in the center of their chest — centered head = guillotine
- Hand placement: both hands reach behind their knees from outside-in, NOT between their legs — hands between legs exposes you to kimura
- Drive direction: drive *through* them laterally (to one side), not straight up — straight up requires maximal strength
- Finish: as they fall, follow them to side control — do NOT let them turn into you
- Key detail: if they sprawl, do NOT fight the sprawl — circle to a single leg or front headlock

**commonMistakes:**
- Keeping the head centered on their chest — the #1 cause of guillotine catches
- Bending at the waist to level change — this puts your head in front of your knees, a vulnerable position
- Grabbing between their legs — they can kimura your arms or pull you into guard
- Trying to lift straight up instead of driving laterally — this fails against larger opponents
- Stalling in the double leg position — if you don't finish immediately, they counter

**coachingCues:**
- "Ear to the ribs, not the chest — guillotine prevention"
- "Level change with the knees, not the waist"
- "Drive through them, not straight up"
- "Hands outside-in, never between"

**systemLogic corePrinciple:**
"Double leg takedown (BJJ): set up with head control or wrist grip → level change (bend knees) → step to the outside → drive ear to their ribs → wrap both knees (hands outside-in) → drive laterally through them → follow to side control. The takedown succeeds by protecting the neck first and using lateral momentum instead of vertical lift."

---

### bjj-foot-sweeps — BJJ Foot Sweeps

**Body mechanics core:** Foot sweeps in BJJ work by attacking the opponent's base at the exact moment their weight shifts to one foot. The sweeps (Sasae, Kouchi Gari, De Ashi Harai) use timing and angle more than strength — you sweep the supporting leg while pulling their upper body in the opposite direction.

**whyItWorks (mechanical reasons):**
- Foot sweeps attack the supporting leg when 100% of their weight is on it — the leg cannot defend if it is already loaded
- Pulling the upper body opposite to the sweep direction magnifies the off-balance effect — the two forces (pull + sweep) work together
- Foot sweeps do not require level change or head penetration — they are the lowest-risk takedown entries
- A successful sweep requires only that you break their base momentarily — the sweep + follow-up can score without fully taking them down

**moneyDetails (body placement details):**
- **Sasae Tsurikomi Ashi (supporting foot block):** block their advancing foot with your sole while pulling their sleeve down and across — the pull + block folds them over their own ankle
- **Kouchi Gari (inside reap):** step across, reap their heel with your instep while pushing their upper body back — the reap + push creates a backward fall
- **De Ashi Harai (forward sweep):** sweep their advancing foot laterally with the sole of your foot as they step forward — the sweep catches the foot mid-step before it bears full weight
- Common to all sweeps: you must off-balance (kazushi) before sweeping — if you sweep without pulling, they will simply step over the sweep
- Key detail: the pull direction determines the sweep — pull down + forward = De Ashi, pull back = Kouchi, pull across = Sasae

**commonMistakes:**
- Sweeping without off-balancing first — the foot is not loaded with weight
- Reaching too far for the sweep — you overextend and they counter with a takedown
- Trying to sweep from too far away — foot sweeps require close distance
- Not following up after a partial sweep — even a partial off-balance creates an opening for a double leg or arm drag

**coachingCues:**
- "Off-balance first, sweep second"
- "Pull opposite to the sweep direction"
- "Catch the foot as it lands, not as it lifts"
- "Reap the heel, don't kick the leg"
- "A partial sweep is still an opening — follow up"

**systemLogic corePrinciple:**
"Foot sweeps: off-balance the opponent by pulling their upper body → identify the loaded foot (the one bearing weight) → sweep that foot with the sole/instep while continuing the pull → follow up with a double leg, arm drag, or collar tie. The sweep succeeds because the loaded foot cannot defend — timing and off-balance beat strength."

**decisionTree:**
- They step forward with the leading foot → De Ashi Harai (sweep the advancing foot laterally)
- They stand square with weight on one foot → Sasae (block the advancing shin while pulling across)
- They step back to avoid the sweep → Kouchi Gari (reap the back of the heel while pushing back)
- They lift the foot to avoid the sweep → switch to double leg attack while they are on one leg

---

### lateral-drop-headlock-throw — Lateral Drop / Headlock Throw

**Body mechanics core:** The lateral drop is a hip-throw entry from a headlock or overhook. You use your hips as the fulcrum to rotate the opponent over your body and onto the mat. In BJJ, the key is landing in a dominant position (side control or mount) rather than following them to the mat.

**whyItWorks (mechanical reasons):**
- The headlock controls their posture and prevents them from posting or backing out
- Your hips positioned in front of their hips create a rotational fulcrum — they must rotate over you
- Bending your knees and dropping your hips below theirs loads them onto your hip — the throw becomes effortless
- Landing on top (not following them down) gives you immediate position — you do not sacrifice position for the takedown

**moneyDetails (body placement details):**
- Headlock grip: their head under your armpit, your other arm wraps around their far arm (overhook) or their waist
- Hip position: step your feet between theirs (inside position) — your hips must be past their centerline
- Drop: bend both knees deeply, drop your hips below theirs — do NOT bend at the waist
- Rotation: rotate your shoulders away from them while keeping your hips engaged — the rotation + hip drop creates the throw
- Landing: as they go over, do NOT follow them down — stay on your feet and settle into mount or side control
- Key detail: if they block by posting the far arm, release the headlock and switch to the double leg

**commonMistakes:**
- Bending at the waist instead of dropping the hips — this strains the back and lacks leverage
- Not stepping inside their leg line — without inside position, the throw fails
- Following them to the mat instead of staying on top — this gives away the positional advantage
- Holding the headlock too long after the throw finishes — release and progress to the next position

**coachingCues:**
- "Hips below theirs, not waist bend"
- "Step inside, headlock tight, drop and rotate"
- "Stay on your feet — they go down, you stay up"
- "If they post, switch to double leg"

**systemLogic corePrinciple:**
"Lateral drop: secure headlock/overhook → step inside their leg line → drop hips below theirs (bend knees, not waist) → rotate shoulders away → they rotate over your hips → land in mount or side control. The throw succeeds because your hips become the fulcrum for their rotation — a shallow hip position fails."

**decisionTree:**
- They post the far arm to block the throw → release headlock and switch to double leg
- They back out of the headlock → circle to front headlock and snapdown
- They drop level to counter → pull them into guard and attack from bottom

---

### coyote-half-guard — Coyote Half Guard

**Body mechanics core:** Coyote half guard uses the deep underhook on the far hip combined with a hook on the near leg to create a sweeping platform. Unlike traditional half guard where you fight for the knee shield, coyote half guard attacks the passer's base directly by pulling their far leg and sweeping them forward.

**whyItWorks (mechanical reasons):**
- The deep underhook on their far hip gives you control of their center of mass — you can pull them forward into the sweep
- Your near-leg hook (foot inside their near thigh) prevents them from stepping back to base — they cannot recover the swept leg
- Pulling their far hip toward you while kicking the near leg forward creates a seesaw — they cannot post on either side
- The sweep lands you directly in mount or side control — not in their guard

**moneyDetails (body placement details):**
- From bottom half guard, your near arm shoots deep under their far hip/armpit — this is the control anchor
- Your far arm posts on the mat for base
- Your near leg hooks the inside of their near thigh — your foot should be visible behind their knee
- To sweep: pull their far hip toward your chest while kicking your near leg forward (extending their near leg)
- As they tip forward, release the near leg hook, slide your knee out, and land in mount
- Key detail: if they counter by posting the far hand, switch to the waiter sweep instead

**commonMistakes:**
- The far arm underhook is not deep enough — must reach past their hip to the far side
- Pulling without kicking — the sweep requires both forces simultaneously
- Holding the hook too long — release the hook as they tip to avoid landing in their guard
- Starting the sweep without their weight committed forward — must wait for them to drive into you

**coachingCues:**
- "Deep underhook — hand past their far hip"
- "Pull the hip, kick the leg, seesaw them over"
- "Release the hook as they tip — land in mount"
- "If they post, waiter sweep instead"

**systemLogic corePrinciple:**
"Coyote half guard (bottom): secure deep underhook on far hip → hook the inside of their near thigh with your near leg → wait for their weight to commit forward → pull the far hip toward you while kicking the near leg forward → seesaw them over → land in mount. The sweep succeeds because the two forces (pull + kick) create a lever they cannot post against."

**decisionTree:**
- They post the far hand to block the sweep → switch to waiter sweep (extend the leg and sweep them backward)
- They back out of the half guard → follow with a wrestle-up (single leg)
- They flatten you with crossface → pummel back to the underhook before sweeping

---

### berimbolo-back-take — Berimbolo / Inversion Back Take

**Body mechanics core:** The berimbolo uses an inversion (rolling over your own shoulder) to reverse the angle from under the opponent to behind them. From De La Riva or RDLR, you roll under them as they step forward, hook their far hip, and come up behind them — the inversion trades being underneath for being behind.

**whyItWorks (mechanical reasons):**
- Inverting under them as they step forward reverses the inside/outside relationship — you go from inside their guard to outside their back
- The far-hip hook (collar drag grip or belt grip) prevents them from following you through the inversion
- Their forward step is the trigger — if they do not step forward, the berimbolo is not available
- The inversion does not require you to be stronger — it uses their forward momentum against them

**moneyDetails (body placement details):**
- From RDLR or DLR: your inside leg hooks their near leg, your far leg is free to post or kick
- Trigger: they step the free leg forward (to pass or pressure) — this is your window
- Inversion: roll over your far shoulder (NOT the top of your head) while keeping your inside hook on their leg
- During the roll: your far hand reaches for their far hip or belt — this pull brings your hips through
- Landing: as you complete the roll, your head should be behind their hips, not under them
- Finish: release the inside hook, replace with body triangle or seatbelt, and establish back control
- Key detail: the hand pull (far hip) is what rotates your hips through — without the pull, you stall on your back

**commonMistakes:**
- Inverting over the top of the head instead of the shoulder — dangerous for the neck
- Letting go of the leg hook during inversion — you lose the connection and they step away
- Not pulling the far hip during the roll — the pull is what rotates your body through
- Stopping at the truck instead of flowing to back control — must complete the back take

**coachingCues:**
- "Shoulder roll, not head roll"
- "Step forward = your window"
- "Pull the far hip — that's what rotates you through"
- "Don't stop at the truck — finish to back control"

**systemLogic corePrinciple:**
"Berimbolo back take: DLR or RDLR guard → opponent steps forward (trigger) → invert over your far shoulder → pull their far hip through the roll → land behind them → replace hook with back control. The back take succeeds because their forward momentum carries them past you as you invert — you trade being under them for being behind them."

**decisionTree:**
- They do not step forward → berimbolo is not available — stay in DLR/RDLR and sweep instead
- They step back to avoid the inversion → release the DLR hook and enter K-guard
- They follow you through the inversion → they are defending correctly — re-enter guard and try again
- They post a hand to block the back take → attack the posted arm (kimura or armbar)

---

### k-guard-to-outside-ashi — K-Guard to Outside Ashi

**Body mechanics core:** K-guard to outside ashi is the primary leg-lock entry chain from K-guard. When the opponent defends the K-guard (by stepping back or posting), you release the K-guard hook and re-enter directly into outside ashi — the leg entanglement that leads to the saddle or straight heel hook exposure.

**whyItWorks (mechanical reasons):**
- The K-guard already has your hips underneath theirs and your leg entangled with one of their legs — you are already 50% into the leg lock
- Releasing the K-guard hook and re-entering as outside ashi is one movement — the opponent cannot defend both positions in sequence
- Outside ashi gives you heel exposure on the far leg while protecting your own knee line
- The transition happens below their field of vision — many opponents do not recognize the leg lock threat until it is too late

**moneyDetails (body placement details):**
- From K-guard: your outside leg is hooking behind their near knee, your inside knee is in their armpit
- Entry: as they step back to clear the K-guard, release your outside hook and pummel your leg to the inside of their far leg
- Outside ashi: your near leg now goes over their far leg (crossing their thigh), your far leg hooks behind their near knee
- Heel exposure: pull their far leg toward your chest while rotating your hips — the heel comes toward your sternum
- Position hierarchy: K-guard → outside ashi → saddle/inside sankaku (if needed for finish)
- Key detail: do NOT let them free their far leg — if they do, you lose outside ashi and must re-enter K-guard

**commonMistakes:**
- Losing the K-guard before establishing outside ashi — there is a gap between the two where you are vulnerable
- Letting them clear their far knee during the transition — must keep the far leg trapped
- Going to saddle too early — finish from outside ashi first; saddle is the backup option
- Not controlling their near hand — they can frame against your head or peel the leg entanglement

**coachingCues:**
- "K-guard hook pulls, outside ashi leg pummels — two movements that feel like one"
- "Keep the far leg trapped through the transition — lose it, lose the entry"
- "Finish from outside ashi before considering saddle"
- "Control the near hand — if they frame your head, the entanglement fails"

**systemLogic corePrinciple:**
"K-guard to outside ashi: establish K-guard (outside leg hook behind their near knee, inside knee in armpit) → opponent steps back (trigger) → release K-guard hook → pummel your leg inside their far leg → re-enter as outside ashi → expose the heel. The transition succeeds because you are already underneath them with one leg entangled — releasing and re-entering is faster than they can defend."

**decisionTree:**
- They step back to clear K-guard → pummel leg to outside ashi
- They step forward to pressure → stay in K-guard and sweep instead
- They post on your head to block → pummel their arm or switch to omoplata
- They free their far leg → you lost the position — re-enter K-guard or recover guard

---

### inside-outside-heel-hook — Inside & Outside Heel Hook Finishing

**Body mechanics core:** The heel hook finish is a rotation of the foot relative to the knee, created by rotating your own hips and shoulders. The difference between inside and outside heel hooks is the direction of rotation — inside heel hook rotates the foot outward (away from their body), outside heel hook rotates the foot inward (toward their body). Both finishes use hip rotation, not arm strength.

**whyItWorks (mechanical reasons):**
- The heel hook attacks the knee in its weakest rotational plane — the knee does NOT rotate laterally
- Hip rotation generates the torque (not arm pulling) — your hips are stronger than your arms
- The 'boot' grip (shin trapping the heel) gives you mechanical advantage over their foot — you control rotation
- The 'milk the calf' detail (pulling the shin across the calf muscle) creates the finish without explosive force

**moneyDetails (body placement details):**
- **Grip:** four fingers on the outside of their heel, thumb on the sole of their foot. The 'boot' — your forearm presses against their shin
- **Inside heel hook:** rotate your hips TOWARD their foot while pulling the heel across your chest — their foot rotates outward
- **Outside heel hook:** rotate your hips AWAY from their foot while keeping the heel pinned to your sternum — their foot rotates inward
- **Knee line control:** your near knee must be ABOVE their knee line — controlling the far side of their pelvis
- **The finish:** 'milk the calf' — slide your shin across the back of their calf while rotating your hips. The rotation + calf compression creates the submission
- Key safety detail: the heel hook should be applied *by rotation*, not by squeezing. If you squeeze before rotating, you do not have the finish

**coachingCues:**
- "Knee line first, then the boot, then rotation"
- "Rotate the hips, don't pull the foot"
- "Milk the calf — the squeeze is the finish"
- "If the heel disappears, you lost the angle"

**commonMistakes:**
- Squeezing the heel hook before establishing knee line control — you will not finish and may lose the entanglement
- Pulling with the arms instead of rotating the hips — this fatigues your arms and lacks power
- Not 'milking the calf' — proper calf compression is what creates the finish, not the foot twist alone
- Letting them hide their heel in your armpit — this neutralizes the rotation
- Waiting too long to finish — heel hooks are time-sensitive; if you do not finish quickly, they escape

**systemLogic corePrinciple:**
"Heel hook finishing: establish leg entanglement (outside ashi or saddle) → clear knee line → secure the boot grip (four fingers on heel, thumb on sole) → rotate hips in the finishing direction → milk the calf with your shin → finish by rotation, not squeeze. The finish succeeds because the knee has no lateral rotation — any rotation of the foot relative to the knee creates torque on the ligament."

**decisionTree:**
- Inside heel hook → rotate hips toward their foot (foot rotates outward) → targets LCL/MCL
- Outside heel hook → rotate hips away from their foot (foot rotates inward) → targets ACL/PCL
- They hide their heel → re-establish boot grip by prying with your forearm
- They clear the knee line → release the entanglement and re-enter from guard

---

### toe-hold-system — Toe Hold / Estima Lock

**Body mechanics core:** The toe hold attacks the ankle in dorsiflexion (bending the foot toward the shin) combined with rotation. The Estima lock variant attacks the same structure but uses a figure-four grip on the foot rather than the traditional two-on-one grip, creating more rotation with less force.

**whyItWorks (mechanical reasons):**
- The toe hold hyperextends the ankle ligaments and impinges the talus — the ankle has minimal resistance in this direction
- The figure-four grip (Estima lock) creates rotational force from your arms AND your body rotation — more torque than two-on-one grip
- Toe holds are available from positions where heel hooks are not (outside ashi, 50/50, and some guard passes)
- The toe hold is legal at most belt levels where heel hooks are prohibited

**moneyDetails (body placement details):**
- **Traditional grip:** one hand on the heel, the other on the toes — palm of the heel hand faces up, palm of the toe hand faces down (opposing forces)
- **Estima lock grip:** figure-four grip — one hand grabs your own wrist, the other hand cups their heel. The figure-four creates the rotation
- Finish: dorsiflex their foot (bend toes toward shin) while rotating their foot outward (for traditional) or inward (for Estima)
- Body position: control their near knee with your armpit — if the knee can move, they can spin out of the hold
- Key detail: the toe hold is most effective when your opponent is belly-down — from this position, they cannot rotate to escape

**coachingCues:**
- "Control the knee, then attack the foot"
- "Dorsiflex first, then rotate — not the other way"
- "Belly-down opponent is your best target"
- "Figure-four grip, body rotation, tap"

**commonMistakes:**
- Attacking the toe hold before controlling the knee — they will spin and escape
- Using only arm strength without body rotation — the rotation must come from your trunk, not your shoulders
- Applying toe hold in the wrong direction — must dorsiflex + rotate, not plantarflex
- Holding the submission too long without progress — toe holds have a narrow window before the opponent escapes

**systemLogic corePrinciple:**
"Toe hold system: isolate the foot → control the knee (pin it to your armpit) → secure grip (traditional or figure-four Estima lock) → dorsiflex the foot (toes toward shin) → rotate the foot while using body rotation → finish. The hold succeeds because the ankle has minimal resistance to dorsiflexion + rotation — but only if the knee is immobilized."

**decisionTree:**
- They are belly-down → ideal — they cannot spin to escape
- They are on their back → secure the knee first before attacking the foot
- They spin to escape → you lost knee control — release and re-enter the leg entanglement
- Traditional grip fails → switch to Estima lock (figure-four for more rotation)

---

### calf-slicer-system — Calf Slicer / Compression Locks

**Body mechanics core:** Calf slicers compress the calf muscle between your shin and their own shin/hamstring, creating intense pain and muscle-locking pressure. Unlike joint locks that attack ligaments, calf slicers attack muscle tissue — the compression creates ischemia and pressure pain.

**whyItWorks (mechanical reasons):**
- The shin-to-calf compression creates a muscle lock — the calf muscle is compressed against the tibia and fibula
- Unlike joint locks, the calf slicer does not rely on hyperextension — it works on pain and muscle fatigue
- Calf slicers are available from leg entanglements where heel hooks are defended or illegal
- The compression creates a secondary 'pump' that locks the ankle — the foot cannot escape because the calf is compressed

**moneyDetails (body placement details):**
- **Entry 1 — from saddle:** control their top leg, bring your shin across their calf, and squeeze your heels together
- **Entry 2 — from 50/50:** step over their leg, trap their foot under your armpit, and drive your shin into their calf
- **Finish:** your shin presses into the belly of their calf (not the ankle). Squeeze your heels toward each other while pulling their foot toward your chest
- Body alignment: keep your chest facing them — if you turn away, you lose the compression angle
- Key detail: the calf slicer works best when their leg is trapped and they cannot straighten it — a straight leg can escape the compression

**coachingCues:**
- "Shin on the calf belly, not the ankle"
- "Trap the foot, lock the compression"
- "Squeeze heels together — the closer the heels, the tighter the slice"
- "Apply slow — calf slicers don't need explosion"

**commonMistakes:**
- Placing the shin on the ankle instead of the calf belly — ankle compression is weaker and easier to escape
- Not trapping their foot — if the foot is free, they can slide out of the compression
- Applying the slicer without isolation — they can spin out if their hip is free
- Using explosive pressure — calf slicers should be applied progressively for safety

**systemLogic corePrinciple:**
"Calf slicers: enter from leg entanglement (saddle or 50/50) → trap their foot against your body → place your shin across the belly of their calf → squeeze your heels together while pulling their foot toward your chest → compress the calf muscle against the tibia. The compression succeeds because the calf muscle cannot escape — but only if the foot and hip are both controlled."

**decisionTree:**
- From saddle → control top leg, bring shin across calf, squeeze heels
- From 50/50 → step over, trap foot under armpit, drive shin into calf
- They straighten their leg → release and re-enter the leg entanglement — calf slicer requires a bent knee
- They spin out → you lost hip control — re-establish guard or leg entanglement

---

### mounted-triangle — Mounted Triangle / Armbar from Mount

**Body mechanics core:** The mounted triangle uses your top position to trap their arm between your leg and their head, then step over to finish. The S-mount transition is critical — you must climb high on their chest before attacking. Once S-mount is established, the triangle is a single stepping motion away.

**whyItWorks (mechanical reasons):**
- From mount, their arm is already compressed by your body weight — you do not need to break posture like from guard
- Gravity works for you — your weight pressing down tightens the triangle without needing to squeeze harder
- If they defend the triangle by posturing, you attack the armbar — the triangle-armbar dilemma is stronger from top than from guard
- They cannot stack you from mount like they can from guard — this removes the primary triangle counter

**moneyDetails (body placement details):**
- Must climb to S-mount (one foot in their hip, one knee in their armpit) before attacking
- Trap their near arm with your same-side leg — their arm is pinned between your leg and their own shoulder
- Step your top leg over their head — foot goes behind their head, NOT across their shin like a guard triangle
- Lock the triangle: crunch your heels together first, then squeeze your knees
- Armbar transition: when they posture, swim your arm under their defending arm, lift your hips, and fall back
- Key detail: do NOT attempt the mounted triangle from low mount — you must climb to S-mount first

**coachingCues:**
- "S-mount first, triangle second — never from low mount"
- "Trap the arm before stepping over — if the arm is free, the triangle is not"
- "Heel crunch, knee squeeze — two separate movements, not one"
- "They posture up = your armbar entry"

**systemLogic corePrinciple:**
"Mounted triangle: from mount → climb to S-mount → trap their near arm with your same-side leg → step the top leg over their head (foot behind head, not across shin) → crunch heels together → squeeze knees → if they posture, transition to armbar. The mounted triangle succeeds because gravity and mount pressure eliminate their ability to stack or posture out — the S-mount climb is the gatekeeper."

**decisionTree:**
- They try to stack → impossible from mount — finish the triangle
- They posture up to defend → swim your arm under their defending arm and armbar
- They turn to their side → release the triangle and take the back
- They interlock their hands to block → peel the hands by rotating your hips

---

### peruvian-necktie — Peruvian Necktie

**Body mechanics core:** The Peruvian necktie is a front headlock choke that finishes by folding the opponent's body forward while compressing both sides of their neck with your biceps and forearm. Unlike the guillotine (which is a neck/crank choke), the Peruvian necktie is a true choke that compresses the carotids.

**whyItWorks (mechanical reasons):**
- Your forearm and biceps compress both carotid arteries simultaneously — it is a blood choke, not a neck crank
- Folding their body forward prevents them from posturing out — their own body weight tightens the choke
- The grip (grabbing your own biceps or thigh) creates a locked structure that cannot be peeled open
- The Peruvian necktie is available when the opponent turns away from the front headlock — complements the guillotine (which works when they turn in)

**moneyDetails (body placement details):**
- From front headlock: your arm goes under their neck, hand grabs your own opposite biceps
- Your other arm wraps over their head and locks the figure-four by grabbing your own forearm or thigh
- Finish: step to the side and fold their body forward — their own weight tightens the choke
- Pressure points: your forearm presses one carotid, your biceps/shoulder presses the other
- Key detail: the finish is NOT you squeezing — it is folding them forward so their body weight creates the choke

**commonMistakes:**
- Squeezing with the arms instead of using body weight — this fatigues the arms and does not choke as effectively
- Not stepping to the side before folding — you need the angle to create the forward fold
- Holding the grip too low on their neck — the choke must compress the carotids, which are on the sides of the neck
- Trying the Peruvian against a turtled opponent who is still heavy on their hands — you need them postured up first

**coachingCues:**
- "Fold, don't squeeze — their weight does the choke"
- "Step to the side before folding"
- "Forearm on one side, biceps on the other"
- "Carotids, not the windpipe"

**systemLogic corePrinciple:**
"Peruvian necktie: front headlock → opponent turns away (trigger) → slide your arm under their neck and grab your own biceps → wrap your other arm over their head → lock figure-four → step to the side → fold their body forward — their weight tightens the choke. The choke succeeds because your forearm and biceps compress both carotids simultaneously — it is a blood choke, not a neck crank."

**decisionTree:**
- They turn into you instead of away → switch to guillotine or D'Arce
- They posture up out of the front headlock → Peruvian is available — step and fold
- They go limp in turtle → Peruvian will not work — switch to turtle ride or back take
- They defend by grabbing your choking arm → pummel back to front headlock and re-attack

---

### body-triangle-control — Body Triangle Control

**Body mechanics core:** The body triangle uses your legs locked around their waist to control their hips and prevent them from moving. Unlike traditional hooks, the body triangle immobilizes the lower body completely — if the body triangle is tight, they cannot escape the back.

**whyItWorks (mechanical reasons):**
- Locking your legs around their waist compresses their diaphragm — they fatigue faster and cannot generate explosive movement
- The body triangle prevents hip escape — to escape the back, the opponent must first create hip space
- Unlike hooks, the body triangle cannot be peeled off easily — it is a locked structure
- The body triangle also functions as a body compression submission — prolonged compression can force a tap from body fatigue alone

**moneyDetails (body placement details):**
- From back control: your top leg slides over their hip, the bottom leg slides under their other hip
- Lock: your top leg's shin hooks behind your bottom leg's knee — this creates the triangle around their waist
- Position: your hips should be as low as possible (at their glutes/lower back), not high at their mid-back
- Adjustment: if the triangle is loose, walk your hips closer to theirs and re-lock — a loose body triangle is worse than no triangle
- Release: unlock the triangle and switch to hooks when you need to adjust position or attack the choke
- Key detail: the body triangle alone does NOT cause submissions in most cases — it is a control hold, not a finish

**commonMistakes:**
- Locking the body triangle too high (at their ribs instead of hips) — they can still move their hips
- Allowing the body triangle to loosen — a loose triangle gives them space to escape
- Using only the body triangle without attacking the choke — you must still work for the RNC
- Locking the body triangle and relaxing — you still need to hand-fight for the finish

**coachingCues:**
- "Hips, not ribs — lock low on the waist"
- "Tight triangle = tight control; loose triangle = escape"
- "Body triangle controls the hips; hands control the choke — both are required"
- "Keep it but don't stop working"

**systemLogic corePrinciple:**
"Body triangle control: from back control → slide top leg over their hip → lock legs around their waist (shin behind knee) → squeeze to compress their diaphragm → maintain while hand-fighting for the RNC. The body triangle succeeds because it immobilizes their hips — they cannot create the space needed to escape the back."

**decisionTree:**
- They try to peel the triangle → squeeze tighter and continue hand-fighting
- They flatten belly-down → release the triangle and switch to hooks or crab ride
- They create space → unlock, adjust, and re-lock tighter — never accept a loose triangle
- You need to adjust position → unlock the triangle, make the adjustment, then re-lock

---

### chin-strap-control — Chin Strap / Head Control System

**Body mechanics core:** The chin strap controls the opponent's head by hooking your fingers under their chin and pulling their head toward your chest. From this grip, you can fold them forward, expose their back, or set up front headlock chokes. The mechanical principle is simple: the chin strap turns the head into a handle — where the head goes, the body follows.

**whyItWorks (mechanical reasons):**
- The chin strap controls the head, which controls the spine — where the head goes, the body follows
- Pulling the chin toward your chest folds their upper body forward — they cannot posture up or frame effectively
- The chin strap creates a 'handle' on the head that allows you to peel them off their base
- From turtle, the chin strap combined with hip pressure collapses their posture — the two forces (pull up on chin + push down on hips) trap them

**moneyDetails (body placement details):**
- **Grip:** four fingers hooked under their chin (inside the neck), thumb rests on their cheek/ear
- **Control:** pull their chin toward your sternum while driving forward — this buckles their posture
- **From front headlock:** chin strap + crossface control = complete head control. Pull their head down while circling to their side
- **From turtle:** one arm chin strap (pull their head up), the other arm posts on their hip — the two forces create the back take
- **Key detail:** the chin strap grip must be inside the chin (fingers on the jawbone, not the throat) — throat pressure is dangerous and less effective

**commonMistakes:**
- Hooking the fingers too deep (into the throat) instead of the chin bone — can injure the trachea
- Using only the chin strap without body position — must also control the hip line
- Holding the chin strap when the opponent has already turned into you — switch to guillotine or front headlock
- Releasing the chin strap prematurely — once you have it, keep it until you secure the position

**coachingCues:**
- "Fingers on the chin bone, not the throat"
- "Chin strap controls the head; hips control the body — use both"
- "If they turn in, switch to guillotine"
- "Once you have the chin, own the position"

**systemLogic corePrinciple:**
"Chin strap system: secure grip under the chin (fingers on jawbone, thumb on cheek) → pull their head toward your chest → fold their posture forward → combine with hip pressure or front headlock. The system succeeds because controlling the head controls the spine — where the head goes, the body follows."

**decisionTree:**
- From front headlock → chin strap pulls the head down → opponent turns in → switch to guillotine
- From turtle → chin strap pulls up + hip pressure pushes down → back exposure → take the back
- From side control top → chin strap turns their head away → prevents shoulder roll escape → maintain side control

---

### gift-wrap-back-take — Gift Wrap / Arm Drag Back Take

**Body mechanics core:** The gift wrap controls one of their arms by folding it behind their back, leaving the other arm free and exposing their back. From side control or half guard, you trap their far arm, walk your hand to their wrist, and pull their arm behind their back — this exposes their back as you spin behind them.

**whyItWorks (mechanical reasons):**
- Folding their arm behind their back creates a 'handle' that controls their shoulder — they cannot turn into you or post
- With one arm neutralized (trapped behind their back), their ability to defend the back take is halved
- The gift wrap is available from any top position where you can isolate a far arm (side control, mount, half guard top)
- Spinning behind them as you control the gift wrap creates the back take — the spin + arm control prevents them from following

**moneyDetails (body placement details):**
- From side control: isolate their far arm, walk your hand from their wrist up to their triceps/shoulder
- Grip: grab their far wrist with your far hand, pull it toward you, then feed it to your near hand
- Wrap: fold their arm behind their back — their palm should face outward (thumb pointing up)
- Spin: step over their head with your near leg and spin behind them — the gift wrap grip pulls you into back control
- Finish: as you land behind them, replace the gift wrap with a seatbelt grip or RNC grip
- Key detail: the gift wrap works best when they are posting on the trapped arm to escape — their own post creates the opportunity

**commonMistakes:**
- Trying the gift wrap from too far away — you must be chest-to-chest to isolate the far arm
- Not folding the arm enough behind their back — if the arm is not behind them, they can pull it free
- Spinning without controlling the arm — you end up behind them but they still have both arms functional
- Holding the gift wrap too long after securing back control — release and progress to the choke

**coachingCues:**
- "Chest-to-chest first, then reach for the far arm"
- "Fold it behind their back — thumb points up"
- "Spin tight, stay connected"
- "Gift wrap is the entry; back control is the destination"

**systemLogic corePrinciple:**
"Gift wrap back take: from side control/mount → isolate far arm → walk hand to their wrist → fold arm behind their back → step over their head → spin behind → release gift wrap → establish back control. The back take succeeds because the gift wrap neutralizes their far arm — with one arm trapped, their ability to defend the back take is halved."

**decisionTree:**
- They resist the arm isolation → switch to arm drag or kimura from side control
- They roll away to escape the wrap → follow them — the roll becomes a back take opportunity
- They flatten belly-down → maintain side control and advance to mount instead

---

### leg-drag-to-back-take — Leg Drag to Back Take

**Body mechanics core:** The leg drag to back take uses the leg drag (controlling one of their legs and dragging it across your body) to expose their back. When they post to defend the leg drag, the far arm post becomes your entry to back control — you release the leg, swim under their arm, and spin behind.

**whyItWorks (mechanical reasons):**
- The leg drag already has them on one side (the dragged leg pulls their hips toward you) — they are already partially exposed
- Their defensive response (posting the far arm to avoid being flattened) creates the back take opening
- Releasing the leg and swimming under their far arm reverses the angle — you go from their front to their back in one movement
- The leg drag to back take is continuous — there is no pause between pass and back take

**moneyDetails (body placement details):**
- Leg drag: control their near leg with your near arm (ankle or pant grip), step past with your far leg
- Drag direction: pull their leg across your body toward your far hip — this rotates their hips toward you
- Their reaction: they will post their far arm to prevent being flattened — this is your trigger
- Spin entry: release the leg grip, swim your head under their posted arm, and spin behind them
- Back take: as you spin, replace leg control with seatbelt grip and establish back control
- Key detail: the transition from leg drag to back take must be one fluid movement — any pause allows them to re-establish defense

**commonMistakes:**
- Holding the leg drag too long — you must release when they post the far arm
- Swimming over their arm instead of under — swimming under gives you back access
- Not controlling their far hip during the spin — they can turn and face you
- Losing proximity during the transition — you must stay chest-to-chest or chest-to-back throughout

**coachingCues:**
- "Drag the leg, read the post, swim under"
- "Release the leg when they post — that's your trigger"
- "Swim under the arm, not over"
- "Stay connected — no daylight"

**systemLogic corePrinciple:**
"Leg drag to back take: control their near leg → drag it across your body → opponent posts far arm (trigger) → release the leg → swim under their posted arm → spin behind → establish back control. The back take succeeds because the leg drag forces them to post — and that post becomes the entry for the back take."

**decisionTree:**
- They do not post the far arm → continue the leg drag to side control or mount
- They post and you swim through → back control established
- They turn away during the drag → release the leg and take the back directly
- They turn into you during the drag → switch to the pass (the leg drag becomes a guard pass)

---

### turtle-to-guard-recovery — Turtle to Guard Recovery

**Body mechanics core:** The turtle to guard recovery is a specific escape from turtle (all-fours or belly-down) back to a neutral or offensive guard position. Unlike the turtle stand-up (which seeks to disengage entirely), guard recovery from turtle uses a hip switch and pummel to re-establish guard engagement.

**whyItWorks (mechanical reasons):**
- From turtle, your weight is on your hands and knees — you can explosive hip escape when the opponent commits weight forward
- The hip switch (dropping one hip to the mat while kicking the other leg through) creates space to bring your legs between you and them
- Pummeling the inside arm (swimming your arm back inside) prevents them from establishing seatbelt or body triangle control
- Recovering to guard (rather than standing) is safer when the opponent has already committed weight on top of you

**moneyDetails (body placement details):**
- From turtle (all-fours): protect your neck by hiding your face (chin to chest, hands protecting the neck)
- Trigger: when the opponent commits weight forward to break turtle, drop one hip to the mat
- Hip switch: drop your near hip, kick your far leg through the space — this creates the angle to face them
- Inside arm pummel: as you kick through, pummel your inside arm (the one between you and them) to regain inside position
- Recovery: once facing them, re-establish guard with knee shield or butterfly hooks
- Key detail: the hip switch must be explosive — a slow switch allows them to flatten you belly-down

**commonMistakes:**
- Trying to recover guard before protecting the neck — always cover the neck first
- Dropping both hands to the mat to stand up — this exposes the back for a choke
- Kicking through without pummeling the inside arm — they maintain seatbelt control
- Staying in turtle too long waiting for the right moment — turtle is a reactive position; you must read and explode

**coachingCues:**
- "Neck first, then hip switch, then pummel"
- "Drop the hip, kick the leg through — one explosive movement"
- "Pummel the inside arm or they keep the seatbelt"
- "Read their weight commitment — that's your trigger"

**systemLogic corePrinciple:**
"Turtle to guard recovery: from turtle → protect neck (chin to chest, hands guarding) → read opponent's weight commitment forward (trigger) → drop near hip to mat → kick far leg through the space → pummel inside arm to regain inside position → re-establish guard (knee shield or butterfly). The recovery succeeds because the hip switch creates space to bring your legs between you and them — but only if you protect the neck first."

**decisionTree:**
- They commit weight forward to break turtle → your trigger — hip switch and recover guard
- They circle to the side instead of driving forward → sit back to guard directly
- They flatten you belly-down → turtle is lost — protect neck and wait for them to create space
- They grab a seatbelt → pummel the inside arm before attempting the hip switch

---

## 12. Open Questions / Future Considerations

- **Double Leg vs Single Leg depth**: Should double leg be a companion skill or merge with existing single-leg-bjj?
- **80/20 Position**: Integrate into heel hook finishing skill or standalone?
- **Coyote Half Guard**: Could be broken into 2 skills (offense + defense) if content is too large.
- **Body Triangle Control**: Some overlap with existing back-control skill — define clear boundary.
- **Underhook Trap (Back Control Finisher)**: Could be covered within gift-wrap or be its own skill.
