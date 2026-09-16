import Wallet8064Experience from "../../../components/Wallet8064Experience";
import { chineseMetadata } from "../../metadata";

const path = "/products/wholesale-top-grain-leather-compass-bifold-wallet";

export const metadata = chineseMetadata(
  path,
  "批发头层牛皮罗盘压花男士二折钱包 | 玛轮特皮具",
  "款号 1040 头层牛皮男士二折钱包批发与 OEM / ODM 定制，采用罗盘压花、防磁防盗刷里布与 15 个功能位，提供 9 种 SKU 选项。",
);

export default function ChineseCompassBifoldWalletPage() {
  return <Wallet8064Experience locale="zh" product="compass-bifold-wallet" />;
}
