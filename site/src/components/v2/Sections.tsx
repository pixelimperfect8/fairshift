"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import LoopArt from "@/components/v2/LoopArt";
import { faq, features, footer, math, pricing, promises, site, stats, v2, v3, who } from "@/lib/content";
import { ease, useStill } from "@/lib/motion";
import { CountUp, Tween } from "@/components/bits";
import Photo from "@/components/v2/Photo";
import { Box } from "@/components/v2/Iso";
import { TwoTone, Up } from "@/components/v2/Type";
import { useVariant } from "@/components/v2/variant";

/** The block every section opens with: a title on the left, a short paragraph on the right. */
function Head({ title, dim, body, dark = false }: { title: string; dim?: string; body?: string; dark?: boolean }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <TwoTone bright={title} dim={dim} className="h2 lg:col-span-8" />
      {body && (
        <Up delay={0.15} className="lg:col-span-4">
          <p className={`lede ${dark ? "text-mute-dark" : "text-mute"}`}>{body}</p>
        </Up>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The loop: pinned. A Hairline figure on the right, the step beside it */
/* ------------------------------------------------------------------ */
const L = v3.loop.steps;
const ART = ["text", "answer", "fix", "record"];

function StepText({ i }: { i: number }) {
  const s = L[i];
  return (
    <>
      <h3 className="display text-[clamp(1.7rem,3vw,2.7rem)] !leading-[1.08]">
        <span className="text-(--v2-accent)">{s.lead}</span> {s.rest}
      </h3>
      <p className="mt-5 max-w-[26rem] text-[1.02rem] leading-relaxed text-mute-dark">{s.body}</p>
    </>
  );
}

export function Loop() {
  const ref = useRef<HTMLDivElement>(null);
  const still = useStill();
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setStep(Math.min(L.length - 1, Math.max(0, Math.floor(v * L.length)))));

  if (still)
    return (
      <section className="on-dark bg-ink text-paper">
        <div ref={ref} className="wrap sec">
          <h2 className="h2 max-w-[44rem]">{v3.loop.title}</h2>
          <div className="sec-body space-y-16">
            {L.map((s, i) => (
              <div key={s.key} className="grid items-center gap-6 md:grid-cols-2">
                <div>
                  <StepText i={i} />
                </div>
                <LoopArt name={ART[i]} active className="w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );

  return (
    <section className="on-dark bg-ink text-paper">
      <div ref={ref} style={{ height: `${L.length * 100}svh` }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="wrap flex h-full flex-col gap-6 pb-10 pt-28 lg:pb-14">
            <h2 className="h2">{v3.loop.title}</h2>

            {/* text and drawing share one row and are centred on each other */}
            <div className="grid min-h-0 flex-1 items-center gap-6 lg:grid-cols-12">
              <div className="order-2 lg:order-1 lg:col-span-4">
                {/* a fixed height, so the progress marks below don't move between steps */}
                <div className="relative min-h-[13.5rem]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={step} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.45, ease }}>
                      <StepText i={step} />
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* where you are in the loop */}
                <div className="mt-8 grid grid-cols-4 gap-2" aria-hidden>
                  {L.map((s, i) => (
                    <span key={s.key} className="h-px bg-paper/20">
                      <motion.span className="block h-px origin-left bg-paper" initial={false} animate={{ scaleX: i <= step ? 1 : 0 }} transition={{ duration: 0.6, ease }} />
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative order-1 h-full min-h-[14rem] lg:order-2 lg:col-span-7 lg:col-start-6">
                {L.map((s, i) => (
                  <motion.div key={s.key} className="absolute inset-0 grid place-items-center" initial={false} animate={{ opacity: i === step ? 1 : 0, scale: i === step ? 1 : 0.94 }} transition={{ duration: 0.5, ease }}>
                    <LoopArt name={ART[i]} active={i === step} className="h-full max-h-[34rem] w-full" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* What the owner gets: an inset panel of rows that open               */
/* ------------------------------------------------------------------ */
export function Gets() {
  const [on, setOn] = useState<number | null>(0);
  return (
    <section className="sec px-3 md:px-4">
      <div className="rounded-lg bg-paper-2 px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(3rem,5.5vw,5rem)]">
        <Head title={v3.gets.title} />
        <div className="sec-body rule-b">
          {v3.gets.items.map((g, i) => {
            const open = on === i;
            return (
              <div key={g.title} className="rule-t">
                <h3>
                  <button type="button" aria-expanded={open} onClick={() => setOn(open ? null : i)} className="flex w-full items-center justify-between gap-6 py-5 text-left text-[clamp(1.3rem,2.2vw,1.8rem)] tracking-[-0.03em]">
                    {g.title}
                    <Plus size={22} strokeWidth={1.4} className={`shrink-0 transition-transform duration-500 ${open ? "rotate-45 text-blue" : ""}`} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease }} className="overflow-hidden">
                      <dl className="grid gap-y-3 pb-7 lg:ml-auto lg:w-1/2">
                        {g.rows.map(([k, val]) => (
                          <div key={k} className="grid grid-cols-[9.5rem_1fr] items-baseline gap-4">
                            <dt>
                              <span className="inline-block rounded bg-ink px-2 py-1 text-[0.78rem] font-medium text-paper">{k}</span>
                            </dt>
                            <dd className="text-[1rem] leading-snug text-mute">{val}</dd>
                          </div>
                        ))}
                      </dl>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* One number, said as a sentence, as large as it will go              */
/* ------------------------------------------------------------------ */
export function BigStat() {
  return (
    <section className="wrap sec">
      <TwoTone bright={v3.stat.bright} dim={v3.stat.dim} className="display mx-auto max-w-[70rem] text-center text-[clamp(2.3rem,6.4vw,6rem)]" />
      <div className="sec-body grid gap-x-6 md:grid-cols-2">
        {v3.stat.rest.map((k, i) => {
          const s = stats.items[k];
          return (
            <Up key={s.label} delay={i * 0.08} className="rule-t grid grid-cols-[auto_1fr] items-center gap-x-6 py-7">
              <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} className="display text-[clamp(2.6rem,5vw,4.4rem)] !leading-none" />
              <div>
                <p className="text-[1.05rem] leading-snug">{s.label}</p>
                <p className="mt-2 text-[0.82rem] text-mute">Source: {s.source}</p>
              </div>
            </Up>
          );
        })}
      </div>
      <p className="mx-auto mt-[clamp(2rem,3.5vw,3rem)] max-w-[44rem] text-center text-[0.82rem] text-mute">Notice figures: {stats.items[0].source} and {stats.items[1].source}. {stats.industries}</p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Languages: the same greeting, drifting past in six of them          */
/* ------------------------------------------------------------------ */
export function Languages() {
  const g = [...features.greetings, ...features.greetings];
  return (
    <section aria-label="Works in the language your team speaks" className="langs rule-t rule-b overflow-hidden py-[clamp(2rem,3.5vw,3rem)]">
      <div className="flex w-max animate-marquee items-baseline gap-14 hover:[animation-play-state:paused]" style={{ animationDuration: "70s" }}>
        {g.map((x, i) => (
          <p key={i} lang={["en", "es", "zh", "tl", "vi", "ko"][i % 6]} aria-hidden={i >= 6} className="display flex items-baseline gap-4 whitespace-nowrap text-[clamp(1.7rem,3.6vw,3.2rem)]">
            {x.text}
            <span className="text-[0.9rem] tracking-normal text-mute">{x.lang}</span>
          </p>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The math: three isometric columns that grow with the inputs         */
/* ------------------------------------------------------------------ */
const PENALTY = 100;
const CAP = 0.15;
const RATE = 2.83;
const FLAT = 49;
const TALLEST = PENALTY * 250 * 52;
const PANEL = "var(--color-paper-2)";

export function MathV2() {
  const [n, setN] = useState(50);
  const [sched, setSched] = useState(1);
  const periods = math.schedules[sched].periods;
  const exposure = PENALTY * n * periods;
  const capped = Math.round(exposure * CAP);
  const cost = Math.round(n < 20 ? FLAT * 12 : RATE * n * periods);
  // square-root scale, so the small columns stay visible next to the tall one
  const h = (v: number) => Math.max(3, 150 * Math.sqrt(v / TALLEST));
  const cols = [
    { label: math.rows.exposure, value: exposure },
    { label: math.rows.capped, value: capped },
    { label: math.rows.cost, value: cost, accent: true },
  ];

  return (
    <section id="math" className="wrap sec scroll-mt-10">
      <Head title="The math is brutal." dim="The reform rewards the careful." body={math.body} />
      <Up className="sec-body grid gap-6 lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-10 lg:col-span-4">
          <div>
            <label htmlFor="emp2" className="flex items-baseline justify-between text-[0.98rem] text-mute">
              {math.employees}
              <span className="display num text-[4.4rem] text-ink">{n}</span>
            </label>
            <input id="emp2" type="range" min={5} max={250} step={5} value={n} onChange={(e) => setN(Number(e.target.value))} className="range range-ink mt-3" style={{ "--fill": `${((n - 5) / 245) * 100}%` } as React.CSSProperties} />
          </div>
          <fieldset>
            <legend className="text-[0.98rem] text-mute">{math.schedule}</legend>
            <div className="rule-t mt-3">
              {math.schedules.map((s, i) => (
                <button key={s.key} type="button" aria-pressed={i === sched} onClick={() => setSched(i)} className="rule-b flex w-full items-center justify-between py-3.5 text-left text-[1.02rem]">
                  <span className={`transition-colors ${i === sched ? "" : "text-mute"}`}>{s.label}</span>
                  <span className={`h-2 w-2 rounded-full transition-colors ${i === sched ? "bg-blue" : "bg-transparent"}`} />
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="rounded-lg bg-paper-2 p-[clamp(1.25rem,3vw,2.5rem)] lg:col-span-8">
          <svg viewBox="-200 -172 400 212" className="w-full" aria-hidden fill="none">
            {cols.map((c, i) => (
              <Box key={i} x={-25 + (i - 1) * 68} y={-25 - (i - 1) * 68} z={0} w={50} d={50} h={h(c.value)} accent={c.accent} bg={PANEL} i={i} />
            ))}
          </svg>
          <div className="grid grid-cols-3 gap-6">
            {cols.map((c) => (
              <div key={c.label} className="rule-t pt-4">
                <Tween value={c.value} className={`display block text-[clamp(1.4rem,3.2vw,2.8rem)] ${c.accent ? "text-blue" : ""}`} />
                <p className="mt-2 text-[0.9rem] leading-snug text-mute">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Up>
      <p className="mt-6 max-w-[52rem] text-[0.85rem] leading-relaxed text-mute">{math.fine}</p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Who it's for: four names, one open at a time                        */
/* ------------------------------------------------------------------ */
export function WhoV2() {
  const [on, setOn] = useState(0);
  return (
    <section id="who" className="on-dark scroll-mt-10 bg-ink text-paper">
      <div className="wrap sec">
        <Head title="Designed for the employee." dim="Sold to the owner. Carried by the agent." dark />
        <div className="sec-body">
          {who.tabs.map((t, i) => {
            const open = i === on;
            return (
              // one row: the name on the left, its points starting level with it, the arrow at the far right
              <div key={t.key} onMouseEnter={() => setOn(i)} className="rule-t grid grid-cols-[1fr_auto] gap-x-6 py-6 md:py-7 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <h3>
                    <button type="button" aria-expanded={open} onClick={() => setOn(i)} className="group w-full text-left">
                      <span className={`display block text-[clamp(1.9rem,4.6vw,3.8rem)] transition-opacity duration-500 ${open ? "" : "opacity-35 group-hover:opacity-70"}`}>{t.label}</span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.55, ease }} className="overflow-hidden">
                        <p className="max-w-[30rem] pt-6 text-[1.5rem] leading-tight tracking-[-0.03em]">{t.title}</p>
                        <p className="max-w-[30rem] pt-4 text-[1.02rem] leading-relaxed text-mute-dark">{t.body}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <span aria-hidden className="pt-[0.2em] text-[clamp(1.9rem,4.6vw,3.8rem)] leading-none lg:col-span-1 lg:col-start-12 lg:row-start-1 lg:justify-self-end">
                  <ArrowUpRight size={26} strokeWidth={1.3} className={`transition-transform duration-500 ${open ? "rotate-90 text-(--v2-accent)" : ""}`} />
                </span>

                <div className="col-span-2 lg:col-span-4 lg:col-start-8 lg:row-start-1">
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.55, ease }} className="overflow-hidden pt-6 lg:pt-[0.55rem]">
                        {t.points.map((p, k) => (
                          <li key={p} className={`text-[1.02rem] ${k ? "rule-t pt-3.5" : ""} ${k < t.points.length - 1 ? "pb-3.5" : ""}`}>
                            {p}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Trades: a strip of tall photographs running off both edges          */
/* ------------------------------------------------------------------ */
export function Trades() {
  const still = useStill();
  const trades = useVariant().trades;
  const items = trades.items;
  const row = still ? items : [...items, ...items];
  return (
    <section className="sec overflow-hidden">
      <div className="wrap">
        <Head title={trades.title} body={trades.body} />
      </div>
      <div className={`sec-body flex gap-3 ${still ? "overflow-x-auto px-5" : "w-max animate-marquee hover:[animation-play-state:paused]"}`} style={{ animationDuration: "80s" }}>
        {row.map((x, i) => (
          <figure key={i} aria-hidden={i >= items.length} className="grain group relative aspect-[3/4] w-[min(72vw,22rem)] shrink-0 overflow-hidden rounded-lg text-paper">
            <Photo id={x.photo} alt={i < items.length ? x.alt : ""} sizes="22rem" className="transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_10_10/0.8),transparent_45%)]" />
            <figcaption className="absolute inset-x-5 bottom-5 text-[1.5rem] tracking-[-0.03em]">{x.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The limits: a ruled grid of things it will never do                 */
/* ------------------------------------------------------------------ */
export function Limits() {
  return (
    <section className="sec px-3 md:px-4">
      <div className="rounded-lg bg-paper-2 px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(3rem,5.5vw,5rem)]">
        <Head title="What FairShift" dim="will never do." body={promises.body} />
        <ul className="sec-body grid gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {promises.items.map((p, i) => (
            <Up key={p.title} delay={(i % 4) * 0.06} className="rule-t py-6">
              <li className="list-none">
                <p className="text-[0.85rem] text-blue">Never</p>
                <h3 className="mt-2 text-[1.3rem] leading-[1.15] tracking-[-0.03em]">{p.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-mute">{p.body}</p>
              </li>
            </Up>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing: three ruled rows                                           */
/* ------------------------------------------------------------------ */
export function PricingV2() {
  return (
    <section id="pricing" className="on-dark scroll-mt-10 bg-ink text-paper">
      <div className="wrap sec">
        <Head title="Priced per employee," dim="per pay period." body={pricing.body} dark />
        <div className="sec-body rule-b">
          {pricing.plans.map((p, i) => (
            <Up key={p.key} delay={i * 0.06} className="rule-t grid items-center gap-x-6 gap-y-3 py-8 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <h3 className="text-[1.3rem] tracking-[-0.03em]">{p.name}</h3>
                <p className="mt-1 text-[0.95rem] text-mute-dark">{p.range}</p>
              </div>
              <p className="lg:col-span-4">
                <span className="display num text-[clamp(3rem,6vw,5rem)]">{p.price}</span>
                <span className="ml-3 text-[0.98rem] text-mute-dark">{p.unit}</span>
              </p>
              <p className="text-[0.98rem] leading-relaxed text-mute-dark lg:col-span-3">{p.body}</p>
              <div className="lg:col-span-2 lg:justify-self-end">
                <a href={site.demoUrl} className={`btn min-w-[9rem] ${p.featured ? "btn-blue" : "bg-paper/10 text-paper hover:bg-paper/20"}`}>
                  {p.cta}
                </a>
              </div>
            </Up>
          ))}
        </div>
        <p className="mt-6 max-w-[58rem] text-[0.95rem] leading-relaxed text-mute-dark">
          Every plan includes: {pricing.included.map((x) => x.charAt(0).toLowerCase() + x.slice(1)).join(", ")}. {pricing.note}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Questions: a plain ruled list beside a heading that stays put       */
/* ------------------------------------------------------------------ */
export function FaqV2() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="wrap sec scroll-mt-10">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <TwoTone bright="Straight" dim="answers." className="h2" />
            <Up delay={0.15}>
              <p className="lede mt-5 text-mute">{faq.body}</p>
              <a href={`mailto:${site.contactEmail}`} className="btn btn-ink mt-7">
                {faq.cta}
              </a>
            </Up>
          </div>
        </div>
        <div className="rule-b lg:col-span-7 lg:col-start-6">
          {faq.items.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q} className="rule-t">
                <h3>
                  <button type="button" aria-expanded={on} aria-controls={`q-${i}`} onClick={() => setOpen(on ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left text-[1.2rem] tracking-[-0.02em]">
                    {f.q}
                    <Plus size={20} strokeWidth={1.4} className={`shrink-0 transition-transform duration-500 ${on ? "rotate-45 text-blue" : ""}`} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div id={`q-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease }} className="overflow-hidden">
                      <p className="max-w-[40rem] pb-7 text-[1.02rem] leading-relaxed text-mute">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The last shot, then the name set as large as it goes                */
/* ------------------------------------------------------------------ */
export function ClosingV2() {
  const c = v2.closing;
  const shot = useVariant().closing;
  return (
    <section id="demo" className="grain relative isolate overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 -z-10">
        <Photo id={shot.photo} alt={shot.alt} />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_10_10/1),transparent_70%)]" />
      </div>
      <div className="wrap sec flex min-h-[80svh] flex-col items-center justify-center text-center">
        <TwoTone bright={v3.closing.bright} dim={v3.closing.dim} className="display text-[clamp(2.8rem,8.4vw,8rem)]" />
        <Up delay={0.2}>
          <p className="lede mx-auto mt-7 max-w-[34rem] text-paper/75">{c.body}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${site.contactEmail}?subject=FairShift%20demo`} className="btn btn-blue">
              {c.primary}
            </a>
            <a href={`mailto:${site.contactEmail}`} className="btn bg-paper/12 text-paper backdrop-blur-md hover:bg-paper/20">
              {c.secondary}
            </a>
          </div>
        </Up>
      </div>
    </section>
  );
}

export function FooterV2() {
  const still = useStill();
  return (
    <footer className="on-dark overflow-hidden bg-ink text-paper">
      <div className="wrap pb-10 pt-[clamp(3rem,5.5vw,5rem)]">
        <div className="rule-t grid gap-6 pt-10 lg:grid-cols-12">
          <p className="max-w-[20rem] text-[1.02rem] leading-relaxed text-mute-dark lg:col-span-5">{footer.blurb}</p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {footer.columns.map((c) => (
              <div key={c.title}>
                <p className="text-[0.9rem] text-mute-dark">{c.title}</p>
                <ul className="mt-3 space-y-2">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-[1rem] transition-colors hover:text-[#6f86ff]">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <motion.p aria-hidden className="display mt-[clamp(3rem,5.5vw,5rem)] select-none whitespace-nowrap text-[21.5vw] !font-semibold !leading-[0.8] !tracking-[-0.06em]" initial={still ? false : { y: "40%", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }}>
          FairShift
        </motion.p>
        <div className="rule-t mt-10 space-y-3 pt-6 text-[0.82rem] leading-relaxed text-mute-dark">
          <p className="max-w-[60rem]">{footer.legal}</p>
          <p className="max-w-[60rem]">{footer.sources}</p>
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
