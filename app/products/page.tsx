"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardText,
  Factory,
  List,
  MagnifyingGlass,
  Package,
  PencilSimple,
  Swatches,
  Tag,
  X,
} from "@phosphor-icons/react";
import styles from "./page.module.css";

const categories = [
  "All Collections",
  "Crazy Horse Leather",
  "Travel Tote Bags",
  "Men's Wallets",
  "Shoulder Bags",
  "Backpacks",
  "Women's Bags",
] as const;

type Category = (typeof categories)[number];

const products = [
  {
    category: "Crazy Horse Leather",
    title: "Crazy Horse Leather",
    copy: "Character-rich leather made for lasting collections.",
    image: "/assets/products/crazy-horse-duffle-catalogue-v1.png",
  },
  {
    category: "Travel Tote Bags",
    title: "Travel Tote Bags",
    copy: "Purposeful carry for modern travel and work.",
    image: "/assets/products/black-travel-tote-catalogue-v1.png",
  },
  {
    category: "Men's Wallets",
    title: "Men's Wallets",
    copy: "Everyday leather essentials with refined detail.",
    image: "/assets/products/mens-wallet-catalogue-v1.png",
  },
  {
    category: "Shoulder Bags",
    title: "Shoulder Bags",
    copy: "Versatile silhouettes for work and daily use.",
    image: "/assets/products/leather-messenger-catalogue-v1.png",
  },
  {
    category: "Backpacks",
    title: "Backpacks",
    copy: "Practical designs built for a life in motion.",
    image: "/assets/products/leather-backpack-catalogue-v1.png",
  },
  {
    category: "Women's Bags",
    title: "Women's Bags",
    copy: "Polished forms with thoughtful leather details.",
    image: "/assets/products/womens-handbag-catalogue-v1.png",
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
  const [activeCategory, setActiveCategory] = useState<Category>("All Collections");
  const [query, setQuery] = useState("");
  const [interest, setInterest] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const isInCategory = activeCategory === "All Collections" || product.category === activeCategory;
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
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Marrant home">
          <img src="/assets/brand/marrant-logo.png" alt="Marrant" />
        </Link>
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} aria-label="Main navigation">
          <Link href="/products" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link href="/#oem" onClick={() => setMenuOpen(false)}>OEM/ODM</Link>
          <Link href="/#factory" onClick={() => setMenuOpen(false)}>Factory</Link>
          <Link href="/#resources" onClick={() => setMenuOpen(false)}>Resources</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
        </nav>
        <button className={styles.headerCta} type="button" onClick={() => scrollToId("request")}>Request a Quote</button>
        <button className={styles.menuButton} type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          {menuOpen ? <X size={23} /> : <List size={25} />}
        </button>
      </header>

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
            {categories.map((category) => (
              <button key={category} type="button" className={activeCategory === category ? styles.categoryActive : ""} onClick={() => chooseCategory(category)}>
                {category}
              </button>
            ))}
          </aside>
          <div className={styles.productsGrid}>
            {visibleProducts.map((product) => (
              <article className={styles.productCard} key={product.title}>
                <button type="button" onClick={() => requestProduct(product)} aria-label={`Request a quote for ${product.title}`}>
                  <span className={styles.productImage}><img src={product.image} alt={product.title} /></span>
                  <span className={styles.productName}>{product.title}</span>
                  <span className={styles.productMeta}><span>{product.copy}</span><ArrowRight size={19} weight="light" aria-hidden="true" /></span>
                </button>
              </article>
            ))}
            {visibleProducts.length === 0 && (
              <div className={styles.emptyState}>
                <p>No collection matches that search.</p>
                <button type="button" onClick={() => { setQuery(""); chooseCategory("All Collections"); }}>Show all collections</button>
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
            <label><span>Product Category</span><select name="product" value={interest} onChange={(event) => setInterest(event.target.value)}><option value="">Select a category</option>{products.map((product) => <option key={product.title} value={product.title}>{product.title}</option>)}</select></label>
            <label><span>Order Timeline</span><select name="timeline" defaultValue=""><option value="" disabled>Select timeline</option><option>To be discussed</option><option>Sample first</option><option>Production ready</option></select></label>
          </div>
          <label className={styles.messageField}><span>Tell us about your project</span><textarea required name="message" rows={4} placeholder="Materials, design, target market, quantities, or anything else we should know..." /></label>
          <button className={styles.primaryButton} type="submit">Submit Inquiry</button>
          {submitted && <p className={styles.success} role="status">Thank you. Our team will review your request and get back to you with the next step.</p>}
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
    </main>
  );
}
