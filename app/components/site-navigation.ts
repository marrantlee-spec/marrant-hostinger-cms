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
    groups: [
      {
        label: "Bags", english: "BAGS", href: "/products",
        items: ["Backpacks", "Briefcases", "Crossbody Bags", "Chest & Waist Bags", "Tote Bags", "Travel Bags", "Clutches"].map((label) => ({ label, href: "/products#products-index" })),
        feature: { label: "FEATURED CATEGORY", title: "Crazy Horse Bags", image: "/assets/navigation/crazy-horse-bags-v1.webp", href: "/products", alt: "Crazy Horse leather backpack, briefcase and travel bag" },
      },
      {
        label: "Wallets & Small Leather Goods", english: "SMALL LEATHER GOODS", href: "/products",
        items: [
          { label: "Wallets", href: "/products/mens-full-grain-leather-bifold-wallet-8064" },
          { label: "Card Holders", href: "/products#products-index" },
          { label: "Passport Holders", href: "/products/wholesale-leather-airtag-passport-holder-wallet" },
          { label: "Coin Purses", href: "/products#products-index" },
          { label: "Key Cases", href: "/products#products-index" },
          { label: "Phone Pouches", href: "/products#products-index" },
        ],
        feature: { label: "FEATURED CATEGORY", title: "Wallets & Small Goods", image: "/assets/navigation/crazy-horse-small-goods-v1.webp", href: "/products/mens-full-grain-leather-bifold-wallet-8064", alt: "Crazy Horse leather wallet, card holder, passport holder and coin purse" },
      },
      {
        label: "Desk & Lifestyle", english: "DESK & LIFESTYLE", href: "/products",
        items: ["Mouse Pads", "Coasters", "Pen Cases", "Keychains"].map((label) => ({ label, href: "/products#products-index" })),
        feature: { label: "FEATURED CATEGORY", title: "Desk & Lifestyle", image: "/assets/navigation/crazy-horse-desk-v1.webp", href: "/products", alt: "Crazy Horse leather desk mat, coasters, pen case and keychain" },
      },
      {
        label: "Cases & Gifts", english: "CASES & GIFTS", href: "/products",
        items: ["Watch Boxes", "Cigar Cases", "Gift Sets"].map((label) => ({ label, href: "/products#products-index" })),
        feature: { label: "FEATURED CATEGORY", title: "Cases & Gifts", image: "/assets/navigation/crazy-horse-gifts-v1.webp", href: "/products", alt: "Crazy Horse leather watch box, cigar case and gift set" },
      },
    ],
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
    groups: [
      {
        label: "包袋", english: "BAGS", href: "/zh/products",
        items: ["背包", "商务公文包", "斜挎包", "胸包与腰包", "托特包", "旅行包", "手拿包"].map((label) => ({ label, href: "/zh/products#products-index" })),
        feature: { label: "推荐品类", title: "疯马皮包袋", image: "/assets/navigation/crazy-horse-bags-v1.webp", href: "/zh/products", alt: "疯马皮背包、公文包与旅行包" },
      },
      {
        label: "钱包与小皮具", english: "SMALL LEATHER GOODS", href: "/zh/products",
        items: [
          { label: "钱包", href: "/zh/products/mens-full-grain-leather-bifold-wallet-8064" },
          { label: "卡包", href: "/zh/products#products-index" },
          { label: "护照夹", href: "/zh/products/wholesale-leather-airtag-passport-holder-wallet" },
          { label: "零钱包", href: "/zh/products#products-index" },
          { label: "钥匙包", href: "/zh/products#products-index" },
          { label: "手机包", href: "/zh/products#products-index" },
        ],
        feature: { label: "推荐品类", title: "钱包与小皮具", image: "/assets/navigation/crazy-horse-small-goods-v1.webp", href: "/zh/products/mens-full-grain-leather-bifold-wallet-8064", alt: "疯马皮钱包、卡包、护照夹与零钱包" },
      },
      {
        label: "桌面与生活用品", english: "DESK & LIFESTYLE", href: "/zh/products",
        items: ["鼠标垫", "杯垫", "笔袋", "钥匙扣"].map((label) => ({ label, href: "/zh/products#products-index" })),
        feature: { label: "推荐品类", title: "桌面与生活用品", image: "/assets/navigation/crazy-horse-desk-v1.webp", href: "/zh/products", alt: "疯马皮鼠标垫、杯垫、笔袋与钥匙扣" },
      },
      {
        label: "收纳与礼品", english: "CASES & GIFTS", href: "/zh/products",
        items: ["手表盒", "雪茄盒", "礼品套装"].map((label) => ({ label, href: "/zh/products#products-index" })),
        feature: { label: "推荐品类", title: "收纳与礼品", image: "/assets/navigation/crazy-horse-gifts-v1.webp", href: "/zh/products", alt: "疯马皮手表盒、雪茄盒与礼品套装" },
      },
    ],
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
