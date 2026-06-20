import { DeliveryStatusBadge } from "./DeliveryStatusBadge";
import { DeliveryMessage } from "./DeliveryMessage";
import { DeliveryAttachmentGrid } from "./DeliveryAttachmentGrid";
import { DeliveryActions } from "./DeliveryActions";
import type { DeliveryCardProps } from "../_props";

export function DeliveryCard({ delivery, orderId, orderStatus }: DeliveryCardProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* Header: delivery number + status badge */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-slate-800">
            Delivery
          </p>
        </div>
        <DeliveryStatusBadge status={delivery.delivery_status} statusColor={delivery.status_color} />
      </div>

      {/* Operator message */}
      <DeliveryMessage delivery={delivery} />

      {/* Delivered file attachments */}
      {delivery.files.length > 0 && (
        <DeliveryAttachmentGrid attachments={delivery.files} />
      )}

      {/* Divider */}
      <div className="border-t border-slate-100" />

      {/* Client action buttons */}
      <DeliveryActions delivery={delivery} orderId={orderId} orderStatus={orderStatus} />
    </div>
  );
}
