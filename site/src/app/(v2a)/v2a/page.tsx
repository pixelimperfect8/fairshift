import HeroA from "@/components/v2/HeroA";
import Statement from "@/components/v2/Statement";
import Scenes from "@/components/v2/Scenes";
import { BigStat, ClosingV2, FaqV2, Gets, Languages, Limits, Loop, PricingV2, Trades, WhoV2 } from "@/components/v2/Sections";

export const metadata = { title: "FairShift · A simple payday check-in for your team" };

// Version two, variant A. Its words follow the messaging guide (lib/content-v2a.ts).
// The penalty calculator from version two is left out: the guide asks for a calm
// voice and no talk of legal outcomes.
export default function HomeV2A() {
  return (
    <main id="main">
      <HeroA />
      <Statement />
      <Scenes />
      <Loop />
      <Gets />
      <BigStat />
      <Languages />
      <WhoV2 />
      <Trades />
      <Limits />
      <PricingV2 />
      <FaqV2 />
      <ClosingV2 />
    </main>
  );
}
