"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { name: "Ventures", href: "/#ventures" },
  { name: "About", href: "/about" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`relative flex flex-col items-end pr-3 leading-none transition-colors ${light ? "text-white" : "text-ink"}`}
      aria-label="GrowthAxis Ventures"
    >
      <span className="text-[22px] font-light tracking-[-0.02em]">growthaxis</span>
      <span className={`mt-0.5 text-[8px] font-medium uppercase tracking-[0.55em] ${light ? "text-white/70" : "text-muted"}`}>
        Ventures
      </span>
      <svg viewBox="0 0 12 12" className="absolute -top-1 right-0 h-3 w-3" aria-hidden>
        <defs>
          <linearGradient id="logo-arrow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f7943b" />
            <stop offset="50%" stopColor="#e2458e" />
            <stop offset="100%" stopColor="#7b5cf5" />
          </linearGradient>
        </defs>
        <path d="M0 0h12v12L8 8V4H4z" fill="url(#logo-arrow)" />
      </svg>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  // solid white bar as soon as the page scrolls, so the logo never sits over hero text or photos
  const [scrolled, setScrolled] = useState(false);

  // a link to the page you're already on (logo on home, "Talk to us" on /contact)
  // doesn't navigate, so glide back to the top instead of doing nothing
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Next.js <Link> has already cancelled the click by the time it bubbles here, so don't check defaultPrevented
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest("a");
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if (url.origin === location.origin && url.pathname === location.pathname && !url.hash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-header
      className={`fixed inset-x-0 top-0 z-50 border-b px-4 py-3 transition-colors duration-300 ${
        scrolled ? "border-line bg-white" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Logo />

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 text-sm text-ink/75 md:flex"
        >
          {links.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className="rounded-sm px-4 py-2 transition-colors hover:text-ink"
            >
              {l.name}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="btn-glow hidden rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-white md:block"
        >
          Partner with us
        </Link>

        <button
          className="rounded-md border border-line bg-white p-2.5 text-ink md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 9h16M4 15h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="mx-auto mt-2 max-w-6xl rounded-lg border border-line bg-surface p-3 md:hidden">
          {links.map((l) => (
            <Link key={l.name} href={l.href} className="block rounded-md px-4 py-3 text-ink hover:bg-canvas" onClick={() => setOpen(false)}>
              {l.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-glow mt-2 block rounded-md bg-ink py-3 text-center font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Partner with us
          </Link>
        </nav>
      )}
    </header>
  );
}
