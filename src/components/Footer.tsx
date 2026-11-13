import Link from "next/link";

const EMAIL = "connect@growthaxisventures.com";
const LINKEDIN = "https://www.linkedin.com/in/growthaxis-ventures-25bb17428/";

const columns = [
  {
    title: "Ventures",
    links: [
      { name: "Growth Alliances", href: "/growth-alliances" },
      { name: "AdmitBridge", href: "/admitbridge" },
      { name: "CreativeNext", href: "/creativenext" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Team", href: "/#team" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

/*
  Footer sits behind the white page, whose rounded bottom overlaps it (-mt-3),
  on a deep ink gradient, ending in an oversized wordmark cropped by the edge.
*/
export default function Footer() {
  return (
    <footer className="relative -mt-3 overflow-hidden bg-[linear-gradient(to_bottom,#231d46_0%,#15122b_45%,#0a0915_100%)] text-white">
      <div className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 md:pt-24">
        {/* tagline + socials · links */}
        <div data-stagger className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-3xl font-medium leading-[1.08] tracking-[-0.03em] md:text-[2.5rem]">
              Let&apos;s talk about your growth.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
              Tell us about your institution, programme or idea — we usually reply within a
              working day.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white/90"
              >
                Talk to us
                <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/40 px-5 py-3 text-sm transition-colors hover:border-white hover:bg-white/5"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="rounded-md border border-white/40 px-5 py-3 text-sm transition-colors hover:border-white hover:bg-white/5"
              >
                Email
              </a>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-10 md:w-fit md:justify-self-end md:gap-20">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">{col.title}</p>
                <ul className="mt-5 space-y-3 text-[15px]">
                  {col.links.map((l) => (
                    <li key={l.name}>
                      <Link href={l.href} className="text-white/85 transition-colors hover:text-white">
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* dashed divider + fine print */}
        <div
          data-reveal
          className="mt-16 flex flex-col gap-3 border-t border-dashed border-white/25 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>© 2026 GrowthAxis Ventures LLP</p>
          <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-white">
            {EMAIL}
          </a>
        </div>
      </div>

      {/* oversized logo, rebuilt in code (light "growth", bold "axis", VENTURES, gradient arrow) so it stays sharp */}
      <div
        data-reveal
        aria-hidden
        className="mx-auto mt-14 max-w-6xl px-5 pb-10 text-[clamp(52px,16.5vw,210px)] sm:px-8 md:mt-16 md:pb-14"
      >
        <div className="relative w-fit pr-[0.2em] leading-[0.9] text-white">
          <p className="tracking-[-0.045em]">
            <span className="font-light">growth</span>
            <span className="font-semibold">axis</span>
          </p>
          <p className="mt-[0.12em] text-right text-[0.13em] font-medium uppercase leading-none tracking-[0.62em] text-[#b4b0d9]">
            Ventures
          </p>
          <svg viewBox="0 0 12 12" className="absolute right-0 top-[-0.02em] h-[0.2em] w-[0.2em]">
            <defs>
              <linearGradient id="footer-logo-arrow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f7943b" />
                <stop offset="50%" stopColor="#e2458e" />
                <stop offset="100%" stopColor="#7b5cf5" />
              </linearGradient>
            </defs>
            <path d="M0 0h12v12L8 8V4H4z" fill="url(#footer-logo-arrow)" />
          </svg>
        </div>
      </div>
    </footer>
  );
}
