import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getAdminSession } from "../../../admin/_lib/session";

export const runtime = "nodejs";
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const maxBytes = 8 * 1024 * 1024;

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;
  try { return new URL(origin).host === host; } catch { return false; }
}

export async function POST(request: Request) {
  if (!await getAdminSession()) return NextResponse.json({ error: "登录已失效，请重新登录。" }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "请求来源无效。" }, { status: 403 });
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File) || !allowedTypes.has(file.type) || file.size > maxBytes) return NextResponse.json({ error: "请上传不超过 8 MB 的 JPG、PNG、WebP 或 GIF 图片。" }, { status: 422 });
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(-120) || "image";
  const blob = await put(`cms/${safeName}`, file, { access: "public", addRandomSuffix: true });
  const media = await prisma.media.create({ data: { url: blob.url, pathname: blob.pathname, filename: file.name.slice(0, 255), mimeType: file.type, size: file.size } });
  return NextResponse.json(media, { status: 201 });
}
