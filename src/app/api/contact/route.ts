import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContact } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_TO = "krzysztoflukiewski@gmail.com";
const DEFAULT_FROM = "The World That Could Be <onboarding@resend.dev>";

// Best-effort per-instance rate limit (5 requests / 10 minutes / IP).
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages sent. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const { values, errors } = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "Please correct the highlighted fields.", errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { ok: false, error: "The contact service is not available right now. Please email us directly." },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
      to: [process.env.CONTACT_TO_EMAIL || DEFAULT_TO],
      replyTo: values.email,
      subject: `[Website] ${values.subject.replace(/[\r\n]+/g, " ")}`,
      text: `Name: ${values.name}\nEmail: ${values.email}\nSubject: ${values.subject}\n\n${values.message}`,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#071525">
        <h2 style="margin:0 0 12px">New message from the website</h2>
        <p><strong>Name:</strong> ${esc(values.name)}<br/>
        <strong>Email:</strong> <a href="mailto:${esc(values.email)}">${esc(values.email)}</a><br/>
        <strong>Subject:</strong> ${esc(values.subject)}</p>
        <hr/><p style="white-space:pre-wrap">${esc(values.message)}</p></div>`,
    });

    if (error || !data?.id) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your message. Please try again or email us directly." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again or email us directly." },
      { status: 500 },
    );
  }
}
