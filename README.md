# Didache

Didache helps people get to know their Bible better: a short story, then a few questions to help it stay with you. Just a few minutes a day. This is a test version with one unit (Noah and the Flood, six lessons), no accounts, and progress saved on the device.

Built with SvelteKit (every page prerendered to static HTML) and Capacitor. Hosted as static assets on a Cloudflare Worker.

## Develop

```sh
npm install
cp .env.example .env   # PostHog + Formspree keys and the site URL; empty = disabled/stubbed
npm run dev
```

| Command          | What it does                                           |
| ---------------- | ------------------------------------------------------ |
| `npm run dev`    | Dev server                                             |
| `npm run build`  | Static build into `build/` (every route prerendered)   |
| `npm run deploy` | Build, then `wrangler deploy` to the Cloudflare Worker |
| `npm test`       | Unit tests (engine, progress, content integrity)       |
| `npm run check`  | Type check                                             |
| `npm run lint`   | Prettier + ESLint                                      |
| `npx cap sync`   | Copy `build/` into native projects (once added)        |

To add a native app later: `npx cap add android` (or `ios`), then `npm run build && npx cap sync`.

## Content

Content is plain TypeScript data in [src/lib/content](src/lib/content):

```
Section  (bible-stories/section.ts)       Bible Stories, The Big Story, Christ in All Scripture
└─ Unit  (bible-stories/noah/unit.ts)     e.g. Noah and the Flood (or `comingSoon: true`, no lessons)
   └─ Lesson (01-a-wicked-world.ts, …)    intro video + story cards + ~10 exercises
```

- A lesson has `story` cards, which follow the video script one card per scene, each with a 4:3 `image` at `static/media/<section>/<unit>/<lesson>/<card-id>.webp`. It also has `exercises` of type `mc`, `fill`, `truefalse`, `order` or `match`. Every exercise carries an ESV `verse` that is shown in the feedback.
- A unit with `comingSoon: true` shows on the journey, greyed out and not clickable, until its lessons exist.
- To add a unit: create a folder with lesson files and a `unit.ts`, then add it to the section's `units`. To add a section: create `section.ts` and add it to `sections` in [index.ts](src/lib/content/index.ts). Routes, unlocking and prerendering pick it up automatically.
- `npm test` validates every lesson: unique ids, answers present among options, one `___` per blank, and so on.

Lessons unlock in order within a unit. Progress is stored in `localStorage` behind [storage.ts](src/lib/progress/storage.ts), so it can move to Capacitor Preferences later.

## Measuring interest

- **PostHog** (`VITE_POSTHOG_KEY`): anonymous and cookieless (in-memory persistence, no person profiles). It is lazy-loaded and left out of the bundle when no key is set. Events: `intro_completed`, `lesson_started`, `story_card_viewed`, `exercise_answered`, `lesson_completed`, `lesson_abandoned`, `unit_completed`, `waitlist_joined`, `feedback_submitted`.
- **Formspree** (`VITE_FORMSPREE_ID`): one form receives both waitlist sign-ups and feedback (the `/feedback` page and the lesson-end prompt), told apart by the `kind` field. In `npm run dev` without an id, submissions are logged to the console. A production build without one fails the submission and shows an error, so check the id is in `.env` before you deploy.

## Deploy

`VITE_*` values are baked in at build time from your local `.env`, so build and deploy from your machine:

```sh
npx wrangler login   # once
npm run deploy
```

`VITE_SITE_URL` (for example `https://didache.co.za`) is used for canonical and Open Graph URLs. The Worker serves `build/` as static assets, with `404.html` for unknown paths (see [wrangler.jsonc](wrangler.jsonc)).

Scripture quotations are from the ESV® Bible, © 2001 by Crossway. See the About page for the full notice.
