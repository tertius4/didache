#!/usr/bin/env python3
"""Turn a lesson's image file into every Grok prompt and the narration script.

Usage (from the repo root):
    python3 docs/images/tools/build-lesson.py docs/images/noah/02-noah-found-grace.md

It reads three things and writes one file:

  reads   docs/images/noah/02-noah-found-grace.md     what each image shows (you write this)
          src/lib/content/*/noah/02-noah-found-grace.ts  the story cards: id, narration, verse
          docs/images/image-prompt-guide.md + characters.md   the fixed prompt blocks
  writes  docs/images/noah/02-noah-found-grace.prompts.md
          every 9:16 video prompt in full, ready to paste, plus the
          narration script for recording. The 4:3 story card is made from
          the kept image with Grok's aspect-ratio option, so it needs no prompt.

The narration is the story card's `body`, so the video, the captions and
"Read story" always say the same thing. To change the words, change the card.

Never edit the .prompts.md by hand: change the lesson file, the card or the
guide, and run this again. Python 3 standard library only.

Options:
    --check    only check the lesson file against the cards, write nothing
"""

import argparse
import re
import sys
from pathlib import Path

STYLE_WORDS = ("beautiful", "dramatic", "cinematic", "epic", "detailed", "4k",
               "masterpiece", "stunning", "gorgeous", "hyper", "realistic")
WORDS_PER_SECOND = 2.4    # calm storyteller pace, for the length estimate
SAME_PEOPLE = ("The people are the same people as in the attached reference "
               "images: same faces, hair, beards and clothing.")
STYLE_ANCHOR = "style-anchor.png"


# ------------------------------------------------------------------ the fixed blocks

def code_after(text, marker, start=0, end=None, where="image-prompt-guide.md"):
    i = text.find(marker, start, len(text) if end is None else end)
    if i < 0:
        sys.exit(f"Could not find '{marker}' in {where}")
    m = re.compile(r"```[^\n]*\n(.*?)\n[ \t]*```", re.S).search(text, i)
    if not m or (end is not None and m.start() > end):
        sys.exit(f"No code block after '{marker}' in {where}")
    return "\n".join(line.strip() for line in m.group(1).splitlines()).strip()


def span(text, heading, next_heading):
    a, b = text.find(heading), text.find(next_heading)
    if a < 0 or b < a:
        sys.exit(f"Could not find the section '{heading}' in image-prompt-guide.md")
    return a, b


def presets(text, a, b):
    out = {}
    for m in re.finditer(r"^\*\*([A-Z][A-Z' -]+)\*\*", text[a:b], re.M):
        out[m.group(1).strip()] = code_after(text, m.group(0), a + m.start(), b)
    return out


def load_blocks(images):
    guide = (images / "image-prompt-guide.md").read_text(encoding="utf-8")
    b = dict(style=code_after(guide, "## 1. STYLE LOCK"),
             video=code_after(guide, "**VIDEO**"),
             avoid=code_after(guide, "## 5. AVOID"),
             anchor=code_after(guide, "## 6. Making Grok copy itself"))
    b["light"] = presets(guide, *span(guide, "## 2. LIGHT", "## 3. CAMERA"))
    b["camera"] = presets(guide, *span(guide, "## 3. CAMERA", "## 4. Rendering"))
    a, z = span(guide, "## 4. Rendering", "## 5. AVOID")
    b["recipes"] = {m.group(1).strip().lower(): m.group(2).strip()
                    for m in re.finditer(r"^\|\s*([^|`]+?)\s*\|\s*`([^`]+)`", guide[a:z], re.M)}
    sheet = code_after((images / "characters.md").read_text(encoding="utf-8"), "# Characters",
                       where="characters.md")
    b["characters"] = {}
    for line in sheet.splitlines():
        m = re.match(r"([A-Z][A-Z' ]+):\s", line)
        if m:
            b["characters"][m.group(1).strip()] = line.strip()
    return b


# ------------------------------------------------------------------ the story cards

def ts_string(obj, key):
    m = re.search(rf"\b{key}:\s*(['\"`])(.*?)(?<!\\)\1", obj, re.S)
    return m.group(2).replace("\\'", "'").replace('\\"', '"') if m else ""


