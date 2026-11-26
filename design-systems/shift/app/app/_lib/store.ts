"use client"

// Prototype state. There is no backend: everything lives in this browser's
// localStorage, so a walkthrough survives a reload and "Start over" clears it.
import { useSyncExternalStore } from "react"

export type Schedule = "weekly" | "biweekly" | "semimonthly" | "monthly"

export type Location = { id: string; name: string }

export type Profile = {
  name: string
  industry: string
  locations: Location[]
  schedule: Schedule | ""
  nextPayday: string // yyyy-mm-dd
  contactName: string
  contactMobile: string
  contactEmail: string
}

export type Worker = {
  id: string
  name: string
  mobile: string
  language: string
  location: string
  manager: string
}

export type State = {
  profile: Profile
  profileSaved: boolean
  workers: Worker[]
  live: boolean
  /** the sample concern on the set-up dashboard has been marked addressed */
  sampleAddressed: boolean
}

const KEY = "fairshift-onboarding-prototype-v1"

export const newId = () => Math.random().toString(36).slice(2, 10)

const initial: State = {
  profile: {
    name: "",
    industry: "",
    locations: [{ id: "loc-1", name: "" }],
    schedule: "",
    nextPayday: "",
    contactName: "",
    contactMobile: "",
    contactEmail: "",
  },
  profileSaved: false,
  workers: [],
  live: false,
  sampleAddressed: false,
}

let state: State = initial
let loaded = false
const listeners = new Set<() => void>()

function load() {
  if (loaded || typeof window === "undefined") return
  loaded = true
  try {
    const raw = window.localStorage.getItem(KEY)
    if (raw) state = { ...initial, ...(JSON.parse(raw) as Partial<State>) }
  } catch {
    // unreadable storage: start empty
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  load()
  return state
}

const getServerSnapshot = () => initial

export function setState(update: (prev: State) => State) {
  load()
  state = update(state)
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // storage full or blocked: keep going in memory
  }
  listeners.forEach((l) => l())
}

export function resetState() {
  setState(() => initial)
}

export function usePrototype() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

const noop = () => () => {}
/** False on the server and during hydration, true after: gate anything read from storage on it. */
export function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false
  )
}
