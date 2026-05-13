You are working on the existing NoGi Mind app.

Goal:
Add a lightweight automatic visual language for NoGi Mind without requiring image assets.

The app should not depend on real illustrations, uploaded images, 3D models, or heavy canvas rendering.

Instead, create clean, technical, schematic visual aids generated from structured data.

Design the visual system yourself. Do not ask for image assets. Generate a clean technical visual language from structured attacker/defender body-position data.

Visual direction:
- modern
- dark UI
- minimal
- technical
- premium
- not cartoonish
- not cluttered
- text-first
- body-position-first
- performance-first

Do NOT add:
- real image assets
- image upload
- 3D
- heavy canvas
- AI image generation
- video analysis
- complex animation
- backend

Use only:
- React
- TypeScript
- Tailwind/CSS
- lightweight SVG
- icons if already available
- structured body-position data

==================================================
VISUAL SYSTEM GOAL
==================================================

Create a visual layer that helps users understand:

1. Attacker body position
2. Defender body position
3. Attacker body part → defender body part
4. Force direction
5. Clamp / wedge / hook / frame / pull / push
6. Safety-critical contact
7. Finish trigger
8. Common mistake

This should support the core sections:

- System Logic
- Body Position
- Money Details
- Outcomes & Branches
- Fix It Fast
- Safety
- Next Step

==================================================
NEW LIGHTWEIGHT VISUAL COMPONENTS
==================================================

Create components:

src/components/visual/
  BodyPartBadge.tsx
  ForceDirectionBadge.tsx
  ContactTypeBadge.tsx
  AttackerDefenderMiniMap.tsx
  BodyContactDiagram.tsx
  TechniquePhaseStrip.tsx
  SafetySignalBadge.tsx

==================================================
BODY PART BADGE
==================================================

BodyPartBadge should render compact visual labels for:

- head
- chin
- neck
- shoulder
- chest
- ribs
- hip
- hand
- wrist
- elbow
- knee
- thigh
- shin
- ankle
- heel
- foot

Each badge should show:
- small icon or abbreviation
- localized label
- side if available:
  - left
  - right
  - near
  - far
  - inside
  - outside

Example:
[Attacker • Right Hand]
[Defender • Left Wrist]

Localized labels:
- English
- Vietnamese
- French

==================================================
FORCE DIRECTION BADGE
==================================================

ForceDirectionBadge should show direction clearly:

- pull across centerline
- drive down
- rotate
- compress
- wedge
- expose
- hide
- extend
- fold
- close space
- open space

Use simple arrows:
- →
- ←
- ↓
- ↑
- ↘
- ↗
- ↻
- ↺

No heavy graphics.

==================================================
CONTACT TYPE BADGE
==================================================

ContactTypeBadge should show:
- grip
- frame
- post
- hook
- clamp
- wedge
- pin
- pull
- push
- drag
- lift
- block
- shelf
- wrap
- underhook
- overhook
- crossface
- chest connection
- hip connection
- knee wedge
- foot post
- hand fight
- finish pressure
- safety release

Use subtle badges/chips.
Do not overload the UI.

==================================================
ATTACKER / DEFENDER MINI MAP
==================================================

Create AttackerDefenderMiniMap.

It should be a simple CSS/SVG schematic, not a real anatomy illustration.

Purpose:
Show a quick overview of where the attacker and defender body parts are active.

Input:
- attackerBodyMap
- defenderBodyMap
- contacts

Display:
Two columns or two simple silhouettes:

ATTACKER
- Head
- Chest
- Hips
- Left Hand
- Right Hand
- Left Leg
- Right Leg

DEFENDER
- Head
- Chest
- Hips
- Left Arm
- Right Arm
- Left Leg
- Right Leg

Each active body part gets a subtle highlight.
No exact anatomical drawing required.

Example layout:

Attacker                 Defender
Head: beside head    Head: chin tucked
Chest: glued back    Chest: compressed
R Hand: wrist ctrl   L Wrist: controlled
Hips: behind hips    Hips: turning away

Mobile:
Stack vertically.

Desktop:
Side-by-side.

==================================================
BODY CONTACT DIAGRAM
==================================================

Create BodyContactDiagram.

Input:
AttackerDefenderContact

Render:

