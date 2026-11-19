import Link from "next/link";
import type { ReactNode } from "react";

type Venture = {
  no: string;
  name: string;
  description: string;
  href: string;
  visual: ReactNode;
};

const ventures: Venture[] = [
  {
    no: "01",
    name: "Growth Alliances",
    description:
      "We work alongside education and skilling organisations to take their programmes to the right institutions.",
    href: "/growth-alliances",
    visual: <AlliancesVisual />,
  },
  {
    no: "02",
    name: "AdmitBridge",
    description:
      "Your extended admissions team, with course-specific pods working under your institution's identity, from first enquiry to enrolment.",
    href: "/admitbridge",
    visual: <FunnelVisual />,
  },
  {
    no: "03",
    name: "CreativeNext",
    description:
      "A community for India's creative economy, connecting students, institutions, creative professionals and industry.",
    href: "/creativenext",
    visual: <OrbitVisual />,
  },
];

export default function WhatWeDo() {
  return (
    <section id="ventures" className="scroll-mt-24 bg-surface pb-10 pt-20 md:pb-12 md:pt-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-muted">What we do</p>
          <h2 data-words className="mt-3 text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-ink md:text-[2.75rem]">
            Three ventures. One growth axis.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Connecting the right programmes, students and talent to the institutions that
            need them.
          </p>
        </div>

        <div data-stagger className="mt-14 grid gap-5 md:mt-16 lg:grid-cols-3">
          {ventures.map((v) => (
            <Link
              key={v.no}
              href={v.href}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface p-3 transition-[translate,border-color] duration-300 ease-out hover:border-transparent motion-safe:hover:-translate-y-1.5"
            >
              {/* hover: a hairline of the logo gradient around the whole card */}
              <span aria-hidden className="gradient-ring z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* visual stage: plain white; the diagram eases in a touch on hover */}
              <div className="relative h-60 overflow-hidden rounded-md border border-line/60 transition-colors duration-300 group-hover:border-ink/15">
                <div className="absolute inset-0 transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]">
                  <div data-drift className="absolute inset-0">
                    {v.visual}
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col pt-6">
                <h3 className="text-2xl font-medium tracking-[-0.03em] text-ink transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1">
                  {v.name}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{v.description}</p>

                {/* button styling on a span: the whole card is already the link */}
                <span className="mt-auto block pt-7">
                  <span className="flex w-full items-center justify-center gap-2 btn-glow rounded-md bg-ink px-6 py-2.5 text-[15px] font-medium text-white">
                    Learn more
                    <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const ink = "#15122b";

/* hairline label chip, no shadow */
function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-line bg-white px-2.5 py-1 text-[11.5px] font-medium tracking-[-0.01em] text-ink ${className}`}
    >
      {children}
    </span>
  );
}

/* ---------- 01 · Growth Alliances: partners around GrowthAxis ---------- */

function AlliancesVisual() {
  const partners = [
    { label: "Universities", pos: "left-[7%] top-[15%] group-hover:-translate-x-1 group-hover:-translate-y-1", end: [24, 22] },
    { label: "Skilling orgs", pos: "right-[7%] top-[15%] group-hover:translate-x-1 group-hover:-translate-y-1", end: [76, 22] },
    { label: "Programmes", pos: "left-[7%] bottom-[15%] group-hover:-translate-x-1 group-hover:translate-y-1", end: [24, 78] },
    { label: "Colleges", pos: "right-[7%] bottom-[15%] group-hover:translate-x-1 group-hover:translate-y-1", end: [76, 78] },
  ];
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        {partners.map((p) => (
          <line
            key={p.label}
            x1="50"
            y1="50"
            x2={p.end[0]}
            y2={p.end[1]}
            stroke={ink}
            strokeOpacity="0.3"
            strokeWidth="1"
            strokeDasharray="2 4"
            vectorEffect="non-scaling-stroke"
            className="[animation:dash_1.2s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running]"
          />
        ))}
      </svg>

      {/* hub with quiet concentric frames */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span aria-hidden className="absolute -inset-6 rounded-xl border border-ink/[0.06] bg-white" />
        <span aria-hidden className="absolute -inset-3 rounded-lg border border-ink/10" />
        <div className="relative grid h-12 w-12 place-items-center rounded-md bg-ink transition-transform duration-500 group-hover:scale-105">
          <svg viewBox="0 0 12 12" className="h-4 w-4" aria-hidden>
            <defs>
              <linearGradient id="hub-arrow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f7943b" />
                <stop offset="50%" stopColor="#e2458e" />
                <stop offset="100%" stopColor="#7b5cf5" />
              </linearGradient>
            </defs>
            <path d="M0 0h12v12L8 8V4H4z" fill="url(#hub-arrow)" />
          </svg>
        </div>
      </div>

      {partners.map((p) => (
        <Chip key={p.label} className={`absolute transition-transform duration-500 ease-out ${p.pos}`}>
          <span className="h-1 w-1 rounded-full bg-ink" />
          {p.label}
        </Chip>
      ))}
    </div>
  );
}

/* ---------- 02 · AdmitBridge: an admissions funnel ---------- */

function FunnelVisual() {
  const stages = [
    { label: "Enquiry", width: "w-full", tone: "border-line bg-white text-ink" },
    { label: "Counselling", width: "w-[84%]", tone: "border-ink/20 bg-white text-ink" },
    { label: "Application", width: "w-[68%]", tone: "border-ink/60 bg-white text-ink" },
    { label: "Enrolled", width: "w-[52%]", tone: "border-ink bg-ink text-white" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-9">
      <div className="flex w-full max-w-[260px] flex-col items-center gap-1.5">
        {stages.map((s, i) => (
          <div
            key={s.label}
            style={{ transitionDelay: `${i * 60}ms` }}
            className={`flex h-8 items-center justify-between rounded-md border px-3 text-[11.5px] font-medium tracking-[-0.01em] transition-[translate,scale] duration-500 ease-out group-hover:scale-x-[1.03] group-hover:-translate-y-0.5 ${s.width} ${s.tone}`}
          >
            <span>{s.label}</span>
            {i === stages.length - 1 ? (
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden>
                <path d="m3.5 8.5 3 3 6-7" />
              </svg>
            ) : (
              <span className="tabular-nums opacity-40">0{i + 1}</span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">Course-specific pods</p>
    </div>
  );
}

/* ---------- 03 · CreativeNext: a community orbit ---------- */

function OrbitVisual() {
  const fields = [
    { label: "Design", pos: "left-1/2 top-[3%] -translate-x-1/2" },
    { label: "Film", pos: "right-[1%] top-1/2 -translate-y-1/2" },
    { label: "Music", pos: "left-1/2 bottom-[3%] -translate-x-1/2" },
    { label: "Media", pos: "left-[1%] top-1/2 -translate-y-1/2" },
  ];
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative aspect-square h-[86%]">
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
          <circle cx="100" cy="100" r="86" fill="none" stroke={ink} strokeOpacity="0.1" />
          <circle cx="100" cy="100" r="60" fill="none" stroke={ink} strokeOpacity="0.14" strokeDasharray="1.5 4" />
          <circle cx="100" cy="100" r="36" fill="#fff" stroke={ink} strokeOpacity="0.12" />
          <g className="origin-center transition-transform duration-[1200ms] ease-out [transform-box:view-box] group-hover:rotate-45">
            <circle cx="160" cy="100" r="3.5" fill={ink} />
            <circle cx="57.6" cy="57.6" r="2.5" fill={ink} fillOpacity="0.45" />
            <circle cx="78" cy="131" r="3" fill={ink} fillOpacity="0.7" />
          </g>
        </svg>

        <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-[10.5px] font-semibold tracking-[0.06em] text-white">
          CN
        </div>

        {fields.map((f) => (
          <Chip key={f.label} className={`absolute ${f.pos}`}>
            {f.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
