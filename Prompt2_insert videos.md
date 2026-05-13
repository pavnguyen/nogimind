You are working on the existing NoGi Mind app.

Goal:
Add an optional public YouTube video reference layer to NoGi Mind, while keeping the app clean, fast, technical, and original.

The app should remain data-first and technique-first.
Videos are supplemental references only.

Important:
- Do NOT make video the main learning source.
- Do NOT copy YouTube transcripts.
- Do NOT scrape or download videos.
- Do NOT upload videos.
- Do NOT add backend.
- Do NOT require auth.
- Do NOT add payment.
- Do NOT add social features.
- Do NOT add 3D.
- Do NOT add SQLite.
- Keep TypeScript + Vite.
- Keep English / Vietnamese / French.
- English remains default.
- Keep language persistence.
- Keep npm run build passing.
- Keep npm run validate:data passing if available.
- Keep npm run validate:search passing if available.
- No TODO placeholders.
- No shallow filler.
- No copyrighted transcript copying.
- Only embed public YouTube videos using normal YouTube embed URLs.

==================================================
MAIN PRODUCT PRINCIPLE
==================================================

NoGi Mind’s core teaching remains:

1. System Logic
2. Body Position
3. Money Details
4. Outcomes & Branches
5. Fix It Fast
6. Safety
7. Next Step

Add:

Video References

But only when useful.

Video References should support learning by showing public external examples, not replace NoGi Mind’s structured data.

Do not let the app become a random YouTube playlist.

==================================================
VIDEO REFERENCE MODEL
==================================================

Create a typed video reference model.

Create or update:

src/types/video.ts

Suggested type:

type VideoProvider = "youtube";

type VideoTimestamp = {
  id: string;
  label: LocalizedText;
  timeSeconds: number;
  note?: LocalizedText;
  relatedSection?:
    | "system_logic"
    | "body_position"
    | "money_details"
    | "outcomes_branches"
    | "fix_it_fast"
    | "safety";
};

type VideoReference = {
  id: string;
  provider: VideoProvider;

  title: LocalizedText;
  channelName: string;

  url: string;
  embedUrl: string;
  youtubeId: string;

  language?: "en" | "vi" | "fr" | "unknown";

  relatedSkillIds: string[];
  relatedPositionIds?: string[];
  relatedConceptIds?: string[];
  relatedGlossaryIds?: string[];

  techniqueTags: string[];

  relevance:
    | "primary_reference"
    | "supplemental"
    | "competition_example"
    | "conceptual"
    | "safety_reference";

  level:
    | "beginner"
    | "intermediate"
    | "advanced"
    | "blackbelt";

  timestamps?: VideoTimestamp[];

  whyUseful: LocalizedText;
  whatToWatchFor: LocalizedStringArray;
  caution?: LocalizedText;

  sourceNote?: string;
};

Rules:
- youtubeId must be extracted from URL.
- embedUrl must be:
  https://www.youtube.com/embed/{youtubeId}
- Do not use iframe until user clicks play or expands video.
- Do not auto-play.
- Do not load all embeds on page load.

==================================================
DATA STRUCTURE
==================================================

Create:

src/data/videos/
  index.ts
  videoReferences.ts
  videoSelectors.ts

videoReferences.ts:
- stores curated video metadata
- no transcript text
- no copied long descriptions

videoSelectors.ts:
Functions:
- getVideosForSkill(skillId)
- getVideosForPosition(positionId)
- getVideosForConcept(conceptId)
- getPrimaryVideoForSkill(skillId)
- getSupplementalVideosForSkill(skillId)
- getVideosByTag(tag)
- getVideosByLanguage(language)

==================================================
VIDEO CURATION RULES
==================================================

Curate videos carefully.

Allowed:
- public YouTube videos
- official public channel uploads
- public instructional clips
- public competition breakdowns if suitable
- public technique demonstrations
- public safety explanations

Not allowed:
- pirated course footage
- paid instructional reuploads
- copied transcript
- copyrighted long descriptions copied into app
- misleading “official” claims
- private/unlisted videos unless explicitly owned/allowed
- embedding random low-quality videos just to fill content

Every video should have:
- clear related skill
- whyUseful
- whatToWatchFor
- relevance
- level
- optional timestamps

