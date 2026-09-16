"use client";

import { useInquirySubmission } from "../components/useInquirySubmission";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { productCategoriesFor } from "../components/product-taxonomy";
import styles from "./page.module.css";

export default function FactoryInquiryForm({ locale = "en" }: { locale?: "en" | "zh-CN" }) {
  const chinese = locale === "zh-CN";
  const productCategories = productCategoriesFor(locale);
  const { handleSubmit, isSubmitting, status } = useInquirySubmission(locale);

  return (
    <form className={styles.form} onSubmit={handleSubmit} id="factory-inquiry">
      <div className={styles.formHeading}>
        <p className={styles.kicker}>{chinese ? "从一次沟通开始" : "Start a conversation"}</p>
        <h2>{chinese ? "告诉我们您的项目需求" : "Tell Us About Your Project"}</h2>
        <span>{chinese ? "请提供基本需求，我们的团队将与您联系并建议合适的下一步。" : "Share the essentials and our team will get back to you with the right next step."}</span>
      </div>
      <div className={styles.formGrid}>
        <label><span>{chinese ? "姓名" : "Name"} <b>*</b></span><input required name="name" autoComplete="name" placeholder={chinese ? "请填写姓名" : "Your full name"} /></label>
        <label><span>{chinese ? "工作邮箱" : "Email"} <b>*</b></span><input required type="email" name="email" autoComplete="email" placeholder="you@company.com" /></label>
        <label><span>{chinese ? "公司名称" : "Company"}</span><input name="company" autoComplete="organization" placeholder={chinese ? "请输入公司名称" : "Company name"} /></label>
        <label><span>{chinese ? "国家 / 地区" : "Country / Region"}</span><input name="region" autoComplete="country-name" placeholder={chinese ? "您的目标市场" : "Your market"} /></label>
        <label><span>{chinese ? "产品需求" : "Product Requirement"}</span><select name="product" defaultValue=""><option value="" disabled>{chinese ? "请选择产品类别" : "Select a product category"}</option>{productCategories.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}<option value="custom-oem">{chinese ? "其他 OEM / ODM 定制项目" : "Custom OEM / ODM Project"}</option></select></label>
        <label><span>{chinese ? "预计数量" : "Estimated Quantity"}</span><input name="quantity" inputMode="numeric" placeholder={chinese ? "预计采购数量" : "Estimated order quantity"} /></label>
        <label className={styles.message}><span>{chinese ? "需求说明" : "Message"}</span><textarea name="message" rows={4} placeholder={chinese ? "请说明设计、材料、交期或工厂参观等需求。" : "Tell us about the design, materials, timeline, or factory visit you have in mind."} /></label>
      </div>
      <button type="submit" disabled={isSubmitting}>{isSubmitting ? (chinese ? "发送中……" : "Sending...") : (chinese ? "提交定制需求" : "Request a Quote")} <ArrowRight size={18} /></button>
      {status ? <p className={styles.success} role="status" data-tone={status.tone}><CheckCircle size={19} weight="fill" /> {status.message}</p> : null}
    </form>
  );
}
