import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InternalLinkPanel from "../../components/InternalLinkPanel";
import BlogInquiryForm from "./BlogInquiryForm";
import { ArrowRightIcon, CheckCircleIcon, GlobeIcon, PackageIcon, PencilIcon, ShieldIcon } from "./BlogIcons";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "How to Source a Crazy Horse Leather Travel Tote Bag | Marrant",
  description: "A practical sourcing guide for global buyers creating a custom Crazy Horse leather travel tote bag.",
};

const articleSections = [
  ["why-crazy-horse", "Why Crazy Horse Leather?"],
  ["key-considerations", "Key Considerations Before You Source"],
  ["materials-quality", "Material & Quality Standards"],
  ["design-construction", "Design & Construction Essentials"],
  ["customization", "Customization Options"],
  ["comparison", "Comparing Options"],
  ["process", "OEM/ODM Process"],
];

const comparisonRows = [
  ["Leather Quality", "100% Full-Grain Crazy Horse Leather", "Split or corrected grain", "Inconsistent grain & finish"],
  ["Customization", "Full OEM/ODM Customization", "Limited options", "Limited options"],
  ["MOQ", "50–100 pcs per style", "300+ pcs per style", "100 pcs +"],
  ["Lead Time", "45–60 days", "60–90 days", "45–60 days"],
  ["Quality Control", "In-house QC at every stage", "Final inspection only", "Inconsistent QC"],
  ["After-sales Support", "Responsive & solution-oriented", "Limited", "Limited"],
];

const process = [
  { icon: PencilIcon, title: "Consultation", text: "Share your ideas, requirements and target market." },
  { icon: CheckCircleIcon, title: "Design & Sampling", text: "We develop sketches and samples for approval." },
  { icon: ShieldIcon, title: "Material & DFM", text: "Confirm leather, hardware and construction details." },
  { icon: PackageIcon, title: "Production", text: "Expert craftsmanship and in-process quality control." },
  { icon: GlobeIcon, title: "Quality & Delivery", text: "Final inspection, packing and shipment." },
];

