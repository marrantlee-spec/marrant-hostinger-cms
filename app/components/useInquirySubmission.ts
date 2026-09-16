"use client";

import { FormEvent, useCallback, useRef, useState } from "react";
import { submitInquiry } from "./submitInquiry";

export type InquirySubmissionStatus = {
  tone: "success" | "error";
  message: string;
} | null;

type InquiryLocale = "en" | "zh-CN";

function formValue(data: FormData, name: string) {
  return String(data.get(name) ?? "").trim();
}

export function useInquirySubmission(locale: InquiryLocale = "en") {
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState<InquirySubmissionStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const chinese = locale === "zh-CN";

  const resetStatus = useCallback(() => setStatus(null), []);

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const company = formValue(data, "company");
    const quantity = formValue(data, "quantity") || formValue(data, "volume");
    const timeline = formValue(data, "timeline");
    const visitDate = formValue(data, "visitDate");
    const product = formValue(data, "product") || formValue(data, "interest") || (chinese ? "综合询盘" : "General inquiry");
    const message = [
      formValue(data, "message"),
      company ? `${chinese ? "公司" : "Company"}: ${company}` : "",
      quantity ? `${chinese ? "预计数量" : "Estimated quantity"}: ${quantity}` : "",
      timeline ? `${chinese ? "订单阶段" : "Order timeline"}: ${timeline}` : "",
      visitDate ? `${chinese ? "意向参观日期" : "Preferred visit date"}: ${visitDate}` : "",
      `${chinese ? "来源页面" : "Source page"}: ${window.location.pathname}`,
    ].filter(Boolean).join("\n\n");

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await submitInquiry({
        name: formValue(data, "name"),
        email: formValue(data, "email"),
        phone: formValue(data, "phone"),
        country: formValue(data, "country") || formValue(data, "region"),
        product,
        message,
        website: formValue(data, "website"),
        startedAt: startedAt.current,
      });
      const result = await response.json().catch(() => null) as { message?: string } | null;

      if (!response.ok) {
        setStatus({
          tone: "error",
          message: result?.message ?? (chinese ? "询盘发送失败，请稍后重试或直接发送邮件。" : "We could not send your inquiry. Please try again or contact us by email."),
        });
        return;
      }

      form.reset();
      startedAt.current = Date.now();
      setStatus({
        tone: "success",
        message: chinese ? "感谢您的咨询，邮件已发送，我们的团队将尽快与您联系。" : "Thank you. Your inquiry has been sent and our team will contact you shortly.",
      });
    } catch {
      setStatus({
        tone: "error",
        message: chinese ? "暂时无法连接询盘服务，请稍后重试或直接发送邮件。" : "We could not reach the inquiry service. Please try again or contact us by email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [chinese]);

  return { handleSubmit, isSubmitting, resetStatus, status };
}
