import "server-only";
import { cache } from "react";
import { prisma } from "./prisma";

export const getPublishedProduct = cache(async (slug: string) => {
  if (!process.env.DATABASE_URL) return null;
  return prisma.product.findFirst({ where: { slug, status: "PUBLISHED" }, include: { category: true } });
});

export const getPublishedBlog = cache(async (slug: string) => {
  if (!process.env.DATABASE_URL) return null;
  return prisma.blog.findFirst({ where: { slug, status: "PUBLISHED" }, include: { category: true } });
});

export async function getPublishedBlogs() {
  if (!process.env.DATABASE_URL) return [];
  try {
    return await prisma.blog.findMany({ where: { status: "PUBLISHED" }, include: { category: true }, orderBy: { publishedAt: "desc" } });
  } catch (error) {
    console.error("CMS blog listing unavailable", error);
    return [];
  }
}
