import { footer, site } from "@/lib/content";
import { Logo } from "@/components/bits";

export default function Footer() {
  return (
    <footer className="wrap pb-10 pt-16 md:pt-24">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <Logo className="!text-[2rem]" />
          <p className="mt-4 max-w-[20rem] text-[0.98rem] leading-relaxed text-mute">{footer.blurb}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footer.columns.map((c) => (
            <div key={c.title}>
              <p className="text-[0.9rem] font-semibold">{c.title}</p>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[0.96rem] text-mute transition-colors hover:text-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-14 space-y-3 pt-8 text-[0.82rem] leading-relaxed text-mute shadow-[0_-1px_0_rgb(13_17_16/0.1)]">
        <p className="max-w-[60rem]">{footer.legal}</p>
        <p className="max-w-[60rem]">{footer.sources}</p>
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
