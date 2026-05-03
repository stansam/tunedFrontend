import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/client/:path*",
    "/admin/:path*",
    "/auth/login",
    "/auth/register",
  ],
};

function sanitizeProxyPath(path: string): string {
  return path.replace(/[^\w/.\-%~]/g, "");
}

const SESSION_COOKIE_NAME =
  process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME ?? "tuned_session";

function isProtectedRoute(pathname: string): boolean {
  return (
    pathname.startsWith("/client") ||
    pathname.startsWith("/admin")
  );
}

function isAuthRoute(pathname: string): boolean {
  return (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register")
  );
}

function getSubdomain(host: string | null): string | null {
  if (!host) return null;

  const parts = host.split(".");
  
  if (!parts || parts.length <= 2) return null;
  
  if (host.includes("localhost")) {
    const sub = host.split(".")[0];
    return sub !== "localhost" ? sub as string : null;
  }

  if (parts.length > 2) {
    return parts[0] as string;
  }

  return null;
}

export function proxy(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();
  const originalPath = url.pathname;
  const host = request.headers.get("host");
  const subdomain = getSubdomain(host);

  if (subdomain === "app") {
    url.pathname = `/client${originalPath}`;
    // return NextResponse.rewrite(url);
  }

  if (subdomain === "admin") {
    url.pathname = `/admin${originalPath}`;
    // return NextResponse.rewrite(url);
  }

  if (subdomain === "auth") {
    url.pathname = `/auth${originalPath}`;
    // return NextResponse.rewrite(url);
  }

  if (subdomain === "order") {
    url.pathname = `/order${originalPath}`;
    // return NextResponse.rewrite(url);
  }

  const pathname = url.pathname; //const {pathname} = request.nextUrl
  const hasSession = request.cookies.has(SESSION_COOKIE_NAME);

  if (isProtectedRoute(pathname) && !hasSession) {
    const loginUrl = new URL("/auth/login", request.url);
    const safePath = sanitizeProxyPath(pathname);
    loginUrl.searchParams.set("callbackUrl", safePath);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute(pathname) && hasSession) {
    const dashboard = new URL(
      process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL ?? "/client/dashboard",
      request.url,
    );
    return NextResponse.redirect(dashboard);
  }

  if (url.pathname !== originalPath) {
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}