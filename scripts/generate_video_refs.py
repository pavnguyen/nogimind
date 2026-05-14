#!/usr/bin/env python3
"""Generate TypeScript VideoReference entries from scraped bjj.tips data."""

import json
import re
from collections import defaultdict
from urllib.parse import urlparse, parse_qs

# Load scraped videos
with open('content/bjj_tips_videos.json') as f:
    data = json.load(f)

# Skill configurations: (id, keywords_for_title_matching, level, tags, position_ids, relevance)
skills_config = [
    ('rear-naked-choke-system', ['rear naked choke', 'rnc', 'rear naked'], 'advanced', ['rnc', 'rear-naked-choke', 'back-control', 'choke'], [], 'primary_reference'),
    ('armbar-system', ['armbar', 'arm bar'], 'advanced', ['armbar', 'elbow-line', 'shoulder-isolation', 'submission'], [], 'primary_reference'),
    ('triangle-system', ['triangle choke', 'triangle finis', 'triangle system', 'triangle from', 'triangle setup'], 'advanced', ['triangle', 'choke', 'guard', 'neck-safety'], [], 'primary_reference'),
    ('guillotine-system', ['guillotine'], 'advanced', ['guillotine', 'front-headlock', 'choke', 'neck-safety'], ['front-headlock'], 'primary_reference'),
    ('arm-triangle-mount', ['arm triangle', 'arm-triangle'], 'advanced', ['arm-triangle', 'mount', 'choke', 'neck-safety'], [], 'primary_reference'),
    ('kimura-system', ['kimura'], 'advanced', ['kimura', 'shoulder-lock', 'submission'], [], 'primary_reference'),
    ('omoplata-system', ['omoplata'], 'advanced', ['omoplata', 'shoulder-lock', 'guard', 'submission'], [], 'primary_reference'),
    ('heel-hook-safety', ['heel hook', 'heelhook', 'inside heel hook', 'outside heel hook'], 'advanced', ['heel-hook', 'leg-lock', 'knee-line', 'safety'], ['saddle-inside-sankaku'], 'safety_reference'),
    ('back-control', ['back control', 'back take', 'back attack', 'back mount', 'taking the back'], 'intermediate', ['back-control', 'back-take', 'control', 'seatbelt'], ['back-control-position'], 'primary_reference'),
    ('bodylock-passing', ['body lock pass', 'body lock', 'bodylock'], 'intermediate', ['bodylock', 'passing', 'hip-control'], [], 'primary_reference'),
    ('knee-cut-passing', ['knee cut', 'knee slice', 'knee slide'], 'intermediate', ['knee-cut', 'passing', 'knee-slice'], [], 'primary_reference'),
    ('side-control-escape', ['side control escape', 'escape side control', 'side control defense'], 'beginner', ['side-control', 'escape', 'frames'], ['side-control-bottom'], 'primary_reference'),
    ('mount-escape', ['mount escape', 'escape mount'], 'beginner', ['mount', 'escape', 'bridge'], ['mount-bottom'], 'primary_reference'),
    ('front-headlock-defense', ['front headlock defense', 'front headlock escape', 'defend front headlock'], 'intermediate', ['front-headlock', 'defense', 'escape'], [], 'primary_reference'),
    ('octopus-guard-control', ['octopus guard', 'octopus escape', 'octopus system'], 'intermediate', ['octopus-guard', 'half-guard', 'guard-system'], ['half-guard-bottom'], 'primary_reference'),
    ('shoulder-crunch-control', ['shoulder crunch'], 'intermediate', ['shoulder-crunch', 'control', 'position'], [], 'primary_reference'),
    ('s-mount-armbar', ['s mount armbar', 's-mount armbar'], 'advanced', ['s-mount', 'armbar', 'mount', 'submission'], ['mount-top'], 'primary_reference'),
    ('false-reap-entry', ['false reap'], 'advanced', ['false-reap', 'leg-entry', 'guard'], [], 'primary_reference'),
    ('k-guard-matrix', ['k guard', 'k-guard'], 'advanced', ['k-guard', 'matrix', 'leg-entanglements'], [], 'primary_reference'),
    ('saddle-inside-sankaku-control', ['saddle', 'inside sankaku'], 'advanced', ['saddle', 'inside-sankaku', 'leg-control'], ['saddle-inside-sankaku'], 'primary_reference'),
    ('crab-ride', ['crab ride'], 'advanced', ['crab-ride', 'back-take', 'leg-ride'], [], 'primary_reference'),
    ('wrist-ride-back-exposure', ['wrist ride', 'wrist lock', 'wrist control'], 'advanced', ['wrist-ride', 'back-exposure', 'control'], [], 'primary_reference'),
    ('buggy-choke', ['buggy choke', 'buggy'], 'intermediate', ['buggy-choke', 'submission', 'escape-counter'], [], 'primary_reference'),
    ('gogoplata', ['gogoplata'], 'advanced', ['gogoplata', 'submission', 'guard-attack'], [], 'primary_reference'),
    ('choi-bar', ['choi bar', 'choibar'], 'advanced', ['choi-bar', 'armbar', 'submission'], [], 'primary_reference'),
    ('smother-safety', ['smother choke', 'smother'], 'intermediate', ['smother', 'safety', 'positional-control'], [], 'safety_reference'),
    ('back-escape', ['back escape', 'escape back', 'back defense', 'escape the back'], 'beginner', ['back-escape', 'defense', 'survival'], [], 'supplemental'),
    ('mount-control', ['mount control', 'mount position', 'mount pressure', 'mount attack', 'mount finis', 'mounted'], 'intermediate', ['mount', 'control', 'pressure'], [], 'supplemental'),
    ('side-control-pin', ['side control pressure', 'side control pin', 'side control submission', 'side control attack'], 'intermediate', ['side-control', 'pin', 'pressure'], ['side-control-top'], 'supplemental'),
    ('butterfly-guard-off-balance', ['butterfly guard', 'butterfly sweep', 'butterfly system'], 'intermediate', ['butterfly-guard', 'sweep', 'off-balance', 'guard-system'], ['butterfly-guard'], 'primary_reference'),
    ('half-guard-knee-shield', ['half guard knee shield', 'half guard', 'half-guard', 'knee shield'], 'intermediate', ['half-guard', 'knee-shield', 'guard-system'], ['half-guard-bottom'], 'primary_reference'),
    ('single-leg-bjj', ['single leg takedown', 'single leg'], 'intermediate', ['single-leg', 'takedown', 'wrestling'], [], 'supplemental'),
    ('guard-pulling-strategy', ['guard pull', 'guard pulling', 'pull guard'], 'beginner', ['guard-pull', 'strategy', 'guard-entry'], [], 'supplemental'),
    ('hand-fighting', ['hand fight', 'hand fighting', 'grip fight', 'grip break'], 'beginner', ['hand-fighting', 'grip-fighting', 'fundamentals'], [], 'supplemental'),
    ('leg-drag-basics', ['leg drag'], 'intermediate', ['leg-drag', 'passing'], [], 'supplemental'),
    ('headquarters-passing', ['headquarters'], 'intermediate', ['headquarters', 'passing', 'guard-passing'], [], 'supplemental'),
    ('dogfight-knee-tap', ['dogfight', 'dog fight', 'knee tap'], 'intermediate', ['dogfight', 'knee-tap', 'half-guard'], [], 'supplemental'),
    ('turtle-ride', ['turtle', 'turtle guard', 'turtle attack', 'turtle position'], 'intermediate', ['turtle', 'ride', 'positional-advantage'], ['turtle-position'], 'supplemental'),
    ('shin-to-shin-entry', ['shin to shin', 'shin guard', 'shin on shin'], 'intermediate', ['shin-to-shin', 'guard-entry', 'guard-system'], [], 'supplemental'),
    ('single-leg-x-basics', ['single leg x', 'single leg x guard', '1lx'], 'intermediate', ['single-leg-x', 'guard', 'leg-entanglements'], [], 'supplemental'),
    ('rear-triangle-control', ['rear triangle', 'body triangle'], 'intermediate', ['rear-triangle', 'back-control', 'choke'], ['back-control-position'], 'supplemental'),
    ('s-mount-control', ['s mount', 's-mount'], 'advanced', ['s-mount', 'mount', 'control'], [], 'supplemental'),
    ('sprawl-go-behind', ['sprawl'], 'beginner', ['sprawl', 'go-behind', 'defense'], [], 'supplemental'),
    ('scramble-control', ['scramble'], 'intermediate', ['scramble', 'control', 'transitions'], [], 'supplemental'),
]

