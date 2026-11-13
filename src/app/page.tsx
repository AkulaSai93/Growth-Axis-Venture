import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Motion from "@/components/Motion";
import WhatWeDo from "@/components/WhatWeDo";
import WhoWeAre from "@/components/WhoWeAre";

export default function Home() {
  return (
    <>
      <Header />
      {/* white page sits over the footer with a rounded bottom edge */}
      <main className="relative z-10 flex-1 overflow-hidden rounded-b-xl bg-surface">
        <Hero />
        <WhatWeDo />
        <WhoWeAre />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
