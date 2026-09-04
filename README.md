# NoGi Mind

A modern no-gi grappling knowledge system. Study skills, positions, concepts, micro-details, safety, and live problem solving in one focused, PWA-ready app.

## Tech Stack

- **Build**: [Vite 8](https://vite.dev) + [Rolldown](https://rolldown.rs) + [Tailwind CSS v4](https://tailwindcss.com)
- **UI**: [React 19](https://react.dev) + [React Router 7](https://reactrouter.com) + [Framer Motion](https://motion.dev)
- **Data**: [TanStack Query](https://tanstack.com/query) + [Zustand](https://zustand-docs.pmnd.rs) + [Zod](https://zod.dev)
- **Search**: [MiniSearch](https://github.com/lucaong/minisearch) with an IndexedDB cache and a Web Worker index
- **i18n**: [i18next](https://www.i18next.com) — English, Vietnamese, French
- **PWA**: [vite-plugin-pwa](https://vite-pwa-org.netlify.app) (offline support, auto-updating service worker)
- **Quality**: TypeScript (strict), ESLint (flat config), Vitest + Testing Library

## Getting Started

Prerequisites: Node.js **^20.19 or >=22.12** (Vite 8 requirement), npm 10+.

```bash
npm install       # install dependencies
npm run dev       # start the Vite dev server
npm run build     # typecheck + production build (outputs to dist/)
npm run preview   # preview the production build
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server with HMR |
| `npm run typecheck` | TypeScript project references check (`tsc -b`) |
| `npm run lint` | ESLint (flat config) over the whole repo |
| `npm test` | Run Vitest once |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview the production build locally |
| `npm run build:content` | Regenerate content payloads from `content/` |
| `npm run validate:content` | Validate content JSON against Zod schemas |
| `npm run validate:videos` | Validate YouTube video references |
| `npm run create-skill` | Scaffold a new skill |

## Architecture

```
src/
  pages/            Route-level pages (lazy-loaded via router/routes.tsx)
  components/       Layout, dashboard, content, learning, skills, video, common
  contexts/         Global context (HubThemeProvider) — hooks live in hooks/
  hooks/            Shared hooks (useHubTheme, useVideoReport, …)
  stores/           Zustand stores (settings, UI, search)
  queries/          TanStack Query client + content queries
  content-runtime/  Manifest loading + content payload runtime
  i18n/             i18next setup + locale resources
  utils/            Domain utilities (search, cache, localization, version)
  workers/          Search worker
  styles/           index.css (Tailwind v4 @theme tokens) + hallmark-themes.css
```

### Key design decisions

- **Hub-and-spoke navigation**: `src/components/layout/navItems.ts` defines the hub map (learn, study, fix, build, reference). Each hub has a landing page and sub-items.
- **Theme system**: the app uses runtime "Hallmark" theme tokens (`--hallmark-accent`, etc.) so each hub can restyle the accent color without recompiling. Tokens are declared in `src/styles/hallmark-themes.css`; Tailwind maps them via `@theme` in `index.css`.
- **Content pipeline**: raw content lives in `content/`, is built into typed JSON manifests by `scripts/content/build-content.ts`, validated with Zod, and consumed through `Queries`/`content-runtime`.
- **Search performance**: manifests are prefetched on load; the search cache is pre-warmed in IndexedDB and indexes are built in a Web Worker during idle time.

## Branding & Assets

All brand assets are generated from `public/logo.jpg` (the painted "No-Gi Mind" square):

| Asset | Purpose |
| --- | --- |
| `public/logo.png` | In-app brand logo (sidebar, homepage hero) |
| `public/favicon.png` | Browser favicon (32×32, PNG) |
| `public/apple-touch-icon.png` | iOS home-screen icon (180×180) |
| `public/pwa-192x192.png` / `pwa-512x512.png` | PWA install icons (also maskable) |
| `public/og-image.png` / `twitter-image.png` | Social share cards (1200×630, logo on paper background) |

## Quality Gates

The repo ships with a GitHub Actions pipeline (`.github/workflows/ci.yml`):

1. **Lint** — ESLint flat config
2. **Test** — Vitest suite
3. **Build & typecheck** — `tsc -b` + production build + content validation

`.github/workflows/content-validation.yml` additionally validates content on content-only changes. All jobs run on Node 22.

## Deployment

Deployed to Vercel (`vercel.json`). The app is a static SPA:

- All routes rewrite to `index.html`
- Security headers set globally (nosniff, deny framing, strict referrer, permissions policy)
- Icon/image assets are cached with a 24h CDN cache; `/assets/*` is immutable

To deploy:

```bash
vercel --prod
```

## License

See [LICENSE](LICENSE).