---
name: Shift
description: The design system behind the FairShift site (v2). Black, white and one blue.
colors:
  paper: "#f5f5f2"
  paper-2: "#e8e8e4"
  ink: "#0a0a0a"
  ink-2: "#141414"
  ink-3: "#222222"
  blue: "#2340ff"
  blue-deep: "#1730d1"
  blue-on-dark: "#6f86ff"
  mute: "#5f5f5c"
  mute-dark: "#a3a39f"
  line: "rgb(10 10 10 / 0.14)"
  line-dark: "rgb(245 245 242 / 0.16)"
  success: "#0c7a50"
  warning: "#8a5200"
  danger: "#c8261b"
typography:
  family: Geist
  display: { size: "clamp(2.4rem, 6vw, 5.4rem)", weight: 450, line: 1.02, tracking: "-0.045em" }
  heading: { size: "clamp(2.1rem, 4.6vw, 4rem)", weight: 450, line: 1.02, tracking: "-0.045em" }
  step: { size: "clamp(1.7rem, 3vw, 2.7rem)", weight: 450, line: 1.08, tracking: "-0.045em" }
  row: { size: "clamp(1.3rem, 2.2vw, 1.8rem)", weight: 400, line: 1.15, tracking: "-0.03em" }
  lede: { size: "clamp(1.02rem, 1.25vw, 1.2rem)", weight: 400, line: 1.55 }
  body: { size: "1rem", weight: 400, line: 1.6 }
  small: { size: "0.875rem", weight: 400, line: 1.5 }
  label: { size: "0.875rem", weight: 500, line: 1.4 }
rounded:
  tag: 4px
  item: 6px
  control: 8px
  panel: 8px
  large: 12px
  dot: 9999px
spacing:
  section: "clamp(5rem, 9.5vw, 9rem)"
  heading-to-content: "clamp(3rem, 5.5vw, 5rem)"
  grid-gap: 1.5rem
  tile-gap: 0.75rem
  gutter: "clamp(1.25rem, 4vw, 2.5rem)"
  container: 78rem
controls:
  height: 44px
  height-large: 52px
  height-small: 36px
---

# Shift

## Overview

Shift is the design system behind FairShift, a payday check-in for hourly teams. The product is a text message, the buyer is a small-business owner, and the subject is employment law, so the system is plain, serious and human. It leads with photographs of people at work, speaks in two tones of one typeface, and separates things with hairlines instead of boxes. Blue is the only colour, and it means "act here".

## Colors

Two neutrals carry everything and alternate by section: warm white paper (`#f5f5f2`) and near-black ink (`#0a0a0a`). A slightly darker paper (`#e8e8e4`) makes inset panels.

Blue (`#2340ff`) is the single accent. It is used for the primary button, the employee's reply bubble, the lit part of a line drawing, and focus. On black, accent words and lines use the lighter `#6f86ff`, because `#2340ff` is too dim there.

Secondary text is ink at reduced strength (`#5f5f5c` on paper, `#a3a39f` on ink). Hairlines are ink at 14% on paper and paper at 16% on ink.

Status colours exist for product screens only: green for fixed, amber for an open flag, red for urgent. They never appear on marketing surfaces.

## Typography

One family, Geist, at a regular weight (450 for display, 400 for text) and set tight (−0.045em on display sizes). Size does the work bold would do elsewhere. There is no serif and no monospace: code and figures use the same sans with tabular numerals.

Headlines are written as two sentences in two tones: the first at full strength, the second at 42% (60% over a photograph).

## Layout

Every section has the same padding above and below (`clamp(5rem, 9.5vw, 9rem)`) and the same gap between its heading and its content (`clamp(3rem, 5.5vw, 5rem)`). Content sits on a 12-column grid with a 1.5rem gap, inside a 78rem column. Photographs in a strip sit 0.75rem apart.

## Elevation

Flat. Depth comes from black against white, not from shadows. Menus, toasts and dialogs take one soft shadow so they separate from the page. Cards and panels take none, and there are no card borders.

## Shapes

Corners are small and consistent: 8px on controls and panels, 4px on tags, 12px on the largest previews. Buttons are squared. Nothing is a pill except a dot.

## Components

- **button-primary**: blue fill, white text, 8px radius, 44px tall (52px for marketing calls to action), medium weight. Darkens to `#1730d1` on hover and press.
- **button-secondary**: ink fill, paper text. On black it inverts to a paper-tint.
- **button-quiet**: a 10% tint of the text colour, for a second action beside a primary.
- **two-tone-headline**: a headline in two sentences, the second quieter.
- **ruled-row**: a row divided from its neighbours by a hairline, which opens to show more. The plus turns 45° and goes blue.
- **inset-panel**: a `#e8e8e4` panel set in from the page edges, 8px radius, no border.
- **message-bubble**: 1.2rem radius with one small corner. Incoming bubbles are a frosted tint; the employee's reply is always blue.
- **progress-marks**: four hairlines that fill from the left, set directly under the text they belong to.
- **line-drawing**: an isometric hairline figure with soft corners, filled with the background, with exactly one part in blue.
- **photo**: shown as shot, warm and low-lit, with film grain. People are working, not posing.

## Do's and Don'ts

- Do use one blue thing per view. Don't put two primary buttons side by side.
- Do square the buttons. Don't use pill buttons or pill inputs.
- Do separate with a hairline or with space. Don't draw borders round cards.
- Do write labels in sentence case. Don't use all-caps eyebrows above headings.
- Do let size carry emphasis. Don't use bold display type.
- Don't use a monospace face, for anything.
- Don't use checkmark bullet lists. Use ruled rows.
- Don't number things for decoration.
- Don't use status colours on marketing surfaces.

## Known Gaps

- No dark theme was designed as a whole; dark values are the system's ink sections applied page-wide.
- Chart colours are derived: blue, ink and three greys.
- Motion is specified for the marketing site (one ease-out curve, `cubic-bezier(0.16, 1, 0.3, 1)`); component transitions keep shadcn's defaults.
