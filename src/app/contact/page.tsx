import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ContactHero from "@/components/ContactHero";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Motion from "@/components/Motion";

const EMAIL = "connect@growthaxisventures.com";

export const metadata: Metadata = {
  title: "Contact GrowthAxis Ventures",
  description:
    "Have an opportunity, challenge or idea worth exploring? Start a conversation with GrowthAxis Ventures.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      {/* white page sits over the footer with a rounded bottom edge (same as home) */}
      <main className="relative z-10 flex-1 overflow-hidden rounded-b-3xl bg-surface md:rounded-b-[40px]">
        <ContactHero />

        <section className="bg-surface px-5 pb-16 pt-12 sm:px-8 md:pb-20 md:pt-16">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            {/* "Let's explore" in the logo gradient, same as the button hover */}
            <h2 className="text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-ink md:text-[2.75rem]">
              <span className="text-brand">Let&apos;s explore</span> what&apos;s possible.
            </h2>
            <p className="mt-4 text-balance text-base leading-relaxed text-muted md:text-lg">
              Have an opportunity, challenge or idea worth exploring? Let&apos;s start a conversation.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 inline-flex items-center gap-2 text-[15px] font-medium text-ink transition-colors hover:text-muted"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
              </svg>
              {EMAIL}
            </a>
          </div>

          <div data-reveal className="mx-auto mt-8 max-w-3xl md:mt-10">
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
      <Motion />
    </>
  );
}
