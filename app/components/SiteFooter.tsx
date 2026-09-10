import Link from "next/link";
import { localizedPath, type SiteLocale } from "./site-navigation";

export default function SiteFooter({ locale }: { locale: SiteLocale }) {
  const chinese = locale === "zh-CN";
  const text = (en: string, zh: string) => chinese ? zh : en;
  const path = (value: string) => localizedPath(locale, value);
  const home = path("/");
  const product = path("/products/crazy-horse-leather-travel-tote-bag");
  const guide = path("/blog/how-to-source-crazy-horse-leather-travel-tote-bag");
  const columns = [
    { title: text("Products", "产品系列"), links: [
      { href: product, label: text("Crazy Horse Leather", "疯马皮系列") },
      { href: path("/products"), label: text("Travel Tote Bags", "旅行托特包") },
      { href: path("/products"), label: text("Men's Wallets", "男士钱包") },
      { href: path("/products"), label: text("Backpacks", "真皮背包") },
      { href: path("/products"), label: text("Women's Bags", "女士真皮包") },
    ] },
    { title: "OEM/ODM", links: [
      { href: `${home}#oem`, label: text("Our Services", "定制服务") },
      { href: `${home}#process`, label: text("Process", "合作流程") },
      { href: path("/about#production"), label: text("Materials", "材料选配") },
      { href: path("/contact#inquiry"), label: text("Private Label", "品牌贴牌") },
    ] },
    { title: text("Resources", "采购指南"), links: [
      { href: guide, label: text("Buying Guide", "采购指南") },
      { href: path("/blog"), label: text("Care Guide", "养护指南") },
      { href: `${home}#resources`, label: text("FAQs", "常见问题") },
    ] },
    { title: text("About Us", "关于我们"), links: [
      { href: path("/about#production"), label: text("Our Factory", "工厂介绍") },
      { href: path("/about#quality"), label: text("Why Marrant", "选择玛轮特") },
      { href: path("/contact"), label: text("Contact Us", "联系我们") },
    ] },
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href={home} aria-label={text("Marrant home", "玛轮特皮具首页")}><img src="/assets/brand/marrant-logo.png" alt="Marrant" /></Link>
          <p>{text("Genuine leather bags. Made for your brand.", "专业真皮包厂家，为您的品牌定制。")}</p>
          <a href="mailto:Melody@marrant.cn">Melody@marrant.cn</a>
          <a href="https://wa.me/8618925073489" target="_blank" rel="noreferrer">+86 189 2507 3489</a>
        </div>
        {columns.map((column) => <div key={column.title}><h3>{column.title}</h3>{column.links.map((link) => <Link href={link.href} key={link.label}>{link.label}</Link>)}</div>)}
      </div>
    </footer>
  );
}
