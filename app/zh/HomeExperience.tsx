"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import InternalLinkPanel from "./components/InternalLinkPanel";
import {
  ArrowRight,
  CaretDown,
  CheckCircle,
  ClipboardText,
  Factory,
  GlobeHemisphereWest,
  Handshake,
  Lightbulb,
  List,
  MagnifyingGlass,
  Package,
  PencilSimple,
  ShieldCheck,
  Swatches,
  Tag,
  WhatsappLogo,
  X
} from "@phosphor-icons/react";

const whatsapp = "https://wa.me/8618925073489";

const productCards = [
  { title: "疯马皮系列", image: "/assets/products/crazy-horse-duffle-scene-v1.png", href: "/zh/products/crazy-horse-leather-travel-tote-bag" },
  { title: "旅行托特包", image: "/assets/products/black-travel-tote-scene-v1.png", href: "/zh/products" },
  { title: "男士钱包", image: "/assets/products/mens-wallet-45-scene-v1.png", href: "/zh/products" },
  { title: "真皮单肩包", image: "/assets/products/mens-shoulder-bag-scene-v2.png", href: "/zh/products" },
  { title: "真皮背包", image: "/assets/products/leather-backpack-centered-scene-v2.png", href: "/zh/products" },
  { title: "女士真皮包", image: "/assets/products/womens-coffee-handbag-red-patent-wallet-scene-v2.png", href: "/zh/products" }
];

const services = [
  { icon: PencilSimple, title: "产品开发", text: "从设计图到实物样品，协助您的产品方案落地。" },
  { icon: Swatches, title: "材料选配与定制", text: "根据目标市场，定制皮料、五金与工艺细节。" },
  { icon: Factory, title: "灵活生产", text: "根据订单规模与产品要求，匹配生产方案。" },
  { icon: Tag, title: "品牌贴牌", text: "以成熟皮具工艺，呈现您的品牌特色。" }
];

const process = [
  { icon: Lightbulb, title: "1. 需求沟通", text: "明确产品定位、设计方向与采购需求。" },
  { icon: PencilSimple, title: "2. 设计打样", text: "开发并完善样品，供您确认工艺与细节。" },
  { icon: ClipboardText, title: "3. 批量生产", text: "按确认样品组织生产，管控批次品质。" },
  { icon: MagnifyingGlass, title: "4. 品质检验", text: "按双方确认的标准进行检验。" },
  { icon: Package, title: "5. 包装交付", text: "按运输与销售要求包装，安排订单交付。" }
];

const faqs = [
  "真皮包定制的起订量是多少？",
  "是否支持自有设计与品牌标识定制？",
  "获取报价需要提供哪些资料？",
  "打样和批量生产需要多长时间？",
  "工厂如何管控产品品质？"
];

type MegaMenuKey = "products" | "services";

type MegaMenu = {
  eyebrow: string;
  title: string;
  copy: string;
  links: { label: string; description: string; href: string }[];
  feature: { label: string; title: string; image: string; href: string };
};

