import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { inquiryRecipientEmail } from "./recipient";

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
  if (payload.phone) {
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

  await prisma.inquiry.create({
    data: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      country: payload.country,
      product: payload.product,
      message: payload.message,
    },
  }).catch((error: unknown) => {
    console.error("Inquiry database write failed", error);
    return null;
  });

  const recipient = inquiryRecipientEmail;
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Origin: "https://www.marrantbag.com",
      Referer: "https://www.marrantbag.com/contact",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || "Not provided",
      country: payload.country || "Not provided",
      product: payload.product || "Not provided",
      message: payload.message || "Not provided",
      _replyto: payload.email,
      _subject: `New Marrant website inquiry from ${payload.name.replace(/[\r\n]/g, " ")}`,
      _template: "table",
      _captcha: "false",
      _url: "https://www.marrantbag.com/contact",
    }),
  }).catch((error: unknown) => {
    console.error("FormSubmit request failed.", error);
    return null;
  });

  if (!response?.ok) {
    console.error("FormSubmit delivery failed.", response?.status, await response?.text().catch(() => ""));
    return NextResponse.json({ message: "We could not send your inquiry. Please try again or contact us by email." }, { status: 502 });
  }

  const result = await response.json().catch(() => null) as { success?: boolean | string; message?: string } | null;
  if (!result || result.success === false || result.success === "false") {
    console.error("FormSubmit did not accept the inquiry.", result?.message ?? "Unknown response");
    return NextResponse.json({ message: "The inquiry email service is awaiting activation. Please contact us by email for now." }, { status: 503 });
  }

  return NextResponse.json({ message: "Thank you. Your inquiry has been sent and our team will reply within one business day." });
}
