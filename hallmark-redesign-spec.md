# Hallmark Redesign — NoGiMind Spec

> A comprehensive plan for applying Hallmark design skill to redesign NoGiMind, a BJJ training knowledge app.
> Created: 2026-05-30 · Status: Draft

---

## 1. Project Overview

| Field | Value |
|---|---|
| **App** | NoGiMind — BJJ training knowledge app |
| **Stack** | React 19 + TypeScript + Vite + Tailwind CSS |
| **Current font** | Inter (display + body, single face) |
| **Current theme** | Dark mode only (`#06080d` bg), cyan/emerald accents |
| **Pages** | Dashboard, 5 hubs (Learn, Study, Fix, Build, Reference) with detail sub-pages |
| **Hub colors** | Learn=cyan, Study=emerald, Fix=amber, Build=violet, Reference=slate |

### Current Design System (summary)

- **Background**: `#06080d` (ink-950) with radial gradient + noise texture
- **Surfaces**: `--bg-surface: #0b1018`, `--bg-card: #101722`, `--bg-elevated: #182234`
- **Borders**: `rgba(148, 163, 184, 0.10)` (subtle) / `0.18` (default)
- **Text**: `#f1f5f9` (primary), `#94a3b8` (secondary), `#64748b` (tertiary)
- **Animations**: CSS-only (fadeIn, slideUp, scaleIn, shimmer)
- **Shadow**: `shadow-glow`, `shadow-lift`, `shadow-card`

---

## 2. Goal

Apply **Hallmark** (a design skill by Nutlope/Together AI) to redesign NoGiMind's full UI/UX:

1. **Install Hallmark** as an AI skill (`npx skills add nutlope/hallmark`) for design generation
2. **Redesign** the entire app — visual layer, typography, color, layout, motion
3. **Study** an athletic brand reference to extract design DNA
4. **Preserve** existing routes, component ownership, copy intent, IA, and BJJ domain logic
5. **Eliminate** AI-slop tells: purple gradients, centered-everything, single font, icon-tile cards

---

## 3. Design Philosophy

Hallmark's 8 core rules applied to NoGiMind:

| Rule | Application |
|---|---|
| **Type pairing** | Fraunces (display) + Inter (body) — no single-font default |
| **OKLCH palette** | Each hub gets its own OKLCH anchor hue; accent < 5% of page area |
| **Named spacing scale** | Multiples of 4, no arbitrary 17px paddings |
| **Exponential ease-out** | CSS `cubic-bezier(0.16, 1, 0.3, 1)` + framer-motion spring |
| **Distinct voice** | Editorial-warm for Learn, technical for Study, urgent for Fix, builder for Build, reference neutral for Reference |
| **Bias the page** | Asymmetric layouts — no centered-everything heroes |
| **Hierarchy ladder** | Display → body → label — scannable in 2 seconds |
| **Restraint** | Better nothing than bad something — no fabricated metrics |

---

## 4. Font Pairing

### Decision: Refined Editorial

| Role | Font | Style | Usage |
|---|---|---|---|
| **Display** | **Fraunces** (Google Fonts) | `opsz, wght`, italic variable font | H1–H3 headings, hero titles, pull-quotes |
| **Body** | **Inter** (existing) | `wght` 400–700 | Body copy, UI labels, card content, navigation |
| **Mono** | **JetBrains Mono** (existing) | — | Code blocks, terminal-style elements |

### Font loading

```ts
// Via @fontsource/fraunces — variable font, all axes
import '@fontsource/fraunces/variable.css'

// Inter already loaded via existing setup
```

### CSS variable tokens

