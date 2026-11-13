"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
// run on real time even when frames are sparse (slow devices, throttled tabs),
// so content never sits half-faded waiting for the animation to catch up
gsap.ticker.lagSmoothing(0);

/*
  Site-wide GSAP motion, driven by data attributes so components stay plain:
    data-header        header slides down on load
    data-hero="bg"     hero photo eases in from a slight zoom, then parallaxes on scroll
    data-hero="line"   headline lines rise in, one after another
    data-hero="fade"   hero paragraph / button fade up after the headline
    data-reveal        element fades up when it scrolls into view
    data-stagger       its direct children rise in one after another on scroll
  Nothing animates for visitors who prefer reduced motion.
*/
export default function Motion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ease = "power3.out";

      gsap.from("[data-header]", { yPercent: -100, autoAlpha: 0, duration: 0.8, ease });

      const hero = gsap.timeline({ defaults: { ease } });
      hero
        .from('[data-hero="bg"]', { scale: 1.12, duration: 1.8, ease: "power2.out" }, 0)
        .from('[data-hero="line"]', { yPercent: 60, autoAlpha: 0, duration: 1, stagger: 0.14 }, 0.15)
        .from('[data-hero="fade"]', { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.12 }, 0.55);

      gsap.to('[data-hero="bg"]', {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: "main > section", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          ease,
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
          scrollTrigger: { trigger: group, start: "top bottom-=60", once: true },
        });
      });
    });

    return () => mm.revert();
  });

  return null;
}
