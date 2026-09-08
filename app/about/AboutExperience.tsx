"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChatCircleDots,
  CheckCircle,
  ClipboardText,
  Factory,
  List,
  Package,
  PencilSimple,
  ShieldCheck,
  Swatches,
  X,
} from "@phosphor-icons/react";
import styles from "./page.module.css";

const expectationCards = [
  { icon: PencilSimple, title: "Product development", copy: "From sketches to samples, we shape your ideas." },
  { icon: Swatches, title: "Material clarity", copy: "We make leather, hardware and construction clear." },
  { icon: ShieldCheck, title: "In-process quality", copy: "We check at key stages, not just at the end." },
  { icon: Package, title: "Global delivery", copy: "Packed and shipped to your destination." },
];

const processSteps = [
  { icon: ChatCircleDots, title: "Inquiry", copy: "Tell us about your idea, product and requirements." },
  { icon: PencilSimple, title: "Sample & Review", copy: "We develop samples for your approval." },
  { icon: ClipboardText, title: "Production", copy: "Careful manufacturing with consistent quality." },
  { icon: ShieldCheck, title: "Quality Check", copy: "Inspected to meet your standards." },
  { icon: Package, title: "Delivery", copy: "Packed and shipped to your destination." },
];

const qualityPoints = [
  "Material inspection before cutting",
  "In-process checks at key stages",
  "Functional and finish evaluations",
  "Clear communication when issues occur",
  "Final inspection before packing",
];

