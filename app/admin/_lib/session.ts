import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "../../../lib/prisma";

const COOKIE_NAME = "marrant_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

type SessionPayload = { adminId: string; email: string };

function getSecret() {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("SESSION_SECRET 必须至少包含 32 个字符。");
  return new TextEncoder().encode(value);
}

export async function createAdminSession(payload: SessionPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecret());

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function deleteAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export const getAdminSession = cache(async () => {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    if (typeof payload.adminId !== "string" || typeof payload.email !== "string") return null;

    const admin = await prisma.adminUser.findUnique({
      where: { id: payload.adminId },
      select: { id: true, email: true, createdAt: true },
    });
    return admin;
  } catch {
    return null;
  }
});

export async function requireAdmin() {
  const admin = await getAdminSession();
  if (!admin) redirect("/admin/login");
  return admin;
}

export async function assertAdmin() {
  const admin = await getAdminSession();
  if (!admin) throw new Error("登录已失效，请重新登录。");
  return admin;
}
