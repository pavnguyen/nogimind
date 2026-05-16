# NoGi Mind Enhancement Specification

> **Date:** 2025-07-20
> **Status:** Draft for review
> **Scope:** UX/UI, Architecture, Performance, and Interaction Enhancements

---

## 1. Executive Summary

NoGi Mind is a comprehensive BJJ no-gi knowledge operating system with 28+ pages covering skills, concepts, positions, defenses, archetypes, micro-details, technique chains, escape maps, troubleshooters, game trees, mastery maps, and more. It targets all belt levels equally, supporting both deep desktop study sessions and quick mobile gym reference. This spec outlines enhancements across UX, performance, navigation, visual design, and feature depth.

---

## 2. User Research Synthesis

### 2.1 Target Audience
| Segment | Needs |
|---------|-------|
| **All belts equally** | The app must scale from white belt survival to black belt system refinement |
| **Desktop study** | Deep exploration, graphs, cross-referencing, multi-column layouts |
| **Mobile gym reference** | One-handed nav, instant page loads, quick cue retrieval between rounds |

### 2.2 Key User Goals
- Find the right page for their current problem (discoverability)
- Consume content quickly between training rounds (speed)
- Study deeply when at a computer (depth)
- Feel the app guides them naturally via visual hierarchy (clarity)

---

## 3. Navigation Architecture (HIGH PRIORITY)

### 3.1 Current Problem
- 28 top-level pages create overwhelming navigation
- Mobile overlay menu is cumbersome
- No clear hierarchy or progression path
- All nav pain points selected: too many items, hard to find, mobile gaps

### 3.2 Solution: Hub-and-Spoke Navigation

Reduce 28 pages into **6 hub pages**, each with internal sub-navigation:

#### Primary Hubs (shown in sidebar/bottom nav)

| Hub | Icon | Sub-pages (internal tabs) |
|-----|------|--------------------------|
| **Learn** | Compass | Learn Path, Skill Map, Positions, Concepts |
| **Study** | Zap | Study (domain filter), Skill Detail, Micro-Details, Technique Chains |
| **Fix** | Wrench | Troubleshooters, Escape Maps, Defense/Safety |
| **Build** | Layers3 | Game Tree, Archetypes, Mastery Map, System Map |
| **Reference** | BookOpen | Glossary, About/Philosophy, Search |
| **Settings** | Settings | Language, View Mode, Export/Import |

#### Mobile Bottom Nav (5 tabs)
- Learn | Study | Fix | Build | Reference → Settings via gear icon

#### Implementation Notes:
- Internal sub-navigation uses tab bars or side panels within each hub page
- Current top-level routes redirect or 301 to the new hub paths
- Preserve deep links (e.g., `/skills/:skillId` still works, but now lives under Study hub)
- Use URL-based state for sub-tabs so browser back/forward works

---

## 4. Onboarding & First-Time UX

### 4.1 Guiding Principles
- No blocking intro tours
- No forced questionnaire
- Use subtle UI hints and progressive discovery

### 4.2 Implementation

**Phase 1: Subtle hints**
- First 3 visits: show a small floating hint badge on key UI elements (search, hub navigation, daily focus)
- Use a "first_visit" flag in localStorage
- Hints fade after 3 interactions or after 5 total visits

**Phase 2: Visual hierarchy**
- New/suggested content gets a subtle shimmer/glow indicator
- Recently viewed items get a faded treatment
- "Most popular" sections subtly highlighted

**Phase 3: Contextual nudges**
- When visiting a skill detail page for the first time, a small toast suggests: "Try One-Minute Mode for a quick overview"
- When on the search page with no query, show popular search suggestions

---

## 5. Visual Identity & Design Language (HIGH PRIORITY)

### 5.1 Current State
- Dark theme with emerald/cyan accents
- Functional but restrained

### 5.2 Enhancement Goals
- **Bolder & more expressive** visual identity
- Rich micro-interactions and animations
- Better visual hierarchy and personality

