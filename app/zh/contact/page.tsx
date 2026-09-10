import { chineseMetadata } from "../metadata";
import Image from "next/image";
import Link from "next/link";
import InternalLinkPanel from "../components/InternalLinkPanel";
import ContactInquiryForm from "./ContactInquiryForm";
import { ArrowUpRightIcon, FactoryIcon, MailIcon, MapPinIcon, WhatsappIcon } from "../../contact/ContactIcons";
import styles from "../../contact/page.module.css";

export const metadata = chineseMetadata("/contact");

const address = "广州市白云区西槎路同粤商贸大厦 505-517 室";
const mapQuery = encodeURIComponent(address);
const googleDirections = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/zh" className={styles.brand} aria-label="玛轮特皮具首页">
          <Image src="/assets/brand/marrant-logo.png" alt="玛轮特真皮包" width={170} height={43} priority />
        </Link>
        <nav className={styles.nav} aria-label="主导航">
          <Link href="/zh/about">关于我们</Link>
          <Link href="/zh/#oem">OEM / ODM 定制服务</Link>
          <Link href="/zh/products">产品系列</Link>
          <Link href="/zh/products/crazy-horse-leather-travel-tote-bag#customization">材料选配</Link>
          <Link href="/zh/about#process">制造能力</Link>
          <Link className={styles.activeNav} href="/zh/contact">联系我们</Link>
        </nav>
        <a className={styles.headerCta} href="#inquiry">获取定制报价</a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>联系我们</p>
          <span className={styles.shortRule} />
          <h1>欢迎到访<br />广州玛轮特皮具</h1>
          <p className={styles.lead}>欢迎采购商与品牌伙伴到访广州玛轮特皮具，与团队面对面沟通，查看皮料、五金与产品样品，探讨真皮包供应及 OEM / ODM 定制方案。</p>
          <div className={styles.contactMethods}>
            <a href="mailto:Melody@marrant.cn">
              <span><MailIcon width={24} height={24} /></span>
              <p><small>电子邮件</small>Melody@marrant.cn</p>
            </a>
            <a href="https://wa.me/8618925073489" target="_blank" rel="noreferrer">
              <span><WhatsappIcon width={24} height={24} /></span>
              <p><small>WhatsApp</small>+86 189 2507 3489</p>
            </a>
          </div>
        </div>
        <div className={styles.heroImage}>
          <Image src="/assets/product-detail/travel-tote-front.png" alt="玛轮特真皮旅行托特包" fill sizes="(max-width: 860px) 100vw, 53vw" priority />
          <div className={styles.imageCaption}><span>从广州制造，服务全球采购</span><b>OEM / ODM 真皮包定制</b></div>
        </div>
      </section>

      <section className={styles.locationSection} aria-labelledby="location-heading">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>广州接待地址</p>
          <h2 id="location-heading">从这里开启实地交流。</h2>
          <p>我们位于广州市白云区，依托广州皮具产业配套，为品牌与采购商提供样品展示、材料选配与项目沟通服务。</p>
        </div>
        <div className={styles.mapFrame}>
          <a className={styles.mapLink} href={googleDirections} target="_blank" rel="noreferrer" aria-label="在谷歌地图中查看玛轮特广州办公地址">
            <span className={styles.mapVisual} style={{ position: "relative", display: "block", width: "100%", height: "100%" }}><Image src="/assets/brand/guangzhou-baiyun-map.png" alt="广州市白云区玛轮特办公区域位置示意图" fill sizes="(max-width: 820px) calc(100vw - 40px), 1260px" /></span>
          </a>
          <div className={styles.mapOverlay}><span>广州 · 白云区</span><span className={styles.mapDot} /> <span>到访请提前预约</span></div>
        </div>
        <div className={styles.addressBar}>
          <div><MapPinIcon width={28} height={28} /><p><small>接待地址</small>{address}</p></div>
          <a href={googleDirections} target="_blank" rel="noreferrer">查看路线 <ArrowUpRightIcon width={17} height={17} /></a>
        </div>
      </section>

      <section className={styles.visitSection}>
        <div className={styles.visitIntro}>
          <p className={styles.eyebrow}>到访准备</p>
          <span />
          <p>围绕您的产品线与采购目标，安排有针对性的交流。</p>
        </div>
        <ol className={styles.steps}>
          <li><b>1</b><div><h3>预约沟通时间</h3><p>请提前联系我们，便于安排接待与样品准备。</p></div></li>
          <li><b>2</b><div><h3>提供项目需求</h3><p>提前说明品牌定位、产品品类与定制要求。</p></div></li>
          <li><b>3</b><div><h3>实地参观交流</h3><p>参观展厅、查看样品，与团队讨论项目细节。</p></div></li>
        </ol>
      </section>

      <section className={styles.inquirySection} id="inquiry" aria-labelledby="inquiry-heading">
        <div className={styles.inquiryIntro}>
          <p className={styles.eyebrow}>开始您的定制项目</p>
          <h2 id="inquiry-heading">提交采购与定制需求</h2>
          <p>请填写项目需求，我们通常会在一个工作日内回复。</p>
          <div className={styles.sketchWrap}>
            <Image src="/assets/product-detail/leather-production-workshop-v1.png" alt="真皮包生产车间" fill sizes="(max-width: 760px) 100vw, 28vw" />
          </div>
        </div>
        <div className={styles.formCard}><ContactInquiryForm /></div>
      </section>

      <aside className={styles.assurance}>
        <div><FactoryIcon width={39} height={39} /><p><strong>用心制造，为品牌提供专业真皮包供应支持。</strong><span>从需求到交付，重视材料品质、生产责任与清晰沟通。</span></p></div>
        <a href="mailto:Melody@marrant.cn"><MailIcon width={22} height={22} /> Melody@marrant.cn</a>
        <a href="https://wa.me/8618925073489" target="_blank" rel="noreferrer"><WhatsappIcon width={22} height={22} /> +86 189 2507 3489</a>
      </aside>

      <InternalLinkPanel
        title="为采购咨询做好准备"
        description="了解相关产品、采购要点与工厂信息，让定制需求更加明确。"
        links={[
          { href: "/zh/products", label: "浏览真皮包系列", description: "选择计划开发的产品品类。" },
          { href: "/zh/products/crazy-horse-leather-travel-tote-bag", label: "了解产品定制要点", description: "了解托特包定制需要确认的事项与选项。" },
          { href: "/zh/blog/how-to-source-crazy-horse-leather-travel-tote-bag", label: "查看采购指南", description: "明确需要确认的材料与结构细节。" },
          { href: "/zh/about#visit", label: "预约工厂参观", description: "面对面沟通，与团队评估项目方案。" },
        ]}
      />

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <Image src="/assets/brand/marrant-logo.png" alt="玛轮特真皮包" width={150} height={38} />
            <p>广州真皮包厂家，提供 OEM 皮具定制与 ODM 皮具制造，服务品牌与专业采购商。</p>
          </div>
          <div><h3>公司</h3><Link href="/zh/about">关于我们</Link><Link href="/zh/contact">广州展厅</Link><Link href="/zh/about#quality">选择玛轮特</Link></div>
          <div><h3>定制服务</h3><Link href="/zh/#oem">OEM / ODM 定制服务</Link><Link href="/zh/about#process">设计与开发</Link><Link href="/zh/products/crazy-horse-leather-travel-tote-bag#customization">材料选配</Link></div>
          <div><h3>产品系列</h3><Link href="/zh/products">真皮包</Link><Link href="/zh/products/crazy-horse-leather-travel-tote-bag">旅行包</Link><Link href="/zh/products">商务包</Link></div>
          <div className={styles.footerContact}><h3>联系我们</h3><span><MapPinIcon width={15} height={15} />{address}</span><a href="mailto:Melody@marrant.cn"><MailIcon width={15} height={15} />Melody@marrant.cn</a><a href="https://wa.me/8618925073489" target="_blank" rel="noreferrer"><WhatsappIcon width={15} height={15} />+86 189 2507 3489</a></div>
        </div>
        <div className={styles.footerBottom}><span>© 2026 玛轮特皮具 版权所有。</span><span>隐私政策&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;使用条款</span></div>
      </footer>
    </main>
  );
}
