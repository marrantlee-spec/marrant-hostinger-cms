import type { Metadata } from "next";
import Wallet8064Experience from "../../components/Wallet8064Experience";

const title = "Wholesale Crazy Horse Leather Notebook Cover | Marrant";
const description = "Wholesale Q1005 top-grain cowhide notebook cover with card pocket, pen loop, notebook sleeve and OEM/ODM options.";
const path = "/products/wholesale-crazy-horse-leather-notebook-cover";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `https://www.marrantbag.com${path}`, languages: { en: `https://www.marrantbag.com${path}`, "zh-CN": `https://www.marrantbag.com/zh${path}`, "x-default": `https://www.marrantbag.com${path}` } },
  openGraph: { title, description, type: "website", url: `https://www.marrantbag.com${path}`, siteName: "Marrant Bag", images: ["/assets/products/crazy-horse-leather-notebook-cover-q1005/features.webp"] },
};

export default function NotebookCoverPage() {
  return <Wallet8064Experience locale="en" product="notebook-cover" />;
}
