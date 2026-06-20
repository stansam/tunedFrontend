import { NextRequest, NextResponse } from "next/server";

export const config = {
  // matcher: [
  //   "/client/:path*",
  //   "/admin/:path*",
  //   "/order/:path*",
  //   "/auth/login",
  //   "/auth/register",
  // ],
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

function sanitizeProxyPath(path: string): string {
  return path.replace(/[^\w/.\-%~]/g, "");
}

const SESSION_COOKIE_NAME =
  process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME ?? "tuned_session";
const ALLOWED_SUBDOMAINS = ["app", "admin", "auth", "order"] as const;
type AllowedSubdomain = (typeof ALLOWED_SUBDOMAINS)[number];

const SUBDOMAIN_PATH_MAP: Record<AllowedSubdomain, string> = {
  app:   "/client",
  admin: "/admin",
  auth:  "/auth",
  order: "/order",
};

function isProtectedRoute(pathname: string): boolean {
  return (
    pathname.startsWith("/client") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/order")
  );
}

function isAuthRoute(pathname: string): boolean {
  return (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register") ||
    pathname.startsWith("/auth/register/verify-email") ||
    pathname.startsWith("/auth/register/verify-email/confirm")
  );
}

// function getSubdomain(host: string | null): string | null {
//   if (!host) return null;

//   // const parts = host.split(".");
//   const cleanHost = host?.split(":")[0];
//   const parts = cleanHost?.split(".") ?? [];
  
//   if (!parts || parts.length <= 2) return null;
  
//   if (host.includes("localhost")) {
//     const sub = host.split(".")[0];
//     return sub !== "localhost" ? sub as string : null;
//   }

//   if (parts.length > 2) {
//     return parts[0] as string;
//   }

//   return null;
// }

function getSubdomain(host: string | null): AllowedSubdomain | null {
  if (!host) return null;

  const cleanHost = host?.split(":")[0]; // strip port
  const parts = cleanHost?.split(".") ?? [];

  let candidate: string | null = null;

  if (!parts || parts.length <= 2) return null;

  if (cleanHost && cleanHost.includes("localhost")) {
    candidate = parts.length > 1 ? parts[0] as string : null;
  } else if (parts.length > 2) {
    candidate = parts[0] as string;
  }

  if (candidate && (ALLOWED_SUBDOMAINS as readonly string[]).includes(candidate)) {
    return candidate as AllowedSubdomain;
  }

  return null;
}

export function proxy(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();
  const originalPath = url.pathname;
  const host = request.headers.get("host");
  const subdomain = getSubdomain(host);

  const enableSubdomains = process.env.ENABLE_SUBDOMAIN_ROUTING === "true";

  if (enableSubdomains && subdomain) {
    // if (subdomain === "app" && !originalPath.startsWith("/client")) {
    //   url.pathname = `/client${originalPath}`;
    // } else if (subdomain === "admin" && !originalPath.startsWith("/admin")) {
    //   url.pathname = `/admin${originalPath}`;
    // } else if (subdomain === "auth" && !originalPath.startsWith("/auth")) {
    //   url.pathname = `/auth${originalPath}`;
    // } else if (subdomain === "order" && !originalPath.startsWith("/order")) {
    //   url.pathname = `/order${originalPath}`;
    // }
    const basePath = SUBDOMAIN_PATH_MAP[subdomain];

    if (!originalPath.startsWith(basePath)) {
      url.pathname = `${basePath}${originalPath === "/" ? "" : originalPath}`;
    }
  }

  const pathname = url.pathname; //const {pathname} = request.nextUrl
  const hasSession = request.cookies.has(SESSION_COOKIE_NAME);

  if (isProtectedRoute(pathname) && !hasSession) {
    const loginBase = enableSubdomains
      ? `https://auth.${process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "tunedessays.com"}/login`
      : new URL("/auth/login", request.url).toString();
    // const loginUrl = new URL("/auth/login", request.url);
    const loginUrl = new URL(loginBase);
    loginUrl.searchParams.set("callbackUrl", sanitizeProxyPath(pathname));
    // const safePath = sanitizeProxyPath(pathname);
    // loginUrl.searchParams.set("callbackUrl", safePath);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute(pathname) && hasSession) {
    // const dashboard = new URL(
    //   process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL ?? "/client/dashboard",
    //   request.url,
    // );
    const redirectBase = enableSubdomains
      ? `https://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "tunedessays.com"}/dashboard`
      : (process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL ?? "/client/dashboard");
    // return NextResponse.redirect(dashboard);
    return NextResponse.redirect(new URL(redirectBase, request.url));
  }

  if (url.pathname !== originalPath) {
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}