Prefer 1–3 best videos per skill.
Do not overload.

==================================================
VIDEO REFERENCES UI
==================================================

Create:

src/components/video/
  VideoReferenceSection.tsx
  VideoReferenceCard.tsx
  LazyYouTubeEmbed.tsx
  VideoTimestampList.tsx

Add to Skill Detail:

Video References

Placement:
After Safety if present.
Before Next Step.

Only render if videos exist for skill.

Localized title:
en: Video References
vi: Video tham khảo
fr: Références vidéo

Section behavior:
- collapsed by default or compact by default
- show video cards
- user clicks to load iframe
- no autoplay
- show channel name
- show whyUseful
- show whatToWatchFor
- show timestamps if available
- show external content note

Video card should show:
- title
- channelName
- relevance badge
- level badge
- what to watch for
- button:
  en: Watch
  vi: Xem
  fr: Regarder

External note:
en: External public YouTube reference. NoGi Mind does not own this video.
vi: Video YouTube public bên ngoài. NoGi Mind không sở hữu video này.
fr: Référence YouTube publique externe. NoGi Mind ne possède pas cette vidéo.

==================================================
LAZY EMBED PERFORMANCE
==================================================

Do not load iframe immediately.

LazyYouTubeEmbed should:
- render thumbnail or simple placeholder first
- load iframe only after click
- not autoplay
- use loading="lazy"
- use title attribute
- use sandbox/referrer policy if appropriate
- keep layout stable

Example embed:
https://www.youtube.com/embed/{youtubeId}

Do not import heavy video libraries.

==================================================
SEARCH INTEGRATION
==================================================

Search should index video references lightly.

Index:
- video title
- channel name
- related skill titles
- technique tags
- whyUseful
- whatToWatchFor
- timestamps labels

Do NOT index transcripts.

Search result type:
video_reference

Search result actions:
- Open related skill
- Jump to Video References section

Search examples:
- rnc video
- armbar youtube
- triangle reference
- bodylock passing video
- heel hook safety video
- video siết cổ sau
- video armbar
- vidéo triangle

==================================================
VALIDATION
==================================================

Update validate:data.

Validate video references:

Fail for:
- duplicate video IDs
- missing youtubeId
- invalid YouTube URL
- embedUrl not matching youtubeId
- relatedSkillIds that do not exist
- missing title en/vi/fr
- missing whyUseful en/vi/fr
- missing whatToWatchFor en/vi/fr
- empty channelName
- video without related skill/position/concept
- transcript-like long copied content if detectable

Warn for:
- more than 3 primary/supplemental videos for one skill
- video has no timestamps
- video has unknown language
- video title too generic
- safety-critical skill has no safety video reference
- video URL unavailable cannot be checked offline

==================================================
OPTIONAL PUBLIC VIDEO COLLECTION WORKFLOW
==================================================

If internet/search tools are available in the development environment, create a helper script:

scripts/collectVideoCandidates.ts

Purpose:
Generate a candidate list only.
Do not automatically add to live videoReferences.ts.

Output:
content/video-candidates.json

Candidate fields:
- query
- title
- channel
- url
- youtubeId
- relatedSkillGuess
- reason
- needsHumanReview: true

Important:
- Candidates must be human-reviewed before becoming live app data.
- Do not add candidates directly to production data.
- Do not require API key unless explicitly configured.
- If no API key is available, skip script gracefully.

If YouTube Data API is used:
- read API key from environment variable only:
  YOUTUBE_API_KEY
- never commit API keys
- never fail build if API key missing

==================================================
CURATION QUERIES TO DOCUMENT
==================================================

Create:

docs/VIDEO_CURATION_GUIDE.md

Include suggested manual YouTube search queries for each skill.

Examples:

RNC:
- no gi rear naked choke details
- rear naked choke hand fighting no gi
- back control rnc no gi

Armbar:
- no gi armbar from mount details
- s mount armbar no gi
- armbar elbow line no gi

Triangle:
- no gi triangle choke angle
- triangle choke posture control no gi

Bodylock passing:
- no gi body lock pass
- bodylock pass butterfly hook no gi
- body lock passing hip control

