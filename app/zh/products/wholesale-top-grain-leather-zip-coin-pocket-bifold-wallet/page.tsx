import Wallet8064Experience from "../../../components/Wallet8064Experience";
import { chineseMetadata } from "../../metadata";

const path = "/products/wholesale-top-grain-leather-zip-coin-pocket-bifold-wallet";

export const metadata = chineseMetadata(
  path,
  "批发头层牛皮拉链零钱袋男士短款二折钱包 | 玛轮特皮具",
  "款号 7042 头层牛皮短款二折钱包，带背面拉链零钱袋、搭扣闭合与多卡位，提供 4 种现有颜色，支持批发及 OEM / ODM 定制。",
);

export default function ChineseZipCoinPocketWalletPage() {
  return <Wallet8064Experience locale="zh" product="zip-coin-wallet" />;
}
