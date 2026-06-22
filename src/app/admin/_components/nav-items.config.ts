import {
  LayoutDashboard, ShoppingBag, Users, Star, CreditCard, MessageSquare, LayoutGrid, BookOpen, FileText
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
    label: "Finance",
    items: [
      { title: "Payments", url: "/admin/payments", icon: CreditCard, badgeKey: "payments_count" },
    ]
  },
  {
    label: "Content",
    items: [
      { title: "Blogs", url: "/admin/blogs", icon: BookOpen },
      { title: "Services", url: "/admin/services", icon: LayoutGrid },
      { title: "Testimonials", url: "/admin/testimonials", icon: Star, badgeKey: "testimonials_count" },
      { title: "Samples", url: "/admin/samples", icon: FileText },
    ]
  },
  {
    label: "Operations",
    items: [
      { title: "Live Chat", url: "/admin/chats", icon: MessageSquare, badgeKey: "chat_count" },
    ],
  },
];
