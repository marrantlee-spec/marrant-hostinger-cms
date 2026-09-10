"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, WhatsappIcon } from "../../../blog/how-to-source-crazy-horse-leather-travel-tote-bag/BlogIcons";

const whatsapp = "https://wa.me/8618925073489";

export default function BlogInquiryForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <form className="blog-inquiry-form" onSubmit={handleSubmit}>
      <p className="blog-form-kicker">开始您的定制项目</p>
      <h2>开启您的<br />真皮包定制项目</h2>
      <span className="blog-form-rule" />
      <p className="blog-form-intro">提供项目资料，便于团队评估后续开发方案。</p>

      <label>
        <span>姓名 <b>*</b></span>
        <input required name="name" autoComplete="name" placeholder="请填写姓名" />
      </label>
      <label>
        <span>电子邮箱 <b>*</b></span>
        <input required type="email" name="email" autoComplete="email" placeholder="you@company.com" />
      </label>
      <label>
        <span>国家 / 地区 <b>*</b></span>
        <select required name="country" defaultValue="">
          <option value="" disabled>请选择国家或地区</option>
          <option>中国</option>
          <option>美国</option>
          <option>英国</option>
          <option>澳大利亚</option>
          <option>加拿大</option>
          <option>德国</option>
          <option>其他</option>
        </select>
      </label>
      <label>
        <span>预计数量（件） <b>*</b></span>
        <input required name="quantity" inputMode="numeric" placeholder="例如：100、500、1000件以上" />
      </label>
      <label>
        <span>需求说明 <b>*</b></span>
        <textarea required name="message" rows={5} placeholder="请说明项目、产品规格及其他定制要求。" />
      </label>

      <button type="submit" className="blog-submit-button">
        获取定制报价 <ArrowRightIcon width={17} height={17} />
      </button>
      {isSubmitted && <p className="blog-form-success" role="status">此处信息尚未发送，请<Link href="/zh/contact#inquiry" style={{ textDecoration: "underline" }}>前往联系表单</Link>提交需求。</p>}

      <div className="blog-form-contact">
        <span>或通过 WhatsApp 联系我们</span>
        <a href={whatsapp} target="_blank" rel="noreferrer"><WhatsappIcon width={19} height={19} /> +86 189 2507 3489</a>
        <small>周一至周五 9:00–18:00（北京时间）</small>
      </div>
    </form>
  );
}
