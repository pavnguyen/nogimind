# NoGi Mind App Architecture

NoGi Mind is a client-only React 19, TypeScript, Vite knowledge app for modern no-gi grappling. The app uses a **Hub-and-Spoke** navigation model with 26 page components, a dual data system (content pipeline + legacy data), and client-side search via Web Worker + MiniSearch.

**Build status:** ✅ Clean TypeScript (`tsc -b --noEmit`), 0 ESLint warnings, 0 build warnings.
**Build time:** ~900ms
**Total bundle (gzip):** ~330 kB (vendor-react 76 kB, app index 64 kB, reference-data 52 kB)

---

## Routes

| Path | Page Component | Status |
|------|---------------|--------|
| `/` | `DashboardPage` | ✅ Live |
| `/learn` | `LearnPage` | ✅ Live |
| `/study` | `StudyPage` | ✅ Live |
| `/build` | `BuildHubPage` | ✅ Live |
| `/fix` | `FixHubPage` | ✅ Live |
| `/reference` | `ReferencePage` | ✅ Live |
| `/skills` | `SkillMapPage` | ✅ Live |
| `/skills/:skillId` | `SkillDetailPage` | ✅ Live |
| `/troubleshooters` | `SubmissionTroubleshootersPage` | ✅ Live |
| `/troubleshooters/:skillId` | `SubmissionTroubleshooterDetailPage` | ✅ Live |
| `/escape-maps` | `EscapeMapsPage` | ✅ Live |
| `/escape-maps/:skillId` | `EscapeMapDetailPage` | ✅ Live |
| `/concepts` | `ConceptsPage` | ✅ Live |
| `/concepts/:conceptId` | `ConceptDetailPage` | ✅ Live |
| `/positions` | `PositionsPage` | ✅ Live |
| `/positions/:positionId` | `PositionDetailPage` | ✅ Live |
| `/defense` | `DefensePage` | ✅ Live |
| `/defense/:layerId` | `DefenseDetailPage` | ✅ Live |
| `/archetypes` | `ArchetypesPage` | ✅ Live |
| `/archetypes/:archetypeId` | `ArchetypeDetailPage` | ✅ Live |
| `/mastery` | `MasteryMapPage` | ✅ Live |
| `/glossary` | `GlossaryPage` | ✅ Live |
| `/search` | `SearchPage` | ✅ Live |
| `/philosophy` | `AboutPage` (alias) | ✅ Live |
| `/about` | `AboutPage` | ✅ Live |
| `/settings` | `SettingsPage` | ✅ Live |
| `*` | `NotFoundPage` | ✅ Live |

### Planned routes (not yet implemented)

| Path | Description |
|------|-------------|
| `/micro-details` | Browse all micro-details across skills |
| `/chains` | Chain transition maps (replaced by `/escape-maps` functionally) |
| `/game-tree` | Interactive technique decision tree |

### Navigation hubs

All routes are nested under a shared `<Layout />` component with Hub-and-Spoke navigation:

- **Learn** — `/learn` · learning paths, positions, concepts
- **Study** — `/study`, `/skills`, `/skills/:skillId`
- **Fix** — `/troubleshooters`, `/troubleshooters/:skillId`, `/escape-maps`, `/escape-maps/:skillId`, `/defense`, `/defense/:layerId`
- **Build** — `/archetypes`, `/archetypes/:archetypeId`, `/mastery`
- **Reference** — `/glossary`, `/search`, `/about`
- **Settings** — `/settings`

---

## Data Flow

The app uses a **dual data system** during migration from legacy TypeScript seed data to a JSON-based content pipeline.

### Content Pipeline (Phase 2 — primary)

```
content/
  shared/
    domains.json          ← pipeline domain definitions (10 domains)
    concepts.json         ← concept definitions
    positions.json        ← position definitions
  skills/
    {domain}/
      {skill-id}/
        skill.json        ← Zod-validated skill metadata
        content.en.json   ← English content
        content.vi.json   ← Vietnamese content
        content.fr.json   ← French content
        videos.json       ← video references (optional)
```

