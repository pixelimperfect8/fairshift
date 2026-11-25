import { pricing, site } from "@/lib/content";
import { Lines, Reveal } from "@/components/bits";

export default function Pricing() {
  return (
    <section id="pricing" className="wrap scroll-mt-24 py-24 md:py-36">
      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
        <Lines lines={[pricing.title]} className="h2" />
        <Reveal delay={0.15}>
          <p className="lede text-mute">{pricing.body}</p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-3 lg:mt-16 lg:grid-cols-3">
        {pricing.plans.map((p, i) => (
          <Reveal key={p.key} delay={i * 0.08} className={`flex flex-col rounded-[1.5rem] p-7 md:p-8 ${p.featured ? "bg-ink text-paper" : "card"}`}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[1.05rem] font-semibold">{p.name}</h3>
              <span className={`chip ${p.featured ? "bg-paper/12 text-paper" : "chip-plain"}`}>{p.range}</span>
            </div>
            <p className="display num mt-10 text-[clamp(3.4rem,5.4vw,4.8rem)]">{p.price}</p>
            <p className={`mt-1 text-[0.98rem] ${p.featured ? "text-mute-dark" : "text-mute"}`}>{p.unit}</p>
            <p className={`mt-6 flex-1 text-[0.98rem] leading-relaxed ${p.featured ? "text-mute-dark" : "text-mute"}`}>{p.body}</p>
            <a href={site.demoUrl} className={`btn mt-8 w-full ${p.featured ? "btn-blue" : "btn-ghost"}`}>
              {p.cta}
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="panel mt-3 p-7 md:p-8">
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {pricing.included.map((x) => (
            <li key={x} className="flex items-baseline gap-3 text-[0.98rem]">
              <span className="h-1.5 w-1.5 shrink-0 -translate-y-[0.2em] rounded-full bg-blue" />
              {x}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[0.88rem] text-mute">{pricing.note}</p>
      </Reveal>
    </section>
  );
}