# Instructor priority (higher = better source)
instructor_priority = {
    'John Danaher': 10, 'Gordon Ryan': 10, 'Lachlan Giles': 9, 'Craig Jones': 9,
    'Mikey Musumeci': 8, 'Ryan Hall': 8, 'Bernardo Faria': 7, 'Tom DeBlass': 6,
    'Andre Galvao': 7, 'Firas Zahabi': 7, 'Adam Wardzinski': 7,
    'Neil Melanson': 8, 'Keenan Cornelius': 7, 'Giancarlo Bodoni': 7,
    'Rob Biernacki': 7, 'Jason Rau': 7, 'Travis Stevens': 7, 'Jeff Glover': 6,
    'Heath Pedigo': 6, 'Matt Daquino': 5, 'Brian Glick': 5,
}


def extract_youtube_id(url):
    """Extract YouTube video ID from URL."""
    try:
        parsed = urlparse(url)
        if parsed.hostname == 'youtu.be':
            return parsed.path[1:] or None
        if 'youtube.com' in parsed.hostname or 'youtube-nocookie.com' in parsed.hostname:
            if parsed.path == '/watch':
                return parse_qs(parsed.query).get('v', [None])[0]
            if parsed.path.startswith('/embed/') or parsed.path.startswith('/shorts/'):
                return parsed.path.split('/')[2]
        return None
    except Exception:
        return None


