# Unilogos

Short, story-first lessons for learning the Bible from a Reformed perspective. This is a demo with one unit (Noah and the Flood, six lessons), no accounts, and progress saved on the device.

Built with SvelteKit (static, client-rendered) and Capacitor.

## Develop

```sh
npm install
cp .env.example .env   # optional: PostHog + Formspree keys; empty = disabled/stubbed
npm run dev
```

| Command         | What it does                                         |
| --------------- | ---------------------------------------------------- |
| `npm run dev`   | Dev server                                           |
| `npm run build` | Static build into `build/` (every route prerendered) |
| `npm test`      | Unit tests (engine, progress, content integrity)     |
| `npm run check` | Type check                                           |
| `npm run lint`  | Prettier + ESLint                                    |
| `npx cap sync`  | Copy `build/` into native projects (once added)      |

To add a native app later: `npx cap add android` (or `ios`), then `npm run build && npx cap sync`.

## Content

Content is plain TypeScript data in [src/lib/content](src/lib/content):

```
Section  (bible-stories/section.ts)       Bible Stories, The Big Story, Christ in All Scripture
└─ Unit  (bible-stories/noah/unit.ts)     e.g. Noah and the Flood
   └─ Lesson (01-a-wicked-world.ts, …)    intro video + story cards + ~10 exercises
```

- A lesson has `story` cards (with optional `learnMore` doctrine) and `exercises` of type `mc`, `fill`, `truefalse`, `order` or `match`. Every exercise carries an ESV `verse` that is shown in the feedback.
- To add a unit: create a folder with lesson files and a `unit.ts`, then add it to the section's `units`. To add a section: create `section.ts` and add it to `sections` in [index.ts](src/lib/content/index.ts). Routes, unlocking and prerendering pick it up automatically.
- `npm test` validates every lesson: unique ids, answers present among options, one `___` per blank, and so on.

Lessons unlock in order within a unit. Progress is stored in `localStorage` behind [storage.ts](src/lib/progress/storage.ts), so it can move to Capacitor Preferences later.

## Measuring interest

- **PostHog** (`VITE_POSTHOG_KEY`): anonymous and cookieless (in-memory persistence, no person profiles). It is lazy-loaded and left out of the bundle when no key is set. Events: `intro_completed`, `lesson_started`, `story_card_viewed`, `learn_more_opened`, `exercise_answered`, `lesson_completed`, `lesson_abandoned`, `unit_completed`, `waitlist_joined`, `feedback_submitted`.
- **Formspree** (`VITE_FORMSPREE_ID`): one form receives both waitlist sign-ups and feedback, told apart by the `kind` field. Without an id, submissions are logged to the console.

Scripture quotations are from the ESV® Bible, © 2001 by Crossway. See the About page for the full notice.
