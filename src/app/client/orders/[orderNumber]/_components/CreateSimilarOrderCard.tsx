"use client";

import { Plus, GitFork } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { CreateSimilarOrderCardProps } from "../_props";

export function CreateSimilarOrderCard({ orderNumber }: CreateSimilarOrderCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(
      `/client/orders/new?from=${encodeURIComponent(orderNumber)}`,
    );
  };

  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
      {/* Icon */}
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-50">
        <GitFork className="h-6 w-6 text-emerald-600" />
      </div>

      <h3 className="font-semibold text-slate-800">Create Similar Order</h3>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
        Need another one of these? Quickly duplicate this order with all
        settings preserved.
      </p>

      <Button
        variant="outline"
        onClick={handleClick}
        className="mt-6 gap-2 rounded-full border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
      >
        <Plus className="h-4 w-4" />
        New Similar Order
      </Button>
    </div>
  );
}
