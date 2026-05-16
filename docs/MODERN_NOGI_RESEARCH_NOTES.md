# Modern No-Gi Research Notes

This document records the research signals and summaries used to enrich the NoGi Mind technical database.

## Submission Systems

### High-Wrist Guillotine
- **Source**: Public Competition Meta (ADCC)
- **Source Type**: Competition example
- **Short Original Summary**: A variation of the guillotine that uses a high wrist position on the chin strap to eliminate the need for an arm-in or a deep elbow deep grip. Focuses on the "ulna bone" wedge under the throat.
- **Why Relevant**: High success rate in modern elite competition; safer for the attacker's wrist.
- **Human Review Needed**: false

### Japanese Necktie
- **Source**: Various public front headlock tutorials
- **Source Type**: Public video
- **Short Original Summary**: A hybrid between a D'Arce and a front headlock compression. Uses the leg to trap the opponent's hip while applying a cross-neck compression.
- **Why Relevant**: Key part of the modern front headlock system.
- **Human Review Needed**: false

## Guard Systems

### Octopus Guard
- **Source**: Public tutorials / Competition footage (Craig Jones / Eduardo Telles)
- **Source Type**: Public video / Competition example
- **Short Original Summary**: A specialized guard where the attacker gets their head outside the opponent's arm and wraps the far hip. Focuses on back takes and dogfight transitions.
- **Why Relevant**: Highly effective against heavy passers and as a counter to the cross-face.
- **Human Review Needed**: true

## Leg Locks

### Backside 50/50
- **Source**: Modern Leg Lock Meta (Danaher / Giles)
- **Source Type**: Public concept summary
- **Short Original Summary**: A rotational control position where the attacker is behind the opponent's knee line while in a 50/50 configuration. Completely kills the opponent's primary rotation.
- **Why Relevant**: Currently considered the most secure finishing position for heel hooks.
- **Human Review Needed**: false

## BJJ.Tips No-Gi Video Audit

### BJJ.Tips Public YouTube Listings
- **Source**: https://www.youtube.com/ 
- **Source Type**: Public video index / discovery signal
- **Short Original Summary**: public YouTube videos by instructor and position. NoGiMind uses these listings only to discover public references, then filters out Gi-only material and writes original app notes.
- **Why Relevant**: The dataset surfaces strong No-Gi clusters for front headlock, heel hook/leg lock, body lock passing, half guard, K guard, crab ride, octopus, butterfly guard, and wrestling-up systems.
- **Human Review Needed**: true
- **Audit Result**: 1,907 source videos classified as 1,333 keep, 398 manual review, and 176 reject. Production references now keep only 164 strict No-Gi references with 0 Gi-only rejects after filtering.

### Gi-Only Exclusion Pass
- **Source**: Existing `src/data/videos/videoReferences.ts`
- **Source Type**: Internal production data audit
- **Short Original Summary**: Removed production video references whose title/tags depended on lapel, collar, sleeve, lasso, worm guard, bow-and-arrow, collar choke, cross grip, or explicit Gi-only X guard.
- **Why Relevant**: Keeps NoGiMind aligned with a No-Gi learning promise while preserving transferable guard content for manual review.
- **Human Review Needed**: false

### Visual No-Gi Proof Pass
- **Source**: Existing `src/data/videos/videoReferences.ts`
- **Source Type**: Internal production data audit
- **Short Original Summary**: Removed auto-imported BJJ.Tips references unless the title/source clearly says No-Gi, Nogi, ADCC, MMA, wrestling, grappling, or the channel is a trusted No-Gi source attached to a modern No-Gi technique cluster.
- **Why Relevant**: Metadata-only filtering missed videos where athletes visibly wore a Gi but the title did not mention fabric grips. The stricter rule favors fewer, cleaner references over a large mixed Gi/No-Gi library.
- **Human Review Needed**: false

### No-Gi Transferable Guard Review
- **Source**: BJJ.Tips position and instructor listings
- **Source Type**: Public video index / manual review bucket
- **Short Original Summary**: Butterfly, half guard, X guard, reverse De La Riva, closed guard, knee shield, and inverted guard are not automatically rejected because they can be taught with No-Gi mechanics. They remain review-marked unless a strong No-Gi signal is present.
- **Why Relevant**: Prevents over-pruning useful No-Gi guard systems while blocking fabric-dependent grip systems.
- **Human Review Needed**: true

---
*This document is for internal research tracking and is not included in the production build.*
