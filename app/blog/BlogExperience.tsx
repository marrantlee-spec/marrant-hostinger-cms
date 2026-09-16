"use client";

import Image from "next/image";
import Link from "next/link";
import InternalLinkPanel from "../components/InternalLinkPanel";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpenText, Factory, Package, PenNib, ShieldCheck } from "@phosphor-icons/react";
import styles from "./page.module.css";

const articleRoute = "/blog/how-to-choose-leather-bag-manufacturer-china";

const topics = [
  { id: "all", label: "All Articles", detail: "Practical sourcing knowledge for better bag decisions.", Icon: BookOpenText },
  { id: "sourcing", label: "Sourcing Guides", detail: "Confident choices from first brief to final order.", Icon: Package },
  { id: "materials", label: "Materials", detail: "Leather, hardware and finishes built to last.", Icon: ShieldCheck },
  { id: "development", label: "Product Development", detail: "Turn a product idea into a ready-to-make bag.", Icon: PenNib },
  { id: "factory", label: "Factory Notes", detail: "A closer look at the standards behind every order.", Icon: Factory },
] as const;

const articles = [
  {
    category: "sourcing",
    label: "Sourcing Guides",
    title: "Full Grain vs. Crazy Horse Leather: Which Is Right for Your Brand?",
    description: "Understand the material differences that shape performance, price and long-term character.",
    publishedAt: "2026-08-26",
    date: "Aug 26, 2026",
    duration: "6 min read",
    image: "/assets/products/leather-backpack.png",
  },
  {
    category: "development",
    label: "Product Development",
    title: "Custom Branding Options for Leather Bags: A Buyer’s Guide",
    description: "Embossing, debossing, hardware and lining details that make a collection feel unmistakably yours.",
    publishedAt: "2026-08-18",
    date: "Aug 18, 2026",
    duration: "5 min read",
    image: "/assets/product-detail/crazy-horse-leather-detail.png",
  },
  {
    category: "factory",
    label: "Factory Notes",
    title: "Inside Our Workshop: Quality Starts at the Source",
    description: "Meet the people, checkpoints and craft disciplines that protect consistency at every stage.",
    publishedAt: "2026-08-11",
    date: "Aug 11, 2026",
    duration: "4 min read",
    image: "/assets/product-detail/leather-production-workshop-v1.png",
  },
  {
    category: "materials",
    label: "Materials",
    title: "Hardware That Lasts: Selecting Zippers, Buckles & More",
    description: "The small components that carry the most pressure—and the decisions that make them reliable.",
    publishedAt: "2026-08-04",
    date: "Aug 04, 2026",
    duration: "5 min read",
    image: "/assets/products/mens-genuine-leather-wallet-v1.png",
  },
  {
    category: "development",
    label: "Product Development",
    title: "Bag Construction Methods Explained",
    description: "From reinforced handles to lined interiors, learn what makes everyday leather goods durable.",
    publishedAt: "2026-07-28",
    date: "Jul 28, 2026",
    duration: "6 min read",
    image: "/assets/products/leather-messenger.png",
  },
  {
    category: "sourcing",
    label: "Sourcing Guides",
    title: "MOQ, Lead Time & Sampling: What to Expect",
    description: "A clear guide to planning timelines, approvals and order quantities with less uncertainty.",
    publishedAt: "2026-07-21",
    date: "Jul 21, 2026",
    duration: "5 min read",
    image: "/assets/products/crazy-horse-duffle.png",
  },
] as const;

type Topic = (typeof topics)[number]["id"];

type CmsArticle = {
  category: string;
  label: string;
  title: string;
  description: string;
  publishedAt: string;
  date: string;
  duration: string;
  image: string;
  href: string;
};

