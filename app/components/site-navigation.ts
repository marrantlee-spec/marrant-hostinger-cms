import { productCategoriesFor } from "./product-taxonomy";

export type SiteLocale = 'en' | 'zh-CN';

export type MegaMenuKey = "products" | "services";

type MegaMenu = {
  eyebrow: string;
  title: string;
  copy: string;
  links?: { label: string; description: string; href: string }[];
  groups?: {
    label: string;
    english: string;
    href: string;
    items: { label: string; href: string }[];
    feature: { label: string; title: string; image: string; href: string; alt: string };
  }[];
  feature: { label: string; title: string; image: string; href: string; alt?: string };
};

const englishMenus: Record<MegaMenuKey, MegaMenu> = {
  products: {
    eyebrow: "PRODUCT RANGE",
    title: "Crazy Horse leather, organized by product type.",
    copy: "Find the right category for your wholesale or private-label collection.",
    groups: productCategoriesFor("en"),
    feature: { label: "FEATURED COLLECTION", title: "Crazy Horse Leather", image: "/assets/products/crazy-horse-duffle.png", href: "/products/crazy-horse-leather-travel-tote-bag" }
  },
  services: {
    eyebrow: "OEM / ODM",
    title: "Your vision, shaped by our craft.",
    copy: "A clear, flexible path from product idea to finished collection.",
    links: [
      { label: "Product Development", description: "Sketches, sampling and refinement", href: "/#oem" },
      { label: "Materials & Customization", description: "Leather, hardware and finishing details", href: "/#oem" },
      { label: "Flexible Manufacturing", description: "Support for evolving order requirements", href: "/#oem" },
      { label: "Private Label", description: "Built around your brand identity", href: "/#oem" }
    ],
    feature: { label: "OEM / ODM SERVICE", title: "Make it distinctly yours.", image: "/assets/products/leather-messenger.png", href: "/#quote" }
  }
};

const chineseMenus: Record<MegaMenuKey, MegaMenu> = {
  products: {
    eyebrow: "真皮包产品系列",
    title: "按产品类型探索疯马皮系列。",
    copy: "清晰的产品结构，帮助采购商更快找到目标品类。",
    groups: productCategoriesFor("zh-CN"),
    feature: { label: "推荐系列", title: "疯马皮系列", image: "/assets/products/crazy-horse-duffle.png", href: "/zh/products/crazy-horse-leather-travel-tote-bag" }
  },
  services: {
    eyebrow: "OEM / ODM",
    title: "您的产品构想，我们的制造经验。",
    copy: "从产品构思到成品交付，提供清晰、灵活的 OEM 皮具定制与 ODM 皮具制造支持。",
    links: [
      { label: "产品开发", description: "设计评估、样品开发与工艺优化", href: "/zh#oem" },
      { label: "材料选配与定制", description: "皮料、五金与表面处理选配", href: "/zh#oem" },
      { label: "灵活生产", description: "匹配不同阶段的订单需求", href: "/zh#oem" },
      { label: "品牌贴牌", description: "围绕品牌定位定制产品细节", href: "/zh#oem" }
    ],
    feature: { label: "OEM / ODM 定制服务", title: "打造具有品牌辨识度的皮具产品。", image: "/assets/products/leather-messenger.png", href: "/zh#quote" }
  }
};

export function navigationFor(locale: SiteLocale) {
 const chinese = locale === 'zh-CN';
 return {
  home: chinese ? '/zh' : '/',
  homeText: chinese ? '首页' : 'Home',
  products: chinese ? '产品系列' : 'Products',
  factory: chinese ? '工厂实力' : 'Factory',
  blog: chinese ? '博客' : 'Blog',
  about: chinese ? '关于我们' : 'About Us',
  contact: chinese ? '联系我们' : 'Contact Us',
  quote: chinese ? '获取定制报价' : 'Request a Quote',
  homeLabel: chinese ? '玛轮特皮具首页' : 'Marrant home',
  navigationLabel: chinese ? '主导航' : 'Main navigation',
  toggleLabel: chinese ? '展开或收起菜单' : 'Toggle menu',
  closeLabel: chinese ? '关闭导航菜单' : 'Close navigation menu',
  menus: chinese ? chineseMenus : englishMenus,
 };
}

export function localizedPath(locale: SiteLocale, path: string) {
 return locale === 'zh-CN' ? '/zh' + (path === '/' ? '' : path) : path;
}
