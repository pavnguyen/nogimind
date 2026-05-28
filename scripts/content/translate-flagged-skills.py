#!/usr/bin/env python3

import json
import re
import sys
import time
from pathlib import Path

try:
    from deep_translator import GoogleTranslator
except Exception as exc:
    raise SystemExit(
        "deep_translator is required in .venv_i18. Run `.venv_i18/bin/pip install deep-translator`."
    ) from exc

ROOT = Path(__file__).resolve().parents[2]
REPORT_PATH = ROOT / "scripts" / "sync-i18-report.json"

TECH_TERMS = [
    "BJJ", "No-Gi", "no-gi", "crossface", "underhook", "overhook", "guard",
    "half guard", "closed guard", "open guard", "side control", "mount",
    "back control", "north-south", "knee shield", "knee-on-belly", "armbar",
    "kimura", "triangle", "rear-naked choke", "RNC", "guillotine", "d'arce",
    "anaconda", "omoplata", "gogoplata", "heel hook", "ankle lock",
    "single-leg X", "single leg X", "SLX", "X-guard", "De La Riva", "DLR",
    "K-guard", "seatbelt", "shrimp", "wrestle up", "front headlock",
    "snapdown", "sprawl", "mat return", "crucifix", "S-mount", "s-mount",
    "saddle", "inside sankaku", "ashi garami", "cross ashi", "outside ashi",
    "50/50", "Z-Lock", "leg lock", "leg locks", "submission", "submissions",
    "sweep", "sweeps", "pass", "back take", "posture", "collar tie",
    "shin-to-shin", "bow-and-arrow", "inside heel hook", "outside heel hook",
]

SKIP_FIELDS = {"id", "locale", "name"}


def load_report():
    return json.loads(REPORT_PATH.read_text())


def normalize_path(path):
    parts = []
    for token in path.split("."):
        if not token:
            continue
        while "[" in token:
            prefix = token[: token.index("[")]
            if prefix:
                parts.append(prefix)
            index = int(token[token.index("[") + 1 : token.index("]")])
            parts.append(index)
            token = token[token.index("]") + 1 :]
        if token:
            parts.append(token)
    return parts


def get_by_path(obj, path):
    cur = obj
    for part in normalize_path(path):
        cur = cur[part]
    return cur


def set_by_path(obj, path, value):
    parts = normalize_path(path)
    cur = obj
    for part in parts[:-1]:
        cur = cur[part]
    cur[parts[-1]] = value


def should_skip(path):
    return path.split(".")[0] in SKIP_FIELDS


def protect_terms(text):
    protected = text
    replacements = []
    for index, term in enumerate(sorted(TECH_TERMS, key=len, reverse=True)):
        token = f"__TERM_{index}__"
        pattern = re.compile(re.escape(term), re.IGNORECASE)
        if pattern.search(protected):
            protected = pattern.sub(token, protected)
            replacements.append((token, term))
    return protected, replacements


def restore_terms(text, replacements):
    out = text
    for token, term in replacements:
        out = out.replace(token, term)
    return out


def translate_text(translator, text):
    if not isinstance(text, str) or not text.strip():
        return text
    protected, replacements = protect_terms(text)
    try:
        translated = translator.translate(protected)
    except Exception:
        return text
    return restore_terms(translated, replacements)


def translate_issue_paths(locale, file_path, issue_paths):
    target = ROOT / file_path
    source = ROOT / file_path.replace(f"content.{locale}.json", "content.en.json")
    local_json = json.loads(target.read_text())
    en_json = json.loads(source.read_text())
    translator = GoogleTranslator(source="en", target=locale)

    changed = 0
    seen = set()
    for issue_path in issue_paths:
        if issue_path in seen or should_skip(issue_path):
            continue
        seen.add(issue_path)
        en_value = get_by_path(en_json, issue_path)
        if not isinstance(en_value, str):
            continue
        translated = translate_text(translator, en_value)
        set_by_path(local_json, issue_path, translated)
        changed += 1
        time.sleep(0.03)

    target.write_text(json.dumps(local_json, ensure_ascii=False, indent=2) + "\n")
    return changed


def main():
    locale_filter = None
    file_limit = None
    if len(sys.argv) >= 2:
        locale_filter = sys.argv[1]
    if len(sys.argv) >= 3:
        file_limit = int(sys.argv[2])

    report = load_report()
    work = {}
    for result in report["results"]:
        locale = result["locale"]
        if locale not in {"vi", "fr"}:
            continue
        if locale_filter and locale != locale_filter:
            continue
        if not result["issues"]:
            continue
        relevant = [
            issue["field"]
            for issue in result["issues"]
            if not should_skip(issue["field"])
        ]
        if not relevant:
            continue
        work[(locale, result["path"])] = relevant

    total_files = 0
    total_fields = 0
    items = sorted(work.items())
    if file_limit is not None:
        items = items[:file_limit]

    for (locale, file_path), issue_paths in items:
        total_files += 1
        total_fields += translate_issue_paths(locale, file_path, issue_paths)
        print(f"updated {file_path}")

    print(f"translated_files={total_files}")
    print(f"translated_fields={total_fields}")


if __name__ == "__main__":
    main()