def make_id(source_name, yt_id):
    """Generate a unique human-readable ID."""
    name = re.sub(r'[^a-zA-Z0-9]+', '-', source_name.lower()).strip('-')[:20]
    return f'bjj-{name}-{yt_id}'


def sanitize(s):
    """Clean HTML entities from string."""
    s = s.replace('&#x27;', "'").replace('&quot;', '"').replace('&amp;', '&').replace('&#39;', "'")
    s = s.replace('&#x2019;', "'").replace('&#x2013;', '-').replace('&#x2014;', '—')
    return s


def json_str(s):
    """Escape a string for TypeScript single-line use."""
    s = sanitize(s)
    # Remove newlines
    s = s.replace('\n', ' ').replace('\r', ' ')
    return json.dumps(s, ensure_ascii=False)


# WhyUseful templates per skill
why_templates = {
    'rear-naked-choke-system': (
        '{i} demonstrates RNC mechanics, hand fighting order, and finishing details from back control.',
        '{i} trình bày mechanics RNC, thứ tự hand fighting và chi tiết finish từ back control.',
        '{i} montre la mécanique RNC, l\'ordre du hand fighting et les détails de finish depuis le dos.',
    ),
    'armbar-system': (
        '{i} breaks down armbar setup, hip positioning, and controlled arm extension for clean finishes.',
        '{i} phân tích setup armbar, positioning hông và extension tay có kiểm soát để finish sạch.',
        '{i} détaille le setup armbar, le positionnement des hanches et l\'extension contrôlée.',
    ),
    'triangle-system': (
        '{i} shows triangle choke mechanics: one-shoulder-in, angle cut, and squeeze details.',
        '{i} chỉ mechanics triangle choke: one-shoulder-in, cắt góc và chi tiết squeeze.',
        '{i} montre la mécanique triangle choke : une épaule dedans, angle et serrage.',
    ),
    'guillotine-system': (
        '{i} covers guillotine setup, chin strap connection, and finishing angle from front headlock.',
        '{i} trình bày setup guillotine, kết nối chin strap và angle finish từ front headlock.',
        '{i} couvre le setup guillotine, connexion chin strap et l\'angle de finish.',
    ),
    'kimura-system': (
        '{i} demonstrates kimura grip control, shoulder isolation, and finishing mechanics.',
        '{i} trình diễn kimura grip control, cô lập shoulder và mechanics finish.',
        '{i} démontre le contrôle kimura grip, l\'isolation d\'épaule et la mécanique de finish.',
    ),
    'omoplata-system': (
        '{i} teaches omoplata entry, hip angle control, and shoulder pressure finishing.',
        '{i} dạy entry omoplata, kiểm soát hip angle và finish bằng shoulder pressure.',
        '{i} enseigne l\'entrée omoplata, le contrôle d\'angle de hanche et la pression d\'épaule.',
    ),
    'heel-hook-safety': (
        '{i} explains heel hook safety, knee-line control, and responsible training practices.',
        '{i} giải thích an toàn heel hook, kiểm soát knee line và tập luyện có trách nhiệm.',
        '{i} explique la sécurité heel hook, le contrôle de knee line et la pratique responsable.',
    ),
    'back-control': (
        '{i} details back control mechanics, seatbelt grip, body triangle, and back attack chains.',
        '{i} chi tiết mechanics back control, seatbelt grip, body triangle và chuỗi đòn back attack.',
        '{i} détaille les mécaniques du back control, seatbelt, body triangle et chaînes d\'attaques.',
    ),
    'bodylock-passing': (
        '{i} demonstrates bodylock passing, hip-line control, and clearing the legs.',
        '{i} trình diễn bodylock passing, kiểm soát hip-line và clear chân.',
        '{i} démontre le bodylock passing, le contrôle de la hip line et le passage des jambes.',
    ),
    'knee-cut-passing': (
        '{i} teaches knee cut passing mechanics, knee position, and hip commitment.',
        '{i} dạy mechanics knee cut passing, position gối và commitment hông.',
        '{i} enseigne les mécaniques du knee cut, position du genou et engagement des hanches.',
    ),
    'side-control-escape': (
        '{i} shows side control escape fundamentals: framing, hip movement, and guard recovery.',
        '{i} chỉ nền tảng thoát side control: framing, di chuyển hông và recover guard.',
        '{i} montre les fondamentaux de sortie side control : framing, mouvement de hanche et recovery.',
    ),
    'mount-escape': (
        '{i} covers mount escapes: inside leg positioning, bridging, and recovering guard.',
        '{i} trình bày thoát mount: inside leg positioning, bridge và recover guard.',
        '{i} couvre les sorties de mount : position intérieure, bridge et récupération de garde.',
    ),
    'front-headlock-defense': (
        '{i} teaches front headlock defense and counters to guillotine and snapdown attacks.',
        '{i} dạy phòng thủ front headlock và counter trước guillotine và snapdown.',
        '{i} enseigne la défense front headlock et les contres contre guillotine et snapdown.',
    ),
    'octopus-guard-control': (
        '{i} demonstrates octopus guard retention, sweeps, and back takes from half guard.',
        '{i} trình diễn octopus guard retention, sweep và back take từ half guard.',
        '{i} démontre la rétention octopus guard, les sweeps et back takes depuis half guard.',
    ),
    'butterfly-guard-off-balance': (
        '{i} teaches butterfly guard sweeps, off-balancing, and hook positioning.',
        '{i} dạy butterfly guard sweep, làm mất thăng bằng và positioning hook.',
        '{i} enseigne les sweeps butterfly guard, le déséquilibre et le positionnement du hook.',
    ),
    'half-guard-knee-shield': (
        '{i} shows half guard systems, knee shield retention, and sweep transitions.',
        '{i} chỉ hệ thống half guard, knee shield retention và chuyển sweep.',
        '{i} montre les systèmes half guard, knee shield retention et transitions de sweep.',
    ),
    'arm-triangle-mount': (
        '{i} demonstrates arm triangle from mount: separating the arm and finishing with pressure.',
        '{i} trình diễn arm triangle từ mount: tách tay và finish bằng pressure.',
        '{i} démontre l\'arm triangle depuis mount : isoler le bras et finir par pression.',
    ),
    'back-escape': (
        '{i} teaches back escape fundamentals: hand placement, hip escape, and turning in.',
        '{i} dạy nền tảng back escape: đặt tay, hip escape và xoay vào.',
        '{i} enseigne les fondamentaux back escape : placement des mains, hip escape et rotation.',
    ),
    's-mount-armbar': (
        '{i} shows s-mount armbar setups and transitions from mount control.',
        '{i} chỉ setup s-mount armbar và chuyển từ mount control.',
        '{i} montre les setups s-mount armbar et transitions depuis mount control.',
    ),
    'crab-ride': (
        '{i} demonstrates crab ride position and back takes from leg drag entries.',
        '{i} trình diễn crab ride position và back take từ leg drag.',
        '{i} démontre la position crab ride et les back takes depuis leg drag.',
    ),
    'k-guard-matrix': (
        '{i} teaches k-guard entries, matrix sweeps, and leg entanglement setups.',
        '{i} dạy k-guard entry, matrix sweep và setup leg entanglement.',
        '{i} enseigne les entrées k-guard, matrix sweep et setups leg entanglement.',
    ),
    'choi-bar': (
        '{i} breaks down the choi bar: setup, entry, and finishing mechanics.',
        '{i} phân tích choi bar: setup, entry và mechanics finish.',
        '{i} détaille le choi bar : setup, entrée et mécanique de finish.',
    ),
    'buggy-choke': (
        '{i} covers buggy choke setup from bottom side control and finishing details.',
        '{i} trình bày buggy choke setup từ bottom side control và chi tiết finish.',
        '{i} couvre le buggy choke depuis side control et les détails de finish.',
    ),
    'gogoplata': (
        '{i} demonstrates gogoplata setup from guard, shin pressure, and finish.',
        '{i} trình diễn gogoplata setup từ guard, pressure bằng shin và finish.',
        '{i} démontre le gogoplata depuis la garde, pression du tibia et finish.',
    ),
    'false-reap-entry': (
        '{i} teaches false reap entries into leg lock and back take systems.',
        '{i} dạy false reap entry vào hệ thống leg lock và back take.',
        '{i} enseigne les entrées false reap dans les systèmes leg lock et back take.',
    ),
    'wrist-ride-back-exposure': (
        '{i} shows wrist ride control and back exposure from turtle and front headlock.',
        '{i} chỉ wrist ride control và back exposure từ turtle và front headlock.',
        '{i} montre le wrist ride et l\'exposition du dos depuis turtle et front headlock.',
    ),
    'saddle-inside-sankaku-control': (
        '{i} demonstrates saddle/inside sankaku control and leg attack setups.',
        '{i} trình diễn saddle/inside sankaku control và setup leg attack.',
        '{i} démontre le contrôle saddle/inside sankaku et les setups leg attack.',
    ),
    'shoulder-crunch-control': (
        '{i} teaches shoulder crunch position and transitions to submissions.',
        '{i} dạy shoulder crunch position và chuyển sang submission.',
        '{i} enseigne la position shoulder crunch et les transitions vers les submissions.',
    ),
    'smother-safety': (
        '{i} covers smothering pressure technique and safety considerations.',
        '{i} trình bày kỹ thuật smother pressure và cân nhắc an toàn.',
        '{i} couvre la technique de pression smother et les considérations de sécurité.',
    ),
    'mount-control': (
        '{i} demonstrates mount control, pressure maintenance, and attack setups.',
        '{i} trình diễn mount control, duy trì pressure và setup tấn công.',
        '{i} démontre le contrôle mount, maintien de pression et setups d\'attaque.',
    ),
    'side-control-pin': (
        '{i} shows side control pinning, pressure, and submission chains.',
        '{i} chỉ side control pinning, pressure và chuỗi submission.',
        '{i} montre le side control pinning, la pression et les chaînes de soumission.',
    ),
    'rear-triangle-control': (
        '{i} teaches rear triangle / body triangle control and choke mechanics from back.',
        '{i} dạy rear triangle / body triangle control và mechanics choke từ back.',
        '{i} enseigne le contrôle rear triangle / body triangle et la mécanique d\'étranglement depuis le dos.',
    ),
}


