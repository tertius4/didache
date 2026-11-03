# Scroll frame: top edge, bottom edge and parchment background

The app is a parchment sheet that fills the screen. Its top and bottom edges always stay visible while the content scrolls between them. These prompts produce vector art for those two edges and a tileable background texture, to replace the CSS placeholder in `src/lib/components/ui/ScrollEdge.svelte`.

Use a generator that can export **SVG** (for example Recraft in "Vector illustration" mode). Use a raster generator only for the background texture (§3), which may be a WebP.

## Colours

Use only these colours (the app's neutral scale). Give them to the generator as a fixed palette if it allows one:

`#F5F2F0` `#EAE4DF` `#D5C9BE` `#B9A592` `#94795F` `#7A5C3E` `#66492C`

No other hues. In particular, no wood colours, no gold, no red and no black outlines.

## 1. Top edge → `static/media/ui/scroll-edge-top.svg`

```
Flat vector illustration, SVG, very simple. A long, thin, horizontal strip showing the top edge of an old parchment sheet that curls gently over toward the viewer, seen straight on. The curl is a soft rounded lip: lighter on top where the light catches it, darker underneath where it turns under. Below the lip, the paper edge is slightly torn and deckled, an irregular soft wavy line. The strip is 1200 wide by 40 tall, and the shape fills the full width edge to edge, with no rods, no wooden rollers, no knobs, no ribbons and no seals. Limited palette of warm parchment beiges and soft browns only. Below the deckled edge the background is transparent. No text, no outlines, no texture noise, no drop shadow, no border.
```

## 2. Bottom edge → `static/media/ui/scroll-edge-bottom.svg`

Make it from the top-edge prompt, but replace the first sentences with:

```
… showing the bottom edge of an old parchment sheet that curls gently up and away from the viewer, seen straight on. The curl is a soft rounded lip at the very bottom: darker on top where it turns under, lighter at the bottom edge. Above the lip, the paper edge is slightly torn and deckled, an irregular soft wavy line, and above that the background is transparent.
```

Generate the bottom edge with the top edge attached as a reference, so both curls match. If they still differ, flip the top edge vertically and use that.

## 3. Parchment background → `static/media/ui/parchment.webp` (or `.svg`)

```
Seamless tileable texture, square, 512 by 512. Very subtle aged parchment paper seen flat and straight on: faint fibres, very soft light mottling, and nothing else. Even lighting with no vignette, no stains, no burns, no folds, no writing, no edges or borders. Colours only between #F5F2F0 and #EAE4DF, very low contrast, so text printed on top stays easy to read.
```

Check it tiles: place four copies in a 2×2 grid. If you can see the seams, regenerate.

## Checklist before adding the files

- [ ] The edges are under about 8 KB each, with no embedded raster images inside the SVG.
- [ ] They use only the palette above, with no outlines and no shadows baked in (the app adds its own shadow).
- [ ] The strips stretch well: at 375 px wide and at 560 px wide neither looks squashed or stretched. Prefer a design that tiles horizontally.
- [ ] The texture is low contrast. Body text (`#1E150B`) on top of it must stay easy to read.

When the files are in `static/media/ui/`, ask for `ScrollEdge.svelte` and the `paper-grain` utility in `src/app.css` to switch to them.
