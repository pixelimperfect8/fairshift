"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { who } from "@/lib/content";
import { ease } from "@/lib/motion";
import { Lines, Reveal } from "@/components/bits";

// Four people touch the product. One tab each.
export default function Who() {
  const [on, setOn] = useState(0);
  const t = who.tabs[on];
  return (
    <section id="who" className="wrap scroll-mt-24 pb-24 md:pb-36">
      <Lines lines={[who.title]} className="h2 max-w-[58rem]" />

      <Reveal className="mt-10 lg:mt-14">
        <div role="tablist" aria-label="Who it's for" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
          {who.tabs.map((x, i) => (
            <button
              key={x.key}
              role="tab"
              id={`tab-${x.key}`}
              aria-selected={i === on}
              aria-controls="who-panel"
              type="button"
              onClick={() => setOn(i)}
              className={`relative h-11 shrink-0 rounded-full px-5 text-[0.95rem] font-medium transition-colors ${i === on ? "text-paper" : "text-ink hover:bg-ink/6"}`}
            >
              {i === on && <motion.span layoutId="who-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="relative">{x.label}</span>
            </button>
          ))}
        </div>

        <div id="who-panel" role="tabpanel" aria-labelledby={`tab-${t.key}`} className="panel mt-4 overflow-hidden p-6 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div key={t.key} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease }} className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
              <div>
                <h3 className="display text-[clamp(1.9rem,3.4vw,3rem)]">{t.title}</h3>
                <p className="lede mt-4 max-w-[34rem] text-mute">{t.body}</p>
              </div>
              <ul className="grid gap-2">
                {t.points.map((p, i) => (
                  <motion.li key={p} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, ease, delay: 0.08 + i * 0.06 }} className="flex items-baseline gap-3.5 rounded-2xl bg-card px-5 py-4 text-[1rem]">
                    <span className="h-1.5 w-1.5 shrink-0 -translate-y-[0.2em] rounded-full bg-blue" />
                    {p}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
