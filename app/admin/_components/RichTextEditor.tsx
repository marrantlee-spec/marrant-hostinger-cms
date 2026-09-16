"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { TableKit } from "@tiptap/extension-table";

type Media = { id: string; url: string; filename: string };

export default function RichTextEditor({ initialContent, media, onChange }: { initialContent: Record<string, unknown>; media: Media[]; onChange: (content: Record<string, unknown>) => void }) {
  const [imageUrl, setImageUrl] = useState(media[0]?.url ?? "");
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Image.configure({ allowBase64: false }), Link.configure({ openOnClick: false, protocols: ["https", "http"] }), TableKit],
    content: initialContent,
    editorProps: { attributes: { "aria-label": "文章正文", class: "focus:outline-none" } },
    onUpdate: ({ editor: current }) => onChange(current.getJSON() as Record<string, unknown>),
  });

  useEffect(() => { if (editor) onChange(editor.getJSON() as Record<string, unknown>); }, [editor, onChange]);
  if (!editor) return <div className="h-[420px] animate-pulse bg-slate-50" />;

  const promptLink = () => {
    const href = window.prompt("请输入链接地址", editor.getAttributes("link").href ?? "https://");
    if (href === null) return;
    if (!href) editor.chain().focus().unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
  };
  const button = "rounded border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold hover:bg-slate-100";
  return (
    <div className="overflow-hidden rounded-md border border-[#dfe4ea] bg-white">
      <div className="flex flex-wrap gap-1.5 border-b border-slate-200 bg-slate-50 p-2">
        <button className={button} type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button className={button} type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
        <button className={button} type="button" onClick={() => editor.chain().focus().setParagraph().run()}>正文</button>
        <button className={button} type="button" onClick={() => editor.chain().focus().toggleBold().run()}>加粗</button>
        <button className={button} type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>无序列表</button>
        <button className={button} type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}>有序列表</button>
        <button className={button} type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()}>引用</button>
        <button className={button} type="button" onClick={promptLink}>链接</button>
        <button className={button} type="button" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>表格</button>
        <select className="!w-44 !px-2 !py-1 text-[11px]" aria-label="选择文章图片" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)}><option value="">选择图片</option>{media.map((item) => <option key={item.id} value={item.url}>{item.filename}</option>)}</select>
        <button className={button} disabled={!imageUrl} type="button" onClick={() => imageUrl && editor.chain().focus().setImage({ src: imageUrl }).run()}>插入图片</button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
