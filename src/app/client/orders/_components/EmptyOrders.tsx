"use client";

import { Route } from "next";
import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type { EmptyOrdersProps } from "../_props";

export function EmptyOrders({ hasFilters, onClearFilters }: EmptyOrdersProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white py-16 text-center shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
        <PackageSearch className="h-7 w-7 text-slate-400" />
      </div>

      <div className="px-4">
        <p className="text-base font-semibold text-slate-800">
          {hasFilters ? "No orders match your filters" : "No orders yet"}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          {hasFilters
            ? "Try adjusting your search or removing filters."
            : "Place your first order to get started."}
        </p>
      </div>

      {hasFilters ? (
        <Button variant="outline" size="sm" onClick={onClearFilters}>
          Clear filters
        </Button>
      ) : (
        <Button
          size="sm"
          className="bg-emerald-600 text-white hover:bg-emerald-700"
          onClick={() => router.push("/client/orders/new" as Route)}
        >
          + New Order
        </Button>
      )}
    </div>
  );
}
