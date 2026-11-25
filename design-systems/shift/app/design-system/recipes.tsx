"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Download01Icon } from "@hugeicons/core-free-icons"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LineDrawing } from "@/components/shift/line-drawing"

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
export function DoDont() {
  return (
    <Section
      id="do-dont"
      title="Do and don't"
      intro="Four rules that are easy to break, shown both ways."
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

      <Block name="Squared, not pills" when="Buttons and fields take the 8px control radius. Only a dot is round.">
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Do" tone="do">
            <Button variant="secondary">Contact us</Button>
            <Badge variant="outline">Midtown</Badge>
          </Example>
          <Example title="Don't" tone="dont">
            <Button variant="secondary" className="rounded-full">
              Contact us
            </Button>
            <Badge variant="outline" className="rounded-full">
              Midtown
            </Badge>
          </Example>
        </div>
      </Block>

      <Block name="Lines, not boxes" when="Divide a list with hairlines. Don't put a border round every item.">
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Do" tone="do" className="flex-col items-stretch gap-0">
            {["Each flag has a next step", "Open flags keep nagging", "The fix goes on the record"].map((t) => (
              <p key={t} className="border-t py-3 first:border-t-0">
                {t}
              </p>
            ))}
          </Example>
          <Example title="Don't" tone="dont" className="flex-col items-stretch gap-2">
            {["Each flag has a next step", "Open flags keep nagging", "The fix goes on the record"].map((t) => (
              <p key={t} className="rounded-lg border border-foreground/40 px-3 py-3">
                {t}
              </p>
            ))}
          </Example>
        </div>
      </Block>

      <Block name="Sentence case, no eyebrows" when="A heading stands on its own. Size carries emphasis, not capitals or bold.">
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

export function Recipes() {
  return (
    <Section
      id="recipes"
      title="Recipes"
      intro="The pieces the FairShift site is made of, rebuilt from the components and tokens above."
    >
      <Block name="Hero" when="One photograph edge to edge, one headline in two tones set low over it, one blue action.">
        <div className="dark grain relative isolate flex min-h-[28rem] flex-col items-center justify-end overflow-hidden rounded-xl bg-background p-[clamp(1.5rem,4vw,3rem)] text-center text-foreground">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo("1776353744117-9e8595e8092c", 1600)}
            alt="A cook plating food under warm lights in a dark restaurant kitchen"
            className="absolute inset-0 -z-10 size-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-background via-background/75 to-background/30" />
          <h3 className="type-display max-w-[52rem]">
            Your team has something to tell you.{" "}
            <span className="opacity-60">FairShift asks for you, every payday.</span>
          </h3>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg">Book a demo</Button>
            <Button size="lg" variant="outline">
              See how it works
            </Button>
          </div>
        </div>
      </Block>

      <Block name="Two-tone headline" when="Two sentences: the first at full strength, the second at 42%. Use it for every section head.">
        <Example>
          <p className="type-heading">
            Priced per employee, <span className="dim">per pay period.</span>
          </p>
        </Example>
      </Block>

      <Block name="Ruled rows" when="Lists, questions and plans are rows divided by hairlines. A row opens to show more.">
        <Example className="items-stretch">
          <Accordion defaultValue={["report"]} className="w-full">
            {[
              ["report", "The report", "One page each pay period, by text and email: response rate and flags, by location and manager, with a plain next step for each."],
              ["alerts", "Urgent alerts", "Safety, harassment, or anything with a legal clock, within the hour. A flag that names a manager goes to the owner instead."],
              ["packet", "The audit packet", "One click exports every check-in, answer, flag and fix as a PDF, with timestamps and consent records."],
            ].map(([value, title, body]) => (
              <AccordionItem key={value} value={value}>
                <AccordionTrigger className="type-row">{title}</AccordionTrigger>
                <AccordionContent className="type-body max-w-[38rem] text-muted-foreground">
                  {body}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Example>
      </Block>

      <Block name="Message bubbles" when="The product is a text message. Incoming texts are muted; the employee's reply is always blue.">
        <Example dark className="items-stretch">
          <BubbleGroup className="w-full max-w-[24rem]">
            <Bubble variant="muted">
              <BubbleContent>
                Did you get all your meal and rest breaks this pay period? Reply 1
                for Yes, 2 for No.
              </BubbleContent>
            </Bubble>
            <Bubble align="end">
              <BubbleContent>No. I worked a double on Saturday.</BubbleContent>
            </Bubble>
          </BubbleGroup>
        </Example>
      </Block>

      <Block name="Line drawings" when="Where another site would show a screenshot. Soft-cornered solids in one hairline, with exactly one part in blue.">
        <div className="dark grid grid-cols-2 gap-3 lg:grid-cols-4">
          {["text", "answer", "fix", "record"].map((n) => (
            <div key={n} className="rounded-xl bg-background p-4 text-foreground">
              <LineDrawing name={n} active className="w-full" />
            </div>
          ))}
        </div>
      </Block>

      <Block name="Progress marks" when="Four hairlines that fill from the left, set directly under the text they belong to.">
        <Example dark>
          <div className="flex w-full max-w-[22rem] flex-col gap-6">
            <p className="type-step">
              <span className="text-accent-text">A flag</span> arrives with a
              next step, and gets fixed.
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[1, 1, 1, 0].map((on, i) => (
                <span key={i} className={on ? "h-px bg-foreground" : "h-px bg-foreground/20"} />
              ))}
            </div>
          </div>
        </Example>
      </Block>

      <Block name="Photograph" when="Shown as shot: warm, low-lit, people working. Film grain on top, 8px corners, 0.75rem apart in a strip.">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["1651977560788-98792cd34da0", "A line cook at a counter"],
            ["1637652918719-a32a2c187b9b", "A cook in a cap preparing food"],
            ["1576704546872-8d647cd96f8d", "A cook working over steam"],
            ["1719329468651-5e7c51ec94e5", "Cooks along a wooden counter"],
          ].map(([id, alt]) => (
            <div key={id} className="grain aspect-[3/4] overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo(id, 700)} alt={alt} className="size-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </Block>

      <Block name="Inset panel" when="The one filled surface. Use it once or twice a page, and never nest one inside another.">
        <Card>
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
            <Button>Book a demo</Button>
          </CardFooter>
        </Card>
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
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
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

        <div className="grid gap-x-6 gap-y-4 sm:grid-cols-3">
          {[
            ["37 of 42", "answered"],
            ["3", "flags this period"],
            ["1", "still open"],
          ].map(([n, l]) => (
            <div key={l} className="border-t pt-4">
              <p className="type-heading tabular-nums">{n}</p>
              <p className="type-small text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>

        <Separator />

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
                  <Badge variant={f.status === "Open" ? "default" : "outline"}>
                    {f.status}
                  </Badge>
                </TableCell>
                <TableCell>{f.by}</TableCell>
                <TableCell className="text-right tabular-nums">{f.when}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-card p-6">
          <div className="max-w-[36rem]">
            <p className="type-label">Suggested next step</p>
            <p className="type-body mt-1 text-muted-foreground">
              Have the walk-in door latch checked today and tell the crew when
              it&apos;s done.
            </p>
          </div>
          <Button>Mark fixed</Button>
        </div>
      </div>
    </Section>
  )
}
