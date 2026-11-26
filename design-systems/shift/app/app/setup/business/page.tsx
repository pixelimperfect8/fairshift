"use client"

import { useRef, useState } from "react"
import { useRouter } from "../../_lib/nav"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Cancel01Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { SetupFrame, StepActions } from "../../_components/shell"
import {
  formatPhone,
  hasErrors,
  industries,
  sampleProfile,
  schedules,
  todayISO,
  validateProfile,
} from "../../_lib/data"
import {
  newId,
  setState,
  usePrototype,
  type Profile,
  type Schedule,
} from "../../_lib/store"

export default function BusinessProfilePage() {
  const router = useRouter()
  const { profile, profileSaved } = usePrototype()
  const [tried, setTried] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const errors = tried ? validateProfile(profile) : {}

  const set = (patch: Partial<Profile>) =>
    setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }))

  const renameLocation = (id: string, name: string) =>
    setState((s) => {
      const before = s.profile.locations.find((l) => l.id === id)?.name ?? ""
      return {
        ...s,
        profile: {
          ...s.profile,
          locations: s.profile.locations.map((l) =>
            l.id === id ? { ...l, name } : l
          ),
        },
        // people already on the roster follow the rename
        workers: before
          ? s.workers.map((w) =>
              w.location === before ? { ...w, location: name } : w
            )
          : s.workers,
      }
    })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setTried(true)
    if (hasErrors(validateProfile(profile))) {
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus()
      })
      return
    }
    setState((s) => ({
      ...s,
      profileSaved: true,
      profile: {
        ...s.profile,
        name: s.profile.name.trim(),
        contactName: s.profile.contactName.trim(),
        contactEmail: s.profile.contactEmail.trim(),
        contactMobile: formatPhone(s.profile.contactMobile),
        locations: s.profile.locations.map((l) => ({ ...l, name: l.name.trim() })),
      },
    }))
    router.push("/app/setup/workers")
  }

  const describe = (id: string, error?: string) => ({
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  })

  return (
    <SetupFrame
      current="business"
      bright="Tell us about your business."
      dim="It takes a few minutes, and you can change any of it later."
    >
      <form ref={formRef} onSubmit={submit} noValidate className="max-w-[40rem]">
        {!profileSaved && (
          <div className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-card px-5 py-4">
            <p className="type-small text-muted-foreground">
              Walking through the prototype? Use a sample farm.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setTried(false)
                set(sampleProfile())
              }}
            >
              Fill in sample details
            </Button>
          </div>
        )}

        <FieldGroup>
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="biz-name">Business name</FieldLabel>
            <Input
              {...describe("biz-name", errors.name)}
              value={profile.name}
              onChange={(e) => set({ name: e.target.value })}
              autoComplete="organization"
            />
            <FieldDescription>
              Workers see this name at the start of each payday text.
            </FieldDescription>
            {errors.name && <FieldError id="biz-name-error">{errors.name}</FieldError>}
          </Field>

          <Field data-invalid={!!errors.industry}>
            <FieldLabel htmlFor="biz-industry">Industry</FieldLabel>
            <Select
              items={industries}
              value={profile.industry || null}
              onValueChange={(v) => set({ industry: (v as string) ?? "" })}
            >
              <SelectTrigger
                {...describe("biz-industry", errors.industry)}
                className="w-full"
              >
                <SelectValue placeholder="Choose an industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {industries.map((i) => (
                    <SelectItem key={i.value} value={i.value}>
                      {i.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldDescription>
              The check-in questions come ready for your kind of work.
            </FieldDescription>
            {errors.industry && (
              <FieldError id="biz-industry-error">{errors.industry}</FieldError>
            )}
          </Field>

          <FieldSet className="gap-3">
            <FieldLegend variant="label" className="mb-0">
              Locations
            </FieldLegend>
            <FieldDescription>
              Each ranch, shed or site where a crew works. Concerns are grouped
              by location.
            </FieldDescription>
            {profile.locations.map((l, i) => {
              const error = errors.location?.[l.id]
              return (
                <Field key={l.id} data-invalid={!!error} className="gap-2">
                  <div className="flex gap-2">
                    <Input
                      {...describe(`biz-location-${l.id}`, error)}
                      aria-label={`Location ${i + 1}`}
                      placeholder={i === 0 ? "Home ranch" : "Another location"}
                      value={l.name}
                      onChange={(e) => renameLocation(l.id, e.target.value)}
                    />
                    {profile.locations.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={`Remove ${l.name || `location ${i + 1}`}`}
                        onClick={() =>
                          set({
                            locations: profile.locations.filter((x) => x.id !== l.id),
                          })
                        }
                      >
                        <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
                      </Button>
                    )}
                  </div>
                  {error && (
                    <FieldError id={`biz-location-${l.id}-error`}>{error}</FieldError>
                  )}
                </Field>
              )
            })}
            <Button
              type="button"
              variant="outline"
              className="self-start"
              onClick={() =>
                set({
                  locations: [...profile.locations, { id: newId(), name: "" }],
                })
              }
            >
              <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
              Add another location
            </Button>
          </FieldSet>

          <FieldSet className="gap-3">
            <FieldLegend variant="label" className="mb-0">
              Payday schedule
            </FieldLegend>
            <RadioGroup
              value={profile.schedule || null}
              onValueChange={(v) => set({ schedule: v as Schedule })}
              aria-label="Payday schedule"
              aria-invalid={errors.schedule ? true : undefined}
              aria-describedby={errors.schedule ? "biz-schedule-error" : undefined}
              className="sm:grid-cols-2"
            >
              {schedules.map((s) => (
                <FieldLabel key={s.value} htmlFor={`biz-schedule-${s.value}`}>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>{s.label}</FieldTitle>
                      <FieldDescription>{s.hint}</FieldDescription>
                    </FieldContent>
                    <RadioGroupItem
                      value={s.value}
                      id={`biz-schedule-${s.value}`}
                      aria-invalid={errors.schedule ? true : undefined}
                    />
                  </Field>
                </FieldLabel>
              ))}
            </RadioGroup>
            {errors.schedule && (
              <FieldError id="biz-schedule-error">{errors.schedule}</FieldError>
            )}
          </FieldSet>

          <Field data-invalid={!!errors.nextPayday}>
            <FieldLabel htmlFor="biz-payday">Next payday</FieldLabel>
            <Input
              {...describe("biz-payday", errors.nextPayday)}
              type="date"
              min={todayISO()}
              value={profile.nextPayday}
              onChange={(e) => set({ nextPayday: e.target.value })}
              className="sm:max-w-56"
            />
            <FieldDescription>
              The first check-in goes out on this day. After that it follows
              your schedule.
            </FieldDescription>
            {errors.nextPayday && (
              <FieldError id="biz-payday-error">{errors.nextPayday}</FieldError>
            )}
          </Field>

          <FieldSet className="gap-5">
            <div>
              <FieldLegend variant="label" className="mb-1">
                Who hears about concerns
              </FieldLegend>
              <FieldDescription>
                When a worker raises a concern, this person gets it by text and
                email with a suggested next step. A concern about a manager
                comes here, not to that manager.
              </FieldDescription>
            </div>
            <Field data-invalid={!!errors.contactName}>
              <FieldLabel htmlFor="biz-contact-name">Name</FieldLabel>
              <Input
                {...describe("biz-contact-name", errors.contactName)}
                value={profile.contactName}
                onChange={(e) => set({ contactName: e.target.value })}
                autoComplete="name"
              />
              {errors.contactName && (
                <FieldError id="biz-contact-name-error">{errors.contactName}</FieldError>
              )}
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field data-invalid={!!errors.contactMobile}>
                <FieldLabel htmlFor="biz-contact-mobile">Mobile</FieldLabel>
                <Input
                  {...describe("biz-contact-mobile", errors.contactMobile)}
                  type="tel"
                  inputMode="tel"
                  placeholder="(530) 555-0142"
                  value={profile.contactMobile}
                  onChange={(e) => set({ contactMobile: e.target.value })}
                  autoComplete="tel"
                />
                {errors.contactMobile && (
                  <FieldError id="biz-contact-mobile-error">
                    {errors.contactMobile}
                  </FieldError>
                )}
              </Field>
              <Field data-invalid={!!errors.contactEmail}>
                <FieldLabel htmlFor="biz-contact-email">Email</FieldLabel>
                <Input
                  {...describe("biz-contact-email", errors.contactEmail)}
                  type="email"
                  inputMode="email"
                  value={profile.contactEmail}
                  onChange={(e) => set({ contactEmail: e.target.value })}
                  autoComplete="email"
                />
                {errors.contactEmail && (
                  <FieldError id="biz-contact-email-error">
                    {errors.contactEmail}
                  </FieldError>
                )}
              </Field>
            </div>
          </FieldSet>
        </FieldGroup>

        <StepActions back={{ href: "/app", label: "Back to dashboard" }}>
          <Button type="submit">Save and continue</Button>
        </StepActions>
      </form>
    </SetupFrame>
  )
}
