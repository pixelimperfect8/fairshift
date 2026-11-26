# FairShift

The FairShift landing page in two design directions, with the design system behind each. FairShift is a payday check-in for hourly teams: it texts employees three questions each pay period and gives the owner one page of what to fix.

This is the marketing site, plus a clickable prototype of employer onboarding. The product itself is not built here.

## What is in this folder

| Folder | What it is | Local address |
| --- | --- | --- |
| `site/` | The landing page. Version 1 is at `/`, version 2 is at `/v2`, and version 2-A (v2 in daylight, with mixed trades) is at `/v2a`. | http://localhost:3910 |
| `design-systems/payday/` | The design system for version 1. | http://localhost:3930 |
| `design-systems/shift/` | The design system for version 2. | http://localhost:3920 |
| `design-systems/shift/app/app/` | The employer onboarding prototype, built from the Shift components. | http://localhost:3920/app |
| `scripts/build-ds.mjs` | Builds both design systems into `site/public/ds`. | |

**Version 1** is product-led: warm paper, serif headlines, pill buttons, flat white cards, with product shots and photographs side by side.

**Version 2** is cinematic: black and white with one blue, sans headlines in two tones, squared buttons, photographs first.

## Run it

Needs Node.js 20.9 or later.

```bash
npm run install:all
npm run dev
```

Then open http://localhost:3910 for version 1 and http://localhost:3910/v2 for version 2.

The "Design system" link in the bottom-right corner of each version opens a built copy of its design system, served by the site from `site/public/ds`. You do not need a second server for that link to work.

To work on a design system itself, run it on its own:

```bash
npm run dev:ds:v1   # Payday, port 3930
npm run dev:ds:v2   # Shift, port 3920
```

After changing a design system, rebuild the copies the site serves:

```bash
npm run build:ds
```

## The onboarding prototype

A clickable walkthrough of how a new employer sets up FairShift. It is a prototype: no backend, no sign-in, sample data only. It lives inside the Shift design system so it uses the real themed components.

```bash
npm run dev:ds:v2
```

Then open http://localhost:3920/app.

| Screen | Address | What it shows |
| --- | --- | --- |
| Dashboard, first visit | `/app` | An empty state that points to the two setup steps. |
| Business profile | `/app/setup/business` | Name, industry, locations, payday schedule, next payday, and who hears about concerns. |
| Add workers | `/app/setup/workers` | Upload a CSV (match columns, preview rows) or add one person by hand, ending on a searchable roster. |
| Review and turn on | `/app/setup/review` | A summary and the payday text in English and Spanish. |
| Dashboard, set up | `/app` | The latest check-in, any open concern, past paydays and the record. |

- **State** is kept in the browser's localStorage. "Start over" in the header clears it.
- **Sample data:** "Fill in sample details" and "Use the sample file" load a made-up farm, Lindero Verde Farms. The past paydays and the record are generated from the roster in `_lib/history.ts`.
- **Palette:** the prototype wears the version 2-A light palette, scoped to its own wrapper in `prototype.css`, so the design system page at `/` is unchanged.
- **One-page build:** building with `NEXT_PUBLIC_PROTOTYPE_SINGLE=1` keeps every screen on one page and switches between them with the URL hash. Use it for a copy that has to run as a single static file.

Where things are, under `design-systems/shift/app/app`:

- `page.tsx` and `setup/*/page.tsx`: the screens.
- `_components`: the shell (header, setup progress, pinned actions bar), the set-up dashboard and the add-a-person dialog.
- `_lib`: `store.ts` (state), `data.ts` (choices, validation, CSV reading, sample business), `history.ts` (sample paydays and concerns), `nav.tsx` (links and routing for both builds).

Not settled by the product brief, so assumed in the prototype: how workers give consent to texts, the time of day the check-in goes out, and the wording of the payday text in both languages, which still needs legal and native-speaker review.

## The stack

**Site:** Next.js 16 (App Router), React 19, Tailwind CSS 4, Framer Motion, Lenis for smooth scrolling.

**Design systems:** Next.js 16, [shadcn/ui](https://ui.shadcn.com) on Base UI primitives (style `base-maia`), Tailwind CSS 4, Hugeicons. Each one has 63 components in `components/ui`, restyled from the `DESIGN.md` in its folder. The tokens live in `app/globals.css`. Add a component with `npx shadcn@latest add <name>` from inside the design system folder.

Where a project has an `AGENTS.md`, it points at the Next.js docs shipped in `node_modules/next/dist/docs`. This Next.js version differs from older ones, so read those before changing framework code.

## Where things are in the site

- `site/src/lib/content.ts`: all the copy for versions 1 and 2.
- `site/src/lib/content-v2a.ts`: version 2-A's own copy, written to the voice and messaging guide. The v2 sections read their words through `useCopy()` in `site/src/components/v2/variant.tsx`, so version 2 keeps the copy in `content.ts`.
- `site/src/app/globals.css`: version 1 tokens and styles first, then version 2 styles scoped under `.v2`.
- `site/src/app/(v1)` and `site/src/components/*.tsx`: version 1.
- `site/src/app/(v2)` and `site/src/components/v2`: version 2.
- `site/src/lib/motion.ts`: the shared easing curve and `useStill()`, the reduced-motion hook every animation checks.

## Settings

All optional. Set them in `site/.env.local` or on the host.

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_DS_URL_V1` | Where version 1's "Design system" link goes. Default `/ds/v1/index.html`. |
| `NEXT_PUBLIC_DS_URL` | Where version 2's "Design system" link goes. Default `/ds/v2/index.html`. |
| `NEXT_PUBLIC_HIDE_RIBBON=1` | Hides the demo ribbon. |
| `NEXT_PUBLIC_PHOTO_BASE` | Loads photographs from this path as `<id>.jpg` instead of from Unsplash. |

In a design system, `NEXT_PUBLIC_SITE_URL` sets where "View the site" goes.

## Deploying

Deploy `site/` as a Next.js app. Run `npm run build:ds` first if a design system changed, and commit `site/public/ds`.

## Before this goes live

- The "Book a demo" links point at `#demo` and the contact address is `hello@fairshift.example`. Both are placeholders.
- The name FairShift is a working name.
- Prices and plan names are a proposal.
- Legal statements (PAGA figures, the retaliation window, premium pay) need review by counsel. Sources are named beside each figure.
- The EN/ES toggle changes the page language tag only. Spanish copy has not been written, and the sample messages in other languages need a native review.
- Photographs are loaded from Unsplash by id as stand-ins. Replace them with licensed or commissioned photographs.
- All names, businesses and report data shown in product shots are invented samples.
