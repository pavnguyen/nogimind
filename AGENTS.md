# AGENTS.md

Guidance for AI coding agents working in this repository. Follow it unless a more
specific `AGENTS.md` in a subdirectory applies.

## 1. What this is

NoGi Mind is a multilingual (EN/VI/FR) no-gi grappling knowledge app, built as a
static, content-driven SPA/PWA with no backend.

- React 19 + TypeScript (strict) + Vite 8 (Rolldown)
- React Router 7, Tailwind CSS v4, Framer Motion
- TanStack Query, Zustand, Zod
- i18next (EN/VI/FR), MiniSearch in a Web Worker
- vite-plugin-pwa (offline content, auto-updating service worker)
- Vitest + Testing Library

## 2. Non-negotiables

- **Never use the em dash character (U+2014).** Replace it with `-`, `,` or `.`
  depending on context: `,` when the clause continues (apposition, elaboration),
  ` - ` when it introduces a label, subtitle or aside, and `.` when it starts a
  new sentence. This applies to UI copy, content, comments, docs and commit
  messages. The only exception is metadata copied verbatim from an external
  source (for example a YouTube title); keep the source string exactly.
- **Do not invent grappling knowledge.** Never fabricate technique details,
  coach quotes, competition claims or "facts" to fill a gap. Use source material
  in the repo, or leave the field out and say so.
- **Never hand-edit `public/generated/`.** It is build output. Change `content/`
  and run `npm run build:content`. (See section 12 for the current exception.)
- **Keep ids canonical.** An `id` is always lowercase kebab-case and equals its
  folder or file name. Every cross-reference (`relatedSkills[].id`,
  `coreSkillIds`, `relatedSkillIds`, `relatedConceptIds`, `nextPositionId`) must
  resolve to a real id, case included: Linux and Vercel are case-sensitive.
- **Terminology is fixed.** Use the canonical BJJ term in English; never
  translate a technique name into Vietnamese. `Straight Ankle Lock` stays
  `Straight Ankle Lock` in every locale (never `thẳng ankle lock`, `ankle lock
  thẳng`, `khóa chân thẳng`). Same rule for `Heel Hook`, `Rear Naked Choke`,
  `Body Triangle`, `Knee Cut`, `Body Lock`, `Single Leg`, `Double Leg`
  (never `chân đơn`, `chân đôi`, `une seule jambe`, `jambe unique`, `double
  jambe`), etc. `Knee Reaping` and `False Reap` stay English too: write
  `Knee Reaping`, never `gặt hái`, `gặt đầu gối`, `thu hoạch`, `récolte`,
  `fausse récolte` or `Récolter la conscience`. Keep the canonical casing as
  well: `Knee Shield`, `Head Position`, `Knee Line`, `Single Leg X`, never
  `knee shield`, `knee line` or `X sur une jambe`.
- **Report checks honestly.** Never claim a check passed if it failed, was
  skipped or could not run.
- **Do not weaken checks to go green.** No skipped tests, no loosened
  assertions, no `any` or lint suppressions to silence a real failure.
- **Respect user and parallel work.** Run `git status` first and preserve
  unrelated modifications. Other tooling may edit this repo at the same time;
  re-check files before and after edits, and never `git reset` or
  `git checkout --` to "clean up".

## 3. Repository map and data ownership

```
content/skills/<domain-folder>/<skill-id>/   canonical source of a skill
  skill.json                    metadata: id, domain, level, name, tags, relations, featureFlags
  content.{en,vi,fr}.json       localized content (all three required)
  videos.json                   YouTube references (schema: SkillVideoRefSchema)
content/shared/                 domains.json, positions.json, concepts.json, path.json (id + name lists)
content/paths/<group-id>/       non-position Path steps: path.json + content.{en,vi,fr}.json [planned, section 14]
src/pages/                      route screens (lazy via src/router/routes.tsx + AppRouter.tsx)
src/components/                 layout, dashboard, content, learning, skills, video, common
src/queries/                    TanStack Query client + content queries
src/content-runtime/            manifest + payload runtime (skills, concepts, positions, videos, path) [path planned, section 14]
src/repositories/               pipeline-first loaders with legacy fallback
src/utils/                      search, searchText, cache, localization
src/data/                       legacy in-app reference data (concepts, positions, archetypes, ...)
src/i18n/resources/             en.ts | vi.ts | fr.ts UI copy
public/generated/               BUILT artifacts: manifest/ (incl. path.<locale>.json, planned), skills/<locale>/, concepts/, positions/, videos/by-skill/
scripts/                        auditViKeys.ts, validate-videos.ts
scripts/content/                build-content.ts, validate-content.ts, scaffold-skill.ts, load-json.ts, validate-relations.ts, skill-order.ts [both planned, section 14]
```

