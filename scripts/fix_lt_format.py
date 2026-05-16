import re

with open('src/data/videos/videoReferences.ts', 'r') as f:
    content = f.read()

original = content

# ============== Fix lt({ en: "v", vi: "v", fr: "v" }) ==============
# Pattern: lt({
#   en: "value",
#   vi: "value",
#   fr: "value"
# })

lt_pattern = re.compile(
    r'lt\(\{\s*\n'
    r'\s+en:\s*"([^"]*)",?\s*\n'
    r'\s+vi:\s*"([^"]*)",?\s*\n'
    r'\s+fr:\s*"([^"]*)"\s*\n'
    r'\s+\}\)'
)

def fix_lt(match):
    en_val = match.group(1)
    vi_val = match.group(2)
    fr_val = match.group(3)
    # Get indentation from context (look at indent before 'lt')
    start = match.start()
    # Find the beginning of the line containing 'lt('
    line_start = content.rfind('\n', 0, start) + 1
    indent = ''
    for ch in content[line_start:start]:
        if ch in ' \t':
            indent += ch
        else:
            break
    # 'lt(' may be preceded by a field name like 'title: '
    # Check if there's a field name before lt(
    field_part = content[line_start:start]
    field_match = re.match(r'^(\s*)(\w+:\s*)', field_part)
    
    if field_match:
        # Format: fieldName: lt(
        # Convert to:
        # fieldName:
        #   lt(
        #     "en_val",
        #     "vi_val",
        #     "fr_val"
        #   )
        field_indent = field_match.group(1)
        field_name = field_match.group(2).rstrip()
        
        result = f'{field_indent}{field_name}:\n{field_indent}  lt(\n{field_indent}    "{en_val}",\n{field_indent}    "{vi_val}",\n{field_indent}    "{fr_val}"\n{field_indent}  )'
        return result
    else:
        # Inline case (e.g., { label: lt({...}), timeSeconds: 0 })
        # Convert to multiline:
        # label:
        #   lt(
        #     "en_val",
        #     "vi_val",
        #     "fr_val"
        #   )
        # But this is tricky because we need to fit in the object
        # For inline, put lt args on separate lines
        return f'lt(\n{indent}  "{en_val}",\n{indent}  "{vi_val}",\n{indent}  "{fr_val}"\n{indent})'

# Apply lt fixes
content = lt_pattern.sub(fix_lt, content)
print(f"lt() fixes applied")

# ============== Fix la({ en: [...], vi: [...], fr: [...] }) ==============
# Pattern: la({
#   en: [...],
#   vi: [...],
#   fr: [...]
# })

la_pattern = re.compile(
    r'la\(\{\s*\n'
    r'\s+en:\s*\[([^\]]*)\],?\s*\n'
    r'\s+vi:\s*\[([^\]]*)\],?\s*\n'
    r'\s+fr:\s*\[([^\]]*)\]\s*\n'
    r'\s+\}\)'
)

def fix_la(match):
    en_arr = match.group(1).strip()
    vi_arr = match.group(2).strip()
    fr_arr = match.group(3).strip()
    
    start = match.start()
    line_start = content.rfind('\n', 0, start) + 1
    indent = ''
    for ch in content[line_start:start]:
        if ch in ' \t':
            indent += ch
        else:
            break
    
    field_part = content[line_start:start]
    field_match = re.match(r'^(\s*)(\w+:\s*)', field_part)
    
    if field_match:
        field_indent = field_match.group(1)
        field_name = field_match.group(2).rstrip()
        
        result = f'{field_indent}{field_name}:\n{field_indent}  la(\n{field_indent}    [{en_arr}],\n{field_indent}    [{vi_arr}],\n{field_indent}    [{fr_arr}]\n{field_indent}  )'
        return result
    else:
        return f'la(\n{indent}  [{en_arr}],\n{indent}  [{vi_arr}],\n{indent}  [{fr_arr}]\n{indent})'

content = la_pattern.sub(fix_la, content)
print(f"la() fixes applied")

# Count changes
lt_count = content.count('lt(\n')
la_count = content.count('la(\n')
lt_object = content.count('lt({')
la_object = content.count('la({')

print(f"\nAfter fixes:")
print(f"  lt(...) multi-line: {lt_count}")
print(f"  la(...) multi-line: {la_count}")
print(f"  lt({{) remaining: {lt_object}")
print(f"  la({{) remaining: {la_object}")

if lt_object == 0 and la_object == 0:
    with open('src/data/videos/videoReferences.ts', 'w') as f:
        f.write(content)
    print("\n✅ All fixes applied successfully!")
else:
    print(f"\n⚠️  {lt_object} lt({{) and {la_object} la({{) remain unfixed!")
    
# Verify braces match
ob = content.count('{')
cb = content.count('}')
obr = content.count('[')
cbr = content.count(']')
print(f"\nBraces: {{ {ob} }} {cb} diff={ob-cb}")
print(f"Brackets: [ {obr} ] {cbr} diff={obr-cbr}")
