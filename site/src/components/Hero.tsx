"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { hero, site } from "@/lib/content";
import { ease, useStill } from "@/lib/motion";
import { Lines } from "@/components/bits";
import CheckInDemo from "@/components/CheckInDemo";
import Photo from "@/components/v2/Photo";

// A dark, rounded panel set inside the page: headline on the left, and on the
// right a photograph of the person being asked, with the live check-in playing
// over it. People and product in the same frame.
export default function Hero() {
  const still = useStill();
  const rise = (delay: number) => ({ initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: still ? { duration: 0 } : { duration: 0.9, ease, delay } });

  return (
    <section id="top" className="p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-ink text-paper md:rounded-[2.25rem]">
        <div className="wrap relative z-10 grid items-center gap-10 pb-10 pt-28 md:pt-32 lg:min-h-[calc(100svh-1.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-12 lg:pb-14">
          <div>
            <Lines as="h1" lines={hero.title} className="display text-[clamp(2.9rem,6.3vw,5.6rem)]" delay={0.1} />
            <motion.p {...rise(0.45)} className="lede mt-6 max-w-[31rem] text-mute-dark">
              {hero.body}
            </motion.p>
            <motion.div {...rise(0.58)} className="mt-8 flex flex-wrap gap-3">
              <a href={site.demoUrl} className="btn btn-blue">
                {hero.primary}
              </a>
              <a href="#how" className="btn btn-ghost-dark">
                {hero.secondary}
                <ArrowDown size={16} />
              </a>
            </motion.div>
            <motion.p {...rise(0.72)} className="mt-10 text-[0.9rem] text-mute-dark">
              {hero.notes.join("  ·  ")}
            </motion.p>
          </div>

          <motion.div
            className="grain relative isolate flex min-h-[34rem] items-end justify-end overflow-hidden rounded-[1.5rem] p-5 md:p-7 lg:h-[min(44rem,calc(100svh-11rem))]"
            initial={still ? false : { clipPath: "inset(8% 6% 8% 6% round 1.5rem)", opacity: 0 }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 1.5rem)", opacity: 1 }}
            transition={{ duration: 1.2, ease, delay: 0.3 }}
          >
            <div className="absolute inset-0 -z-10">
              <Photo id={hero.photo} alt={hero.photoAlt} eager sizes="(min-width: 1024px) 50vw, 100vw" className={still ? "" : "kenburns"} position="50% 40%" />
              {/* darker toward the corner the conversation sits in */}
              <div className="absolute inset-0 bg-[linear-gradient(to_top_left,rgb(13_17_16/0.9)_0%,rgb(13_17_16/0.55)_45%,rgb(13_17_16/0.15)_100%)]" />
            </div>
            <CheckInDemo compact />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
