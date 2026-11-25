import { Button } from "@/components/ui/button"

import { Actions, Inputs } from "./design-system/actions-inputs"
import {
  Conversation,
  Feedback,
  Overlays,
} from "./design-system/feedback-overlays"
import { Foundations } from "./design-system/foundations"
import { DataDisplay, Navigation } from "./design-system/navigation-data"
import { DoDont, ExampleScreen, Recipes } from "./design-system/recipes"
import { Header, SideNav } from "./design-system/shell"

// Where "View the site" goes. Set NEXT_PUBLIC_SITE_URL on a deployment.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3910/v2"

const count = (n: number, label: string) => ({ n, label })
const stats = [
  count(63, "Components"),
  count(13, "Colour roles"),
  count(8, "Type styles"),
  count(2, "Themes"),
]

export default function Page() {
  return (
    <>
      <Header siteUrl={siteUrl} />
      <div className="mx-auto grid max-w-[96rem] gap-x-12 px-[clamp(1.25rem,2.4vw,2rem)] lg:grid-cols-[14rem_minmax(0,1fr)]">
        <SideNav />
        <main className="min-w-0 pb-32">
          <section id="overview" className="py-[clamp(3.5rem,7vw,7rem)]">
            <h1 className="type-display max-w-[60rem]">
              A system for asking plainly.{" "}
              <span className="dim">Black, white and one blue.</span>
            </h1>
            <p className="type-lede mt-7 max-w-[42rem] text-muted-foreground">
              Shift is the design system behind FairShift. It leads with
              photographs of people at work, speaks in two tones of one
              typeface, and separates things with hairlines instead of boxes.
              Every component here is shadcn/ui, restyled from one DESIGN.md.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button size="lg" nativeButton={false} render={<a href="#foundations" />}>
                Start with foundations
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<a href="#recipes" />}
              >
                See the recipes
              </Button>
            </div>
            <dl className="mt-14 grid grid-cols-2 gap-x-6 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="border-t py-5">
                  <dd className="type-heading tabular-nums">{s.n}</dd>
                  <dt className="type-small mt-1 text-muted-foreground">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </section>

          <Foundations />
          <Actions />
          <Inputs />
          <Navigation />
          <DataDisplay />
          <Feedback />
          <Overlays />
          <Conversation />
          <DoDont />
          <Recipes />
          <ExampleScreen />

          <footer className="border-t pt-10">
            <p className="type-small max-w-[44rem] text-muted-foreground">
              Shift is built on shadcn/ui with Base UI primitives, Tailwind CSS 4
              and Geist. The values come from DESIGN.md in this folder: edit it,
              then update the variables in app/globals.css to match.
            </p>
          </footer>
        </main>
      </div>
    </>
  )
}
