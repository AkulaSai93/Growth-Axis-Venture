import Image from "next/image";
import Link from "next/link";
import teamPhoto from "../../public/images/contact-team.png";

/*
  Contact hero: a full-bleed team photo (Figma AI, node 46:2) with the page title
  set large in white over a soft dark fade along the bottom, and a small
  breadcrumb on the right. The people sit in the right two-thirds of the photo,
  leaving the lower left calm for the title.
*/
export default function ContactHero() {
  return (
    <section className="relative isolate h-[clamp(460px,52vw,760px)] overflow-hidden bg-ink">
      <Image
        src={teamPhoto}
        alt="A small team gathered around a table, discussing a plan on a laptop and tablet"
        fill
        preload
        quality={90}
        placeholder="blur"
        sizes="100vw"
        data-hero="bg"
        className="-z-10 object-cover object-[70%_center]"
      />
      {/* legibility fade, only along the bottom where the title sits */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(10,9,21,0.72)_0%,rgba(10,9,21,0.25)_40%,transparent_70%)]" />

      <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-10 sm:px-8 md:pb-14">
        <div className="flex items-end justify-between gap-6">
          <h1 data-hero="line" className="text-[clamp(52px,10vw,148px)] font-medium leading-[0.9] tracking-[-0.05em] text-white">
            Contact us
          </h1>
          <nav data-hero="fade" aria-label="Breadcrumb" className="mb-3 hidden shrink-0 text-sm text-white/80 sm:block">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span className="mx-2 text-white/50">/</span>
            <span className="text-white">Contact</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
