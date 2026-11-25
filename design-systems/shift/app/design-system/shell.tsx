"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { HugeiconsIcon } from "@hugeicons/react"
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// The page chrome: a top bar, and a side menu that marks the section being read.

export const nav = [
  { title: "Get started", links: [["overview", "Overview"]] },
  { title: "Foundations", links: [["foundations", "Colour, type and space"]] },
  {
    title: "Components",
    links: [
      ["actions", "Actions"],
      ["inputs", "Inputs"],
      ["navigation", "Navigation"],
      ["data-display", "Data display"],
      ["feedback", "Feedback"],
      ["overlays", "Overlays"],
      ["conversation", "Conversation"],
    ],
  },
  {
    title: "Putting it together",
    links: [
      ["do-dont", "Do and don't"],
      ["recipes", "Recipes"],
      ["example", "Example screen"],
    ],
  },
] as const

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [ready, setReady] = React.useState(false)
  React.useEffect(() => setReady(true), [])
  const dark = ready && resolvedTheme === "dark"
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={dark ? "Switch to the light theme" : "Switch to the dark theme"}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      <HugeiconsIcon icon={dark ? Sun03Icon : Moon02Icon} />
    </Button>
  )
}

export function Header({ siteUrl }: { siteUrl: string }) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-[clamp(1.25rem,2.4vw,2rem)]">
        <a href="#overview" className="flex items-baseline gap-3">
          <span className="text-xl font-semibold tracking-[-0.04em]">Shift</span>
          <span className="type-small hidden text-muted-foreground sm:inline">
            The FairShift design system · themed from DESIGN.md
          </span>
        </a>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button nativeButton={false} render={<a href={siteUrl} />} variant="secondary">
            View the site
          </Button>
        </div>
      </div>
      {/* on small screens the side menu becomes a row of section links that scrolls sideways */}
      <nav
        aria-label="Sections"
        className="flex gap-1 overflow-x-auto border-t px-[clamp(1.25rem,2.4vw,2rem)] py-2 [scrollbar-width:none] lg:hidden"
      >
        {nav
          .flatMap((group) => group.links as readonly (readonly [string, string])[])
          .map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="type-small shrink-0 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {label}
            </a>
          ))}
      </nav>
    </header>
  )
}

export function SideNav() {
  const [active, setActive] = React.useState("overview")

  React.useEffect(() => {
    const ids = nav.flatMap((g) => g.links.map((l) => l[0]))
    const observer = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (seen) {
          setActive(seen.target.id)
        }
      },
      { rootMargin: "-15% 0px -70% 0px" }
    )
    ids.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav aria-label="Design system" className="hidden lg:block">
      <div className="sticky top-16 flex max-h-[calc(100svh-4rem)] flex-col gap-8 overflow-y-auto py-10">
        {nav.map((group) => (
          <div key={group.title}>
            <p className="type-small text-muted-foreground">{group.title}</p>
            <ul className="mt-2 flex flex-col gap-0.5">
              {group.links.map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "true" : undefined}
                    className={cn(
                      "relative flex items-center py-1.5 pl-3.5 transition-colors",
                      active === id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute left-0 size-1.5 rounded-full bg-primary transition-transform duration-500",
                        active === id ? "scale-100" : "scale-0"
                      )}
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
}