### 5.3 Visual Enhancements

**Typography & Layout**
- Introduce a display font (e.g., Inter or Satoshi) for headings to contrast with body text
- Larger, more dramatic hero sections on hub pages
- Better spacing rhythm (8px grid system enforcement)

**Color & Gradients**
- Extend the emerald-cyan palette with richer gradients
- Add a new accent color per hub (e.g., Learn = cyan, Study = emerald, Fix = rose/amber, Build = violet, Reference = slate)
- Use subtle color-coded badges/borders per hub consistently

**Animations & Micro-interactions**
- Page transitions: subtle slide-up + fade (already partially implemented with `animate-slideUp`)
- Card hover: lift + glow effect (already partially done, refine)
- Navigation active state: smooth underline/indicator animation
- Search: expand/focus animation on the search bar
- Tab switches: content cross-fade (already has `animate-slideUp`)
- Loading states: skeleton loaders instead of simple text
- Add a subtle grain/noise texture overlay to dark backgrounds for depth

**Illustration & Iconography**
- Custom illustrations for each hub page hero
- Animated icons on hover (e.g., the Compass icon spins slightly on hover)
- Use Lucide icons consistently but add custom decorative elements

**Accessibility (Critical Priority)**
- Full keyboard navigation for all interactive elements
- Focus indicators: visible ring styles on all focusable elements
- ARIA labels: ensure all interactive elements have descriptive labels
- Screen reader: semantic HTML structure, proper heading hierarchy
- Color contrast: verify all text meets WCAG AA standards
- Focus management: trap focus in modals/overlays, return focus on close

---

## 6. Page-Specific Improvements

### 6.1 Dashboard (Needs Overhaul)
**Current issues:** Too busy, not personalized, feels like a random content dump

**Enhancements:**
- Make the daily focus section more prominent and visually dramatic
- Add content-type variety to daily discovery (keep random/serendipitous)
  - Day 1: Micro-detail of the day
  - Day 2: Concept of the day
  - Day 3: Position of the day
  - Day 4: Drill/training tip
  - Day 5: Troubleshooter highlight
  - Day 6: Chain/sequence of the day
  - Day 7: Safety reminder
- Reduce the number of secondary sections (Workflow Steps, Quick Shortcuts, Quick Links)
- Add a small content coverage indicator showing system completion %
- Improve visual hierarchy: single main hero section, 2-3 supporting sections max

### 6.2 Study Page (Needs Improvement)
**Current issues:** Just a domain filter with a list of links

**Enhancements:**
- Add a "Quick Study" mode: shows only the core cues for each skill in the domain
- Add "Random Skill" button within the current domain
- Show each skill's quality check status (if available) or content richness indicator
- Add expanded/collapsed skill cards: collapsed shows title + badges, expanded shows primary goal + key concepts
- Add a "Recently Viewed" filter within the domain

### 6.3 Technique Chains (Needs Improvement)
**Current issues:** Content is thin, presentation doesn't convey the chain concept

**Enhancements:**
- Visual chain diagrams: use a simple flow/arrow visualization between steps
- Interactive "what if" branching: click a failure branch to see the alternative path
- Connect chains visually to related escape maps and troubleshooters
- Better color coding for different branch types (primary path, failure response, alternative)

### 6.4 Game Tree (Needs Overhaul)
**Current issues:** Too complex, drag-and-drop builder is unintuitive

**Enhancements:**
- Simplify the builder: replace drag-and-drop with a simpler "add from search" pattern
- Pre-built archetype templates that instantly populate lanes
- Visual tree: use a top-down or left-to-right flow diagram instead of lanes
- Export/import game tree as JSON (already exists, improve discoverability)
- Add a "Quick Build" mode: answer 3 questions → get a suggested game tree

### 6.5 Mastery Map (Needs Improvement)
**Current issues:** Static content, no connection to user's actual progress

