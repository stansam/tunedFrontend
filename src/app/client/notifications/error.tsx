"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function ClientNotificationsError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-8 text-center space-y-4">
      <h2 className="text-lg font-semibold text-red-700">Something went wrong!</h2>
      <p className="text-sm text-slate-500">{error.message || "Failed to load notifications."}</p>
      <Button onClick={reset} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full">
        Try again
      </Button>
    </div>
  );
}
