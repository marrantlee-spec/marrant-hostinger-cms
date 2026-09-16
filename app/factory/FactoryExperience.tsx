"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChatCircleDots,
  CheckCircle,
  Factory,
  GlobeHemisphereWest,
  MagnifyingGlass,
  Package,
  PencilSimple,
  SealCheck,
  ShieldCheck,
  Swatches,
} from "@phosphor-icons/react";
import FactoryInquiryForm from "./FactoryInquiryForm";
import styles from "./page.module.css";

const factoryCopy = {
  en: {
    heroKicker: "Genuine leather · Real people · Global brands",
    heroTitle: <>Made by Skilled Hands.<br />Built for Growing Brands.</>,
    heroBody: "OEM/ODM leather bag manufacturing for international importers, distributors, e-commerce brands and wholesale buyers.",
    startProject: "Start Your Project",
    visitFactory: "Visit Our Factory",
    heroNote: <>More than bags.<br />A shared tomorrow.</>,
    trustLabel: "What buyers can expect",
    trustPoints: [
      { Icon: PencilSimple, title: "Development Support", copy: "From your concept to samples, we help turn ideas into real products." },
      { Icon: Swatches, title: "Material Clarity", copy: "Leather, hardware and construction choices made easier to evaluate." },
      { Icon: MagnifyingGlass, title: "In-Process Quality", copy: "Checks at key production stages, not only at the end." },
      { Icon: GlobeHemisphereWest, title: "Global Delivery", copy: "Careful packing and coordinated shipment to your destination." },
    ],
    workshopKicker: "Craftsmanship in every detail",
    workshopTitle: <>Inside the<br />Marrant Workshop</>,
    workshopLead: "Real people. Real skills. Real leather bags.",
    workshopBody: "Take a closer look at the practical steps, material decisions and hands-on work that turn product ideas into finished leather goods.",
    seeProcess: "See Our Process",
    gallery: [
      ["Precision by Hand", "Details make the difference."],
      ["From Material to Product", "Built around your brief."],
      ["Selected Genuine Leathers", "A choice of textures and finishes."],
      ["Your Ideas, Our Craft", "OEM/ODM support for your brand."],
    ],
    processKicker: "Our OEM/ODM process",
    processTitle: <>From Your Idea<br />to the World</>,
    processBody: "A clear and collaborative route from product brief to delivery.",
    processSteps: [
      { Icon: ChatCircleDots, title: "Inquiry", copy: "Share your product idea, requirements and target market." },
      { Icon: PencilSimple, title: "Design & Sample", copy: "We develop and refine samples for your review." },
      { Icon: Factory, title: "Production", copy: "Careful manufacturing with consistent communication." },
      { Icon: ShieldCheck, title: "Quality Control", copy: "Multiple checks help keep each order on track." },
      { Icon: Package, title: "Global Delivery", copy: "Packed with care and prepared for shipment." },
    ],
    qualityKicker: "Quality is a promise",
    qualityTitle: <>Details Define<br />Lasting Bag Quality</>,
    qualityBody: "We focus on the details that matter, from raw materials to finished products.",
    qualityPoints: ["Material inspection before cutting", "Leather cutting accuracy", "Stitching and structure checks", "Hardware and accessory checks", "Finished product inspection", "Final appearance and packing review"],
    qualityQuote: <>“Same standards.<br />A stronger tomorrow.”</>,
    peopleKicker: "Real people. Lasting partnerships.",
    peopleTitle: <>People Behind<br />Every Partnership</>,
    peopleBody: "We meet global buyers at international trade shows and welcome visitors to our Guangzhou office—because better products begin with clear, honest conversations.",
    peopleCaptions: [["Meeting Global Partners", "Building trust through real conversations."], ["Our Guangzhou Team", "Dedicated, responsible and ready to listen."]],
    trademarkLabel: "Registered trademarks",
    trademarkBody: "Marrant is registered in the United Kingdom and the United States for Class 18 leather goods.",
    visitKicker: "Visit us in Guangzhou",
    visitTitle: <>See the Workshop.<br />Meet the Team.</>,
    visitBody: "Review products and materials side by side, ask detailed questions and discuss your project in person.",
    planVisit: "Plan a Factory Visit",
  },
  zh: {
    heroKicker: "真皮制造 · 真实团队 · 服务全球品牌",
    heroTitle: <>匠心制造，<br />助力品牌稳步成长。</>,
    heroBody: "为国际进口商、经销商、电商品牌与批发采购商提供真皮包袋 OEM / ODM 生产服务。",
    startProject: "开启定制项目",
    visitFactory: "预约参观工厂",
    heroNote: <>不止制造一只包，<br />更期待共同成长。</>,
    trustLabel: "采购商可以获得的支持",
    trustPoints: [
      { Icon: PencilSimple, title: "开发支持", copy: "从产品构想到样品落地，协助您把创意转化为可生产的产品。" },
      { Icon: Swatches, title: "材料透明", copy: "清晰确认皮料、五金与结构方案，让选材与评估更高效。" },
      { Icon: MagnifyingGlass, title: "过程质检", copy: "在关键生产节点进行检查，不把质量控制只留到最后。" },
      { Icon: GlobeHemisphereWest, title: "全球交付", copy: "妥善包装并协调运输，将订单安全送达您的市场。" },
    ],
    workshopKicker: "每一处细节，都来自认真工艺",
    workshopTitle: <>走进玛轮特<br />皮具制造现场</>,
    workshopLead: "真实团队，扎实工艺，专注真皮包袋。",
    workshopBody: "从材料选择、工艺确认到手工制作，了解产品构想如何一步步成为可交付的真皮制品。",
    seeProcess: "查看生产流程",
    gallery: [
      ["专注手工细节", "细节决定产品质感。"],
      ["从材料到成品", "围绕您的需求进行生产。"],
      ["甄选真皮材料", "提供多种纹理与表面效果。"],
      ["您的创意，我们实现", "为品牌提供 OEM / ODM 支持。"],
    ],
    processKicker: "我们的 OEM / ODM 合作流程",
    processTitle: <>从一个构想，<br />到进入全球市场</>,
    processBody: "从产品需求到订单交付，每一步都保持清晰沟通与协同推进。",
    processSteps: [
      { Icon: ChatCircleDots, title: "需求沟通", copy: "分享产品构想、定制要求与目标市场。" },
      { Icon: PencilSimple, title: "设计打样", copy: "根据反馈开发并优化样品，供您确认。" },
      { Icon: Factory, title: "批量生产", copy: "按确认标准组织生产，并保持进度沟通。" },
      { Icon: ShieldCheck, title: "质量检查", copy: "通过多道检查，保障订单稳定推进。" },
      { Icon: Package, title: "包装交付", copy: "妥善包装，按计划安排国际运输。" },
    ],
    qualityKicker: "质量，是我们对客户的承诺",
    qualityTitle: <>关注每个细节，<br />成就耐用品质</>,
    qualityBody: "从原材料到成品包装，我们持续关注真正影响产品品质的关键细节。",
    qualityPoints: ["裁切前材料检查", "皮料裁切精度", "车缝与结构检查", "五金与辅料检查", "成品质量检查", "外观与包装复核"],
    qualityQuote: <>“坚持同一标准，<br />共同走得更远。”</>,
    peopleKicker: "真实团队，长期合作",
    peopleTitle: <>每一次合作背后，<br />都是人与人的信任</>,
    peopleBody: "我们在国际展会上与全球采购商面对面交流，也欢迎客户到访广州办公室。好产品，始于清晰、坦诚的沟通。",
    peopleCaptions: [["与全球客户面对面", "在真实交流中建立信任。"], ["广州服务团队", "认真负责，随时倾听您的需求。"]],
    trademarkLabel: "国际注册商标",
    trademarkBody: "Marrant 已在英国及美国完成第18类皮具相关商标注册。",
    visitKicker: "欢迎来到广州",
    visitTitle: <>参观生产现场，<br />与团队当面交流</>,
    visitBody: "现场查看产品与材料，沟通工艺细节，并围绕您的项目进行更深入的讨论。",
    planVisit: "预约工厂参观",
  },
} as const;

