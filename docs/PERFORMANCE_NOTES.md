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

## Current Heavy Areas

- The production build still reports a large data chunk because the local knowledge corpus is broad.
- After lazy-loading header search, the main app chunk is much smaller; the remaining large warning is mostly the `skillNodes` data chunk.
- Graph-heavy pages/components should remain advanced or route-level experiences instead of appearing above the fold.
- Full body-to-body coverage will increase data size; future enrichment should keep text concise.

## Suggested Future Optimizations

- Split large static data modules by route or feature domain.
- Split `skillNodes` by domain or tier if the library grows beyond the current 65 skills.
- Lazy-load graph rendering and graph data only when opening Game Tree or advanced Skill Detail views.
- Consider route-level imports for large knowledge modules if the UX remains smooth.
- Keep search indexing memoized per language and avoid indexing non-visible personal/tracking data.
