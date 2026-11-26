"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ease, useStill } from "@/lib/motion";
import Photo from "@/components/v2/Photo";
import { TwoTone } from "@/components/v2/Type";
import { useVariant, type Variant } from "@/components/v2/variant";

type Scene = Variant["scenes"][number];

/** The question, and the reply as the blue bubble an employee's text would be. */
function Words({ s }: { s: Scene }) {
  return (
    <>
      <p className="display max-w-[34rem] text-[clamp(1.6rem,3vw,2.8rem)] !leading-[1.06]">{s.q}</p>
      <p className="mt-5 w-fit rounded-[1.2rem] rounded-bl-md bg-blue px-4 py-2.5 text-[1.02rem] font-medium text-white">{s.a}</p>
    </>
  );
}

function Shade() {
  return <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_10_10/0.92)_0%,rgb(10_10_10/0.25)_55%,rgb(10_10_10/0.1)_100%)]" />;
}

// Three people, three questions. On wide screens the section pins and the three
// photographs sit side by side: the one being asked opens wide, the other two
// wait as slivers. On phones they simply stack.
export default function Scenes() {
  const ref = useRef<HTMLDivElement>(null);
  const still = useStill();
  const S = useVariant().scenes;
  const [on, setOn] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setOn(Math.min(S.length - 1, Math.max(0, Math.floor(v * S.length)))));

  const stacked = (
    <div className="wrap sec">
      <TwoTone bright="Three questions." dim="Sixty seconds. Every payday." className="h2" />
      <div className="sec-body space-y-3">
        {S.map((s) => (
          <div key={s.photo} className="grain relative flex min-h-[32rem] flex-col justify-end overflow-hidden rounded-lg p-6">
            <div className="absolute inset-0">
              <Photo id={s.photo} alt={s.alt} sizes="100vw" />
              <Shade />
            </div>
            <div className="relative">
              <Words s={s} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (still)
    return (
      <section id="how" className="on-dark bg-ink text-paper">
        <div ref={ref}>{stacked}</div>
      </section>
    );

  return (
    <section id="how" className="on-dark bg-ink text-paper">
      <div className="md:hidden">{stacked}</div>

      <div ref={ref} className="hidden md:block" style={{ height: `${S.length * 90}svh` }}>
        <div className="sticky top-0 flex h-[100svh] flex-col gap-[clamp(1.5rem,3vw,2.5rem)] px-3 pb-3 pt-28 lg:px-4 lg:pb-4">
          <div className="wrap !px-[clamp(1rem,2.6vw,1.75rem)]">
            <TwoTone bright="Three questions." dim="Sixty seconds. Every payday." className="h2" />
          </div>

          <div className="flex min-h-0 flex-1 gap-3">
            {S.map((s, i) => {
              const open = i === on;
              return (
                <motion.div key={s.photo} className="grain relative min-w-0 overflow-hidden rounded-lg" initial={false} animate={{ flexGrow: open ? 7 : 1 }} transition={{ duration: 0.95, ease }} style={{ flexBasis: 0 }}>
                  <motion.div className="absolute inset-0" initial={false} animate={{ scale: open ? 1 : 1.15, opacity: open ? 1 : 0.5 }} transition={{ duration: 1.1, ease }}>
                    <Photo id={s.photo} alt={s.alt} sizes="70vw" eager={i === 0} />
                  </motion.div>
                  <Shade />
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div key="w" className="absolute inset-x-0 bottom-0 p-[clamp(1.5rem,3vw,2.75rem)]" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: 0.35 } }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
                        <Words s={s} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
