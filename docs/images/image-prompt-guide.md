# Image Prompt Guide

Use this file every time you make an image for a lesson. It gives you fixed blocks of text to paste into Grok, in a fixed order, so that every image has the same style, light, camera and limits.

## Prevent images from drifting

**The problem:** Grok fills every gap in a prompt with its own defaults, which are glossy, high-contrast and almost photographic. Small gaps add up, so images made on different days stop looking like one book.

**The solution:** close every gap with a fixed block, and change only the SCENE line.

| Gap              | What goes wrong                                                         | Fixed by                                    |
| ---------------- | ----------------------------------------------------------------------- | ------------------------------------------- |
| Colour           | Loose words ("warm cream, sky blue") give a new palette each time       | Named paint pigments in the STYLE LOCK (§1) |
| Light            | Each scene describes its own light, and Grok blends it with the default | One LIGHT preset per mood (§2)              |
| Camera           | Lens, height and size of people change per image                        | Four CAMERA presets (§3)                    |
| Recurring things | Clouds, water, trees and faces are drawn differently each time          | Rendering recipes (§4)                      |
| Paper            | "On paper" makes Grok paint a sheet with edges or tape                  | Full-bleed rule in the STYLE LOCK (§1)      |

**The rule:** only the SCENE line ever changes. Everything else is pasted from this file, unchanged, in the same order.

## The prompt template

Build every prompt from these slots, in this order. Grok weighs the start of a prompt most, so the style comes first and the avoid line comes last.

```
[1 STYLE LOCK]
[2 LIGHT preset for the mood]
[3 CAMERA preset]
[4 CHARACTER / PROP lines, word for word from style-guide.md §5, only if they appear]
SCENE: [5 one to four sentences: where, who, doing what, focal point, what fills the left and right sides]
[6 AVOID line]
```

Rules for the SCENE line, because this is where wiggle room creeps back in:

- **One focal point**, named first. "In the centre, …" then everything else.
- **At most three groups of people** and at most five named things. More than that and Grok invents its own composition.
- **No style words** in the SCENE ("beautiful", "dramatic", "cinematic", "epic", "detailed", "4k", "masterpiece"). They override the lock. Describe objects and actions only.
- **No light words** in the SCENE except where a light source is part of the story (a lamp, a glowing window). The LIGHT preset owns the light.

## 1. STYLE LOCK (paste first, every time, unchanged)

```
Traditional gouache painting with light watercolour washes, from a hand-made family Bible storybook. Full-bleed: the painting fills the entire frame edge to edge, no visible paper edge, no border, no tape, not a photo of a painting. Matte opaque gouache on warm cream cold-press cotton paper, with fine paper grain visible across the whole image. Broad, simple, flat shapes built from soft visible brush strokes; wet-in-wet softness in skies and distances; light dry-brush texture on earth, wood, stone and foliage. No outlines: shapes are separated by colour and value only, with occasional fine coloured-pencil marks for small details. Limited pigment palette only: yellow ochre, raw sienna, burnt sienna, Naples yellow, warm cadmium yellow for glows, cerulean blue, ultramarine, sap green and olive green, with a warm cream paper tone. Shadows are transparent ultramarine-violet, never black or grey. Medium-low contrast, soft gentle saturation, nothing neon, no pure white and no pure black. Atmospheric perspective: the distance becomes bluer and simpler. Bronze-Age Ancient Near Eastern world. Portrait 3:4 aspect ratio, taller than wide.
```

## 2. LIGHT presets (paste exactly one)

The mood names match the mood scale in the style guide. The sun direction is fixed so that consecutive images match without the light jumping sides.

**GRACE**

```
LIGHT: low golden sunrise light from the upper left, warm Naples-yellow and cadmium glow on every lit edge, long soft violet shadows falling to the right, a clear pale sky warming to gold near the horizon. Warmest saturation of the series.
```

**CALM**

```
LIGHT: soft clear morning light from the upper left, gentle warm highlights, short soft ultramarine-violet shadows falling to the right, a pale cerulean sky with a few soft cream clouds. Balanced, even, peaceful.
```

**SHADOW**

```
LIGHT: low dusk light from the far left, colours slightly greyed and cooler than a normal day, long cool violet shadows across the ground, a dull fading ochre-orange sky turning grey-violet overhead. Uneasy and quiet.
```

**SORROW**

```
LIGHT: the last light just after sunset from the far left, soft and even, colours gently drained toward greyed ochre, dusty olive and grey-blue, a faint fading warmth on the left-facing edges of things, soft short violet shadows, a pale even grey-violet sky with no cloud shapes and no rays of light. Sorrowful, tender and still, not frightening.
```

