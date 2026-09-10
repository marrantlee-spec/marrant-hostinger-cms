"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InternalLinkPanel from "../components/InternalLinkPanel";
import {
  ArrowRight,
  ChatCircleDots,
  CheckCircle,
  ClipboardText,
  Factory,
  List,
  Package,
  PencilSimple,
  ShieldCheck,
  Swatches,
  X,
} from "@phosphor-icons/react";
import styles from "../../about/page.module.css";

const expectationCards = [
  { icon: PencilSimple, title: "产品开发", copy: "从设计图到实物样品，协助您的产品方案落地。" },
  { icon: Swatches, title: "材料与工艺确认", copy: "明确皮料、五金与结构要求，减少沟通偏差。" },
  { icon: ShieldCheck, title: "过程品质管控", copy: "在关键工序设置检查点，将质量管理贯穿生产。" },
  { icon: Package, title: "包装与交付", copy: "根据订单要求包装，并协调发运至目的地。" },
];

const processSteps = [
  { icon: ChatCircleDots, title: "需求沟通", copy: "提供产品构想、品类与定制要求。" },
  { icon: PencilSimple, title: "打样与确认", copy: "制作样品，供您确认材料、版型与工艺。" },
  { icon: ClipboardText, title: "批量生产", copy: "按确认样品组织生产，管控批次品质。" },
  { icon: ShieldCheck, title: "品质检验", copy: "依据确认标准，检验功能与外观。" },
  { icon: Package, title: "包装交付", copy: "根据订单要求包装，并协调发运至目的地。" },
];

const qualityPoints = [
  "裁切前检查皮料与辅料",
  "关键工序进行过程检查",
  "检查使用功能与外观工艺",
  "发现问题及时沟通处理",
  "包装前进行成品检验",
];

