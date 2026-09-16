import type { Metadata } from "next";
import Wallet8064Experience from "../../../components/Wallet8064Experience";
import { chineseMetadata } from "../../metadata";

const path = "/products/wholesale-embossed-top-grain-leather-pen-sleeve";

const baseMetadata = chineseMetadata(
  path,
  "批发压花头层牛皮笔套 | 玛轮特皮具",
  "款号 Q1010 花卉压花头层牛皮笔套批发，提供两种所列尺寸、无里布结构与插入式翻盖闭合，可评估品牌定制。",
);

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    images: ["/assets/products/embossed-top-grain-leather-pen-sleeve-q1010/features.webp"],
  },
};

export default function ChineseEmbossedPenSleevePage() {
  return <Wallet8064Experience locale="zh" product="embossed-pen-sleeve" />;
}