Folder-to-domain mapping (folders are abbreviations; `domain` is the schema
value, and a folder may hold several domains):

| Folder | Domain(s) |
| --- | --- |
| `pins/` | `pins_rides` |
| `wrestling/`, `wrestle_up_wrestling/` | `wrestle_up_wrestling` |
| `guard/` | `guard_offense`, `guard_retention` |
| `guard_offense/` | `guard_offense` |
| `submissions/` | `submission_systems`, `back_control` |
| `submission_systems/`, `back_control/` | `submission_systems`, `back_control` |
| `passing/` | `passing` |
| `escapes/` | `escapes`, `positional_awareness`, `survival_defense` |

Canonical domain list: `content/shared/domains.json`.

Rules:

- Prefer editing existing files; reuse existing components, hooks, queries and
  utilities before writing new ones. Never add a dependency for something a
  current util already does.
- Pages must not import generated JSON directly when a query or runtime layer
  already exists for it.
- `content/` and `src/data/` both carry ids. When renaming or re-casing anything,
  fix both sides in the same change and re-run validation.
- Every cross-reference must resolve: `relatedSkillIds`, `prerequisiteSkillIds`,
  `nextSkillIds`, `relatedSkills[].id`, `relatedConceptIds`, `nextPositionId` and the
  path group skill ids. `npm run validate:relations` is the gate (section 14); until it
  lands, verify by searching for the id case-sensitively before trusting it.
- Author a relation in one direction only. The build mirrors `nextSkillIds` into the
  target's prerequisites, and two conflicting declarations are a validation error
  (section 14).

## 4. Adding a new skill

1. Scaffold it: `npm run create-skill <domain-folder> <skill-id>`.
2. Fill `skill.json` (metadata, relations, tags, featureFlags) and all three
   `content.{en,vi,fr}.json` files. EN is authoritative; VI and FR must exist.
3. Keep content layers distinct: `description`, `shortInstruction`, `summary`,
   `whyItWorks` (mechanical reasons, not strategy), `commonMistakes` (observable
   errors), `coachingCues` (short imperatives), `safetySummary`, `keyCorrections`,
   `fixItFast`, `moneyDetails` (body placement, angle, pressure, timing),
   `systemLogic` (`corePrinciple`, `decisionTree[]`, `exitStrategies[]`).
4. **Check for duplication before writing.** Search existing skills for the same
   technique or alias (`grep -ril "<term>" content/skills`). If a skill already
   covers it, extend that skill instead of adding a near-duplicate. Two skills
   may not describe the same technique under different names.
5. Add videos (section 5). Every skill must stay playable.
6. Wire the skill into the system: related skills, archetypes
   (`src/data/archetypes.ts`), and positions or concepts in `content/shared/`
   only when it is genuinely new. Orphan skills are a defect.
7. Tag vocabulary: `tier:modern-expansion|advanced-niche|safety-critical`,
   `meta:modern-common|emerging|specialized|experimental`,
   `risk:low|medium|high|safety-critical`, `family:*` (passing, guard,
   submission, back-take, ride, wrestling, leg-lock, front-headlock, escape,
   pin, scramble, safety, compression), plus `group:*` from `ModernSystemGroup`.

Safety-sensitive work (leg locks, neck attacks, takedowns): never remove or
soften existing risk metadata or safety guidance, and never encourage explosive
application.

## 5. Video references (no-gi and modern only)

Schema (`SkillVideoRefSchema` in `src/types/content.ts`): `youtubeId`, `title`,
`channel`, `whyUseful`, `relevance`, `level`, optional `timestampStart`.

`relevance` is one of `primary | supplemental | advanced | alternate | related`.
`primary` is the single best teaching video for the skill.

