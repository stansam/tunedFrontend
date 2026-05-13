"use client";

import { ChevronLeft, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { OrderDetailHeaderProps } from "../_props";

export function OrderDetailHeader({ orderNumber }: OrderDetailHeaderProps) {
  const router = useRouter();

  const handleCopy = () => {
    void navigator.clipboard.writeText(orderNumber).then(() => {
      toast.success("Order number copied to clipboard!");
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 shrink-0 rounded-full"
        onClick={() => router.back()}
        aria-label="Go back to orders list"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <h2 className="text-base font-bold text-emerald-600 md:text-lg">
        {orderNumber}
      </h2>

      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-slate-400 hover:text-slate-600"
        onClick={handleCopy}
        aria-label="Copy order number to clipboard"
      >
        <Copy className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
