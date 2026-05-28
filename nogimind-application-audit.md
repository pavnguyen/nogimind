# Nogimind Whole-App Audit Roadmap

Date: 2026-05-28
Baseline: React 19, Vite 8, TypeScript, client-only SPA, generated JSON content pipeline plus legacy data.

## Executive Summary

1. Nogimind is already viable as a working no-gi knowledge app: build, lint, schema validation, PWA generation, and i18n content quality checks all pass.
2. The largest product risk is not app stability; it is learning clarity. The app has strong knowledge density, but several journeys still ask users to choose between many similar surfaces before they know what problem they are solving.
3. The strongest technical risk is the dual data model. Skill detail uses generated content, while Study/Fix/Search still lean heavily on legacy `SkillNode` data and derived modules. This can create route-to-route inconsistency as the pipeline grows.
4. The content pipeline is structurally healthy: 122 skills, three locales, 0 schema errors, 0 i18n quality warnings. The next content work should be editorial depth, not schema repair.
5. BJJ correctness is good at the safety layer, especially leg-lock language, but many skills still read like broad knowledge summaries rather than mat-ready coaching cards. Some `moneyDetails` explain importance instead of giving body-placement detail.
6. PWA is mostly implemented, including manifest generation, service worker output, settings install button, and offline video placeholder. The biggest gap is runtime caching: generated video mappings are not covered by the current Workbox JSON cache rule.
7. Video coverage is broad but needs curation. All 122 skills have video files and 427 video refs, but 81 YouTube IDs are reused across multiple skills. Some reuse is legitimate system overlap; some will make different skill pages feel samey.
8. The app has the right strategic shape: Learn, Study, Fix, Build, Reference. The best next phase is to converge data sources and sharpen each route into a clear user job.

## Baseline Checks

- `npm run build`: pass. PWA output generated `dist/manifest.webmanifest`, `dist/sw.js`, and `dist/workbox-5a76e2bc.js`.
- `npm run lint`: pass.
- `npm run validate:content`: pass, 0 errors, 81 warnings for duplicate YouTube IDs.
- `node scripts/audit-content-quality.mjs`: pass, 366 files audited, 0 warning files, 0 error files.
- Content inventory: 122 skills, 697 generated JSON files, `public/generated` around 4.6 MB.
- Video inventory: 122 skill video files, 427 refs, 312 unique YouTube IDs, 81 duplicate YouTube IDs.

## Priority Roadmap

### P0 - Fix Before Expanding Features

#### 1. Add generated video mappings to the PWA runtime cache

- Problem: `vite.config.ts` caches `/generated/(skills|concepts|positions|manifest)/...json`, but runtime videos load from `/generated/videos/by-skill/{id}.json`.
- Impact: skill pages can show offline skill content while the Watch tab loses its video metadata even when previously visited.
- Evidence: `src/content-runtime/videos.ts` fetches `/generated/videos/by-skill/${skillId}.json`; `vite.config.ts` runtimeCaching does not match `/generated/videos`.
- Fix: update Workbox `urlPattern` to include `videos`, or add a dedicated `nogimind-video-mappings` StaleWhileRevalidate rule.
- Priority / effort: P0, XS.

#### 2. Decide the single source of truth for skill listing routes

- Problem: `SkillDetailPage` loads generated pipeline content, but `StudyPage`, `FixHubPage`, search modules, and some derived troubleshooters still use `useSkillsQuery()` and legacy `SkillNode`.
- Impact: a skill can look complete on `/skills/:id` but be missing, differently named, or less searchable in `/study`, `/fix`, or `/search`.
- Evidence: `src/pages/SkillDetailPage.tsx` uses `useContentSkillDetailQuery`; `src/pages/StudyPage.tsx` and `src/pages/FixHubPage.tsx` use `useSkillsQuery`; `src/utils/searchEngine.ts` indexes `SkillNode[]`.
- Fix: create a normalized runtime view model from generated manifests/details for list/search/fix routes, then keep legacy only as an explicit fallback.
- Priority / effort: P0, L.

#### 3. Replace misleading checklist coverage metrics

- Problem: generated manifest reports `hasChecklist`, but many domains show low or zero checklist coverage even though pages still expose learn/fix content. Guard offense has 22 skills and 0 checklist flags; guard retention has 5 and 0.
- Impact: internal stats or UI affordances can imply content is incomplete even when useful content exists, or hide true gaps where checklists matter.
- Evidence: generated manifest audit shows `guard_offense.check = 0`, `guard_retention.check = 0`, `submission_systems.check = 8/30`.
- Fix: rename coverage to a precise metric such as `hasQualityChecklist`, or compute richer content completeness from `shortInstruction`, `whyItWorks`, `moneyDetails`, `fixItFast`, `safetySummary`, and videos.
- Priority / effort: P0, M.

### P1 - High-Impact Improvements

#### 4. Turn skill pages into mat-ready coaching cards