**Source filter (hard rule).** The app is no-gi. Only add NoGi, no-gi or modern
BJJ videos:

- Prefer modern no-gi channels: B-Team, Craig Jones, Lachlan Giles/Submeta,
  Jozef Chen, Dante Leon, Neil Melanson, BJJ Fanatics (no-gi sets), Gordon Ryan
  study breakdowns, ADCC, CJI, FloGrappling, BJJ Mental Models.
- Reject traditional gi or kimono technique videos, IBJJF gi-only footage, and
  anything whose teaching depends on gi grips (lapel, sleeve, collar).
- When a technique is taught differently with the gi, either find the no-gi
  version or skip the video; do not adapt gi mechanics into no-gi content.

**Practical search.** Query with a no-gi qualifier and the exact skill term, for
example `no gi <technique> details`, `nogi <technique> breakdown`,
`<technique> modern no-gi`. Skip results with "gi", "kimono" or "Gi" in the
channel or title unless the clip itself is the no-gi version.

**Before adding an entry**, verify the video is live and copy its real metadata:

```bash
curl -s "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<id>&format=json"
```

Use the returned `title` and `author_name` (channel) verbatim. Never guess a
title from the id.

- **One `youtubeId` maps to one title and one channel across the whole repo.**
  Reusing a video across skills is legitimate; conflicting metadata is not.
  `validate:content` warns on exactly that, so keep that warning count at zero.
- Panels (`ConceptVideoReferencePanel`, `PositionVideoReferencePanel`) merge
  videos from related skills and dedupe by `youtubeId`
  (`dedupeVideosByYoutubeId`, highest relevance wins). Do not re-introduce
  per-skill duplicates there.
- **One play button only.** `LazyYouTubeEmbed` renders the real YouTube player
  lazily. Never add an app-owned play button or thumbnail facade: that produces
  the "click twice" bug.
- Keep the offline placeholder, the unavailable/retry state and the
  broken-video report flow intact.
- Check availability with `npm run validate:videos` and replace dead references.
  Every skill keeps at least one playable video.
- `npm run validate:videos` also compares every stored `title` and `channel`
  against oEmbed and exits non-zero on drift, so keep the metadata verbatim
  instead of paraphrasing it. Re-run it after editing a `videos.json`.
- `npm run validate:content` also scans every `videos.json` for gi/kimono-only
  sources (kimono, lapel, gi grips, a bare `gi` token, ...) and reports a warning
  for each. Titles that cover both gi and no-gi are counted as informational, not
  warnings. Keep the warning count at zero: if a real gi video slips in, replace
  it with the no-gi version.

## 6. Positions and concepts

- Position and concept metadata is authored in `content/` (`content/positions/`,
  `content/concepts/`) and built into `public/generated/`. The logical display
  order for positions lives in `content/shared/positions.json` and drives both
  `/positions` and `learn?tab=positions`. Keep the fundamentals first: standing,
  then guard, pins, back control, then leg entanglement, scramble and submission
  threats.
- The Learn tab shows the first positions in that order, so a new position is
  only discoverable if it is placed sensibly in the order.
- Concept categories are a closed list (`ConceptCategory` in
  `src/types/concept.ts`, mirrored in `src/types/content.ts`,
  `src/data/concepts.ts` and `src/i18n/resources/*`). Adding or removing a
  category means updating all four places plus the three locale files.
- `content/shared/positions.json` keeps driving `/positions` and the Learn tab order. The
  Skill Hub Path tab reads `content/shared/path.json` instead, which lists the same
  positions plus the non-position steps held in `content/paths/<group-id>/`, so a new
  position is added to both shared lists (planned, section 14).

## 7. i18n and Vietnamese style

- UI copy lives in `src/i18n/resources/{en,vi,fr}.ts`; add all three when you add
  a key. `npm run audit:vi` reports VI gaps.
- Skill content: EN is authoritative, VI and FR must exist.
- Vietnamese must read naturally, not word-for-word from English. Keep standard
  BJJ loanwords (Heel Hook, tap, sweep, guard, Mount, Side Control), but write
  grammar and verbs in Vietnamese. Avoid strings like `Hide heel`,
  `Clear secondary leg`, `Partner đã khóa heel` or a translated technique name:
  they are machine translation, not Vietnamese.
