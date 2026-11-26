// Fixed choices, formatting, validation and the sample business.
// Lindero Verde Farms is made up. So are its people and their 555 numbers.
import type { Location, Profile, Schedule, Worker } from "./store"

export const industries = [
  { value: "farm", label: "Farm or field crew" },
  { value: "restaurant", label: "Restaurant" },
  { value: "retail", label: "Retail" },
  { value: "construction", label: "Construction" },
  { value: "care", label: "Care" },
  { value: "office", label: "Office" },
  { value: "other", label: "Something else" },
]

export const schedules: { value: Schedule; label: string; hint: string }[] = [
  { value: "weekly", label: "Weekly", hint: "52 paydays a year" },
  { value: "biweekly", label: "Every two weeks", hint: "26 paydays a year" },
  { value: "semimonthly", label: "Twice a month", hint: "24 paydays a year" },
  { value: "monthly", label: "Monthly", hint: "12 paydays a year" },
]

// English and Spanish, then the languages the PRD names for first review.
export const languages = [
  "English",
  "Spanish",
  "Chinese",
  "Tagalog",
  "Vietnamese",
  "Korean",
]

const languageAliases: Record<string, string> = {
  en: "English",
  eng: "English",
  english: "English",
  ingles: "English",
  inglés: "English",
  es: "Spanish",
  esp: "Spanish",
  spanish: "Spanish",
  espanol: "Spanish",
  español: "Spanish",
  chinese: "Chinese",
  tagalog: "Tagalog",
  vietnamese: "Vietnamese",
  korean: "Korean",
}

/** Returns one of `languages`, or the text as typed when it isn't recognised. */
export function normaliseLanguage(raw: string) {
  const key = raw.trim().toLowerCase()
  if (!key) return "English"
  return languageAliases[key] ?? raw.trim()
}

export const labelOf = (
  list: { value: string; label: string }[],
  value: string
) => list.find((i) => i.value === value)?.label ?? ""

// ---- dates -----------------------------------------------------------------

const pad = (n: number) => String(n).padStart(2, "0")
export const toISO = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const todayISO = () => toISO(new Date())

const parseISO = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

/** The payday before this one, going by the schedule. */
export function previousPaydayISO(iso: string, schedule: string) {
  const d = parseISO(iso)
  if (schedule === "monthly") d.setMonth(d.getMonth() - 1)
  else d.setDate(d.getDate() - (schedule === "weekly" ? 7 : schedule === "biweekly" ? 14 : 15))
  return toISO(d)
}

export function addDaysISO(iso: string, n: number) {
  const d = parseISO(iso)
  d.setDate(d.getDate() + n)
  return toISO(d)
}

export function daysFromToday(n: number) {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d
}

/** The next Friday that is at least two days away. */
export function nextFridayISO() {
  const d = daysFromToday(2)
  while (d.getDay() !== 5) d.setDate(d.getDate() + 1)
  return toISO(d)
}

export function formatDate(iso: string, style: "long" | "short" = "long") {
  if (!iso) return ""
  return parseISO(iso).toLocaleDateString(
    "en-US",
    style === "long"
      ? { weekday: "long", month: "short", day: "numeric" }
      : { month: "short", day: "numeric" }
  )
}

export const formatShort = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric" })

// ---- phone numbers ---------------------------------------------------------

export function phoneDigits(raw: string) {
  const digits = raw.replace(/\D/g, "")
  return digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits
}

export const isPhone = (raw: string) => phoneDigits(raw).length === 10

export function formatPhone(raw: string) {
  const d = phoneDigits(raw)
  if (d.length !== 10) return raw.trim()
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

// ---- business profile ------------------------------------------------------

export type ProfileErrors = Partial<
  Record<
    | "name"
    | "industry"
    | "locations"
    | "schedule"
    | "nextPayday"
    | "contactName"
    | "contactMobile"
    | "contactEmail",
    string
  >
> & { location?: Record<string, string> }

export function validateProfile(p: Profile): ProfileErrors {
  const e: ProfileErrors = {}
  if (!p.name.trim()) e.name = "Enter your business name."
  if (!p.industry) e.industry = "Choose the industry closest to yours."

  const perLocation: Record<string, string> = {}
  const seen = new Set<string>()
  for (const l of p.locations) {
    const key = l.name.trim().toLowerCase()
    if (!key) {
      perLocation[l.id] =
        p.locations.length > 1
          ? "Give this location a name, or remove it."
          : "Give this location a name, like Home ranch."
    } else if (seen.has(key)) {
      perLocation[l.id] =
        "Another location has this name. Change one so crews can be told apart."
    }
    seen.add(key)
  }
  if (Object.keys(perLocation).length) e.location = perLocation
  if (!p.locations.length) e.locations = "Add at least one location."

  if (!p.schedule) e.schedule = "Choose how often you run payroll."
  if (!p.nextPayday) e.nextPayday = "Choose your next payday."
  else if (p.nextPayday < todayISO())
    e.nextPayday = "That date has passed. Choose today or a later date."

  if (!p.contactName.trim())
    e.contactName = "Enter the name of the person who should hear about concerns."
  if (!isPhone(p.contactMobile))
    e.contactMobile = "Enter a 10-digit mobile number, like (530) 555-0142."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.contactEmail.trim()))
    e.contactEmail = "Enter an email address, like name@yourfarm.com."
  return e
}

