import type { CSSProperties, ReactNode } from "react";

/*
  Coded visuals for the CreativeNext "Who it connects" cards, drawn in the same
  style as the AdmitBridge ACE model visuals (dashed connectors that flow on hover,
  a dark icon tile with a gradient detail, white chips with dots or ticks, one dark
  highlight chip, small stacked cards, a quiet uppercase caption), each with its
  own arrangement:
    Students               a vertical journey: Skills → Pathways → Careers
    Institutions           one campus fanning out to colleges, universities, schools
    Creative Professionals a practitioner profile with their disciplines
    Industry               studios linked to creative talent, "Matched"
  Labels come from each card's own description on the live site.
*/

const ink = "#15122b";

function Chip({
  children,
  className = "",
  dark = false,
  style,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  style?: CSSProperties;
}) {
  const tone = dark ? "border-ink bg-ink text-white" : "border-line bg-white text-ink";
  return (
    <span
      style={style}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-2.5 py-1 text-[11.5px] font-medium tracking-[-0.01em] transition-transform duration-500 ease-out ${tone} ${className}`}
    >
      {children}
    </span>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden>
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  );
}

function Dot() {
  return <span className="h-1 w-1 rounded-full bg-ink" />;
}

function Caption({ children }: { children: ReactNode }) {
  return (
    <p className="absolute bottom-[8%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
      {children}
    </p>
  );
}

/* dark icon tile; `accent` paths are stroked with the logo gradient */
function Tile({
  id,
  children,
  accent,
  className = "",
  style,
}: {
  id: string;
  children: ReactNode;
  accent?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={style}
      className={`grid h-12 w-12 place-items-center rounded-md bg-ink text-white transition-transform duration-500 group-hover:scale-105 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f7943b" />
            <stop offset="50%" stopColor="#e2458e" />
            <stop offset="100%" stopColor="#7b5cf5" />
          </linearGradient>
        </defs>
        {children}
        {accent && (
          <g stroke={`url(#${id})`} strokeWidth="2.1">
            {accent}
          </g>
        )}
      </svg>
    </div>
  );
}

const flow =
  "[animation:dash_1.2s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running]";

function Dashed({ d, opacity = 0.28 }: { d: string; opacity?: number }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={ink}
      strokeOpacity={opacity}
      strokeWidth="1"
      strokeDasharray="2 4"
      vectorEffect="non-scaling-stroke"
      className={flow}
    />
  );
}

/* ---------- Students: a vertical journey ---------- */

export function StudentsVisual() {
  const steps = [
    { label: "Skills", y: 20 },
    { label: "Pathways", y: 42 },
    { label: "Careers", y: 64, done: true },
  ];
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        <Dashed d="M38 20 V 64" />
        <Dashed d="M24 20 H 38" />
      </svg>
      {steps.map((s, i) => (
        <div
          key={s.label}
          style={{ top: `${s.y}%` }}
          className="absolute left-[38%] flex -translate-x-[5px] -translate-y-1/2 items-center gap-2.5"
        >
          <span className={`h-2.5 w-2.5 shrink-0 rounded-full border ${s.done ? "border-ink bg-ink" : "border-ink/40 bg-white"}`} />
          <Chip dark={s.done} className={`group-hover:translate-x-1 ${i === 1 ? "delay-75" : i === 2 ? "delay-150" : ""}`}>
            {s.done ? <Check /> : <Dot />}
            {s.label}
          </Chip>
        </div>
      ))}
      <Tile id="cn-cap" className="absolute left-[8%] top-[20%] h-10 w-10 -translate-y-1/2" accent={<path d="M19 11v4" />}>
        <path d="m2 9 10-5 10 5-10 5z" />
        <path d="M6 11v5c2 1.5 4 2 6 2s4-.5 6-2v-5" />
      </Tile>
      <Caption>Into the industry</Caption>
    </div>
  );
}

/* ---------- Institutions: one campus fanning out ---------- */

