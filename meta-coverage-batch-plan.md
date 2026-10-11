# Meta coverage batch plan

Status: in progress. Item 1 (`north-south-choke`) has landed, the other five are
still to author. This document is the plan for the six
topics that surfaced as zero-coverage during the previous research batch:
reverse closed guard, duck under, north-south choke, cradle, banana split and
80/20. It follows the working style of `skills-study-hub-spec.md`: locked
decisions first, evidence per topic, then the authoring order and gates.

## 1. Ground rules

- One topic is one skill, authored through `npm run create-skill`, with
  `skill.json`, `content.{en,vi,fr}.json` and `videos.json` as in AGENTS.md
  section 4. EN is authoritative, VI must read naturally, FR must exist.
- The duplication gate in AGENTS.md section 4.4 runs before writing anything:
  `grep -ril "<term>" content/skills`. Where an existing skill already teaches
  the technique, that skill is extended and no new skill is created.
- No invented technique detail, coach quotes or competition claims. Where a
  topic cannot be grounded in a source, it stays out of the batch.
- Videos: no-gi or modern only, real metadata copied from the oEmbed response,
  one playable video minimum. `npm run validate:videos` must stay at 0 broken.
- `npm run validate:relations` (landed in S1 of the hub spec) is the gate that
  makes every relation added here resolve. A new skill with a relation to an id
  that does not exist now fails CI instead of sitting in the corpus.

## 2. Gap evidence (measured against the current corpus, 158 skills)

| Topic | Files mentioning the term | Dedicated skill | Verdict |
| --- | --- | --- | --- |
| Reverse closed guard | 0 (`reverse closed guard`, `reverse-closed`) | none | genuine gap |
| Duck under | 0 (`duck under`, `duck-under`) | none | genuine gap |
| North-south choke | 4, all position or video files | none | genuine gap, distinct from `north-south-control` |
| Cradle | 0 | none | genuine gap |
| Banana split | 0 (`banana split`, `banana-split`, `suloev`) | none | genuine gap, `truck-twister` does not mention it |
| 80/20 | 0 (`80/20`, `8020`, `eighty twenty`) | none | genuine gap |

Adjacent skills that already exist and should be linked rather than duplicated:
`north-south-control` and `north-south-escape` (the pin, not the choke),
`truck-twister` (the truck position and the twister spine lock, not the banana
split), `crab-ride`, `claw-ride`, `spiral-ride`, `cross-wrist-ride`,
`backside-50-50-control`, `saddle-inside-sankaku-control`, `half-guard-wrestle-up`,
`body-lock-takedown`, `single-leg-bjj` and `hand-fighting`.

## 3. Proposed skills

| # | Skill id | Folder | Domain | Level | Primary relation target |
| --- | --- | --- | --- | --- | --- |
| 1 | `reverse-closed-guard` | `guard/` | `guard_offense` | advanced | `k-guard-entry`, `false-reap-entry`, `reverse-de-la-riva-transitions` |
| 2 | `duck-under` | `wrestling/` | `wrestle_up_wrestling` | intermediate | `russian-tie`, `single-leg-bjj`, `hand-fighting` |
| 3 | `north-south-choke` | `submissions/` | `submission_systems` | intermediate | `north-south-control`, `arm-triangle-mount` |
| 4 | `cradle` | `wrestling/` | `wrestle_up_wrestling` | intermediate | `mat-return-basics`, `half-guard-wrestle-up` |
| 5 | `banana-split` | `submissions/` | `submission_systems` | advanced | `truck-twister`, `crab-ride` |
| 6 | `eighty-twenty` | `submissions/` | `submission_systems` | advanced | `backside-50-50-control`, `saddle-inside-sankaku-control` |

Id rule: ids stay lowercase kebab-case and equal the folder name, so `80/20`
becomes `eighty-twenty` and the display name stays `80/20`.

## 4. Per topic

### 4.1 Reverse closed guard

The bottom player closes the guard with their head facing the opponent's legs
instead of their chest, so the legs control both knees and the hips rather than
just breaking posture. The modern no-gi framing is a leg-lock entry: it feeds
K-Guard, 50/50 and the outside sankaku, and it is taught as such by Submeta and
the modern leg-lock instructional lineage. It is a different position from
`reverse-de-la-riva-guard` (already a position in the corpus), because the legs
are closed rather than hooked on one leg.

- Safety framing: it is a leg entanglement entry, so the leg-lock safety
  hierarchy applies to anything it feeds.
- Watch for: overlap with the existing `reverse-de-la-riva-transitions` skill in
  the relatedSkills, not in the technique itself.

### 4.2 Duck under

A standing chain: from a wrist or two-on-one contact you drop your head under
the opponent's arm and circle behind them to the back. It is the natural next
step from the Russian Tie that now exists, and the most common way the corpus
mentions wrestling chains without teaching them. It shares a family with
`arm-drag-system` and `fhl-go-behind` (both already present).

- Duplication check to run first: `arm-drag-system` and `fhl-go-behind` both
  teach going behind the opponent. If either already teaches the duck-under
  mechanic, extend it instead of adding this skill.
