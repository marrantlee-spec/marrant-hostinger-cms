"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  CaretDown,
  ChatCircleDots,
  CheckCircle,
  ClipboardText,
  DownloadSimple,
  Factory,
  GlobeHemisphereWest,
  Lightbulb,
  List,
  Package,
  PencilSimple,
  ShieldCheck,
  Swatches,
  Tag,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";

const whatsapp = "https://wa.me/8618925073489";

const gallery = [
  { src: "/assets/product-detail/travel-tote-front.png", alt: "Crazy Horse leather travel tote bag, front view" },
  { src: "/assets/product-detail/leather-production-workshop-v1.png", alt: "Marrant craftsperson sewing a genuine leather travel bag in the production workshop", position: "center" },
  { src: "/assets/products/crazy-horse-duffle.png", alt: "Crazy Horse leather duffle bag" },
  { src: "/assets/product-detail/crazy-horse-leather-detail.png", alt: "Close-up of Crazy Horse leather and brass hardware" },
  { src: "/assets/products/leather-messenger.png", alt: "Genuine leather shoulder bag" },
];

const quickFacts = [
  ["Material", "Crazy Horse Leather"],
  ["Dimensions", "L × W × H (customizable)"],
  ["Logo Method", "Deboss / Emboss / Laser / Hot Stamp"],
  ["Color", "Custom options available"],
  ["Packaging", "Protective bag + carton"],
  ["Sample Lead Time", "To be confirmed"],
  ["MOQ", "To be confirmed"],
];

const specificationPairs = [
  { left: ["Style", "Travel Tote Bag"], right: ["Dimensions (L×W×H)", "To be confirmed"] },
  { left: ["Material", "Crazy Horse Leather"], right: ["Handle Drop", "To be confirmed"] },
  { left: ["Lining", "To be confirmed"], right: ["Shoulder Strap", "Detachable & adjustable"] },
  { left: ["Hardware", "Solid brass"], right: ["Color", "Custom options available"] },
  { left: ["Closure", "To be confirmed"], right: ["Logo Method", "To be confirmed"] },
  { left: ["Exterior Features", "To be confirmed"], right: ["MOQ", "To be confirmed"] },
  { left: ["Interior Features", "To be confirmed"], right: ["Sample Lead Time", "To be confirmed"] },
  { left: null, right: ["Production Lead Time", "To be confirmed"] },
];

const colors = [
  ["Cognac Brown", "#9a4f22"],
  ["Dark Brown", "#4f3020"],
  ["Coffee", "#745440"],
  ["Black", "#242321"],
];

const customization = [
  { icon: Tag, title: "Deboss", text: "A subtle pressed mark in the leather." },
  { icon: CheckCircle, title: "Emboss", text: "A raised brand detail for tactile character." },
  { icon: Lightbulb, title: "Laser Engraving", text: "Precise logo treatment on suitable materials." },
  { icon: Swatches, title: "Hot Stamping", text: "A refined finish for selected brand elements." },
];

const packaging = [
  ["Protective Bag", "Non-woven"],
  ["Inner Protection", "As per request"],
  ["Export Carton", "Customizable"],
  ["Ready for Shipment", "Final inspection"],
];

const process = [
  [ChatCircleDots, "Inquiry", "Share your requirements"],
  [ClipboardText, "Confirm", "Details, cost & quantity"],
  [PencilSimple, "Sample", "Sample production"],
  [Factory, "Production", "Mass production starts"],
  [GlobeHemisphereWest, "Delivery", "Inspection & shipment"],
];

const faqs = [
  ["Can the size and interior layout be customized?", "Yes. Share your target size, compartments and use case, and we will review the best way to develop the product."],
  ["What is the MOQ for this bag?", "MOQ is confirmed with the requested leather, hardware, logo method and order requirements."],
  ["How long does sample production take?", "Sampling time depends on the chosen materials and the level of customization. We confirm the schedule after reviewing your brief."],
  ["What file format do you need for our logo?", "A vector logo is preferred. Send the files you have and our team will confirm the most suitable production method."],
  ["What are your payment terms?", "Please send an inquiry with your product requirements and destination; our sales team will provide the applicable quotation and terms."],
];

