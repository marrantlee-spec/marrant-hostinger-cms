import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  // Always derive the locale from the URL, never from a client-supplied header.
  requestHeaders.set("x-marrant-locale", pathname === "/zh" || pathname.startsWith("/zh/") ? "zh-CN" : "en");
  requestHeaders.set("x-marrant-pathname", pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next|assets|favicon.ico|robots.txt|sitemap.xml).*)"],
};