def read_cards(ts):
    text = ts.read_text(encoding="utf-8")
    verses = {m.group(1): m.group(2) for m in
              re.finditer(r"const (\w+): Verse = \{\s*ref:\s*'([^']*)'", text)}
    i = text.find("story: [")
    if i < 0:
        sys.exit(f"{ts}: no 'story: [' found")
    depth, j = 0, i + len("story: ")
    for j in range(i + len("story: "), len(text)):
        depth += {"[": 1, "]": -1}.get(text[j], 0)
        if depth == 0:
            break
    block = text[i:j]
    cards, depth, start = [], 0, None
    for k, ch in enumerate(block):
        if ch == "{":
            if depth == 0:
                start = k
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                obj = block[start:k]
                vm = re.search(r"\bverse:\s*(\w+)", obj)
                cards.append(dict(id=ts_string(obj, "id"), title=ts_string(obj, "title"),
                                  body=ts_string(obj, "body"),
                                  verse=verses.get(vm.group(1), "") if vm else ""))
    return cards


def find_ts(repo, unit, stem):
    hits = sorted((repo / "src" / "lib" / "content").glob(f"*/{unit}/{stem}.ts"))
    return hits[0] if hits else None


# ------------------------------------------------------------------ the lesson file

KEYS = {"light", "camera", "recipes", "characters", "anchors", "shows", "narration",
        "caption ref", "note", "notes", "title"}
POSTER_TITLE = ('Across the calm strip at the bottom, the title "{title}" in large, simple, warm '
                'cream serif letters, spelled exactly like that, and no other text.')


def read_lesson(path):
    head = dict(title="", passage="")
    scenes, cur, key = [], None, None
    for n, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        if n == 1 or (not head["title"] and line.startswith("# ")):
            m = re.match(r"#\s+(.*?)\s*(?:\(([^)]*)\))?\s*$", line)
            if m:
                head["title"], head["passage"] = m.group(1), m.group(2) or ""
            continue
        m = (re.match(r"^###\s+\d+\.\s+`([a-z0-9-]+)`\s*(?::\s*(.*))?$", line)
             or re.match(r"^###\s+(Poster)\s*(?::\s*(.*))?$", line))
        if m:
            cur = dict(id=m.group(1).lower(), mood=(m.group(2) or "").strip(), line=n)
            scenes.append(cur)
            key = None
            continue
        if line.startswith("#"):
            cur, key = None, None
            continue
        m = re.match(r"^\*\*([A-Za-z ]+):\*\*\s*(.*)$", line)
        if m and cur is not None and m.group(1).lower() in KEYS:
            key = m.group(1).lower().replace("notes", "note")
            cur[key] = m.group(2).strip()
            continue
        if line.strip() and key and cur is not None and not line.lstrip().startswith(("-", "*", ">")):
            cur[key] = (cur[key] + " " + line.strip()).strip()
        elif not line.strip():
            key = None
    return head, scenes


def items(value):
    return [x.strip() for x in (value or "").split(",") if x.strip()]


def light_of(s, b):
    if s.get("light"):
        return s["light"].upper()
    return s["mood"].upper() if s["mood"].upper() in b["light"] else ""