Build step (`npm run build:content`) generates artifacts into `public/generated/`:

```
public/generated/
  manifest/skills.{locale}.json   ← lightweight skill listings (117 skills)
  skills/{locale}/{id}.json       ← full skill detail artifacts
  videos/by-skill/{id}.json       ← video mappings per skill
```

**Runtime loading** (in `src/content-runtime/`):
- `manifests.ts` — `getManifest(locale)` fetches manifest with caching
- `skills.ts` — `getSkillDetail(locale, id)` fetches full skill detail
- `videos.ts` — `getSkillVideos(locale, id)` fetches video mappings
- `concepts.ts` — `getConceptDetail(locale, id)` fetches concept detail with legacy fallback
- `positions.ts` — Runtime position data types (content-runtime interface)

**Validation**: All JSON files are validated against Zod schemas in `src/types/content.ts`:
- `SkillMetaSchema` — validates `skill.json`
- `SkillContentSchema` — validates `content.*.json`
- `SkillDetailArtifactSchema` — validates generated artifacts

### Legacy Data (Phase 1 — fallback)

Static local data lives in `src/data/`. Query wrappers in `src/queries` expose data to pages.

| File | Purpose | Used By |
|------|---------|---------|
| `src/data/archetypes.ts` | Player archetype definitions | `ArchetypesPage`, `ArchetypeDetailPage` |
| `src/data/concepts.ts` | Concept definitions | `ConceptsPage`, `ConceptDetailPage` |
| `src/data/defensiveLayers.ts` | Safety/defense layers | `DefensePage`, `FixHubPage`, `DashboardPage` |
| `src/data/domains.ts` | Domain definitions | `SkillMapPage`, `SkillSearchFilters` |
| `src/data/glossaryTerms.ts` | Glossary terms | `GlossaryPage` |
| `src/data/masteryStages.ts` | Mastery stage definitions | `MasteryMapPage`, `BuildHubPage` |
| `src/data/positions.ts` | Position definitions | `PositionsPage`, `PositionDetailPage` |
| `src/data/sharedKnowledge.ts` | BJJ principles | `DashboardPage` |
| `src/data/techniqueStateMachines.ts` | Technique chain state graphs | `knowledgeSearch`, `searchEngine` |
| `src/data/trainingMethods.ts` | Training methods | `DashboardPage` |
| `src/data/videos/videoSelectors.ts` | Video reference selectors | Video components |
| `src/data/videos/index.ts` | Video data exports | Video components |

**Removed in cleanup:**
- `src/data/skills/*.ts` — migrated to content pipeline; directory now empty
- `src/data/skillNodes.ts` — unused (replaced by pipeline manifests)
- `src/data/technicalDetails.ts` — migrated into content pipeline
- `src/data/microDetailSystems*.ts` — merged into skill content artifacts
- Various other standalone data files replaced by pipeline artifacts

### Dashboard stats

`DashboardPage` reads from **both** systems:
- **Content pipeline** (via `useManifestQuery`): total skills, safety count, domain-by-domain coverage, checklist completion rate
- **Legacy data** (via `useSkillsQuery`): daily rotation items (micro-detail, concept, position, training tip, safety principle)

---

## Search

Unified search is client-side with **MiniSearch** running in a **Web Worker** (`src/workers/searchWorker.ts`). The index is built from legacy data and cached per language via `indexedDB` (`src/utils/searchCache.ts`). Two search modes exist:

- **Quick** — lightweight title/subtitle match
- **Deep** — full-text across descriptions, coaching cues, and micro-details

Search data includes: skills, micro-details, body-to-body details, blackbelt details, glossary, concepts, positions, chains, troubleshooters, escape maps, and safety notes.

Search utility files:
- `src/utils/search.ts` — Client-side skill search (`searchSkills`)
- `src/utils/knowledgeSearch.ts` — Cross-entity knowledge search (`searchKnowledge`)
- `src/utils/searchEngine.ts` — MiniSearch engine factory + index builder
- `src/utils/searchCache.ts` — indexedDB cache for search indices

---

## I18n

