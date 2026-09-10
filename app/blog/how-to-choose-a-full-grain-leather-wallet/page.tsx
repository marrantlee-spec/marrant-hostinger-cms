import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InternalLinkPanel from "../../components/InternalLinkPanel";
import BlogInquiryForm from "../how-to-source-crazy-horse-leather-travel-tote-bag/BlogInquiryForm";
import { ArrowRightIcon } from "../how-to-source-crazy-horse-leather-travel-tote-bag/BlogIcons";
import styles from "../how-to-source-crazy-horse-leather-travel-tote-bag/page.module.css";

const path = "/blog/how-to-choose-a-full-grain-leather-wallet";
const title = "How to Choose a Full-Grain Leather Wallet for Your Brand | Marrant";
const description = "A buyer-focused guide to full-grain leather, card-slot design and OEM customization for retail and private-label wallet collections.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: path,
    languages: { en: path, "zh-CN": `/zh${path}` },
  },
  openGraph: {
    title,
    description,
    type: "article",
    url: `https://www.marrantbag.com${path}`,
    siteName: "Marrant Bag",
    images: ["/assets/products/mens-bifold-wallet-8064/scenario.jpg"],
  },
};

const articleSections = [
  ["full-grain", "What Full-Grain Leather Means"],
  ["leather-spec", "Build a Clear Leather Specification"],
  ["card-layout", "Evaluate the Card-Slot Layout"],
  ["construction", "Check Wallet Construction"],
  ["oem", "Plan OEM Customization"],
  ["sample-review", "Review the Sample"],
  ["buyer-checklist", "Buyer Checklist"],
];

const sampleChecks = [
  ["Leather", "Grain character, color, thickness, hand feel and finish match the approved reference."],
  ["Card access", "Cards insert and remove smoothly without loose pockets or excessive resistance."],
  ["Loaded profile", "The wallet closes cleanly when the intended cards and banknotes are added."],
  ["Stitching", "Lines are even, backstitching is secure and corners remain neat."],
  ["Branding", "Logo size, position, depth, color and clarity match the approved artwork."],
];

