# Data Dedup Audit

## 1. Main repeated ideas found

- `control before submission`
- `position before finish`
- `inside position first`
- `keep elbow-knee connection`
- `protect the knee line`
- `hide the heel before rotation`
- `do not bench press with the arms`
- `tap early under leg-lock and neck threats`
- `head position controls direction`
- `stabilize before transitioning`
- `pressure needs direction`

## 2. Where the repetition appears

- `src/data/skillNodes.ts`
- `src/data/technicalDetails.ts`
- `src/data/positions.ts`
- `src/data/defensiveLayers.ts`
- `src/data/archetypes.ts`
- `src/data/masteryStages.ts`
- `src/pages/SkillDetailPage.tsx`
- `src/pages/DashboardPage.tsx`
- `src/i18n/resources/vi.ts`
- `src/i18n/resources/fr.ts`
- `src/i18n/resources/en.ts`

## 3. Recommended shared primitives

- Shared principles for control, isolation, angle, and transition discipline
- Shared cues for high-frequency live-training reminders
- Shared common errors for recurring mistakes
- Shared safety notes for leg locks, neck attacks, spine pressure, and tap timing
- Shared body mechanics principles for head, hips, elbows, knees, and pressure lines

## 4. What should remain skill-specific

- Exact hand placement, elbow line, hip angle, and finishing direction
- Position-specific escape branches
- Unique opponent reactions
- Technique-specific safety nuance
- Skill-specific quality checks and micro-adjustments

## 5. Refactor plan

1. Centralize repeated principles in `src/data/sharedKnowledge.ts`
2. Attach shared references to the top 30 core skills
3. Render a compact shared knowledge section on Skill Detail
4. Index shared knowledge in fuzzy search
5. Add duplication warnings to validation/content-quality checks

## 6. Risk notes

- Some short repeated cues are still useful and should remain visible
- Too much deduplication can make a skill feel too abstract
- Shared safety notes should not replace skill-specific danger signals
- Search relevance should still favor skill-specific execution details
