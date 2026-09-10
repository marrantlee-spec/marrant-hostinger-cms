"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import InternalLinkPanel from "../../components/InternalLinkPanel";
import { ArrowRight, ChatCircleDots, CheckCircle, ClipboardText, DownloadSimple, Factory, GlobeHemisphereWest, Lightbulb, Package, PencilSimple, ShieldCheck, Swatches, Tag, WhatsappLogo } from "@phosphor-icons/react";

const whatsapp = "https://wa.me/8618925073489";

const gallery = [
  { src: "/assets/product-detail/travel-tote-front.png", alt: "疯马皮真皮旅行托特包正面" },
  { src: "/assets/product-detail/leather-production-workshop-v1.png", alt: "玛轮特工匠在车间缝制真皮旅行包", position: "center" },
  { src: "/assets/products/crazy-horse-duffle.png", alt: "疯马皮旅行包" },
  { src: "/assets/product-detail/crazy-horse-leather-detail.png", alt: "疯马皮纹理与黄铜色五金细节" },
  { src: "/assets/products/leather-messenger.png", alt: "真皮单肩包" },
];

const quickFacts = [
  ["材料要求", "疯马皮系列"],
  ["产品尺寸", "长 × 宽 × 高（可定制）"],
  ["标识工艺", "凹印 / 凸印 / 激光 / 烫印"],
  ["颜色", "可按需求定制"],
  ["包装", "防护袋与外箱"],
  ["样品周期", "根据需求确认"],
  ["MOQ", "根据需求确认"],
];

const specificationPairs = [
  { left: ["款式", "旅行托特包"], right: ["尺寸（长×宽×高）", "根据需求确认"] },
  { left: ["材料要求", "疯马皮系列"], right: ["提手高度", "根据需求确认"] },
  { left: ["内衬", "根据需求确认"], right: ["肩带", "可拆卸、可调节"] },
  { left: ["五金", "实心黄铜"], right: ["颜色", "可按需求定制"] },
  { left: ["开合方式", "根据需求确认"], right: ["标识工艺", "根据需求确认"] },
  { left: ["外部结构", "根据需求确认"], right: ["MOQ", "根据需求确认"] },
  { left: ["内部结构", "根据需求确认"], right: ["样品周期", "根据需求确认"] },
  { left: null, right: ["生产周期", "根据需求确认"] },
];

const colors = [
  ["干邑棕色", "#9a4f22"],
  ["深棕色", "#4f3020"],
  ["咖啡色", "#745440"],
  ["黑色", "#242321"],
];

const customization = [
  { icon: Tag, title: "凹印", text: "在皮面压出内凹标识，低调呈现品牌。" },
  { icon: CheckCircle, title: "凸印", text: "形成凸起标识，突出触感与品牌细节。" },
  { icon: Lightbulb, title: "激光雕刻", text: "根据适用材料，精细呈现品牌图案。" },
  { icon: Swatches, title: "烫印", text: "为选定的品牌元素增加精致表面效果。" },
];

const packaging = [
  ["防护袋", "无纺布材质"],
  ["内部防护", "按需求配置"],
  ["出口外箱", "可定制"],
  ["准备发运", "成品检验"],
];

const process = [
  [ChatCircleDots, "需求沟通", "提供产品需求"],
  [ClipboardText, "方案确认", "确认细节、报价与数量"],
  [PencilSimple, "样品开发", "制作确认样品"],
  [Factory, "批量生产", "按确认样品量产"],
  [GlobeHemisphereWest, "包装交付", "检验、包装与发运"],
];

const faqs = [
  ["是否可以定制尺寸与内部结构？", "可以。请提供目标尺寸、隔层要求与使用场景，我们将评估产品开发方案。"],
  ["这款真皮包的起订量是多少？", "起订量需结合皮料、五金、标识工艺及订单要求确认。"],
  ["样品制作需要多长时间？", "打样周期取决于材料与定制程度，我们将在评估需求后确认时间安排。"],
  ["品牌标识需要提供什么格式？", "建议提供矢量格式文件。您也可以先发送现有资料，由团队确认适合的制作工艺。"],
  ["如何确认付款条件？", "请提供产品需求与交付地区，销售团队将结合订单方案提供报价与适用付款条件。"],
];

