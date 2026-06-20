"use client";

import { useState, useCallback } from "react";
import { uploadCommentFiles } from "../_services/comment-attachment.service";
import {
  COMMENT_ATTACHMENT_MAX_MB,
  COMMENT_ATTACHMENT_ALLOWED,
} from "../_fallback";
import type { PendingAttachment } from "../_types";

const MAX_BYTES = COMMENT_ATTACHMENT_MAX_MB * 1024 * 1024;

function makeId(): string {
  return crypto.randomUUID();
}

export function useCommentAttachment(orderId: string) {
  const [attachments, setAttachments] = useState<PendingAttachment[]>([]);

  const addFiles = useCallback(
    async (files: File[]) => {
      const valid = files.filter((f) => {
        const ext = "." + f.name.split(".").pop()?.toLowerCase();
        return f.size <= MAX_BYTES && COMMENT_ATTACHMENT_ALLOWED.includes(ext as never);
      });

      const pending: PendingAttachment[] = valid.map((f) => ({
        localId: makeId(),
        file: f,
        previewUrl: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
        status: "uploading" as const,
      }));

      setAttachments((prev) => [...prev, ...pending]);

      if (valid.length === 0) return;

      const result = await uploadCommentFiles(orderId, valid);

      if (result.ok) {
        const ids = result.data?.file_ids ?? [];
        setAttachments((prev) =>
          prev.map((a) => {
            const match = pending.find((p) => p.localId === a.localId);
            if (!match) return a;
            const idx = pending.indexOf(match);
            return { ...a, status: "done", uploadedId: ids[idx] };
          }),
        );
      } else {
        setAttachments((prev) =>
          prev.map((a) =>
            pending.find((p) => p.localId === a.localId)
              ? { ...a, status: "error", errorMsg: result.error?.message }
              : a,
          ),
        );
      }
    },
    [orderId],
  );

  const removeAttachment = useCallback((localId: string) => {
    setAttachments((prev) => prev.filter((a) => a.localId !== localId));
  }, []);

  const clearAll = useCallback(() => setAttachments([]), []);

  const uploadedIds = attachments
    .filter((a) => a.status === "done" && a.uploadedId)
    .map((a) => a.uploadedId!);

  const isUploading = attachments.some((a) => a.status === "uploading");

  return { attachments, addFiles, removeAttachment, clearAll, uploadedIds, isUploading };
}
