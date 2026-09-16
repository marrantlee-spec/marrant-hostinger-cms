"use client";

import { useActionState, useState } from "react";
import { createCategory } from "../_actions/cms";

function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

export function CategoryForm() {
  const [state, action, pending] = useActionState(createCategory, undefined);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  return <form action={action} className="space-y-4 rounded-md border border-[#e1e6ec] bg-white p-5"><h2 className="text-base font-bold">新增分类</h2><label><span>分类名称</span><input name="name" placeholder="例如：真皮手提包" required value={name} onChange={(event) => { setName(event.target.value); setSlug(slugify(event.target.value)); }} /></label><label><span>Slug</span><input name="slug" placeholder="leather-handbags" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" required value={slug} onChange={(event) => setSlug(slugify(event.target.value))} /></label><label><span>分类用途</span><select name="type"><option value="PRODUCT">箱包产品</option><option value="BLOG">行业文章</option></select></label><button className="w-full rounded-md bg-[#b8663f] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60" disabled={pending}>{pending ? "添加中…" : "添加分类"}</button>{state?.error ? <p className="text-sm text-red-700">{state.error}</p> : state && !state.error ? <p className="text-sm text-emerald-700">分类添加成功。</p> : null}</form>;
}
