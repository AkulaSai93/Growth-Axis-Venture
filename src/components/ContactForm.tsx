"use client";

import { useState, type FormEvent } from "react";

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
  GrowthAxis and pre-filled.
*/
export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

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
        <p role="status" className="text-center text-sm text-muted">
          {sent ? (
            <>
              Your email app should open with your message ready to send. If it doesn&apos;t, write to us at{" "}
              <a href={`mailto:${EMAIL}`} className="font-medium text-ink underline underline-offset-4">
                {EMAIL}
              </a>
              .
            </>
          ) : (
            "We usually reply within a working day."
          )}
        </p>
      </div>
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
