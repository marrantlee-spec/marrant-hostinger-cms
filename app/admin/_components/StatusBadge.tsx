export function StatusBadge({ status }: { status: string }) {
  const published = status === "PUBLISHED";
  const label = published ? "已发布" : status === "DRAFT" ? "草稿" : status === "NEW" ? "新询盘" : status === "IN_PROGRESS" ? "跟进中" : status === "CLOSED" ? "已关闭" : status;
  return <span className={`inline-flex rounded px-2 py-1 text-[11px] font-semibold ${published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{label}</span>;
}
