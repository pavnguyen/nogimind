# NoGi Mind App Architecture

NoGi Mind is a client-only React, TypeScript, Vite knowledge app for modern no-gi grappling. The product is organized around a body-to-body coordinate system first, then micro-details, quality checks, glossary terms, chains, escape maps, and search.

## Routes

- `/` overview dashboard
- `/learn` guided learning paths
- `/skills` skill library and filters
- `/skills/:skillId` skill detail
- `/positions` and `/positions/:positionId`
- `/concepts` and `/concepts/:conceptId`
- `/micro-details`
- `/chains`
- `/escape-maps`
- `/troubleshooters`
- `/glossary`
- `/search`
- `/game-tree`
- `/archetypes`
- `/mastery`
- `/settings`
- `/philosophy`

## Data Flow

Static local data lives in `src/data`. Query wrappers in `src/queries` expose that data to pages. The skill model centers on:

- `quickCard` for gym-friendly recall
- `microDetailSystem` for exact cues
- `bodyToBodyDetails` for my body part to opponent body part contact
- `qualityChecklist` for readiness checks
- `blackbeltDetails` for clamp, pressure, angle, and finishing mechanics

## Components

Pages use compact cards and progressive disclosure. Skill Detail shows quick practical coaching first, then progressively deeper technical layers.

## I18n

The app supports `en`, `vi`, and `fr`. English is the default. The selected language is stored in `localStorage` under `nogi_language`.

## Search

Unified search is client-side with MiniSearch. The index is cached per language and includes skills, micro-details, body-to-body details, blackbelt details, glossary, concepts, positions, chains, troubleshooters, escape maps, and safety notes.
