"use client";

import Image from "next/image";
import Link from "next/link";
import InternalLinkPanel from "../components/InternalLinkPanel";
import { useState } from "react";
import { ArrowRight, BookOpenText, Factory, Package, PenNib, ShieldCheck } from "@phosphor-icons/react";
import styles from "./page.module.css";

const articleRoute = "/blog/how-to-choose-a-full-grain-leather-wallet";

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
    date: "Aug 26, 2026",
    duration: "6 min read",
    image: "/assets/products/leather-backpack.png",
  },
  {
    category: "development",
    label: "Product Development",
    title: "Custom Branding Options for Leather Bags: A Buyer’s Guide",
    description: "Embossing, debossing, hardware and lining details that make a collection feel unmistakably yours.",
    date: "Aug 18, 2026",
    duration: "5 min read",
    image: "/assets/product-detail/crazy-horse-leather-detail.png",
  },
  {
    category: "factory",
    label: "Factory Notes",
    title: "Inside Our Workshop: Quality Starts at the Source",
    description: "Meet the people, checkpoints and craft disciplines that protect consistency at every stage.",
    date: "Aug 11, 2026",
    duration: "4 min read",
    image: "/assets/product-detail/leather-production-workshop-v1.png",
  },
  {
    category: "materials",
    label: "Materials",
    title: "Hardware That Lasts: Selecting Zippers, Buckles & More",
    description: "The small components that carry the most pressure—and the decisions that make them reliable.",
    date: "Aug 04, 2026",
    duration: "5 min read",
    image: "/assets/products/mens-genuine-leather-wallet-v1.png",
  },
  {
    category: "development",
    label: "Product Development",
    title: "Bag Construction Methods Explained",
    description: "From reinforced handles to lined interiors, learn what makes everyday leather goods durable.",
    date: "Jul 28, 2026",
    duration: "6 min read",
    image: "/assets/products/leather-messenger.png",
  },
  {
    category: "sourcing",
    label: "Sourcing Guides",
    title: "MOQ, Lead Time & Sampling: What to Expect",
    description: "A clear guide to planning timelines, approvals and order quantities with less uncertainty.",
    date: "Jul 21, 2026",
    duration: "5 min read",
    image: "/assets/products/crazy-horse-duffle.png",
  },
] as const;

type Topic = (typeof topics)[number]["id"];

export default function BlogIndexPage() {
  const [activeTopic, setActiveTopic] = useState<Topic>("all");
  const visibleArticles = activeTopic === "all" ? articles : articles.filter((article) => article.category === activeTopic);

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
          <Image src="/assets/products/mens-bifold-wallet-8064/scenario.jpg" alt="Brown full-grain leather bifold wallet for private-label development" fill priority sizes="(max-width: 760px) 100vw, 52vw" />
        </div>
        <div className={styles.featureCopy}>
          <p className={styles.articleLabel}>Sourcing Guides</p>
          <h2 id="featured-title">How to Choose a Full-Grain Leather Wallet for Your Brand</h2>
          <p>A practical guide to leather specifications, card-slot design, construction and OEM customization for retail wallet collections.</p>
          <div className={styles.articleMeta}><span>Sep 10, 2026</span><i /><span>7 min read</span></div>
          <Link className={styles.readLink} href={articleRoute}>Read the Guide <ArrowRight size={18} weight="light" /></Link>
        </div>
      </section>

      <section className={styles.topicNav} aria-label="Browse journal topics">
        {topics.slice(1).map(({ id, label, Icon }) => (
          <button
            className={activeTopic === id ? styles.topicActive : undefined}
            type="button"
            key={id}
            onClick={() => setActiveTopic(id)}
            aria-pressed={activeTopic === id}
          >
            <Icon size={26} weight="light" />
            <span>{label}</span>
          </button>
        ))}
      </section>

      <section className={styles.articleSection} aria-label="Journal articles">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>Latest Insights</p>
            <h2>{activeTopic === "all" ? "From the Workshop Floor" : topics.find((topic) => topic.id === activeTopic)?.label}</h2>
          </div>
          <button className={styles.resetButton} type="button" onClick={() => setActiveTopic("all")} disabled={activeTopic === "all"}>
            View All Articles <ArrowRight size={17} weight="light" />
          </button>
        </div>

        <div className={styles.articleGrid}>
          {visibleArticles.map((article) => (
            <article className={styles.articleCard} key={article.title}>
              <Link className={styles.cardImage} href={articleRoute} aria-label={`Read ${article.title}`}>
                <Image src={article.image} alt="Marrant leather bag material or craftsmanship detail" fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" />
              </Link>
              <div className={styles.cardCopy}>
                <p className={styles.articleLabel}>{article.label}</p>
                <h3><Link href={articleRoute}>{article.title}</Link></h3>
                <p>{article.description}</p>
                <div className={styles.cardFooter}>
                  <span>{article.date} <b>·</b> {article.duration}</span>
                  <Link href={articleRoute} aria-label={`Read ${article.title}`}><ArrowRight size={18} weight="light" /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
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