export const hasErrors = (e: ProfileErrors) => Object.keys(e).length > 0

// ---- workers ---------------------------------------------------------------

export type WorkerDraft = Omit<Worker, "id">
export type WorkerErrors = Partial<Record<keyof WorkerDraft, string>>

/** Field-by-field problems with one person, checked against everyone else. */
export function validateWorker(
  w: WorkerDraft,
  others: { mobile: string }[],
  locations: Location[]
): WorkerErrors {
  const e: WorkerErrors = {}
  if (!w.name.trim()) e.name = "Enter this person's name."
  if (!w.mobile.trim())
    e.mobile = "Add a mobile number. The check-in arrives by text."
  else if (!isPhone(w.mobile))
    e.mobile = "Enter all 10 digits of the mobile number, like (530) 555-0142."
  else if (others.some((o) => phoneDigits(o.mobile) === phoneDigits(w.mobile)))
    e.mobile =
      "Someone else on the roster has this number. Each person needs their own."
  if (!languages.includes(w.language))
    e.language = "Choose the language this person reads best."
  if (!locations.some((l) => l.name === w.location))
    e.location = w.location
      ? `"${w.location}" is not one of your locations. Choose one from the list.`
      : "Choose where this person works."
  return e
}

/** The first thing that needs attention on a roster row, in a few words. */
export function workerIssue(
  w: Worker,
  all: Worker[],
  locations: Location[]
): string | null {
  const e = validateWorker(
    w,
    all.filter((o) => o.id !== w.id),
    locations
  )
  if (e.name) return "Name missing"
  if (e.mobile) {
    if (!w.mobile.trim()) return "Mobile number missing"
    return isPhone(w.mobile) ? "Mobile number used twice" : "Mobile number incomplete"
  }
  if (e.language) return "Language not recognised"
  if (e.location) return w.location ? "Location not in your profile" : "Location missing"
  return null
}

// ---- spreadsheet -----------------------------------------------------------

export const rosterFields = [
  { key: "name", label: "Name", required: true },
  { key: "mobile", label: "Mobile", required: true },
  { key: "language", label: "Language", required: false },
  { key: "location", label: "Location", required: false },
  { key: "manager", label: "Manager", required: false },
] as const

export type RosterField = (typeof rosterFields)[number]["key"]
export type Mapping = Record<RosterField, string> // field → column header, "" = not in file

const hints: Record<RosterField, RegExp> = {
  name: /name|nombre|worker|employee/i,
  mobile: /mobile|cell|phone|tel|n[uú]mero/i,
  language: /lang|idioma/i,
  location: /location|site|ranch|farm|store|branch|ubicaci/i,
  manager: /manager|lead|supervisor|foreman|mayordomo|boss/i,
}

export function guessMapping(headers: string[]): Mapping {
  const taken = new Set<string>()
  const mapping = {} as Mapping
  for (const f of rosterFields) {
    const match = headers.find((h) => !taken.has(h) && hints[f.key].test(h))
    mapping[f.key] = match ?? ""
    if (match) taken.add(match)
  }
  return mapping
}

export type Sheet = { fileName: string; headers: string[]; rows: string[][] }

