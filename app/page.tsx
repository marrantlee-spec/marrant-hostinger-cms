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
  { title: "Crazy Horse Leather", image: "/assets/products/crazy-horse-duffle-scene-v1.png", href: "/products/crazy-horse-leather-travel-tote-bag" },
  { title: "Travel Tote Bags", image: "/assets/products/black-travel-tote-scene-v1.png", href: "/products" },
  { title: "Men's Wallets", image: "/assets/products/mens-wallet-45-scene-v1.png", href: "/products" },
  { title: "Shoulder Bags", image: "/assets/products/mens-shoulder-bag-scene-v2.png", href: "/products" },
  { title: "Backpacks", image: "/assets/products/leather-backpack-centered-scene-v2.png", href: "/products" },
  { title: "Women's Bags", image: "/assets/products/womens-coffee-handbag-red-patent-wallet-scene-v2.png", href: "/products" }
];

const services = [
  { icon: PencilSimple, title: "Product Development", text: "From sketches to samples, we shape your ideas." },
  { icon: Swatches, title: "Materials & Customization", text: "Leather, hardware and details tailored to your market." },
  { icon: Factory, title: "Flexible Manufacturing", text: "Adaptable support for different order needs." },
  { icon: Tag, title: "Private Label", text: "Your brand, your identity, our craftsmanship." }
];

const process = [
  { icon: Lightbulb, title: "1. Concept", text: "Share your ideas and requirements." },
  { icon: PencilSimple, title: "2. Design & Sample", text: "We develop and refine samples for approval." },
  { icon: ClipboardText, title: "3. Production", text: "Careful manufacturing with consistent quality." },
  { icon: MagnifyingGlass, title: "4. Quality Check", text: "Inspected to your standards." },
  { icon: Package, title: "5. Global Delivery", text: "Packed and prepared for your destination." }
];

