"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function AdminDashboardHeader() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    if (pathname.includes("dashboard")) return "Dashboard";
    if (pathname.includes("orders")) return "Orders";
    if (pathname.includes("users")) return "Users";
    if (pathname.includes("payments")) return "Payments";
    if (pathname.includes("analytics")) return "Analytics";
    if (pathname.includes("services")) return "Services";
    if (pathname.includes("blogs")) return "Blogs";
    if (pathname.includes("testimonials")) return "Testimonials";
    if (pathname.includes("samples")) return "Samples";
    if (pathname.includes("chats")) return "Live Chat";
    if (pathname.includes("marketing")) return "Marketing";
    if (pathname.includes("system")) return "System Settings";
    return "Admin Portal";
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{getPageTitle()}</h1>
      </div>
    </header>
  );
}
