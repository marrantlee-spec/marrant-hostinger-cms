"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function MediaUploader() {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function upload() {
    const file = input.current?.files?.[0];
    if (!file) return;
    setBusy(true); setMessage("");
    const body = new FormData(); body.set("file", file);
    const response = await fetch("/api/admin/media", { method: "POST", body });
    const result = await response.json().catch(() => ({ error: "图片上传失败。" }));
    setBusy(false);
    if (!response.ok) { setMessage(result.error ?? "图片上传失败。"); return; }
    if (input.current) input.current.value = "";
    setMessage("图片上传成功。"); router.refresh();
  }
  return <div className="flex flex-wrap items-center gap-3 rounded-md border border-[#e1e6ec] bg-white p-4"><input ref={input} className="!w-auto flex-1" type="file" accept="image/jpeg,image/png,image/webp,image/gif" aria-label="选择要上传的箱包图片" /><button className="rounded-md bg-[#b8663f] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60" type="button" onClick={upload} disabled={busy}>{busy ? "上传中…" : "上传图片"}</button>{message ? <p className="w-full text-xs text-slate-600" role="status">{message}</p> : null}</div>;
}