The app supports `en`, `vi`, and `fr`. English is the default and fallback. The selected language is stored in `localStorage` under `nogi_language`. Translation files are in `src/i18n/resources/`. All content pipeline domains have i18n keys for display names.

| File | Purpose |
|------|---------|
| `src/i18n/i18n.ts` | i18next configuration (detection, fallback) |
| `src/i18n/resources/en.ts` | English translations |
| `src/i18n/resources/vi.ts` | Vietnamese translations |
| `src/i18n/resources/fr.ts` | French translations |

---

## Components & UI

### Component Directory Map

```
src/components/
├── common/           ← Shared UI primitives (12 files: all used)
│   ├── Badge.tsx, ContentSourceBadge.tsx
│   ├── EmptyState.tsx, FormattedText.tsx
│   ├── KeyboardShortcutsOverlay.tsx
│   ├── NotFound.tsx, PageHeader.tsx, PageShell.tsx
│   ├── ProgressBar.tsx, SectionCard.tsx
│   ├── Skeleton.tsx, StatCard.tsx
├── content/          ← Content pipeline tabs (3 files: all used)
│   ├── PipelineLearnTab.tsx, PipelineFixTab.tsx
│   └── pipelineHelpers.ts
├── i18n/             ← Language switcher (1 file: used)
│   └── LanguageSwitcher.tsx
├── layout/           ← App shell (6 files: all used)
│   ├── Header.tsx, Sidebar.tsx, Layout.tsx
│   ├── MobileNav.tsx, HubTabBar.tsx
│   └── navItems.ts
├── learning/         ← Learning path components (3 files)
│   ├── NextStepStrip.tsx  ← used by 4 detail pages
│   ├── NextStepCard.tsx   ← used by ConceptDetail, PositionDetail
│   └── PagePurposeBanner.tsx  ← UNUSED
├── settings/         ← Settings (1 file: used)
│   └── ExportImportPanel.tsx
├── skill/            ← Skill detail sub-components (4 files)
│   ├── SkillDetailTabs.tsx  ← used by SkillDetailPage
│   ├── SkillHeader.tsx      ← used by SkillDetailPage
│   ├── SectionAccordion.tsx ← used by PipelineVideoPanel, PipelineLearn/FixTab
│   └── BodyContactCard.tsx  ← UNUSED
├── skills/           ← Skill listing components (19 files)
│   ├── SkillCard.tsx           ← used by SkillMapPage
│   ├── SkillSearchFilters.tsx  ← used by SkillMapPage
│   └── 17 other components    ← UNUSED (legacy view builders)
├── video/            ← Video reference components (8 files)
│   ├── ConceptVideoReferencePanel.tsx  ← used
│   ├── PositionVideoReferencePanel.tsx ← used
│   ├── LazyYouTubeEmbed.tsx            ← used
│   ├── PipelineVideoPanel.tsx          ← used
│   ├── VideoReferenceCard.tsx          ← used
│   ├── VideoTimestampList.tsx          ← used
│   ├── SkillVideoReferencePanel.tsx    ← UNUSED
│   └── VideoReferenceSection.tsx       ← UNUSED
```

**Cleanup status:** Directories `src/components/chain/`, `src/components/stateGraph/`, `src/hooks/`, `src/data/skills/` are empty (files removed). Files marked UNUSED above can be removed to reduce bundle.

### Key sections on `SkillDetailPage`

- `SkillDetailTabs` — Tab bar switching between Learn / Fix / Video views
- `SkillHeader` — Skill name, badges, risk level
- `PipelineLearnTab` — Content pipeline learn view (micro-details, body mechanics, checklists)
- `PipelineFixTab` — Content pipeline fix view (troubleshooting, safety, corrections)
- `SkillVideoReferencePanel` — Video references for the current skill (imported directly, not through the unused `SkillVideoReferencePanel.tsx` component)

### Content pipeline UI components

| Component | Location | Purpose |
|-----------|----------|---------|
| `ContentSourceBadge` | `src/components/common/` | Badge showing `generated`/`legacy` source |
| `PipelineLearnTab` | `src/components/content/` | Learn tab from pipeline detail |
| `PipelineFixTab` | `src/components/content/` | Fix tab from pipeline detail |
| `PipelineVideoPanel` | `src/components/video/` | Video reference panel for pipeline skills |

