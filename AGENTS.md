# AGENTS.md

Guidance for AI coding agents working in this repository. Follow these instructions unless a more specific `AGENTS.md` in a subdirectory applies.

## Project

NoGi Mind is a multilingual no-gi grappling knowledge app built with React 19, TypeScript, Vite, React Router, Tailwind CSS, TanStack Query, Zustand, and i18next. It is a static SPA/PWA.

## Before changing code

- Inspect the target files and nearby tests before editing; follow the existing patterns and keep changes scoped.
- Check `git status` and preserve unrelated user changes. Do not reset, revert, or overwrite them.
- Prefer editing existing files and use the repository's existing dependencies. Do not add a dependency for a task that can be solved with current utilities.
- Keep UI text in `src/i18n/resources/` and provide matching English, Vietnamese, and French entries when changing user-facing copy.

## Architecture and data ownership

- `src/pages/` contains route-level screens; route exports are lazy-loaded from `src/router/routes.tsx` and registered in `src/router/AppRouter.tsx`.
- `src/components/` contains shared UI, layout, dashboard, learning, and content components. Reuse existing components and styles.
- Canonical skill content is under `content/skills/<domain>/<skill-id>/`. `skill.json` holds metadata; `content.en.json`, `content.vi.json`, and `content.fr.json` hold localized details. Video references live with skill source content.
- `public/generated/` is built output. When changing canonical skill/position/concept source, use `npm run build:content` to regenerate artifacts rather than editing generated files alone. Inspect the resulting diff because generated builds can touch many files.
- Runtime data access belongs in the existing `src/content-runtime/`, `src/queries/`, and `src/utils/` layers; avoid importing generated JSON directly into pages if an established query exists.
- Validate authored content with `npm run validate:content`; video changes should also use `npm run validate:videos`.

## Grappling content and safety

- Do not invent technical details, competition claims, terminology, or coaching cues to fill gaps. Use source material present in the repository or clearly leave content unspecified.
- Preserve distinctions between techniques and their aliases; do not merge separate systems based only on similar names.
- Treat submissions, leg locks, neck attacks, and takedowns as safety-sensitive. Keep existing risk metadata and safety guidance intact; never encourage explosive application or training without appropriate supervision.
- Avoid presenting draft content as independently verified fact. Respect the status and provenance in the source metadata.

## Implementation conventions

- Use TypeScript types and existing schemas; do not bypass validation or add suppressions to silence errors.
- Keep components accessible: use semantic elements, labels for controls, and accessible names for icon-only actions.
- Keep route behavior compatible where possible; use explicit redirects for retired routes rather than silently dropping them.
- Update or add focused tests when behavior changes. Do not weaken or skip existing assertions.
- Do not edit unrelated dashboard, learning, hub, or generated content when the task is limited to another area.

## Verification

Run the narrowest relevant checks, then broader checks for non-trivial changes:

```bash
npm run typecheck
npm test
npm run audit:vi
npm run build
```

For content changes, also run:

```bash
npm run validate:content
npm run validate:videos
```

For UI changes, verify the affected route and interaction in the running app or production preview where practical. Check `git diff --check` and review the final diff; report any check that could not be run instead of claiming it passed.

## Git and external actions

- Do not commit, push, deploy, publish, or modify production data unless explicitly requested.
- Do not expose secrets, credentials, or private environment values in files or output.
