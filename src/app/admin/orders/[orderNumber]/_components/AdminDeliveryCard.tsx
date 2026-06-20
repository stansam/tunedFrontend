"use client";

import type { AdminDeliveryCardProps } from "../_props";
import { AdminDeliveryStatusBadge } from "./AdminDeliveryStatusBadge";
import { AdminDeliveryMessage } from "./AdminDeliveryMessage";
import { AdminDeliveryAttachmentGrid } from "./AdminDeliveryAttachmentGrid";
import { AdminDeliveryActions } from "./AdminDeliveryActions";

export function AdminDeliveryCard({ delivery, orderId, orderStatus }: AdminDeliveryCardProps) {
  return (
    <div className="bg-white/40 border border-white/50 rounded-xl p-5 shadow-xs space-y-4">
      <div className="flex justify-between items-center border-b border-slate-200/50 pb-3">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-slate-800">Delivery Package</span>
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
