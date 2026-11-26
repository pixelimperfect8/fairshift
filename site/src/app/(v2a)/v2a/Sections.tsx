"use client";

import { v2, v2a } from "@/lib/content";
import HeroA from "@/components/v2/HeroA";
import Statement from "@/components/v2/Statement";
import Scenes from "@/components/v2/Scenes";
import { BigStat, ClosingV2, FaqV2, Gets, Languages, Limits, Loop, MathV2, PricingV2, Trades, WhoV2 } from "@/components/v2/Sections";
import { VariantProvider, type Variant } from "@/components/v2/variant";

// The v2 sections, shown with v2-A's photographs and trade copy.
const variant: Variant = {
  scenes: v2.scenes.items.map((s, i) => ({ ...s, ...v2a.scenes[i] })),
  trades: v2a.trades,
  closing: v2a.closing,
};

export default function SectionsA() {
  return (
    <VariantProvider value={variant}>
      <HeroA />
      <Statement />
      <Scenes />
      <Loop />
      <Gets />
      <BigStat />
      <Languages />
      <MathV2 />
      <WhoV2 />
      <Trades />
      <Limits />
      <PricingV2 />
      <FaqV2 />
      <ClosingV2 />
    </VariantProvider>
  );
}
