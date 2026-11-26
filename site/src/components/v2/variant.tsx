"use client";

import { createContext, useContext } from "react";
import { v2, v3 } from "@/lib/content";

// The v2 sections read their photographs and trade copy from here, so a
// variant of the page (v2-A) can swap them without copying the sections.
export type Variant = {
  scenes: { photo: string; alt: string; q: string; a: string }[];
  trades: { title: string; body: string; items: { photo: string; alt: string; name: string }[] };
  closing: { photo: string; alt: string };
};

const base: Variant = {
  scenes: v2.scenes.items,
  trades: { title: v3.trades.title, body: v2.industries.body, items: v3.trades.items },
  closing: { photo: v2.closing.photo, alt: v2.closing.alt },
};

const Ctx = createContext<Variant>(base);
export const useVariant = () => useContext(Ctx);
export function VariantProvider({ value, children }: { value: Variant; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
