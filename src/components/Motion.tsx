"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
// run on real time even when frames are sparse (slow devices, throttled tabs),
// so content never sits half-faded waiting for the animation to catch up
gsap.ticker.lagSmoothing(0);

// GSAP pins translate/rotate/scale inline; clear them afterwards so CSS hover effects still work
const CLEAR = "transform,translate,rotate,scale";

/*
  Site-wide GSAP motion, driven by data attributes so components stay plain:
    data-header        header slides down on load
    data-hero="bg"     hero photo eases in from a slight zoom, then parallaxes on scroll
    data-hero="line"   headline lines rise in, one after another
    data-hero="fade"   hero paragraph / button fade up after the headline
    data-hero-copy     hero copy drifts up and fades as the hero scrolls away
    data-reveal        element fades up when it scrolls into view
    data-stagger       its direct children rise in one after another on scroll
    data-words         heading words light up one by one, tied to scroll position
    data-count         number counts up from 0 when it scrolls into view
    data-drift         gentle vertical parallax while it crosses the screen
    data-wipe          photo wipes open from the bottom when it scrolls into view
    data-footer-logo   oversized footer logo rises into place as the footer arrives
  Plus a thin logo-gradient progress line along the top of the page.
  Nothing animates for visitors who prefer reduced motion.
*/
export default function Motion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ease = "power3.out";

      /* ---------- page load ---------- */

      gsap.from("[data-header]", { yPercent: -100, autoAlpha: 0, duration: 0.8, ease });

      const hero = gsap.timeline({ defaults: { ease } });
      hero
        .from('[data-hero="bg"]', { scale: 1.12, duration: 1.8, ease: "power2.out" }, 0)
        .from('[data-hero="line"]', { yPercent: 60, autoAlpha: 0, duration: 1, stagger: 0.14 }, 0.15)
        .from('[data-hero="fade"]', { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.12 }, 0.55);

      /* ---------- scroll-linked (scrub) ---------- */

      gsap.to("[data-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });

      const heroScroll = { trigger: "main > section", start: "top top", end: "bottom top", scrub: true };
      gsap.to('[data-hero="bg"]', { yPercent: 8, ease: "none", scrollTrigger: heroScroll });
      gsap.to("[data-hero-copy]", { y: -90, autoAlpha: 0.15, ease: "none", scrollTrigger: heroScroll });

      // split headings into words once; restored on cleanup
      const headings = gsap.utils.toArray<HTMLElement>("[data-words]");
      const originals = headings.map((el) => el.innerHTML);
      headings.forEach((el) => {
        const words = (el.textContent ?? "").trim().split(/\s+/);
        el.setAttribute("aria-label", words.join(" "));
        el.replaceChildren(
          ...words.flatMap((w, i) => {
            const span = document.createElement("span");
            span.setAttribute("aria-hidden", "true");
            span.className = "inline-block";
            span.textContent = w;
            return i ? [document.createTextNode(" "), span] : [span];
          }),
        );
        gsap.fromTo(
          el.children,
          { opacity: 0.12, y: 14 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: "top bottom-=8%", end: "top 55%", scrub: 0.5 },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 22 + (i % 3) * 8 },
          {
            y: -(22 + (i % 3) * 8),
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.from("[data-footer-logo] > div", {
        yPercent: 45,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: "footer", start: "top 85%", end: "bottom bottom", scrub: 0.6 },
      });

      /* ---------- play once on enter ---------- */

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          ease,
          clearProps: CLEAR,
          scrollTrigger: { trigger: el, start: "top bottom-=40", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.from(group.children, {
          y: 50,
          autoAlpha: 0,
          duration: 0.9,
          ease,
          stagger: 0.12,
          clearProps: CLEAR,
          scrollTrigger: { trigger: group, start: "top bottom-=60", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        // counts 0 → the number written in the markup (which stays as-is without JS)
        gsap.from(el, {
          textContent: 0,
          snap: { textContent: 1 },
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top bottom-=60", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-wipe]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "power3.inOut",
            clearProps: "clipPath",
            scrollTrigger: { trigger: el, start: "top bottom-=60", once: true },
          },
        );
      });

      return () => {
        headings.forEach((el, i) => {
          el.innerHTML = originals[i];
          el.removeAttribute("aria-label");
        });
      };
    });

    return () => mm.revert();
  });

  // progress line (scaled from 0 by GSAP; hidden for reduced motion since it never grows)
  return (
    <div
      data-progress
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-brand"
    />
  );
}
