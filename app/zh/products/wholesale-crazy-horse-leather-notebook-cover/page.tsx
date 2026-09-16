import type { Metadata } from "next";
import Wallet8064Experience from "../../../components/Wallet8064Experience";
import { chineseMetadata } from "../../metadata";

const path = "/products/wholesale-crazy-horse-leather-notebook-cover";
const baseMetadata = chineseMetadata(path, "批发疯马皮笔记本保护套 | 玛轮特皮具", "款号 Q1005 头层牛皮笔记本保护套批发，配卡片口袋、笔插与笔记本套位，可评估标识、颜色、结构与包装定制。");

export const metadata: Metadata = { ...baseMetadata, openGraph: { ...baseMetadata.openGraph, images: ["/assets/products/crazy-horse-leather-notebook-cover-q1005/features.webp"] } };

export default function ChineseNotebookCoverPage() {
  return <Wallet8064Experience locale="zh" product="notebook-cover" />;
}
