import type { Metadata } from "next";
import Wallet8064Experience from "../../components/Wallet8064Experience";

const title = "Wholesale Embossed Top-Grain Leather Pen Sleeve | Marrant";
const description = "Wholesale floral-embossed top-grain cowhide pen sleeve with two listed sizes, unlined construction and tuck-through flap closure. Style No. Q1010.";
const path = "/products/wholesale-embossed-top-grain-leather-pen-sleeve";

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
    images: ["/assets/products/embossed-top-grain-leather-pen-sleeve-q1010/features.webp"],
  },
};

export default function EmbossedPenSleevePage() {
  return <Wallet8064Experience locale="en" product="embossed-pen-sleeve" />;
}