---

## State Management

- **React Query** (`@tanstack/react-query` v5) — Server-state for data fetching:
  - `src/queries/skillQueries.ts` — Skill data queries
  - `src/queries/conceptQueries.ts` — Concept data queries
  - `src/queries/positionQueries.ts` — Position data queries
  - `src/queries/defenseQueries.ts` — Defense layer queries
  - `src/queries/archetypeQueries.ts` — Archetype queries
  - `src/queries/glossaryQueries.ts` — Glossary queries
  - `src/queries/contentQueries.ts` — Pipeline manifest queries
  - `src/queries/userDataMutations.ts` — User progress mutations
  - `src/queries/queryClient.ts` — Shared QueryClient config
- **Zustand** (v5) — Client state:
  - `useUiStore` — UI preferences, sidebar state
  - `useSettingsStore` — Language, display options
  - `useSearchStore` — Search query, filters
  - `useRecentlyViewedStore` — Recently visited skills (persisted to localStorage)

### Repositories

Data access layer that wraps legacy TypeScript data with lookup helpers:

| Repository | Data Source |
|------------|-------------|
| `skillsRepository.ts` | Legacy skill seeds |
| `conceptsRepository.ts` | Legacy concept definitions |
| `positionsRepository.ts` | Legacy position data |
| `archetypesRepository.ts` | Player archetypes |
| `defensiveLayersRepository.ts` | Safety/defense layers |
| `glossaryRepository.ts` | Glossary terms |
| `userDataRepository.ts` | User's personal tracking data (localStorage) |

---

## Assets & SEO

| File | Purpose |
|------|---------|
| `public/robots.txt` | SEO — allow all crawlers, point to sitemap |
| `public/sitemap.xml` | SEO — all 26 routes + content skills index |
| `public/site.webmanifest` | PWA manifest (basic) |
| `.env.example` | Documents environment variables (e.g., `VITE_YOUTUBE_API_KEY`) |

---

## Performance Monitoring

Web Vitals tracking is initialized in `src/main.tsx` using the `web-vitals` library. The following metrics are reported via `console.log` in development:

- **CLS** (Cumulative Layout Shift)
- **FID** (First Input Delay)
- **LCP** (Largest Contentful Paint)

To enable production reporting, replace `console.log` in `src/main.tsx` with a real analytics endpoint (Google Analytics, Plausible, etc.).

---

## Bundle Size Analysis

Current production bundle breakdown (Vite + Rollup code-splitting):

| Chunk | Raw Size | Gzipped | Content |
|-------|----------|---------|---------|
| `vendor-react.js` | 236.73 kB | 76.19 kB | React, ReactDOM, React Router |
| `index.js` (app) | 204.12 kB | 64.43 kB | Core app + all pages |
| `reference-data.js` | 176.79 kB | 52.33 kB | Reference entities (concepts, positions, glossary) |
| `defensive-data.js` | 109.81 kB | 33.70 kB | Defensive layers, escape maps |
| `mastery-data.js` | 67.95 kB | 21.32 kB | Mastery stages, archetypes |
| `vendor-i18n.js` | 42.28 kB | 13.39 kB | i18next + translations |
| `vendor-query.js` | 29.04 kB | 8.94 kB | React Query |
| CSS | 90.15 kB | 15.08 kB | Tailwind-generated styles |

**Optimization opportunities:**
- ~20+ unused component files exist across `skills/`, `skill/`, `video/`, and `learning/` directories (legacy view builders) — removing them could reduce the app chunk
- `@tanstack/react-virtual` is listed in `package.json` but may not be used in any active code
- `@tanstack/react-query-devtools` is included in production builds — should be lazy-loaded or conditionally excluded

---

## Scripts & Tooling