export function InstitutionsVisual() {
  const ends = [
    { label: "Colleges", y: 20 },
    { label: "Universities", y: 42 },
    { label: "Schools", y: 64 },
  ];
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        {ends.map((e) => (
          <Dashed key={e.y} d={`M28 42 C 38 42, 38 ${e.y}, 46 ${e.y}`} />
        ))}
      </svg>
      <Tile id="cn-inst" className="absolute left-[8%] top-[42%] -translate-y-1/2" accent={<path d="M3 9.5 12 4l9 5.5" />}>
        <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />
      </Tile>
      {ends.map((e, i) => (
        <Chip
          key={e.label}
          style={{ top: `${e.y}%` }}
          className={`absolute left-[46%] -translate-y-1/2 group-hover:translate-x-1 ${i === 1 ? "delay-75" : i === 2 ? "delay-150" : ""}`}
        >
          <Dot />
          {e.label}
        </Chip>
      ))}
      <Caption>Creative programmes</Caption>
    </div>
  );
}

/* ---------- Creative Professionals: a practitioner profile ---------- */

export function ProfessionalsVisual() {
  return (
    <div className="absolute inset-0 grid place-items-center pb-2">
      <div className="relative">
        {/* showreel card behind */}
        <div className="absolute -right-4 -top-5 h-24 w-32 rotate-[5deg] rounded-md border border-line bg-white transition-transform duration-500 group-hover:translate-x-1 group-hover:rotate-[7deg]">
          <div className="absolute inset-x-3 top-3 grid grid-cols-3 gap-1">
            <span className="h-6 rounded-sm bg-ink/[0.07]" />
            <span className="h-6 rounded-sm bg-ink/[0.12]" />
            <span className="h-6 rounded-sm bg-ink/[0.07]" />
          </div>
        </div>

        {/* profile card */}
        <div className="relative h-28 w-40 rounded-md border border-ink/20 bg-white p-3.5 transition-transform duration-500 group-hover:-translate-y-1">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink/[0.06]">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5" />
              </svg>
            </span>
            <span className="space-y-1.5">
              <span className="block h-1.5 w-16 rounded-full bg-ink/70" />
              <span className="block h-1.5 w-10 rounded-full bg-ink/15" />
            </span>
          </div>
          <div className="mt-3 flex gap-1">
            <Chip className="px-1.5 py-0.5 text-[10px]">Media</Chip>
            <Chip className="px-1.5 py-0.5 text-[10px]">Animation</Chip>
          </div>
          <Chip dark className="absolute -bottom-3 right-3">
            <Check />
            Film · Design
          </Chip>
        </div>

        {/* tiny gradient accent */}
        <span aria-hidden className="bg-brand absolute -left-2 -top-2 h-3 w-3 rounded-sm transition-transform duration-500 group-hover:rotate-45" />
      </div>
    </div>
  );
}

/* ---------- Industry: studios linked to creative talent ---------- */

export function IndustryVisual() {
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        <Dashed d="M34 38 H 62" opacity={0.32} />
      </svg>

      <Tile id="cn-studio" className="absolute left-[12%] top-[38%] -translate-y-1/2" accent={<path d="M3 12h18" />}>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5h8v2" />
      </Tile>

      <div className="absolute right-[8%] top-[38%] flex -translate-y-1/2 -space-x-2 transition-transform duration-500 group-hover:-translate-x-1">
        {[0.9, 0.6, 0.35].map((o, i) => (
          <span key={i} className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-ink/[0.07]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={ink} strokeOpacity={o} strokeWidth="1.8" aria-hidden>
              <circle cx="12" cy="8.5" r="3.5" />
              <path d="M5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5" />
            </svg>
          </span>
        ))}
      </div>

      <Chip dark className="absolute left-1/2 top-[66%] -translate-x-1/2 -translate-y-1/2 group-hover:-translate-y-[60%]">
        <Check />
        Matched with talent
      </Chip>
      <Caption>Studios · Organisations</Caption>
    </div>
  );
}
