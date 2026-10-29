# Unilogos art style guide

Every lesson opens with a short narrated slideshow: 4–6 still images, each shown while its voice-over clip plays. This guide keeps every image in every lesson looking like it comes from the same book. Read it before you make images for a new lesson.

## 1. How the app shows the images (animation)

The images are still pictures. The app adds all the motion, so **never ask the image generator for motion blur, multiple panels or sequences.**

| Motion         | What the app does                                                                                      | What it means for the image                                                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Slow drift     | Each image slowly zooms (100% → about 108%) or pans for as long as its narration lasts, usually 6–12 s | Keep the main subject inside the **centre 70%** of the frame. Anything important touching the edges will be cropped.                              |
| Crossfade      | Each image dissolves into the next over about 0.6 s                                                    | Consecutive images in a lesson should share light and colour unless the story changes mood. A jump from bright noon to black night looks jarring. |
| Caption        | The narration text appears **below** the image, never on it                                            | The image contains no text at all.                                                                                                                |
| Reduced motion | Users who turn off motion see the image without the drift                                              | The image must work fully when still.                                                                                                             |

Each prompt file lists a **motion** for every image (`zoom in`, `zoom out`, `pan left`, `pan right`). Compose for it. For example, with `pan right` leave some room on the right side of the frame, because that is where the camera ends up.

## 2. Format

- **Aspect ratio 4:3 landscape.** Generate at 1536×1152 or larger (Midjourney: `--ar 4:3`).
- Export as **WebP, 1200×900, quality about 80** (aim for under 250 KB).
- File name = scene id, saved to `static/media/<section>/<unit>/<lesson>/<scene-id>.webp`
  (e.g. `static/media/bible-stories/noah/a-wicked-world/world-filling-up.webp`).
- The voice-over from Renderforest is saved next to it with the same name: `<scene-id>.mp3`. Export one clip per image and trim the silence at both ends.

## 3. The look: warm storybook

**In one sentence:** a hand-painted gouache illustration from a beautifully made family Bible storybook. It is warm, calm and dignified, never cartoonish.

- **Medium:** gouache and watercolour on warm, lightly textured cotton paper. Visible soft brush strokes, gentle colour bleeds at the edges and subtle paper grain everywhere.
- **Line:** no black outlines. Shapes are defined by colour and value. Fine coloured pencil lines are allowed for small details (plank seams, hair, fabric folds).
- **Light:** one clear, soft, directional light source, golden hour by default. Glowing warm highlights and cool, transparent shadows (blue-violet, never black).
- **Composition:** simple and readable at phone size. One clear focal point, a big sky or open space for breathing room, and a strong silhouette for the main subject. Use a low horizon for epic scenes and an eye-level camera for human scenes.
- **Detail level:** mid. Clear shapes up close and simplified in the distance (atmospheric perspective: distant hills are paler and bluer).
- **People:** realistic proportions, softened. Simple but expressive faces with natural-sized eyes. People are Ancient Near Eastern, with olive-to-deep-brown skin and dark hair. They wear woven wool and linen in earth tones (sand, ochre, terracotta, olive, indigo). They wear sandals or go barefoot.
- **Animals:** natural and painterly, never cute. No human expressions, no big eyes and no smiles.
- **World:** a Bronze-Age Mesopotamian feel. Mud-brick houses with flat roofs, reed fences, clay jars, palm and olive trees, river valleys and rolling hills. No modern objects, no medieval European buildings, no fantasy architecture.

### Palette

The palette is anchored to the app's colours, so the images sit naturally on the app's cream background.

| Role               | Colour          | Hex                                    |
| ------------------ | --------------- | -------------------------------------- |
| Paper / light      | warm cream      | `#FFFAF0`                              |
| Sky                | soft sky blue   | `#3AA6E8` (painted softer and lighter) |
| Sun / glow / grace | sun yellow      | `#FFC533`                              |
| Growth / land      | leaf green      | `#2FB36B` (muted toward olive)         |
| Wood / ark / earth | warm wood brown | `#A8693C`                              |
| Shadow             | blue-violet     | about `#5B5A8A`                        |

### Mood scale

Use the light to tell the story. Every prompt names its mood level.

| Level        | When                             | Light and colour                                                    |
| ------------ | -------------------------------- | ------------------------------------------------------------------- |
| **Grace**    | God's kindness, promise, worship | Golden sunrise or sunset, warm saturated colour, glowing highlights |
| **Calm**     | Daily life, narration of facts   | Soft morning light, balanced warm palette                           |
| **Shadow**   | Sin, disobedience, warning       | Dusk, colours slightly desaturated, longer shadows, cooler sky      |
| **Judgment** | Grief over sin, storm, flood     | Grey-blue and slate, low contrast, heavy sky. Solemn, never horror  |

## 4. Rules (non-negotiable)

**Theology (Heidelberg Catechism Q&A 96–98)**

