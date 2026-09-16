import { SignOut } from "@phosphor-icons/react/dist/ssr";
import { logout } from "../_actions/auth";
import { AdminNav } from "./AdminNav";

export function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  return (
    <div className="admin-shell grid min-h-screen grid-cols-[240px_minmax(0,1fr)]">
      <aside className="admin-sidebar sticky top-0 h-screen bg-[#17212d] px-4 py-6 text-white">
        <div className="px-2 text-lg font-semibold tracking-[.04em]">MARRANT <span className="text-[#cf7b52]">箱包管理</span></div>
        <AdminNav />
        <p className="absolute bottom-6 left-6 text-[11px] text-slate-500">箱包批发内容与询盘管理</p>
      </aside>
      <div className="min-w-0">
        <header className="flex h-[68px] items-center justify-end gap-4 border-b border-[#e4e7ec] bg-white px-8">
          <span className="hidden text-[12px] text-slate-500 sm:inline">{email}</span>
          <form action={logout}>
            <button className="flex items-center gap-2 rounded-md px-2.5 py-2 text-[12px] font-semibold text-slate-700 hover:bg-slate-100" type="submit"><SignOut size={18} /> 退出登录</button>
          </form>
        </header>
        <main className="admin-main p-8">{children}</main>
      </div>
    </div>
  );
}
