# Production Readiness Report

## Verified

- `npm run build` passes.
- `npm run validate:data` passes.
- The app remains frontend-only with React, TypeScript, and Vite.
- English, Vietnamese, and French labels exist for new Technique Card OS UI.
- Language persistence remains unchanged.

## Risk Areas

- `skills-core` remains a large chunk because many generated data systems still land in one imported graph.
- Armbar, Triangle, and Omoplata now have body-position and blackbelt/generated data, but still need full hand-authored micro-detail and checklist systems.
- Legacy component folders remain because other pages still depend on them.

## Next Hardening Pass

- Split generated core data by category and lazy-load by route.
- Migrate remaining detail-like pages to the new view-model style.
- Add `validate:search` if the project wants a dedicated search-index smoke test.
