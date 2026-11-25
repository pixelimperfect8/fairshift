"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Download01Icon } from "@hugeicons/core-free-icons"

import { Badge } from "@/components/ui/badge"
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Block, Example, Section } from "./kit"

// Set NEXT_PUBLIC_PHOTO_BASE (for example "photos/") to load local copies named <id>.jpg.
const local = process.env.NEXT_PUBLIC_PHOTO_BASE
const photo = (id: string, w = 1200) =>
  local
    ? `${local}${id}.jpg`
    : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=72&w=${w}`

/* ------------------------------------------------------------------ */
/* Do and Don't: the DESIGN.md rules that are easiest to break         */
/* ------------------------------------------------------------------ */
const rows = [
  "A report you can read in a minute",
  "A clear next step for every flag",
  "Alerts that skip the manager they name",
]

export function DoDont() {
  return (
    <Section
      id="do-dont"
      title="Do and don't"
      intro="Five rules that are easy to break, shown both ways."
    >
      <Block name="One blue thing" when="One primary action per view. A second action is ink or quiet.">
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Do" tone="do">
            <Button>Book a demo</Button>
            <Button variant="outline">See how it works</Button>
          </Example>
          <Example title="Don't" tone="dont">
            <Button>Book a demo</Button>
            <Button>See how it works</Button>
          </Example>
        </div>
      </Block>

      <Block name="Pills, not boxes" when="Buttons, fields and tags are fully rounded. Cards and panels take the large soft corner.">
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Do" tone="do">
            <Button variant="secondary">Contact us</Button>
            <Badge variant="secondary">Midtown</Badge>
          </Example>
          <Example title="Don't" tone="dont">
            <Button variant="secondary" className="rounded-sm">
              Contact us
            </Button>
            <Badge variant="secondary" className="rounded-sm">
              Midtown
            </Badge>
          </Example>
        </div>
      </Block>

      <Block name="Flat cards" when="A card is white on paper. It takes no border and no drop shadow.">
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Do" tone="do" className="flex-col items-stretch gap-2">
            {rows.map((t) => (
              <p key={t} className="rounded-2xl bg-card px-5 py-4">
                {t}
              </p>
            ))}
          </Example>
          <Example title="Don't" tone="dont" className="flex-col items-stretch gap-2">
            {rows.map((t) => (
              <p key={t} className="rounded-2xl border border-foreground/40 bg-card px-5 py-4 shadow-lg">
                {t}
              </p>
            ))}
          </Example>
        </div>
      </Block>

      <Block name="Dots, not ticks" when="A list of points takes a small blue dot. Ticks are kept out of lists.">
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Do" tone="do" className="flex-col items-start gap-3">
            {rows.map((t) => (
              <p key={t} className="flex items-baseline gap-3">
                <span className="size-1.5 shrink-0 -translate-y-[0.2em] rounded-full bg-primary" />
                {t}
              </p>
            ))}
          </Example>
          <Example title="Don't" tone="dont" className="flex-col items-start gap-3">
            {rows.map((t) => (
              <p key={t} className="flex items-baseline gap-3">
                <span aria-hidden className="text-primary">
                  ✓
                </span>
                {t}
              </p>
            ))}
          </Example>
        </div>
      </Block>

      <Block name="Sentence case, no eyebrows" when="A serif heading stands on its own. Size carries emphasis, not capitals or bold.">
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Do" tone="do" className="flex-col items-start">
            <p className="type-step">What the owner gets.</p>
          </Example>
          <Example title="Don't" tone="dont" className="flex-col items-start gap-2">
            <p className="type-small tracking-widest uppercase">Features</p>
            <p className="type-step font-bold">What The Owner Gets</p>
          </Example>
        </div>
      </Block>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* Recipes: the DESIGN.md's named components, built from the kit        */
/* ------------------------------------------------------------------ */
const flags = [
  { what: "Missed meal break", where: "Midtown kitchen", status: "Fixed", by: "Rosa D.", when: "Nov 21, 4:12 PM" },
  { what: "Overtime missing from the check", where: "Front of house", status: "Fixed", by: "Rosa D.", when: "Nov 22, 10:40 AM" },
  { what: "Walk-in door latch sticks", where: "Midtown kitchen", status: "Open", by: "Repair booked", when: "Nov 23" },
]

const stats = [
  ["8,838", "PAGA notices filed with the state in fiscal year 2024–25", "Source: LWDA rulemaking data"],
  ["$100", "default penalty per employee, per pay period, for an initial violation", "Source: PAGA default penalty"],
  ["15%", "cap on penalties for employers who took all reasonable steps before a notice", "Source: 2024 PAGA reform"],
]

export function Recipes() {
  return (
    <Section
      id="recipes"
      title="Recipes"
      intro="The pieces the FairShift site is made of, rebuilt from the components and tokens above."
    >
      <Block name="Hero" when="A dark rounded panel set in from the page edges. Serif headline on the left; on the right a photograph with the check-in playing over it.">
        <div className="dark grid items-center gap-8 rounded-[2rem] bg-background p-[clamp(1.5rem,4vw,3rem)] text-foreground lg:grid-cols-2">
          <div>
            <h3 className="type-heading">Ask every employee, every payday.</h3>
            <p className="type-lede mt-5 max-w-[28rem] text-muted-foreground">
              FairShift texts your hourly team three quick questions each pay
              period.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg">Book a demo</Button>
              <Button size="lg" variant="outline">
                See how it works
              </Button>
            </div>
          </div>
          <div className="grain relative isolate flex min-h-[24rem] items-end justify-end overflow-hidden rounded-3xl p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo("1776353744117-9e8595e8092c", 1200)}
              alt="A cook plating food under warm lights in a dark restaurant kitchen"
              className="absolute inset-0 -z-10 size-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 -z-10 bg-linear-to-tl from-background/90 via-background/50 to-background/10" />
            <BubbleGroup className="w-full max-w-[17rem]">
              <Bubble variant="muted">
                <BubbleContent className="bg-foreground/15 backdrop-blur-xl">
                  Did you get all your meal and rest breaks this pay period?
                </BubbleContent>
              </Bubble>
              <Bubble align="end">
                <BubbleContent>No. I worked a double on Saturday.</BubbleContent>
              </Bubble>
            </BubbleGroup>
          </div>
        </div>
      </Block>

      <Block name="Stat cards" when="A white card, a large serif figure, and where the figure comes from. Always name the source.">
        <div className="grid gap-3 md:grid-cols-3">
          {stats.map(([n, label, source]) => (
            <Card key={n}>
              <CardContent className="flex h-full flex-col">
                <p className="type-body text-muted-foreground">{label}</p>
                <p className="type-heading mt-10 tabular-nums">{n}</p>
                <p className="type-small mt-3 text-muted-foreground">{source}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Block>

      <Block name="Feature card" when="A product shot on a paper inset, then a serif title and two lines of text. Cards sit 0.75rem apart in a grid.">
        <div className="grid gap-3 md:grid-cols-2">
          <Card>
            <CardContent className="flex flex-col gap-8">
              <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-background p-4">
                <Badge variant="secondary">roster.csv</Badge>
                {["Name", "Mobile", "Language", "Location"].map((c) => (
                  <Badge key={c} variant="outline" className="border-transparent bg-card">
                    {c}
                  </Badge>
                ))}
              </div>
              <div>
                <h4 className="type-row">Zero setup</h4>
                <p className="type-body mt-2 text-muted-foreground">
                  Upload a roster and pick the pay schedule. Questions,
                  languages and timing come preset.
                </p>
              </div>
            </CardContent>
          </Card>
          <div className="grain relative isolate flex min-h-[18rem] items-end overflow-hidden rounded-2xl p-6 text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo("1588416794236-0a08bd47e110", 900)}
              alt="Cooks plating food on a dim kitchen line"
              className="absolute inset-0 -z-10 size-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 to-transparent" />
            <p className="type-row">
              Built for the people on the line, and read in under a minute.
            </p>
          </div>
        </div>
      </Block>

      <Block name="Person and product" when="A photograph of the person being asked, with their reply in blue and the card it becomes on the report. People and product share the frame.">
        <div className="grain relative isolate flex min-h-[26rem] flex-wrap items-end justify-between gap-5 overflow-hidden rounded-2xl p-6 text-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo("1651977560788-98792cd34da0", 1400)}
            alt="A line cook working at a busy restaurant counter"
            className="absolute inset-0 -z-10 size-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
          <div className="max-w-[24rem]">
            <p className="type-step">
              Did you get all your meal and rest breaks this pay period?
            </p>
            <p className="type-label mt-4 w-fit rounded-[1.15rem] rounded-bl-md bg-primary px-4 py-2.5 text-primary-foreground">
              No. I worked a double on Saturday.
            </p>
          </div>
          <div className="w-full max-w-[18rem] rounded-2xl bg-white p-4 text-[#0d1110]">
            <p className="type-label flex items-center gap-2">
              <span className="size-2 rounded-full bg-flag" />
              Missed meal break
            </p>
            <p className="type-small mt-2 opacity-65">
              Pay one hour of premium pay and check Saturday for back-to-back
              doubles.
            </p>
          </div>
        </div>
      </Block>

      <Block name="Status tags" when="Green means a fix is logged, amber means a flag is open, red means urgent. Nothing else is coloured.">
        <Example>
          <Badge variant="success">Answered</Badge>
          <Badge variant="outline">Delivered</Badge>
          <Badge variant="warning">Flag open</Badge>
          <Badge variant="success">Fixed</Badge>
          <Badge variant="destructive">Urgent</Badge>
          <Badge variant="secondary">Quiet hours respected</Badge>
        </Example>
      </Block>

      <Block name="Panel" when="The paper-2 surface, 1.5rem corners. It groups white cards; a white card never sits directly inside another.">
        <div className="grid items-center gap-8 rounded-3xl bg-muted p-[clamp(1.5rem,4vw,3rem)] lg:grid-cols-2">
          <div>
            <h4 className="type-step">Fewer surprises, and less time on people problems.</h4>
            <p className="type-lede mt-4 text-muted-foreground">
              No dashboard to learn. You read one page each pay period and mark
              issues fixed.
            </p>
          </div>
          <ul className="grid gap-2">
            {rows.map((t) => (
              <li key={t} className="flex items-baseline gap-3.5 rounded-2xl bg-card px-5 py-4">
                <span className="size-1.5 shrink-0 -translate-y-[0.2em] rounded-full bg-primary" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Block>

      <Block name="Price card" when="Three in a row. The recommended plan is the ink card with the one blue button.">
        <div className="grid gap-3 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>Up to 19 employees</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="type-display tabular-nums">$3.50</p>
              <p className="type-small text-muted-foreground">
                per employee, per pay period
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Book a demo
              </Button>
            </CardFooter>
          </Card>
          <Card className="dark">
            <CardHeader>
              <CardTitle>Standard</CardTitle>
              <CardDescription>20 to 249 employees</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="type-display tabular-nums">$2.83</p>
              <p className="type-small text-muted-foreground">
                per employee, per pay period
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Book a demo</Button>
            </CardFooter>
          </Card>
        </div>
      </Block>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* One realistic screen: the owner's pay-period report                 */
/* ------------------------------------------------------------------ */
export function ExampleScreen() {
  return (
    <Section
      id="example"
      title="Example screen"
      intro="The owner's pay-period report, built only from the tokens and components on this page."
    >
      <div className="flex flex-col gap-3 rounded-3xl bg-muted p-[clamp(1rem,3vw,2.5rem)]">
        <div className="flex flex-wrap items-end justify-between gap-4 pb-4">
          <div>
            <p className="type-small text-muted-foreground">
              Rosa&apos;s Kitchen · Nov 8 to Nov 21
            </p>
            <h3 className="type-step mt-1">Pay period report</h3>
          </div>
          <Button variant="secondary">
            <HugeiconsIcon icon={Download01Icon} data-icon="inline-start" />
            Export PDF
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["37 of 42", "answered"],
            ["3", "flags this period"],
            ["1", "still open"],
          ].map(([n, l]) => (
            <Card key={l} size="sm">
              <CardContent>
                <p className="type-heading tabular-nums">{n}</p>
                <p className="type-small text-muted-foreground">{l}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Flag</TableHead>
                  <TableHead>Where</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>By</TableHead>
                  <TableHead className="text-right">When</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flags.map((f) => (
                  <TableRow key={f.what}>
                    <TableCell className="font-medium">{f.what}</TableCell>
                    <TableCell>{f.where}</TableCell>
                    <TableCell>
                      <Badge variant={f.status === "Open" ? "warning" : "success"}>
                        {f.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{f.by}</TableCell>
                    <TableCell className="text-right tabular-nums">{f.when}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-[36rem]">
              <p className="type-label">Suggested next step</p>
              <p className="type-body mt-1 text-muted-foreground">
                Have the walk-in door latch checked today and tell the crew when
                it&apos;s done.
              </p>
            </div>
            <Button>Mark fixed</Button>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
