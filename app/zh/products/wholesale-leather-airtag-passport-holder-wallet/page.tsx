import Wallet8064Experience from "../../../components/Wallet8064Experience";
import { chineseMetadata } from "../../metadata";

const path = "/products/wholesale-leather-airtag-passport-holder-wallet";

export const metadata = chineseMetadata(path, "批发真皮 AirTag 防丢护照夹钱包 | 玛轮特皮具", "真皮 AirTag 护照夹批发与 OEM / ODM 定制，含 RFID 防护、卡位、拉链袋、护照位和笔插，提供五种 SKU 颜色。");

export default function ChineseAirTagPassportWalletPage() {
  return <Wallet8064Experience locale="zh" product="airtag-passport-wallet" />;
}
