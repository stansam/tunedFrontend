import { DM_Sans } from "next/font/google";
import "@/app/globals.css";
import { AuthProvider } from "@/lib/auth/Context";
import { getServerAuthUser } from "@/lib/services/auth.server.service";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LegalModalProvider } from "@/lib/contexts/LegalModalContext";
import { Toaster } from "sonner";
// import { redirect } from "next/navigation";
import type { AuthUser } from "@/lib/types/auth.type";

import { NotificationProvider } from "@/lib/contexts/NotificationContext";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: "Complete Your Order | TunedEssays",
  description: "Configure and place your order.",
};

export default async function OrderLayout({ children }: { children: React.ReactNode }) {
  const authResult = await getServerAuthUser();
  const initialUser: AuthUser | null = authResult.ok ? authResult.user : null;
  // if (!authResult.ok) {
  //   redirect("/auth/login?callbackUrl=/order");
  // }

  return (
    <html lang="en" className={dmSans.variable}>
      <body className={`${dmSans.className} antialiased bg-[#e8e6e1]`}>
        <AuthProvider initialUser={initialUser} skipInitialFetch={initialUser !== null }>
      <QueryProvider>
        <NotificationProvider>
        <TooltipProvider delayDuration={300}>
          <LegalModalProvider>
            <div className="flex min-h-screen flex-col">
              {children}
            </div>
          </LegalModalProvider>
        </TooltipProvider>
        <Toaster position="top-center" richColors theme="light" />
        </NotificationProvider>
      </QueryProvider>
    </AuthProvider>
      </body>
    </html>
  );
}
