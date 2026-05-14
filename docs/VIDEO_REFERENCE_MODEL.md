# Video Reference Model

Video references live in `src/data/videos/videoReferences.ts` and use the `VideoReference` type from `src/types/video.ts`.

## Data Type

Each reference stores public YouTube metadata only: title, channel, URL, embed URL, YouTube ID, related skill/concept/position links, relevance, level, original notes, and optional timestamps.

No transcripts, scraped descriptions, downloaded videos, or copied long text belong in this model.

## Adding A Video

1. Confirm the video is public and appropriate.
2. Extract the YouTube ID from the URL.
3. Set `embedUrl` to `https://www.youtube.com/embed/{youtubeId}`.
4. Link at least one `relatedSkillIds`, `relatedPositionIds`, or `relatedConceptIds`.
5. Write original `whyUseful` and `whatToWatchFor` in English, Vietnamese, and French.
6. Add concise timestamps only when they help a learner inspect a moment.

## Timestamps

Timestamps are short markers with a label, time in seconds, optional note, and optional section link such as `body_position`, `money_details`, or `safety`.

They are not transcript snippets.

## UI And Performance

Skill Detail shows Video References after Safety and before Next Step, only when reviewed videos exist for the skill.

Embeds are lazy:
- no iframe loads on initial render
- no autoplay
- thumbnail/placeholder first
- iframe loads only after the user clicks Watch

## Validation

`npm run validate:data` checks video IDs, YouTube URL shape, embed URL shape, localized fields, linked IDs, empty channels, duplicate IDs, and transcript-like long content.

Warnings cover missing timestamps, unknown language, generic titles, too many videos for one skill, and safety-critical skills without a safety video reference.

