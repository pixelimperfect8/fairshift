// Version 2-A's own words, written to the FairShift voice, tone and messaging
// guide (Nov 25, 2026). The rules it follows:
//   - say check-in, concern, address, next step, record, payday, crew and workers
//   - never survey, audit, complaint, violation, flag, fix, evidence or monitor
//   - stay calm, be fair to both sides, lead with the next step
//   - promise only what the product does; no legal outcomes
// Version 2 keeps the copy in content.ts. Anything not overridden here is shared.
import { faq, features, footer, math, nav, pricing, promises, site, stats, v2, v2a, v3, who } from "@/lib/content";

/** Headings that version 2 writes directly in its components. */
export const baseHeads = {
  scenes: { bright: "Three questions.", dim: "Sixty seconds. Every payday." },
  math: { bright: "The math is brutal.", dim: "The reform rewards the careful." },
  who: { bright: "Designed for the employee.", dim: "Sold to the owner. Carried by the agent." },
  limits: { bright: "What FairShift", dim: "will never do." },
  pricing: { bright: "Priced per employee,", dim: "per pay period." },
  faq: { bright: "Straight", dim: "answers." },
};

export const baseCopy = { faq, features, footer, math, nav, pricing, promises, site, stats, v2, v3, who, heads: baseHeads };
export type Copy = typeof baseCopy;

const LWDA = "California Labor and Workforce Development Agency, 2026";
const AUDITOR = "California State Auditor, 2024";

const en = { lang: "English", text: "Hi Maria, it's payday. 3 quick questions, all optional." };
const es = { lang: "Español", text: "Hola Maria, hoy es día de pago. 3 preguntas rápidas, todas opcionales." };

