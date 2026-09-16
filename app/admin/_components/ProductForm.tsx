"use client";

import { useActionState, useState } from "react";
import type { ActionState } from "../_actions/cms";

type Category = { id: string; name: string };
type Media = { id: string; url: string; filename: string };
type ProductValue = {
  name: string; slug: string; categoryId: string; shortDescription: string; description: string;
  mainImage: string; gallery: string[]; specifications: Record<string, string>; seoTitle: string; seoDescription: string; status: "DRAFT" | "PUBLISHED";
};

const empty: ProductValue = { name: "", slug: "", categoryId: "", shortDescription: "", description: "", mainImage: "", gallery: [], specifications: {}, seoTitle: "", seoDescription: "", status: "DRAFT" };

function toSlug(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

export function ProductForm({ action, categories, media, product = empty }: { action: (state: ActionState, formData: FormData) => Promise<ActionState>; categories: Category[]; media: Media[]; product?: ProductValue }) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [name, setName] = useState(product.name);
  const [slug, setSlug] = useState(product.slug);
  const [manualSlug, setManualSlug] = useState(Boolean(product.slug));
  const [mainImage, setMainImage] = useState(product.mainImage);
  const [gallery, setGallery] = useState(product.gallery);
  const [specs, setSpecs] = useState(Object.entries(product.specifications).length ? Object.entries(product.specifications) : [["", ""]]);

  const selectGallery = (url: string) => setGallery((current) => current.includes(url) ? current.filter((item) => item !== url) : current.length < 20 ? [...current, url] : current);
  const specsObject = Object.fromEntries(specs.filter(([key]) => key.trim()).map(([key, value]) => [key.trim(), value.trim()]));

  return (
    <form action={formAction} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_310px]">
      <input type="hidden" name="mainImage" value={mainImage} /><input type="hidden" name="gallery" value={JSON.stringify(gallery)} /><input type="hidden" name="specifications" value={JSON.stringify(specsObject)} />
      <div className="space-y-6">
        <section className="space-y-5 rounded-md border border-[#e1e6ec] bg-white p-6">
          <label><span>箱包产品名称</span><input name="name" required value={name} placeholder="例如：头层牛皮商务手提包" onChange={(event) => { const value = event.target.value; setName(value); if (!manualSlug) setSlug(toSlug(value)); }} /></label>
          <label><span>链接别名（Slug）</span><input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" value={slug} placeholder="full-grain-leather-business-tote" onChange={(event) => { setManualSlug(true); setSlug(toSlug(event.target.value)); }} /></label>
          <label><span>产品摘要</span><textarea name="shortDescription" rows={3} maxLength={500} defaultValue={product.shortDescription} placeholder="简要说明箱包类型、目标客户、材质与定制优势。" /></label>
          <label><span>产品详情</span><textarea name="description" rows={12} maxLength={50000} defaultValue={product.description} placeholder="介绍适用场景、结构、工艺、OEM/ODM 定制选项、起订量与交期等批发采购信息。" /></label>
        </section>
        <section className="rounded-md border border-[#e1e6ec] bg-white p-6"><h2 className="mb-4 text-base font-bold">箱包规格参数</h2><div className="space-y-2">{specs.map(([key, value], index) => <div className="grid grid-cols-[1fr_1fr_auto] gap-2" key={index}><input aria-label="规格名称" placeholder="主体材质" value={key} onChange={(event) => setSpecs((rows) => rows.map((row, rowIndex) => rowIndex === index ? [event.target.value, row[1]] : row))} /><input aria-label="规格内容" placeholder="头层牛皮" value={value} onChange={(event) => setSpecs((rows) => rows.map((row, rowIndex) => rowIndex === index ? [row[0], event.target.value] : row))} /><button className="px-2 text-slate-400 hover:text-red-600" type="button" onClick={() => setSpecs((rows) => rows.filter((_, rowIndex) => rowIndex !== index))} aria-label="删除该规格">×</button></div>)}</div><button className="mt-3 text-xs font-semibold text-[#a55734]" type="button" onClick={() => setSpecs((rows) => [...rows, ["", ""]])}>+ 添加规格</button></section>
        <section className="rounded-md border border-[#e1e6ec] bg-white p-6"><h2 className="text-base font-bold">箱包产品图片</h2><p className="mb-4 mt-1 text-xs text-slate-500">点击图片设为主图；勾选“详情图”组成产品图集。</p><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{media.map((item) => <div className={`overflow-hidden rounded border bg-white ${mainImage === item.url ? "border-[#b8663f] ring-2 ring-[#b8663f]/20" : "border-slate-200"}`} key={item.id}><button className="block aspect-square w-full bg-slate-50" type="button" onClick={() => setMainImage(item.url)}><img className="size-full object-cover" src={item.url} alt="" /></button><label className="flex items-center gap-2 p-2 text-[11px]"><input className="!size-3.5" type="checkbox" checked={gallery.includes(item.url)} onChange={() => selectGallery(item.url)} /><span className="truncate">详情图</span></label></div>)}{media.length === 0 ? <p className="col-span-full py-6 text-sm text-slate-500">请先在“图片管理”中上传箱包图片。</p> : null}</div></section>
      </div>
      <aside className="space-y-6">
        <section className="space-y-5 rounded-md border border-[#e1e6ec] bg-white p-5"><label><span>发布状态</span><select name="status" defaultValue={product.status}><option value="DRAFT">草稿</option><option value="PUBLISHED">已发布</option></select></label><label><span>箱包分类</span><select name="categoryId" required defaultValue={product.categoryId}><option value="" disabled>请选择分类</option>{categories.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>{mainImage ? <img className="aspect-square w-full rounded-md border border-slate-200 object-cover" src={mainImage} alt="已选产品主图" /> : null}<button className="w-full rounded-md bg-[#b8663f] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60" type="submit" disabled={pending}>{pending ? "正在保存…" : "保存箱包产品"}</button>{state?.error ? <p className="text-sm text-red-700" role="alert">{state.error}</p> : state && !state.error ? <p className="text-sm text-emerald-700" role="status">已保存。</p> : null}</section>
        <section className="space-y-5 rounded-md border border-[#e1e6ec] bg-white p-5"><div><h2 className="text-base font-bold">SEO 搜索优化</h2><p className="mt-1 text-xs text-slate-500">用于产品详情页的搜索标题与摘要。</p></div><label><span>SEO 标题</span><input name="seoTitle" maxLength={70} defaultValue={product.seoTitle} placeholder="例如：真皮商务手提包批发厂家" /></label><label><span>Meta 描述</span><textarea name="seoDescription" rows={5} maxLength={180} defaultValue={product.seoDescription} placeholder="说明品类、材质、OEM/ODM 能力与采购优势。" /></label></section>
      </aside>
    </form>
  );
}