export default function TravelToteProductPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="product-page" id="top">

      <div className="product-shell">
        <div className="breadcrumbs"><Link href="/zh">首页</Link><span>›</span><Link href="/zh/products">真皮包</Link><span>›</span><Link href="/zh/products">真皮旅行包</Link><span>›</span><b>疯马皮真皮旅行托特包</b></div>

        <section className="product-hero-detail">
          <aside className="gallery-thumbnails" aria-label="产品图片展示">
            {gallery.map((image, index) => <button className={activeImage === index ? "is-selected" : ""} type="button" key={image.src} onClick={() => setActiveImage(index)} aria-label={`Show image ${index + 1}`}><img src={image.src} alt="" style={{ objectPosition: image.position }} /></button>)}
          </aside>
          <div className="gallery-stage"><img src={gallery[activeImage].src} alt={gallery[activeImage].alt} style={{ objectPosition: gallery[activeImage].position }} /></div>
          <div className="product-intro">
            <p className="product-kicker">真皮旅行托特包 <span /></p>
            <h1>疯马皮<br />真皮旅行<br />托特包</h1>
            <p>兼顾复古质感与日常实用性，采用疯马皮与黄铜五金，可按品牌需求评估尺寸、收纳结构及细节定制。</p>
            <span className="product-intro-rule" />
            <a className="product-primary-button" href="#inquiry">获取产品规格 <ArrowRight size={17} /></a>
            <a className="product-whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><WhatsappLogo size={18} /> 联系定制团队</a>
          </div>
        </section>

        <section className="quick-facts" aria-label="产品信息概览">
          {quickFacts.map(([label, value]) => <div key={label}><strong>{label}</strong><span>{value}</span></div>)}
        </section>

        <section className="detail-section specifications" id="specifications">
          <div className="section-title"><p>产品规格</p><span /></div>
          <div className="spec-table">
            {specificationPairs.map(({ left, right }) => <div className="spec-pair" key={right[0]}>{left ? <div className="spec-row"><strong>{left[0]}</strong><span>{left[1]}</span></div> : <div className="spec-row spec-row-empty" aria-hidden="true" />}{<div className="spec-row"><strong>{right[0]}</strong><span>{right[1]}</span></div>}</div>)}
          </div>
          <small className="spec-note">注：具体规格可根据需求评估定制，以双方确认资料为准。</small>
        </section>

        <section className="detail-section option-grid" id="customization">
          <article className="material-card"><div className="section-title"><p>材料选配</p></div><img src="/assets/product-detail/crazy-horse-leather-detail.png" alt="疯马皮纹理与黄铜五金" /><h2>疯马皮系列</h2><p>具有自然变色效果的全粒面牛皮。 <Link href="/zh/blog/how-to-source-crazy-horse-leather-travel-tote-bag#why-crazy-horse">阅读皮料采购指南</Link>.</p></article>
          <article className="color-card"><div className="section-title"><p>颜色选配</p></div><div className="color-swatches">{colors.map(([name, color]) => <button type="button" key={name} aria-label={name}><span style={{ backgroundColor: color }} /><small>{name}</small></button>)}</div><p>可根据需求评估定制颜色。</p></article>
          <article className="custom-card"><div className="section-title"><p>标识与品牌定制</p></div><div className="custom-methods">{customization.map(({ icon: Icon, title, text }) => <div key={title}><Icon size={28} weight="thin" /><strong>{title}</strong><small>{text}</small></div>)}</div></article>
        </section>

        <section className="detail-section delivery-grid" id="process">
          <article><div className="section-title"><p>包装方案</p></div><div className="packaging-list">{packaging.map(([title, text], index) => <div key={title}><Package size={40} weight="thin" /><strong>{title}</strong><small>{text}</small>{index < packaging.length - 1 && <ArrowRight className="packaging-arrow" size={16} weight="thin" />}</div>)}</div></article>
          <article><div className="section-title"><p>订单流程</p></div><div className="order-process">{process.map(([Icon, title, text], index) => { const StepIcon = Icon as typeof Lightbulb; return <div key={title as string} className="order-step"><span><StepIcon size={28} weight="thin" /></span><strong>{title as string}</strong><small>{text as string}</small>{index < process.length - 1 && <ArrowRight className="order-arrow" size={16} weight="thin" />}</div>; })}</div></article>
        </section>

        <section className="detail-section factory-visit" aria-label="参观玛轮特皮具工厂">
          <img src="/assets/product-detail/factory-client-visit-v1.png" alt="玛轮特负责人带领采购商参观真皮包生产车间" loading="lazy" decoding="async" />
          <div className="factory-visit-content"><p className="factory-visit-kicker">到访玛轮特</p><h2>实地了解真皮包如何制造</h2><p>欢迎品牌团队、进口商与产品开发人员参观生产现场，了解皮料选配、裁切、缝制、五金装配与成品检验。</p><div className="factory-visit-points"><span><CheckCircle size={17} weight="fill" /> 工厂负责人接待交流</span><span><CheckCircle size={17} weight="fill" /> 实地了解真皮包生产</span><span><CheckCircle size={17} weight="fill" /> 沟通 OEM / ODM 定制需求</span></div><Link className="product-primary-button" href="/zh/about#visit">预约工厂参观 <ArrowRight size={17} /></Link></div>
        </section>

        <section className="detail-section faq-catalogue" id="faq">
          <article className="faq-list"><div className="section-title"><p>常见采购问题</p></div>{faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>{question}<span>{openFaq === index ? "−" : "+"}</span></button>{openFaq === index && <p>{answer}</p>}</div>)}</article>
          <article className="catalogue-card"><div><div className="section-title"><p>产品目录</p></div><p>获取产品目录，了解更多包型、材料与定制选项。</p><a className="product-primary-button" href="#inquiry"><DownloadSimple size={18} /> 索取产品目录</a></div><img src="/assets/brand/hero-leather-bags.jpg" alt="玛轮特真皮包产品目录" /></article>
        </section>

        <section className="detail-section inquiry-section" id="inquiry">
          <form className="product-inquiry-form" onSubmit={handleSubmit}>
            <div className="section-title"><p>提交采购需求</p></div><p>提供产品与采购要求，团队将为您评估相应方案。</p>
            <div className="product-form-grid"><input required aria-label="请填写姓名" placeholder="姓名 *" name="name" /><input aria-label="公司名称" placeholder="公司名称" name="company" /><input required type="email" aria-label="电子邮箱" placeholder="电子邮箱 *" name="email" /><input aria-label="国家或地区" placeholder="国家 / 地区" name="country" /><input aria-label="意向产品" placeholder="意向产品" name="interest" /><input aria-label="预计采购数量" placeholder="预计采购数量" name="quantity" /></div>
            <textarea required aria-label="需求说明" placeholder="需求说明 *" name="message" rows={5} />
            <label className="privacy-check"><input required type="checkbox" /> 我同意将以上信息用于本次采购咨询。</label>
            <button className="product-primary-button product-submit" type="submit">提交采购需求 <ArrowRight size={17} /></button>
            {submitted && <p className="product-success" role="status">此处信息尚未发送，请<Link href="/zh/contact#inquiry" style={{ textDecoration: "underline" }}>前往联系表单</Link>提交产品需求。</p>}
          </form>
          <aside className="partner-card" id="about-marrant"><div><div className="section-title"><p>为什么选择玛轮特？</p></div><ul><li><ShieldCheck size={18} /> 专注真皮包开发与制造</li><li><Swatches size={18} /> 为不同市场提供灵活定制</li><li><CheckCircle size={18} /> 重视品质管控与订单交付</li><li><ChatCircleDots size={18} /> 从需求沟通到售后持续跟进</li></ul></div><div className="partner-contact"><strong>联系方式</strong><a href="mailto:Melody@marrant.cn">Melody@marrant.cn</a><a href={whatsapp} target="_blank" rel="noreferrer">+86 189 2507 3489</a><span>中国 · 广州</span></div></aside>
        </section>
      </div>

      <InternalLinkPanel
        title="规划完整产品系列"
        description="结合产品系列、采购指南与工厂信息，将样品方向细化为明确的制造需求。"
        links={[
          { href: "/zh/products", label: "浏览全部产品", description: "对比旅行、商务与日常真皮包品类。" },
          { href: "/zh/blog/how-to-source-crazy-horse-leather-travel-tote-bag", label: "阅读采购指南", description: "明确材料、五金、结构与供应商评估标准。" },
          { href: "/zh/about#quality", label: "了解品质管控", description: "了解实现订单品质一致性的生产管理。" },
          { href: "/zh/contact#inquiry", label: "获取定制报价", description: "提供预计数量、目标市场与定制要求。" },
        ]}
      />
    </main>
  );
}
