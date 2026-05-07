# Data Model Guide

## Adding A Skill

Add a skill as a `SkillNode` with localized `en`, `vi`, and `fr` fields. Every serious skill should include:

- `quickCard`
- `microDetailSystem`
- `bodyToBodyDetails`
- `qualityChecklist`
- `blackbeltDetails` when clamp, pressure, angle, or finish mechanics matter
- prerequisites and related skill ids
- safety notes for leg locks, neck attacks, shoulder locks, smothers, compression, and uncontrolled scrambles

## Micro Details

Use short coaching language. A micro-detail should answer:

- what body part acts
- which side or line it controls
- what direction force goes
- what mistake kills the detail
- what cue fixes it live

## Body-To-Body Details

Write contacts as:

`My [side] [body part] -> opponent's [side] [body part]`

Examples:

- My right hand pulls the opponent's left wrist across centerline.
- My left foot posts on the opponent's right hip.
- My right knee wedges against the opponent's left shoulder.

Each contact should include contact type, force direction, timing, exact instruction, why it works, common misplacement, correction cue, and live cue.

## Glossary

Glossary terms should define reusable language. Do not repeat full definitions inside every skill page. Link skills and micro-details back to glossary terms where helpful.

## Validation

Run:

```bash
npm run validate:data
```

Validation checks localized fields, duplicate ids, broken references, micro-detail counts, quick-card cue counts, checklist depth, body-to-body roles, and safety coverage.
