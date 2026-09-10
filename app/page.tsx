"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import InternalLinkPanel from "./components/InternalLinkPanel";
import { ArrowRight, CheckCircle, ClipboardText, Factory, GlobeHemisphereWest, Handshake, Lightbulb, MagnifyingGlass, Package, PencilSimple, ShieldCheck, Swatches, Tag, WhatsappLogo } from "@phosphor-icons/react";

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

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <main>

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

      <section className="process section-light" id="process">
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
    </main>
  );
}
