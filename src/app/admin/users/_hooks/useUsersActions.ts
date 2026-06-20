"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { broadcastMessage, messageUser } from "../_services/users.service";
import type { AdminUserResponseDTO } from "../_types";

export function useUsersActions() {
  const [broadcastOpen, setBroadcastOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUserResponseDTO | null>(null);

  const broadcastMutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await broadcastMessage(message);
      if (!res.ok) throw new Error(res.error?.message ?? "Broadcast failed");
      return res.data;
    },
    onSuccess: () => {
      toast.success("Broadcast sent to all clients");
      setBroadcastOpen(false);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const messageMutation = useMutation({
    mutationFn: async ({
      userId,
      message,
    }: {
      userId: string;
      message: string;
    }) => {
      const res = await messageUser(userId, message);
      if (!res.ok) throw new Error(res.error?.message ?? "Message failed");
      return res.data;
    },
    onSuccess: () => {
      toast.success("Message sent successfully");
      setSelectedUser(null);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return {
    broadcastOpen,
    setBroadcastOpen,
    selectedUser,
    setSelectedUser,
    broadcastMessage: broadcastMutation.mutateAsync,
    isBroadcasting: broadcastMutation.isPending,
    messageUser: messageMutation.mutateAsync,
    isMessaging: messageMutation.isPending,
  };
}
