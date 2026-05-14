#!/usr/bin/env python3
"""
Fetch actual YouTube channel names via oEmbed API for all position-sourced
video entries, then regenerate videoReferences.ts with correct channel names.

Usage: python3 scripts/fetch_channel_names.py
"""

import json
import re
import time
import urllib.request
import os
from collections import OrderedDict

# ─── Configuration ──────────────────────────────────────────────────────────────

CACHE_FILE = 'content/yt_channel_cache.json'
OUTPUT_FILE = 'src/data/videos/videoReferences.ts'

# ─── Helper: extract YouTube ID ────────────────────────────────────────────────

def extract_youtube_id(url: str) -> str | None:
    """Extract YouTube video ID from various URL formats."""
    if not url:
        return None
    # youtube.com/watch?v=XXXXX
    match = re.search(r'(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/|youtube\.com/shorts/)([a-zA-Z0-9_-]{11})', url)
    if match:
        return match.group(1)
    return None


def load_cache() -> dict:
    """Load the channel name cache from disk."""
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE) as f:
            return json.load(f)
    return {}


def save_cache(cache: dict) -> None:
    """Save the channel name cache to disk."""
    with open(CACHE_FILE, 'w') as f:
        json.dump(cache, f, indent=2)
    print(f'Cache saved to {CACHE_FILE} ({len(cache)} entries)')


def fetch_channel_name(yt_id: str, cache: dict) -> str | None:
    """Fetch channel name from YouTube oEmbed API, with caching."""
    if yt_id in cache:
        return cache[yt_id]

    url = f'https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={yt_id}&format=json'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (compatible; Codebuff/1.0)'})
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read())
            channel_name = data.get('author_name')
            if channel_name:
                cache[yt_id] = channel_name
                return channel_name
    except urllib.error.HTTPError as e:
        if e.code == 404:
            cache[yt_id] = None  # Cache as not found
        else:
            print(f'  HTTP error {e.code} for {yt_id}: {e}')
    except Exception as e:
        print(f'  Error fetching {yt_id}: {e}')

    return None


# ─── Main ──────────────────────────────────────────────────────────────────────

