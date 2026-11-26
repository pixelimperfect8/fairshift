"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/toast"

import {
  nextStep,
  SetupFrame,
  StepActions,
  stepHref,
} from "../../_components/shell"
import {
  firstName,
  formatDate,
  industries,
  labelOf,
  paydayText,
  plural,
  schedules,
} from "../../_lib/data"
import { setState, useHydrated, usePrototype } from "../../_lib/store"

const countBy = (values: string[]) => {
  const counts = new Map<string, number>()
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1)
  return [...counts.entries()].sort((a, b) => b[1] - a[1])
}

export default function ReviewPage() {
  const router = useRouter()
  const hydrated = useHydrated()
  const state = usePrototype()
  const { profile, workers, live } = state
  const ready = nextStep(state) === "review"

  useEffect(() => {
    if (hydrated && !ready) router.replace(stepHref(nextStep(state)))
  }, [hydrated, ready, router, state])

  if (!ready) return null

  const payday = formatDate(profile.nextPayday)
  const byLocation = countBy(workers.map((w) => w.location))
  const byLanguage = countBy(workers.map((w) => w.language))
  const nameFor = (language: string, fallback: string) =>
    firstName(workers.find((w) => w.language === language)?.name ?? "") || fallback

  const schedule = () => {
    setState((s) => ({ ...s, live: true }))
    toast.add({
      type: "success",
      title: live ? "Changes saved" : "First check-in scheduled",
      description: `${plural(workers.length, "text goes", "texts go")} out ${payday}.`,
    })
    router.push("/app")
  }

  return (
    <SetupFrame
      current="review"
      bright="Review and turn on."
      dim="Check the details, then schedule your first check-in."
    >
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex flex-col gap-12">
          <Summary title="Business profile" editHref="/app/setup/business">
            <Row label="Business" value={profile.name} />
            <Row label="Industry" value={labelOf(industries, profile.industry)} />
            <Row
              label={profile.locations.length === 1 ? "Location" : "Locations"}
              value={profile.locations.map((l) => l.name).join(", ")}
            />
            <Row label="Payday schedule" value={labelOf(schedules, profile.schedule)} />
            <Row label="Next payday" value={payday} />
            <Row
              label="Concerns go to"
              value={
                <>
                  {profile.contactName}
                  <span className="block text-muted-foreground">
                    {profile.contactMobile} · {profile.contactEmail}
                  </span>
                </>
              }
            />
          </Summary>

          <Summary title="Roster" editHref="/app/setup/workers">
            <Row label="On the roster" value={plural(workers.length, "person", "people")} />
            <Row
              label="By location"
              value={byLocation.map(([name, n]) => `${name}: ${n}`).join(", ")}
            />
            <Row
              label="By language"
              value={byLanguage.map(([name, n]) => `${name}: ${n}`).join(", ")}
            />
          </Summary>
        </div>

        <section aria-labelledby="text-preview">
          <h2 id="text-preview" className="type-row">
            The payday text
          </h2>
          <p className="type-small mt-2 text-muted-foreground">
            What your crew gets on {payday}, each in their own language.
          </p>
          <Tabs defaultValue="en" className="mt-5 w-full">
            <TabsList>
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="es">Español</TabsTrigger>
            </TabsList>
            {(["en", "es"] as const).map((lang) => (
              <TabsContent key={lang} value={lang}>
                <div className="fs-band mt-2 rounded-xl p-4" lang={lang}>
                  <BubbleGroup>
                    {paydayText(
                      lang,
                      lang === "en" ? nameFor("English", "Dale") : nameFor("Spanish", "Rosa"),
                      profile.name
                    ).map((line) => (
                      <Bubble key={line} variant="muted" className="max-w-[92%]">
                        <BubbleContent>{line}</BubbleContent>
                      </Bubble>
                    ))}
                  </BubbleGroup>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <p className="type-small mt-4 text-muted-foreground">
            Three questions, about a minute. Answering is optional and separate
            from pay. Anyone can reply STOP to opt out.
          </p>
        </section>
      </div>

      <StepActions back={{ href: "/app/setup/workers", label: "Back to roster" }}>
        <Button onClick={schedule}>
          {live ? "Save and go to dashboard" : "Schedule first check-in"}
        </Button>
      </StepActions>
    </SetupFrame>
  )
}

function Summary({
  title,
  editHref,
  children,
}: {
  title: string
  editHref: string
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <h2 className="type-row">{title}</h2>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href={editHref} />}
          aria-label={`Edit ${title.toLowerCase()}`}
        >
          Edit
        </Button>
      </div>
      <dl className="mt-4 border-t">{children}</dl>
    </section>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid gap-x-6 gap-y-0.5 border-b py-3.5 sm:grid-cols-[11rem_minmax(0,1fr)]">
      <dt className="type-small text-muted-foreground">{label}</dt>
      <dd className="type-small break-words">{value}</dd>
    </div>
  )
}
