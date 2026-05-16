import json, re, sys

with open('content/bjj_tips_videos.json') as f:
    data = json.load(f)

def get_youtube_id(url):
    match = re.search(r'(?:v=|youtu.be/)([A-Za-z0-9_-]{11})', url)
    return match.group(1) if match else None

def is_nogi(v):
    t = (v['technique'] + ' ' + v['summary']).lower()
    for ex in [' gi ', 'kimono', 'gi-']:
        if ex in t:
            return False
    return True

nogi = [v for v in data if is_nogi(v)]
vid_map = {}
for v in nogi:
    yid = get_youtube_id(v['url'])
    if yid:
        vid_map[yid] = v

# Entity mappings
entries = {
    '-DqcPZC0ot8': {'skills': [], 'positions': ['inverted-guard'], 'concepts': []},
    '3N4U8cMhe9o': {'skills': [], 'positions': ['half-guard-top'], 'concepts': []},
    '4Gu-saCVaIw': {'skills': [], 'positions': ['x-guard-position'], 'concepts': []},
    '5PKH23u2VCU': {'skills': ['closed-guard-posture-control'], 'positions': ['closed-guard'], 'concepts': []},
    '8XqIZtf1FPw': {'skills': [], 'positions': [], 'concepts': ['guard-retention-layers']},
    '9UMwy8V73j4': {'skills': [], 'positions': ['north-south', 'mount-bottom'], 'concepts': []},
    '9uif3bYkp-Y': {'skills': [], 'positions': ['open-guard'], 'concepts': []},
    'AjzkgEu56iM': {'skills': [], 'positions': ['single-leg-x'], 'concepts': []},
    'AvFyUEyAUzg': {'skills': [], 'positions': ['reverse-de-la-riva-guard'], 'concepts': []},
    'DCcS3ZQpbcg': {'skills': [], 'positions': ['seated-guard'], 'concepts': []},
    'JX0HL0WpYPs': {'skills': [], 'positions': ['turtle-bottom'], 'concepts': []},
    'KBkvMx3AZw8': {'skills': [], 'positions': ['z-guard'], 'concepts': []},
    'L9qBeASwpc0': {'skills': [], 'positions': ['double-leg-position'], 'concepts': []},
    'LQRODuZFNmQ': {'skills': [], 'positions': ['seated-guard', 'double-leg-position'], 'concepts': []},
    'LkGccU4EtRw': {'skills': [], 'positions': ['knee-on-belly'], 'concepts': []},
    'MONQSzrOKe4': {'skills': [], 'positions': ['turtle-top'], 'concepts': []},
    'OzBixEWeeeU': {'skills': [], 'positions': ['single-leg-position'], 'concepts': []},
    'QRD3lfwntUY': {'skills': [], 'positions': [], 'concepts': ['inside-position']},
    'Qjuw8t2vY2Q': {'skills': [], 'positions': ['reverse-de-la-riva-guard', 'z-guard'], 'concepts': []},
    'RQf5WZNLmEA': {'skills': [], 'positions': ['half-guard-top'], 'concepts': []},
    'SFbOWDR-Hh0': {'skills': [], 'positions': ['body-lock-position'], 'concepts': []},
    'SPXanCnoBYA': {'skills': [], 'positions': ['seated-guard', 'north-south'], 'concepts': []},
    'SsllJSWsyJc': {'skills': [], 'positions': [], 'concepts': ['head-position', 'frames']},
    'ThY6GlySyKs': {'skills': ['half-guard-wrestle-up'], 'positions': [], 'concepts': []},
    'URGwWYwdoAs': {'skills': [], 'positions': [], 'concepts': ['guard-retention-layers']},
    'VlZYyHyONZo': {'skills': [], 'positions': ['knee-on-belly', 'mount-bottom'], 'concepts': []},
    'WdAoGOpkBzw': {'skills': [], 'positions': ['single-leg-position'], 'concepts': []},
    'XrTTVy4-s0k': {'skills': ['closed-guard-posture-control'], 'positions': ['closed-guard'], 'concepts': []},
    'YiQG_A7BiEE': {'skills': [], 'positions': [], 'concepts': ['inside-position']},
    '_4jDUxFg7uU': {'skills': [], 'positions': ['de-la-riva-guard'], 'concepts': []},
    '_g9jJGdqqkU': {'skills': [], 'positions': ['turtle-bottom'], 'concepts': []},
    'aXOMnatOGlo': {'skills': [], 'positions': ['de-la-riva-guard'], 'concepts': []},
    'kM7qMtjI27E': {'skills': [], 'positions': ['body-lock-position'], 'concepts': []},
    'l3iBO4oth04': {'skills': [], 'positions': ['single-leg-x'], 'concepts': []},
    'lGtppMMNZBs': {'skills': [], 'positions': ['turtle-top'], 'concepts': []},
    'lY8JZMAm1N4': {'skills': [], 'positions': ['inverted-guard'], 'concepts': []},
    'mpMCrfKZOnw': {'skills': ['closed-guard-posture-control'], 'positions': ['closed-guard'], 'concepts': []},
    'o4jrNmJvYB8': {'skills': [], 'positions': ['open-guard'], 'concepts': []},
    'rPTGYe4I6wI': {'skills': ['half-guard-wrestle-up'], 'positions': [], 'concepts': []},
    'snhFjLacFcY': {'skills': [], 'positions': ['x-guard-position'], 'concepts': []},
    'tu3F0O5WL64': {'skills': [], 'positions': [], 'concepts': ['head-position', 'base-balance']},
    'xYyy333LFK0': {'skills': [], 'positions': ['closed-guard'], 'concepts': []},
    'zkHD4dfBMiE': {'skills': [], 'positions': ['neutral-standing'], 'concepts': []},
}