**JUDGMENT**

```
LIGHT: flat, dim, overcast light, a heavy sky of soft slate-blue and grey-violet clouds, low contrast, muted olive, grey-blue and dusty brown colours across the land, only a thin band of pale light at the horizon. Solemn and still, not frightening.
```

**NIGHT** (use for night scenes inside any mood, such as lesson 1 image 5)

```
LIGHT: night, deep ultramarine and violet everywhere, soft starlight, the only warm colour coming from small lamp-lit windows or fires that glow cadmium yellow and cast soft pools of light. Quiet and still.
```

If a scene must break the light direction (the sun rising over the ark on the right, for example), change only the words "upper left" in the preset and note it in the lesson file.

## 3. CAMERA presets (paste exactly one)

**WIDE** (establishing shots, open country, the ark at full size, judgment)

```
CAMERA: wide distant view from a slightly raised position, low horizon in the lower third, a large sky filling the upper half, people tiny or absent, main subject inside the centre 70% of the frame.
```

**MEDIUM** (people doing something, groups, a family scene)

```
CAMERA: eye-level view at a natural distance, people shown full-length and filling about half the frame height, simple uncluttered background, main subject inside the centre 70% of the frame.
```

**OBJECT**

```
CAMERA: low close view at the height of a single object or small group of objects in the foreground, the main object filling about half the frame height just below centre, the ground falling away behind it to a small, pale, distant background, horizon in the upper third, only a thin strip of sky, main subject inside the centre 70% of the frame.
```

**CLOSE** (a face, a hand with the olive leaf, two people talking)

```
CAMERA: close eye-level view, one or two people shown from the waist up, a soft simplified background, faces in the centre of the frame and well away from the edges.
```

