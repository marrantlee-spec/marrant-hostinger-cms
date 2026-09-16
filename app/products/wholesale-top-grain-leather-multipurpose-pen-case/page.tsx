import type { Metadata } from "next";
import Wallet8064Experience from "../../components/Wallet8064Experience";

const title = "Wholesale Top-Grain Leather Multipurpose Pen Case | Marrant";
const description = "Wholesale top-grain cowhide multipurpose pen case with a structured zipper design, five color options and OEM/ODM customization. Style No. Q1004.";
const path = "/products/wholesale-top-grain-leather-multipurpose-pen-case";

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
    images: ["/assets/products/top-grain-leather-multipurpose-pen-case-q1004/features-overview.webp"],
  },
};

export default function MultipurposePenCasePage() {
  return <Wallet8064Experience locale="en" product="multipurpose-pen-case" />;
}