1. **Never depict God** in any form: no figure, face, hands, eye in the sky, faces in clouds, glowing person or personified beam of light. Show God's actions only through their effects (wind on water, a door already shut, clouds parting) and through people's reactions. The narration says who acts.
2. **Never depict Jesus.** When the narration speaks of Christ, show a landscape, a road toward sunrise, the ark or the people responding.
3. **No angels or Nephilim/giants** unless a lesson specifically calls for them and the depiction has been agreed first.

**All ages** 4. No dead bodies, no drowning people, no blood, no weapons used against people and no gore. Violence is shown only as arguing, pushing or grabbing. 5. No nudity or immodesty. In lesson 6, Noah's tent is only ever seen from outside. 6. Judgment is shown through **emptiness, weather and scale**, not suffering. For example, an empty landscape under water, or a storm over the land.

**Technical** 7. **No text, letters, numbers, symbols, logos, signatures or watermarks** in the image. Regenerate if any appear. 8. One image is one moment. No comic panels, no split screens and no borders or frames. 9. No 3D-render, photographic, anime or glossy digital-art look.

## 5. Character and prop sheet

When a character appears, paste their line into the prompt **word for word every time**, because generators don't remember earlier images. Most generators also accept a reference image: keep the first good image of each character and attach it as a character/style reference for later ones.

```
NOAH: an elderly but strong Ancient Near Eastern man, olive-brown weathered skin, deep-set kind dark eyes with smile lines, long full grey-white beard reaching his chest, thick grey eyebrows, grey hair under a simple undyed cream wool head wrap, a long cream wool robe with a wide brown woven sash, a dark brown outer mantle, leather sandals, often holding a plain wooden staff. Calm, steady, humble expression.

NOAH'S WIFE: an elderly Ancient Near Eastern woman, olive-brown skin, warm gentle face with smile lines, grey hair mostly covered by a terracotta-red head covering, a long sand-coloured linen dress with a red-and-ochre woven belt, a small bronze bead necklace.

SHEM: a man in his late twenties, olive-brown skin, neatly trimmed short dark beard, shoulder-length dark hair tied back, calm thoughtful expression, an indigo-blue wool tunic with a brown sash.

HAM: a man in his mid-twenties, deep brown skin, clean-shaven, short curly black hair, quick restless eyes, a mustard-ochre tunic with a dark red sash.

JAPHETH: a man in his early twenties, light olive skin, short dark wavy hair, thin moustache and short stubble, open friendly expression, an olive-green tunic with a cream sash.

THE SONS' WIVES: three young Ancient Near Eastern women with olive-to-brown skin, long simple linen dresses, head coverings in muted plum, faded sky blue and soft peach.

THE ARK: an enormous long rectangular wooden barge, box-shaped like a floating warehouse (six times longer than wide, flat bottom, no pointed bow, no mast, no sails), built of warm brown gopher-wood planks with darker horizontal seams sealed with black pitch, a low pitched roof along its full length, a narrow row of small openings just under the roof, and one large door in the side.
```

## 6. Prompt formula

Every image prompt is built in this order:

```
[STYLE BLOCK] + [character/prop lines, if any] + [SCENE] + [AVOID BLOCK]
```

**STYLE BLOCK** (paste first, unchanged):

```
A hand-painted gouache and watercolour illustration from a beautifully made family Bible storybook. Warm textured cotton paper with visible grain, soft visible brush strokes, gentle colour bleeds, no black outlines. One soft directional light source, warm glowing highlights and transparent blue-violet shadows. Atmospheric perspective: distant hills paler and bluer. Calm, simple, readable composition with one clear focal point and generous open space; the main subject kept within the centre of the frame. Bronze-Age Ancient Near Eastern setting: mud-brick flat-roofed houses, reed fences, clay jars, palm and olive trees. People have realistic softened proportions, natural-sized eyes and olive-to-brown skin, and wear woven wool and linen in earth tones. Palette of warm cream, soft sky blue, sun yellow, muted leaf green and warm wood brown. Dignified, gentle and warm, suitable for all ages. Landscape 4:3.
```

**AVOID BLOCK** (paste last, or put it in the "negative prompt" field):

```
Avoid: any text, letters, numbers, symbols, signatures, logos or watermarks; any depiction of God, faces or figures in clouds or light, angels, halos; dead bodies, blood, weapons, gore, nudity; cartoon or chibi style, oversized eyes, anime, 3D render, photorealism, glossy digital art; modern objects, European medieval buildings, fantasy architecture; comic panels, borders, frames, split images.
```

## 7. Quality checklist (before adding an image to the app)

- [ ] It contains no text or text-like marks, including on clothing, jars and walls
- [ ] Nothing could be read as a depiction of God (check the clouds and light beams)
- [ ] The characters match the sheet: beard, colours, clothing
- [ ] The ark is box-shaped, with no bow and no mast
- [ ] The main subject still works when the outer 15% is cropped
- [ ] It sits comfortably next to the previous image in the lesson (light and palette)
- [ ] It suits a 7-year-old and a 70-year-old alike
- [ ] It is exported as WebP at 1200×900 and named after the scene id
