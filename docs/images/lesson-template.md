# Noah lesson N: Lesson title (Genesis 0:0–0)

One image per story card in `src/lib/content/bible-stories/noah/NN-lesson-id.ts`, in the same order and with the same ids. The narration is each card's text, so it isn't repeated here. Then run `python3 docs/images/tools/build-lesson.py docs/images/noah/NN-lesson-id.md`.

**Arc of the lesson:** … The light moves from **…** to **…**.

<!--
Fields for each scene (one per line, each starting with **Name:**):

  Light       GRACE, CALM, SHADOW, SORROW, JUDGMENT or NIGHT (guide §2). Can be left out
              when the mood after the heading is one of these words. Keep neighbouring
              scenes close in light.
  Camera      WIDE, MEDIUM, OBJECT, CLOSE or HIGH (guide §3). Mix them.
  Recipes     optional, comma separated: Faces, Clouds, Water, Rain / storm, Trees, Houses,
              Animals, Glowing light (guide §4). Only for things that are a main part of the image.
  Characters  optional, comma separated, as in characters.md: NOAH, NOAH'S WIFE, SHEM, HAM,
              JAPHETH, THE SONS' WIVES, THE ARK.
  Anchors     files from docs/images/anchors/ to attach: style-anchor.png, plus noah.png,
              ark.png… once they exist.
  Shows       one to four sentences, starting with "In the centre, …". Objects and actions only:
              no style words and no light words. Keep the main subject in the middle, because
              the 4:3 card widens the image to the left and right.
  Note        optional: what to watch for, which anchor to save.
  Narration   optional: only when the spoken words must differ from the card text.
  Caption ref optional: only when the caption verse must differ from the card's verse.
-->

### 1. `first-card-id`: Calm

**Light:** CALM
**Camera:** WIDE
**Recipes:** Trees
**Characters:** THE ARK
**Anchors:** style-anchor.png, ark.png
**Shows:** In the centre, …
**Note:** …

### 2. `second-card-id`: Grace

**Light:** GRACE
**Camera:** MEDIUM
**Recipes:** Faces
**Characters:** NOAH
**Anchors:** style-anchor.png, noah.png
**Shows:** In the centre, …

### Poster

**Title:** A Short Line That Sums Up the Lesson.
**Light:** GRACE
**Camera:** WIDE
**Characters:** THE ARK
**Anchors:** style-anchor.png, ark.png
**Shows:** In the centre, … The lower fifth of the image is calm and simple, with nothing in it.