- Known machine-translation corrections already applied across the content, so
  do not reintroduce them: `trốn thoát` becomes `thoát`, `vật lộn` becomes `vật`,
  `khung hình` becomes `khung`, `lưu giữ` becomes `giữ`, `đòn đánh` becomes
  `pummeling`, `nêm` becomes `wedge`, `băng ghế` becomes `bench press`, and the
  dehumanising `chúng` (for the opponent) becomes `họ`.
- Never translate a technique name (section 2).

## 8. Search and filters

- Global search is MiniSearch inside a Web Worker
  (`src/utils/searchEngine.ts`, `src/workers/searchWorker.ts`), fed by manifests;
  indexes are cached per `lang:type:mode` and warmed during idle time.
- **Every** user-facing text filter must go through `src/utils/searchText.ts`
  (`normalizeSearchQuery` + `haystackIncludesQuery`), which folds diacritics so
  `khoa tay` matches `khóa tay`. Never use bare
  `text.toLowerCase().includes(query)`: unaccented Vietnamese input is normal.
- `normalizeSearchText` is intentionally length-preserving; snippet offsets
  depend on it.
- Search deep links must point at ids that exist in the DOM (`pipeline-*`
  sections on the skill page), or the user silently lands at the top of a page.
- Catalogue filtering is search-first and ranked, not a wall of separate selects: a few
  presets plus contextual facet chips, everything else behind one sheet on phones, and
  every filter living in URL params so a filtered view stays shareable. A facet group
  only renders when it can split the current result set, and a facet value's count is
  computed with the other active filters applied but with its own group ignored
  (planned, section 14).

## 9. UI, theming, accessibility

- Use the Hallmark theme tokens (`--hallmark-accent`,
  `--hallmark-text-primary`, ...) from `src/styles/hallmark-themes.css`, mapped
  through `@theme` in `src/index.css`. Provide per-hub accents with
  `HubThemeProvider` instead of hard-coding colors.
- Light mode is keyed off `html[data-theme="light"]`, **not** a media query,
  never reintroduce `@media (prefers-color-scheme)` for tokens, it would beat
  the in-app choice in Settings → Appearance. The attribute comes from
  `src/utils/theme.ts` (mirrored by the pre-paint script in `index.html`)
  reading the persisted `theme` preference; `theme.test.ts` guards both.
- The default preference is `light` (a fresh install opens on the cream
  palette). Persisted state moved to `version: 1`: the store's `migrate` and the
  `index.html` script both turn a v0 `system`, the old default, into `light`,
  once. An explicit `system`/`dark` stored as v1 must stay untouched.
- The dark palette is a **soft warm charcoal** (`#1a1814` page → `#2f2b24`
  card), not near-black; the `--color-warm-700…950` ramp in `src/index.css`
  and the `--hallmark-bg-*` mirrors in `hallmark-themes.css` move together.
  Lighten or darken them only in pairs, and re-run `npm run validate:contrast`,
  it measures every text/surface pair against the real stylesheet in both
  modes.
- Keep components accessible: semantic elements, labels for inputs, accessible
  names for icon-only actions, `aria-hidden` on decorative SVGs.
- Motion stays subtle and follows existing patterns (`page-enter`,
  `animate-fade-in`, framer-motion where already used).
- Route changes are handled by `AppRouter`'s `ScrollToTop`; use explicit
  redirects for retired routes instead of dropping them.
- `/skills` is the Skill Hub with `?tab=path|catalog`; `/study` redirects into it and
  `/skills/:skillId` stays the detail route. Never introduce a second catalogue route for
  the same data: two routes are what let the old `/skills` and `/study` drift apart
  (planned, section 14).
- Overlays such as the phone filter sheet reuse the dialog pattern already in
  `src/components/common/KeyboardShortcutsOverlay.tsx`: `role="dialog"` with
  `aria-modal`, focus trap and restore, Escape and backdrop close. No new modal
  dependency.
- For UI work, verify the affected route in the dev server or preview build when
  you can, and say so when you cannot.

## 10. PWA, build artifacts, caching

