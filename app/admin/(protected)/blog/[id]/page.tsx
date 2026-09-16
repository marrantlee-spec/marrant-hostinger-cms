import { notFound } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";
import { updateBlog } from "../../../_actions/cms";
import { BlogForm } from "../../../_components/BlogForm";
import { PageHeader } from "../../../_components/PageHeader";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, categories, media] = await Promise.all([prisma.blog.findUnique({ where: { id } }), prisma.category.findMany({ where: { type: "BLOG" }, orderBy: { name: "asc" }, select: { id: true, name: true } }), prisma.media.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, url: true, filename: true } })]);
  if (!post) notFound();
  const value = { ...post, content: post.content as Record<string, unknown> };
  return <><PageHeader title="编辑文章" description={`最后更新：${post.updatedAt.toLocaleString("zh-CN")}`} /><BlogForm action={updateBlog.bind(null, id)} categories={categories} media={media} post={value} /></>;
}
