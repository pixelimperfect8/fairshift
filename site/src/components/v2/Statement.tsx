"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useStill } from "@/lib/motion";
import { useCopy } from "@/components/v2/variant";

function Word({ children, p, from, to, floor }: { children: string; p: MotionValue<number>; from: number; to: number; floor: number }) {
  const opacity = useTransform(p, [from, to], [0.12, floor]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

// One centred sentence. The words come up one at a time as you scroll, and the
// second half settles at a quieter tone than the first.
export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const still = useStill();
  const { v3 } = useCopy();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const a = v3.statement.bright.split(" ");
  const b = v3.statement.dim.split(" ");
  const all = [...a.map((w) => ({ w, floor: 1 })), ...b.map((w) => ({ w, floor: 0.45 }))];
  return (
    <section className="bg-ink text-paper">
      <div className="wrap sec">
        <p ref={ref} className="display mx-auto max-w-[62rem] text-center text-[clamp(1.9rem,4.4vw,3.8rem)] !leading-[1.1]">
          {still ? (
            <>
              {v3.statement.bright} <span className="dim">{v3.statement.dim}</span>
            </>
          ) : (
            all.map((x, i) => (
              <Word key={i} p={scrollYProgress} from={i / all.length} to={(i + 1.5) / all.length} floor={x.floor}>
                {x.w}
              </Word>
            ))
          )}
        </p>
      </div>
    </section>
  );
}
