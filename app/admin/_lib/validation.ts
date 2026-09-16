import { z } from "zod";

export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const contentStatusSchema = z.enum(["DRAFT", "PUBLISHED"]);

export const productSchema = z.object({
  name: z.string().trim().min(2).max(160),
  slug: z.string().trim().min(2).max(180).regex(slugPattern),
  categoryId: z.string().min(1),
  shortDescription: z.string().trim().max(500),
  description: z.string().trim().max(50000),
  mainImage: z.string().trim().max(2000),
  gallery: z.array(z.string().url()).max(20),
  specifications: z.record(z.string(), z.string()).refine((value) => Object.keys(value).length <= 100),
  seoTitle: z.string().trim().max(70),
  seoDescription: z.string().trim().max(180),
  status: contentStatusSchema,
});

export const blogSchema = z.object({
  title: z.string().trim().min(2).max(180),
  slug: z.string().trim().min(2).max(200).regex(slugPattern),
  categoryId: z.string().min(1),
  coverImage: z.string().trim().max(2000),
  excerpt: z.string().trim().max(500),
  content: z.record(z.string(), z.unknown()),
  author: z.string().trim().min(2).max(120),
  seoTitle: z.string().trim().max(70),
  seoDescription: z.string().trim().max(180),
  status: contentStatusSchema,
});

export function formString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export function jsonField<T>(formData: FormData, key: string, fallback: T): T {
  try {
    return JSON.parse(formString(formData, key)) as T;
  } catch {
    return fallback;
  }
}
