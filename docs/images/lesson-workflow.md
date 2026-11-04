# Making a lesson's pictures, video and narration

Every lesson needs, for each story card:

| What                       | Shape                            | Where it goes                       |
| -------------------------- | -------------------------------- | ----------------------------------- |
| A video image              | 9:16, full screen                | the intro video (`video.mp4`, 9:16) |
| The same painting, widened | 4:3, 1200×900 WebP               | the story card in "Read story"      |
| Narration                  | the card's `body`, word for word | spoken over the video image         |

Lesson 1 (`a-wicked-world`) is the model: one scene per story card, the card text is the narration, and each card picture is the video frame widened to 4:3.

## The steps

1. **Story cards first.** The cards in `src/lib/content/<section>/<unit>/NN-lesson.ts` decide the scenes and the words. Fix the wording there before making any pictures, because the card text is also the narration and the captions.

2. **Write the lesson's image file.** Copy [lesson-template.md](lesson-template.md) to `docs/images/<unit>/NN-lesson.md` (same name as the `.ts`) and fill in one block per card: light, camera, recipes, characters, anchors and what the image shows. Add a `### Poster` block with the title for the video's poster. See [noah/02-noah-found-grace.md](noah/02-noah-found-grace.md).

3. **Build the prompts.**

   ```bash
   python3 docs/images/tools/build-lesson.py docs/images/noah/03-into-the-ark.md
   ```

   It checks the file against the cards and the guide, then writes `NN-lesson.prompts.md` with the full 9:16 video prompt for every scene, the narration script, and the poster prompt (with and without the title). Run it again after any change.

4. **Make the images in Grok**, scene by scene: first the 9:16 video image from the prompt, then, on the image you keep, choose the 4:3 aspect ratio to get the story card. Save the cards as 1200×900 WebP in `static/media/<section>/<unit>/<lesson>/<scene-id>.webp`. The selection routine is in [image-prompt-guide.md](image-prompt-guide.md) §7.

5. **Record the narration** from the narration script in the prompts file, and **make the video** from the 9:16 images the same way as lesson 1. Save `video.mp4` and a 9:16 `poster.webp` in the lesson's media folder.

6. **Wire it up.** Add `video` and each card's `image` to the lesson's `.ts` (the prompts file lists the exact lines), then run `npm test` and `npm run check:media`.

## The size check

`npm run deploy` first runs `npm run check:media` ([scripts/check-media.js](../../scripts/check-media.js)) and stops the deploy if anything is off:

| File                         | Must be  |
| ---------------------------- | -------- |
| story card `<scene-id>.webp` | 1200×900 |
| `poster.webp`                | 900×1600 |
| `video.mp4`                  | 720×1280 |
| unit `icon.webp`             | square   |
| about pictures               | 1200×900 |

It also fails when a file has no rule, or when a lesson points at a file that doesn't exist. The sizes are lesson 1's; change them in `RULES` at the top of the script.

## Files

```
docs/images/
  image-prompt-guide.md        the fixed prompt blocks (style, format, light, camera, avoid)
  characters.md                character and prop lines, pasted word for word
  lesson-template.md           start of every lesson's image file
  lesson-workflow.md           this file
  anchors/                     style-anchor.png, noah.png, ark.png…
  noah/NN-lesson.md            what each image shows (you write this)
  noah/NN-lesson.prompts.md    generated: every prompt and the narration script
  tools/build-lesson.py        builds the prompts file
static/media/<section>/<unit>/<lesson>/
  <scene-id>.webp  video.mp4  poster.webp
```
