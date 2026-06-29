// import { redirect } from "next/navigation";
import { DM_Sans } from "next/font/google";
import "@/app/globals.css";
import { AuthProvider } from "@/lib/auth/Context";
import type { AuthUser } from "@/lib/types/auth.type";
import { getServerAuthUser } from "@/lib/services/auth.server.service";
import { NotificationProvider } from "@/lib/contexts/NotificationContext";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LegalModalProvider } from "@/lib/contexts/LegalModalContext";
import { Toaster } from "sonner";
import { AdminSidebar } from "./_components/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminDashboardHeader } from "./_components/AdminDashboardHeader";
// import { cookies, headers } from "next/headers";
// import { apiGet } from "@/api-client";
import type { ReactNode } from "react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

export const metadata = {
  title: "Admin Portal | TunedEssays",
  description: "Admin Portal for TunedEssays",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminRootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const authResult = await getServerAuthUser();
  // if (!authResult.ok) {
  //   redirect("/auth/login?callbackUrl=/admin/dashboard");
  // }

  // // Forward cookies + headers for SSR auth
  // const cookieStore = await cookies();
  // const cookieHeader = cookieStore.toString();
  // const headerStore = await headers();
  // const extraHeaders: Record<string, string> = {};
  // if (cookieHeader) extraHeaders["Cookie"] = cookieHeader;
  // const userAgent = headerStore.get("user-agent");
  // if (userAgent) extraHeaders["User-Agent"] = userAgent;
  // const forwardedFor = headerStore.get("x-forwarded-for");
  // if (forwardedFor) extraHeaders["X-Forwarded-For"] = forwardedFor;

  // const profileResult = await apiGet<{ is_admin: boolean }>("/client/profile", {
  //   cache: "no-store",
  //   headers: extraHeaders,
  // });

  // if (!profileResult.ok || !profileResult.data?.is_admin) {
  //   redirect("/auth/login?callbackUrl=/admin/dashboard");
  // }

  const initialUser: AuthUser | null = authResult.ok ? authResult.user : null;

  return (
    <html lang="en" className={dmSans.variable}>
      <body className={`${dmSans.className} antialiased bg-(--admin-bg)`} style={{ scrollBehavior: "smooth" }}>
         <AuthProvider initialUser={initialUser} skipInitialFetch={initialUser !== null}>
          <QueryProvider>
          <NotificationProvider>
            <LegalModalProvider>
              <TooltipProvider delayDuration={300}>
                <SidebarProvider
                  style={
                    {
                      "--sidebar-width": "calc(var(--spacing) * 64)",
                      "--header-height": "calc(var(--spacing) * 16)",
                    } as React.CSSProperties
                  }
                >
                  <AdminSidebar user={initialUser} />
                  <SidebarInset>
                    <AdminDashboardHeader />
                    <div className="flex flex-1 flex-col p-4 md:p-8">
                      {children}
                    </div>
                  </SidebarInset>
                </SidebarProvider>
              </TooltipProvider>
            </LegalModalProvider>
            <Toaster position="top-center" richColors theme="light" />
          </NotificationProvider>
          </QueryProvider>
         </AuthProvider>
      </body>
    </html>
  );
}
