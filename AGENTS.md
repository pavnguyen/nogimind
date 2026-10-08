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
  `Body Triangle`, `Knee Cut`, `Body Lock`, etc.
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
content/shared/                 domains.json, positions.json, concepts.json (id + name lists)
src/pages/                      route screens (lazy via src/router/routes.tsx + AppRouter.tsx)
src/components/                 layout, dashboard, content, learning, skills, video, common
src/queries/                    TanStack Query client + content queries
src/content-runtime/            manifest + payload runtime (skills, concepts, positions, videos)
src/repositories/               pipeline-first loaders with legacy fallback
src/utils/                      search, searchText, cache, localization
src/data/                       legacy in-app reference data (concepts, positions, archetypes, ...)
src/i18n/resources/             en.ts | vi.ts | fr.ts UI copy
public/generated/               BUILT artifacts: manifest/, skills/<locale>/, concepts/, positions/, videos/by-skill/
scripts/                        auditViKeys.ts, validate-videos.ts
scripts/content/                build-content.ts, validate-content.ts, scaffold-skill.ts, load-json.ts
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

## 7. i18n and Vietnamese style

- UI copy lives in `src/i18n/resources/{en,vi,fr}.ts`; add all three when you add
  a key. `npm run audit:vi` reports VI gaps.
- Skill content: EN is authoritative, VI and FR must exist.
- Vietnamese must read naturally, not word-for-word from English. Keep standard
  BJJ loanwords (Heel Hook, Kimono-free terms, tap, sweep, guard, Mount, Side
  Control), but write grammar and verbs in Vietnamese. Avoid strings like
  `Hide heel`, `Clear secondary leg`, `Partner đã khóa heel` or
  `Thẳng ankle lock`: they are machine translation, not Vietnamese.
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

## 9. UI, theming, accessibility

- Use the Hallmark theme tokens (`--hallmark-accent`,
  `--hallmark-text-primary`, ...) from `src/styles/hallmark-themes.css`, mapped
  through `@theme` in `src/index.css`. Provide per-hub accents with
  `HubThemeProvider` instead of hard-coding colors.
- Keep components accessible: semantic elements, labels for inputs, accessible
  names for icon-only actions, `aria-hidden` on decorative SVGs.
- Motion stays subtle and follows existing patterns (`page-enter`,
  `animate-fade-in`, framer-motion where already used).
- Route changes are handled by `AppRouter`'s `ScrollToTop`; use explicit
  redirects for retired routes instead of dropping them.
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
  clean.

## 11. Commands and verification gates

```bash
npm run typecheck        # tsc -b
npm run lint             # eslint .
npm test                 # vitest run
npm run validate:content # Zod + cross-file checks (content changes)
npm run validate:videos  # YouTube availability (video changes)
npm run build:content    # regenerate public/generated (content changes)
npm run build            # tsc -b && vite build
npm run audit:vi         # Vietnamese coverage (i18n/content changes)
npm run create-skill     # scaffold a new skill
```

Expected: `typecheck`, `lint`, `test`, `validate:content` and `build` exit 0.
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
- **Generated concept/position artifacts have no `content/` source yet.**
  `content/concepts/` and `content/positions/` do not exist in the repo, so
  `build:content` skips them and the committed files under
  `public/generated/concepts/` and `public/generated/positions/` are currently
  the only source. When you must correct them (for example a lowercase id or a
  reorder), edit the generated file directly, keep it Zod-valid, and note it in
  the change. Do not create a partial `content/positions/` directory: it would
  make `build:content` rebuild the manifest with only the new entries and drop
  the rest.
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
