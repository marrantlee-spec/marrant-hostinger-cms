"use client";

import Image from "next/image";
import Link from "next/link";
import InternalLinkPanel from "../components/InternalLinkPanel";
import { productCategoriesFor } from "../components/product-taxonomy";
import { useInquirySubmission } from "../components/useInquirySubmission";
import { ArrowRight, ChatCircleDots, CheckCircle, ClipboardText, Factory, Package, PencilSimple, ShieldCheck, Swatches } from "@phosphor-icons/react";
import styles from "./page.module.css";

const productCategories = productCategoriesFor("en");

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
  const { handleSubmit, isSubmitting, status } = useInquirySubmission("en");

  return (
    <main className={styles.page}>

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
          <Image src="/assets/brand/team-group.jpg" alt="The Marrant team" width={2000} height={969} sizes="(max-width: 560px) calc(100vw - 40px), (max-width: 900px) calc(100vw - 68px), 25vw" />
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
          <label><span>Product Category</span><select name="product" defaultValue=""><option value="" disabled>Select a category</option>{productCategories.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}<option value="custom-oem">Custom / OEM Project</option></select></label>
          <label><span>Preferred Visit Date</span><input type="date" name="visitDate" /></label>
          <label className={styles.message}><span>Message</span><textarea name="message" rows={3} placeholder="Tell us what you would like to discuss during your visit." /></label>
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Submit Visit Request"} <ArrowRight size={17} /></button>
          {status ? <p className={styles.success} role="status" data-tone={status.tone}>{status.message}</p> : null}
        </form>
        <div className={styles.quoteCard}>
          <p className={styles.kicker}>Start a project</p>
          <h2>Request a Quote</h2>
          <p>Share your product details and we&apos;ll get back with a solution that fits your needs.</p>
          <Link className={styles.outlineButton} href="/contact#inquiry">Request a Quote <ArrowRight size={17} /></Link>
        </div>
      </section>

      <InternalLinkPanel
        title="Evaluate the right partner"
        description="Follow the links that connect manufacturing capability, product detail and a practical sourcing process."
        links={[
          { href: "/products/crazy-horse-leather-travel-tote-bag", label: "Inspect a product example", description: "See customizable leather, hardware and construction details." },
          { href: "/products", label: "Browse collections", description: "Start with the bag category that fits your market." },
          { href: "/blog/how-to-source-crazy-horse-leather-travel-tote-bag", label: "Read the buyer guide", description: "Prepare a stronger sourcing brief before your inquiry." },
          { href: "/contact#inquiry", label: "Talk with our team", description: "Request a quote or arrange a factory visit." },
        ]}
      />
    </main>
  );
}
