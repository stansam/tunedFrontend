"use client";

import type { AdminDeliveryAttachmentGridProps } from "../_props";
import { AdminDeliveryAttachmentItem } from "./AdminDeliveryAttachmentItem";

export function AdminDeliveryAttachmentGrid({ attachments }: AdminDeliveryAttachmentGridProps) {
  if (attachments.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {attachments.map((file) => (
        <AdminDeliveryAttachmentItem key={file.id} attachment={file} />
      ))}
    </div>
  );
}
