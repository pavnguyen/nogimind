# Performance Notes

## Optimized In This Pass

- Header search already used debounce; score badges were removed from suggestions to reduce visual noise.
- Unified search now debounces input before running MiniSearch.
- MiniSearch continues to cache one index per language instead of rebuilding on every keystroke.
- Skill Detail renders new body-to-body and blackbelt data in compact cards, with simple mode limiting visible phases and contacts.
- Search results no longer display internal ranking scores.

## Current Heavy Areas

- The production build still reports a large main chunk because the local knowledge data corpus and graph/search utilities are broad.
- Graph-heavy pages/components should remain advanced or route-level experiences instead of appearing above the fold.
- Full body-to-body coverage will increase data size; future enrichment should keep text concise.

## Suggested Future Optimizations

- Split large static data modules by route or feature domain.
- Lazy-load graph rendering and graph data only when opening Game Tree or advanced Skill Detail views.
- Consider route-level imports for large knowledge modules if the UX remains smooth.
- Keep search indexing memoized per language and avoid indexing non-visible personal/tracking data.
