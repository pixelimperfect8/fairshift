import { closing, site } from "@/lib/content";
import { Lines, Reveal } from "@/components/bits";

// The last word, with the record scrolling underneath it.
export default function Closing() {
  const line = [...closing.ledger, ...closing.ledger];
  return (
    <section id="demo" className="scroll-mt-6 p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-blue text-white md:rounded-[2.25rem]">
        <div className="wrap py-24 text-center md:py-36">
          <Lines lines={[closing.title]} className="display mx-auto max-w-[56rem] text-[clamp(2.6rem,6.4vw,5.4rem)]" />
          <Reveal delay={0.15}>
            <p className="lede mx-auto mt-6 max-w-[36rem] text-white/75">{closing.body}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${site.contactEmail}?subject=FairShift%20demo`} className="btn btn-paper">
                {closing.primary}
              </a>
              <a href={`mailto:${site.contactEmail}`} className="btn bg-white/12 text-white hover:bg-white/20">
                {closing.secondary}
              </a>
            </div>
          </Reveal>
        </div>
        <div aria-hidden className="overflow-hidden pb-7 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex w-max animate-marquee gap-3">
            {line.map((l, i) => (
              <span key={i} className="chip num h-9 bg-white/12 px-4 text-[0.86rem] text-white">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
