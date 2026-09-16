import Link from "next/link";

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: { href: string; label: string } }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div><h1 className="admin-page-title text-[#152238]">{title}</h1>{description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}</div>
      {action ? <Link className="rounded-md bg-[#b8663f] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm hover:bg-[#a55734]" href={action.href}>{action.label}</Link> : null}
    </div>
  );
}
