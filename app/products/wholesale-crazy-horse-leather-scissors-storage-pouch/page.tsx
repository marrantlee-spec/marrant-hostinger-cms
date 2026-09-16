import type { Metadata } from "next";
import Wallet8064Experience from "../../components/Wallet8064Experience";

const title = "Wholesale Crazy Horse Leather Scissors Storage Pouch | Marrant";
const description = "Wholesale Q1003 top-grain cowhide scissors storage pouch with a crazy horse finish, layered pockets, snap closure and OEM/ODM options.";
const path = "/products/wholesale-crazy-horse-leather-scissors-storage-pouch";

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
    images: ["/assets/products/crazy-horse-leather-scissors-pouch-q1003/features-overview.webp"],
  },
};

export default function CrazyHorseScissorsPouchPage() {
  return <Wallet8064Experience locale="en" product="crazy-horse-scissors-pouch" />;
}
