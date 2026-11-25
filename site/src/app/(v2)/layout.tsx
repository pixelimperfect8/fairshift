import HeaderV2 from "@/components/v2/HeaderV2";
import DemoRibbon from "@/components/v2/DemoRibbon";
import { FooterV2 } from "@/components/v2/Sections";

// Version two: the cinematic, people-first page. The `v2` class turns the
// palette black and white and squares off the buttons (see the end of globals.css).
export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="v2">
      <HeaderV2 />
      {children}
      <FooterV2 />
      <DemoRibbon />
    </div>
  );
}
