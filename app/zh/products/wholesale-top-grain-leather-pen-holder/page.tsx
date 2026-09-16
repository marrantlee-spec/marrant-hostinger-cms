import type { Metadata } from "next";
import Wallet8064Experience from "../../../components/Wallet8064Experience";
import { chineseMetadata } from "../../metadata";

const path = "/products/wholesale-top-grain-leather-pen-holder";
const baseMetadata = chineseMetadata(path, "批发头层牛皮圆筒笔筒 | 玛轮特皮具", "款号 Q1006 头层牛皮圆筒笔筒批发，采用开放式筒口与车缝底座，可评估标识、颜色、结构与包装定制。");

export const metadata: Metadata = { ...baseMetadata, openGraph: { ...baseMetadata.openGraph, images: ["/assets/products/top-grain-leather-pen-holder-q1006/features.webp"] } };

export default function ChinesePenHolderPage() {
  return <Wallet8064Experience locale="zh" product="pen-holder" />;
}
