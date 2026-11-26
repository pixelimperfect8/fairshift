"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "cn"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon } from "@hugeicons/core-free-icons"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"

import { addDaysISO, formatDate, plural, todayISO } from "../_lib/data"
import { buildHistory } from "../_lib/history"
import { setState, type State } from "../_lib/store"

const ALL = "all"

/**
 * The dashboard once paydays have gone by: the latest check-in up top, any open
 * concern, then past paydays beside the record. The history is sample data,
 * worked out from the roster (see _lib/history.ts).
 */
export function Dashboard({ state }: { state: State }) {
  const { profile, workers } = state
  const [query, setQuery] = useState("")
  const [payday, setPayday] = useState(ALL) // a past payday's date, or all of them

  const { paydays, concerns } = buildHistory(state)
  const latest = paydays[0]
  const openConcerns = concerns.filter((c) => !c.addressedOn)
  const open = openConcerns[0]
  const monthAgo = addDaysISO(todayISO(), -30)
  const addressedThisMonth = concerns.filter(
    (c) => c.addressedOn && c.addressedOn >= monthAgo
  ).length

  const paydayItems = [
    { value: ALL, label: "All paydays" },
    ...paydays.map((p) => ({ value: p.iso, label: formatDate(p.iso, "short") })),
  ]

  const q = query.trim().toLowerCase()
  const shown = concerns.filter(
    (c) =>
      (payday === ALL || c.raised === payday) &&
      (!q ||
        [
          c.what,
          c.where,
          c.addressedOn ? c.did : "open",
          profile.contactName,
          formatDate(c.raised),
          c.addressedOn ? formatDate(c.addressedOn) : "",
        ]
          .join(" ")
          .toLowerCase()
          .includes(q))
  )

  return (
    <>
      <div className="fs-band">
        <div className="fs-wrap py-12 sm:py-16">
          <p className="type-small text-muted-foreground">
            {profile.name} · payday check-in, {formatDate(latest.iso)}
          </p>
          <h1 className="type-heading mt-3 max-w-[52rem]">
            {latest.answered} of {latest.total} answered.{" "}
            <span className="dim">
              {openConcerns.length
                ? `${plural(openConcerns.length, "concern", "concerns")} open.`
                : "No concerns open."}{" "}
              {addressedThisMonth} addressed this month.
            </span>
          </h1>
          <p className="type-lede mt-6 max-w-[40rem] text-muted-foreground">
            The next check-in goes out {formatDate(profile.nextPayday)} to{" "}
            {plural(workers.length, "worker", "workers")}.
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
        {open && (
          <section aria-label="Open concern" className="mb-14 rounded-xl bg-card p-6 sm:p-8">
            <Badge variant="warning">Open</Badge>
            <p className="type-row mt-4 max-w-[44rem]">
              Two people at {open.where} said they missed a meal break on{" "}
              {formatDate(addDaysISO(open.raised, -2), "short")}.
            </p>
            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-[36rem]">
                <p className="type-label">Suggested next step</p>
                <p className="type-body mt-1 text-muted-foreground">{open.next}</p>
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
          <section aria-labelledby="past-paydays">
            <h2 id="past-paydays" className="type-row">
              Past paydays
            </h2>
            <p className="type-small mt-1 text-muted-foreground">
              Choose one to see who answered and what was raised.
            </p>
            <ul className="mt-4 border-t">
              {paydays.map((p) => {
                const selected = payday === p.iso
                return (
                  <li key={p.iso} className="border-b">
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setPayday(selected ? ALL : p.iso)}
                      className={cn(
                        "-mx-3 my-1 flex min-h-11 w-[calc(100%+1.5rem)] items-baseline justify-between gap-4 rounded-lg px-3 py-3 text-left hover:bg-foreground/[0.04]",
                        selected && "bg-card hover:bg-card"
                      )}
                    >
                      <span className="type-label">{formatDate(p.iso)}</span>
                      <span className="type-small text-muted-foreground tabular-nums">
                        {p.answered} of {p.total} answered
                      </span>
                    </button>
                    {selected && (
                      <dl className="pt-1 pb-3">
                        {p.byLocation.map((l) => (
                          <div
                            key={l.name}
                            className="type-small flex justify-between gap-4 py-1 text-muted-foreground"
                          >
                            <dt>{l.name}</dt>
                            <dd className="tabular-nums">
                              {l.answered} of {l.total}
                            </dd>
                          </div>
                        ))}
                        <div className="type-small flex justify-between gap-4 py-1 text-muted-foreground">
                          <dt>Concerns raised</dt>
                          <dd className="tabular-nums">{p.concerns}</dd>
                        </div>
                      </dl>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>

          <section aria-labelledby="your-record">
            <h2 id="your-record" className="type-row">
              Your record
            </h2>
            <p className="type-small mt-1 text-muted-foreground">
              {payday === ALL
                ? "Every concern raised, from all paydays."
                : `Concerns raised in the ${formatDate(payday, "short")} check-in.`}
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <InputGroup className="flex-1">
                <InputGroupInput
                  type="search"
                  aria-label="Search your record"
                  placeholder="Search by concern, location, person or date"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <InputGroupAddon>
                  <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
                </InputGroupAddon>
              </InputGroup>
              <Select
                items={paydayItems}
                value={payday}
                onValueChange={(v) => setPayday((v as string) ?? ALL)}
              >
                <SelectTrigger aria-label="Filter by payday" className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {paydayItems.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {shown.length === 0 ? (
              <div className="mt-4 border-y py-8">
                <p className="type-body">
                  {q ? (
                    <>
                      Nothing in your record matches &ldquo;{query.trim()}&rdquo;
                      {payday === ALL ? "" : " for this payday"}.
                    </>
                  ) : (
                    "No concerns were raised in this check-in."
                  )}
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setQuery("")
                    setPayday(ALL)
                  }}
                >
                  Show the whole record
                </Button>
              </div>
            ) : (
              <ul className="mt-1">
                {shown.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-start justify-between gap-4 border-b py-4"
                  >
                    <div className="min-w-0">
                      <p className="type-label">{c.what}</p>
                      <p className="type-small mt-0.5 text-muted-foreground">
                        {c.where} · raised {formatDate(c.raised, "short")}
                      </p>
                      <p className="type-small mt-0.5 text-muted-foreground">
                        {c.addressedOn
                          ? `${c.did} ${profile.contactName}, ${formatDate(c.addressedOn, "short")}.`
                          : "Waiting on a next step."}
                      </p>
                    </div>
                    <Badge
                      variant={c.addressedOn ? "success" : "warning"}
                      className="mt-0.5"
                    >
                      {c.addressedOn ? "Addressed" : "Open"}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </>
  )
}