export default function AboutExperience() {
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
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Marrant home">
          <Image src="/assets/brand/marrant-logo.png" alt="Marrant" width={166} height={40} priority />
        </Link>
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} aria-label="Main navigation">
          <Link href="/products" onClick={closeMenu}>Products</Link>
          <Link href="/#oem" onClick={closeMenu}>OEM/ODM</Link>
          <a href="#production" onClick={closeMenu}>Factory</a>
          <Link href="/blog" onClick={closeMenu}>Resources</Link>
          <Link className={styles.activeNav} href="/about" onClick={closeMenu}>About Us</Link>
          <Link className={styles.mobileQuote} href="/contact#inquiry" onClick={closeMenu}>Request a Quote</Link>
        </nav>
        <Link className={styles.headerCta} href="/contact#inquiry">Request a Quote</Link>
        <button className={styles.menuButton} type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <List size={24} />}
        </button>
      </header>

      <section className={styles.hero} aria-labelledby="page-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>About Marrant</p>
          <h1 id="page-title">A Manufacturing<br />Partner You Can See.</h1>
          <p className={styles.lead}>Open information. Visible process. Consistent quality. We make it easy to evaluate leather goods you can trust and sell with confidence.</p>
          <div className={styles.heroActions}>
            <a className={styles.outlineButton} href="#visit">Plan a Factory Visit <ArrowRight size={17} /></a>
            <Link className={styles.outlineButton} href="/contact#inquiry">Request a Quote <ArrowRight size={17} /></Link>
          </div>
        </div>
        <div className={styles.heroMedia}>
          <Image src="/assets/product-detail/factory-client-visit-v1.png" alt="Marrant team welcoming global buyers to the leather workshop" fill priority sizes="(max-width: 900px) 100vw, 58vw" />
        </div>
      </section>

      <section className={styles.expectations} id="proof" aria-labelledby="expectations-title">
        <p className={styles.kicker}>What you can expect</p>
        <h2 id="expectations-title" className={styles.srOnly}>What you can expect from Marrant</h2>
        <div className={styles.expectationGrid}>
          {expectationCards.map(({ icon: Icon, title, copy }) => (
            <article key={title}>
              <Icon size={36} weight="thin" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.production} id="production" aria-labelledby="production-title">
        <div className={styles.productionIntro}>
          <p className={styles.kicker}>Our production, up close</p>
          <h2 id="production-title">Crafted with Care.<br />Made for Your Brand.</h2>
          <p>We combine skilled craftsmanship with structured production. You&apos;ll know what&apos;s happening, where it happens, and how we keep it on track.</p>
          <a className={styles.outlineButton} href="#process">See Our Process <ArrowRight size={17} /></a>
        </div>
        <div className={styles.productionCollage} aria-label="Leather goods, materials and workshop craftsmanship">
          <div className={styles.bagStillLife}><Image src="/assets/brand/hero-leather-bags.jpg" alt="Marrant genuine leather bags" fill sizes="(max-width: 900px) 100vw, 40vw" /></div>
          <div className={styles.leatherTexture}><Image src="/assets/product-detail/crazy-horse-leather-detail.png" alt="Close-up of Crazy Horse leather and brass hardware" fill sizes="(max-width: 900px) 50vw, 20vw" /></div>
          <div className={styles.workshopDetail}><Image src="/assets/product-detail/leather-production-workshop-v1.png" alt="Leather bag craftsmanship in the Marrant workshop" fill sizes="(max-width: 900px) 50vw, 20vw" /></div>
          <div className={styles.travelBag}><Image src="/assets/product-detail/travel-tote-front.png" alt="Genuine leather travel bag detail" fill sizes="(max-width: 900px) 50vw, 20vw" /></div>
        </div>
      </section>

      <section className={styles.process} id="process" aria-labelledby="process-title">
        <p className={styles.kicker}>How we work together</p>
        <h2 id="process-title">From Inquiry to Delivery</h2>
        <div className={styles.processGrid}>
          {processSteps.map(({ icon: Icon, title, copy }, index) => (
            <article key={title}>
              <span className={styles.processIcon}><Icon size={24} weight="thin" aria-hidden="true" /></span>
              {index < processSteps.length - 1 && <i aria-hidden="true" />}
              <h3>{index + 1}. {title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.quality} id="quality" aria-labelledby="quality-title">
        <div className={styles.qualityCopy}>
          <p className={styles.kicker}>Quality you can rely on</p>
          <h2 id="quality-title">Built-In Quality,<br />Not Just Final Check</h2>
          <ul>
            {qualityPoints.map((point) => <li key={point}><CheckCircle size={18} weight="regular" aria-hidden="true" />{point}</li>)}
          </ul>
        </div>
        <div className={styles.qualityImage}><Image src="/assets/product-detail/leather-production-workshop-v1.png" alt="Leather artisan checking a bag in the Marrant workshop" fill sizes="(max-width: 900px) 100vw, 33vw" /></div>
        <aside className={styles.peopleCard}>
          <h3>People behind<br />the process.</h3>
          <p>Marrant is led by a hands-on team that values clarity, responsibility and long-term partnerships.</p>
          <Image src="/assets/brand/founders.jpg" alt="The Marrant founders" width={250} height={250} sizes="(max-width: 900px) 200px, 17vw" />
        </aside>
      </section>

      <section className={styles.visit} id="visit" aria-labelledby="visit-title">
        <div className={styles.visitIntro}>
          <p className={styles.kicker}>Visit our factory</p>
          <h2 id="visit-title">Plan Your<br />Factory Visit</h2>
          <p>See our production in person, talk with our team and review your products side by side.</p>
          <p>We&apos;ll prepare the right people and information for your visit.</p>
        </div>
        <form className={styles.visitForm} onSubmit={handleSubmit}>
          <label><span>Full Name <b>*</b></span><input required name="name" autoComplete="name" placeholder="Your full name" /></label>
          <label><span>Email <b>*</b></span><input required type="email" name="email" autoComplete="email" placeholder="you@email.com" /></label>
          <label><span>Company</span><input name="company" autoComplete="organization" placeholder="Your company" /></label>
          <label><span>Country / Region</span><input name="region" autoComplete="country-name" placeholder="Your country or region" /></label>
          <label><span>Product Category</span><select name="product" defaultValue=""><option value="" disabled>Select a category</option><option>Leather Tote Bags</option><option>Leather Travel Bags</option><option>Leather Backpacks</option><option>Custom / OEM Project</option></select></label>
          <label><span>Preferred Visit Date</span><input type="date" name="visitDate" /></label>
          <label className={styles.message}><span>Message</span><textarea name="message" rows={3} placeholder="Tell us what you would like to discuss during your visit." /></label>
          <button type="submit">Submit Visit Request <ArrowRight size={17} /></button>
          {submitted && <p className={styles.success} role="status">Thank you. Our team will contact you shortly to arrange your visit.</p>}
        </form>
        <div className={styles.quoteCard}>
          <p className={styles.kicker}>Start a project</p>
          <h2>Request a Quote</h2>
          <p>Share your product details and we&apos;ll get back with a solution that fits your needs.</p>
          <Link className={styles.outlineButton} href="/contact#inquiry">Request a Quote <ArrowRight size={17} /></Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <Image src="/assets/brand/marrant-logo.png" alt="Marrant" width={148} height={36} />
            <p>Genuine leather bags. Made for your brand.</p>
            <a href="mailto:Melody@marrant.cn">Melody@marrant.cn</a>
            <a href="https://wa.me/8618925073489" target="_blank" rel="noreferrer">+86 189 2507 3489</a>
          </div>
          <div><h3>Products</h3><Link href="/products">Crazy Horse Leather</Link><Link href="/products">Travel Tote Bags</Link><Link href="/products">Men&apos;s Wallets</Link><Link href="/products">Shoulder Bags</Link></div>
          <div><h3>OEM/ODM</h3><Link href="/#oem">Our Services</Link><a href="#process">Process</a><a href="#production">Materials</a><Link href="/contact#inquiry">Private Label</Link></div>
          <div><h3>Resources</h3><Link href="/blog">Materials Guide</Link><Link href="/blog">Care Guide</Link><Link href="/blog">FAQ</Link></div>
          <div><h3>About Us</h3><a href="#production">Our Factory</a><a href="#quality">Why Marrant</a><Link href="/contact">Contact Us</Link></div>
        </div>
        <div className={styles.footerBottom}><span>© 2026 Marrant Leather Co., Ltd. All rights reserved.</span><span>Privacy Policy &nbsp;|&nbsp; Terms of Use</span></div>
      </footer>
    </main>
  );
}
