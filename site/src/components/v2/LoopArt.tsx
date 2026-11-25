"use client";

import { motion } from "framer-motion";
import { useStill } from "@/lib/motion";

// Four hairline isometric drawings, one for each step of the loop. Each is
// drawn for its step: a phone with a text lifting off it, three answer keys,
// a flag beside its next-step note, and a stack of dated sheets with a seal.
// Plates are filled with the section's black so nearer things cover farther ones.

const C = Math.cos(Math.PI / 6);
type V = [number, number, number];
const P = ([x, y, z]: V) => `${((x - y) * C).toFixed(1)} ${((x + y) * 0.5 - z).toFixed(1)}`;
const path = (pts: V[], close = false) => `M${pts.map(P).join("L")}${close ? "Z" : ""}`;

type Part = { d: string; plate?: boolean; accent?: boolean; dashed?: boolean; quiet?: boolean };
type Group = { parts: Part[]; bob?: number };
type Opt = { accent?: boolean; quiet?: boolean };

/** The outline of a rounded rectangle lying flat at height z, as points: back, right, front, left corner in turn. */
const STEPS = 6;
function outline(x: number, y: number, z: number, w: number, d: number, r: number): V[] {
  const q = Math.min(r, w / 2, d / 2);
  const corners: [number, number, number][] = [
    [x + q, y + q, 180],
    [x + w - q, y + q, 270],
    [x + w - q, y + d - q, 0],
    [x + q, y + d - q, 90],
  ];
  return corners.flatMap(([cx, cy, from]) =>
    Array.from({ length: STEPS + 1 }, (_, k): V => {
      const t = ((from + (90 * k) / STEPS) * Math.PI) / 180;
      return [cx + q * Math.cos(t), cy + q * Math.sin(t), z];
    }),
  );
}

/** A soft-cornered box: the skirt you can see below the top, then the top itself. */
const box = (x: number, y: number, z: number, w: number, d: number, h: number, o: Opt & { r?: number } = {}): Part[] => {
  const { r = 7, ...rest } = o;
  const top = outline(x, y, z + h, w, d, r);
  // the visible side runs from the middle of the right corner, round the front, to the middle of the left corner
  const n = STEPS + 1;
  const seen = top.slice(n + STEPS / 2, 3 * n + STEPS / 2 + 1);
  const skirt = [...seen.map(([px, py]): V => [px, py, z]), ...seen.reverse()];
  return [
    { d: path(skirt, true), plate: true, ...rest },
    { d: path(top, true), plate: true, ...rest },
  ];
};
/** A rounded outline drawn on a surface, with no body. */
const ring = (x: number, y: number, z: number, w: number, d: number, r: number, o: Opt = {}): Part => ({ d: path(outline(x, y, z, w, d, r), true), ...o });
const line = (pts: V[], o: Opt & { dashed?: boolean } = {}): Part => ({ d: path(pts), ...o });
/** Lines of "writing" across a top face. */
const writing = (x: number, y: number, z: number, len: number, rows: number, gap: number, o: Opt = {}): Part[] =>
  Array.from({ length: rows }, (_, k) => line([[x, y + k * gap, z], [x + (k === rows - 1 ? len * 0.6 : len), y + k * gap, z]], { quiet: true, ...o }));

const FIGURES: Record<string, Group[]> = {
  // a phone lying flat, with a text and its reply lifting off the screen
  text: [
    { parts: [...box(-44, -78, 0, 88, 156, 7, { r: 14 }), ring(-37, -71, 7, 74, 142, 8, { quiet: true }), line([[-10, 62, 7], [10, 62, 7]], { quiet: true })] },
    { parts: [line([[-30, -52, 7], [-30, -52, 40]], { dashed: true }), line([[26, -8, 7], [26, -8, 62]], { dashed: true })] },
    { bob: 5, parts: [...box(-30, -52, 40, 50, 26, 3), ...writing(-24, -46, 43, 38, 3, 7)] },
    { bob: -4, parts: [...box(-8, -8, 62, 34, 20, 3, { accent: true }), ...writing(-3, -2, 65, 24, 2, 7, { accent: true })] },
  ],
  // three keys in a row, each with its 1 or 2, the middle one standing proud
  answer: [-1, 0, 1].map((k) => {
    const cx = k * 62;
    const cy = -k * 62;
    const up = k === 0;
    const z = up ? 26 : 10;
    const o = { accent: up };
    const one: V[] = [[cx, cy - 11, z], [cx, cy + 11, z]];
    const two: V[] = [[cx - 8, cy - 11, z], [cx + 8, cy - 11, z], [cx + 8, cy, z], [cx - 8, cy, z], [cx - 8, cy + 11, z], [cx + 8, cy + 11, z]];
    return { bob: up ? 4 : 0, parts: [...box(cx - 24, cy - 24, 0, 48, 48, z, { ...o, r: 9 }), line(up ? two : one, o)] };
  }),
  // a pennant hovering over the floor, and beside it the note that says what to do
  fix: [
    { parts: box(-62, -62, 0, 124, 124, 6, { r: 14 }) },
    { bob: 5, parts: [{ d: path([[14, -38, 70], [56, -38, 57], [14, -38, 44]], true), plate: true, accent: true }] },
    { bob: 3, parts: [...box(-46, 6, 6, 78, 44, 3), ...writing(-38, 15, 9, 62, 4, 9)] },
  ],
  // the record: dated sheets, the newest on top, sealed
  record: [
    ...[0, 1, 2, 3, 4].map((k) => ({ parts: box(-46 + k * 1.5, -62 - k * 1.5, k * 10, 92, 124, 3, { r: 9 }) })),
    { parts: writing(-30, -48, 43, 60, 6, 13) },
    { bob: 3, parts: [...box(14, 26, 43, 26, 26, 5, { accent: true }), line([[20, 39, 48], [26, 45, 48], [35, 32, 48]], { accent: true })] },
  ],
};

export default function LoopArt({ name, active, className = "" }: { name: keyof typeof FIGURES | string; active: boolean; className?: string }) {
  const still = useStill();
  const groups = FIGURES[name] ?? [];
  let n = 0;
  return (
    <svg viewBox="-170 -150 340 290" className={className} aria-hidden fill="none" strokeLinejoin="round" strokeLinecap="round">
      {groups.map((g, gi) => (
        <motion.g key={gi} initial={false} animate={still || !active || !g.bob ? { y: 0 } : { y: [0, -g.bob, 0] }} transition={still || !active || !g.bob ? { duration: 0.4 } : { duration: 4.5 + gi * 0.6, repeat: Infinity, ease: "easeInOut" }}>
          {g.parts.map((p, pi) => {
            const i = n++;
            const stroke = p.accent ? "#6f86ff" : p.quiet || p.dashed ? "#77776f" : "#e9e9e4";
            const common = { d: p.d, stroke, strokeWidth: p.accent ? 1 : 0.8, fill: p.plate ? "#0a0a0a" : "none" };
            if (p.dashed) return <motion.path key={pi} {...common} strokeDasharray="2 3" initial={false} animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.5, delay: active ? 0.7 : 0 }} />;
            if (still) return <path key={pi} {...common} />;
            return (
              <motion.path
                key={pi}
                {...common}
                pathLength={1}
                strokeDasharray="1 1"
                initial={false}
                animate={{ strokeDashoffset: active ? 0 : 1, fillOpacity: active ? 1 : 0 }}
                transition={{ duration: active ? 1 : 0.3, ease: [0.16, 1, 0.3, 1], delay: active ? 0.1 + i * 0.022 : 0 }}
              />
            );
          })}
        </motion.g>
      ))}
    </svg>
  );
}