export default function BlogIndexPage({ page = "1", topic = "all", cmsArticles = [] }: { page?: string; topic?: string; cmsArticles?: CmsArticle[] }) {
  const router = useRouter();
  const activeTopic = topics.some((item) => item.id === topic) ? topic as Topic : "all";
  const staticArticles = articles.map((article) => ({ ...article, href: articleRoute }));
  const filteredArticles = [...cmsArticles, ...staticArticles].filter((article) => activeTopic === "all" || article.category === activeTopic).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const pageSize = 9;
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / pageSize));
  const requestedPage = /^\d+$/.test(page) && Number.isSafeInteger(Number(page)) ? Number(page) : 1;
  const currentPage = Math.min(totalPages, Math.max(1, requestedPage));
  const visibleArticles = filteredArticles.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const pageHref = (nextPage: number, nextTopic = activeTopic) => {
    const query = new URLSearchParams();
    if (nextTopic !== "all") query.set("topic", nextTopic);
    if (nextPage > 1) query.set("page", String(nextPage));
    return "/blog" + (query.size ? "?" + query.toString() : "") + "#articles";
  };

  return (
    <main className={styles.page}>

      <section className={styles.masthead} aria-labelledby="journal-title">
        <p className={styles.kicker}>The Leather Trade Journal</p>
        <h1 id="journal-title">The Marrant Journal</h1>
        <span className={styles.headingRule} />
        <p className={styles.intro}>Practical insights and expert guidance for global bag buyers and brand builders. From sourcing to production—we share what we know, so you can build with confidence.</p>
      </section>

      <section className={styles.featured} aria-labelledby="featured-title">
        <div className={styles.featureImage}>
          <Image src="/assets/product-detail/factory-client-visit-v1.png" alt="International buyers reviewing leather bag samples during a factory visit in Guangzhou" fill priority sizes="(max-width: 760px) 100vw, 52vw" />
        </div>
        <div className={styles.featureCopy}>
          <p className={styles.articleLabel}>Sourcing Guides</p>
          <h2 id="featured-title">How to Choose a Leather Bag Manufacturer in China</h2>
          <p>A 12-point buyer checklist covering category fit, samples, leather specifications, construction, quality control and shipment readiness.</p>
          <div className={styles.articleMeta}><span>Sep 10, 2026</span><i /><span>12 min read</span></div>
          <Link className={styles.readLink} href={articleRoute}>Read the Guide <ArrowRight size={18} weight="light" /></Link>
        </div>
      </section>

      <section className={styles.topicNav} aria-label="Browse journal topics">
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

      <section id="articles" className={styles.articleSection} aria-label="Journal articles">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>Latest Insights</p>
            <h2>{activeTopic === "all" ? "From the Workshop Floor" : topics.find((topic) => topic.id === activeTopic)?.label}</h2>
          </div>
          <button className={styles.resetButton} type="button" onClick={() => router.push(pageHref(1, "all"))} disabled={activeTopic === "all" && currentPage === 1}>
            View All Articles <ArrowRight size={17} weight="light" />
          </button>
        </div>

        <div className={styles.articleGrid}>
          {visibleArticles.map((article) => (
            <article className={styles.articleCard} key={article.title}>
              <Link className={styles.cardImage} href={article.href} aria-label={`Read ${article.title}`}>
                <Image src={article.image} alt="Marrant leather bag material or craftsmanship detail" fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" />
              </Link>
              <div className={styles.cardCopy}>
                <p className={styles.articleLabel}>{article.label}</p>
                <h3><Link href={article.href}>{article.title}</Link></h3>
                <p>{article.description}</p>
                <div className={styles.cardFooter}>
                  <span><time dateTime={article.publishedAt}>{article.date}</time> <b>·</b> {article.duration}</span>
                  <Link href={article.href} aria-label={`Read ${article.title}`}><ArrowRight size={18} weight="light" /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <nav className={styles.pagination} aria-label="Article pagination">
          {currentPage > 1 ? <Link href={pageHref(currentPage - 1)} rel="prev">Previous</Link> : <span aria-disabled="true">Previous</span>}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => <Link key={number} href={pageHref(number)} aria-label={"Page " + number + ""} aria-current={number === currentPage ? "page" : undefined}>{number}</Link>)}
          {currentPage < totalPages ? <Link href={pageHref(currentPage + 1)} rel="next">Next</Link> : <span aria-disabled="true">Next</span>}
        </nav>
        <p className={styles.pageSummary} aria-live="polite">Page {currentPage} of {totalPages} · {filteredArticles.length} articles</p>
      </section>

      <InternalLinkPanel
        title="Turn research into a product brief"
        description="Continue from buyer education to a real product example, manufacturing context and a direct conversation with Marrant."
        links={[
          { href: "/products/crazy-horse-leather-travel-tote-bag", label: "See the travel tote", description: "Apply the guide to a customizable product example." },
          { href: "/products", label: "Explore collections", description: "Compare the bag categories available for OEM/ODM development." },
          { href: "/about#quality", label: "Understand quality control", description: "See how Marrant manages consistency during production." },
          { href: "/contact#inquiry", label: "Request a quote", description: "Share your target market, materials and estimated quantity." },
        ]}
      />

      <section className={styles.projectCta} aria-labelledby="project-title">
        <div className={styles.projectImage}>
          <Image src="/assets/brand/hero-leather-bags.jpg" alt="Leather bags and material samples in Marrant's workshop" fill sizes="100vw" />
        </div>
        <div className={styles.projectShade} />
        <div className={styles.projectInner}>
          <div>
            <p className={styles.kicker}>Build With Marrant</p>
            <h2 id="project-title">Start Your Next<br />Leather Project</h2>
            <span className={styles.ctaRule} />
            <p>Partner with Marrant for reliable manufacturing, transparent communication and long-term growth.</p>
            <Link className={styles.quoteButton} href="/contact">Request a Quote <ArrowRight size={18} weight="light" /></Link>
          </div>
          <div className={styles.proofList}>
            <div><Package size={26} weight="light" /><strong>OEM/ODM Expertise</strong><span>End-to-end support from concept to delivery.</span></div>
            <div><ShieldCheck size={26} weight="light" /><strong>Quality You Can Trust</strong><span>Rigorous standards and care in every detail.</span></div>
            <div><Factory size={26} weight="light" /><strong>Global Experience</strong><span>Trusted by buyers around the world.</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}
