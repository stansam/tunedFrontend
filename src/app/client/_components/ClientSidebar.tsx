"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar, SidebarContent, SidebarFooter,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarSeparator
} from "@/components/ui/sidebar";
import Logo from "@/components/shared/logo";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare01Icon, Folder01Icon, Wallet01Icon,
  Calendar01Icon, UserIcon, Settings05Icon, GiftIcon, SchoolBellIcon,
} from "@hugeicons/core-free-icons";
import { Badge } from "@/components/ui/badge";
import type { AuthUser } from "@/lib/types/auth.type";
import { useNavStats } from "../_hooks/useNavStats";

interface ClientSidebarProps extends React.ComponentProps<typeof Sidebar> {
  readonly user: AuthUser | null;
}

export function ClientSidebar({ user, ...props }: ClientSidebarProps) {
  const pathname = usePathname();
  const { activeOrdersCount, balance } = useNavStats();

  const navItems = [
    { label: "Workspace",
      items: [
        { title: "Dashboard", url: "/client/dashboard", icon: DashboardSquare01Icon, badge: undefined, label: undefined },
        { title: "My Orders", url: "/client/orders", icon: Folder01Icon, badge: activeOrdersCount > 0 ? activeOrdersCount : undefined, label: undefined },
        { title: "Planner", url: "/client/planner", icon: Calendar01Icon, badge: undefined, label: undefined },
      ]
    },
    { label: "Finance",
      items: [
        { title: "My Balance", url: "/client/balance", icon: Wallet01Icon, badge: undefined, label: `$${balance.toFixed(2)}` },
        { title: "Referrals", url: "/client/referrals", icon: GiftIcon, badge: undefined, label: undefined }
      ],
    },
    { label: "Account",
      items: [
        { title: "Profile", url: "/client/profile", icon: UserIcon, badge: undefined, label: undefined },
        { title: "Settings", url: "/client/settings", icon: Settings05Icon, badge: undefined, label: undefined },
        { title: "Notifications", url: "/client/notifications", icon: SchoolBellIcon, badge: undefined, label: undefined },
      ]
    }
  ];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-2 hover:bg-white/5 transition-colors rounded-xl ">
              <Link href={{pathname: "/client/dashboard"}} className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <Logo />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-semibold text-white">TunedEssays</span>
                  <span className="text-xs text-emerald-400">Client Portal</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator className="bg-white/10" />
      <SidebarContent className="px-2">
        {navItems.map((group, groupIndex) => (
          <React.Fragment key={group.label}>
            <div className="px-2 pt-4 pb-2">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {group.label}
              </p>
            </div>

        <SidebarMenu className="mt-4 px-2">
          {/* {navItems.map((item) => ( */}
          {group.items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title} className="text-slate-300 hover:bg-white/5 hover:text-white data-[active=true]:bg-white/10 data-[active=true]:text-white transition-colors">
                <Link href={{pathname: item.url}} className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon icon={item.icon} strokeWidth={2} />
                    <span>{item.title}</span>
                  </div>
                  {item.badge !== undefined && <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-xs">{item.badge}</Badge>}
                  {item.label !== undefined && <span className="ml-auto text-xs font-medium text-emerald-600">{item.label}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        {groupIndex < navItems.length - 1 && (
              <SidebarSeparator className="my-3 bg-white/10" />
            )}
          </React.Fragment>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-white/10">
        <div className="rounded-xl bg-white/3 hover:bg-white/5 transition-colors p-2">
          <NavUser user={user ? { name: user.name, email: user.email, avatar: user.avatar_url ?? "" } : { name: "Guest", email: "", avatar: "" }} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