- Problem: several `moneyDetails` are strategic value statements rather than body mechanics. Example: Back Escape says it wins matches and removes fear; Mount Survival says surviving 10 seconds is high leverage.
- Impact: users opening a detail page during training need "where do I put my hand/knee/head now?", not only why the skill matters.
- Evidence: spot checks in `content/skills/escapes/back-escape/content.en.json`, `mount-survival`, `dilemmas-two-way-attacks`, `side-control-pin`, and `half-guard-wrestle-up`.
- Fix: editorial pass by field:
  - `moneyDetails`: body placement, angle, pressure, timing.
  - `coachingCues`: short imperative cues.
  - `commonMistakes`: observable errors.
  - `fixItFast`: one corrective action per failure.
  - `safetySummary`: specific injury mechanism and safe response.
- Priority / effort: P1, XL.

#### 5. Curate duplicate video references

- Problem: 81 YouTube IDs are shared across skills; the worst duplicates appear on 3-4 skill pages.
- Impact: duplicate videos are fine for shared systems, but too much reuse makes Study/Watch feel shallow and reduces trust in curation.
- Evidence: duplicate examples include `0pzF4_ltfJQ` across back survival, side control escape, side control survival, north-south control; `1AXix_eKyKc` across knee shield, armbar, choi bar, saddle.
- Fix: classify duplicates:
  - Keep if the same video genuinely teaches a shared system.
  - Demote to supplemental if it is context only.
  - Replace with a more specific primary video when a skill deserves its own reference.
  - Add `whyUseful` language that explains why the same video appears in multiple places.
- Priority / effort: P1, L.

#### 6. Make the main learning journeys more decisive

- Problem: Learn, Study, Fix, Build, and Reference are coherent, but the app still exposes many parallel entry points. A user may not know whether to start at `/learn`, `/study`, `/skills`, `/fix`, or `/search`.
- Impact: beginners can browse instead of training; intermediate users can get stuck reading instead of diagnosing their live-round problem.
- Evidence: Dashboard links to five hubs; Learn links to Skills, Positions, Concepts; Study and Skill Map overlap; Fix includes troubleshooters, escape maps, and defense.
- Fix: define one primary job per route:
  - `/learn`: "Tell me what to study next."
  - `/study`: "Pick one domain and drill one skill."
  - `/skills/:id`: "Execute and debug this skill."
  - `/fix`: "Diagnose a live-round problem."
  - `/reference`: "Look up a term or concept."
- Priority / effort: P1, M.

#### 7. Promote safety gates for advanced submissions

- Problem: leg-lock content has good warnings, but the UI treats advanced dangerous skills similarly to regular study material.
- Impact: no-gi users need explicit safety sequencing before heel hooks, Z-locks, Aoki locks, spine/neck pressure, and compression finishes.
- Evidence: `z-lock` and `heel-hook-safety` content correctly warns about rotational knee risk; `SkillDetailPage` can show any skill without a prerequisite safety gate.
- Fix: add a visual "Safety prerequisite" panel for tagged skills:
  - Require reading `leg-lock-safety-basics` before advanced leg lock pages.
  - Show "tap to position, not pain" on heel exposure and knee-line pages.
  - For neck/spine/compression skills, show safe training constraints.
- Priority / effort: P1, M.

#### 8. Align terminology across app-shell i18n and content

- Problem: Vietnamese and French content quality audit is clean, but app-shell labels still mix English BJJ terms, Vietnamese phrases, and product-specific terms like "Skills", "Escape", "Archetype", "micro-details".
- Impact: this is acceptable for bilingual BJJ users, but inconsistent labels can feel unfinished and can confuse newer users.
- Evidence: `src/i18n/resources/vi.ts` uses labels such as `Học Skills`, `Escape`, `Submission`, `Back control`, while content files now use more natural Vietnamese/French.
- Fix: create a glossary policy:
  - Keep common no-gi terms in English when that is how practitioners speak: guard, pass, pin, ride, underhook, saddle, heel hook.
  - Translate action/help text naturally.
  - Avoid mixing translated grammar with raw English where it hurts readability.
- Priority / effort: P1, M.

### P2 - Cleanup, Polish, Optimization

#### 9. Remove stale code-splitting groups and stale architecture notes

- Problem: `vite.config.ts` still defines chunk groups for deleted legacy files like `microDetailSystems`, `technicalDetails`, `blackbeltDetails`, and `src/data/skills/*`.
- Impact: harmless at runtime, but it makes the architecture harder to reason about and can mislead future optimization work.
- Evidence: `vite.config.ts` has many tests for files removed from the current repo state.
- Fix: simplify manual chunk groups to current realities: React/router, query, i18n, lucide, search, reference data, defensive/mastery data.
- Priority / effort: P2, S.

#### 10. Normalize PWA manifest ownership

