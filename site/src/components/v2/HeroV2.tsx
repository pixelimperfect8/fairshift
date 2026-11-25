"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site, v2, v3 } from "@/lib/content";
import { ease, useStill } from "@/lib/motion";
import Photo from "@/components/v2/Photo";
import { TwoTone } from "@/components/v2/Type";

// The opening shot: one photograph edge to edge, and one sentence in two tones
// set low and centred over it.
export default function HeroV2() {
  const ref = useRef<HTMLElement>(null);
  const still = useStill();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative isolate h-[100svh] min-h-[38rem] overflow-hidden bg-ink text-paper">
      <motion.div className="grain absolute inset-0 -z-10" style={still ? undefined : { y }}>
        <Photo id={v2.hero.photo} alt={v2.hero.alt} eager className={still ? "" : "kenburns"} position="62% 40%" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_10_10/0.97)_0%,rgb(10_10_10/0.78)_38%,rgb(10_10_10/0.3)_100%)]" />
      </motion.div>

      <motion.div className="wrap flex h-full flex-col items-center justify-end pb-[clamp(3rem,5.5vw,5rem)] text-center" style={still ? undefined : { opacity: fade }}>
        <TwoTone as="h1" bright={v3.hero.bright} dim={v3.hero.dim} delay={0.2} className="display max-w-[70rem] text-[clamp(2.4rem,6vw,5.4rem)]" />
        <motion.p initial={still ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 1 }} className="lede mt-7 max-w-[38rem] text-paper/75">
          {v3.hero.body}
        </motion.p>
        <motion.div initial={still ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 1.12 }} className="mt-9 flex flex-wrap justify-center gap-3">
          <a href={site.demoUrl} className="btn btn-blue">
            {v2.hero.primary}
          </a>
          <a href="#how" className="btn bg-paper/12 text-paper backdrop-blur-md hover:bg-paper/20">
            {v2.hero.secondary}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
