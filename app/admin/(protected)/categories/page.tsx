import { prisma } from "../../../../lib/prisma";
import { deleteCategory } from "../../_actions/cms";
import { CategoryForm } from "../../_components/CategoryForm";
import { PageHeader } from "../../_components/PageHeader";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ type: "asc" }, { name: "asc" }],
    include: { _count: { select: { products: true, posts: true } } },
  });
  return (
    <>
      <PageHeader title="分类管理" description="分别维护箱包产品分类与采购指南文章分类，方便客户浏览与搜索。" />
      <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <CategoryForm />
        <div className="overflow-x-auto rounded-md border border-[#e1e6ec] bg-white">
          <table className="w-full min-w-[620px] text-left text-[13px]">
            <thead className="bg-slate-50 text-xs text-slate-500"><tr><th className="px-4 py-3">分类名称</th><th>Slug</th><th>用途</th><th>内容数量</th><th className="pr-4 text-right">操作</th></tr></thead>
            <tbody>
              {categories.map((item) => {
                const count = item.type === "PRODUCT" ? item._count.products : item._count.posts;
                return <tr className="border-t border-slate-200" key={item.id}><td className="px-4 py-3 font-semibold">{item.name}</td><td className="text-slate-500">{item.slug}</td><td>{item.type === "PRODUCT" ? "箱包产品" : "行业文章"}</td><td>{count}</td><td className="pr-4 text-right">{count === 0 ? <form action={deleteCategory}><input type="hidden" name="id" value={item.id} /><button className="text-xs font-semibold text-red-700">删除</button></form> : <span className="text-xs text-slate-400">使用中</span>}</td></tr>;
              })}
              {categories.length === 0 ? <tr><td className="px-4 py-8 text-center text-slate-500" colSpan={5}>暂无分类。</td></tr> : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
