import type { Metadata } from "next";

export const chineseTitle = "玛轮特皮具 | 真皮包厂家 | OEM ODM皮具供应商";
export const chineseDescription = "广州玛轮特皮具专业生产真皮包、商务包、女士包、背包，支持OEM ODM定制。";

export function chineseMetadata(path = "", title = chineseTitle, description = chineseDescription): Metadata {
  const base = "https://www.marrantbag.com";
  return {
    title,
    description,
    alternates: {
      canonical: `${base}/zh${path}`,
      languages: { en: `${base}${path || "/"}`, "zh-CN": `${base}/zh${path}`, "x-default": `${base}${path || "/"}` },
    },
    openGraph: { title, description, locale: "zh_CN", alternateLocale: "en_US", url: `${base}/zh${path}`, siteName: "玛轮特皮具 Marrant Bag", type: "website" },
  };
}