export default function TravelToteProductPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <main className="product-page" id="top">
      <header className="product-header">
        <a className="product-brand" href="/" aria-label="Marrant home">
          <img src="/assets/brand/marrant-logo.png" alt="Marrant" />
        </a>
        <nav className={menuOpen ? "product-nav is-open" : "product-nav"} aria-label="Product navigation">
          <a href="/" onClick={closeMenu}>Home</a>
          <a href="#specifications" onClick={closeMenu}>Products</a>
          <a href="#customization" onClick={closeMenu}>Customization</a>
          <a href="#process" onClick={closeMenu}>Capabilities</a>
          <a href="/about" onClick={closeMenu}>About Us</a>
          <a href="#faq" onClick={closeMenu}>Resources</a>
          <a href="#inquiry" onClick={closeMenu}>Contact</a>
          <a className="product-nav-cta mobile-only-cta" href="#inquiry" onClick={closeMenu}>Request Specification</a>
        </nav>
        <div className="product-header-actions"><span className="language-label">EN <CaretDown size={12} /></span><a className="product-nav-cta" href="#inquiry">Request Specification</a></div>
        <button className="product-menu-button" type="button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={23} /> : <List size={24} />}</button>
      </header>

      <div className="product-shell">
        <div className="breadcrumbs"><a href="/">Home</a><span>›</span><a href="#specifications">Bags</a><span>›</span><a href="#specifications">Travel Bags</a><span>›</span><b>Crazy Horse Leather Travel Tote Bag</b></div>

        <section className="product-hero-detail">
          <aside className="gallery-thumbnails" aria-label="Product image gallery">
            {gallery.map((image, index) => <button className={activeImage === index ? "is-selected" : ""} type="button" key={image.src} onClick={() => setActiveImage(index)} aria-label={`Show image ${index + 1}`}><img src={image.src} alt="" style={{ objectPosition: image.position }} /></button>)}
          </aside>
          <div className="gallery-stage"><img src={gallery[activeImage].src} alt={gallery[activeImage].alt} style={{ objectPosition: gallery[activeImage].position }} /></div>
          <div className="product-intro">
            <p className="product-kicker">Travel Tote <span /></p>
            <h1>Crazy Horse<br />Leather Travel<br />Tote Bag</h1>
            <p>Vintage character meets everyday function. Crafted from full-grain crazy horse leather with solid brass hardware for reliable performance on every trip.</p>
            <span className="product-intro-rule" />
            <a className="product-primary-button" href="#inquiry">Request Specification <ArrowRight size={17} /></a>
            <a className="product-whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><WhatsappLogo size={18} /> Chat with our team</a>
          </div>
        </section>

        <section className="quick-facts" aria-label="Product quick facts">
          {quickFacts.map(([label, value]) => <div key={label}><strong>{label}</strong><span>{value}</span></div>)}
        </section>

        <section className="detail-section specifications" id="specifications">
          <div className="section-title"><p>Product Specifications</p><span /></div>
          <div className="spec-table">
            {specificationPairs.map(({ left, right }) => <div className="spec-pair" key={right[0]}>{left ? <div className="spec-row"><strong>{left[0]}</strong><span>{left[1]}</span></div> : <div className="spec-row spec-row-empty" aria-hidden="true" />}{<div className="spec-row"><strong>{right[0]}</strong><span>{right[1]}</span></div>}</div>)}
          </div>
          <small className="spec-note">Note: All specifications can be customized to your requirements.</small>
        </section>

        <section className="detail-section option-grid" id="customization">
          <article className="material-card"><div className="section-title"><p>Material Option</p></div><img src="/assets/product-detail/crazy-horse-leather-detail.png" alt="Crazy Horse leather texture and brass hardware" /><h2>Crazy Horse Leather</h2><p>Full-grain cowhide with a natural pull-up effect.</p></article>
          <article className="color-card"><div className="section-title"><p>Color Options</p></div><div className="color-swatches">{colors.map(([name, color]) => <button type="button" key={name} aria-label={name}><span style={{ backgroundColor: color }} /><small>{name}</small></button>)}</div><p>Custom colors available upon request.</p></article>
          <article className="custom-card"><div className="section-title"><p>Logo & Customization</p></div><div className="custom-methods">{customization.map(({ icon: Icon, title, text }) => <div key={title}><Icon size={28} weight="thin" /><strong>{title}</strong><small>{text}</small></div>)}</div></article>
        </section>

        <section className="detail-section delivery-grid" id="process">
          <article><div className="section-title"><p>Packaging Solution</p></div><div className="packaging-list">{packaging.map(([title, text], index) => <div key={title}><Package size={40} weight="thin" /><strong>{title}</strong><small>{text}</small>{index < packaging.length - 1 && <ArrowRight className="packaging-arrow" size={16} weight="thin" />}</div>)}</div></article>
          <article><div className="section-title"><p>Order Process</p></div><div className="order-process">{process.map(([Icon, title, text], index) => { const StepIcon = Icon as typeof Lightbulb; return <div key={title as string} className="order-step"><span><StepIcon size={28} weight="thin" /></span><strong>{title as string}</strong><small>{text as string}</small>{index < process.length - 1 && <ArrowRight className="order-arrow" size={16} weight="thin" />}</div>; })}</div></article>
        </section>

        <section className="detail-section factory-visit" aria-label="Visit Marrant factory">
          <img src="/assets/product-detail/factory-client-visit-v1.png" alt="Marrant owners guiding international clients through a genuine leather bag production workshop" loading="lazy" decoding="async" />
          <div className="factory-visit-content"><p className="factory-visit-kicker">Visit Marrant</p><h2>See How Your Bags Are Made</h2><p>We welcome brand teams, importers and product developers to see the real production floor: leather selection, cutting, stitching, hardware assembly and final quality checks.</p><div className="factory-visit-points"><span><CheckCircle size={17} weight="fill" /> Owner-led factory visit</span><span><CheckCircle size={17} weight="fill" /> Live leather bag production</span><span><CheckCircle size={17} weight="fill" /> Discuss your OEM / ODM brief</span></div><a className="product-primary-button" href="#inquiry">Plan a Factory Visit <ArrowRight size={17} /></a></div>
        </section>

        <section className="detail-section faq-catalogue" id="faq">
          <article className="faq-list"><div className="section-title"><p>Frequently Asked Questions</p></div>{faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>{question}<span>{openFaq === index ? "−" : "+"}</span></button>{openFaq === index && <p>{answer}</p>}</div>)}</article>
          <article className="catalogue-card"><div><div className="section-title"><p>Download Catalogue</p></div><p>Explore more bag styles, materials, and customization options in our latest catalogue.</p><a className="product-primary-button" href="#inquiry"><DownloadSimple size={18} /> Request Catalogue</a></div><img src="/assets/brand/hero-leather-bags.jpg" alt="Marrant genuine leather bag catalogue" /></article>
        </section>

        <section className="detail-section inquiry-section" id="inquiry">
          <form className="product-inquiry-form" onSubmit={handleSubmit}>
            <div className="section-title"><p>Submit an Inquiry</p></div><p>Tell us about your project and our team will get back to you with the right solution.</p>
            <div className="product-form-grid"><input required aria-label="Your name" placeholder="Your Name *" name="name" /><input aria-label="Company name" placeholder="Company Name" name="company" /><input required type="email" aria-label="Email" placeholder="Email *" name="email" /><input aria-label="Country or region" placeholder="Country / Region" name="country" /><input aria-label="Product interest" placeholder="Product Interest" name="interest" /><input aria-label="Estimated order quantity" placeholder="Estimated Order Quantity" name="quantity" /></div>
            <textarea required aria-label="Message" placeholder="Message *" name="message" rows={5} />
            <label className="privacy-check"><input required type="checkbox" /> I agree to the Privacy Policy.</label>
            <button className="product-primary-button product-submit" type="submit">Submit Inquiry <ArrowRight size={17} /></button>
            {submitted && <p className="product-success" role="status">Thank you. Our sales team will contact you soon.</p>}
          </form>
          <aside className="partner-card" id="about-marrant"><div><div className="section-title"><p>Why Partner with Marrant?</p></div><ul><li><ShieldCheck size={18} /> Specialized in leather bag manufacturing</li><li><Swatches size={18} /> Flexible customization for global markets</li><li><CheckCircle size={18} /> Reliable quality control and delivery</li><li><ChatCircleDots size={18} /> Dedicated support from inquiry to after-sales</li></ul></div><div className="partner-contact"><strong>Contact Information</strong><a href="mailto:Melody@marrant.cn">Melody@marrant.cn</a><a href={whatsapp} target="_blank" rel="noreferrer">+86 189 2507 3489</a><span>Guangzhou, China</span></div></aside>
        </section>
      </div>

      <footer className="product-footer"><div className="product-shell footer-detail"><div><img src="/assets/brand/marrant-logo.png" alt="Marrant" /><p>Reliable leather goods manufacturer for global brands and distributors.</p></div><div><strong>Products</strong><a href="#specifications">All Bags</a><a href="#specifications">Travel Bags</a><a href="#specifications">Briefcases</a><a href="#specifications">Backpacks</a></div><div><strong>Customization</strong><a href="#customization">OEM / ODM</a><a href="#customization">Materials</a><a href="#customization">Logo & Branding</a><a href="#process">Packaging</a></div><div><strong>Company</strong><a href="#about-marrant">About Us</a><a href="#process">Our Factory</a><a href="#about-marrant">Quality Control</a></div><div><strong>Resources</strong><a href="#faq">Catalogue</a><a href="#faq">Care Guide</a><a href="#faq">FAQ</a></div><div><strong>Contact Us</strong><a href="mailto:Melody@marrant.cn">Melody@marrant.cn</a><a href={whatsapp} target="_blank" rel="noreferrer">+86 189 2507 3489</a><a className="footer-cta" href="#inquiry">Request Specification</a></div></div><div className="product-shell footer-bottom"><span>© 2026 Marrant Leather Co., Ltd. All rights reserved.</span><span>Privacy Policy　|　Terms of Use</span></div></footer>
    </main>
  );
}