```css
:root {
  --font-display: 'Fraunces', ui-serif, serif;
  --font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

---

## 5. Theme Mapping — Per Hub

Each hub gets its own Hallmark theme. Shared chrome (sidebar, header, footer) adapts colors to the active hub.

| Hub | Hallmark Theme | Anchor Hue | Display Style | Accent Color | Mood |
|---|---|---|---|---|---|
| **Learn** | **Salon** | Warm cream | Fraunces italic · editorial | Warm-amber `#d97706` | Curated, editorial, welcoming |
| **Study** | **Linen** | Warm beige | Fraunces roman · technical | Emerald `#10b981` | Focused, deep-work, scientific |
| **Fix** | **Newsprint** | Warm-cream | Fraunces italic serif | Deep-red `#dc2626` | Urgent, problem-solving, direct |
| **Build** | **Midnight** | Dark cool | Fraunces condensed · builder | Phosphor-cyan `#06b6d4` | Creative, constructive, systematic |
| **Reference** | **Plain** | Pure white | Fraunces roman · label | Deep ink-blue `#3b82f6` | Neutral, authoritative, clean |

### Dashboard

The Dashboard uses a **neutral/base** theme (no hub affiliation) — retains current dark elegance with refined spacing and typography. Acts as a landing page that introduces all hub themes.

### Per-hue dark mode adaptation

Since NoGiMind is dark-mode-only, each theme's "paper" color maps to dark surfaces:

| Theme token | Light (Hallmark default) | Dark (NoGiMind adaptation) |
|---|---|---|
| `--color-paper` | Warm cream `#f5f0eb` | `--bg-primary: #06080d` |
| `--color-paper-2` | Cream `#ede7e0` | `--bg-surface: #0b1018` |
| `--color-paper-3` | Tan `#e0d8cf` | `--bg-card: #101722` |
| `--color-ink` | Near-black `#1a1410` | `--text-primary: #f1f5f9` |
| `--color-ink-2` | Dark brown `#3d3228` | `--text-secondary: #94a3b8` |

Each theme's accent hue stays in the dark palette but with adjusted saturation/value for readability on dark backgrounds.

---

## 6. Hub Chrome Adaptation

The sidebar, header, and mobile nav adapt their accent colors based on the active hub route:

### Sidebar

- Active hub pill indicator uses the hub's accent color (currently done per-hub with `hubAccent` map)
- Icon background + border shift to hub accent on active
- Sliding pill background gradient uses hub accent at low opacity
- Expand/collapse chevron colors adapt

### Header

- Search bar focus glow shifts to match active hub accent
- `Cmd+K` badge border color adapts

### Mobile Nav

- Bottom tab active indicator uses hub accent
- Full-screen nav drawer highlight uses hub accent

### Implementation approach

Create a React context (`HubThemeContext`) that provides the active hub's Hallmark theme tokens. Components consume via `useHubTheme()` hook.

```tsx
// src/stores/useHubTheme.ts (or context)
type HubTheme = {
  accent: string          // e.g. '#10b981'
  fontDisplay: string     // Fraunces variable settings
  colors: Record<string, string>
  glassBg: string         // backdrop-blur surfaces
  glowColor: string
  borderColor: string
}
```

The active hub is derived from the current route pathname (same pattern as `pathInHub` in navItems.ts).

---

## 7. Motion System

### Decision: Motion-on with framer-motion

Install `framer-motion` and replace CSS animations with spring-based motion:

| Behavior | Current (CSS) | Future (framer-motion) |
|---|---|---|
| Page enter | `animate-fadeIn` (0.25s ease-out) | `motion.div` with spring `{ stiffness: 300, damping: 24 }` |
| Card hover lift | `card-hover` (translateY -2px) | `whileHover={{ y: -4, scale: 1.02 }}` spring |
| Skeleton shimmer | CSS keyframes | Keep CSS (performance-critical) |
| Route transitions | `page-enter` animation | `AnimatePresence` with shared layout |
| Hub tab switch | `animate-slideUp` with key | `layoutId` for smooth tab transitions |
| Refresh button | `animate-spin-once` | `animate={{ rotate: 360 }}` spring |

### Motion principles

