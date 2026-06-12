"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const PAGE_TITLES = new Map<string, string>([
  ["dashboard", "Dashboard"],
  ["orders", "Orders"],
  ["users", "Users"],
  ["testimonials", "Testimonials"],
  ["payments", "Payments"],
  ["chat", "Chat"],
  ["chats", "Live Chat"],
  ["analytics", "Analytics"],
  ["services", "Services"],
  ["blogs", "Blogs"],
  ["samples", "Samples"],
  ["marketing", "Marketing"],
  ["system", "System Settings"],
]);

function getPageTitle(pathname: string): string {
  const segment = pathname.split("/")[2] ?? "";
  return PAGE_TITLES.get(segment) ?? "Admin Portal";
}

export function AdminDashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h2 className="text-base font-medium">{getPageTitle(pathname)}</h2>
      </div>
    </header>
  );
}
