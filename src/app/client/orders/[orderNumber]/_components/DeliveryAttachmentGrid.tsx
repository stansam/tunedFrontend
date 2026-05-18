import { DeliveryAttachmentItem } from "./DeliveryAttachmentItem";
import type { DeliveryAttachmentGridProps } from "../_props";

export function DeliveryAttachmentGrid({ attachments }: DeliveryAttachmentGridProps) {
  if (!attachments.length) return null;
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-slate-700">Attachments</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {attachments.map((att) => (
          <DeliveryAttachmentItem key={att.id} attachment={att} />
        ))}
      </div>
    </div>
  );
}
