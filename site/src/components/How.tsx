"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CornerDownRight, Download, FileText } from "lucide-react";
import { how } from "@/lib/content";
import { ease, useStill } from "@/lib/motion";
import { Lines, Reveal } from "@/components/bits";

// The loop, step by step. On wide screens the list on the left stays put and
// lights up as each screen on the right scrolls past.

function Send() {
  const s = how.send;
  return (
    <div className="card p-5 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">{s.heading}</p>
          <p className="text-[0.82rem] text-mute">{s.date}</p>
        </div>
        <span className="chip chip-plain">{s.window}</span>
      </div>
      <ul className="mt-4">
        {s.rows.map((r, i) => (
          <motion.li
            key={r.name}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.12 }}
            className="flex items-center gap-3 py-2.5 text-[0.9rem] shadow-[0_-1px_0_rgb(13_17_16/0.07)]"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-paper text-[0.75rem] font-semibold">{r.name[0]}</span>
            <span className="min-w-0 flex-1 truncate font-medium">{r.name}</span>
            <span className="hidden text-mute sm:block">{r.lang}</span>
            <span className={`chip ${r.status === "Answered" ? "chip-fixed" : "chip-blue"}`}>{r.status}</span>
            <span className="num hidden w-[4.2rem] text-right text-[0.8rem] text-mute min-[420px]:block">{r.time}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function Answer() {
  const [on, setOn] = useState(0);
  const still = useStill();
  useEffect(() => {
    if (still) return;
    const t = window.setInterval(() => setOn((o) => (o + 1) % how.bank.length), 2600);
    return () => window.clearInterval(t);
  }, [still]);
  return (
    <div className="card p-5 md:p-6">
      <div className="flex flex-wrap gap-1.5">
        {how.bank.map((b, i) => (
          <button key={b.topic} type="button" onClick={() => setOn(i)} className={`chip transition-colors ${i === on ? "bg-ink text-paper" : "chip-plain"}`}>
            {b.topic}
          </button>
        ))}
      </div>
      <div className="mt-5 min-h-[9.5rem]">
        <motion.div key={on} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}>
          <p className="text-[0.8rem] text-mute">{how.bank[on].often}</p>
          <p className="display mt-1.5 text-[clamp(1.45rem,2.2vw,1.9rem)] !leading-[1.15]">{how.bank[on].q}</p>
        </motion.div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {["Yes", "No"].map((a, i) => (
          <span key={a} className="flex h-12 items-center justify-center gap-2 rounded-full bg-paper text-[0.92rem] font-medium">
            <span className="num grid h-6 w-6 place-items-center rounded-full bg-ink text-[0.75rem] text-paper">{i + 1}</span>
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}

function Flag() {
  const f = how.flag;
  return (
    <div className="card p-5 md:p-6">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="chip chip-flag">
          <span className="h-1.5 w-1.5 rounded-full bg-flag" />
          {f.chip}
        </span>
        {f.meta.map((m) => (
          <span key={m} className="chip chip-plain">
            {m}
          </span>
        ))}
      </div>
      <p className="display mt-5 text-[clamp(1.4rem,2.1vw,1.8rem)] !leading-[1.18]">{f.title}</p>
      <div className="mt-5 flex gap-3 rounded-2xl bg-paper p-4">
        <CornerDownRight size={18} className="mt-0.5 shrink-0 text-blue" />
        <div>
          <p className="text-[0.78rem] font-semibold text-mute">Suggested next step</p>
          <p className="mt-0.5 text-[0.98rem] leading-snug">{f.next}</p>
        </div>
      </div>
    </div>
  );
}

function Log() {
  return (
    <div className="card p-5 md:p-6">
      <p className="font-semibold">Fix log</p>
      <ul className="mt-3">
        {how.log.map((l, i) => (
          <motion.li
            key={l.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.14 }}
            className="flex gap-3 py-3.5 shadow-[0_-1px_0_rgb(13_17_16/0.07)]"
          >
            <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${l.state === "fixed" ? "bg-fixed text-white" : "bg-flag-soft"}`}>
              <span className={`h-2 w-2 rounded-full ${l.state === "fixed" ? "bg-white" : "bg-flag"}`} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.95rem] font-medium leading-snug">{l.title}</p>
              <p className="mt-0.5 text-[0.86rem] leading-snug text-mute">{l.action}</p>
              <p className="num mt-1.5 text-[0.78rem] text-mute">
                {l.by} · {l.when}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function Packet() {
  const p = how.packet;
  return (
    <div className="relative px-3 pt-3">
      {/* sheets behind the top page */}
      <div aria-hidden className="absolute inset-x-9 top-0 h-10 rounded-t-2xl bg-card/45" />
      <div aria-hidden className="absolute inset-x-6 top-1.5 h-10 rounded-t-2xl bg-card/70" />
      <div className="card relative p-5 md:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-paper">
            <FileText size={19} />
          </span>
          <div className="min-w-0">
            <p className="font-semibold">{p.title}</p>
            <p className="truncate text-[0.8rem] text-mute">{p.file}</p>
          </div>
        </div>
        <ul className="mt-4 space-y-2.5">
          {p.lines.map((l) => (
            <li key={l} className="flex items-baseline gap-3 text-[0.93rem] leading-snug">
              <span className="h-1.5 w-1.5 shrink-0 -translate-y-[0.2em] rounded-full bg-blue" />
              {l}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <span className="btn btn-ink !min-h-10 !text-[0.9rem]">
            <Download size={15} />
            {p.button}
          </span>
          <motion.span className="stamp" initial={{ opacity: 0, scale: 1.6, rotate: -9 }} whileInView={{ opacity: 1, scale: 1, rotate: -2 }} viewport={{ once: true, margin: "-80px" }} transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.5 }}>
            {p.stamp}
          </motion.span>
        </div>
      </div>
    </div>
  );
}

const screens: Record<string, () => React.ReactNode> = { send: Send, answer: Answer, flag: Flag, fix: Log, record: Packet };

function Step({ i, onActive }: { i: number; onActive: (i: number) => void }) {
  const s = how.steps[i];
  const ref = useRef<HTMLDivElement>(null);
  const mid = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (mid) onActive(i);
  }, [mid, i, onActive]);
  const Screen = screens[s.key];
  return (
    <div ref={ref} className="panel min-w-0 p-4 sm:p-7 lg:p-10">
      <div className="mb-6 lg:hidden">
        <h3 className="display text-[1.7rem]">{s.title}</h3>
        <p className="mt-2 text-[0.98rem] leading-relaxed text-mute">{s.body}</p>
      </div>
      <Reveal y={20}>
        <Screen />
      </Reveal>
      <p className="mt-6 hidden max-w-[34rem] text-[1.02rem] leading-relaxed text-mute lg:block">{s.body}</p>
    </div>
  );
}

export default function How() {
  const [active, setActive] = useState(0);
  return (
    <section id="how" className="wrap scroll-mt-24 pb-24 md:pb-36">
      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
        <Lines lines={[how.title]} className="h2" />
        <Reveal delay={0.15}>
          <p className="lede text-mute">{how.body}</p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)] lg:gap-16">
        <div className="hidden lg:block">
          <ol className="sticky top-32 space-y-1">
            {how.steps.map((s, i) => (
              <li key={s.key} className="relative">
                <a href={`#step-${s.key}`} className={`flex items-center gap-3 py-2 font-serif text-[1.75rem] leading-tight tracking-[-0.02em] transition-[opacity,transform] duration-500 ${i === active ? "translate-x-0 opacity-100" : "-translate-x-7 opacity-35 hover:opacity-70"}`}>
                  <CornerDownRight size={20} className={`shrink-0 text-blue transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`} />
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
        <div className="min-w-0 space-y-4 lg:space-y-6">
          {how.steps.map((s, i) => (
            <div key={s.key} id={`step-${s.key}`} className="scroll-mt-28">
              <Step i={i} onActive={setActive} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