1. **Exponential ease-out** — all custom transitions use `cubic-bezier(0.16, 1, 0.3, 1)`
2. **Reduced motion** — respect `prefers-reduced-motion` on every animation
3. **Spring physics** — default `stiffness: 300, damping: 24` (subtle bounce)
4. **Stagger children** — list items enter with `staggerChildren: 0.05`

### Package installation

```bash
npm install framer-motion
```

---

## 8. Implementation Phases

### Phase 1: Foundation — Design Tokens + Typography + Colors

**Scope:** CSS variables, font loading, Tailwind config updates, theme token system

**Files to modify:**
- `src/index.css` — add `:root` tokens for all 5 Hallmark themes, update font stack
- `tailwind.config.js` — add Fraunces font family, add OKLCH colors, update spacing scale
- `package.json` — add `@fontsource/fraunces` + `framer-motion`
- Create `src/styles/hallmark-themes.css` — all 5 theme token blocks
- Create `src/stores/useHubTheme.ts` — active hub detection + theme provider

**Deliverable:** App loads with new fonts, theme tokens available, no visual changes yet

### Phase 2: Hub Landing Pages — Redesign Visual Layer

**Scope:** Dashboard + LearnPage + StudyPage + FixHubPage + BuildHubPage + ReferencePage

**Action:** Run `hallmark redesign <page>` for each hub page to generate new visual structure

**For each page:**
1. Run `hallmark redesign` with the hub's Hayllmark theme + audience/use/tone brief
2. Preserve existing routes, component imports, data queries, i18n keys
3. Replace: hero section, layout grid, card styles, typography hierarchy, motion
4. Apply hub-specific theme tokens

**Template for each hub brief:**

```markdown
/hallmark redesign <page-file.tsx>
Theme: <Salon | Linen | Newsprint | Midnight | Plain>
Audience: BJJ practitioners (white to black belt)
Use: <learn techniques | study skills | fix problems | build systems | reference>
Tone: <editorial-warm | technical | urgent | builder | neutral>
Font: Fraunces (display) + Inter (body)
Preserve: data queries, i18n keys, routes, component imports
Motion: framer-motion spring animations
```

### Phase 3: Detail Pages

**Scope:** SkillDetailPage, PositionDetailPage, ConceptDetailPage, DefenseDetailPage, ArchetypeDetailPage, SubmissionTroubleshooterDetailPage, SearchPage, SettingsPage, GlossaryPage, AboutPage, SkillMapPage, MasteryMapPage, PositionsPage, ConceptsPage, DefensePage, ArchetypesPage, SubmissionTroubleshootersPage

**Approach:**
- Each detail page inherits its parent hub's Hallmark theme
- Apply component-level Hallmark (8-state discipline for interactive elements)
- Redesign page headers, content cards, navigation breadcrumbs

### Phase 4: Animation + Micro-interactions

**Scope:** Framer-motion integration, page transitions, hover states, loading states

**Checklist:**
- AnimatePresence for route transitions
- Stagger animations for list items
- Spring-based card hover effects
- Reduced-motion fallback for all animations
- 8-state discipline for interactive components (default, hover, focus-visible, active, disabled, loading, error, success)

### Component: DailyFocusCard (dashboard)
- Ensure mute/unmute and call controls are accessible
- Focus mode enhancement

---

## 9. Design Reference — Athletic Brand Study

### Recommendation: Study Nike Training / Gymshark

Use `hallmark study <URL>` on athletic brand landing pages to extract DNA:

```markdown
/hallmark study https://www.nike.com/training
```

**What to extract:**
- Macrostructure archetype (stat-led? index-first? bento grid?)
- Color anchor (dark athletic greys + bold accent)
- Typography pairing (condensed display + clean body)
- Image treatment (high-contrast, action shots, minimal chrome)
- Layout asymmetry (bias toward action, dynamic grids)