| Script | Purpose |
|--------|---------|
| `npm run dev` | Vite dev server |
| `npm run build` | Full production build (`tsc -b && vite build`) |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint check |
| `npm run build:content` | Build content pipeline artifacts from `content/skills/` |
| `npm run create-skill <domain> <skill-id>` | Scaffold a new skill folder with template files |
| `npm run validate:content` | Zod-validate all content JSON files |
| `npm run collect-videos` | YouTube search for candidate video references |
| `npm run generate-video-refs` | Generate video reference JSON from candidates |
| `npm run audit:vi` | Check Vietnamese translation coverage |

### Content management scripts (`scripts/`)

| Script | Purpose |
|--------|---------|
| `scripts/content/scaffold-skill.ts` | Create new skill folder with templates |
| `scripts/content/build-content.ts` | Validate + generate manifest and detail artifacts |
| `scripts/content/validate-content.ts` | Zod validation with cross-file checks |
| `scripts/content/load-json.ts` | Shared JSON utilities (discovery, paths) |
| `scripts/collectVideoCandidates.ts` | YouTube search for candidate video references |
| `scripts/generateVideoReferences.ts` | Generate video reference JSON from candidates |
| `scripts/auditNoGiVideos.ts` | Audit video coverage gaps |
| `scripts/auditViKeys.ts` | Check Vietnamese translation coverage |
| `scripts/audit-references.mjs` | Cross-reference audit (self-references, missing IDs, orphans) |

---

## Content Pipeline Schema

Skills are organized across **10 domains** defined in `content/shared/domains.json`:

1. `positional_awareness` — Beginner
2. `survival_defense` — Beginner
3. `escapes` — Intermediate
4. `guard_retention` — Intermediate
5. `guard_offense` — Intermediate
6. `wrestle_up_wrestling` — Intermediate
7. `passing` — Intermediate
8. `pins_rides` — Intermediate
9. `back_control` — Advanced
10. `submission_systems` — Advanced

Each skill has `level`: `beginner` | `intermediate` | `advanced` and `status`: `draft` | `published` | `archived`.

### Folder-to-domain mapping

Content folders are abbreviated names that map to schema domains:

| Folder | Schema Domain(s) |
|--------|-----------------|
| `pins/` | `pins_rides` |
| `wrestling/` | `wrestle_up_wrestling` |
| `guard/` | `guard_offense`, `guard_retention` |
| `submissions/` | `submission_systems`, `back_control` |
| `passing/` | `passing` |
| `escapes/` | `escapes`, `positional_awareness`, `survival_defense` |

---

## Dependencies

### Runtime

| Package | Version | Purpose | Bundle Impact |
|---------|---------|---------|---------------|
| `react` | ^19.2.5 | UI framework | 76 kB gzip (shared with react-dom, router) |
| `react-dom` | ^19.2.5 | DOM renderer | included above |
| `react-router-dom` | ^7.14.2 | Client routing | included above |
| `@tanstack/react-query` | ^5.100.7 | Data fetching | 8.9 kB gzip |
| `zustand` | ^5.0.12 | State management | ~3 kB gzip |
| `i18next` + `react-i18next` | ^26.x + ^17.x | Internationalization | 13.4 kB gzip |
| `lucide-react` | ^1.14.0 | Icons | Tree-shakeable |
| `minisearch` | ^7.2.0 | Client-side search | ~15 kB gzip |
| `clsx` + `tailwind-merge` | ^2.x + ^3.x | Class name utilities | ~2 kB combined |

### Dev

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ~6.0.2 | Type checking |
| `vite` | ^8.0.10 | Build tool |
| `@vitejs/plugin-react` | ^6.0.1 | React Fast Refresh |
| `tailwindcss` | ^3.4.17 | Utility CSS |
| `postcss` + `autoprefixer` | ^8.x + ^10.x | CSS processing |
| `eslint` | ^10.2.1 | Linting |
| `tsx` | ^4.21.0 | Execute TypeScript scripts |

### Potential removals

| Package | Issue |
|---------|-------|
| `@tanstack/react-virtual` | Listed but not imported in any active component |
| `@tanstack/react-query-devtools` | Bundled in production — should be lazy-imported or conditionally loaded via `import.meta.env.DEV` |
