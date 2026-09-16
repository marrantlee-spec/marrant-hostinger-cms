import { prisma } from "../../../../lib/prisma";
import { deleteMedia } from "../../_actions/cms";
import { MediaUploader } from "../../_components/MediaUploader";
import { PageHeader } from "../../_components/PageHeader";

export default async function MediaPage() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });
  return <><PageHeader title="图片管理" description="集中管理箱包产品图、细节图和文章配图；文件存储于 Vercel Blob，数据库仅保存 URL 与元数据。" /><MediaUploader /><div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">{media.map((item) => <article className="overflow-hidden rounded-md border border-[#e1e6ec] bg-white" key={item.id}><img className="aspect-square w-full bg-slate-50 object-cover" src={item.url} alt={item.filename} /><div className="p-3"><p className="truncate text-xs font-semibold" title={item.filename}>{item.filename}</p><p className="mt-1 text-[10px] text-slate-400">{Math.ceil(item.size / 1024)} KB</p><form className="mt-3" action={deleteMedia}><input type="hidden" name="id" value={item.id} /><button className="text-[11px] font-semibold text-red-700">删除</button></form></div></article>)}{media.length === 0 ? <p className="col-span-full py-12 text-center text-sm text-slate-500">暂无图片，请上传箱包主图或细节图。</p> : null}</div></>;
}
