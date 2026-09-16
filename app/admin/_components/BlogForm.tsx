"use client";

import dynamic from "next/dynamic";
import { useActionState, useCallback, useState } from "react";
import type { ActionState } from "../_actions/cms";

const RichTextEditor = dynamic(() => import("./RichTextEditor"), { ssr: false, loading: () => <div className="h-[420px] animate-pulse rounded-md bg-slate-100" /> });
type Category = { id: string; name: string };
type Media = { id: string; url: string; filename: string };
type BlogValue = { title: string; slug: string; categoryId: string; coverImage: string; excerpt: string; content: Record<string, unknown>; author: string; seoTitle: string; seoDescription: string; status: "DRAFT" | "PUBLISHED" };
const empty: BlogValue = { title: "", slug: "", categoryId: "", coverImage: "", excerpt: "", content: { type: "doc", content: [{ type: "paragraph" }] }, author: "Marrant Team", seoTitle: "", seoDescription: "", status: "DRAFT" };
function toSlug(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

export function BlogForm({ action, categories, media, post = empty }: { action: (state: ActionState, formData: FormData) => Promise<ActionState>; categories: Category[]; media: Media[]; post?: BlogValue }) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [manualSlug, setManualSlug] = useState(Boolean(post.slug));
  const [coverImage, setCoverImage] = useState(post.coverImage);
  const [content, setContent] = useState(post.content);
  const updateContent = useCallback((value: Record<string, unknown>) => setContent(value), []);
  return (
    <form action={formAction} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_310px]">
      <input type="hidden" name="coverImage" value={coverImage} /><input type="hidden" name="content" value={JSON.stringify(content)} />
      <div className="space-y-6"><section className="space-y-5 rounded-md border border-[#e1e6ec] bg-white p-6"><label><span>文章标题</span><input name="title" required value={title} placeholder="例如：如何选择真皮箱包批发厂家" onChange={(event) => { const value = event.target.value; setTitle(value); if (!manualSlug) setSlug(toSlug(value)); }} /></label><label><span>链接别名（Slug）</span><input name="slug" required value={slug} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="how-to-choose-leather-bag-manufacturer" onChange={(event) => { setManualSlug(true); setSlug(toSlug(event.target.value)); }} /></label><label><span>文章摘要</span><textarea name="excerpt" rows={3} maxLength={500} defaultValue={post.excerpt} placeholder="面向箱包进口商、品牌方和采购商的简短摘要。" /></label></section><section className="rounded-md border border-[#e1e6ec] bg-white p-6"><h2 className="mb-4 text-base font-bold">采购指南正文</h2><RichTextEditor initialContent={post.content} media={media} onChange={updateContent} /></section></div>
      <aside className="space-y-6"><section className="space-y-5 rounded-md border border-[#e1e6ec] bg-white p-5"><label><span>发布状态</span><select name="status" defaultValue={post.status}><option value="DRAFT">草稿</option><option value="PUBLISHED">已发布</option></select></label><label><span>文章分类</span><select name="categoryId" required defaultValue={post.categoryId}><option value="" disabled>请选择分类</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label><span>作者</span><input name="author" defaultValue={post.author} /></label><div><span className="mb-2 block text-[13px] font-semibold text-slate-700">文章封面图</span><div className="grid grid-cols-3 gap-2">{media.map((item) => <button className={`aspect-square overflow-hidden rounded border ${coverImage === item.url ? "border-[#b8663f] ring-2 ring-[#b8663f]/20" : "border-slate-200"}`} type="button" key={item.id} onClick={() => setCoverImage(item.url)}><img className="size-full object-cover" src={item.url} alt="" /></button>)}</div></div>{coverImage ? <img className="aspect-[16/9] w-full rounded-md object-cover" src={coverImage} alt="已选封面图" /> : null}<button className="w-full rounded-md bg-[#b8663f] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60" disabled={pending} type="submit">{pending ? "正在保存…" : "保存文章"}</button>{state?.error ? <p className="text-sm text-red-700" role="alert">{state.error}</p> : state && !state.error ? <p className="text-sm text-emerald-700">已保存。</p> : null}</section><section className="space-y-5 rounded-md border border-[#e1e6ec] bg-white p-5"><div><h2 className="text-base font-bold">SEO 搜索优化</h2><p className="mt-1 text-xs text-slate-500">用于文章页面的搜索标题与摘要。</p></div><label><span>SEO 标题</span><input name="seoTitle" maxLength={70} defaultValue={post.seoTitle} placeholder="包含箱包品类与采购关键词" /></label><label><span>Meta 描述</span><textarea name="seoDescription" rows={5} maxLength={180} defaultValue={post.seoDescription} placeholder="概括文章对箱包采购商的价值。" /></label></section></aside>
    </form>
  );
}