# Default templates for skills not in why_templates
def get_why_text(skill_id, instructor, technique):
    if skill_id in why_templates:
        en, vi, fr = why_templates[skill_id]
        return (
            en.format(i=instructor),
            vi.format(i=instructor),
            fr.format(i=instructor),
        )
    return (
        f'{instructor} provides a detailed breakdown of {technique.lower()} with practical drilling advice.',
        f'{instructor} cung cấp phân tích chi tiết với lời khuyên tập luyện thực tế.',
        f'{instructor} fournit une analyse détaillée avec des conseils pratiques.',
    )


# WhatToWatchFor templates
watch_templates = {
    'rear-naked-choke-system': (
        ['Choking elbow placement', 'Hand fighting sequence', 'Chest-to-back connection', 'Clean strangle vs jaw crank'],
        ['Vị trí elbow siết', 'Thứ tự hand fighting', 'Kết nối ngực với lưng', 'Siết sạch vs crank hàm'],
        ['Placement du coude étrangleur', 'Séquence hand fighting', 'Connexion poitrine-dos', 'Étranglement propre vs mâchoire'],
    ),
    'heel-hook-safety': (
        ['Knee-line control before finish', 'Slow pressure application', 'Partner communication', 'Release at tap or limit'],
        ['Kiểm soát knee line trước finish', 'Tăng lực chậm', 'Giao tiếp với partner', 'Thả khi tap hoặc đạt giới hạn'],
        ['Contrôle knee line avant finish', 'Application lente de pression', 'Communication partenaire', 'Relâchement au tap ou limite'],
    ),
}

