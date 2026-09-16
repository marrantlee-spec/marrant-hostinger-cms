"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { submitInquiry } from "../components/submitInquiry";
import styles from "./ContactInquiryForm.module.css";
import { ArrowRightIcon } from "./ContactIcons";

type FieldName = "name" | "email" | "phone" | "country" | "product" | "message";
type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;
type FormStatus = { tone: "success" | "error"; message: string } | null;

const fieldNames: FieldName[] = ["name", "email", "phone", "country", "product", "message"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneCharactersPattern = /^\+?[0-9][0-9\s().-]*$/;

function validateField(field: FieldName, value: string) {
  const trimmedValue = value.trim();

  if (field === "name" && !trimmedValue) return "Please enter your name.";
  if (field === "email" && !trimmedValue) return "Please enter your email address.";
  if (field === "email" && !emailPattern.test(trimmedValue)) return "Enter a valid email address.";
  if (field === "phone" && !trimmedValue) return "Please enter a phone number.";

  if (field === "phone") {
    const digitCount = trimmedValue.replace(/\D/g, "").length;
    if (!phoneCharactersPattern.test(trimmedValue) || digitCount < 7 || digitCount > 15) {
      return "Enter a valid international phone number.";
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
      setStatus({ tone: "error", message: "Please complete the required fields before sending your inquiry." });
      form.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitInquiry({
        ...values,
        website: String(new FormData(form).get("website") ?? ""),
        startedAt: formStartedAt.current,
      });
      const result = (await response.json().catch(() => null)) as { message?: string; errors?: FormErrors } | null;

      if (!response.ok) {
        if (result?.errors) setErrors(result.errors);
        setStatus({ tone: "error", message: result?.message ?? "We could not send your inquiry. Please try again or contact us by email." });
        return;
      }

      form.reset();
      setErrors({});
      setStatus({ tone: "success", message: result?.message ?? "Thank you. Your inquiry has been sent and our team will reply within one business day." });
    } catch {
      setStatus({ tone: "error", message: "We could not reach the server. Please try again or contact us by email." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit}>
      <div className={styles.formHeading}>
        <h3>Send us your inquiry</h3>
        <p>Fields marked <b>*</b> are required.</p>
      </div>

      <div className={styles.topRow}>
        <label>
          <span>Name <b>*</b></span>
          <input aria-describedby={errors.name ? "name-error" : undefined} aria-invalid={Boolean(errors.name)} autoComplete="name" name="name" onBlur={handleFieldBlur} onChange={handleFieldChange} placeholder="Your full name" required />
          {errors.name && <small className={styles.error} id="name-error">{errors.name}</small>}
        </label>
        <label>
          <span>Work email <b>*</b></span>
          <input aria-describedby={errors.email ? "email-error" : undefined} aria-invalid={Boolean(errors.email)} autoComplete="email" inputMode="email" name="email" onBlur={handleFieldBlur} onChange={handleFieldChange} placeholder="name@company.com" required type="email" />
          {errors.email && <small className={styles.error} id="email-error">{errors.email}</small>}
        </label>
      </div>

      <div className={styles.topRow}>
        <label>
          <span>Phone <b>*</b></span>
          <input aria-describedby={errors.phone ? "phone-error" : "phone-help"} aria-invalid={Boolean(errors.phone)} autoComplete="tel" inputMode="tel" name="phone" onBlur={handleFieldBlur} onChange={handleFieldChange} placeholder="+1 212 555 0123" required type="tel" />
          {errors.phone ? <small className={styles.error} id="phone-error">{errors.phone}</small> : <small className={styles.hint} id="phone-help">Include your country code.</small>}
        </label>
        <label>
          <span>Country / Region <em>Optional</em></span>
          <input autoComplete="country-name" name="country" onBlur={handleFieldBlur} onChange={handleFieldChange} placeholder="e.g. United States" />
        </label>
      </div>

      <label className={styles.productField}>
        <span>Product requirement <em>Optional</em></span>
        <input name="product" onBlur={handleFieldBlur} onChange={handleFieldChange} placeholder="e.g. leather tote bag, custom hardware, 500 pcs" />
      </label>

      <label className={styles.message}>
        <span>Message <em>Optional</em></span>
        <textarea name="message" onBlur={handleFieldBlur} onChange={handleFieldChange} placeholder="Tell us about your project, target market, timeline, or any specific requirements." rows={5} />
      </label>

      <label className={styles.honeypot} aria-hidden="true">
        <span>Website</span>
        <input autoComplete="off" name="website" tabIndex={-1} type="text" />
      </label>

      <button aria-busy={isSubmitting} className={styles.submit} disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending inquiry…" : <>Send inquiry <ArrowRightIcon width={16} height={16} /></>}
      </button>

      {status && <p className={status.tone === "success" ? styles.success : styles.formError} role={status.tone === "error" ? "alert" : "status"}>{status.message}</p>}
      <p className={styles.privacy}>Your details are used only to respond to this inquiry. We typically reply within one business day.</p>
    </form>
  );
}
