"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownRight } from "lucide-react";
import { people } from "@/lib/content";
import { ease, useStill } from "@/lib/motion";
import { Lines, Reveal } from "@/components/bits";
import Photo from "@/components/v2/Photo";

type Item = (typeof people.items)[number];

/** What the answer turns into in the product: a card on the owner's report. */
function Chip({ chip }: { chip: Item["chip"] }) {
  const dot = chip.kind === "flag" ? "bg-flag" : chip.kind === "urgent" ? "bg-urgent" : "bg-fixed";
  return (
    <div className="card w-full max-w-[18rem] p-4 text-ink">
      <p className="flex items-center gap-2 text-[0.92rem] font-semibold">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        {chip.title}
      </p>
      <p className="mt-2 flex gap-2 text-[0.84rem] leading-snug text-mute">
        {chip.kind === "flag" && <CornerDownRight size={15} className="mt-0.5 shrink-0 text-blue" />}
        {chip.body}
      </p>
    </div>
  );
}

function Words({ item }: { item: Item }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div className="max-w-[26rem]">
        <p className="display text-[clamp(1.5rem,2.5vw,2.2rem)] !leading-[1.1]">{item.q}</p>
        <p className="mt-4 w-fit rounded-[1.15rem] rounded-bl-md bg-blue px-4 py-2.5 text-[0.98rem] font-medium text-white">{item.a}</p>
      </div>
      <Chip chip={item.chip} />
    </div>
  );
}

// Three people, three questions. The photograph of whoever is being asked
// opens wide; over it sit their reply and the card it becomes on the report.
export default function People() {
  const still = useStill();
  const [on, setOn] = useState(0);
  const items = people.items;

  return (
    <section className="wrap pb-24 md:pb-36">
      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
        <Lines lines={[people.title]} className="h2" />
        <Reveal delay={0.15}>
          <p className="lede text-mute">{people.body}</p>
        </Reveal>
      </div>

      {/* phones: one after another */}
      <div className="mt-12 space-y-3 md:hidden">
        {items.map((item) => (
          <div key={item.photo} className="grain relative isolate flex min-h-[34rem] flex-col justify-end overflow-hidden rounded-[1.25rem] p-5 text-paper">
            <div className="absolute inset-0 -z-10">
              <Photo id={item.photo} alt={item.alt} sizes="100vw" />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(13_17_16/0.92),rgb(13_17_16/0.2)_60%)]" />
            </div>
            <Words item={item} />
          </div>
        ))}
      </div>

      {/* wider screens: three side by side, the chosen one opens */}
      <Reveal className="mt-12 hidden h-[36rem] gap-3 md:flex lg:mt-16">
        {items.map((item, i) => {
          const open = i === on;
          return (
            <motion.button
              key={item.photo}
              type="button"
              aria-pressed={open}
              aria-label={item.q}
              onClick={() => setOn(i)}
              onMouseEnter={() => setOn(i)}
              onFocus={() => setOn(i)}
              className="grain relative isolate min-w-0 overflow-hidden rounded-[1.25rem] text-left text-paper"
              initial={false}
              animate={{ flexGrow: open ? 6 : 1 }}
              transition={still ? { duration: 0 } : { duration: 0.9, ease }}
              style={{ flexBasis: 0 }}
            >
              <motion.div className="absolute inset-0 -z-10" initial={false} animate={{ scale: open ? 1 : 1.12 }} transition={{ duration: 1, ease }}>
                <Photo id={item.photo} alt={item.alt} sizes="60vw" />
              </motion.div>
              {/* the ones not being asked sit back in the dark */}
              <motion.div className="absolute inset-0 -z-10 bg-ink" initial={false} animate={{ opacity: open ? 0 : 0.45 }} transition={{ duration: 0.8, ease }} />
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(13_17_16/0.92),rgb(13_17_16/0.15)_60%)]" />
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div key="w" className="absolute inset-x-0 bottom-0 p-7" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: still ? 0 : 0.3 } }} exit={{ opacity: 0, transition: { duration: 0.12 } }}>
                    <Words item={item} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </Reveal>
    </section>
  );
}
