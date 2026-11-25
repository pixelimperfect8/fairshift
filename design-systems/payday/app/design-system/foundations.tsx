"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon,
  ArrowUpRight01Icon,
  Download01Icon,
  Flag01Icon,
  Message01Icon,
} from "@hugeicons/core-free-icons"

import { ColorPair } from "./color-pair"
import { Block, Example, Section } from "./kit"

// Foundations: colour, type, spacing, radius, elevation, motion, icons.
// Roles first, raw palette second.

const pairs = [
  ["Page", "background", "foreground"],
  ["Card", "card", "card-foreground"],
  ["Menus and dialogs", "popover", "popover-foreground"],
  ["Primary action", "primary", "primary-foreground"],
  ["Primary, pressed", "primary-active", "primary-foreground"],
  ["Ink action", "secondary", "secondary-foreground"],
  ["Panel", "muted", "muted-foreground"],
  ["Hover wash", "accent", "accent-foreground"],
  ["Secondary text on the page", "background", "muted-foreground"],
  ["Blue as text", "background", "accent-text"],
  ["Error text", "background", "destructive"],
  ["Fixed", "background", "success"],
  ["Open flag", "background", "warning"],
] as const

const palette = [
  {
    group: "Neutrals",
    items: [
      ["Paper", "paper", "#f3f1ea", "Page background, text on ink"],
      ["Paper 2", "muted", "#e9e6dc", "Panels, hover wash"],
      ["Card", "card", "#ffffff", "Cards, menus, dialogs"],
      ["Ink", "ink", "#0d1110", "The hero panel, text, the ink button"],
    ],
  },
  {
    group: "Blue",
    items: [
      ["Blue", "primary", "#2340ff", "Primary buttons, reply bubbles, focus"],
      ["Blue deep", "primary-active", "#1730d1", "Hover and press; blue text on paper"],
      ["Sky", "sky", "#dfe4ff", "A pale blue wash behind a delivered tag"],
    ],
  },
  {
    group: "Lines and status",
    items: [
      ["Hairline", "border", "ink at 12%", "Dividers inside a card"],
      ["Field edge", "input", "ink at 20%", "Input borders"],
      ["Fixed", "fixed", "#0c8f5e", "A fix is logged; #08724a as text"],
      ["Open flag", "flag", "#f08a00", "A flag is open; #8a5200 as text"],
      ["Urgent", "destructive", "#c42a20", "Safety, harassment, a legal clock"],
    ],
  },
  {
    group: "Charts",
    items: [
      ["Chart 1", "chart-1", "blue", "The series that matters"],
      ["Chart 2", "chart-2", "ink", "The comparison"],
      ["Chart 3", "chart-3", "amber", "Open flags"],
      ["Chart 4", "chart-4", "green", "Fixes"],
    ],
  },
] as const

const type = [
  ["type-display", "Newsreader · clamp(2.6rem, 6vw, 5.4rem) / 1.02 / 400 / −0.028em", "Hero and page titles, one per page", "Ask every employee, every payday."],
  ["type-heading", "Newsreader · clamp(2.1rem, 4.4vw, 3.6rem) / 1.05 / 400 / −0.026em", "Section heads", "One loop, every pay period."],
  ["type-step", "Newsreader · clamp(1.7rem, 3.2vw, 2.8rem) / 1.08 / 400 / −0.024em", "Steps and sub-heads", "A flag arrives with a next step."],
  ["type-row", "Newsreader · clamp(1.35rem, 2vw, 1.6rem) / 1.2 / 400 / −0.02em", "Card titles, component names", "Urgent alerts within the hour"],
  ["type-lede", "Geist · clamp(1.02rem, 1.25vw, 1.2rem) / 1.55 / 400", "The paragraph beside a section head", "Three questions by text. One page telling you what to fix."],
  ["type-body", "Geist · 1rem / 1.6 / 400", "Running text", "Every send, answer and fix is timestamped and append-only."],
  ["type-label", "Geist · 0.875rem / 1.4 / 500", "Buttons, tags, field labels", "Mark fixed"],
  ["type-small", "Geist · 0.875rem / 1.5 / 400", "Helper text, sources, table cells", "Source: LWDA rulemaking data"],
] as const

