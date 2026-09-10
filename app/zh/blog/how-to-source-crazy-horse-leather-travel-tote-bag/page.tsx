import { chineseMetadata } from "../../metadata";
import Image from "next/image";
import Link from "next/link";
import InternalLinkPanel from "../../components/InternalLinkPanel";
import BlogInquiryForm from "./BlogInquiryForm";
import { ArrowRightIcon, CheckCircleIcon, GlobeIcon, PackageIcon, PencilIcon, ShieldIcon } from "../../../blog/how-to-source-crazy-horse-leather-travel-tote-bag/BlogIcons";
import styles from "../../../blog/how-to-source-crazy-horse-leather-travel-tote-bag/page.module.css";

export const metadata = chineseMetadata(
  "/blog/how-to-source-crazy-horse-leather-travel-tote-bag",
  "疯马皮真皮旅行包采购指南 | 玛轮特皮具",
  "面向品牌与专业采购商的疯马皮真皮旅行托特包定制指南，涵盖材料、工艺与广州皮具工厂合作流程。",
);

const articleSections = [
  ["why-crazy-horse", "为什么选择疯马皮？"],
  ["key-considerations", "采购前需要明确哪些要求？"],
  ["materials-quality", "材料与品质标准"],
  ["design-construction", "设计与结构要点"],
  ["customization", "产品定制选项"],
  ["comparison", "供应商评估要点"],
  ["process", "OEM / ODM 合作流程"],
];

const comparisonRows = [
  ["皮料品质", "根据封样确认皮料等级", "核实皮层与表面处理", "检查纹理与色泽一致性"],
  ["定制选项", "评估 OEM / ODM 定制方案", "核实可定制范围", "核实可定制范围"],
  ["MOQ", "根据材料与工艺确认", "核实单款起订量", "核实颜色与款式限制"],
  ["生产交期", "按项目评估确认", "核实排期与材料周期", "按项目评估确认"],
  ["品质管控", "明确关键工序检查要求", "核实检验节点", "核实标准与检验记录"],
  ["售后支持", "沟通问题处理流程", "待具体评估", "待具体评估"],
];

const process = [
  { icon: PencilIcon, title: "需求咨询", text: "提供构想、采购要求与目标市场。" },
  { icon: CheckCircleIcon, title: "设计与打样", text: "开发设计方案与样品，供品牌确认。" },
  { icon: ShieldIcon, title: "材料与量产评估", text: "确认皮料、五金与结构工艺。" },
  { icon: PackageIcon, title: "批量生产", text: "按工艺要求生产，并实施过程检查。" },
  { icon: GlobeIcon, title: "检验与交付", text: "成品检验、包装与订单发运。" },
];

