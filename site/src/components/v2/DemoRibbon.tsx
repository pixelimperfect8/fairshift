import { ArrowUpRight } from "lucide-react";

// The v2 design system (design-systems/shift). A built copy is served by this
// site from public/ds/v2; set NEXT_PUBLIC_DS_URL to point somewhere else.
const dsUrl = process.env.NEXT_PUBLIC_DS_URL || "/ds/v2/index.html";

// A small fixed tag in the bottom-right corner: says this is a demo, and links
// to the design system (or, from a page that passes `href`, somewhere else).
// Set NEXT_PUBLIC_HIDE_RIBBON=1 to leave it out of a build.
export default function DemoRibbon({ href = dsUrl, label = "Design system", round = false }: { href?: string; label?: string; round?: boolean }) {
  if (process.env.NEXT_PUBLIC_HIDE_RIBBON === "1") return null;
  return (
    <div className={`fixed bottom-4 right-4 z-[55] flex items-stretch overflow-hidden ${round ? "rounded-full" : "rounded-lg"} bg-ink/85 text-[0.8rem] text-paper shadow-[0_14px_40px_-14px_rgb(0_0_0/0.6)] backdrop-blur-md`}>
      <span className={`flex items-center gap-2 py-2.5 ${round ? "pl-4 pr-3.5" : "px-3.5"}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-[#6f86ff]" />
        Demo
      </span>
      <a href={href} className={`group flex items-center gap-1.5 border-l border-paper/15 py-2.5 font-medium transition-colors hover:bg-blue ${round ? "pl-3.5 pr-4" : "px-3.5"}`}>
        {label}
        <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
