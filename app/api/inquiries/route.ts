import { NextResponse } from "next/server";

export const runtime = "nodejs";

type InquiryField = "name" | "email" | "phone" | "country" | "product" | "message";
type InquiryPayload = Record<InquiryField, string> & { website?: string; startedAt?: number };
type FieldErrors = Partial<Record<InquiryField, string>>;

const fields: InquiryField[] = ["name", "email", "phone", "country", "product", "message"];
const maxLengths: Record<InquiryField, number> = {
  name: 120,
  email: 254,
  phone: 40,
  country: 120,
  product: 240,
  message: 4000,
};
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneCharactersPattern = /^\+?[0-9][0-9\s().-]*$/;
const rateLimitWindowMs = 15 * 60 * 1000;
const maxRequestsPerWindow = 8;
const requestLog = new Map<string, { count: number; resetAt: number }>();

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getPayload(value: unknown): InquiryPayload {
  const source = value && typeof value === "object" ? value as Record<string, unknown> : {};

  return fields.reduce((payload, field) => {
    payload[field] = asTrimmedString(source[field]);
    return payload;
  }, {
    website: asTrimmedString(source.website),
    startedAt: typeof source.startedAt === "number" ? source.startedAt : undefined,
  } as InquiryPayload);
}

function validate(payload: InquiryPayload): FieldErrors {
  const errors: FieldErrors = {};

  if (!payload.name) errors.name = "Please enter your name.";
  if (!payload.email) errors.email = "Please enter your email address.";
  else if (!emailPattern.test(payload.email)) errors.email = "Enter a valid email address.";
  if (!payload.phone) errors.phone = "Please enter a phone number.";
  else {
    const digitCount = payload.phone.replace(/\D/g, "").length;
    if (!phoneCharactersPattern.test(payload.phone) || digitCount < 7 || digitCount > 15) {
      errors.phone = "Enter a valid international phone number.";
    }
  }

  for (const field of fields) {
    if (payload[field].length > maxLengths[field]) errors[field] = "This entry is too long.";
  }

  return errors;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
}

function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "";
}

function isRateLimited(ip: string) {
  if (!ip) return false;

  const now = Date.now();
  for (const [key, entry] of requestLog) {
    if (entry.resetAt <= now) requestLog.delete(key);
  }

  const current = requestLog.get(ip);
  if (!current || current.resetAt <= now) {
    requestLog.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  current.count += 1;
  return current.count > maxRequestsPerWindow;
}

function buildEmailHtml(payload: InquiryPayload) {
  const rows = [
    ["Name", payload.name],
    ["Work email", payload.email],
    ["Phone", payload.phone],
    ["Country / Region", payload.country || "Not provided"],
    ["Product requirement", payload.product || "Not provided"],
    ["Message", payload.message || "Not provided"],
  ];

  return `<div style="font-family:Arial,sans-serif;color:#201b17"><h2 style="margin:0 0 20px">New Marrant website inquiry</h2><table style="width:100%;border-collapse:collapse">${rows.map(([label, value]) => `<tr><th style="padding:10px 12px;text-align:left;border:1px solid #ded6ca;background:#f5f1eb;vertical-align:top">${label}</th><td style="padding:10px 12px;border:1px solid #ded6ca;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join("")}</table></div>`;
}

export async function POST(request: Request) {
  const rawBody = await request.json().catch(() => null);
  const payload = getPayload(rawBody);
  const errors = validate(payload);

  if (Object.keys(errors).length) {
    return NextResponse.json({ message: "Please review the highlighted fields.", errors }, { status: 422 });
  }

  // A filled hidden field or an instant post is treated as a bot while returning a neutral response.
  if (payload.website || (payload.startedAt && Date.now() - payload.startedAt < 1200)) {
    return NextResponse.json({ message: "Thank you. Your inquiry has been received." });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ message: "Too many inquiries were sent from this connection. Please try again in a few minutes." }, { status: 429, headers: { "Retry-After": String(rateLimitWindowMs / 1000) } });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const recipient = process.env.INQUIRY_RECIPIENT_EMAIL ?? "Melody@marrant.cn";

  if (!apiKey || !from) {
    console.error("Inquiry email is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL.");
    return NextResponse.json({ message: "The inquiry service is temporarily unavailable. Please contact us by email." }, { status: 503 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: payload.email,
      subject: `New website inquiry from ${payload.name.replace(/[\r\n]/g, " ")}`,
      html: buildEmailHtml(payload),
    }),
  }).catch((error: unknown) => {
    console.error("Inquiry email request failed.", error);
    return null;
  });

  if (!response?.ok) {
    console.error("Inquiry email delivery failed.", response?.status);
    return NextResponse.json({ message: "We could not send your inquiry. Please try again or contact us by email." }, { status: 502 });
  }

  return NextResponse.json({ message: "Thank you. Your inquiry has been sent and our team will reply within one business day." });
}
