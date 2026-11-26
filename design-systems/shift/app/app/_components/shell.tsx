"use client"

import { Link } from "../_lib/nav"
import { useRouter } from "../_lib/nav"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

import { workerIssue } from "../_lib/data"
import { resetState, useHydrated, usePrototype, type State } from "../_lib/store"

export function Shell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const hydrated = useHydrated()
  const { profile, profileSaved } = usePrototype()

  return (
    <div className="fs-app flex flex-col">
      <header className="fs-band sticky top-0 z-40 border-b">
        <div className="fs-wrap flex h-16 items-center justify-between gap-4">
          <Link
            href="/app"
            className="text-[1.3rem] font-semibold tracking-[-0.04em]"
          >
            FairShift
          </Link>
          <div className="flex min-w-0 items-center gap-2">
            {hydrated && profileSaved && (
              <span className="type-small hidden truncate text-muted-foreground sm:block">
                {profile.name}
              </span>
            )}
            <Button
              variant="ghost"
              onClick={() => {
                resetState()
                router.push("/app")
                toast.add({ title: "Prototype cleared. You are back at the first visit." })
              }}
            >
              Start over
            </Button>
          </div>
        </div>
      </header>
      {/* nothing that depends on stored state paints until it has been read */}
      <div className={cn("flex-1", !hydrated && "invisible")}>{children}</div>
      <footer className="border-t">
        <p className="fs-wrap type-small py-6 text-muted-foreground">
          Prototype with sample data. Nothing here is sent to anyone, and what
          you enter stays in this browser.
        </p>
      </footer>
    </div>
  )
}

// ---- setup progress ----------------------------------------------------------

export type StepKey = "business" | "workers" | "review"

const steps: { key: StepKey; label: string; href: string }[] = [
  { key: "business", label: "Business profile", href: "/app/setup/business" },
  { key: "workers", label: "Add workers", href: "/app/setup/workers" },
  { key: "review", label: "Review and turn on", href: "/app/setup/review" },
]

export function rosterReady(s: State) {
  return (
    s.workers.length > 0 &&
    s.workers.every((w) => !workerIssue(w, s.workers, s.profile.locations))
  )
}

/** The first step that still needs something. */
export function nextStep(s: State): StepKey {
  if (!s.profileSaved) return "business"
  if (!rosterReady(s)) return "workers"
  return "review"
}

export const stepHref = (key: StepKey) => steps.find((s) => s.key === key)!.href

/**
 * The design system's progress marks: hairlines that fill from the left, set
 * directly above the text they belong to. Earlier steps are links, so going
 * back is one tap and nothing entered is lost.
 */
function SetupProgress({ current }: { current: StepKey }) {
  const state = usePrototype()
  const currentIndex = steps.findIndex((s) => s.key === current)
  const reachable = steps.findIndex((s) => s.key === nextStep(state))

  return (
    <nav aria-label="Setup progress">
      <ol className="grid grid-cols-3 gap-2 sm:gap-3">
        {steps.map((step, i) => {
          const filled = i <= currentIndex
          const isCurrent = i === currentIndex
          const canVisit = !isCurrent && i <= Math.max(reachable, currentIndex)
          const label = (
            <span
              className={cn(
                "type-label block pt-3",
                isCurrent ? "text-foreground" : "text-muted-foreground",
                !isCurrent && "max-sm:sr-only"
              )}
            >
              {step.label}
            </span>
          )
          return (
            <li key={step.key} aria-current={isCurrent ? "step" : undefined}>
              <span
                aria-hidden
                className={cn(
                  "block h-0.5",
                  filled ? "bg-foreground" : "bg-foreground/15"
                )}
              />
              {canVisit ? (
                <Link
                  href={step.href}
                  className="block rounded-sm hover:[&>span]:text-foreground"
                >
                  {label}
                </Link>
              ) : (
                label
              )}
            </li>
          )
        })}
      </ol>
      <p className="type-small pt-3 text-muted-foreground sm:hidden">
        Step {currentIndex + 1} of {steps.length}
      </p>
    </nav>
  )
}

/** The frame every setup step shares: progress, a two-tone heading, then the step. */
export function SetupFrame({
  current,
  bright,
  dim,
  children,
}: {
  current: StepKey
  bright: string
  dim: string
  children: React.ReactNode
}) {
  return (
    <>
      <div className="fs-band">
        <div className="fs-wrap pt-8 pb-10 sm:pt-10 sm:pb-12">
          <SetupProgress current={current} />
          <h1 className="type-step mt-8 max-w-[44rem] sm:mt-10">
            {bright} <span className="dim">{dim}</span>
          </h1>
        </div>
      </div>
      <main className="fs-wrap py-10 sm:py-14">{children}</main>
    </>
  )
}

/**
 * Back on the left, the one blue action on the right, in a bar fixed to the
 * bottom of the screen so the next step is always in reach. A spacer holds its
 * place in the page; prototype.css keeps the page footer clear of it.
 */
export function StepActions({
  back,
  children,
  note,
}: {
  back?: { label: string; href?: string; onClick?: () => void }
  children?: React.ReactNode
  note?: React.ReactNode
}) {
  const backLabel = back && (
    <>
      <span className="sm:hidden">Back</span>
      <span className="max-sm:hidden">{back.label}</span>
    </>
  )
  return (
    <>
      <div aria-hidden className="h-10" />
      <div
        data-step-actions
        className="fixed inset-x-0 bottom-0 z-40 border-t bg-background"
      >
        <div className="fs-wrap py-3">
          {note && <div className="mb-3">{note}</div>}
          <div className="flex items-center justify-between gap-3">
            {back?.href ? (
              <Button
                variant="ghost"
                className="max-sm:-ml-3 max-sm:px-3"
                aria-label={back.label}
                nativeButton={false}
                render={<Link href={back.href} />}
              >
                {backLabel}
              </Button>
            ) : back ? (
              <Button
                type="button"
                variant="ghost"
                className="max-sm:-ml-3 max-sm:px-3"
                aria-label={back.label}
                onClick={back.onClick}
              >
                {backLabel}
              </Button>
            ) : (
              <span />
            )}
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
