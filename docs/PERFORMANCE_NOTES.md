# Performance Notes

## Optimized In This Pass

- Header search already used debounce; score badges were removed from suggestions to reduce visual noise.
- Unified search now debounces input before running MiniSearch.
- MiniSearch continues to cache one index per language instead of rebuilding on every keystroke.
- Skill Detail renders new body-to-body and blackbelt data in compact cards, with simple mode limiting visible phases and contacts.
- Search results no longer display internal ranking scores.
- Header suggestions now lazy-load the MiniSearch module only after the user types, so the app shell no longer imports the full search corpus on first paint.
- Graph-heavy components are lazy-loaded behind their route or advanced view.
- Study and Skill Map pages memoize repeated grouping/filtering work so larger skill libraries do not recalculate simple counts on every render.
- The Micro Details board now uses true mistake/failure fields where available instead of reusing explanatory text as the "wrong" state.
- Skill repository access now lazy-loads and caches the full `skillNodes` corpus instead of importing it at repository module evaluation time.
- Core skill seed source is physically split by domain/tier under `src/data/skills/` (`submissions`, `passing`, `escapes`, `guard`, `wrestling`, `legLocks`, `modern`, plus `foundation`/`pins` support files).
- Vite Rolldown chunk groups separate graph code, generated skill data, reference data, MiniSearch vendor code, search engine code, modern skills, and the new skill-domain seed files so heavy knowledge modules have clearer build boundaries.

## Current Heavy Areas

- The production build still reports a large `skills-core` chunk because the final builder and targeted skill mechanics maps remain centralized in `skillNodes.ts`.
- Search is now separated from MiniSearch vendor and skill seed chunks; the search engine chunk is no longer carrying the whole skill corpus by itself.
- `skillNodes.ts` now composes domain seed modules, but the final full `SkillNode` builder is still centralized. Routes that need complete skill records still load the composed corpus after repository hydration.
- Graph-heavy pages/components should remain advanced or route-level experiences instead of appearing above the fold.
- Full body-to-body coverage will increase data size; future enrichment should keep text concise.

## Suggested Future Optimizations

- Move the full skill builder logic from `skillNodes.ts` into a reusable `skillBuilder` module, then let Study/Skill Detail/Search dynamically import only the domain seed files they need.
- Add repository methods such as `loadSkillDomain('passing')` and `loadSkillById(id)` backed by a generated id-to-domain manifest.
- Split search indexing into domain-aware mini indexes when the corpus grows enough that full unified search feels heavy.
- Lazy-load graph rendering and graph data only when opening Game Tree or advanced Skill Detail views.
- Consider route-level imports for large knowledge modules if the UX remains smooth.
- Keep search indexing memoized per language and avoid indexing non-visible personal/tracking data.
