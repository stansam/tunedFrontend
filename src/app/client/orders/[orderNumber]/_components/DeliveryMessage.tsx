import { ArrowUpCircle } from "lucide-react";
import { formatDate } from "../_utils";
import type { DeliveryMessageProps } from "../_props";

export function DeliveryMessage({ delivery }: DeliveryMessageProps) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        {/* Operator avatar — dark circle matching the design */}
        <div
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900"
        >
          <ArrowUpCircle className="h-5 w-5 text-white" />
        </div>

        <div className="min-w-0 flex-1">
          {/* Sender + date row */}
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="font-semibold text-slate-900">
              Admin
            </span>
            <time
              dateTime={delivery.created_at}
              className="shrink-0 text-sm text-slate-400"
            >
              {formatDate(delivery.created_at)}
            </time>
          </div>

          {/* Message body */}
          <p className="text-sm leading-relaxed text-slate-600">
            Please find your delivered files attached below.
          </p>
        </div>
      </div>
    </div>
  );
}
