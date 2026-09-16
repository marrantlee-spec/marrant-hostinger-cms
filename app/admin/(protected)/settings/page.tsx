import { requireAdmin } from "../../_lib/session";
import { PageHeader } from "../../_components/PageHeader";

export default async function SettingsPage() {
  const admin = await requireAdmin();
  const checks = [
    ["PostgreSQL", Boolean(process.env.DATABASE_URL)],
    ["会话密钥", Boolean(process.env.SESSION_SECRET)],
    ["Vercel Blob", Boolean(process.env.BLOB_READ_WRITE_TOKEN)],
    ["询盘通知邮件", Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL)],
  ] as const;
  return <><PageHeader title="系统设置" description="查看管理员账号与后台服务配置状态。" /><div className="max-w-2xl space-y-6"><section className="rounded-md border border-[#e1e6ec] bg-white p-6"><h2 className="font-bold">管理员账号</h2><dl className="mt-4 grid grid-cols-[150px_1fr] gap-y-3 text-sm"><dt className="text-slate-500">登录邮箱</dt><dd>{admin.email}</dd><dt className="text-slate-500">创建时间</dt><dd>{admin.createdAt.toLocaleString("zh-CN")}</dd><dt className="text-slate-500">登录有效期</dt><dd>8 小时</dd></dl></section><section className="rounded-md border border-[#e1e6ec] bg-white p-6"><h2 className="font-bold">服务配置</h2><div className="mt-4 divide-y divide-slate-100">{checks.map(([label, ready]) => <div className="flex items-center justify-between py-3 text-sm" key={label}><span>{label}</span><span className={ready ? "text-emerald-700" : "text-amber-700"}>{ready ? "已配置" : "待配置"}</span></div>)}</div></section></div></>;
}
