# Content Clarity And Dedup Report

## Repeated ideas found

- `control before submission` appeared across submission systems, checklist logic, and shared knowledge.
- `remove slack before squeeze` appeared in multiple submission paths and troubleshooting text.
- `knee line` and `heel line` safety language appeared in straight ankle lock, heel hook safety, and leg lock guidance.
- `frame then move`, `head position`, and `angle before force` appeared across escapes, passing, and guard retention.
- `do not bench press` appeared across escape and survival content.

## What was moved to shared knowledge

- Core control and finishing principles now live in `src/data/sharedKnowledge.ts`.
- Reusable safety language for leg locks, neck attacks, and spinal pressure now lives in shared knowledge instead of being rewritten in every skill.
- Short cues such as `frame then move`, `hide heel`, and `angle first` are kept as reusable cues instead of long repeated paragraphs.

## What was moved to glossary clarity

- Technical terms are now shown with technical-language tooltips and chips in `Skill Detail`.
- Glossary definitions are rendered with English gloss when Vietnamese or French is selected, so the meaning stays visible without repeating full paragraphs in each skill.

## What remains skill-specific

- Exact hand roles, elbow routes, hip angle, knee line timing, finish triggers, and abort signals.
- Technique-specific errors such as RNC elbow alignment, bodylock low-hands, or knee cut line choice.
- Branches and counters that are unique to each skill family.

## Files changed in this polish pass

- `src/stores/useSettingsStore.ts`
- `src/components/skills/FastFinishPathCard.tsx`
- `src/components/glossary/GlossaryTermChip.tsx`
- `src/components/glossary/InlineGlossaryLink.tsx`
- `src/components/skills/GlossaryLink.tsx`
- `src/components/skills/GlossaryTooltip.tsx`
- `src/pages/SkillDetailPage.tsx`
- `src/pages/GlossaryPage.tsx`
- `src/i18n/resources/en.ts`
- `src/i18n/resources/vi.ts`
- `src/i18n/resources/fr.ts`
- `src/utils/knowledgeSearch.ts`

## Remaining issues

- A few generated technical paragraphs still repeat the same safety/structure idea in different skills.
- The app now reduces that repetition in the UI, but the underlying skill data can still be further condensed in a later cleanup pass if needed.
