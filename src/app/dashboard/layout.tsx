import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";

export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="min-h-screen bg-[#e8e6e1] flex flex-col pt-16 lg:pt-0">
        <main className="flex-1 w-full mx-auto max-w-7xl p-4 md:p-8 space-y-6 lg:space-y-8">
          {children}
        </main>
      </div>
    </TooltipProvider>
  );
}
