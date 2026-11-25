"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { math } from "@/lib/content";
import { ease } from "@/lib/motion";
import { Lines, Reveal, Tween } from "@/components/bits";

// What a year of missed breaks can cost, what the 2024 cap does to it, and
// what the check-in costs. All three move as the visitor changes the inputs.

const PENALTY = 100; // default penalty per employee per pay period
const CAP = 0.15;
const RATE = 2.83;
const FLAT = 49; // a month, under 20 employees

export default function MathSection() {
  const [n, setN] = useState(50);
  const [sched, setSched] = useState(1);
  const periods = math.schedules[sched].periods;

  const exposure = PENALTY * n * periods;
  const capped = Math.round(exposure * CAP);
  const cost = Math.round(n < 20 ? FLAT * 12 : RATE * n * periods);
  const pct = (v: number) => `${Math.max(1.2, (v / exposure) * 100)}%`;

  const rows = [
    { key: "exposure", label: math.rows.exposure, value: exposure, bar: "bg-flag", text: "text-paper" },
    { key: "capped", label: math.rows.capped, value: capped, bar: "bg-paper", text: "text-paper" },
    { key: "cost", label: math.rows.cost, value: cost, bar: "bg-blue", text: "text-paper" },
  ];

  return (
    <section id="math" className="scroll-mt-6 p-2 md:p-3">
      <div className="rounded-[1.75rem] bg-ink py-20 text-paper md:rounded-[2.25rem] md:py-28">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
            <Lines lines={[math.title]} className="h2" />
            <Reveal delay={0.15}>
              <p className="lede text-mute-dark">{math.body}</p>
            </Reveal>
          </div>

          <Reveal className="mt-12 grid gap-3 lg:mt-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)]">
            {/* inputs */}
            <div className="flex flex-col justify-between gap-10 rounded-[1.5rem] bg-ink-2 p-6 md:p-8">
              <div>
                <label htmlFor="emp" className="flex items-baseline justify-between text-[0.95rem] text-mute-dark">
                  {math.employees}
                  <span className="display num text-[3.4rem] text-paper">{n}</span>
                </label>
                <input
                  id="emp"
                  type="range"
                  min={5}
                  max={250}
                  step={5}
                  value={n}
                  onChange={(e) => setN(Number(e.target.value))}
                  className="range mt-2"
                  style={{ "--fill": `${((n - 5) / 245) * 100}%` } as React.CSSProperties}
                />
                <div className="num mt-1 flex justify-between text-[0.78rem] text-mute-dark">
                  <span>5</span>
                  <span>250</span>
                </div>
              </div>
              <fieldset>
                <legend className="text-[0.95rem] text-mute-dark">{math.schedule}</legend>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {math.schedules.map((s, i) => (
                    <button
                      key={s.key}
                      type="button"
                      aria-pressed={i === sched}
                      onClick={() => setSched(i)}
                      className={`h-11 rounded-full text-[0.9rem] font-medium transition-colors ${i === sched ? "bg-paper text-ink" : "bg-paper/8 text-paper hover:bg-paper/15"}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <p className="num mt-4 text-[0.82rem] text-mute-dark">
                  {math.formula}: $100 × {n} × {periods}
                </p>
              </fieldset>
            </div>

            {/* results */}
            <div className="flex flex-col justify-between gap-8 rounded-[1.5rem] bg-ink-2 p-6 md:p-8">
              <div className="space-y-7">
                {rows.map((r) => (
                  <div key={r.key}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <p className="max-w-[22rem] text-[0.95rem] leading-snug text-mute-dark">{r.label}</p>
                      <Tween value={r.value} className={`display text-[clamp(2.2rem,4vw,3.4rem)] ${r.text}`} />
                    </div>
                    <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-paper/8">
                      <motion.div className={`h-full rounded-full ${r.bar}`} initial={false} animate={{ width: pct(r.value) }} transition={{ duration: 0.6, ease }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[0.82rem] leading-relaxed text-mute-dark">{math.fine}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="display mx-auto mt-16 max-w-[52rem] text-center text-[clamp(1.6rem,3vw,2.5rem)] !leading-[1.15] md:mt-24">{math.takeaway}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
