import Link from "next/link";
import { Logo } from "@/components/Header";

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

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* closing call to action */}
        <div className="grid gap-10 border-b border-white/10 py-20 md:grid-cols-[1.3fr_1fr] md:items-end md:py-24">
          <div>
            <h2 className="text-4xl font-medium leading-[1.05] tracking-[-0.04em] md:text-[3.5rem]">
              Let&apos;s talk about
              <br />
              <span className="text-white/50">your growth.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
              Tell us about your institution, programme or idea — we usually reply within a
              working day.
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 md:items-end">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-md bg-white px-6 py-3.5 font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Talk to us
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <a
              href={`mailto:${EMAIL}`}
              className="text-white/70 underline decoration-white/20 underline-offset-8 transition-colors hover:text-white hover:decoration-white"
            >
              {EMAIL}
            </a>
          </div>
        </div>

        {/* links */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="w-fit">
              <Logo light />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Building growth for institutions. Creating opportunities for people.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">{col.title}</p>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="text-white/75 transition-colors hover:text-white">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">Connect</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`mailto:${EMAIL}`} className="text-white/75 transition-colors hover:text-white">
                  Email us
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                  </svg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 GrowthAxis Ventures LLP. All Rights Reserved.</p>
          <p>Admissions · Alliances · Creative economy</p>
        </div>
      </div>
    </footer>
  );
}
