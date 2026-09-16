import Wallet8064Experience from "../../../components/Wallet8064Experience";
import { chineseMetadata } from "../../metadata";
import type { Metadata } from "next";

const path = "/products/wholesale-crazy-horse-leather-slim-card-holder";

const baseMetadata = chineseMetadata(
  path,
  "批发疯马皮轻薄卡包 | 玛轮特皮具",
  "款号 1343 真皮疯马皮轻薄卡包批发，扁平多卡位结构，链接列出六种颜色，可评估标识、颜色、结构与包装定制。",
);

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    images: ["/assets/products/crazy-horse-leather-card-holder-1343/color-overview-logo-removed.png"],
  },
};

export default function ChineseCrazyHorseLeatherCardHolderPage() {
  return <Wallet8064Experience locale="zh" product="crazy-horse-card-holder" />;
}
