import type { Metadata } from "next";
import Wallet8064Experience from "../../../components/Wallet8064Experience";
import { chineseMetadata } from "../../metadata";

const path = "/products/wholesale-top-grain-leather-compass-pencil-case";

const baseMetadata = chineseMetadata(
  path,
  "批发头层牛皮罗盘拉链笔袋 | 玛轮特皮具",
  "款号 Q1008 头层牛皮罗盘拉链笔袋批发，配涤纶里布、弹力笔插、网袋与环绕拉链，可评估标识、颜色、五金、里布及包装定制。",
);

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    images: ["/assets/products/top-grain-leather-compass-pencil-case-q1008/features.webp"],
  },
};

export default function ChineseCompassPencilCasePage() {
  return <Wallet8064Experience locale="zh" product="compass-pencil-case" />;
}
