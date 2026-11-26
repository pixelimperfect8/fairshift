"use client"

import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

import { nextStep, rosterReady, stepHref } from "./_components/shell"
import {
  daysFromToday,
  formatDate,
  formatShort,
  labelOf,
  plural,
  schedules,
} from "./_lib/data"
import { setState, usePrototype, type State } from "./_lib/store"

export default function DashboardPage() {
  const state = usePrototype()
  return state.live ? <SetUp state={state} /> : <FirstVisit state={state} />
}

// ---- first visit -------------------------------------------------------------

const actionLabel = {
  business: "Set up business profile",
  workers: "Add your workers",
  review: "Review and turn on",
}

const willAppear = [
  ["Your next payday", "The date the next check-in goes out, and how many people get it."],
  ["Who answered", "How many of your crew replied, by location."],
  ["Concerns, each with a next step", "What needs attention and what to do about it, in plain words."],
  ["Your record", "A dated note of how each concern was addressed, and by whom."],
]

function FirstVisit({ state }: { state: State }) {
  const { profile, profileSaved, workers } = state
  const step = nextStep(state)
  const rosterStatus = !workers.length
    ? "Not started"
    : rosterReady(state)
      ? plural(workers.length, "person", "people")
      : `${plural(workers.length, "person", "people")}, some need attention`

  return (
    <>
      <div className="fs-band">
        <div className="fs-wrap py-12 sm:py-20">
          <h1 className="type-heading max-w-[48rem]">
            No check-ins yet.{" "}
            <span className="dim">Your first one goes out next payday.</span>
          </h1>
          <p className="type-lede mt-6 max-w-[36rem] text-muted-foreground">
            Two things to set up first: your business profile, then your
            roster. Plan on about 15 minutes.
          </p>
          <Button
            size="lg"
            className="mt-8 max-sm:w-full"
            nativeButton={false}
            render={<Link href={stepHref(step)} />}
          >
            {actionLabel[step]}
          </Button>
        </div>
      </div>

      <main className="fs-wrap grid gap-x-16 gap-y-14 py-12 sm:py-16 lg:grid-cols-2">
        <section aria-labelledby="setup-steps">
          <h2 id="setup-steps" className="type-row">
            Setup
          </h2>
          <ul className="mt-5 border-t">
            <StepRow
              href="/app/setup/business"
              title="Business profile"
              detail="Your locations, payday schedule and who hears about concerns."
              status={profileSaved ? profile.name : "Not started"}
            />
            <StepRow
              href={profileSaved ? "/app/setup/workers" : undefined}
              title="Roster"
              detail="Upload a spreadsheet or add people one at a time."
              status={rosterStatus}
            />
          </ul>
        </section>

        <section aria-labelledby="will-appear">
          <h2 id="will-appear" className="type-row">
            What will appear here
          </h2>
          <dl className="mt-5 border-t">
            {willAppear.map(([title, detail]) => (
              <div key={title} className="border-b py-4">
                <dt className="type-label">{title}</dt>
                <dd className="type-small mt-0.5 text-muted-foreground">{detail}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </>
  )
}

function StepRow({
  href,
  title,
  detail,
  status,
}: {
  href?: string
  title: string
  detail: string
  status: string
}) {
  const body = (
    <>
      <span className="min-w-0 flex-1">
        <span className="type-label block">{title}</span>
        <span className="type-small mt-0.5 block text-muted-foreground">{detail}</span>
      </span>
      <span className="type-small shrink-0 text-muted-foreground">{status}</span>
      {href && (
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          strokeWidth={2}
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden
        />
      )}
    </>
  )
  return (
    <li className="border-b">
      {href ? (
        <Link
          href={href}
          className="flex items-center gap-4 py-4 hover:bg-foreground/[0.03]"
        >
          {body}
        </Link>
      ) : (
        <div className="flex items-center gap-4 py-4">{body}</div>
      )}
    </li>
  )
}

// ---- set up ------------------------------------------------------------------

function SetUp({ state }: { state: State }) {
  const { profile, workers, sampleAddressed } = state
  const total = workers.length
  const locationCount = new Set(workers.map((w) => w.location)).size
  const [firstLocation, secondLocation = firstLocation] = profile.locations.map((l) => l.name)

  // The sample results are scaled to the roster, so the numbers agree with each other.
  const quiet = total > 1 ? Math.max(1, Math.round(total * 0.16)) : 0
  const answered = total - quiet
  const open = sampleAddressed ? 0 : 1
  const addressedCount = sampleAddressed ? 4 : 3

  const openConcern = {
    what: `Two people at ${firstLocation} said they missed a meal break on ${formatShort(daysFromToday(-3))}.`,
    next: "Add one hour of premium pay for each of them to the next check, then go over that day's schedule with the crew lead.",
  }
  const addressed = [
    ...(sampleAddressed
      ? [
          {
            what: "Missed meal breaks",
            where: firstLocation,
            did: "Premium pay added to the next check. Schedule reviewed with the crew lead.",
            when: formatShort(new Date()),
          },
        ]
      : []),
    {
      what: "Overtime missing from one check",
      where: secondLocation,
      did: "Hours corrected and paid on the next check.",
      when: formatShort(daysFromToday(-9)),
    },
    {
      what: "Drinking water ran low by mid-afternoon",
      where: firstLocation,
      did: "Second water cooler added to the crew truck.",
      when: formatShort(daysFromToday(-12)),
    },
    {
      what: "Torn shade canopy",
      where: firstLocation,
      did: "Canopy replaced the same day.",
      when: formatShort(daysFromToday(-17)),
    },
  ]

  return (
    <>
      <div className="fs-band">
        <div className="fs-wrap py-12 sm:py-16">
          <p className="type-small text-muted-foreground">{profile.name}</p>
          <h1 className="type-heading mt-3 max-w-[52rem]">
            Your first check-in goes out {formatDate(profile.nextPayday)}.{" "}
            <span className="dim">
              {plural(total, "worker", "workers")} across{" "}
              {plural(locationCount, "location", "locations")} will get it.
            </span>
          </h1>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/app/setup/workers" />}
            >
              Edit roster
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/app/setup/business" />}
            >
              Edit business profile
            </Button>
          </div>
        </div>
      </div>

      <main className="fs-wrap py-12 sm:py-16">
        <dl className="grid gap-x-6 sm:grid-cols-3">
          <Stat
            value={formatDate(profile.nextPayday, "short")}
            label={`Next payday · ${labelOf(schedules, profile.schedule).toLowerCase()}`}
          />
          <Stat
            value={String(total)}
            label={`${total === 1 ? "Worker" : "Workers"} on the roster`}
          />
          <Stat value={profile.contactName} label="Hears about concerns" small />
        </dl>

        <section aria-labelledby="sample-results" className="mt-16 sm:mt-20">
          <h2 id="sample-results" className="type-step">
            After payday, this fills in.
          </h2>
          <p className="type-body mt-3 max-w-[40rem] text-muted-foreground">
            These are sample results so you can see how it reads. Yours replace
            them after {formatDate(profile.nextPayday)}.
          </p>

          <dl className="mt-10 grid gap-x-6 sm:grid-cols-3">
            <Stat value={`${answered} of ${total}`} label="answered" />
            <Stat
              value={String(open)}
              label={open === 1 ? "concern open" : "concerns open"}
              tone={open ? "warning" : undefined}
            />
            <Stat value={String(addressedCount)} label="addressed this month" tone="success" />
          </dl>

          {!sampleAddressed && (
            <div className="mt-10 rounded-xl bg-card p-6 sm:p-8">
              <Badge variant="warning">Open</Badge>
              <p className="type-row mt-4 max-w-[44rem]">{openConcern.what}</p>
              <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-[36rem]">
                  <p className="type-label">Suggested next step</p>
                  <p className="type-body mt-1 text-muted-foreground">{openConcern.next}</p>
                </div>
                <Button
                  className="shrink-0"
                  onClick={() => {
                    setState((s) => ({ ...s, sampleAddressed: true }))
                    toast.add({
                      type: "success",
                      title: "Marked as addressed",
                      description: "Saved to your record with your name and today's date.",
                    })
                  }}
                >
                  Mark as addressed
                </Button>
              </div>
            </div>
          )}

          <h3 className="type-row mt-12">Your record</h3>
          <ul className="mt-4 border-t">
            {addressed.map((a) => (
              <li
                key={a.what}
                className="grid gap-x-6 gap-y-1 border-b py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_auto] sm:items-center"
              >
                <div>
                  <p className="type-label">{a.what}</p>
                  <p className="type-small text-muted-foreground">{a.where}</p>
                </div>
                <p className="type-small text-muted-foreground">
                  {a.did} {profile.contactName}, {a.when}.
                </p>
                <Badge variant="success" className="max-sm:mt-1">
                  Addressed
                </Badge>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}

function Stat({
  value,
  label,
  tone,
  small,
}: {
  value: string
  label: string
  tone?: "warning" | "success"
  small?: boolean
}) {
  return (
    <div className="flex flex-col-reverse justify-end border-t py-5">
      <dt className="type-small mt-1 text-muted-foreground">{label}</dt>
      <dd
        className={[
          small ? "type-step sm:pt-3" : "type-heading",
          "tabular-nums",
          tone === "warning" ? "text-warning" : tone === "success" ? "text-success" : "",
        ].join(" ")}
      >
        {value}
      </dd>
    </div>
  )
}
