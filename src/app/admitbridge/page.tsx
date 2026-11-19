import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AcquisitionVisual, ConversionVisual, EnrollmentVisual } from "@/components/AceVisuals";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Motion from "@/components/Motion";
import PartnerCards, { type Partner } from "@/components/PartnerCards";
import graduationPhoto from "../../../public/images/admitbridge-graduation.png";

export const metadata: Metadata = {
  title: "AdmitBridge | Extended Admissions Sales Team",
  description:
    "Your Extended Admissions Sales Team, powered by specialised, course-specific Pods and the ACE model.",
};

/* The ACE model (content from the live page), each step with its own coded visual */
const ace: Partner[] = [
  {
    name: "Acquisition & Verification",
    description: "Reaching prospective students and qualifying genuine interest before it enters the funnel.",
    mark: null,
    visual: <AcquisitionVisual />,
  },
  {
    name: "Conversion",
    description:
      "Structured counselling and continuous nurturing that moves real interest towards application and admission.",
    mark: null,
    visual: <ConversionVisual />,
  },
  {
    name: "Enrollment",
    description: "Focused follow-through that turns confirmed admissions into completed enrolments.",
    mark: null,
    visual: <EnrollmentVisual />,
  },
];

export default function AdmitBridgePage() {
  return (
    <>
      <Header />
      {/* white page sits over the footer with a rounded bottom edge (same as home) */}
      <main className="relative z-10 flex-1 overflow-hidden rounded-b-3xl bg-surface md:rounded-b-[40px]">
        {/* hero: graduation caps tossed in an arc against a soft daytime sky, no people
            (Figma AI, node 62:3). Behind the copy the sky stays clear to 60% down the
            photo (~22.2vw above the hero bottom); caps only reach the sides higher up.
            The photo runs full width along the bottom; its upper part is open sky,
            so the centred copy (from the live page) sits on it with no overlay.
            The section's background is that sky colour and the photo's top
            edge fades into it, so the hero can fill the screen at any size. On phones
            and tablets the photo is cropped tighter (4:5, 4:3) so its subject stays
            a readable size, and the phone hero is a compact 680px. */}
        <section className="relative isolate flex min-h-[680px] justify-center overflow-hidden bg-[#92c8f8] px-5 pt-[clamp(120px,17vh,160px)] text-center sm:min-h-[max(100svh,600px)] sm:px-8 lg:min-h-[max(100svh,56.25vw,calc(22.2vw_+_400px))]">
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 -z-10 aspect-[4/5] [mask-image:linear-gradient(to_bottom,transparent,black_10%)] sm:aspect-[4/3] lg:aspect-video"
          >
            <Image
              src={graduationPhoto}
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
                AdmitBridge
              </span>
            </h1>
            <p data-hero="fade" className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-ink sm:text-lg lg:max-w-2xl">
              Your Extended Admissions Sales Team, powered by specialised, course-specific Pods and the ACE model.
              {" "}Dedicated Pods work under the institution&apos;s identity, managing the
              journey from enquiry to enrolment.
            </p>
            <div data-hero="fade" className="mt-8">
              <Link
                href="/contact"
                className="btn-glow inline-block rounded-md bg-ink px-6 py-2.5 text-[15px] font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                Talk to us about admissions
              </Link>
            </div>
          </div>
        </section>

        {/* the ACE model */}
        <section className="bg-surface pb-20 pt-14 md:pb-24 md:pt-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div data-reveal className="mx-auto max-w-2xl text-center">
              <h2 data-words className="text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-ink md:text-[2.75rem]">
                The ACE model
              </h2>
            </div>

            <div className="mt-10 md:mt-12">
              <PartnerCards partners={ace} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Motion />
    </>
  );
}
