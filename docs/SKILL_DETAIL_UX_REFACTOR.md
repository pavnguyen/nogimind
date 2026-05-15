# Skill Detail UX Refactor

Skill Detail now renders through `SkillDetailPageShell` and view-model builders instead of assembling raw data in the page.

## New Order

1. System Logic
2. Body Position
3. Details
4. Outcomes & Branches
5. Fix It Fast
6. Safety, only when relevant
7. Next Step

The page is intentionally compact. Each section has one job and receives only the view-model it needs.

## One-Minute Mode

One-Minute Mode pulls the primary goal, three cues, three key contacts, finish/control trigger, common abort signal, and next branch into a modal review surface.

## Removed Top-Level Clutter

Quick Start, Micro Details, Blackbelt Details, Quality Checklist, Related Knowledge, and Attacker / Defender no longer appear as standalone top-level sections on Skill Detail. Their content is merged into higher-signal sections.
