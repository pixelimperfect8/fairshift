"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { ease, useStill } from "@/lib/motion";

/** The mark: a text bubble with a check in it. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <path fill="currentColor" d="M9 3h14a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6h-7l-7 5v-5a6 6 0 0 1-6-6V9a6 6 0 0 1 6-6z" />
      <path fill="none" stroke="var(--mark-check, #fff)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="m10.5 14.5 3.8 3.8 7.2-8" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`logo inline-flex items-center font-serif text-[1.6rem] leading-none tracking-[-0.03em] ${className}`}>
      FairShift
    </span>
  );
}

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({ children, delay = 0, className = "", y = 28 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const still = useStill();
  if (still) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.8, ease, delay }}>
      {children}
    </motion.div>
  );
}

/** A headline that rises line by line from behind a mask. */
export function Lines({ lines, className = "", as: Tag = "h2", delay = 0 }: { lines: string[]; className?: string; as?: "h1" | "h2"; delay?: number }) {
  const still = useStill();
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        // the mask watches for the viewport: the line inside starts clipped, so it can't
        <motion.span key={i} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]" initial={still ? "in" : "out"} whileInView="in" viewport={{ once: true }}>
          <motion.span className="block" variants={{ out: { y: "112%" }, in: { y: 0 } }} transition={{ duration: 0.95, ease, delay: delay + i * 0.09 }}>
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}

const fmt = new Intl.NumberFormat("en-US");

/** Counts up to `to` once it is on screen. */
export function CountUp({ to, prefix = "", suffix = "", className = "" }: { to: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "-40px" });
  const still = useStill();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (still) {
      setN(to);
      return;
    }
    const c = animate(0, to, { duration: 1.6, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [seen, still, to]);
  return (
    <span ref={ref} className={`num ${className}`}>
      {prefix}
      {fmt.format(seen ? n : 0)}
      {suffix}
    </span>
  );
}

/** A number that eases to each new value (for the calculator). */
export function Tween({ value, prefix = "$", className = "" }: { value: number; prefix?: string; className?: string }) {
  const [n, setN] = useState(value);
  const from = useRef(value);
  const still = useStill();
  useEffect(() => {
    if (still) {
      setN(value);
      from.current = value;
      return;
    }
    const c = animate(from.current, value, {
      duration: 0.5,
      ease,
      onUpdate: (v) => {
        from.current = v;
        setN(Math.round(v));
      },
    });
    return () => c.stop();
  }, [value, still]);
  return (
    <span className={`num ${className}`}>
      {prefix}
      {fmt.format(n)}
    </span>
  );
}

export function TypingDots({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-label="Typing">
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-1.5 w-1.5 animate-dot rounded-full bg-current" style={{ animationDelay: `${i * 0.16}s` }} />
      ))}
    </span>
  );
}
