import type { Metadata } from "next";
import Wallet8064Experience from "../../../components/Wallet8064Experience";
import { chineseMetadata } from "../../metadata";

const path = "/products/wholesale-top-grain-leather-multipurpose-pen-case";

const baseMetadata = chineseMetadata(
  path,
  "批发头层牛皮多功能笔袋 | 玛轮特皮具",
  "款号 Q1004 头层牛皮多功能笔袋批发，立体拉链结构、5 种颜色选项，可评估标识、颜色、五金、里布与包装定制。",
);

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    images: ["/assets/products/top-grain-leather-multipurpose-pen-case-q1004/features-overview.webp"],
  },
};

export default function ChineseMultipurposePenCasePage() {
  return <Wallet8064Experience locale="zh" product="multipurpose-pen-case" />;
}
