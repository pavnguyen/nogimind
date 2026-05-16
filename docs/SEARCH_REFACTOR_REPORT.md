# Search Refactor Report

Search continues to use MiniSearch, with cached indexes per language.

## Improvements

- Search documents now index new Technique Card OS section names.
- Old section concepts map to new anchors:
  - quick card and quick start to `#system-logic`
  - micro details to `#details`
  - micro, blackbelt, and checklist content to `#details`
  - fix-it-fast and safety content to `#fix-it-fast` / `#safety`
  - troubleshooting to `#fix-it-fast`
  - related/next content to `#next-step`
- Vietnamese no-diacritic normalization is retained.
- Synonym expansion is retained.
- Results are grouped in the UI and capped to 80.
- Input debounce is 160ms.
- `npm run validate:search` passes with the current Technique Card OS anchors.

## Remaining Work

Virtualization is not necessary at the current capped result size, but should be added if the result cap grows.
