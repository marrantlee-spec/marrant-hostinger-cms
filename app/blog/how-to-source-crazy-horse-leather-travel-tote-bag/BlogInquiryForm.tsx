"use client";

import { ArrowRightIcon, WhatsappIcon } from "./BlogIcons";
import { useInquirySubmission } from "../../components/useInquirySubmission";

const whatsapp = "https://wa.me/8618925073489";

export default function BlogInquiryForm() {
  const { handleSubmit, isSubmitting, status } = useInquirySubmission("en");

  return (
    <form className="blog-inquiry-form" onSubmit={handleSubmit}>
      <p className="blog-form-kicker">Start your project</p>
      <h2>Start Your Leather<br />Bag Project</h2>
      <span className="blog-form-rule" />
      <p className="blog-form-intro">Share a few details and our team will point you to the right next step.</p>

      <label>
        <span>Full Name <b>*</b></span>
        <input required name="name" autoComplete="name" placeholder="Your name" />
      </label>
      <label>
        <span>Email Address <b>*</b></span>
        <input required type="email" name="email" autoComplete="email" placeholder="you@company.com" />
      </label>
      <label>
        <span>Country / Region <b>*</b></span>
        <select required name="country" defaultValue="">
          <option value="" disabled>Select your country</option>
          <option>United States</option>
          <option>United Kingdom</option>
          <option>Australia</option>
          <option>Canada</option>
          <option>Germany</option>
          <option>Other</option>
        </select>
      </label>
      <label>
        <span>Estimated Quantity (PCS) <b>*</b></span>
        <input required name="quantity" inputMode="numeric" placeholder="e.g., 100, 500, 1000+" />
      </label>
      <label>
        <span>Message <b>*</b></span>
        <textarea required name="message" rows={5} placeholder="Tell us about your project, product requirements, special requests, etc." />
      </label>

      <button type="submit" className="blog-submit-button" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Request a Quote"} <ArrowRightIcon width={17} height={17} />
      </button>
      {status ? <p className="blog-form-success" role="status" data-tone={status.tone}>{status.message}</p> : null}

      <div className="blog-form-contact">
        <span>Or contact us on WhatsApp</span>
        <a href={whatsapp} target="_blank" rel="noreferrer"><WhatsappIcon width={19} height={19} /> +86 189 2507 3489</a>
        <small>Mon–Fri, 9:00–18:00 (GMT+8)</small>
      </div>
    </form>
  );
}
