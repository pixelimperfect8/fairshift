"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "../../_lib/nav"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Delete02Icon,
  PencilEdit02Icon,
  Search01Icon,
  Upload04Icon,
  UserAdd01Icon,
} from "@hugeicons/core-free-icons"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "@/components/ui/toast"

import { SetupFrame, StepActions } from "../../_components/shell"
import { WorkerDialog } from "../../_components/worker-dialog"
import {
  guessMapping,
  parseCsv,
  plural,
  rosterFields,
  rowsToWorkers,
  sampleCsv,
  sampleFileName,
  workerIssue,
  type Mapping,
  type Sheet,
} from "../../_lib/data"
import {
  newId,
  setState,
  useHydrated,
  usePrototype,
  type Worker,
} from "../../_lib/store"

type View = "upload" | "map" | "preview" | null // null: roster if there is one, else the two ways in

const NONE = "__none__"

export default function WorkersPage() {
  const router = useRouter()
  const hydrated = useHydrated()
  const state = usePrototype()
  const { profile, workers, profileSaved } = state
  const locations = profile.locations

  const [view, setViewRaw] = useState<View>(null)
  // each view is its own screen: start it from the top
  const setView = (next: View) => {
    setViewRaw(next)
    window.scrollTo({ top: 0 })
  }
  const [sheet, setSheet] = useState<Sheet | null>(null)
  const [mapping, setMapping] = useState<Mapping | null>(null)
  const [fileError, setFileError] = useState("")
  const [mapTried, setMapTried] = useState(false)
  const [editing, setEditing] = useState<Worker | "new" | null>(null)
  const [removing, setRemoving] = useState<Worker | null>(null)
  const [query, setQuery] = useState("")
  const [blocked, setBlocked] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (hydrated && !profileSaved) router.replace("/app/setup/business")
  }, [hydrated, profileSaved, router])

  const screen = view ?? (workers.length ? "roster" : "upload")

  // ---- upload ---------------------------------------------------------------

  const openSheet = (fileName: string, text: string) => {
    const { headers, rows } = parseCsv(text)
    if (!headers.length || !rows.length) {
      setFileError(
        "This file has no rows to read. Check that the first row holds the column names and the rows below hold your workers, then choose it again."
      )
      return
    }
    setFileError("")
    setSheet({ fileName, headers, rows })
    setMapping(guessMapping(headers))
    setMapTried(false)
    setView("map")
  }

  const onFile = (file: File | undefined) => {
    if (!file) return
    if (!/\.csv$/i.test(file.name)) {
      setFileError(
        "FairShift reads CSV files. In Excel or Google Sheets, choose Download or Save as, pick CSV, then choose that file here."
      )
      return
    }
    file.text().then((text) => openSheet(file.name, text))
  }

  // ---- preview --------------------------------------------------------------

  const preview = useMemo(() => {
    if (!sheet || !mapping) return []
    let n = 0
    const rows = rowsToWorkers(sheet, mapping, locations, () => `row-${n++}`)
    const everyone = [...workers, ...rows]
    return rows.map((w) => ({ ...w, issue: workerIssue(w, everyone, locations) }))
  }, [sheet, mapping, locations, workers])
  const previewIssues = preview.filter((r) => r.issue).length

  const importRows = () => {
    setState((s) => ({
      ...s,
      workers: [
        ...s.workers,
        ...preview.map((r) => ({
          id: newId(),
          name: r.name,
          mobile: r.mobile,
          language: r.language,
          location: r.location,
          manager: r.manager,
        })),
      ],
    }))
    toast.add({
      type: "success",
      title: `${plural(preview.length, "person", "people")} added to the roster`,
      description: previewIssues
        ? `${plural(previewIssues, "row needs", "rows need")} attention before the first check-in.`
        : undefined,
    })
    setSheet(null)
    setMapping(null)
    setView(null)
  }

  // ---- roster ---------------------------------------------------------------

  const withIssues = useMemo(
    () => workers.map((w) => ({ ...w, issue: workerIssue(w, workers, locations) })),
    [workers, locations]
  )
  const issueCount = withIssues.filter((w) => w.issue).length
  const q = query.trim().toLowerCase()
  const shown = q
    ? withIssues.filter((w) =>
        [w.name, w.mobile, w.language, w.location, w.manager]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
    : withIssues

  const continueToReview = () => {
    if (issueCount) {
      setBlocked(true)
      return
    }
    router.push("/app/setup/review")
  }

  if (!profileSaved) return null

  return (
    <SetupFrame
      current="workers"
      bright="Add your workers."
      dim="Upload a spreadsheet, or add one person at a time."
    >
      {screen === "upload" && (
        <div className="max-w-[44rem]">
          <div className="rounded-xl bg-card p-6 sm:p-8">
            <h2 className="type-row">Upload a spreadsheet</h2>
            <p className="type-body mt-2 max-w-[34rem] text-muted-foreground">
              A CSV file with one row per person. It needs a name and a mobile
              number. Language, location and manager help, and you can add them
              later.
            </p>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,text/csv"
              className="sr-only"
              tabIndex={-1}
              aria-hidden
              onChange={(e) => {
                onFile(e.target.files?.[0])
                e.target.value = ""
              }}
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => fileRef.current?.click()}>
                <HugeiconsIcon icon={Upload04Icon} strokeWidth={2} data-icon="inline-start" />
                Choose a file
              </Button>
              <Button
                variant="outline"
                onClick={() => openSheet(sampleFileName, sampleCsv)}
              >
                Use the sample file
              </Button>
            </div>
            {fileError && (
              <p role="alert" className="type-small mt-4 max-w-[34rem] text-destructive">
                {fileError}
              </p>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-card p-6 sm:p-8">
            <div>
              <h2 className="type-row">Add one person</h2>
              <p className="type-body mt-2 text-muted-foreground">
                Good for a small crew, or someone who started this week.
              </p>
            </div>
            <Button variant="secondary" onClick={() => setEditing("new")}>
              <HugeiconsIcon icon={UserAdd01Icon} strokeWidth={2} data-icon="inline-start" />
              Add a person
            </Button>
          </div>

          <p className="type-small mt-6 max-w-[38rem] text-muted-foreground">
            Add hourly employees on your payroll. Check-ins are optional for
            every one of them.
          </p>

          <StepActions
            back={
              workers.length
                ? undefined
                : { href: "/app/setup/business", label: "Back to business profile" }
            }
          >
            {workers.length > 0 && (
              <Button variant="outline" onClick={() => setView(null)}>
                Back to the roster
              </Button>
            )}
          </StepActions>
        </div>
      )}

      {screen === "map" && sheet && mapping && (
        <div className="max-w-[44rem]">
          <h2 className="type-row">Match your columns</h2>
          <p className="type-body mt-2 text-muted-foreground">
            {sheet.fileName} has {plural(sheet.rows.length, "row", "rows")}. Tell
            us which column holds each detail. We matched the ones we could.
          </p>

          <div className="mt-8 border-t">
            {rosterFields.map((f) => {
              const column = mapping[f.key]
              const sample = column
                ? sheet.rows
                    .map((r) => r[sheet.headers.indexOf(column)])
                    .find(Boolean)
                : ""
              const error =
                mapTried && f.required && !column
                  ? `Choose the column that holds each person's ${f.label.toLowerCase()}. The check-in can't go out without it.`
                  : ""
              return (
                <div
                  key={f.key}
                  className="grid items-center gap-x-6 gap-y-2 border-b py-4 sm:grid-cols-[9rem_minmax(0,1fr)_minmax(0,1fr)]"
                >
                  <label htmlFor={`map-${f.key}`} className="type-label">
                    {f.label}
                    {!f.required && (
                      <span className="font-normal text-muted-foreground"> (optional)</span>
                    )}
                  </label>
                  <Select
                    items={[
                      { value: NONE, label: "Not in this file" },
                      ...sheet.headers.map((h) => ({ value: h, label: h })),
                    ]}
                    value={column || NONE}
                    onValueChange={(v) =>
                      setMapping({ ...mapping, [f.key]: v === NONE ? "" : (v as string) })
                    }
                  >
                    <SelectTrigger
                      id={`map-${f.key}`}
                      className="w-full"
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? `map-${f.key}-error` : undefined}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={NONE}>Not in this file</SelectItem>
                        {sheet.headers.map((h) => (
                          <SelectItem key={h} value={h}>
                            {h}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <p className="type-small truncate text-muted-foreground">
                    {sample ? `First value: ${sample}` : column ? "No values in this column" : ""}
                  </p>
                  {error && (
                    <p
                      id={`map-${f.key}-error`}
                      role="alert"
                      className="type-small text-destructive sm:col-span-2 sm:col-start-2"
                    >
                      {error}
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          <StepActions
            back={{
              label: "Choose a different file",
              onClick: () => {
                setSheet(null)
                setView("upload")
              },
            }}
          >
            <Button
              onClick={() => {
                setMapTried(true)
                if (mapping.name && mapping.mobile) setView("preview")
              }}
            >
              Preview rows
            </Button>
          </StepActions>
        </div>
      )}

      {screen === "preview" && sheet && (
        <div>
          <h2 className="type-row">Check the rows</h2>
          <p className="type-body mt-2 max-w-[40rem] text-muted-foreground">
            {previewIssues
              ? `${plural(preview.length - previewIssues, "row is", "rows are")} ready. ${plural(previewIssues, "needs", "need")} attention. You can add everyone now and finish those on the roster.`
              : `All ${preview.length} rows are ready.`}
          </p>

          <div className="mt-8">
            <RosterRows rows={preview} />
          </div>

          <StepActions back={{ label: "Change columns", onClick: () => setView("map") }}>
            <Button onClick={importRows}>
              Add {plural(preview.length, "person", "people")} to the roster
            </Button>
          </StepActions>
        </div>
      )}

      {screen === "roster" && (
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="type-row">
                {plural(workers.length, "person", "people")} on the roster
              </h2>
              {issueCount > 0 && (
                <p className="type-small mt-1 text-warning">
                  {plural(issueCount, "row needs", "rows need")} attention before
                  the first check-in.
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setEditing("new")}>
                <HugeiconsIcon icon={UserAdd01Icon} strokeWidth={2} data-icon="inline-start" />
                Add a person
              </Button>
              <Button variant="outline" onClick={() => setView("upload")}>
                <HugeiconsIcon icon={Upload04Icon} strokeWidth={2} data-icon="inline-start" />
                Upload more
              </Button>
            </div>
          </div>

          <InputGroup className="mt-6 max-w-sm">
            <InputGroupInput
              type="search"
              aria-label="Search the roster"
              placeholder="Search by name, number, location or manager"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <InputGroupAddon>
              <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
            </InputGroupAddon>
          </InputGroup>

          <div className="mt-6">
            {shown.length ? (
              <RosterRows rows={shown} onEdit={setEditing} onRemove={setRemoving} />
            ) : (
              <div className="border-y py-10">
                <p className="type-body">No one matches &ldquo;{query.trim()}&rdquo;.</p>
                <p className="type-small mt-1 text-muted-foreground">
                  Check the spelling, or clear the search to see everyone.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => setQuery("")}>
                  Clear search
                </Button>
              </div>
            )}
          </div>

          <StepActions
            back={{ href: "/app/setup/business", label: "Back to business profile" }}
            note={
              blocked && issueCount > 0 ? (
                <Alert>
                  <AlertTitle>
                    {plural(issueCount, "person needs", "people need")} attention first
                  </AlertTitle>
                  <AlertDescription>
                    Edit each row marked above to complete it, or remove the
                    person. Then continue.
                  </AlertDescription>
                </Alert>
              ) : undefined
            }
          >
            <Button onClick={continueToReview}>Continue to review</Button>
          </StepActions>
        </div>
      )}

      <WorkerDialog
        open={editing !== null}
        worker={editing === "new" ? null : editing}
        onClose={() => setEditing(null)}
      />

      <AlertDialog
        open={removing !== null}
        onOpenChange={(open) => !open && setRemoving(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Remove {removing?.name || "this person"} from the roster?
            </AlertDialogTitle>
            <AlertDialogDescription>
              They will not get payday check-ins. You can add them again at any
              time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep on roster</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                const gone = removing
                if (!gone) return
                setState((s) => ({
                  ...s,
                  workers: s.workers.filter((w) => w.id !== gone.id),
                }))
                setRemoving(null)
                toast.add({ title: `${gone.name || "Row"} removed from the roster` })
              }}
            >
              Remove from roster
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SetupFrame>
  )
}

type Row = Worker & { issue: string | null }

/** A table from tablet up, a ruled list on a phone. Same rows, same actions. */
function RosterRows({
  rows,
  onEdit,
  onRemove,
}: {
  rows: Row[]
  onEdit?: (w: Worker) => void
  onRemove?: (w: Worker) => void
}) {
  const status = (r: Row) =>
    r.issue ? (
      <Badge variant="warning">{r.issue}</Badge>
    ) : (
      <span className="text-muted-foreground">Ready</span>
    )
  const actions = (r: Row) =>
    onEdit &&
    onRemove && (
      <div className="flex justify-end gap-1">
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Edit ${r.name || "this row"}`}
          onClick={() => onEdit(r)}
        >
          <HugeiconsIcon icon={PencilEdit02Icon} strokeWidth={2} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Remove ${r.name || "this row"}`}
          onClick={() => onRemove(r)}
        >
          <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
        </Button>
      </div>
    )
  const dash = <span className="text-muted-foreground">Not given</span>

  return (
    <>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead>Status</TableHead>
              {onEdit && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.name || dash}</TableCell>
                <TableCell className="tabular-nums">{r.mobile || dash}</TableCell>
                <TableCell>{r.language || dash}</TableCell>
                <TableCell>{r.location || dash}</TableCell>
                <TableCell>{r.manager || dash}</TableCell>
                <TableCell>{status(r)}</TableCell>
                {onEdit && <TableCell className="py-1">{actions(r)}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ul className="border-t md:hidden">
        {rows.map((r) => (
          <li key={r.id} className="flex items-start justify-between gap-3 border-b py-4">
            <div className="min-w-0">
              <p className="type-label">{r.name || "Name not given"}</p>
              <p className="type-small mt-0.5 text-muted-foreground tabular-nums">
                {r.mobile || "No mobile number"}
              </p>
              <p className="type-small text-muted-foreground">
                {[r.language, r.location, r.manager && `Manager: ${r.manager}`]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              {r.issue && <div className="mt-2">{status(r)}</div>}
            </div>
            {actions(r)}
          </li>
        ))}
      </ul>
    </>
  )
}
