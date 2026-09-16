"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import InternalLinkPanel from "../components/InternalLinkPanel";
import { isProductCategoryId, productCategoriesFor, type ProductCategoryId } from "../components/product-taxonomy";
import { useInquirySubmission } from "../components/useInquirySubmission";
import { ArrowRight, ClipboardText, Factory, MagnifyingGlass, Package, PencilSimple, Swatches, Tag } from "@phosphor-icons/react";
import styles from "./page.module.css";

const categoryGroups = productCategoriesFor("en");
type Category = "all" | ProductCategoryId;

const products = [
  {
    category: "bags",
    title: "Crazy Horse Leather",
    copy: "Character-rich leather made for lasting collections.",
    image: "/assets/products/crazy-horse-duffle-catalogue-v1.png",
    href: "/products/crazy-horse-leather-travel-tote-bag",
  },
  {
    category: "bags",
    title: "Travel Tote Bags",
    copy: "Purposeful carry for modern travel and work.",
    image: "/assets/products/black-travel-tote-catalogue-v1.png",
  },
  {
    category: "small-leather-goods",
    title: "Full-Grain Leather Bifold Wallet · 8064",
    copy: "A compact men's wallet with customizable branding and interior details.",
    image: "/assets/products/mens-bifold-wallet-8064/main.jpg",
    href: "/products/mens-full-grain-leather-bifold-wallet-8064",
  },
  {
    category: "small-leather-goods",
    title: "Wholesale Leather AirTag Passport Wallet",
    copy: "RFID passport organizer with an AirTag slot for wholesale and private-label orders.",
    image: "/assets/products/leather-airtag-passport-wallet/colors.png",
    href: "/products/wholesale-leather-airtag-passport-holder-wallet",
  },
  {
    category: "small-leather-goods",
    title: "Wholesale Leather Compass Bifold Wallet · 1040",
    copy: "Top-grain cowhide wallet with compass embossing, anti-scan lining and nine listed SKU options.",
    image: "/assets/products/leather-compass-wallet-1040/main.png",
    href: "/products/wholesale-top-grain-leather-compass-bifold-wallet",
  },
  {
    category: "small-leather-goods",
    title: "Wholesale Crazy Horse Leather Card Holder · 1343",
    copy: "Lightweight slim card holder with a vintage crazy-horse finish and six listed colors.",
    image: "/assets/products/crazy-horse-leather-card-holder-1343/color-overview-logo-removed.png",
    href: "/products/wholesale-crazy-horse-leather-slim-card-holder",
  },
  {
    category: "small-leather-goods",
    title: "Wholesale Top-Grain Leather Manicure Scissors Pouch · Q1002",
    copy: "Embossed cowhide pouch with layered tool pockets, snap closure and a compact portable format.",
    image: "/assets/products/top-grain-leather-manicure-scissors-pouch-q1002/features-overview.webp",
    href: "/products/wholesale-top-grain-leather-manicure-scissors-storage-pouch",
  },
  {
    category: "small-leather-goods",
    title: "Wholesale Crazy Horse Leather Notebook Cover · Q1005",
    copy: "Compact notebook organizer with a card pocket, pen loop and vintage crazy horse leather finish.",
    image: "/assets/products/crazy-horse-leather-notebook-cover-q1005/features.webp",
    href: "/products/wholesale-crazy-horse-leather-notebook-cover",
  },
  {
    category: "small-leather-goods",
    title: "Wholesale Top-Grain Leather Zip Coin Pocket Wallet · 7042",
    copy: "Compact cowhide bifold wallet with a rear zipper pocket, snap closure and four listed colors.",
    image: "/assets/products/top-grain-zip-wallet-7042/coffee-front.webp",
    href: "/products/wholesale-top-grain-leather-zip-coin-pocket-bifold-wallet",
  },
  {
    category: "bags",
    title: "Shoulder Bags",
    copy: "Versatile silhouettes for work and daily use.",
    image: "/assets/products/leather-messenger-catalogue-v1.png",
  },
  {
    category: "bags",
    title: "Backpacks",
    copy: "Practical designs built for a life in motion.",
    image: "/assets/products/leather-backpack-catalogue-v1.png",
  },
  {
    category: "bags",
    title: "Women's Bags",
    copy: "Polished forms with thoughtful leather details.",
    image: "/assets/products/womens-handbag-catalogue-v1.png",
  },
  {
    category: "desk-lifestyle",
    title: "Wholesale Crazy Horse Leather Scissors Storage Pouch · Q1003",
    copy: "Top-grain cowhide pen-style pouch with layered tool pockets, snap closure and a vintage crazy horse finish.",
    image: "/assets/products/crazy-horse-leather-scissors-pouch-q1003/features-overview.webp",
    href: "/products/wholesale-crazy-horse-leather-scissors-storage-pouch",
  },
  {
    category: "desk-lifestyle",
    title: "Wholesale Top-Grain Leather Multipurpose Pen Case · Q1004",
    copy: "Structured cowhide zipper pen case with five color options for desk, stationery and compact-tool collections.",
    image: "/assets/products/top-grain-leather-multipurpose-pen-case-q1004/colors.webp",
    href: "/products/wholesale-top-grain-leather-multipurpose-pen-case",
  },
  {
    category: "desk-lifestyle",
    title: "Wholesale Top-Grain Leather Pen Holder · Q1006",
    copy: "Cylindrical open-top cowhide organizer for pens, pencils and compact desktop tools.",
    image: "/assets/products/top-grain-leather-pen-holder-q1006/features.webp",
    href: "/products/wholesale-top-grain-leather-pen-holder",
  },
  {
    category: "desk-lifestyle",
    title: "Wholesale Top-Grain Leather Compass Pencil Case · Q1008",
    copy: "Zip-around cowhide pencil case with polyester lining, elastic pen loops and a mesh pocket.",
    image: "/assets/products/top-grain-leather-compass-pencil-case-q1008/features.webp",
    href: "/products/wholesale-top-grain-leather-compass-pencil-case",
  },
  {
    category: "desk-lifestyle",
    title: "Wholesale Top-Grain Leather Folding Catchall Tray · Q1009",
    copy: "Fold-flat cowhide valet tray with four corner snaps for keys, cables and small everyday items.",
    image: "/assets/products/top-grain-leather-catchall-tray-q1009/features.webp",
    href: "/products/wholesale-top-grain-leather-catchall-tray",
  },
  {
    category: "desk-lifestyle",
    title: "Wholesale Embossed Top-Grain Leather Pen Sleeve · Q1010",
    copy: "Slim floral-embossed cowhide pen sleeve with two listed sizes and a tuck-through flap closure.",
    image: "/assets/products/embossed-top-grain-leather-pen-sleeve-q1010/features.webp",
    href: "/products/wholesale-embossed-top-grain-leather-pen-sleeve",
  },
  {
    category: "desk-lifestyle",
    title: "Desk & Lifestyle",
    copy: "Mouse pads, coasters, pen cases and keychains for branded collections.",
    image: "/assets/navigation/crazy-horse-desk-v1.webp",
  },
  {
    category: "cases-gifts",
    title: "Cases & Gifts",
    copy: "Watch boxes, cigar cases and gift sets made for private-label programs.",
    image: "/assets/navigation/crazy-horse-gifts-v1.webp",
  },
] as const;

