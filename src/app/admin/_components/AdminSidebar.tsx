"use client";
import * as React from "react";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useNavStats } from "../_hooks/useNavStats";
import { NAV_GROUPS } from "./nav-items.config";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar, SidebarContent, SidebarFooter,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarSeparator
} from "@/components/ui/sidebar";
import Logo from "@/components/shared/logo";
import { Badge } from "@/components/ui/badge";
import type { AuthUser } from "@/lib/types/auth.type";

interface AdminSidebarProps extends React.ComponentProps<typeof Sidebar> {
  readonly user: AuthUser | null;
}

export function AdminSidebar({ user, ...props }: AdminSidebarProps) {
  const pathname = usePathname();
  const stats = useNavStats();

  const enrichedGroups = useMemo(
    () =>
      NAV_GROUPS.map((group) => ({
        ...group,
        items: group.items.map((item) => ({
          ...item,
          badge: item.badgeKey ? stats[item.badgeKey] || 0 : undefined,
          isActive: pathname === item.url,
        })),
      })),
    [pathname, stats],
  );

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-2 hover:bg-white/5 transition-colors rounded-xl">
              <Link href={{pathname: "/client/dashboard"}} className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <Logo />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-semibold text-white">TunedEssays</span>
                  <span className="text-xs text-emerald-400">Admin Portal</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator className="bg-white/10" />
      <SidebarContent className="px-2">
        {enrichedGroups.map((group, groupIndex) => (
          <React.Fragment key={group.label}>
            <div className="px-2 pt-4 pb-2">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{group.label}</p>
            </div>
            <SidebarMenu className="mt-4 px-2">
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title} className="text-slate-300 hover:bg-white/5 hover:text-white data-[active=true]:bg-white/10 data-[active=true]:text-white transition-colors">
                    <Link href={{pathname: item.url}} className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{item.badge}</Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            {groupIndex < enrichedGroups.length - 1 && <SidebarSeparator className="my-3 bg-white/10" />}
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
