"use client"

import { useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"

import {
  formatPhone,
  languages,
  validateWorker,
  type WorkerDraft,
} from "../_lib/data"
import { newId, setState, usePrototype, type Worker } from "../_lib/store"

/** Add one person by hand, or edit a row. `worker` null means a new person. */
export function WorkerDialog({
  open,
  worker,
  onClose,
}: {
  open: boolean
  worker: Worker | null
  onClose: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      {/* on a phone the form with its messages is taller than the screen: let it scroll */}
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto">
        {/* keyed so each opening starts from the row it was opened on */}
        {open && <WorkerForm key={worker?.id ?? "new"} worker={worker} onClose={onClose} />}
      </DialogContent>
    </Dialog>
  )
}

function WorkerForm({
  worker,
  onClose,
}: {
  worker: Worker | null
  onClose: () => void
}) {
  const { profile, workers } = usePrototype()
  const locations = profile.locations
  const formRef = useRef<HTMLFormElement>(null)
  const [tried, setTried] = useState(worker !== null) // an existing row shows what it needs straight away
  const [draft, setDraft] = useState<WorkerDraft>(() => ({
    name: worker?.name ?? "",
    mobile: worker?.mobile ?? "",
    language: worker?.language ?? "English",
    location: worker?.location ?? (locations.length === 1 ? locations[0].name : ""),
    manager: worker?.manager ?? "",
  }))

  const others = workers.filter((w) => w.id !== worker?.id)
  const check = (d: WorkerDraft) => validateWorker(d, others, locations)
  const errors = tried ? check(draft) : {}
  const set = (patch: Partial<WorkerDraft>) => setDraft((d) => ({ ...d, ...patch }))

  const languageItems = languages.map((l) => ({ value: l, label: l }))
  const locationItems = locations.map((l) => ({ value: l.name, label: l.name }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setTried(true)
    if (Object.keys(check(draft)).length) {
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus()
      })
      return
    }
    const saved: Worker = {
      id: worker?.id ?? newId(),
      name: draft.name.trim(),
      mobile: formatPhone(draft.mobile),
      language: draft.language,
      location: draft.location,
      manager: draft.manager.trim(),
    }
    setState((s) => ({
      ...s,
      workers: worker
        ? s.workers.map((w) => (w.id === worker.id ? saved : w))
        : [...s.workers, saved],
    }))
    toast.add({
      type: "success",
      title: worker ? `${saved.name} updated` : `${saved.name} added to the roster`,
    })
    onClose()
  }

  const describe = (id: string, error?: string) => ({
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  })

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="contents">
      <DialogHeader>
        <DialogTitle>{worker ? "Edit details" : "Add a person"}</DialogTitle>
        <DialogDescription>
          {worker
            ? "Changes apply from the next check-in."
            : "They get the next payday check-in by text. Answering is always optional."}
        </DialogDescription>
      </DialogHeader>

      <FieldGroup className="gap-5">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="w-name">Name</FieldLabel>
          <Input
            {...describe("w-name", errors.name)}
            value={draft.name}
            onChange={(e) => set({ name: e.target.value })}
            autoComplete="off"
          />
          {errors.name && <FieldError id="w-name-error">{errors.name}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.mobile}>
          <FieldLabel htmlFor="w-mobile">Mobile</FieldLabel>
          <Input
            {...describe("w-mobile", errors.mobile)}
            type="tel"
            inputMode="tel"
            placeholder="(530) 555-0142"
            value={draft.mobile}
            onChange={(e) => set({ mobile: e.target.value })}
            autoComplete="off"
          />
          {errors.mobile && <FieldError id="w-mobile-error">{errors.mobile}</FieldError>}
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.language}>
            <FieldLabel htmlFor="w-language">Language</FieldLabel>
            <Select
              items={languageItems}
              value={languages.includes(draft.language) ? draft.language : null}
              onValueChange={(v) => set({ language: (v as string) ?? "" })}
            >
              <SelectTrigger {...describe("w-language", errors.language)} className="w-full">
                <SelectValue placeholder="Choose a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {languageItems.map((l) => (
                    <SelectItem key={l.value} value={l.value}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.language && (
              <FieldError id="w-language-error">{errors.language}</FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.location}>
            <FieldLabel htmlFor="w-location">Location</FieldLabel>
            <Select
              items={locationItems}
              value={locations.some((l) => l.name === draft.location) ? draft.location : null}
              onValueChange={(v) => set({ location: (v as string) ?? "" })}
            >
              <SelectTrigger {...describe("w-location", errors.location)} className="w-full">
                <SelectValue placeholder="Choose a location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {locationItems.map((l) => (
                    <SelectItem key={l.value} value={l.value}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.location && (
              <FieldError id="w-location-error">{errors.location}</FieldError>
            )}
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="w-manager">
            Manager
            <span className="font-normal text-muted-foreground">(optional)</span>
          </FieldLabel>
          <Input
            id="w-manager"
            value={draft.manager}
            onChange={(e) => set({ manager: e.target.value })}
            autoComplete="off"
          />
          <FieldDescription>
            The crew lead or supervisor this person reports to.
          </FieldDescription>
        </Field>
      </FieldGroup>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button type="submit">{worker ? "Save changes" : "Add to roster"}</Button>
      </DialogFooter>
    </form>
  )
}
