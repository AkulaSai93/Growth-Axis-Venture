import type { ReactNode } from "react";

export type Partner = {
  name: string;
  description: string;
  /** partner website; cards without one render without the button */
  href?: string;
  /** the logo shown in the card's visual stage */
  mark: ReactNode;
  /** short focus tags arranged around the logo (optional) */
  tags?: string[];
  /** replaces the logo + tags stage entirely, for partners without a logo */
  visual?: ReactNode;
};

const cardClass =
  "group relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface p-3 transition-[translate,border-color] duration-300 ease-out hover:border-transparent motion-safe:hover:-translate-y-1.5";

/*
  Partner cards, styled exactly like the home page venture cards (hairline card,
  gradient ring + lift on hover, full-width dark button). The visual stage shows
  the partner's logo with its focus areas floating around it. Cards with a
  website link out to it in a new tab. `className` sets the grid (three columns
  by default).
*/
export default function PartnerCards({
  partners,
  className = "grid gap-5 lg:grid-cols-3",
}: {
  partners: Partner[];
  className?: string;
}) {
  return (
    <div data-stagger className={className}>
      {partners.map((p) =>
        p.href ? (
          <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
            <CardBody partner={p} />
          </a>
        ) : (
          <div key={p.name} className={cardClass}>
            <CardBody partner={p} />
          </div>
        ),
      )}
    </div>
  );
}

function CardBody({ partner: p }: { partner: Partner }) {
  return (
    <>
      <span aria-hidden className="gradient-ring z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative h-60 overflow-hidden rounded-md border border-line/60 transition-colors duration-300 group-hover:border-ink/15">
        <div className="absolute inset-0 transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]">
          <div data-drift className="absolute inset-0">
            {p.visual ?? <LogoVisual mark={p.mark} tags={p.tags ?? []} />}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-6">
        <h3 className="text-2xl font-medium tracking-[-0.03em] text-ink transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1">
          {p.name}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.description}</p>

        {p.href && (
          /* button styling on a span: the whole card is already the link */
          <span className="mt-auto block pt-7">
            <span className="btn-glow flex w-full items-center justify-center gap-2 rounded-md bg-ink px-6 py-2.5 text-[15px] font-medium text-white">
              Visit website
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
              <span className="sr-only">(opens in a new tab)</span>
            </span>
          </span>
        )}
      </div>
    </>
  );
}

/* corner slots for up to four tags; chips nudge outward on hover */
const slots = [
  "left-[6%] top-[13%] group-hover:-translate-x-1 group-hover:-translate-y-1",
  "right-[6%] top-[13%] group-hover:translate-x-1 group-hover:-translate-y-1",
  "left-[6%] bottom-[13%] group-hover:-translate-x-1 group-hover:translate-y-1",
  "right-[6%] bottom-[13%] group-hover:translate-x-1 group-hover:translate-y-1",
];
// with only three tags, the third sits centred along the bottom instead of in a corner
const bottomCentre = "left-1/2 bottom-[13%] -translate-x-1/2 group-hover:translate-y-1";

function LogoVisual({ mark, tags }: { mark: ReactNode; tags: string[] }) {
  return (
    <div className="absolute inset-0">
      {/* just the partner logo, centred in a fixed-size box it scales to fit
          without changing shape; the focus chips float around it */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid h-[84px] w-[200px] place-items-center transition-transform duration-500 group-hover:scale-105 [&_img]:h-auto [&_img]:w-auto [&_img]:max-w-full [&_img]:object-contain">
          {mark}
        </div>
      </div>

      {tags.slice(0, 4).map((t, i) => (
        <span
          key={t}
          className={`absolute inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-line bg-white px-2.5 py-1 text-[11.5px] font-medium tracking-[-0.01em] text-ink transition-transform duration-500 ease-out ${tags.length === 3 && i === 2 ? bottomCentre : slots[i]}`}
        >
          <span className="h-1 w-1 rounded-full bg-ink" />
          {t}
        </span>
      ))}
    </div>
  );
}

/*
  Line illustration for partners without a logo: an open storybook with ruled
  pages and a bookmark in the logo gradient. On card hover the pages lift a
  touch and the bookmark drops in.
*/
export function BookVisual() {
  const ink = "#15122b";
  return (
    <div className="absolute inset-0 grid place-items-center">
      <svg viewBox="0 0 220 150" className="h-[62%] w-auto overflow-visible" fill="none" aria-hidden>
        <defs>
          <linearGradient id="book-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f7943b" />
            <stop offset="50%" stopColor="#e2458e" />
            <stop offset="100%" stopColor="#7b5cf5" />
          </linearGradient>
        </defs>

        {/* soft base shadow line */}
        <path d="M30 136h160" stroke={ink} strokeOpacity="0.12" strokeLinecap="round" />

        {/* cover */}
        <path d="M18 34c34-10 66-8 92 6 26-14 58-16 92-6v92c-34-10-66-8-92 6-26-14-58-16-92-6z" fill="#fff" stroke={ink} strokeOpacity="0.85" strokeWidth="1.6" strokeLinejoin="round" />

        {/* pages lift on hover */}
        <g className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
          <path d="M26 30c30-9 59-6 84 8v90c-25-14-54-17-84-8z" fill="#fff" stroke={ink} strokeOpacity="0.55" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M194 30c-30-9-59-6-84 8v90c25-14 54-17 84-8z" fill="#fff" stroke={ink} strokeOpacity="0.55" strokeWidth="1.3" strokeLinejoin="round" />
          {/* ruled lines */}
          {[52, 64, 76, 88, 100].map((y, i) => (
            <g key={y} stroke={ink} strokeOpacity={i === 0 ? 0.55 : 0.22} strokeWidth={i === 0 ? 1.6 : 1.2} strokeLinecap="round">
              <path d={`M38 ${y - 4}c18-4 38-3 60 4`} />
              <path d={`M182 ${y - 4}c-18-4-38-3-60 4`} />
            </g>
          ))}
          {/* spine */}
          <path d="M110 38v90" stroke={ink} strokeOpacity="0.55" strokeWidth="1.3" />
        </g>

        {/* bookmark */}
        <path d="M150 22h14v34l-7-6-7 6z" fill="url(#book-mark)" className="transition-transform duration-500 ease-out group-hover:translate-y-1.5" />
      </svg>
    </div>
  );
}
