"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BellRing, ShieldAlert, Upload } from "lucide-react";
import { features } from "@/lib/content";
import { ease, useStill } from "@/lib/motion";
import { Lines, Reveal } from "@/components/bits";
import Photo from "@/components/v2/Photo";

const F = Object.fromEntries(features.items.map((f) => [f.key, f]));

function Text({ k }: { k: string }) {
  return (
    <div>
      <h3 className="font-serif text-[1.6rem] leading-tight tracking-[-0.02em]">{F[k].title}</h3>
      <p className="mt-2 max-w-[30rem] text-[0.98rem] leading-relaxed text-mute">{F[k].body}</p>
    </div>
  );
}

function ReportArt() {
  const bars = [
    { name: "Midtown", v: 2 },
    { name: "Fair Oaks", v: 0 },
    { name: "Elk Grove", v: 1 },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
      <div className="flex items-center gap-4 rounded-2xl bg-paper p-4">
        <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
          <circle cx="32" cy="32" r="27" fill="none" stroke="rgb(13 17 16 / 0.1)" strokeWidth="7" />
          <motion.circle cx="32" cy="32" r="27" fill="none" stroke="var(--color-ink)" strokeWidth="7" strokeLinecap="round" strokeDasharray="169.6" initial={{ strokeDashoffset: 169.6 }} whileInView={{ strokeDashoffset: 169.6 * 0.14 }} viewport={{ once: true }} transition={{ duration: 1.4, ease, delay: 0.2 }} />
        </svg>
        <div>
          <p className="display num text-[2.2rem]">86%</p>
          <p className="text-[0.8rem] text-mute">answered</p>
        </div>
      </div>
      <div className="rounded-2xl bg-paper p-4">
        <p className="text-[0.8rem] text-mute">Flags by location</p>
        <ul className="mt-2 space-y-2">
          {bars.map((b, i) => (
            <li key={b.name} className="flex items-center gap-3 text-[0.86rem]">
              <span className="w-[4.6rem] shrink-0">{b.name}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-ink/8">
                <motion.span className="block h-full rounded-full bg-flag" initial={{ width: 0 }} whileInView={{ width: `${b.v * 40}%` }} viewport={{ once: true }} transition={{ duration: 0.9, ease, delay: 0.3 + i * 0.1 }} />
              </span>
              <span className="num w-3 text-right font-medium">{b.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LanguageArt() {
  const [i, setI] = useState(1);
  const still = useStill();
  const g = features.greetings;
  useEffect(() => {
    if (still) return;
    const t = window.setInterval(() => setI((x) => (x + 1) % g.length), 2400);
    return () => window.clearInterval(t);
  }, [still, g.length]);
  return (
    <div className="rounded-2xl bg-paper p-4">
      <div className="flex flex-wrap gap-1.5">
        {g.map((x, k) => (
          <button key={x.lang} type="button" onClick={() => setI(k)} className={`chip transition-colors ${k === i ? "bg-blue text-white" : "bg-card"}`}>
            {x.lang}
          </button>
        ))}
      </div>
      <div className="mt-4 flex min-h-[5.6rem] items-end">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            lang={["en", "es", "zh", "tl", "vi", "ko"][i]}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease }}
            className="max-w-[24rem] origin-bottom-left rounded-[1.2rem] rounded-bl-md bg-card px-4 py-3 text-[0.98rem] leading-snug"
          >
            {g[i].text}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function UrgentArt() {
  return (
    <div className="rounded-2xl bg-paper p-4">
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-urgent text-white">
          <BellRing size={16} />
        </span>
        <div className="text-[0.86rem] leading-tight">
          <p className="font-semibold">Flag names a shift manager</p>
          <p className="num text-mute">Received 9:05 AM</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[0.82rem] font-medium">
        <span className="chip bg-card line-through opacity-50">Shift manager</span>
        <ArrowRight size={15} className="shrink-0 text-mute" />
        <span className="chip chip-urgent">Owner · 9:07 AM</span>
      </div>
    </div>
  );
}

function PremiumArt() {
  const rows = [
    { n: "Maria G.", d: "Sat, Nov 14", a: "1 hour" },
    { n: "Danh T.", d: "Sat, Nov 14", a: "1 hour" },
  ];
  return (
    <div className="rounded-2xl bg-paper p-4">
      <p className="text-[0.8rem] text-mute">Premium pay owed this period</p>
      <ul className="mt-1.5">
        {rows.map((r) => (
          <li key={r.n} className="flex items-center justify-between gap-3 py-2 text-[0.88rem] shadow-[0_-1px_0_rgb(13_17_16/0.07)] first:shadow-none">
            <span className="font-medium">{r.n}</span>
            <span className="num text-mute">{r.d}</span>
            <span className="chip chip-flag">{r.a}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RetaliationArt() {
  return (
    <div className="flex gap-3 rounded-2xl bg-paper p-4">
      <ShieldAlert size={20} className="mt-0.5 shrink-0 text-flag" />
      <p className="text-[0.88rem] leading-snug">
        <span className="font-semibold">Before you write this up:</span> this employee raised a pay flag 23 days ago. Document the reason for any discipline.
      </p>
    </div>
  );
}

function SetupArt() {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-paper p-4">
      <span className="chip bg-ink text-paper">
        <Upload size={13} />
        roster.csv
      </span>
      {features.roster.map((c, i) => (
        <motion.span key={c} className="chip bg-card" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease, delay: 0.2 + i * 0.08 }}>
          {c}
        </motion.span>
      ))}
    </div>
  );
}

export default function Features() {
  const cell = "card flex flex-col justify-between gap-8 p-6 md:p-7";
  return (
    <section className="wrap py-24 md:py-36">
      <Lines lines={[features.title]} className="h2 max-w-[52rem]" />
      <div className="mt-12 grid gap-3 lg:mt-16 lg:grid-cols-6">
        <Reveal className={`${cell} lg:col-span-3`}>
          <ReportArt />
          <Text k="report" />
        </Reveal>
        <Reveal delay={0.08} className={`${cell} lg:col-span-3`}>
          <LanguageArt />
          <Text k="languages" />
        </Reveal>
        <Reveal className={`${cell} lg:col-span-2`}>
          <UrgentArt />
          <Text k="urgent" />
        </Reveal>
        <Reveal delay={0.08} className={`${cell} lg:col-span-2`}>
          <PremiumArt />
          <Text k="premium" />
        </Reveal>
        <Reveal delay={0.16} className="grain relative isolate flex min-h-[20rem] items-end overflow-hidden rounded-[1.5rem] p-6 text-paper md:p-7 lg:col-span-2">
          <div className="absolute inset-0 -z-10">
            <Photo id={features.photo.id} alt={features.photo.alt} sizes="(min-width: 1024px) 33vw, 100vw" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(13_17_16/0.88),rgb(13_17_16/0.05)_65%)]" />
          </div>
          <p className="font-serif text-[1.6rem] leading-tight tracking-[-0.02em]">{features.photo.line}</p>
        </Reveal>
        <Reveal className={`${cell} lg:col-span-2`}>
          <RetaliationArt />
          <Text k="retaliation" />
        </Reveal>
        <Reveal delay={0.08} className={`${cell} lg:col-span-4`}>
          <SetupArt />
          <Text k="setup" />
        </Reveal>
      </div>
    </section>
  );
}
