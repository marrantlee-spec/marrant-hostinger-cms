import type { Metadata } from "next";
import Wallet8064Experience from "../../../components/Wallet8064Experience";
import { chineseMetadata } from "../../metadata";

const path = "/products/wholesale-top-grain-leather-catchall-tray";
const baseMetadata = chineseMetadata(path, "批发头层牛皮折叠收纳托盘 | 玛轮特皮具", "款号 Q1009 头层牛皮折叠收纳托盘批发，四角按扣组合并可平铺，可评估标识、颜色、五金与包装定制。");

export const metadata: Metadata = { ...baseMetadata, openGraph: { ...baseMetadata.openGraph, images: ["/assets/products/top-grain-leather-catchall-tray-q1009/features.webp"] } };

export default function ChineseCatchallTrayPage() {
  return <Wallet8064Experience locale="zh" product="catchall-tray" />;
}
