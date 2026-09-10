"use client";

import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChatCircleDots,
  CheckCircle,
  ClipboardText,
  Factory,
  GlobeHemisphereWest,
  Lightbulb,
  Package,
  PencilSimple,
  ShieldCheck,
  Swatches,
  Tag,
  WhatsappLogo,
} from "@phosphor-icons/react";
import InternalLinkPanel from "./InternalLinkPanel";

const whatsapp = "https://wa.me/8618925073489";
const imageBase = "/assets/products/mens-bifold-wallet-8064";

type Locale = "en" | "zh";
type FormStatus = { tone: "success" | "error"; message: string } | null;

const content = {
  en: {
    home: "Home",
    products: "Leather Goods",
    category: "Men's Wallets",
    name: "Men's Full-Grain Leather Bifold Wallet",
    kicker: "Men's Leather Wallet · SKU 8064",
    title: <>Full-Grain Leather<br />Bifold Wallet</>,
    intro: "A compact men's bifold wallet in full-grain cowhide, with a practical card-and-cash layout and customizable branding, color, hardware, lining and packaging.",
    request: "Request Specification",
    chat: "Chat with our team",
    galleryLabel: "Product image gallery",
    showImage: "Show image",
    factsLabel: "Product information overview",
    facts: [
      ["SKU", "8064"],
      ["Material", "Full-grain cowhide"],
      ["Dimensions", "12 × 2 × 10 cm"],
      ["Style", "Men's bifold wallet"],
      ["Colors", "5 listed options"],
      ["Customization", "Logo, color & details"],
      ["MOQ", "To be confirmed"],
    ],
    specifications: "Product Specifications",
    specNote: "Specifications shown are based on the supplied product information and images. MOQ and lead times are confirmed against the final customization brief.",
    specs: [
      { left: ["SKU", "8064"], right: ["Style", "Men's bifold wallet"] },
      { left: ["Dimensions", "12 × 2 × 10 cm"], right: ["Material", "Full-grain cowhide leather"] },
      { left: ["Construction", "Bifold"], right: ["Colors", "Black / Brown / Red Brown / Coffee / Oil Coffee"] },
      { left: ["Interior", "Card slots and zip compartment shown"], right: ["Lining", "Customizable"] },
      { left: ["Hardware", "Customizable"], right: ["Logo", "Customizable"] },
      { left: ["Packaging", "Customizable"], right: ["MOQ", "To be confirmed"] },
      { left: ["Sample Lead Time", "To be confirmed"], right: ["Production Lead Time", "To be confirmed"] },
    ],
    materialTitle: "Material",
    materialName: "Full-Grain Cowhide",
    materialCopy: "A natural leather surface with visible grain and tonal variation. Final leather selection, thickness and finish are confirmed during sampling.",
    colorsTitle: "Listed Colors",
    colorsCopy: "Color matching and additional options can be evaluated for your order.",
    customizationTitle: "OEM / ODM Customization",
    packagingTitle: "Packaging Options",
    processTitle: "Order Process",
    factoryKicker: "Visit Marrant",
    factoryTitle: "Review Materials and Workmanship in Person",
    factoryCopy: "Brand teams, importers and product developers are welcome to review leather selection, cutting, stitching, assembly and quality checks at our Guangzhou facility.",
    factoryPoints: ["Owner-led factory visit", "Review wallet construction", "Discuss your OEM / ODM brief"],
    factoryCta: "Plan a Factory Visit",
    faqTitle: "Frequently Asked Questions",
    faqs: [
      ["What is the MOQ for SKU 8064?", "MOQ is still to be confirmed. It depends on the selected leather, color, logo method, packaging and order requirements."],
      ["Can the interior layout be changed?", "Yes. Share the card-slot, cash-compartment and coin-pocket layout you need, and we will evaluate it during product development."],
      ["Which colors are available?", "The supplied options are black, brown, red brown, coffee and oil coffee. Final color standards are confirmed before sampling."],
      ["Can we add our logo and branded packaging?", "Yes. Logo treatment and packaging can be developed to your brief after the artwork and order requirements are reviewed."],
      ["How long do samples and production take?", "Both schedules are currently to be confirmed and will be quoted after the materials and customization details are finalized."],
    ],
    inquiryTitle: "Submit an Inquiry",
    inquiryCopy: "Tell us your quantity, market and customization requirements for SKU 8064.",
    form: {
      name: "Your Name *", company: "Company Name", email: "Email *", phone: "Phone *", country: "Country / Region",
      product: "Product Interest", quantity: "Estimated Order Quantity", message: "Message *", privacy: "I agree to the Privacy Policy.",
      submit: "Submit Inquiry", sending: "Sending…",
      success: "Thank you. Your inquiry has been sent and our team will reply within one business day.",
      error: "We could not send your inquiry. Please try again or contact us by email.",
    },
    partnerTitle: "Why Partner with Marrant?",
    partnerPoints: ["Leather goods development and manufacturing", "Flexible customization for global markets", "Quality control throughout production", "Support from inquiry to after-sales"],
    contactTitle: "Contact Information",
    linksTitle: "Continue planning your collection",
    linksCopy: "Compare this wallet with our wider product range, manufacturing capabilities and sourcing guidance.",
    links: [
      { href: "/products", label: "Browse all collections", description: "Compare wallets, travel bags, backpacks and other leather goods." },
      { href: "/about#production", label: "See our production", description: "Understand the process and quality checkpoints behind an order." },
      { href: "/blog", label: "Read sourcing insights", description: "Prepare materials, construction and supplier requirements." },
      { href: "/contact#inquiry", label: "Start an inquiry", description: "Send your quantity, market and customization needs." },
    ],
  },
  zh: {
    home: "首页",
    products: "真皮产品",
    category: "男士钱包",
    name: "男士头层牛皮二折钱包",
    kicker: "男士真皮钱包 · SKU 8064",
    title: <>头层牛皮<br />男士二折钱包</>,
    intro: "采用头层牛皮制作的男士二折钱包，兼顾卡片、现金与拉链收纳，并支持标识、颜色、五金、内衬及包装定制。",
    request: "获取产品规格",
    chat: "联系定制团队",
    galleryLabel: "产品图片展示",
    showImage: "查看图片",
    factsLabel: "产品信息概览",
    facts: [
      ["产品编号", "8064"],
      ["材质", "头层牛皮"],
      ["尺寸", "12 × 2 × 10 cm"],
      ["款式", "男士二折钱包"],
      ["颜色", "5 种现有选项"],
      ["定制", "标识、颜色与细节"],
      ["MOQ", "根据需求确认"],
    ],
    specifications: "产品规格",
    specNote: "以上规格根据已提供的产品资料及图片整理；MOQ、打样周期及大货周期需结合最终定制方案确认。",
    specs: [
      { left: ["产品编号", "8064"], right: ["款式", "男士二折钱包"] },
      { left: ["尺寸", "12 × 2 × 10 cm"], right: ["材质", "头层牛皮"] },
      { left: ["结构", "二折式"], right: ["颜色", "黑色 / 棕色 / 红棕色 / 咖啡色 / 油咖啡色"] },
      { left: ["内部结构", "图片展示卡位与拉链位"], right: ["内衬", "可定制"] },
      { left: ["五金", "可定制"], right: ["品牌标识", "可定制"] },
      { left: ["包装", "可定制"], right: ["MOQ", "根据需求确认"] },
      { left: ["打样周期", "根据需求确认"], right: ["大货周期", "根据需求确认"] },
    ],
    materialTitle: "材料说明",
    materialName: "头层牛皮",
    materialCopy: "保留自然皮纹与色泽变化。具体皮料、厚度及表面处理将在打样阶段根据订单要求确认。",
    colorsTitle: "现有颜色",
    colorsCopy: "可结合订单数量评估颜色匹配及其他颜色开发。",
    customizationTitle: "OEM / ODM 定制",
    packagingTitle: "包装选项",
    processTitle: "订单流程",
    factoryKicker: "到访玛轮特",
    factoryTitle: "实地确认材料与制作工艺",
    factoryCopy: "欢迎品牌团队、进口商与产品开发人员到访广州，了解皮料选配、裁切、缝制、装配与品质检验。",
    factoryPoints: ["工厂负责人接待交流", "查看钱包结构与工艺", "沟通 OEM / ODM 定制需求"],
    factoryCta: "预约工厂参观",
    faqTitle: "常见采购问题",
    faqs: [
      ["8064 的起订量是多少？", "起订量暂未确认，需要结合皮料、颜色、标识工艺、包装和订单要求核算。"],
      ["可以调整内部结构吗？", "可以。请提供需要的卡位、现金位与零钱位结构，我们将在产品开发阶段评估。"],
      ["有哪些颜色可以选择？", "当前资料列出的颜色为黑色、棕色、红棕色、咖啡色与油咖啡色，最终色板需在打样前确认。"],
      ["可以定制品牌标识和包装吗？", "可以。收到品牌图稿及订单要求后，我们将评估适用的标识工艺与包装方案。"],
      ["打样和大货生产需要多久？", "目前均为待确认状态，将在皮料与定制细节确定后提供时间安排。"],
    ],
    inquiryTitle: "提交采购需求",
    inquiryCopy: "请提供 SKU 8064 的预计数量、目标市场与定制要求。",
    form: {
      name: "姓名 *", company: "公司名称", email: "电子邮箱 *", phone: "联系电话 *", country: "国家 / 地区",
      product: "意向产品", quantity: "预计采购数量", message: "需求说明 *", privacy: "我同意将以上信息用于本次采购咨询。",
      submit: "提交采购需求", sending: "正在发送…",
      success: "提交成功，我们将在一个工作日内回复。",
      error: "暂时无法发送，请稍后重试或直接通过邮箱联系我们。",
    },
    partnerTitle: "为什么选择玛轮特？",
    partnerPoints: ["专注真皮产品开发与制造", "面向不同市场提供灵活定制", "生产过程中的品质管控", "从需求沟通到售后持续跟进"],
    contactTitle: "联系方式",
    linksTitle: "继续规划您的产品系列",
    linksCopy: "结合更多产品、生产能力与采购内容，进一步明确钱包定制需求。",
    links: [
      { href: "/zh/products", label: "浏览全部产品", description: "对比钱包、旅行包、背包与其他真皮产品。" },
      { href: "/zh/about#production", label: "了解生产流程", description: "查看订单生产与品质检验环节。" },
      { href: "/zh/blog", label: "阅读采购内容", description: "明确材料、结构与供应商评估要求。" },
      { href: "/zh/contact#inquiry", label: "获取定制报价", description: "提供采购数量、目标市场与定制需求。" },
    ],
  },
} as const;

