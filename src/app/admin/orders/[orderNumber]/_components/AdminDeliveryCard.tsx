"use client";

import type { AdminDeliveryCardProps } from "../_props";
import { AdminDeliveryStatusBadge } from "./AdminDeliveryStatusBadge";
import { AdminDeliveryMessage } from "./AdminDeliveryMessage";
import { AdminDeliveryAttachmentGrid } from "./AdminDeliveryAttachmentGrid";
import { AdminDeliveryActions } from "./AdminDeliveryActions";

export function AdminDeliveryCard({ delivery, orderId, orderStatus }: AdminDeliveryCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg space-y-4">
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-white">Delivery Package</span>
          <AdminDeliveryStatusBadge
            status={delivery.delivery_status}
            statusColor={delivery.status_color}
          />
        </div>
        <AdminDeliveryMessage delivery={delivery} />
      </div>

      <AdminDeliveryAttachmentGrid attachments={delivery.files} />

      <AdminDeliveryActions
        delivery={delivery}
        orderId={orderId}
        orderStatus={orderStatus}
      />
    </div>
  );
}
