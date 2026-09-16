export type ProductCategoryId = "bags" | "small-leather-goods" | "desk-lifestyle" | "cases-gifts";
export type ProductTaxonomyLocale = "en" | "zh-CN";

type LocalizedText = { en: string; zh: string };

export const productTaxonomy = [
  {
    id: "bags",
    label: { en: "Bags", zh: "包袋" },
    english: "BAGS",
    items: [
      { label: { en: "Backpacks", zh: "背包" } },
      { label: { en: "Briefcases", zh: "商务公文包" } },
      { label: { en: "Crossbody Bags", zh: "斜挎包" } },
      { label: { en: "Chest & Waist Bags", zh: "胸包与腰包" } },
      { label: { en: "Tote Bags", zh: "托特包" } },
      { label: { en: "Travel Bags", zh: "旅行包" } },
      { label: { en: "Clutches", zh: "手拿包" } },
    ],
    feature: {
      title: { en: "Crazy Horse Bags", zh: "疯马皮包袋" },
      image: "/assets/navigation/crazy-horse-bags-v1.webp",
      alt: { en: "Crazy Horse leather backpack, briefcase and travel bag", zh: "疯马皮背包、公文包与旅行包" },
    },
  },
  {
    id: "small-leather-goods",
    label: { en: "Wallets & Small Leather Goods", zh: "钱包与小皮具" },
    english: "SMALL LEATHER GOODS",
    items: [
      { label: { en: "Wallets", zh: "钱包" }, href: "/products/mens-full-grain-leather-bifold-wallet-8064" },
      { label: { en: "Card Holders", zh: "卡包" }, href: "/products/wholesale-crazy-horse-leather-slim-card-holder" },
      { label: { en: "Passport Holders", zh: "护照夹" }, href: "/products/wholesale-leather-airtag-passport-holder-wallet" },
      { label: { en: "Coin Purses", zh: "零钱包" } },
      { label: { en: "Key Cases", zh: "钥匙包" } },
      { label: { en: "Phone Pouches", zh: "手机包" } },
    ],
    feature: {
      title: { en: "Wallets & Small Goods", zh: "钱包与小皮具" },
      image: "/assets/navigation/crazy-horse-small-goods-v1.webp",
      alt: { en: "Crazy Horse leather wallet, card holder, passport holder and coin purse", zh: "疯马皮钱包、卡包、护照夹与零钱包" },
      href: "/products/mens-full-grain-leather-bifold-wallet-8064",
    },
  },
  {
    id: "desk-lifestyle",
    label: { en: "Desk & Lifestyle", zh: "桌面与生活用品" },
    english: "DESK & LIFESTYLE",
    items: [
      { label: { en: "Mouse Pads", zh: "鼠标垫" } },
      { label: { en: "Coasters", zh: "杯垫" } },
      { label: { en: "Pen Cases", zh: "笔袋" } },
      { label: { en: "Keychains", zh: "钥匙扣" } },
    ],
    feature: {
      title: { en: "Desk & Lifestyle", zh: "桌面与生活用品" },
      image: "/assets/navigation/crazy-horse-desk-v1.webp",
      alt: { en: "Crazy Horse leather desk mat, coasters, pen case and keychain", zh: "疯马皮鼠标垫、杯垫、笔袋与钥匙扣" },
    },
  },
  {
    id: "cases-gifts",
    label: { en: "Cases & Gifts", zh: "收纳与礼品" },
    english: "CASES & GIFTS",
    items: [
      { label: { en: "Watch Boxes", zh: "手表盒" } },
      { label: { en: "Cigar Cases", zh: "雪茄盒" } },
      { label: { en: "Gift Sets", zh: "礼品套装" } },
    ],
    feature: {
      title: { en: "Cases & Gifts", zh: "收纳与礼品" },
      image: "/assets/navigation/crazy-horse-gifts-v1.webp",
      alt: { en: "Crazy Horse leather watch box, cigar case and gift set", zh: "疯马皮手表盒、雪茄盒与礼品套装" },
    },
  },
] as const satisfies readonly {
  id: ProductCategoryId;
  label: LocalizedText;
  english: string;
  items: readonly { label: LocalizedText; href?: string }[];
  feature: { title: LocalizedText; image: string; alt: LocalizedText; href?: string };
}[];

export function localizeProductHref(locale: ProductTaxonomyLocale, href: string) {
  return locale === "zh-CN" ? `/zh${href}` : href;
}

export function productCategoriesFor(locale: ProductTaxonomyLocale) {
  const language = locale === "zh-CN" ? "zh" : "en";

  return productTaxonomy.map((category) => {
    const categoryHref = localizeProductHref(locale, `/products?category=${category.id}#products-index`);
    return {
      id: category.id,
      label: category.label[language],
      english: category.english,
      href: categoryHref,
      items: category.items.map((item) => ({
        label: item.label[language],
        href: localizeProductHref(locale, "href" in item && item.href ? item.href : `/products?category=${category.id}#products-index`),
      })),
      feature: {
        label: locale === "zh-CN" ? "推荐品类" : "FEATURED CATEGORY",
        title: category.feature.title[language],
        image: category.feature.image,
        href: localizeProductHref(locale, "href" in category.feature && category.feature.href ? category.feature.href : `/products?category=${category.id}#products-index`),
        alt: category.feature.alt[language],
      },
    };
  });
}

export function isProductCategoryId(value: string | null): value is ProductCategoryId {
  return productTaxonomy.some((category) => category.id === value);
}

const legacyCategoryAliases: Record<string, ProductCategoryId> = {
  "crazy horse leather": "bags",
  "travel tote bags": "bags",
  "shoulder bags": "bags",
  backpacks: "bags",
  "women's bags": "bags",
  "mens wallets": "small-leather-goods",
  "men's wallets": "small-leather-goods",
  wallets: "small-leather-goods",
  "small leather goods": "small-leather-goods",
  "wallets & small goods": "small-leather-goods",
  "wallets & small leather goods": "small-leather-goods",
  "疯马皮系列": "bags",
  "旅行托特包": "bags",
  "真皮单肩包": "bags",
  "真皮背包": "bags",
  "女士真皮包": "bags",
  "男士钱包": "small-leather-goods",
  "钱包与小皮具": "small-leather-goods",
};

export function canonicalProductCategoryLabel(name: string, locale: ProductTaxonomyLocale) {
  const normalized = name.trim().toLowerCase();
  const categoryId = legacyCategoryAliases[normalized] ?? productTaxonomy.find((category) => category.id === normalized)?.id;
  if (!categoryId) return name;
  return productCategoriesFor(locale).find((category) => category.id === categoryId)?.label ?? name;
}
