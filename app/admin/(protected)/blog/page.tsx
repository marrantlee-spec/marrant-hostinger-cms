import Link from "next/link";
import { prisma } from "../../../../lib/prisma";
import { deleteBlog } from "../../_actions/cms";
import { PageHeader } from "../../_components/PageHeader";
import { StatusBadge } from "../../_components/StatusBadge";

export default async function BlogPage() {
  const posts = await prisma.blog.findMany({ orderBy: { updatedAt: "desc" }, include: { category: true } });
  return <><PageHeader title="采购指南与行业文章" description={`共 ${posts.length} 篇文章，用于箱包采购商教育与自然搜索获客。`} action={{ href: "/admin/blog/create", label: "新增文章" }} /><div className="overflow-x-auto rounded-md border border-[#e1e6ec] bg-white"><table className="w-full min-w-[760px] text-left text-[13px]"><thead className="bg-slate-50 text-xs text-slate-500"><tr><th className="px-4 py-3">文章</th><th>分类</th><th>状态</th><th>更新时间</th><th className="pr-4 text-right">操作</th></tr></thead><tbody>{posts.map((item) => <tr className="border-t border-slate-200" key={item.id}><td className="px-4 py-3"><div className="flex items-center gap-3">{item.coverImage ? <img className="size-10 rounded object-cover" src={item.coverImage} alt="" /> : <span className="size-10 rounded bg-slate-100" />}<div><Link className="font-semibold hover:text-[#a55734]" href={`/admin/blog/${item.id}`}>{item.title}</Link><p className="text-[11px] text-slate-400">/{item.slug}</p></div></div></td><td>{item.category.name}</td><td><StatusBadge status={item.status} /></td><td>{item.updatedAt.toLocaleDateString("zh-CN")}</td><td className="pr-4"><div className="flex justify-end gap-3"><Link className="font-semibold text-[#a55734]" href={`/admin/blog/${item.id}`}>编辑</Link><form action={deleteBlog}><input name="id" type="hidden" value={item.id} /><button className="font-semibold text-red-600">删除</button></form></div></td></tr>)}{posts.length === 0 ? <tr><td className="px-4 py-12 text-center text-slate-500" colSpan={5}>暂无文章，可先发布箱包选品、材质或定制指南。</td></tr> : null}</tbody></table></div></>;
}
