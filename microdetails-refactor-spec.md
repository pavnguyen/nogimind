# Micro-Details Restructure Spec

## Overview

Remove the standalone `/micro-details` page and integrate its rich technical correction data inline into the existing page architecture. Micro-details become a core, data-driven part of each skill's content model — surfaced as inline annotations on **SkillDetailPage**, kept as daily tips on **DashboardPage**, and optionally shown as tooltips on skill cards throughout the app.

## Interview Answers Summary

| Question | Answer |
|---|---|
| App value prop | BJJ learning/training tool |
| Target user | Intermediate+ (blue belt and up) |
| Gut feeling | Merge — integrate data, do not remove content |
| Surface strategy | SkillDetailPage inline annotations, Dashboard rotation, skill card tooltips |
| Integration depth | Deep restructure — micro-details become part of skill data model |
| SkillDetail UX | Inline annotations between sections (within the 'learn' tab) |
| Dashboard tips | Keep as-is (text-based daily tip card) |
| Migration | No redirect — just remove from nav, users discover naturally |
| Cross-skill browse | Remove — no standalone filtered view |
| Cross-skill feature parity | N/A (removed) |
| Implementation | This sprint (immediate) |

## What Changes

### 1. Data Model Restructure

**Current state:**
- Micro-detail data lives in `src/data/microDetailSystems.ts`, `microDetailSystems_armbar_triangle.ts`, `microDetailSystems_omoplata.ts`, `microDetailSystems_priority.ts`
- Each skill has an optional `microDetailSystem?: MicroDetailSystem` field on the `SkillNode` type
- The `getMicroDetails()` function in `src/utils/knowledgeModules.ts` flattens system data into `MicroDetailItem[]`
- The `MicroDetailsPage` takes these flattened items and renders them with search/filter/body-part toggles

**Target state:**
- Keep the `MicroDetailSystem` type and data files as-is (they feed multiple derived views)
- The `microDetailSystem` field on `SkillNode` stays — it's also used by Troubleshooter, Escape Maps, Technique Chains
- No data restructuring needed — the data is already on each skill. The change is how we **surface** it.

### 2. SkillDetailPage — Inline Annotation Section

**What to build:**
- Within the **'learn' tab**, between existing sections (e.g. after `SystemLogicSection` and before `OutcomesBranchesSection`), add a new **"Key Corrections"** inline section
- This section renders the skill's `microDetailSystem.topFiveDetails` as compact annotation cards, NOT as a slide-in panel

**Layout of each annotation card:**
```
┌─────────────────────────────────────┐
│ [category badge]  [body part tags]  │
│                                     │
│ **Title** (e.g. "Elbow under chin") │
│ **Common mistake** (1 line)         │
│ **Fix** (1 line)                    │
│ **Cue** (1 line, emphasized)        │
│                                     │
│ [Open skill →]                      │
└─────────────────────────────────────┘
```

**Design constraints:**
- Compact — each card fits in ~4-5 lines of content
- Only shows when `skill.microDetailSystem?.topFiveDetails` has items
- Cards are NOT expandable/collapsible — they're always visible
- If the skill has no micro-details, the section is omitted entirely
- Badge uses the existing `<Badge>` component with the new `violet` tone for correction content
- Each card body (wrong/fix/cue) uses the existing localized text structure

**Section position in the 'learn' tab:**
1. System Logic (overview, goal, situation, why)
2. Body Position (contact map, mechanics)
3. **Key Details** (NEW — inline micro-detail annotations)
4. Key Details (money details — technical details, quality checks — keep existing)
5. Outcomes & Branches
6. Next Step

### 3. DashboardPage — Keep As-Is

**No changes needed.** The current daily rotation that picks a random micro-detail and shows it as a text-based tip card already works. Keep it.

### 4. Skill Card Tooltips (Optional Enhancement)

**If desired:** When hovering over a skill card on StudyPage or SkillMapPage, show a tooltip indicating "Has corrections available" (if `skill.microDetailSystem` exists).

**Implementation idea:** Very lightweight — just a small badge or dot indicator on the skill card. No data fetching needed since micro-detail data is already on the skill node.

