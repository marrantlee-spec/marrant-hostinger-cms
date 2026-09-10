import Wallet8064Experience from "../../../components/Wallet8064Experience";
import { chineseMetadata } from "../../metadata";

const path = "/products/mens-full-grain-leather-bifold-wallet-8064";

export const metadata = chineseMetadata(path, "8064 男士头层牛皮二折钱包定制 | 玛轮特皮具", "SKU 8064 男士头层牛皮二折钱包，支持标识、颜色、五金、内衬及包装定制。");

export default function ChineseWallet8064Page() {
  return <Wallet8064Experience locale="zh" />;
}
