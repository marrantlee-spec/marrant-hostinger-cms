"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { createAdminSession, deleteAdminSession } from "../_lib/session";

export type LoginState = { error?: string } | undefined;

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(200),
});

export async function login(_: LoginState, formData: FormData): Promise<LoginState> {
  const result = loginSchema.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!result.success) return { error: "请输入有效的邮箱和密码。" };

  const admin = await prisma.adminUser.findUnique({ where: { email: result.data.email } });
  const valid = admin ? await bcrypt.compare(result.data.password, admin.passwordHash) : false;
  if (!valid || !admin) return { error: "邮箱或密码错误。" };

  await createAdminSession({ adminId: admin.id, email: admin.email });
  redirect("/admin/dashboard");
}

export async function logout() {
  await deleteAdminSession();
  redirect("/admin/login");
}