const gallery = {
  en: [
    { src: `${imageBase}/main.jpg`, alt: "SKU 8064 full-grain leather bifold wallet, main view" },
    { src: `${imageBase}/front.jpg`, alt: "SKU 8064 leather wallet angled front view" },
    { src: `${imageBase}/inside.jpg`, alt: "SKU 8064 bifold wallet interior with card slots and zip compartment" },
    { src: `${imageBase}/scenario.jpg`, alt: "SKU 8064 brown leather wallet in a tabletop setting" },
  ],
  zh: [
    { src: `${imageBase}/main.jpg`, alt: "8064 头层牛皮男士二折钱包主图" },
    { src: `${imageBase}/front.jpg`, alt: "8064 真皮钱包正面斜角展示" },
    { src: `${imageBase}/inside.jpg`, alt: "8064 二折钱包内部卡位与拉链收纳结构" },
    { src: `${imageBase}/scenario.jpg`, alt: "8064 棕色真皮钱包场景图" },
  ],
} as const;

const colors = [
  ["Black / 黑色", "#22201e"],
  ["Brown / 棕色", "#6c3f27"],
  ["Red Brown / 红棕", "#7b3526"],
  ["Coffee / 咖啡", "#49342b"],
  ["Oil Coffee / 油咖啡", "#795238"],
] as const;

