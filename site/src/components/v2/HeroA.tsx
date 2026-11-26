"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { v2a } from "@/lib/content";
import { useCopy } from "@/components/v2/variant";
import { ease, useStill } from "@/lib/motion";
import Photo from "@/components/v2/Photo";
import { TwoTone } from "@/components/v2/Type";

// The daylight opening: the headline on white, and under it three photographs
// from three kinds of work, so the mix is the first thing seen. On scroll the
// frames rise at different speeds and each picture slides inside its frame.
export default function HeroA() {
  const still = useStill();
  const { site, v2, v3 } = useCopy();
  const h = { ...v3.hero, shots: v2a.hero.shots };
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // the outer frames travel further than the middle one
  const side = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const mid = useTransform(scrollYProgress, [0, 1], [0, -30]);
  // and the picture moves the other way inside its frame
  const inner = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  return (
    <section id="top" ref={ref} className="overflow-hidden pt-[clamp(8rem,13vw,11.5rem)]">
      <div className="wrap flex flex-col items-center text-center">
        <TwoTone as="h1" bright={h.bright} dim={h.dim} delay={0.1} className="display max-w-[66rem] text-[clamp(2.4rem,6vw,5.4rem)]" />
        <motion.p initial={still ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.8 }} className="lede mt-7 max-w-[40rem] text-mute">
          {h.body}
        </motion.p>
        <motion.div initial={still ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.92 }} className="mt-9 flex flex-wrap justify-center gap-3">
          <a href={site.demoUrl} className="btn btn-blue">
            {v2.hero.primary}
          </a>
          <a href="#how" className="btn bg-ink/[0.07] text-ink hover:bg-ink/[0.12]">
            {v2.hero.secondary}
          </a>
        </motion.div>
      </div>

      <div className="mt-[clamp(3rem,5.5vw,5rem)] grid grid-cols-3 items-end gap-2 px-3 sm:gap-3 md:px-4">
        {h.shots.map((s, i) => (
          <motion.figure
            key={s.photo}
            className={`grain relative overflow-hidden rounded-lg ${i === 1 ? "h-[clamp(17rem,46vw,37rem)]" : "h-[clamp(14rem,39vw,31rem)]"}`}
            initial={still ? false : { clipPath: "inset(100% 0% 0% 0% round 0.5rem)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 0.5rem)" }}
            transition={{ duration: 1.2, ease, delay: 0.5 + i * 0.12 }}
            style={still ? undefined : { y: i === 1 ? mid : side }}
          >
            <motion.div className="absolute inset-x-0 -inset-y-[8%]" style={still ? undefined : { y: inner }}>
              <Photo id={s.photo} alt={s.alt} eager sizes="34vw" className={still ? "" : "kenburns"} />
            </motion.div>
            <figcaption className="absolute bottom-3 left-3 hidden rounded-md bg-white/85 px-2.5 py-1 text-[0.85rem] font-medium text-ink backdrop-blur-md sm:block">{s.label}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