export default function CrazyHorseSourcingGuidePage() {
  return (
    <main className={styles.page}>

      <div className={styles.articleShell}>
        <section className={styles.articleHeading}>
          <nav className={styles.breadcrumbs} aria-label="面包屑导航">
            <Link href="/zh">首页</Link><span>›</span><Link href="/zh/blog">博客</Link><span>›</span><span>真皮包采购指南</span>
          </nav>
          <h1>如何为品牌采购<br />疯马皮真皮旅行<br />托特包</h1>
          <div className={styles.byline}><span>作者：玛轮特皮具团队</span><i /><span>2026年5月14日</span><i /><span>阅读约8分钟</span></div>
        </section>

        <aside className={styles.tableOfContents} aria-label="文章目录">
          <p>文章目录</p>
          <ol>
            {articleSections.map(([id, label], index) => <li key={id}><a href={`#${id}`} className={index === 0 ? styles.activeTocLink : undefined}>{label}</a></li>)}
          </ol>
        </aside>

        <article className={styles.article}>
          <div className={styles.heroImage}>
            <Image src="/assets/product-detail/travel-tote-front.png" alt="干邑棕色疯马皮真皮旅行托特包" fill priority sizes="(max-width: 860px) 100vw, 650px" />
          </div>
          <p className={styles.lead}>疯马皮以丰富的变色效果、复古质感与耐用性受到旅行包采购商关注。对品牌与零售商而言，采购托特包需要同时评估皮料、结构与制造能力，寻找理解产品标准、能够配合开发并管控批次品质的真皮包供应商。</p>
          <p>以下从材料、结构与工厂合作流程出发，梳理疯马皮真皮包采购的关键步骤。</p>

          <section id="why-crazy-horse">
            <h2>为什么选择疯马皮？</h2>
            <p>疯马皮通常采用油蜡处理的牛皮，受力或弯折时呈现自然色差，使用中逐渐形成独特痕迹。采购时应核实皮层、厚度、油蜡处理与色牢度；耐水性能须以具体材料测试为准。您可以查看我们的 <Link href="/zh/products/crazy-horse-leather-travel-tote-bag#customization">疯马皮旅行托特包定制实例</Link>.</p>
            <div className={styles.detailImage}>
              <Image src="/assets/product-detail/crazy-horse-leather-detail.png" alt="疯马皮与黄铜五金局部细节" fill sizes="(max-width: 860px) 100vw, 650px" />
            </div>
            <blockquote>合适的真皮托特包，需要兼顾皮料的使用表现、结构的耐用性，以及制造伙伴对产品要求的理解。<cite>—— 玛轮特皮具团队</cite></blockquote>
          </section>

          <section id="key-considerations">
            <h2>采购前需要明确哪些要求？</h2>
            <p>首先明确目标市场、价格定位与必备功能，再确认包体尺寸、内部隔层、五金表面处理和品牌标识。前期形成清晰规格，有助于减少反复修改，提高报价与打样效率。</p>
          </section>

          <section id="materials-quality" className={styles.materialNote}>
            <h2>材料与品质标准</h2>
            <div className={styles.noteGrid}>
              <div><strong>皮料选择</strong><span>选择疯马皮时，应确认皮层、手感、自然纹理与颜色变化，并通过实物样品统一验收标准。</span></div>
              <div><strong>五金表面处理</strong><span>实心黄铜或仿古黄铜色五金可呈现复古质感；基材、重量、镀层与耐用性需分别确认。</span></div>
              <div><strong>受力部位加固</strong><span>提手根部、肩带连接点与高受力缝位需评估补强材料和针距，兼顾牢度与皮料特性。</span></div>
            </div>
          </section>

          <section id="design-construction">
            <h2>设计与结构要点</h2>
            <p>围绕实际出行场景规划容量、背负舒适性、开合安全与取物便利。旅行托特包应兼顾外观与功能，并重点检查提手、肩带、包底及拉链等受力部位的结构。</p>
          </section>

          <section id="customization">
            <h2>产品定制选项</h2>
            <p>通过适合品牌定位的实用细节，将材料选择转化为有辨识度的产品系列。</p>
            <div className={styles.customizationGrid}>
              <div><strong>品牌标识工艺</strong><span>可评估凹印、凸印、激光雕刻或烫印。</span></div>
              <div><strong>五金</strong><span>可评估仿古黄铜色、枪色、镍色或定制刻字五金。</span></div>
              <div><strong>内部收纳结构</strong><span>可配置电脑保护层、拉链袋或定制收纳隔层。</span></div>
              <div><strong>包装</strong><span>可选防尘袋、养护卡、品牌外箱与内部防护。</span></div>
            </div>
          </section>

          <section id="comparison">
            <h2>供应商评估要点</h2>
            <p>不同真皮包厂家在材料配套、定制范围与订单管理方面存在差异。可按下表逐项核实，以书面资料和确认样品评估制造伙伴。</p>
            <div className={styles.tableWrap}>
              <table>
                <thead><tr><th>评估项目</th><th>玛轮特沟通重点</th><th>供应商核实项一</th><th>供应商核实项二</th></tr></thead>
                <tbody>{comparisonRows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={index === 1 ? styles.recommended : undefined}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <p>与有经验的皮具工厂合作时，仍需明确外观、使用性能与目标市场适用要求，并根据项目需要约定检验和测试事项。</p>
          </section>

          <section id="process" className={styles.processSection}>
            <h2>OEM / ODM 合作流程</h2>
            <div className={styles.processGrid}>
              {process.map(({ icon: Icon, title, text }, index) => <div key={title} className={styles.processStep}><span>{String(index + 1).padStart(2, "0")}</span><Icon width={29} height={29} /><strong>{title}</strong><small>{text}</small></div>)}
            </div>
            <p className={styles.processLink}>希望进一步了解生产团队？ <Link href="/zh/about#process">查看玛轮特从需求沟通到交付的合作流程</Link>.</p>
          </section>

          <section className={styles.relatedProduct}>
            <div className={styles.relatedImage}><Image src="/assets/products/crazy-horse-duffle.png" alt="疯马皮周末旅行包" fill sizes="230px" /></div>
            <div><p>相关产品</p><h2>疯马皮系列<br />周末旅行包</h2><span>复古质感，实用收纳，为出行打造。</span><Link href="/zh/products/crazy-horse-leather-travel-tote-bag">查看产品 <ArrowRightIcon width={16} height={16} /></Link></div>
          </section>
        </article>

        <aside className={styles.inquiryRail} id="inquiry"><BlogInquiryForm /></aside>
      </div>

      <InternalLinkPanel
        title="继续完善采购需求"
        description="结合产品、系列与工厂页面的信息，将采购研究转化为具体的制造沟通。"
        links={[
          { href: "/zh/products/crazy-horse-leather-travel-tote-bag", label: "查看旅行托特包", description: "查看定制选项、产品规格与采购咨询入口。" },
          { href: "/zh/products", label: "浏览全部产品", description: "探索其他真皮包品类。" },
          { href: "/zh/about#production", label: "了解工厂", description: "了解生产现场与品质管理流程。" },
          { href: "/zh/contact#inquiry", label: "开始采购咨询", description: "直接向玛轮特团队提交需求。" },
        ]}
      />
    </main>
  );
}