const customization = {
  en: [
    { icon: Tag, title: "Logo", text: "Evaluate the logo treatment against your artwork." },
    { icon: Swatches, title: "Color", text: "Match listed colors or review custom development." },
    { icon: CheckCircle, title: "Hardware", text: "Confirm zippers and metal details during sampling." },
    { icon: PencilSimple, title: "Interior", text: "Adjust card, cash and coin storage to your brief." },
    { icon: Package, title: "Packaging", text: "Develop retail or export packaging for your market." },
  ],
  zh: [
    { icon: Tag, title: "品牌标识", text: "结合品牌图稿评估适用的标识工艺。" },
    { icon: Swatches, title: "颜色", text: "选用现有颜色或评估定制颜色开发。" },
    { icon: CheckCircle, title: "五金", text: "在打样阶段确认拉链与金属细节。" },
    { icon: PencilSimple, title: "内部结构", text: "按需求调整卡位、现金位与零钱位。" },
    { icon: Package, title: "包装", text: "根据销售市场开发零售或出口包装。" },
  ],
} as const;

const packaging = {
  en: [["Surface Protection", "Protect the leather"], ["Inner Packaging", "As requested"], ["Export Carton", "Order-ready packing"], ["Final Inspection", "Before shipment"]],
  zh: [["表面防护", "保护皮面"], ["内包装", "按需求配置"], ["出口外箱", "按订单装箱"], ["成品检验", "发货前检查"]],
} as const;

