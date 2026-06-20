"use client";

import { Route } from "next";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}


export default function OrderDetailError({ error, reset }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[OrderDetailPage] Unhandled error:", error);
    }
  }, [error]);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-4 rounded-xl bg-white py-16 text-center shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
        <AlertTriangle className="h-7 w-7 text-red-500" />
      </div>

      <div className="px-4">
        <p className="text-base font-semibold text-slate-900">
          Order could not be loaded
        </p>
        <p className="mt-1 text-sm text-slate-500">
          {error.message ||
            "This order may not exist or you may not have permission to view it."}
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-xs text-slate-400">
            Ref: {error.digest}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/client/orders" as Route)}
        >
          Back to Orders
        </Button>
        <Button
          size="sm"
          className="bg-emerald-600 text-white hover:bg-emerald-700"
          onClick={reset}
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