default_watch = (
    ['Body positioning and weight distribution', 'Grip control and placement', 'Finishing mechanics', 'Common mistakes to avoid'],
    ['Positioning cơ thể và phân bổ trọng lượng', 'Kiểm soát grip và đặt tay', 'Mechanics hoàn thiện', 'Lỗi thường gặp cần tránh'],
    ['Positionnement du corps et répartition du poids', 'Contrôle et placement des grips', 'Mécanique de finition', 'Erreurs courantes à éviter'],
)


def get_watch_for(skill_id):
    return watch_templates.get(skill_id, default_watch)


def generate_lt(en, vi, fr):
    return f'''    lt(
      {json_str(en)},
      {json_str(vi)},
      {json_str(fr)},
    )'''


def generate_la(en_list, vi_list, fr_list):
    return f'''    la(
      {json.dumps(en_list, ensure_ascii=False)},
      {json.dumps(vi_list, ensure_ascii=False)},
      {json.dumps(fr_list, ensure_ascii=False)},
    )'''


# Match videos to skills
seen_ids = defaultdict(set)
matches = defaultdict(list)

for video in data:
    title = video['technique'].lower()
    source = video['source_name']
    priority = instructor_priority.get(source, 1)
    yt_id = extract_youtube_id(video['url'])
    if not yt_id:
        continue

    for skill_id, keywords, level, tags, position_ids, relevance in skills_config:
        if yt_id in seen_ids[skill_id]:
            continue
        for kw in keywords:
            if kw.lower() in title:
                seen_ids[skill_id].add(yt_id)
                matches[skill_id].append(video)
                break