const space = [
  ["4", "0.25rem", "Inside a tag"],
  ["8", "0.5rem", "Between an icon and its label"],
  ["12", "0.75rem", "Between cards in a grid; between buttons"],
  ["24", "1.5rem", "Padding inside a card"],
  ["48–64", "clamp(3rem, 4.5vw, 4rem)", "Between a section's heading and its content"],
  ["96–144", "clamp(6rem, 9vw, 9rem)", "Above and below every section"],
] as const

const radius = [
  ["rounded-md", "10px", "Menu and select items"],
  ["rounded-xl", "16px", "Text areas, insets inside a card"],
  ["rounded-2xl", "20px", "Cards, dialogs"],
  ["rounded-3xl", "24px", "Panels, photographs"],
  ["rounded-[2rem]", "32px", "The hero panel"],
  ["rounded-full", "999px", "Buttons, fields, tags, dots"],
] as const

const motion = [
  ["ease-out", "cubic-bezier(0.16, 1, 0.3, 1)", "Everything that enters or opens"],
  ["Word rise", "900ms, 35ms apart", "Headline words rising from behind a mask"],
  ["Reveal", "850ms, 26px", "Blocks fading and lifting in, once"],
  ["Open", "500ms", "Rows expanding their height"],
  ["Photograph", "1200ms", "A photograph opening from an inset clip, then drifting slowly"],
] as const

