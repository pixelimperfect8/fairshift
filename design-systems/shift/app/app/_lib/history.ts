// Sample history for the set-up dashboard: the paydays that have gone by, how
// many people answered each one, and the concerns raised along the way. All of
// it is worked out from the roster and the schedule, so the numbers agree.
import { addDaysISO, previousPaydayISO, todayISO } from "./data"
import type { State } from "./store"

export type PaydayResult = {
  iso: string
  total: number
  answered: number
  concerns: number
  byLocation: { name: string; total: number; answered: number }[]
}

export type Concern = {
  id: string
  what: string
  where: string
  /** the payday check-in it was raised in */
  raised: string
  /** null while it is still open */
  addressedOn: string | null
  did: string
  next?: string
}

const PAYDAYS = 6
// how far each payday strays from the usual number of people who stay quiet
const drift = [0, 1, -1, 2, 0, 1]

export function buildHistory(state: State): { paydays: PaydayResult[]; concerns: Concern[] } {
  const { profile, workers, sampleAddressed } = state
  const today = todayISO()
  const total = workers.length

  // the most recent payday that has already happened, then the ones before it
  let last = previousPaydayISO(profile.nextPayday, profile.schedule)
  while (last > today) last = previousPaydayISO(last, profile.schedule)
  const dates = [last]
  while (dates.length < PAYDAYS)
    dates.push(previousPaydayISO(dates[dates.length - 1], profile.schedule))

  const crews = profile.locations
    .map((l) => ({
      name: l.name,
      total: workers.filter((w) => w.location === l.name).length,
    }))
    .filter((c) => c.total > 0)
  const first = crews[0]?.name ?? ""
  const second = crews[1]?.name ?? first

  const usualQuiet = total > 1 ? Math.max(1, Math.round(total * 0.16)) : 0

  const at = (i: number) => dates[Math.min(i, dates.length - 1)]
  // never dated in the future, whatever the schedule
  const after = (iso: string, days: number) => {
    const d = addDaysISO(iso, days)
    return d > today ? today : d
  }

  const concerns: Concern[] = [
    {
      id: "meal-breaks",
      what: "Missed meal breaks",
      where: first,
      raised: at(0),
      addressedOn: sampleAddressed ? today : null,
      did: "Premium pay added to the next check. Schedule reviewed with the crew lead.",
      next: "Add one hour of premium pay for each of them to the next check, then go over that day's schedule with the crew lead.",
    },
    {
      id: "overtime",
      what: "Overtime missing from one check",
      where: second,
      raised: at(1),
      addressedOn: after(at(1), 1),
      did: "Hours corrected and paid on the next check.",
    },
    {
      id: "water",
      what: "Drinking water ran low by mid-afternoon",
      where: first,
      raised: at(1),
      addressedOn: after(at(1), 3),
      did: "Second water cooler added to the crew truck.",
    },
    {
      id: "canopy",
      what: "Torn shade canopy",
      where: first,
      raised: at(2),
      addressedOn: after(at(2), 0),
      did: "Canopy replaced the same day.",
    },
    {
      id: "gloves",
      what: "Gloves ran out mid-shift",
      where: second,
      raised: at(4),
      addressedOn: after(at(4), 2),
      did: "A spare case of gloves is now kept at the shed.",
    },
    {
      id: "rest-break",
      what: "Afternoon rest break cut short",
      where: first,
      raised: at(5),
      addressedOn: after(at(5), 4),
      did: "Break times posted at the wash station and confirmed with the crew lead.",
    },
  ]

  const paydays = dates.map((iso, i) => {
    let quiet = Math.min(Math.max(usualQuiet + drift[i % drift.length], 0), Math.max(total - 1, 0))
    const answered = total - quiet
    const byLocation = crews.map((c) => ({ ...c, answered: c.total }))
    // take the quiet ones from each crew in turn, starting somewhere different each payday
    for (let k = i; quiet > 0 && byLocation.some((c) => c.answered > 0); k++) {
      const crew = byLocation[k % byLocation.length]
      if (crew.answered > 0) {
        crew.answered--
        quiet--
      }
    }
    return {
      iso,
      total,
      answered,
      concerns: concerns.filter((c) => c.raised === iso).length,
      byLocation,
    }
  })

  return { paydays, concerns }
}