export default function CrazyHorseSourcingGuidePage() {
  return (
    <main className={styles.page}>

      <div className={styles.articleShell}>
        <section className={styles.articleHeading}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><Link href="/blog">Blog</Link><span>›</span><span>Leather Bags</span>
          </nav>
          <h1>How to Source a Crazy Horse<br />Leather Travel Tote Bag for<br />Your Brand</h1>
          <div className={styles.byline}><span>By Marrant Team</span><i /><span>May 14, 2026</span><i /><span>8 min read</span></div>
        </section>

        <aside className={styles.tableOfContents} aria-label="Table of contents">
          <p>Table of Contents</p>
          <ol>
            {articleSections.map(([id, label], index) => <li key={id}><a href={`#${id}`} className={index === 0 ? styles.activeTocLink : undefined}>{label}</a></li>)}
          </ol>
        </aside>

        <article className={styles.article}>
          <div className={styles.heroImage}>
            <Image src="/assets/product-detail/travel-tote-front.png" alt="Cognac Crazy Horse leather travel tote bag" fill priority sizes="(max-width: 860px) 100vw, 650px" />
          </div>
          <p className={styles.lead}>Crazy Horse leather is prized for its rich pull-up effect, rugged durability and timeless character—making it a standout choice for premium travel bags. For global brands and retailers, sourcing the right tote means more than choosing a supplier. It means finding a manufacturing partner who understands your standards, protects your brand and delivers consistent quality at scale.</p>
          <p>Here&apos;s a step-by-step guide to help you source smarter and build a product your customers will love.</p>

          <section id="why-crazy-horse">
            <h2>Why Crazy Horse Leather?</h2>
            <p>Crazy Horse leather is full-grain cowhide finished with natural waxes that create its signature pull-up effect. Light scratches and scuffs fade with use, giving every bag a unique patina over time. It&apos;s durable, water-resistant and ideal for travel—combining vintage character with everyday toughness. See how the material is used in our <Link href="/products/crazy-horse-leather-travel-tote-bag#customization">custom Crazy Horse travel tote</Link>.</p>
            <div className={styles.detailImage}>
              <Image src="/assets/product-detail/crazy-horse-leather-detail.png" alt="Close-up of Crazy Horse leather with brass hardware" fill sizes="(max-width: 860px) 100vw, 650px" />
            </div>
            <blockquote>The right tote bag isn&apos;t just about looks. It&apos;s about materials that age beautifully, construction that lasts, and a partner you can build with.<cite>— Marrant Team</cite></blockquote>
          </section>

          <section id="key-considerations">
            <h2>Key Considerations Before You Source</h2>
            <p>Define your target market, price point and must-have features. Consider bag size, interior layout, hardware finish and branding. Clear specifications from the outset will save time, cost and revisions.</p>
          </section>

          <section id="materials-quality" className={styles.materialNote}>
            <h2>Material & Quality Standards</h2>
            <div className={styles.noteGrid}>
              <div><strong>Leather selection</strong><span>Full-grain Crazy Horse leather offers a firm hand feel, visible natural grain and a deep, evolving tone.</span></div>
              <div><strong>Hardware finish</strong><span>Solid brass and antique brass create the weight and vintage character buyers expect from this material.</span></div>
              <div><strong>Reinforcement</strong><span>Handle bases, strap anchors and high-stress seams need added backing and considered stitch density.</span></div>
            </div>
          </section>

          <section id="design-construction">
            <h2>Design & Construction Essentials</h2>
            <p>Plan the bag around the real journey: overnight capacity, comfortable carrying, secure closures and easy-access pockets. A well-built travel tote balances silhouette and function, while keeping every stress point—handles, straps, base and zipper—ready for daily use.</p>
          </section>

          <section id="customization">
            <h2>Customization Options</h2>
            <p>Turn a material choice into a recognisable collection with practical, on-brand details.</p>
            <div className={styles.customizationGrid}>
              <div><strong>Logo treatment</strong><span>Deboss, emboss, laser engraving or hot stamping.</span></div>
              <div><strong>Hardware</strong><span>Antique brass, gunmetal, nickel or custom engraved pieces.</span></div>
              <div><strong>Interior layout</strong><span>Padded laptop sleeve, zipper pocket or custom organiser.</span></div>
              <div><strong>Packaging</strong><span>Dust bag, care card, branded carton and inserts.</span></div>
            </div>
          </section>

          <section id="comparison">
            <h2>Comparing Options</h2>
            <p>Not all Crazy Horse leather bag manufacturers are the same. Use the table below to evaluate key criteria when selecting your manufacturing partner.</p>
            <div className={styles.tableWrap}>
              <table>
                <thead><tr><th>Criteria</th><th>Marrant (Recommended)</th><th>Typical Supplier A</th><th>Typical Supplier B</th></tr></thead>
                <tbody>{comparisonRows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={index === 1 ? styles.recommended : undefined}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <p>Working with an experienced leather bag manufacturer ensures your product looks premium, performs well and meets compliance requirements in your market.</p>
          </section>

          <section id="process" className={styles.processSection}>
            <h2>OEM/ODM Process</h2>
            <div className={styles.processGrid}>
              {process.map(({ icon: Icon, title, text }, index) => <div key={title} className={styles.processStep}><span>{String(index + 1).padStart(2, "0")}</span><Icon width={29} height={29} /><strong>{title}</strong><small>{text}</small></div>)}
            </div>
            <p className={styles.processLink}>Want to evaluate the team behind the process? <Link href="/about#process">See how Marrant works from inquiry to delivery</Link>.</p>
          </section>

          <section className={styles.relatedProduct}>
            <div className={styles.relatedImage}><Image src="/assets/products/crazy-horse-duffle.png" alt="Crazy Horse leather weekender duffle bag" fill sizes="230px" /></div>
            <div><p>You May Also Like</p><h2>Crazy Horse Leather<br />Weekender Duffle Bag</h2><span>Durable. Timeless. Built for the journey.</span><Link href="/products/crazy-horse-leather-travel-tote-bag">View Product <ArrowRightIcon width={16} height={16} /></Link></div>
          </section>
        </article>

        <aside className={styles.inquiryRail} id="inquiry"><BlogInquiryForm /></aside>
      </div>

      <InternalLinkPanel
        title="Keep building your brief"
        description="Use the product, collection and factory pages to turn this sourcing research into a focused manufacturing conversation."
        links={[
          { href: "/products/crazy-horse-leather-travel-tote-bag", label: "View the travel tote", description: "Review customization, specifications and a buyer inquiry form." },
          { href: "/products", label: "Browse all collections", description: "Explore other genuine leather bag categories." },
          { href: "/about#production", label: "See the factory", description: "Learn about the production floor and quality process." },
          { href: "/contact#inquiry", label: "Start your inquiry", description: "Send your requirements directly to the Marrant team." },
        ]}
      />
    </main>
  );
}
