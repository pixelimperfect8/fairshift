import { stats } from "@/lib/content";
import { CountUp, Lines, Reveal } from "@/components/bits";

// The problem, stated once, then the four numbers behind it.
export default function Stats() {
  return (
    <section className="wrap py-24 md:py-36">
      <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
        <Lines lines={[stats.title]} className="h2 !text-[clamp(2.2rem,5vw,4.3rem)]" />
        <Reveal delay={0.15}>
          <p className="lede text-mute">{stats.body}</p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
        {stats.items.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="card flex min-h-[15rem] flex-col justify-between p-6">
            <p className="max-w-[16rem] text-[0.95rem] leading-snug text-mute">{s.label}</p>
            <div>
              <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} className="display block text-[clamp(3.2rem,5vw,4.6rem)]" />
              <p className="mt-2 text-[0.78rem] text-mute">Source: {s.source}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}>
        <p className="mt-6 text-[0.95rem] text-mute">{stats.industries}</p>
      </Reveal>
    </section>
  );
}
