"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import InternalLinkPanel from "../components/InternalLinkPanel";
import { ArrowRight, ClipboardText, Factory, MagnifyingGlass, Package, PencilSimple, Swatches, Tag } from "@phosphor-icons/react";
import styles from "../../products/page.module.css";

const categories = [
  "全部系列",
  "疯马皮系列",
  "旅行托特包",
  "男士钱包",
  "真皮单肩包",
  "真皮背包",
  "女士真皮包",
] as const;

type Category = (typeof categories)[number];

const products = [
  {
    category: "疯马皮系列",
    title: "疯马皮系列",
    copy: "复古皮质与耐用工艺，打造具有辨识度的产品。",
    image: "/assets/products/crazy-horse-duffle-catalogue-v1.png",
    href: "/zh/products/crazy-horse-leather-travel-tote-bag",
  },
  {
    category: "旅行托特包",
    title: "旅行托特包",
    copy: "兼顾商务通勤与旅行收纳需求。",
    image: "/assets/products/black-travel-tote-catalogue-v1.png",
  },
  {
    category: "男士钱包",
    title: "男士钱包",
    copy: "精致工艺，满足日常随身收纳。",
    image: "/assets/products/mens-wallet-catalogue-v1.png",
  },
  {
    category: "真皮单肩包",
    title: "真皮单肩包",
    copy: "实用版型，适配通勤与日常场景。",
    image: "/assets/products/leather-messenger-catalogue-v1.png",
  },
  {
    category: "真皮背包",
    title: "真皮背包",
    copy: "兼顾背负体验、容量与日常耐用性。",
    image: "/assets/products/leather-backpack-catalogue-v1.png",
  },
  {
    category: "女士真皮包",
    title: "女士真皮包",
    copy: "细腻皮质与精致细节，丰富品牌女包系列。",
    image: "/assets/products/womens-handbag-catalogue-v1.png",
  },
] as const;

const requirementItems = [
  { icon: Package, title: "产品品类", text: "明确计划开发的包型与使用场景。" },
  { icon: Swatches, title: "材料要求", text: "确认皮料、内衬、五金与表面处理。" },
  { icon: Tag, title: "标识与品牌定制", text: "提供品牌标识与希望采用的呈现工艺。" },
  { icon: ClipboardText, title: "预计采购数量", text: "提供计划数量，便于评估生产方案。" },
];

