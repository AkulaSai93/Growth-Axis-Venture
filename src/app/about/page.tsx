import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Motion from "@/components/Motion";
import WhoWeAre from "@/components/WhoWeAre";
import campusPhoto from "../../../public/images/about-campus-sky.png";

export const metadata: Metadata = {
  title: "About GrowthAxis Ventures | Founder & Advisors",
  description:
    "GrowthAxis Ventures helps institutions grow through admissions, alliances and the creative economy, working as a partner rather than an outside vendor.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      {/* white page sits over the footer with a rounded bottom edge (same as home) */}
      <main className="relative z-10 flex-1 overflow-hidden rounded-b-3xl bg-surface md:rounded-b-[40px]">
        {/* hero: a people-free campus photo (Figma AI, node 49:2) runs full width along
            the bottom; its upper two-thirds is open sky, so the centred copy (content
            from the live About page) sits on plain sky with no overlay. The section's
            background is that sky colour, and the photo's top edge fades into it, so
            any extra height on narrow screens reads as more sky. The building starts
            66% down the photo (~19.2vw above the hero's bottom edge), so from lg up the
            hero is at least the photo's height, grown only to keep the copy clear of it. */}
        <section className="relative isolate overflow-hidden bg-[#9cd1fc] px-5 pb-[calc(28vw+40px)] pt-32 text-center sm:px-8 sm:pb-[calc(19.2vw+48px)] lg:h-[max(56.25vw,calc(19.2vw_+_460px))] lg:pb-0 lg:pt-[max(132px,9.5vw)]">
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 -z-10 aspect-[5/4] [mask-image:linear-gradient(to_bottom,transparent,black_12%)] sm:aspect-video"
          >
            <Image
              src={campusPhoto}
              alt=""
              fill
              preload
              quality={90}
              placeholder="blur"
              sizes="100vw"
              data-hero="bg"
              className="object-cover object-bottom"
            />
          </div>

          <div data-hero-copy className="mx-auto">
            <p data-hero="fade" className="text-sm font-medium text-ink/70">
              About us
            </p>
            <h1 className="mt-4 text-[2.4rem] font-medium leading-[1.04] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[4.4vw]">
              <span data-hero="line" className="block">
                About GrowthAxis Ventures
              </span>
            </h1>
            {/* two lines from xl up (one sentence each); balanced wrapping below that */}
            <p
              data-hero="fade"
              className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-ink/80 sm:text-lg xl:max-w-none xl:text-[1.22vw]"
            >
              GrowthAxis Ventures exists because good institutions often have strong programmes but not
              enough reach, and the right connections can change that.
              <br className="hidden xl:block" /> We help institutions grow through admissions, alliances and
              the creative economy, working as a partner rather than an outside vendor.
            </p>
          </div>
        </section>

        <WhoWeAre showMoreLink={false} />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