**Application to NoGiMind:**
- Translate athletic brand energy into BJJ context
- Use dynamic, asymmetrical grids for skill cards
- High-contrast accent colors against dark backgrounds
- Action-oriented CTA language

---

## 10. Hallmark Skill Installation

```bash
# Install the Hallmark skill
npx skills add nutlope/hallmark

# (Re-run to update)
```

The skill installs into the project's `.skills/` directory:
- `SKILL.md` — the full Hallmark design ruleset
- `references/` — slop test, anti-patterns, responsive guidelines, interaction patterns

Each time we ask the AI to redesign a page, Hallmark's rules automatically apply:
1. Pre-flight scan (reads existing tokens, fonts, framework)
2. Design-context gate (infers audience, use, tone)
3. Macrostructure pick (chooses layout rhythm)
4. Theme + enrichment (applies the hub's theme)
5. Slop test (65 gates before emitting code)
6. Pre-emit self-critique (scores P/H/E/S/R/V 1–5)

---

## 11. Token System Architecture

### Theme token CSS structure

```css
/* ── Learn (Salon theme) ── */
[data-hub="learn"] {
  --color-accent: oklch(0.62 0.19 58);       /* warm-amber */
  --color-accent-dim: oklch(0.62 0.19 58 / 0.15);
  --color-accent-glow: oklch(0.62 0.19 58 / 0.08);
  --font-display: 'Fraunces', ui-serif, serif;
  --font-display-axes: 'opsz' 48, 'wght' 400, 'SOFT' 50;
  --color-surface-accent: oklch(0.25 0.05 58);
  --glass-bg: rgba(245, 240, 235, 0.04);
  --glass-border: rgba(245, 240, 235, 0.08);
  --hero-gradient: radial-gradient(ellipse at 30% 20%, oklch(0.62 0.19 58 / 0.12), transparent 50%);
}

/* ── Study (Linen theme) ── */
[data-hub="study"] {
  --color-accent: oklch(0.72 0.19 148);       /* emerald */
  --color-accent-dim: oklch(0.72 0.19 148 / 0.15);
  --color-accent-glow: oklch(0.72 0.19 148 / 0.08);
  --font-display: 'Fraunces', ui-serif, serif;
  --font-display-axes: 'opsz' 48, 'wght' 500, 'SOFT' 30;
  --color-surface-accent: oklch(0.25 0.05 148);
  --glass-bg: rgba(236, 230, 220, 0.04);
  --glass-border: rgba(236, 230, 220, 0.08);
  --hero-gradient: radial-gradient(ellipse at 30% 20%, oklch(0.72 0.19 148 / 0.12), transparent 50%);
}

/* ── Templates for Fix (Newsprint), Build (Midnight), Reference (Plain) follow same pattern ── */
```

### React integration

```tsx
// The active hub's CSS variables are applied via data attribute on <html> or <body>
// Managed by a HubThemeProvider component

function HubThemeProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const activeHub = detectHubFromPath(location.pathname)

  return (
    <div data-hub={activeHub ?? 'dashboard'}>
      {children}
    </div>
  )
}
```

This approach allows all Tailwind classes to reference `var(--color-accent)` etc. via `theme.extend.colors`.

---

## 12. File Change Summary

### New files to create:

| File | Purpose |
|---|---|
| `src/styles/hallmark-themes.css` | CSS tokens for all 5 Hallmark themes as `[data-hub="..."]` blocks |
| `src/contexts/HubThemeContext.tsx` | React context + provider for active hub theme |
| `src/hooks/useHubTheme.ts` | Hook to consume current hub theme |
| `.skills/hallmark/SKILL.md` | Hallmark skill (installed via `npx skills add`) |
| `.skills/hallmark/references/` | Hallmark reference files (slop-test, anti-patterns, etc.) |

### Existing files to modify:

| File | Changes |
|---|---|
| `package.json` | Add `@fontsource/fraunces`, `framer-motion` |
| `src/index.css` | Replace single `:root` block with theme tokens; add Fraunces import; update body typography |
| `tailwind.config.js` | Add `Fraunces` to `fontFamily.display`; add OKLCH accent colors; update spacing |
| `src/router/AppRouter.tsx` | Wrap routes with `HubThemeProvider` |
| `src/components/layout/Sidebar.tsx` | Adapt hub accent colors + font to use Hallmark tokens |
| `src/components/layout/Header.tsx` | Adapt search focus glow, accent colors |
| `src/components/layout/MobileNav.tsx` | Adapt bottom tab indicators |
| `src/components/layout/Layout.tsx` | Integrate `HubThemeProvider` |
| `src/pages/DashboardPage.tsx` | Refine spacing, apply new tokens |
| `src/pages/LearnPage.tsx` | **Hallmark redesign** — new hero, layout, typography (Salon theme) |
| `src/pages/StudyPage.tsx` | **Hallmark redesign** — new hero, domain grid, quick-study mode (Linen theme) |
| `src/pages/FixHubPage.tsx` | **Hallmark redesign** — troubleshooters + defense layout (Newsprint theme) |
| `src/pages/BuildHubPage.tsx` | **Hallmark redesign** — archetype builder layout (Midnight theme) |
| `src/pages/ReferencePage.tsx` | **Hallmark redesign** — glossary + search layout (Plain theme) |

---

## 13. Anti-Patterns to Eliminate

| Anti-pattern | Where in NoGiMind | Hallmark fix |
|---|---|---|
| Single font (Inter for everything) | All headings + body | Pair Fraunces (display) + Inter (body) |
| Centered hero with gradient bg | LearnPage, FixHubPage, BuildHubPage heroes | Bias layout, solid background, single accent |
| Icon-tile feature cards | DashboardHubExplorer cards | Asymmetric cards, varying sizes |
| AI nav (wordmark left, links right, CTA right) | Sidebar + Header | Keep sidebar (already non-standard), refine header |
| Fabricated metrics | Dashboard stats strip (hardcoded counts) | Use real `pipelineSkillCount` values |
| Interchangeable section rhythm | LearnPage tracks grid (4 identical cards) | Each track card: different size, emphasis, layout |

---

## 14. Pre-commit Checklist

For each Hallmark-generated page, verify:

- [ ] Pre-emit self-critique scores stamped (P/H/E/S/R/V)
- [ ] Slop-test gates passed (65 gates)
- [ ] All routes, queries, i18n keys preserved
- [ ] No fabricated content (metrics, testimonials, logos)
- [ ] All colors use named tokens (`var(--color-accent)`), no inline hex
- [ ] No re-drawn chrome (no fake browser frames)
- [ ] Responsive at 320 / 375 / 414 / 768 px (no horizontal scroll)
- [ ] Reduced-motion alternative for every animation
- [ ] Component-scope: 8 states for interactive elements
- [ ] Diverse layouts — no two hubs share the same section rhythm

---

## 15. Open Questions / Future Considerations

- **Fraunces variable font axes**: `opsz` (optical size), `wght` (weight), `SOFT` (softness), `ITAL` (italic). Need to determine which axes to expose as CSS variables.
- **HubThemeContext vs pure CSS**: The `[data-hub]` attribute approach keeps theming in CSS land (faster, no React overhead). Context approach enables dynamic JS-based theming (animations, layout shifts). Hybrid is likely best.
- **Athletic brand study timing**: Should be done before Phase 2 to inform layout decisions.
- **Accessibility audit pass**: After each phase, run accessibility check for contrast ratios (especially OKLCH accents on dark backgrounds).
- **Bundle size impact**: Fraunces variable font (~50 KB) + framer-motion (~35 KB) = ~85 KB added. Acceptable for this app's use case.

---

*End of spec. Ready for Phase 1 implementation when approved.*
