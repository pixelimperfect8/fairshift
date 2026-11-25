"use client";

import { motion } from "framer-motion";
import { ease, useStill } from "@/lib/motion";

/**
 * A two-tone headline: the first sentence at full strength, the second quieter.
 * Words rise one after another from behind a mask the first time it is seen.
 */
export function TwoTone({ bright, dim, as: Tag = "h2", className = "", delay = 0 }: { bright: string; dim?: string; as?: "h1" | "h2" | "p"; className?: string; delay?: number }) {
  const still = useStill();
  const words = [...bright.split(" ").map((w) => ({ w, dim: false })), ...(dim ? dim.split(" ").map((w) => ({ w, dim: true })) : [])];
  const M = motion[Tag];
  if (still)
    return (
      <Tag className={className}>
        {bright} {dim && <span className="dim">{dim}</span>}
      </Tag>
    );
  return (
    // the heading watches for the viewport; its words start clipped and can't
    <M className={className} initial="out" whileInView="in" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.035, delayChildren: delay }}>
      {words.map((x, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-top">
          <motion.span className={`inline-block ${x.dim ? "dim" : ""}`} variants={{ out: { y: "112%" }, in: { y: 0 } }} transition={{ duration: 0.9, ease }}>
            {x.w}
            {" "}
          </motion.span>
        </span>
      ))}
    </M>
  );
}

/** Fade and lift, once. */
export function Up({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const still = useStill();
  if (still) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.85, ease, delay }}>
      {children}
    </motion.div>
  );
}
