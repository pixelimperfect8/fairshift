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
  ["Inset panel", "card", "card-foreground"],
  ["Menus and dialogs", "popover", "popover-foreground"],
  ["Primary action", "primary", "primary-foreground"],
  ["Primary, pressed", "primary-active", "primary-foreground"],
  ["Ink action", "secondary", "secondary-foreground"],
  ["Secondary text on a band", "muted", "muted-foreground"],
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
      ["Paper", "paper", "#f5f5f2", "Page background, text on ink"],
      ["Paper 2", "card", "#e8e8e4", "Inset panels"],
      ["Ink", "ink", "#0a0a0a", "Dark sections, text, the ink button"],
    ],
  },
  {
    group: "Blue",
    items: [
      ["Blue", "primary", "#2340ff", "Primary buttons, reply bubbles, focus"],
      ["Blue deep", "primary-active", "#1730d1", "Hover and press; blue text on paper"],
      ["Blue on dark", "chart-5", "#6f86ff", "Blue words and lines on black"],
    ],
  },
  {
    group: "Lines and status",
    items: [
      ["Hairline", "border", "ink at 14%", "Every divider"],
      ["Field edge", "input", "ink at 22%", "Input borders"],
      ["Fixed", "success", "#0c7a50", "Product screens only"],
      ["Open flag", "warning", "#8a5200", "Product screens only"],
      ["Urgent", "destructive", "#c8261b", "Product screens only"],
    ],
  },
  {
    group: "Charts",
    items: [
      ["Chart 1", "chart-1", "blue", "The series that matters"],
      ["Chart 2", "chart-2", "ink", "The comparison"],
      ["Chart 3", "chart-3", "grey", "Supporting series"],
      ["Chart 4", "chart-4", "light grey", "Supporting series"],
    ],
  },
] as const

const type = [
  ["type-display", "clamp(2.4rem, 6vw, 5.4rem) / 1.02 / 450 / −0.045em", "Hero and page titles, one per page", "Ask before someone else does."],
  ["type-heading", "clamp(2.1rem, 4.6vw, 4rem) / 1.02 / 450 / −0.045em", "Section heads", "One loop, closed every pay period."],
  ["type-step", "clamp(1.7rem, 3vw, 2.7rem) / 1.08 / 450 / −0.045em", "Steps and sub-heads", "A flag arrives with a next step."],
  ["type-row", "clamp(1.3rem, 2.2vw, 1.8rem) / 1.15 / 400 / −0.03em", "Row titles, component names", "Urgent alerts"],
  ["type-lede", "clamp(1.02rem, 1.25vw, 1.2rem) / 1.55 / 400", "The paragraph beside a section head", "Three questions by text. One page telling you what to fix."],
  ["type-body", "1rem / 1.6 / 400", "Running text", "Every send, answer and fix is timestamped and append-only."],
  ["type-label", "0.875rem / 1.4 / 500", "Buttons, tags, field labels", "Mark fixed"],
  ["type-small", "0.875rem / 1.5 / 400", "Helper text, sources, table cells", "Source: LWDA rulemaking data"],
] as const

const space = [
  ["4", "0.25rem", "Inside a tag"],
  ["8", "0.5rem", "Between an icon and its label"],
  ["12", "0.75rem", "Between photographs in a strip; between buttons"],
  ["24", "1.5rem", "The grid gap; between related blocks"],
  ["48–80", "clamp(3rem, 5.5vw, 5rem)", "Between a section's heading and its content"],
  ["80–144", "clamp(5rem, 9.5vw, 9rem)", "Above and below every section"],
] as const

const radius = [
  ["rounded-sm", "4px", "Tags, small marks"],
  ["rounded-md", "6px", "Menu and select items"],
  ["rounded-lg", "8px", "Buttons, inputs, tabs"],
  ["rounded-xl", "8px", "Panels, cards, dialogs"],
  ["rounded-3xl", "12px", "The largest previews"],
  ["rounded-full", "999px", "Dots and avatars only"],
] as const

const motion = [
  ["ease-out", "cubic-bezier(0.16, 1, 0.3, 1)", "Everything that enters or opens"],
  ["Word rise", "900ms, 35ms apart", "Headline words rising from behind a mask"],
  ["Reveal", "850ms, 26px", "Blocks fading and lifting in, once"],
  ["Open", "500ms", "Rows expanding their height"],
  ["Draw", "1000ms, 22ms apart", "Line drawings tracing themselves"],
] as const

export function Foundations() {
  return (
    <Section
      id="foundations"
      title="Foundations"
      intro="Two neutrals, one blue, one typeface. Everything else in the system is built from the values on this page."
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
        when="The raw values behind the roles. Status colours are for product screens and never appear on marketing surfaces."
      >
        {palette.map((g) => (
          <div key={g.group} className="flex flex-col gap-3">
            <p className="type-label">{g.group}</p>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {g.items.map(([name, token, value, use]) => (
                <div key={name} className="flex flex-col gap-2">
                  <div
                    className="h-20 rounded-xl border"
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
        when="One family, Geist, at a regular weight and set tight. Size carries emphasis. There is no serif and no monospace."
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
        <Example title="Two tones: the second sentence at 42%" dark>
          <p className="type-heading">
            The math is brutal.{" "}
            <span className="dim">The reform rewards the careful.</span>
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
                  style={{ width: `min(100%, ${value.startsWith("clamp") ? (px === "48–80" ? "5rem" : "9rem") : value})` }}
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
        when="Small and consistent. Buttons are squared; nothing is a pill except a dot."
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
        when="Flat. Depth comes from black against white. Only floating layers take a shadow."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["Flat", "", "Page, sections, inset panels, cards"],
            ["Raised", "shadow-lg", "Menus, popovers, toasts"],
            ["Deep", "shadow-xl", "Dialogs and sheets"],
          ].map(([name, cls, use]) => (
            <div key={name} className="rounded-xl bg-card p-6">
              <div className={`h-24 rounded-xl bg-background ${cls}`} />
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
