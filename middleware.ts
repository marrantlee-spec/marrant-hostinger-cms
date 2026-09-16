import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isProtectedAdmin = pathname.startsWith("/admin/") && pathname !== "/admin/login";
  if (isProtectedAdmin && !request.cookies.has("marrant_admin_session")) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  const requestHeaders = new Headers(request.headers);
  // Always derive the locale from the URL, never from a client-supplied header.
  requestHeaders.set("x-marrant-locale", pathname === "/zh" || pathname.startsWith("/zh/") ? "zh-CN" : "en");
  requestHeaders.set("x-marrant-pathname", pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next|assets|favicon.ico|robots.txt|sitemap.xml).*)"],
};
