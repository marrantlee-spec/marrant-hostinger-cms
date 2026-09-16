import type { Metadata } from "next";
import Wallet8064Experience from "../../components/Wallet8064Experience";

const title = "Wholesale Top-Grain Leather Pen Holder | Marrant";
const description = "Wholesale Q1006 top-grain cowhide cylindrical pen holder for pens, pencils and compact desk tools with OEM/ODM options.";
const path = "/products/wholesale-top-grain-leather-pen-holder";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `https://www.marrantbag.com${path}`, languages: { en: `https://www.marrantbag.com${path}`, "zh-CN": `https://www.marrantbag.com/zh${path}`, "x-default": `https://www.marrantbag.com${path}` } },
  openGraph: { title, description, type: "website", url: `https://www.marrantbag.com${path}`, siteName: "Marrant Bag", images: ["/assets/products/top-grain-leather-pen-holder-q1006/features.webp"] },
};

export default function PenHolderPage() {
  return <Wallet8064Experience locale="en" product="pen-holder" />;
}