export const copyA: Copy = {
  ...baseCopy,

  site: { ...site, tagline: "A simple payday check-in for your team" },

  // the penalty calculator is left out of this version, so its link goes too
  nav: nav.filter((n) => n.href !== "#math"),

  heads: {
    ...baseHeads,
    scenes: { bright: "Three questions.", dim: "About a minute. Every payday." },
    who: { bright: "Workers get heard.", dim: "Employers get a clear way to respond." },
    pricing: { bright: "Priced per worker,", dim: "per payday." },
  },

  v2: {
    ...v2,
    hero: { ...v2.hero, primary: "Book a demo", secondary: "See how it works" },
    closing: {
      ...v2.closing,
      body: "A demo takes about five minutes. We'll text you the check-in, then show you what an employer sees.",
    },
  },

  v3: {
    ...v3,
    hero: {
      bright: "Hear about pay problems on payday,",
      dim: "not in a claim.",
      body: "FairShift texts your crew a few optional questions each payday, flags anything that needs attention, and keeps a dated record of how you addressed it.",
    },
    statement: {
      bright: "Most pay problems start small.",
      dim: "Hours get missed, a break gets skipped, and nobody says anything until it turns into a claim or someone quits.",
    },
    loop: {
      title: "One check-in, every payday.",
      steps: [
        { key: "phone", lead: "A text", rest: "on payday, to any phone.", body: "No app to download and no login. Every question is optional, and it's separate from the paycheck." },
        { key: "riffle", lead: "A few answers", rest: "in about a minute.", body: "Reply 1 for yes, 2 for no, or skip anything. In English or Spanish." },
        { key: "settle", lead: "A concern", rest: "reaches you with a next step.", body: "A plain sentence about what came up and where, with a suggested next step. It stays on your list until you've addressed it." },
        { key: "vault", lead: "The record", rest: "is dated and kept.", body: "Each concern and how it was addressed, with the date. Mark it done, add a short note, and FairShift keeps it for your records." },
      ],
    },
    gets: {
      title: "What employers get.",
      items: [
        { title: "The payday summary", rows: [["Each payday", "A short list of what needs attention"], ["Shows", "How many workers checked in, and any open concerns"], ["Quiet week", "No concerns this payday. 47 of 50 workers checked in."]] },
        { title: "Concern alerts", rows: [["When", "As soon as a worker raises something"], ["Says", "What came up and where, in a plain sentence"], ["Next step", "A suggested way to follow up, first"]] },
        { title: "English and Spanish", rows: [["Texts", "Sent in the language each worker reads"], ["Replies", "Shown to you in English, with the original kept"]] },
        { title: "Follow-up", rows: [["Each concern", "Stays on your list until you've addressed it"], ["Mark it done", "Add a short note on what you did"], ["Routing", "A concern that names a manager goes to the owner instead"]] },
        { title: "The record", rows: [["Keeps", "Each concern and how it was addressed"], ["Dated", "FairShift adds the date for you"], ["Export", "One click, when you need a copy"]] },
        { title: "Setup", rows: [["Roster", "Upload a spreadsheet"], ["Payday", "Weekly, every two weeks, twice a month or monthly"], ["First check-in", "Goes out next payday"]] },
      ],
    },
    stat: {
      bright: "Small pay issues show up on payday.",
      dim: "Before they grow.",
      rest: [0, 1],
    },
    closing: { bright: "Hear your crew", dim: "every payday." },
  },

  stats: {
    ...stats,
    items: [
      { value: 8846, prefix: "", suffix: "", label: "PAGA notices filed with the state in fiscal year 2024 to 2025", source: LWDA },
      { value: 854, prefix: "", suffix: "", label: "days, the median time California's Labor Commissioner took to decide a wage claim in fiscal year 2022 to 2023", source: AUDITOR },
    ],
    industries: "",
  },

  // English and Spanish side by side
  features: { ...features, greetings: [en, es, en, es] },

  who: {
    ...who,
    tabs: [
      {
        key: "employers",
        label: "Employers",
        title: "Hear it on payday. Handle it that week.",
        body: "You hear about issues early, get a clear next step, and can show how you handled it. There's no dashboard to learn.",
        points: ["A short list of what needs attention", "A suggested next step for every concern", "A dated record of how you addressed it", "Works for one crew or forty"],
      },
      {
        key: "workers",
        label: "Workers",
        title: "It takes a minute. Skip anything you want.",
        body: "A text on payday, in English or Spanish. Every question is optional, it's separate from your check, and someone actually reads it.",
        points: ["No app and no login", "Reply 1 or 2, or send a message", "Answering never changes what you're paid", "Reply STOP to opt out any time"],
      },
      {
        key: "public",
        label: "Government agencies",
        title: "A voice for every worker, and a record of every answer.",
        body: "Every employee gets the same easy way to speak up, and your agency gets a record of every concern and how it was handled.",
        points: ["Reaches every worker, not only the loudest", "Every question is optional", "No questions about unions or organizing, ever", "A written data policy before the first text"],
      },
    ],
  },

  promises: {
    ...promises,
    body: "FairShift sits between a crew and the person who pays them. The limits are part of the design.",
    items: [
      { title: "Tie an answer to a paycheck", body: "Same day, separate message, always optional. Nobody has to answer to get paid." },
      { title: "Promise a legal outcome", body: "We help you hear concerns, respond and keep a record. That's what the product does." },
      { title: "Watch your workers", body: "FairShift is a voice for your crew, never a watchtower. It asks. It doesn't track." },
      { title: "Ask about unions or organizing", body: "Not once, in any language, for any customer." },
      { title: "Share answers outside your business", body: "Answers go to the employer's own admins and nobody else." },
      { title: "Let the record be changed", body: "Every check-in, concern and note is dated and can't be quietly edited." },
      { title: "Sell worker data", body: "Encrypted, and kept only as long as the written policy says." },
      { title: "Pretend to be the government", body: "FairShift is a private company. No seals, no agency language." },
    ],
  },

  pricing: {
    ...pricing,
    body: "Every plan includes the check-in, the short list of what needs attention, and the dated record. There is nothing to unlock.",
    plans: [
      { key: "small", name: "Small crew", range: "Under 20 workers", price: "$49", unit: "a month, flat", body: "One easy number for the smallest teams.", cta: "Book a demo", featured: false },
      { key: "standard", name: "Standard", range: "20 to 249 workers", price: "$2.83", unit: "per worker, per payday", body: "About $73.58 a year for each worker paid every two weeks.", cta: "Book a demo", featured: true },
      { key: "large", name: "Large and public", range: "250 workers and up", price: "Volume", unit: "priced together", body: "For multi-location employers and government agencies.", cta: "Talk to us", featured: false },
    ],
    included: ["Payday texts in English and Spanish", "A summary each payday", "Concern alerts with a suggested next step", "Follow-up reminders", "A dated record you can export", "Roster upload by spreadsheet"],
    note: "Available in California first.",
  },

  faq: {
    ...faq,
    items: [
      { q: "Do workers have to answer?", a: "No. Every question is optional, it's separate from the paycheck, and answering never changes what someone is paid. Reply STOP to opt out any time." },
      { q: "Do they need an app?", a: "No. It's a text to any phone. There is nothing to download and nothing to log in to." },
      { q: "What happens when a concern comes in?", a: "You get a plain sentence about what came up, and a suggested next step. Once you've addressed it, mark it done and add a short note. FairShift dates it for your records." },
      { q: "Who sees what a worker wrote?", a: "The employer's own admins. If a concern names a manager, it goes to the owner instead of that manager." },
      { q: "Which languages does it work in?", a: "English and Spanish, side by side, to start. More languages will follow, and each one is reviewed by a native speaker first." },
      { q: "If a worker says everything is fine, does that settle it?", a: "No. A check-in is not a waiver, and we never present it as one. FairShift helps you catch pay issues early and keep a record of how you addressed them. It doesn't promise legal outcomes." },
      { q: "Is this legal advice?", a: "No. FairShift suggests practical next steps, like checking a timesheet or talking with a crew lead. For legal questions, talk to an employment lawyer." },
      { q: "Does it work with my payroll?", a: "Yes, with any of them. Upload your roster as a spreadsheet and pick your payday: weekly, every two weeks, twice a month or monthly." },
    ],
  },

  footer: {
    ...footer,
    blurb: "A simple payday check-in for your team. California first.",
    columns: [
      { title: "Product", links: [{ label: "How it works", href: "#how" }, { label: "Pricing", href: "#pricing" }] },
      { title: "For", links: [{ label: "Employers", href: "#who" }, { label: "Workers", href: "#who" }, { label: "Government agencies", href: "#who" }] },
      { title: "Company", links: [{ label: "Questions", href: "#faq" }, { label: "Book a demo", href: "#demo" }] },
    ],
    sources: `Figures: ${LWDA}, and ${AUDITOR}.`,
  },
};

// The three questions, as the guide's samples, with what a worker might send back.
const asked = [
  { q: "Did your pay match the hours you worked?", a: "No. I'm short about four hours." },
  { q: "Did you get your rest and meal breaks?", a: "Yes." },
  { q: "Anything you want your employer to know?", a: "The shade tent on the north field needs fixing." },
];

/** Photographs and words for version 2-A, in the shape the v2 sections read. */
export const variantA = {
  scenes: v2.scenes.items.map((s, i) => ({ ...s, ...v2a.scenes[i], ...asked[i] })),
  trades: v2a.trades,
  closing: v2a.closing,
  copy: copyA,
};