const supports = [
  { icon: PencilSimple, title: "产品开发", text: "从设计图到样品，围绕目标市场开发产品。" },
  { icon: Swatches, title: "材料选配与定制", text: "根据需求选配皮料、五金与工艺细节。" },
  { icon: Factory, title: "灵活生产", text: "根据订单阶段与需求，提供生产支持。" },
  { icon: Tag, title: "品牌贴牌", text: "通过品牌细节，打造专属产品系列。" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("全部系列");
  const [query, setQuery] = useState("");
  const [interest, setInterest] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const isInCategory = activeCategory === "全部系列" || product.category === activeCategory;
      const matchesSearch = !normalized || `${product.title} ${product.copy} ${product.category}`.toLowerCase().includes(normalized);
      return isInCategory && matchesSearch;
    });
  }, [activeCategory, query]);

  const chooseCategory = (category: Category) => {
    setActiveCategory(category);
    setSubmitted(false);
  };

  const requestProduct = (product: (typeof products)[number]) => {
    setInterest(product.title);
    setSubmitted(false);
    scrollToId("request");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className={styles.page}>

      <section className={styles.hero} aria-labelledby="page-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>玛轮特真皮包产品系列</p>
          <h1 id="page-title">为您的品牌<br />选择合适的<br />真皮包系列</h1>
          <p className={styles.heroDescription}>面向进口商、批发商与电商品牌的真皮包供应方案。探索商务包、女士包、背包与旅行包，开启 OEM / ODM 皮具定制合作。</p>
          <div className={styles.searchWrap}>
            <MagnifyingGlass size={19} aria-hidden="true" />
            <label className={styles.srOnly} htmlFor="product-search">搜索真皮包品类</label>
            <input id="product-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索真皮包品类" />
          </div>
          <button className={styles.primaryButton} type="button" onClick={() => scrollToId("request")}>获取定制报价</button>
        </div>
        <div className={styles.heroMedia}>
          <img src="/assets/products/crazy-horse-duffle-catalogue-v1.png" alt="疯马皮旅行包" />
        </div>
      </section>

      <section className={styles.catalogue} id="products-index" aria-labelledby="catalogue-title">
        <div className={styles.catalogueIntro}>
          <div>
            <p className={styles.kicker}>真皮包产品系列</p>
            <h2 id="catalogue-title">浏览真皮包系列</h2>
          </div>
          <p aria-live="polite">共 {visibleProducts.length} 个产品系列</p>
        </div>
        <div className={styles.catalogueLayout}>
          <aside className={styles.categoryRail} aria-label="按产品品类筛选">
            {categories.map((category) => (
              <button key={category} type="button" className={activeCategory === category ? styles.categoryActive : ""} onClick={() => chooseCategory(category)}>
                {category}
              </button>
            ))}
          </aside>
          <div className={styles.productsGrid}>
            {visibleProducts.map((product) => (
              <article className={styles.productCard} key={product.title}>
                {"href" in product ? (
                  <Link className={styles.productLink} href={product.href} aria-label={`查看${product.title}`}>
                    <span className={styles.productImage}><img src={product.image} alt={product.title} /></span>
                    <span className={styles.productName}>{product.title}</span>
                    <span className={styles.productMeta}><span>{product.copy}</span><ArrowRight size={19} weight="light" aria-hidden="true" /></span>
                  </Link>
                ) : (
                  <button type="button" onClick={() => requestProduct(product)} aria-label={`咨询${product.title}定制报价`}>
                    <span className={styles.productImage}><img src={product.image} alt={product.title} /></span>
                    <span className={styles.productName}>{product.title}</span>
                    <span className={styles.productMeta}><span>{product.copy}</span><ArrowRight size={19} weight="light" aria-hidden="true" /></span>
                  </button>
                )}
              </article>
            ))}
            {visibleProducts.length === 0 && (
              <div className={styles.emptyState}>
                <p>暂无符合当前条件的产品系列。</p>
                <button type="button" onClick={() => { setQuery(""); chooseCategory("全部系列"); }}>显示全部系列</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.requirements} id="request" aria-labelledby="request-title">
        <div className={styles.requirementsIntro}>
          <p className={styles.kicker}>开始定制项目</p>
          <h2>从您的<br />定制需求</h2>
          <p>提供产品与采购需求，我们的团队将协助您评估材料、工艺和生产方案。</p>
          <div className={styles.requirementList}>
            {requirementItems.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <Icon size={29} weight="thin" aria-hidden="true" />
                <span><strong>{title}</strong><small>{text}</small></span>
              </div>
            ))}
          </div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.kicker}>告诉我们您的项目需求</p>
          <h2 id="request-title">获取定制报价</h2>
          <div className={styles.formTwoColumns}>
            <label><span>姓名</span><input required name="name" placeholder="请填写姓名" /></label>
            <label><span>公司名称</span><input required name="company" placeholder="请填写公司名称" /></label>
          </div>
          <div className={styles.formTwoColumns}>
            <label><span>电子邮箱</span><input required type="email" name="email" placeholder="name@company.com" /></label>
            <label><span>国家 / 地区</span><input name="region" placeholder="请填写国家或地区" /></label>
          </div>
          <div className={styles.formTwoColumns}>
            <label><span>产品品类</span><select name="product" value={interest} onChange={(event) => setInterest(event.target.value)}><option value="">请选择产品品类</option>{products.map((product) => <option key={product.title} value={product.title}>{product.title}</option>)}</select></label>
            <label><span>订单阶段</span><select name="timeline" defaultValue=""><option value="" disabled>请选择订单阶段</option><option>待沟通确认</option><option>先安排打样</option><option>准备批量生产</option></select></label>
          </div>
          <label className={styles.messageField}><span>说明您的项目需求</span><textarea required name="message" rows={4} placeholder="请说明材料、设计、目标市场、预计数量与交期要求……" /></label>
          <button className={styles.primaryButton} type="submit">提交采购需求</button>
          {submitted && <p className={styles.success} role="status">此处信息尚未发送，请<Link href="/zh/contact#inquiry" style={{ textDecoration: "underline" }}>前往联系表单</Link>提交采购需求。</p>}
        </form>
      </section>

      <section className={styles.support} aria-labelledby="support-title">
        <p className={styles.kicker}>OEM / ODM 皮具制造支持</p>
        <h2 id="support-title">围绕品牌需求组织制造</h2>
        <div className={styles.supportGrid}>
          {supports.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={32} weight="thin" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <InternalLinkPanel
        title="继续了解定制合作"
        description="结合产品实例、采购建议与工厂信息，将产品构想细化为可执行的定制需求。"
        links={[
          { href: "/zh/products/crazy-horse-leather-travel-tote-bag", label: "查看旅行托特包", description: "了解产品规格、材料与品牌定制选项。" },
          { href: "/zh/blog/how-to-source-crazy-horse-leather-travel-tote-bag", label: "阅读采购指南", description: "明确材料、结构与供应商评估要点。" },
          { href: "/zh/about#production", label: "了解生产流程", description: "了解制造流程与关键品质检查环节。" },
          { href: "/zh/contact#inquiry", label: "发起采购咨询", description: "提供品类、目标市场与预计采购数量。" },
        ]}
      />
    </main>
  );
}
