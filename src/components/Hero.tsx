import Image from "next/image";
import libraryAtrium from "../../public/images/hero-library.png";

/*
  From lg up the hero takes the photo's own 16:9 shape, so the photo fills it
  edge to edge without any cropping, with the copy centred over a dark
  overlay (the students sit low, heads ~79% down, so it clears them). Below lg the
  copy sits on a dark band with the full photo underneath.
*/
export default function Hero() {
  return (
    <section className="relative isolate flex flex-col overflow-hidden bg-ink lg:block lg:aspect-video">
      {/* phones/tablets only: blurred backdrop behind the stacked layout */}
      <div aria-hidden className="absolute inset-0 -z-20 lg:hidden">
        <Image src={libraryAtrium} alt="" fill sizes="50vw" className="scale-110 object-cover opacity-50 blur-3xl" />
        <div className="absolute inset-0 bg-ink/70" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-28 text-center sm:px-8 lg:absolute lg:inset-0 lg:flex lg:max-w-none lg:flex-col lg:items-center lg:justify-center lg:pb-[8vw] lg:pt-16">
        <h1 className="animate-rise mx-auto text-[2.25rem] font-medium leading-[1.05] tracking-[-0.045em] text-white [animation-delay:80ms] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] sm:text-[3.25rem] lg:text-[4.1vw]">
          Building growth for institutions.
          <br />
          <span className="text-white/80">Creating opportunities for people.</span>
        </h1>

        <p className="animate-rise mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/95 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)] sm:text-lg lg:mt-[1.6vw] lg:max-w-[56vw] lg:text-[clamp(16px,1.3vw,24px)] lg:leading-[1.55] [animation-delay:160ms]">
          GrowthAxis Ventures works with education institutions, skilling organisations and the
          creative ecosystem to build partnerships, strengthen admissions and unlock new
          opportunities.
        </p>
      </div>

      {/* the full photo: in flow below lg, the whole background from lg up */}
      <div className="animate-rise relative mx-5 mb-10 mt-8 aspect-video overflow-hidden rounded-lg border border-white/10 shadow-2xl shadow-black/40 [animation-delay:240ms] sm:mx-8 lg:absolute lg:inset-0 lg:-z-10 lg:m-0 lg:aspect-auto lg:rounded-none lg:border-0 lg:shadow-none">
        <Image
          src={libraryAtrium}
          alt="Students studying in a bright, modern university library atrium"
          fill
          preload
          quality={90}
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
        {/* the atrium is bright: an even dark overlay plus a deeper glow behind the centred copy */}
        <div aria-hidden className="absolute inset-0 hidden bg-black/65 lg:block" />
        <div aria-hidden className="absolute inset-0 hidden bg-[radial-gradient(ellipse_55%_42%_at_50%_45%,rgba(0,0,0,0.6),transparent)] lg:block" />
      </div>
    </section>
  );
}
