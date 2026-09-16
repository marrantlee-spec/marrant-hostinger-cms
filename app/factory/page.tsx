import type { Metadata } from "next";
import FactoryExperience from "./FactoryExperience";

export const metadata: Metadata = {
  title: "Our Leather Bag Factory | Marrant OEM/ODM Manufacturing",
  description: "See Marrant's leather bag workshop, OEM/ODM process, quality checks, international buyer visits, and factory visit options in Guangzhou.",
  alternates: { canonical: "https://www.marrantbag.com/factory" },
  openGraph: {
    title: "Inside the Marrant Leather Bag Factory",
    description: "A transparent look at Marrant's workshop, production process, quality checks, and team in Guangzhou.",
    url: "https://www.marrantbag.com/factory",
    siteName: "Marrant Bag",
    type: "website",
    images: ["/assets/product-detail/leather-production-workshop-v1.png"],
  },
};

export default function FactoryPage() {
  return <FactoryExperience />;
}