def main():
    print('=' * 60)
    print('Fixing channel names for position-sourced video entries')
    print('=' * 60)

    # Load cache
    cache = load_cache()
    print(f'Loaded {len(cache)} cached channel names')

    # Read the scraped data
    with open('content/bjj_tips_videos.json') as f:
        all_videos = json.load(f)

    position_videos = [v for v in all_videos if v['source_type'] == 'positions']
    print(f'Position-sourced entries: {len(position_videos)}')

    # Build unique YouTube IDs
    unique_yt_ids = set()
    url_to_entry = {}
    for v in position_videos:
        yt_id = extract_youtube_id(v['url'])
        if yt_id:
            unique_yt_ids.add(yt_id)
            url_to_entry.setdefault(yt_id, v)  # Keep first occurrence

    print(f'Unique YouTube IDs to look up: {len(unique_yt_ids)}')
    print()

    # Also collect instructor-sourced channel names as fallback
    instructor_channel_map = {}
    for v in all_videos:
        if v['source_type'] == 'instructors':
            yt_id = extract_youtube_id(v['url'])
            if yt_id and yt_id not in instructor_channel_map:
                instructor_channel_map[yt_id] = v['source_name']

    print(f'Instructor-sourced YouTube IDs available: {len(instructor_channel_map)}')

    # Fetch channel names
    url_to_channel = {}
    newly_fetched = 0
    cached_hits = 0
    instructor_matched = 0

    for i, yt_id in enumerate(sorted(unique_yt_ids)):
        # Check instructor map first
        if yt_id in instructor_channel_map:
            url_to_channel[yt_id] = instructor_channel_map[yt_id]
            instructor_matched += 1
            continue

        # Check cache
        if yt_id in cache and cache[yt_id] is not None:
            url_to_channel[yt_id] = cache[yt_id]
            cached_hits += 1
            continue
        elif yt_id in cache and cache[yt_id] is None:
            # Previously not found, skip
            continue

        # Fetch from oEmbed API
        channel = fetch_channel_name(yt_id, cache)
        if channel:
            url_to_channel[yt_id] = channel
            newly_fetched += 1
            print(f'  [{i+1}/{len(unique_yt_ids)}] {yt_id} -> {channel}')
        else:
            print(f'  [{i+1}/{len(unique_yt_ids)}] {yt_id} -> NOT FOUND')

        # Rate limiting - be respectful to YouTube
        if newly_fetched % 20 == 0 and newly_fetched > 0:
            print(f'  ... sleeping for 1 second ...')
            time.sleep(1)

    # Save cache
    save_cache(cache)

    print()
    print(f'Results:')
    print(f'  From instructor map: {instructor_matched}')
    print(f'  From oEmbed (new): {newly_fetched}')
    print(f'  From cache: {cached_hits}')
    print(f'  Total resolved: {len(url_to_channel)}')
    print(f'  Unresolved: {len(unique_yt_ids) - len(url_to_channel)}')

    # Now read the current videoReferences.ts and update channel names
    print()
    print('=' * 60)
    print('Updating videoReferences.ts with correct channel names')
    print('=' * 60)

    with open(OUTPUT_FILE) as f:
        content = f.read()

    # Find all position-like channel names
    position_keywords = [
        'Half Guard', 'Side Control', 'Back Control', 'Butterfly Guard',
        'Octopus Guard', 'Crab Ride', 'Mount', 'Open Guard', 'K Guard',
        'De La Riva Guard', 'Front Headlock', 'X Guard', 'Turtle',
        'Closed Guard', 'Knee On Belly', 'Z Guard'
    ]

    entries_with_position_channels = []
    for kw in position_keywords:
        pattern = f'channelName: "{kw}"'
        matches = re.findall(pattern, content)
        entries_with_position_channels.append((kw, len(matches)))

    changes_made = 0
    unchanged = 0
    not_found = 0

    # For each position-like channel name, find its YouTube URL and look up the real channel
    # We need to find channelName and youtubeId/url pairs in the file
    # Pattern: an entry block looks like:
    #   {
    #     id: '...',
    #     ...
    #     channelName: "Half Guard",
    #     ...
    #     youtubeId: "XXXXXXXXXXX",
    #     url: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
    #     ...
    #   }

    # Find all entries with position-like channel names
    for position_name, count in entries_with_position_channels:
        if count == 0:
            continue

        # Find entries with this channel name
        entries_found = 0
        for match in re.finditer(r'\{\s*\n\s*id:\s*"([^"]+)"', content):
            # Get the entry start
            entry_start = match.start()
            entry_id = match.group(1)

            # Find the end of this entry
            brace_count = 1
            entry_end = -1
            for j in range(match.end(), len(content)):
                if content[j] == '{':
                    brace_count += 1
                elif content[j] == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        entry_end = j
                        break

            if entry_end == -1:
                continue

            entry_text = content[entry_start:entry_end + 1]

            # Check if this entry has the position channel name
            if f'channelName: "{position_name}"' in entry_text:
                # Extract youtubeId
                yt_match = re.search(r'youtubeId:\s*"([^"]+)"', entry_text)
                if yt_match:
                    yt_id = yt_match.group(1)
                    if yt_id in url_to_channel:
                        real_channel = url_to_channel[yt_id]
                        # Replace channelName
                        old = f'channelName: "{position_name}"'
                        new = f'channelName: "{real_channel}"'
                        content = content.replace(old, new, 1)
                        changes_made += 1
                        entries_found += 1
                    else:
                        not_found += 1
                else:
                    not_found += 1

    with open(OUTPUT_FILE, 'w') as f:
        f.write(content)

    print(f'Changes made: {changes_made}')
    print(f'Not found (no YouTube ID mapping): {not_found}')
    print(f'Updated file: {OUTPUT_FILE}')


if __name__ == '__main__':
    main()
