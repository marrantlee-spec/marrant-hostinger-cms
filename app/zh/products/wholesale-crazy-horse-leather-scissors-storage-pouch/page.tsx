import type { Metadata } from "next";
import Wallet8064Experience from "../../../components/Wallet8064Experience";
import { chineseMetadata } from "../../metadata";

const path = "/products/wholesale-crazy-horse-leather-scissors-storage-pouch";

const baseMetadata = chineseMetadata(
  path,
  "批发头层牛皮疯马皮剪刀收纳袋 | 玛轮特皮具",
  "款号 Q1003 头层牛皮疯马皮剪刀收纳袋批发，采用分层口袋与按扣闭合，可评估标识、颜色、五金、里布与包装定制。",
);

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    images: ["/assets/products/crazy-horse-leather-scissors-pouch-q1003/features-overview.webp"],
  },
};

export default function ChineseCrazyHorseScissorsPouchPage() {
  return <Wallet8064Experience locale="zh" product="crazy-horse-scissors-pouch" />;
}
