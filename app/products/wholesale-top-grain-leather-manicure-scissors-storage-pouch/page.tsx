import type { Metadata } from "next";
import Wallet8064Experience from "../../components/Wallet8064Experience";

const title = "Wholesale Top-Grain Leather Manicure Scissors Pouch | Marrant";
const description = "Wholesale embossed top-grain cowhide manicure scissors storage pouch with layered pockets, snap closure and OEM/ODM options. Style No. Q1002.";
const path = "/products/wholesale-top-grain-leather-manicure-scissors-storage-pouch";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `https://www.marrantbag.com${path}`,
    languages: {
      en: `https://www.marrantbag.com${path}`,
      "zh-CN": `https://www.marrantbag.com/zh${path}`,
      "x-default": `https://www.marrantbag.com${path}`,
    },
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: `https://www.marrantbag.com${path}`,
    siteName: "Marrant Bag",
    images: ["/assets/products/top-grain-leather-manicure-scissors-pouch-q1002/features-overview.webp"],
  },
};

export default function ManicureScissorsPouchPage() {
  return <Wallet8064Experience locale="en" product="manicure-scissors-pouch" />;
}