export default function AboutExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/zh" className={styles.brand} aria-label="玛轮特皮具首页">
          <Image src="/assets/brand/marrant-logo.png" alt="Marrant" width={166} height={40} priority />
        </Link>
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} aria-label="主导航">
          <Link href="/zh/products" onClick={closeMenu}>产品系列</Link>
          <Link href="/zh/#oem" onClick={closeMenu}>OEM/ODM</Link>
          <a href="#production" onClick={closeMenu}>工厂实力</a>
          <Link href="/zh/blog" onClick={closeMenu}>采购指南</Link>
          <Link className={styles.activeNav} href="/zh/about" onClick={closeMenu}>关于我们</Link>
          <Link className={styles.mobileQuote} href="/zh/contact#inquiry" onClick={closeMenu}>获取定制报价</Link>
        </nav>
        <Link className={styles.headerCta} href="/zh/contact#inquiry">获取定制报价</Link>
        <button className={styles.menuButton} type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="展开或收起导航" aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <List size={24} />}
        </button>
      </header>

      <section className={styles.hero} aria-labelledby="page-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>关于玛轮特皮具</p>
          <h1 id="page-title">看得见的工厂，<br />值得信赖的伙伴。</h1>
          <p className={styles.lead}>清晰的信息、可了解的生产流程与稳定的品质，帮助采购商评估真皮包供应商，为品牌选对制造合作伙伴。</p>
          <div className={styles.heroActions}>
            <a className={styles.outlineButton} href="#visit">预约工厂参观 <ArrowRight size={17} /></a>
            <Link className={styles.outlineButton} href="/zh/contact#inquiry">获取定制报价 <ArrowRight size={17} /></Link>
          </div>
        </div>
        <div className={styles.heroMedia}>
          <Image src="/assets/product-detail/factory-client-visit-v1.png" alt="玛轮特团队接待采购商参观皮具车间" fill priority sizes="(max-width: 900px) 100vw, 58vw" />
        </div>
      </section>

      <section className={styles.expectations} id="proof" aria-labelledby="expectations-title">
        <p className={styles.kicker}>我们的制造支持</p>
        <h2 id="expectations-title" className={styles.srOnly}>玛轮特皮具提供的合作支持</h2>
        <div className={styles.expectationGrid}>
          {expectationCards.map(({ icon: Icon, title, copy }) => (
            <article key={title}>
              <Icon size={36} weight="thin" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.production} id="production" aria-labelledby="production-title">
        <div className={styles.productionIntro}>
          <p className={styles.kicker}>走近皮具生产现场</p>
          <h2 id="production-title">用心制造，<br />为品牌定制。</h2>
          <p>将皮具工艺经验与规范生产流程相结合，让您了解产品如何制造、进度如何安排，以及关键环节如何管控。</p>
          <a className={styles.outlineButton} href="#process">了解生产流程 <ArrowRight size={17} /></a>
        </div>
        <div className={styles.productionCollage} aria-label="真皮包、皮料与车间工艺展示">
          <div className={styles.bagStillLife}><Image src="/assets/brand/hero-leather-bags.jpg" alt="玛轮特真皮包系列" fill sizes="(max-width: 900px) 100vw, 40vw" /></div>
          <div className={styles.leatherTexture}><Image src="/assets/product-detail/crazy-horse-leather-detail.png" alt="疯马皮纹理与黄铜色五金细节" fill sizes="(max-width: 900px) 50vw, 20vw" /></div>
          <div className={styles.workshopDetail}><Image src="/assets/product-detail/leather-production-workshop-v1.png" alt="玛轮特车间真皮包制作工艺" fill sizes="(max-width: 900px) 50vw, 20vw" /></div>
          <div className={styles.travelBag}><Image src="/assets/product-detail/travel-tote-front.png" alt="真皮旅行包细节" fill sizes="(max-width: 900px) 50vw, 20vw" /></div>
        </div>
      </section>

      <section className={styles.process} id="process" aria-labelledby="process-title">
        <p className={styles.kicker}>合作流程</p>
        <h2 id="process-title">从询盘沟通到订单交付</h2>
        <div className={styles.processGrid}>
          {processSteps.map(({ icon: Icon, title, copy }, index) => (
            <article key={title}>
              <span className={styles.processIcon}><Icon size={24} weight="thin" aria-hidden="true" /></span>
              {index < processSteps.length - 1 && <i aria-hidden="true" />}
              <h3>{index + 1}. {title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.quality} id="quality" aria-labelledby="quality-title">
        <div className={styles.qualityCopy}>
          <p className={styles.kicker}>贯穿生产的品质管控</p>
          <h2 id="quality-title">把品质要求<br />落实到每一道工序</h2>
          <ul>
            {qualityPoints.map((point) => <li key={point}><CheckCircle size={18} weight="regular" aria-hidden="true" />{point}</li>)}
          </ul>
        </div>
        <div className={styles.qualityImage}><Image src="/assets/product-detail/leather-production-workshop-v1.png" alt="玛轮特工匠检查真皮包工艺" fill sizes="(max-width: 900px) 100vw, 33vw" /></div>
        <aside className={styles.peopleCard}>
          <h3>专业团队，<br />认真对待每个环节。</h3>
          <p>玛轮特团队深入参与产品开发与生产管理，重视清晰沟通、责任落实和长期合作。</p>
          <Image src="/assets/brand/founders.jpg" alt="玛轮特皮具创始团队" width={250} height={250} sizes="(max-width: 900px) 200px, 17vw" />
        </aside>
      </section>

      <section className={styles.visit} id="visit" aria-labelledby="visit-title">
        <div className={styles.visitIntro}>
          <p className={styles.kicker}>参观广州皮具工厂</p>
          <h2 id="visit-title">预约您的<br />工厂参观</h2>
          <p>实地了解生产，与团队面对面沟通，共同评估产品与样品。</p>
          <p>我们将根据您的项目需求安排接待与资料准备。</p>
        </div>
        <form className={styles.visitForm} onSubmit={handleSubmit}>
          <label><span>姓名 <b>*</b></span><input required name="name" autoComplete="name" placeholder="请填写姓名" /></label>
          <label><span>电子邮箱 <b>*</b></span><input required type="email" name="email" autoComplete="email" placeholder="you@email.com" /></label>
          <label><span>公司</span><input name="company" autoComplete="organization" placeholder="请填写公司名称" /></label>
          <label><span>国家 / 地区</span><input name="region" autoComplete="country-name" placeholder="请填写国家或地区" /></label>
          <label><span>产品品类</span><select name="product" defaultValue=""><option value="" disabled>请选择产品品类</option><option>真皮托特包</option><option>真皮旅行包</option><option>真皮背包</option><option>OEM 皮具定制项目</option></select></label>
          <label><span>意向参观日期</span><input type="date" name="visitDate" /></label>
          <label className={styles.message}><span>需求说明</span><textarea name="message" rows={3} placeholder="请说明希望了解的产品、工艺或合作事项。" /></label>
          <button type="submit">提交参观需求 <ArrowRight size={17} /></button>
          {submitted && <p className={styles.success} role="status">此处信息尚未发送，请<Link href="/zh/contact#inquiry" style={{ textDecoration: "underline" }}>前往联系表单</Link>提交参观需求。</p>}
        </form>
        <div className={styles.quoteCard}>
          <p className={styles.kicker}>开始定制合作</p>
          <h2>获取定制报价</h2>
          <p>提供产品资料与采购要求，我们将评估并提供适合的制造方案。</p>
          <Link className={styles.outlineButton} href="/zh/contact#inquiry">获取定制报价 <ArrowRight size={17} /></Link>
        </div>
      </section>

      <InternalLinkPanel
        title="评估适合的制造伙伴"
        description="结合制造能力、产品细节与采购流程，深入了解广州玛轮特皮具。"
        links={[
          { href: "/zh/products/crazy-horse-leather-travel-tote-bag", label: "查看产品实例", description: "查看可定制的皮料、五金与结构细节。" },
          { href: "/zh/products", label: "浏览产品系列", description: "从适合目标市场的真皮包品类开始。" },
          { href: "/zh/blog/how-to-source-crazy-horse-leather-travel-tote-bag", label: "阅读采购指南", description: "询价前明确材料、工艺与订单要求。" },
          { href: "/zh/contact#inquiry", label: "联系专业团队", description: "获取定制报价，或预约工厂参观。" },
        ]}
      />

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <Image src="/assets/brand/marrant-logo.png" alt="Marrant" width={148} height={36} />
            <p>专业真皮包厂家，为您的品牌定制。</p>
            <a href="mailto:Melody@marrant.cn">Melody@marrant.cn</a>
            <a href="https://wa.me/8618925073489" target="_blank" rel="noreferrer">+86 189 2507 3489</a>
          </div>
          <div><h3>产品系列</h3><Link href="/zh/products/crazy-horse-leather-travel-tote-bag">疯马皮系列</Link><Link href="/zh/products">旅行托特包</Link><Link href="/zh/products">男士钱包</Link><Link href="/zh/products">真皮单肩包</Link></div>
          <div><h3>OEM/ODM</h3><Link href="/zh/#oem">定制服务</Link><a href="#process">合作流程</a><Link href="/zh/products/crazy-horse-leather-travel-tote-bag#customization">材料选配</Link><Link href="/zh/contact#inquiry">品牌贴牌</Link></div>
          <div><h3>采购指南</h3><Link href="/zh/blog/how-to-source-crazy-horse-leather-travel-tote-bag">材料选配指南</Link><Link href="/zh/blog">采购博客</Link><Link href="/zh/blog/how-to-source-crazy-horse-leather-travel-tote-bag#comparison">供应商评估要点</Link></div>
          <div><h3>关于我们</h3><a href="#production">工厂介绍</a><a href="#quality">选择玛轮特</a><Link href="/zh/contact">联系我们</Link></div>
        </div>
        <div className={styles.footerBottom}><span>© 2026 玛轮特皮具 版权所有。</span><span>隐私政策 &nbsp;|&nbsp; 使用条款</span></div>
      </footer>
    </main>
  );
}
