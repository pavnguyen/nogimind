# NoGi Mind — PWA Implementation Spec

> **Status:** Draft for review  
> **Date:** May 28, 2026  
> **Project:** NoGi Mind (Vite 8 + React 19 + TypeScript)  
> **Deploy target:** Vercel (SPA with `/* -> /index.html` rewrites)

---

## 1. Goals

1. **Installable** — Users can install NoGi Mind as a standalone app on their phone/desktop via the browser's "Add to Home Screen" prompt.
2. **Offline-capable** — Skill content, concepts, positions, and UI can be viewed without an internet connection (useful at training gyms with poor/no WiFi).
3. **Fast revisit** — Static assets (JS/CSS/fonts) are cached so returning users get instant loads.
4. **Minimal disruption** — Auto-update strategy; no intrusive "new version available" prompts.

---

## 2. Technical Approach

### 2.1 Library

Use **`vite-plugin-pwa`** (by the Vite PWA organization) — the de-facto standard for adding PWA support to Vite projects. It wraps **Workbox** for service worker generation and handles manifest injection, asset hashing, and SW registration.

**Install:**
```bash
npm install -D vite-plugin-pwa
```

### 2.2 Service Worker Strategy — Workbox

The SW will use a **combination of strategies** applied to different asset groups:

| Asset Group | Strategy | Rationale |
|---|---|---|
| JS/CSS bundles (hashed) | `CacheFirst` | Immutable filenames; safe to cache permanently |
| Fonts (Google Fonts) | `CacheFirst` with expiry (30 days) | Rarely change; reduces network |
| Images (icons, OG, etc.) | `CacheFirst` with expiry (30 days) | Static; safe to cache |
| Content JSON (`public/generated/**/*.json`) | `StaleWhileRevalidate` | Updates on deploy; serve cached instantly, fetch new in background |
| Manifest JSON (`public/generated/manifest/`) | `StaleWhileRevalidate` | Updates on deploy |
| Navigation requests (`/`, `/skills/*`, etc.) | `NetworkFirst` with fallback to cached SPA shell | Always try fresh first; fall back to cached `index.html` |
| YouTube embeds | **Excluded from caching** | Placeholder shown offline |

### 2.3 Manifest

The existing `public/site.webmanifest` will be **replaced** by `vite-plugin-pwa`'s generated manifest (injected at build time). The plugin will:

- Merge the current manifest fields (`name`, `short_name`, `display`, `background_color`, `theme_color`) into its config.
- Generate all required icon sizes automatically from the source `public/icon-512.png`.
- Inject `<link rel="manifest">` into `index.html`.

### 2.4 Icon Generation

