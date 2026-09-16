"use client";

import Image from "next/image";
import Link from "next/link";
import InternalLinkPanel from "../components/InternalLinkPanel";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpenText, Factory, Package, PenNib, ShieldCheck } from "@phosphor-icons/react";
import styles from "../../blog/page.module.css";

const articleRoute = "/zh/blog/how-to-choose-a-full-grain-leather-wallet";

const topics = [
  { id: "all", label: "全部文章", detail: "分享真皮包采购知识，帮助品牌做出合理选择。", Icon: BookOpenText },
  { id: "sourcing", label: "采购指南", detail: "从需求整理到订单确认，明确采购关键事项。", Icon: Package },
  { id: "materials", label: "材料选配", detail: "了解皮料、五金与表面处理的选配要点。", Icon: ShieldCheck },
  { id: "development", label: "产品开发", detail: "将产品构想转化为可量产的皮具方案。", Icon: PenNib },
  { id: "factory", label: "工厂观察", detail: "了解每笔订单背后的工艺与品质标准。", Icon: Factory },
] as const;

const articles = [
  {
    category: "sourcing",
    label: "采购指南",
    title: "全粒面皮与疯马皮：如何为品牌选择合适的皮料？",
    description: "从性能、成本与使用变化出发，了解皮料选择对产品定位的影响。",
    publishedAt: "2026-08-26",
    date: "2026年8月26日",
    duration: "阅读约6分钟",
    image: "/assets/products/leather-backpack.png",
  },
  {
    category: "development",
    label: "产品开发",
    title: "真皮包品牌定制：标识工艺与细节选配指南",
    description: "了解压印、凹印、五金与内衬定制，建立产品的品牌辨识度。",
    publishedAt: "2026-08-18",
    date: "2026年8月18日",
    duration: "阅读约5分钟",
    image: "/assets/product-detail/crazy-horse-leather-detail.png",
  },
  {
    category: "factory",
    label: "工厂观察",
    title: "走进皮具车间：从源头落实品质管理",
    description: "了解生产团队、检查节点与工艺要求，观察品质如何贯穿制造过程。",
    publishedAt: "2026-08-11",
    date: "2026年8月11日",
    duration: "阅读约4分钟",
    image: "/assets/product-detail/leather-production-workshop-v1.png",
  },
  {
    category: "materials",
    label: "材料选配",
    title: "真皮包五金选配：拉链、扣具与耐用性",
    description: "关注承受频繁使用的五金部件，从选材与结构减少使用风险。",
    publishedAt: "2026-08-04",
    date: "2026年8月4日",
    duration: "阅读约5分钟",
    image: "/assets/products/mens-genuine-leather-wallet-v1.png",
  },
  {
    category: "development",
    label: "产品开发",
    title: "真皮包结构与制作工艺解析",
    description: "从提手加固到内衬结构，了解影响日常皮具耐用性的工艺细节。",
    publishedAt: "2026-07-28",
    date: "2026年7月28日",
    duration: "阅读约6分钟",
    image: "/assets/products/leather-messenger.png",
  },
  {
    category: "sourcing",
    label: "采购指南",
    title: "真皮包采购：起订量、打样与交期如何确认？",
    description: "明确样品确认、采购数量与生产节点，减少订单计划中的不确定性。",
    publishedAt: "2026-07-21",
    date: "2026年7月21日",
    duration: "阅读约5分钟",
    image: "/assets/products/crazy-horse-duffle.png",
  },
] as const;

type Topic = (typeof topics)[number]["id"];

