# Relationship Review Report

## Result

`npm run validate:data` reports 0 broken references across skills, chains, troubleshooters, escape maps, glossary terms, and optional modules.

## Fixes Applied

- `over-under-pass` now routes to implemented Bodylock Passing.
- `double-under-pass-basics` now routes to implemented Bodylock Passing.
- `longstep-pass` and `toreando-pass-basics` now route to implemented Outside Passing.
- `low-single-wrestle-up` now routes to implemented Single Leg for BJJ.
- `butterfly-guard-basics` now routes to implemented Butterfly Guard Off-Balance.
- `turtle-ride-basics` now routes to implemented Turtle Ride.
- `guillotine-choke-finish` now routes to Guillotine System.
- `anaconda-choke-finish` now routes to High-Wrist Guillotine as the current implemented front-headlock branch.
- `front-headlock-control` now routes to Snapdown to Front Headlock.

## Relationship Quality

- Core submissions now relate to realistic branches: Armbar, Triangle, Omoplata, Kimura, S-Mount, Clamp Guard.
- Modern rides connect into back exposure and mat-return families.
- Safety-critical leg-lock content keeps knee-line and heel-exposure concepts discoverable.

## Remaining Work

- Add explicit `relatedPositionIds`, `relatedConceptIds`, and `relatedGlossaryIds` fields to the SkillNode schema if the app wants first-class relationship validation beyond current shared IDs and tags.
- Add explicit state machines for all high-priority skills.