**Enhancements:**
- Add a content coverage progress indicator per mastery stage
- Link each mastery stage to the specific skills and concepts it references
- Show how many skills in each stage the user has viewed
- Add a visual timeline/roadmap with clear stage transitions

### 6.6 System Map (Needs Improvement)
**Current issues:** Redundant with Reference page

**Enhancements:**
- Differentiate clearly from Reference: System Map = visual/organizational overview, Reference = text-based index
- Add an interactive graph view as the default (positions → skills → chains → escapes)
- Make it the primary "big picture" navigation tool
- Add zoom/pan controls with context labels (already has React Flow/XYFlow)

---

## 7. Quick Consumption Modes

### 7.1 Print-Friendly Cards
- Generate one-page PDF summaries per skill
- Include: skill name, primary goal, 3 key cues, body contacts (simplified), do-not-do, if-it-fails
- Optimized for mobile screen capture and printing
- Accessible from the skill detail page via a share/export button

### 7.2 Drill Timer Integration
- Built-in round timer with configurable intervals (e.g., 3 min drill, 1 min rest)
- Show cue cards that advance with rounds
- Pre-built drill templates for common skills
- Audible/visual round change indicators

### 7.3 Sparring Companion Mode
- A "live" mode that shows relevant cues based on the skill being studied
- Stripped-down UI: large text, high contrast, one cue at a time
- Swipe to advance through cues
- Quick-access buttons: "Next Cue", "Show Do-Not-Do", "Show If-It-Fails"

### 7.4 Voice & Image Mode
- Audio play buttons for key cues (using TTS or pre-recorded)
- Support for technique images/diagrams in skill cards
- Voice note recording for personal annotations (future consideration)

---

## 8. Search Enhancements

### 8.1 Current State
- Web worker with MiniSearch
- IndexedDB caching
- Type filtering and deep search mode

### 8.2 Priority: Faster First Search
- Pre-warm indexes more aggressively (earlier in page load lifecycle)
- Consider eagerly loading the search worker on app mount (not waiting for `requestIdleCallback`)
- Show cached/skeleton search results while indexes warm up
- Cache last N search queries and their results in localStorage for instant redisplay
- Background index rebuild on app idle time

### 8.3 Additional Search Improvements
- Search result snippets: show the matching sentence in context
- Keyboard shortcuts within search results (arrow keys, enter)
- Search filters persisted across sessions (already partially done)
- Search analytics (anonymous, local) to identify most-searched terms

---

## 9. Performance Architecture

### 9.1 Concerns (All Selected)
- Initial load time
- Navigation smoothness
- Data loading patterns
- Search performance

### 9.2 Strategies

**Initial Load Time**
- More aggressive code-splitting (already started in vite.config.ts)
- Consider route-level chunk preloading using `<link rel="modulepreload">`
- Lazy-load heavy data files with Suspense boundaries
- Show skeleton loaders instead of text fallbacks
- Measure and track Lighthouse scores

**Navigation Smoothness**
- Pre-fetch route chunks on hover over navigation items
- Use `viewTransition` API for smooth page transitions (where supported)
- Keep DOM tree lean: virtualize long lists (already using TanStack Virtual for Glossary)
- Avoid layout shifts with fixed-size containers

**Data Loading Patterns**
- Evaluate static JSON imports vs. IndexedDB as the primary data source
- Consider lazy-loading data by domain instead of loading all skills at once
- Profile memory usage of the massive data structures

**Search Performance**
- As noted in Section 8, prioritize first-search speed
- Consider pre-building the MiniSearch index at build time (not at runtime)

---

## 10. Data & Content Strategy

### 10.1 Content Coverage
- Show a small progress indicator per page/section showing what percentage of content has been authored
- e.g., "Skills: 45/120 (38%)" in the page header area
- This sets user expectations and shows the system is actively growing

### 10.2 Content Quality
- **UX polish first**: prioritize making existing content shine rather than building content tooling
- Eventually: validation scripts for missing translations, cross-reference integrity, and content consistency

