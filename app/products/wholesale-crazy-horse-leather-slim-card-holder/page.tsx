import type { Metadata } from "next";
import Wallet8064Experience from "../../components/Wallet8064Experience";

const title = "Wholesale Crazy Horse Leather Slim Card Holder | Marrant";
const description = "Wholesale genuine leather slim card holder with a crazy-horse finish, lightweight flat construction and six listed colors. Style No. 1343.";
const path = "/products/wholesale-crazy-horse-leather-slim-card-holder";

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
    images: ["/assets/products/crazy-horse-leather-card-holder-1343/color-overview-logo-removed.png"],
  },
};

export default function CrazyHorseLeatherCardHolderPage() {
  return <Wallet8064Experience locale="en" product="crazy-horse-card-holder" />;
}
