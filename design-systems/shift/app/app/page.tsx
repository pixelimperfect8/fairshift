"use client"

import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

import { nextStep, rosterReady, stepHref } from "./_components/shell"
import {
  addDaysISO,
  formatDate,
  formatShort,
  plural,
  previousPaydayISO,
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

// What the dashboard looks like once a payday has gone by. The results are
// sample ones, worked out from the roster so the numbers agree with each other.
function SetUp({ state }: { state: State }) {
  const { profile, workers, sampleAddressed } = state
  const total = workers.length
  const lastPayday = previousPaydayISO(profile.nextPayday, profile.schedule)
  const day = (offset: number) => formatDate(addDaysISO(lastPayday, offset), "short")

  // who answered, by location: the people who stayed quiet come off the biggest crews first
  const byLocation = profile.locations
    .map((l) => ({
      name: l.name,
      total: workers.filter((w) => w.location === l.name).length,
      quiet: 0,
    }))
    .filter((l) => l.total > 0)
  let quiet = total > 1 ? Math.max(1, Math.round(total * 0.16)) : 0
  const answered = total - quiet
  for (; quiet > 0 && byLocation.length; quiet--) {
    const crew = [...byLocation].sort((a, b) => b.total - b.quiet - (a.total - a.quiet))[0]
    crew.quiet++
  }
  const firstLocation = byLocation[0]?.name ?? ""
  const secondLocation = byLocation[1]?.name ?? firstLocation

  const open = sampleAddressed ? 0 : 1
  const addressedCount = sampleAddressed ? 4 : 3

  const openConcern = {
    what: `Two people at ${firstLocation} said they missed a meal break on ${day(-2)}.`,
    next: "Add one hour of premium pay for each of them to the next check, then go over that day's schedule with the crew lead.",
  }
  const record = [
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
      when: day(-6),
    },
    {
      what: "Drinking water ran low by mid-afternoon",
      where: firstLocation,
      did: "Second water cooler added to the crew truck.",
      when: day(-9),
    },
    {
      what: "Torn shade canopy",
      where: firstLocation,
      did: "Canopy replaced the same day.",
      when: day(-14),
    },
  ]

  return (
    <>
      <div className="fs-band">
        <div className="fs-wrap py-12 sm:py-16">
          <p className="type-small text-muted-foreground">
            {profile.name} · payday check-in, {formatDate(lastPayday)}
          </p>
          <h1 className="type-heading mt-3 max-w-[52rem]">
            {answered} of {total} answered.{" "}
            <span className="dim">
              {open ? `${plural(open, "concern", "concerns")} open.` : "No concerns open."}{" "}
              {addressedCount} addressed this month.
            </span>
          </h1>
          <p className="type-lede mt-6 max-w-[40rem] text-muted-foreground">
            The next check-in goes out {formatDate(profile.nextPayday)} to{" "}
            {plural(total, "worker", "workers")}.
          </p>
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
        {!sampleAddressed && (
          <section aria-label="Open concern" className="mb-14 rounded-xl bg-card p-6 sm:p-8">
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
          </section>
        )}

        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <section aria-labelledby="who-answered">
            <h2 id="who-answered" className="type-row">
              Who answered
            </h2>
            <dl className="mt-4 border-t">
              {byLocation.map((l) => (
                <div key={l.name} className="flex items-baseline justify-between gap-4 border-b py-4">
                  <dt className="type-label">{l.name}</dt>
                  <dd className="type-small text-muted-foreground tabular-nums">
                    {l.total - l.quiet} of {l.total}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="your-record">
            <h2 id="your-record" className="type-row">
              Your record
            </h2>
            <ul className="mt-4 border-t">
              {record.map((a) => (
                <li
                  key={a.what}
                  className="flex items-start justify-between gap-4 border-b py-4"
                >
                  <div className="min-w-0">
                    <p className="type-label">{a.what}</p>
                    <p className="type-small mt-0.5 text-muted-foreground">
                      {a.where} · {a.did} {profile.contactName}, {a.when}.
                    </p>
                  </div>
                  <Badge variant="success" className="mt-0.5">
                    Addressed
                  </Badge>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  )
}
