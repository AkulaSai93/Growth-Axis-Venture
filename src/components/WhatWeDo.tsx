import Link from "next/link";
import type { ReactNode } from "react";

type Venture = {
  no: string;
  name: string;
  audience: string;
  description: string;
  href: string;
  visual: ReactNode;
};

const ventures: Venture[] = [
  {
    no: "01",
    name: "Growth Alliances",
    audience: "For education & skilling organisations",
    description:
      "We work alongside education and skilling organisations to take their programmes to the right institutions.",
    href: "/growth-alliances",
    visual: <AlliancesVisual />,
  },
  {
    no: "02",
    name: "AdmitBridge",
    audience: "For institutions",
    description:
      "Your extended admissions team — course-specific pods working under your institution's identity, from first enquiry to enrolment.",
    href: "/admitbridge",
    visual: <FunnelVisual />,
  },
  {
    no: "03",
    name: "CreativeNext",
    audience: "For the creative economy",
    description:
      "A community for India's creative economy — connecting students, institutions, creative professionals and industry.",
    href: "/creativenext",
    visual: <OrbitVisual />,
  },
];

export default function WhatWeDo() {
  return (
    <section id="ventures" className="scroll-mt-24 bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="text-sm font-medium text-muted">What we do</p>
            <h2 className="mt-4 text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-ink md:text-[3.25rem]">
              Three ventures.
              <br />
              <span className="text-ink/45">One growth axis.</span>
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-muted md:justify-self-end">
            Each venture solves one part of the same problem — connecting the right
            programmes, students and talent to the institutions that need them.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:mt-16 lg:grid-cols-3">
          {ventures.map((v) => (
            <Link
              key={v.no}
              href={v.href}
              className="group flex flex-col rounded-lg border border-line bg-surface p-3 transition-all hover:-translate-y-1 hover:border-ink/15 hover:shadow-xl hover:shadow-ink/5"
            >
              {/* visual stage with a faint dot grid */}
              <div className="relative h-60 overflow-hidden rounded-md bg-canvas [background-image:radial-gradient(rgba(21,18,43,0.09)_1px,transparent_1px)] [background-size:14px_14px]">
                {v.visual}
              </div>

              <div className="flex flex-1 flex-col px-3 pb-3 pt-6">
                <div className="flex items-center justify-between text-xs text-muted">
                  <span className="font-medium text-ink">{v.no}</span>
                  <span>{v.audience}</span>
                </div>
                <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-ink">{v.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{v.description}</p>

                <span className="mt-auto flex items-center justify-between border-t border-line pt-5 text-sm font-medium text-ink">
                  Learn more
                  <span className="grid h-8 w-8 place-items-center rounded-md border border-line transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M7 17 17 7M8 7h9v9" />
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

/* ---------- 01 · Growth Alliances: a connection map ---------- */

function AlliancesVisual() {
  const partners = [
    { label: "Universities", pos: "left-[6%] top-[14%]", end: [22, 22] },
    { label: "Skilling orgs", pos: "right-[6%] top-[14%]", end: [78, 22] },
    { label: "Programmes", pos: "left-[6%] bottom-[14%]", end: [22, 78] },
    { label: "Colleges", pos: "right-[6%] bottom-[14%]", end: [78, 78] },
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
            stroke="#15122b"
            strokeOpacity="0.35"
            strokeWidth="1.25"
            strokeDasharray="3 4"
            vectorEffect="non-scaling-stroke"
            className="[animation:dash_1.2s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running]"
          />
        ))}
      </svg>

      {/* hub */}
      <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg bg-ink shadow-lg shadow-ink/25 transition-transform duration-500 group-hover:scale-110">
        <svg viewBox="0 0 12 12" className="h-5 w-5" aria-hidden>
          <defs>
            <linearGradient id="hub-arrow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f7943b" />
              <stop offset="50%" stopColor="#e2458e" />
              <stop offset="100%" stopColor="#7b5cf5" />
            </linearGradient>
          </defs>
          <path d="M0 0h12v12L8 8V4H4z" fill="url(#hub-arrow)" />
        </svg>
        <span className="absolute -inset-2 -z-10 rounded-xl border border-ink/10" />
      </div>

      {partners.map((p) => (
        <span
          key={p.label}
          className={`absolute ${p.pos} flex items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1.5 text-[12px] font-medium text-ink shadow-sm`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ink" />
          {p.label}
        </span>
      ))}
    </div>
  );
}

/* ---------- 02 · AdmitBridge: an admissions funnel ---------- */

function FunnelVisual() {
  const stages = [
    { label: "Enquiry", width: "w-full", tone: "bg-ink/10 text-ink" },
    { label: "Counselling", width: "w-[82%]", tone: "bg-ink/25 text-ink" },
    { label: "Application", width: "w-[64%]", tone: "bg-ink/55 text-white" },
    { label: "Enrolled", width: "w-[46%]", tone: "bg-ink text-white" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-8">
      {stages.map((s, i) => (
        <div
          key={s.label}
          style={{ transitionDelay: `${i * 60}ms` }}
          className={`flex h-9 max-w-[280px] items-center justify-between rounded-md px-3 text-[12px] font-medium transition-transform duration-500 group-hover:scale-x-[1.03] ${s.width} ${s.tone}`}
        >
          <span>{s.label}</span>
          {i === stages.length - 1 ? (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden>
              <path d="m3.5 8.5 3 3 6-7" />
            </svg>
          ) : (
            <span className="opacity-50">0{i + 1}</span>
          )}
        </div>
      ))}
      <span className="mt-2 rounded-sm border border-line bg-surface px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
        Course-specific pod
      </span>
    </div>
  );
}

/* ---------- 03 · CreativeNext: a community orbit ---------- */

function OrbitVisual() {
  const fields = [
    { label: "Design", pos: "left-[50%] top-[2%] -translate-x-1/2" },
    { label: "Film", pos: "right-[0%] top-[50%] -translate-y-1/2" },
    { label: "Music", pos: "left-[50%] bottom-[2%] -translate-x-1/2" },
    { label: "Media", pos: "left-[0%] top-[50%] -translate-y-1/2" },
  ];
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative aspect-square h-[88%]">
        {/* rings + travelling dots */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full [animation:spin_24s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running]"
          aria-hidden
        >
          <circle cx="100" cy="100" r="88" fill="none" stroke="#15122b" strokeOpacity="0.12" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#15122b" strokeOpacity="0.16" strokeDasharray="2 4" />
          <circle cx="100" cy="100" r="34" fill="none" stroke="#15122b" strokeOpacity="0.2" />
          <circle cx="160" cy="100" r="4" fill="#15122b" />
          <circle cx="58" cy="58" r="3" fill="#15122b" fillOpacity="0.5" />
          <circle cx="100" cy="188" r="3" fill="#15122b" fillOpacity="0.35" />
          <circle cx="76" cy="124" r="3.5" fill="#15122b" fillOpacity="0.7" />
        </svg>

        {/* centre */}
        <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-[11px] font-semibold tracking-wide text-white shadow-lg shadow-ink/25">
          CN
        </div>

        {fields.map((f) => (
          <span
            key={f.label}
            className={`absolute ${f.pos} rounded-md border border-line bg-surface px-2.5 py-1 text-[12px] font-medium text-ink shadow-sm`}
          >
            {f.label}
          </span>
        ))}
      </div>
    </div>
  );
}
