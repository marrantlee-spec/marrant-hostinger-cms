"use server";

import { del } from "@vercel/blob";
import type { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { assertAdmin } from "../_lib/session";
import { blogSchema, formString, jsonField, productSchema, slugPattern } from "../_lib/validation";

export type ActionState = { error?: string } | undefined;

function message(error: unknown) {
  if (error && typeof error === "object" && "code" in error && error.code === "P2002") return "该 Slug 已被使用，请更换后重试。";
  if (error && typeof error === "object" && "name" in error && error.name === "ZodError") return "请检查必填项、Slug 格式以及字段长度。";
  return error instanceof Error && !error.message.startsWith("[") ? error.message : "保存失败，请检查填写内容后重试。";
}

function productInput(formData: FormData) {
  const data = productSchema.parse({
    name: formString(formData, "name"),
    slug: formString(formData, "slug"),
    categoryId: formString(formData, "categoryId"),
    shortDescription: formString(formData, "shortDescription"),
    description: formString(formData, "description"),
    mainImage: formString(formData, "mainImage"),
    gallery: jsonField<string[]>(formData, "gallery", []),
    specifications: jsonField<Record<string, string>>(formData, "specifications", {}),
    seoTitle: formString(formData, "seoTitle"),
    seoDescription: formString(formData, "seoDescription"),
    status: formString(formData, "status"),
  });
  return { ...data, gallery: data.gallery as Prisma.InputJsonValue };
}

function blogInput(formData: FormData) {
  const data = blogSchema.parse({
    title: formString(formData, "title"),
    slug: formString(formData, "slug"),
    categoryId: formString(formData, "categoryId"),
    coverImage: formString(formData, "coverImage"),
    excerpt: formString(formData, "excerpt"),
    content: jsonField<Record<string, unknown>>(formData, "content", { type: "doc", content: [] }),
    author: formString(formData, "author"),
    seoTitle: formString(formData, "seoTitle"),
    seoDescription: formString(formData, "seoDescription"),
    status: formString(formData, "status"),
  });
  return { ...data, content: data.content as Prisma.InputJsonValue };
}

export async function createProduct(_: ActionState, formData: FormData): Promise<ActionState> {
  await assertAdmin();
  try {
    const product = await prisma.product.create({ data: productInput(formData) });
    revalidatePath("/products");
    redirect(`/admin/products/${product.id}`);
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    return { error: message(error) };
  }
}

export async function updateProduct(id: string, _: ActionState, formData: FormData): Promise<ActionState> {
  await assertAdmin();
  try {
    const data = productInput(formData);
    await prisma.product.update({ where: { id }, data });
    revalidatePath("/products");
    revalidatePath(`/products/${data.slug}`);
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}

export async function deleteProduct(formData: FormData) {
  await assertAdmin();
  await prisma.product.delete({ where: { id: formString(formData, "id") } });
  revalidatePath("/products");
}

export async function createBlog(_: ActionState, formData: FormData): Promise<ActionState> {
  await assertAdmin();
  try {
    const data = blogInput(formData);
    const post = await prisma.blog.create({
      data: { ...data, publishedAt: data.status === "PUBLISHED" ? new Date() : null },
    });
    revalidatePath("/blog");
    redirect(`/admin/blog/${post.id}`);
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    return { error: message(error) };
  }
}

export async function updateBlog(id: string, _: ActionState, formData: FormData): Promise<ActionState> {
  await assertAdmin();
  try {
    const data = blogInput(formData);
    const current = await prisma.blog.findUnique({ where: { id }, select: { publishedAt: true } });
    await prisma.blog.update({
      where: { id },
      data: { ...data, publishedAt: data.status === "PUBLISHED" ? current?.publishedAt ?? new Date() : null },
    });
    revalidatePath("/blog");
    revalidatePath(`/blog/${data.slug}`);
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}

export async function deleteBlog(formData: FormData) {
  await assertAdmin();
  await prisma.blog.delete({ where: { id: formString(formData, "id") } });
  revalidatePath("/blog");
}

export async function createCategory(_: ActionState, formData: FormData): Promise<ActionState> {
  await assertAdmin();
  const name = formString(formData, "name").trim();
  const slug = formString(formData, "slug").trim();
  const type = formString(formData, "type");
  if (name.length < 2 || !slugPattern.test(slug) || (type !== "PRODUCT" && type !== "BLOG")) return { error: "请填写分类名称、有效的英文 Slug，并选择分类用途。" };
  try {
    await prisma.category.create({ data: { name, slug, type } });
    revalidatePath("/admin/categories");
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}

export async function deleteCategory(formData: FormData) {
  await assertAdmin();
  await prisma.category.delete({ where: { id: formString(formData, "id") } });
  revalidatePath("/admin/categories");
}

export async function updateInquiryStatus(formData: FormData) {
  await assertAdmin();
  const status = formString(formData, "status");
  if (status !== "NEW" && status !== "IN_PROGRESS" && status !== "CLOSED") throw new Error("无效的询盘状态");
  await prisma.inquiry.update({ where: { id: formString(formData, "id") }, data: { status } });
  revalidatePath("/admin/inquiries");
}

export async function deleteInquiry(formData: FormData) {
  await assertAdmin();
  await prisma.inquiry.delete({ where: { id: formString(formData, "id") } });
  revalidatePath("/admin/inquiries");
}

export async function deleteMedia(formData: FormData) {
  await assertAdmin();
  const id = formString(formData, "id");
  const item = await prisma.media.findUnique({ where: { id } });
  if (!item) return;
  await del(item.url);
  await prisma.media.delete({ where: { id } });
  revalidatePath("/admin/media");
}
