#!/usr/bin/env python3
"""
Fix the corrupted videoReferences.ts file:
1. Remove duplicated helper function declarations
2. Extract all unique video entries (dedup by youtubeId)
3. Merge relatedSkillIds for duplicates
4. Write a clean single-export file
"""
import re
import json
from collections import OrderedDict

with open('src/data/videos/videoReferences.ts') as f:
    content = f.read()

# Strategy: extract all video entry objects using regex.
# Each entry starts with {  id: "..." or { id: "..."
# We'll parse them by splitting on youtubeId and reconstructing full objects.

# Find all complete video objects by matching from `{` to the end `}` 
# Better approach: use the fact that entries start with `  {` or `  {  id:`
# and end with `  },` or `  }` 

# Let's first extract the header (imports + lt/la functions)
header_end = 0

# Find the first actual entry start
# Look for 'export const videoReferences' 
match = re.search(r"export const videoReferences", content)
if match:
    # Go past the first `[\n`
    bracket = content.find('[', match.end())
    if bracket >= 0:
        header_end = bracket + 1

# Fallback: find the header by looking for the pattern
if header_end <= 10:
    # Find imports and helper functions
    imports_end = content.find('export const videoReferences')
    if imports_end >= 0:
        header_end = imports_end

header = content[:header_end].strip()
# Remove any trailing `[` that was captured
if header.endswith('['):
    header = header[:-1].strip() + '\n'

# Make sure we have the header right
if 'const lt' not in header:
    header = """import type { VideoReference } from '../../types/video'

// Curated public YouTube references only. Keep this list human-reviewed:
// no transcripts, no pirated course footage, no invented IDs.
const lt = (en: string, vi: string, fr: string) => ({ en, vi, fr })
const la = (en: string[], vi: string[], fr: string[]) => ({ en, vi, fr })

export const videoReferences: VideoReference[] = [
"""

# Now extract all video entries
# Each entry is enclosed in { } and contains provider: 'youtube'
# Let's find all entry blocks by matching from `{` with id: through youtubeId to the matching `}`

# Simpler: just extract everything that looks like a complete object
# Use regex to find objects starting with `{` and ending with `}` 
# that have `id:` and `youtubeId:` fields

entries_data = []  # list of (youtube_id, entry_text)
seen_youtube_ids = set()

# Find all entry blocks - they end with `  },` or `  }`
# Approach: match from `{` to the next `},` or `}` on its own line
entries_pattern = re.compile(r'(\s*\{[\s\S]*?\n\s*\}),?\n')
# But this is greedy - let's use a more targeted approach

# Split by `id: "bjj-` or `id: 'bjj-` to get each generated entry
# For manual entries with `id: 'lachlan-`, handle those separately

# Better: find all complete objects by balancing braces
all_entries = []
i = header_end
while i < len(content):
    # Find opening brace
    brace_idx = content.find('{', i)
    if brace_idx < 0:
        break
    
    # Check if this looks like a video entry (has id and provider)
    snippet = content[brace_idx:brace_idx+200]
    if 'id:' not in snippet or 'youtubeId:' not in snippet:
        i = brace_idx + 1
        continue
    
    # Balance braces to find the full object
    depth = 0
    start = brace_idx
    j = start
    while j < len(content):
        if content[j] == '{':
            depth += 1
        elif content[j] == '}':
            depth -= 1
            if depth == 0:
                # Found complete object
                end = j + 1
                entry = content[start:end].strip()
                
                # Extract youtubeId
                yt_match = re.search(r'youtubeId:\s*["\']([^"\']+)["\']', entry)
                if yt_match:
                    yt_id = yt_match.group(1)
                    all_entries.append((yt_id, entry))
                break
        j += 1
    
    i = j + 1 if j < len(content) else len(content)

# Deduplicate by youtubeId
deduped = OrderedDict()
for yt_id, entry in all_entries:
    if yt_id in deduped:
        # Merge relatedSkillIds and other arrays into the first occurrence
        existing = deduped[yt_id]
        
        # Extract relatedSkillIds from both
        existing_ids = set(re.findall(r'relatedSkillIds:\s*\[([^\]]+)\]', existing)[0].split(', ')) if 'relatedSkillIds:' in existing else set()
        new_ids = set(re.findall(r'relatedSkillIds:\s*\[([^\]]+)\]', entry)[0].split(', ')) if 'relatedSkillIds:' in entry else set()
        merged_ids = existing_ids | new_ids
        
        # Extract relatedPositionIds from both
        existing_pos = set(re.findall(r'relatedPositionIds:\s*\[([^\]]*)\]', existing)[0].split(', ')) if 'relatedPositionIds:' in existing else set()
        new_pos = set(re.findall(r'relatedPositionIds:\s*\[([^\]]*)\]', entry)[0].split(', ')) if 'relatedPositionIds:' in entry else set()
        merged_pos = existing_pos | new_pos
        
        # Extract techniqueTags from both
        existing_tags = set(re.findall(r'techniqueTags:\s*\[([^\]]+)\]', existing)[0].split(', ')) if 'techniqueTags:' in existing else set()
        new_tags = set(re.findall(r'techniqueTags:\s*\[([^\]]+)\]', entry)[0].split(', ')) if 'techniqueTags:' in entry else set()
        merged_tags = existing_tags | new_tags
        
        # Update the existing entry with merged fields
        # Remove empty strings from sets
        merged_ids = {x for x in merged_ids if x and x != ''}
        merged_pos = {x for x in merged_pos if x and x != ''}
        merged_tags = {x for x in merged_tags if x and x != ''}
        
        if merged_ids:
            ids_str = ', '.join(sorted(merged_ids))
            existing = re.sub(r'relatedSkillIds:\s*\[[^\]]*\]', f'relatedSkillIds: [{ids_str}]', existing)
        if merged_pos and merged_pos != {''}:
            pos_str = ', '.join(sorted(merged_pos))
            existing = re.sub(r'relatedPositionIds:\s*\[[^\]]*\]', f'relatedPositionIds: [{pos_str}]', existing)
        if merged_tags:
            tags_str = ', '.join(sorted(merged_tags))
            existing = re.sub(r'techniqueTags:\s*\[[^\]]*\]', f'techniqueTags: [{tags_str}]', existing)
        
        deduped[yt_id] = existing
        print(f"Merged duplicate: {yt_id}")
    else:
        deduped[yt_id] = entry

# Sort by entry id for consistency
def get_entry_id(entry_text):
    match = re.search(r'id:\s*["\']([^"\']+)["\']', entry_text)
    return match.group(1) if match else ''

sorted_entries = sorted(deduped.values(), key=get_entry_id)

# Write clean file
with open('src/data/videos/videoReferences.ts', 'w') as f:
    f.write(header)
    for i, entry in enumerate(sorted_entries):
        if i < len(sorted_entries) - 1:
            f.write(f'  {entry},\n')
        else:
            f.write(f'  {entry},\n')
    f.write(']\n')

print(f"\nFixed file written successfully!")
print(f"Total unique entries: {len(sorted_entries)}")
print(f"Merged duplicates: {len(all_entries) - len(sorted_entries)}")
