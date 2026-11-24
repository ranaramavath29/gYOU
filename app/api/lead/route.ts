import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { site } from "@/content/site";

export const runtime = "nodejs";

const MAX_FIELDS = 40;
const MAX_VALUE_LENGTH = 5000;

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const clean = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 200);

function formatValue(v: unknown): string {
  if (Array.isArray(v)) return v.map(String).join(", ");
  return String(v).slice(0, MAX_VALUE_LENGTH);
}

export async function POST(request: Request) {
  // Blank values in .env count as "not set" (|| rather than ??).
  const host = process.env.SMTP_HOST?.trim() || "";
  const port = Number(process.env.SMTP_PORT?.trim() || 465);
  const user = process.env.SMTP_USER?.trim();
  // App passwords are sometimes shown in spaced groups; the spaces aren't part of them.
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");
  const to = process.env.LEAD_TO_EMAIL?.trim() || site.email;

  if (!host || !user || !pass || typeof to !== "string" || !to.includes("@")) {
    console.error("[api/lead] SMTP_HOST / SMTP_USER / SMTP_PASS / LEAD_TO_EMAIL not configured");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: { form?: unknown; fields?: unknown; page?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const form = typeof body.form === "string" ? clean(body.form) : "";
  const fields = body.fields;
  if (!form || !fields || typeof fields !== "object" || Array.isArray(fields)) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const entries = Object.entries(fields as Record<string, unknown>).slice(0, MAX_FIELDS);
  const page = typeof body.page === "string" ? clean(body.page) : "";

  const rows = entries.map(([k, v]) => [clean(k), formatValue(v)] as const);
  const text = [
    `New ${form} submission`,
    ...(page ? [`Page: ${page}`] : []),
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
  ].join("\n");
  const html = `<h2>New ${escapeHtml(form)} submission</h2>${
    page ? `<p><b>Page:</b> ${escapeHtml(page)}</p>` : ""
  }<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="border:1px solid #ddd"><b>${escapeHtml(k)}</b></td><td style="border:1px solid #ddd">${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")}</table>`;

  // Reply-To lets you answer the enquirer straight from your inbox.
  const emailField = rows.find(([k]) => k.toLowerCase().includes("email"))?.[1] ?? "";
  const replyTo = /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(emailField)
    ? emailField
    : undefined;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      // 465 = SSL from the start; 587 = STARTTLS upgrade.
      secure: port === 465,
      requireTLS: port === 587,
      auth: { user, pass },
    });
    await transporter.sendMail({
      from: `"${site.name} website" <${user}>`,
      to,
      replyTo,
      subject: `[${site.name}] New ${form} enquiry`,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/lead] send failed:", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
