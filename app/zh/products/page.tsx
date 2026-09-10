import ProductsExperience from "./ProductsExperience";
import { chineseMetadata } from "../metadata";

export const metadata = chineseMetadata("/products");

export default function ChineseProductsPage() {
  return <ProductsExperience />;
}
