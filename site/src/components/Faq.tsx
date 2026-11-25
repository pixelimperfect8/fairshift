"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faq, site } from "@/lib/content";
import { ease } from "@/lib/motion";
import { Lines, Reveal } from "@/components/bits";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="wrap scroll-mt-24 pb-24 md:pb-36">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Lines lines={[faq.title]} className="h2" />
          <Reveal delay={0.15}>
            <p className="lede mt-5 text-mute">{faq.body}</p>
            <a href={`mailto:${site.contactEmail}`} className="btn btn-ink mt-7">
              {faq.cta}
            </a>
          </Reveal>
        </div>
        <Reveal className="space-y-2">
          {faq.items.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q} className="card overflow-hidden">
                <h3>
                  <button type="button" aria-expanded={on} aria-controls={`faq-${i}`} onClick={() => setOpen(on ? null : i)} className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[1.08rem] font-medium md:px-7">
                    {f.q}
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-300 ${on ? "rotate-45 bg-ink text-paper" : "bg-paper"}`}>
                      <Plus size={16} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }}>
                      <p className="max-w-[44rem] px-6 pb-6 text-[1rem] leading-relaxed text-mute md:px-7">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
