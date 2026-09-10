import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InternalLinkPanel from "../../components/InternalLinkPanel";
import LongFormArticle, { getArticleSections } from "../components/LongFormArticle";
import { manufacturerGuideMarkdown } from "../content/manufacturer-guide";
import BlogInquiryForm from "../how-to-source-crazy-horse-leather-travel-tote-bag/BlogInquiryForm";
import styles from "../how-to-source-crazy-horse-leather-travel-tote-bag/page.module.css";

const path = "/blog/how-to-choose-leather-bag-manufacturer-china";
const title = "Leather Bag Manufacturer China: 12-Point Buyer Checklist";
const description = "Evaluate a leather bag manufacturer in China with a practical checklist covering samples, materials, construction, QC, communication and shipment readiness.";
const published = "2026-09-10T09:00:00+08:00";
const hero = "/assets/product-detail/factory-client-visit-v1.png";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    type: "article",
    url: `https://www.marrantbag.com${path}`,
    siteName: "Marrant Bag",
    publishedTime: published,
    authors: ["Marrant Product Development Team"],
    images: [hero],
  },
};

const sections = getArticleSections(manufacturerGuideMarkdown);
const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How to Choose a Leather Bag Manufacturer in China: A 12-Point Buyer Checklist",
  description,
  image: [`https://www.marrantbag.com${hero}`],
  datePublished: published,
  dateModified: published,
  author: { "@type": "Organization", name: "Marrant Product Development Team", url: "https://www.marrantbag.com/about" },
  publisher: { "@type": "Organization", name: "Marrant", url: "https://www.marrantbag.com" },
  mainEntityOfPage: `https://www.marrantbag.com${path}`,
};

export default function ManufacturerSelectionGuidePage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }} />
      <div className={styles.articleShell}>
        <section className={styles.articleHeading}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><Link href="/blog">Blog</Link><span>›</span><span>Supplier Selection</span>
          </nav>
          <h1>How to Choose a Leather Bag<br />Manufacturer in China</h1>
          <div className={styles.byline}><span>By Marrant Product Development Team</span><i /><time dateTime={published}>Sep 10, 2026</time><i /><span>12 min read</span></div>
        </section>

        <aside className={styles.tableOfContents} aria-label="Table of contents">
          <p>Table of Contents</p>
          <ol>{sections.map(({ id, heading }, index) => <li key={id}><a href={`#${id}`} className={index === 0 ? styles.activeTocLink : undefined}>{heading}</a></li>)}</ol>
        </aside>

        <article className={styles.article}>
          <div className={styles.heroImage}>
            <Image src={hero} alt="International buyers reviewing leather bag samples during a factory visit in Guangzhou" fill priority sizes="(max-width: 860px) 100vw, 650px" />
          </div>
          <LongFormArticle
            markdown={manufacturerGuideMarkdown}
            midCtaAfter="6. Check whether the bill of materials is controlled"
            images={[
              {
                after: "4. Define the leather beyond its marketing name",
                src: "/assets/product-detail/crazy-horse-leather-detail.png",
                alt: "Close view of full-grain leather texture and brass bag hardware",
                caption: "Leather article, color, grain and hand feel should be approved with a physical reference.",
              },
              {
                after: "7. Look for in-process quality control, not only a final check",
                src: "/assets/product-detail/leather-production-workshop-v1.png",
                alt: "Leather bag craftsperson checking stitching during workshop production",
                caption: "In-process checks help identify material, stitching and assembly issues before final inspection.",
              },
              {
                after: "11. Plan shipment inspection before production starts",
                src: "/assets/product-detail/travel-tote-front.png",
                alt: "Finished leather travel tote ready for buyer inspection",
                caption: "Shipment inspection should compare finished goods, assortment and packing with current order requirements.",
              },
            ]}
          />
        </article>

        <aside className={styles.inquiryRail} id="inquiry"><BlogInquiryForm /></aside>
      </div>

      <InternalLinkPanel
        title="Discuss your leather bag project"
        description="Share your product category, target market, reference images, material direction and customization requirements."
        links={[
          { href: "/contact#inquiry", label: "Get a quote", description: "Send your requirements for a focused development review." },
          { href: "/about#visit", label: "Plan a factory visit", description: "Review materials, workmanship and production context in Guangzhou." },
          { href: "/products", label: "Browse leather goods", description: "Compare travel bags, wallets, backpacks and other categories." },
          { href: "/blog/how-to-source-crazy-horse-leather-travel-tote-bag", label: "Read the sourcing guide", description: "Go deeper into leather, hardware and construction decisions." },
        ]}
      />
    </main>
  );
}
