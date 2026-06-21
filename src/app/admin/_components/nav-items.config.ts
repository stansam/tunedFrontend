import {
  LayoutDashboard, ShoppingBag, Users, Star, CreditCard, MessageSquare, LayoutGrid, BookOpen
} from "lucide-react";
import type { ComponentType } from "react";

export interface NavItem {
  readonly title: string;
  readonly url: string;
  readonly icon: ComponentType<{ className?: string }>;
  readonly badgeKey?: "active_orders_count" | "payments_count" | "chat_count" | "testimonials_count";
}

export interface NavGroup {
  readonly label: string;
  readonly items: ReadonlyArray<NavItem>;
}

export const NAV_GROUPS: readonly NavGroup[] = [
  {
    label: "Platform",
    items: [
      { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
      { title: "Orders", url: "/admin/orders", icon: ShoppingBag, badgeKey: "active_orders_count" },
      { title: "Users", url: "/admin/users", icon: Users },
    ],
  },
  {
    label: "Management",
    items: [
      { title: "Testimonials", url: "/admin/testimonials", icon: Star, badgeKey: "testimonials_count" },
      { title: "Services", url: "/admin/services", icon: LayoutGrid },
      { title: "Payments", url: "/admin/payments", icon: CreditCard, badgeKey: "payments_count" },
      { title: "Blogs", url: "/admin/blogs", icon: BookOpen },
      { title: "Chat", url: "/admin/chats", icon: MessageSquare, badgeKey: "chat_count" },
    ],
  },
];
