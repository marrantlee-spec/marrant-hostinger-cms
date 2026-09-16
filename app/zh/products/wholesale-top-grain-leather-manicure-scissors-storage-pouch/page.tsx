import type { Metadata } from "next";
import Wallet8064Experience from "../../../components/Wallet8064Experience";
import { chineseMetadata } from "../../metadata";

const path = "/products/wholesale-top-grain-leather-manicure-scissors-storage-pouch";

const baseMetadata = chineseMetadata(
  path,
  "批发头层牛皮压花美甲剪收纳袋 | 玛轮特皮具",
  "款号 Q1002 头层牛皮压花美甲剪收纳袋批发，分层收纳、按扣闭合，可评估标识、颜色、五金、里布与包装定制。",
);

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    images: ["/assets/products/top-grain-leather-manicure-scissors-pouch-q1002/features-overview.webp"],
  },
};

export default function ChineseManicureScissorsPouchPage() {
  return <Wallet8064Experience locale="zh" product="manicure-scissors-pouch" />;
}