**HIGH** (seeing a whole town, God's point of view without a figure)

```
CAMERA: high bird's-eye view looking down at an angle, rooftops and courtyards small and readable, no sky except a thin strip at the top edge, main subject inside the centre 70% of the frame.
```

## 4. Rendering recipes for things that recur

You do not need to paste these into every prompt. Add the matching line **only when the thing is a main part of the scene**. They keep clouds, water and faces looking the same across lessons.

| Thing         | Line to add                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Faces         | `Faces are simple and painterly: natural-sized dark eyes, small soft noses, a few warm strokes for expression, never cartoon or doll-like.` |
| Clouds        | `Clouds are soft wet-in-wet gouache masses with no hard edges and no shapes, faces or figures in them.`                                     |
| Water         | `Water is painted in flat layered bands of cerulean and ultramarine with a few soft cream highlights, no splashes, no foam detail.`         |
| Rain / storm  | `Rain is a soft diagonal veil of grey-blue wash, no lightning bolts, no dramatic splashes.`                                                 |
| Trees         | `Palms and olive trees are simplified into a few soft brush-shaped clumps of olive and sap green.`                                          |
| Houses        | `Houses are small cubes of sun-dried mud brick in raw sienna and ochre, flat roofs, small dark doorways, no windows with glass.`            |
| Animals       | `Animals are natural and painterly, with real proportions, no human expressions, no large eyes and no smiles.`                              |
| Glowing light | `The glow is a soft warm cadmium-yellow bloom with no rays, no beams and no figure inside it.`                                              |

## 5. AVOID line (paste last, every time, unchanged)

Grok has no separate negative-prompt box, so this goes at the end of the prompt. It is kept short on purpose: in Grok a long list of forbidden things can make some of them _more_ likely to appear. The important rules are already built into the positive text above (no outlines, full bleed, no figures in clouds).

```
Avoid: text, letters, numbers, signatures, watermarks; borders or frames; outlines; cartoon, chibi or anime style; big eyes; 3D render; photorealism; glossy digital art; neon colours; lens flare; halos; faces in clouds or light; modern objects; European castles.
```

## 6. Making Grok copy itself: the style anchor

Text alone gets you about 80% of the way. The rest comes from showing Grok the style.

1. **Make one style anchor first.** Generate lesson 1 image 1 (`world-filling-up`) with the template above. Generate a few batches until one image is exactly the look you want. That image becomes `docs/art/anchors/style-anchor.png`. Never replace it lightly: every later image is measured against it.
2. **Attach the anchor to every new prompt.** In Grok, attach the anchor image (the paperclip or image button), then start the prompt with this line before the STYLE LOCK:
   ```
   Use the attached image only as a style reference. Copy its paint handling, paper grain, brushwork, palette and level of detail exactly. Do not copy its composition, place or content. Paint a new scene:
   ```
3. **Make one anchor per character.** The first time Noah appears and looks right (lesson 2), save a clean, close version as `docs/art/anchors/noah.png`. Do the same for each family member and for the ark. When a character appears again, attach their anchor and add: `The man is the same person as in the attached image: same face, beard, head wrap and clothing.` If Grok only lets you attach one image, attach the character anchor and rely on the STYLE LOCK for the style.
4. **Iterate by editing, not by rewriting.** When an image is nearly right, use Grok's edit on that image ("make the sky calmer, remove the second tree") instead of generating from scratch. Every fresh generation is a new roll of the dice.

## 7. A selection routine

Consistency also comes from what you _keep_.

- Generate a full batch (Grok gives several images per prompt). Judge them side by side with the style anchor open next to them.
- Throw away anything that fails the style guide's checklist (§7) on the first look. Do not "fix" a wrong look by adding adjectives to the prompt. Change only the SCENE line, or regenerate.
- When all images for a lesson are done, look at them in a row as small thumbnails. The odd one out is usually obvious. Regenerate it.
- Run the finished images through `docs/video/tools/finish-images.sh` (see the [production workflow](../video/production-workflow.md)). It crops every image to exactly 3:4 portrait, gives it the same gentle colour grade and lays the same paper grain over all of them, which hides most of the small differences that are left.
- Keep a prompt log: paste the exact prompt that made each kept image into the lesson file under the image. When a later image drifts, you can see what changed.

## 8. Worked example: lesson 1, image 2 (`sin-spread`)

This is the same scene as in `noah/01-a-wicked-world.md`, rebuilt with the lock. Note that the SCENE line has lost its style and light words, because the presets now carry them.

```
Use the attached image only as a style reference. Copy its paint handling, paper grain, brushwork, palette and level of detail exactly. Do not copy its composition, place or content. Paint a new scene:

Traditional gouache painting with light watercolour washes, from a hand-made family Bible storybook. Full-bleed: the painting fills the entire frame edge to edge, no visible paper edge, no border, no tape, not a photo of a painting. Matte opaque gouache on warm cream cold-press cotton paper, with fine paper grain visible across the whole image. Broad, simple, flat shapes built from soft visible brush strokes; wet-in-wet softness in skies and distances; light dry-brush texture on earth, wood, stone and foliage. No outlines: shapes are separated by colour and value only, with occasional fine coloured-pencil marks for small details. Limited pigment palette only: yellow ochre, raw sienna, burnt sienna, Naples yellow, warm cadmium yellow for glows, cerulean blue, ultramarine, sap green and olive green, with a warm cream paper tone. Shadows are transparent ultramarine-violet, never black or grey. Medium-low contrast, soft gentle saturation, nothing neon, no pure white and no pure black. Atmospheric perspective: the distance becomes paler, bluer and simpler. Bronze-Age Ancient Near Eastern world. Calm, dignified and warm, for all ages. Portrait 3:4 aspect ratio, taller than wide.

LIGHT: low dusk light from the far left, colours slightly greyed and cooler than a normal day, long cool violet shadows across the ground, a dull fading ochre-orange sky turning grey-violet overhead. Uneasy and quiet.

CAMERA: eye-level view at a natural distance, people shown full-length and filling about half the frame height, simple uncluttered background, main subject inside the centre 70% of the frame.

Faces are simple and painterly: natural-sized dark eyes, small soft noses, a few warm strokes for expression, never cartoon or doll-like.

SCENE: In the centre, a merchant behind a market stall of clay jars and grain sacks presses his thumb on one pan of a bronze balance scale while smiling at a customer. On the left, two men pull at the same basket of bread, one yanking it away. On the right, a richly dressed man shuts a wooden door on a thin woman holding an empty clay bowl. Behind them, a mud-brick street with townspeople turning their backs. No one is hurt and there are no weapons.

Avoid: text, letters, numbers, signatures, watermarks; borders or frames; outlines; cartoon, chibi or anime style; big eyes; 3D render; photorealism; glossy digital art; neon colours; lens flare; halos; faces in clouds or light; modern objects; European castles.
```

## 9. Quick-fill sheet

Copy this into a lesson file for each new image and fill in the four blanks. The rest is pasted from above.

```
### N. `scene-id`: MOOD
Narration: "..."
Presets: LIGHT = ____  CAMERA = ____  Recipes = ____  Anchors attached = ____
SCENE: ____
Kept image prompt: (paste the exact prompt here once you keep an image)
```
