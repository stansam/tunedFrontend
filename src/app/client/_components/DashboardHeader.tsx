"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { NotificationBell } from "@/app/(main)/_components/NotificationBell";

export function DashboardHeader() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    if (pathname.includes("dashboard")) return "Dashboard";
    if (pathname.includes("orders")) return "My Orders";
    if (pathname.includes("balance")) return "My Balance";
    if (pathname.includes("planner")) return "Planner";
    if (pathname.includes("profile")) return "Profile";
    if (pathname.includes("settings")) return "Settings";
    return "Client Portal";
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 px-4 lg:px-6">
      <div className="flex items-center gap-1 lg:gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{getPageTitle()}</h1>
      </div>
      <div className="flex items-center gap-4">
        <NotificationBell />
      </div>
    </header>
  );
}