Attacker right hand
        ↓ pull across centerline
Defender left wrist

Also show:
- contact type
- force direction
- why it works
- correction cue

This should replace vague text blocks.

==================================================
TECHNIQUE PHASE STRIP
==================================================

Create TechniquePhaseStrip.

Show phases horizontally on desktop and vertically on mobile.

Example:
Entry → Isolation → Control → Finish → Branch

Each phase can show:
- title
- goal
- number of key contacts
- success signal
- failure signal

Clicking phase expands body contacts.

==================================================
SAFETY SIGNAL BADGE
==================================================

Create SafetySignalBadge.

Use for:
- neck
- spine
- shoulder
- elbow
- knee
- heel
- compression
- smother
- flying attack
- kani basami
- late defense

Show compact warning:
- Safety Critical
- Tap Early
- Release on Tap
- No Blind Rotation
- Do Not Force

Localized en/vi/fr.

==================================================
INTEGRATE INTO SKILL DETAIL
==================================================

Integrate visuals into the new compact Skill Detail structure.

1. System Logic
Use simple concept chips only.
Do not add heavy visuals.

2. Body Position
Use:
- AttackerDefenderMiniMap
- TechniquePhaseStrip
- BodyContactDiagram
- BodyPartBadge
- ForceDirectionBadge
- ContactTypeBadge

3. Money Details
Use body part badges and contact type badges.
Do not make this visual-heavy.

4. Outcomes & Branches
Use small outcome chips:
- Success
- Failure
- Counter
- Reset
- Branch
- Safety Abort

5. Fix It Fast
Use compact problem cards.
Optional icon for problem/fix.

6. Safety
Use SafetySignalBadge.

7. Next Step
No heavy visuals.

==================================================
VISUAL STYLE
==================================================

Style should feel:

- clean
- modern
- premium
- technical
- calm
- readable
- minimal
- dark-mode friendly

Do not use:
- cartoon colors
- thick borders everywhere
- busy diagrams
- huge illustrations
- distracting animations

Use:
- subtle borders
- rounded cards
- small chips
- soft highlights
- clear typography
- simple arrows
- compact spacing

==================================================
PERFORMANCE
==================================================

Visuals must be lightweight.

Requirements:
- No image assets required.
- No external image URLs required.
- No canvas.
- No 3D.
- No heavy animation library.
- SVG/CSS only.
- Render only visible/expanded phase details.
- Do not render every contact diagram expanded by default.
- Memoize if necessary.

==================================================
I18N
==================================================

All visual labels must support:

- English
- Vietnamese
- French

Add labels for:
- Attacker
- Defender
- Body Part
- Contact
- Force Direction
- Pressure
- Cue
- Why it works
- Success Signal
- Failure Signal
- Safety Critical
- Tap Early
- Release on Tap
- No Blind Rotation
- Do Not Force

==================================================
VALIDATION
==================================================

Update validation if appropriate.

Warn when:
- body contact has no forceDirection
- body contact has no contactType
- body contact has no correctionCue
- body map lacks attacker hips
- body map lacks defender reaction
- safety-critical contact has no safety note

==================================================
DOCUMENTATION
==================================================

Create/update:

docs/VISUAL_SYSTEM_GUIDE.md

Include:
- purpose
- visual principles
- components
- how visuals are generated from data
- why no real images/3D are required
- performance rules
- examples of good/bad visual usage

==================================================
ACCEPTANCE CRITERIA
==================================================

Done when:

1. npm run build passes.
2. npm run validate:data passes if available.
3. Body Position section has lightweight visual aids.
4. AttackerDefenderMiniMap exists.
5. BodyContactDiagram exists.
6. BodyPartBadge exists.
7. ForceDirectionBadge exists.
8. ContactTypeBadge exists.
9. TechniquePhaseStrip exists.
10. SafetySignalBadge exists.
11. No image assets are required.
12. No 3D/canvas/heavy visualization added.
13. UI remains clean and fast.
14. Labels support English, Vietnamese, French.
15. Visual system guide exists.

FINAL RESPONSE:
After implementation, report:
1. Visual components added.
2. Skill Detail integration.
3. Performance impact.
4. i18n labels added.
5. Validation changes.
6. Build result.
7. Validation result.