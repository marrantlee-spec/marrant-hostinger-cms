import type { Metadata } from "next";
import Wallet8064Experience from "../../components/Wallet8064Experience";

const title = "Wholesale Top-Grain Leather Folding Catchall Tray | Marrant";
const description = "Wholesale Q1009 top-grain cowhide folding catchall tray with corner snaps, fold-flat construction and OEM/ODM options.";
const path = "/products/wholesale-top-grain-leather-catchall-tray";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `https://www.marrantbag.com${path}`, languages: { en: `https://www.marrantbag.com${path}`, "zh-CN": `https://www.marrantbag.com/zh${path}`, "x-default": `https://www.marrantbag.com${path}` } },
  openGraph: { title, description, type: "website", url: `https://www.marrantbag.com${path}`, siteName: "Marrant Bag", images: ["/assets/products/top-grain-leather-catchall-tray-q1009/features.webp"] },
};

export default function CatchallTrayPage() {
  return <Wallet8064Experience locale="en" product="catchall-tray" />;
}
