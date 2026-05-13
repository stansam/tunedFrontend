"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/lib/auth/Context";
import { useOrderMessages, messagesQueryKey } from "../_hooks/useOrderMessages";
import { useMessageSocket } from "../_hooks/useMessageSocket";
import { sendOrderMessage } from "../_services/messages.service";
import { formatMessageDay } from "../_utils";
import { MessageItem } from "./MessageItem";
import { MessageComposer } from "./MessageComposer";
import { Skeleton } from "@/components/ui/skeleton";
import type { OrderMessageDTO } from "../_types";
import type { OrderMessagesProps } from "../_props";

export function OrderMessages({ orderId }: OrderMessagesProps) {
  const { user } = useAuthContext();
  const { data: messages = [], isLoading } = useOrderMessages(orderId);
  const queryClient = useQueryClient();
  const [isSending, setIsSending] = useState(false);

  useMessageSocket(orderId);

  const handleSend = async (content: string) => {
    setIsSending(true);
    try {
      const result = await sendOrderMessage({ order_id: orderId, content });
      if (result.ok) {
        queryClient.setQueryData<OrderMessageDTO[]>(
          messagesQueryKey(orderId),
          (prev) => (prev ? [...prev, result.data] : [result.data]),
        );
      } else if (process.env.NODE_ENV !== "production") {
        console.error("[OrderMessages] Send failed:", result.error);
      }
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[OrderMessages] Unexpected error:", err);
      }
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-5">
        {messages.map((msg, i) => {
          const day = formatMessageDay(msg.created_at);
          const prevMessage = i > 0 ? messages[i - 1] : undefined;
          const prevDay = prevMessage
          ? formatMessageDay(prevMessage.created_at) : null;
          return (
            <MessageItem
              key={msg.id}
              message={msg}
              currentUserId={user?.id ?? ""}
              dayLabel={day !== prevDay ? day : undefined}
            />
          );
        })}

        {messages.length === 0 && (
          <p className="py-4 text-center text-sm text-slate-400">
            No messages yet. Send one below.
          </p>
        )}
      </div>

      <MessageComposer onSend={handleSend} isSending={isSending} />
    </div>
  );
}
