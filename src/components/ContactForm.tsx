"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const EMAIL = "connect@growthaxisventures.com";

type Fields = { name: string; organisation: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", organisation: "", email: "", message: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please tell us your name.";
  if (!f.email.trim()) e.email = "Please add your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "That email doesn't look right.";
  if (!f.message.trim()) e.message = "Tell us a little about what you'd like to explore.";
  return e;
}

/*
  Contact form with the live site's fields. There is no form backend yet, so on
  submit it opens the visitor's email app with the message addressed to
  GrowthAxis and pre-filled, clears the form and shows a thank-you popup
  (a native <dialog>, so Esc, focus and the backdrop are handled by the browser).
*/
export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // open the popup once a submission goes through
  useEffect(() => {
    if (sent) dialogRef.current?.showModal();
  }, [sent]);

  const set = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    const subject = `New enquiry from ${fields.name.trim()}${fields.organisation.trim() ? `, ${fields.organisation.trim()}` : ""}`;
    const body = [
      fields.message.trim(),
      "",
      fields.name.trim(),
      fields.organisation.trim(),
      fields.email.trim(),
    ]
      .filter((line, i, all) => line || all[i - 1] !== "")
      .join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFields(empty);
    setSent(true);
  }

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-lg border border-line bg-surface p-6 text-left sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name}>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={fields.name}
            onChange={set("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={inputClass(errors.name)}
          />
        </Field>
        <Field id="organisation" label="Organisation">
          <input
            id="contact-organisation"
            name="organisation"
            autoComplete="organization"
            placeholder="Institution / Company"
            value={fields.organisation}
            onChange={set("organisation")}
            className={inputClass()}
          />
        </Field>
        <Field id="email" label="Email" required error={errors.email} className="sm:col-span-2">
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@organisation.com"
            value={fields.email}
            onChange={set("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={inputClass(errors.email)}
          />
        </Field>
        <Field id="message" label="What would you like to explore?" required error={errors.message} className="sm:col-span-2">
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            placeholder="Tell us about the opportunity, challenge or idea."
            value={fields.message}
            onChange={set("message")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={`${inputClass(errors.message)} resize-y`}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          type="submit"
          className="btn-glow group inline-flex w-full items-center justify-center gap-2 rounded-md bg-ink px-6 py-3 text-[15px] font-medium text-white sm:w-auto sm:min-w-64"
        >
          Start the conversation
          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
        <p className="text-center text-sm text-muted">We usually reply within a working day.</p>
      </div>

      {/* thank-you popup */}
      <dialog
        ref={dialogRef}
        aria-labelledby="contact-success-title"
        onClose={() => setSent(false)}
        onClick={(e) => {
          // a click on the backdrop (outside the card) closes it
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="m-auto w-[min(92vw,420px)] rounded-lg border border-line bg-white p-0 text-center backdrop:bg-ink/45 backdrop:backdrop-blur-sm open:animate-[pop_0.25s_ease-out]"
      >
        <div className="px-7 pb-7 pt-9">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#22c55e] text-white">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m5.5 12.5 4 4 9-9" />
            </svg>
          </span>
          <h3 id="contact-success-title" className="mt-5 text-2xl font-medium tracking-[-0.03em] text-ink">
            Thank you!
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            Your response has been submitted successfully. We usually reply within a working day.
          </p>
          <button
            type="button"
            autoFocus
            onClick={() => dialogRef.current?.close()}
            className="btn-glow mt-6 inline-flex w-full items-center justify-center rounded-md bg-ink px-6 py-3 text-[15px] font-medium text-white"
          >
            Close
          </button>
        </div>
      </dialog>
    </form>
  );
}

function inputClass(error?: string) {
  return `block w-full rounded-md border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 outline-none transition-colors focus:border-ink ${
    error ? "border-brand-pink" : "border-line hover:border-ink/30"
  }`;
}

function Field({
  id,
  label,
  required = false,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={`contact-${id}`} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-muted"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`contact-${id}-error`} className="mt-2 text-sm text-brand-pink">
          {error}
        </p>
      )}
    </div>
  );
}