- Relation to add on landing: `russian-tie` gets `duck-under` in `relatedSkills`
  as a chain, which the S1 validator will resolve.

### 4.3 North-south choke (landed)

Authored as `content/skills/submissions/north-south-choke/`, domain
`submission_systems`, level intermediate, prerequisite `north-south-control`,
wired into the `north-south` position page and into the
`submission-chain-hunter` archetype.

An arm-in choke applied from north-south, with the opponent's arm trapped across
their own neck. `north-south-control` covers the pin and `north-south-escape`
covers the bottom side, and neither covers the submission, so the three skills
form a clean set: control, attack, escape.

- This one is the safest of the six to author: the position is already in the
  corpus, the mechanic is standard, and the missing piece is one skill.
- Safety: it is a neck attack, so the existing head and neck safety language
  applies, with no explosive application.

### 4.4 Cradle

A folkstyle pin that traps the opponent's head and near knee (or far knee) on
the same side, used to hold them down and to run them over. In a no-gi BJJ
context it is mainly a pin and a control, plus a transition to the back.
Nothing in the corpus covers it, and it is the one topic in this batch whose
value is mostly defensive recognition (knowing why you are stuck) plus a path
to the back.

- Open question before authoring: is the cradle better placed in `pins_rides`
  than in `wrestle_up_wrestling`? The pin lives on top, but the entries come
  from the standing and turtle exchanges. Suggest `pins_rides` unless the
  authoring session finds the entry material dominating.

### 4.5 Banana split

The legs are pried apart with a figure-four style grip from the truck or the
backside, loading the groin and hamstrings. It is also called the Suloev stretch
in MMA. `truck-twister` teaches the truck position and the twister, and never
mentions the split, so this is a real gap rather than a duplicate.

- The duplication risk is the opposite one: the banana split may be better
  authored as a section inside `truck-twister` if the entry is the same. Decide
  after the search, and prefer extending if the position setup is identical.
- Safety: it is a compression and stretch on the hip and hamstring, so the
  existing compression and stretch guidance in `calf-compression-locks` and the
  leg-lock safety family is the model, with a slow-application rule.

### 4.6 80/20

A leg entanglement where the attacker's inside leg and hip position gives them
roughly four fifths of the control, used as the step between 50/50 and the
saddle. It appears in modern no-gi leg-lock flow as `50/50 -> 80/20 -> saddle`,
and it is not in the corpus under any name.

- Nearest existing skills: `backside-50-50-control`, `saddle-inside-sankaku-control`
  and `bodylock-passing-position` is unrelated. Check `backside-50-50-control`
  for an existing 80/20 section before authoring.
- Safety: standard leg-lock safety hierarchy, no explosive application.

## 5. Authoring order

Ordered by dependency and by how much verification each needs, cheapest first:

1. `north-south-choke` (position already exists, single skill, lowest risk).
2. `duck-under` (the Russian Tie and hand-fighting skills already exist to link to).
3. `eighty-twenty` (leg-lock family is well covered, only the new position needs grounding).
4. `reverse-closed-guard` (needs the leg-lock entry relations checked against K-Guard and false reap).
5. `cradle` (needs the domain decision in 4.4).
6. `banana-split` (needs the extend `truck-twister` or author decision in 4.5).

Each skill is one commit and must leave all gates green on its own:
`build:content`, `validate:content` (0 errors, 0 warnings), `validate:relations`
(0 errors), `validate:videos` (0 broken), `audit:vi`, `typecheck`, `lint`,
`test`, `build`.

## 6. Per skill checklist

1. `npm run create-skill <folder> <skill-id>`.
2. Duplication search: `grep -ril "<term>" content/skills`.
3. `skill.json`: id, domain, level, name, aliases, `tags` using the vocabulary
   in AGENTS.md section 4.7, `modernSystemGroup` from `ModernSystemGroup`,
   `relatedSkills` with types, `prerequisiteSkillIds`, `relatedConcepts` and
   `archetypeIds` limited to ids that already exist.
4. `content.{en,vi,fr}.json` with the full field set used by the neighbouring
   skills: `description`, `shortInstruction`, `summary`, `whyItWorks`,
   `commonMistakes`, `coachingCues`, `safetySummary`, `keyCorrections`,
   `moneyDetails`, `fixItFast`, `systemLogic`.
5. `videos.json`: query with a no-gi qualifier, verify every candidate through
   `curl -s "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<id>&format=json"`,
   copy `title` and `author_name` verbatim, one `primary`.
6. Wire it in: positions (`content/positions/*/position.json`) and the matching
   entry in `src/data/archetypes.ts`, so the skill is not an orphan.
7. Rebuild and run the gates in section 5.

## 7. Open decisions to confirm before the first commit

1. Cradle domain: `pins_rides` or `wrestle_up_wrestling` (section 4.4).
2. Banana split: new skill or a section inside `truck-twister` (section 4.5).
3. Whether to add `80/20` as an alias of `eighty-twenty` so search finds the
   slash form as well.
4. Whether reverse closed guard also needs a position entry, or whether it is
   reachable from `closed-guard` and `k-guard-position` as authored.
