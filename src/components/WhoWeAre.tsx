import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import ajayThomas from "../../public/team/ajay-thomas.webp";
import prabhatRanjan from "../../public/team/prabhat-ranjan.webp";

type Person = {
  name: string;
  initials: string;
  role: string;
  bio?: string;
  linkedin: string;
  photo?: StaticImageData;
};

const team: Person[] = [
  {
    name: "Prabhat Ranjan Singh",
    initials: "PR",
    role: "Founder",
    bio: "Prabhat leads GrowthAxis' work with institutions and organisations, across admissions, alliances, talent and operations.",
    linkedin: "https://www.linkedin.com/in/prabhat-ranjan-96804336/",
    photo: prabhatRanjan,
  },
  {
    name: "Ajay Thomas",
    initials: "AT",
    role: "Advisor",
    linkedin: "https://www.linkedin.com/in/ajay-thomas-784a324/",
    photo: ajayThomas,
  },
  {
    name: "Shiva Gupta",
    initials: "SG",
    role: "Advisor",
    linkedin: "https://www.linkedin.com/in/shivapgupta/",
  },
];

const [founder, ...advisors] = team;

const experience = [
  { years: "25", label: "years in Sales & Business Development" },
  { years: "25", label: "years in Sales & Higher Education Marketing" },
];

/* Used on home (with a link through to /about) and on /about itself (without it). */
export default function WhoWeAre({ showMoreLink = true }: { showMoreLink?: boolean }) {
  return (
    <section id="team" className="scroll-mt-24 bg-surface pb-20 pt-10 md:pb-28 md:pt-12">
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        <p data-reveal className="text-sm font-medium text-muted">Who we are</p>
        <h2 data-words className="mt-3 text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-ink md:text-[2.75rem]">
          A partner, not an outside vendor.
        </h2>

        {/* experience */}
        <dl data-stagger className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-6 sm:flex-row sm:gap-0 sm:divide-x sm:divide-line">
          {experience.map((e) => (
            <div key={e.label} className="flex items-center gap-3 sm:px-10">
              <dt data-count className="text-5xl font-medium tabular-nums tracking-[-0.04em] text-ink">{e.years}</dt>
              <dd className="max-w-[11rem] text-left text-sm leading-snug text-muted">{e.label}</dd>
            </div>
          ))}
        </dl>

        {/* team: founder card + stacked advisors */}
        <div data-stagger className="mt-12 grid gap-5 text-left md:mt-14 lg:grid-cols-3">
          <article className="grid overflow-hidden rounded border border-line bg-surface sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:col-span-2">
            <Portrait
              person={founder}
              sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 100vw"
              className="aspect-square sm:aspect-auto sm:min-h-80"
            />
            <div className="flex flex-col p-7 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">{founder.role}</p>
              <h3 className="mt-3 text-3xl font-medium tracking-[-0.03em] text-ink">{founder.name}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{founder.bio}</p>
              <LinkedIn href={founder.linkedin} name={founder.name} className="mt-auto pt-8" />
            </div>
          </article>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {advisors.map((a) => (
              <article key={a.name} className="flex items-center gap-5 rounded border border-line bg-surface p-5">
                <Portrait person={a} sizes="96px" className="h-24 w-24 shrink-0 rounded-sm" small />
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">{a.role}</p>
                  <h3 className="mt-1.5 truncate text-xl font-medium tracking-[-0.02em] text-ink">{a.name}</h3>
                  <LinkedIn href={a.linkedin} name={a.name} className="mt-2" />
                </div>
              </article>
            ))}
          </div>
        </div>

        {showMoreLink && (
          <div data-reveal className="mt-10">
            <Link
              href="/about"
              className="btn-glow group inline-flex items-center gap-2 rounded-md bg-ink px-6 py-2.5 text-[15px] font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              More about GrowthAxis
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

/* Photo when we have one, otherwise an initials tile. */
function Portrait({
  person,
  sizes,
  className = "",
  small = false,
}: {
  person: Person;
  sizes: string;
  className?: string;
  small?: boolean;
}) {
  if (person.photo) {
    return (
      <div data-wipe className={`relative overflow-hidden bg-ink ${className}`}>
        <Image
          src={person.photo}
          alt={`${person.name}, ${person.role} at GrowthAxis Ventures`}
          fill
          sizes={sizes}
          placeholder="blur"
          className="object-cover object-top"
        />
      </div>
    );
  }
  return (
    <div
      data-wipe
      className={`relative grid place-items-center overflow-hidden bg-ink [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:14px_14px] ${className}`}
      aria-hidden
    >
      <span className={`font-medium tracking-[-0.04em] text-white ${small ? "text-2xl" : "text-7xl"}`}>{person.initials}</span>
      <svg viewBox="0 0 12 12" className={`absolute ${small ? "right-2 top-2 h-2 w-2" : "right-5 top-5 h-3 w-3"}`}>
        <defs>
          <linearGradient id={`portrait-arrow-${person.initials}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f7943b" />
            <stop offset="50%" stopColor="#e2458e" />
            <stop offset="100%" stopColor="#7b5cf5" />
          </linearGradient>
        </defs>
        <path d="M0 0h12v12L8 8V4H4z" fill={`url(#portrait-arrow-${person.initials})`} />
      </svg>
    </div>
  );
}

function LinkedIn({ href, name, className = "" }: { href: string; name: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on LinkedIn`}
      className={`inline-flex items-center gap-2 text-sm font-medium text-[#0a66c2] transition-colors hover:text-[#004182] ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      </svg>
      LinkedIn
    </a>
  );
}