Use `@vite-pwa/assets-generator` (or the plugin's built-in icon generation) to produce the complete icon set from `public/icon-512.png`:

| Size | Purpose |
|---|---|
| 192x192 | General PWA icon |
| 384x384 | General PWA icon |
| 512x512 | App icon |
| 512x512 (maskable) | Adaptive icon (Android) |
| 180x180 | Apple touch icon (already exists — will be preserved) |

---

## 3. Content Cache Design

### 3.1 What Gets Pre-cached

On first visit (service worker `install` event), the SW pre-caches the **SPA shell** (`index.html` + all JS/CSS entry chunks).

Content JSON files (`public/generated/{skills,concepts,positions}/**/*.json`) are **not** pre-cached on install — instead, they use `StaleWhileRevalidate` so they get cached on-demand as the user navigates. This avoids a large upfront download.

An alternative approach (pre-cache all content) is feasible but would add ~6-8 MB to the initial cache. We'll go with **on-demand + StaleWhileRevalidate** for content.

### 3.2 Content Files Covered

The following glob patterns will be matched for content caching:

- `public/generated/skills/{en,vi,fr}/*.json`
- `public/generated/concepts/{en,vi,fr}/*.json`
- `public/generated/positions/{en,vi,fr}/*.json`
- `public/generated/manifest/*.json`
- `public/generated/videos/by-skill/*.json`

All 3 languages are cached (as per user preference).

### 3.3 YouTube Embeds

YouTube iframes (`https://www.youtube.com/embed/...` and `https://www.youtube-nocookie.com/embed/...`) are **not** cached. The video components (`LazyYouTubeEmbed.tsx`) will detect offline state and show a **placeholder** (icon + "No internet connection — video unavailable offline" message).

---

## 4. Service Worker Registration & Update Strategy

### 4.1 Registration

The plugin's `registerSW.js` module auto-registers the SW. We'll configure:

```typescript
registerType: 'autoUpdate'
```

### 4.2 Auto-Update Flow

1. SW installs on first visit.
2. On subsequent visits, the browser checks for SW updates in the background.
3. If a new SW is found, it installs and immediately activates (no "waiting" phase).
4. Users who have the tab open get the update on next navigation/reload.
5. Content JSON files use `StaleWhileRevalidate` — they'll automatically get fresh data on next load.

### 4.3 Skipping the Waiting Phase

```typescript
// In vite-plugin-pwa config:
selfDestroying: true  // or use skipWaiting() in SW
```

---

## 5. UI Changes

### 5.1 Install Button (Settings Page)

Add a **"Install App"** button to `src/pages/SettingsPage.tsx`:

- **Label:** "Cài đặt App" (VI) / "Install App" (EN) / "Installer l'app" (FR)
- **Icon:** `Download` (lucide-react) or custom
- **Behavior:**
  - If the app is already installed (`matchMedia('(display-mode: standalone)').matches`), show "App đã được cài đặt ✓" / "App installed ✓"
  - If the `beforeinstallprompt` event has been fired and deferred, call `prompt()` on the deferred event
  - If the event hasn't fired yet, show the button as disabled or hidden
- **Placement:** In the Settings page, in a "App" or "Ứng dụng" section near the language switcher

### 5.2 Install Banner (Optional)

A subtle banner at the bottom of the screen on mobile that appears once if the user hasn't dismissed it and the install prompt is available. This should respect a `localStorage` dismissal flag.

### 5.3 Offline Indicator

A small indicator in the header or footer when the app detects the user is offline (`navigator.onLine === false`). This can be a simple chip/badge with "Offline" text.

### 5.4 YouTube Placeholder on Offline

The `LazyYouTubeEmbed` component detects online/offline state via a custom `useOnlineStatus` hook and conditionally renders a placeholder when offline.

#### Hook: `useOnlineStatus()`

```tsx
function useOnlineStatus() {
  const [online, setOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  )
  useEffect(() => {
    const goOnline = () => setOnline(true)
    const goOffline = () => setOnline(false)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])
  return online
}
```

- **Initial value:** Reads `navigator.onLine` synchronously with a `typeof` guard for SSR safety.
- **Reactivity:** Listens to `online`/`offline` events on `window`. The event listeners are cleaned up on unmount.
- **Fallback:** Defaults to `true` when `navigator` is unavailable (shouldn't happen in this SPA, but safe).

#### Component: `OfflinePlaceholder`

```tsx
const OfflinePlaceholder = ({ t: translate }: { t: (key: string) => string }) => (
  <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-lg border border-white/10 bg-slate-900/80 text-slate-500">
    <Film className="h-10 w-10 text-slate-600" />
    <p className="max-w-xs px-4 text-center text-sm">
      {translate('video.offline')}
    </p>
  </div>
)
```

#### Visual Design

| Element | Detail |
|---|---|
| **Container** | Same `aspect-video` ratio as the YouTube embed (16:9) to preserve layout. Rounded corners (`rounded-lg`), subtle white/10 border, dark semi-transparent background (`bg-slate-900/80`). Matches the existing video container's dimensions exactly so the page does not reflow when connectivity returns. |
| **Icon** | `Film` icon from `lucide-react`, sized `h-10 w-10`, in `text-slate-600` (muted grey). Positioned centered above the text. |
| **Message** | Text from i18n key `video.offline`, rendered in `text-sm` with `text-slate-500`. `max-w-xs` keeps the line length readable. Centered alignment with `text-center`. Has `px-4` horizontal padding. |
| **Spacing** | `flex-col items-center justify-center gap-3` stacks icon → text with a 12px gap, centered both axes. |

#### Responsive Behavior

- The placeholder uses `aspect-video` so it fluidly scales with the parent container — same as the YouTube embed iframe. On mobile it shrinks naturally, on desktop it expands.
- The `max-w-xs` on the `<p>` prevents the text from stretching too wide on large screens. Text wraps automatically.
- The `Film` icon is static size (`h-10 w-10`) — no breakpoint changes needed since it's already compact.

#### Accessibility

- The placeholder is a plain `<div>` with no interactive elements — it does not trap focus.
- The `Film` icon is decorative and does not require an `aria-label` (`<Film>` from lucide renders `<svg aria-hidden>` by default).
- The message text is rendered in a contrast ratio of ~6.6:1 (`text-slate-500` on `bg-slate-900/80`), exceeding WCAG AA requirements for body text.
- When the user comes back online, the placeholder is **instantly replaced** by the normal embed UI (either the thumbnail click-to-load or the iframe).

#### Transitions & Micro-interactions

- No animation on the placeholder itself — it appears/disappears instantly to match the `online`/`offline` event parity.
- When transitioning *back online*, the user sees either the YouTube thumbnail (with its hover scale effect) or the full iframe immediately — no fade delay.
- The instant swap is intentional: if the placeholder had a fade-out, the video content visible underneath would catch the user's eye and cause distraction.

#### Conditional Render Logic

The component checks offline state **before** deciding to render the placeholder or the normal embed:

```tsx
if (!isOnline) {
  return <OfflinePlaceholder t={t} />
}
```

This early return means:
- No unnecessary network requests to fetch YouTube thumbnails while offline.
- No iframe creation that would fail to load.
- The browser does not attempt to connect to `i.ytimg.com` or `www.youtube.com` at all.

#### State Transitions

| User Action | Component State | What Renders |
|---|---|---|
| Initial load (online) | `loaded=false, isOnline=true` | Clickable thumbnail |
| User clicks thumbnail (online) | `loaded=true, isOnline=true` | YouTube iframe |
| User goes offline while watching | `loaded=true, isOnline=false` | **Offline placeholder** (iframe unmounts) |
| User comes back online | `loaded=true, isOnline=true` | YouTube iframe restored |
| User goes offline before clicking | `loaded=false, isOnline=false` | **Offline placeholder** |

> Note: When transitioning from online → offline while the iframe is loaded, the iframe is unmounted and replaced with the placeholder. This prevents the degraded "video paused — connection lost" YouTube UI from showing.

#### i18n Messages

| Locale | Key `video.offline` |
|---|---|
| **en** | `"Video unavailable offline — connect to the internet to watch."` |
| **vi** | `"Video không khả dụng khi offline — hãy kết nối internet để xem."` |
| **fr** | `"Vidéo indisponible hors ligne — connectez-vous à Internet pour regarder."` |

These messages are concise (~80-110 chars) and fit within the `max-w-xs` constraint on both mobile and desktop.

---

## 6. Configuration

### 6.1 `vite.config.ts` — PWA Plugin Setup

```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg'],
      manifest: {
        name: 'NoGi Mind',
        short_name: 'NoGi Mind',
        description: 'Modern no-gi grappling knowledge system for studying skills, positions, concepts, and live problem solving.',
        theme_color: '#0f766e',
        background_color: '#020617',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'any',
        lang: 'en',
        categories: ['sports', 'education', 'reference'],
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2}'],
        runtimeCaching: [
          {
            // Cache generated content JSON files
            urlPattern: /^https?:\/\/.*\/generated\/(skills|concepts|positions|manifest)\/.*\.json$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'nogimind-content',
              expiration: { maxEntries: 500, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Cache Google Fonts
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'nogimind-fonts',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Cache YouTube thumbnails (i.ytimg.com)
            urlPattern: /^https:\/\/i\.ytimg\.com\/.*/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'nogimind-yt-thumbnails',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
```

### 6.2 CSP Update (`vercel.json`)

The existing Content-Security-Policy already includes `worker-src 'self'` — this is sufficient for the service worker. No CSP changes needed.

### 6.3 Cache Headers Update (`vercel.json`)

The service worker file (`sw.js`) and workbox runtime library should have `Cache-Control: no-cache` to allow updates. Add a rule:

```json
{
  "source": "/(sw.js|workbox-.*.js)",
  "headers": [
    { "key": "Cache-Control", "value": "no-cache" },
    { "key": "Service-Worker-Allowed", "value": "/" }
  ]
}
```

---

## 7. Files to Modify

| File | Change |
|---|---|
| `package.json` | Add `vite-plugin-pwa` to devDependencies |
| `vite.config.ts` | Add `VitePWA()` plugin with manifest + workbox config |
| `vercel.json` | Add cache headers for SW files |
| `src/pages/SettingsPage.tsx` | Add "Install App" button with platform detection |
| `src/components/video/LazyYouTubeEmbed.tsx` | Add offline state detection + placeholder |
| `src/i18n/resources/en.ts` | Add i18n keys for install button, offline indicator |
| `src/i18n/resources/vi.ts` | Add i18n keys |
| `src/i18n/resources/fr.ts` | Add i18n keys |
| `public/site.webmanifest` | **Removed** — replaced by plugin-generated manifest |
| `public/icon-512.png` | Kept as source for icon generation |
| `public/apple-touch-icon.png` | Kept (already exists; generated version may replace it) |

---

## 8. Dev Workflow

### Development
- SW is only served in production build (Vite dev server does not run SW).
- Test PWA after `npm run build && npm run preview`.
- Use Chrome DevTools → Application → Service Workers to inspect.
- Use Lighthouse → PWA audit to verify installability.

### Build
```bash
npm run build     # tsc -b && vite build — SW + manifest generated automatically
```

### Preview
```bash
npm run preview   # Serve production build locally to test PWA
```

---

## 9. Testing Checklist

Each test case includes **prerequisites** (what must be true before starting), **specific steps** (numbered actions to perform), and **expected results** (what to verify). Use Chrome DevTools → Application → Service Workers pane to inspect SW state throughout.

---

### TC-01: Production Build Succeeds

> **Purpose:** Verify that the production build pipeline (TypeScript check + Vite bundle) completes without errors, and that the service worker and manifest files are generated.

**Prerequisites:**
- All dependencies installed (`node_modules` present)
- No uncommitted changes that break compilation

**Steps:**
1. Run `npm run build` (which runs `tsc -b && vite build`).
2. Inspect the terminal output for any error messages or warnings.
3. Check the `dist/` directory for generated files.

**Expected results:**
- Exit code `0` (no error).
- `dist/sw.js` exists (the service worker).
- `dist/workbox-*.js` exists (the Workbox runtime library).
- `dist/manifest.webmanifest` exists (the PWA manifest).
- `dist/index.html` contains a `<script>` tag registering the SW, a `<link rel="manifest">` tag, and a `<meta name="theme-color">` tag.
- `dist/assets/` contains hashed JS/CSS bundles.
- PWA icon files (`dist/pwa-192x192.png`, `dist/pwa-512x512.png`) exist.

---

### TC-02: TypeScript Compilation Clean

> **Purpose:** Ensure the new PWA code does not introduce any type errors.

**Prerequisites:**
- `vite-plugin-pwa` is installed in `node_modules` (its types are available as a dependency).

**Steps:**
1. Run `tsc -b --noEmit`.
2. Scroll through the output to spot any `error TS...` messages.

**Expected results:**
- Zero type errors.
- No spurious warnings about missing types for `vite-plugin-pwa` (it bundles its own type declarations).

---

### TC-03: Lighthouse PWA Audit ≥ 90

> **Purpose:** Automated audit of installability, offline capability, and best practices. This is the canonical PWA qualification check.

**Prerequisites:**
- Production build exists (`dist/` from TC-01).
- Preview server running: `npm run preview` (serves on `http://localhost:4173` by default).
- Chrome browser with Lighthouse available (DevTools → Lighthouse tab, or `lighthouse` CLI).

**Steps:**
1. Start the preview server (`npm run preview`).
2. Open Chrome DevTools → **Lighthouse** tab.
3. Check only the **PWA** category (uncheck Performance, Best Practices, SEO, Accessibility).
4. Set device to **Mobile** (PWA audits are stricter on mobile).
5. Click **Analyze page load**.
6. Wait for the audit to complete and review the scores for each PWA sub-check.

**Expected results:**
- Overall PWA score **≥ 90**.
- "Registers a service worker" — **passed**.
- "Responds with a 200 when offline" — **passed**.
- "Is fast and reliable" — **passed**.
- "Uses HTTPS" — **passed** (preview server runs on HTTP, but Lighthouse checks as if localhost; production (Vercel) will serve HTTPS).
- "Has a `<meta name="theme-color">`" — **passed**.
- "Contains a `<link rel="manifest">`" — **passed**.
- "Manifest has `display: standalone` or `fullscreen`" — **passed**.
- "Manifest has `icons` at 192x192 and 512x512" — **passed**.
- "Manifest has `name` and `short_name`" — **passed**.
- "Manifest has `start_url`" — **passed**.

**If score < 90**, check the failing items in the report and fix the underlying issues (e.g., missing icons, incorrect manifest fields, SW not registering).

---

### TC-04: Service Worker Registers on First Load

> **Purpose:** Confirm the SW registration code injected by `vite-plugin-pwa` works correctly — the SW must enter the "activated" state.

**Prerequisites:**
- Production build from TC-01.
- Preview server running (`npm run preview`).
- Chrome DevTools open.
- **No prior SW from this origin** in the browser (clear via DevTools → Application → Service Workers → "Unregister" if needed).

**Steps:**
1. Open DevTools → **Application** → **Service Workers** pane.
2. Navigate to `http://localhost:4173` (or the preview URL).
3. Watch the Service Workers pane for registration status.
4. Click the **"Update"** / refresh icon in the SW pane if initial registration doesn't appear.
5. Note the **Status** column: should show `#N activated and is running`.
6. Check the **Console** tab for any SW-related errors (e.g., `Registration failed with error: ...`).

**Expected results:**
- The SW pane shows **one registered service worker** for `http://localhost:4173/` with:
  - Source URL: `sw.js` (or the hashed SW filename).
  - Status: **Activated and is running**.
  - Scope: `/`.
- No console errors related to SW registration.
- The SW file is served with `Content-Type: application/javascript` or `text/javascript` (check Network tab).

**Edge case:** If the SW status shows "installing" or "waiting" but never "activated", the SW may have crashed during install. Check the SW pane for error logs.

---

### TC-05: Site Installable via Browser Prompt (Desktop Chrome)

> **Purpose:** Verify the PWA meets Chrome's installability criteria and the browser's native install prompt appears.

**Prerequisites:**
- Production build running on preview server.
- Chrome browser (not Incognito — install prompt requires regular profile).
- SW registered and activated (TC-04 passes).
- DevTools → Application → Manifest pane shows no errors.

**Steps:**
1. Open DevTools → **Application** → **Manifest** pane.
2. Verify that all manifest fields are populated (name, short_name, icons, start_url, display, theme_color, background_color).
3. Click the **"Add to homescreen"** / install icon in the Chrome address bar (right side, looks like a `+` in a monitor icon).
4. — OR — Click Chrome menu (⋮) → **"Install NoGi Mind…"**.
5. In the install dialog, click **Install**.

**Expected results:**
- The install dialog appears with the app name, icon, and origin.
- After clicking "Install", the app launches in a separate window.
- The address bar is hidden (standalone display mode).
- The browser shows a notification that the app was installed.
- The app appears in `chrome://apps/` (or in the OS app launcher on ChromeOS/Windows/Mac).

**If install button is greyed out or absent:**
- Check the Manifest pane for validation errors.
- Verify that the SW is activated (TC-04).
- Check the Console for `beforeinstallprompt` event not firing (possibly due to missing `favicon` or icon issues).

---

### TC-06: Custom Install Button in Settings Triggers Prompt

> **Purpose:** Verify that the custom "Install App" button in `/settings` invokes the `beforeinstallprompt` flow.

**Prerequisites:**
- Production build on preview server.
- App **not yet installed** (if already installed, the button should show "Installed" state — see TC-07).
- Chrome DevTools open.
- `beforeinstallprompt` event must be available (browser determines this — not available if app is already installed or if criteria aren't met).

**Steps:**
1. Navigate to the app's **Settings** page (`/settings`).
2. Locate the **"Install App"** button (should be in an "App" section near the language switcher).
3. Verify the button is **not disabled** and shows the correct label per locale.
4. Click the **"Install App"** button.
5. When the browser's install dialog appears, click **Install**.
6. — **Repeat test with cancellation:** Return to Settings, click "Install App" again, but this time click **Cancel** on the dialog.

**Expected results:**
- Clicking the button triggers the native browser install dialog (same dialog as TC-05).
- After clicking "Install", the app launches in standalone mode.
- After navigating back to the Settings page (in the installed window), the button should show **"App installed ✓"** (or locale equivalent) and be disabled/non-interactive.
- After clicking "Cancel", the dialog closes, the button remains active, and clicking it again should re-trigger the dialog.

**Edge case — `beforeinstallprompt` not fired:**
- Open Console and check for the event.
- If the event doesn't fire, check that:
  1. The app meets installability criteria (HTTPS/localhost, valid manifest, active SW).
  2. The app has not been previously installed.
  3. The user has not previously dismissed the prompt (browser may suppress it for 3 months after dismissal).

---

### TC-07: App Launches in Standalone Mode After Installation

> **Purpose:** Once installed, the app must open without browser chrome (no address bar, no tab strip) and behave as a standalone application.

**Prerequisites:**
- App is installed (from TC-05 or TC-06).
- The installed app window is closed (not just minimized).

**Steps:**
1. Launch the installed app from the OS launcher, home screen icon, or `chrome://apps`.
2. Observe the window frame — there should be no address bar, no bookmark bar, no tab strip.
3. Close the app and re-open it by navigating to the server URL in a regular browser tab (non-standalone).
4. Open DevTools → **Application** → **Manifest** pane and check `display: standalone`.

**Expected results:**
- The app opens in its **own window** with a minimal title bar (or full-screen on mobile).
- No address bar or browser navigation UI is visible.
- The app's `theme-color` (`#0f766e`) is applied to the window title bar.
- Closing and re-opening works consistently (no crash on launch).
- Opening the same URL in a regular browser tab shows the normal browser chrome (proving standalone is working).

---

### TC-08: Offline — SPA Shell Handles All Routes

> **Purpose:** Verify the cached `index.html` (the SPA shell) is served by the SW for all navigation requests when offline, so client-side routing still works.

**Prerequisites:**
- App installed and SW activated (TC-04).
- All main pages have been visited at least once while online so they're cached (visit `/`, `/skills`, `/skills/hip-heist-wrestle-up`, `/concepts`, `/positions`, `/glossary`, `/settings`, `/search`, `/fix`, `/build`, `/learn`, `/about`).
- Chrome DevTools open.

**Steps:**
1. Open DevTools → **Network** tab → check **"Offline"** checkbox (or use the dropdown to select "Offline").
2. Navigate to `/` — the dashboard.
3. Navigate to `/skills` — the skill map.
4. Navigate to `/skills/hip-heist-wrestle-up` — a skill detail page.
5. Navigate to `/concepts` — the concepts listing.
6. Navigate to `/glossary` — the glossary page.
7. Navigate to `/settings` — the settings page.
8. Navigate to `/search?q=guard` — a search results page.
9. Navigate to `/positions` — the positions listing.
10. Navigate to `/fix` — the fix hub page.
11. Navigate to `/learn` — the learn page.
12. Navigate to `/build` — the build hub page.
13. Navigate to `/about` — the about page.
14. Navigate to `/nonexistent-route` — should show the 404/NotFoundPage.

**Expected results:**
- **Every route** loads successfully with status **200 (from ServiceWorker)** (visible in the Network tab).
- The page renders fully — headers, navigation, layout, and content sections.
- No broken layouts or missing CSS/JS (since JS/CSS bundles are also cached via `CacheFirst`).
- The 404 route renders the app's `NotFoundPage` (not the browser's default error page).
- The Network tab shows all requests served **from ServiceWorker** (not from network).

**Common failure:** If a route shows a blank page or the browser's "No internet" page — the `NetworkFirst` strategy is not falling back to the cached SPA shell. Check that the SW's `navigationPreload` and fallback logic are correct.

---

### TC-09: Offline — Skill Detail Content Loads from Cache

> **Purpose:** Confirm that generated content JSON files (skill details, manifests) are served from cache when offline via `StaleWhileRevalidate`.

**Prerequisites:**
- App visited while online, and at least one skill detail page has been loaded (e.g., `/skills/hip-heist-wrestle-up`, `/skills/arm-drag-system`, `/skills/rear-naked-choke-system`).
- DevTools → Network tab set to **Offline**.
- DevTools → Application → Cache Storage → `nogimind-content` cache should show entries (verify before going offline).

**Steps:**
1. While still online, open DevTools → **Application** → **Cache Storage** tab.
2. Expand the `nogimind-content` cache and verify it contains entries for previously visited skill JSON files.
3. Check the **Network** tab → uncheck "Offline" to go back online.
4. Visit a skill you **have previously opened** (e.g., `/skills/hip-heist-wrestle-up`) so its JSON content is in cache.
5. Check the Network tab → set **Offline**.
6. Refresh the skill detail page.
7. Verify the page renders fully — skill name, sections (Learn, Fix, Video tabs), content text, badges.
8. Navigate to **another skill you have NOT previously visited** (e.g., `/skills/baratoplata`).

**Expected results:**
- For the **previously visited skill**: Page loads and renders fully. Network tab shows:
  - `generated/skills/en/hip-heist-wrestle-up.json` → status **200 (from ServiceWorker)**.
  - `generated/manifest/skills.en.json` → status **200 (from ServiceWorker)**.
- For the **unvisited skill**: The page may show partial content (the shell renders) but the skill detail section may be empty or show a loading state since the JSON was never cached. This is acceptable — the shell + navigation should still work.

**Failure mode:** If previously cached skill content doesn't load, check that the `urlPattern` regex in `runtimeCaching` matches the request URLs. Open the Network tab, look at the actual request URL for a skill JSON file, and confirm the regex matches it.

---

### TC-10: YouTube Embed — Offline Placeholder vs Online Embed

> **Purpose:** Verify the YouTube embed component correctly detects online/offline state and renders the appropriate UI.

**Prerequisites:**
- A skill with video references (e.g., `/skills/hip-heist-wrestle-up`).
- Chrome DevTools open.
- SW activated (TC-04).

**Steps:**

#### Part A — Online Behavior
1. Go to a skill detail page that has videos (e.g., `/skills/hip-heist-wrestle-up`).
2. Switch to the **Video** tab (or scroll to the video section).
3. Confirm you see the YouTube embed (either a clickable thumbnail or the iframe).
4. Click the thumbnail (if present) to load the iframe.
5. Verify the YouTube video loads and plays correctly.

#### Part B — Offline Behavior
1. Open DevTools → **Network** tab → check **"Offline"** checkbox.
2. Navigate to a skill detail page with videos that you've visited before (or refresh the current one).
3. Switch to the **Video** tab.
4. Verify that the video area shows the offline placeholder (film icon + localized message).
5. Confirm the placeholder renders at the correct `aspect-video` ratio and does not break page layout.

#### Part C — Transition Online → Offline While Watching
1. Go back online (uncheck "Offline").
2. Load a video embed (click thumbnail to load the iframe).
3. While the video is playing/paused, check **"Offline"** in the Network tab.
4. Observe the video area.

**Expected results:**
- **Part A:** YouTube embed loads and plays normally — thumbnail visible, clicking it loads the iframe, video controls work.
- **Part B:** Placeholder is visible with:
  - `Film` icon from `lucide-react` (grey, centered).
  - Message text matching the i18n locale: English/Vietnamese/French as appropriate.
  - Same `aspect-video` dimensions as the normal YouTube embed (no layout shift).
  - No network requests to `i.ytimg.com` or `www.youtube.com` (check Network tab — there should be none).
- **Part C:** When going offline while the iframe is loaded, the iframe is unmounted and replaced with the offline placeholder. No broken YouTube UI ("video paused — connection lost" warning) is visible.

**Edge case — video.offline key missing:** If the video section shows raw text like `video.offline` instead of the translated message, the i18n key is not wired correctly in that locale's resources.

---

### TC-11: Offline — Language Switching Works

> **Purpose:** Ensure that all 3 locales (en, vi, fr) are cached and can be toggled without network access.

**Prerequisites:**
- App visited while online.
- All 3 languages have been selected at least once while online to populate the cache with their respective manifest and content files.
- DevTools → Network tab set to **Offline**.

**Steps:**
1. Go to `/settings`.
2. In the Language section, switch to **Vietnamese** (VI).
3. Navigate to `/skills` — verify skill names and doman filters appear in Vietnamese.
4. Navigate to a skill detail page (e.g., `/skills/hip-heist-wrestle-up`) — verify content is in Vietnamese.
5. Switch language to **French** (FR) in Settings.
6. Repeat navigation: verify skill listing and detail page render in French.
7. Switch language back to **English** (EN).
8. Verify English content renders correctly.
9. While still offline, reload the page, close and re-open the tab, and confirm the selected language persists.

**Expected results:**
- All 3 languages render their respective UI strings and content JSONs from cache.
- Language selection persists across page reloads (stored in `localStorage` via `useSettingsStore`).
- No errors in console regarding missing locale files.
- Network requests for `skills.{locale}.json` and skill detail JSONs show status **200 (from ServiceWorker)**.

**Failure mode:** If a language switch shows English content instead of the selected locale, the locale's manifest JSON was not cached. Verify that `runtimeCaching` patterns match URLs for all 3 locale subdirectories.

---

### TC-12: Service Worker Auto-Update on New Deploy

> **Purpose:** Verify the `autoUpdate` strategy — when a new version of the app is deployed, the SW updates silently without user interaction.

**Prerequisites:**
- Current SW installed and activated (from current production build).
- A modified production build available (simulate a new deploy).
- Chrome DevTools open to **Application** → **Service Workers** pane.

**Steps:**

#### Part A — Simulate Deploy with Version Change
1. Make a trivial change to the app source (e.g., add a comment to `src/main.tsx`).
2. Rebuild: `npm run build`.
3. Restart the preview server: stop `npm run preview`, then start it again.
4. In the existing browser tab (with the old SW active), simply **refresh the page**.

#### Part B — Verify Auto-Update
1. In the Service Workers pane, watch for the new SW to appear.
2. Observe the lifecycle: the new SW should install, then immediately activate (no "waiting" state).
3. Check the **Network** tab: `sw.js` should be fetched with status `200` and the SW should update.

#### Part C — Verify Updated Content
1. After the new SW activates, navigate to a page that changed (e.g., if you changed the dashboard, go to `/`).
2. Verify the change is visible (proving the new SW + assets are active).

**Expected results:**
- The new SW appears and transitions from **installing → activated** without pausing in "waiting".
- The old SW is immediately replaced — no two SW entries in the pane.
- The updated page reflects the new code change.
- No modal dialog or prompt is shown to the user.
- Console shows no errors during the update cycle.

**Common failure — SW stuck in "waiting":**
- If `registerType: 'autoUpdate'` is not set correctly, the new SW waits for all tabs to close. Double-check the `vite-plugin-pwa` config — `registerType: 'autoUpdate'` should call `self.skipWaiting()` on install.

---

### TC-13: Existing Public Assets Intact

> **Purpose:** Confirm that adding PWA did not break or overwrite any existing static assets in the `public/` directory.

**Prerequisites:**
- Production build exists.

**Steps:**
1. List files in the `public/` directory: `ls -la public/`
2. List files in the `dist/` root: `ls -la dist/`
3. Cross-reference expected files against a pre-PWA checklist:
   - `public/favicon.svg` — still present.
   - `public/robots.txt` — still present.
   - `public/sitemap.xml` — still present.
   - `public/icon-512.png` — still present (source for PWA icon generation).
   - `public/apple-touch-icon.png` — still present.
   - `public/generated/` — all subdirectories and files intact.
4. Open the app in browser and verify all icons/favicons load correctly.

**Expected results:**
- `public/site.webmanifest` is **removed** (intentionally) — this is the only file that should be gone.
- All other existing public assets are present and unchanged.
- Favicon, OS meta tags, and OG images load correctly (check Network tab).
- `public/generated/manifest/` files are intact and served correctly.
- No 404s for any expected asset.

---

### TC-14: Network Request Caching Verification

> **Purpose:** Confirm that the correct caching strategy is applied to each asset group by inspecting the `Cache Storage` API.

**Prerequisites:**
- Production build running.
- SW activated (TC-04).
- Visited at least 3-4 different skills, the settings page, and the search page while online.
- DevTools open.

**Steps:**
1. Open DevTools → **Application** → **Cache Storage** tab.
2. Expand the list of caches — you should see:
   - `workbox-precache-<hash>` (pre-cached JS/CSS/HTML).
   - `nogimind-content` (cached content JSON from runtime caching).
   - `nogimind-fonts` (cached Google Fonts, if any were loaded).
   - `nogimind-yt-thumbnails` (cached YouTube thumbnails, if any were loaded).
   - (Browser-managed caches like `workbox-global` may also appear.)
3. Click on each cache to view its entries:
   - **`workbox-precache-*`**: Should contain the SPA shell (index.html), JS bundles, CSS bundles, and PWA icons. All entries should have a version hash.
   - **`nogimind-content`**: Should contain URLs matching `/generated/skills/...json`, `/generated/concepts/...json`, `/generated/manifest/...json`. Each entry should have a `Date cached` field.
   - **`nogimind-fonts`**: Should contain URLs from `fonts.googleapis.com` or `fonts.gstatic.com`.
   - **`nogimind-yt-thumbnails`**: Should contain URLs from `i.ytimg.com`.
4. Note the number of entries in `nogimind-content` — it should equal the number of unique JSON files you visited.
5. Go offline and verify content from each cache still loads (cross-reference with TC-08 and TC-09).

**Expected results:**
- All 4 caches exist (or at least those relevant to visited resources).
- `nogimind-content` has entries only for generated JSON files — no miscached images or HTML.
- `nogimind-fonts` contains only font-related URLs.
- No duplicate or unexpected caches are created.
- Cached entries respect the `maxEntries` limits (e.g., `nogimind-content` ≤ 500, `nogimind-yt-thumbnails` ≤ 50).

---

### TC-15: Console — No JS Errors or Warnings

> **Purpose:** Ensure the PWA implementation does not introduce JavaScript runtime errors, unhandled promise rejections, or CSP violations.

**Prerequisites:**
- Production build running.
- DevTools open to **Console** tab.
- Filter set to **All** (not just Errors or Warnings), with "Hide network messages" unchecked.

**Steps:**
1. Clear the console (`console.clear()` or the clear button).
2. Perform a comprehensive navigation tour while monitoring the console:
   - Load the dashboard (`/`).
   - Navigate to `/skills`.
   - Click a skill card to open its detail page.
   - Switch between Learn/Fix/Video tabs on the skill detail page.
   - Navigate to `/settings` and interact with the Install App button (if applicable).
   - Search for a term in the search bar (`/search?q=guard`).
   - Switch languages.
   - Navigate to `/glossary`, `/concepts`, `/positions`, `/fix`, `/build`, `/learn`.
3. Go offline (via DevTools Network tab) and repeat navigation to at least 3 routes.
4. Come back online and navigate to a previously unvisited skill to verify fresh fetch works.

**Expected results:**
- **Zero errors** in the console.
- **Zero unhandled promise rejections** (especially from SW registration or cache operations).
- **Zero CSP violations** (check for `Refused to...` messages in the console; none expected since `worker-src 'self'` is already in the CSP).
- **Zero 404 fetch errors** from the SW trying to cache non-existent resources.
- Minor warnings (e.g., React dev warnings, deprecated API warnings) are acceptable if they were present pre-PWA. New warnings should be investigated.

**If errors appear:**
- SW registration errors → check that `sw.js` is served with correct MIME type.
- Cache API errors → check that `runtimeCaching` URL patterns don't overlap or conflict.
- Unhandled promise rejections in `beforeinstallprompt` handler → verify that `handleInstall` in `SettingsPage.tsx` properly catches errors from `.prompt()`.

---

## 10. Future Considerations (Out of Scope for v1)

- **Push notifications** for new skill content or training reminders.
- **Sync API** to queue user progress/tracking data when offline and sync when online.
- **Background sync** for content updates.
- **Periodic background sync** for auto-refreshing cached content.
- **Share target** (register as share target so users can share links into the app).

---

## 11. Decision Log

| Decision | Choice | Rationale |
|---|---|---|
| PWA library | `vite-plugin-pwa` (via npm) | De facto standard; active maintenance; wraps Workbox |
| Update strategy | `autoUpdate` | Minimizes user friction; no modal "update now?" prompts |
| Content caching | `StaleWhileRevalidate` | Fast load from cache + background freshness check |
| Pre-cache all content? | No (on-demand) | ~6-8 MB upfront is too much; user will naturally visit content |
| Languages cached | All 3 (en, vi, fr) | User switches languages; offline must work in any language |
| YouTube offline | Placeholder | Videos cannot work offline; clear UX is to show placeholder |
| Install UI | Both custom button + browser prompt | Maximizes discoverability |
| Icons | Auto-generate from 512px source | Ensures all required sizes are present |
| CSP changes needed? | No | `worker-src 'self'` already present in vercel.json |