export function parseCsv(text: string): { headers: string[]; rows: string[][] } {
  const out: string[][] = []
  let row: string[] = []
  let cell = ""
  let quoted = false
  const src = text.replace(/^﻿/, "")
  for (let i = 0; i < src.length; i++) {
    const c = src[i]
    if (quoted) {
      if (c === '"' && src[i + 1] === '"') {
        cell += '"'
        i++
      } else if (c === '"') quoted = false
      else cell += c
    } else if (c === '"') quoted = true
    else if (c === ",") {
      row.push(cell)
      cell = ""
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i++
      row.push(cell)
      out.push(row)
      row = []
      cell = ""
    } else cell += c
  }
  if (cell || row.length) {
    row.push(cell)
    out.push(row)
  }
  const filled = out
    .map((r) => r.map((c) => c.trim()))
    .filter((r) => r.some((c) => c))
  const [headers = [], ...rows] = filled
  return { headers, rows }
}

export function rowsToWorkers(
  sheet: Sheet,
  mapping: Mapping,
  locations: Location[],
  makeId: () => string
): Worker[] {
  const at = (row: string[], field: RosterField) => {
    const i = sheet.headers.indexOf(mapping[field])
    return i === -1 ? "" : (row[i] ?? "")
  }
  return sheet.rows.map((row) => {
    const rawLocation = at(row, "location")
    const location =
      locations.find(
        (l) => l.name.trim().toLowerCase() === rawLocation.trim().toLowerCase()
      )?.name ??
      // one location and no column for it: everyone works there
      (!mapping.location && locations.length === 1 ? locations[0].name : rawLocation)
    return {
      id: makeId(),
      name: at(row, "name"),
      mobile: formatPhone(at(row, "mobile")),
      language: normaliseLanguage(at(row, "language")),
      location,
      manager: at(row, "manager"),
    }
  })
}

// ---- the sample business ---------------------------------------------------

export const sampleLocations = ["North ranch", "Packing shed"]

export function sampleProfile(): Profile {
  return {
    name: "Lindero Verde Farms",
    industry: "farm",
    locations: sampleLocations.map((name, i) => ({ id: `loc-${i + 1}`, name })),
    schedule: "weekly",
    nextPayday: nextFridayISO(),
    contactName: "Elena Marsh",
    contactMobile: "(530) 555-0100",
    contactEmail: "elena@linderoverde.example",
  }
}

// The column names are deliberately not FairShift's, so the mapping step has
// something to do. Two rows need attention: one has no number, one is short.
export const sampleFileName = "lindero-verde-crew.csv"
export const sampleCsv = `Full name,Cell,Idioma,Ranch,Crew lead
Rosa Delgado,(530) 555-0111,Español,North ranch,Mateo Ibarra
Mateo Ibarra,(530) 555-0112,Español,North ranch,Elena Marsh
Luz Carrillo,530-555-0113,Español,North ranch,Mateo Ibarra
Tomás Villanueva,,Español,North ranch,Mateo Ibarra
Ana Beltrán,(530) 555-0115,Español,North ranch,Mateo Ibarra
Jesús Montoya,(530) 555-0116,Español,North ranch,Mateo Ibarra
Dale Whitcomb,(530) 555-0117,English,North ranch,Mateo Ibarra
Carmen Zúñiga,(530) 555-0118,Español,Packing shed,June Okafor
June Okafor,(530) 555-0119,English,Packing shed,Elena Marsh
Priya Raman,5305550120,English,Packing shed,June Okafor
Héctor Salas,(530) 555-012,Español,Packing shed,June Okafor
Wes Hartley,(530) 555-0122,English,Packing shed,June Okafor
Marisol Peña,(530) 555-0123,Español,Packing shed,June Okafor
`

// ---- the payday text -------------------------------------------------------

export function paydayText(lang: "en" | "es", firstName: string, business: string) {
  return lang === "en"
    ? [
        `Hi ${firstName}, it's payday at ${business}. 3 quick questions, all optional, and your answers won't affect your pay.`,
        "Q1: Did you get all your meal and rest breaks since your last payday? Reply 1 for Yes, 2 for No.",
        "Reply STOP to opt out, HELP for help.",
      ]
    : [
        `Hola ${firstName}, hoy es día de pago en ${business}. 3 preguntas rápidas, todas opcionales, y tus respuestas no afectan tu pago.`,
        "P1: ¿Tomaste todos tus descansos y periodos de comida desde tu último día de pago? Responde 1 para Sí, 2 para No.",
        "Responde STOP para dejar de recibir mensajes o HELP para ayuda.",
      ]
}

export const firstName = (full: string) => full.trim().split(/\s+/)[0] ?? ""

export const plural = (n: number, one: string, many: string) =>
  `${n} ${n === 1 ? one : many}`
