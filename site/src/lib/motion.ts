import { useSyncExternalStore } from "react";

// Shared motion presets so every section eases the same way.
export const ease = [0.16, 1, 0.3, 1] as const;
export const spring = { type: "spring", stiffness: 260, damping: 20 } as const;

export const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease },
};

export const stagger = (i: number, step = 0.08) => ({ ...reveal.transition, delay: i * step });

// True when the visitor asked for reduced motion. Unlike framer's own hook this
// reports false while the server-rendered page hydrates and flips right after,
// so the first client render always matches the HTML.
const query = "(prefers-reduced-motion: reduce)";
const subscribe = (fn: () => void) => {
  const m = window.matchMedia(query);
  m.addEventListener("change", fn);
  return () => m.removeEventListener("change", fn);
};
export function useStill() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}
