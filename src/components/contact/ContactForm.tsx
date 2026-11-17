"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useRef, useState } from "react";
import { LIMITS, validateContact, type ContactErrors, type ContactInput } from "@/lib/validation";
import { EASE } from "@/components/ui/Motion";

type Status = "idle" | "submitting" | "success" | "error";
const empty: ContactInput = { name: "", email: "", subject: "", message: "" };

const fields = [
  { id: "name", label: "Full Name", type: "text", autoComplete: "name", placeholder: "Your full name" },
  { id: "email", label: "Email Address", type: "email", autoComplete: "email", placeholder: "you@example.com" },
  { id: "subject", label: "Subject", type: "text", autoComplete: "off", placeholder: "What is this about?" },
] as const;

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);
  const inFlight = useRef(false);

  const revalidate = (next: ContactInput, only?: keyof ContactInput) => {
    const { errors: e } = validateContact(next);
    setErrors((prev) => (only ? { ...prev, [only]: e[only] } : e));
  };

  const change = (key: keyof ContactInput, v: string) => {
    const next = { ...values, [key]: v };
    setValues(next);
    if (touched[key]) revalidate(next, key);
  };

  const blur = (key: keyof ContactInput) => {
    setTouched((t) => ({ ...t, [key]: true }));
    revalidate(values, key);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (inFlight.current || status === "submitting") return; // prevent duplicate submissions

    const { values: clean, errors: found } = validateContact(values);
    setTouched({ name: true, email: true, subject: true, message: true });
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(first)?.focus();
      return;
    }

    inFlight.current = true;
    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...clean, website: honeypot.current?.value ?? "" }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: ContactErrors };
      if (res.ok && data.ok) {
        setStatus("success");
        setValues(empty);
        setTouched({});
        setErrors({});
      } else {
        if (data.errors) setErrors(data.errors);
        setServerError(data.error ?? "We couldn't send your message. Please try again.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }

  const busy = status === "submitting";

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-6 shadow-[0_0_100px_-40px_var(--color-cyan)] sm:p-10 md:p-14">
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />

      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            role="status"
            aria-live="polite"
            className="flex min-h-[22rem] flex-col items-center justify-center text-center"
          >
            <CheckCircle2 className="h-14 w-14 text-cyan drop-shadow-[0_0_20px_var(--color-cyan)]" aria-hidden />
            <h3 className="t-h3 mt-6">Message sent</h3>
            <p className="t-body mt-3 max-w-sm">Thank you for reaching out. Your message has been delivered.</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="btn btn-ghost mt-8"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-busy={busy}
            className="grid gap-8"
          >
            {fields.map((f) => {
              const err = touched[f.id] ? errors[f.id] : undefined;
              return (
                <div key={f.id}>
                  <label htmlFor={f.id} className="t-eyebrow !text-[0.7rem] !text-offwhite/70">
                    {f.label} <span aria-hidden className="text-cyan">*</span>
                  </label>
                  <input
                    id={f.id}
                    name={f.id}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    placeholder={f.placeholder}
                    required
                    maxLength={LIMITS[f.id]}
                    value={values[f.id]}
                    disabled={busy}
                    aria-invalid={err ? true : undefined}
                    aria-describedby={err ? `${f.id}-err` : undefined}
                    onChange={(e) => change(f.id, e.target.value)}
                    onBlur={() => blur(f.id)}
                    className="field"
                  />
                  <FieldError id={`${f.id}-err`} message={err} />
                </div>
              );
            })}

            <div>
              <label htmlFor="message" className="t-eyebrow !text-[0.7rem] !text-offwhite/70">
                Message <span aria-hidden className="text-cyan">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                maxLength={LIMITS.message}
                placeholder="Write your message…"
                value={values.message}
                disabled={busy}
                aria-invalid={touched.message && errors.message ? true : undefined}
                aria-describedby={touched.message && errors.message ? "message-err" : undefined}
                onChange={(e) => change("message", e.target.value)}
                onBlur={() => blur("message")}
                className="field resize-y"
              />
              <FieldError id="message-err" message={touched.message ? errors.message : undefined} />
            </div>

            {/* Honeypot — hidden from people and assistive tech */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div aria-live="assertive" className="min-h-0">
              {status === "error" ? (
                <p role="alert" className="flex items-start gap-3 rounded-xl border border-[#ff8a8a]/40 bg-[#ff8a8a]/10 p-4 text-sm text-offwhite">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#ff8a8a]" aria-hidden />
                  {serverError}
                </p>
              ) : null}
            </div>

            <div>
              <button type="submit" disabled={busy} className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto">
                {busy ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="arrow h-4 w-4" aria-hidden />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p id={id} role={message ? "alert" : undefined} className="mt-2 min-h-5 text-sm text-[#ff9c9c]">
      {message}
    </p>
  );
}
