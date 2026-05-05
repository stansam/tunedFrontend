"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { webSocketService } from "@/lib/services/websocket.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useOrderSocket() {
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const socket = webSocketService.connect();

    socket.on("order.created", (data: { order_id: string; order_number: string }) => {
      toast.success(`Order ${data.order_number} created!`);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    });

    socket.on("payment.confirmed", (data: { order_id: string }) => {
      toast.success("Payment confirmed!");
      router.push(`/client/orders/${data.order_id}` as never);
    });

    return () => {
      socket.off("order.created");
      socket.off("payment.confirmed");
    };
  }, [queryClient, router]);
}
