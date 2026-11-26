import HeaderV2 from "@/components/v2/HeaderV2";
import DemoRibbon from "@/components/v2/DemoRibbon";
import ProviderA from "@/components/v2/ProviderA";
import { FooterV2 } from "@/components/v2/Sections";

// Version two, variant A: the v2 page in daylight, with its own words and
// photographs. The extra `v2a` class turns the black sections into a warm band
// (see the end of globals.css); ProviderA supplies the copy and the pictures.
export default function V2ALayout({ children }: { children: React.ReactNode }) {
  return (
    <ProviderA>
      <div className="v2 v2a">
        <HeaderV2 />
        {children}
        <FooterV2 />
        <DemoRibbon />
      </div>
    </ProviderA>
  );
}
