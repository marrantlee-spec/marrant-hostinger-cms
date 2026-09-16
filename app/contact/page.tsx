import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InternalLinkPanel from "../components/InternalLinkPanel";
import { contactEmail, contactEmailHref } from "../components/contact-details";
import ContactInquiryForm from "./ContactInquiryForm";
import { ArrowUpRightIcon, FactoryIcon, MailIcon, MapPinIcon, WhatsappIcon } from "./ContactIcons";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact Marrant | Visit Our Guangzhou Studio",
  description: "Visit Marrant in Guangzhou or start an OEM / ODM leather bag project with our team."
};

const address = "广州市白云区西槎路同粤商贸大厦 505-517 室";
const mapQuery = encodeURIComponent(address);
const googleDirections = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

export default function ContactPage() {
  return (
    <main className={styles.page}>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Contact us</p>
          <span className={styles.shortRule} />
          <h1>Visit Our<br />Guangzhou Studio</h1>
          <p className={styles.lead}>We welcome international buyers and brand partners to visit our studio in Guangzhou. Meet our team, explore materials, and start your next collection with confidence.</p>
          <div className={styles.contactMethods}>
            <a href={contactEmailHref}>
              <span><MailIcon width={24} height={24} /></span>
              <p><small>Email us</small>{contactEmail}</p>
            </a>
            <a href="https://wa.me/8618925073489" target="_blank" rel="noreferrer">
              <span><WhatsappIcon width={24} height={24} /></span>
              <p><small>WhatsApp</small>+86 189 2507 3489</p>
            </a>
          </div>
        </div>
        <div className={styles.heroImage}>
          <Image src="/assets/product-detail/travel-tote-front.png" alt="Marrant leather travel tote bag" fill sizes="(max-width: 860px) 100vw, 53vw" priority />
          <div className={styles.imageCaption}><span>From workshop to worldwide</span><b>OEM / ODM leather bags</b></div>
        </div>
      </section>

      <section className={styles.locationSection} aria-labelledby="location-heading">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Find us in Guangzhou</p>
          <h2 id="location-heading">Your visit starts here.</h2>
          <p>Our studio is in Baiyun District, close to the city&apos;s leather-goods supply network and ready to welcome your next project conversation.</p>
        </div>
        <div className={styles.mapFrame}>
          <a className={styles.mapLink} href={googleDirections} target="_blank" rel="noreferrer" aria-label="Open Marrant Guangzhou office location in Google Maps">
            <span className={styles.mapVisual} style={{ position: "relative", display: "block", width: "100%", height: "100%" }}><Image src="/assets/brand/guangzhou-baiyun-map.png" alt="Stylized map of Baiyun District, Guangzhou, marking the Marrant studio area" fill sizes="(max-width: 820px) calc(100vw - 40px), 1260px" /></span>
          </a>
          <div className={styles.mapOverlay}><span>Guangzhou · Baiyun District</span><span className={styles.mapDot} /> <span>Studio visit by appointment</span></div>
        </div>
        <div className={styles.addressBar}>
          <div><MapPinIcon width={28} height={28} /><p><small>Studio address</small>{address}</p></div>
          <a href={googleDirections} target="_blank" rel="noreferrer">Open directions <ArrowUpRightIcon width={17} height={17} /></a>
        </div>
      </section>

      <section className={styles.visitSection}>
        <div className={styles.visitIntro}>
          <p className={styles.eyebrow}>Before you visit</p>
          <span />
          <p>We keep each visit focused, useful, and tailored to your collection.</p>
        </div>
        <ol className={styles.steps}>
          <li><b>1</b><div><h3>Schedule a Meeting</h3><p>Contact us in advance so we can prepare for your visit.</p></div></li>
          <li><b>2</b><div><h3>Share Your Brief</h3><p>Tell us about your brand and product needs ahead of time.</p></div></li>
          <li><b>3</b><div><h3>Visit &amp; Explore</h3><p>Tour our studio, review samples, and discuss your project.</p></div></li>
        </ol>
      </section>

      <section className={styles.inquirySection} id="inquiry" aria-labelledby="inquiry-heading">
        <div className={styles.inquiryIntro}>
          <p className={styles.eyebrow}>Start your project</p>
          <h2 id="inquiry-heading">Start Your Inquiry</h2>
          <p>Tell us about your project and we&apos;ll get back to you within 1 business day.</p>
          <div className={styles.sketchWrap}>
            <Image src="/assets/product-detail/leather-production-workshop-v1.png" alt="Leather production workshop" fill sizes="(max-width: 760px) 100vw, 28vw" />
          </div>
        </div>
        <div className={styles.formCard}><ContactInquiryForm /></div>
      </section>

      <aside className={styles.assurance}>
        <div><FactoryIcon width={39} height={39} /><p><strong>Manufactured with Care. Trusted by Brands Worldwide.</strong><span>Quality materials, responsible production, and clear communication from concept to delivery.</span></p></div>
        <a href={contactEmailHref}><MailIcon width={22} height={22} /> {contactEmail}</a>
        <a href="https://wa.me/8618925073489" target="_blank" rel="noreferrer"><WhatsappIcon width={22} height={22} /> +86 189 2507 3489</a>
      </aside>

      <InternalLinkPanel
        title="Prepare your inquiry"
        description="Give your project a stronger starting point by reviewing the product, sourcing and factory details most relevant to your brief."
        links={[
          { href: "/products", label: "Browse bag collections", description: "Choose the product category you want to develop." },
          { href: "/products/crazy-horse-leather-travel-tote-bag", label: "Review a product brief", description: "See the questions and options behind a custom tote." },
          { href: "/blog/how-to-source-crazy-horse-leather-travel-tote-bag", label: "Use the sourcing guide", description: "Learn which material and construction details to define." },
          { href: "/about#visit", label: "Plan a factory visit", description: "Meet the team and review your project in person." },
        ]}
      />
    </main>
  );
}
