"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editChatMessage, deleteChatMessage, uploadChatAttachment } from "../_services/chat-actions.service";

export function useChatActions(activeChatId: string | null) {
  const queryClient = useQueryClient();

  const editMsgMutation = useMutation({
    mutationFn: ({ messageId, content }: { messageId: string; content: string }) => {
      if (!activeChatId) throw new Error("No active chat");
      return editChatMessage(activeChatId, messageId, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "chats"] });
    },
  });

  const deleteMsgMutation = useMutation({
    mutationFn: (messageId: string) => {
      if (!activeChatId) throw new Error("No active chat");
      return deleteChatMessage(activeChatId, messageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "chats"] });
    },
  });

  const uploadAttachmentMutation = useMutation({
    mutationFn: (file: File) => {
      if (!activeChatId) throw new Error("No active chat");
      return uploadChatAttachment(activeChatId, file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "chats"] });
    },
  });

  return {
    editMessage: (messageId: string, content: string) =>
      editMsgMutation.mutateAsync({ messageId, content }),
    deleteMessage: (messageId: string) =>
      deleteMsgMutation.mutateAsync(messageId),
    uploadAttachment: (file: File) =>
      uploadAttachmentMutation.mutateAsync(file),
    isEditing: editMsgMutation.isPending,
    isDeleting: deleteMsgMutation.isPending,
    isUploading: uploadAttachmentMutation.isPending,
  };
}
