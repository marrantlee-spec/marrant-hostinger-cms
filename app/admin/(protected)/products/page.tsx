import Link from "next/link";
import { prisma } from "../../../../lib/prisma";
import { deleteProduct } from "../../_actions/cms";
import { PageHeader } from "../../_components/PageHeader";
import { StatusBadge } from "../../_components/StatusBadge";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { updatedAt: "desc" }, include: { category: true } });
  return <><PageHeader title="箱包产品" description={`共 ${products.length} 个箱包款式。`} action={{ href: "/admin/products/create", label: "新增箱包产品" }} /><div className="overflow-x-auto rounded-md border border-[#e1e6ec] bg-white"><table className="w-full min-w-[760px] text-left text-[13px]"><thead className="bg-slate-50 text-xs text-slate-500"><tr><th className="px-4 py-3">产品</th><th>箱包分类</th><th>状态</th><th>最后更新</th><th className="pr-4 text-right">操作</th></tr></thead><tbody>{products.map((item) => <tr className="border-t border-slate-200" key={item.id}><td className="px-4 py-3"><div className="flex items-center gap-3">{item.mainImage ? <img src={item.mainImage} className="size-10 rounded object-cover" alt="" /> : <span className="size-10 rounded bg-slate-100" />}<div><Link className="font-semibold hover:text-[#a55734]" href={`/admin/products/${item.id}`}>{item.name}</Link><p className="text-[11px] text-slate-400">/{item.slug}</p></div></div></td><td>{item.category.name}</td><td><StatusBadge status={item.status} /></td><td>{item.updatedAt.toLocaleDateString("zh-CN")}</td><td className="pr-4"><div className="flex justify-end gap-3"><Link className="font-semibold text-[#a55734]" href={`/admin/products/${item.id}`}>编辑</Link><form action={deleteProduct}><input name="id" type="hidden" value={item.id} /><button className="font-semibold text-red-600" type="submit">删除</button></form></div></td></tr>)}{products.length === 0 ? <tr><td className="px-4 py-12 text-center text-slate-500" colSpan={5}>还没有箱包产品，请先新增一个款式。</td></tr> : null}</tbody></table></div></>;
}
