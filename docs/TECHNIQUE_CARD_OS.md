# Technique Card OS

Technique Card OS is the production learning model for NoGi Mind.

## Sections

- System Logic: why the technique works and what must be true.
- Body Position: exact attacker/defender placement and contact cards.
- Money Details: top details, mechanics groups, quality signals, and leaks.
- Outcomes & Branches: success, failure, counters, resets, and reactions.
- Fix It Fast: problem-first repair cards.
- Safety: top-level only for high-risk or safety-relevant skills.
- Next Step: capped next learning items.

## Builder Layer

`src/data/skills/skillViewModel.ts` owns the merge logic. Skill Detail stays small, memoizable, and focused on rendering.