export default function FactoryExperience({ locale = "en" }: { locale?: "en" | "zh-CN" }) {
  const chinese = locale === "zh-CN";
  const copy = chinese ? factoryCopy.zh : factoryCopy.en;
  return (
    <main className={`${styles.page} ${chinese ? styles.pageZh : ""}`}>
      <section className={styles.hero} aria-labelledby="factory-title">
        <Image className={styles.heroImage} src="/assets/product-detail/leather-production-workshop-v1.png" alt={chinese ? "玛轮特皮具工匠在车间缝制真皮旅行包" : "Leather artisan sewing a Marrant travel bag in the workshop"} fill loading="eager" fetchPriority="high" sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>{copy.heroKicker}</p>
          <h1 id="factory-title">{copy.heroTitle}</h1>
          <p>{copy.heroBody}</p>
          <div className={styles.actions}>
            <a className={styles.primaryButton} href="#factory-inquiry">{copy.startProject} <ArrowRight size={18} /></a>
            <a className={styles.secondaryButton} href="#visit">{copy.visitFactory} <ArrowRight size={18} /></a>
          </div>
        </div>
        <p className={styles.heroNote}>{copy.heroNote}</p>
      </section>

      <section className={styles.trust} aria-label={copy.trustLabel}>
        {copy.trustPoints.map(({ Icon, title, copy: pointCopy }) => (
          <article key={title}>
            <Icon size={39} weight="thin" aria-hidden="true" />
            <div><h2>{title}</h2><p>{pointCopy}</p></div>
          </article>
        ))}
      </section>

      <section className={styles.workshop} id="workshop" aria-labelledby="workshop-title">
        <div className={styles.workshopIntro}>
          <p className={styles.kicker}>{copy.workshopKicker}</p>
          <h2 id="workshop-title">{copy.workshopTitle}</h2>
          <p className={styles.lead}>{copy.workshopLead}</p>
          <p>{copy.workshopBody}</p>
          <a className={styles.primaryButton} href="#process">{copy.seeProcess} <ArrowRight size={18} /></a>
        </div>
        <div className={styles.workshopGallery}>
          <figure className={styles.galleryWide}>
            <Image src="/assets/product-detail/leather-production-workshop-v1.png" alt={chinese ? "皮具工匠使用工业缝纫机制作真皮包" : "Leather artisan guiding a bag through an industrial sewing machine"} fill loading="eager" sizes="(max-width: 760px) 100vw, 46vw" />
            <figcaption><strong>{copy.gallery[0][0]}</strong><span>{copy.gallery[0][1]}</span></figcaption>
          </figure>
          <figure>
            <Image src="/assets/products/crazy-horse-duffle-scene-v1.png" alt={chinese ? "制作完成的疯马皮旅行包" : "Finished Crazy Horse leather travel bag"} fill sizes="(max-width: 760px) 50vw, 25vw" />
            <figcaption><strong>{copy.gallery[1][0]}</strong><span>{copy.gallery[1][1]}</span></figcaption>
          </figure>
          <figure className={styles.galleryWide}>
            <Image src="/assets/product-detail/crazy-horse-leather-detail.png" alt={chinese ? "疯马皮纹理与黄铜五金细节" : "Crazy Horse leather texture and brass hardware"} fill sizes="(max-width: 760px) 100vw, 46vw" />
            <figcaption><strong>{copy.gallery[2][0]}</strong><span>{copy.gallery[2][1]}</span></figcaption>
          </figure>
          <figure>
            <Image src="/assets/brand/hero-leather-bags.jpg" alt={chinese ? "玛轮特真皮包袋产品系列" : "Marrant leather bag collection"} fill sizes="(max-width: 760px) 50vw, 25vw" />
            <figcaption><strong>{copy.gallery[3][0]}</strong><span>{copy.gallery[3][1]}</span></figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.process} id="process" aria-labelledby="process-title">
        <div className={styles.processIntro}>
          <p className={styles.kicker}>{copy.processKicker}</p>
          <h2 id="process-title">{copy.processTitle}</h2>
          <p>{copy.processBody}</p>
        </div>
        <ol className={styles.processGrid}>
          {copy.processSteps.map(({ Icon, title, copy: stepCopy }, index) => (
            <li key={title}>
              <span className={styles.stepNumber}>{index + 1}</span>
              <span className={styles.stepIcon}><Icon size={23} weight="thin" aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{stepCopy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.quality} id="quality" aria-labelledby="quality-title">
        <div className={styles.qualityImage}>
          <Image src="/assets/product-detail/crazy-horse-leather-detail.png" alt={chinese ? "疯马皮皮纹与黄铜五金特写" : "Close-up of Crazy Horse leather grain and brass hardware"} fill sizes="(max-width: 760px) 100vw, 50vw" />
        </div>
        <div className={styles.qualityCopy}>
          <p className={styles.kicker}>{copy.qualityKicker}</p>
          <h2 id="quality-title">{copy.qualityTitle}</h2>
          <p>{copy.qualityBody}</p>
          <ul>
            {copy.qualityPoints.map((point) => <li key={point}><CheckCircle size={18} weight="fill" aria-hidden="true" />{point}</li>)}
          </ul>
        </div>
        <blockquote>{copy.qualityQuote}</blockquote>
      </section>

      <section className={styles.people} aria-labelledby="people-title">
        <div className={styles.peopleIntro}>
          <p className={styles.kicker}>{copy.peopleKicker}</p>
          <h2 id="people-title">{copy.peopleTitle}</h2>
          <p>{copy.peopleBody}</p>
        </div>
        <figure>
          <Image src="/assets/factory/marrant-trade-show-client-visit.jfif" alt={chinese ? "玛轮特团队在皮具展会上与国际采购商合影" : "Marrant team meeting an international buyer at a leather goods trade show"} fill sizes="(max-width: 760px) 100vw, 37vw" />
          <figcaption><strong>{copy.peopleCaptions[0][0]}</strong><span>{copy.peopleCaptions[0][1]}</span></figcaption>
        </figure>
        <figure>
          <Image src="/assets/factory/marrant-office-client-visit.jpg" alt={chinese ? "玛轮特团队在广州办公室接待国际客户" : "Marrant team welcoming international visitors at the Guangzhou office"} fill sizes="(max-width: 760px) 100vw, 37vw" />
          <figcaption><strong>{copy.peopleCaptions[1][0]}</strong><span>{copy.peopleCaptions[1][1]}</span></figcaption>
        </figure>
      </section>

      <section className={styles.trademark} aria-label="Registered trademarks">
        <SealCheck size={38} weight="thin" aria-hidden="true" />
        <div><p>{copy.trademarkLabel}</p><strong>{copy.trademarkBody}</strong></div>
        <span>Marrant<sup>®</sup></span>
      </section>

      <section className={styles.visit} id="visit" aria-labelledby="visit-title">
        <div className={styles.visitVisual}>
          <Image src="/assets/product-detail/factory-client-visit-v1.png" alt={chinese ? "国际采购商参观玛轮特皮具生产现场" : "International buyers visiting the Marrant leather workshop"} fill sizes="(max-width: 880px) 100vw, 45vw" />
          <div className={styles.visitShade} />
          <div>
            <p className={styles.kicker}>{copy.visitKicker}</p>
            <h2 id="visit-title">{copy.visitTitle}</h2>
            <p>{copy.visitBody}</p>
            <Link className={styles.secondaryButton} href={chinese ? "/zh/contact#inquiry" : "/contact#inquiry"}>{copy.planVisit} <ArrowRight size={18} /></Link>
          </div>
        </div>
        <FactoryInquiryForm locale={locale} />
      </section>

    </main>
  );
}
