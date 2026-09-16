import type { Metadata } from "next";
import Wallet8064Experience from "../../components/Wallet8064Experience";

const title = "Wholesale Top-Grain Leather Compass Pencil Case | Marrant";
const description = "Wholesale top-grain cowhide compass pencil case with polyester lining, elastic pen loops, mesh pocket and zip-around closure. Style No. Q1008.";
const path = "/products/wholesale-top-grain-leather-compass-pencil-case";

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
    images: ["/assets/products/top-grain-leather-compass-pencil-case-q1008/features.webp"],
  },
};

export default function CompassPencilCasePage() {
  return <Wallet8064Experience locale="en" product="compass-pencil-case" />;
}
