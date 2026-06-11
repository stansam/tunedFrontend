import { cookies, headers } from "next/headers";
import { apiGet } from "@/api-client";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export const metadata = {
  title: "Admin Orders | TunedEssays",
  description: "Global orders management for administrators.",
};

export default async function AdminOrdersLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const headerStore = await headers();
  const userAgent = headerStore.get("user-agent") || "";
  const forwardedFor = headerStore.get("x-forwarded-for") || "";

  const extraHeaders: Record<string, string> = {};
  if (cookieHeader) extraHeaders["Cookie"] = cookieHeader;
  if (userAgent) extraHeaders["User-Agent"] = userAgent;
  if (forwardedFor) extraHeaders["X-Forwarded-For"] = forwardedFor;

  const result = await apiGet<{ is_admin: boolean }>("/profile", {
    cache: "no-store",
    headers: extraHeaders,
  });

  if (!result.ok || !result.data?.is_admin) {
    redirect("/auth/login?callbackUrl=/admin/orders");
  }

  return <>{children}</>;
}