- Problem: `index.html` still references `/site.webmanifest`, while Vite PWA generates `dist/manifest.webmanifest`. The old `public/site.webmanifest` is deleted in the current worktree.
- Impact: production build works because the plugin injects output, but source HTML is confusing and can break if plugin behavior changes.
- Evidence: `index.html` has `<link rel="manifest" href="/site.webmanifest" />`; build output includes `manifest.webmanifest`.
- Fix: let `vite-plugin-pwa` own manifest injection, or align source HTML to the generated manifest path.
- Priority / effort: P2, XS.

#### 11. Make warmup behavior measurable

- Problem: `src/main.tsx` eagerly prefetches manifests, warms search cache, warms worker indexes, rebuilds every 30 minutes, and rebuilds on visibility change.
- Impact: this can make search feel fast, but it may spend CPU/battery on mobile training environments without visibility into payoff.
- Evidence: phases in `src/main.tsx` schedule prefetch, IndexedDB prewarm, worker warmup, interval rebuild, and visibility rebuild.
- Fix: add lightweight dev-only timing logs or internal diagnostics, then tune warmup by device/network status.
- Priority / effort: P2, M.

#### 12. Reconcile planned routes with actual route map

- Problem: docs mention planned `/micro-details`, `/chains`, and `/game-tree`; `MicroDetailsPage.tsx` exists but is not routed.
- Impact: route backlog is unclear: some concepts are planned, some removed, some partially present.
- Evidence: `docs/APP_ARCHITECTURE.md` planned routes; `src/router/AppRouter.tsx` does not route `/micro-details`; `src/pages/MicroDetailsPage.tsx` exists.
- Fix: decide per route:
  - Delete dead page if not planned.
  - Route it if it supports the current product.
  - Move to roadmap if it is future work.
- Priority / effort: P2, S.

## Findings by Area

### Product & Learning UX

- The hub model is strong: Learn, Study, Fix, Build, Reference maps well to real BJJ intent.
- The current UI can still over-present options. The next UX pass should reduce choice cost, especially on the dashboard and Learn page.
- Study page domain tabs are useful, but it should eventually use generated manifests/details so users see all pipeline skills consistently.
- Fix hub is the highest-value practical surface. It should become the fastest route from "I am stuck in sparring" to "try this correction next round."

### BJJ Content Quality

- Safety content is the most trustworthy layer today. Leg-lock warnings are explicit and technically appropriate.
- The biggest content improvement is converting general statements into body-mechanics instructions.
- For no-gi coaching, the best content shape is:
  - Control line: head, shoulder, hip, knee, heel, or wrist.
  - Failure signal: what the user feels when it is wrong.
  - Fix cue: one action.
  - Safety boundary: when to stop or tap.
- Advanced submissions need stronger UI-level safety gates, not just text inside the content.

### Architecture & Data System

- Generated content is now the natural primary source for skill detail.
- Legacy data is still deeply involved in Study, Fix, Search, concepts, positions, and derived modules.
- The bridge in `SkillDetailPage` is pragmatic, but the app should not keep building new features on two skill models.
- Recommended direction: create one normalized `SkillViewModel` from generated artifacts and migrate list/search/fix consumers gradually.

### PWA, Offline & Performance

- PWA is real, not just planned: Vite PWA outputs SW and manifest; Settings has install UI; videos have offline placeholder.
- Workbox caching should include generated video mappings.
- YouTube thumbnails are cached, which is helpful, but actual YouTube embeds remain network-only as expected.
- Search warmup is ambitious. Keep it, but measure mobile cost before adding more background work.

### I18n & Localization

- Content i18n is structurally clean across `en`, `vi`, and `fr`.
- App-shell localization needs a final terminology pass to make Vietnamese and French feel deliberately bilingual rather than partially translated.
- Keep established BJJ English terms where natural, but translate navigation and coaching sentences cleanly.

## Recommended Implementation Order

1. Patch PWA generated video caching and manifest link ownership.
2. Define generated `SkillViewModel` and migrate Study page first.
3. Migrate Fix/Search derived modules to the same generated skill view.
4. Replace checklist coverage with richer content completeness metrics.
5. Add safety prerequisite panels for advanced leg locks and neck/spine/compression skills.
6. Run editorial rewrite for `moneyDetails`, `fixItFast`, and `coachingCues` on high-risk/high-traffic skills.
7. Curate duplicate videos by domain, starting with leg locks, guard, escapes, and submissions.
8. Clean stale chunk groups, stale docs, and unresolved planned routes.
9. Do final app-shell terminology pass for Vietnamese and French.

## Acceptance Criteria

- All checks remain green: build, lint, content validation, i18n content audit.
- `/study`, `/skills`, `/fix`, and `/search` agree on skill count, names, domains, and availability.
- Offline repeat visit can load skill content and previously visited video metadata.
- Advanced leg-lock pages visibly direct users through safety prerequisites.
- At least 80% of high-priority skills have mat-ready `moneyDetails`, `coachingCues`, and `fixItFast`.
- Duplicate video warnings are either reduced or classified with intentional reuse notes.
- Vietnamese and French UI labels follow a documented terminology policy.
- Architecture docs match the actual route map, data sources, and PWA behavior.
