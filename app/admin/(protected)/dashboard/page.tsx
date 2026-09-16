import Link from "next/link";
import { Article, ChatCircle, FolderSimple, Package } from "@phosphor-icons/react/ssr";
import { prisma } from "../../../../lib/prisma";
import { PageHeader } from "../../_components/PageHeader";
import { StatusBadge } from "../../_components/StatusBadge";

export default async function DashboardPage() {
  const [productCount, categoryCount, blogCount, inquiryCount, products, inquiries] = await Promise.all([
    prisma.product.count(), prisma.category.count(), prisma.blog.count(), prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.product.findMany({ take: 5, orderBy: { updatedAt: "desc" }, include: { category: true } }),
    prisma.inquiry.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
  ]);
  const stats = [
    { label: "箱包产品", value: productCount, icon: Package },
    { label: "产品与文章分类", value: categoryCount, icon: FolderSimple },
    { label: "采购指南", value: blogCount, icon: Article },
    { label: "待处理询盘", value: inquiryCount, icon: ChatCircle },
  ];
  return (
    <>
      <PageHeader title="工作台" description="查看箱包产品、采购内容和批发客户询盘。" />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => <div key={label} className="flex items-center gap-4 rounded-md border border-[#e1e6ec] bg-white p-5"><span className="grid size-11 place-items-center rounded bg-slate-100"><Icon size={23} /></span><div><p className="text-xs text-slate-500">{label}</p><strong className="mt-1 block text-2xl">{value}</strong></div></div>)}
      </section>
      <div className="my-6 flex gap-3"><Link href="/admin/products/create" className="rounded-md bg-[#b8663f] px-4 py-2.5 text-sm font-semibold text-white">+ 新增箱包产品</Link><Link href="/admin/blog/create" className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold">+ 发布采购指南</Link></div>
      <section className="mt-8"><div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">最近更新的箱包产品</h2><Link className="text-xs font-semibold text-[#a55734]" href="/admin/products">查看全部</Link></div><div className="overflow-x-auto rounded-md border border-[#e1e6ec] bg-white"><table className="w-full min-w-[680px] text-left text-[13px]"><thead className="bg-slate-50 text-xs text-slate-500"><tr><th className="px-4 py-3">产品名称</th><th>箱包分类</th><th>状态</th><th>更新时间</th></tr></thead><tbody>{products.map((item) => <tr className="border-t border-slate-200" key={item.id}><td className="px-4 py-3 font-semibold"><Link href={`/admin/products/${item.id}`}>{item.name}</Link></td><td>{item.category.name}</td><td><StatusBadge status={item.status} /></td><td>{item.updatedAt.toLocaleDateString("zh-CN")}</td></tr>)}{products.length === 0 ? <tr><td className="px-4 py-8 text-center text-slate-500" colSpan={4}>还没有箱包产品。</td></tr> : null}</tbody></table></div></section>
      <section className="mt-8"><div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">最新批发询盘</h2><Link className="text-xs font-semibold text-[#a55734]" href="/admin/inquiries">查看全部</Link></div><div className="overflow-x-auto rounded-md border border-[#e1e6ec] bg-white"><table className="w-full min-w-[680px] text-left text-[13px]"><thead className="bg-slate-50 text-xs text-slate-500"><tr><th className="px-4 py-3">客户</th><th>邮箱</th><th>意向箱包</th><th>收到时间</th></tr></thead><tbody>{inquiries.map((item) => <tr className="border-t border-slate-200" key={item.id}><td className="px-4 py-3 font-semibold">{item.name}</td><td>{item.email}</td><td>{item.product || "未指定"}</td><td>{item.createdAt.toLocaleDateString("zh-CN")}</td></tr>)}{inquiries.length === 0 ? <tr><td className="px-4 py-8 text-center text-slate-500" colSpan={4}>暂无客户询盘。</td></tr> : null}</tbody></table></div></section>
    </>
  );
}
