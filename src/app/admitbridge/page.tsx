import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AcquisitionVisual, ConversionVisual, EnrollmentVisual } from "@/components/AceVisuals";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Motion from "@/components/Motion";
import PartnerCards, { type Partner } from "@/components/PartnerCards";
import loungePhoto from "../../../public/images/admitbridge-lounge.png";

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
        {/* hero: a people-free admissions lounge (Figma AI, node 51:2) fills the screen;
            its upper half is plain white wall, so the centred copy (from the live page)
            sits on it without an overlay */}
        <section className="relative isolate flex min-h-[max(100svh,600px)] justify-center overflow-hidden bg-[#e9e4df] px-5 pt-[clamp(120px,17vh,160px)] text-center sm:px-8">
          {/* phones and tablets: the lounge sits along the bottom (cropped to the armchairs and
              window) with its wall fading into a matching background, so the copy
              stays on plain wall; from lg up the photo fills the whole hero */}
          <div className="absolute inset-x-0 bottom-0 -z-10 aspect-[4/5] [mask-image:linear-gradient(to_bottom,transparent,black_22%)] sm:aspect-[3/2] lg:inset-0 lg:aspect-auto lg:[mask-image:none]">
            <Image
              src={loungePhoto}
              alt=""
              fill
              preload
              quality={90}
              placeholder="blur"
              sizes="100vw"
              data-hero="bg"
              className="object-cover object-[72%_100%] sm:object-[60%_100%] lg:object-[22%_60%]"
            />
          </div>

          <div data-hero-copy>
            <p data-hero="fade" className="text-sm font-medium text-ink/70">
              Built by GrowthAxis Ventures
            </p>
            <h1 className="mt-4 text-[2.6rem] font-medium leading-[1.04] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[4.4vw]">
              <span data-hero="line" className="block">
                AdmitBridge
              </span>
            </h1>
            <p data-hero="fade" className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-ink/80 sm:text-lg lg:max-w-2xl">
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