const faqs = [
  "What is your minimum order quantity (MOQ)?",
  "Can you customize our own design and logo?",
  "What information should I provide for a quote?",
  "How long does sampling and production take?",
  "How do you ensure quality?"
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
    eyebrow: "PRODUCT RANGE",
    title: "Leather collections for every market.",
    copy: "Explore made-to-order styles for business, travel and everyday carry.",
    links: [
      { label: "Crazy Horse Leather", description: "Vintage character, durable finish", href: "/products/crazy-horse-leather-travel-tote-bag" },
      { label: "Travel Tote Bags", description: "Purposeful carry for daily travel", href: "/products" },
      { label: "Men's Wallets", description: "Refined essentials and small leather goods", href: "/products" },
      { label: "Backpacks & Shoulder Bags", description: "Versatile silhouettes for your collection", href: "/products" }
    ],
    feature: { label: "FEATURED COLLECTION", title: "Crazy Horse Leather", image: "/assets/products/crazy-horse-duffle.png", href: "/products/crazy-horse-leather-travel-tote-bag" }
  },
  services: {
    eyebrow: "OEM / ODM",
    title: "Your vision, shaped by our craft.",
    copy: "A clear, flexible path from product idea to finished collection.",
    links: [
      { label: "Product Development", description: "Sketches, sampling and refinement", href: "#oem" },
      { label: "Materials & Customization", description: "Leather, hardware and finishing details", href: "#oem" },
      { label: "Flexible Manufacturing", description: "Support for evolving order requirements", href: "#oem" },
      { label: "Private Label", description: "Built around your brand identity", href: "#oem" }
    ],
    feature: { label: "OEM / ODM SERVICE", title: "Make it distinctly yours.", image: "/assets/products/leather-messenger.png", href: "#quote" }
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
    event.currentTarget.reset();
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Marrant home">
          <img src="/assets/brand/marrant-logo.png" alt="Marrant" />
        </a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation" onKeyDown={(event) => { if (event.key === "Escape") setActiveMega(null); }}>
          <div className="nav-menu-item">
            <button className="nav-trigger" type="button" onMouseEnter={() => showMega("products")} onFocus={() => showMega("products")} onClick={() => showMega("products")} aria-expanded={activeMega === "products"} aria-controls="mega-menu" aria-haspopup="true">
              Products <CaretDown size={14} weight="bold" />
            </button>
          </div>
          <div className="nav-menu-item">
            <button className="nav-trigger" type="button" onMouseEnter={() => showMega("services")} onFocus={() => showMega("services")} onClick={() => showMega("services")} aria-expanded={activeMega === "services"} aria-controls="mega-menu" aria-haspopup="true">
              OEM/ODM <CaretDown size={14} weight="bold" />
            </button>
          </div>
          <a href="#factory" onClick={closeNavigation}>Factory</a>
          <Link href="/blog" onClick={closeNavigation}>Blog</Link>
          <Link href="/about" onClick={closeNavigation}>About Us</Link>
          <Link href="/contact" onClick={closeNavigation}>Contact Us</Link>
          <Link className="mobile-quote" href="/contact#inquiry" onClick={closeNavigation}>Request a Quote</Link>
          {activeMega && (
            <>
              <button className="mega-page-dim" type="button" aria-label="Close navigation menu" onClick={() => setActiveMega(null)} />
              <div className="mega-menu-wrap" id="mega-menu" onMouseLeave={() => setActiveMega(null)}>
                <section className="mega-menu" aria-label={`${megaMenus[activeMega].eyebrow} navigation`}>
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
        <Link className="header-cta" href="/contact#inquiry">Request a Quote</Link>
        <button className="menu-button" onClick={() => { setMenuOpen(!menuOpen); setActiveMega(null); }} aria-label="Toggle menu" aria-expanded={menuOpen}>
          {menuOpen ? <X size={24} /> : <List size={26} />}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-shade" />
        <div className="container hero-content">
          <p className="eyebrow">OEM/ODM LEATHER BAG MANUFACTURER</p>
          <h1>Genuine Leather Bags,<br />Made for Your Brand</h1>
          <p className="hero-copy">OEM/ODM manufacturing partner for importers, distributors, e-commerce brands, and global buyers.</p>
          <div className="hero-actions">
            <a className="button button-caramel" href="#quote">Request a Quote</a>
            <a className="button button-outline" href="#products">Explore Products</a>
          </div>
          <div className="hero-proof" aria-label="Marrant advantages">
            <div><ShieldCheck size={31} weight="thin" /><span><b>Quality Craftsmanship</b>Carefully made, built to last.</span></div>
            <div><Swatches size={31} weight="thin" /><span><b>OEM/ODM Solutions</b>From concept to product, made for your brand.</span></div>
            <div><GlobeHemisphereWest size={31} weight="thin" /><span><b>Global Experience</b>Trusted by buyers around the world.</span></div>
          </div>
        </div>
      </section>

      <section className="services section-light" id="oem">
        <div className="container service-grid">
          <div className="service-intro">
            <p className="eyebrow caramel">OEM/ODM & PRIVATE LABEL</p>
            <h2>Your Vision.<br />Our Craft.</h2>
            <span className="line" />
            <p>We help global brands bring their ideas to life with high-quality leather bags and flexible manufacturing solutions.</p>
            <a className="text-link" href="#quote">Our OEM/ODM Services <ArrowRight size={17} /></a>
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
            <div><p className="eyebrow caramel">OUR PRODUCTS</p><h2>Bags That Carry Your Brand</h2></div>
            <Link className="button button-outline light" href="/products">View All Products</Link>
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
          <p className="eyebrow caramel">OUR PROCESS</p>
          <h2 className="process-title">From Concept to Global Delivery</h2>
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
          <div className="founders-image"><img src="/assets/brand/founders.jpg" alt="The Marrant founders" /></div>
          <div className="factory-copy">
            <p className="eyebrow caramel">OUR FACTORY</p>
            <h2>Crafted with Care.<br />Built on Trust.</h2>
            <p>We are a genuine leather bag manufacturer with a passion for craftsmanship and a commitment to long-term partnerships.</p>
            <div className="factory-points">
              <div><Handshake size={29} weight="thin" /><h3>Dedicated Team</h3><span>Experienced and responsible.</span></div>
              <div><ShieldCheck size={29} weight="thin" /><h3>Quality First</h3><span>Every detail matters, every time.</span></div>
              <div><CheckCircle size={29} weight="thin" /><h3>Partnership Focus</h3><span>We grow when you grow.</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq section-light" id="resources">
        <div className="container faq-grid">
          <div><p className="eyebrow caramel">FAQ</p><h2>Frequently Asked<br />Questions</h2></div>
          <div className="faq-list">
            {faqs.map((question, index) => (
              <article className={openFaq === index ? "faq-row open" : "faq-row"} key={question}>
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                  {question}<span>{openFaq === index ? "−" : "+"}</span>
                </button>
                {openFaq === index && <p>Share your product requirements and target market. Our team will review the details and reply with the next practical step.</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <InternalLinkPanel
        title="Build a better brief"
        description="Move from product inspiration to a well-informed manufacturing conversation."
        links={[
          { href: "/products", label: "Browse all collections", description: "Compare bag categories and find a starting point." },
          { href: "/products/crazy-horse-leather-travel-tote-bag", label: "View the travel tote", description: "Review a product example with customizable details." },
          { href: "/blog/how-to-source-crazy-horse-leather-travel-tote-bag", label: "Read the sourcing guide", description: "Learn how to specify leather, hardware and construction." },
          { href: "/about#production", label: "Meet the factory", description: "See the people and production process behind each order." },
        ]}
      />

      <section className="quote" id="quote">
        <div className="container quote-grid">
          <div className="quote-intro">
            <p className="eyebrow caramel">READY TO START YOUR PROJECT?</p>
            <h2>Let&apos;s Build<br />Your Collection.</h2>
            <p>Tell us about your needs and we&apos;ll get back to you with the right solution.</p>
            <a className="whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><WhatsappLogo size={24} weight="fill" /> Chat on WhatsApp</a>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-row"><input required aria-label="Name" name="name" placeholder="Name*" /><input required aria-label="Email" type="email" name="email" placeholder="Email*" /></div>
            <div className="form-row"><input aria-label="Country or region" name="country" placeholder="Country / Region" /><input aria-label="Product requirement" name="product" placeholder="Product Requirement*" /></div>
            <textarea required aria-label="Message" name="message" placeholder="Message*" rows={4} />
            <button className="button button-caramel submit-button" type="submit">Request a Quote</button>
            {submitted && <p className="form-success" role="status">Thank you. Our sales team will contact you soon.</p>}
          </form>
        </div>
      </section>

      <footer id="about">
        <div className="container footer-grid">
          <div className="footer-brand"><img src="/assets/brand/marrant-logo.png" alt="Marrant" /><p>Genuine leather bags. Made for your brand.</p><a href="mailto:Melody@marrant.cn">Melody@marrant.cn</a><a href={whatsapp} target="_blank" rel="noreferrer">+86 189 2507 3489</a></div>
          <div><h3>Products</h3><Link href="/products/crazy-horse-leather-travel-tote-bag">Crazy Horse Leather</Link><Link href="/products">Travel Tote Bags</Link><Link href="/products">Men&apos;s Wallets</Link><Link href="/products">Backpacks</Link><Link href="/products">Women&apos;s Bags</Link></div>
          <div><h3>OEM/ODM</h3><a href="#oem">Our Services</a><a href="#oem">Process</a><Link href="/about#production">Materials</Link><Link href="/contact#inquiry">Private Label</Link></div>
          <div><h3>Resources</h3><Link href="/blog/how-to-source-crazy-horse-leather-travel-tote-bag">Buying Guide</Link><Link href="/blog">Care Guide</Link><a href="#resources">FAQs</a></div>
          <div><h3>About Us</h3><Link href="/about#production">Our Factory</Link><Link href="/about#quality">Why Marrant</Link><Link href="/contact">Contact Us</Link></div>
        </div>
      </footer>
    </main>
  );
}
