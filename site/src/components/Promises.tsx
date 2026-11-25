"use client";

import { motion } from "framer-motion";
import { promises } from "@/lib/content";
import { ease, useStill } from "@/lib/motion";
import { Lines, Reveal } from "@/components/bits";

// The limits, said plainly. Each line is struck through as it scrolls in.
export default function Promises() {
  const still = useStill();
  return (
    <section className="p-2 md:p-3">
      <div className="rounded-[1.75rem] bg-card py-20 md:rounded-[2.25rem] md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Lines lines={[promises.title]} className="h2" />
            <Reveal delay={0.15}>
              <p className="lede mt-5 max-w-[26rem] text-mute">{promises.body}</p>
            </Reveal>
          </div>
          <ul>
            {promises.items.map((p, i) => (
              <motion.li
                key={p.title}
                initial={still ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease, delay: (i % 2) * 0.05 }}
                className="grid gap-x-10 gap-y-2 py-6 shadow-[0_-1px_0_rgb(13_17_16/0.1)] first:shadow-none md:grid-cols-[1fr_1fr] md:items-baseline md:py-7"
              >
                <h3 className="font-serif text-[clamp(1.45rem,2.1vw,1.85rem)] leading-tight tracking-[-0.02em]">
                  {/* the strike is a background so it follows the text across wrapped lines */}
                  <motion.span
                    className="[box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
                    style={{ backgroundImage: "linear-gradient(var(--color-urgent), var(--color-urgent))", backgroundRepeat: "no-repeat", backgroundPosition: "0 58%" }}
                    initial={still ? { backgroundSize: "100% 2px" } : { backgroundSize: "0% 2px" }}
                    whileInView={{ backgroundSize: "100% 2px" }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.7, ease, delay: 0.35 }}
                  >
                    {p.title}
                  </motion.span>
                </h3>
                <p className="text-[0.98rem] leading-relaxed text-mute">{p.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