# Select best videos per skill
selected = {}
for skill_id, keywords, level, tags, position_ids, relevance in skills_config:
    videos = matches.get(skill_id, [])
    if not videos:
        continue
    # Sort by instructor priority
    videos.sort(key=lambda v: -(instructor_priority.get(v['source_name'], 1)))
    # Take up to 2
    top = videos[:2]
    selected[skill_id] = top

# Generate TypeScript output
print('''// ─── Auto-generated video references from bjj.tips (do not edit manually) ───
// Generated from 1907 scraped bjj.tips video listings

import type { VideoReference } from '../../types/video'

const lt = (en: string, vi: string, fr: string) => ({ en, vi, fr })
const la = (en: string[], vi: string[], fr: string[]) => ({ en, vi, fr })

export const bjjTipsVideoReferences: VideoReference[] = [''')

total_entries = 0
for skill_id in sorted(selected.keys()):
    videos = selected[skill_id]
    skill_config = [s for s in skills_config if s[0] == skill_id][0]
    _, _, level, tags, position_ids, relevance = skill_config

    for video in videos:
        yt_id = extract_youtube_id(video['url'])
        if not yt_id:
            continue

        entry_id = make_id(video['source_name'], yt_id)
        title_clean = sanitize(video['technique']).strip()
        instructor = video['source_name']

        # Generate titles (use the original technique name for en)
        en_title = title_clean[:100]
        vi_title = f'{title_clean[:80]} (phân tích)'
        fr_title = f'{title_clean[:80]} (analyse)'

        en_why, vi_why, fr_why = get_why_text(skill_id, instructor, title_clean)
        en_watch, vi_watch, fr_watch = get_watch_for(skill_id)

        # Generate what to watch for from the summary if available
        summary = sanitize(video.get('summary', ''))
        if summary and len(summary) > 10:
            # Try to extract 3-4 key points from summary
            summary_clean = summary.replace('\n', ' ').strip()[:120]

        fields = []

        # ID
        fields.append(f'  id: {json_str(entry_id)},')
        fields.append("  provider: 'youtube',")

        # Title
        fields.append(f'''  title:
{generate_lt(en_title, vi_title, fr_title)},''')

        # Channel
        fields.append(f'  channelName: {json_str(instructor)},')

        # URLs
        fields.append(f'  url: {json_str(video["url"])},')
        fields.append(f'  embedUrl: {json_str(f"https://www.youtube.com/embed/{yt_id}")},')
        fields.append(f'  youtubeId: {json_str(yt_id)},')

        # Language
        fields.append("  language: 'en',")

        # Related skills
        fields.append(f'  relatedSkillIds: [{json_str(skill_id)}],')

        # Related positions
        if position_ids:
            pos_str = ', '.join(json_str(p) for p in position_ids)
            fields.append(f'  relatedPositionIds: [{pos_str}],')

        # Tags
        tags_str = ', '.join(json_str(t) for t in tags)
        fields.append(f'  techniqueTags: [{tags_str}],')

        # Relevance
        fields.append(f'  relevance: {json_str(relevance)},')
        fields.append(f'  level: {json_str(level)},')

        # Why useful
        fields.append(f'''  whyUseful:
{generate_lt(en_why, vi_why, fr_why)},''')

        # What to watch for
        fields.append(f'''  whatToWatchFor:
{generate_la(en_watch, vi_watch, fr_watch)},''')

        # Source note
        fields.append("  sourceNote: 'Curated from bjj.tips public YouTube listings.',")

        # Caution for safety-critical skills
        if relevance == 'safety_reference':
            if 'heel' in skill_id:
                fields.append(f'''  caution:
{generate_lt(
    'Heel hooks are safety-critical. Train under qualified supervision and stop before rotational knee pressure spikes.',
    'Heel hook là kỹ thuật safety-critical. Tập dưới sự giám sát phù hợp và dừng trước khi lực xoắn vào gối tăng mạnh.',
    'Les heel hooks sont critiques pour la sécurité. Travaillez sous supervision et arrêtez avant le pic de torsion au genou.',
)},''')
            elif 'smother' in skill_id:
                fields.append(f'''  caution:
{generate_lt(
    'Be aware of partner breathing and release pressure immediately on any sign of distress.',
    'Chú ý hơi thở của partner và thả áp lực ngay nếu có dấu hiệu khó chịu.',
    'Soyez attentif à la respiration du partenaire et relâchez la pression au moindre signe de détresse.',
)},''')

        # Output entry
        print('  {')
        print('\n'.join(fields))
        print('  },')

        total_entries += 1

print(']')
print(f'\n// Total: {total_entries} video references for {len(selected)} skills')