export default function FullGrainWalletGuidePage() {
  return (
    <main className={styles.page}>
      <div className={styles.articleShell}>
        <section className={styles.articleHeading}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><Link href="/blog">Blog</Link><span>›</span><span>Wallet Sourcing</span>
          </nav>
          <h1>How to Choose a Full-Grain<br />Leather Wallet for Your Brand</h1>
          <div className={styles.byline}><span>By Marrant Team</span><i /><span>Sep 10, 2026</span><i /><span>7 min read</span></div>
        </section>

        <aside className={styles.tableOfContents} aria-label="Table of contents">
          <p>Table of Contents</p>
          <ol>
            {articleSections.map(([id, label], index) => <li key={id}><a href={`#${id}`} className={index === 0 ? styles.activeTocLink : undefined}>{label}</a></li>)}
          </ol>
        </aside>

        <article className={styles.article}>
          <div className={styles.heroImage}>
            <Image src="/assets/products/mens-bifold-wallet-8064/scenario.jpg" alt="Brown full-grain leather bifold wallet for private-label development" fill priority sizes="(max-width: 860px) 100vw, 650px" />
          </div>
          <p className={styles.lead}>For retailers and brand buyers, choosing a <strong>full grain leather wallet</strong> is not simply a material decision. Leather specification, pocket geometry, construction and branding must work together for the target customer and price position.</p>
          <p>This guide explains the points to define before sampling, using Marrant SKU 8064 as a practical bifold reference.</p>

          <section id="full-grain">
            <h2>What Full-Grain Leather Means</h2>
            <p>Full-grain leather retains the hide&apos;s natural grain surface rather than sanding it away to create a uniform face. That can preserve visible pores and natural variation, but the term alone does not define tanning method, thickness, softness, finish or color consistency. Buyers should approve an actual leather cutting or sample instead of relying on the material name alone.</p>
            <div className={styles.detailImage}>
              <Image src="/assets/products/mens-bifold-wallet-8064/main.jpg" alt="Natural grain and tonal variation on a brown leather bifold wallet" fill sizes="(max-width: 860px) 100vw, 650px" />
            </div>
            <blockquote>A strong wallet brief connects the leather to the way the finished product should look, feel and perform.<cite>— Marrant Team</cite></blockquote>
          </section>

          <section id="leather-spec" className={styles.materialNote}>
            <h2>Build a Clear Leather Specification</h2>
            <div className={styles.noteGrid}>
              <div><strong>Appearance</strong><span>Define acceptable grain variation, color range and gloss level with physical references.</span></div>
              <div><strong>Hand feel</strong><span>Confirm whether the collection needs a firm, structured feel or a softer break-in character.</span></div>
              <div><strong>Finish</strong><span>Review rub-off, marking and surface behavior on the selected finish during sampling.</span></div>
            </div>
          </section>

          <section id="card-layout">
            <h2>Evaluate the Card-Slot Layout</h2>
            <p>Slot count is only the starting point. Confirm the card size used in the destination market, how many cards customers are likely to carry and whether quick-access, hidden or ID pockets are needed. Pocket opening, seam allowance and stacked leather thickness all affect how easily cards move.</p>
            <p>Load the sample with real cards and banknotes. Check access with one card per slot, then repeat with the intended carrying load. A compact empty wallet can become bulky or difficult to close when its pocket layers are not planned together.</p>
          </section>

          <section id="construction">
            <h2>Check Wallet Construction</h2>
            <p>Inspect the fold, pocket edges, lining transitions, zipper area and stitched corners. The centre fold should close without forcing the leather, while pocket edges should remain flat and comfortable in hand. Edge paint, folded edges or raw-edge finishing each create a different look and require their own approval standard.</p>
          </section>

          <section id="oem">
            <h2>Plan OEM Customization</h2>
            <p>OEM development can adapt a wallet to your brand while retaining a proven construction base. Provide vector logo artwork, reference colors, the required internal layout and packaging direction at the start of sampling.</p>
            <div className={styles.customizationGrid}>
              <div><strong>Logo</strong><span>Evaluate embossing, debossing, foil stamping or an applied metal mark.</span></div>
              <div><strong>Color</strong><span>Approve leather and edge-color references under consistent lighting.</span></div>
              <div><strong>Interior</strong><span>Adjust card slots, cash compartments, zipper pockets and lining details.</span></div>
              <div><strong>Packaging</strong><span>Coordinate boxes, dust bags, care cards, labels and protective packing.</span></div>
            </div>
            <p>Final feasibility depends on the selected material, construction and artwork. These details should be confirmed against the approved sample and written specification.</p>
          </section>

          <section id="sample-review">
            <h2>Review the Sample Before Approval</h2>
            <div className={styles.tableWrap}>
              <table>
                <thead><tr><th>Review Area</th><th>What the Buyer Should Confirm</th></tr></thead>
                <tbody>{sampleChecks.map(([area, check]) => <tr key={area}><td>{area}</td><td>{check}</td></tr>)}</tbody>
              </table>
            </div>
          </section>

          <section id="buyer-checklist" className={styles.processSection}>
            <h2>Buyer Checklist</h2>
            <p>Before requesting a sample, prepare the target market, retail positioning, wallet dimensions, card and cash layout, leather direction, logo artwork, color references and packaging concept. Ask the manufacturer to identify any details that need development testing or confirmation.</p>
            <p className={styles.processLink}>Need a concrete starting point? <Link href="/products/mens-full-grain-leather-bifold-wallet-8064">Review full-grain leather bifold wallet SKU 8064</Link>.</p>
          </section>

          <section className={styles.relatedProduct}>
            <div className={styles.relatedImage}><Image src="/assets/products/mens-bifold-wallet-8064/inside.jpg" alt="Interior card-slot layout of leather bifold wallet SKU 8064" fill sizes="230px" /></div>
            <div><p>Related Product</p><h2>Full-Grain Leather<br />Bifold Wallet · 8064</h2><span>A compact reference for card, cash and zipper-pocket customization.</span><Link href="/products/mens-full-grain-leather-bifold-wallet-8064">View Product <ArrowRightIcon width={16} height={16} /></Link></div>
          </section>
        </article>

        <aside className={styles.inquiryRail} id="inquiry"><BlogInquiryForm /></aside>
      </div>

      <InternalLinkPanel
        title="Turn the checklist into a wallet brief"
        description="Use the product reference, manufacturing context and inquiry form to define your private-label wallet project."
        links={[
          { href: "/products/mens-full-grain-leather-bifold-wallet-8064", label: "View wallet 8064", description: "Review supplied images, specifications and customization directions." },
          { href: "/products", label: "Browse all collections", description: "Compare wallets with other leather-goods categories." },
          { href: "/about#production", label: "See our production", description: "Understand the workflow behind leather-goods manufacturing." },
          { href: "/contact#inquiry", label: "Send your wallet brief", description: "Share your market, layout, material and branding requirements." },
        ]}
      />
    </main>
  );
}
