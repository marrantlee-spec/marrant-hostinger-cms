import type { Metadata } from "next";
import Wallet8064Experience from "../../components/Wallet8064Experience";

const title = "Men's Full-Grain Leather Bifold Wallet 8064 | Marrant";
const description = "Custom men's bifold wallet in full-grain cowhide, SKU 8064. Available with logo, color, hardware, lining and packaging customization.";
const path = "/products/mens-full-grain-leather-bifold-wallet-8064";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `https://www.marrantbag.com${path}`,
    languages: { en: `https://www.marrantbag.com${path}`, "zh-CN": `https://www.marrantbag.com/zh${path}`, "x-default": `https://www.marrantbag.com${path}` },
  },
  openGraph: { title, description, type: "website", url: `https://www.marrantbag.com${path}`, siteName: "Marrant Bag", images: ["/assets/products/mens-bifold-wallet-8064/main.jpg"] },
};

export default function Wallet8064Page() {
  return <Wallet8064Experience locale="en" />;
}
