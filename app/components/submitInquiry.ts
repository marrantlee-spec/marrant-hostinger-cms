type InquirySubmission = {
  name: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  message: string;
  website?: string;
  startedAt?: number;
};

type FormSubmitResult = { success?: boolean | string; message?: string } | null;

const formSubmitEndpoint = "https://formsubmit.co/ajax/marrant.xela@gmail.com";

function jsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function submitInquiry(payload: InquirySubmission) {
  if (payload.website || (payload.startedAt && Date.now() - payload.startedAt < 1200)) {
    return jsonResponse({ message: "Thank you. Your inquiry has been received." }, 200);
  }

  const response = await fetch(formSubmitEndpoint, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      country: payload.country || "Not provided",
      product: payload.product || "Not provided",
      message: payload.message || "Not provided",
      _replyto: payload.email,
      _subject: `New Marrant website inquiry from ${payload.name.replace(/[\r\n]/g, " ")}`,
      _template: "table",
      _captcha: "false",
      _honey: payload.website || "",
      _url: window.location.href,
    }),
  });
  const result = await response.json().catch(() => null) as FormSubmitResult;

  if (!response.ok || !result || result.success === false || result.success === "false") {
    return jsonResponse({ message: result?.message ?? "We could not send your inquiry. Please try again or contact us by email." }, response.ok ? 503 : 502);
  }

  return jsonResponse({ message: "Thank you. Your inquiry has been sent and our team will reply within one business day." }, 200);
}
