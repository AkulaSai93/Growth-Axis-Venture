import type { ReactNode } from "react";

/*
  Coded visuals for the AdmitBridge ACE model cards, in the same hairline style as
  the home page venture visuals: ink lines and white chips, the logo gradient
  only as a tiny accent, a little motion on card hover.
*/

const ink = "#15122b";

function Chip({ children, className = "", dark = false }: { children: ReactNode; className?: string; dark?: boolean }) {
  const tone = dark ? "border-ink bg-ink text-white" : "border-line bg-white text-ink";
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-2.5 py-1 text-[11.5px] font-medium tracking-[-0.01em] ${tone} ${className}`}
    >
      {children}
    </span>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`h-3 w-3 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden>
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  );
}

/* 01 · Acquisition & Verification: many enquiries flow in, a verified few come out */
export function AcquisitionVisual() {
  const sources = [18, 34, 50, 66, 82];
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        {sources.map((y) => (
          <path
            key={y}
            d={`M14 ${y} C 32 ${y}, 34 50, 46 50`}
            fill="none"
            stroke={ink}
            strokeOpacity="0.28"
            strokeWidth="1"
            strokeDasharray="2 4"
            vectorEffect="non-scaling-stroke"
            className="[animation:dash_1.2s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running]"
          />
        ))}
        <path d="M58 50 H 74" fill="none" stroke={ink} strokeOpacity="0.6" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* incoming enquiries */}
      {sources.map((y, i) => (
        <span
          key={y}
          style={{ top: `${y}%`, transitionDelay: `${i * 50}ms` }}
          className="absolute left-[10%] h-2 w-2 -translate-y-1/2 rounded-full border border-ink/40 bg-white transition-transform duration-500 group-hover:translate-x-1"
        />
      ))}

      {/* verification gate */}
      <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md bg-ink text-white transition-transform duration-500 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z" />
          <path d="m9 12 2 2 4-4.5" stroke="url(#ace-gate)" strokeWidth="2.2" />
          <defs>
            <linearGradient id="ace-gate" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f7943b" />
              <stop offset="50%" stopColor="#e2458e" />
              <stop offset="100%" stopColor="#7b5cf5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* qualified lead out */}
      <Chip className="absolute right-[6%] top-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:translate-x-1">
        <Check />
        Verified
      </Chip>
      <p className="absolute bottom-[9%] left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
        Genuine interest only
      </p>
    </div>
  );
}

/* 02 · Conversion: counselling and nurturing move interest along to application */
export function ConversionVisual() {
  const steps = [
    { label: "Enquiry", done: true },
    { label: "Counselling", done: true },
    { label: "Application", done: false },
  ];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8">
      {/* counselling conversation */}
      <div className="flex w-full max-w-[230px] flex-col gap-1.5">
        <span className="w-fit max-w-[80%] rounded-md rounded-bl-sm border border-line bg-white px-2.5 py-1.5 text-[11px] text-ink transition-transform duration-500 group-hover:-translate-x-0.5">
          Which course fits my goals?
        </span>
        <span className="ml-auto w-fit max-w-[80%] rounded-md rounded-br-sm bg-ink px-2.5 py-1.5 text-[11px] text-white transition-transform delay-75 duration-500 group-hover:translate-x-0.5">
          Let&apos;s map it out together.
        </span>
      </div>

      {/* progress along the journey */}
      <div className="w-full max-w-[250px]">
        <div className="relative h-px bg-line">
          <span className="absolute inset-y-0 left-0 w-1/2 origin-left bg-ink transition-transform duration-700 ease-out group-hover:scale-x-[1.6]" />
        </div>
        <div className="-mt-[5px] flex justify-between">
          {steps.map((s) => (
            <span key={s.label} className="flex flex-col items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full border ${s.done ? "border-ink bg-ink" : "border-ink/40 bg-white"}`} />
              <span className="text-[10.5px] font-medium text-ink">{s.label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 03 · Enrollment: a confirmed admission becomes a completed enrolment */
export function EnrollmentVisual() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative">
        {/* admission letter behind */}
        <div className="absolute -left-6 -top-4 h-28 w-44 rotate-[-6deg] rounded-md border border-line bg-white transition-transform duration-500 group-hover:-translate-x-1 group-hover:rotate-[-8deg]">
          <span className="absolute left-4 top-4 h-1.5 w-16 rounded-full bg-ink/15" />
          <span className="absolute left-4 top-8 h-1.5 w-24 rounded-full bg-ink/10" />
        </div>

        {/* enrolment card */}
        <div className="relative h-32 w-52 rounded-md border border-ink/20 bg-white p-4 transition-transform duration-500 group-hover:-translate-y-1">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink/[0.06]">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5" />
              </svg>
            </span>
            <span className="space-y-1.5">
              <span className="block h-1.5 w-20 rounded-full bg-ink/70" />
              <span className="block h-1.5 w-14 rounded-full bg-ink/15" />
            </span>
          </div>
          <div className="mt-4 space-y-1.5">
            <span className="block h-1.5 w-full rounded-full bg-ink/10" />
            <span className="block h-1.5 w-3/4 rounded-full bg-ink/10" />
          </div>
          <Chip dark className="absolute -bottom-3 right-4">
            <Check />
            Enrolled
          </Chip>
        </div>

        {/* tiny gradient accent */}
        <span aria-hidden className="bg-brand absolute -right-2 -top-2 h-3 w-3 rounded-sm transition-transform duration-500 group-hover:rotate-45" />
      </div>
    </div>
  );
}