def check(scenes, cards, b):
    problems, warnings = [], []
    if not scenes:
        problems.append("no scenes found (each starts with a line like ### 1. `scene-id`: Calm)")
    ids = [s["id"] for s in scenes]
    card_ids = [c["id"] for c in cards]
    for cid in card_ids:
        if cid not in ids:
            problems.append(f"story card '{cid}' has no scene in the lesson file")
    for s in scenes:
        where = f"scene {s['id']} (line {s['line']})"
        if s["id"] == "poster":
            if not s.get("title"):
                problems.append(f"{where}: the poster needs a **Title:**")
        elif s["id"] not in card_ids and not s.get("narration"):
            problems.append(f"{where}: no story card with this id, and no **Narration:**")
        if ids.count(s["id"]) > 1:
            problems.append(f"{where}: the id is used twice")
        light = light_of(s, b)
        if not light:
            problems.append(f"{where}: add **Light:** ({', '.join(b['light'])})")
        elif light not in b["light"]:
            problems.append(f"{where}: unknown light '{light}' ({', '.join(b['light'])})")
        cam = (s.get("camera") or "").upper()
        if cam not in b["camera"]:
            problems.append(f"{where}: **Camera:** must be one of {', '.join(b['camera'])}")
        for r in items(s.get("recipes")):
            if r.lower() not in b["recipes"]:
                problems.append(f"{where}: unknown recipe '{r}' "
                                f"({', '.join(x.title() for x in b['recipes'])})")
        chars = items(s.get("characters"))
        for c in chars:
            if c.upper() not in b["characters"]:
                problems.append(f"{where}: unknown character '{c}' ({', '.join(b['characters'])})")
        if not s.get("shows"):
            problems.append(f"{where}: missing **Shows:**")
        for w in STYLE_WORDS:
            if re.search(rf"\b{w}\b", (s.get("shows") or "").lower()):
                warnings.append(f"{where}: style word '{w}' in Shows overrides the style lock")
    if not any(i == "poster" for i in ids):
        warnings.append("no ### Poster block, so no poster prompt")
    if card_ids and ids and [i for i in ids if i in card_ids] != card_ids:
        warnings.append("the scenes are not in the same order as the story cards")
    return problems, warnings


# ------------------------------------------------------------------ building

def prompt(s, b, fmt):
    parts = []
    parts.append(b["style"] + "\n\n" + b[fmt])
    parts.append(b["light"][light_of(s, b)])
    parts.append(b["camera"][s["camera"].upper()])
    lines = [b["recipes"][r.lower()] for r in items(s.get("recipes"))]
    lines += [b["characters"][c.upper()] for c in items(s.get("characters"))]
    if any(a != STYLE_ANCHOR for a in items(s.get("anchors"))):
        lines.append(SAME_PEOPLE)
    if lines:
        parts.append("\n".join(lines))
    parts.append("SCENE: " + s["shows"])
    parts.append(b["avoid"])
    return "\n\n".join(parts)


def seconds(text):
    return len(text.split()) / WORDS_PER_SECOND


