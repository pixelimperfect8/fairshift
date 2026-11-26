"use client";

import { createContext, useContext } from "react";
import { v2, v3 } from "@/lib/content";
import { baseCopy, type Copy } from "@/lib/content-v2a";

// The v2 sections read their photographs and their words from here, so a
// variant of the page (v2-A) can swap both without copying the sections.
export type Variant = {
  scenes: { photo: string; alt: string; q: string; a: string }[];
  trades: { title: string; body: string; items: { photo: string; alt: string; name: string }[] };
  closing: { photo: string; alt: string };
  copy: Copy;
};

const base: Variant = {
  scenes: v2.scenes.items,
  trades: { title: v3.trades.title, body: v2.industries.body, items: v3.trades.items },
  closing: { photo: v2.closing.photo, alt: v2.closing.alt },
  copy: baseCopy,
};

const Ctx = createContext<Variant>(base);
export const useVariant = () => useContext(Ctx);
/** The words for the page being shown: version 2's, unless a variant supplies its own. */
export const useCopy = () => useContext(Ctx).copy;
export function VariantProvider({ value, children }: { value: Variant; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