**Priority:** Low — can be deferred or skipped if it adds complexity.

### 5. Remove Standalone Page

**Files to delete:**
- `src/pages/MicroDetailsPage.tsx`
- Any tests or sub-components exclusively for this page (check `src/components/skills/MicroDetailCard.tsx`, `MicroDetailSystemSection.tsx`)

**Files to update:**
- `src/router/routes.tsx` — remove lazy import and route for `/micro-details`
- `src/router/AppRouter.tsx` — remove route component
- `src/components/layout/navItems.ts` — remove "Micro-Details" from nav items
- `src/components/layout/Sidebar.tsx` — will auto-update via navItems change
- `src/components/layout/MobileNav.tsx` — will auto-update via navItems change

**i18n cleanup (optional):**
- `src/i18n/resources/en.ts`, `fr.ts`, `vi.ts` — can remove `microDetails` translation block if no other page references it (but it may still be used in other places — verify first)

### 6. Cross-Skill Browse — Removed

No replacement for the standalone filtered browse experience. When the standalone page is removed, the cross-skill search/filter capability goes with it. Users discover corrections naturally by opening the skill they're studying.

## Migration Path

| Step | When | What |
|---|---|---|
| Remove from sidebar nav | Immediate | Remove from `navItems.ts` — users stop seeing it |
| Remove from routes | Immediate | Remove route — the URL returns 404 |
| Add inline to SkillDetailPage | Immediate | Users find content on each skill's detail page |
| No redirect | N/A | No server-side 301 — natural nav update is sufficient |

## Implementation Order

1. **Build the inline annotation section** on SkillDetailPage (`src/components/skill/MicroDetailAnnotationsSection.tsx` or similar)
2. **Add it to SkillDetailPage** within the 'learn' tab
3. **Remove the standalone page** — delete `MicroDetailsPage.tsx`, update routes, update nav
4. **Verify no broken references** — check SearchPage, DashboardPage, StudyPage, hint cards, etc.
5. **Clean up i18n** — verify `microDetails` keys are unused after removal

## Design Mock

```
┌─────────────────────────────────────────────┐
│  SkillDetailPage (learn tab)                │
│                                             │
│  ┌─ System Logic ─────────────────────────┐ │
│  │  Overview, goal, situation, why        │ │
│  └────────────────────────────────────────┘ │
│                                             │
│  ┌─ Body Position ────────────────────────┐ │
│  │  Contact map, mechanics               │ │
│  └────────────────────────────────────────┘ │
│                                             │
│  ┌─ Key Corrections (new) ───────────────┐ │
│  │                                        │ │
│  │  [elbow] [chin] [neck]                │ │
│  │  **Elbow under chin**                 │ │
│  │  ✗ Squeezing while elbow is high      │ │
│  │  ✓ Elbow first, squeeze last          │ │
│  │  🎯 The elbow sits under the chin     │ │
│  │                                        │ │
│  │  [hand] [wrists]                      │ │
│  │  **Win the defensive hand fight**     │ │
│  │  ✗ Releasing too early                │ │
│  │  ✓ Win hands first, finish second     │ │
│  │  🎯 Their hands block the neck        │ │
│  └────────────────────────────────────────┘ │
│                                             │
│  ┌─ Key Details ──────────────────────────┐ │
│  │  Technical details, quality checks    │ │
│  └────────────────────────────────────────┘ │
│                                             │
│  ┌─ Outcomes & Branches ──────────────────┐ │
│  │  Decision tree, reactions             │ │
│  └────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

## Edge Cases & Risks

| Risk | Mitigation |
|---|---|
| Other pages reference `MicroDetailPage` route | Search full codebase for `/micro-details` refs before deleting |
| `microDetails` i18n keys still used on Dashboard, PositionDetailPage, etc. | Keep keys that are shared; only remove keys unique to the standalone page |
| Users who bookmarked `/micro-details` | No redirect — these users will hit 404. Acceptable trade-off per interview. |
| Some skills have zero micro-details | The inline section is conditionally rendered — no empty state needed. |