- `public/generated/**` is produced by `scripts/content/build-content.ts` and
  validated with Zod. Content JSON is served NetworkFirst under the
  `nogimind-content-v2` cache, so shipped content changes need
  `npm run build:content` before build or deploy.
- Do not hand-write into `public/generated/`. If an artifact is wrong, fix
  `content/` or the builder script.
- Generated builds touch many files: inspect the diff instead of assuming it is
  clean. A second `npm run build:content` must leave `public/generated/` byte-identical.
- New generated artifacts belong under an existing cached segment (`manifest/`, `skills/`,
  `concepts/`, `positions/`, `videos/`). The runtime cache pattern in `vite.config.ts` is
  anchored to those segments, so a file written to `public/generated/<name>.json` is not
  cached and quietly breaks offline use.

## 11. Commands and verification gates

```bash
npm run typecheck        # tsc -b
npm run lint             # eslint .
npm test                 # vitest run
npm run validate:content # Zod + cross-file checks (content changes)
npm run validate:relations # relation graph + path data (content changes)
npm run validate:videos  # YouTube availability + title/channel vs oEmbed (video changes)
npm run build:content    # regenerate public/generated (content changes)
npm run build            # tsc -b && vite build
npm run audit:vi         # Vietnamese coverage (i18n/content changes)
npm run create-skill     # scaffold a new skill
```

Expected: `typecheck`, `lint`, `test`, `validate:content`, `validate:relations` and
`build` exit 0. In `validate:relations` the errors fail the command and CI, while
warnings (level inversions today) and informational lines (step size, membership
counts) never do.
`validate:content` reports 0 errors, 0 warnings, plus an informational "Reused
videos" count. CI (`.github/workflows/ci.yml`, `content-validation.yml`) runs
lint, tests, build + typecheck and content validation on Node 22.

Run the narrowest check that covers your change, then the broader set for
non-trivial edits. When you filter command output, keep the command's exit status
(for example `; echo "exit=${PIPESTATUS[0]}"`), and after a repair re-run the
affected check: earlier green runs do not cover later edits.

## 12. Known traps

- **Em dash creep.** Writers and translators keep reintroducing the em dash.
  Search every source and content file for the Unicode code point U+2014 before
  finishing any copy or content change (for example with `grep -rnP '\x{2014}'`).
- **Case-corrupted ids.** Tooling that rewrites ids (`Armbar-system`,
  `Mount-top`, `closed-Guard`) silently breaks skill.json to folder matching,
  references, search URLs and video mappings. Keep ids lowercase and re-run
  `validate:content`.
- **Position and concept order is data.** `content/positions/` and
  `content/concepts/` each hold one folder per id (`position.json` or
  `concept.json` plus `content.{en,vi,fr}.json`), and `build:content` regenerates
  `public/generated/` from them. The manifest order comes from the id order in
  `content/shared/positions.json` and `content/shared/concepts.json`, not from
  the folder listing: add a new position or concept to its shared list as well,
  or it lands alphabetically at the end (and the Learn tab only shows the first
  18 positions).
- **Dangling cross-references.** This used to be a manual audit: `validate:content`
  does not resolve relation ids, which is how `bodylock-passing` survived as a long-lived
  typo for `bodylock-pass`, alongside case corruption such as `clamp-Guard-system` and
  `single-leg-x-Guard`. `npm run validate:relations` now fails on any relation id that
  does not resolve, so run it after touching relations and fix the content rather than
  the check. It resolves every authored reference in both directions: skill to skill
  (`relatedSkills[].id`, `prerequisiteSkillIds`, `nextSkillIds`, `relatedSkillIds`),
  positions to skills, skills to positions, concepts and archetypes, and every relation
  field under `src/data/` (skills, concepts, positions and shared-knowledge safety
  notes, including the positional `item(...)` and `term(...)` arguments). Keep those ids
  in labelled fields: a value built at runtime (`row.nextSkillId`, `seed.relatedSkillIds`)
  cannot be resolved, so the run reports it as an informational "Dynamic src/data refs"
  count instead of checking it. The count should stay small and every entry should trace
  back to literals that are checked elsewhere.
- **Hand-sorting a list.** Display order inside a step or a domain comes from the derived
  order in the manifest (level first, then prerequisite depth). Re-sorting in a component,
  or reordering a `relatedSkillIds` array and expecting the UI to follow, silently
  desynchronises the app from its data.
