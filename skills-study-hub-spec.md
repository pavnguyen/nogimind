# skills-study-hub spec

Request (verbatim intent): improve the app's logic by focusing on UX/UI and good behaviours for
desktop and mobile, keeping in mind that this is a BJJ / no-gi app whose data should be
restructured so the user can form good connections between all skills. Focus on `/skills` and
`/study`. Suggestions for how to do that are welcome.

Short name for this work: **skills-study-hub**.

Status: design only. No code has been changed for this spec yet. Everything below is written
against the repo state at commit `096cc62`.

---

## 1. Locked decisions

Answers the user gave during the interview. These are binding unless explicitly revisited.

| # | Decision | Chosen | Round |
| --- | --- | --- | --- |
| D1 | Problems in scope | All five: list order is not learning order, connections invisible, mobile ergonomics, 19 skills unreachable from `/study`, broken relation ids | 1 |
| D2 | Page roles | **Merge `/study` and `/skills` into one hub with two tabs** | 1 |
| D3 | Content work | **Both, data first**: repair relation data before building UI on it | 1 |
| D4 | Relation model | Undecided by design. Decide together with the UI that consumes it (see section 5) | 2 |
| D5 | Symmetry | **Auto-mirror in build**: author one direction, the build fills the mirror, and `validate:content` errors when both sides disagree | 2 |
| D6 | List order | **Derive from level + graph**: level first, then prerequisite depth | 2 |
| D7 | Missing skill targets | **Author the missing skills** instead of dropping the references | 2 |
| D8 | Hub routing | **`/skills` hosts both tabs** via `?tab=path|catalog`, `/study` redirects | 3 |
| D9 | Path tab unit | **Organised by positions**, not domains: each step is a position/phase, with its skills nested | 3 |
| D10 | Mobile filters | The 8 select boxes are wrong. Make filtering smarter, with far fewer controls (user's own words: "no need 8 filters, try to do smarter") | 3 |
| D11 | Progress state | **Stay stateless**. No mastery marks, no gating. Recently viewed plus the authored graph are the only personalisation | 3 |

## 2. Open decisions

Round 4 of the interview was skipped. O1 has since been worked out in full (plan in sections 6.4
and 6.5, validated against the corpus); it now needs a yes/no rather than a design discussion.
O2 has been detailed in section 7.6. O3 and O4 are still open.

| # | Question | Status |
| --- | --- | --- |
| O1 | A position-based Path tab only reaches 66 of 154 skills (measured in section 3.5). What happens to the other 88? | **Plan ready, awaiting approval.** All 88 are placed by extending the 40 positions plus two extra non-position steps. Result: 154/154 reachable, no skill in more than 3 steps, largest step 11 skills. Sections 6.4 and 6.5 |
| O2 | What does "smarter filters" mean? | **Detailed in section 7.6**: search-first, 5 preset chips with live counts, contextual facet chips, one bottom sheet on phones, 8 selects retired to 5 groups plus tags |
| O3 | What ships first if this must be split for review? | **Settled.** The first shippable slice is S1, data integrity only: content plus a new validator, no UI surface, independently revertable, and it matches D3 (data first). Six slices total, in section 11 |
| O4 | How do we prove the graph and order are correct? | **Settled.** Errors gate the command and CI, informational lines never fail, and the validator rides the two existing workflows instead of adding a job. Section 9, build details in 6.8 |

## 3. Baseline: what the repo actually contains

Measured on the current manifest (`public/generated/manifest/skills.en.json`), not estimated.

### 3.1 Corpus shape

- 154 skills across 10 domains, 1,192 manifest lines per locale.
- Levels: 19 beginner, 77 intermediate, 58 advanced.
- Only **7 of 154 skills have no prerequisites**, so entry points are rare.

| Domain | Skills | beginner / intermediate / advanced | Entry points |
| --- | --- | --- | --- |
| back_control | 8 | 0 / 4 / 4 | 2 |
| escapes | 9 | 2 / 7 / 0 | 1 |
| survival_defense | 7 | 4 / 3 / 0 | 0 |
| positional_awareness | 12 | 5 / 5 / 2 | 1 |
| guard_offense | 28 | 1 / 15 / 12 | 1 |
| guard_retention | 5 | 4 / 1 / 0 | 1 |
| passing | 10 | 0 / 9 / 1 | 1 |
| pins_rides | 16 | 1 / 9 / 6 | 0 |
| submission_systems | 43 | 0 / 10 / 33 | 0 |
| wrestle_up_wrestling | 16 | 2 / 14 / 0 | 0 |

### 3.2 Connection data is half-built

| Field | Skills populated | Share |
| --- | --- | --- |
| `prerequisiteSkillIds` | 147 | 95% |
| `nextSkillIds` | 2 | 1% |
| `relatedSkillIds` | 2 | 1% |
| all three | 2 | 1% |
| none at all (isolated) | 7 | 5% |

The typed relation data that would fix this already exists in the content source and is
**thrown away by the build**: `content/skills/*/skill.json` holds 467 typed entries
(`recommended` 378, `chain` 36, `alternative` 25, `supporting` 17, `prerequisite` 11), but
`ManifestEntry` (`src/content-runtime/manifests.ts`) only carries the three flat id arrays, so
`/skills` and `/study` can never render an Alternative or Supporting link.

### 3.3 The relation graph is unreliable

30 cross-references point at ids that do not exist, and nothing in the toolchain catches them:
`scripts/content/validate-content.ts` performs **no** cross-reference resolution, so
`validate:content` reports 0 errors and 0 warnings while the graph is broken.

- Case corruption: `clamp-Guard-system`, `single-leg-x-Guard`, `Guard-retention` (the exact trap
  AGENTS.md section 12 warns about).
- Stale renames: `bodylock-passing` (8 refs) while the real id is `bodylock-pass`; `heel-hook`
  (2 refs) while the real id is `heel-hook-finishing-system`.
- Targets with no skill at all: `saddle-system`, `seatbelt-control`, `cross-ashi-garami`,
  `outside-ashi-garami`, `triangle-armbar-dilemma`, `leg-pummel-pass`, `smash-pass`,
  `d-arce-system`, `triple-attack-system`, `stance-movement-basics`, `knee-bar`, `ankle-lock`.
- 1 asymmetry: a `nextSkillIds` edge exists with no mirrored prerequisite on the other side.

### 3.4 The two pages disagree with each other today

- `/skills` groups by `skillDomains` from `src/data/domains.ts` (10 domains, curated order:
  positional_awareness, survival_defense, escapes, guard_retention, guard_offense,
  wrestle_up_wrestling, passing, pins_rides, back_control, submission_systems).
- `/study` uses its own local `studyDomains` list (`src/pages/StudyPage.tsx`) with a **different
  order** and only 8 domains, so `positional_awareness` (12) and `survival_defense` (7)
  are unreachable there, 19 skills in total.
- Neither page sorts: filtered result order is raw manifest order, so 19 beginner skills are
  interleaved with 77 intermediate and 58 advanced ones.
- `sortOrder` exists in `SkillMetaJson` and `ManifestEntry` but is effectively unused (1
  occurrence in the manifest).
- `/skills` currently loads **two** sources: `useSkillsQuery()` for rendering and
  `useManifestQuery(language)` for the per-domain checklist counts.

### 3.5 Position data (the chosen backbone for the Path tab)

- 40 positions, all with `relatedSkillIds`, in learning order in `content/shared/positions.json`
  (standing, guard, pins, back control, leg entanglement, scramble, submission threats).
- 145 position to skill references covering **66 of 154 skills**. 88 skills sit under no position.
- 0 dangling position references, so the position graph itself is clean.
- Current list sizes are small: 3 to 7 skills per position, and three positions
  (`mount-bottom`, `reverse-de-la-riva-guard`, `arm-triangle-threat`) have no obvious gap to
  fill from the uncovered set.

## 4. Target architecture

### 4.1 One hub, two tabs

`/skills` becomes the Skill Hub with a tab strip, reusing the existing
`src/components/layout/HubTabBar.tsx` (already used by `/reference`):

- `?tab=path` (default): the guided view, organised by positions (D9).
- `?tab=catalog`: the browsable, searchable catalog of all 154 skills (D10, section 7.6).

Both tabs share one page shell, one data source and one filter model, so the two can never drift
apart again (this is the structural reason for D2).

### 4.2 Data flow

Single source per tab:

- Manifest (`useManifestQuery` / `getManifest`) supplies list metadata including the new relation
  fields and the derived order. This is the only data the tabs need.
- `useSkillsQuery` (built from the manifest, see `src/repositories/skillsRepository.ts`) supplies
  the graph-facing shape (`SkillNode`) and localized titles.
- Path steps come from the new `content/shared/path.json` (section 6.5) built into per-locale
  `public/generated/manifest/path.{en,vi,fr}.json` artifacts (section 6.8).
- No per-skill detail fetches in either tab. Titles for chain chips resolve from the already
  loaded skills list, exactly as `src/components/skill/SkillChain.tsx` does today.

## 5. Data model changes

### 5.1 Extend `ManifestEntry` (`src/content-runtime/manifests.ts`)

```ts
type RelationType = 'prerequisite' | 'chain' | 'recommended' | 'alternative' | 'supporting'

interface ManifestEntry {
  // ...existing fields
  prerequisiteSkillIds: string[]
  nextSkillIds: string[]
  relatedSkillIds: string[]

  // new, emitted by build-content.ts
  relations: { id: string; type: RelationType }[] // promoted from skill.json relatedSkills[], D4
  positionIds: string[]                            // positions that reference this skill
  depth: number                                    // prerequisite depth, 0 for entry points
  order: number                                    // derived index inside the domain, D6
}
```

Decision D4 (whether to promote all five types) should be settled by looking at the Catalog row and
detail chain: if an Alternative or Supporting link earns a place in the UI, promote the full typed
list; if only prerequisite/next/related are ever rendered, keep three arrays and backfill them.
Recommendation: promote the typed list, because the data already exists, costs no authoring, and
`recommended` covers 378 relationships that are invisible today.

### 5.2 Mirroring (D5)

In `scripts/content/build-content.ts`:

1. For every `A.nextSkillIds = [B]`, ensure the emitted `B.prerequisiteSkillIds` contains `A`.
2. If `B` explicitly declares `prerequisiteSkillIds` and `A` is not among them, that is a
   **validation error** naming both ids, to be reconciled in content, not silently patched.
3. Mirroring writes only to the generated manifest. `content/skills/*/skill.json` stays the
   canonical, hand-authored source, and `public/generated/` is never hand-edited.
4. The emitted manifest must be symmetric: every `nextSkillIds` edge has a matching
   `prerequisiteSkillIds` edge, asserted by the new validator.

### 5.3 Derived depth and order (D6)

Precompute at build time, not at runtime:

- Graph edges are the (mirrored) prerequisite edges.
- `depth(skill)` = 0 for entry points, otherwise `1 + max(depth(prerequisite))`, computed with
  Kahn's algorithm over the full skill set.
- A cycle is a hard error from the validator with the cycle path printed.
- `order` = index inside the domain after sorting by (level rank: beginner 0, intermediate 1,
  advanced 2), then `depth` ascending, then authored order in the content build, then `id` for a
  deterministic tie-break.
- Also emit `depth` so the UI can show progress shape ("step 2 of 5 in this domain").
- Validator warns on level inversion (a prerequisite ranked higher than the skill that depends on
  it), since level-first ordering can otherwise place a skill before what it requires.

Why build time: zero runtime CPU and zero new network requests, the order is reviewable in diffs,
and the PWA keeps working offline with the same behavior.

## 6. Content repair plan (D3, data first)

All repairs happen in `content/skills/<folder>/<id>/skill.json`, then `npm run build:content`.
Target: `validate:content` stays at 0 errors and 0 warnings, and the new
`validate:relations` reports 0 dangling, 0 asymmetric, 0 cycles.

### 6.1 Dangling references (30 total, grouped by target)

| Target id | Refs | Source skills (folder) | Resolution |
| --- | --- | --- | --- |
| `bodylock-passing` | 8 | hq-split-squat-passing (2), over-under-pass (2), mat-return-basics, side-control-pin, single-leg-bjj, half-guard-wrestle-up | Rename to real id `bodylock-pass` |
| `single-leg-x-Guard` | 3 | coyote-half-guard, z-lock (2) | Case fix to `single-leg-x-basics` or `single-leg-x-control` (needs the correct target per case) |
| `heel-hook` | 2 | z-lock (2) | Repoint to `heel-hook-finishing-system` |
| `clamp-Guard-system` | 1 | clamp-to-triangle-bridge | Case fix to `clamp-guard-control` |
| `Guard-retention` | 1 | mounted-triangle | `guard_retention` is a domain, not a skill, so repoint to `seated-guard-retention` or `supine-guard-retention` |
| `ankle-lock` | 1 | z-lock | Repoint to `shotgun-ankle-lock` or `straight-ankle-lock-safety` |
| `knee-bar` | 1 | z-lock | No candidate exists, so either author it or drop with a note |
| `saddle-system` | 2 | z-lock (2) | Author (D7), or repoint to `saddle-inside-sankaku-control` |
| `seatbelt-control` | 1 | rear-naked-choke-system | Author (D7) |
| `triangle-armbar-dilemma` | 2 | clamp-to-triangle-bridge, baratoplata | Author (D7), but see the duplication gate in 6.2 |
| `cross-ashi-garami` | 1 | z-lock | Author (D7) |
| `outside-ashi-garami` | 1 | z-lock | Author (D7) |
| `leg-pummel-pass` | 1 | bodylock-pass | Open: repoint or author |
| `smash-pass` | 1 | bodylock-pass | Open: repoint or author |
| `d-arce-system` | 1 | peruvian-necktie | Open: repoint or author |
| `triple-attack-system` | 1 | reverse-buggy-choke | Open: repoint or author |
| `stance-movement-basics` | 2 | bjj-foot-sweeps, double-leg-bjj | Open: author a wrestling stance and movement skill, or repoint |

### 6.2 Duplication gate before authoring (mandatory)

AGENTS.md forbids near-duplicates and requires a duplication search before writing a skill. Before
authoring any of the targets above, run the check:

```bash
grep -ril "<term>" content/skills
```

Known overlaps to resolve first: `saddle-system` vs `saddle-inside-sankaku-control`,
`triangle-armbar-dilemma` vs `triangle-system` / `armbar-system`, `cross-ashi-garami` and
`outside-ashi-garami` vs `backside-50-50-cross-ashi` / `k-guard-to-outside-ashi`,
`seatbelt-control` vs `back-control` / `body-triangle-control`. Where an existing skill already
covers the technique, **repoint instead of authoring**, and say so in the summary. Expect the
authored count to drop below 5, and confirm any reduction with the user.

### 6.3 New skills, if authored

Each one needs the full package per AGENTS.md: `skill.json` (id, domain, level, tags, relations,
featureFlags), `content.en.json`, `content.vi.json`, `content.fr.json`, and `videos.json` with at
least one live no-gi video verified through oEmbed. No invented technique detail, coach quotes or
competition claims, and no adapted gi mechanics. New skills also get wired into the shared data
(positions, concepts, archetypes) so they are not orphans.

### 6.4 Position to skill mapping plan (answers O1, part 1)

This is the concrete proposal for the 88 skills that no position currently references. It is
validated as data against the current corpus: **88 of 88 placed, 0 unknown ids, 0 skill added to a
position that already had it, no skill in more than 3 steps, largest step 11 skills.**

How to apply it: append the listed ids to `relatedSkillIds` in
`content/positions/<position-id>/position.json`. Never replace or reorder the existing curated
refs, and never hand-edit `public/generated/`.

| # | Step (position id) | Now | Added | Total | Skills added |
| --- | --- | --- | --- | --- | --- |
| 1 | `neutral-standing` | 3 | 6 | 9 | `double-leg-bjj`, `ankle-pick-low-single`, `bjj-foot-sweeps`, `body-lock-takedown`, `lateral-drop-headlock-throw`, `arm-drag-system` |
| 2 | `hand-fighting-position` | 3 | 2 | 5 | `seated-hand-fighting`, `arm-drag-system` |
| 3 | `closed-guard` | 7 | 4 | 11 | `clamp-to-triangle-bridge`, `gogoplata`, `shoulder-crunch-control`, `pistol-grip-armbar` |
| 4 | `half-guard-bottom` | 3 | 4 | 7 | `coyote-half-guard`, `deep-half-guard`, `half-guard-bottom-escape`, `half-butterfly-to-leg-entanglements` |
| 5 | `knee-shield-half-guard` | 3 | 2 | 5 | `coyote-half-guard`, `deep-half-guard` |
| 6 | `seated-guard` | 3 | 6 | 9 | `seated-hand-fighting`, `octopus-guard-control`, `octopus-guard-sweep`, `octopus-back-take`, `wrestling-up-from-guard`, `hip-heist-wrestle-up` |
| 7 | `supine-guard` | 3 | 4 | 7 | `omoplata-system`, `choi-bar`, `baratoplata`, `tarikoplata` |
| 8 | `butterfly-guard` | 3 | 1 | 4 | `half-butterfly-to-leg-entanglements` |
| 9 | `side-control-top` | 3 | 1 | 4 | `chin-strap-control` |
| 10 | `side-control-bottom` | 3 | 2 | 5 | `buggy-choke`, `reverse-buggy-choke` |
| 11 | `mount-top` | 3 | 4 | 7 | `s-mount-control`, `s-mount-armbar`, `mounted-triangle`, `mounted-triangle-armbar` |
| 12 | `mount-bottom` | 3 | 0 | 3 | none |
| 13 | `back-control-position` | 3 | 5 | 8 | `gift-wrap-back-take`, `leg-drag-to-back-take`, `octopus-back-take`, `truck-twister`, `crucifix-control` |
| 14 | `back-escape-position` | 3 | 1 | 4 | `back-survival` |
| 15 | `headquarters-top` | 5 | 6 | 11 | `hq-split-squat-passing`, `over-under-pass`, `tripod-folding-pass`, `leg-drag-pass`, `outside-passing`, `toreando-passing` |
| 16 | `knee-cut-position` | 4 | 3 | 7 | `leg-drag-pass`, `over-under-pass`, `hq-split-squat-passing` |
| 17 | `bodylock-passing-position` | 3 | 2 | 5 | `over-under-pass`, `tripod-folding-pass` |
| 18 | `turtle-top` | 3 | 5 | 8 | `spiral-ride`, `power-half-ride`, `crucifix-control`, `dagestani-handcuff`, `chin-strap-control` |
| 19 | `turtle-bottom` | 4 | 2 | 6 | `turtle-escape-standup`, `turtle-to-guard-recovery` |
| 20 | `front-headlock-top` | 3 | 7 | 10 | `front-headlock-system`, `anaconda-choke`, `darce-choke`, `high-wrist-guillotine`, `peruvian-necktie`, `von-flue-choke`, `fhl-go-behind` |
| 21 | `front-headlock-bottom` | 3 | 1 | 4 | `guillotine-defense-escape` |
| 22 | `knee-on-belly` | 4 | 1 | 5 | `chin-strap-control` |
| 23 | `north-south` | 4 | 2 | 6 | `north-south-escape`, `peruvian-necktie` |
| 24 | `de-la-riva-guard` | 6 | 1 | 7 | `berimbolo-back-take` |
| 25 | `reverse-de-la-riva-guard` | 5 | 0 | 5 | none |
| 26 | `x-guard-position` | 3 | 2 | 5 | `berimbolo-back-take`, `wrestling-up-from-guard` |
| 27 | `z-guard` | 4 | 2 | 6 | `coyote-half-guard`, `deep-half-guard` |
| 28 | `k-guard-position` | 3 | 2 | 5 | `k-guard-to-outside-ashi`, `false-reap-to-saddle-bridge` |
| 29 | `inverted-guard` | 4 | 1 | 5 | `berimbolo-back-take` |
| 30 | `single-leg-x` | 4 | 7 | 11 | `toe-hold-system`, `toe-hold-estima-lock`, `aoki-lock`, `shotgun-ankle-lock`, `z-lock`, `heel-hook-finishing-system`, `inside-outside-heel-hook` |
| 31 | `outside-ashi` | 4 | 5 | 9 | `k-guard-to-outside-ashi`, `heel-hook-finishing-system`, `inside-outside-heel-hook`, `calf-slicer-system`, `leg-lock-defense` |
| 32 | `saddle-inside-sankaku` | 4 | 4 | 8 | `false-reap-to-saddle-bridge`, `texas-cloverleaf`, `calf-slicer-system`, `knee-line-escape` |
| 33 | `backside-50-50` | 6 | 4 | 10 | `fifty-fifty-to-heel-exposure`, `mussolini-lock`, `calf-compression-locks`, `bear-trap-ham-sandwich` |
| 34 | `dogfight` | 3 | 1 | 4 | `dogfight-knee-tap` |
| 35 | `scramble-neutral` | 3 | 2 | 5 | `hip-heist-wrestle-up`, `wrestling-up-from-guard` |
| 36 | `crab-ride-position` | 3 | 1 | 4 | `truck-twister` |
| 37 | `cross-wrist-ride-position` | 4 | 2 | 6 | `crucifix-control`, `dagestani-handcuff` |
| 38 | `claw-ride-position` | 4 | 2 | 6 | `spiral-ride`, `power-half-ride` |
| 39 | `arm-triangle-threat` | 3 | 0 | 3 | none |
| 40 | `rear-naked-choke-threat` | 3 | 4 | 7 | `back-attack-system`, `rear-triangle-control`, `body-triangle-control`, `thunder-lock` |

Three positions gain nothing, on purpose: `mount-bottom` (its existing `mount-survival`,
`mount-escape` and `half-guard-knee-shield` already carry the defensive set), and
`reverse-de-la-riva-guard` (the transitions and control already there carry the step) and
`arm-triangle-threat` (a threat step, where the choke itself is taught in the `mount-top` step).

Result: position coverage goes from 66/154 to **145/154**, and with the two extra steps in 6.5 the
Path tab reaches **154/154**. Per-domain coverage is complete for all ten domains
(8/8, 9/9, 7/7, 12/12, 28/28, 5/5, 10/10, 16/16, 43/43, 16/16).

Which clusters drove the plan:

- **Stand-up and wrestling (16 skills)** land in `neutral-standing` and `hand-fighting-position`:
  the takedowns, foot sweeps, ankle pick, body lock and arm drag sit next to `single-leg-bjj`,
  which is already there.
- **Front headlock (10 skills)** land in `front-headlock-top`, which is where the system hub, the
  three main finishes (Anaconda, D'arce, Guillotine variants) and the go-behind belong. The
  `peruvian-necktie` also appears in `north-south`, which is a legitimate entry for it.
- **Passing (10 skills)** land in `headquarters-top` as the primary step, with the same passes also
  reachable from `knee-cut-position` and `bodylock-passing-position` where they are genuinely run.
- **Leg lock finishes (19 skills)** are distributed across the four entanglement positions
  (`single-leg-x`, `outside-ashi`, `saddle-inside-sankaku`, `backside-50-50`) instead of piling
  into one step, and `leg-lock-defense` also appears in the Safety step, since defense is the
  safety-critical half of that family.
- **Turtle and rides (8 ride-family skills)** land in `turtle-top`, `crab-ride-position`,
  `cross-wrist-ride-position` and `claw-ride-position`, which is where the ride chain already lives.
- **Guard attacks (guard_offense 28 skills)** split by where they are actually played:
  clamp and shoulder-crush work into `closed-guard`, omoplata and its hybrids into `supine-guard`,
  half guard variants into `half-guard-bottom`, `knee-shield-half-guard` and `z-guard`, and the
  octopus chain plus wrestle-up entries into `seated-guard`.
- **Back attack (8 skills)** splits by intent: control and back takes into
  `back-control-position`, and the finishes plus the attack system into `rear-naked-choke-threat`.

### 6.5 Extra non-position steps (answers O1, part 2)

Two extra steps hold the skills that genuinely do not belong to one position. Both are ordered
groups of skills rather than positions, and both get names in all three locales.

| Step id | Name (en) | Skills | Why it is not a position |
| --- | --- | --- | --- |
| `foundations-and-systems` | Foundations and systems | `inside-position`, `positional-hierarchy`, `dilemmas-two-way-attacks`, `failure-response-transitions` | These are cross-cutting principles: inside position, the positional hierarchy, two-way dilemmas and the failure-response decision tree apply in every position |
| `safety-and-recognition` | Safety and recognition | `kani-basami-safety`, `neck-crank-recognition`, `reaping-awareness`, `smother-safety`, `leg-lock-defense`, `compression-vs-strangle-recognition` | Recognition and safety skills, including three tagged `risk:safety-critical`; they must be findable without knowing a position, and this app treats leg lock, neck and compression safety as first-class |

Where they sit in the order:

- `foundations-and-systems` goes **first**, before `neutral-standing`, because `inside-position` and
  `positional-hierarchy` are the orientation skills a new user needs before any position makes
  sense. This also puts two of the 19 beginner skills and one system skill at the very top of the
  Path tab.
- `safety-and-recognition` goes **last**, after `rear-naked-choke-threat`, as a revisitable
  reference step. It is intentionally last because the leg entanglement positions appear earlier in
  the order, and the safety step reads as the summary of what to watch for across all of them.

Order mechanism (important, and it is data, not code):

- Add `content/shared/path.json`: an ordered array of entries,
  `{ "kind": "group", "id": "foundations-and-systems" }` and `{ "kind": "position", "id": "neutral-standing" }`.
  Group skill lists and localized names live in `content/paths/<group-id>/` following the
  position folder pattern (`path.json` plus `content.{en,vi,fr}.json`), so the builder treats them
  like any other entity.
- `content/shared/positions.json` is **not** modified. It keeps driving `/positions` and
  `/learn` ordering, which means the two new steps do not leak into those pages.
- `build-content.ts` emits per-locale `public/generated/manifest/path.{en,vi,fr}.json` with the
  ordered steps and their resolved, already sorted skills, plus `pathStepIds` per skill in the
  skills manifest so a skill row can say which step it belongs to. Full detail in 6.8.
- `validate:relations` enforces: every position appears in `path.json` exactly once, every group
  id resolves, every group skill id resolves, no skill id repeated inside one step, and every one
  of the 154 skills is reachable from at least one step.

Naming translations (group labels are labels, not technique names, so they are translated):

- `foundations-and-systems`: en "Foundations and systems", vi "Nền tảng và hệ thống",
  fr "Fondations et systèmes".
- `safety-and-recognition`: en "Safety and recognition", vi "An toàn và nhận diện",
  fr "Sécurité et reconnaissance".

### 6.6 Applying the mapping: rules

1. Additions append to `relatedSkillIds`. Existing curated refs are preserved exactly, in order.
2. Array order inside a position is not the display order. The Path tab and any list that shows a
   step renders the derived order from 5.3 (level, then prerequisite depth).
3. A skill may appear in at most 3 steps. The plan above satisfies this: the four skills that
   initially landed in 4 steps (`wrestling-up-from-guard`, `crucifix-control`, `dagestani-handcuff`,
   `berimbolo-back-take`) were trimmed to their 3 strongest steps.
4. Membership is still allowed to repeat where it is genuinely earned, for example
   `heel-hook-finishing-system` and `inside-outside-heel-hook` in `single-leg-x`, `outside-ashi` and
   `saddle-inside-sankaku`, and `chin-strap-control` in `side-control-top`, `knee-on-belly` and
   `turtle-top`.
5. Steps longer than 8 skills render level sub-groups (Beginner, Intermediate, Advanced) and show
   the first 8 with a "show all N" control. Five steps reach 10 or 11: `closed-guard`,
   `headquarters-top` and `single-leg-x` at 11, `front-headlock-top` and `backside-50-50` at 10.
6. No position loses a reference, and no risk metadata or safety guidance changes.
7. Some additions are safety-critical (`inside-outside-heel-hook`, `leg-lock-defense`,
   `kani-basami-safety`, `neck-crank-recognition`, `reaping-awareness`, `smother-safety`,
   `compression-vs-strangle-recognition`): they must keep their existing `risk:*` tags and the
   Path step must not present them as beginner material. `safety-and-recognition` is a step, not a
   digest of warnings, and each row keeps its own risk badge.

### 6.7 Authoring checklist for the mapping

Per position edit:

1. Read the position's `content/positions/<id>/content.{en,vi,fr}.json`. If the prose enumerates
   its skills, update it in all three locales in the same change; if it does not, leave it alone.
2. Append the ids in `content/positions/<id>/position.json`.
3. `npm run build:content`, then `npm run validate:content` (0 errors, 0 warnings) and the new
   `npm run validate:relations`.

For the two new steps:

1. Create `content/paths/<group-id>/` with `path.json` (`id`, `kind: "group"`, `skillIds`) and
   `content.{en,vi,fr}.json` (`name`, `summary`, `whyItMatters` following the position content
   shape).
2. Add both to `content/shared/path.json` in the order described above.
3. Keep the VI copy natural, and never translate a technique name.

### 6.8 Path data end to end (schema, builder, validator, runtime)

Goal: the Path tab makes one fetch that returns ordered steps with their skills already resolved
and sorted, so the hub does no graph work at runtime and the ordering is reviewable in diffs.

#### 6.8.1 Source files

`content/shared/path.json` (new) is the only place the Path order is authored:

```json
[
  { "kind": "group", "id": "foundations-and-systems" },
  { "kind": "position", "id": "neutral-standing" },
  { "kind": "position", "id": "hand-fighting-position" }
]
```

Shown shortened: the real file holds 42 entries, the two groups plus all 40 positions in the order
settled in 6.5 (`foundations-and-systems` first, `safety-and-recognition` last). Position steps need
no new source: they resolve through `content/positions/<id>/position.json` and its
`relatedSkillIds`, including the 6.4 additions.

`content/paths/<group-id>/path.json` (new, one folder per group step), mirroring the position
folder pattern so the builder and the reviewers already know the shape:

```json
{
  "id": "foundations-and-systems",
  "kind": "group",
  "skillIds": ["inside-position", "positional-hierarchy", "dilemmas-two-way-attacks", "failure-response-transitions"]
}
```

`content/paths/<group-id>/content.{en,vi,fr}.json` (new, all three required):

```json
{ "id": "foundations-and-systems", "locale": "en", "title": "Foundations and systems", "description": "..." }
```

TypeScript shapes to declare in `build-content.ts` next to `PositionMetaJson`:

```ts
interface PathGroupMetaJson { id: string; kind: 'group'; skillIds: string[] }
interface PathGroupContentJson { id: string; locale: string; title: string; description: string }
```

#### 6.8.2 Builder changes (`scripts/content/build-content.ts`)

Reuse what is already there: `jsonPath`, `generatedPath`, `writeJson` (stable 2-space JSON plus a
trailing newline), `readJsonSafe`, `LOCALES`, and the `zodValidate` collector that makes the build
exit non-zero when `validationErrors > 0`.

Add `buildPathManifests(): number`, called from `main()` after the position section, writing one
artifact per locale:

```
public/generated/manifest/path.en.json
public/generated/manifest/path.vi.json
public/generated/manifest/path.fr.json
```

Why these paths, and not a single `public/generated/path.json`:

- The PWA runtime cache in `vite.config.ts` matches
  `/^https?:\/\/.*\/generated\/(skills|concepts|positions|manifest|videos)\/.*\.json$/` with
  NetworkFirst under `nogimind-content-v2`. Files inside `manifest/` are covered automatically;
  a top-level `generated/path.json` would fall outside the pattern and be unavailable offline.
- Per-locale matches the existing convention (`skills.<locale>.json`, `positions/<locale>/<id>.json`)
  and keeps the payload to the active language only.

Emitted entry shape, per locale:

```ts
interface PathManifestEntry {
  id: string          // position id or group id
  kind: 'position' | 'group'
  name: string        // localized step name
  description: string // one line purpose; the position description for position steps
  skillIds: string[]  // resolved and already in display order
}
```

Resolution and ordering per step: for `kind: 'position'` read `relatedSkillIds` from
`content/positions/<id>/position.json`; for `kind: 'group'` read `skillIds` from
`content/paths/<id>/path.json`. Then sort with the shared ordering module (6.8.4) so the artifact
is pre-sorted and the runtime does no ordering work at all.

Also emit `pathStepIds: string[]` per skill in the three `manifest/skills.<locale>.json` files, by
inverting step to skill (a skill in several steps gets several ids, in path order). This is what
lets a skill row or detail page say which step it belongs to without another fetch.

Zod: add `PathGroupMetaSchema`, `PathGroupContentSchema` and `PathManifestEntrySchema` beside the
position schemas, and validate the group files plus every emitted entry through `zodValidate`, so a
malformed group fails the build exactly like a malformed position does.

Idempotency: a second `npm run build:content` must leave `public/generated/` byte-identical, which
is how the large generated diff stays reviewable.

#### 6.8.3 Validator checks (`scripts/content/validate-relations.ts`)

Path checks, all reading `content/` so they run without a build:

| Check | Severity |
| --- | --- |
| `content/shared/path.json` parses and every entry has a valid `kind` | error |
| every `kind: 'position'` entry resolves to `content/positions/<id>/position.json` | error |
| every `kind: 'group'` entry resolves to `content/paths/<id>/path.json` and all three locale content files | error |
| every position in `content/shared/positions.json` appears exactly once in `path.json`, and no path entry is unknown to either source | error |
| no duplicate skill id inside one step's resolved list | error |
| every resolved skill id exists under `content/skills` | error |
| union of all step skill ids covers every skill in the corpus | error |
| group `skillIds` is non-empty | error |
| a step holds more than 10 skills | informational |
| a skill is reachable from more than 3 steps | informational |
| `content/shared/path.json` does not exist yet | informational, and all other path checks are skipped with a note |

That last row is what allows the validator to land in S1, before the path sources exist, and become
fully strict once S3 adds them.

#### 6.8.4 Shared ordering module

Extract the 5.3 algorithm into one module imported by both the builder and the tests, for example
`scripts/content/skill-order.ts` exporting `deriveDepth(skills)` and `deriveOrder(skills)`:

- Imported by `build-content.ts` to fill `depth` and `order`, and to pre-sort path steps.
- Imported by the vitest suite, so tests exercise the real implementation instead of a copy that can
  drift.
- Pure functions over a plain `{ id, level, prerequisiteSkillIds }[]`, no filesystem access, no
  React and no browser API, so it stays trivially testable.

#### 6.8.5 Runtime and hub read path

- New `src/content-runtime/path.ts`, modelled on `src/content-runtime/positions.ts`:
  `getPathManifest(locale)` fetching `/generated/manifest/path.${locale}.json`, with the same
  promise cache plus result cache pattern as `manifests.ts`, and `prefetchPathManifest(locale)` and
  `clearPathCache()` for parity with the existing modules.
- `src/queries/contentQueries.ts`: add `contentKeys.path(locale)` and `usePathStepsQuery(locale)`, reusing the
  `staleTime: 5 * 60 * 1000` and `gcTime: 30 * 60 * 1000` already used by `useManifestQuery`.
- Path tab wiring: `usePathStepsQuery(language)` supplies the ordered steps, `useSkillsQuery()`
  supplies each row's localized name, level, risk and chain ids. Because steps arrive pre-sorted,
  the tab does no sorting or filtering of its own beyond what the user asks for.
- Offline: the new files ride the same NetworkFirst `nogimind-content-v2` rule, so the Path tab works
  offline once visited. No service worker or `vite.config.ts` change is required.
- Fallback: if `path.<locale>.json` is missing (an older cached build), the tab derives steps from
  the skills manifest `positionIds` plus the two known group ids, losing only the authored order.
  Keep this behind one helper so there is a single place to delete it later.

## 7. UI specification

### 7.1 Hub shell and tabs

- Header: title, subtitle, and the visible/total count already present on `/skills`.
- Tab strip via `HubTabBar`: **Path** and **Catalog**. Real links so both tabs are shareable and
  the browser back button works; `aria-current` on the active tab.
- Default entry `?tab=path`. Switching tabs preserves `q` and filters where meaningful.

### 7.2 Path tab (D9)

- Steps come from `public/generated/path.json`: the two extra steps plus the 40 positions in
  `content/shared/positions.json` order (section 6.5).
- Each step shows the position name, a one-line purpose, and its skills ordered by the derived
  rules in 5.3. Steps collapse and remember their open state per session.
- Steps with more than 8 skills show level sub-groups and a "show all N" control (6.6 rule 5).
- A single **Next up** card at the top of the tab: derived from the graph plus recently viewed
  (stateless, D11). Candidate rule: among skills with no recently viewed entry, prefer the lowest
  depth and beginner level inside the position or step the user last visited.
- Chain chips render inline on each row (the compact `SkillChain` variant that exists today), so
  the connection is visible without opening the skill.

### 7.3 Catalog tab (D10)

- Search field is the primary control and is always visible.
- Filter model and layout: section 7.6.
- Result rows keep the current information shape (name, summary, level/domain/risk badges, chain
  chips) and add the connection counts, which are meaningful once 5.1 lands.
- Sort selector: Journey order (default, D6) and A to Z. Both deterministic.

### 7.4 Responsive behaviour

| Viewport | Path tab | Catalog tab |
| --- | --- | --- |
| Phone (< 640) | Step chips in a sticky bar under the header, with a right-edge fade hinting at more; single column; Next up card first; tab strip scrollable | Sticky search bar plus Filters button; preset chips in a swipeable row; filters open in a bottom sheet (7.6.4); rows are single-column cards |
| Tablet (640 to 1023) | Same sticky step chips; two-column skill grid inside a step | Facet chips wrap inline, no sheet |
| Small laptop (1024 to 1279) | Left rail (sticky step list), single content column | Two-column grid |
| Wide desktop (>= 1280) | 3 columns `[sticky step rail] [content] [Next up, chain legend, recently viewed]`, matching the current StudyPage `xl:grid-cols-[240px_1fr]` / `2xl:grid-cols-[280px_1fr_300px]` where there is room | 2 to 3 column grid with the same rails |

Rules that apply everywhere: no horizontal scroll trap, minimum 44px touch targets, chips
truncate rather than stretch a row, sticky regions never exceed 30% of viewport height, and the
existing bottom tab bar on phones stays the primary navigation.

### 7.5 States, accessibility, i18n, motion

- States: loading (content is NetworkFirst, so keep the existing skeleton/empty patterns),
  empty (no filter matches, with clear-all), and error (manifest unavailable, offline).
- Accessibility: real `<nav>` landmarks with labels, `aria-current` for the active step and tab,
  `aria-expanded` on the filters button with an active count, focus-visible rings on all chips,
  decorative icons `aria-hidden`.
- i18n: all new copy lands in `src/i18n/resources/{en,vi,fr}.ts` in the same change, VI written
  naturally with BJJ loanwords kept and no translated technique names. `i18nCoverage.test.ts`
  scans `t('literal')` calls in `.tsx`, so every new key must exist in all three locales.
- Motion: reuse `page-enter`, `animate-fade-in` and the existing
  `StaggerContainer`/`StaggerItem` patterns. No new motion vocabulary.

### 7.6 Smarter filter model (answers O2)

Replaces the current `SkillSearchFilters` grid: 8 selects plus a search field plus a clear button,
which on a phone stacks into a full screen of controls before the first result. The target is
fewer, better-ranked controls, all still shareable through the URL.

`src/components/skills/SkillSearchFilters.tsx` already filters correctly; the work is presentation
and priority, not the filter logic. Composition, top to bottom:

1. **Search field**, always visible, sticky on phones inside the catalog header. It stays the
   primary path into the catalog.
2. **Preset chips**, one row, reusing `FilterChipRow` + `FilterChip` from
   `src/components/common/FilterChip.tsx` (swipeable one-line row on phones, wrapping from `sm`
   up, `aria-pressed` state, no layout shift between active and inactive).
3. **Contextual facet chips**, at most 3 groups, derived from the current result set (7.6.2).
4. **Active filter tray**: removable chips for every active value, a result count, and clear all.
5. **Everything else** behind the Filters button and the bottom sheet (7.6.4).

#### 7.6.1 Presets (curated, with today's counts)

A preset is a named parameter set written into the same URL params as manual filters, so presets
and manual filtering compose. A preset chip is active only when the current params match its set
exactly, and tapping an active preset clears it.

Recommended default row (5 chips, chosen for the two largest audiences: beginners and modern
no-gi training):

| Chip | Params | Matches today |
| --- | --- | --- |
| Beginner start | `level=beginner` | 19 |
| Guard passing | `family=passing` | 10 |
| Leg locks | `family=leg-lock` | 19 |
| Front headlock | `family=front-headlock` | 8 |
| Safety critical | `risk=safety-critical` | 11 |

Reserve candidates, ready to swap in without new code (all measured):

| Candidate | Params | Matches today |
| --- | --- | --- |
| Back attacks | `domain=back_control` or `family=back-take` | 9 (domain) / 5 (family) |
| Wrestling | `family=wrestling` | 11 |
| Escapes | `domain=escapes` | 9 |
| Rides and pins | `family=ride` or `family=pin` | 9 |
| Modern expansion | `tier=modern-expansion` | 38 |
| Submissions, advanced | `domain=submission_systems&level=advanced` | 33 |
| Has checklist | `depth=checklist` (see 7.6.2) | 38 |

Note on `family=leg-lock`: 19 skills, of which 15 are advanced, 3 intermediate and 1 beginner, with
only 4 also tagged `risk:safety-critical`. The leg-lock family is therefore best served by two
chips, the broad one and the safety-critical one, rather than one.

#### 7.6.2 Facet groups, priority rule and live counts

Facet groups, in priority order, with the size of each value set today:

| Order | Group | Values | Largest / smallest value today | Where it renders |
| --- | --- | --- | --- | --- |
| 1 | `domain` | 10 | submission_systems 43 / guard_retention 5 | Chips when it splits the set, always in the sheet |
| 2 | `level` | 3 | intermediate 77 / beginner 19 | Chips when it splits the set, always in the sheet |
| 3 | `family` | 13 | leg-lock 19 / scramble, pin, compression 1 | Chips when it splits the set, always in the sheet |
| 4 | `risk` | 4 | medium 22 / low 6 | Sheet, plus a chip when a safety-critical subset exists in the results |
| 5 | `tier` | 4 | core 101 (untagged) / advanced-niche 7 | Sheet only |
| 6 | `depth` (`hasChecklist` 38, `hasMicroDetails` 3, `hasVideos` 154) | 3 | checklist 38 | Sheet only, framed as "Depth" |
| 7 | plain tags | 147 skills carry at least one | varies | Sheet only, and only tags present in the current result set |

Priority rule (the "smarter" part): a facet group renders as a chip row only if it **splits the
current result set**, meaning at least two of its values are present among the current results and
at least one of them would return fewer results than the current total. Groups are ranked by how
much they narrow the set (largest reduction first, ties broken by the priority order above), and
only the top 3 chip rows render. So with no filters the user sees domain, level, family; after
choosing `domain=passing` the family row may drop out (all 9 passing-family results share one
value) and risk or tier takes its place; the sheet always lists every group.

Retired as controls, kept in the URL contract so existing links do not break:

- `system` (30 `group:*` values, each with 1 to 7 skills) is noise as a control: too many values,
  too small each. Keep parsing it, and show it as an active-filter chip only when present.
- `meta` has 3 values (modern_common 43, specialized 7, emerging 3). Same treatment.
- `tag` free-select is replaced by plain-tag chips shown only when relevant to the current
  results, with the existing dedupe rule from `SkillSearchFilters` (values that repeat a domain,
  family or system label are excluded).

Live count semantics (get this right or the counts feel broken):

- Each facet value's count is computed against the result set with every other active filter
  applied, but **ignoring its own group**, so values inside a group can be compared against each
  other.
- Counts are shown next to each value and 0-count values are suppressed, except when suppressing
  them would leave group with no values, in which case the group only renders if it can still
  split the set.
- The header count (`visible/total`, already on `/skills`) stays as the single "how many results
  now" number.
- Counts must be derived from the same pipeline the list uses (`searchSkills`), and must use
  `src/utils/searchText.ts` (`normalizeSearchQuery` + `haystackIncludesQuery`) for any text
  matching, so unaccented Vietnamese input keeps working (`khoa tay` matching `khóa tay`).

URL contract (unchanged names plus one addition): `q`, `domain`, `level`, `tag`, `library`,
`family`, `system`, `risk`, `sort`, `tab`. Presets and facet chips only ever write these, so any
filtered view is a shareable link and the back button behaves.

#### 7.6.3 Desktop behaviour

- No sheet. Search, preset row, contextual facet rows and the active tray render inline above the
  results, facet rows wrapping (that is what `FilterChipRow` already does from `sm` up).
- Facet groups beyond the top 3 render as a wrapped "More filters" disclosure, collapsed by
  default, so a 1440 wide catalog shows at most 4 rows of controls.
- Optional: show counts as faint superscripts to keep rows compact.

#### 7.6.4 Phone sheet behaviour

- Trigger: a `Filters` button inside the sticky catalog header, next to search, with
  `aria-expanded` and a badge showing the number of active facet values (excluding `q`).
- Surface: a bottom sheet, `role="dialog"` with `aria-modal="true"` and `aria-labelledby` pointing
  at its heading, rounded top corners using theme tokens, `max-h-[85vh]`, scrollable body, sticky
  footer. A drag handle is a visual affordance; close paths are the handle's close button,
  backdrop tap, and Escape.
- Focus and scroll: focus moves into the sheet on open (heading or first chip), is trapped while
  open, returns to the Filters button on close, and background scroll is locked. Reuse the
  existing dialog pattern in `src/components/common/KeyboardShortcutsOverlay.tsx`
  (framer-motion `AnimatePresence`, Escape handling, focus management) instead of adding a
  dependency or a new modal library.
- Applying: filters apply live to the list behind the sheet through URL params, so the footer
  button always shows the true count. The footer's primary button reads "Show N results" and only
  closes the sheet. There is deliberately no separate draft state to keep in sync with the list.
- Empty result: if the current combination matches nothing, the sheet stays open, the footer button
  is disabled and reads "No matches", and the sheet offers "Remove the most restrictive filter",
  which clears the single active filter whose removal recovers the most results.
- Sheet content order: preset row, then facet groups in the priority order above, each group
  collapsible with its active values badged, then the plain-tag list.
- Sheet scroll position is preserved between open and close.
- Sheet is phone-only (< 640). Tablet and up use the inline layout in 7.6.3 with the same
  components.

#### 7.6.5 Filter model acceptance

- With no active filters, at most 3 facet chip rows are visible, and the phone shows one search
  field, one preset row, at most 3 chip rows and one Filters button, with the first result above
  the fold on a 375x667 screen.
- Every control writes URL params only, and reloading a filtered URL restores the exact view.
- Counts change correctly when a filter inside the same group is switched.
- No user-facing text filter bypasses `src/utils/searchText.ts`.
- A facet group never renders if it cannot split the current set, and never renders an empty row.

## 8. Routing, redirects and navigation

| From | To | Reason |
| --- | --- | --- |
| `/study` | `/skills?tab=path` | D8 |
| `/study?domain=X` | `/skills?tab=catalog&domain=X` | Preserve the existing deep link intent from `LearnPage.tsx` (`to: '/study'` and `/skills?domain=survival_defense` style links) |
| `/skills` | `/skills?tab=path` (default) | Canonical default, no redirect needed if the tab is read from a missing param |
| `/skills/:skillId` | unchanged | Detail route stays; `SkillHeader` keeps using the `from` router state for back navigation |

Places that reference the old routes and must be updated in the same change:
`src/router/AppRouter.tsx` (route table plus an explicit `<Navigate>` redirect, following the
existing `/build` and `/troubleshooters/*` precedent), `src/components/layout/navItems.ts`
(study hub items), `src/components/layout/Layout.tsx` (the `t` keyboard chord), and
`src/components/dashboard/DashboardHubExplorer.tsx`.

Search deep links are safe: `src/utils/searchEngine.ts` only appends anchors to `/skills/...` URLs,
which do not change.

## 9. Verification and acceptance gates

Existing gates that must stay green after every stage: `npm run typecheck`, `npm run lint`,
`npm test`, `npm run validate:content` (0 errors, 0 warnings), `npm run build`.

New:

1. `npm run validate:relations` (new `scripts/content/validate-relations.ts`), asserting:
   - 0 dangling ids across `prerequisiteSkillIds`, `nextSkillIds`, `relatedSkillIds`, `relatedSkills[].id`,
     position to skill references, and `path.json` group skill ids;
   - 0 asymmetric next/prerequisite pairs after mirroring;
   - 0 cycles in the prerequisite graph;
   - 0 duplicate ids, and every id lowercase kebab-case equal to its folder name;
   - 0 level inversions (warning today, error once content is reconciled);
   - path integrity: every position appears in `path.json` exactly once, no skill id repeated
     inside a step, and every one of the 154 skills reachable from at least one step;
   - informational, not failing: step sizes above 10, skills in more than 3 steps, and the count
     of skills that carry a prerequisite but no next step.
    Where it runs (settled):
   - locally as `npm run validate:relations`, next to the existing gates;
   - `.github/workflows/content-validation.yml`, a step after `Validate content against Zod schemas`,
     which covers content PRs (that workflow is path-filtered to `content/**`);
   - `.github/workflows/ci.yml`, the `build` job, a step after `Verify content payloads`, because a
     change to `scripts/content/build-content.ts` or the ordering module touches neither `content/**`
     nor the app and would otherwise skip the content workflow. This mirrors how `validate:content`
     already runs in both workflows.
   Severity split (settled): errors fail the command and therefore CI. Informational lines print a
   summary and never fail, which is what keeps the tool usable while content is being authored.
   Not doing, and why:
   - no Playwright or visual regression tooling: breakpoint checks stay manual using the existing
     scratch CDP scripts under `.freebuff/`, with before and after screenshots in the PR description;
   - no new CI job: the validator rides the two existing workflows;
   - no extra CI artifact check: idempotency is verified where the artifact is regenerated, by
     running `build:content` twice and confirming `git status` is clean.
2. Unit tests, importing the shared ordering module from 6.8.4 so they test the real implementation:
   order derivation (no skill ordered before its prerequisites inside a group, deterministic
   tie-breaks, cycle handling), path step view model (positions plus the two extra steps, counts,
   no duplicates, level sub-groups), catalog facet derivation (a facet that cannot split the set is
   hidden, counts ignore their own group), preset matching (active state, URL round-trip), redirect
   mapping for `/study` variants, and search folding for the new filter inputs.
3. Update existing tests that encode current behaviour: `src/pages/StudyPage.test.tsx` (4 tests)
   and `src/pages/SkillDetailPage.test.tsx`.
4. Breakpoint checks at 375x667, 768x1024 and 1440x900 for both tabs, plus the phone filter sheet
   open and closed, on both themes. The repo already has scratch Chrome/CDP scripts under
   `.freebuff/` (`tmp-iphone-se.mjs`, `tmp-chain-shot.mjs`) that can be reused rather than adding
   tooling.
5. Content invariants: `npm run build:content` must be idempotent (a second run leaves
   `public/generated/` byte-identical), and `npm run audit:vi` must stay clean for new VI copy.

## 10. Files expected to change

Content and build:

- `content/positions/<id>/position.json` for the 37 positions that gain skills in 6.4 (all but
  `mount-bottom`, `reverse-de-la-riva-guard` and `arm-triangle-threat`), plus their
  `content.{en,vi,fr}.json` where the prose enumerates skills.
- `content/skills/<folder>/<id>/skill.json` for the ~20 skills listed in 6.1, plus new skill
  folders if 6.3 proceeds.
- New `content/shared/path.json` and `content/paths/<group-id>/` for the two extra steps (6.5).
- `scripts/content/build-content.ts` (mirroring, `depth`, `order`, `relations`, `positionIds`,
  `path.json` artifact) and `scripts/content/validate-content.ts` (mirror disagreement as an
  error), plus new `scripts/content/validate-relations.ts`.
- `public/generated/**` regenerated by `npm run build:content` only. Expect a large manifest diff
  plus a new `public/generated/path.json`.

Runtime and UI:

- `src/content-runtime/manifests.ts`, a new path runtime module, and `src/types/skill.ts`
  (new fields, `SortMode`).
- `src/repositories/skillsRepository.ts` (carry the new fields into `SkillNode`).
- `src/pages/SkillMapPage.tsx` (becomes the hub shell with tabs) and `src/pages/StudyPage.tsx`
  (reduced to the Path tab view, or folded into a new `src/components/skills/PathTab.tsx`).
- New components alongside `src/components/skills/`: catalog tab, path step group, preset row,
  contextual facet row, active filter tray, and the phone filter sheet.
- Reused as-is: `src/components/common/FilterChip.tsx` (`FilterChip`, `FilterChipRow`) and the
  dialog pattern from `src/components/common/KeyboardShortcutsOverlay.tsx`.
- `src/components/skills/SkillSearchFilters.tsx` (replaced by the model in 7.6) and
  `src/components/skill/SkillChain.tsx` (render the relation type once D4 is settled).
- `src/router/AppRouter.tsx`, `src/router/routes.tsx`, `src/components/layout/navItems.ts`,
  `src/components/layout/Layout.tsx`, `src/components/dashboard/DashboardHubExplorer.tsx`.
- `src/i18n/resources/{en,vi,fr}.ts`, and `AGENTS.md` (document the new validator, the path data
  file and the hub route, since section 11 lists the commands and section 3 the repository map).

## 11. Delivery plan (settled, six slices)

Each slice is one reviewable unit with its own PR, and every slice must leave all existing gates
green on its own. **The first shippable slice is S1.**

| Slice | User-visible | Scope | Depends on | Exit gate |
| --- | --- | --- | --- | --- |
| **S1 Data integrity** | No | Repair the 30 dangling refs and the 1 asymmetric pair, add `validate:relations`, wire it into both workflows, document the command in AGENTS.md | Nothing | `validate:content` 0 errors 0 warnings, `validate:relations` 0 errors, `build:content` idempotent |
| S2 Data model and order | Yes: derived order and full connections on the existing `/skills` and `/study` | Mirroring in the build, `relations`/`depth`/`order`/`positionIds` in the manifest, shared ordering module (6.8.4), relation types in `SkillChain` | S1 | Unit tests prove no skill precedes its prerequisites; both lists render in learning order |
| S3 Mapping authoring | Yes: `/positions` and position detail pages list the new skills | Apply 6.4 across the 37 positions, add `content/shared/path.json` and `content/paths/*` sources (6.8.1) | S1 | `validate:relations` path checks active and passing, coverage 154/154 |
| S4 Hub merge and filters | Yes | `/skills?tab=`, `/study` redirect, the 7.6 filter model and phone sheet | S2 | The 7.6.5 acceptance list passes at 375 and 1440 |
| S5 Path tab | Yes | Path tab consuming `path.<locale>.json`, Next up card, sticky step nav, level sub-groups, wide-desktop rails | S3, S4 | Every skill reachable in the UI, breakpoint checks at three widths |
| S6 Polish | Yes | a11y, motion, empty and error states, VI copy review, screenshots | S5 | All gates green, screenshots on both themes |

Why S1 goes first: it is the only slice with no UI surface, it makes the graph trustworthy for every
later slice, it is fully verifiable by a script rather than by eye, it can merge while S2 is still in
review, and it is what D3 already asked for (data first). It is also cheap to revert: content edits
plus one script and two CI steps.

Why S3 comes before S4: authoring the mapping is content-only and mechanically verified, so it takes
review load away from the route change and shrinks S5 into a pure UI slice. It also pays off
immediately, because `src/pages/PositionDetailPage.tsx` already renders `position.relatedSkillIds`
through `SkillLinks` and feeds the position video panel, so the new connections are visible on
existing routes with no UI work at all.

Sequencing detail that matters: S1 lands the validator while `content/shared/path.json` does not
exist yet, so the path checks stay informational until S3 (6.8.3, last row). Without that rule S1
could not ship independently.

## 12. Risks and non-goals

Risks:

- **The 88 uncovered skills are the biggest risk**, and section 6.4 is the mitigation. If O1 is
  rejected, the Path tab cannot reach 57% of the catalog, which would undercut the whole restructure.
- **Mapping quality is a judgement call.** The 6.4 plan assigns each skill to the step(s) where its
  own summary says it is played, and keeps memberships at 3 or fewer, but a reviewer who knows the
  technique set should sanity check the leg lock split across steps 30 to 33 and the 10-skill
  front headlock step (20) before it is authored.
- **Authoring new skills touches knowledge rules.** Each new skill needs sourced content in three
  locales and a verified no-gi video; expect the duplication gate to shrink the list, and treat any
  reduction as a question for the user rather than a silent decision.
- **Level-first ordering can contradict prerequisites** in principle. The validator's inversion
  check is what keeps that honest.
- **Route merge can break deep links and back-navigation.** `/study?domain=` links exist in
  `LearnPage.tsx`, and `SkillHeader`/`SkillChain` depend on the `from` router state. Both are
  covered by the redirect table and by tests.
- **Manifest growth.** Adding relations per locale increases manifest size; measure before and
  after S2 and keep the tab payload within the current order of magnitude.
- **Facet counts are easy to get subtly wrong.** Own-group exclusion (7.6.2) is the specific rule to
  test, because a count that ignores it makes a group look like it has no effect.

Non-goals for this work:

- No mastery or progress tracking (D11).
- No new third-party service, no backend, no new runtime dependency.
- No changes to `/learn`, `/positions`, `/concepts`, `/defense` beyond the links that point at
  the retired `/study` route.
- No gi technique content, no invented grappling detail, and no softening of risk metadata.
- No hand edits to `public/generated/`.

## 13. Inherited constraints (AGENTS.md)

- No em dash (U+2014) anywhere in code, content, comments, docs or commit messages. Use `-`, `,`
  or `.`.
- Ids stay lowercase kebab-case and equal to their folder name; every cross-reference must resolve
  case-sensitively.
- Technique names stay in canonical English in every locale (Heel Hook, Rear Naked Choke, Body
  Triangle, Knee Cut, Straight Ankle Lock, ...). Group and step labels are labels, so
  `foundations-and-systems` and `safety-and-recognition` are translated.
- `public/generated/` is build output: change `content/` and run `npm run build:content`.
- Content and `src/data/` both carry ids: when the path or position data changes, fix both sides
  and re-run validation.
- Reported checks must be honest: no skipped tests, no loosened assertions, no suppressions.

## 14. Implementation checklist

One task is one commit. Run the stage's gates after every task, not only at the end. No em dash
in any file, including commit messages.

### 14.1 S1, ready to implement

Files touched by the whole slice: 17 `skill.json` files, `scripts/content/validate-relations.ts`
(new), `package.json`, `.github/workflows/content-validation.yml`,
`.github/workflows/ci.yml`, `AGENTS.md`.

**T1. Land the validator before touching content.**

- New `scripts/content/validate-relations.ts`, reading `content/` only, no build step required.
  Model the output on `scripts/content/validate-content.ts`: a short header, the counts, then a
  summary block and a non-zero exit on any error.
- Checks and severities: section 9, plus the path checks in 6.8.3 (informational until
  `content/shared/path.json` exists).
- Add `"validate:relations": "tsx scripts/content/validate-relations.ts"` to `package.json`, next to
  `validate:content`.
- Done when: `npm run validate:relations` runs and reports exactly the known backlog, 30 dangling
  refs across 17 files and 1 asymmetric pair, with 0 errors of any other kind.

**T2. Mechanical repairs, 14 refs across 9 files.**

| File (under `content/skills/`) | Field | Change |
| --- | --- | --- |
| `passing/hq-split-squat-passing/skill.json` | `prerequisiteSkillIds`, `relatedSkills[recommended]` | `bodylock-passing` to `bodylock-pass` |
| `passing/over-under-pass/skill.json` | `prerequisiteSkillIds`, `relatedSkills[chain]` | `bodylock-passing` to `bodylock-pass` |
| `pins/mat-return-basics/skill.json` | `relatedSkills[recommended]` | `bodylock-passing` to `bodylock-pass` |
| `pins/side-control-pin/skill.json` | `prerequisiteSkillIds` | `bodylock-passing` to `bodylock-pass` |
| `wrestling/half-guard-wrestle-up/skill.json` | `relatedSkills[recommended]` | `bodylock-passing` to `bodylock-pass` |
| `wrestling/single-leg-bjj/skill.json` | `relatedSkills[recommended]` | `bodylock-passing` to `bodylock-pass` |
| `guard/clamp-to-triangle-bridge/skill.json` | `prerequisiteSkillIds` | `clamp-Guard-system` to `clamp-guard-control` |
| `guard/coyote-half-guard/skill.json` | `relatedSkills[chain]` | `single-leg-x-Guard` to `single-leg-x-basics` or `single-leg-x-control` |
| `submissions/z-lock/skill.json` | `prerequisiteSkillIds` (twice: prereq and related) | `single-leg-x-Guard` to `single-leg-x-basics` or `single-leg-x-control` |
| `submissions/z-lock/skill.json` | `prerequisiteSkillIds`, `relatedSkillIds` | `heel-hook` to `heel-hook-finishing-system` |

**T3. Judgement repairs, 16 refs across 10 files.** These need a grappling decision, so confirm each
before editing. Suggested resolution:

| File | Field | Bad ref | Suggested resolution |
| --- | --- | --- | --- |
| `submission_systems/mounted-triangle/skill.json` | `relatedSkills[supporting]` | `Guard-retention` | Repoint to `supine-guard-retention` or `seated-guard-retention` |
| `submissions/z-lock/skill.json` | `relatedSkillIds` | `ankle-lock` | Repoint to `shotgun-ankle-lock` |
| `submissions/z-lock/skill.json` | `relatedSkillIds` | `knee-bar` | No candidate exists: drop, or author later in S1b |
| `submissions/z-lock/skill.json` | `prerequisiteSkillIds`, `relatedSkillIds` | `saddle-system` | Repoint to `saddle-inside-sankaku-control`, or author in S1b |
| `submissions/z-lock/skill.json` | `nextSkillIds` | `cross-ashi-garami` | Author in S1b, or drop and keep the relation in `relatedSkillIds` once the target exists |
| `submissions/z-lock/skill.json` | `nextSkillIds` | `outside-ashi-garami` | Same as above |
| `guard/clamp-to-triangle-bridge/skill.json` | `prerequisiteSkillIds` | `triangle-armbar-dilemma` | Author, or repoint to `triangle-system` |
| `submissions/baratoplata/skill.json` | `relatedSkills[recommended]` | `triangle-armbar-dilemma` | Same as above |
| `submissions/rear-naked-choke-system/skill.json` | `relatedSkillIds` | `seatbelt-control` | Author in S1b, or repoint to `back-control` |
| `passing/bodylock-pass/skill.json` | `relatedSkills[supporting]` | `leg-pummel-pass` | Author in S1b, or drop |
| `passing/bodylock-pass/skill.json` | `relatedSkills[alternative]` | `smash-pass` | Author in S1b, or drop |
| `submission_systems/peruvian-necktie/skill.json` | `relatedSkills[alternative]` | `d-arce-system` | Repoint to `darce-choke`, or author |
| `submissions/reverse-buggy-choke/skill.json` | `relatedSkills[recommended]` | `triple-attack-system` | Repoint to `buggy-choke`, or author |
| `wrestling/bjj-foot-sweeps/skill.json` | `prerequisiteSkillIds` | `stance-movement-basics` | Author a stance and movement skill, or drop the prerequisite |
| `wrestling/double-leg-bjj/skill.json` | `prerequisiteSkillIds` | `stance-movement-basics` | Same as above |

**T4. Reconcile the one asymmetric pair.**

- `content/skills/submissions/rear-naked-choke-system/skill.json` declares
  `nextSkillIds: ["arm-triangle-mount"]`, while
  `content/skills/submissions/arm-triangle-mount/skill.json` declares
  `prerequisiteSkillIds: ["mount-control"]` only.
- Two honest fixes, pick one after a grappling check: demote the edge to
  `relatedSkills` with type `recommended` (if the two are alternatives rather than a progression),
  or keep `nextSkillIds` and add `rear-naked-choke-system` to the arm triangle mount prerequisites
  (if the sequence is real). Do not leave it asymmetric once mirroring lands in S2.

**T5. Save scope honestly.** Authoring the five skills named in D7 is content work with videos and
three locales, so it is sequenced as **S1b**, not smuggled into the first slice. The consequence to
confirm: those relations are dropped (or repointed) in S1 and **restored in S1b** with the same
field and target, listed here so nothing is lost: `saddle-system` (2 refs, `submissions/z-lock`),
`seatbelt-control` (1, `submissions/rear-naked-choke-system`), `triangle-armbar-dilemma` (2,
`guard/clamp-to-triangle-bridge` and `submissions/baratoplata`), `cross-ashi-garami` (1) and
`outside-ashi-garami` (1, both `submissions/z-lock`). The alternative is to block the first slice on
S1b, which is why this is called out rather than assumed.

**T6. Rebuild and verify.**

```bash
npm run build:content && npm run validate:content && npm run validate:relations
npm run typecheck && npm run lint && npm test
git status --porcelain public/generated   # must be clean after a second build:content
```

**T7. Wire CI.** Add a `Validate relation graph` step to `.github/workflows/content-validation.yml`
after `Validate content against Zod schemas`, and a matching step to the `build` job in
`.github/workflows/ci.yml` after `Verify content payloads`.

**T8. Document.** In `AGENTS.md`: add `npm run validate:relations` to the command list in section 11,
and note in section 12 that cross-references are now machine-checked, so the standing trap about
dangling ids has a gate instead of a warning.

S1 exit gate: `validate:content` at 0 errors and 0 warnings, `validate:relations` at 0 errors and 0
dangling, a byte-identical second build, and all four existing gates green.

### 14.2 S2 tasks

1. `scripts/content/skill-order.ts` (new): `deriveDepth` and `deriveOrder` per 6.8.4, pure and
   dependency-free.
2. `scripts/content/build-content.ts`: mirror `nextSkillIds` into prerequisites per 5.2, populate
   `relations`, `positionIds`, `depth`, `order`, and fail on mirror disagreement.
3. `scripts/content/validate-content.ts`: add the mirror-disagreement error.
4. `src/content-runtime/manifests.ts`, `src/types/skill.ts`, `src/repositories/skillsRepository.ts`:
   carry the new fields into `SkillNode` and add `SortMode`.
5. `src/pages/SkillMapPage.tsx`, `src/pages/StudyPage.tsx`: sort by the derived order.
6. `src/components/skill/SkillChain.tsx`, `src/components/skills/SkillCard.tsx`: render relation
   types once D4 is settled.
7. Tests: order derivation, cycle handling, tie-breaks, and the mirror rule, importing the shared
   module.

### 14.3 S3 tasks

1. Create `content/shared/path.json` per 6.8.1, plus `content/paths/foundations-and-systems/` and
   `content/paths/safety-and-recognition/` with `path.json` and three locale content files each.
2. Apply the 6.4 additions to the 37 position `position.json` files, and update position prose in
   three locales only where it enumerates skills (6.7).
3. Re-run the S1 gates; the validator's path checks become active and strict here.

### 14.4 S4 tasks

1. `src/pages/SkillMapPage.tsx` becomes the hub shell with `HubTabBar`; `/study` redirects in
   `src/router/AppRouter.tsx`; update `src/components/layout/navItems.ts` and the chord in
   `src/components/layout/Layout.tsx`.
2. New catalog filter components per 7.6: preset row, contextual facet rows, active tray, phone
   sheet, reusing `FilterChip`/`FilterChipRow` and the `KeyboardShortcutsOverlay` dialog pattern.
3. i18n keys in `src/i18n/resources/{en,vi,fr}.ts` for tabs, presets, facet labels and sheet copy.
4. Tests for facet derivation, counts, preset matching and redirect mapping.

### 14.5 S5 tasks

1. `src/content-runtime/path.ts` and `usePathStepsQuery` in `src/queries/contentQueries.ts` per
   6.8.5.
2. Path tab components: step list, level sub-groups, Next up card, sticky step nav, wide rails,
   plus `pathStepIds` usage on skill rows.
3. Tests for the path view model and the missing-artifact fallback.

### 14.6 S6 tasks

1. a11y pass: landmarks, `aria-current`, `aria-expanded`, focus order in the sheet.
2. Motion and state pass: loading, empty, error, offline.
3. `npm run audit:vi` and a VI copy review of the new keys and the two step names.
4. Screenshots at 375, 768 and 1440 on both themes, attached to the PR.
5. Confirm all gates green on the final commit.