const requirementItems = [
  { icon: Package, title: "Product Category", text: "Start with the bag style you want to develop." },
  { icon: Swatches, title: "Material", text: "Choose leather, lining, hardware and finish." },
  { icon: Tag, title: "Logo & Branding", text: "Tell us about your preferred branding treatment." },
  { icon: ClipboardText, title: "Approximate Quantity", text: "Share the volume you are planning for." },
];

const supports = [
  { icon: PencilSimple, title: "Product Development", text: "From sketch to sample, we shape ideas for your market." },
  { icon: Swatches, title: "Materials & Customization", text: "Leather, hardware and finishing details aligned to your brief." },
  { icon: Factory, title: "Flexible Manufacturing", text: "Practical support for evolving order requirements." },
  { icon: Tag, title: "Private Label", text: "Make the collection distinctly yours." },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [query, setQuery] = useState("");
  const [interest, setInterest] = useState("");
  const { handleSubmit, isSubmitting, resetStatus, status } = useInquirySubmission("en");

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get("category");
    if (isProductCategoryId(category)) setActiveCategory(category);
  }, []);

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const category = categoryGroups.find((group) => group.id === product.category);
      const searchTerms = category ? `${category.label} ${category.items.map((item) => item.label).join(" ")}` : "";
      const isInCategory = activeCategory === "all" || product.category === activeCategory;
      const matchesSearch = !normalized || `${product.title} ${product.copy} ${searchTerms}`.toLowerCase().includes(normalized);
      return isInCategory && matchesSearch;
    });
  }, [activeCategory, query]);

  const chooseCategory = (category: Category) => {
    setActiveCategory(category);
    resetStatus();
  };

  const requestProduct = (product: (typeof products)[number]) => {
    setInterest(product.category);
    resetStatus();
    scrollToId("request");
  };

  return (
    <main className={styles.page}>

      <section className={styles.hero} aria-labelledby="page-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>MARRANT PRODUCT COLLECTIONS</p>
          <h1 id="page-title">Find the Right<br />Leather Bag for<br />Your Collection</h1>
          <p className={styles.heroDescription}>Genuine leather bags for importers, distributors and e-commerce brands. Explore our collections and start your next OEM/ODM project.</p>
          <div className={styles.searchWrap}>
            <MagnifyingGlass size={19} aria-hidden="true" />
            <label className={styles.srOnly} htmlFor="product-search">Search by product type</label>
            <input id="product-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by product type" />
          </div>
          <button className={styles.primaryButton} type="button" onClick={() => scrollToId("request")}>Request a Quote</button>
        </div>
        <div className={styles.heroMedia}>
          <img src="/assets/products/crazy-horse-duffle-catalogue-v1.png" alt="Crazy Horse leather duffle bag" />
        </div>
      </section>

      <section className={styles.catalogue} id="products-index" aria-labelledby="catalogue-title">
        <div className={styles.catalogueIntro}>
          <div>
            <p className={styles.kicker}>PRODUCT RANGE</p>
            <h2 id="catalogue-title">Browse the Collection</h2>
          </div>
          <p aria-live="polite">{visibleProducts.length} collection{visibleProducts.length === 1 ? "" : "s"} shown</p>
        </div>
        <div className={styles.catalogueLayout}>
          <aside className={styles.categoryRail} aria-label="Filter collections">
            <button type="button" className={activeCategory === "all" ? styles.categoryActive : ""} onClick={() => chooseCategory("all")}>All Products</button>
            {categoryGroups.map((category) => (
              <button key={category.id} type="button" className={activeCategory === category.id ? styles.categoryActive : ""} onClick={() => chooseCategory(category.id)}>
                {category.label}
              </button>
            ))}
          </aside>
          <div className={styles.productsGrid}>
            {visibleProducts.map((product) => (
              <article className={styles.productCard} key={product.title}>
                {"href" in product ? (
                  <Link className={styles.productLink} href={product.href} aria-label={`View ${product.title}`}>
                    <span className={styles.productImage}><img src={product.image} alt={product.title} /></span>
                    <span className={styles.productName}>{product.title}</span>
                    <span className={styles.productMeta}><span>{product.copy}</span><ArrowRight size={19} weight="light" aria-hidden="true" /></span>
                  </Link>
                ) : (
                  <button type="button" onClick={() => requestProduct(product)} aria-label={`Request a quote for ${product.title}`}>
                    <span className={styles.productImage}><img src={product.image} alt={product.title} /></span>
                    <span className={styles.productName}>{product.title}</span>
                    <span className={styles.productMeta}><span>{product.copy}</span><ArrowRight size={19} weight="light" aria-hidden="true" /></span>
                  </button>
                )}
              </article>
            ))}
            {visibleProducts.length === 0 && (
              <div className={styles.emptyState}>
                <p>No collection matches that search.</p>
                <button type="button" onClick={() => { setQuery(""); chooseCategory("all"); }}>Show all products</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.requirements} id="request" aria-labelledby="request-title">
        <div className={styles.requirementsIntro}>
          <p className={styles.kicker}>START A PROJECT</p>
          <h2>Start with your<br />requirements</h2>
          <p>Share a few details about your project and our team will guide you through the right options.</p>
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
          <p className={styles.kicker}>TELL US ABOUT YOUR PROJECT</p>
          <h2 id="request-title">Request a Quote</h2>
          <div className={styles.formTwoColumns}>
            <label><span>Full Name</span><input required name="name" placeholder="Your name" /></label>
            <label><span>Company Name</span><input required name="company" placeholder="Your company" /></label>
          </div>
          <div className={styles.formTwoColumns}>
            <label><span>Email</span><input required type="email" name="email" placeholder="name@company.com" /></label>
            <label><span>Country / Region</span><input name="region" placeholder="Your country or region" /></label>
          </div>
          <div className={styles.formTwoColumns}>
            <label><span>Product Category</span><select name="product" value={interest} onChange={(event) => setInterest(event.target.value)}><option value="">Select a category</option>{categoryGroups.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}</select></label>
            <label><span>Order Timeline</span><select name="timeline" defaultValue=""><option value="" disabled>Select timeline</option><option>To be discussed</option><option>Sample first</option><option>Production ready</option></select></label>
          </div>
          <label className={styles.messageField}><span>Tell us about your project</span><textarea required name="message" rows={4} placeholder="Materials, design, target market, quantities, or anything else we should know..." /></label>
          <button className={styles.primaryButton} type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Submit Inquiry"}</button>
          {status ? <p className={styles.success} role="status" data-tone={status.tone}>{status.message}</p> : null}
        </form>
      </section>

      <section className={styles.support} aria-labelledby="support-title">
        <p className={styles.kicker}>OEM/ODM SUPPORT</p>
        <h2 id="support-title">Made around your brief</h2>
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
        title="Choose your next step"
        description="Use a product example, sourcing advice and factory context to turn your collection idea into a clearer brief."
        links={[
          { href: "/products/crazy-horse-leather-travel-tote-bag", label: "View the travel tote", description: "Explore specifications, materials and branding options." },
          { href: "/blog/how-to-source-crazy-horse-leather-travel-tote-bag", label: "Read the sourcing guide", description: "Plan materials, construction and supplier evaluation." },
          { href: "/about#production", label: "See our production", description: "Understand the process and quality checkpoints." },
          { href: "/contact#inquiry", label: "Start an inquiry", description: "Share your category, market and quantity with our team." },
        ]}
      />
    </main>
  );
}