Heel hook safety:
- heel hook safety knee line
- no gi leg lock safety
- heel hook defense knee line

Octopus:
- octopus guard no gi
- octopus guard back take
- octopus guard dogfight

Clamp guard:
- clamp guard no gi
- shoulder crunch guard no gi
- overhook guard triangle no gi

False reap:
- false reap no gi
- false reap safety
- k guard false reap

Crab ride:
- crab ride no gi
- crab ride back take
- leg ride crab ride grappling

Smother:
- mount chest compression safety
- no gi smother safety
- compression choke safety grappling

Guide should explain:
- prefer official/public sources
- avoid pirated instructionals
- add timestamps manually
- write original notes
- do not copy transcript
- keep max 1–3 videos per skill

==================================================
PRIORITY VIDEO REFERENCES
==================================================

Add videoReferences only if good public URLs are already available in /content or existing data.

Do not invent fake YouTube IDs.

If /content contains video URLs:
- parse them
- validate them
- link to related skills
- add VideoReference objects

Priority skills:
1. RNC
2. Armbar
3. Triangle
4. Guillotine
5. Arm Triangle
6. Kimura
7. Omoplata
8. Heel Hook Safety
9. Back Control
10. Bodylock Passing
11. Knee Cut Passing
12. Side Control Escape
13. Octopus Guard
14. Clamp Guard
15. Shoulder Crunch
16. S-Mount Armbar
17. False Reap
18. K-Guard Matrix
19. Crab Ride
20. Wrist Ride
21. Buggy Choke
22. Gogoplata
23. Choi Bar
24. Tarikoplata
25. Smother Safety

==================================================
SKILL DETAIL INTEGRATION
==================================================

Update Skill Detail structure:

1. System Logic
2. Body Position
3. Money Details
4. Outcomes & Branches
5. Fix It Fast
6. Safety if relevant
7. Video References if available
8. Next Step

Video References should not disrupt the core learning flow.

If no video exists:
- do not show empty section

==================================================
I18N LABELS
==================================================

Add en/vi/fr labels:

Video References:
en: Video References
vi: Video tham khảo
fr: Références vidéo

Watch:
en: Watch
vi: Xem
fr: Regarder

What to watch for:
en: What to watch for
vi: Cần chú ý điều gì
fr: Ce qu’il faut observer

Timestamps:
en: Timestamps
vi: Mốc thời gian
fr: Horodatage

External video:
en: External video
vi: Video bên ngoài
fr: Vidéo externe

Public YouTube reference:
en: Public YouTube reference
vi: Tham khảo YouTube public
fr: Référence YouTube publique

==================================================
PERFORMANCE
==================================================

Requirements:
- Do not load iframes until clicked.
- Do not load video components on routes that do not need them if easy.
- Keep VideoReferenceSection collapsed or compact.
- Do not increase initial bundle significantly.
- No heavy video dependency.
- Keep MiniSearch cached per language.
- Keep build optimized.

==================================================
DOCUMENTATION
==================================================

Create/update:

docs/VIDEO_CURATION_GUIDE.md
docs/VIDEO_REFERENCE_MODEL.md
docs/REFACTOR_REPORT.md

VIDEO_REFERENCE_MODEL should explain:
- data type
- how to add a video
- how to link to skill
- how timestamps work
- legal/content policy
- performance rules
- validation rules

==================================================
ACCEPTANCE CRITERIA
==================================================

Done when:

1. npm run build passes.
2. npm run validate:data passes if available.
3. npm run validate:search passes if available.
4. VideoReference type exists.
5. Video data registry exists.
6. Skill Detail shows Video References only when videos exist.
7. YouTube embeds are lazy-loaded only after click.
8. Search can find video references.
9. Validation checks video references.
10. Docs explain curation rules.
11. No fake YouTube IDs.
12. No transcripts copied.
13. No pirated content added.
14. No backend/auth/payment/social/video upload/3D/SQLite added.

==================================================
FINAL RESPONSE
==================================================

After implementation, respond with:

1. Video reference model summary.
2. Files created/changed.
3. Video references added from existing /content if any.
4. Skill Detail integration.
5. Search integration.
6. Validation updates.
7. Performance notes.
8. Build result.
9. Validation result.
10. Recommended next manual curation batch.