const process = {
  en: [[ChatCircleDots, "Inquiry", "Share your requirements"], [ClipboardText, "Confirm", "Details, cost & quantity"], [PencilSimple, "Sample", "Sample development"], [Factory, "Production", "Mass production"], [GlobeHemisphereWest, "Delivery", "Inspection & shipment"]],
  zh: [[ChatCircleDots, "需求沟通", "提供产品要求"], [ClipboardText, "方案确认", "确认细节、报价与数量"], [PencilSimple, "样品开发", "制作确认样品"], [Factory, "批量生产", "按确认样品量产"], [GlobeHemisphereWest, "包装交付", "检验、包装与发运"]],
} as const;

export default function Wallet8064Experience({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const images = gallery[locale];
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [status, setStatus] = useState<FormStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startedAt = useRef(Date.now());
  const prefix = locale === "zh" ? "/zh" : "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(values.get("name") ?? ""),
          email: String(values.get("email") ?? ""),
          phone: String(values.get("phone") ?? ""),
          country: String(values.get("country") ?? ""),
          product: `${String(values.get("product") ?? "")} | Quantity: ${String(values.get("quantity") ?? "Not provided")}`,
          message: String(values.get("message") ?? ""),
          website: String(values.get("website") ?? ""),
          startedAt: startedAt.current,
        }),
      });

      if (!response.ok) throw new Error("Inquiry request failed");
      form.reset();
      setStatus({ tone: "success", message: copy.form.success });
    } catch {
      setStatus({ tone: "error", message: copy.form.error });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="product-page" id="top">
      <div className="product-shell">
        <div className="breadcrumbs"><Link href={prefix || "/"}>{copy.home}</Link><span>›</span><Link href={`${prefix}/products`}>{copy.products}</Link><span>›</span><Link href={`${prefix}/products`}>{copy.category}</Link><span>›</span><b>{copy.name}</b></div>

        <section className="product-hero-detail">
          <aside className="gallery-thumbnails" aria-label={copy.galleryLabel}>
            {images.map((image, index) => <button className={activeImage === index ? "is-selected" : ""} type="button" key={image.src} onClick={() => setActiveImage(index)} aria-label={`${copy.showImage} ${index + 1}`}><Image src={image.src} alt="" width={100} height={100} /></button>)}
          </aside>
          <div className="gallery-stage"><Image src={images[activeImage].src} alt={images[activeImage].alt} width={1000} height={1000} priority sizes="(max-width: 760px) 100vw, 55vw" /></div>
          <div className="product-intro">
            <p className="product-kicker">{copy.kicker} <span /></p>
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
            <span className="product-intro-rule" />
            <a className="product-primary-button" href="#inquiry">{copy.request} <ArrowRight size={17} /></a>
            <a className="product-whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><WhatsappLogo size={18} /> {copy.chat}</a>
          </div>
        </section>

        <section className="quick-facts" aria-label={copy.factsLabel}>
          {copy.facts.map(([label, value]) => <div key={label}><strong>{label}</strong><span>{value}</span></div>)}
        </section>

        <section className="detail-section specifications" id="specifications">
          <div className="section-title"><p>{copy.specifications}</p><span /></div>
          <div className="spec-table">
            {copy.specs.map(({ left, right }) => <div className="spec-pair" key={right[0]}><div className="spec-row"><strong>{left[0]}</strong><span>{left[1]}</span></div><div className="spec-row"><strong>{right[0]}</strong><span>{right[1]}</span></div></div>)}
          </div>
          <small className="spec-note">{copy.specNote}</small>
        </section>

        <section className="detail-section option-grid" id="customization">
          <article className="material-card"><div className="section-title"><p>{copy.materialTitle}</p></div><Image src={`${imageBase}/front.jpg`} alt={images[1].alt} width={1000} height={1000} /><h2>{copy.materialName}</h2><p>{copy.materialCopy}</p></article>
          <article className="color-card"><div className="section-title"><p>{copy.colorsTitle}</p></div><div className="color-swatches wallet-color-swatches">{colors.map(([name, color]) => <button type="button" key={name} aria-label={name}><span style={{ backgroundColor: color }} /><small>{name}</small></button>)}</div><p>{copy.colorsCopy}</p></article>
          <article className="custom-card"><div className="section-title"><p>{copy.customizationTitle}</p></div><div className="custom-methods">{customization[locale].map(({ icon: Icon, title, text }) => <div key={title}><Icon size={28} weight="thin" /><strong>{title}</strong><small>{text}</small></div>)}</div></article>
        </section>

        <section className="detail-section delivery-grid" id="process">
          <article><div className="section-title"><p>{copy.packagingTitle}</p></div><div className="packaging-list">{packaging[locale].map(([title, text], index) => <div key={title}><Package size={40} weight="thin" /><strong>{title}</strong><small>{text}</small>{index < packaging[locale].length - 1 ? <ArrowRight className="packaging-arrow" size={16} weight="thin" /> : null}</div>)}</div></article>
          <article><div className="section-title"><p>{copy.processTitle}</p></div><div className="order-process">{process[locale].map(([Icon, title, text], index) => <div key={title as string} className="order-step"><span><Icon size={28} weight="thin" /></span><strong>{title as string}</strong><small>{text as string}</small>{index < process[locale].length - 1 ? <ArrowRight className="order-arrow" size={16} weight="thin" /> : null}</div>)}</div></article>
        </section>

        <section className="detail-section factory-visit" aria-label={copy.factoryTitle}>
          <Image src="/assets/product-detail/factory-client-visit-v1.png" alt={copy.factoryTitle} width={1200} height={800} />
          <div className="factory-visit-content"><p className="factory-visit-kicker">{copy.factoryKicker}</p><h2>{copy.factoryTitle}</h2><p>{copy.factoryCopy}</p><div className="factory-visit-points">{copy.factoryPoints.map((point) => <span key={point}><CheckCircle size={17} weight="fill" /> {point}</span>)}</div><Link className="product-primary-button" href={`${prefix}/about#visit`}>{copy.factoryCta} <ArrowRight size={17} /></Link></div>
        </section>

        <section className="detail-section faq-catalogue" id="faq">
          <article className="faq-list"><div className="section-title"><p>{copy.faqTitle}</p></div>{copy.faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>{question}<span>{openFaq === index ? "−" : "+"}</span></button>{openFaq === index ? <p>{answer}</p> : null}</div>)}</article>
          <article className="catalogue-card"><div><div className="section-title"><p>SKU 8064</p></div><p>{copy.intro}</p><a className="product-primary-button" href="#inquiry">{copy.request}</a></div><Image src={`${imageBase}/scenario.jpg`} alt={images[3].alt} width={1000} height={1000} /></article>
        </section>

        <section className="detail-section inquiry-section" id="inquiry">
          <form className="product-inquiry-form" onSubmit={handleSubmit}>
            <div className="section-title"><p>{copy.inquiryTitle}</p></div><p>{copy.inquiryCopy}</p>
            <div className="product-form-grid"><input required aria-label={copy.form.name} placeholder={copy.form.name} name="name" autoComplete="name" /><input aria-label={copy.form.company} placeholder={copy.form.company} name="company" autoComplete="organization" /><input required type="email" aria-label={copy.form.email} placeholder={copy.form.email} name="email" autoComplete="email" /><input required type="tel" aria-label={copy.form.phone} placeholder={copy.form.phone} name="phone" autoComplete="tel" /><input aria-label={copy.form.country} placeholder={copy.form.country} name="country" autoComplete="country-name" /><input readOnly aria-label={copy.form.product} name="product" value={`SKU 8064 · ${copy.name}`} /><input aria-label={copy.form.quantity} placeholder={copy.form.quantity} name="quantity" /></div>
            <textarea required aria-label={copy.form.message} placeholder={copy.form.message} name="message" rows={5} />
            <div hidden><label>Website<input autoComplete="off" name="website" tabIndex={-1} /></label></div>
            <label className="privacy-check"><input required type="checkbox" /> {copy.form.privacy}</label>
            <button className="product-primary-button product-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? copy.form.sending : copy.form.submit} <ArrowRight size={17} /></button>
            {status ? <p className="product-success" role={status.tone === "error" ? "alert" : "status"}>{status.message}</p> : null}
          </form>
          <aside className="partner-card"><div><div className="section-title"><p>{copy.partnerTitle}</p></div><ul>{copy.partnerPoints.map((point, index) => { const Icon = [ShieldCheck, Swatches, CheckCircle, ChatCircleDots][index]; return <li key={point}><Icon size={18} /> {point}</li>; })}</ul></div><div className="partner-contact"><strong>{copy.contactTitle}</strong><a href="mailto:Melody@marrant.cn">Melody@marrant.cn</a><a href={whatsapp} target="_blank" rel="noreferrer">+86 189 2507 3489</a><span>{locale === "zh" ? "中国 · 广州" : "Guangzhou, China"}</span></div></aside>
        </section>
      </div>

      <InternalLinkPanel title={copy.linksTitle} description={copy.linksCopy} links={[...copy.links]} />
    </main>
  );
}
