# Home View: Agent Guide

Extends the root `AGENTS.md`.

## Backgrounds

`Index.vue` is one CSS grid with named areas `logo`, `socials`, `events`, `about` (Wir) and `donate` (Spenden, Kontakt). The three background images are grid items placed on these area lines behind the content, so each is exactly as tall as its content and a growing element (the Zeffy form) only pushes content below it down.

| Layer  | Phones              | From `lg`          | Behavior                                                         |
| ------ | ------------------- | ------------------ | ---------------------------------------------------------------- |
| Sky    | `logo` to `socials` | `logo` to `events` | `bg-cover`, anchored to its bottom edge                          |
| Bushes | `events` to `donate`| `about` to `donate`| Full width, starts at the sky's bottom edge, tiles downwards     |
| Wall   | `donate`            | `donate`           | Full width, fades to black where the visible image part ends     |

Invariants:
1. The Heathers poster in the sky is visible on first load. On phones the sky is a band of at least `SKY_MIN_HEIGHT` and the event cards start below it; from `lg` the sky reaches behind all event cards. The horizontal focus point (`bg-position`) keeps the poster below the social links on phones and right of the event cards on wide screens.
2. The bushes start exactly at the sky's bottom edge; neither edge is ever cropped.
3. The bushes tile seamlessly, so the wall can start anywhere below Wir.
4. The wall starts right after Wir with its posters visible. Spenden starts below the posters (`WALL_POSTER_FRACTION` of the wall image), at most `WALL_POSTER_MAX_HEIGHT` down.

Tuning values are constants at the top of `Index.vue`. Image-dependent lengths are computed in `cqw` (`<main>` is a size container) from the image bundle's `width`/`height`, so replacing an image only needs `SKY_TOP_CROP`, `SKY_MIN_HEIGHT`, `WALL_POSTER_FRACTION` and `WALL_POSTER_MAX_HEIGHT` rechecked. Source files are in `design/`.

## Events

Upcoming events are `EventCard`s in the `events` area; anything else there (announcements, thank-you notes) is a `HeroCard` with free content. `NextShowCard` counts down to its `REVEAL_DATE` on the device clock, then fetches name and ticket URL from `public/next-show.json` (`fetchNextShow`, bypassing all caches, since the production server sends no `Cache-Control`). That file is the only place holding them: it keeps a joke placeholder until the real values are pushed and deployed shortly before the reveal, so a forward-set clock reveals nothing. Its background `RosePetalHole` is a canvas the card forwards its pointer events to (`paint()`); it reads its colors from the `--color-abh-*` tokens at mount.
- One date: a one-time event, shown with date, time range (`end`) and an optional description slot. Several dates: a production, shown as a schedule grouped by week (`ShowDates`), usually with `project-page` linking to its view.
- Only `title` and `dates` are required; see the props in `EventCard.vue`. `new Date(...)` months count from 0 (`11` is December).
- The poster links to `link.url`; with `link.label` a button is shown too.
- A card hides itself in the browser after its last day, keeping the pre-rendered HTML valid. Remove past events from the code with the next change.

```vue
<EventCard
  title="Come From Away"
  :dates="[new Date(2027, 5, 18, 19, 0), new Date(2027, 5, 19, 13, 30)]"
  :venue="{ name: 'Centre Français', address: '13349 Berlin', url: 'https://...' }"
  :poster="cfaPoster"
  poster-alt="Plakat: Come From Away"
  project-page="/cfa/"
  :link="{ url: 'https://...', label: 'Tickets' }"
/>
```