- **Authoring both directions of a relation.** Declare `nextSkillIds` on the earlier skill
  and let the build mirror the prerequisite. Two conflicting declarations are a validation
  error, not a merge to resolve by hand.
- **Facet counts that ignore their own group.** A count computed with the group's own
  selection applied makes a filter look inert, because every remaining value counts the
  same. Exclude the group being counted.
- **Dead videos.** oEmbed 403 or 404 means private, removed or region-blocked.
  Replace the reference so the skill stays playable.
- **Duplicate `youtubeId` noise.** Many ids are referenced by more than one skill
  by design. The validator only warns when the same id carries different
  titles or channels. Do not "fix" legitimate reuse by deleting references.
- **Search filters drift.** New filter inputs must use
  `src/utils/searchText.ts`, otherwise VI search regresses on that page but not
  in global search.
- **YouTube double play button.** Adding a facade thumbnail with its own play
  button in front of the player reintroduces the two-click complaint.

## 13. Working style and git

- Match existing conventions and keep diffs scoped to the task. Do not reformat
  or re-case unrelated files; a bulk title-case pass over ids breaks the id map.
- Do not commit, push, deploy, publish or touch production data unless the user
  asks.
- Never commit secrets or env values.
- When content JSON or `public/generated/` is regenerated, expect large diffs and
  mention them in your summary.

## 14. Skill Hub and connection data (planned: skills-study-hub)

Status: planned. Nothing in this section exists in the repo yet except where marked
otherwise. The source of truth for the work is `skills-study-hub-spec.md` at the repo
root: read it before implementing any part of this, and delete the "planned, section 14"
markers as each slice lands.

The slices, in order:

1. **S1 data integrity.** Repair the dangling relation ids and the one asymmetric pair, add
   `scripts/content/validate-relations.ts` as `npm run validate:relations`, wire it into
   `.github/workflows/content-validation.yml` and the `build` job of
   `.github/workflows/ci.yml`, document it here. Content only, no UI change. This is the
   first shippable slice.
2. **S2 data model and derived order.** Mirror `nextSkillIds` into prerequisites in the
   build, emit `relations`, `positionIds`, `depth` and `order` in the skills manifest, and
   share the ordering function between the builder and the tests.
3. **S3 path sources and mapping.** Add `content/shared/path.json` and
   `content/paths/<group-id>/`, and apply the position-to-skill mapping to the position
   files so every skill is reachable from a Path step.
4. **S4 hub merge and filters.** `/skills?tab=path|catalog`, the `/study` redirect, and the
   ranked filter model.
5. **S5 Path tab.** `src/content-runtime/path.ts` plus `usePathStepsQuery`, consuming
   `public/generated/manifest/path.<locale>.json`.
6. **S6 polish.** Accessibility, motion, empty and error states, VI copy review, breakpoint
   screenshots.

Rules that apply once it lands:

- **Relations are authored once, typed, in `skill.json`.** Use `relatedSkills[]` with a
  type rather than prose. The build derives the mirror direction; the validator rejects an
  asymmetric or dangling graph.
- **Order is derived, never authored, never hand-sorted in a component.** Level first, then
  prerequisite depth, computed at build time and emitted as `order`/`depth`.
- **Path data has one owner.** `content/shared/path.json` holds the Path order; group steps
  live in `content/paths/<group-id>/`; positions stay in `content/positions/` and keep
  driving `/positions` and the Learn tab.
- **The hub has one route.** `/skills` with the `tab` param; `/study` redirects and keeps
  mapping `domain` into the catalogue filters.
- **Filters live in the URL.** Presets and facet chips write the same params as manual
  filtering, so any filtered view is a shareable link and the back button works.
- **Never weaken the validator to go green.** If a reference cannot resolve, fix the content
  or remove the relation and say so. No allowlists, no skipped checks, no "temporary"
  warning downgrades.
- **Verification depth.** `validate:relations` in CI beside `validate:content`, unit tests
  importing the shared ordering function, and manual breakpoint checks at 375, 768 and 1440
  on both themes using the scratch CDP scripts under `.freebuff/`. No visual regression
  tooling is added for this work.