export function Foundations() {
  return (
    <Section
      id="foundations"
      title="Foundations"
      intro="Warm paper, near-black ink, one blue and two typefaces. Everything else in the system is built from the values on this page."
    >
      <Block
        id="color"
        name="Colour roles"
        when="Each role is a surface with the text that sits on it, and the contrast between them, measured live."
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {pairs.map(([name, bg, fg]) => (
            <ColorPair key={name} name={name} background={bg} foreground={fg} />
          ))}
        </div>
      </Block>

      <Block
        id="palette"
        name="Palette"
        when="The raw values behind the roles. Amber means a flag is open, green means a fix is logged. Nothing else is coloured."
      >
        {palette.map((g) => (
          <div key={g.group} className="flex flex-col gap-3">
            <p className="type-label">{g.group}</p>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {g.items.map(([name, token, value, use]) => (
                <div key={name} className="flex flex-col gap-2">
                  <div
                    className="h-20 rounded-2xl border"
                    style={{ background: `var(--${token})` }}
                  />
                  <div>
                    <p className="type-label">{name}</p>
                    <p className="type-small text-muted-foreground tabular-nums">
                      {value}
                    </p>
                    <p className="type-small text-muted-foreground">{use}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Block>

      <Block
        id="typography"
        name="Typography"
        when="Newsreader, a text serif, for headings at a regular weight. Geist for everything else. Size carries emphasis. There is no monospace."
      >
        <div className="flex flex-col">
          {type.map(([token, spec, use, sample]) => (
            <div
              key={token}
              className="grid items-baseline gap-x-6 gap-y-2 border-t py-5 md:grid-cols-12"
            >
              <div className="md:col-span-4">
                <p className="type-label">{token}</p>
                <p className="type-small text-muted-foreground tabular-nums">
                  {spec}
                </p>
                <p className="type-small text-muted-foreground">{use}</p>
              </div>
              <p className={`${token} min-w-0 truncate md:col-span-8`}>
                {sample}
              </p>
            </div>
          ))}
        </div>
        <Example title="Running text at body size">
          <p className="type-body max-w-[38rem]">
            A clean check-in goes straight to the record. A flag goes to you
            with a next step, and only counts as done once the fix is logged.
            Read{" "}
            <a href="#recipes" className="text-accent-text underline underline-offset-4">
              how the loop is drawn
            </a>{" "}
            or export the packet as{" "}
            <code className="rounded-sm bg-background px-1.5 py-0.5">
              pay-period-23.pdf
            </code>
            .
          </p>
        </Example>
        <Example title="A serif heading on the ink panel" dark>
          <p className="type-heading">
            The first honest conversation shouldn&apos;t be with a
            plaintiff&apos;s lawyer.
          </p>
        </Example>
      </Block>

      <Block
        id="spacing"
        name="Spacing"
        when="A 4px base. Every section shares one padding and one heading-to-content gap, so the page keeps an even rhythm."
      >
        <div className="flex flex-col">
          {space.map(([px, value, use]) => (
            <div
              key={px}
              className="grid items-center gap-x-6 gap-y-2 border-t py-4 md:grid-cols-12"
            >
              <p className="type-label tabular-nums md:col-span-2">{px}px</p>
              <div className="md:col-span-4">
                <div
                  className="h-3 rounded-sm bg-foreground"
                  style={{ width: `min(100%, ${value.startsWith("clamp") ? (px === "48–64" ? "4rem" : "9rem") : value})` }}
                />
              </div>
              <p className="type-small text-muted-foreground md:col-span-6">
                {use}
              </p>
            </div>
          ))}
        </div>
      </Block>

      <Block
        id="radius"
        name="Radius"
        when="Soft and generous. Controls are pills; cards and panels take large corners."
      >
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {radius.map(([cls, value, use]) => (
            <div key={cls} className="flex flex-col gap-3">
              <div className={`size-20 bg-foreground ${cls}`} />
              <div>
                <p className="type-label">{cls}</p>
                <p className="type-small text-muted-foreground tabular-nums">
                  {value}
                </p>
                <p className="type-small text-muted-foreground">{use}</p>
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Block
        id="elevation"
        name="Elevation"
        when="Flat. A card is white on paper with no shadow and no border. Only floating layers take a shadow."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["Flat", "", "Page, panels, cards and tiles"],
            ["Raised", "shadow-lg", "Menus, popovers, toasts"],
            ["Deep", "shadow-xl", "Dialogs and sheets"],
          ].map(([name, cls, use]) => (
            <div key={name} className="rounded-2xl bg-muted p-6">
              <div className={`h-24 rounded-2xl bg-card ${cls}`} />
              <p className="type-label mt-5">{name}</p>
              <p className="type-small text-muted-foreground">{use}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block
        id="motion"
        name="Motion"
        when="Things arrive once, on one curve, and then hold still. Everything respects reduced motion."
      >
        <div className="flex flex-col">
          {motion.map(([name, value, use]) => (
            <div
              key={name}
              className="grid gap-x-6 gap-y-1 border-t py-4 md:grid-cols-12"
            >
              <p className="type-label md:col-span-3">{name}</p>
              <p className="type-small text-muted-foreground tabular-nums md:col-span-4">
                {value}
              </p>
              <p className="type-small text-muted-foreground md:col-span-5">
                {use}
              </p>
            </div>
          ))}
        </div>
      </Block>

      <Block
        id="icons"
        name="Icons"
        when="Hugeicons, in a hairline stroke, at the size the component sets. Use them for actions, never as bullets."
      >
        <Example title="At 16, 20 and 24px, in the text and the muted colour">
          {[16, 20, 24].map((s) => (
            <div key={s} className="flex items-center gap-3">
              {[Message01Icon, Flag01Icon, Download01Icon, Add01Icon, ArrowUpRight01Icon].map((icon, i) => (
                <HugeiconsIcon key={i} icon={icon} size={s} strokeWidth={1.5} />
              ))}
              {[Message01Icon, Flag01Icon].map((icon, i) => (
                <HugeiconsIcon
                  key={i}
                  icon={icon}
                  size={s}
                  strokeWidth={1.5}
                  className="text-muted-foreground"
                />
              ))}
            </div>
          ))}
        </Example>
      </Block>
    </Section>
  )
}
