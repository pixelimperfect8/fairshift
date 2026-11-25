"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/content";
import { Logo } from "@/components/bits";
import { LanguageToggle } from "@/components/v2/HeaderV2";

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 text-paper transition-[background-color,backdrop-filter,padding] duration-500 ${solid || open ? "bg-ink/80 pt-0 backdrop-blur-xl" : "bg-transparent pt-4"}`}>
      <div className="wrap flex h-16 items-center justify-between">
        <a href="#top" aria-label="FairShift home">
          <Logo />
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 text-[0.94rem] lg:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="opacity-75 transition-opacity hover:opacity-100">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <LanguageToggle round className="mr-1.5 hidden lg:flex" />
          <a href={site.demoUrl} className="btn btn-paper !min-h-10 !px-5 !text-[0.92rem]">
            Book a demo
          </a>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)} className="grid h-10 w-10 place-items-center rounded-full lg:hidden">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="wrap pb-4 lg:hidden"
          >
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-[1.05rem] hover:bg-paper/10">
                {n.label}
              </a>
            ))}
            <LanguageToggle round className="ml-4 mt-3 w-fit" />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
