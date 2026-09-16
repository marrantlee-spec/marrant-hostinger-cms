import { prisma } from "../../../../../lib/prisma";
import { createBlog } from "../../../_actions/cms";
import { BlogForm } from "../../../_components/BlogForm";
import { PageHeader } from "../../../_components/PageHeader";

export default async function CreateBlogPage() {
  const [categories, media] = await Promise.all([prisma.category.findMany({ where: { type: "BLOG" }, orderBy: { name: "asc" }, select: { id: true, name: true } }), prisma.media.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, url: true, filename: true } })]);
  return <><PageHeader title="新增箱包行业文章" description="撰写箱包采购、材质、工艺或 OEM/ODM 定制内容，并完善 SEO 字段。" /><BlogForm action={createBlog} categories={categories} media={media} /></>;
}
