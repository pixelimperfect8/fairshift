"use client";

import { motion } from "framer-motion";
import { useStill } from "@/lib/motion";

// Hairline isometric drawings. Everything is a box: three visible faces, drawn
// as outlines and filled with the section's background so nearer boxes cover
// farther ones. One box per drawing carries the blue.

const C = Math.cos(Math.PI / 6);
const pt = (x: number, y: number, z: number) => `${((x - y) * C).toFixed(2)} ${((x + y) * 0.5 - z).toFixed(2)}`;
const face = (p: [number, number, number][]) => `M${p.map((q) => pt(...q)).join("L")}Z`;

export type BoxSpec = { x: number; y: number; z: number; w: number; d: number; h: number; accent?: boolean; dashed?: boolean };

export function Box({ x, y, z, w, d, h, accent, dashed, bg, i = 0 }: BoxSpec & { bg: string; i?: number }) {
  const still = useStill();
  const top = face([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]]);
  const left = face([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]]);
  const right = face([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]]);
  return (
    <g stroke={accent ? "var(--color-blue)" : "currentColor"} strokeWidth={accent ? 1.6 : 1.1} strokeLinejoin="round" strokeDasharray={dashed ? "3 4" : undefined} fill={bg}>
      {[left, right, top].map((dd, k) =>
        still || dashed ? (
          <path key={k} d={dd} />
        ) : (
          <motion.path key={k} d={dd} pathLength={1} strokeDasharray="1 1" initial={{ strokeDashoffset: 1, fillOpacity: 0 }} whileInView={{ strokeDashoffset: 0, fillOpacity: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.12 + k * 0.05 }} />
        ),
      )}
    </g>
  );
}

export function Iso({ boxes, bg, className = "", viewBox = "-110 -95 220 170" }: { boxes: BoxSpec[]; bg: string; className?: string; viewBox?: string }) {
  return (
    <svg viewBox={viewBox} className={className} aria-hidden fill="none">
      {boxes.map((b, i) => (
        <Box key={i} {...b} bg={bg} i={i} />
      ))}
    </svg>
  );
}

// The four moments of the loop.
export const drawings: Record<string, BoxSpec[]> = {
  // a phone lying flat, two messages lifting off it
  text: [
    { x: -42, y: -42, z: 0, w: 84, d: 84, h: 6 },
    { x: -30, y: -30, z: 30, w: 52, d: 20, h: 4 },
    { x: -14, y: 2, z: 30, w: 44, d: 20, h: 4, accent: true },
  ],
  // three answers, one standing taller
  answer: [
    { x: -58, y: -16, z: 0, w: 32, d: 32, h: 26 },
    { x: -16, y: -16, z: 0, w: 32, d: 32, h: 52, accent: true },
    { x: 26, y: -16, z: 0, w: 32, d: 32, h: 26 },
  ],
  // the fix dropping into place
  fix: [
    { x: -46, y: -46, z: 0, w: 92, d: 92, h: 8 },
    { x: -22, y: -22, z: 8, w: 44, d: 44, h: 34, dashed: true },
    { x: -22, y: -22, z: 44, w: 44, d: 44, h: 8, accent: true },
  ],
  // the record: sheets, the newest on top
  record: [0, 1, 2, 3, 4].map((k) => ({ x: -42, y: -42, z: k * 11, w: 84, d: 84, h: 3, accent: k === 4 })),
};
