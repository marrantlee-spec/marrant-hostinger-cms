import { prisma } from "../../../../../lib/prisma";
import { createProduct } from "../../../_actions/cms";
import { PageHeader } from "../../../_components/PageHeader";
import { ProductForm } from "../../../_components/ProductForm";

export default async function CreateProductPage() {
  const [categories, media] = await Promise.all([prisma.category.findMany({ where: { type: "PRODUCT" }, orderBy: { name: "asc" }, select: { id: true, name: true } }), prisma.media.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, url: true, filename: true } })]);
  return <><PageHeader title="新增箱包产品" description="录入箱包款式、材质规格、定制信息、产品图片和 SEO 内容。" /><ProductForm action={createProduct} categories={categories} media={media} /></>;
}
