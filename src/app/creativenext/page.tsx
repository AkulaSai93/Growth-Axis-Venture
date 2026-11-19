import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IndustryVisual, InstitutionsVisual, ProfessionalsVisual, StudentsVisual } from "@/components/CreativeVisuals";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Motion from "@/components/Motion";
import PartnerCards, { type Partner } from "@/components/PartnerCards";
import studioPhoto from "../../../public/images/creativenext-studio.png";

export const metadata: Metadata = {
  title: "CreativeNext | India's Creative Economy Community",
  description:
    "A community for India's creative economy, connecting the people who learn, teach, practice and hire creative work.",
};

/* Who it connects (content from the live page), each group with its own coded visual */
const groups: Partner[] = [
  {
    name: "Students",
    description: "Exploring creative careers, skills and pathways into the industry.",
    mark: null,
    visual: <StudentsVisual />,
  },
  {
    name: "Institutions",
    description: "Colleges, universities and schools building creative programmes.",
    mark: null,
    visual: <InstitutionsVisual />,
  },
  {
    name: "Creative Professionals",
    description: "Practitioners across film, media, design, animation and beyond.",
    mark: null,
    visual: <ProfessionalsVisual />,
  },
  {
    name: "Industry",
    description: "Studios and organisations looking to connect with creative talent.",
    mark: null,
    visual: <IndustryVisual />,
  },
];

export default function CreativeNextPage() {
  return (
    <>
      <Header />
      {/* white page sits over the footer with a rounded bottom edge (same as home) */}
      <main className="relative z-10 flex-1 overflow-hidden rounded-b-3xl bg-surface md:rounded-b-[40px]">
        {/* hero: a bright creative studio, no people (Figma AI, node 68:2): a plain
            lavender-white wall above a worktable of creative tools. The tallest object
            (the plant) starts 34% down the photo (~37vw above the hero bottom).
            Same layout as AdmitBridge: the photo runs full width along the bottom, the
            centred copy (from the live page) sits on the plain wall with no overlay,
            the section background is the wall colour and the photo's top edge fades
            into it. Phones and tablets crop the photo tighter (4:5, 4:3). */}
        <section className="relative isolate flex min-h-[720px] justify-center overflow-hidden bg-[#dedae9] px-5 pt-[clamp(120px,17vh,160px)] text-center sm:min-h-[max(100svh,600px)] sm:px-8 lg:min-h-[max(100svh,56.25vw,calc(37vw_+_420px))]">
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 -z-10 aspect-[4/5] [mask-image:linear-gradient(to_bottom,transparent,black_10%)] sm:aspect-[4/3] lg:aspect-video"
          >
            <Image
              src={studioPhoto}
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

          <div data-hero-copy>
            <p data-hero="fade" className="text-sm font-medium text-ink/80">
              Built by GrowthAxis Ventures
            </p>
            <h1 className="mt-4 text-[2.6rem] font-medium leading-[1.04] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[4.4vw]">
              <span data-hero="line" className="block">
                CreativeNext
              </span>
            </h1>
            <p data-hero="fade" className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-ink sm:text-lg lg:max-w-2xl">
              A community for India&apos;s creative economy, connecting the people who learn, teach, practice
              and hire creative work.
            </p>
            <div data-hero="fade" className="mt-8">
              <Link
                href="/contact"
                className="btn-glow inline-block rounded-md bg-ink px-6 py-2.5 text-[15px] font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                Join the community
              </Link>
            </div>
          </div>
        </section>

        {/* who it connects */}
        <section className="bg-surface pb-20 pt-14 md:pb-24 md:pt-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div data-reveal className="mx-auto max-w-2xl text-center">
              <h2 data-words className="text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-ink md:text-[2.75rem]">
                Who it connects
              </h2>
            </div>

            <div className="mt-10 md:mt-12">
              <PartnerCards partners={groups} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Motion />
    </>
  );
}
