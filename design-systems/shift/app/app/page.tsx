"use client"

import { useEffect } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"

import { Dashboard } from "./_components/dashboard"
import { nextStep, rosterReady, stepHref } from "./_components/shell"
import { plural } from "./_lib/data"
import { Link, SINGLE, useScreen } from "./_lib/nav"
import { usePrototype, type State } from "./_lib/store"
import BusinessProfilePage from "./setup/business/page"
import ReviewPage from "./setup/review/page"
import WorkersPage from "./setup/workers/page"

export default function DashboardPage() {
  const state = usePrototype()
  const screen = useScreen()

  // the one-page build changes screen without a page load: start each at the top
  useEffect(() => {
    if (SINGLE) window.scrollTo({ top: 0, behavior: "instant" })
  }, [screen])

  if (SINGLE && screen === "business") return <BusinessProfilePage />
  if (SINGLE && screen === "workers") return <WorkersPage />
  if (SINGLE && screen === "review") return <ReviewPage />
  return state.live ? <Dashboard state={state} /> : <FirstVisit state={state} />
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
