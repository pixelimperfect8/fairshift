import HeaderV2 from "@/components/v2/HeaderV2";
import DemoRibbon from "@/components/v2/DemoRibbon";
import { FooterV2 } from "@/components/v2/Sections";

// Version two, variant A: the v2 page in daylight. The extra `v2a` class turns
// the black sections into a pale band (see the end of globals.css).
export default function V2ALayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="v2 v2a">
      <HeaderV2 />
      {children}
      <FooterV2 />
      <DemoRibbon />
    </div>
  );
}
