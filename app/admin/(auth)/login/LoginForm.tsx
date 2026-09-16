"use client";

import { useActionState } from "react";
import { login } from "../../_actions/auth";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="mt-8 space-y-5">
      <label><span>管理员邮箱</span><input autoComplete="username" name="email" type="email" required /></label>
      <label><span>密码</span><input autoComplete="current-password" name="password" type="password" required /></label>
      {state?.error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{state.error}</p> : null}
      <button className="w-full rounded-md bg-[#b8663f] px-4 py-3 text-sm font-semibold text-white hover:bg-[#a55734] disabled:opacity-60" disabled={pending} type="submit">{pending ? "正在登录…" : "登录后台"}</button>
    </form>
  );
}
