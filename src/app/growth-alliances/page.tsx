import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Motion from "@/components/Motion";
import PartnerCards, { BookVisual, type Partner } from "@/components/PartnerCards";
import aeroLogo from "../../../public/partners/aero.png";
import upgradLogo from "../../../public/partners/upgrad-school-of-technology.png";
import zskillupLogo from "../../../public/partners/zskillup.png";
import atriumPhoto from "../../../public/images/growth-alliances-atrium.png";

export const metadata: Metadata = {
  title: "Growth Alliances | GrowthAxis Ventures",
  description:
    "We work alongside education and skilling organisations to take their programmes to the right institutions.",
};

/* Official partner logos, taken from each partner's own website (header logo). */
const universityPartners: Partner[] = [
  {
    name: "ZSkillup",
    description: "Creating industry-ready professionals through employability programmes for institutions.",
    href: "https://www.zskillup.com/",
    tags: ["Employability", "Industry-ready", "Institutions"],
    mark: <Image src={zskillupLogo} alt="ZSkillup logo" sizes="320px" className="max-h-9" />,
  },
  {
    name: "upGrad",
    description: "UGC-recognised B.Tech programmes with GenAI, Full Stack and Quantum specialisations.",
    href: "https://sot.upgrad.com/",
    tags: ["B.Tech", "GenAI", "Full Stack", "Quantum"],
    mark: <Image src={upgradLogo} alt="upGrad School of Technology logo" sizes="320px" className="max-h-12" />,
  },
  {
    name: "AERO",
    description: "Aviation education and research in India since 2008.",
    href: "https://aero.edu.in/",
    tags: ["Aviation", "Research", "Since 2008"],
    mark: <Image src={aeroLogo} alt="AERO, Aeronautical Engineering & Research Organisation logo" sizes="320px" className="max-h-10" />,
  },
];

/* School ecosystem: the live site lists the name only (no website or logo yet), so
   the card shows a book illustration instead of a logo and has no link. */
const schoolPartners: Partner[] = [
  {
    name: "The Inventory Story",
    description: "School ecosystem",
    mark: null,
    visual: <BookVisual />,
  },
];

export default function GrowthAlliancesPage() {
  return (
    <>
      <Header />
      {/* white page sits over the footer with a rounded bottom edge (same as home) */}
      <main className="relative z-10 flex-1 overflow-hidden rounded-b-3xl bg-surface md:rounded-b-[40px]">
        {/* hero: a people-free university atrium (Figma AI, node 50:2) fills the section;
            its upper half is calm white ceiling, so the centred copy (from the live
            page) sits on it without an overlay */}
        <section className="relative isolate flex min-h-[max(100svh,600px)] justify-center overflow-hidden bg-[#eae9e8] px-5 pt-[clamp(120px,17vh,160px)] text-center sm:px-8">
          <Image
            src={atriumPhoto}
            alt=""
            fill
            preload
            quality={90}
            placeholder="blur"
            sizes="100vw"
            data-hero="bg"
            className="-z-10 object-cover object-[55%_22%]"
          />

          <div data-hero-copy>
            <p data-hero="fade" className="text-sm font-medium text-ink/70">
              What we do
            </p>
            <h1 className="mt-4 text-[2.6rem] font-medium leading-[1.04] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[4.4vw]">
              <span data-hero="line" className="block">
                Growth Alliances
              </span>
            </h1>
            <p data-hero="fade" className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-ink/80 sm:text-lg lg:max-w-none lg:text-[1.3vw]">
              We work alongside education and skilling organisations
              <br className="hidden lg:block" /> to take their programmes to the right institutions.
            </p>
            <div data-hero="fade" className="mt-8">
              <Link
                href="/contact"
                className="btn-glow inline-block rounded-md bg-ink px-6 py-2.5 text-[15px] font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                Talk to us about an alliance
              </Link>
            </div>
          </div>
        </section>

        {/* university ecosystem partners */}
        <section className="bg-surface pb-12 pt-14 md:pb-16 md:pt-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div data-reveal className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium text-muted">Our alliances</p>
              <h2 data-words className="mt-3 text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-ink md:text-[2.75rem]">
                University ecosystem
              </h2>
            </div>

            <div className="mt-10 md:mt-12">
              <PartnerCards partners={universityPartners} />
            </div>
          </div>
        </section>

        {/* school ecosystem partners */}
        <section className="bg-surface pb-20 pt-4 md:pb-24 md:pt-6">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div data-reveal className="mx-auto max-w-2xl text-center">
              <h2 data-words className="text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-ink md:text-[2.75rem]">
                School ecosystem
              </h2>
            </div>

            <div className="mt-10 md:mt-12">
              <PartnerCards partners={schoolPartners} className="mx-auto grid max-w-sm" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Motion />
    </>
  );
}