export default function BlogIndexPage({ page = "1", topic = "all" }: { page?: string; topic?: string }) {
  const router = useRouter();
  const activeTopic = topics.some((item) => item.id === topic) ? topic as Topic : "all";
  const filteredArticles = [...articles].filter((article) => activeTopic === "all" || article.category === activeTopic).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const pageSize = 9;
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / pageSize));
  const requestedPage = /^\d+$/.test(page) && Number.isSafeInteger(Number(page)) ? Number(page) : 1;
  const currentPage = Math.min(totalPages, Math.max(1, requestedPage));
  const visibleArticles = filteredArticles.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const pageHref = (nextPage: number, nextTopic = activeTopic) => {
    const query = new URLSearchParams();
    if (nextTopic !== "all") query.set("topic", nextTopic);
    if (nextPage > 1) query.set("page", String(nextPage));
    return "/zh/blog" + (query.size ? "?" + query.toString() : "") + "#articles";
  };

  return (
    <main className={styles.page}>

      <section className={styles.masthead} aria-labelledby="journal-title">
        <p className={styles.kicker}>真皮包采购与制造知识</p>
        <h1 id="journal-title">玛轮特皮具博客</h1>
        <span className={styles.headingRule} />
        <p className={styles.intro}>面向真皮包采购商与品牌团队，分享皮料选配、OEM 皮具定制、ODM 皮具制造及工厂合作知识，帮助您明确需求、评估供应商并推进项目。</p>
      </section>

      <section className={styles.featured} aria-labelledby="featured-title">
        <div className={styles.featureImage}>
          <Image src="/assets/products/mens-bifold-wallet-8064/scenario.jpg" alt="适合品牌定制开发的棕色全粒面牛皮二折钱包" fill priority sizes="(max-width: 760px) 100vw, 52vw" />
        </div>
        <div className={styles.featureCopy}>
          <p className={styles.articleLabel}>采购指南</p>
          <h2 id="featured-title">如何为品牌选择全粒面牛皮钱包</h2>
          <p>从皮料标准、卡位设计、制作工艺到 OEM 定制，梳理品牌钱包开发前需要确认的重点。</p>
          <div className={styles.articleMeta}><span>2026年9月10日</span><i /><span>阅读约7分钟</span></div>
          <Link className={styles.readLink} href={articleRoute}>阅读采购指南 <ArrowRight size={18} weight="light" /></Link>
        </div>
      </section>

      <section className={styles.topicNav} aria-label="浏览博客主题">
        {topics.slice(1).map(({ id, label, Icon }) => (
          <button
            className={activeTopic === id ? styles.topicActive : undefined}
            type="button"
            key={id}
            onClick={() => router.push(pageHref(1, id))}
            aria-pressed={activeTopic === id}
          >
            <Icon size={26} weight="light" />
            <span>{label}</span>
          </button>
        ))}
      </section>

      <section id="articles" className={styles.articleSection} aria-label="皮具采购文章">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>最新采购知识</p>
            <h2>{activeTopic === "all" ? "来自皮具生产现场" : topics.find((topic) => topic.id === activeTopic)?.label}</h2>
          </div>
          <button className={styles.resetButton} type="button" onClick={() => router.push(pageHref(1, "all"))} disabled={activeTopic === "all" && currentPage === 1}>
            查看全部文章 <ArrowRight size={17} weight="light" />
          </button>
        </div>

        <div className={styles.articleGrid}>
          {visibleArticles.map((article) => (
            <article className={styles.articleCard} key={article.title}>
              <Link className={styles.cardImage} href={articleRoute} aria-label={`阅读${article.title}`}>
                <Image src={article.image} alt="玛轮特真皮包材料与工艺细节" fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" />
              </Link>
              <div className={styles.cardCopy}>
                <p className={styles.articleLabel}>{article.label}</p>
                <h3><Link href={articleRoute}>{article.title}</Link></h3>
                <p>{article.description}</p>
                <div className={styles.cardFooter}>
                  <span><time dateTime={article.publishedAt}>{article.date}</time> <b>·</b> {article.duration}</span>
                  <Link href={articleRoute} aria-label={`Read ${article.title}`}><ArrowRight size={18} weight="light" /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <nav className={styles.pagination} aria-label="文章分页">
          {currentPage > 1 ? <Link href={pageHref(currentPage - 1)} rel="prev">上一页</Link> : <span aria-disabled="true">上一页</span>}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => <Link key={number} href={pageHref(number)} aria-label={"第" + number + "页"} aria-current={number === currentPage ? "page" : undefined}>{number}</Link>)}
          {currentPage < totalPages ? <Link href={pageHref(currentPage + 1)} rel="next">下一页</Link> : <span aria-disabled="true">下一页</span>}
        </nav>
        <p className={styles.pageSummary} aria-live="polite">第 {currentPage} / {totalPages} 页，共 {filteredArticles.length} 篇文章</p>
      </section>

      <InternalLinkPanel
        title="将采购知识转化为产品需求"
        description="结合产品实例与制造信息，整理需求，并与玛轮特团队沟通可行方案。"
        links={[
          { href: "/zh/products/crazy-horse-leather-travel-tote-bag", label: "查看旅行托特包", description: "结合可定制产品实例，理解采购要点。" },
          { href: "/zh/products", label: "探索产品系列", description: "比较适合 OEM / ODM 开发的真皮包品类。" },
          { href: "/zh/about#quality", label: "了解品质管控", description: "了解玛轮特如何管控生产中的品质一致性。" },
          { href: "/zh/contact#inquiry", label: "获取定制报价", description: "提供目标市场、材料要求与预计数量。" },
        ]}
      />

      <section className={styles.projectCta} aria-labelledby="project-title">
        <div className={styles.projectImage}>
          <Image src="/assets/brand/hero-leather-bags.jpg" alt="玛轮特车间的真皮包与材料样品" fill sizes="100vw" />
        </div>
        <div className={styles.projectShade} />
        <div className={styles.projectInner}>
          <div>
            <p className={styles.kicker}>与玛轮特携手开发</p>
            <h2 id="project-title">开启您的下一个<br />皮具定制项目</h2>
            <span className={styles.ctaRule} />
            <p>与广州玛轮特皮具合作，以规范制造与清晰沟通，支持品牌产品线持续发展。</p>
            <Link className={styles.quoteButton} href="/zh/contact">获取定制报价 <ArrowRight size={18} weight="light" /></Link>
          </div>
          <div className={styles.proofList}>
            <div><Package size={26} weight="light" /><strong>OEM / ODM 制造经验</strong><span>从需求评估到成品交付的完整支持。</span></div>
            <div><ShieldCheck size={26} weight="light" /><strong>关注品质细节</strong><span>依照确认标准，认真处理材料与工艺细节。</span></div>
            <div><Factory size={26} weight="light" /><strong>国际采购合作</strong><span>服务不同市场的品牌与专业采购商。</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}
