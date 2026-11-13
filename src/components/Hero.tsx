import Image from "next/image";
import Link from "next/link";
import heroPhoto from "../../public/images/hero-students-walking.png";

/*
  Figma "MacBook Pro 14'" hero (node 36:449): the photo fills the whole hero at
  full width (3:2, extending ~6.6vw below the bottom edge) with the sky running to
  the top; the copy sits centred on the sky.

  The students' heads sit ~32.7vw above the hero's bottom edge, so from lg up the
  hero height is the design's 60.3vw, grown only as needed to keep the "Talk to
  us" button at least 20px above them. The hero's background is the photo's own
  sky colour (sampled from its top edge) and the photo's top edge fades into it,
  so any extra height reads as more sky. Phones use the same layout with the
  photo slightly enlarged (5:4, cropped at the sides) so the students stay big.
*/
export default function Hero() {
  return (
    <section className="relative isolate min-h-[max(74svh,600px)] overflow-hidden sm:min-h-[max(100svh,680px)] bg-[#a9d0fa] lg:h-[max(60.3vw,calc(48.75vw_+_175px),calc(41.85vw_+_270px))] lg:min-h-0">
      <div className="absolute inset-x-0 bottom-0 -z-10 aspect-[5/4] [mask-image:linear-gradient(to_bottom,transparent,black_14%)] sm:aspect-[3/2] lg:bottom-[-6.6vw] lg:[mask-image:linear-gradient(to_bottom,transparent,black_5%)]">
        <Image
          src={heroPhoto}
          alt="Four smiling university students walking together across a sunny campus"
          fill
          preload
          quality={90}
          placeholder="blur"
          sizes="100vw"
          data-hero="bg"
          className="object-cover object-bottom"
        />
      </div>

      <div className="flex flex-col items-center px-5 pt-[clamp(110px,15vh,150px)] text-center sm:px-8 lg:pt-[max(96px,6.9vw)]">
        <h1 className="text-[6vw] font-medium leading-[1.08] tracking-[-0.045em] text-ink lg:text-[4.4vw] lg:leading-[1.04]">
          <span data-hero="line" className="block whitespace-nowrap">
            Building growth for institutions.
          </span>
          <span data-hero="line" className="block whitespace-nowrap">
            Creating opportunities for people.
          </span>
        </h1>

        <p data-hero="fade" className="mt-4 max-w-md text-balance text-sm leading-relaxed text-ink/75 sm:mt-5 sm:max-w-xl sm:text-base lg:text-lg lg:max-w-none lg:whitespace-nowrap">
          GrowthAxis Ventures works with education institutions, skilling organisations and the
          creative ecosystem
          <br className="hidden lg:block" /> to build partnerships, strengthen admissions and
          unlock new opportunities.
        </p>

        <div data-hero="fade" className="mt-8">
          <Link
            href="/contact"
            className="inline-block rounded-md bg-ink px-6 py-2.5 text-[15px] font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}
