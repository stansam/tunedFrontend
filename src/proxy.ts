import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const cookieName = process.env.SESSION_COOKIE_NAME || "tuned_session";
  const hasFlaskSession = request.cookies.has(cookieName);

  const isAuthRoute = path.startsWith("/auth");
  const isAdminRoute = path.startsWith("/admin");
  const isClientRoute = path.startsWith("/client");

  if (isAuthRoute && hasFlaskSession) {
    return NextResponse.redirect(new URL("/client", request.url));
  }

  if ((isAdminRoute || isClientRoute) && !hasFlaskSession) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/client/:path*", "/auth/:path*"],
};