def make_entry_id(ch_name, yid):
    parts = ch_name.lower().replace("'", "").replace("&", "").replace("@", "").split()
    name_part = parts[0] if parts else 'vid'
    name_part = ''.join(c for c in name_part if c.isalnum())
    suffix = yid[:6].replace('-', '_')
    return 'bjj-' + name_part + '-' + suffix

def make_tags(technique, entities):
    words = technique.lower().split()[:5]
    tags = []
    stop_words = {'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'any', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'has', 'have', 'been', 'some', 'them', 'than', 'that', 'this', 'very', 'just', 'with', 'from', 'they', 'what', 'when', 'make', 'know', 'will', 'into', 'your', 'more', 'then', 'also', 'other', 'their', 'about', 'would', 'which', 'how', 'why', 'his', 'its', 'who'}
    for w in words:
        w = w.strip('.,!?;:\'\"()[]#0123456789')
        if len(w) > 2 and w not in stop_words and not w.startswith('#'):
            tags.append(w)
    for e in entities['skills'] + entities['positions']:
        tags.append(e.replace('-', ' '))
    return list(set(tags))[:6]

for yid, entities in entries.items():
    v = vid_map.get(yid)
    if not v:
        continue
    
    ch_name = v['source_name']
    technique = v['technique']
    entry_id = make_entry_id(ch_name, yid)
    
    title_en = technique.replace("&#x27;", "'").replace("&#39;", "'").replace("&amp;", "&").replace("&#x2019;", "'")
    ch_first = ch_name.split()[0] if ch_name.split() else ch_name
    simple_title = title_en[:60] + ('...' if len(title_en) > 60 else '')
    
    tags = make_tags(technique, entities)
    relevance = 'safety_reference' if any(w in technique.lower() for w in ['safety', 'injury', 'protect', 'danger']) else 'supplemental'
    level = 'advanced' if any(w in technique.lower() for w in ['advanced', 'expert', 'master']) else ('beginner' if any(w in technique.lower() for w in ['beginner', 'basic', 'fundamental']) else 'intermediate')
    
    skill_ids = entities['skills']
    pos_ids = entities['positions']
    conc_ids = entities['concepts']
    
    sys.stdout.write('  {\n')
    sys.stdout.write(f'    "id": "{entry_id}",\n')
    sys.stdout.write(f'    "provider": "youtube",\n')
    sys.stdout.write(f'    "title": {{\n')
    sys.stdout.write(f'      "en": "{title_en}",\n')
    sys.stdout.write(f'      "vi": "{title_en} (phân tích)",\n')
    sys.stdout.write(f'      "fr": "{title_en} (analyse)"\n')
    sys.stdout.write(f'    }},\n')
    sys.stdout.write(f'    "channelName": "{ch_name}",\n')
    sys.stdout.write(f'    "url": "https://www.youtube.com/watch?v={yid}",\n')
    sys.stdout.write(f'    "embedUrl": "https://www.youtube.com/embed/{yid}",\n')
    sys.stdout.write(f'    "youtubeId": "{yid}",\n')
    sys.stdout.write(f'    "language": "en",\n')
    sys.stdout.write(f'    "relatedSkillIds": [{", ".join(f"\"{s}\"" for s in skill_ids)}],\n' if skill_ids else '    "relatedSkillIds": [],\n')
    if pos_ids:
        sys.stdout.write(f'    "relatedPositionIds": [{", ".join(f"\"{p}\"" for p in pos_ids)}],\n')
    if conc_ids:
        sys.stdout.write(f'    "relatedConceptIds": [{", ".join(f"\"{c}\"" for c in conc_ids)}],\n')
    sys.stdout.write(f'    "techniqueTags": [{", ".join(f"\"{t}\"" for t in tags)}],\n')
    sys.stdout.write(f'    "relevance": "{relevance}",\n')
    sys.stdout.write(f'    "level": "{level}",\n')
    sys.stdout.write(f'    "whyUseful": {{\n')
    sys.stdout.write(f'      "en": "{ch_first} provides a detailed breakdown of {simple_title} with practical No-Gi applications.",\n')
    sys.stdout.write(f'      "vi": "{ch_first} cung cấp phân tích chi tiết về {simple_title} với ứng dụng No-Gi thực tế.",\n')
    sys.stdout.write(f'      "fr": "{ch_first} fournit une analyse détaillée de {simple_title} avec des applications No-Gi pratiques."\n')
    sys.stdout.write(f'    }},\n')
    sys.stdout.write(f'    "whatToWatchFor": {{\n')
    sys.stdout.write(f'      "en": [\n')
    sys.stdout.write(f'        "Key positional details and grips",\n')
    sys.stdout.write(f'        "Weight distribution and base",\n')
    sys.stdout.write(f'        "Common mistakes to avoid",\n')
    sys.stdout.write(f'        "Transition and finishing details"\n')
    sys.stdout.write(f'      ],\n')
    sys.stdout.write(f'      "vi": [\n')
    sys.stdout.write(f'        "Chi tiết về vị trí và grip quan trọng",\n')
    sys.stdout.write(f'        "Phân bổ trọng lượng và base",\n')
    sys.stdout.write(f'        "Lỗi thường gặp cần tránh",\n')
    sys.stdout.write(f'        "Chi tiết về transition và finish"\n')
    sys.stdout.write(f'      ],\n')
    sys.stdout.write(f'      "fr": [\n')
    sys.stdout.write(f'        "Détails clés de position et grips",\n')
    sys.stdout.write(f'        "Distribution du poids et base",\n')
    sys.stdout.write(f'        "Erreurs courantes à éviter",\n')
    sys.stdout.write(f'        "Détails de transition et finition"\n')
    sys.stdout.write(f'      ]\n')
    sys.stdout.write(f'    }},\n')
    sys.stdout.write(f'    "sourceNote": "Curated from bjj.tips public YouTube listings."\n')
    sys.stdout.write('  },\n')