def write(out, lesson, head, scenes, cards, ts, repo):
    poster = next((s for s in scenes if s["id"] == "poster"), None)
    scenes = [s for s in scenes if s["id"] != "poster"]
    by_id = {c["id"]: c for c in cards}
    for s in scenes:
        c = by_id.get(s["id"], {})
        s["say"] = s.get("narration") or c.get("body", "")
        s["ref"] = s.get("caption ref") or c.get("verse", "")
    lid = re.sub(r"^\d+-", "", lesson.stem)
    unit = lesson.parent.name
    section = ts.parent.parent.name if ts else "bible-stories"
    media = f"static/media/{section}/{unit}/{lid}"
    work = f"~/didache-work/{unit}/{lid}"
    total = sum(seconds(s["say"]) + 1.5 for s in scenes)
    tsrel = ts.relative_to(repo).as_posix() if ts else "(no .ts found)"

    o = [f"# {head['title']}: Grok prompts and narration", "",
         f"Generated by `docs/images/tools/build-lesson.py` from [{lesson.name}]({lesson.name}) "
         f"and the story cards in `{tsrel}`. Don't edit this file: change those and run the "
         "script again.", "",
         f"{head['passage']}. {len(scenes)} scenes, about {total:.0f} seconds of video.", "",
         "## Steps for every scene", "",
         f"1. **Video image, 9:16.** In Grok choose **9:16**, attach what is listed, paste prompt A. "
         f"Save the one you keep as `{work}/video/<scene-id>.png`.",
         "2. **Story card, 4:3.** On the image you kept, choose the **4:3** aspect ratio and let "
         "Grok make the same image again. Save it as a 1200×900 WebP: "
         f"`{media}/<scene-id>.webp`.",
         "3. Check both against the checklist in the guide, and against each other.", "",
         "| # | Scene | Light | Camera | Characters | Narration |",
         "| --- | --- | --- | --- | --- | --- |"]
    for i, s in enumerate(scenes, 1):
        o.append(f"| {i} | `{s['id']}` | {light_of(s, b)} | {s['camera'].upper()} | "
                 f"{s.get('characters') or 'none'} | {seconds(s['say']):.0f} s |")
    o += ["", "## Narration script", "",
          "Read one paragraph per image, with a pause between them. These are the story card "
          "texts, word for word.", ""]
    for i, s in enumerate(scenes, 1):
        o += [f"{i}. **`{s['id']}`**: {s['say']}" + (f" *({s['ref']})*" if s["ref"] else ""), ""]
    for i, s in enumerate(scenes, 1):
        attach = items(s.get("anchors"))
        o += ["---", "", f"## {i}. `{s['id']}`", "", f"**Narration:** {s['say']}", ""]
        if s.get("note"):
            o += [f"**Watch for:** {s['note']}", ""]
        o += ["### A. Video image, 9:16", "",
              "Attach: " + (", ".join(f"`docs/images/anchors/{a}`" for a in attach) or "nothing"),
              "", "```", prompt(s, b, "video"), "```", "",
              "### B. Story card, 4:3", "",
              f"The kept image at **4:3**, saved as `{media}/{s['id']}.webp` (1200×900).", ""]
    if poster:
        plain = prompt(poster, b, "video")
        head_part, avoid_part = plain.rsplit("\n\nAvoid:", 1)
        titled = (head_part + "\n\n" + POSTER_TITLE.format(title=poster["title"]) + "\n\nAvoid:"
                  + avoid_part.replace(" text, letters, numbers,", " any other text, numbers,", 1))
        attach = items(poster.get("anchors"))
        o += ["---", "", "## Poster", "",
              f"The 9:16 still shown before the video plays, saved as `{media}/poster.webp` "
              "(900×1600). One picture that sums up the lesson, with the title over a calm strip "
              "at the bottom, like lesson 1's.", ""]
        if poster.get("note"):
            o += [f"**Watch for:** {poster['note']}", ""]
        o += ["Choose **9:16**. Attach: "
              + (", ".join(f"`docs/images/anchors/{a}`" for a in attach) or "nothing"), "",
              f"### A. With the title \"{poster['title']}\" painted in by Grok", "",
              "Check the spelling letter by letter, and regenerate if it's wrong.", "",
              "```", titled, "```", "",
              "### B. Without text (add the title yourself)", "",
              "```", plain, "```", ""]
    o += ["---", "", "## When all images are kept", "",
          "1. Make the video from the 9:16 images and the narration, the same way as lesson 1, "
          f"and save it as `{media}/video.mp4` with a 9:16 `poster.webp`.", "",
          f"2. Add the pictures and the video to `{tsrel}`:", "", "   ```ts",
          "   video: {",
          f"   \tsrc: '/{media.removeprefix('static/')}/video.mp4',",
          f"   \tposter: '/{media.removeprefix('static/')}/poster.webp',",
          "   \tduration: '0:00'",
          "   },"]
    for s in scenes:
        o.append(f"   // card '{s['id']}':  image: '/{media.removeprefix('static/')}/{s['id']}.webp'")
    o += ["   ```", "",
          "3. Run `npm test` and `npm run check:media` (deploy runs the size check too).", ""]
    out.write_text("\n".join(o), encoding="utf-8")


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("lesson", type=Path)
    ap.add_argument("--check", action="store_true")
    args = ap.parse_args()

    lesson = args.lesson.resolve()
    images = next((p for p in lesson.parents if (p / "image-prompt-guide.md").exists()), None)
    if images is None:
        sys.exit("Keep the lesson file in docs/images/<unit>/ next to image-prompt-guide.md")
    repo = images.parent.parent
    global b
    b = load_blocks(images)
    head, scenes = read_lesson(lesson)
    ts = find_ts(repo, lesson.parent.name, lesson.stem)
    cards = read_cards(ts) if ts else []
    if not ts:
        print(f"  warning: no src/lib/content/*/{lesson.parent.name}/{lesson.stem}.ts; "
              "every scene needs its own **Narration:**")
    problems, warnings = check(scenes, cards, b)
    for w in warnings:
        print(f"  warning: {w}")
    if problems:
        sys.exit("Please fix:\n  " + "\n  ".join(problems))
    if args.check:
        print(f"{lesson.name}: {len([s for s in scenes if s['id'] != 'poster'])} scenes, all fine")
        return
    out = lesson.with_suffix(".prompts.md")
    write(out, lesson, head, scenes, cards, ts, repo)
    print(f"Wrote {out}")


if __name__ == "__main__":
    main()
