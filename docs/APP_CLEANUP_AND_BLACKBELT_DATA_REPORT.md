# App Cleanup And Blackbelt Data Report

## What Changed

- Removed visible search score badges from the header suggestions and the unified search page. The score remains internal search ranking data only.
- Added a `bodyToBodyDetails` data layer for precise "my body part -> opponent body part" technique descriptions.
- Added a lightweight `blackbeltDetails` data layer for clamp mechanics, finish tips, pressure details, angle details, and escape prevention notes.
- Added compact Skill Detail UI sections for:
  - Body-to-Body Details
  - Blackbelt Details
- Added MiniSearch indexing for body-to-body and blackbelt fields.
- Added validation coverage counts and schema checks for body-to-body contacts.

## Repetition Reduced

- Generic score/search ranking language is no longer shown to learners.
- Technique pages can now put exact anatomical contact in `bodyToBodyDetails` instead of repeating broad phrases like "apply pressure" or "control the arm."
- Long reusable principles should stay in `sharedKnowledge`; skill pages should now focus on local application.

## Skills Enriched

Body-to-body details were added for:

- Rear Naked Choke System
- Arm Triangle from Mount
- Bodylock Passing
- Heel Hook Safety / Mechanics
- Guillotine System
- Kimura System
- Straight Ankle Lock

Blackbelt details were added for:

- Rear Naked Choke System with full clamp, finish, pressure, and angle details.
- Guillotine System, Arm Triangle, Kimura, Straight Ankle Lock, and Heel Hook Safety with concise blackbelt summary data.

## Remaining Shallow Areas

- Most non-submission/non-priority skills still need full body-to-body phases.
- Blackbelt detail arrays are still light for several skills beyond RNC.
- The main bundle remains large because the app still imports a broad local knowledge corpus and some graph/data utilities eagerly.

## Known Limitations

- Body-to-body UI is text-based; it intentionally avoids heavy visualization.
- MiniSearch ranking scores remain internal because they are useful for ordering, but they are no longer displayed to users.
- Further dedupe should happen gradually while enriching each domain.
