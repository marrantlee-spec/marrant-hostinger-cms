import { redirect } from "next/navigation";
import { getAdminSession } from "../../_lib/session";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  if (await getAdminSession()) redirect("/admin/dashboard");
  return (
    <main className="grid min-h-screen place-items-center bg-[#f4f6f8] px-5">
      <section className="w-full max-w-[420px] rounded-lg border border-[#e1e5ea] bg-white p-8 shadow-[0_16px_50px_rgb(18_32_51_/_0.08)]">
        <div className="text-lg font-semibold tracking-[.05em]">MARRANT <span className="text-[#b8663f]">箱包管理</span></div>
        <h1 className="admin-login-title mt-7">管理员登录</h1>
        <p className="mt-2 text-sm text-slate-500">管理箱包产品、采购指南、图片素材和客户询盘。</p>
        <LoginForm />
      </section>
    </main>
  );
}
