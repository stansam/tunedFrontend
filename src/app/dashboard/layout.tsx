import { TooltipProvider } from "@/components/ui/tooltip";
import { DM_Sans } from "next/font/google";
import React from "react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className={`${dmSans.className} antialiased`}>
        
        <TooltipProvider delayDuration={300}>
          <div className="min-h-screen bg-[#e8e6e1] flex flex-col pt-16 lg:pt-0">
            <main className="flex-1 w-full mx-auto max-w-7xl p-4 md:p-8 space-y-6 lg:space-y-8">
              {children}
            </main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
