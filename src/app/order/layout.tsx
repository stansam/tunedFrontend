import { DM_Sans } from "next/font/google";
import "@/app/globals.css";
import { AuthProvider } from "@/lib/auth/Context";
import { getServerAuthUser } from "@/lib/services/auth.server.service";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { redirect } from "next/navigation";

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
  
  if (!authResult.ok) {
    redirect("/auth/login?callbackUrl=/order");
  }

  return (
    <html lang="en" className={dmSans.variable}>
      <body className={`${dmSans.className} antialiased bg-[#e8e6e1]`}>
        <AuthProvider initialUser={authResult.user} skipInitialFetch={true}>
          <QueryProvider>
            <TooltipProvider delayDuration={300}>
              <div className="flex min-h-screen flex-col">
                {children}
              </div>
            </TooltipProvider>
            <Toaster position="top-center" richColors theme="light" />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
