# BJJGraph-Inspired Improvement Report

## Adapted Ideas

- Structured data remains the source of truth for NoGi Mind views, search, validation, and graph experiences.
- Added a technique state-machine layer: position -> skill -> outcome -> next branch.
- Added role-based attacker/defender perspectives for skills with state-machine data.
- Added validation rules for state-machine integrity, safety aborts, references, and confidence/probability rules.
- Added focused outcome maps on Skill Detail instead of a full-app graph by default.

## What Was Not Copied

- No proprietary technique text was copied.
- NoGi Mind keeps its own modern no-gi focus: body-to-body details, micro-details, blackbelt mechanics, modern systems, and multilingual UX.
- The app was not converted into BJJGraph or rebuilt from scratch.

## New State Machine Model

Added `src/types/stateMachine.ts` with:

- `RolePerspective`
- `TechniqueOutcome`
- `RolePerspectiveData`
- `TechniqueStateMachine`

Added `src/data/techniqueStateMachines.ts` with 20 state machines across submissions, passing, escapes, safety, and modern no-gi systems.

## Role-Based Learning

Skill Detail now shows:

- Attacker / Defender View
- outcome cards
- knowledge checks
- training progression
- compact outcome graph

The section appears in the System layer so Quick and Body layers stay clean.

## Validation Changes

`scripts/validateData.ts` now checks:

- state-machine skill references
- from-position references
- unique outcome IDs
- valid outcome result
- target or meaningful terminal explanation
- confidence when probability is absent
- probability sum when all outcomes have probability
- attacker/defender structure
- safety-sensitive skills need safety abort and safety-critical knowledge checks

## Search Changes

Unified search now indexes:

- outcomes
- trigger signals
- attacker goals
- defender recognition cues
- common errors
- knowledge checks
- training progressions

Queries like “rnc if fail”, “bodylock butterfly lift”, “heel hook safety abort”, “buggy choke neck crank”, and “octopus crossface” have structured content to hit.

## Skills With State Machines

Initial coverage includes:

- Rear Naked Choke System
- Arm Triangle from Mount
- Bodylock Passing
- Guillotine System
- Kimura System
- Heel Hook Safety
- Knee Cut Passing
- Side Control Escape
- Mount Escape
- Back Escape
- Front Headlock Defense
- False Reap Entry
- Octopus Guard Control
- S-Mount Armbar
- Buggy Choke
- Crab Ride
- Wrist Ride to Back Exposure
- Gogoplata
- Choi Bar
- Tarikoplata

## Remaining Limitations

- State-machine coverage is 20/65 skills.
- Outcome probabilities are intentionally avoided for now; confidence labels are used instead.
- The large `skills-core` chunk remains because targeted skill mechanics maps are still centralized in `skillBuilder.ts`.
- Next useful pass: split builder support maps by domain and add state machines for remaining submissions, guard, wrestling, and leg lock skills.
