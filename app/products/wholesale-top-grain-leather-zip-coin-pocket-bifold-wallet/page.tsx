import type { Metadata } from "next";
import Wallet8064Experience from "../../components/Wallet8064Experience";

const title = "Wholesale Top-Grain Leather Zip Coin Pocket Bifold Wallet | Marrant";
const description = "Wholesale top-grain cowhide short bifold wallet with a rear zip coin pocket, snap closure and four listed colors. Style 7042 OEM/ODM.";
const path = "/products/wholesale-top-grain-leather-zip-coin-pocket-bifold-wallet";

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
    images: ["/assets/products/top-grain-zip-wallet-7042/coffee-front.webp"],
  },
};

export default function ZipCoinPocketWalletPage() {
  return <Wallet8064Experience locale="en" product="zip-coin-wallet" />;
}
