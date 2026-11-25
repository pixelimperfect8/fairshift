import HeroV2 from "@/components/v2/HeroV2";
import Statement from "@/components/v2/Statement";
import Scenes from "@/components/v2/Scenes";
import { BigStat, ClosingV2, FaqV2, Gets, Languages, Limits, Loop, MathV2, PricingV2, Trades, WhoV2 } from "@/components/v2/Sections";

export const metadata = { title: "FairShift · Your team has something to tell you" };

// Version two. Nothing here is shared with version one except the copy.
export default function HomeV2() {
  return (
    <main id="main">
      <HeroV2 />
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
    </main>
  );
}