### 10.3 Internationalization
- All three languages (EN, VI, FR) must ship in parallel for all new content
- English is the source of truth; VI and FR translations must be verified
- Missing translations should show a subtle indicator (e.g., italicized English text) rather than an empty state

---

## 11. Visualizations & Graphs

### 11.1 Current State
- XYFlow (React Flow) for skill graphs and game tree graphs
- Graph view for Skill Map

### 11.2 Enhancement Direction: Much More Emphasis
- Add a full interactive graph for **Position transitions**: positions → advancement options → next positions
- Add a graph for **Technique Chains**: visualize the chain as an interactive flow diagram
- Add a graph for **Concept relationships**: concept → related skills → related concepts
- Make the **System Map** page graph-first (not card-first)
- Add graph mini-maps for navigation context
- Better graph node design: color-coded by domain, size by importance, with preview tooltips
- Animations: smooth node transitions, edge routing, zoom-to-fit

---

## 12. Technical Stack & Dependencies

| Technology | Purpose | Notes |
|-----------|---------|-------|
| React 19 | UI Framework | Already using |
| Vite 8 | Build tool | Already using |
| TypeScript 6 | Language | Already using |
| Tailwind CSS 3 | Styling | Already using |
| React Router 7 | Routing | Already using |
| Zustand 5 | State management | Already using |
| React Query 5 | Data fetching | Already using |
| i18next | i18n | Already using |
| XYFlow 12 | Graph visualization | Already using |
| MiniSearch | Client-side search | Already using |
| TanStack Virtual | Virtual scrolling | Already using |
| Lucide React | Icons | Already using |
| DnD Kit | Drag and drop | Already using — may reduce usage for Game Tree |

---

## 13. Implementation Phases

### Phase 1: Foundation (Next Sprint)
1. Navigation restructure → hub-and-spoke model
2. Visual identity refresh → typography, color extensions, animations
3. Performance → preloading, skeleton loaders, faster search warmup
4. Accessibility audit → keyboard nav, focus management, ARIA labels

### Phase 2: Page Overhauls (Next 2 Sprints)
1. Dashboard redesign → simplified hero, content variety in daily discovery
2. Study Page → expandable cards, quick study mode
3. Technique Chains → visual flow diagrams
4. Game Tree → simplified builder, templates

### Phase 3: New Features (Next 3 Sprints)
1. Quick consumption modes → print cards, drill timer, sparring companion
2. Enhanced visualizations → position graphs, chain graphs, improved system map
3. Content coverage indicators
4. Onboarding hints system

### Phase 4: Polish (Ongoing)
1. Micro-interactions refinements
2. Performance monitoring
3. Accessibility hardening
4. Search improvements

---

## 14. Out of Scope (Confirmed)

| Area | Status | Reason |
|------|--------|--------|
| User progress tracking | ❌ Not needed | App is reference/knowledge base |
| Cloud sync / accounts | ❌ Stay fully local | Offline-first by design |
| User authentication | ❌ Not needed | No accounts |
| Community / social features | ❌ Not needed | No sharing features planned |
| Content authoring tools | ❌ UX polish first | Validation scripts later |
| Belt-level gating | ❌ Smart visibility | Show everything with hierarchy |
| Blocking onboarding tour | ❌ Subtle hints | Non-intrusive UX |

---

## 15. Open Questions / Decisions Pending

1. **Graph implementation detail**: Should the position transition graph replace or supplement the existing Position pages?
2. **Print card format**: A4 PDF vs. mobile-optimized PNG vs. both?
3. **Drill timer**: Should it be a new route/page or a modal overlay on any skill page?
4. **i18n fallback**: When a translation is missing, show English in italics or show a warning badge?

---

*This spec is based on 7 rounds of user interviews covering 25+ questions about target audience, UX, visual design, performance, navigation, and feature preferences.*
