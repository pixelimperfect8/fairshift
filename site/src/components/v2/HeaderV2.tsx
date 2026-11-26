"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCopy } from "@/components/v2/variant";
import { Logo } from "@/components/bits";

const LANGS = [
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
] as const;

/** EN / ES. It remembers the choice and marks the page language; the Spanish copy itself is not written yet. */
export function LanguageToggle({ className = "", round = false }: { className?: string; round?: boolean }) {
  const [lang, setLang] = useState<string>("en");
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("fairshift-lang");
      if (saved === "en" || saved === "es") setLang(saved);
    } catch {}
  }, []);
  const pick = (code: string) => {
    setLang(code);
    document.documentElement.lang = code;
    try {
      window.localStorage.setItem("fairshift-lang", code);
    } catch {}
  };
  return (
    <div role="group" aria-label="Language" className={`flex items-center ${round ? "rounded-full" : "rounded-lg"} bg-paper/10 p-0.5 text-[0.85rem] ${className}`}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          aria-pressed={lang === l.code}
          aria-label={l.name}
          onClick={() => pick(l.code)}
          className={`h-8 ${round ? "rounded-full px-3" : "rounded-md px-2.5"} font-medium transition-colors ${lang === l.code ? "bg-paper text-ink" : "text-paper/70 hover:text-paper"}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

// Wordmark on the left, everything else gathered on the right.
export default function HeaderV2() {
  const { nav, site } = useCopy();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 text-paper transition-[background-color,backdrop-filter] duration-500 ${solid || open ? "bg-ink/90 backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="flex h-[4.5rem] items-center justify-between px-[clamp(1.25rem,2.4vw,2rem)]">
        <a href="#top" aria-label="FairShift home">
          <Logo />
        </a>
        <div className="flex items-center gap-2">
          <nav aria-label="Main" className="mr-5 hidden items-center gap-8 text-[0.95rem] lg:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="group relative py-1">
                {n.label}
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <LanguageToggle className="mr-2 hidden lg:flex" />
          <a href={site.demoUrl} className="btn btn-blue !min-h-11 !px-5 !text-[0.94rem]">
            Book a demo
          </a>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)} className="grid h-11 w-11 place-items-center lg:hidden">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav aria-label="Mobile" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="px-[clamp(1.25rem,2.4vw,2rem)] pb-5 lg:hidden">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-t border-paper/15 py-3.5 text-[1.3rem] tracking-[-0.02em]">
                {n.label}
              </a>
            ))}
            <LanguageToggle className="mt-4 w-fit" />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
