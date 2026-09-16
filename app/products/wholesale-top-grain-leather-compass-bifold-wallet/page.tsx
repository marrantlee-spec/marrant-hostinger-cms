import type { Metadata } from "next";
import Wallet8064Experience from "../../components/Wallet8064Experience";

const title = "Wholesale Top-Grain Leather Compass Bifold Wallet | Marrant";
const description = "Wholesale top-grain cowhide bifold wallet with compass embossing, anti-scan lining, 15-position storage and nine listed SKU options. Style 1040 OEM/ODM.";
const path = "/products/wholesale-top-grain-leather-compass-bifold-wallet";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `https://www.marrantbag.com${path}`,
    languages: { en: `https://www.marrantbag.com${path}`, "zh-CN": `https://www.marrantbag.com/zh${path}`, "x-default": `https://www.marrantbag.com${path}` },
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: `https://www.marrantbag.com${path}`,
    siteName: "Marrant Bag",
    images: ["/assets/products/leather-compass-wallet-1040/main.png"],
  },
};

export default function CompassBifoldWalletPage() {
  return <Wallet8064Experience locale="en" product="compass-bifold-wallet" />;
}
