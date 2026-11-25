import * as React from "react"

import { cn } from "@/lib/utils"

// The scaffolding every showcase section is built from. Sections are divided
// by hairlines, never boxed, and share one rhythm.

/** A top-level section of the design system page: "Foundations", "Actions", … */
export function Section({
  id,
  title,
  intro,
  children,
  className,
}: {
  id: string
  title: string
  intro?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={cn("border-t py-[clamp(3.5rem,6vw,6rem)]", className)}
    >
      <h2 className="type-heading">{title}</h2>
      {intro && (
        <p className="type-lede mt-5 max-w-[44rem] text-muted-foreground">
          {intro}
        </p>
      )}
      <div className="mt-[clamp(2.5rem,4vw,4rem)] flex flex-col gap-[clamp(3rem,5vw,4.5rem)]">
        {children}
      </div>
    </section>
  )
}

/** One component inside a section: its name, one line on when to use it, then examples. */
export function Block({
  id,
  name,
  when,
  children,
}: {
  id?: string
  name: string
  when?: string
  children: React.ReactNode
}) {
  return (
    <div id={id} className="grid gap-x-6 gap-y-5 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <h3 className="type-row">{name}</h3>
        {when && (
          <p className="type-small mt-2 max-w-[22rem] text-muted-foreground">
            {when}
          </p>
        )}
      </div>
      <div className="flex min-w-0 flex-col gap-4 lg:col-span-9">{children}</div>
    </div>
  )
}

/** A framed example. `title` says what the example shows; it is never a state name inside the component. */
export function Example({
  title,
  children,
  className,
  dark,
  tone,
}: {
  title?: string
  children: React.ReactNode
  className?: string
  /** Render the example on a dark band, with the same components. */
  dark?: boolean
  /** "do" and "dont" for the Do and Don't pairs. */
  tone?: "do" | "dont"
}) {
  return (
    <figure className={cn("flex min-w-0 flex-col gap-2", dark && "dark")}>
      {title && (
        <figcaption
          className={cn(
            "type-small text-muted-foreground",
            tone === "dont" && "text-destructive",
            tone === "do" && "text-foreground"
          )}
        >
          {title}
        </figcaption>
      )}
      <div
        className={cn(
          "flex min-w-0 flex-wrap items-center gap-3 overflow-x-auto rounded-xl border bg-background p-[clamp(1.25rem,2.5vw,2rem)] text-foreground",
          // field groups are size containers, so they collapse unless the frame gives them a width
          "[&>fieldset]:w-full [&>fieldset]:max-w-[34rem] [&>[data-slot=field-group]]:w-full [&>[data-slot=field-group]]:max-w-[34rem]",
          dark && "border-transparent",
          className
        )}
      >
        {children}
      </div>
    </figure>
  )
}
