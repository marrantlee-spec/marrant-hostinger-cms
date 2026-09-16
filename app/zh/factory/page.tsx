import FactoryExperience from "../../factory/FactoryExperience";
import { chineseMetadata } from "../metadata";

export const metadata = chineseMetadata(
  "/factory",
  "真皮包工厂实力 | 玛轮特皮具 OEM ODM 制造",
  "走进广州玛轮特真皮包工厂，了解 OEM ODM 定制流程、生产工艺、质量检查、国际客户合作与工厂参观服务。",
);

export default function ChineseFactoryPage() {
  return <FactoryExperience locale="zh-CN" />;
}
