# Video Curation Guide

Video references are supplemental. NoGi Mind remains data-first: System Logic, Body Position, Money Details, Outcomes & Branches, Fix It Fast, Safety, and Next Step are the primary teaching surface.

## Rules

- Use public YouTube URLs only.
- Prefer official/public channels, public instructional clips, safety explanations, and high-quality competition examples.
- Avoid pirated course footage, paid instructional reuploads, private/unlisted videos, copied descriptions, and transcripts.
- Write original `whyUseful` and `whatToWatchFor` notes.
- Add timestamps manually after review.
- Keep each skill to 1-3 strong references.

## Manual Search Queries

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

Guillotine:
- no gi guillotine choke details
- guillotine chin strap no gi
- high wrist guillotine no gi

Arm Triangle:
- no gi arm triangle details
- arm triangle angle finish no gi

Kimura:
- no gi kimura shoulder line
- kimura trap no gi

Omoplata:
- no gi omoplata details
- omoplata shoulder clamp no gi

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

K-Guard Matrix:
- k guard matrix no gi
- k guard backside entry
- matrix back take grappling

Crab ride:
- crab ride no gi
- crab ride back take
- leg ride crab ride grappling

Wrist ride:
- wrist ride no gi
- wrist ride back take grappling
- dagestani handcuff no gi

Buggy / Gogoplata / Smother:
- buggy choke no gi safety
- gogoplata no gi details
- mount chest compression safety
- no gi smother safety
- compression choke safety grappling

## Candidate Workflow

Run `tsx scripts/collectVideoCandidates.ts` only to create `content/video-candidates.json`.

The script uses `YOUTUBE_API_KEY` if configured. If the key is missing, it writes an empty skipped report and exits successfully. Candidates are never production data until a human reviews the source and manually adds a `VideoReference`.

