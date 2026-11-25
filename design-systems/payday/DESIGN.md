---
name: Payday
description: The design system behind the product-led FairShift site (v1). Warm paper, near-black ink, one blue.
colors:
  paper: "#f3f1ea"
  paper-2: "#e9e6dc"
  card: "#ffffff"
  ink: "#0d1110"
  ink-2: "#161c1a"
  ink-3: "#222a27"
  blue: "#2340ff"
  blue-deep: "#1730d1"
  blue-on-dark: "#8496ff"
  sky: "#dfe4ff"
  mute: "#5d605c"
  mute-dark: "#a4a6a0"
  line: "rgb(13 17 16 / 0.12)"
  line-dark: "rgb(243 241 234 / 0.14)"
  flag: "#f08a00"
  flag-text: "#8a5200"
  fixed: "#0c8f5e"
  fixed-text: "#08724a"
  urgent: "#c42a20"
typography:
  heading-family: Newsreader
  text-family: Geist
  display: { family: Newsreader, size: "clamp(2.6rem, 6vw, 5.4rem)", weight: 400, line: 1.02, tracking: "-0.028em" }
  heading: { family: Newsreader, size: "clamp(2.1rem, 4.4vw, 3.6rem)", weight: 400, line: 1.05, tracking: "-0.026em" }
  step: { family: Newsreader, size: "clamp(1.7rem, 3.2vw, 2.8rem)", weight: 400, line: 1.08, tracking: "-0.024em" }
  row: { family: Newsreader, size: "clamp(1.35rem, 2vw, 1.6rem)", weight: 400, line: 1.2, tracking: "-0.02em" }
  lede: { family: Geist, size: "clamp(1.02rem, 1.25vw, 1.2rem)", weight: 400, line: 1.55 }
  body: { family: Geist, size: "1rem", weight: 400, line: 1.6 }
  small: { family: Geist, size: "0.875rem", weight: 400, line: 1.5 }
  label: { family: Geist, size: "0.875rem", weight: 500, line: 1.4 }
rounded:
  item: 10px
  inset: 16px
  card: 20px
  panel: 24px
  hero: 32px
  pill: 9999px
spacing:
  section: "clamp(6rem, 9vw, 9rem)"
  heading-to-content: "clamp(3rem, 4.5vw, 4rem)"
  card-gap: 0.75rem
  card-padding: 1.5rem
  gutter: "clamp(1.25rem, 4vw, 2.5rem)"
  container: 78rem
controls:
  height: 44px
  height-large: 48px
  height-small: 32px
---

# Payday

## Overview

Payday is the design system behind the product-led FairShift site. FairShift is a payday check-in for hourly teams: the product is a text message, the buyer is a small-business owner, and the subject is employment law. The system is serious and plain, but warm. It shows the product at work in white cards on warm paper, and it shows the people being asked in photographs, often in the same frame.

## Colors

Warm paper (`#f3f1ea`) is the page. White (`#ffffff`) is the card that sits on it. A darker paper (`#e9e6dc`) makes the panel that groups cards. Near-black ink (`#0d1110`) is text, the ink button, and the hero panel.

Blue (`#2340ff`) is the single accent, and it means "act here": the primary button, the employee's reply bubble, a list dot, focus. It darkens to `#1730d1` on hover, and that deeper blue is also the blue used for text on paper.

Two status colours carry meaning and are used nowhere else: amber (`#f08a00`) means a flag is open, green (`#0c8f5e`) means a fix is logged. As text on paper they darken to `#8a5200` and `#08724a`. Red (`#c42a20`) is kept for urgent flags.

Secondary text is ink at 62% (`#5d605c` on paper). Hairlines are ink at 12%.

## Typography

Two families. Newsreader, a text serif at regular weight and set tight, for every heading from the hero down to a card title. Geist for body text, labels and controls. Size carries emphasis; headings are never bold. There is no monospace: figures use the sans with tabular numerals.

## Layout

A 78rem column. Sections have the same padding above and below (`clamp(6rem, 9vw, 9rem)`). A section head is a serif heading on the left with a short paragraph on the right, aligned to the heading's last line. Cards sit in a grid 0.75rem apart and are padded 1.5rem.

The hero is an ink panel set 0.75rem in from the page edges with 32px corners.

## Elevation

Flat. A card is white on paper with no shadow and no border; the white against the warm paper is the separation. Insets inside a card are paper. Only menus, toasts and dialogs take a shadow.

## Shapes

Soft and generous. Buttons, fields and tags are pills. Cards are 20px, panels and photographs 24px, the hero panel 32px.

## Components

- **button-primary**: blue pill, white text, 44px tall (48px for marketing calls to action), medium weight. Darkens to `#1730d1` on hover.
- **button-secondary**: ink pill, paper text.
- **button-quiet**: a 7% tint of the text colour, for a second action beside a primary.
- **card**: white, 20px corners, no shadow, no border.
- **panel**: paper-2, 24px corners, flat. Groups cards.
- **stat-card**: a card with a large serif figure and its source.
- **feature-card**: a product shot on a paper inset, a serif title, two lines of text.
- **status-tag**: a pill tinted green, amber or red, with the darker text colour.
- **message-bubble**: 1.2rem radius with one small corner. Over a photograph, incoming bubbles are frosted glass; the employee's reply is always blue.
- **photo**: shown as shot, warm and low-lit, with film grain and 24px corners. People are working, not posing.
- **person-and-product**: a photograph of the person being asked, their reply in blue, and the white card it becomes on the report.

## Do's and Don'ts

- Do use one blue thing per view. Don't put two primary buttons side by side.
- Do make buttons, fields and tags pills. Don't square them.
- Do keep cards flat: white on paper. Don't give them a drop shadow or a border.
- Do mark list points with a small blue dot. Don't use checkmark bullet lists.
- Do write labels in sentence case. Don't use all-caps eyebrows above headings.
- Do let size carry emphasis. Don't set headings in bold.
- Do mix product shots with photographs of people. Don't run a page of screenshots alone.
- Don't use a monospace face, for anything.
- Don't number things for decoration.
- Don't use amber or green for anything but an open flag and a logged fix.

## Known Gaps

- No dark theme was designed as a whole; dark values are the site's ink panel applied page-wide.
- Chart colours are derived: blue, ink, amber, green and one warm grey.
- Motion is specified for the marketing site (one ease-out curve, `cubic-bezier(0.16, 1, 0.3, 1)`); component transitions keep shadcn's defaults.
