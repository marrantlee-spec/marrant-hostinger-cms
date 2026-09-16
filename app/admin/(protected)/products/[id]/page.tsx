import { notFound } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";
import { updateProduct } from "../../../_actions/cms";
import { PageHeader } from "../../../_components/PageHeader";
import { ProductForm } from "../../../_components/ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories, media] = await Promise.all([prisma.product.findUnique({ where: { id } }), prisma.category.findMany({ where: { type: "PRODUCT" }, orderBy: { name: "asc" }, select: { id: true, name: true } }), prisma.media.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, url: true, filename: true } })]);
  if (!product) notFound();
  const gallery = Array.isArray(product.gallery) ? product.gallery.filter((item): item is string => typeof item === "string") : [];
  const value = { ...product, gallery, specifications: product.specifications as Record<string, string> };
  return <><PageHeader title="编辑箱包产品" description={`最后更新：${product.updatedAt.toLocaleString("zh-CN")}`} /><ProductForm action={updateProduct.bind(null, id)} categories={categories} media={media} product={value} /></>;
}
