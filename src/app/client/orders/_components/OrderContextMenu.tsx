"use client";

import { Route } from "next";
import { MoreVertical, Eye, FileText, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import type { OrderContextMenuProps } from "../_props";

export function OrderContextMenu({ order }: OrderContextMenuProps) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 text-slate-400 hover:text-slate-700"
          aria-label={`Options for order ${order.order_number}`}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onClick={() => router.push(`/client/orders/${order.order_number}` as Route)}
        >
          <Eye className="h-4 w-4" />
          View Details
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onClick={() => router.push(`/client/orders/${order.order_number}/files` as Route)}
        >
          <FileText className="h-4 w-4" />
          View Files
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onClick={() => router.push(`/client/orders/${order.order_number}/revision` as Route)}
        >
          <RefreshCcw className="h-4 w-4" />
          Request Revision
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
