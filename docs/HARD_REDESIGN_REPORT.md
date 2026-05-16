# Hard Redesign Report

NoGi Mind now uses a Technique Card OS for skill detail pages. The old scattered detail surface was replaced by a compact learning flow: System Logic, Execution Cues, Detail Breakdown, Fix It Fast, conditional Safety, and Next Step.

## Replaced Structure

- Removed the old Skill Detail rendering model from the active page.
- Stopped rendering Quick Start, Micro Details, Blackbelt Details, Quality Checklist, Attacker / Defender, and Related Knowledge as separate top-level sections.
- Preserved their data by merging it through `src/data/skills/skillViewModel.ts`.

## Data Preserved

- Quick cards feed System Logic and One-Minute Mode.
- Micro details, blackbelt details, checklist signals, common mistakes, and failure responses feed Details and Fix It Fast.
- State machines, if/then decisions, reactions, and chains feed troubleshooting/search/graph modules.
- Related skills and prerequisites feed capped Next Step lists.

## Components Created Or Reworked

- `SkillDetailPageShell.tsx`
- `SkillHeader.tsx`
- `OneMinuteMode.tsx`
- `SystemLogicSection.tsx`
- `MoneyDetailsSection.tsx`
- `FixItFastSection.tsx`
- `SafetySection.tsx`
- `NextStepSection.tsx`

Legacy components remain in `src/components/skills` because other reference pages still import them. They are no longer part of the active Skill Detail page.

## UX Changes

- Skill detail is now shorter, denser, and more technical.
- Execution Cues and Detail Breakdown are the main differentiators.
- One-Minute Mode gives a fast review surface.
- Next Step is capped and curated instead of a large related dump.

## Performance

- Routes are lazy-loaded through `src/router/routes.tsx`.
- Skill data is loaded through repository-level dynamic imports.
- MiniSearch indexes are cached per language.
- Search is debounced and capped.
- Build output still reports a large `skills-core` chunk; further data-level splitting is the next major performance cleanup.

## Remaining Cleanup

- Split the large core skill bundle further by category; `skills-core` is still the main bundle hotspot.
- Retire legacy `src/components/skills/*` components once remaining pages are migrated.
- Consider migrating the standalone Micro Details and reference pages to the same view-model style so there is one product grammar across the app.
