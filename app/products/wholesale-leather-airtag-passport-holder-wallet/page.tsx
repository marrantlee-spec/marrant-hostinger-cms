import type { Metadata } from "next";
import Wallet8064Experience from "../../components/Wallet8064Experience";

const title = "Wholesale Leather AirTag Passport Holder Wallet | Marrant";
const description = "Wholesale genuine leather passport holder with AirTag slot, RFID protection, card slots, zip pocket and pen loop. OEM/ODM colors, logo and packaging.";
const path = "/products/wholesale-leather-airtag-passport-holder-wallet";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `https://www.marrantbag.com${path}`,
    languages: { en: `https://www.marrantbag.com${path}`, "zh-CN": `https://www.marrantbag.com/zh${path}`, "x-default": `https://www.marrantbag.com${path}` },
  },
  openGraph: { title, description, type: "website", url: `https://www.marrantbag.com${path}`, siteName: "Marrant Bag", images: ["/assets/products/leather-airtag-passport-wallet/colors.png"] },
};

export default function AirTagPassportWalletPage() {
  return <Wallet8064Experience locale="en" product="airtag-passport-wallet" />;
}