const megaMenus: Record<MegaMenuKey, MegaMenu> = {
  products: {
    eyebrow: "真皮包产品系列",
    title: "面向不同市场的真皮包供应方案。",
    copy: "探索商务、旅行与日常场景的真皮包定制款式。",
    links: [
      { label: "疯马皮系列", description: "复古皮质，耐用工艺", href: "/zh/products/crazy-horse-leather-travel-tote-bag" },
      { label: "旅行托特包", description: "兼顾日常通勤与旅行收纳", href: "/zh/products" },
      { label: "男士钱包", description: "精致钱包与小皮件", href: "/zh/products" },
      { label: "背包与单肩包", description: "丰富版型，完善品牌产品线", href: "/zh/products" }
    ],
    feature: { label: "推荐系列", title: "疯马皮系列", image: "/assets/products/crazy-horse-duffle.png", href: "/zh/products/crazy-horse-leather-travel-tote-bag" }
  },
  services: {
    eyebrow: "OEM / ODM",
    title: "您的产品构想，我们的制造经验。",
    copy: "从产品构思到成品交付，提供清晰、灵活的 OEM 皮具定制与 ODM 皮具制造支持。",
    links: [
      { label: "产品开发", description: "设计评估、样品开发与工艺优化", href: "#oem" },
      { label: "材料选配与定制", description: "皮料、五金与表面处理选配", href: "#oem" },
      { label: "灵活生产", description: "匹配不同阶段的订单需求", href: "#oem" },
      { label: "品牌贴牌", description: "围绕品牌定位定制产品细节", href: "#oem" }
    ],
    feature: { label: "OEM / ODM 定制服务", title: "打造具有品牌辨识度的皮具产品。", image: "/assets/products/leather-messenger.png", href: "#quote" }
  }
};

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaMenuKey | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const closeNavigation = () => {
    setMenuOpen(false);
    setActiveMega(null);
  };

  const showMega = (key: MegaMenuKey) => {
    setActiveMega(key);
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="玛轮特皮具首页">
          <img src="/assets/brand/marrant-logo.png" alt="Marrant" />
        </a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="主导航" onKeyDown={(event) => { if (event.key === "Escape") setActiveMega(null); }}>
          <div className="nav-menu-item">
            <button className="nav-trigger" type="button" onMouseEnter={() => showMega("products")} onFocus={() => showMega("products")} onClick={() => showMega("products")} aria-expanded={activeMega === "products"} aria-controls="mega-menu" aria-haspopup="true">
              产品系列 <CaretDown size={14} weight="bold" />
            </button>
          </div>
          <div className="nav-menu-item">
            <button className="nav-trigger" type="button" onMouseEnter={() => showMega("services")} onFocus={() => showMega("services")} onClick={() => showMega("services")} aria-expanded={activeMega === "services"} aria-controls="mega-menu" aria-haspopup="true">
              OEM/ODM <CaretDown size={14} weight="bold" />
            </button>
          </div>
          <a href="#factory" onClick={closeNavigation}>工厂实力</a>
          <Link href="/zh/blog" onClick={closeNavigation}>博客</Link>
          <Link href="/zh/about" onClick={closeNavigation}>关于我们</Link>
          <Link href="/zh/contact" onClick={closeNavigation}>联系我们</Link>
          <Link className="mobile-quote" href="/zh/contact#inquiry" onClick={closeNavigation}>获取定制报价</Link>
          {activeMega && (
            <>
              <button className="mega-page-dim" type="button" aria-label="关闭导航菜单" onClick={() => setActiveMega(null)} />
              <div className="mega-menu-wrap" id="mega-menu" onMouseLeave={() => setActiveMega(null)}>
                <section className="mega-menu" aria-label={`${megaMenus[activeMega].eyebrow}导航`}>
                  <div className="mega-overview">
                    <p>{megaMenus[activeMega].eyebrow}</p>
                    <h2>{megaMenus[activeMega].title}</h2>
                    <span className="mega-rule" />
                    <small>{megaMenus[activeMega].copy}</small>
                  </div>
                  <div className="mega-links">
                    {megaMenus[activeMega].links.map((item) => (
                      <Link href={item.href} key={item.label} onClick={closeNavigation}>
                        <strong>{item.label}<ArrowRight size={15} /></strong>
                        <span>{item.description}</span>
                      </Link>
                    ))}
                  </div>
                  <Link className="mega-feature" href={megaMenus[activeMega].feature.href} onClick={closeNavigation}>
                    <img src={megaMenus[activeMega].feature.image} alt="" />
                    <span className="mega-feature-shade" />
                    <div>
                      <small>{megaMenus[activeMega].feature.label}</small>
                      <strong>{megaMenus[activeMega].feature.title}<ArrowRight size={17} /></strong>
                    </div>
                  </Link>
                </section>
              </div>
            </>
          )}
        </nav>
        <Link className="header-cta" href="/zh/contact#inquiry">获取定制报价</Link>
        <button className="menu-button" onClick={() => { setMenuOpen(!menuOpen); setActiveMega(null); }} aria-label="展开或收起菜单" aria-expanded={menuOpen}>
          {menuOpen ? <X size={24} /> : <List size={26} />}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-shade" />
        <div className="container hero-content">
          <p className="eyebrow">广州真皮包厂家 · OEM / ODM 皮具定制</p>
          <h1>专业真皮包制造，<br />为您的品牌定制</h1>
          <p className="hero-copy">广州玛轮特皮具为进口商、批发商、电商品牌与采购商提供 OEM 皮具定制、ODM 皮具制造及真皮包供应服务。</p>
          <div className="hero-actions">
            <a className="button button-caramel" href="#quote">获取定制报价</a>
            <a className="button button-outline" href="#products">浏览产品系列</a>
          </div>
          <div className="hero-proof" aria-label="玛轮特皮具制造优势">
            <div><ShieldCheck size={31} weight="thin" /><span><b>品质工艺</b>注重用料与细节，兼顾质感和耐用性。</span></div>
            <div><Swatches size={31} weight="thin" /><span><b>OEM / ODM 定制</b>从需求到成品，围绕品牌定位开发。</span></div>
            <div><GlobeHemisphereWest size={31} weight="thin" /><span><b>国际采购合作</b>服务不同市场的品牌与专业采购商。</span></div>
          </div>
        </div>
      </section>

      <section className="services section-light" id="oem">
        <div className="container service-grid">
          <div className="service-intro">
            <p className="eyebrow caramel">OEM / ODM 与品牌贴牌</p>
            <h2>您的品牌构想，<br />我们的皮具工艺。</h2>
            <span className="line" />
            <p>作为广州皮具工厂，我们以真皮包开发经验与灵活制造方案，协助品牌完善产品线，将设计构想转化为可量产产品。</p>
            <a className="text-link" href="#quote">了解 OEM / ODM 服务 <ArrowRight size={17} /></a>
          </div>
          <div className="service-list">
            {services.map(({ icon: Icon, title, text }) => (
              <article className="service-item" key={title}>
                <Icon size={39} weight="thin" />
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="products" id="products">
        <div className="container">
          <div className="section-heading inverse">
            <div><p className="eyebrow caramel">真皮包供应系列</p><h2>为品牌打造真皮包产品线</h2></div>
            <Link className="button button-outline light" href="/zh/products">查看全部产品</Link>
          </div>
          <div className="product-grid">
            {productCards.map(({ title, image, href }) => (
              <Link className="product-card" href={href} key={title}>
                <img src={image} alt={title} loading="lazy" decoding="async" />
                <span>{title}<ArrowRight size={17} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="process section-light">
        <div className="container">
          <p className="eyebrow caramel">定制合作流程</p>
          <h2 className="process-title">从需求确认到成品交付</h2>
          <div className="process-list">
            {process.map(({ icon: Icon, title, text }, index) => (
              <article className="process-item" key={title}>
                <div className="process-icon"><Icon size={31} weight="thin" /></div>
                <h3>{title}</h3><p>{text}</p>
                {index < process.length - 1 && <span className="process-rule" />}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="factory" id="factory">
        <div className="container factory-grid">
          <div className="founders-image"><img src="/assets/brand/founders.jpg" alt="玛轮特皮具创始团队" /></div>
          <div className="factory-copy">
            <p className="eyebrow caramel">广州皮具工厂</p>
            <h2>用心制造，<br />以品质建立信任。</h2>
            <p>玛轮特专注真皮包制造，为品牌与采购商提供产品开发、OEM 皮具定制及 ODM 皮具制造服务，重视工艺品质与长期合作。</p>
            <div className="factory-points">
              <div><Handshake size={29} weight="thin" /><h3>专业团队</h3><span>熟悉皮具开发与生产，责任明确。</span></div>
              <div><ShieldCheck size={29} weight="thin" /><h3>品质优先</h3><span>从材料到成品，关注每一道工序。</span></div>
              <div><CheckCircle size={29} weight="thin" /><h3>长期合作</h3><span>随品牌业务发展，持续完善供应支持。</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq section-light" id="resources">
        <div className="container faq-grid">
          <div><p className="eyebrow caramel">常见问题</p><h2>定制采购<br />问题解答</h2></div>
          <div className="faq-list">
            {faqs.map((question, index) => (
              <article className={openFaq === index ? "faq-row open" : "faq-row"} key={question}>
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                  {question}<span>{openFaq === index ? "−" : "+"}</span>
                </button>
                {openFaq === index && <p>请提供产品类型、目标市场与采购要求，我们将评估材料、工艺及订单条件，给出相应建议。</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <InternalLinkPanel
        title="完善您的采购需求"
        description="从产品方向、材料工艺到制造要求，为与真皮包供应商的沟通做好准备。"
        links={[
          { href: "/zh/products", label: "浏览全部产品", description: "对比真皮包品类，明确产品开发方向。" },
          { href: "/zh/products/crazy-horse-leather-travel-tote-bag", label: "查看旅行托特包", description: "了解产品实例及可定制细节。" },
          { href: "/zh/blog/how-to-source-crazy-horse-leather-travel-tote-bag", label: "阅读采购指南", description: "了解如何明确皮料、五金与结构要求。" },
          { href: "/zh/about#production", label: "了解皮具工厂", description: "了解订单背后的团队与生产流程。" },
        ]}
      />

      <section className="quote" id="quote">
        <div className="container quote-grid">
          <div className="quote-intro">
            <p className="eyebrow caramel">开始您的皮具定制项目</p>
            <h2>携手打造<br />您的品牌产品线。</h2>
            <p>告诉我们您的产品与采购需求，我们将评估并提供适合的定制方案。</p>
            <a className="whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><WhatsappLogo size={24} weight="fill" /> 通过 WhatsApp 联系</a>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-row"><input required aria-label="姓名" name="name" placeholder="姓名*" /><input required aria-label="电子邮箱" type="email" name="email" placeholder="电子邮箱*" /></div>
            <div className="form-row"><input aria-label="国家或地区" name="country" placeholder="国家 / 地区" /><input aria-label="产品需求" name="product" placeholder="产品需求*" /></div>
            <textarea required aria-label="需求说明" name="message" placeholder="需求说明*" rows={4} />
            <button className="button button-caramel submit-button" type="submit">获取定制报价</button>
            {submitted && <p className="form-success" role="status">此处信息尚未发送，请<Link href="/zh/contact#inquiry" style={{ textDecoration: "underline" }}>前往联系表单</Link>提交需求，或直接联系销售团队。</p>}
          </form>
        </div>
      </section>

      <footer id="about">
        <div className="container footer-grid">
          <div className="footer-brand"><img src="/assets/brand/marrant-logo.png" alt="Marrant" /><p>专业真皮包厂家，为您的品牌定制。</p><a href="mailto:Melody@marrant.cn">Melody@marrant.cn</a><a href={whatsapp} target="_blank" rel="noreferrer">+86 189 2507 3489</a></div>
          <div><h3>产品系列</h3><Link href="/zh/products/crazy-horse-leather-travel-tote-bag">疯马皮系列</Link><Link href="/zh/products">旅行托特包</Link><Link href="/zh/products">男士钱包</Link><Link href="/zh/products">真皮背包</Link><Link href="/zh/products">女士真皮包</Link></div>
          <div><h3>OEM/ODM</h3><a href="#oem">定制服务</a><a href="#oem">合作流程</a><Link href="/zh/about#production">材料选配</Link><Link href="/zh/contact#inquiry">品牌贴牌</Link></div>
          <div><h3>采购指南</h3><Link href="/zh/blog/how-to-source-crazy-horse-leather-travel-tote-bag">采购指南</Link><Link href="/zh/blog">养护指南</Link><a href="#resources">常见问题</a></div>
          <div><h3>关于我们</h3><Link href="/zh/about#production">工厂介绍</Link><Link href="/zh/about#quality">选择玛轮特</Link><Link href="/zh/contact">联系我们</Link></div>
        </div>
      </footer>
    </main>
  );
}
