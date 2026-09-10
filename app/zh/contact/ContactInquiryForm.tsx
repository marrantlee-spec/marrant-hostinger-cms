"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import styles from "../../contact/ContactInquiryForm.module.css";
import { ArrowRightIcon } from "../../contact/ContactIcons";

type FieldName = "name" | "email" | "phone" | "country" | "product" | "message";
type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;
type FormStatus = { tone: "success" | "error"; message: string } | null;

const fieldNames: FieldName[] = ["name", "email", "phone", "country", "product", "message"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneCharactersPattern = /^\+?[0-9][0-9\s().-]*$/;

function validateField(field: FieldName, value: string) {
  const trimmedValue = value.trim();

  if (field === "name" && !trimmedValue) return "请填写姓名。";
  if (field === "email" && !trimmedValue) return "请填写电子邮箱。";
  if (field === "email" && !emailPattern.test(trimmedValue)) return "请填写有效的电子邮箱地址。";
  if (field === "phone" && !trimmedValue) return "请填写联系电话。";

  if (field === "phone") {
    const digitCount = trimmedValue.replace(/\D/g, "").length;
    if (!phoneCharactersPattern.test(trimmedValue) || digitCount < 7 || digitCount > 15) {
      return "请填写有效的电话号码，并包含国家区号。";
    }
  }

  return undefined;
}

function getValues(form: HTMLFormElement): FormValues {
  const formData = new FormData(form);

  return fieldNames.reduce((values, field) => {
    values[field] = String(formData.get(field) ?? "").trim();
    return values;
  }, {} as FormValues);
}

function validateForm(values: FormValues) {
  return fieldNames.reduce((errors, field) => {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
    return errors;
  }, {} as FormErrors);
}

export default function ContactInquiryForm() {
  const formStartedAt = useRef(Date.now());
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleFieldChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.currentTarget.name as FieldName;
    if (!fieldNames.includes(field)) return;

    setErrors((currentErrors) => {
      if (!currentErrors[field]) return currentErrors;
      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });

    if (status?.tone === "error") setStatus(null);
  }

  function handleFieldBlur(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.currentTarget.name as FieldName;
    if (!fieldNames.includes(field)) return;

    const error = validateField(field, event.currentTarget.value);
    setErrors((currentErrors) => ({ ...currentErrors, [field]: error }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = getValues(form);
    const nextErrors = validateForm(values);

    setErrors(nextErrors);
    setStatus(null);

    const firstInvalidField = fieldNames.find((field) => nextErrors[field]);
    if (firstInvalidField) {
      setStatus({ tone: "error", message: "请先填写必填信息，再提交采购需求。" });
      form.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: String(new FormData(form).get("website") ?? ""),
          startedAt: formStartedAt.current,
        }),
      });
      const result = (await response.json().catch(() => null)) as { message?: string; errors?: FormErrors } | null;

      if (!response.ok) {
        if (result?.errors) {
          setErrors(Object.fromEntries(Object.entries(result.errors).map(([field]) => [field, "请检查此项内容是否完整、格式正确，或适当缩短内容。"])));
        }
        const message = response.status === 429
          ? "提交过于频繁，请稍后再试。"
          : response.status === 422
            ? "请检查标记的字段后重新提交。"
            : response.status === 503
              ? "咨询服务暂时不可用，请通过电子邮件或 WhatsApp 联系我们。"
              : "需求提交失败，请重试或通过电子邮件联系我们。";
        setStatus({ tone: "error", message });
        return;
      }

      form.reset();
      setErrors({});
      setStatus({ tone: "success", message: "您的需求已发送，我们通常会在一个工作日内回复。" });
    } catch {
      setStatus({ tone: "error", message: "暂时无法连接服务器，请稍后重试或通过电子邮件联系我们。" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit}>
      <div className={styles.formHeading}>
        <h3>发送采购需求</h3>
        <p>标有 <b>*</b> 的项目为必填项。</p>
      </div>

      <div className={styles.topRow}>
        <label>
          <span>姓名 <b>*</b></span>
          <input aria-describedby={errors.name ? "name-error" : undefined} aria-invalid={Boolean(errors.name)} autoComplete="name" name="name" onBlur={handleFieldBlur} onChange={handleFieldChange} placeholder="请填写姓名" required />
          {errors.name && <small className={styles.error} id="name-error">{errors.name}</small>}
        </label>
        <label>
          <span>工作邮箱 <b>*</b></span>
          <input aria-describedby={errors.email ? "email-error" : undefined} aria-invalid={Boolean(errors.email)} autoComplete="email" inputMode="email" name="email" onBlur={handleFieldBlur} onChange={handleFieldChange} placeholder="name@company.com" required type="email" />
          {errors.email && <small className={styles.error} id="email-error">{errors.email}</small>}
        </label>
      </div>

      <div className={styles.topRow}>
        <label>
          <span>联系电话 <b>*</b></span>
          <input aria-describedby={errors.phone ? "phone-error" : "phone-help"} aria-invalid={Boolean(errors.phone)} autoComplete="tel" inputMode="tel" name="phone" onBlur={handleFieldBlur} onChange={handleFieldChange} placeholder="+1 212 555 0123" required type="tel" />
          {errors.phone ? <small className={styles.error} id="phone-error">{errors.phone}</small> : <small className={styles.hint} id="phone-help">请包含国家区号，例如 +86。</small>}
        </label>
        <label>
          <span>国家 / 地区 <em>选填</em></span>
          <input autoComplete="country-name" name="country" onBlur={handleFieldBlur} onChange={handleFieldChange} placeholder="例如：中国" />
        </label>
      </div>

      <label className={styles.productField}>
        <span>产品需求 <em>选填</em></span>
        <input name="product" onBlur={handleFieldBlur} onChange={handleFieldChange} placeholder="例如：真皮托特包，定制五金，预计500件" />
      </label>

      <label className={styles.message}>
        <span>需求说明 <em>选填</em></span>
        <textarea name="message" onBlur={handleFieldBlur} onChange={handleFieldChange} placeholder="请说明项目、目标市场、预计数量、交期与其他定制要求。" rows={5} />
      </label>

      <label className={styles.honeypot} aria-hidden="true">
        <span>网站</span>
        <input autoComplete="off" name="website" tabIndex={-1} type="text" />
      </label>

      <button aria-busy={isSubmitting} className={styles.submit} disabled={isSubmitting} type="submit">
        {isSubmitting ? "正在发送……" : <>发送采购需求 <ArrowRightIcon width={16} height={16} /></>}
      </button>

      {status && <p className={status.tone === "success" ? styles.success : styles.formError} role={status.tone === "error" ? "alert" : "status"}>{status.message}</p>}
      <p className={styles.privacy}>您提供的信息仅用于回复本次咨询。我们通常会在一个工作日内回复。</p>
    </form>
  );
}
